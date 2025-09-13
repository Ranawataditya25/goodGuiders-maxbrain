import express from "express";
import Submission from "../models/Submission.model.js";
import Questions from "../models/Question.model.js";
import TestAssignment from "../models/TestAssignment.model.js";
import mongoose from "mongoose";

const router = express.Router();

/**
 * @route   POST /api/tests/:assignmentId/submit
 * @desc    Submit answers for a test assignment
 * @access  Public (or add auth middleware if needed)
 */
router.post("/tests/:assignmentId/submit", async (req, res) => {
  try {
    const { assignmentId } = req.params;
    const { userEmail, answers } = req.body;

    if (!userEmail || !answers) {
      return res
        .status(400)
        .json({ ok: false, message: "Missing required fields" });
    }

    // 1️⃣ Get assignment
    const assignment = await TestAssignment.findById(assignmentId).lean();
    if (!assignment) {
      return res
        .status(404)
        .json({ ok: false, message: "Assignment not found" });
    }

    // 2️⃣ Get test linked to assignment
    const test = await Questions.findById(assignment.testId).lean();
    if (!test) {
      return res.status(404).json({ ok: false, message: "Test not found" });
    }

    // 3️⃣ Validate answers length
    const answered = Object.keys(answers).length;
    const required = test.questions.length;

    if (answered !== required) {
      return res.status(400).json({
        ok: false,
        message: `You must answer all questions. Answered: ${answered}, NotAnswered: ${
          required - answered
        }, Total: ${required}`,
      });
    }

    // 4️⃣ Transform answers into schema format
    const formattedAnswers = test.questions.map((q, index) => {
      const ans = answers[index];
      return {
        questionId: q._id || new mongoose.Types.ObjectId(),
        type: q.type,
        selectedAnswer: q.type === "mcq" ? String(ans) : undefined,
        writtenAnswer: q.type === "subjective" ? String(ans) : undefined,
      };
    });

    // 5️⃣ Save submission
    const submission = new Submission({
      userEmail,
      class: test.class,
      subjects: test.subjects,
      type: test.testType,
      answers: formattedAnswers,
    });

    await submission.save();

    return res.status(201).json({
      ok: true,
      message: "Test submitted successfully",
      submissionId: submission._id,
    });
  } catch (error) {
    console.error("[POST /tests/:assignmentId/submit] error:", error);
    return res
      .status(500)
      .json({ ok: false, message: "Failed to submit test" });
  }
});

export default router;
