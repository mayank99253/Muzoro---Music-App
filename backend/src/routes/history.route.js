import express from "express"
import { protectedRoute } from "../middlewares/auth.middleware.js";
import { addToHistory, getHistory } from "../controllers/history.controller.js";

export const historyRouter = express.Router();

historyRouter.use(protectedRoute)

historyRouter.post("/addtohistory/:songId" , addToHistory)
historyRouter.get("/get-history" , getHistory)