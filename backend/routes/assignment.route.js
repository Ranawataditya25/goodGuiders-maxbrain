// routes/assignment.route.js
import { Router } from "express";
import mongoose from "mongoose";
import Questions from "../models/Question.model.js";
import User from "../models/User.model.js";
import TestAssignment from "../models/TestAssignment.model.js";
import Attempt from "../models/Attempt.model.js";

const router = Router();

const isValidObjectId = (v) => mongoose.isValidObjectId(v);
const toObjectId = (v) => (isValidObjectId(v) ? new mongoose.Types.ObjectId(v) : v);

// Helper: resolve a user id (for dev environments w/o auth middleware)
const resolveUserId = (req) => {
  if (req.user?._id) return req.user._id;
  const headerId = req.header("x-user-id");
  if (headerId && isValidObjectId(headerId)) return new mongoose.Types.ObjectId(headerId);
  const bodyId = req.body?.assignedBy || req.body?.createdBy;
  if (bodyId && isValidObjectId(bodyId)) return new mongoose.Types.ObjectId(bodyId);
  return undefined;
};

// ---- helper to read timer minutes from many possible keys (minutes > 0) ----
const pickLimitMinutes = (body = {}) => {
  const toInt = (v) => {
    const n = Number(v);
    return Number.isFinite(n) && n > 0 ? Math.round(n) : null;
  };
  const s = body.settings || {};
  return (
    toInt(body.durationMinutes) ??
    toInt(body.durationMin) ??
    toInt(body.timeLimitMin) ??
    toInt(s.durationMinutes) ??
    null
  );
};

/* ---------------------------------------------
 * Simple lists
 * --------------------------------------------- */
router.get("/tests", async (req, res) => {
  try {
    const { createdBy, mine } = req.query;
    const filter = {};

    // ?mine=1 -> use req.user or x-user-id header
    if (String(mine) === "1") {
      const uid = resolveUserId(req);
      if (uid) filter.createdBy = uid;
    }

    // ?createdBy=<ObjectId>
    if (createdBy && isValidObjectId(createdBy)) {
      filter.createdBy = new mongoose.Types.ObjectId(createdBy);
    }

    const docs = await Questions.find(filter, { questions: 0 }).sort({ createdAt: -1 }).lean();
    res.json({ ok: true, data: docs });
  } catch (e) {
    console.error("[GET /tests] error:", e);
    res.status(500).json({ ok: false, message: "Failed to fetch tests" });
  }
});

router.get("/students", async (_req, res) => {
  try {
    const students = await User.find({ role: "student" }, { password: 0 }).sort({ name: 1 }).lean();
    res.json({ ok: true, data: students });
  } catch (e) {
    console.error("[GET /students] error:", e);
    res.status(500).json({ ok: false, message: "Failed to fetch students" });
  }
});

/* ---------------------------------------------
 * Single test by id (used by TestPlayer)
 * --------------------------------------------- */
router.get("/tests/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ ok: false, message: "Invalid test id" });
    }
    const doc = await Questions.findById(id).lean();
    if (!doc) return res.status(404).json({ ok: false, message: "Not found" });
    res.json({ ok: true, data: doc });
  } catch (e) {
    console.error("[GET /tests/:id] error:", e);
    res.status(500).json({ ok: false, message: "Failed to fetch test" });
  }
});

/* ---------------------------------------------
 * GET /api/assignments
 * Returns assignments targeted to a student, each with:
 * - derivedStatus: assigned | in_progress | completed
 * - latestAttempt: the student's latest Attempt for that assignment
 *
 * Query:
 *   ?studentId=<ObjectId> | ?studentEmail=<email>
 *   [optional] ?testId=<ObjectId|string> (filters by paper)
 * --------------------------------------------- */
