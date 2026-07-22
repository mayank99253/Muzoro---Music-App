import { AxiosInstance } from "../../../lib/axios.js"

export const getLatestSongs = async () => {
    try {
        const res = await AxiosInstance.get("/songs/v1/get-latest-songs");
        return res.data
    } catch (error) {
        console.error("Latest Song", error);
        throw error
    }
}

export const getPopularSongs = async () => {
    try {
        const res = await AxiosInstance.get("/songs/v1/get-popular-songs");
        return res.data
    } catch (error) {
        console.error("Popular Song", error);
        throw Error
    }
} 
export const getAllSongs = async () => {
    try {
        const res = await AxiosInstance.get("/songs/v1/all-songs");
        return res.data
    } catch (error) {
        console.error("All Songs", error);
        throw Error
    }
} 

