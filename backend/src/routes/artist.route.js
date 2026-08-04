import express from 'express';
import { registerArtistController , getMySongController, uploadSong, getArtist, getMyArtistStatus, updateArtist, deleteSong } from '../controllers/artist.controller.js';
import { registerArtistValidator } from '../validators/artist.validator.js';
import {handleValidationErrors} from '../errors/validatorError.js';
import {protectedRoute} from '../middlewares/auth.middleware.js'; // Aapka JWT protector
import { artistMiddleware } from '../middlewares/artist.middleware.js';
import { cpUpload } from '../middlewares/multer.middleware.js';
import multer from 'multer';
export const artistRouter = express.Router();

const upload = multer({storage:multer.memoryStorage()})

artistRouter.use(protectedRoute)
// POST route: User ko artist banane ke liye
artistRouter.post("/register",upload.single("bannerImageUrl") ,registerArtistValidator, handleValidationErrors, registerArtistController );
artistRouter.get("/my-status", getMyArtistStatus);

artistRouter.use(artistMiddleware)

artistRouter.get("/get-my-song" , getMySongController )
artistRouter.get("/get-artist" , getArtist)
artistRouter.post("/upload-song" ,  cpUpload , uploadSong);
artistRouter.patch("/update-artist",upload.single("bannerImageUrl"), updateArtist)
artistRouter.delete("/delete-song/:songId" , deleteSong)




