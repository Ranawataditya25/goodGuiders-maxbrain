import Purchase from "../models/PurchasePdf.model.js";

// ✅ Single or combo purchase API
export const buyPdf = async (req, res) => {
  try {
    const { userId, pdfs } = req.body; // pdfs = [{ id, title }]
    if (!userId || !pdfs?.length)
      return res.status(400).json({ ok: false, message: "Missing data" });

    let type = pdfs.length > 1 ? "combo" : "single";
    let price = type === "combo" ? 129 : 49;

    const purchases = await Promise.all(
      pdfs.map((p) =>
        Purchase.findOneAndUpdate(
          { userId, pdfId: p.id },
          { userId, pdfId: p.id, pdfTitle: p.title, price, type },
          { upsert: true, new: true }
        )
      )
    );

    res.json({
      ok: true,
      message: `Purchased ${type} plan`,
      items: purchases,
      totalPrice: price,
    });
  } catch (err) {
    res.status(500).json({ ok: false, message: err.message });
  }
};

// ✅ Check purchased PDFs for user
export const getUserPurchases = async (req, res) => {
  try {
    const { userId } = req.params;
    const items = await Purchase.find({ userId }).sort({ purchasedAt: -1 });
    res.json({ ok: true, items });
  } catch (err) {
    res.status(500).json({ ok: false, message: err.message });
  }
};