router.get("/assignments", async (req, res) => {
  try {
    const { studentId: rawStudentId, studentEmail, testId: rawTestId, id } = req.query;

    // Single assignment by id (kept for detail screens)
    if (id && isValidObjectId(id)) {
      const a = await TestAssignment.findById(id)
        .populate("test", "_id title subjects class testType questions")
        .lean();
      if (!a) return res.status(404).json({ ok: false, message: "Not found" });
      return res.json({ ok: true, data: a });
    }

    // Resolve studentId if only email was passed
    let studentIdStr = (rawStudentId || "").trim();
    if (!studentIdStr && studentEmail) {
      const u = await User.findOne({ email: String(studentEmail).trim() }, { _id: 1 }).lean();
      if (u?._id) studentIdStr = String(u._id);
    }

    const studentMatchOr = [];
    if (studentIdStr) {
      studentMatchOr.push({ studentIdsStr: studentIdStr });
      if (isValidObjectId(studentIdStr)) {
        studentMatchOr.push({ studentIds: new mongoose.Types.ObjectId(studentIdStr) });
      }
    }

    const testMatchOr = [];
    const testIdStr = (rawTestId || "").trim();
    if (testIdStr) {
      if (isValidObjectId(testIdStr)) testMatchOr.push({ testId: new mongoose.Types.ObjectId(testIdStr) });
      testMatchOr.push({ testIdStr });
    }

    const andConds = [];
    if (studentMatchOr.length) andConds.push({ $or: studentMatchOr });
    if (testMatchOr.length) andConds.push({ $or: testMatchOr });

    const pipeline = [
      // normalize ids for flexible matching (string/ObjectId)
      {
        $addFields: {
          studentIdsStr: {
            $map: {
              input: "$studentIds",
              as: "sid",
              in: {
                $cond: [
                  { $eq: [{ $type: "$$sid" }, "objectId"] },
                  { $toString: "$$sid" },
                  "$$sid",
                ],
              },
            },
          },
          testIdStr: {
            $cond: [
              { $eq: [{ $type: "$testId" }, "objectId"] },
              { $toString: "$testId" },
              "$testId",
            ],
          },
        },
      },
      ...(andConds.length ? [{ $match: { $and: andConds } }] : []),

      // join paper details (class/subjects/type)
      {
        $lookup: {
          from: "questions",
          localField: "testId",
          foreignField: "_id",
          as: "test",
        },
      },
      { $unwind: { path: "$test", preserveNullAndEmptyArrays: true } },

      // bring in the student's latest attempt for this assignment
      {
        $lookup: {
          from: Attempt.collection.name,
          let: { aid: "$_id", sids: "$studentIds" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$assignmentId", "$$aid"] },
                    { $in: ["$userId", "$$sids"] },
                  ],
                },
              },
            },
            { $sort: { submittedAt: -1, updatedAt: -1, startedAt: -1, _id: -1 } },
            { $limit: 1 },
          ],
          as: "latestAttempt",
        },
      },
      { $unwind: { path: "$latestAttempt", preserveNullAndEmptyArrays: true } },

      // derive server-truth status
      {
        $addFields: {
          derivedStatus: {
            $switch: {
              branches: [
                {
                  // Attempt.status === "submitted" or has submittedAt => completed
                  case: {
                    $or: [
                      { $eq: ["$latestAttempt.status", "submitted"] },
                      { $gt: ["$latestAttempt.submittedAt", null] },
                    ],
                  },
                  then: "completed",
                },
                {
                  // "in_progress" if attempt exists with startedAt / answers
                  case: {
                    $or: [
                      { $eq: ["$latestAttempt.status", "in_progress"] },
                      { $gt: ["$latestAttempt.startedAt", null] },
                      {
                        $gt: [
                          { $size: { $ifNull: [{ $objectToArray: "$latestAttempt.answers" }, []] } },
                          0,
                        ],
                      },
                    ],
                  },
                  then: "in_progress",
                },
              ],
              default: "assigned",
            },
          },
          resolvedTestId: { $ifNull: ["$test._id", "$testId"] },
        },
      },

      // keep payload lean for the FE (➡️ add timer fields)
      {
        $project: {
          studentIds: 1,
          createdAt: 1,
          updatedAt: 1,
          dueAt: 1,
          status: 1,
          note: 1,

          // ⬇️ timer fields included in list API
          durationMinutes: 1,
          durationMin: 1,
          timeLimitMin: 1,
          settings: 1,

          testId: "$resolvedTestId",
          "test.class": "$test.class",
          "test.subjects": "$test.subjects",
          "test.testType": "$test.testType",
          "test.difficulty": "$test.difficulty",
          "test.createdAt": "$test.createdAt",

          derivedStatus: 1,
          latestAttempt: {
            _id: "$latestAttempt._id",
            status: "$latestAttempt.status",
            startedAt: "$latestAttempt.startedAt",
            submittedAt: "$latestAttempt.submittedAt",
            testId: "$latestAttempt.testId",
            answersCount: {
              $size: { $ifNull: [{ $objectToArray: "$latestAttempt.answers" }, []] },
            },
          },
        },
      },
      { $sort: { createdAt: -1 } },
    ];

    const rows = await TestAssignment.aggregate(pipeline);
    res.json({ ok: true, data: rows });
  } catch (e) {
    console.error("[GET /assignments] aggregation error:", e);
    res.status(500).json({ ok: false, message: "Server error while fetching assignments" });
  }
});

