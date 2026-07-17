import {configureStore} from "@reduxjs/toolkit"
import authSlice from "../app/feature/auth/auth.slice.js"
import adminSlice from "../app/admin/admin.slice.js"
import songSlice from "../app/feature/song/song.slice.js"
import historySlice from "../app/feature/history/history.slice.js"
import likedSongSlice from "../app/feature/liked song/liked.slice.js"

export const store = configureStore({
    reducer  : {
        auth : authSlice,
        admin : adminSlice,
        song : songSlice,
        history : historySlice,
        likedSong : likedSongSlice
    }
})