import jwt from "jsonwebtoken";
import { ENV } from "./env.js";

export const generateToken = (res, userId, role) => {
    const token = jwt.sign(
        {
            userId, role
        },
        ENV.JWT_SECRET,
            role === "admin" ? {expiresIn: "1d"} : {expiresIn: "7d"}
    );

    if (role === "admin") {
        res.cookie("adminToken", token, {
            httpOnly: true,
            secure: ENV.NODE_ENV === "production" ? true : false,
            sameSite: ENV.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 1 * 24 * 60 * 60 * 1000 // 
        });

        return token;
    }
    
    res.cookie("refreshToken", token, {
        httpOnly: true,
        secure: ENV.NODE_ENV === "production" ? true : false ,
        sameSite: ENV.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return token;

};