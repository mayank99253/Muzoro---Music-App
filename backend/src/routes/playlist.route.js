// routes/playlist.route.js
import express from "express";
import { protectedRoute } from "../middlewares/auth.middleware.js";
import {
  createPlaylist,
  getUserPlaylists,
  addSongToPlaylist,
  removeSongFromPlaylist
} from "../controllers/playlist.controller.js";

export const playlistRouter = express.Router();

playlistRouter.use(protectedRoute)

playlistRouter.post("/create", createPlaylist);
playlistRouter.post("/:playlistId/add-song/:songId", addSongToPlaylist);
playlistRouter.delete("/:playlistId/remove-song/:songId", removeSongFromPlaylist);
playlistRouter.get("/my-playlists", getUserPlaylists);
