import mongoose from "mongoose"

const historySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
    unique: true,   // ek user ka ek hi history document banega
  },
  songs: [
    {
      song: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Song",
      },
      playedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

export const historyModel = mongoose.model("history", historySchema);