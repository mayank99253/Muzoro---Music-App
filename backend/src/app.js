//create the server
import express from "express";
import { authrouter } from "./routes/auth.route.js";
import cookieParser from "cookie-parser"

export const app = express();

app.use(express.json()); // json help to read the data
app.use(cookieParser()); // it use to set the cookies in client side 

app.use("/api/auth/v1" , authrouter);

// app.use("/api/admin" , adminRouter)

