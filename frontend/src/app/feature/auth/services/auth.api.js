import { AxiosInstance } from "../../../lib/axios.js";

// Register a new user
export const register = async ({ userName, email, password }) => {
    try {
        const res = await AxiosInstance.post("/auth/v1/signup", { userName, email, password });
        return res.data;
    } catch (error) {
        throw error; // Rethrow so the calling component can handle the error
    }
};

// Login user
export const login = async ({ email, password }) => {
    try {
        const res = await AxiosInstance.post("/auth/v1/login", { email, password });
        return res.data;
    } catch (error) {
        throw error; 
    }
};

// Logout user
export const logout = async () => {
    try {
        // Typically a POST request because it alters session state on the server
        const res = await AxiosInstance.post("/auth/v1/logout");
        return res.data;
    } catch (error) {
        console.error("Logout error:", error);
        throw error;
    }
};

// Get current logged-in user profile ("get-me")
export const getMe = async () => {
    try {
        // Usually a GET request to fetch the authenticated user's data
        const res = await AxiosInstance.get("/auth/v1/get-me");
        return res.data;
    } catch (error) {
        console.error("Get-Me error:", error);
        throw error;
    }
};