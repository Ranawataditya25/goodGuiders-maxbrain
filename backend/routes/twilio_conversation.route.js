// routes/twilio_conversation.route.js
import express from "express";
import twilio from "twilio";
import dotenv from "dotenv";
import Conversation from "../models/Conversation.model.js";
import User from "../models/User.model.js";
dotenv.config();

const router = express.Router();

// Twilio REST client
const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

/** Helper: sanitize emails into URL-safe strings */
const sanitize = (s = "") =>
  String(s || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "_");

/** Deterministic uniqueName for a pair (order-insensitive) */
const makeUniqueName = (a, b) => [sanitize(a), sanitize(b)].sort().join("_");

/**
 * POST /api/conversation
 * Create or return conversation for a student <-> mentor pair
 * Only a student (studentEmail) is allowed to create a conversation.
 */
router.post("/conversation", async (req, res) => {
  try {
    const { studentEmail, mentorEmail } = req.body;
    if (!studentEmail || !mentorEmail) {
      return res
        .status(400)
        .json({ error: "Both studentEmail and mentorEmail are required." });
    }

    const student = await User.findOne({ email: studentEmail });
    const mentor = await User.findOne({ email: mentorEmail });

    if (!student || !mentor)
      return res.status(400).json({ error: "Student or mentor not found" });
    if (student.role !== "student")
      return res
        .status(403)
        .json({ error: "Only students may create conversations." });
    if (mentor.role !== "mentor")
      return res
        .status(400)
        .json({ error: "The target user is not a mentor." });

    const uniqueName = makeUniqueName(studentEmail, mentorEmail);

    // ✅ 1) Check MongoDB first
    let conv = await Conversation.findOne({ uniqueName });
    if (conv) {
      return res.json({ conversationSid: conv.conversationSid, uniqueName });
    }

    // ✅ 2) Create Twilio conversation (or fetch existing if duplicate)
    let twilioConv;
    try {
      twilioConv = await twilioClient.conversations.v1.conversations.create({
        uniqueName,
      });
    } catch (err) {
      if (err?.message.includes("already exists")) {
        const existing = await twilioClient.conversations.v1.conversations.list(
          { uniqueName }
        );
        twilioConv = existing[0];
      } else {
        throw err;
      }
    }

    // ✅ 3) Add participants (ignore "already exists" errors)
    for (const email of [studentEmail, mentorEmail]) {
      try {
        await twilioClient.conversations.v1
          .conversations(twilioConv.sid)
          .participants.create({ identity: email });
      } catch (e) {
        if (!e?.message.includes("already exists")) {
          console.warn(
            `[conversation] add participant ${email} failed:`,
            e?.message || e
          );
        }
      }
    }

    // ✅ 4) Save in MongoDB only if not already exists
    conv = await Conversation.findOne({ conversationSid: twilioConv.sid });
    if (!conv) {
      conv = new Conversation({
        participants: [studentEmail, mentorEmail],
        conversationSid: twilioConv.sid,
        uniqueName,
      });
      await conv.save();
    }

    return res.json({ conversationSid: twilioConv.sid, uniqueName });
  } catch (err) {
    console.error("[conversation error]", err?.message || err);
    return res
      .status(500)
      .json({ error: "Could not create/return conversation" });
  }
});

/**
 * GET /api/conversation/:uniqueName/messages
 * Fetch messages for a conversation (by uniqueName)
 * Returns the last up to 50 messages. If you need full pagination later,
 * you can extend this to use Twilio .page() or pass pageToken.
 */
router.get("/conversation/:uniqueName/messages", async (req, res) => {
  try {
    const uniqueName = String(req.params.uniqueName || "").trim();
    if (!uniqueName)
      return res.status(400).json({ error: "uniqueName required in path" });

    // Find conversation doc
    const conv = await Conversation.findOne({ uniqueName });
    if (!conv) return res.status(404).json({ error: "Conversation not found" });

    // Fetch last 50 messages from Twilio
    // NOTE: .list() returns an array of messages (most recent first)
    const messages = await twilioClient.conversations.v1
      .conversations(conv.conversationSid)
      .messages.list({ limit: 50 });

    return res.json({ messages });
  } catch (err) {
    console.error("[fetch messages error]", err?.message || err);
    return res.status(500).json({ error: "Could not fetch messages" });
  }
});

/**
 * POST /api/conversation/:uniqueName/messages
 * Server-side send message endpoint (preferred over calling Twilio directly).
 * Body: { author: "email", body: "text" }
 * Validates:
 *  - author exists in user DB
 *  - author is one of the conversation's participants (stored in our DB)
 */
