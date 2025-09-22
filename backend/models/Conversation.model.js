import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
  participants: { type: [String], required: true }, // array of emails
  conversationSid: { type: String, required: true, unique: true },
  uniqueName: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Conversation", conversationSchema);

