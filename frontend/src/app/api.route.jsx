import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "./feature/auth/pages/Login";
import Register from "./feature/auth/pages/Register";
import Homepage from "./pages/Home";
import HomeContent from "./feature/song/shared/HomeContent"
import SearchContent from "./feature/song/shared/SearchContent"
import ArtistContent from "./feature/follow/shared/ArtistContent"
import Profile from "./feature/profile/shared/Profile"
import HistoryContent from "./feature/history/shared/HistoryContent";
import LikedSongContant from "./feature/liked song/shared/LikedSongContant"
import UploadSong from "./feature/profile/shared/UploadSong"

export const router = (user,artist) => createBrowserRouter([
  {
    path: "/login",
    element: user ? <Navigate to="/" replace /> : <Login />
  },
  {
    path: "/register",
    element: user ? <Navigate to="/" replace /> : <Register />
  },
  {
    path: "/",
    element: user ? <Homepage /> : <Navigate to="/login" replace />,
    // Add nested children for the user dashboard pages here:
    children: [
      { index: true, element: <HomeContent /> },         
      { path: "search", element: <SearchContent /> },
      { path: "history", element: <HistoryContent/> },
      { path: "artists", element: <ArtistContent/> },
      { path: "liked-song", element: <LikedSongContant/>},
      { path: "profile", element: <Profile/>},
    ]
  },
  { path: "/upload-song",
    element: artist ?  <UploadSong /> : <h1>Please Fill Form for the Artist</h1>},
]);