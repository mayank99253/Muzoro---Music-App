import express from "express"
import { adminLoginController, adminLogoutController, approveArtist, rejectArtist } from "../controllers/admin.controller.js";
import { adminMiddleware, protectedAdminRoute } from "../middlewares/admin.middleware.js";

export const adminRouter = express.Router();

adminRouter.post("/admin-login" , adminLoginController);

adminRouter.post("/admin-logout" , adminLogoutController);

adminRouter.patch("/artist/approve/:id" , protectedAdminRoute , adminMiddleware , approveArtist);

adminRouter.delete("/artist/reject/:id" , protectedAdminRoute , adminMiddleware , rejectArtist);

