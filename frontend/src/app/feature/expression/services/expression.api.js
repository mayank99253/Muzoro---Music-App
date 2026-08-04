import { AxiosInstance } from "../../../lib/axios.js"

export const moodPlaylist = async (expression) => {
    try {
        const res = await AxiosInstance.post("/songs/v1/mood-songs", { expression })
        return res.data
    } catch (error) {
        throw error
    }
}