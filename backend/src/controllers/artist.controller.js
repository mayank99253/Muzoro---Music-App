import { userModel } from '../models/user.model.js';
import { artistModel } from '../models/artist.model.js';
import { sendEmail } from '../services/sendEmail.js';
import { errorHandler } from '../errors/errorHandler.js';
import {songModel} from '../models/song.model.js';
import {uploadBuffertoCloudinary} from "../services/cloudinary.js"

export const registerArtistController = async (req, res) => {
    try {
        // 1. req.user.id hume authMiddleware se milegi (jo token verify karta hai)
        const userId = req.user.id;
        const { stageName, bio, bannerImageUrl, socialLinks } = req.body;

        // 2. Check ki kahin yeh user pehle se hi artist toh nahi hai?
        const user = await userModel.findById(userId);
        
        if (!user) {
            return errorHandler(res, 404, "User not found");
        }
        if (user.role === 'artist') {
            return errorHandler(res, 400, "You are already an artist");
        }

        // 3. Step 1: User ka role update karke "artist" karo
        user.role = 'artist';
        await user.save(); // pre('save') hook chalega par password isModified nahi hai toh hash nahi hoga dubara

        // 4. Step 2: Artist collection me uski brand new profile create karo
        const newArtistProfile = await artistModel.create({
            user: userId, // Yahan reference link connect ho gaya
            stageName,
            bio: bio || "",
            bannerImageUrl: bannerImageUrl || "https://placeholder-image-url.com/default-banner.jpg",
            socialLinks: socialLinks || {}
        });

        // Inside your becomeArtistController / register logic:
        await sendEmail(
            user.email,
            "Artist Verification Under Review 🎧",
            `Hello ${stageName}, we are verifying your profile. You will be able to upload songs once verified.`,
            `<h1>Hello ${stageName},</h1><p>We are verifying your profile. After completion, you will be a verified artist and then you can upload songs!</p>`
        );
        // 5. Response send karo
        return res.status(200).json({
            success: true,
            message: "We are verifying your profile",
            role: user.role,
            artistProfile: newArtistProfile
        });

    } catch (error) {
        return errorHandler(res, 500, error.message || "Internal Server Error");
    }
};

export const getMySongController  = async(req , res) =>{
    try {
        const artistId = req.artist._id;
        if(!artistId) return errorHandler(res , 401 , "Unauthorized");

        const songs = await songModel.find({artist : artistId});
        if(songs.length < 0 ) return errorHandler(res , 404 , "No song Found");

        return res.status(200).json({
            message : "Song fetch successfully",
            songs
        })
    } catch (error) {
        console.error(error);
        return errorHandler(res , 500 , "Internal Server Error")
    }
}
export const uploadSong = async (req, res) => {
    try {
        const { title, duration, category } = req.body;
        const imageFile = req.files?.image?.[0]?.buffer;
        const audioFile = req.files?.audio?.[0]?.buffer;
        const artistId = req.artist._id

        if (!title || !duration || !category || !imageFile || !audioFile) return errorHandler(res, 400, "All fields are required")

        // 2. Upload both files concurrently using Promise.all
        const [audio,image] = await Promise.all([
            uploadBuffertoCloudinary(audioFile, 'video', 'songs/audio'),
            uploadBuffertoCloudinary(imageFile, 'image', 'songs/covers')
        ]);

        const songCreate = await songModel.create({
            songTitle: title,
            artist: artistId,
            duration,
            audioUrl: audio.secure_url,
            coverImageUrl: image.secure_url,
            category
        })
        // 3. Return the exact URLs to save to your database
        return res.status(200).json({
            message: "Song Upload successfully",
            songData: songCreate
        });
    } catch (error) {
        console.error(error)
        return errorHandler(res, 500, "Internal Server Error")
    }
}
export const getArtist = async (req,res) => {
    try {
        const artist = req.artist

        return res.status(200).json(artist)
    } catch (error) {
        console.error(error);
        return errorHandler(res , 500 , "Internal Server Error");
    }
}