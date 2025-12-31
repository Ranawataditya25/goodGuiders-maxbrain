import express from "express";
import ClassModel from "../models/class.model.js";
import User from "../models/User.model.js";

const router = express.Router();

function extractClassNumber(value = "") {
  return String(value).match(/\d+/)?.[0] || null;
}

const validate = (body) => {
  const { educationBoard, name, subjects } = body || {};
  if (!educationBoard?.trim()) return "Education Board is required.";
  if (!name?.trim()) return "Class name is required.";
  if (!Array.isArray(subjects) || subjects.length === 0)
    return "At least one subject is required.";
  for (const s of subjects) {
    if (!s?.name?.trim()) return "Each subject must have a name.";
    if (!Array.isArray(s.chapters) || s.chapters.length === 0)
      return "Each subject must have at least one chapter.";
    for (const c of s.chapters) {
      if (!c?.name?.trim()) return "Each chapter must have a name.";
      if (c.subTopics) {
        if (!Array.isArray(c.subTopics)) return "subTopics must be an array.";
        for (const t of c.subTopics) {
          if (!t?.name?.trim()) return "Each sub-topic must have a name.";
        }
      }
    }
  }
  return "";
};

// Create
router.post("/", async (req, res) => {
  try {
    const err = validate(req.body);
    if (err) return res.status(400).json({ ok: false, message: err });
    const doc = await ClassModel.create(req.body);
    res.status(201).json({ ok: true, class: doc });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, message: "Server error." });
  }
});

// List
router.get("/", async (_req, res) => {
  try {
    const items = await ClassModel.find().sort({ createdAt: -1 });
    res.json({ ok: true, items });
  } catch {
    res.status(500).json({ ok: false, message: "Server error." });
  }
});

/**
 * @route   GET /api/classes/grouped
 * @desc    Get all classes grouped by educationBoard
 */
router.get("/grouped", async (req, res) => {
  try {
    // aggregation pipeline
    const result = await ClassModel.aggregate([
      {
        $group: {
          _id: {
            $cond: [
              { $or: [{ $eq: ["$educationBoard", null] }, { $eq: ["$educationBoard", ""] }] },
              "Other",
              "$educationBoard"
            ]
          },
          classes: { $push: "$$ROOT" }
        }
      }
    ]);

    // convert to object {board: [classes]}
    const grouped = {};
    result.forEach(item => {
      grouped[item._id] = item.classes;
    });

    res.json({ ok: true, data: grouped });
  } catch (err) {
    console.error("Error grouping classes:", err);
    res.status(500).json({ ok: false, message: "Server error" });
  }
});

router.get("/student", async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({
        ok: false,
        message: "Student email required",
      });
    }

    const user = await User.findOne({ email }).lean();
    if (!user) {
      return res.status(404).json({
        ok: false,
        message: "Student not found",
      });
    }

    const rawClass = user.education?.[0]?.className;
    const classNumber = extractClassNumber(rawClass); // ✅ USE HERE

    if (!classNumber) {
      return res.json({ ok: true, items: [] });
    }

    const classes = await ClassModel.find({
      name: new RegExp(`\\b${classNumber}\\b`, "i"),
    }).lean();

    res.json({ ok: true, items: classes });
  } catch (e) {
    console.error("[GET /classes/student]", e);
    res.status(500).json({ ok: false, message: "Server error" });
  }
});

// Read one
router.get("/:id", async (req, res) => {
  try {
    const item = await ClassModel.findById(req.params.id);
    if (!item) return res.status(404).json({ ok: false, message: "Not found" });
    res.json({ ok: true, item });
  } catch {
    res.status(500).json({ ok: false, message: "Server error." });
  }
});

// Update
router.put("/:id", async (req, res) => {
  try {
    const err = validate(req.body);
    if (err) return res.status(400).json({ ok: false, message: err });
    const updated = await ClassModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ ok: false, message: "Not found" });
    res.json({ ok: true, item: updated });
  } catch {
    res.status(500).json({ ok: false, message: "Server error." });
  }
});

// Delete
router.delete("/:id", async (req, res) => {
  try {
    const del = await ClassModel.findByIdAndDelete(req.params.id);
    if (!del) return res.status(404).json({ ok: false, message: "Not found" });
    res.json({ ok: true });
  } catch {
    res.status(500).json({ ok: false, message: "Server error." });
  }
});

export default router;
