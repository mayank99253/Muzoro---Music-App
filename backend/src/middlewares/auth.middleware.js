import { errorHandler } from "../errors/errorHandler.js";
import jwt from "jsonwebtoken";
import {ENV} from "../lib/env.js";
import { userModel } from "../models/user.model.js";

export const protectedRoute = async (req, res, next) => {
    try {
        const token = req.cookies.refreshToken;

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
        if (error.name === "TokenExpiredError" || error.name === "JsonWebTokenError") {
            return errorHandler(res, 401, "Unauthorized: Invalid Token");
       }
        return errorHandler(res, 500, "Internal Server Error");
    }
};