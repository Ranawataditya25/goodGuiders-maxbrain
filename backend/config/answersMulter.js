import multer from "multer";
import path from "path";
import fs from "fs";

const answersDir = "uploads/answers";
fs.mkdirSync(answersDir, { recursive: true });

const storage = multer.diskStorage({
  destination: answersDir,
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

export const uploadAnswerPdf = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== "application/pdf") {
      cb(new Error("Only PDF allowed"));
    } else {
      cb(null, true);
    }
  },
});