import mongoose from "mongoose";

const answerSchema = new mongoose.Schema(
  {
    questionId: { type: mongoose.Schema.Types.ObjectId, ref: "Question" },
    type: String,
    selectedAnswer: String,
    writtenAnswer: String,
  },
  { _id: false } // 👈 disables auto _id for this subdocument
);

const submissionSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  class: String,
  subjects: [String],
  type: String,
  answers: [answerSchema],
  submittedAt: { type: Date, default: Date.now },
});

export default mongoose.model("Submission", submissionSchema);
