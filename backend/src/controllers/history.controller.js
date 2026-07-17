import { historyModel } from "../models/history.model.js";

export const addToHistory = async(req, res)=>{
  try {
    const { songId } = req.params;
    const userId = req.user._id;

    const history = await historyModel.findOneAndUpdate(
      { user: userId },
      {
        $push: {
          songs: {
            $each: [{ song: songId, playedAt: new Date() }],
            $position: 0,
            $slice: 10,
          },
        },
      },
      { new: true, upsert: true }
    );

    return res.status(200).json({ success: true, history });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getHistory = async(req, res)=>{
    try {
    const userId = req.user._id;
    const history = await historyModel.findOne({ user: userId }).populate({
      path : "songs.song",
      populate : {
        path : "artist",
        select : "stageName"
      }
    });

    const songs = history ? history.songs : [];

    return res.status(200).json({ success: true, data: songs });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}