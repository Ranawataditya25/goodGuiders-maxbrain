// backend/shared/schema.js
import { z } from "zod";

// Contact schema
export const insertContactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(1, "Message is required"),
});

// Referral schema
export const insertReferralSchema = z.object({
  referrerName: z.string().min(1, "Referrer name is required"),
  referrerEmail: z.string().email("Invalid referrer email"),
  friendName: z.string().min(1, "Friend name is required"),
  friendEmail: z.string().email("Invalid friend email"),
});

// Newsletter schema
export const insertNewsletterSchema = z.object({
  email: z.string().email("Invalid email"),
});
