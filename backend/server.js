// server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import http from "http";
import { Server } from "socket.io";
import webpush from "web-push";
import dotenv from "dotenv";
dotenv.config();

// Routers
import classesRouter from "./routes/classes.route.js";
import uploadsRouter from "./routes/uploads.route.js";
import authRoutes from "./routes/auth.route.js";
import profileRoutes from "./routes/profile.route.js";
import questionRoutes from "./routes/question.route.js";
import assignmentRoutes from "./routes/assignment.route.js";
import attemptsRoutes from "./routes/attempts.route.js";
// import testsRouter from "./routes/tests.route.js";
import mentorRoutes from "./routes/mentorStatus.route.js";
import forgotPasswordRoutes from "./routes/forgotPass.route.js";
import statsRoutes from "./routes/stats.route.js";
import answerRoutes from "./routes/submission.route.js";
import storageRoutes from "./routes/storage.route.js";
import purchasePdfRoutes from "./routes/purchasePdf.route.js";
// Models used by server-level helpers
import User from "./models/User.model.js";
import TestAssignment from "./models/TestAssignment.model.js";
import tokenRoute from "./routes/twilio_token.route.js";
import twilioConversationRoutes from "./routes/twilio_conversation.route.js";
import videoRoutes from "./routes/videoRoutes.route.js";
import interactionsRouter from "./routes/interactions.route.js";
import materialsRoutes from "./routes/material.route.js";
import pdfEvaluationRoutes from "./routes/pdfEvaluation.route.js";
import { mentorExpiryCron } from "./cron/mentorExpiry.cron.js";
import appointmentRoutes from "./routes/appointment.route.js";
import pushRoutes from "./routes/push.route.js";



dotenv.config();

const ALLOWED_ORIGINS = (
  process.env.CORS_ORIGIN ||
  [
    "http://127.0.0.1:5173",
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:4173",
    "https://landing-page-gg.onrender.com",
    "https://goodguiders.onrender.com",
  ].join(",")
)
  .split(",")
  .map((o) => o.trim());

const app = express();
mentorExpiryCron();

webpush.setVapidDetails(
  "mailto:support@goodguiders.com",
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

/* ----------------------- CORS ----------------------- */
app.use(
  cors({
    origin: (origin, callback) => {
      // allow Postman / server-to-server
      if (!origin) return callback(null, true);

      if (ALLOWED_ORIGINS.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("CORS not allowed"), false);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "x-user-id",
      "x-user-role",
      "x-user-email",
    ],
  })
);
// ⚠️ DO NOT add app.options("*") or app.options("(.*)") on Express 5.

/* -------------------- Body Parsers ------------------- */
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true }));

/* -------------------- Dev Auth Shim ------------------ */
/**
 * Populates req.user based on headers:
 *   x-user-id:    Mongo ObjectId of the user
 *   x-user-email: email (lowercased)
 * Safe to keep in dev/staging; remove or guard with NODE_ENV in prod.
 */
app.use(async (req, _res, next) => {
  try {
    const id = req.header("x-user-id");
    const email = req.header("x-user-email");
    let user = null;

    if (id && mongoose.isValidObjectId(id)) {
      user = await User.findById(id, { password: 0 }).lean();
    } else if (email) {
      user = await User.findOne(
        { email: String(email).trim().toLowerCase() },
        { password: 0 }
      ).lean();
    }

    if (user) {
      req.user = {
        _id: user._id,
        email: user.email,
        role: user.role,
        name: user.name,
      };
    }
  } catch (e) {
    console.error("[devAuth] error:", e);
  }
  next();
});

/* -------------------- Mongo Connect ------------------ */
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/yourdb";

mongoose
  .connect(MONGO_URI)
  .then(async () => {
    console.log("✅ MongoDB connected");
    // Optional: normalize any legacy string ids in assignments on boot
    try {
      await TestAssignment.normalizeIds();
    } catch (e) {
      console.warn("[startup] normalizeIds skipped/failed:", e?.message || e);
    }
  })
  .catch((err) => console.error("Mongo error:", err));

/* ------------------ Static: /uploads ----------------- */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadsDir = path.join(__dirname, "uploads");
fs.mkdirSync(uploadsDir, { recursive: true });

const materialsDir = path.join(uploadsDir, "materials");
fs.mkdirSync(materialsDir, { recursive: true });

app.use("/uploads", express.static(uploadsDir));

/* ---------------------- Health ----------------------- */
app.get("/api/health", (_req, res) => res.json({ ok: true }));

/* ---------------------- Routes ----------------------- */
// Mount with PATHS only (never full URLs)
app.use("/api/uploads", uploadsRouter);
app.use("/api/classes", classesRouter);
app.use("/api/push", pushRoutes);

app.use("/api/stats", statsRoutes);
app.use("/api/materials", materialsRoutes);
app.use("/api/auth", forgotPasswordRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/mentor", mentorRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/pdf", purchasePdfRoutes);

// some routers are internally scoped; "/api" here is fine
app.use("/api", assignmentRoutes);
app.use("/api/pdf-evaluations", pdfEvaluationRoutes);
app.use("/api", attemptsRoutes);
app.use("/api", answerRoutes);
app.use("/api/storage", storageRoutes);
app.use("/api", tokenRoute);
app.use("/api", twilioConversationRoutes);
app.use("/api/video", videoRoutes);
app.use("/api/interactions", interactionsRouter);
app.use("/api/appointments", appointmentRoutes);

// app.use("/api/tests", testsRouter);

/* ------------------- 404 Fallback -------------------- */
// Pathless fallback avoids path-to-regexp pitfalls
app.use((req, res) =>
  res.status(404).json({ ok: false, message: "Not found" })
);

/* --------------------- Start (Socket.IO Enabled) ------------------------- */

// Create HTTP server
const server = http.createServer(app);

// Create socket server
const io = new Server(server, {
  cors: {
    origin: ALLOWED_ORIGINS,
    credentials: true,
  },
  transports: ["polling", "websocket"],
});

// Make socket instance available to all routes
app.set("io", io);

// Store online connected users as Map<userKey, Set<socketId>>
const onlineUsers = new Map();

io.on("connection", (socket) => {
  console.log("🔌 Socket connected:", socket.id);

  // User registers with userId (normalize to lowercase)
  socket.on("register", (userId) => {
    try {
      const key = String(userId || "").trim().toLowerCase();
      if (!key) return;
      console.log("Registered:", key, " -> socketId:", socket.id);
      if (!onlineUsers.has(key)) onlineUsers.set(key, new Set());
      onlineUsers.get(key).add(socket.id);
    } catch (e) {
      console.error("register handler error:", e);
    }
  });

  // Handle disconnects
  socket.on("disconnect", () => {
    for (const [userId, socketSet] of onlineUsers.entries()) {
      if (socketSet.has(socket.id)) {
        socketSet.delete(socket.id);
        if (socketSet.size === 0) onlineUsers.delete(userId);
        break;
      }
    }
    console.log("❌ Socket disconnected:", socket.id);
  });
});

// Export user map for routes
app.set("onlineUsers", onlineUsers);

// DEV: debug endpoint to list sockets for a given email
app.get('/api/debug/online/:email', (req, res) => {
  const key = String(req.params.email || '').trim().toLowerCase();
  const sockets = onlineUsers.get(key);
  res.json({ email: key, sockets: sockets ? Array.from(sockets) : [], allUsers: Array.from(onlineUsers.keys()) });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  const base = process.env.PUBLIC_BASE_URL || `http://127.0.0.1:${PORT}`;
  console.log(`🚀 API + Socket.IO running at ${base}`);
});
