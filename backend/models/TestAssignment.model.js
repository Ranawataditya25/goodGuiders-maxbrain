// backendd/models/TestAssignment.model.js
import mongoose from "mongoose";

const { Schema, Types } = mongoose;

/** Coerce strings -> ObjectId */
const toObjectId = (v) =>
  v == null ? v : (Types.ObjectId.isValid(v) ? new Types.ObjectId(v) : v);

const TestAssignmentSchema = new Schema(
  {
    /**
     * THE LINK TO THE PAPER
     * You already store it as testId referencing the Questions collection.
     * Keep this as-is so existing data/routes continue to work.
     */
    testId: {
      type: Schema.Types.ObjectId,
      ref: "Question",        // <- your paper/test model name
      required: true,
      index: true,
      set: toObjectId,
    },

    /** Always store as ObjectId[] */
    studentIds: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "User",
          index: true,
        },
      ],
      // Extra safety: coerce any incoming strings to ObjectId on set
      set: (arr) => (Array.isArray(arr) ? arr.map(toObjectId) : arr),
      default: [],
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

/**
 * VIRTUAL: `test`
 * Lets you call .populate('test') even though the stored field is `testId`.
 * This matches the frontend which tries a?.test || a?.testId.
 */
TestAssignmentSchema.virtual("test", {
  ref: "Question",          // same collection as `testId` ref
  localField: "testId",
  foreignField: "_id",
  justOne: true,
});

/** Coerce on save too (e.g., if array items changed after instantiation) */
TestAssignmentSchema.pre("save", function (next) {
  if (Array.isArray(this.studentIds)) {
    this.studentIds = this.studentIds.map(toObjectId);
  }
  if (this.testId) {
    this.testId = toObjectId(this.testId);
  }
  next();
});

/**
 * Static helper you can call once on startup to normalize
 * any legacy docs that still have string ids in studentIds or testId.
 * Uses an aggregation pipeline update so it runs fully in MongoDB.
 */
TestAssignmentSchema.statics.normalizeIds = async function () {
  try {
    // studentIds: string[] -> ObjectId[]
    const res1 = await this.updateMany(
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

    // testId: string -> ObjectId
    const res2 = await this.updateMany(
      { testId: { $type: "string" } },
      [{ $set: { testId: { $toObjectId: "$testId" } } }]
    );

    const msg = [
      res1?.modifiedCount ? `studentIds normalized: ${res1.modifiedCount}` : null,
      res2?.modifiedCount ? `testId normalized: ${res2.modifiedCount}` : null,
    ]
      .filter(Boolean)
      .join(" | ");

    console.log(msg || "[TestAssignment] no legacy id normalization needed.");
  } catch (err) {
    console.error("[TestAssignment] normalization failed:", err);
  }
};

/** Convenience finder: all assignments for a student */
TestAssignmentSchema.statics.findForStudent = function ({ studentId, email }) {
  const q = {};
  if (studentId) q.studentIds = toObjectId(studentId);
  // If you also store studentEmail on this model, add it here.
  return this.find(q).sort({ createdAt: -1 }).populate("test", "_id title subjects class testType");
};

/** Instance helper: link/replace the test for an existing assignment */
TestAssignmentSchema.methods.linkTest = async function (newTestId) {
  this.testId = toObjectId(newTestId);
  await this.save();
  return this.populate("test", "_id title subjects class testType");
};

/** Helpful indexes */
TestAssignmentSchema.index({ studentIds: 1, dueAt: -1 });
TestAssignmentSchema.index({ status: 1, dueAt: -1 });

export default mongoose.model("TestAssignment", TestAssignmentSchema);
