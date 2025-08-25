// routes/questionPaper.route.js
import express from "express";
import QuestionPaper from "../models/Question.model.js";

const router = express.Router();

// Get all question papers/questions but remove correctAnswer & suggestedAnswer
router.get("/", async (req, res) => {
  try {
    // Exclude top-level correctAnswer/suggestedAnswer AND nested ones
    const papers = await QuestionPaper.find(
      {},
      {
        correctAnswer: 0,
        suggestedAnswer: 0,
        "questions.correctAnswer": 0,
        "questions.suggestedAnswer": 0,
      }
    )
      .sort({ createdAt: -1 }) // newest first
      .lean();

    res.json({ ok: true, data: papers });
  } catch (err) {
    console.error("Error fetching question papers:", err);
    res.status(500).json({ ok: false, message: "Server error" });
  }
});

export default router;
