// server.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

// existing routes
import authRoutes from "./routes/auth.route.js";
import profileRoutes from "./routes/profile.route.js";
import questionRoutes from "./routes/question.route.js";

// assignment/test APIs (already present)
import assignmentRoutes from "./routes/assignment.route.js";

// ✅ mount the new attempts routes
import attemptsRoutes from "./routes/attempts.route.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

// db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error(err));

// routes
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/questions", questionRoutes);

// Mount both routers under /api
app.use("/api", assignmentRoutes);
app.use("/api", attemptsRoutes);

// static
app.use("/profilePhotoUploads", express.static("profilePhotoUploads"));

// health
app.get("/api/health", (_req, res) => res.json({ ok: true }));

const PORT = process.env.PORT || "5000";
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
