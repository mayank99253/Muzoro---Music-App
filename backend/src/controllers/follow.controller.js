import { followModel } from "../models/follow.model.js";
import { artistModel } from "../models/artist.model.js";
import { errorHandler } from "../errors/errorHandler.js";
import { songModel } from "../models/song.model.js"

// 1. Follow an artist
export const followArtist = async (req, res) => {
  try {
    const userId = req.user._id;
    const { artistId } = req.params;

    const artist = await artistModel.findById(artistId);
    if (!artist) {
      return errorHandler(res, 404, "Artist not found");
    }

    const alreadyFollowing = await followModel.findOne({ user: userId, artist: artistId });
    if (alreadyFollowing) {
      return errorHandler(res, 409, "Already following this artist");
    }

    const follow = await followModel.create({ user: userId, artist: artistId });

    // Optional: keep a counter on Artist doc for quick access
    await artistModel.findByIdAndUpdate(artistId, { $inc: { followersCount: 1 } });

    return res.status(201).json({ message: "Artist followed successfully", follow });
  } catch (error) {
    console.error("Follow Artist Error: ", error);
    return errorHandler(res, 500, "Failed to follow artist");
  }
};

// 2. Unfollow an artist
export const unfollowArtist = async (req, res) => {
  try {
    const userId = req.user._id;
    const { artistId } = req.params;

    const follow = await followModel.findOneAndDelete({ user: userId, artist: artistId });
    if (!follow) {
      return errorHandler(res, 404, "You are not following this artist");
    }

    await artistModel.findByIdAndUpdate(artistId, { $inc: { followersCount: -1 } });

    return res.status(200).json({ message: "Artist unfollowed successfully" });
  } catch (error) {
    console.error("Unfollow Artist Error: ", error);
    return errorHandler(res, 500, "Failed to unfollow artist");
  }
};

// 3. Get all artists followed by the current user
export const getAllArtists = async (req, res) => {
  try {
    const allArtist = await artistModel.find({
      isVerified: { $ne: false },
      isBan: { $ne: true }
    });

    return res.status(200).json({ allArtist });
  } catch (error) {
    console.error("Get Followed Artists Error: ", error);
    return errorHandler(res, 500, "Failed to fetch followed artists");
  }
};

// 4. Check if current user follows a specific artist (useful for frontend heart/follow icon state)
export const checkIsFollowing = async (req, res) => {
  try {
    const userId = req.user._id;
    const { artistId } = req.params;

    const follow = await followModel.findOne({ user: userId, artist: artistId });

    return res.status(200).json({ isFollowing: !!follow });
  } catch (error) {
    console.error("Check Follow Status Error: ", error);
    return errorHandler(res, 500, "Failed to check follow status");
  }
};

export const getArtistSong = async (req, res) => {
  try {
    const {artistId} = req.params;

    const artistSongs = await songModel.find({artist:artistId} )

    return res.status(200).json( artistSongs)

  } catch (error) {
    console.error(error);
    return errorHandler(res, 500, "Internal Server Error")
  }
}