import { createSlice } from '@reduxjs/toolkit'


const profileSlice = createSlice({
    name: "profile",
    initialState :{
        artist : null,
        loading : false,
        error : null ,
        followedArtists : [],
        createdPlaylists : null,
        likedSongs : null,
        mood :null,
        artistSongs : [],
    },

   reducers: {
        setArtist: (state, action) => {
            state.artist = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        setArtistSongs: (state, action) => {
            state.artistSongs = action.payload;
        },
        setFollowedArtists: (state, action) => {
            state.followedArtists = action.payload;
        },
        setCreatedPlaylists: (state, action) => {
            state.createdPlaylists = action.payload;
        },
        setLikedSongs: (state, action) => {
            state.likedSongs = action.payload;
        },
        setMood: (state, action) => {
            state.mood = action.payload;
        },
    }
});

export const {
    setArtist,
    setFollowedArtists,
    setCreatedPlaylists,
    setLikedSongs,
    setMood,
    setLoading,
    setError,
    setArtistSongs
} = profileSlice.actions;

export default profileSlice.reducer;