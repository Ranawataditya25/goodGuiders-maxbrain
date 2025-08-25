import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

const router = express.Router();

const UPLOAD_DIR = process.env.UPLOAD_DIR || path.resolve("uploads");
fs.mkdirSync(UPLOAD_DIR, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOAD_DIR),
  filename: (_req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname).toLowerCase());
  },
});

const pdfOnly = (_req, file, cb) => {
  if (file.mimetype === "application/pdf") cb(null, true);
  else cb(new Error("Only PDF files are allowed"));
};

const upload = multer({
  storage,
  fileFilter: pdfOnly,
  limits: { fileSize: 20 * 1024 * 1024 }, // 20 MB
});

router.options("/pdf", (_req, res) => res.sendStatus(200));

router.post("/pdf", upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).json({ ok: false, message: "No file" });

  const baseUrl = process.env.PUBLIC_BASE_URL || `${req.protocol}://${req.get("host")}`;
  const url = `${baseUrl}/uploads/${req.file.filename}`;

  return res.json({
    ok: true,
    url,
    name: req.file.originalname,
    size: req.file.size,
    mimetype: req.file.mimetype,
  });
});

router.use((err, _req, res, _next) => {
  res.status(400).json({ ok: false, message: err.message || "Upload error" });
});

export default router;
