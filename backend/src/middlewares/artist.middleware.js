import { errorHandler } from "../errors/errorHandler.js";
import { artistModel } from "../models/artist.model.js";

export const artistMiddleware = async (req, res, next) => {
    try {
        // 1. Check karein ki user authenticated hai ya nahi (req.user authMiddleware se aana chahiye)
        if (!req.user) {
            return errorHandler(res , 401 , "Unauthorized. Please log in")
        }

        const artist = await artistModel.findOne({
            user : req.user._id
        });
        if(!artist) return errorHandler(res, 404 , "Please fill form to become artist")

        // 2. Check role and verification status
        // (Assuming aapke User schema me 'role' aur 'isVerifiedArtist' fields hain)
        const isArtist = req.user.role === 'artist';
        const isVerified = artist.isVerified === true; 
        const isBan = artist.isBan === true
        if(isBan) return errorHandler(res , 403 , "You have been banned from the Muzoro platform")

        if (!isArtist || !isVerified) {
            return errorHandler(res , 403 , "Please wait 2-3 days. We are verifying your profile.")
        }

        req.artist = artist
        // Agar dono true hain, toh next middleware/controller par jao
        next();

    } catch (error) {
        console.error("Middleware Error:", error);
        return errorHandler(res , 500 , "Internal Server Error")
    }
};