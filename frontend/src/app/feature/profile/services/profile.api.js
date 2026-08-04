import { AxiosInstance } from "../../../lib/axios.js"

export const getMyFollowArtists = async () => {
    try {
        const res = await AxiosInstance.get("auth/v1/my-follow-artist");
        return res.data
    } catch (error) {
        throw error
    }
}
export const getMyPlaylists = async () => {
    try {
        const res = await AxiosInstance.get("auth/v1/get-my-playlists");
        return res.data
    } catch (error) {
        throw error
    }
}
export const getMyLikedSong = async () => {
    try {
        const res = await AxiosInstance.get("auth/v1/my-liked-song");
        return res.data
    } catch (error) {
        throw error
    }
}
export const registerArtist = async (formData) => {
    try {
        const res = await AxiosInstance.post("artist/v1/register", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return res.data
    } catch (error) {
        throw error
    }
}
export const getArtist = async () => {
    try {
        const res = await AxiosInstance.get("artist/v1/get-artist")
        return res.data
    } catch (error) {
        throw error
    }
}
export const getArtistSongs = async () => {
    try {
        const res = await AxiosInstance.get("artist/v1/get-my-song")
        return res.data
    } catch (error) {
        throw error
    }
}
export const uploadSong = async (formData) => {
    try {
        const res = await AxiosInstance.post("artist/v1/upload-song", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return res.data
    } catch (error) {
        throw error
    }
}
export const getMyArtistStatus = async () => {
    try {
        const res = await AxiosInstance.get("artist/v1/my-status")
        return res.data
    } catch (error) {
        throw error
    }
}
export const updateArtist = async (formData) => {
    try {
        const res = await AxiosInstance.patch("artist/v1/update-artist", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        })
        return res.data
    } catch (error) {
        throw error
    }
}
export const deleteSong = async ({songId}) => {
    try {
        const res = await AxiosInstance.delete(`artist/v1/delete-song/${songId}`)
        return res.data
    } catch (error) {
        throw error
    }
}
