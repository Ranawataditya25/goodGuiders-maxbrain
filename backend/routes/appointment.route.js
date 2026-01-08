import express from "express";
import Appointment from "../models/Appointment.model.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

/**
 * STUDENT → request appointment
 */
router.post("/request", protect, async (req, res) => {
  try {
    if (req.user.role !== "student") {
      return res.status(403).json({ ok: false, msg: "Only students can book" });
    }

    const { mentorId, date } = req.body;

    const exists = await Appointment.findOne({
      mentorId,
      date,
      status: { $in: ["pending", "accepted"] },
    });

    if (exists) {
      return res.status(400).json({ ok: false, msg: "Date already booked" });
    }

    const appointment = await Appointment.create({
      mentorId,
      studentId: req.user._id,
      date,
      status: "pending",
    });

    res.json({ ok: true, appointment });
  } catch (err) {
    res.status(500).json({ ok: false, msg: err.message });
  }
});

/**
 * MENTOR → get own appointments
 */
router.get("/mentor/:mentorId", protect, async (req, res) => {
  if (!["mentor", "admin", "student"].includes(req.user.role)) {
    return res.status(403).json({ ok: false });
  }

  const appointments = await Appointment.find({
    mentorId: req.params.mentorId,
  });

  res.json({ ok: true, appointments });
});

/**
 * MENTOR → accept / reject
 */
router.patch("/:id", protect, async (req, res) => {
  if (req.user.role !== "mentor") {
    return res.status(403).json({ ok: false });
  }

  const { status } = req.body;

  const appointment = await Appointment.findById(req.params.id);
  if (!appointment) return res.status(404).json({ ok: false });

  if (status === "accepted") {
    const clash = await Appointment.findOne({
      mentorId: appointment.mentorId,
      date: appointment.date,
      status: "accepted",
    });

    if (clash) {
      return res
        .status(400)
        .json({ ok: false, msg: "Date already accepted" });
    }
  }

  appointment.status = status;

  if (status === "accepted" || status === "rejected") {
  appointment.studentSeen = false;
  appointment.mentorSeen = true;
}

  await appointment.save();

  res.json({ ok: true, appointment });
});

router.get("/notifications", protect, async (req, res) => {
  let filter = {};

  if (req.user.role === "mentor") {
    filter = {
      mentorId: req.user._id,
      status: "pending",
      $or: [
        { mentorSeen: false },
        { mentorSeen: { $exists: false } }
      ]
    };
  }

  if (req.user.role === "student") {
    filter = {
      studentId: req.user._id,
      status: { $in: ["accepted", "rejected"] },
      $or: [
        { studentSeen: false },
        { studentSeen: { $exists: false } }
      ]
    };
  }

  if (req.user.role === "admin") {
    return res.json({ notifications: [] });
  }

  const notifications = await Appointment.find(filter)
    .sort({ updatedAt: -1 });

  res.json({ notifications });
});

router.patch("/notifications/read", protect, async (req, res) => {
  let update = {};

  if (req.user.role === "mentor") {
    update = { mentorSeen: true };
  }

  if (req.user.role === "student") {
    update = { studentSeen: true };
  }

  await Appointment.updateMany(
    {
      $or: [
        { mentorId: req.user._id },
        { studentId: req.user._id }
      ]
    },
    { $set: update }
  );

  res.json({ ok: true });
});

// GET all appointments for logged-in user
router.get("/my", protect, async (req, res) => {
  let filter = {};

  if (req.user.role === "mentor") {
    // mentor should NOT see rejected
    filter = {
      mentorId: req.user._id,
      status: { $ne: "rejected" },
    };
  }

  if (req.user.role === "student") {
    // student sees only his appointments
    filter = {
      studentId: req.user._id,
    };
  }

  if (req.user.role === "admin") {
    return res.json({ appointments: [] });
  }

  const appointments = await Appointment.find(filter)
    .sort({ date: 1 })
    .populate("studentId", "name email")
    .populate("mentorId", "name email");

  res.json({ appointments });
});

export default router;