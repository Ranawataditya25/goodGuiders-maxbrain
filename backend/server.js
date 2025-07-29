import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.route.js";
import profileRoutes from './routes/profile.route.js';
import questionRoutes from './routes/question.route.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
  origin: "*",
  credentials: true,
}));


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error(err));

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/questions", questionRoutes);
app.use("/profilePhotoUploads", express.static("profilePhotoUploads"));



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
