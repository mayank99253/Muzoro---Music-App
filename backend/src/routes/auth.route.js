import express from "express";
import {signupController , loginController , logoutController , getMeController, getMyFollowArtists, getMyAllPlaylists, getMyLikedSong, changePassword, updateCredentials } from "../controllers/auth.contorller.js";
import { protectedRoute } from "../middlewares/auth.middleware.js";
import { loginValidator, signupValidator } from "../validators/auth.validator.js";
import { handleValidationErrors } from "../errors/validatorError.js";

export const authrouter = express.Router();

// @route   POST api/auth/login

authrouter.post("/signup", signupValidator, handleValidationErrors, signupController);
authrouter.post("/login", loginValidator, handleValidationErrors, loginController);
authrouter.post("/logout", logoutController);

authrouter.use(protectedRoute)
authrouter.get("/get-me"  ,getMeController);
authrouter.get("/my-follow-artist" ,  getMyFollowArtists);
authrouter.get("/get-my-playlists" ,  getMyAllPlaylists);
authrouter.get("/my-liked-song" ,  getMyLikedSong);
authrouter.patch("/change-password", changePassword)
authrouter.patch("/update-user", updateCredentials)
