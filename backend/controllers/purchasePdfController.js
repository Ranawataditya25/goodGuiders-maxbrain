import Purchase from "../models/PurchasePdf.model.js";
import { pdfCombos } from "../config/pdfCombos.js";

// ✅ Buy PDF Plan (PYQS / NOTES / BOTH)
export const buyPdf = async (req, res) => {
  try {
    const { planType } = req.body;
    const userId = req.user._id;

    if (!planType || !pdfCombos[planType]) {
      return res.status(400).json({ ok: false, message: "Invalid plan type" });
    }

    const { price } = pdfCombos[planType];

    // Calculate expiry (1 year)
    const expiryDate = new Date();
    expiryDate.setFullYear(expiryDate.getFullYear() + 1);

    // Upsert purchase (if already bought, extend 1 year more)
    const purchase = await Purchase.findOneAndUpdate(
      { userId, planType },
      {
        userId,
        planType,
        price,
        expiryDate,
        status: "active",
        purchasedAt: new Date(),
      },
      { upsert: true, new: true }
    );

    res.json({
      ok: true,
      message: `Successfully purchased ${pdfCombos[planType].name}`,
      data: purchase,
    });
  } catch (err) {
    res.status(500).json({ ok: false, message: err.message });
  }
};

// ✅ Get All Purchases (active + expired)
export const getUserPurchases = async (req, res) => {
  try {
    const userId = req.user._id;

    const purchases = await Purchase.find({ userId }).sort({ purchasedAt: -1 });

    const now = new Date();
    for (const p of purchases) {
      if (p.expiryDate < now && p.status === "active") {
        p.status = "expired";
        await p.save();
      }
    }

    const active = purchases.filter((p) => p.status === "active");
    const expired = purchases.filter((p) => p.status === "expired");

    res.json({ ok: true, active, expired });
  } catch (err) {
    res.status(500).json({ ok: false, message: err.message });
  }
};


// ✅ Check Active Subscription
export const checkActiveSubscription = async (req, res) => {
  try {
    const userId = req.user._id;

    const activePurchases = await Purchase.find({
      userId,
      status: "active",
      expiryDate: { $gte: new Date() },
    });

    res.json({
      ok: true,
      hasActive: activePurchases.length > 0,
      activePlans: activePurchases,
    });
  } catch (err) {
    res.status(500).json({ ok: false, message: err.message });
  }
};
