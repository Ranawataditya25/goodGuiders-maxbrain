import mongoose from "mongoose";

const PdfEvaluationSchema = new mongoose.Schema(
  {
    assignmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TestAssignment", // 🔧 FIXED reference
      required: true,
      index: true,
    },

    testId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Questions",
      required: true,
    },

    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // PDFs
    questionPdfUrl: { type: String, required: true },
    answerPdfUrl: { type: String, required: true },

    // mentor assignment (ONE mentor at a time)
    mentorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    mentorAssignedAt: { type: Date },
    mentorDeadline: { type: Date },

    status: {
      type: String,
      enum: [
        "pending_admin",     // student submitted
        "assigned_mentor",   // admin assigned mentor
        "accepted",          // mentor accepted
        "rejected",          // mentor rejected
        "evaluated",         // mentor submitted evaluation
        "expired",           // deadline passed
      ],
      default: "pending_admin",
      index: true,
    },

    evaluation: {
      marks: { type: String },
      feedback: { type: String },
      evaluatedAt: { type: Date, default: Date.now},
    },
  },
  { timestamps: true }
);

export default mongoose.model("PdfEvaluation", PdfEvaluationSchema);