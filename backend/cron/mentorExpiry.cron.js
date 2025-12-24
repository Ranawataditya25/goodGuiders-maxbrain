import cron from "node-cron";
import PdfEvaluation from "../models/PdfEvaluation.model.js";

export const mentorExpiryCron = () => {
  cron.schedule("*/15 * * * *", async () => {
    try {
      const now = new Date();

      const expired = await PdfEvaluation.updateMany(
        {
          status: { $in: ["assigned_mentor", "accepted"] },
          mentorDeadline: { $lt: now },
        },
        {
          $set: { status: "expired" },
          $unset: {
            mentorId: "",
            mentorDeadline: "",
            mentorAssignedAt: "",
          },
        }
      );

      if (expired.modifiedCount > 0) {
        console.log(
          `[CRON] Expired ${expired.modifiedCount} mentor evaluations`
        );
      }
    } catch (err) {
      console.error("[CRON mentorExpiry]", err);
    }
  });
};