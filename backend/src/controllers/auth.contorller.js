import { generateToken } from "../lib/token.js";
import User from "../models/auth.model.js";

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;



        const user = await User.create({ name, email, password });

        generateToken(res, user._id)

        res.status(201).json({ message: 'User registered successfully', user: user });

    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.password !== password) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        generateToken(res, user._id)

        res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const logout = (req, res) => {
    res.cookie("token", "", {
        maxAge: 0
    });
    res.status(200).json({ message: 'Logout successful' });
}
