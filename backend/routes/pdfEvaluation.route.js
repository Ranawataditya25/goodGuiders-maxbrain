import { Router } from "express";
import mongoose from "mongoose";
import PdfEvaluation from "../models/PdfEvaluation.model.js";
import User from "../models/User.model.js";

const router = Router();
const isValidObjectId = (id) => mongoose.isValidObjectId(id);

/* ================================
   Middleware
================================ */
const requireRole = (role) => (req, res, next) => {
  const userRole = req.user?.role || req.header("x-user-role");
  if (userRole !== role) {
    return res.status(403).json({
      ok: false,
      message: `${role} access only`,
    });
  }
  next();
};

/* =========================================================
   ADMIN: Get PDF evaluations
   GET /api/pdf-evaluations?status=
========================================================= */
router.get("/", requireRole("admin"), async (req, res) => {
  try {
    const filter = {};
if (req.query.status) {
  filter.status = req.query.status;
}

const list = await PdfEvaluation.find(filter)
      .populate("studentId", "name email")
      .populate("testId", "subjects class")
      .populate("mentorId", "name email")
      .sort({ createdAt: -1 })
      .lean();

    res.json({ ok: true, data: list });
  } catch (e) {
    console.error("[GET /pdf-evaluations]", e);
    res.status(500).json({ ok: false });
  }
});

/* =========================================================
   ADMIN: Assign / Reassign mentor
   POST /api/pdf-evaluations/:id/assign-mentor
========================================================= */
router.post("/:id/assign-mentor", requireRole("admin"), async (req, res) => {
  try {
    const { mentorId, deadline } = req.body;
    // mentorId == mentorEmail

 if (!mentorId || !deadline) {
      return res.status(400).json({
        ok: false,
        message: "Mentor and deadline are required",
      });
    }

    if (!mongoose.isValidObjectId(mentorId)) {
  return res.status(400).json({
    ok: false,
    message: "Invalid mentorId",
  });
}

    const mentor = await User.findOne({
      _id: mentorId,
      role: "mentor",
      isDisabled: { $ne: true },
    }).lean();

    if (!mentor) {
      return res.status(400).json({
        ok: false,
        message: "Mentor not found",
      });
    }

    const doc = await PdfEvaluation.findById(req.params.id);
    if (!doc) {
      return res.status(404).json({ ok: false, message: "Evaluation not found" });
    }

    // Allow reassignment only in valid states
    if (!["pending_admin", "rejected", "expired"].includes(doc.status)) {
      return res.status(400).json({
        ok: false,
        message: "Cannot assign mentor at this stage",
      });
    }

    doc.mentorId = mentor._id;          // ✅ store ObjectId internally
    doc.mentorAssignedAt = new Date();
    doc.mentorDeadline = new Date(deadline);
    doc.status = "assigned_mentor";

    await doc.save();

    res.json({ ok: true });
  } catch (e) {
    console.error("[POST /assign-mentor]", e);
    res.status(500).json({ ok: false });
  }
});

/* =========================================================
   MENTOR: Get assigned evaluations
   GET /api/pdf-evaluations/mentor
========================================================= */
router.get("/mentor", requireRole("mentor"), async (req, res) => {
  try {
    const list = await PdfEvaluation.find({
      mentorId: req.user._id,
      status: { $in: ["assigned_mentor", "accepted", "evaluated"] },
    })
      .populate("studentId", "name email")
      .populate("testId", "subjects class")
      .sort({ mentorDeadline: 1 })
      .lean();

    res.json({ ok: true, data: list });
  } catch (e) {
    console.error("[GET /mentor]", e);
    res.status(500).json({ ok: false });
  }
});

/* =========================================================
   MENTOR: Accept / Reject evaluation
   POST /api/pdf-evaluations/:id/decision
========================================================= */
router.post("/:id/decision", requireRole("mentor"), async (req, res) => {
  try {
    const { decision } = req.body;

    if (!["accepted", "rejected"].includes(decision)) {
      return res.status(400).json({ ok: false, message: "Invalid decision" });
    }

    const doc = await PdfEvaluation.findById(req.params.id);
    if (!doc) return res.status(404).json({ ok: false });

    if (!doc.mentorId?.equals(req.user._id)) {
      return res.status(403).json({ ok: false });
    }

    // ⏰ Deadline check
    if (doc.mentorDeadline && new Date() > doc.mentorDeadline) {
      doc.status = "expired";
      doc.mentorId = null;
      doc.mentorDeadline = null;
      doc.mentorAssignedAt = null;
      await doc.save();
      return res.status(400).json({
        ok: false,
        message: "Deadline expired",
      });
    }

    if (doc.status !== "assigned_mentor") {
      return res.status(400).json({
        ok: false,
        message: "Invalid evaluation state",
      });
    }

    if (decision === "rejected") {
      doc.status = "rejected";
      doc.mentorId = null;
      doc.mentorDeadline = null;
    } else {
      doc.status = "accepted";
    }

    await doc.save();
    res.json({ ok: true });
  } catch (e) {
    console.error("[POST /decision]", e);
    res.status(500).json({ ok: false });
  }
});

/* =========================================================
   MENTOR: Submit evaluation
   POST /api/pdf-evaluations/:id/evaluate
========================================================= */
router.post("/:id/evaluate", requireRole("mentor"), async (req, res) => {
  try {
    const { marks, feedback } = req.body;

    const doc = await PdfEvaluation.findById(req.params.id);
    if (!doc) return res.status(404).json({ ok: false });

    if (!doc.mentorId?.equals(req.user._id)) {
      return res.status(403).json({ ok: false });
    }

    if (doc.status !== "accepted") {
      return res.status(400).json({
        ok: false,
        message: "Accept evaluation first",
      });
    }

    if (doc.mentorDeadline && new Date() > doc.mentorDeadline) {
      doc.status = "expired";
      doc.mentorId = null;
      doc.mentorDeadline = null;
      await doc.save();
      return res.status(400).json({
        ok: false,
        message: "Deadline expired",
      });
    }

    if (!/^\d+\s*\/\s*\d+$/.test(marks)) {
  return res.status(400).json({
    ok: false,
    message: "Marks must be in format obtained/total",
  });
}

    doc.evaluation = {
      marks,
      feedback,
      evaluatedAt: new Date(),
    };

    doc.status = "evaluated";
    await doc.save();

    res.json({ ok: true });
  } catch (e) {
    console.error("[POST /evaluate]", e);
    res.status(500).json({ ok: false });
  }
});

// GET /api/pdf-evaluations/mentor/count
router.get("/mentor/count", requireRole("mentor"), async (req, res) => {
  try {
    const count = await PdfEvaluation.countDocuments({
      mentorId: req.user._id,
      status: "assigned_mentor", // only new requests
    });

    res.json({ ok: true, count });
  } catch (e) {
    console.error("[GET /mentor/count]", e);
    res.status(500).json({ ok: false });
  }
});


export default router;