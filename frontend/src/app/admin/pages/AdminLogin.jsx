import React, { useState } from "react";
import { Eye, EyeOff, Mail, Lock, ArrowRight, ShieldCheck, Headphones } from "lucide-react";
import { useAdmin } from "../hook/useAdmin.js";

const statusRows = [
  { label: "Pending queue", value: "cleared daily" },
  { label: "Song ingest", value: "operational" },
  { label: "Access log", value: "monitored" },
];

const AdminLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { handleAdminLogin } = useAdmin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleAdminLogin({ email, password });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] text-black dark:text-zinc-100 flex items-center justify-center p-4 font-sans transition-colors">
      <div className="w-full max-w-4xl border border-black/10 dark:border-white/10 flex flex-col md:flex-row min-h-[550px]">
        {/* Left: form */}
        <div className="flex-1 p-8 md:p-12 flex flex-col justify-between">
          <div className="flex items-center gap-2.5 mb-8">
            <div className="p-2 bg-black text-white dark:bg-white dark:text-black">
              <Headphones className="w-5 h-5" />
            </div>
            <span className="font-semibold tracking-wide text-sm text-black dark:text-white">
              MUZORO — ADMIN PANEL
            </span>
          </div>

          <div className="my-auto max-w-sm w-full mx-auto">
            <p className="font-mono text-[11px] tracking-[0.2em] text-zinc-500 mb-2">AUTHORIZED ACCESS</p>
            <h2 className="text-xl font-semibold text-black dark:text-white mb-2">Secure administration</h2>
            <p className="text-sm text-zinc-500 mb-8">
              Enter your credentials to manage the platform.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-medium text-zinc-500 block">Admin email address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@muzoro.com"
                    className="w-full pl-10 pr-4 py-3 bg-transparent border border-black/10 dark:border-white/10 text-sm focus:outline-none focus:border-black dark:focus:border-white transition-colors placeholder:text-zinc-500 text-black dark:text-zinc-200"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium text-zinc-500 block">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-3 bg-transparent border border-black/10 dark:border-white/10 text-sm focus:outline-none focus:border-black dark:focus:border-white transition-colors placeholder:text-zinc-500 text-black dark:text-zinc-200"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-black dark:hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-2 bg-black text-white dark:bg-white dark:text-black font-medium py-3 px-4 text-sm hover:opacity-85 transition-opacity flex items-center justify-center gap-2 group"
              >
                Access dashboard
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </form>
          </div>

          <div className="text-center mt-8 text-xs text-zinc-500">
            System issue?{" "}
            <a href="mailto:support@muzoro.com" className="text-black dark:text-white hover:underline underline-offset-4 font-medium">
              Contact DevOps
            </a>
          </div>
        </div>

        {/* Right: status panel — replaces stock photo with an honest system ledger */}
        <div className="hidden md:flex flex-1 flex-col justify-between p-12 border-l border-black/10 dark:border-white/10 bg-black text-white dark:bg-white dark:text-black">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" />
            <span className="font-mono text-[11px] tracking-[0.2em]">SYSTEM STATUS</span>
          </div>

          <div className="my-auto">
            <p className="text-sm leading-relaxed opacity-70 mb-8">
              Every approval, ban, and takedown made here is logged against your
              admin account.
            </p>
            <div className="border-t border-white/20 dark:border-black/20">
              {statusRows.map((row) => (
                <div
                  key={row.label}
                  className="flex items-center justify-between py-3 border-b border-white/20 dark:border-black/20 text-sm"
                >
                  <span className="opacity-70">{row.label}</span>
                  <span className="font-mono text-xs">{row.value}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="font-mono text-[11px] tracking-[0.2em] opacity-60">MUZORO / CONTROL ROOM</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;