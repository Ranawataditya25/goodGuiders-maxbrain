// config/multer.js
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: "uploads/materials",
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

export const uploadMaterial = multer({
  storage,
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB
});