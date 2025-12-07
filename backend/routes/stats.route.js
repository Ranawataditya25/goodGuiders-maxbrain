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
    const { specialization } = req.query;

    const mentors = await User.find({
      role: "mentor",
      mentorStatus: "approved",
    }).select(
      "name email mobileNo specializedIn experience education isDisabled mentorAbilities -_id"
    );

    if (!mentors.length) {
      return res.status(404).json({ message: "No mentors found" });
    }

    // ✅ Helper to normalize specialization (trim + lowercase)
    const normalizeSpec = (s = "") =>
      s.toString().trim().toLowerCase();

    const filterSpec = normalizeSpec(specialization || "");

    const scoreForMentor = (mentor) => {
      const spec = normalizeSpec(mentor.specializedIn || "");
      const disabled = !!mentor.isDisabled;

      const match = filterSpec && spec === filterSpec;

      // 0: match + enabled
      // 1: match + disabled
      // 2: not match + enabled
      // 3: not match + disabled
      if (match && !disabled) return 0;
      if (match && disabled) return 1;
      if (!match && !disabled) return 2;
      return 3;
    };

    let sortedMentors;

    if (specialization) {
      sortedMentors = [...mentors].sort(
        (a, b) => scoreForMentor(a) - scoreForMentor(b)
      );
    } else {
      // default: enabled first, disabled last
      sortedMentors = [...mentors].sort(
        (a, b) => Number(a.isDisabled) - Number(b.isDisabled)
      );
    }

    res.json({ mentors: sortedMentors });
  } catch (err) {
    console.error("Error fetching mentors:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ NEW: GET /api/stats/students
router.get("/students", async (req, res) => {
  try {
    const { class: classQuery } = req.query; // e.g. ?class=10th

    const students = await User.find({ role: "student" })
      .select("name email mobileNo address dob education isDisabled -_id");

    if (!students.length) {
      return res.status(404).json({ message: "No students found" });
    }

    const normalize = (s = "") => s.toString().trim().toLowerCase();

    const filterClass = normalize(classQuery || "");

    // sort helper: similar to mentors
    const scoreForStudent = (student) => {
      const disabled = !!student.isDisabled;

      const eduClasses = (student.education || [])
        .map((e) => normalize(e.className || ""))
        .filter(Boolean);

      const hasMatch = filterClass && eduClasses.includes(filterClass);

      // 0: match + enabled
      // 1: match + disabled
      // 2: not match + enabled
      // 3: not match + disabled
      if (hasMatch && !disabled) return 0;
      if (hasMatch && disabled) return 1;
      if (!hasMatch && !disabled) return 2;
      return 3;
    };

    let sortedStudents;

    if (classQuery) {
      sortedStudents = [...students].sort(
        (a, b) => scoreForStudent(a) - scoreForStudent(b)
      );
    } else {
      // default: enabled first, disabled last
      sortedStudents = [...students].sort(
        (a, b) => Number(a.isDisabled) - Number(b.isDisabled)
      );
    }

    // format each student to include a main `className` + all classes
    const formattedStudents = sortedStudents.map((student) => {
      const eduClasses = (student.education || [])
        .map((e) => e.className)
        .filter(Boolean);

      // you can change this logic if your "current class" is stored differently
      const primaryClass =
        eduClasses.length > 0 ? eduClasses[eduClasses.length - 1] : "";

      return {
        name: student.name,
        email: student.email,
        mobileNo: student.mobileNo,
        address: student.address,
        dob: student.dob,
        isDisabled: !!student.isDisabled,
        className: primaryClass, // ✅ main class for filter
        classes: eduClasses,     // all classes if needed
      };
    });

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