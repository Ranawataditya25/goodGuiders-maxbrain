// routes/stats.route.js
import express from "express";
import User from "../models/User.model.js";

const router = express.Router();

// GET /api/stats/total-users
router.get("/total-users", async (req, res) => {
  try {
    const totalMentors = await User.countDocuments({ role: "mentor" });
    const totalStudents = await User.countDocuments({ role: "student" });

    res.json({
      totalMentors,
      totalStudents,
    });
  } catch (err) {
    console.error("Error fetching totals:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ NEW: GET /api/stats/mentors
router.get("/mentors", async (req, res) => {
  try {
    const mentors = await User.find({ role: "mentor" })
      .select("name email mobileNo specializedIn -_id"); // pick required fields only

    if (!mentors.length) {
      return res.status(404).json({ message: "No mentors found" });
    }

    res.json({ mentors });
  } catch (err) {
    console.error("Error fetching mentors:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
