import express from "express";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import User from "../models/User.model.js";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();
/**
 * Mentor Profile Setup
 * POST /api/mentor/profile-setup
 */
router.post("/profile-setup", async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      mobileNo,
      dob,
      gender,
      city,
      state,
      country,
      postalCode,
      address,
      bio,
      experience,
      mentorAbilities,
      specializedIn,
      referredBy,
      latestDegree, 
    } = req.body;

    // check if user already exists
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ msg: "Email already exists" });
    }

    const existingMobile = await User.findOne({ mobileNo });
    if (existingMobile) {
      return res.status(400).json({ msg: "Mobile number already exists" });
    }

    // hash the password
    const hashedPassword  = await bcrypt.hash(password, 10);

    // ✅ generate random referral code
    const referralCode = Math.random().toString(36).substring(2, 8);

    // create mentor
    const newMentor = new User({
      name,
      email,
      password: hashedPassword,
      mobileNo,
      role: "mentor",
      dob,
      gender,
      city,
      state,
      country,
      postalCode,
      address,
      bio,
      experience,
      mentorAbilities,
      specializedIn,
      mentorStatus: "pending",
      referralCode,
      referredBy,
      credits: 0, // default
      latestDegree,
    });

    // ✅ referral reward system
    if (referredBy) {
      const referrer = await User.findOne({ referralCode: referredBy });
      if (referrer) {
        referrer.credits += 10; // reward referrer
        await referrer.save();

        newMentor.credits += 5; // reward new mentor
      }
    }

    await newMentor.save();

    res.json({
      message: "Mentor profile submitted. Awaiting admin approval.",
      referralCode: newMentor.referralCode,
      credits: newMentor.credits,
      status: newMentor.mentorStatus,
    });
  } catch (err) {
    console.error("Profile setup error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// GET /api/mentor/pending
router.get("/pending", async (req, res) => {
  try {
    const mentors = await User.find({ 
      role: "mentor", 
      $or: [
        { mentorStatus: "pending" }, 
        { mentorStatus: "" }, 
        { mentorStatus: { $exists: false } } // in case field missing
      ] 
    });
    res.json(mentors);
  } catch (err) {
    console.error("Error fetching pending mentors:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Admin Approval
// ✅ PATCH /api/mentor/mentor-status/:id

router.patch("/mentor-status/:id", async (req, res) => {
  try {
    const { mentorStatus } = req.body; // "approved" | "rejected" | "verifyDocs"

    if (!["approved", "rejected", "verifyDocs"].includes(mentorStatus)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    if (user.role !== "mentor") {
      return res
        .status(400)
        .json({ error: "Only mentors can be approved/rejected" });
    }

    // ✅ Update status
    user.mentorStatus = mentorStatus;
    await user.save();

    // ✅ Setup nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // ✅ Email text based on action
    let subject, text;
    if (mentorStatus === "approved") {
      subject = "Mentor Application Approved 🎉";
      text = `Dear ${user.name},\n\nCongratulations! Your mentor application has been approved. You can now log in and start mentoring students.\n\nBest Regards,\nAdmin Team`;
    } else if (mentorStatus === "rejected") {
      subject = "Mentor Application Rejected ❌";
      text = `Dear ${user.name},\n\nWe regret to inform you that your mentor application has been rejected by the admin. You cannot log in at this time.\n\nBest Regards,\nAdmin Team`;
    } else if (mentorStatus === "verifyDocs") {
      subject = "Degree Verification Required 📑";
      text = `Dear ${user.name},\n\nBefore your mentor account can be approved, we require a copy of your latest degree for verification. Please reply to this email with the document attached.\n\nBest Regards,\nAdmin Team`;
    }

    // ✅ Send email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject,
      text,
    });

    res.json({ message: `Mentor ${mentorStatus} and email sent`, user });
  } catch (err) {
    console.error("Admin approval error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
