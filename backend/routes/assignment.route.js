import { Router } from "express";
import mongoose from "mongoose";
import Questions from "../models/Question.model.js";
import User from "../models/User.model.js";
import TestAssignment from "../models/TestAssignment.model.js";
import Attempt from "../models/Attempt.model.js";

const router = Router();

const isValidObjectId = (v) => mongoose.isValidObjectId(v);
const toObjectId = (v) => (isValidObjectId(v) ? new mongoose.Types.ObjectId(v) : v);

/* ---------------------------------------------
 * Simple lists (you already had these)
 * --------------------------------------------- */
router.get("/tests", async (_req, res) => {
  const docs = await Questions.find({}, { questions: 0 })
    .sort({ createdAt: -1 })
    .lean();
  res.json({ ok: true, data: docs });
});

router.get("/students", async (_req, res) => {
  const students = await User.find({ role: "student" }, { password: 0 })
    .sort({ name: 1 })
    .lean();
  res.json({ ok: true, data: students });
});

/* ---------------------------------------------
 * NEW: single test by id (used by TestPlayer)
 * --------------------------------------------- */
router.get("/tests/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ ok: false, message: "Invalid test id" });
    }
    const test = await Questions.findById(id).lean();
    if (!test) return res.status(404).json({ ok: false, message: "Test not found" });
    return res.json({ ok: true, data: test });
  } catch (e) {
    console.error("[GET /tests/:id] error:", e);
    res.status(500).json({ ok: false, message: "Failed to fetch test" });
  }
});

/* ---------------------------------------------
 * Create assignment (unchanged)
 * --------------------------------------------- */
router.post("/tests/:testId/assign", async (req, res) => {
  try {
    const { testId } = req.params;
    const { studentIds = [], dueAt, note } = req.body;

    if (!studentIds.length) {
      return res.status(400).json({ ok: false, message: "Select at least one student" });
    }

    const test = await Questions.findById(testId).lean();
    if (!test) return res.status(404).json({ ok: false, message: "Test not found" });

    const doc = await TestAssignment.create({
      testId: toObjectId(testId),
      studentIds: studentIds.map(toObjectId),
      dueAt: dueAt ? new Date(dueAt) : undefined,
      note: note || "",
      status: "assigned",
      assignedBy: req.user?._id || undefined,
    });

    res.status(201).json({ ok: true, id: doc._id });
  } catch (e) {
    console.error("[assign] create error:", e);
    res.status(500).json({ ok: false, message: "Failed to create assignment" });
  }
});

/* ---------------------------------------------
 * Fetch assignments list (unchanged)
 * --------------------------------------------- */
router.get("/assignments", async (req, res) => {
  try {
    const { studentId: rawStudentId, studentEmail, testId: rawTestId, id } = req.query;

    if (id && isValidObjectId(id)) {
      const a = await TestAssignment.findById(id)
        .populate("test", "_id title subjects class testType questions")
        .lean();
      if (!a) return res.status(404).json({ ok: false, message: "Not found" });
      return res.json({ ok: true, data: a });
    }

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
      {
        $lookup: {
          from: "questions",
          localField: "testId",
          foreignField: "_id",
          as: "test",
        },
      },
      { $unwind: { path: "$test", preserveNullAndEmptyArrays: true } },
      {
        $project: {
          studentIds: 1,
          dueAt: 1,
          status: 1,
          note: 1,
          createdAt: 1,
          updatedAt: 1,
          testId: { $ifNull: ["$test._id", "$testId"] },
          "test.class": "$test.class",
          "test.subjects": "$test.subjects",
          "test.testType": "$test.testType",
          "test.difficulty": "$test.difficulty",
          "test.createdAt": "$test.createdAt",
        },
      },
      { $sort: { createdAt: -1 } },
    ];

    const rows = await TestAssignment.aggregate(pipeline);
    res.json({ ok: true, data: rows });
  } catch (e) {
    console.error("[assignments] aggregation error:", e);
    res.status(500).json({ ok: false, message: "Server error while fetching assignments" });
  }
});

/* ---------------------------------------------
 * Student-specific list (unchanged)
 * --------------------------------------------- */
