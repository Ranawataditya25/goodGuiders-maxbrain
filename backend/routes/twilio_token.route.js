// routes/twilio_token.route.js
import express from "express";
import twilio from "twilio";
import Conversation from "../models/Conversation.model.js";
import User from "../models/User.model.js";

const router = express.Router();
const AccessToken = twilio.jwt?.AccessToken;
const ChatGrant = (AccessToken && (AccessToken.ChatGrant || AccessToken.ConversationsGrant));

if (!AccessToken || !ChatGrant) {
  console.warn(
    "[twilio_token.route] WARNING: AccessToken or ChatGrant not found on twilio.jwt. " +
      "Your twilio SDK may not export AccessToken.ChatGrant; test and adjust."
  );
}

/**
 * GET /api/token?identity=someone@example.com
 * Issues a Twilio Access Token for the identity IF:
 *  - the identity exists in your User DB
 *  - the identity is part of at least one conversation in Conversation collection
 *
 * Note: later, when you add real auth middleware, you should also ensure req.user.email === identity
 * to prevent token issuance for arbitrary identities.
 */
router.get("/token", async (req, res) => {
  try {
    const identity = String(req.query.identity || "").trim();
    if (!identity) return res.status(400).json({ error: "Identity is required" });

    // 1) verify user exists in DB
    const user = await User.findOne({ email: identity });
    if (!user) {
      return res.status(403).json({ error: "User not found in DB" });
    }

    // 2) verify user participates in at least one Conversation in DB
    const conv = await Conversation.findOne({ participants: identity });
    if (!conv) {
      return res.status(403).json({ error: "No active conversation for this user" });
    }

    // Optional: if you have authentication middleware that sets req.user, enforce it:
    // if (req.user && req.user.email !== identity) return res.status(403).json({ error: "Forbidden" });

    // 3) Twilio config
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const apiKeySid = process.env.TWILIO_API_KEY_SID || process.env.TWILIO_API_KEY;
    const apiKeySecret =
      process.env.TWILIO_API_KEY_SECRET || process.env.TWILIO_API_SECRET;
    const serviceSid =
      process.env.TWILIO_CHAT_SERVICE_SID ||
      process.env.TWILIO_CONVERSATIONS_SERVICE_SID ||
      process.env.TWILIO_SERVICE_SID;

    if (!accountSid || !apiKeySid || !apiKeySecret) {
      return res.status(500).json({
        error: "Twilio credentials missing. Set TWILIO_ACCOUNT_SID, TWILIO_API_KEY_SID and TWILIO_API_KEY_SECRET.",
      });
    }

    // 4) Create and return token
    const token = new AccessToken(accountSid, apiKeySid, apiKeySecret, { identity });

    // If ChatGrant/ConversationsGrant exists, attach it. serviceSid is optional in many accounts.
    if (!ChatGrant) {
      return res.status(500).json({ error: "Twilio grant class not available on this SDK version." });
    }

    const grant = new ChatGrant({ serviceSid });
    token.addGrant(grant);

    return res.json({ token: token.toJwt(), identity });
  } catch (err) {
    console.error("[twilio_token] Token error:", err);
    return res.status(500).json({ error: err.message || "Token generation failed" });
  }
});

export default router;
