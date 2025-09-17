// routes/storage.route.js
import express from "express";
import Contact from "../models/Contact.model.js";
import Referral from "../models/Referral.model.js";
import Newsletter from "../models/Newsletter.model.js";
import {
  insertContactSchema,
  insertReferralSchema,
  insertNewsletterSchema,
} from "../shared/schema.js";

const router = express.Router();

// Create Contact
router.post("/contact", async (req, res) => {
  try {
    // ✅ validate incoming data
    const contactData = insertContactSchema.parse(req.body);

    const contact = new Contact(contactData);
    await contact.save();
    res.json({
      success: true,
      message: "Thank you for contacting us. Our team will reach out shortly.",
      contact,
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// Create Referral
router.post("/referral", async (req, res) => {
  try {
    const referralData = insertReferralSchema.parse(req.body);

    const referral = new Referral(referralData);
    await referral.save();
    res.json({
      success: true,
      message:
        "Referral sent successfully! You will earn ₹50 when your friend joins.",
      referral,
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// Create Newsletter Subscription
router.post("/newsletter", async (req, res) => {
  try {
    const newsletterData = insertNewsletterSchema.parse(req.body);

    // ✅ check for duplicate email
    const exists = await Newsletter.findOne({ email: newsletterData.email });
    if (exists) {
      return res
        .status(400)
        .json({ success: false, error: "Email already subscribed" });
    }

    const newsletter = new Newsletter(newsletterData);
    await newsletter.save();
    res.json({
      success: true,
      message: "Thank you for subscribing to our newsletter!",
      subscription: newsletter,
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

export default router;