router.get("/students/:studentId/assignments", async (req, res) => {
  try {
    const studentIdStr = String(req.params.studentId || "").trim();

    const orConds = [];
    if (studentIdStr) {
      orConds.push({ studentIdsStr: studentIdStr });
      if (isValidObjectId(studentIdStr)) {
        orConds.push({ studentIds: new mongoose.Types.ObjectId(studentIdStr) });
      }
    }

    const pipeline = [
      {
        $addFields: {
          studentIdsStr: {
            $map: {
              input: "$studentIds",
              as: "sid",
              in: {
                $cond: [
                  { $eq: [{ $type: "$$sid" }, "string"] },
                  { $toObjectId: "$$sid" },
                  "$$sid",
                ],
              },
            },
          },
        },
      },
      ...(orConds.length ? [{ $match: { $or: orConds } }] : []),
      {
        $lookup: {
          from: "questions",
          localField: "testId",
          foreignField: "_id",
          as: "test",
        },
      },
      { $unwind: { path: "$test", preserveNullAndEmptyArrays: true } },
      {
        $project: {
          studentIds: 1,
          dueAt: 1,
          status: 1,
          createdAt: 1,
          testId: { $ifNull: ["$test._id", "$testId"] },
          "test.class": "$test.class",
          "test.subjects": "$test.subjects",
          "test.testType": "$test.testType",
          "test.difficulty": "$test.difficulty",
        },
      },
      { $sort: { createdAt: -1 } },
    ];

    const rows = await TestAssignment.aggregate(pipeline);
    res.json({ ok: true, data: rows });
  } catch (e) {
    console.error("[students/:id/assignments] aggregation error:", e);
    res.status(500).json({ ok: false, message: "Server error while fetching assignments" });
  }
});

/* ---------------------------------------------
 * Single assignment & paper (unchanged)
 * --------------------------------------------- */
router.get("/assignments/:id", async (req, res) => {
  try {
    const a = await TestAssignment.findById(req.params.id).lean();
    if (!a) return res.status(404).json({ ok: false, message: "Not found" });

    let test = null;
    if (a.testId) {
      test = await Questions.findById(a.testId).lean();
      if (!test && typeof a.testId === "string" && isValidObjectId(a.testId)) {
        test = await Questions.findById(toObjectId(a.testId)).lean();
      }
    }

    res.json({ ok: true, data: { ...a, test: test || null } });
  } catch (e) {
    console.error("[GET /assignments/:id]", e);
    res.status(500).json({ ok: false, message: "Failed to fetch assignment" });
  }
});

router.get("/assignments/:id/paper", async (req, res) => {
  try {
    const a = await TestAssignment.findById(req.params.id).lean();
    if (!a) return res.status(404).json({ ok: false, message: "Not found" });

    let test = null;
    if (a.testId) {
      test = await Questions.findById(a.testId).lean();
      if (!test && typeof a.testId === "string" && isValidObjectId(a.testId)) {
        test = await Questions.findById(toObjectId(a.testId)).lean();
      }
    }

    if (!test) return res.status(404).json({ ok: false, message: "No test linked" });
    res.json({ ok: true, data: test });
  } catch (e) {
    console.error("[GET /assignments/:id/paper]", e);
    res.status(500).json({ ok: false, message: "Failed to fetch paper" });
  }
});

/* ---------------------------------------------
 * ✅ FIXED: Start attempt — create or reuse a real Attempt
 * POST /api/assignments/:id/start
 * Body (optional): { testId, studentId, studentEmail }
 * --------------------------------------------- */
router.post("/assignments/:id/start", async (req, res) => {
  try {
    const { userId: bodyUserId, studentEmail, testId } = req.body || {};

    // 1) Load assignment and linked test
    const a = await TestAssignment.findById(req.params.id).lean();
    if (!a) return res.status(404).json({ ok: false, message: "Assignment not found" });

    const effectiveTestId = testId || a.testId;
    if (!effectiveTestId) {
      return res.status(400).json({ ok: false, message: "This assignment has no linked test." });
    }

    // 2) Resolve userId (prefer body/req.user, else first student on the assignment)
    let userId = bodyUserId || req.user?._id || (Array.isArray(a.studentIds) && a.studentIds[0]);
    if (!userId && studentEmail) {
      const u = await User.findOne({ email: String(studentEmail).trim() }, { _id: 1 }).lean();
      if (u?._id) userId = u._id;
    }
    if (!userId) {
      return res.status(400).json({ ok: false, message: "No userId / student context to start attempt." });
    }

    // 3) Find in-progress attempt or create a new one
    let attempt = await Attempt.findOne({
      userId,
      assignmentId: a._id,
      status: "in_progress",
    });

    if (!attempt) {
      attempt = await Attempt.create({
        userId,
        assignmentId: a._id,
        testId: effectiveTestId,
        answers: {},
        status: "in_progress",
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


    res.json({ ok: true, data: assignments });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


export default router;
