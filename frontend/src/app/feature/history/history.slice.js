import { createSlice } from "@reduxjs/toolkit"

const historySlice = createSlice({
    name: "history",
    initialState: {
        history: [],
        error: null,
        loading: false
    },
    reducers: {
        setLoading: (state, action) => { state.loading = action.payload },
        setError: (state, action) => { state.error = action.payload },
        setHistory: (state, action) => { state.history = action.payload },
    }
});

export const { setLoading, setHistory, setError } = historySlice.actions
export default historySlice.reducer