import express from "express"
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

adminRouter.post("/admin-login", adminLoginController);

adminRouter.get("/get-me", protectedAdminRoute, adminMiddleware, (req, res) => { res.json(req.user) });

adminRouter.post("/admin-logout", adminLogoutController);

adminRouter.patch("/artist/approve/:id", protectedAdminRoute, adminMiddleware, approveArtist);

adminRouter.delete("/artist/reject/:id", protectedAdminRoute, adminMiddleware, rejectArtist);
// Testing Done

adminRouter.get("/artists/pending", protectedAdminRoute, adminMiddleware, getPendingArtists);

adminRouter.get("/artists/verified", protectedAdminRoute, adminMiddleware, getVerifiedArtists);

adminRouter.get("/all-songs", protectedAdminRoute, adminMiddleware, getAllSongs);
// Route: DELETE /api/v1/songs/:id
adminRouter.delete("/songs/:id", protectedAdminRoute, adminMiddleware, deleteSong);

adminRouter.patch('/ban/artist/:id', protectedAdminRoute, adminMiddleware, banArtist);

adminRouter.patch('/unban/artist/:id', protectedAdminRoute , adminMiddleware, unbanArtist);

adminRouter.get('/get-ban-artists', protectedAdminRoute , adminMiddleware, getBanArtist);


