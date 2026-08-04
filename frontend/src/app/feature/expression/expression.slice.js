import { createSlice } from "@reduxjs/toolkit";

const expressionSlice = createSlice({
  name: "expression",
  initialState: {
    mood: null,
    moodPlaylist: [],
    moodLoading: false,
    moodError: null,
  },
  reducers: {
    setMoodLoading: (state) => {
      state.moodLoading = true;
    },
    setMoodSuccess: (state, action) => {
      state.mood = action.payload.mood;
      state.moodPlaylist = action.payload.songs;
    },
    setMoodError: (state, action) => {
      state.error = action.payload;
    },
    resetMoodPlaylist: (state) => {
      state.moodPlaylist = [];
      state.error = null;
    },
  },
});

export const { setMoodLoading, setMoodSuccess, setMoodError, resetMoodPlaylist } = expressionSlice.actions;

export default expressionSlice.reducer;