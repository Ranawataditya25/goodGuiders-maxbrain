import express from "express";
import User from "../models/User.model.js";

const router = express.Router();

// SAVE PUSH SUBSCRIPTION
router.post("/subscribe", async (req, res) => {
  console.log("📩 Push subscribe hit", req.body.email);
  const { email, subscription } = req.body;

  if (!email || !subscription) {
    return res.status(400).json({ error: "Missing data" });
  }

  await User.findOneAndUpdate(
    { email },
    { pushSubscription: subscription }
  );

  res.json({ ok: true });
});

export default router;