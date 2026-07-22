import { createBrowserRouter, Navigate } from "react-router-dom";
import AdminLogin from "./admin/pages/AdminLogin";
import AdminDashboard from "./admin/pages/AdminDashboard";
import VerifiedUsers from "./admin/shared/Verifiedusers";
import PendingUsers from "./admin/shared/Pendingusers";
import AdminHome from "./admin/shared/Adminhome ";
import BanUsers from "./admin/shared/BanUsers";
import RegisterAdmin from "./admin/shared/Registeradmin";
import { useSelector } from "react-redux";
function AdminLoginGate() {
  const { admin } = useSelector((state) => state.admin);
  return admin ? <Navigate to="/" replace /> : <AdminLogin />;
}

function AdminProtectedRoute() {
  const { admin } = useSelector((state) => state.admin);
  return admin ? <AdminDashboard /> : <Navigate to="/admin-login" replace />;
}

export const router = createBrowserRouter([
  { path: "/admin-login", element: <AdminLoginGate /> },
  {
    path: "/",
    element: <AdminProtectedRoute />,
    children: [
      { index: true, element: <AdminHome /> },
      { path: "verified-users", element: <VerifiedUsers /> },
      { path: "pending-users", element: <PendingUsers /> },
      { path: "ban-users", element: <BanUsers /> },
      { path: "register-admin", element: <RegisterAdmin /> },
    ]
  }
]);