import { errorHandler } from "../errors/errorHandler.js";
import { generateToken } from "../lib/token.js";
import { artistModel } from "../models/artist.model.js";
import { userModel } from "../models/user.model.js";
import { sendEmail } from "../services/sendEmail.js";
import { songModel } from "../models/song.model.js";
import bcrypt from "bcryptjs";

// 1. ADMIN LOGIN
export const adminLoginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) return errorHandler(res, 401, "Invalid credentials")

        const admin = await userModel.findOne({ email }).select("+password")
        if (!admin || admin.role !== 'admin') {
            return errorHandler(res, 401, "Invalid credentials")
        };

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return errorHandler(res, 401, "Invalid credentials")
        }

        // Generate token explicitly with admin role
        generateToken(res, admin._id, admin.role);

        return res.status(200).json({
            success: true,
            message: `Welcome back ${admin.userName.toUpperCase()} Sir, logged in successfully`,
            admin: { userName: admin.userName, email: admin.email, role: admin.role }
        });
    } catch (error) {
        console.error(error)
        return errorHandler(res, 500, "Internal Server Error")
    }
};

// 2. ADMIN LOGOUT (Token client-side par clear hota hai, par server acknowledgement ke liye)
export const adminLogoutController = async (_, res) => {
    try {
        res.clearCookie("adminToken")
        return res.status(200).json({ success: true, message: "Admin logged out successfully" });
    } catch (error) {
        return errorHandler(res, 500, "Internal Server Error");
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
        if (!artistProfile) return errorHandler(res, 404, "Artist profile not found")

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
        return errorHandler(res, 500, "Internal Server Error")
    }
};

export const getPendingArtists = async (req, res,) => {
    try {
        // 1. Database se wo saare artists dhoondhein jinka isVerified false hai
        // 2. Populate use karke User collection se unka name aur email nikaalein
        const pendingRequests = await artistModel.find({ isVerified: false })
            .populate("user", "userName email"); // 'user' field ref ko populate karega 

        // 3. Agar koi request nahi milti, toh empty array ya 200 status bhejenge
        return res.status(200).json({
            success: true,
            count: pendingRequests.length,
            data: pendingRequests
        });

    } catch (error) {
        // Agar aapka koi global error handler hai toh next(error) karein, 
        // ya fir custom errorHandler use karein:
        // return errorHandler(res, 500, "Internal Server Error");
        return errorHandler(res, 500, "Internal Server Error")
    }
};

export const getVerifiedArtists = async (req, res) => {
    try {
        // 1. Database se un artists ko find karein jinka isVerified true hai AUR jo banned nahi hain
        // 2. User collection se selectively sirf userName aur email populate karein (security ke liye)
        const verifiedArtists = await artistModel.find({ 
            isVerified: true, 
            isBan: {$ne : true} // Banned artists ko filter out karne ke liye check
        })
        .populate("user", "userName email");

        // 3. Response return karein
        return res.status(200).json({
            success: true,
            count: verifiedArtists.length,
            data: verifiedArtists
        });

    } catch (error) {
        // Agar custom errorHandler hai toh: return errorHandler(res, 500, "Internal Server Error");
      return errorHandler(res, 500, "Internal Server Error") 
    }
};

export const getAllSongs = async (req, res) => {
    try {
        // 1. Database se saare songs fetch karein
        // 2. Artist aur Album models se selectively zaroori details populate karein
        const songs = await songModel.find().populate("artist")

        // 3. Response return karein (agar gaane nahi hain, toh count: 0 aur data: [] jayega)
        return res.status(200).json({
            success: true,
            count: songs.length,
            data: songs
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong while fetching songs.",
            error: error.message
        });
    }
};

