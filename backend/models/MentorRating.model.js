import mongoose from "mongoose";

const mentorRatingSchema = new mongoose.Schema(
  {
    mentorEmail: { type: String, required: true, index: true },
    studentEmail: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
  },
  { timestamps: true }
);

// prevent duplicate rating by same student
mentorRatingSchema.index(
  { mentorEmail: 1, studentEmail: 1 },
  { unique: true }
);

export default mongoose.model("MentorRating", mentorRatingSchema);
