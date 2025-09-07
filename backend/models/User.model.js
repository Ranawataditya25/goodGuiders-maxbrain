import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
    },
    mobileNo: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["student", "mentor", "admin"],
      default: "student",
    },
    referralCode: {
      type: String,
      unique: true,
    },
    referredBy: String,
    credits: {
      type: Number,
      default: 0,
    },
    dob: String,
    gender: {
      type: String,
      enum: ["Male", "Female", "Other", ""],
      default: "",
    },
    city: String,
    state: String,
    country: String,
    postalCode: String,
    location: String,
    address: String,
    profileImage: {
      type: String, // Store the relative path like "/uploads/abc.jpg"
      default: "/default-avatar.png", 
    },

    // ✅ Mentor-specific fields
    specializedIn: String,
    mentorAbilities: [String],
    bio: String,
    experience: String,

     // Mentor approval status
    mentorStatus: {
      type: String,
      enum: ["pending", "approved", "rejected", ""],
      default: "",
    },
  },
  {
    timestamps: true,
  }
);


export default mongoose.model("User", userSchema);
