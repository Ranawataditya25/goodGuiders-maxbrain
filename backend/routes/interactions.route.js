// routes/interactions.route.js
import express from "express";
import mongoose from "mongoose";
import User from "../models/User.model.js";
import Submission from "../models/Submission.model.js"; // used for optional submission merging (if submissions reference mentor)

const router = express.Router();

/**
 * GET /api/interactions/mentor/:mentorId/students
 * Returns students who interacted with the mentor (based on conversations collection participants/emails),
 * with last interaction time and course.
 */
router.get("/mentor/:mentorId/students", async (req, res) => {
  try {
    const { mentorId } = req.params;
    const { limit = 50, skip = 0, since, type, course } = req.query;

    if (!mentorId) return res.status(400).json({ message: "mentorId required" });

    // validate mentorId
    if (!mongoose.isValidObjectId(mentorId)) {
      return res.status(400).json({ message: "Invalid mentorId" });
    }

    // find mentor user to resolve email (conversations store emails in your sample)
    const mentor = await User.findById(mentorId).select("email name").lean();
    if (!mentor) return res.status(404).json({ message: "Mentor not found" });

    const mentorEmail = String(mentor.email).trim();
    if (!mentorEmail) {
      return res.status(400).json({ message: "Mentor email not available on user" });
    }

    const sinceDate = since ? new Date(since) : null;
    const typesRequested = type
      ? type.split(",").map((t) => t.trim().toLowerCase())
      : ["messages", "calls", "sessions", "submissions"];

    // collection names
    const convCollName = "conversations";
    const submissionsCollName = Submission && Submission.collection && Submission.collection.name ? Submission.collection.name : "submissions";
    const usersCollName = "users";

    const unionStages = [];

    // Conversations (messages / calls / sessions) — primary source in your DB sample
    if (typesRequested.includes("messages") || typesRequested.includes("calls") || typesRequested.includes("sessions")) {
      // We'll seed from conversations and also include other collections if you have them.
      // Project: studentEmail = participants element !== mentorEmail
      // ts: prefer endedAt -> startedAt -> firstMessageTime -> createdAt
      const convMatch = {
        participants: mentorEmail, // participants is array of emails in your sample
        ...(sinceDate ? { $or: [
          { endedAt: { $gte: sinceDate } },
          { startedAt: { $gte: sinceDate } },
          { firstMessageTime: { $gte: sinceDate } },
          { createdAt: { $gte: sinceDate } }
        ] } : {})
      };

      // We'll run a unionWith for other collections later if needed, but start from conversations
      unionStages.push({
        coll: convCollName,
        pipeline: [
          { $match: convMatch },
          {
            $addFields: {
              // pick student participant that's not mentorEmail
              studentEmail: {
                $let: {
                  vars: {
                    filtered: {
                      $filter: {
                        input: "$participants",
                        as: "p",
                        cond: { $ne: [{ $trim: { input: { $toLower: "$$p" } } }, mentorEmail.toLowerCase()] }
                      }
                    }
                  },
                  in: { $arrayElemAt: ["$$filtered", 0] }
                }
              },
              ts: { $ifNull: ["$endedAt", "$startedAt", "$firstMessageTime", "$createdAt"] }
            }
          },
          { $match: { studentEmail: { $exists: true, $ne: null } } },
          { $project: { studentEmail: 1, ts: 1 } }
        ]
      });
    }

    // Optional: Submissions (only include if submissions store a mentor reference — sample doesn't)
    if (typesRequested.includes("submissions")) {
      // try to match submissions that reference mentor by common field names (mentorEmail, mentor, assignedTo, assignedMentorEmail)
      const possibleMentorFields = ["mentorEmail", "mentor", "assignedTo", "assignedMentorEmail", "mentorId"];
      const subOrs = [];

      for (const f of possibleMentorFields) {
        // if stored as email string
        subOrs.push({ [f]: mentorEmail });
        // if stored as ObjectId string or ObjectId (only useful if you store id there)
        try {
          if (mongoose.isValidObjectId(mentorId)) subOrs.push({ [f]: new mongoose.Types.ObjectId(mentorId) });
        } catch (e) {}
      }

      // many of your submissions sample docs don't reference mentor, so this stage may return nothing — that's expected
      unionStages.push({
        coll: submissionsCollName,
        pipeline: [
          { $match: { $or: subOrs.length ? subOrs : [{ _id: null }] } },
          {
            $project: {
              studentEmail: { $ifNull: ["$userEmail", "$studentEmail", "$email"] },
              ts: "$submittedAt"
            }
          },
          { $match: { studentEmail: { $exists: true, $ne: null } } }
        ]
      });
    }

    // If no union stages created (user asked types that don't exist), return empty
    if (unionStages.length === 0) {
      return res.json({ Students: [], meta: { count: 0, limit: parseInt(limit, 10), skip: parseInt(skip, 10) } });
    }

    // Build pipeline that starts with first collection's pipeline and then $unionWith others
    // We'll execute aggregation on the first collection (usually conversations)
    const start = unionStages[0];
    const pipeline = [...(start.pipeline || [])];

    // add unionWith for remaining
    for (let i = 1; i < unionStages.length; i++) {
      const u = unionStages[i];
      pipeline.push({
        $unionWith: {
          coll: u.coll,
          pipeline: u.pipeline
        }
      });
    }

    // Now group by studentEmail, get last interaction
    pipeline.push(
      {
        $group: {
          _id: "$studentEmail",
          lastInteraction: { $max: "$ts" },
          count: { $sum: 1 }
        }
      },
      // Lookup user details by email
      {
        $lookup: {
          from: usersCollName,
          localField: "_id",
          foreignField: "email",
          as: "studentUser"
        }
      },
      { $unwind: { path: "$studentUser", preserveNullAndEmptyArrays: true } },
      // optional course filter (matches either user.course or submission.class as fallback)
      ...(course
        ? [
            {
              $match: {
                $or: [{ "studentUser.course": course }, { "studentUser.enrolledCourses.title": course }]
              }
            }
          ]
        : []),
      {
        $project: {
          _id: 0,
          Id: {
            $cond: [{ $ifNull: ["$studentUser._id", false] }, { $toString: "$studentUser._id" }, "$_id"]
          },
          Name: { $ifNull: ["$studentUser.name", "$_id"] },
          Grade: { $ifNull: ["$studentUser.grade", null] },
          LastInteraction: "$lastInteraction"
        }
      },
      { $sort: { LastInteraction: -1 } },
      { $skip: parseInt(skip, 10) || 0 },
      { $limit: Math.min(parseInt(limit, 10) || 50, 200) }
    );

    // Execute aggregation on the conversations collection (start.coll)
    const startCollName = unionStages[0].coll;
    const results = await mongoose.connection.db.collection(startCollName).aggregate(pipeline).toArray();

    return res.json({ Students: results, meta: { count: results.length, limit: parseInt(limit, 10), skip: parseInt(skip, 10) } });
  } catch (err) {
    console.error("interactions route error:", err);
    return res.status(500).json({ error: "Server error", details: err.message });
  }
});

export default router;
