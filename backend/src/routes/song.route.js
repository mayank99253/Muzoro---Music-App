import express from "express"
import { cpUpload} from "../middlewares/multer.middleware.js";
import { uploadSong } from "../controllers/song.controller.js";
import { protectedRoute } from "../middlewares/auth.middleware.js";
import { artistMiddleware } from "../middlewares/artist.middleware.js";

export const songRouter = express.Router();

songRouter.post("/upload-song" , protectedRoute, artistMiddleware, cpUpload , uploadSong);
