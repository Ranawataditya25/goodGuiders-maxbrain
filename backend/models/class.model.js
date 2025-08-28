import mongoose from "mongoose";

const SubTopicSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    onePagePdfUrl: { type: String, default: "" },
    fullPdfUrl: { type: String, default: "" },
  },
  { _id: false }
);

const ChapterSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    onePagePdfUrl: { type: String, default: "" },
    fullPdfUrl: { type: String, default: "" },
    subTopics: { type: [SubTopicSchema], default: [] },
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
    educationBoard: { type: String, trim: true, default: "" },
    name: { type: String, required: true, trim: true },
    subjects: { type: [SubjectSchema], default: [] },
  },
  { timestamps: true }
);

export default mongoose.model("Class", ClassSchema);