export const deleteSong = async (req, res) => {
    try {
        const { id } = req.params;

        // 1. Pehle gaana dhoondhein aur uske artist aur user (email ke liye) ko populate karein
        const song = await songModel.findById(id).populate({
            path: "artist",
            populate: {
                path: "user",
                select: "email userName"
            }
        });

        // 2. Agar gaana nahi milta, toh 404 return karein
        if (!song) {
            return res.status(404).json({
                success: false,
                message: "Song not found."
            });
        }

        // 3. Artist ka email extract karein
        const artistEmail = song.artist?.user?.email;
        const songName = song.songTitle;

        // 4. Database se song ko delete karein
        await songModel.findByIdAndDelete(id);

        await sendEmail(
            artistEmail,
            "Your Song Was Deleted - Muzoro ",
            `Dear Artist, your song "${songName}" was deleted from Muzoro for some reasons, because this is not a song. Please ensure you only upload valid audio tracks that follow our community guidelines. Repeated violations may lead to account suspension.`,
            `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
        <h2 style="color: #ff3366;">Song Removal Notification</h2>
        <p>Dear Artist,</p>
        <p>We are writing to inform you that your song <strong>"${songName}"</strong> has been deleted from our platform by the system moderation team.</p>
        
        <div style="background-color: #fff0f2; border-left: 4px solid #ff3366; padding: 12px; margin: 15px 0;">
            <strong>Reason for Removal:</strong> This content is not identified as a valid song or audio track.
        </div>

        <p>Please ensure that all your future uploads contain legitimate musical content and adhere strictly to the Muzoro Community Guidelines.</p>
        <p style="color: #555;"><em>Note: Continuous upload of invalid or non-musical audio tracks may result in stricter actions, including temporary or permanent removal of your artist profile from Muzoro.</em></p>
        
        <hr style="border: 0; border-top: 1px solid #eeeeee; margin: 20px 0;">
        <p style="font-size: 12px; color: #888888;">Best regards,<br><strong>Team Muzoro</strong></p>
    </div>
    `
        );

        // 6. Success response bhejein
        return res.status(200).json({
            success: true,
            message: `Song '${songName}' has been successfully deleted and notification email sent.`
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong while deleting the song.",
            error: error.message
        });
    }
};

export const banArtist = async (req, res) => {
    try {
        const { id } = req.params;

        const artist = await artistModel.findById(id);
        if (!artist) return errorHandler(res, 404, "Artist Not Found");

        // 1. Update Artist status
        artist.isBan = true;
        await artist.save();

        // 2. Freeze all songs belonging to this artist
        await songModel.updateMany({ artist: id }, { isFreeze: true });

        // 3. Demote linked user account back to standard user role
        if (artist.user) {
            await userModel.findByIdAndUpdate(artist.user, { role: "user" });
        }

        const reason = "Repeated uploads of non-musical / invalid audio tracks despite warnings.";
        // Or: const reason = "Detection of artificial stream manipulation or fraudulent activity.";

        await sendEmail(
            artist.user.email,
            "Important Account Status Update: Account Banned - Muzoro",
            `Dear ${artist.name}, your artist account on Muzoro has been banned due to a violation of our terms. Reason: ${reason}. As a result, your tracks have been frozen. Please contact support if you believe this was an error.`,
            `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
        <h2 style="color: #dc3545;">Account Suspension Notification</h2>
        <p>Dear <strong>${artist.name}</strong>,</p>
        <p>We are writing to inform you that your Muzoro artist profile has been officially banned by the administration team due to a violation of our platform policies.</p>
        
        <div style="background-color: #fff5f5; border-left: 4px solid #dc3545; padding: 15px; margin: 15px 0; border-radius: 4px;">
            <strong style="color: #c92a2a;">Reason for Account Ban:</strong><br>
            <span style="color: #495057;">${reason}</span>
        </div>

        <p><strong>What this means for your account:</strong></p>
        <ul style="color: #333; line-height: 1.6;">
            <li>Your public artist profile has been deactivated.</li>
            <li>All songs uploaded by your account have been frozen and removed from public streaming.</li>
            <li>Your account privileges have been demoted back to a standard listener account.</li>
        </ul>

        <p style="color: #555; margin-top: 20px;">If you believe this action was taken in error or if you would like to appeal this decision, please reply directly to this email or contact our support desk.</p>
        
        <hr style="border: 0; border-top: 1px solid #eeeeee; margin: 25px 0;">
        <p style="font-size: 12px; color: #888888;">Best regards,<br><strong>Muzoro Administration Team</strong></p>
    </div>`
        );

        return res.status(200).json({
            success: true,
            message: `Artist '${artist.name}' has been successfully banned and their songs frozen.`
        });

    } catch (error) {
        console.error(`Error banning artist: ${error.message}`);
        return errorHandler(res, 500, "Internal Server Error");
    }
};

