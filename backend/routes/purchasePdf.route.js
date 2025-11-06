import express from "express";
import { buyPdf, getUserPurchases, checkActiveSubscription } from "../controllers/purchasePdfController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/buy", protect, buyPdf);
router.get("/my-purchases", protect, getUserPurchases);
router.get("/active", protect, checkActiveSubscription); // ✅ new route

export default router;
