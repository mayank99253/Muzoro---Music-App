import {createSlice, isAction} from "@reduxjs/toolkit"

const followSlice = createSlice({
    name : "follow",
    initialState:{
        loading :false,
        error : false,
        allArtists : [],
        artistSong : []
    },
    reducers : {
        setError : (state , action) =>{ state.error = action.payload},
        setLoading : (state , action) =>{ state.loading = action.payload},
        setAllArtist : (state , action) =>{ state.allArtists = action.payload},
        setArtistSong : (state , action) =>{ state.artistSong = action.payload},
    }
});

export const {setAllArtist , setError ,setLoading , setArtistSong} = followSlice.actions;
export default followSlice.reducer
