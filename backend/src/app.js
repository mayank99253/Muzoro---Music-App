//create the server
import express from "express";
import cookieParser from "cookie-parser"
import cors from "cors"
import morgan from "morgan"
import { authrouter } from "./routes/auth.route.js";
import { artistRouter } from "./routes/artist.route.js";
import { adminRouter } from "./routes/admin.route.js";
import { songRouter } from "./routes/song.route.js";


export const app = express();

app.use(express.json()); // json help to read the data
app.use(cookieParser()); // it use to set the cookies in client side 
app.use(morgan("dev"))
app.use(cors({
    origin: ['http://localhost:5173', 'https://mytrusteddomain.com'], 
    // Restricts allowed HTTP interaction methods
    methods: ['GET', 'POST', 'PUT', 'DELETE', "PATCH"], 
    // Allows specific headers sent by the client
    allowedHeaders: ['Content-Type', 'Authorization'], 
    // Allows the client to send HTTP cookies or bearer tokens
    credentials: true,
}));

app.use("/api/auth/v1" , authrouter);
app.use("/api/artist/v1" , artistRouter);
app.use("/api/admin/v1" , adminRouter);
app.use("/api/songs/v1" , songRouter)

// app.use("/api/admin" , adminRouter)

