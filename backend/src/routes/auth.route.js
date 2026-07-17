import express from "express";
import {signupController , loginController , logoutController , getMeController } from "../controllers/auth.contorller.js";
import { protectedRoute } from "../middlewares/auth.middleware.js";
import { loginValidator, signupValidator } from "../validators/auth.validator.js";
import { handleValidationErrors } from "../errors/validatorError.js";

export const authrouter = express.Router();

// @route   POST api/auth/login

authrouter.post("/signup", signupValidator, handleValidationErrors, signupController);
authrouter.post("/login", loginValidator, handleValidationErrors, loginController);
authrouter.post("/logout", logoutController);

authrouter.get("/get-me" , protectedRoute ,getMeController);
