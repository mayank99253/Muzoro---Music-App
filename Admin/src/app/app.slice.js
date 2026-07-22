import {configureStore} from "@reduxjs/toolkit"
import adminSlice from "../app/admin/admin.slice.js"

export const store = configureStore({
    reducer  : {
        admin : adminSlice,
    }
})