/* ---------------------------------------------
 * GET /api/assignments/:id
 * (detail with populated test)
 * --------------------------------------------- */
router.get("/assignments/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ ok: false, message: "Invalid assignment id" });
    }
    const a = await TestAssignment.findById(id)
      .populate("test", "_id title subjects class testType questions")
      .lean();
    if (!a) return res.status(404).json({ ok: false, message: "Not found" });
    res.json({ ok: true, data: a });
  } catch (e) {
    console.error("[GET /assignments/:id] error:", e);
    res.status(500).json({ ok: false, message: "Failed to fetch assignment" });
  }
});

/* ---------------------------------------------
 * GET /api/assignments/:id/paper
 * (paper only; used by player as a fallback)
 * --------------------------------------------- */
router.get("/assignments/:id/paper", async (req, res) => {
  try {
    const a = await TestAssignment.findById(req.params.id).lean();
    if (!a) return res.status(404).json({ ok: false, message: "Assignment not found" });

    const test = await Questions.findById(a.testId).lean();
    if (!test) return res.status(404).json({ ok: false, message: "Test not found" });

    res.json({ ok: true, data: test });
  } catch (e) {
    console.error("[GET /assignments/:id/paper] error:", e);
    res.status(500).json({ ok: false, message: "Failed to fetch paper" });
  }
});

/* ---------------------------------------------
 * GET /api/assignments/:id/attempt/latest
 * (latest attempt for one assignment + student)
 * --------------------------------------------- */
router.get("/assignments/:id/attempt/latest", async (req, res) => {
  try {
    const assignment = await TestAssignment.findById(req.params.id).lean();
    if (!assignment) return res.status(404).json({ ok: false, message: "Not found" });

    // Prefer explicit studentId; else fall back to the first assignment target
    let userId = null;
    if (req.query.studentId && isValidObjectId(req.query.studentId)) {
      userId = new mongoose.Types.ObjectId(req.query.studentId);
    } else if (Array.isArray(assignment.studentIds) && assignment.studentIds.length) {
      userId = assignment.studentIds[0];
    }

    const q = { assignmentId: assignment._id };
    if (userId) q.userId = userId;

    const [latest] = await Attempt.find(q)
      .sort({ submittedAt: -1, updatedAt: -1, startedAt: -1, _id: -1 })
      .limit(1)
      .lean();

    res.json({ ok: true, data: latest || null });
  } catch (e) {
    console.error("[GET /assignments/:id/attempt/latest] error:", e);
    res.status(500).json({ ok: false, message: "Server error" });
  }
});

/* ---------------------------------------------
 * Create assignment (assign a test to students)
 * POST /api/tests/:testId/assign
 * Body: {
 *   studentIds: [ObjectId|string],
 *   dueAt?: ISO,
 *   note?: string,
 *   // Timer (minutes) — any one of these:
 *   durationMinutes? | durationMin? | timeLimitMin? | settings: { durationMinutes? }
 * }
 * --------------------------------------------- */
