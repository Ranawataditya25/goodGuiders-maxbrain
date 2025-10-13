import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
  participants: { type: [String], required: true }, // array of emails
  conversationSid: { type: String, required: true, unique: true },
  uniqueName: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },

  firstMessageTime: { type: Date }, // timestamp of first message
  subscribed: { type: Boolean, default: false }, // true if user paid

    callStatus: {
    type: String,
    enum: ["idle", "ringing", "connected"],
    default: "idle",
  },
  caller: { type: String }, // who started the call
});

export default mongoose.model("Conversation", conversationSchema);
