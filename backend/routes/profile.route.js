import express from "express";
import User from "../models/User.model.js";
import upload from "../middlewares/upload.js";
import fs from "fs";
import path from "path";

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
 * @desc    Update user profile data and optionally update profile photo
 */
router.put("/", upload.single("profileImage"), async (req, res) => {
  const email = req.body.email;

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) return res.status(404).json({ msg: "User not found" });

    // ✅ If a new image is uploaded, delete the old one
    if (req.file) {
      // Delete old image from file system if it exists
      if (existingUser.profileImage) {
        const oldImagePath = path.join("profilePhotoUploads", path.basename(existingUser.profileImage));
        fs.unlink(oldImagePath, (err) => {
          if (err) console.error("Error deleting old image:", err);
        });
      }

      // Set new profile image path
      req.body.profileImage = `/profilePhotoUploads/${req.file.filename}`;
    }

    // ✅ Parse mentorAbilities from string if present
    const updateFields = {
      ...req.body,
      mentorAbilities: req.body.mentorAbilities
        ? JSON.parse(req.body.mentorAbilities)
        : [],
    };

    delete updateFields.email; // prevent email from being updated

    const updatedUser = await User.findOneAndUpdate(
      { email },
      { $set: updateFields },
      { new: true }
    ).select("-password");

    res.json({ msg: "Profile updated successfully", user: updatedUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

export default router;
