import express from "express"
import { likeSong, unlikeSong , getLikedSong } from "../controllers/like.controller.js";
import { protectedRoute } from "../middlewares/auth.middleware.js";


export const likeRouter = express.Router()

likeRouter.use(protectedRoute)

likeRouter.post("/song/:songId/like", likeSong);
likeRouter.delete("/song/:songId/unlike", unlikeSong);
likeRouter.get("/song/like-song", getLikedSong);
