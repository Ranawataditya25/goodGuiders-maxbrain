// models/Attempt.model.js
import mongoose from "mongoose";

const AttemptSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, index: true },
    assignmentId: { type: mongoose.Schema.Types.ObjectId, required: true, index: true },
    testId: { type: mongoose.Schema.Types.ObjectId, required: false },

    // Store answers as a Map<string, string>, e.g. { "0": "2" }
    answers: { type: Map, of: String, default: {} },

    answerPdfUrl: {
      fileUrl: { type: String },
      originalName: { type: String },
    },

    status: {
      type: String,
      enum: ["in_progress", "submitted"],
      default: "in_progress",
      index: true,
    },

    startedAt: { type: Date, default: Date.now },
    submittedAt: { type: Date },
  },
  { timestamps: true }
);

const Attempt = mongoose.model("Attempt", AttemptSchema);
export default Attempt;
