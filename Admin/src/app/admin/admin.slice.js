import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
    name : "admin",
    initialState : {
        admin: null,
        loading : false,
        error : null,

        pendingArtist : [],
        verifiedAritist : [],
        allSongs:[],
        banArtist : [],


    },
    reducers : {
        setUser : (state , action)=>{
            state.admin=  action.payload;
        },
        setLoading : (state , action)=>{
            state.loading=  action.payload
        },
        setError : (state , action)=>{
            state.error=  action.payload
        },
        setPendingArtist : (state , action )=>{
            state.pendingArtist = action.payload
        },
        setVerifiedArtist : (state , action )=>{
            state.verifiedAritist= action.payload
        },
        setAllSongs : (state , action )=>{
            state.allSongs = action.payload
        },
        setBanArtist : (state , action )=>{
            state.banArtist = action.payload
        },
    }
});

export  const {setError , setUser , setLoading , setPendingArtist , setVerifiedArtist , setAllSongs , setBanArtist} = adminSlice.actions;
export default adminSlice.reducer