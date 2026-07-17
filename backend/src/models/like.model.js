import mongoose from "mongoose";

const likeSchema = new mongoose.Schema(
  {
    song: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Song",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { timestamps: true }
);

// Ek user ek song ko sirf ek baar like kar sake
likeSchema.index({ song: 1, user: 1 }, { unique: true });

export const likeModel = mongoose.model("Like", likeSchema);