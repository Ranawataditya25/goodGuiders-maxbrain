// routes/material.route.js
import express from "express";
import MentorMaterial from "../models/MentorMaterial.model.js";
import { uploadMaterial } from "../config/multer.js";
import fs from "fs";
import path from "path";

const router = express.Router();

// POST /api/materials/upload
router.post("/upload", uploadMaterial.single("file"), async (req, res) => {
  try {
    if (!req.user || req.user.role !== "mentor") {
      return res.status(403).json({ message: "Only mentors can upload" });
    }

    const { title, description, isPaid, price } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "File required" });
    }

    const material = await MentorMaterial.create({
      mentorEmail: req.user.email, // ✅ FIX
      title,
      description,
      fileUrl: `/uploads/materials/${req.file.filename}`,
      fileType: req.file.mimetype,
      fileSize: req.file.size,
      isPaid: isPaid === "true",
      price: Number(price || 0),
    });

    res.json({ success: true, material });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Upload failed" });
  }
});

// GET /api/materials/mentor/:email
router.get("/mentor/:email", async (req, res) => {
  const materials = await MentorMaterial.find({
    mentorEmail: req.params.email.toLowerCase(),
    isActive: true,
  }).sort({ createdAt: -1 });

  res.json(materials);
});

// POST /api/materials/:id/view
router.post("/:id/view", async (req, res) => {
  try {
    const material = await MentorMaterial.findById(req.params.id);
    if (!material) {
      return res.status(404).json({ message: "Material not found" });
    }

    // 🔐 Only students can increase view count
    if (req.user?.role === "student") {
      material.views += 1;
      await material.save();
    }

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE /api/materials/:id
router.delete("/:id", async (req, res) => {
  try {
    const material = await MentorMaterial.findById(req.params.id);
    if (!material) {
      return res.status(404).json({ message: "Material not found" });
    }
    // 🔐 Allow admin OR the mentor who uploaded it
    if (
      req.user?.role !== "admin" &&
      !(req.user?.role === "mentor" && req.user.email === material.mentorEmail)
    ) {
      return res.status(403).json({ message: "Not allowed" });
    }

    // delete file from disk
    const filePath = path.join(process.cwd(), material.fileUrl);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await material.deleteOne();

    res.json({ success: true, message: "Material deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


export default router;
