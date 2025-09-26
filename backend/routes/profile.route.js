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

    // If new image uploaded -> delete old (best-effort)
    if (req.file) {
      if (existingUser.profileImage && typeof existingUser.profileImage === "string") {
        try {
          const oldImagePath = path.resolve(process.cwd(), "profilePhotoUploads", path.basename(existingUser.profileImage));
          if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath);
          }
        } catch (err) {
          console.error("Error deleting old image:", err);
        }
      }
      req.body.profileImage = `/profilePhotoUploads/${req.file.filename}`;
    }

    // Build update fields
    const updateFields = { ...req.body };

    // Parse JSON fields sent via FormData
    if (typeof req.body.mentorAbilities === "string") {
      try {
        updateFields.mentorAbilities = JSON.parse(req.body.mentorAbilities);
      } catch (err) {
        // if parsing failed, keep as single string or empty array
        updateFields.mentorAbilities = req.body.mentorAbilities ? [req.body.mentorAbilities] : [];
      }
    }

    if (typeof req.body.education === "string") {
      try {
        updateFields.education = JSON.parse(req.body.education);
      } catch (err) {
        updateFields.education = [];
      }
    }

    // prevent updating email
    delete updateFields.email;

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
