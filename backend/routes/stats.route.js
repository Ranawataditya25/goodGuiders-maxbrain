// routes/stats.route.js
import express from "express";
import User from "../models/User.model.js";

const router = express.Router();

// GET /api/stats/total-users
router.get("/total-users", async (req, res) => {
  try {
    const totalMentors = await User.countDocuments({ role: "mentor", mentorStatus: "approved" });
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
    const mentors = await User.find({ role: "mentor", mentorStatus: "approved" })
      .select("name email mobileNo specializedIn experience education isDisabled -_id"); 

    if (!mentors.length) {
      return res.status(404).json({ message: "No mentors found" });
    }

    res.json({ mentors });
  } catch (err) {
    console.error("Error fetching mentors:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ NEW: GET /api/stats/students
router.get("/students", async (req, res) => {
  try {
    const students = await User.find({ role: "student" })
      .select("name email mobileNo address dob education isDisabled -_id"); // pick required fields only

    if (!students.length) {
      return res.status(404).json({ message: "No students found" });
    }

    // format each student to include only education.className
    const formattedStudents = students.map(student => ({
      name: student.name,
      email: student.email,
      mobileNo: student.mobileNo,
      address: student.address,
      dob: student.dob,
      isDisabled: !!student.isDisabled,
      education: student.education.map(e => e.className),
    }));

    res.json({ students: formattedStudents });
  } catch (err) {
    console.error("Error fetching students:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// DELETE a user (mentor/student)
router.delete("/:role/:email", async (req, res) => {
  try {
    const { role, email } = req.params;

    if (!["mentor", "student"].includes(role)) {
      return res.status(400).json({ success: false, message: "Invalid role" });
    }

    const user = await User.findOneAndDelete({ email, role });

    if (!user) {
      return res.status(404).json({ success: false, message: `${role} not found` });
    }

    res.json({ success: true, message: `${role} deleted successfully` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// TOGGLE disable/enable user (mentor/student)
router.patch("/:role/:email/toggle", async (req, res) => {
  try {
    const { role, email } = req.params;

    if (!["mentor", "student"].includes(role)) {
      return res.status(400).json({ success: false, message: "Invalid role" });
    }

    const user = await User.findOne({ email, role });

    if (!user) {
      return res.status(404).json({ success: false, message: `${role} not found` });
    }

    user.isDisabled = !user.isDisabled;
    await user.save();

    res.json({
      success: true,
      isDisabled: user.isDisabled,
      message: `${role} ${user.isDisabled ? "disabled" : "enabled"} successfully`,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});


export default router;