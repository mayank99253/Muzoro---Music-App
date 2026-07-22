// controllers/playlist.controller.js
import { playlistModel } from "../models/playlist.model.js";
import { playlistSongModel } from "../models/playlistsong.model.js";
import { errorHandler } from "../errors/errorHandler.js";
import { songModel } from "../models/song.model.js";

export const createPlaylist = async (req, res) => {
  try {
    const { name } = req.body;
    const userId = req.user._id;

    if (!name || !name.trim()) {
      return errorHandler(res, 400, "Playlist name is required"); 
    }

    const newPlaylist = await playlistModel.create({
      name: name.trim(),
      owner: userId,
    });

    res.status(201).json(newPlaylist);
  } catch (error) {
    console.error("Error in createPlaylist controller:", error.message);
    return errorHandler(res, 500, "Internal Server Error");
  }
};

// POST /api/playlist/:playlistId/add-song
export const addSongToPlaylist = async (req, res) => {
  try {
    const { playlistId, songId } = req.params;
    const userId = req.user._id;

    const song = await songModel.findOne(songId);
    if(!song) return errorHandler(res , 404 , "Song not found")

    // Ownership check — apni hi playlist me song add kar sakta hai
    const playlist = await playlistModel.findById(playlistId);
    if (!playlist) {
      return errorHandler(res, 404, "Playlist not found");
    }
    if (playlist.owner.toString() !== userId.toString()) {
      return errorHandler(res, 403, "You can't modify this playlist");
    }

    const newEntry = await playlistSongModel.create({
      playlist: playlistId,
      song: songId,
    });

    res.status(201).json(newEntry);
  } catch (error) {
    // Duplicate key error — song already exists in this playlist
    if (error.code === 11000) {
      return errorHandler(res, 409, "Song already in this playlist");
    }
    console.error("Error in addSongToPlaylist controller:", error.message);
    return errorHandler(res, 500, "Internal Server Error");
  }
};

export const removeSongFromPlaylist = async (req, res) => {
  try {
    const { playlistId, songId } = req.params;
    const userId = req.user._id;

    // Ownership check — apni hi playlist se song remove kar sakta hai
    const playlist = await playlistModel.findById(playlistId);
    if (!playlist) {
      return errorHandler(res, 404, "Playlist not found");
    }
    if (playlist.owner.toString() !== userId.toString()) {
      return errorHandler(res, 403, "You can't modify this playlist");
    }

    const deletedEntry = await playlistSongModel.findOneAndDelete({
      playlist: playlistId,
      song: songId,
    });

    if (!deletedEntry) {
      return errorHandler(res, 404, "Song not found in this playlist");
    }

    res.status(200).json({ message: "Song removed from playlist successfully" });
  } catch (error) {
    console.error("Error in removeSongFromPlaylist controller:", error.message);
    return errorHandler(res, 500, "Internal Server Error");
  }
};

// GET /api/playlist/my-playlists
export const getUserPlaylists = async (req, res) => {
  try {
    const userId = req.user._id;

    const playlists = await playlistModel.find({ owner: userId }).sort({ createdAt: -1 });

    // Har playlist ke liye uske songs junction table se nikalo
    const playlistsWithSongs = await Promise.all(
      playlists.map(async (pl) => {
        const entries = await playlistSongModel.find({ playlist: pl._id }).populate({
          path: "song",
          populate: { path: "artist", select: "stageName" },
        });

        return {
          _id: pl._id,
          name: pl.name,
          createdAt: pl.createdAt,
          songs: entries.map((e) => e.song),
        };
      })
    );

    res.status(200).json(playlistsWithSongs);
  } catch (error) {
    console.error("Error in getUserPlaylists controller:", error.message);
    return errorHandler(res, 500, "Internal Server Error");
  }
};