import express from "express";
import { login, logout, register } from "../controllers/auth.contorller.js";

export const authrouter = express.Router();

// @route   POST api/auth/login

authrouter.post("/register",register);
authrouter.post("/login",login);
authrouter.get("/logout",logout);
