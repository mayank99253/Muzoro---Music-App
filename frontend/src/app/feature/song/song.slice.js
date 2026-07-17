import { createSlice } from "@reduxjs/toolkit"

const songSlice = createSlice({
    name: "song",
    initialState: {
        loading: false,
        error: null,
        latestSongs: [],
        popularSongs: [],
        currentSong: null,
        isPlaying: false,
        queue: [],         
        currentIndex: -1, // initially -1 value for empty array
        allSongs : []
    },
    reducers: {
        setLoading: (state, action) => { state.loading = action.payload },
        setError: (state, action) => { state.error = action.payload },
        setLatestSongs: (state, action) => { state.latestSongs = action.payload },
        setPopularSongs: (state, action) => { state.popularSongs = action.payload },
        setIsPlaying: (state, action) => { state.isPlaying = action.payload },
        setAllSongs: (state, action) => { state.allSongs = action.payload },
         // ✅ naya: jab user kisi song pe click kare, poori list + clicked index bhejo
        playSong: (state, action) => {
            const { song, list } = action.payload;
            state.queue = list;
            state.currentIndex = list.findIndex((s) => s._id === song._id);
            state.currentSong = song;
            state.isPlaying = true;
        },

        // ✅ naya
        playNext: (state) => {
            if (state.queue.length === 0) return;
            const nextIndex = state.currentIndex + 1;
            if (nextIndex < state.queue.length) {
                state.currentIndex = nextIndex;
                state.currentSong = state.queue[nextIndex];
                state.isPlaying = true;
            }
        },

        // ✅ naya
        playPrevious: (state) => {
            if (state.queue.length === 0) return;
            const prevIndex = state.currentIndex - 1;
            if (prevIndex >= 0) {
                state.currentIndex = prevIndex;
                state.currentSong = state.queue[prevIndex];
                state.isPlaying = true;
            }
        },
    }
});

export const { 
    setLatestSongs,
    setPopularSongs,
    setLoading,
    setError,
    setIsPlaying,
    playNext , playPrevious , playSong,
    setAllSongs
} = songSlice.actions;
export default songSlice.reducer 