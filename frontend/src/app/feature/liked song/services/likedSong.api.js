import {AxiosInstance} from "../../../lib/axios.js"

// 1. Get all liked songs
export const getLikedSong = async () => {
    try {
        const res = await AxiosInstance.get("like/v1/song/like-song");
        return res.data;
    } catch (error) {
        console.error("Get Liked Song Error: ", error);
        throw error;
    }
};

// 2. Like a song
export const likeSong = async ({ songId }) => {
    try {
        const res = await AxiosInstance.post(`like/v1/song/${songId}/like`);
        return res.data;
    } catch (error) {
        console.error("Like Song Error: ", error);
        throw error;
    }
};

// 3. Unlike a song
export const unlikeSong = async ({ songId }) => {
    try {
        const res = await AxiosInstance.delete(`like/v1/song/${songId}/unlike`);
        return res.data;
    } catch (error) {
        console.error("Unlike Song Error: ", error);
        throw error;
    }
};

// 4. Create a new playlist
export const createPlaylist = async ({ name }) => {
    try {
        const res = await AxiosInstance.post("playlist/v1/create", { name });
        return res.data;
    } catch (error) {
        console.error("Create Playlist Error: ", error);
        throw error;
    }
};

// 5. Get all playlists belonging to the user
export const getPlaylist = async () => {
    try {
        const res = await AxiosInstance.get("playlist/v1/my-playlists");
        return res.data;
    } catch (error) {
        console.error("Get Playlists Error: ", error);
        throw error;
    }
};

// 6. Add a specific song to a playlist
export const addSongToPlaylist = async ({ playlistId, songId }) => {
    try {
        const res = await AxiosInstance.post(`playlist/v1/${playlistId}/add-song/${songId}`);
        return res.data;
    } catch (error) {
        console.error("Add Song To Playlist Error: ", error);
        throw error;
    }
};
export const removeSongToPlaylist = async ({ playlistId, songId }) => {
    try {
        const res = await AxiosInstance.delete(`playlist/v1/${playlistId}/remove-song/${songId}`);
        return res.data;
    } catch (error) {
        console.error("remove Song To Playlist Error: ", error);
        throw error;
    }
};