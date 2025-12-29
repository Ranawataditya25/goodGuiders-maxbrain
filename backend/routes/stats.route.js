// routes/stats.route.js
import express from "express";
import User from "../models/User.model.js";
import mongoose from "mongoose";
import Submission from "../models/Submission.model.js";
import MentorRating from "../models/MentorRating.model.js";

const router = express.Router();

// GET /api/stats/total-users
router.get("/total-users", async (req, res) => {
  try {
    const totalMentors = await User.countDocuments({ role: "mentor", mentorStatus: "approved" });
    const totalStudents = await User.countDocuments({ role: "student" });

    res.json({
      totalMentors,
      totalStudents,
    });
  } catch (err) {
    console.error("Error fetching totals:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ NEW: GET /api/stats/mentors
router.get("/mentors", async (req, res) => {
  try {
    const { specialization } = req.query;

    const mentors = await User.find({
      role: "mentor",
      mentorStatus: "approved",
    }).select(
      "_id name email mobileNo specializedIn experience education isDisabled mentorAbilities"
    );

    if (!mentors.length) {
      return res.status(404).json({ message: "No mentors found" });
    }

    // ✅ Helper to normalize specialization (trim + lowercase)
    const normalizeSpec = (s = "") =>
      s.toString().trim().toLowerCase();

    const filterSpec = normalizeSpec(specialization || "");

    const scoreForMentor = (mentor) => {
      const spec = normalizeSpec(mentor.specializedIn || "");
      const disabled = !!mentor.isDisabled;

      const match = filterSpec && spec === filterSpec;

      // 0: match + enabled
      // 1: match + disabled
      // 2: not match + enabled
      // 3: not match + disabled
      if (match && !disabled) return 0;
      if (match && disabled) return 1;
      if (!match && !disabled) return 2;
      return 3;
    };

    let sortedMentors;

    if (specialization) {
      sortedMentors = [...mentors].sort(
        (a, b) => scoreForMentor(a) - scoreForMentor(b)
      );
    } else {
      // default: enabled first, disabled last
      sortedMentors = [...mentors].sort(
        (a, b) => Number(a.isDisabled) - Number(b.isDisabled)
      );
    }

    res.json({ mentors: sortedMentors });
  } catch (err) {
    console.error("Error fetching mentors:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ NEW: GET /api/stats/mentors/top-rated
router.get("/mentors/top-rated", async (req, res) => {
  try {
    // 1️⃣ Aggregate ratings (already sorted)
    const ratings = await MentorRating.aggregate([
      {
        $group: {
          _id: "$mentorEmail",
          avgRating: { $avg: "$rating" },
          ratingCount: { $sum: 1 },
        },
      },
      { $sort: { avgRating: -1, ratingCount: -1 } },
      { $limit: 8 },
    ]);

    const mentorEmails = ratings.map(r => r._id);

    // 2️⃣ Fetch mentors
    const mentors = await User.find({
      email: { $in: mentorEmails },
      role: "mentor",
      isDisabled: { $ne: true },
    })
      .select("_id name profileImage specializedIn experience email")
      .lean();

    // 3️⃣ Create lookup map
    const mentorMap = new Map(
      mentors.map(m => [m.email, m])
    );

    // 4️⃣ REBUILD ARRAY IN RATING ORDER ✅
    const orderedMentors = ratings
      .map(r => {
        const mentor = mentorMap.get(r._id);
        if (!mentor) return null;

        return {
          ...mentor,
          rating: Number(r.avgRating.toFixed(1)),
          ratingCount: r.ratingCount,
        };
      })
      .filter(Boolean);

    res.json({ ok: true, data: orderedMentors });
  } catch (err) {
    console.error("Top mentors error:", err);
    res.status(500).json({ ok: false });
  }
});

// ✅ NEW: GET /api/stats/students
router.get("/students", async (req, res) => {
  try {
    const { class: classQuery } = req.query; // e.g. ?class=10th

    const students = await User.find({ role: "student" })
      .select("name email mobileNo address dob education isDisabled -_id");

    if (!students.length) {
      return res.status(404).json({ message: "No students found" });
    }

    const normalize = (s = "") => s.toString().trim().toLowerCase();

    const filterClass = normalize(classQuery || "");

    // sort helper: similar to mentors
    const scoreForStudent = (student) => {
      const disabled = !!student.isDisabled;

      const eduClasses = (student.education || [])
        .map((e) => normalize(e.className || ""))
        .filter(Boolean);

      const hasMatch = filterClass && eduClasses.includes(filterClass);

      // 0: match + enabled
      // 1: match + disabled
      // 2: not match + enabled
      // 3: not match + disabled
      if (hasMatch && !disabled) return 0;
      if (hasMatch && disabled) return 1;
      if (!hasMatch && !disabled) return 2;
      return 3;
    };

    let sortedStudents;

    if (classQuery) {
      sortedStudents = [...students].sort(
        (a, b) => scoreForStudent(a) - scoreForStudent(b)
      );
    } else {
      // default: enabled first, disabled last
      sortedStudents = [...students].sort(
        (a, b) => Number(a.isDisabled) - Number(b.isDisabled)
      );
    }

    // format each student to include a main `className` + all classes
    const formattedStudents = sortedStudents.map((student) => {
      const eduClasses = (student.education || [])
        .map((e) => e.className)
        .filter(Boolean);

      // you can change this logic if your "current class" is stored differently
      const primaryClass =
        eduClasses.length > 0 ? eduClasses[eduClasses.length - 1] : "";

      return {
        name: student.name,
        email: student.email,
        mobileNo: student.mobileNo,
        address: student.address,
        dob: student.dob,
        isDisabled: !!student.isDisabled,
        className: primaryClass, // ✅ main class for filter
        classes: eduClasses,     // all classes if needed
      };
    });

    res.json({ students: formattedStudents });
  } catch (err) {
    console.error("Error fetching students:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ GET — 10 most recently registered students
router.get("/students/recent", async (req, res) => {
  try {
    const students = await User.find({ role: "student" })
      .sort({ createdAt: -1 })
      .limit(10)
      .select("name email education isDisabled createdAt")
      .lean();

    const mapped = students.map(s => {
      // 🔥 pick class from education
      const studentClass =
        Array.isArray(s.education) && s.education.length > 0
          ? s.education[0].className
          : "-";

      return {
        name: s.name,
        email: s.email,
        className: studentClass,
        isDisabled: s.isDisabled,
        createdAt: s.createdAt,
      };
    });

    res.json({ ok: true, students: mapped });
  } catch (err) {
    console.error("Recent students error:", err);
    res.status(500).json({ ok: false });
  }
});

// DELETE a user (mentor/student)
router.delete("/:role/:email", async (req, res) => {
  try {
    const { role, email } = req.params;

    if (!["mentor", "student"].includes(role)) {
      return res.status(400).json({ success: false, message: "Invalid role" });
    }

    const user = await User.findOneAndDelete({ email, role });

    if (!user) {
      return res.status(404).json({ success: false, message: `${role} not found` });
    }

    res.json({ success: true, message: `${role} deleted successfully` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// TOGGLE disable/enable user (mentor/student)
router.patch("/:role/:email/toggle", async (req, res) => {
  try {
    const { role, email } = req.params;

    if (!["mentor", "student"].includes(role)) {
      return res.status(400).json({ success: false, message: "Invalid role" });
    }

    const user = await User.findOne({ email, role });

    if (!user) {
      return res.status(404).json({ success: false, message: `${role} not found` });
    }

    user.isDisabled = !user.isDisabled;
    await user.save();

    res.json({
      success: true,
      isDisabled: user.isDisabled,
      message: `${role} ${user.isDisabled ? "disabled" : "enabled"} successfully`,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ✅ GET /api/stats/student/:email/details
// Returns full student info + exams + performance + mentors connected
router.get("/student/:email/details", async (req, res) => {
  try {
    const { email } = req.params;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const student = await User.findOne({ email, role: "student" })
      .select("name email mobileNo address dob className course enrolledCourses isDisabled")
      .lean();

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // ✅ 1) Exams given (Submissions)
    const submissions = await Submission.find({ userEmail: email })
      .select("class subjects type submittedAt score totalMarks")
      .sort({ submittedAt: -1 })
      .lean();

    const exams = submissions.map((s) => {
      let percentage = null;
      if (typeof s.score === "number" && typeof s.totalMarks === "number" && s.totalMarks > 0) {
        percentage = Math.round((s.score / s.totalMarks) * 100);
      }
      return {
        id: s._id,
        class: s.class,
        subjects: s.subjects,
        type: s.type,
        submittedAt: s.submittedAt,
        score: s.score ?? null,
        totalMarks: s.totalMarks ?? null,
        percentage,
      };
    });

    // ✅ 2) Performance (5-level category)
    const scoredExams = exams.filter((e) => e.percentage !== null);
    let averageScore = null;
    let performanceCategory = "Not evaluated";

    if (scoredExams.length > 0) {
      const total = scoredExams.reduce((sum, e) => sum + e.percentage, 0);
      averageScore = Math.round(total / scoredExams.length);

      if (averageScore < 40) performanceCategory = "Below Average";
      else if (averageScore < 60) performanceCategory = "Average";
      else if (averageScore < 75) performanceCategory = "Good";
      else if (averageScore < 90) performanceCategory = "Very Good";
      else performanceCategory = "Excellent";
    }

    // ✅ 3) Mentors connected (via conversations participants)
    const convColl = mongoose.connection.db.collection("conversations");

    const conversations = await convColl
      .find({ participants: email })
      .project({ participants: 1 })
      .toArray();

    const otherEmailsSet = new Set();
    const emailLower = email.toLowerCase().trim();

    conversations.forEach((conv) => {
      (conv.participants || []).forEach((p) => {
        if (!p) return;
        const pl = p.toLowerCase().trim();
        if (pl !== emailLower) otherEmailsSet.add(p.trim());
      });
    });

    let mentors = [];
    if (otherEmailsSet.size > 0) {
      const otherEmails = Array.from(otherEmailsSet);
      const mentorUsers = await User.find({
        email: { $in: otherEmails },
        role: "mentor",
      })
        .select("name email specializedIn")
        .lean();

      mentors = mentorUsers.map((m) => ({
        name: m.name,
        email: m.email,
        specialization: m.specializedIn || "-",
      }));
    }

    return res.json({
      student: {
        id: student._id,
        name: student.name,
        email: student.email,
        mobileNo: student.mobileNo,
        address: student.address,
        dob: student.dob,
        className: student.className || null,
        course: student.course || null,
        isDisabled: !!student.isDisabled,
      },
      exams,
      performance: {
        averageScore,
        category: performanceCategory,
        examsCount: exams.length,
      },
      mentors: {
        count: mentors.length,
        items: mentors,
      },
    });
  } catch (err) {
    console.error("Error in /student/:email/details:", err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

router.get("/mentor/:email/details", async (req, res) => {
  try {
    const { email } = req.params;
    if (!email) return res.status(400).json({ message: "Email is required" });

    // 1) Find mentor
    const mentor = await User.findOne({ email, role: "mentor" })
      .select("name email mobileNo specializedIn experience education isDisabled -_id")
      .lean();

    if (!mentor) {
      return res.status(404).json({ message: "Mentor not found" });
    }

    // 2) Find conversations where mentor participates
    const convColl = mongoose.connection.db.collection("conversations");

    const conversations = await convColl
      .find({ participants: email })
      .project({
        participants: 1,
        createdAt: 1,
        firstMessageTime: 1,
        connectedAt: 1,
        startedAt: 1,
        endedAt: 1,
        callStatus: 1,
      })
      .toArray();

    // collect distinct other participant emails (likely students)
    const otherEmailsSet = new Set();
    const emailLower = String(email).toLowerCase().trim();

    // Also compute last interaction per other participant by scanning conversation documents
    const lastInteractionMap = {}; // email -> Date (ISO string)

    const pickupDates = (conv) => {
      const candidates = [];
      if (conv.createdAt) candidates.push(new Date(conv.createdAt));
      if (conv.firstMessageTime) candidates.push(new Date(conv.firstMessageTime));
      if (conv.connectedAt) candidates.push(new Date(conv.connectedAt));
      if (conv.endedAt) candidates.push(new Date(conv.endedAt));
      if (conv.startedAt) candidates.push(new Date(conv.startedAt));
      // fallback: use now? No — ignore
      return candidates;
    };

    conversations.forEach((conv) => {
      (conv.participants || []).forEach((p) => {
        if (!p) return;
        const pl = String(p).toLowerCase().trim();
        if (pl === emailLower) return;
        otherEmailsSet.add(p.trim());
      });

      // compute a timestamp representing this conversation's "last activity"
      const candidates = pickupDates(conv);
      let convLast = candidates.length ? new Date(Math.max(...candidates.map((d) => d.getTime()))) : null;

      // For each other participant in this conversation, update their lastInteraction
      (conv.participants || []).forEach((p) => {
        if (!p) return;
        const pl = String(p).toLowerCase().trim();
        if (pl === emailLower) return;
        const key = p.trim();
        if (!convLast) return;
        const prev = lastInteractionMap[key];
        if (!prev || convLast.getTime() > new Date(prev).getTime()) {
          lastInteractionMap[key] = convLast.toISOString();
        }
      });
    });

    // 3) Resolve otherEmails to student users
    const otherEmails = Array.from(otherEmailsSet);
    let studentsConnected = { count: 0, items: [] };

    if (otherEmails.length > 0) {
      const studentUsers = await User.find({
        email: { $in: otherEmails },
        role: "student",
      })
        .select("name email className education -_id")
        .lean();

      // Map by email (case-insensitive)
      const usersByEmail = {};
      studentUsers.forEach((u) => {
        usersByEmail[String(u.email).trim().toLowerCase()] = u;
      });

      const items = otherEmails
        .map((em) => {
          const key = String(em).trim().toLowerCase();
          const u = usersByEmail[key];
          return {
            email: em.trim(),
            name: u ? u.name : em.trim(),
            class: u ? (u.className || (Array.isArray(u.education) && u.education.length > 0 ? u.education[u.education.length - 1].className : null)) : null,
            lastInteraction: lastInteractionMap[em.trim()] || null,
          };
        })
        // optional: sort by lastInteraction desc
        .sort((a, b) => {
          if (!a.lastInteraction && !b.lastInteraction) return 0;
          if (!a.lastInteraction) return 1;
          if (!b.lastInteraction) return -1;
          return new Date(b.lastInteraction) - new Date(a.lastInteraction);
        });

      studentsConnected = { count: items.length, items };
    }

    // 4) (Optional) fetch related exams if you want: e.g. recent submissions where mentor is teacher
    // Your schema does not show mentorId in Submission; skip unless you already link them.
    // For now we won't fetch exams here.

    return res.json({
      mentor: {
        name: mentor.name,
        email: mentor.email,
        mobileNo: mentor.mobileNo || null,
        specialization: mentor.specializedIn || null,
        experience: mentor.experience || null,
        degree: (Array.isArray(mentor.education) && mentor.education.length > 0) ? mentor.education[mentor.education.length - 1].degree : null,
        isDisabled: !!mentor.isDisabled,
      },
      students: studentsConnected,
      // relatedExams: [] // add if you want later
    });
  } catch (err) {
    console.error("Error in /mentor/:email/details:", err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

// ✅ POST — submit / update rating
router.post("/mentor/:email/rate", async (req, res) => {
  try {
    const mentorEmail = req.params.email;
    const { studentEmail, rating } = req.body;

    if (!studentEmail || !rating)
      return res.status(400).json({ message: "studentEmail & rating required" });

    if (rating < 1 || rating > 5)
      return res.status(400).json({ message: "Rating must be 1–5" });

    await MentorRating.findOneAndUpdate(
      { mentorEmail, studentEmail },
      { rating },
      { upsert: true, new: true }
    );

    res.json({ success: true, message: "Rating submitted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ GET — average + breakdown rating for mentor
router.get("/mentor/:email/rating", async (req, res) => {
  try {
    const mentorEmail = req.params.email;

    const result = await MentorRating.aggregate([
      { $match: { mentorEmail } },

      // group by rating value
      {
        $group: {
          _id: "$rating",
          count: { $sum: 1 },
        },
      },
    ]);

    // initialize breakdown
    const breakdown = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    };

    let totalCount = 0;
    let totalRatingSum = 0;

    result.forEach((r) => {
      breakdown[r._id] = r.count;
      totalCount += r.count;
      totalRatingSum += r._id * r.count;
    });

    if (totalCount === 0) {
      return res.json({
        avgRating: null,
        count: 0,
        breakdown,
      });
    }

    res.json({
      avgRating: Number((totalRatingSum / totalCount).toFixed(1)),
      count: totalCount,
      breakdown,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;