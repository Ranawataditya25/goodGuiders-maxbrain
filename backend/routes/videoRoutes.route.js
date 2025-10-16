import express from "express";
import twilio from "twilio";
import Conversation from "../models/Conversation.model.js";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

router.get("/token", (req, res) => {
  const { identity, room } = req.query;
  const AccessToken = twilio.jwt.AccessToken;
  const VideoGrant = AccessToken.VideoGrant;

  // Create unique identity per connection (good)
  const token = new AccessToken(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_API_KEY_SID,
    process.env.TWILIO_API_KEY_SECRET,
    { identity: `${identity}_${Date.now()}` }
  );

  const videoGrant = new VideoGrant({ room });
  token.addGrant(videoGrant);

  res.json({ token: token.toJwt() });
});

// PUT /api/video/:uniqueName/start-call
router.put("/:uniqueName/start-call", async (req, res) => {
  const { caller } = req.body;
  try {
    const convo = await Conversation.findOneAndUpdate(
      { uniqueName: req.params.uniqueName }, // <-- use uniqueName
      { callStatus: "ringing", caller },
      { new: true }
    );

    if (!convo) return res.status(404).json({ error: "Conversation not found" });
    res.json(convo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/video/:uniqueName/answer-call
router.put("/:uniqueName/answer-call", async (req, res) => {
  try {
    const convo = await Conversation.findOneAndUpdate(
      { uniqueName: req.params.uniqueName },
      { callStatus: "connected" },
      { new: true }
    );
    if (!convo) return res.status(404).json({ error: "Conversation not found" });
    res.json(convo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/video/:uniqueName/end-call
router.put("/:uniqueName/end-call", async (req, res) => {
  try {
    const convo = await Conversation.findOneAndUpdate(
      { uniqueName: req.params.uniqueName },
      { callStatus: "idle", caller: null },
      { new: true }
    );
    if (!convo) return res.status(404).json({ error: "Conversation not found" });
    res.json(convo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:uniqueName", async (req, res) => {
  try {
    const convo = await Conversation.findOne({ uniqueName: req.params.uniqueName });
    if (!convo) return res.status(404).json({ error: "Conversation not found" });
    res.json(convo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


export default router;
