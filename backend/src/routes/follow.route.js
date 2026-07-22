import express from "express";
import {
  followArtist,
  unfollowArtist,
  checkIsFollowing,
  getAllArtists,
  getArtistSong
} from "../controllers/follow.controller.js";
import { protectedRoute } from "../middlewares/auth.middleware.js";

export const followRouter = express.Router();

followRouter.use(protectedRoute)

followRouter.post("/artist/:artistId/follow", followArtist);
followRouter.delete("/artist/:artistId/unfollow", unfollowArtist);
followRouter.get("/artist/get-all-artist", getAllArtists);
followRouter.get("/artist/:artistId/song", getArtistSong);


followRouter.get("/artist/:artistId/is-following",  checkIsFollowing);
