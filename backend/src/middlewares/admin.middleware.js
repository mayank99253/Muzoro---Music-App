import jwt from "jsonwebtoken";
import { errorHandler } from "../errors/errorHandler.js";
import { userModel } from "../models/user.model.js";
import { ENV } from "../lib/env.js";

export const adminMiddleware = (req, res, next) => {
    // req.user data aapke standard authMiddleware se populate hokar aayega
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({ success: false, message: "Access denied. Admin resources only." });
    }
    next();
};


export const protectedAdminRoute = async (req, res, next) => {
    try {
        const token = req.cookies.adminToken;

        if (!token) {
            return errorHandler(res, 401, "Unauthorized");
        }

        const decoded = jwt.verify(token, ENV.JWT_SECRET);
        if (!decoded) {
            return errorHandler(res, 401, "Unauthorized : Invalid Token");
        }

        const user = await userModel.findById(decoded.userId)

        if (!user) {
            return errorHandler(res, 401, "Unauthorized");
        }

        req.user = user;

        next();
    } catch (error) {
        if (
            error.name === "TokenExpiredError" ||
            error.name === "JsonWebTokenError"
        ) {
            return errorHandler(res, 401, "Unauthorized: Invalid Token");
        }
        return errorHandler(res, 500, "Internal Server Error");
    }
};