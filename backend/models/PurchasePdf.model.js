import mongoose from "mongoose";

const purchaseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  planType: {
    type: String,
    enum: ["PYQS", "NOTES", "PYQS_NOTES"],
    required: true
  },
  price: { type: Number, required: true },
  duration: { type: String, enum: ["1year"], default: "1year" },
  purchasedAt: { type: Date, default: Date.now },
  expiryDate: { type: Date, required: true },
  status: { type: String, enum: ["active", "expired"], default: "active" }
});

export default mongoose.model("Purchase", purchaseSchema);
