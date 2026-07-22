import { AxiosInstance } from "../../lib/axios.js";

export const adminLogin = async({email , password})=>{
    try {
        const res = await AxiosInstance.post("/admin/v1/admin-login" , {email , password});
        return res.data
    } catch (error) {
        throw error
    }
}
export const adminGetAdmin = async()=>{
    try {
        const res = await AxiosInstance.get("/admin/v1/get-me");
        return res.data
    } catch (error) {
        console.error("Admin Get Me",error)
        throw error
    }
}
export const adminLogout = async()=>{
    try {
        const res = await AxiosInstance.post("/admin/v1/admin-logout");
        return res.data
    } catch (error) {
        console.error(error)
        throw error
    }
}
export const rejectArtist= async({id})=>{
    try {
        const res = await AxiosInstance.delete("/admin/v1/artist/reject/"+id);
        return res.data
    } catch (error) {
        console.error(error)
        throw error
    }
}
export const approveArtist = async({id})=>{
    try {
        const res = await AxiosInstance.patch("/admin/v1/artist/approve/"+id);
        return res.data
    } catch (error) {
        console.error(error)
        throw error
    }
}
export const getPendingArtists = async () => {
    try {
        const res = await AxiosInstance.get("/admin/v1/artists/pending");
        return res.data
    } catch (error) {
        console.error("Get Pending Artists", error)
        throw error
    }
}
export const getVerifiedArtists = async () => {
    try {
        const res = await AxiosInstance.get("/admin/v1/artists/verified");
        return res.data
    } catch (error) {
        console.error("Get Verified Artists", error)
        throw error
    }
}
export const getAllSongs = async () => {
    try {
        const res = await AxiosInstance.get("/admin/v1/all-songs");
        return res.data
    } catch (error) {
        console.error("Get Songs", error)
        throw error
    }
}
export const deleteSong = async ({id}) => {
    try {
        const res = await AxiosInstance.delete("/admin/v1/songs/"+id);
        return res.data
    } catch (error) {
        console.error("Get Verified Artists", error)
        throw error
    }
}
export const banArtist = async ({id}) => {
    try {
        const res = await AxiosInstance.patch("/admin/v1/ban/artist/"+id);
        return res.data
    } catch (error) {
        console.error(error);
        throw error
    }
}
export const unbanArtist = async ({id}) => {
    try {
        const res = await AxiosInstance.patch("/admin/v1/unban/artist/"+id);
        return res.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
export const getBanArtists = async () => {
    try {
        const res = await AxiosInstance.get("/admin/v1/get-ban-artists");
        return res.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};