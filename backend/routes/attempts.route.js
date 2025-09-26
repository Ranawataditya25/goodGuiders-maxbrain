// routes/attempts.route.js
import { Router } from "express";
import mongoose from "mongoose";
import Attempt from "../models/Attempt.model.js";
import Questions from "../models/Question.model.js";   // collection: "questions"
import Submission from "../models/Submission.model.js"; // collection: "submissions"

const router = Router();
const isValidObjectId = (v) => mongoose.isValidObjectId(v);

/**
 * GET /api/attempts
 * Query:
 *   ?assignmentId=<id>   (optional)
 *   ?studentId=<id>      (optional)
 *   ?limit=1&sort=desc   (optional; sort by submittedAt/updatedAt/startedAt)
 */
router.get("/attempts", async (req, res) => {
  try {
    const { assignmentId, studentId, limit = "50", sort = "desc" } = req.query;
    const q = {};
    if (assignmentId) q.assignmentId = assignmentId;
    if (studentId) q.userId = studentId;

    const sorter =
      String(sort).toLowerCase() === "asc"
        ? { submittedAt: 1, updatedAt: 1, startedAt: 1, _id: 1 }
        : { submittedAt: -1, updatedAt: -1, startedAt: -1, _id: -1 };

    const docs = await Attempt.find(q).sort(sorter).limit(Number(limit)).lean();
    res.json({ ok: true, data: docs });
  } catch (e) {
    res.status(500).json({ ok: false, message: e?.message || "Server error" });
  }
});

/**
 * GET /api/attempts/:id
 * Return the attempt with current answers (used to hydrate the player).
 */
router.get("/attempts/:id", async (req, res) => {
  const attempt = await Attempt.findById(req.params.id);
  if (!attempt) return res.status(404).send("Attempt not found");
  res.json({
    ok: true,
    data: {
      _id: attempt._id,
      assignmentId: attempt.assignmentId,
      testId: attempt.testId,
      status: attempt.status,
      answers: Object.fromEntries(attempt.answers || []),
      startedAt: attempt.startedAt,
      submittedAt: attempt.submittedAt,
      updatedAt: attempt.updatedAt,
      createdAt: attempt.createdAt,
    },
  });
});

/**
 * POST /api/attempts/:id/save
 * Body: { answers: { [qid]: value }, merge: boolean }
 * - merge=true: apply delta
 * - merge=false: replace whole answers map
 */
router.post("/attempts/:id/save", async (req, res) => {
  const { answers = {}, merge = true } = req.body || {};

  const saveAttempt = async ({ id, answers, merge }) => {
    try {
      const attempt = await Attempt.findById(id);
      if (!attempt) {
        return { status: 404, body: { ok: false, message: "Attempt not found" } };
      }

      if (merge) {
        Object.entries(answers || {}).forEach(([k, v]) => attempt.answers.set(String(k), String(v)));
      } else {
        attempt.answers = new Map(Object.entries(answers || {}).map(([k, v]) => [String(k), String(v)]));
      }
      attempt.status = "in_progress";
      await attempt.save();

      return {
        status: 200,
        body: { ok: true, data: { _id: attempt._id, savedAt: new Date().toISOString() } },
      };
    } catch (e) {
      console.error("[POST /attempts/:id/save] error:", e);
      return { status: 500, body: { ok: false, message: "Failed to save attempt" } };
    }
  };

  const out = await saveAttempt({ id: req.params.id, answers, merge });
  return res.status(out.status).send(out.body);
});

/**
 * Fallbacks some servers/APIs use (PATCH/POST/PUT /attempts/:id)
 * Default to merge=false (full snapshot) unless explicitly provided.
 */
