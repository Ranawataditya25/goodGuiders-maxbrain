import express from "express";
import { buyPdf, getUserPurchases } from "../controllers/purchasePdfController.js";

const router = express.Router();

router.post("/buy", buyPdf); // Buy single/combo PDF
router.get("/user/:userId", getUserPurchases); // Get user purchases

export default router;
