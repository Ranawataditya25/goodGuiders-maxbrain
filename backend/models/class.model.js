// server/models/class.model.js
import mongoose from "mongoose";

const ChapterSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    onePagePdfUrl: { type: String, default: "" }, // NEW
    fullPdfUrl: { type: String, default: "" },    // NEW
  },
  { _id: false }
);

const SubjectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    chapters: { type: [ChapterSchema], default: [] },
  },
  { _id: false }
);

const ClassSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    subjects: { type: [SubjectSchema], default: [] },
  },
  { timestamps: true }
);

export default mongoose.model("Class", ClassSchema);
