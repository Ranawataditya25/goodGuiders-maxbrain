// routes/questionPaper.route.js
import express from "express";
import QuestionPaper from "../models/Question.model.js";

const router = express.Router();

// ✅ Get all question papers but remove correctAnswer & suggestedAnswer
router.get("/", async (req, res) => {
  try {
    // projection: exclude `questions.correctAnswer` and `questions.suggestedAnswer`
    const papers = await QuestionPaper.find(
      {},
      {
        "questions.correctAnswer": 0,
        "questions.suggestedAnswer": 0,
      }
    ).lean();

    res.json({ ok: true, data: papers });
  } catch (err) {
    console.error("Error fetching question papers:", err);
    res.status(500).json({ ok: false, message: "Server error" });
  }
});

export default router;
