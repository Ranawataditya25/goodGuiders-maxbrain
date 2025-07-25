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
      enum: ["student", "mentor"],
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
      enum: ["Male", "Female", "Other" , ""],
      default: "",
    },
    city: String,
    state: String,
    country: String,
    postalCode: String,
    address: String,

     // ✅ Mentor-specific fields
     specializedIn: String,
     mentorAbilities: [String], 
     bio: String,
     experience: String, 
  },
  {
    timestamps: true,
  }
);


export default mongoose.model("User", userSchema);
