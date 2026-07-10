import { errorHandler } from "../errors/errorHandler.js";
import { generateToken } from "../lib/token.js";
import { artistModel } from "../models/artist.model.js";
import { userModel } from "../models/user.model.js";
import { sendEmail } from "../services/sendEmail.js";
import bcrypt from "bcryptjs";

// 1. ADMIN LOGIN
export const adminLoginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        if(!email || !password) return errorHandler(res , 401, "Invalid credentials")

        const admin = await userModel.findOne({ email }).select("+password")
        if (!admin || admin.role !== 'admin') {
            return errorHandler(res , 401, "Invalid credentials")
        };

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return errorHandler(res , 401, "Invalid credentials")
        }

        // Generate token explicitly with admin role
        generateToken(res , admin._id, admin.role);

        return res.status(200).json({
            success: true,
            message: `Welcome ${admin.userName.toUpperCase()} Sir, logged in successfully`,
            admin: {userName: admin.userName, email: admin.email, role: admin.role }
        });
    } catch (error) {
        console.error(error)
         return errorHandler(res , 500, "Internal Server Error")
    }
};

// 2. ADMIN LOGOUT (Token client-side par clear hota hai, par server acknowledgement ke liye)
export const adminLogoutController = async (_, res) => {
    try {
    res.clearCookie("adminToken")
    return res.status(200).json({ success: true, message: "Admin logged out successfully" });
    } catch (error) {
        return errorHandler(res , 500 , "Internal Server Error");
    }
};

// 3. APPROVE ARTIST
export const approveArtist = async (req, res) => {
    try {
        const { id } = req.params; // Artist Profile ID

        const artistProfile = await artistModel.findById(id).populate('user');
        if (!artistProfile) return res.status(404).json({ success: false, message: "Artist profile not found" });

        if (artistProfile.isVerified) {
            return res.status(400).json({ success: false, message: "Artist is already verified" });
        }

        artistProfile.isVerified = true;
        await artistProfile.save();

        // Send confirmation email via SendGrid
        await sendEmail(
            artistProfile.user.email,
            "Congratulations! You are verified 🎉",
            `Hello ${artistProfile.stageName}, you are now a verified artist.`,
            `<h1>Congratulations!</h1><p>Your request has been approved. You can now upload your music directly!</p>`
        );

        return res.status(200).json({ success: true, message: "Artist verified successfully and email sent" });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

// 4. REJECT ARTIST
export const rejectArtist = async (req, res) => {
    try {
        const { id } = req.params;

        const artistProfile = await artistModel.findById(id).populate('user')
        if (!artistProfile) return errorHandler(res , 404 , "Artist profile not found")

        // User ka role wapas normal 'user' par revert karein
        await userModel.findByIdAndUpdate(artistProfile.user._id, { role: 'user' });
        await artistProfile.save();

        const emailToNotify = artistProfile.user.email;
        const stageName = artistProfile.stageName;

        // Profile request delete karein
        await artistModel.findByIdAndDelete(id);

        // Send rejection notification email
        await sendEmail(
            emailToNotify,
            "Artist Verification Update",
            `Hello ${stageName}, your artist registration was not approved.`,
            `<h1>Verification Update</h1><p>We regret to inform you that your profile request has been rejected by the administration team.</p>`
        );

        return res.status(200).json({ success: true, message: "Artist request rejected" });
    } catch (error) {
        console.error(error)
         return errorHandler(res , 500 , "Internal Server Error")
    }
};