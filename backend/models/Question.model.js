// models/Question.model.js
import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ["mcq", "subjective"], required: true },
    question: { type: String, default: "" },

    // MCQ only
    options: { type: [String], default: undefined },
    correctAnswer: { type: String, default: "" },

    // Subjective only
    suggestedAnswer: { type: String, default: "" },

    marks: { type: Number, min: 0, default: 1 },
  },
  { _id: false }
);

const TestSchema = new mongoose.Schema(
  {
    class: { type: String, required: true }, // "6".."12"
    subjects: {
      type: [String],
      default: [],
      validate: (v) => v.length <= 3,
    },
    testType: {
      type: String,
      enum: ["mcq", "subjective", "mcq+subjective"],
      required: true,
    },
    difficulty: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      required: true,
    },

    // counts (support both single-type and mixed)
    numberOfQuestion: { type: Number, min: 0, default: 0 },
    mcqCount: { type: Number, min: 0, default: 0 },
    subjectiveCount: { type: Number, min: 0, default: 0 },

    // optional (if you later add it to UI)
    mixOrder: { type: String, enum: ["grouped", "alternate"], default: "grouped" },

    // ✅ REQUIRED: who created this test (mentor)
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    questions: { type: [QuestionSchema], default: [] },
  },
  { timestamps: true }
);

export default mongoose.model("Questions", TestSchema);
