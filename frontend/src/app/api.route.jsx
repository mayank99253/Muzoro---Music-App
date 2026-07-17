import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "./feature/auth/pages/Login";
import Register from "./feature/auth/pages/Register";
import Homepage from "./pages/Home";
import AdminLogin from "./admin/pages/AdminLogin";
import AdminDashboard from "./admin/pages/AdminDashboard";
import VerifiedUsers from "./admin/shared/Verifiedusers";
import PendingUsers from "./admin/shared/Pendingusers";
import AdminHome from "./admin/shared/Adminhome ";
import BanUsers from "./admin/shared/BanUsers";
import RegisterAdmin from "./admin/shared/Registeradmin";
import HomeContent from "./feature/song/shared/HomeContent"
import SearchContent from "./feature/song/shared/SearchContent"
import ArtistContent from "./feature/song/shared/ArtistContent"
import Profile from "./feature/song/shared/Profile"
import HistoryContent from "./feature/history/shared/HistoryContent";
import LikedSongContant from "./feature/liked song/shared/LikedSongContant"

export const router = (user, admin) => createBrowserRouter([
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
  {
    path: "/admin-login",
    element: admin ? <Navigate to="/admin-dashboard" replace /> : <AdminLogin />
  },
  {
    path: "/admin-dashboard",
    element: admin ? <AdminDashboard /> : <Navigate to="/admin-login" replace />,
    children: [
      { index: true, element: <AdminHome /> },              
      { path: "verified-users", element: <VerifiedUsers /> }, 
      { path: "pending-users", element: <PendingUsers /> },   
      { path: "ban-users", element: <BanUsers /> },   
      { path: "register-admin", element: <RegisterAdmin /> },   
    ]
  }
]);