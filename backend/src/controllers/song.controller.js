import { errorHandler } from "../errors/errorHandler.js"
import {songModel} from "../models/song.model.js";


export const getLatestSongs = async (req, res) => {
  try {
    // Fetch top 10 songs sorted from newest to oldest
    const latestSongs = await songModel.find()
      .sort({ createdAt: -1 })
      .limit(10).populate("artist")

    return res.status(200).json({
      success: true,
      data: latestSongs
    });
  } catch (error) {
    return errorHandler(res , 500 , "Internal Server Error")
  }
};

export const getPopularSongs = async (req, res) => {
  try {
    const popularSongs = await songModel.find()
      .sort({ likesCount: -1 })
      .limit(10);

    return res.status(200).json({
      success: true,
      data: popularSongs
    });
  } catch (error) {
    return errorHandler(res , 500 , "Internal Server Error")
  }
};
export const getAllSongs = async (req, res) => {
    try {
        // 1. Database se saare songs fetch karein
        // 2. Artist aur Album models se selectively zaroori details populate karein
        const songs = await songModel.find().populate("artist")

        // 3. Response return karein (agar gaane nahi hain, toh count: 0 aur data: [] jayega)
        return res.status(200).json({
            success: true,
            count: songs.length,
            data: songs
        });

    } catch (error) {
       console.error(error);
      return errorHandler(res, 500, "Internal Server Error");
    }
};