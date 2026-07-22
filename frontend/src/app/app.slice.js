import {configureStore} from "@reduxjs/toolkit"
import authSlice from "../app/feature/auth/auth.slice.js"
import songSlice from "../app/feature/song/song.slice.js"
import historySlice from "../app/feature/history/history.slice.js"
import likedSongSlice from "../app/feature/liked song/liked.slice.js"
import followSlice from "../app/feature/follow/follow.slice.js"
import profileSlice from "../app/feature/profile/profile.slice.js"

export const store = configureStore({
    reducer  : {
        auth : authSlice,
        song : songSlice,
        history : historySlice,
        likedSong : likedSongSlice,
        follow :followSlice,
        profile : profileSlice
    }
})