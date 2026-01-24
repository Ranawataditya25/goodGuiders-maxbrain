import express from "express";
import twilio from "twilio";
import Conversation from "../models/Conversation.model.js";
import webpush from "web-push";
import User from "../models/User.model.js";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

/* ------------------   Generate Twilio Token   ------------------ */
router.get("/token", (req, res) => {
  const { identity, room } = req.query;

  const AccessToken = twilio.jwt.AccessToken;
  const VideoGrant = AccessToken.VideoGrant;

  const token = new AccessToken(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_API_KEY_SID,
    process.env.TWILIO_API_KEY_SECRET,
    { identity: identity }
  );

  token.addGrant(new VideoGrant({ room }));

  res.json({ token: token.toJwt() });
});

/* ---------------------  START CALL  --------------------- */
// PUT /api/video/:uniqueName/start-call
router.put("/:uniqueName/start-call", async (req, res) => {
  const { caller, receiverId } = req.body || {};

  if (!caller || !receiverId) {
    return res.status(400).json({
      error: "caller and receiverId are required",
    });
  }

  try {
    // 1️⃣ Update conversation
    const convo = await Conversation.findOneAndUpdate(
      { uniqueName: req.params.uniqueName },
      {
        callStatus: "ringing",
        caller,
        receiver: receiverId,
        isRejected: false,
        isMissed: false,
        startedAt: new Date(),
        connectedAt: null,
        endedAt: null,
      },
      { new: true }
    );

    if (!convo) {
      return res.status(404).json({ error: "Conversation not found" });
    }

    // 2️⃣ Socket / Push logic
    const io = req.app.get("io");
    const onlineUsers = req.app.get("onlineUsers");

    const socketId = onlineUsers.get(receiverId);

    if (socketId) {
      io.to(socketId).emit("incoming_call", {
        from: caller,
        uniqueName: convo.uniqueName,
        room: convo.uniqueName,
        startedAt: convo.startedAt,
      });
    } else {
      const receiverUser = await User.findOne({ email: receiverId });
      const callerUser = await User.findOne({ email: caller });

      if (receiverUser?.pushSubscription) {
        const payload = JSON.stringify({
          type: "incoming_call",
          title: "Incoming Call",
          body: `${callerUser?.name || "Someone"} is calling you`,
          uniqueName: convo.uniqueName,
          caller,
          callerName: callerUser?.name,
          receiverId,
        });

        await webpush.sendNotification(
          receiverUser.pushSubscription,
          payload
        );

        console.log("📲 Push notification sent to offline user");
      }
    }

    // ⏱️ Auto-miss call after 40 seconds
    setTimeout(async () => {
      try {
        const latest = await Conversation.findOne({
          uniqueName: convo.uniqueName,
        });

        if (
          latest &&
          latest.callStatus === "ringing" &&
          !latest.connectedAt &&
          !latest.endedAt
        ) {
          await Conversation.findOneAndUpdate(
            { uniqueName: convo.uniqueName },
            {
              callStatus: "ended",
              isMissed: true,
              endedAt: new Date(),
            }
          );

          console.log("⏱️ Call missed (no answer in 40s)");

          const callerSocket = onlineUsers.get(caller);
          if (callerSocket) {
            io.to(callerSocket).emit("call_missed", {
              uniqueName: convo.uniqueName,
            });
          }
        }
      } catch (timeoutErr) {
        console.error("missed-call timeout error:", timeoutErr);
      }
    }, 40 * 1000);

    // 3️⃣ Respond
    res.json(convo);

  } catch (err) {
    console.error("start-call error:", err);
    res.status(500).json({ message: err.message });
  }
});

/* ---------------------  ANSWER CALL  --------------------- */
// PUT /api/video/:uniqueName/answer-call
router.put("/:uniqueName/answer-call", async (req, res) => {
  const { caller, receiverId } = req.body || {};

  if (!caller || !receiverId) {
    return res.status(400).json({
      error: "caller and receiverId are required",
    });
  }

  try {
    const convo = await Conversation.findOneAndUpdate(
      { uniqueName: req.params.uniqueName },
      {
        callStatus: "connected",
        connectedAt: new Date(),
        isMissed: false,
        isRejected: false,
      },
      { new: true }
    );

    if (!convo) return res.status(404).json({ error: "Conversation not found" });

    // Notify caller that call accepted
    const io = req.app.get("io");
    const onlineUsers = req.app.get("onlineUsers");

    const callerSocket = onlineUsers.get(caller);
    if (callerSocket) {
      io.to(callerSocket).emit("call_accepted", {
        uniqueName: convo.uniqueName,
        room: convo.uniqueName,
        connectedAt: convo.connectedAt,
      });
    }

    // 🔔 Close browser notification on receiver side
    const receiverUser = await User.findOne({ email: receiverId });

    if (receiverUser?.pushSubscription) {
      await webpush.sendNotification(
        receiverUser.pushSubscription,
        JSON.stringify({
          type: "call_answered",
          uniqueName: convo.uniqueName,
        })
      );
    }

    res.json(convo);
  } catch (err) {
    console.error("answer-call error:", err);
    res.status(500).json({ message: err.message });
  }
});

/* ---------------------  END CALL  --------------------- */
// PUT /api/video/:uniqueName/end-call
router.put("/:uniqueName/end-call", async (req, res) => {
  const { caller, receiverId, reason } = req.body || {};

  if (!caller || !receiverId) {
    return res.status(400).json({
      error: "caller and receiverId are required",
    });
  }
  try {
    const now = new Date();

    const convo = await Conversation.findOneAndUpdate(
      { uniqueName: req.params.uniqueName },
      {
        callStatus: "ended",
        endedAt: now,
        // if reason provided, set flags
        isRejected: reason === "rejected" ? true : undefined,
        isMissed: reason === "missed" ? true : undefined,
      },
      { new: true }
    );

    if (!convo) return res.status(404).json({ error: "Conversation not found" });

    // Notify both participants if online
    const io = req.app.get("io");
    const onlineUsers = req.app.get("onlineUsers");

    if (receiverId) {
      const receiverSocket = onlineUsers.get(receiverId);
      if (receiverSocket) io.to(receiverSocket).emit("call_ended", { uniqueName: convo.uniqueName });
    }

    if (caller) {
      const callerSocket = onlineUsers.get(caller);
      if (callerSocket) io.to(callerSocket).emit("call_ended", { uniqueName: convo.uniqueName });
    }

    // Optionally reset to idle after some time or leave as ended for history
    // Example: set callStatus back to idle after 10s
    // setTimeout(() => Conversation.findByIdAndUpdate(convo._id, { callStatus: 'idle' }), 10000);

    // 🔔 Close browser notification for receiver
    const receiverUser = await User.findOne({ email: receiverId });

    if (receiverUser?.pushSubscription) {
      await webpush.sendNotification(
        receiverUser.pushSubscription,
        JSON.stringify({
          type: "call_ended",
          uniqueName: convo.uniqueName,
        })
      );
    }

    res.json(convo);
  } catch (err) {
    console.error("end-call error:", err);
    res.status(500).json({ message: err.message });
  }
});

/* ---------------------  GET CALL STATUS  --------------------- */
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