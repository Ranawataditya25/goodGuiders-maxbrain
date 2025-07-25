import express from "express";
import User from "../models/User.model.js";

const router = express.Router();

/**
 * @route   GET /api/profile?email=...
 * @desc    Get current user profile data (excluding password)
 */
router.get("/", async (req, res) => {
  const { email } = req.query;

  try {
    const user = await User.findOne({ email }).select("-password");
    if (!user) return res.status(404).json({ msg: "User not found" });

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

/**
 * @route   PUT /api/profile
 * @desc    Update user profile data
 */
router.put("/", async (req, res) => {
    const email = req.body.email;
    const updateFields = { ...req.body };
    delete updateFields.email; // ❌ Don't allow updating email
  
    try {
      const updatedUser = await User.findOneAndUpdate(
        { email },
        { $set: updateFields },
        { new: true }
      ).select("-password");
  
      if (!updatedUser) return res.status(404).json({ msg: "User not found" });
  
      res.json({ msg: "Profile updated successfully", user: updatedUser });
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: "Server error" });
    }
  });
  

export default router;
