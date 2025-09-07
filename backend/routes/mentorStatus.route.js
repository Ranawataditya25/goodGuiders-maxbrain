import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.model.js";

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

/**
 * Admin Approval
 * PATCH /api/mentor/mentor-status/:id
 */
router.patch("/mentor-status/:id", async (req, res) => {
  try {
    const { mentorStatus  } = req.body; // "approved" or "rejected"

    if (!["approved", "rejected"].includes( mentorStatus )) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    if (user.role !== "mentor") {
      return res
        .status(400)
        .json({ error: "Only mentors can be approved/rejected" });
    }

    user.mentorStatus = mentorStatus ;
    await user.save();

    res.json({ message: `Mentor ${mentorStatus }`, user });
  } catch (err) {
    console.error("Admin approval error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
