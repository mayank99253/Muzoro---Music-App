import { useState } from "react";
import { UserPlus, Mail, Lock, User, ArrowRight } from "lucide-react";
import { useAdmin } from "../hook/useAdmin.js";

// TODO: add `handleRegisterAdmin` to your useAdmin hook — it should POST to a
// route that is protected by the SAME admin-auth middleware as every other
// admin route (handleGetAllSongs, handleBanArtist, etc). Because that route
// only accepts requests carrying a valid admin session/JWT, only someone
// already logged in as an admin can ever reach it — no separate role check
// needed, since there's only one admin role today. If you later want tiers
// (e.g. only a "super admin" can create admins), add a `role` field on the
// admin model and check it in that same middleware.
const RegisterAdmin = () => {
  const { handleRegisterAdmin } = useAdmin();

  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const onChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    await handleRegisterAdmin(form);
    setForm({ name: "", email: "", password: "" });
  };

  return (
    <div className="text-black dark:text-zinc-100">
      <div className="mb-8 flex items-start gap-3">
        <div className="p-2.5 border border-black/10 dark:border-white/10 text-black dark:text-white">
          <UserPlus className="w-5 h-5" />
        </div>
        <div>
          <p className="font-mono text-[11px] tracking-[0.2em] text-zinc-500 mb-1">ACCESS CONTROL</p>
          <h1 className="text-xl font-semibold text-black dark:text-white">Add admin</h1>
          <p className="text-sm text-zinc-500 mt-1">
            Only signed-in admins can reach this page — the new account gets the same access as yours.
          </p>
        </div>
      </div>

      <form
        onSubmit={onSubmit}
        className="bg-white dark:bg-[#0a0a0a] border border-black/10 dark:border-white/10 p-8 max-w-md space-y-5"
      >
        <div className="space-y-2">
          <label className="text-xs font-medium text-zinc-500 block">Name</label>
          <div className="relative">
            <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              name="name"
              value={form.name}
              onChange={onChange}
              placeholder="Full name"
              className="w-full pl-10 pr-4 py-3 bg-transparent border border-black/10 dark:border-white/10 text-sm focus:outline-none focus:border-black dark:focus:border-white transition-colors placeholder:text-zinc-500 text-black dark:text-zinc-200"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-medium text-zinc-500 block">Email</label>
          <div className="relative">
            <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={onChange}
              placeholder="new-admin@muzoro.com"
              className="w-full pl-10 pr-4 py-3 bg-transparent border border-black/10 dark:border-white/10 text-sm focus:outline-none focus:border-black dark:focus:border-white transition-colors placeholder:text-zinc-500 text-black dark:text-zinc-200"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-medium text-zinc-500 block">Temporary password</label>
          <div className="relative">
            <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={onChange}
              placeholder="••••••••"
              className="w-full pl-10 pr-4 py-3 bg-transparent border border-black/10 dark:border-white/10 text-sm focus:outline-none focus:border-black dark:focus:border-white transition-colors placeholder:text-zinc-500 text-black dark:text-zinc-200"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full mt-2 bg-black text-white dark:bg-white dark:text-black font-medium py-3 px-4 text-sm hover:opacity-85 transition-opacity flex items-center justify-center gap-2 group"
        >
          Create admin account
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </form>
    </div>
  );
};

export default RegisterAdmin;