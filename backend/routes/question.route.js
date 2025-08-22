// import express from "express";
// import Question from "../models/Question.model.js";

// const router = express.Router();

// // POST /api/questions/fetch
// router.post("/fetch", async (req, res) => {
//   try {
//     const { class: className, subject, type, count } = req.body;

//     if (!className || !subject || !type || !count) {
//       return res.status(400).json({ message: "Missing fields" });
//     }

//     let questions = [];

//     if (type === "mcq+subjective") {
//       const half = Math.floor(count / 2);
//       const remaining = count - half;

//       const mcqs = await Question.aggregate([
//         { $match: { class: className, subject, type: "mcq" } },
//         { $sample: { size: half } }
//       ]);

//       const subjectives = await Question.aggregate([
//         { $match: { class: className, subject, type: "subjective" } },
//         { $sample: { size: remaining } }
//       ]);

//       questions = [...mcqs, ...subjectives];
//     } else {
//       questions = await Question.aggregate([
//         { $match: { class: className, subject, type } },
//         { $sample: { size: count } }
//       ]);
//     }

//     res.json(questions);
//   } catch (err) {
//     console.error("Error fetching questions:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// export default router;





// import express from "express";
// import Question from "../models/Question.model.js";

// const router = express.Router();

// // POST /api/questions/fetch
// router.post("/fetch", async (req, res) => {
//   try {
//     const { subject, type, count } = req.body;

//     if (!subject || !type || !count) {
//       return res.status(400).json({ message: "Missing fields" });
//     }

//     let questions = [];

//     if (type === "mcq+subjective") {
//       const half = Math.floor(count / 2);
//       const remaining = count - half;

//       const mcqs = await Question.aggregate([
//         { $match: { subject, type: "mcq" } },
//         { $sample: { size: half } }
//       ]);

//       const subjectives = await Question.aggregate([
//         { $match: { subject, type: "subjective" } },
//         { $sample: { size: remaining } }
//       ]);

//       questions = [...mcqs, ...subjectives];
//     } else {
//       questions = await Question.aggregate([
//         { $match: { subject, type } },
//         { $sample: { size: count } }
//       ]);
//     }

//     res.json(questions);
//   } catch (err) {
//     console.error("Error fetching questions:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// export default router;




// import express from "express";
// import Question from "../models/Question.model.js";
// import Submission from "../models/Submission.model.js"; 

// const router = express.Router();

// // POST /api/questions/fetch
// router.post("/fetch", async (req, res) => {
//   try {
//     const { subject, type, count } = req.body;

//     if (!subject || !type || !count) {
//       return res.status(400).json({ message: "Missing fields" });
//     }

//     const subjectList = Array.isArray(subject) ? subject : subject.split(",").map(s => s.trim());
//     let questions = [];

//     if (type === "mcq+subjective") {
//       const half = Math.floor(count / 2);
//       const remaining = count - half;

//       const mcqs = await Question.aggregate([
//         { $match: { subject: { $in: subjectList }, type: "mcq" } },
//         { $sample: { size: half } }
//       ]);

//       const subjectives = await Question.aggregate([
//         { $match: { subject: { $in: subjectList }, type: "subjective" } },
//         { $sample: { size: remaining } }
//       ]);

//       questions = [...mcqs, ...subjectives];
//     } else {
//       questions = await Question.aggregate([
//         { $match: { subject: { $in: subjectList }, type } },
//         { $sample: { size: count } }
//       ]);
//     }

//     res.json(questions);
//   } catch (err) {
//     console.error("Error fetching questions:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// });


// // POST /api/questions/submit
// router.post("/submit", async (req, res) => {
//   try {
//     const { userEmail, class: className, subjects, type, answers } = req.body;

//     if (!userEmail || !className || !subjects || !type || !answers) {
//       return res.status(400).json({ message: "Missing fields" });
//     }

//     const newSubmission = new Submission({
//       userEmail,
//       class: className,
//       subjects,
//       type,
//       answers,
//     });

//     await newSubmission.save();

//     res.status(201).json({ message: "Test submitted successful" });
//   } catch (err) {
//     console.error("Error submitting test:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// export default router;



import { Router } from "express";
import express from "express";
import Submission from "../models/Submission.model.js"; 
import Question from "../models/Question.model.js";

const router = Router();

const cleanSubjects = (arr) =>
  Array.isArray(arr)
    ? arr.map((s) => String(s).trim()).filter(Boolean).slice(0, 3)
    : [];

router.post("/", async (req, res) => {
  try {
    const body = req.body;
    if (!body.class) throw new Error("class is required");
    if (!body.testType) throw new Error("testType is required");
    if (!body.difficulty) throw new Error("difficulty is required");
    if (!Array.isArray(body.questions)) throw new Error("questions must be an array");

    const doc = await Question.create({
      ...body,
      subjects: cleanSubjects(body.subjects),
    });

    res.status(201).json({ ok: true, id: doc._id });
  } catch (err) {
    res.status(400).json({ ok: false, message: err.message });
  }
});

router.get("/", async (_req, res) => {
  const docs = await Question.find().sort({ createdAt: -1 }).lean();
  res.json({ ok: true, data: docs });
});

router.get("/:id", async (req, res) => {
  const doc = await Question.findById(req.params.id).lean();
  if (!doc) return res.status(404).json({ ok: false, message: "Not found" });
  res.json({ ok: true, data: doc });
});

export default router;
