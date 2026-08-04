import { userModel } from '../models/user.model.js';
import { playlistModel } from "../models/playlist.model.js"
import { followModel } from "../models/follow.model.js"
import { likeModel } from "../models/like.model.js"
import { generateToken } from '../lib/token.js';
import { errorHandler } from '../errors/errorHandler.js';
import bcrypt from 'bcryptjs';

export const signupController = async (req, res) => {
    try {
        const { userName, email, password } = req.body;

        // 1. Check if the user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return errorHandler(res, 400, "Email is already registered");
        }

        // 3. Create new user
        const user = await userModel.create({
            userName,
            email,
            password
        });

        // 4. Generate JWT Token
        await generateToken(res, user._id);

        // 5. Send success response
        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                id: user._id,
                userName: user.userName,
                email: user.email,
            }
        });

    } catch (error) {
        console.error(error);
        return errorHandler(res, 500, error.message || "Internal Server Error");
    }
};

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Find user by email
        const user = await userModel.findOne({ email }).select("+password");
        if (!user) {
            // Generic message for security (prevents user enumeration)
            return errorHandler(res, 401, "Invalid email or password");
        }

        // 2. Verify password using bcrypt
        const isPasswordMatch = await bcrypt.compare(password, user.password)
        if (!isPasswordMatch) {
            return errorHandler(res, 401, "Invalid email or password");
        }

        // 3. Generate JWT Token
        await generateToken(res, user._id,);

        // 4. Return successful response
        return res.status(200).json({
            success: true,
            message: "Logged in successfully",
            user: {
                id: user._id,
                userName: user.userName,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        return errorHandler(res, 500, error.message || "Internal Server Error");
    }
};

export const logoutController = async (req, res) => {
    try {
        // Clear the cookie
        res.clearCookie("refreshToken");
        return res.status(200).json({
            success: true,
            message: "Logged out successfully"
        });
    } catch (error) {
        return errorHandler(res, 500, error.message || "Internal Server Error");
    }
};

export const getMeController = async (req, res) => {
    try {
        // 1. Fetch user details using ID attached to req.user by auth middleware
        // .select('-password') excludes the sensitive password hash from being retrieved
        const user = await userModel.findById(req.user.id)

        if (!user) {
            return errorHandler(res, 404, "User not found");
        }

        // 2. Return the user profile data
        return res.status(200).json({
            success: true,
            user
        });

    } catch (error) {
        return errorHandler(res, 500, error.message || "Internal Server Error");
    }
};

// GET /artist/my-follow-artist
export const getMyFollowArtists = async (req, res) => {
    try {
        const userId = req.user._id;
        const follows = await followModel.find({ user: userId }).populate("artist");
        const followedArtists = follows.map((f) => f.artist);
        res.status(200).json({ followedArtists });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch followed artists" });
    }
};

// GET /artist/get-my-playlists
export const getMyAllPlaylists = async (req, res) => {
    try {
        const userId = req.user._id;
        const playlists = await playlistModel.find({ owner: userId });
        res.status(200).json({ count : playlists.length });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch playlists" });
    }
};

// GET /artist/my-liked-song
export const getMyLikedSong = async (req, res) => {
    try {
        const userId = req.user._id;
        const liked = await likeModel.find({ user: userId });
        res.status(200).json({ count: liked.length });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch liked songs" });
    }
};
export const changePassword = async (req, res) => {
    try {
        const { oldPass, newPass, confiemPass } = req.body;
        const userId = req.user._id;

        if (!oldPass || !newPass || !confiemPass) {
            return errorHandler(res, 400, "oldPass, newPass and confiemPass are all required");
        }

        if (newPass !== confiemPass) {
            return errorHandler(res, 400, "New password and confirm password do not match");
        }

        if (newPass === oldPass) {
            return errorHandler(res, 400, "New password must be different from old password");
        }

        const user = await userModel.findById(userId).select('+password');
        if (!user) {
            return errorHandler(res, 404, "User not found");
        }

        const isMatch = await bcrypt.compare(oldPass, user.password);
        if (!isMatch) {
            return errorHandler(res, 401, "Old password is incorrect");
        }

        user.password = newPass
        await user.save();

        return res.status(200).json({ message: "Password changed successfully" });

    } catch (error) {
        console.error(error);
        return errorHandler(res, 500, "Internal Server Error");
    }
};

export const updateCredentials = async (req, res) => {
  try {
    const { userName, email } = req.body;

    if (!userName && !email) {
      return errorHandler(res , 400 ,"Username or email required")
    }

    const user = await userModel.findById(req.user._id);

    if (!user) {
      return errorHandler(res , 404 ,"User not found")
    }
      user.userName = userName;
      user.email = email
    await user.save();

    return res.status(200).json({
      message: "Credentials updated successfully",
      user: {
        _id: user._id,
        username: user.userName,
      },
    });
  } catch (error) {
    console.error("Update credentials error:", error);
    return errorHandler(res, 500,  "Internal server error")
  }
};