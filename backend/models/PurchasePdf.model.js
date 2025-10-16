import mongoose from "mongoose";

const purchaseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  pdfId: { type: String, required: true }, // unique ID or URL
  pdfTitle: { type: String },
  price: { type: Number, required: true },
  type: { type: String, enum: ["single", "combo"], default: "single" },
  purchasedAt: { type: Date, default: Date.now },
});

export default mongoose.model("Purchase", purchaseSchema);