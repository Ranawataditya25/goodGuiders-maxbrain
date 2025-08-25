// backendd/server.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Routers
import classesRouter from "./routes/classes.route.js";
import uploadsRouter from "./routes/uploads.route.js";
import authRoutes from "./routes/auth.route.js";
import profileRoutes from "./routes/profile.route.js";
import questionRoutes from "./routes/question.route.js";
import questionPaperRoutes from "./routes/questionPaper.route.js";

// assignment/test APIs (already present)
import assignmentRoutes from "./routes/assignment.route.js";
import attemptsRoutes from "./routes/attempts.route.js";
// import testsRouter from "./routes/tests.route.js";

dotenv.config();

const app = express();

/* ----------------------- CORS ----------------------- */
const corsOrigins = (process.env.CORS_ORIGIN || "")
  .split(",")
  .map(s => s.trim())
  .filter(Boolean);

const corsOptions = {
  origin: corsOrigins.length
    ? corsOrigins
    : ["http://127.0.0.1:5173", "http://localhost:5173"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};
app.use(cors(corsOptions));
// ⚠️ DO NOT add app.options("*") or app.options("(.*)") on Express 5.
// The cors() middleware above is enough, and you already handle OPTIONS
// specifically inside uploads.route.js for /pdf when needed.

/* -------------------- Body Parsers ------------------- */
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true }));

/* -------------------- Mongo Connect ------------------ */
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/yourdb";

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("Mongo error:", err));

/* ------------------ Static: /uploads ----------------- */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadsDir = path.join(__dirname, "uploads");
fs.mkdirSync(uploadsDir, { recursive: true });
app.use("/uploads", express.static(uploadsDir));

/* ---------------------- Health ----------------------- */
app.get("/api/health", (_req, res) => res.json({ ok: true }));

/* ---------------------- Routes ----------------------- */
// Mount with PATHS only (never full URLs)
app.use("/api/uploads", uploadsRouter);
app.use("/api/classes", classesRouter);

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/question-papers", questionPaperRoutes);


// some of your routers are already scoped inside the files;
// using "/api" here is fine if those define subpaths internally
app.use("/api", assignmentRoutes);
app.use("/api", attemptsRoutes);

// app.use("/api/tests", testsRouter);

/* ------------------- 404 Fallback -------------------- */
// Pathless fallback avoids path-to-regexp pitfalls
app.use((req, res) => res.status(404).json({ ok: false, message: "Not found" }));

/* --------------------- Start ------------------------- */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  const base = process.env.PUBLIC_BASE_URL || `http://127.0.0.1:${PORT}`;
  console.log(`🚀 API running at ${base}`);
});
