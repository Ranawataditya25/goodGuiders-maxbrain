// routes/stats.route.js
import express from "express";
import User from "../models/User.model.js";
import mongoose from "mongoose";
import Submission from "../models/Submission.model.js";

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

// ✅ GET /api/stats/student/:email/details
// Returns full student info + exams + performance + mentors connected
router.get("/student/:email/details", async (req, res) => {
  try {
    const { email } = req.params;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const student = await User.findOne({ email, role: "student" })
      .select("name email mobileNo address dob className course enrolledCourses isDisabled")
      .lean();

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // ✅ 1) Exams given (Submissions)
    const submissions = await Submission.find({ userEmail: email })
      .select("class subjects type submittedAt score totalMarks")
      .sort({ submittedAt: -1 })
      .lean();

    const exams = submissions.map((s) => {
      let percentage = null;
      if (typeof s.score === "number" && typeof s.totalMarks === "number" && s.totalMarks > 0) {
        percentage = Math.round((s.score / s.totalMarks) * 100);
      }
      return {
        id: s._id,
        class: s.class,
        subjects: s.subjects,
        type: s.type,
        submittedAt: s.submittedAt,
        score: s.score ?? null,
        totalMarks: s.totalMarks ?? null,
        percentage,
      };
    });

    // ✅ 2) Performance (5-level category)
    const scoredExams = exams.filter((e) => e.percentage !== null);
    let averageScore = null;
    let performanceCategory = "Not evaluated";

    if (scoredExams.length > 0) {
      const total = scoredExams.reduce((sum, e) => sum + e.percentage, 0);
      averageScore = Math.round(total / scoredExams.length);

      if (averageScore < 40) performanceCategory = "Below Average";
      else if (averageScore < 60) performanceCategory = "Average";
      else if (averageScore < 75) performanceCategory = "Good";
      else if (averageScore < 90) performanceCategory = "Very Good";
      else performanceCategory = "Excellent";
    }

    // ✅ 3) Mentors connected (via conversations participants)
    const convColl = mongoose.connection.db.collection("conversations");

    const conversations = await convColl
      .find({ participants: email })
      .project({ participants: 1 })
      .toArray();

    const otherEmailsSet = new Set();
    const emailLower = email.toLowerCase().trim();

    conversations.forEach((conv) => {
      (conv.participants || []).forEach((p) => {
        if (!p) return;
        const pl = p.toLowerCase().trim();
        if (pl !== emailLower) otherEmailsSet.add(p.trim());
      });
    });

    let mentors = [];
    if (otherEmailsSet.size > 0) {
      const otherEmails = Array.from(otherEmailsSet);
      const mentorUsers = await User.find({
        email: { $in: otherEmails },
        role: "mentor",
      })
        .select("name email specializedIn")
        .lean();

      mentors = mentorUsers.map((m) => ({
        name: m.name,
        email: m.email,
        specialization: m.specializedIn || "-",
      }));
    }

    return res.json({
      student: {
        id: student._id,
        name: student.name,
        email: student.email,
        mobileNo: student.mobileNo,
        address: student.address,
        dob: student.dob,
        className: student.className || null,
        course: student.course || null,
        isDisabled: !!student.isDisabled,
      },
      exams,
      performance: {
        averageScore,
        category: performanceCategory,
        examsCount: exams.length,
      },
      mentors: {
        count: mentors.length,
        items: mentors,
      },
    });
  } catch (err) {
    console.error("Error in /student/:email/details:", err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

// Add this to routes/stats.route.js (after the /student/:email/details route)

router.get("/mentor/:email/details", async (req, res) => {
  try {
    const { email } = req.params;
    if (!email) return res.status(400).json({ message: "Email is required" });

    // 1) Find mentor
    const mentor = await User.findOne({ email, role: "mentor" })
      .select("name email mobileNo specializedIn experience education isDisabled -_id")
      .lean();

    if (!mentor) {
      return res.status(404).json({ message: "Mentor not found" });
    }

    // 2) Find conversations where mentor participates
    const convColl = mongoose.connection.db.collection("conversations");

    const conversations = await convColl
      .find({ participants: email })
      .project({
        participants: 1,
        createdAt: 1,
        firstMessageTime: 1,
        connectedAt: 1,
        startedAt: 1,
        endedAt: 1,
        callStatus: 1,
      })
      .toArray();

    // collect distinct other participant emails (likely students)
    const otherEmailsSet = new Set();
    const emailLower = String(email).toLowerCase().trim();

    // Also compute last interaction per other participant by scanning conversation documents
    const lastInteractionMap = {}; // email -> Date (ISO string)

    const pickupDates = (conv) => {
      const candidates = [];
      if (conv.createdAt) candidates.push(new Date(conv.createdAt));
      if (conv.firstMessageTime) candidates.push(new Date(conv.firstMessageTime));
      if (conv.connectedAt) candidates.push(new Date(conv.connectedAt));
      if (conv.endedAt) candidates.push(new Date(conv.endedAt));
      if (conv.startedAt) candidates.push(new Date(conv.startedAt));
      // fallback: use now? No — ignore
      return candidates;
    };

    conversations.forEach((conv) => {
      (conv.participants || []).forEach((p) => {
        if (!p) return;
        const pl = String(p).toLowerCase().trim();
        if (pl === emailLower) return;
        otherEmailsSet.add(p.trim());
      });

      // compute a timestamp representing this conversation's "last activity"
      const candidates = pickupDates(conv);
      let convLast = candidates.length ? new Date(Math.max(...candidates.map((d) => d.getTime()))) : null;

      // For each other participant in this conversation, update their lastInteraction
      (conv.participants || []).forEach((p) => {
        if (!p) return;
        const pl = String(p).toLowerCase().trim();
        if (pl === emailLower) return;
        const key = p.trim();
        if (!convLast) return;
        const prev = lastInteractionMap[key];
        if (!prev || convLast.getTime() > new Date(prev).getTime()) {
          lastInteractionMap[key] = convLast.toISOString();
        }
      });
    });

    // 3) Resolve otherEmails to student users
    const otherEmails = Array.from(otherEmailsSet);
    let studentsConnected = { count: 0, items: [] };

    if (otherEmails.length > 0) {
      const studentUsers = await User.find({
        email: { $in: otherEmails },
        role: "student",
      })
        .select("name email className education -_id")
        .lean();

      // Map by email (case-insensitive)
      const usersByEmail = {};
      studentUsers.forEach((u) => {
        usersByEmail[String(u.email).trim().toLowerCase()] = u;
      });

      const items = otherEmails
        .map((em) => {
          const key = String(em).trim().toLowerCase();
          const u = usersByEmail[key];
          return {
            email: em.trim(),
            name: u ? u.name : em.trim(),
            class: u ? (u.className || (Array.isArray(u.education) && u.education.length > 0 ? u.education[u.education.length - 1].className : null)) : null,
            lastInteraction: lastInteractionMap[em.trim()] || null,
          };
        })
        // optional: sort by lastInteraction desc
        .sort((a, b) => {
          if (!a.lastInteraction && !b.lastInteraction) return 0;
          if (!a.lastInteraction) return 1;
          if (!b.lastInteraction) return -1;
          return new Date(b.lastInteraction) - new Date(a.lastInteraction);
        });

      studentsConnected = { count: items.length, items };
    }

    // 4) (Optional) fetch related exams if you want: e.g. recent submissions where mentor is teacher
    // Your schema does not show mentorId in Submission; skip unless you already link them.
    // For now we won't fetch exams here.

    return res.json({
      mentor: {
        name: mentor.name,
        email: mentor.email,
        mobileNo: mentor.mobileNo || null,
        specialization: mentor.specializedIn || null,
        experience: mentor.experience || null,
        degree: (Array.isArray(mentor.education) && mentor.education.length > 0) ? mentor.education[mentor.education.length - 1].degree : null,
        isDisabled: !!mentor.isDisabled,
      },
      students: studentsConnected,
      // relatedExams: [] // add if you want later
    });
  } catch (err) {
    console.error("Error in /mentor/:email/details:", err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
});


// /**
//  * GET /api/stats/student/:email/overview
//  * Returns:
//  *  - basic student info
//  *  - exams given (from submissions)
//  *  - performance (simple rule-based label)
//  *  - mentorsConnected (only if includeMentors=true => admin)
//  */
// router.get("/student/:email/overview", async (req, res) => {
//   try {
//     const { email } = req.params;
//     const includeMentors = req.query.includeMentors === "true";

//     if (!email) {
//       return res.status(400).json({ message: "Student email is required" });
//     }

//     // 1️⃣ Find student
//     const student = await User.findOne({ email, role: "student" })
//       .select("name email mobileNo address dob className course enrolledCourses")
//       .lean();

//     if (!student) {
//       return res.status(404).json({ message: "Student not found" });
//     }

//     // 2️⃣ Find exams (submissions)
//     const submissions = await Submission.find({ userEmail: email })
//       .select("class subjects type submittedAt score totalMarks")
//       .sort({ submittedAt: -1 })
//       .lean();

//     const exams = submissions.map((sub) => ({
//       id: sub._id.toString(),
//       class: sub.class || "-",
//       subjects: Array.isArray(sub.subjects) ? sub.subjects.join(", ") : "-",
//       type: sub.type || "-",
//       submittedAt: sub.submittedAt,
//       score: sub.score ?? null,
//       totalMarks: sub.totalMarks ?? null,
//     }));

//     const totalExams = exams.length;

//     // 3️⃣ Simple performance logic (you can tweak thresholds/labels)
//     let performanceLabel = "No Data";
//     if (totalExams === 0) performanceLabel = "No Data";
//     else if (totalExams <= 2) performanceLabel = "Below Average";
//     else if (totalExams <= 5) performanceLabel = "Average";
//     else if (totalExams <= 8) performanceLabel = "Above Average";
//     else performanceLabel = "Intelligent";

//     const performance = {
//       label: performanceLabel,
//       totalExams,
//     };

//     // 4️⃣ Mentors connected (via conversations) — only for admin
//     let mentorsConnected = null;

//     if (includeMentors) {
//       const db = mongoose.connection.db;

//       const mentorDocs = await db
//         .collection("conversations")
//         .aggregate([
//           { $match: { participants: email } },
//           { $project: { participants: 1 } },
//           { $unwind: "$participants" },
//           { $match: { participants: { $ne: email } } }, // other side
//           { $group: { _id: "$participants" } }, // unique emails
//           {
//             $lookup: {
//               from: "users",
//               localField: "_id",
//               foreignField: "email",
//               as: "mentor",
//             },
//           },
//           { $unwind: { path: "$mentor", preserveNullAndEmptyArrays: true } },
//           { $match: { "mentor.role": "mentor" } },
//           {
//             $project: {
//               _id: 0,
//               id: "$mentor._id",
//               name: "$mentor.name",
//               email: "$mentor.email",
//             },
//           },
//         ])
//         .toArray();

//       mentorsConnected = {
//         count: mentorDocs.length,
//         mentors: mentorDocs.map((m) => ({
//           id: m.id?.toString?.() || null,
//           name: m.name || m.email,
//           email: m.email,
//         })),
//       };
//     }

//     return res.json({
//       student: {
//         id: student._id.toString(),
//         name: student.name,
//         email: student.email,
//         mobileNo: student.mobileNo || "-",
//         address: student.address || "-",
//         dob: student.dob || "-",
//         className: student.className || "-",
//         course:
//           student.course ||
//           (Array.isArray(student.enrolledCourses) &&
//             student.enrolledCourses.length > 0 &&
//             student.enrolledCourses[0].title) ||
//           "-",
//       },
//       exams,
//       performance,
//       mentorsConnected, // null for mentor / true object for admin
//     });
//   } catch (err) {
//     console.error("Error in /student/:email/overview:", err);
//     res
//       .status(500)
//       .json({ message: "Server error", details: err.message || String(err) });
//   }
// });


export default router;