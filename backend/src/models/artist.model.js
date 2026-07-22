import mongoose from 'mongoose';

const artistSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user', // References your userModel
            required: [true, 'Artist profile must be linked to a user account'],
            unique: true // One artist profile per user account
        },
        stageName: {
            type: String,
            required: [true, 'Stage name or artist name is required'],
            trim: true,
            index: true
        },
        bio: {
            type: String,
            trim: true,
            maxLength: [500, 'Bio cannot exceed 500 characters']
        },
        bannerImageUrl: {
            type: String,
            trim: true,
            default: 'https://placeholder-image-url.com/default-banner.jpg'
        },
        socialLinks: {
            instagram: {
                type: String,
                trim: true,
                //required: [true, 'Instagram page link is required'],
            },
            youtube: {
                type: String,
                trim: true,
                //required: [true, 'Youtube channel link is required'],
            },
        },
        isVerified: {
            type: Boolean,
            default: false
        },
        isBan: {
            type: Boolean,
            default: false
        },
        followersCount: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true // Automatically tracks profile creation and updates
    }
);

// Indexing monthly listeners for leaderboard sorting (e.g., Top Artists)
artistSchema.index({ monthlyListeners: -1 });

export const artistModel = mongoose.model('Artist', artistSchema);
