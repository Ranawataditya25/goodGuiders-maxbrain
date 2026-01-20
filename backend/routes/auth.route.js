import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.model.js";
import { resend } from "../utils/resend.js";
import dotenv from "dotenv";
dotenv.config();


const router = express.Router();

// 👉 POST /api/auth/register
router.post("/register", async (req, res) => {
  const { name, email, mobileNo, password, role, referredBy } = req.body;

  try {
    // check if user already exists
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ msg: "Email already exists" });
    }

    const existingMobile = await User.findOne({ mobileNo });
    if (existingMobile) {
      return res.status(400).json({ msg: "Mobile number already exists" });
    }

    // hash password
    const hashed = await bcrypt.hash(password, 10);

    // generate random referral code for this user
    const referralCode = Math.random().toString(36).substring(2, 8);

    const newUser = new User({
      name,
      email,
      mobileNo,
      password: hashed,
      role: role || "student",
      referralCode,
      referredBy,
    });

    // if referredBy code is valid → reward referrer & new user
    if (referredBy) {
      const referrer = await User.findOne({ referralCode: referredBy });
      if (referrer) {
        referrer.credits += 10; // add credits to referrer
        await referrer.save();

        newUser.credits += 5; // add credits to new user
      }
    }

    await newUser.save();

    res.json({
      msg: "Registration successful",
      referralCode: newUser.referralCode,
      credits: newUser.credits,
      role: newUser.role,
    });
  } catch (err) {
    console.error(err);

    // Mongo duplicate key error
    if (err.code === 11000) {
      if (err.keyPattern?.mobileNo) {
        return res.status(400).json({
          msg: "Mobile number already exists",
          field: "mobileNo",
        });
      }

      if (err.keyPattern?.email) {
        return res.status(400).json({
          msg: "Email already exists",
          field: "email",
        });
      }
    }

    res.status(500).json({ msg: "Server error" });
  }
});

// POST /api/auth/check-unique
router.post("/check-unique", async (req, res) => {
  const { email, mobileNo } = req.body;

  try {
    if (await User.findOne({ email })) {
      return res.status(400).json({
        msg: "Email already exists",
        field: "email",
      });
    }

    if (await User.findOne({ mobileNo })) {
      return res.status(400).json({
        msg: "Mobile number already exists",
        field: "mobileNo",
      });
    }

    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

// 👉 POST /api/auth/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid email or password" });
    }

    // ❌ Check if disabled
    if (user.isDisabled) {
      return res.status(403).json({ msg: "Your account has been disabled by admin. Please contact support." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid email or password" });
    }

    // 🚨 Mentor approval checks
    if (user.role === "mentor") {
      if (user.mentorStatus === "pending") {
        return res.status(403).json({ msg: "Your mentor profile is still pending admin review." });
      }
      if (user.mentorStatus === "rejected") {
        return res.status(403).json({ msg: "Your mentor application was rejected by admin." });
      }
      if (user.mentorStatus === "verifyDocs") {
        return res.status(403).json({ msg: "Please check your email and submit your latest degree documents for verification before logging in." });
      }
    }

    // ✅ Successful login
    const fullUser = await User.findOne({ email }).select("-password");
    res.json({ msg: "Login successful", user: fullUser });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// 👉 GET /api/auth/dashboard?email=...
router.get("/dashboard", async (req, res) => {
  const { email } = req.query;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: "User not found" });

    const referredUsers = await User.find({ referredBy: user.referralCode });

    res.json({
      name: user.name,
      credits: user.credits,
      role: user.role,
      yourReferralCode: user.referralCode,
      totalReferred: referredUsers.length,
      referredUsers: referredUsers.map(u => ({
        name: u.name,
        email: u.email,
        joinedOn: u.createdAt
      }))
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

// 👉 POST /api/auth/use-referral
router.post("/use-referral", async (req, res) => {
  const { email, referralCode } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    if (user.referredBy) {
      return res.status(400).json({ msg: "You have already used a referral code" });
    }

    if (user.referralCode === referralCode) {
      return res.status(400).json({ msg: "You cannot use your own referral code" });
    }

    const referrer = await User.findOne({ referralCode });
    if (!referrer) {
      return res.status(400).json({ msg: "Invalid referral code" });
    }

    // update both
    referrer.credits += 60;
    user.credits += 50;
    user.referredBy = referralCode;

    await referrer.save();
    await user.save();

    res.json({
      msg: "Referral applied successfully",
      updatedCredits: user.credits,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

/**
 * 👉 POST /api/auth/send-referral-invite
 * EMAIL ONLY (Production-safe)
 */
router.post("/send-referral-invite", async (req, res) => {
  const { name, email, referralCode } = req.body;

  if (!email) {
    return res.status(400).json({ msg: "Email is required" });
  }

  if (!referralCode) {
    return res.status(400).json({ msg: "Referral code is required" });
  }

  const inviteLink = `https://landing-page-gg.onrender.com/?ref=${referralCode}`;

  try {
    await resend.emails.send({
      from: "GoodGuiders <onboarding@resend.dev>", // ✅ use this for now
      to: email,
      subject: "You're invited to GoodGuiders 🎉",
      reply_to: "ranawataaditya06@gmail.com",
      html: `
        <p>Hi ${name || "there"} 👋</p>
        <p>You’ve been invited to join <strong>GoodGuiders</strong> 🎉</p>
        <p>
          👉 <a href="${inviteLink}">Sign up here</a>
        </p>
        <p>
          Referral Code: <strong>${referralCode}</strong>
        </p>
      `,
    });
  } catch (err) {
    console.error("Referral email failed:", err);
  }

  // ✅ Always respond (important)
  return res.json({
    msg: "Referral email sent successfully",
  });
})

export default router;
