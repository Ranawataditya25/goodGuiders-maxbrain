// middlewares/authMiddleware.js
import User from "../models/User.model.js";

export const protect = async (req, res, next) => {
  try {
    // Expecting userId in header (from frontend localStorage)
    const userId = req.header("x-user-id");

    if (!userId) {
      return res.status(401).json({ ok: false, msg: "Unauthorized: Missing user ID" });
    }

    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(401).json({ ok: false, msg: "Unauthorized: Invalid user" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Auth error:", error);
    res.status(500).json({ ok: false, msg: "Server error during authentication" });
  }
};
