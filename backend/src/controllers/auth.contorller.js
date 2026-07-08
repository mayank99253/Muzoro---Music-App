import { userModel } from '../models/user.model.js';
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
        res.clearCookie("token");
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