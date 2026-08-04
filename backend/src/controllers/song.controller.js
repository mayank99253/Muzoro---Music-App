import { errorHandler } from "../errors/errorHandler.js"
import { playlistModel } from "../models/playlist.model.js";
import { playlistSongModel } from "../models/playlistsong.model.js";
import { songModel } from "../models/song.model.js";


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
    return errorHandler(res, 500, "Internal Server Error")
  }
};

export const getPopularSongs = async (req, res) => {
  try {
    const popularSongs = await songModel.find()
      .sort({ likesCount: -1 })
      .limit(10).populate("artist")

    return res.status(200).json({
      success: true,
      data: popularSongs
    });
  } catch (error) {
    return errorHandler(res, 500, "Internal Server Error")
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

export const generateMoodPlaylist = async (req, res) => {
  try {
    const { expression } = req.body;
    const userId = req.user._id;

    if (!expression) {
      return errorHandler(res, 400, "Expression is required")
    }
    const normalizedExpression = expression.toLowerCase();
    const moodCategoryMap = {
      "happy": ["happy", "pop", "hip-hop", "indie"],
      "sad": ["sad", "lo-fi", "classical"],
      "focused": ["phonk", "rock", "electronic"],
      "surprised": ["electronic", "pop", "hip-hop"],
      "neutral": ["lo-fi", "jazz", "indie"],
    };

    const primaryCategories = moodCategoryMap[normalizedExpression];

    // 10 songs from the mood's related categories (mixed)
    const primarySongs = await songModel.aggregate([
      { $match: { category: { $in: primaryCategories } } },
      { $sample: { size: 10 } },
    ]);
    await songModel.populate(primarySongs, { path: "artist", select: "stageName" });

    const varietySongs = await songModel.aggregate([
      { $match: { category: { $nin: primaryCategories } } },
      { $sample: { size: 4 } },
    ]);
    await songModel.populate(varietySongs, { path: "artist", select: "stageName" });

    const finalSongs = [...primarySongs, ...varietySongs].slice(0, 14);

    // Check if user already has a mood playlist
    let playlist = await playlistModel.findOne({ owner: userId, isMoodPlaylist: true });

    if (playlist) {
      // Purani songs hata do, playlist doc wahi reuse karo
      await playlistSongModel.deleteMany({ playlist: playlist._id });
      playlist.mood = normalizedExpression;
      playlist.name = `Mood: ${normalizedExpression}`;
      await playlist.save();
    } else {
      // Pehli baar - naya playlist doc banao
      playlist = await playlistModel.create({
        name: `Mood: ${normalizedExpression}`,
        owner: userId,
        isMoodPlaylist: true,
        mood: normalizedExpression,
      });
    }

    // Naye songs ko playlist se link karo
    const playlistSongDocs = finalSongs.map((song) => ({
      playlist: playlist._id,
      song: song._id,
    }));
    await playlistSongModel.insertMany(playlistSongDocs);

    res.status(200).json({
      message: "Mood playlist generated successfully",
      playlist,
      songs: finalSongs,
    });
  } catch (error) {
    console.error("Mood playlist error:", error);
    res.status(500).json({ message: "Failed to generate mood playlist" });
  }
};