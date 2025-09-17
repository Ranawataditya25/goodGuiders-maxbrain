// backend/models/TestAssignment.model.js
import mongoose from "mongoose";

const { Schema, Types } = mongoose;

/** Coerce strings -> ObjectId */
const toObjectId = (v) => (v == null ? v : (Types.ObjectId.isValid(v) ? new Types.ObjectId(v) : v));

const TestAssignmentSchema = new Schema(
  {
    /** Link to the paper/test */
    testId: {
      type: Schema.Types.ObjectId,
      ref: "Questions",
      required: true,
      index: true,
      set: toObjectId,
    },

    /** Always store as ObjectId[] */
    studentIds: {
      type: [{ type: Schema.Types.ObjectId, ref: "User", index: true }],
      set: (arr) => (Array.isArray(arr) ? arr.map(toObjectId) : arr),
      default: [],
    },

    /** OPTIONAL TIMER — minutes */
    // Primary canonical field used by the app
    durationMinutes: { type: Number, min: 1, default: null },

    // Back-compat aliases (some FE code checks these)
    durationMin: { type: Number, min: 1, default: null },
    timeLimitMin: { type: Number, min: 1, default: null },

    // Optional “settings” bag for future growth; FE also checks settings.durationMinutes
    settings: {
      type: Schema.Types.Mixed,
      default: {},
    },

    dueAt: { type: Date, index: true },
    note: { type: String, default: "" },
    status: {
      type: String,
      default: "assigned",
      index: true,
      enum: ["assigned", "in_progress", "completed", "expired"],
    },

    assignedBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
    collection: "testassignments",
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

/** Virtual: allow .populate('test') while we store testId */
TestAssignmentSchema.virtual("test", {
  ref: "Questions",
  localField: "testId",
  foreignField: "_id",
  justOne: true,
});

/** Normalize before save */
TestAssignmentSchema.pre("save", function (next) {
  if (Array.isArray(this.studentIds)) this.studentIds = this.studentIds.map(toObjectId);
  if (this.testId) this.testId = toObjectId(this.testId);

  // Mirror timer across known keys so any FE check works
  const mins =
    this.durationMinutes ??
    this.durationMin ??
    this.timeLimitMin ??
    (this.settings && this.settings.durationMinutes);

  if (mins && mins > 0) {
    this.durationMinutes = mins;
    this.durationMin = mins;
    this.timeLimitMin = mins;
    this.settings = this.settings || {};
    if (!this.settings.durationMinutes) this.settings.durationMinutes = mins;
  }
  next();
});

/** Static helpers (as you had) … */
TestAssignmentSchema.statics.normalizeIds = async function () {
  try {
    await this.updateMany(
      { studentIds: { $type: "array" }, $expr: { $gt: [{ $size: "$studentIds" }, 0] } },
      [
        {
          $set: {
            studentIds: {
              $map: {
                input: "$studentIds",
                as: "sid",
                in: {
                  $cond: [
                    { $eq: [{ $type: "$$sid" }, "string"] },
                    { $toObjectId: "$$sid" },
                    "$$sid",
                  ],
                },
              },
            },
          },
        },
      ]
    );

    await this.updateMany(
      { testId: { $type: "string" } },
      [{ $set: { testId: { $toObjectId: "$testId" } } }]
    );
  } catch (err) {
    console.error("[TestAssignment] normalization failed:", err);
  }
};

TestAssignmentSchema.statics.findForStudent = function ({ studentId }) {
  const q = {};
  if (studentId) q.studentIds = toObjectId(studentId);
  return this.find(q).sort({ createdAt: -1 }).populate("test", "_id title subjects class testType");
};

TestAssignmentSchema.methods.linkTest = async function (newTestId) {
  this.testId = toObjectId(newTestId);
  await this.save();
  return this.populate("test", "_id title subjects class testType");
};

TestAssignmentSchema.index({ studentIds: 1, dueAt: -1 });
TestAssignmentSchema.index({ status: 1, dueAt: -1 });

export default mongoose.model("TestAssignment", TestAssignmentSchema);
