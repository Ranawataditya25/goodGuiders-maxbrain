// routes/forgotPass.route.js
import express from "express";
import crypto from "crypto";

import bcrypt from "bcryptjs";
import rateLimit from "express-rate-limit";
import User from "../models/User.model.js";
import { resend } from "../utils/resend.js";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

// ------------------ Rate Limiter ------------------
const forgotPasswordLimiter = rateLimit({
  windowMs: 30 * 60 * 1000, // 30 minutes
  max: 5, // max 5 requests per IP per window
  message: {
    error: "Too many password reset attempts, try again in 30 minutes.",
  },
});

// ------------------ Forgot Password ------------------
router.post("/forgot-password", forgotPasswordLimiter, async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.json({
        message:
          "If an account exists for this email, a reset link has been sent.",
      });
    }

    const resetToken = crypto.randomBytes(48).toString("hex");
    const hashedToken = crypto
      .createHash("sha512")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
    await user.save();

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    try {
      await resend.emails.send({
        from: "GoodGuiders <onboarding@resend.dev>",
        to: user.email,
        subject: "Password Reset Request",
        reply_to: "ranawataaditya06@gmail.com",
        html: `
          <p>You requested a password reset.</p>
          <p>Click below (valid for 10 minutes):</p>
          <a href="${resetUrl}">${resetUrl}</a>
        `,
      });
    } catch (err) {
      console.error("Forgot password email failed:", err);
    }

    return res.json({
      message:
        "If an account exists for this email, a reset link has been sent.",
    });
  } catch (err) {
    console.error("Forgot password error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ------------------ Reset Password ------------------
router.post("/reset-password/:token", async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    // Strong password enforcement
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        error:
          "Password must be at least 8 characters, include uppercase, lowercase, number, and special character.",
      });
    }

    // Hash token to match DB
    const hashedToken = crypto.createHash("sha512").update(token).digest("hex");

    // Find user with valid token and not expired
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ error: "Invalid or expired token." });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Update password, remove token, invalidate sessions
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    // Optional: invalidate all sessions/JWTs if stored
    if (user.tokens) user.tokens = [];

    await user.save();

    res.json({ message: "Password reset successful. Please login." });
  } catch (err) {
    console.error("Reset password error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;