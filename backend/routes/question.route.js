// routes/question.route.js
import { Router } from "express";
import mongoose from "mongoose";
import Question from "../models/Question.model.js";
import { uploadQuestionPdf } from "../config/questionMulter.js";

const router = Router();

const isValidObjectId = (v) => mongoose.isValidObjectId(v);

// keep max 3, trim empties
const cleanSubjects = (arr) =>
  Array.isArray(arr)
    ? arr.map((s) => String(s).trim()).filter(Boolean).slice(0, 3)
    : [];

/**
 * Resolve a user id to stamp as createdBy.
 * Prefer req.user (from dev shim), then x-user-id header (ObjectId).
 * Avoid trusting body.createdBy in production; allowed here for dev fallback.
 */
const resolveCreatorId = async (req) => {
  if (req.user?._id) return req.user._id;

  const headerId = req.header("x-user-id");
  if (headerId && isValidObjectId(headerId)) {
    return new mongoose.Types.ObjectId(headerId);
  }

  // OPTIONAL DEV FALLBACK: allow body.createdBy (ObjectId)
  const bodyId = req.body?.createdBy;
  if (bodyId && isValidObjectId(bodyId)) {
    return new mongoose.Types.ObjectId(bodyId);
  }

  return undefined;
};

/* ---------------------------------------------
 * POST /api/questions
 * Create a test/paper and stamp createdBy (mentor)
 * --------------------------------------------- */
router.post("/", async (req, res) => {
  try {
    const body = req.body || {};

    if (!body.class) throw new Error("class is required");
    if (!body.testType) throw new Error("testType is required");
    if (!body.difficulty) throw new Error("difficulty is required");
    if (!Array.isArray(body.questions)) throw new Error("questions must be an array");

    const createdBy = await resolveCreatorId(req);
    if (!createdBy) {
      return res.status(401).json({
        ok: false,
        message:
          "Missing creator id. Send 'x-user-id' (Mongo ObjectId) or login so req.user is set.",
      });
    }

    const doc = await Question.create({
      ...body,                       // ✅ fixed spread
      createdBy,                     // ✅ persisted
      subjects: cleanSubjects(body.subjects),
    });

    res.status(201).json({ ok: true, id: doc._id });
  } catch (err) {
    console.error("[POST /api/questions] error:", err);
    res.status(400).json({ ok: false, message: err.message || "Invalid payload" });
  }
});

router.post(
  "/pdf",
  uploadQuestionPdf.single("questionPaper"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "Question PDF required" });
      }

      const createdBy = await resolveCreatorId(req);
      if (!createdBy) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const doc = await Question.create({
        class: req.body.class,
        testType: "subjective_pdf",
        difficulty: req.body.difficulty,
        subjects: cleanSubjects(JSON.parse(req.body.subjects || "[]")),
        createdBy,
        questions: [],
        questionPaper: {
          fileUrl: `/uploads/questions/${req.file.filename}`,
          originalName: req.file.originalname,
        },
      });

      res.status(201).json({ ok: true, id: doc._id });
    } catch (err) {
      console.error(err);
      res.status(400).json({ message: err.message });
    }
  }
);

/* ---------------------------------------------
 * GET /api/questions
 * List tests (optional filters)
 *   - ?mine=1 -> only tests created by req.user (or x-user-id)
 *   - ?createdBy=<ObjectId> -> tests by a specific mentor
 * --------------------------------------------- */
router.get("/", async (req, res) => {
  try {
    const { mine, createdBy } = req.query;
    const filter = {};

    if (String(mine) === "1" && req.user?._id) {
      filter.createdBy = req.user._id;
    }

    if (createdBy && isValidObjectId(createdBy)) {
      filter.createdBy = new mongoose.Types.ObjectId(createdBy);
    }

    // omit heavy `questions` array for list view
    const docs = await Question.find(filter, { questions: 0 })
      .sort({ createdAt: -1 })
      .lean();

    res.json({ ok: true, data: docs });
  } catch (e) {
    console.error("[GET /api/questions] error:", e);
    res.status(500).json({ ok: false, message: "Failed to fetch tests" });
  }
});

/* ---------------------------------------------
 * GET /api/questions/:id
 * Fetch a single test with all questions
 * --------------------------------------------- */
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ ok: false, message: "Invalid id" });
    }

    const doc = await Question.findById(id).lean();
    if (!doc) return res.status(404).json({ ok: false, message: "Not found" });

    res.json({ ok: true, data: doc });
  } catch (e) {
    console.error("[GET /api/questions/:id] error:", e);
    res.status(500).json({ ok: false, message: "Failed to fetch test" });
  }
});

export default router;
