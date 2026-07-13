import mongoose from 'mongoose';

const songSchema = new mongoose.Schema(
    {
        songTitle: {
            type: String,
            required: [true, 'Song title is required'],
            trim: true,
            index: true // Optimizes searching by song title
        },
        artist: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Artist', // Matches your userModel name
            required: [true, 'An artist reference is required']
        },
        duration: {
            type: Number, // Duration in seconds (e.g., 180 for 3 minutes)
            required: [true, 'Song duration is required']
        },
        audioUrl: {
            type: String,
            required: [true, 'Audio file URL is required'],
            trim: true
        },
        coverImageUrl: {
            type: String,
            trim: true,
            default: 'https://placeholder-image-url.com/default-cover.jpg',
            required: [true, 'Image file URL is required']  // Fallback artwork
        },
        category: {
            type: String,
            enum: ["sad", "happy", "serious"],
            default: "happy"
        },
        isFreeze: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true // Automatically adds createdAt and updatedAt fields
    }
);

// Compounding indexes for performance optimizations (optional but recommended)
songSchema.index({ artist: 1, createdAt: -1 });

export const songModel = mongoose.model('Song', songSchema);
