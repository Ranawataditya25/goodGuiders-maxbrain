import mongoose from "mongoose";

const mentorCommentSchema = new mongoose.Schema(
  {
    mentorEmail: { type: String, required: true, index: true },
    studentEmail: { type: String, required: true },
    studentName: { type: String, required: true },
    comment: { type: String, required: true, maxlength: 500 },
    isDeleted: { type: Boolean, default: false }, // admin soft-delete
    deletedBy: { type: String }, // admin email
  },
  { timestamps: true }
);

export default mongoose.model("MentorComment", mentorCommentSchema);