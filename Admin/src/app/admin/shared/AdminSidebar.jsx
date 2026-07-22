import { NavLink } from "react-router-dom";
import { LayoutDashboard, UserCheck, Clock, LogOut, Headphones, Ban, UserPlus } from "lucide-react";
import { useAdmin } from "../hook/useAdmin.js";

const navItems = [
  { to: "/", label: "Home", icon: LayoutDashboard, end: true },
  { to: "/verified-users", label: "Verified Users", icon: UserCheck },
  { to: "/pending-users", label: "Pending Users", icon: Clock },
  { to: "/ban-users", label: "Ban Users", icon: Ban },
  { to: "/register-admin", label: "Add Admin", icon: UserPlus },
];

const AdminSidebar = () => {
  const { handleAdminLogout } = useAdmin();

  return (
    <aside className="w-64 shrink-0 flex flex-col justify-between py-6 px-4 bg-white dark:bg-[#0a0a0a] border-r border-black/10 dark:border-white/10 transition-colors">
      <div>
        {/* Wordmark */}
        <div className="flex items-center gap-2.5 px-2 mb-10">
          <div className="p-2 rounded-sm bg-black text-white dark:bg-white dark:text-black">
            <Headphones className="w-5 h-5" />
          </div>
          <div className="leading-tight">
            <p className="font-semibold text-sm text-black dark:text-white">Muzoro</p>
            <p className="font-mono text-[10px] tracking-[0.25em] text-zinc-500">ADMIN</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="space-y-1">
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 pl-3 pr-2 py-2.5 text-sm font-medium border-l-2 transition-colors ${
                  isActive
                    ? "border-black dark:border-white text-black dark:text-white bg-black/[0.03] dark:bg-white/[0.06]"
                    : "border-transparent text-zinc-500 hover:text-black dark:hover:text-white hover:bg-black/[0.02] dark:hover:bg-white/[0.04]"
                }`
              }
            >
              <Icon className="w-4 h-4" />
              {label}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Logout */}
      <button
        onClick={handleAdminLogout}
        className="flex items-center gap-3 pl-3 pr-2 py-2.5 text-sm font-medium border-l-2 border-transparent text-zinc-500 hover:text-black dark:hover:text-white hover:border-black dark:hover:border-white transition-colors"
      >
        <LogOut className="w-4 h-4" />
        Log out
      </button>
    </aside>
  );
};

export default AdminSidebar;