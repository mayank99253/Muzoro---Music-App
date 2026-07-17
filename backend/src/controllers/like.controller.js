import { errorHandler } from "../errors/errorHandler.js";
import { songModel } from "../models/song.model.js";
import { likeModel } from "../models/like.model.js";
import { populate } from "dotenv";

// POST /api/songs/:songId/like
export const likeSong = async (req, res) => {
  try {
    const { songId } = req.params;
    const userId = req.user._id; // auth middleware se aayega

    const song = await songModel.findById(songId);
    if (!song) return errorHandler(res, 404, "Song not found");

    await likeModel.create({ song: songId, user: userId });

    const updatedSong = await songModel.findByIdAndUpdate(
      songId,
      { $inc: { likesCount: 1 } },
      { new: true }
    );

    return res.status(201).json({
      success: true,
      message: "Song liked",
      likesCount: updatedSong.likesCount,
    });
  } catch (error) {
    if (error.code === 11000) {
      return errorHandler(res, 409, "Already liked");
    }
    return errorHandler(res, 500, error.message);
  }
};

// DELETE /api/songs/:songId/like
export const unlikeSong = async (req, res) => {
  try {
    const { songId } = req.params;
    const userId = req.user._id;

    const deleted = await likeModel.findOneAndDelete({ song: songId, user: userId });

    if (!deleted) {
      return errorHandler(res, 404, "Like not found");
    }

    const updatedSong = await songModel.findByIdAndUpdate(
      songId,
      { $inc: { likesCount: -1 } },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Song unliked",
      likesCount: updatedSong.likesCount,
    });
  } catch (error) {
    return errorHandler(res, 500, error.message);
  }
};

export const getLikedSong = async (req, res) => {
  try {
    const userId = req.user._id;

    const likedSong = await likeModel.find({user : userId}).populate({
      path : "song",
      populate : {
        path : "artist",
        select : "stageName"
      }
    });
    return res.status(200).json({likedSong :likedSong || []})
  } catch (error) {
    console.error(error)
    return errorHandler(res , 500 , "Internal Server Error")
  }
}