//create the server
import express from "express";
import cookieParser from "cookie-parser"
import cors from "cors"
import morgan from "morgan"
import { authrouter } from "./routes/auth.route.js";
import { artistRouter } from "./routes/artist.route.js";
import { adminRouter } from "./routes/admin.route.js";
import { songRouter } from "./routes/song.route.js";
import { likeRouter } from "./routes/like.route.js";
import { historyRouter } from "./routes/history.route.js";
import { playlistRouter } from "./routes/playlist.route.js"
import { followRouter } from "./routes/follow.route.js"

export const app = express();

app.use(express.json({limit : "20mb"})); // json help to read the data
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(cookieParser()); // it use to set the cookies in client side 
app.use(morgan("dev"))

app.use(cors({
    origin: ['http://localhost:5173', 'https://muzoro-music-app.vercel.app' ,'http://localhost:5174'],
    // Restricts allowed HTTP interaction methods
    methods: ['GET', 'POST', 'PUT', 'DELETE', "PATCH"],
    // Allows specific headers sent by the client
    allowedHeaders: ['Content-Type', 'Authorization'],
    // Allows the client to send HTTP cookies or bearer tokens
    credentials: true,
}));

app.use("/api/auth/v1", authrouter);
app.use("/api/artist/v1", artistRouter);
app.use("/api/admin/v1", adminRouter);
app.use("/api/songs/v1", songRouter)
app.use("/api/like/v1", likeRouter);
app.use("/api/history/v1", historyRouter);
app.use("/api/playlist/v1", playlistRouter);
app.use("/api/follow/v1", followRouter);

app.get('/',(req, res)=>{ res.send("API Wokring")});

// app.use("/api/admin" , adminRouter)

