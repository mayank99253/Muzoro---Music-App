import { AxiosInstance } from "../../../lib/axios.js"

export const getMyFollowArtists = async () => {
    try {
        const res = await AxiosInstance.get("auth/v1/my-follow-artist");
        return res.data
    } catch (error) {
        console.error(error)
        throw error
    }
}
export const getMyPlaylists = async () => {
    try {
        const res = await AxiosInstance.get("auth/v1/get-my-playlists");
        return res.data
    } catch (error) {
        console.error(error)
        throw error
    }
}
export const getMyLikedSong = async () => {
    try {
        const res = await AxiosInstance.get("auth/v1/my-liked-song");
        return res.data
    } catch (error) {
        console.error(error)
        throw error
    }
}
export const registerArtist = async ({ stageName, bio, bannerImageUrl, socialLinks }) => {
    try {
        const res = await AxiosInstance.post("artist/v1/register", { stageName, bio, bannerImageUrl, socialLinks });
        return res.data
    } catch (error) {
        console.error(error)
        throw error
    }
}
export const getArtist = async () => {
    try {
        const res = await AxiosInstance.get("artist/v1/get-artist")
        return res.data
    } catch (error) {
        console.error(error)
    }
}
export const getArtistSongs = async () => {
    try {
        const res = await AxiosInstance.get("artist/v1/get-my-song")
        return res.data
    } catch (error) {
        console.error(error)
    }
}
export const uploadSong = async (formData) => {
    try {
        const res = await AxiosInstance.post("artist/v1/upload-song", formData);
        return res.data
    } catch (error) {
        console.error(error);
        throw error
    }
}