// @desc    Unban an artist & unfreeze their songs
// @route   PUT /api/artists/unban/:id
export const unbanArtist = async (req, res) => {
    try {
        const { id } = req.params;

        const artist = await artistModel.findById(id);
        if (!artist) return errorHandler(res, 404, "Artist Not Found");

        // 1. Update Artist status
        artist.isBan = false;
        await artist.save();

        // 2. Unfreeze all songs belonging to this artist
        await songModel.updateMany({ artist: id }, { isFreeze: false });

        // 3. Restore artist role to the linked user account
        if (artist.user) {
            await userModel.findByIdAndUpdate(artist.user, { role: "artist" });
        }

        await sendEmail(
            artist.user.email,
            "Good News: Your Account Has Been Reinstated - Muzoro",
            `Dear ${artist.stageName}, your artist account on Muzoro has been successfully unbanned and restored. All of your previously frozen tracks are now live and available for streaming again. Welcome back!`,
            `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
        <h2 style="color: #28a745;">Account Reinstated</h2>
        <p>Dear <strong>${artist.stageName}</strong>,</p>
        <p>We are pleased to inform you that following a review of your account, your Muzoro artist profile has been successfully unbanned and fully reinstated by our administration team.</p>
        
        <div style="background-color: #f4faf6; border-left: 4px solid #28a745; padding: 15px; margin: 15px 0; border-radius: 4px;">
            <strong style="color: #1e7e34;">What has changed:</strong><br>
            <ul style="color: #495057; margin: 8px 0 0 0; padding-left: 20px; line-height: 1.6;">
                <li>Your public artist profile is active and visible again.</li>
                <li>All of your previously uploaded tracks have been unfrozen and are ready for streaming.</li>
                <li>Your full artist account privileges and dashboard access have been restored.</li>
            </ul>
        </div>

        <p>You can now log back into your dashboard to manage your catalog, view your analytics, and upload new music.</p>
        <p style="color: #555; margin-top: 20px;">Thank you for your patience and cooperation during the review process. We are thrilled to have your music back on the platform.</p>
        
        <hr style="border: 0; border-top: 1px solid #eeeeee; margin: 25px 0;">
        <p style="font-size: 12px; color: #888888;">Welcome back,<br><strong>Muzoro Administration Team</strong></p>
    </div>`
        );

        return res.status(200).json({
            success: true,
            message: `Artist '${artist.stageName}' has been successfully unbanned.`
        });

    } catch (error) {
        console.error(`Error unbanning artist: ${error.message}`);
        return errorHandler(res, 500, "Internal Server Error");
    }
};

export const getBanArtist = async (req, res) => {
    try {
        // 1. Database se un artists ko find karein jinka isBan true hai
        // 2. User collection se selectively sirf userName aur email populate karein (security ke liye)
        const bannedArtists = await artistModel.find({ isBan: true })
            .populate("user", "userName email");

        // 3. Response return karein
        return res.status(200).json({
            success: true,
            count: bannedArtists.length,
            data: bannedArtists
        });

    } catch (error) {
        // Agar custom errorHandler wrapper use kar rahe ho, toh use: return errorHandler(res, 500, "Internal Server Error");
        return res.status(500).json({
            success: false,
            message: "Something went wrong while fetching banned artists.",
            error: error.message
        });
    }
};