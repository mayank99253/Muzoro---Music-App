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
    element: user ? <Homepage /> : <Navigate to="/login" replace />
  },
  {
    path: "/admin-login",
    element: admin ? <Navigate to="/admin-dashboard" replace /> : <AdminLogin />
  },
  {
    path: "/admin-dashboard",
    element: admin ? <AdminDashboard /> : <Navigate to="/admin-login" replace />,
    children: [
      { index: true, element: <AdminHome /> },              // "/admin-dashboard"
      { path: "verified-users", element: <VerifiedUsers /> }, // "/admin-dashboard/verified-users"
      { path: "pending-users", element: <PendingUsers /> },   // "/admin-dashboard/pending-users"
      { path: "ban-users", element: <BanUsers /> },   // "/admin-dashboard/pending-users"
      { path: "register-admin", element: <RegisterAdmin /> },   // "/admin-dashboard/pending-users"
    ]
  }
]);
