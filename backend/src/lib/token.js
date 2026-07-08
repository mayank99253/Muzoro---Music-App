import jwt from "jsonwebtoken";
import { ENV } from "./env.js";

export const generateToken = (res, userId, role) => {
    const token = jwt.sign(
        {
            userId, role
        },
        ENV.JWT_SECRET,
        {
            expiresIn: "7d"
        }
    );

    if (role === "admin") {
        res.cookie("token", token, {
            httpOnly: true,
            secure: ENV.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 1 * 24 * 60 * 60 * 1000
        });

        return token;
    }
    
    res.cookie("token", token, {
        httpOnly: true,
        secure: ENV.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return token;

};