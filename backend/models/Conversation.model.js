import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
  participants: {
    type: [String],  // emails or userIds
    required: true,
  },

  conversationSid: {
    type: String,
    required: true,
    unique: true,
  },

  uniqueName: {
    type: String,
    required: true,
    unique: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  firstMessageTime: { type: Date },
  subscribed: { type: Boolean, default: false },

  // --- VIDEO CALL FIELDS ---

  callStatus: {
    type: String,
    enum: ["idle", "ringing", "connected", "ended"],
    default: "idle",
  },

  caller: { type: String },          // email or id of caller
  receiver: { type: String },        // NEW: helps push notifications

  isRejected: { type: Boolean, default: false },  // NEW
  isMissed: { type: Boolean, default: false },    // NEW

  startedAt: { type: Date },          // NEW
  connectedAt: { type: Date },        // NEW
  endedAt: { type: Date },            // NEW

});

export default mongoose.model("Conversation", conversationSchema);