const upsert = async (req, res) => {
  const { answers = {}, merge = false } = req.body || {};
  try {
    const attempt = await Attempt.findById(req.params.id);
    if (!attempt) {
      return res.status(404).json({ ok: false, message: "Attempt not found" });
    }
    if (merge) {
      Object.entries(answers || {}).forEach(([k, v]) => attempt.answers.set(String(k), String(v)));
    } else {
      attempt.answers = new Map(Object.entries(answers || {}).map(([k, v]) => [String(k), String(v)]));
    }
    attempt.status = "in_progress";
    await attempt.save();
    return res.json({ ok: true, data: { _id: attempt._id, savedAt: new Date().toISOString() } });
  } catch (e) {
    console.error("[UPSERT /attempts/:id] error:", e);
    return res.status(500).json({ ok: false, message: "Failed to save attempt" });
  }
};
router.patch("/attempts/:id", upsert);
router.post("/attempts/:id", upsert);
router.put("/attempts/:id", upsert);

/**
 * POST /api/attempts/:id/submit
 * Body: { answers?: {...} }
 * - stores final answers
 * - marks attempt as 'submitted' and sets submittedAt
 * - returns a simple score (if the test is MCQ-only it can be exact)
 */
router.post("/attempts/:id/submit", async (req, res) => {
  try {
    const { answers = null, userEmail = null } = req.body || {};
    const attempt = await Attempt.findById(req.params.id);
    if (!attempt) return res.status(404).json({ ok: false, message: "Attempt not found" });

    if (answers && typeof answers === "object") {
      Object.entries(answers).forEach(([k, v]) => attempt.answers.set(String(k), String(v)));
    }

    attempt.status = "submitted";
    attempt.submittedAt = new Date();
    await attempt.save();

    // Try to compute a simple score (best-effort)
    let total = 0;
    let score = 0;
    const details = [];

    let test = null;
    try {
      if (isValidObjectId(attempt.testId)) {
        test = await Questions.findById(attempt.testId).lean();
      }
    } catch {}

    const qs =
      (test && Array.isArray(test.questions) ? test.questions : []) ||
      []; // if no paper found, we still mark as submitted

    qs.forEach((q, idx) => {
      const type = (q.type || "mcq").toLowerCase();
      const max = Number(q.marks || q.points || 1) || 1;
      total += max;

      const val = attempt.answers.get(String(idx));
      let correct = false;

      if (type === "mcq") {
        let correctKey = null;
        if (q.correctOption != null) correctKey = String(q.correctOption);
        else if (q.answerKey != null) correctKey = String(q.answerKey);
        else if (Array.isArray(q.options)) {
          const i = q.options.findIndex((o) => (o && (o.isCorrect === true || o.correct === true)));
          if (i >= 0) correctKey = String(i);
        }
        if (val != null && correctKey != null) {
          correct = String(val) === String(correctKey);
        }
      } else {
        // subjective: we cannot auto-grade; give 0-by-default
        correct = false;
      }

      score += correct ? max : 0;
      details.push({ index: idx, correct, earned: correct ? max : 0, max });
    });

    // (Optional) also store a Submission document; non-blocking if it fails
    try {
      await Submission.create({
        userEmail: attempt.userEmail || req.user?.email || userEmail || "unknown@local",
        class: test?.class,
        subjects: test?.subjects || [],
        type: test?.testType,
        answers: qs.map((q, idx) => {
          const val = attempt.answers.get(String(idx));
          if ((q.type || "mcq").toLowerCase() === "mcq") {
            const i = Number(val);
            const selected = Array.isArray(q.options) ? q.options[i] : undefined;
            return { questionId: q._id || q.id, type: "mcq", selectedAnswer: selected, writtenAnswer: undefined };
          }
          return { questionId: q._id || q.id, type: "subjective", selectedAnswer: undefined, writtenAnswer: val || "" };
        }),
        submittedAt: new Date(),
      });
    } catch (e) {
      console.warn("[Submission.create] non-blocking error:", e.message);
    }

    return res.json({ ok: true, total, score, details });
  } catch (e) {
    console.error("[POST /attempts/:id/submit] error:", e);
    res.status(500).json({ ok: false, message: "Failed to submit attempt" });
  }
});

export default router;
