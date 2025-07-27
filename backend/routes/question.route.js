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




import express from "express";
import Question from "../models/Question.model.js";

const router = express.Router();

router.post("/fetch", async (req, res) => {
  try {
    const { subject, type, count } = req.body;

    if (!subject || !type || !count) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const subjectList = Array.isArray(subject) ? subject : subject.split(",").map(s => s.trim());
    let questions = [];

    if (type === "mcq+subjective") {
      const half = Math.floor(count / 2);
      const remaining = count - half;

      const mcqs = await Question.aggregate([
        { $match: { subject: { $in: subjectList }, type: "mcq" } },
        { $sample: { size: half } }
      ]);

      const subjectives = await Question.aggregate([
        { $match: { subject: { $in: subjectList }, type: "subjective" } },
        { $sample: { size: remaining } }
      ]);

      questions = [...mcqs, ...subjectives];
    } else {
      questions = await Question.aggregate([
        { $match: { subject: { $in: subjectList }, type } },
        { $sample: { size: count } }
      ]);
    }

    res.json(questions);
  } catch (err) {
    console.error("Error fetching questions:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
