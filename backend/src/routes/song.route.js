import express from "express"
import { 
    generateMoodPlaylist,
    getAllSongs,
    getLatestSongs, 
    getPopularSongs, 
 } from "../controllers/song.controller.js";
import { protectedRoute } from "../middlewares/auth.middleware.js";

export const songRouter = express.Router();

songRouter.use(protectedRoute);

songRouter.get("/get-latest-songs" , getLatestSongs);
songRouter.get("/get-popular-songs" , getPopularSongs);
songRouter.get("/all-songs", getAllSongs);
songRouter.post("/mood-songs", generateMoodPlaylist);


