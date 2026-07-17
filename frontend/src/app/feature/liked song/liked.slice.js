import { createSlice } from "@reduxjs/toolkit"

const likedSong = createSlice({
    name: "likedSong",
    initialState: {
        error: null,
        loading: false,
        isLiked: false,
        likedSong: [],
        playlist: [],
        playlistSongs: [],
    },
    reducers: {
        setError: (state, action) => { state.error = action.payload },
        setLoading: (state, action) => { state.loading = action.payload },
        setLikedSong: (state, action) => { state.likedSong = action.payload },
        setPlaylist: (state, action) => { state.playlist = action.payload },
        setPlaylistSongs: (state, action) => { state.playlistSongs = action.payload },
        setIsLiked: (state, action) => { state.isLiked = action.payload}
    }
});

export const { setError,
    setLikedSong,
    setLoading,
    setPlaylist,
    setPlaylistSongs,
    setIsLiked  
} = likedSong.actions

export default likedSong.reducer