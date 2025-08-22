// routes/attempts.route.js
import { Router } from "express";
import Attempt from "../models/Attempt.model.js";
import Questions from "../models/Question.model.js";   // collection: "questions"
import Submission from "../models/Submission.model.js"; // collection: "submissions"

const router = Router();

/**
 * GET /api/attempts/:id
 * Return the attempt with current answers (used to hydrate the player).
 */
router.get("/attempts/:id", async (req, res) => {
  const attempt = await Attempt.findById(req.params.id);
  if (!attempt) return res.status(404).send("Attempt not found");
  res.json({
    data: {
      _id: attempt._id,
      answers: Object.fromEntries(attempt.answers || []),
      status: attempt.status,
      assignmentId: attempt.assignmentId,
      testId: attempt.testId,
      startedAt: attempt.startedAt,
      submittedAt: attempt.submittedAt,
    },
  });
});

/**
 * Core save logic (merge or replace).
 */
async function saveAttempt({ id, answers = {}, merge = false }) {
  const attempt = await Attempt.findById(id);
  if (!attempt) return { status: 404, body: "Attempt not found" };
  if (attempt.status === "submitted") {
    return { status: 409, body: "Attempt already submitted" };
  }

  if (merge) {
    for (const [k, v] of Object.entries(answers)) {
      attempt.answers.set(String(k), String(v));
    }
  } else {
    attempt.answers = new Map(
      Object.entries(answers).map(([k, v]) => [String(k), String(v)])
    );
  }

  await attempt.save();
  return { status: 200, body: { ok: true, answers: Object.fromEntries(attempt.answers) } };
}

/**
 * Preferred route used by the frontend autosave/manual save.
 * POST /api/attempts/:id/save
 * Body: { answers: { [qid]: "optKey" }, merge: true|false }
 */
router.post("/attempts/:id/save", async (req, res) => {
  const { answers = {}, merge = false } = req.body || {};
  const out = await saveAttempt({ id: req.params.id, answers, merge });
  return res.status(out.status).send(out.body);
});

/**
 * Fallbacks some servers/APIs use (PATCH/POST/PUT /attempts/:id)
 * Default to merge=false (full snapshot) unless explicitly provided.
 */
const upsert = async (req, res) => {
  const { answers = {}, merge = false } = req.body || {};
  const out = await saveAttempt({ id: req.params.id, answers, merge });
  return res.status(out.status).send(out.body);
};
router.patch("/attempts/:id", upsert);
router.post("/attempts/:id", upsert);
router.put("/attempts/:id", upsert);

/**
 * Submit (finalize and block further saves).
 * POST /api/attempts/:id/submit
 * Body (optional): { answers: {...} } to include last snapshot.
 */
router.post("/attempts/:id/submit", async (req, res) => {
  const { answers } = req.body || {};
  const attempt = await Attempt.findById(req.params.id);
  if (!attempt) return res.status(404).send("Attempt not found");
  if (attempt.status === "submitted") return res.status(409).send("Already submitted");

  // Merge final snapshot if provided
  if (answers && typeof answers === "object") {
    for (const [k, v] of Object.entries(answers)) {
      attempt.answers.set(String(k), String(v));
    }
  }

  attempt.status = "submitted";
  attempt.submittedAt = new Date();
  await attempt.save(); // -> persists answers/status in **attempts** collection
  //                                     ^^^^^^^^^   see Attempt model
  //                                     (answers is Map<string,string>) :contentReference[oaicite:5]{index=5}

  // ------- Score using your Questions schema -------
  // In your schema each test has { questions: [{ type, options: [String], correctAnswer: String, marks }] }
  const test = attempt.testId ? await Questions.findById(attempt.testId).lean() : null;
  const qs = test?.questions || []; // schema: "Question" model, field `questions` :contentReference[oaicite:6]{index=6}

  let total = 0;
  let score = 0;
  const details = [];

  qs.forEach((q, idx) => {
    const max = Number(q.marks ?? 1) || 1;         // marks default 1 in your schema :contentReference[oaicite:7]{index=7}
    total += max;

    if (q.type === "mcq") {
      // front-end stores the **option index** as the answer key when options are strings
      const userKey = attempt.answers.get(String(idx));
      const optIdx = userKey != null ? Number(userKey) : NaN;
      const userText = Number.isInteger(optIdx) ? q.options?.[optIdx] : undefined; // options is [String] :contentReference[oaicite:8]{index=8}

      const ok =
        typeof userText === "string" &&
        typeof q.correctAnswer === "string" &&                           // correctAnswer is a string in your schema :contentReference[oaicite:9]{index=9}
        userText.trim().toLowerCase() === q.correctAnswer.trim().toLowerCase();

      if (ok) score += max;
      details.push({ idx, type: "mcq", correct: ok, earned: ok ? max : 0, max });
    } else {
      // subjective: exact match against suggestedAnswer if you want (optional)
      const userText = attempt.answers.get(String(idx)) || "";
      const ref = (q.suggestedAnswer || "").trim().toLowerCase();        // suggestedAnswer exists in schema :contentReference[oaicite:10]{index=10}
      const ok = ref && userText.trim().toLowerCase() === ref;
      if (ok) score += max;
      details.push({ idx, type: "subjective", correct: ok, earned: ok ? max : 0, max });
    }
  });

  // ------- (Optional) also store a Submission document -------
  try {
    await Submission.create({
      userEmail: req.user?.email || "unknown@local",
      class: test?.class,
      subjects: test?.subjects || [],
      type: test?.testType,
      answers: qs.map((q, idx) => {
        const val = attempt.answers.get(String(idx));
        if (q.type === "mcq") {
          const i = Number(val);
          const selectedAnswer = Number.isInteger(i) && Array.isArray(q.options) ? q.options[i] : undefined;
          return { questionId: undefined, type: "mcq", selectedAnswer, writtenAnswer: undefined };
        }
        return { questionId: undefined, type: "subjective", selectedAnswer: undefined, writtenAnswer: val || "" };
      }),
      submittedAt: new Date(),
    });
  } catch (e) {
    console.warn("[Submission.create] non-blocking error:", e.message);
  }

  return res.json({ ok: true, total, score, details });
});


export default router;
