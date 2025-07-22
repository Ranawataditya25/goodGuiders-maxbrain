import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.model.js";

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

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid email or password" });
    }

    res.json({
      msg: "Login successful",
      user: {
        name: user.name,
        email: user.email,
        mobileNo: user.mobileNo,
        referralCode: user.referralCode,
        credits: user.credits,
        role: user.role,
      },
    });
  } catch (err) {
    console.error(err);
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
  

export default router;
