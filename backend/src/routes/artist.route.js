import express from 'express';
import { registerArtistController , getMySongController, uploadSong, getArtist } from '../controllers/artist.controller.js';
import { registerArtistValidator } from '../validators/artist.validator.js';
import {handleValidationErrors} from '../errors/validatorError.js';
import {protectedRoute} from '../middlewares/auth.middleware.js'; // Aapka JWT protector
import { artistMiddleware } from '../middlewares/artist.middleware.js';
import { cpUpload } from '../middlewares/multer.middleware.js';

export const artistRouter = express.Router();

artistRouter.use(protectedRoute)
// POST route: User ko artist banane ke liye
artistRouter.post("/register", registerArtistValidator, handleValidationErrors, registerArtistController );

artistRouter.use(artistMiddleware)

artistRouter.get("/get-my-song" , getMySongController )
artistRouter.get("/get-artist" , getArtist)
artistRouter.post("/upload-song" ,  cpUpload , uploadSong);



