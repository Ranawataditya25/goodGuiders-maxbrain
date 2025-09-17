import mongoose from "mongoose";

const ReferralSchema = new mongoose.Schema(
  {
    referrerName: { type: String, required: true },
    referrerEmail: { type: String, required: true, lowercase: true, trim: true },
    friendName: { type: String, required: true },
    friendEmail: { type: String, required: true, lowercase: true, trim: true },
  },
  { timestamps: true }
);

export default mongoose.model("Referral", ReferralSchema);
