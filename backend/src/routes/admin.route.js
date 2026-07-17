import express from "express";
import {
    adminLoginController,
    adminLogoutController,
    approveArtist,
    banArtist,
    deleteSong,
    getAllSongs,
    getBanArtist,
    getPendingArtists,
    getVerifiedArtists,
    rejectArtist,
    unbanArtist
} from "../controllers/admin.controller.js";
import { adminMiddleware, protectedAdminRoute } from "../middlewares/admin.middleware.js";

export const adminRouter = express.Router();

// 1. PUBLIC ROUTES (No authentication required)
adminRouter.post("/admin-login", adminLoginController);

// 2. APPLY MIDDLEWARE GLOBALLY (Everything below this line will be protected)
adminRouter.use(protectedAdminRoute, adminMiddleware);

// 3. PROTECTED ROUTES
adminRouter.post("/admin-logout", adminLogoutController);

adminRouter.get("/get-me", (req, res) => { res.json(req.user) });

adminRouter.patch("/artist/approve/:id", approveArtist);
adminRouter.delete("/artist/reject/:id", rejectArtist);

adminRouter.get("/artists/pending", getPendingArtists);
adminRouter.get("/artists/verified", getVerifiedArtists);

adminRouter.get("/all-songs", getAllSongs);
adminRouter.delete("/songs/:id", deleteSong);

adminRouter.patch('/ban/artist/:id', banArtist);
adminRouter.patch('/unban/artist/:id', unbanArtist);
adminRouter.get('/get-ban-artists', getBanArtist);