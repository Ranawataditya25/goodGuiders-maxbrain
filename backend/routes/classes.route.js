import express from "express";
import ClassModel from "../models/class.model.js";

const router = express.Router();

const validate = (body) => {
  const { name, subjects } = body || {};
  if (!name?.trim()) return "Class name is required.";
  if (!Array.isArray(subjects) || subjects.length === 0) return "At least one subject is required.";
  for (const s of subjects) {
    if (!s?.name?.trim()) return "Each subject must have a name.";
    if (!Array.isArray(s.chapters) || s.chapters.length === 0) return "Each subject must have at least one chapter.";
    for (const c of s.chapters) {
      if (!c?.name?.trim()) return "Each chapter must have a name.";
    }
  }
  return "";
};

// CREATE
router.post("/", async (req, res) => {
  try {
    const err = validate(req.body);
    if (err) return res.status(400).json({ ok: false, message: err });
    const doc = await ClassModel.create(req.body);
    return res.status(201).json({ ok: true, class: doc });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, message: "Server error." });
  }
});

// LIST
router.get("/", async (_req, res) => {
  try {
    const items = await ClassModel.find().sort({ createdAt: -1 });
    res.json({ ok: true, items });
  } catch (e) {
    res.status(500).json({ ok: false, message: "Server error." });
  }
});

// READ ONE
router.get("/:id", async (req, res) => {
  try {
    const item = await ClassModel.findById(req.params.id);
    if (!item) return res.status(404).json({ ok: false, message: "Not found" });
    res.json({ ok: true, item });
  } catch (e) {
    res.status(500).json({ ok: false, message: "Server error." });
  }
});

// UPDATE
router.put("/:id", async (req, res) => {
  try {
    const err = validate(req.body);
    if (err) return res.status(400).json({ ok: false, message: err });
    const updated = await ClassModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ ok: false, message: "Not found" });
    res.json({ ok: true, item: updated });
  } catch (e) {
    res.status(500).json({ ok: false, message: "Server error." });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const del = await ClassModel.findByIdAndDelete(req.params.id);
    if (!del) return res.status(404).json({ ok: false, message: "Not found" });
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ ok: false, message: "Server error." });
  }
});

export default router;
