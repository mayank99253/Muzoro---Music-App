import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { errorHandler } from "../errors/errorHandler.js";

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    role: {
        type: String,
        enum: ["user", "artist", "admin"],
        default: "user"
    },
}, { timestamps: true });

userSchema.pre("save", async function (res) {
    if (!this.isModified("password")) return;
    
    try {
        // 1. Add await here
        this.password = await bcrypt.hash(this.password, 12);
    } catch (error) {
        errorHandler(res ,500 , error)
    }
});


export const userModel = mongoose.model("user", userSchema);

