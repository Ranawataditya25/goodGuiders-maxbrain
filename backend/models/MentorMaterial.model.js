// models/MentorMaterial.model.js
import mongoose from "mongoose";

const MentorMaterialSchema = new mongoose.Schema(
  {
    mentorEmail: { type: String, required: true },
    title: { type: String, required: true },
    description: String,

    fileUrl: { type: String, required: true }, // 🔥 THIS IS KEY
    fileType: String, // pdf / ppt / doc
    fileSize: Number,

    views: { type: Number, default: 0 },

    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("MentorMaterial", MentorMaterialSchema);
