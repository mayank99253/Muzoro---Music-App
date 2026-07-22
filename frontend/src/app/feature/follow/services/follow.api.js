import {AxiosInstance} from "../../../lib/axios.js"

export const getAllArtist = async()=>{
    try {
        const res = await AxiosInstance.get("follow/v1/artist/get-all-artist");
        return res.data
    } catch (error) {
        console.error(error);
        throw error
    }
}
export const followArtist = async({artistId})=>{
    try {
        const res = await AxiosInstance.get(`follow/v1/artist/${artistId}/follow`)
        return res.data
    } catch (error) {
        console.error(error);
        throw error
    }
}
export const unfollowArtist = async({artistId})=>{
    try {
        const res = await AxiosInstance.get(`follow/v1/artist/${artistId}/unfollow`);
        return res.data
    } catch (error) {
        console.error(error);
        throw error
    }
}
export const getArtistSong= async({artistId})=>{
    try {
        const res = await AxiosInstance.get(`follow/v1/artist/${artistId}/song`);
        return res.data
    } catch (error) {
        console.error(error);
        throw error
    }
}
