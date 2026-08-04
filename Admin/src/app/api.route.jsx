import { createBrowserRouter , Navigate} from "react-router-dom";
import AdminLogin from "./admin/pages/AdminLogin";
import AdminDashboard from "./admin/pages/AdminDashboard";
import VerifiedUsers from "./admin/shared/Verifiedusers";
import PendingUsers from "./admin/shared/Pendingusers";
import AdminHome from "./admin/shared/Adminhome ";
import BanUsers from "./admin/shared/BanUsers";
import RegisterAdmin from "./admin/shared/Registeradmin";

export const router = (admin)=> createBrowserRouter([
  { path: "/admin-login", 
    element: admin ? <Navigate to="/" replace /> :  <AdminLogin /> },
  {
    path: "/",
    element: admin ? <AdminDashboard /> : <Navigate to='/admin-login' />,
    children: [
      { index: true, element: <AdminHome /> },
      { path: "verified-users", element: <VerifiedUsers /> },
      { path: "pending-users", element: <PendingUsers /> },
      { path: "ban-users", element: <BanUsers /> },
      { path: "register-admin", element: <RegisterAdmin /> },
    ]
  }
]);
