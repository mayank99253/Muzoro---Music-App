import {configureStore} from "@reduxjs/toolkit"
import authSlice from "../app/feature/auth/auth.slice.js"
import adminSlice from "../app/admin/admin.slice.js"

export const store = configureStore({
    reducer  : {
        auth : authSlice,
        admin : adminSlice
    }
})