router.post("/conversation/:uniqueName/messages", async (req, res) => {
  try {
    const uniqueName = String(req.params.uniqueName || "").trim();
    const { author, body } = req.body;

    if (!uniqueName || !author || !body)
      return res.status(400).json({ error: "uniqueName, author, and body required" });

    const user = await User.findOne({ email: author });
    if (!user) return res.status(403).json({ error: "Author not found" });

    const conv = await Conversation.findOne({ uniqueName });
    if (!conv) return res.status(404).json({ error: "Conversation not found" });

    const participantFound = conv.participants.some(
      (p) => String(p).toLowerCase() === String(author).toLowerCase()
    );
    if (!participantFound) {
      return res.status(403).json({ error: "Author is not a participant of this conversation" });
    }

    // ----------------- 5-minute free chat check -----------------
    const now = new Date();
    if (!conv.firstMessageTime) {
      conv.firstMessageTime = now; // mark first message time
    } else if (!conv.subscribed) {
      const expiryTime = 5 * 60 * 1000;
      if (now - conv.firstMessageTime > expiryTime) {
        return res.status(403).json({
          error: "Free chat expired. Please subscribe to continue messaging.",
        });
      }
    }

    // Save firstMessageTime if it was just set
    await conv.save();

    // Create message in Twilio
    const msg = await twilioClient.conversations.v1
      .conversations(conv.conversationSid)
      .messages.create({ author, body });

    return res.json(msg);
  } catch (err) {
    console.error("[send message error]", err?.message || err);
    return res.status(500).json({ error: "Could not send message" });
  }
});

/**
 * GET /api/conversations?email=<userEmail>
 * List all conversation uniqueName / sids that include given email (for chat list).
 * Returns a message if no conversations exist for the email.
 */
router.get("/conversations", async (req, res) => {
  try {
    const email = String(req.query.email || "").trim();
    if (!email)
      return res.status(400).json({ error: "email query param required" });

    const convs = await Conversation.find({ participants: email });

    if (!convs || convs.length === 0) {
      return res.json({ message: "No conversations found for this email." });
    }

    // Fetch last message from Twilio for each conversation
    const convsWithLastMessage = await Promise.all(
      convs.map(async (conv) => {
        let lastMessage = null;

        try {
          const messages = await twilioClient.conversations.v1
            .conversations(conv.conversationSid)
            .messages.list({ limit: 1, order: "desc" }); // latest message first

          if (messages.length > 0) {
            lastMessage = {
              author: messages[0].author,
              body: messages[0].body,
              timestamp: messages[0].dateCreated,
            };
          }
        } catch (twilioErr) {
          console.warn(
            `[conversation] failed to fetch last message for ${conv.uniqueName}:`,
            twilioErr?.message || twilioErr
          );
        }

        // helper to resolve name by email
const resolveName = async (email) => {
  const user = await User.findOne({ email }).select("name email");
  return user?.name || email; // fallback to email
};

return {
  uniqueName: conv.uniqueName,
  conversationSid: conv.conversationSid,
  participants: conv.participants,
  participantsDetailed: await Promise.all(
    conv.participants.map(async (email) => ({
      email,
      name: await resolveName(email),
    }))
  ),
  createdAt: conv.createdAt,
  lastMessage,
};
      })
    );

    return res.json({ conversations: convsWithLastMessage });
  } catch (err) {
    console.error("[list conversations error]", err?.message || err);
    return res.status(500).json({ error: "Could not list conversations" });
  }
});

// GET /api/conversation/:uniqueName
router.get("/conversation/:uniqueName", async (req, res) => {
  try {
    const uniqueName = req.params.uniqueName;
    const conv = await Conversation.findOne({ uniqueName });
    if (!conv) return res.status(404).json({ error: "Conversation not found" });
    res.json(conv);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// 🔹 FIND existing conversation by mentor + student
router.post("/conversation/by-users", async (req, res) => {
  const { mentorEmail, studentEmail } = req.body;

  if (!mentorEmail || !studentEmail) {
    return res.status(400).json({ error: "mentorEmail and studentEmail required" });
  }

  const uniqueName = [mentorEmail, studentEmail]
    .map((e) => e.toLowerCase().replace(/[^a-z0-9]/g, "_"))
    .sort()
    .join("_");

  const convo = await Conversation.findOne({ uniqueName });

  if (!convo) {
    return res.status(404).json({});
  }

  res.json({ uniqueName: convo.uniqueName });
});

export default router;
