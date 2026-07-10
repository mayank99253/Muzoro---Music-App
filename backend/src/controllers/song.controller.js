import { errorHandler } from "../errors/errorHandler.js"
import songModel from "../models/song.model.js";
import { uploadBuffertoCloudinary } from "../services/cloudinary.js";

export const uploadSong = async (req, res) => {
    try {
        const { title, duration, category } = req.body;
        const imageFile = req.files.image[0].buffer;
        const audioFile = req.files.audio[0].buffer;
        const artistId = req.artist._id

        if (!title || !duration || !category || !imageFile || !audioFile) return errorHandler(res, 400, "All fields are required")

        // 2. Upload both files concurrently using Promise.all
        const [image, audio] = await Promise.all([
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
            message: "Upload successful!",
            songData: songCreate
        });
    } catch (error) {
        console.error(error)
        return errorHandler(res, 500, "Internal Server Error")
    }
}