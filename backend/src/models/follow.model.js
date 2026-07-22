import mongoose from "mongoose";

const followSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    artist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Artist",
      required: true,
    },
  },
  { timestamps: true }
);

// Prevent duplicate follow (same user can't follow same artist twice)
followSchema.index({ user: 1, artist: 1 }, { unique: true });

export const followModel = mongoose.model("Follow", followSchema);