router.post("/tests/:testId/assign", async (req, res) => {
  try {
    const { testId } = req.params;
    const { studentIds = [], dueAt, note } = req.body;

    if (!studentIds.length) {
      return res.status(400).json({ ok: false, message: "studentIds is required" });
    }
    if (!isValidObjectId(testId)) {
      return res.status(400).json({ ok: false, message: "Invalid test id" });
    }

    const test = await Questions.findById(testId).lean();
    if (!test) return res.status(404).json({ ok: false, message: "Test not found" });

    const assignedBy = resolveUserId(req);

    // ⬇️ NEW: capture time-limit minutes (or null)
    const limitMin = pickLimitMinutes(req.body || {});
    const settings = req.body?.settings || {};

    const doc = await TestAssignment.create({
      testId: toObjectId(testId),
      studentIds: studentIds.map(toObjectId),
      dueAt: dueAt ? new Date(dueAt) : undefined,
      note: note || "",
      status: "assigned",
      assignedBy: assignedBy || undefined,

      // ⬇️ Persist timer under common keys so FE can read any
      durationMinutes: limitMin ?? undefined,
      durationMin: limitMin ?? undefined,
      timeLimitMin: limitMin ?? undefined,
      settings: limitMin ? { ...(settings || {}), durationMinutes: limitMin } : settings,
    });

    res.status(201).json({ ok: true, id: doc._id });
  } catch (e) {
    console.error("[POST /tests/:testId/assign] error:", e);
    res.status(500).json({ ok: false, message: "Failed to create assignment" });
  }
});

/* ---------------------------------------------
 * Start attempt — create or reuse an Attempt
 * POST /api/assignments/:id/start
 * Body (optional): { testId, studentId, studentEmail }
 * --------------------------------------------- */
router.post("/assignments/:id/start", async (req, res) => {
  try {
    const { studentId: bodyStudentId, studentEmail, testId } = req.body || {};

    // 1) Load assignment
    const a = await TestAssignment.findById(req.params.id).lean();
    if (!a) return res.status(404).json({ ok: false, message: "Assignment not found" });

    // 2) Resolve userId
    let userId =
      (bodyStudentId && toObjectId(bodyStudentId)) ||
      req.user?._id ||
      (Array.isArray(a.studentIds) && a.studentIds[0]);

    if (!userId && studentEmail) {
      const u = await User.findOne({ email: String(studentEmail).trim() }, { _id: 1 }).lean();
      if (u?._id) userId = u._id;
    }
    if (!userId) {
      return res.status(400).json({ ok: false, message: "studentId is required" });
    }

    // 3) Determine testId
    const effectiveTestId = testId || a.testId;
    if (!effectiveTestId) {
      return res.status(400).json({ ok: false, message: "This assignment has no linked test." });
    }

    // 4) Reuse in-progress attempt or create new
    let attempt = await Attempt.findOne({
      userId,
      assignmentId: a._id,
      status: "in_progress",
    });

    if (!attempt) {
      attempt = await Attempt.create({
        userId,
        assignmentId: a._id,
        testId: toObjectId(effectiveTestId),
        status: "in_progress",
        answers: {},
        startedAt: new Date(),
      });
    }

    return res.json({
      ok: true,
      attemptId: String(attempt._id),
      answers: Object.fromEntries(attempt.answers || []),
    });
  } catch (e) {
    console.error("[POST /assignments/:id/start]", e);
    return res.status(500).json({ ok: false, message: "Failed to start attempt" });
  }
});

// GET /api/student/email/:email
router.get("/student/email/:email", async (req, res) => {
  try {
    // Find the student by email
    const student = await User.findOne({ email: req.params.email, role: "student" });
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    // Find all assignments that contain this student's ObjectId
    const assignments = await TestAssignment.find({
      studentIds: student._id
    })
      .populate("testId")
      .populate("studentIds", "email"); // only include email field

      if (!assignments || assignments.length === 0) {
      return res.status(404).json({ message: "No Assigned Test Records Found" });
    }

    res.json({ ok: true, data: assignments });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
