// models/playlistSong.model.js
import mongoose from "mongoose";

const playlistSongSchema = new mongoose.Schema({
  playlist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Playlist",
    required: true,
  },
  song: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Song",
    required: true,
  },
});

// Same song ek playlist me do baar add nahi ho sakta — DB level pe hi block
playlistSongSchema.index({ playlist: 1, song: 1 }, { unique: true });

export const playlistSongModel = mongoose.model("PlaylistSong", playlistSongSchema);
