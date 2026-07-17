import { Outlet } from "react-router-dom";
import { Sun, Moon } from "lucide-react";
import { useSelector } from "react-redux";
import AdminSidebar from "../shared/AdminSidebar";
import { useTheme } from "../hook/useTheme.js";

const AdminDashboard = () => {
  const { theme, toggleTheme } = useTheme();


  // TODO: point this at whichever slice actually holds the logged-in admin's
  // own profile. Your "admin" slice currently stores artist/song data, so
  // this is likely a different slice (e.g. state.auth.admin) — swap it in.
  const { admin } = useSelector((state) => state.admin);
  const adminName = admin?.userName || admin?.email || "Admin";

  return (
    <div className="min-h-screen flex bg-white text-black dark:bg-[#0a0a0a] dark:text-zinc-100 transition-colors">
      <AdminSidebar />

      <main className="flex-1 flex flex-col min-w-0">
        {/* Slim top bar — logged-in admin + theme switch */}
        <div className="flex items-center justify-between px-8 h-14 border-b border-black/10 dark:border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 flex items-center justify-center font-mono text-[11px] border border-black/10 dark:border-white/10 text-zinc-500">
              {adminName.charAt(0).toUpperCase()}
            </div>
            <span className="text-sm font-medium text-black dark:text-zinc-200">Welcome back, Happy to See you  {adminName}</span>
          </div>

          <button
            onClick={toggleTheme}
            aria-label="Toggle color theme"
            title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            className="w-8 h-8 flex items-center justify-center rounded-sm border border-black/10 dark:border-white/10 text-zinc-500 hover:text-black dark:hover:text-white hover:border-black/40 dark:hover:border-white/40 transition-colors"
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>

        <div className="flex-1 p-8 overflow-y-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;