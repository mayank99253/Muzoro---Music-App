import { ShieldAlert, UserCheck, Mail } from "lucide-react";
import { useAdmin } from "../hook/useAdmin.js";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function BanUser() {
  const { handleUnbanArtist, handleGetBanArtists } = useAdmin();
  const { banArtist } = useSelector((state) => state.admin);

  useEffect(() => {
    handleGetBanArtists();
  }, [handleGetBanArtists]);

  return (
    <div className="text-black dark:text-zinc-100">
      <div className="mb-8 flex items-start gap-3">
        <div className="p-2.5 border border-black/10 dark:border-white/10 text-black dark:text-white">
          <ShieldAlert className="w-5 h-5" />
        </div>
        <div>
          <p className="font-mono text-[11px] tracking-[0.2em] text-zinc-500 mb-1">RESTRICTED</p>
          <h1 className="text-xl font-semibold text-black dark:text-white">Banned artists</h1>
          <p className="text-sm text-zinc-500 mt-1">Review and reinstate restricted creator accounts.</p>
        </div>
      </div>

      <div className="bg-white dark:bg-[#0a0a0a] border border-black/10 dark:border-white/10 transition-colors">
        <div className="overflow-auto max-h-[65vh]">
        <table className="w-full text-sm border-collapse">
          <thead className="sticky top-0 bg-white dark:bg-[#0a0a0a] z-10">
            <tr className="border-b border-black/10 dark:border-white/10 text-left text-[11px] font-mono uppercase tracking-widest text-zinc-500">
              <th className="px-6 py-4 font-medium w-14">#</th>
              <th className="px-6 py-4 font-medium">Artist</th>
              <th className="px-6 py-4 font-medium">Email</th>
              <th className="px-6 py-4 font-medium text-center w-[160px]">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5 dark:divide-white/5">
            {banArtist.length === 0 ? (
              <tr>
                <td colSpan="4" className="px-6 py-14 text-center text-zinc-500">
                  No currently banned artists.
                </td>
              </tr>
            ) : (
              banArtist.map((artist, i) => (
                <tr key={artist._id} className="hover:bg-black/[0.02] dark:hover:bg-white/[0.03] transition-colors">
                  <td className="px-6 py-4 font-mono text-xs text-zinc-500">{String(i + 1).padStart(2, "0")}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 flex items-center justify-center font-mono text-xs border border-black/10 dark:border-white/10 text-zinc-500">
                        {artist.stageName?.charAt(0).toUpperCase() || "?"}
                      </div>
                      <span className="font-medium text-black dark:text-zinc-200">{artist.stageName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-zinc-500">
                      <Mail className="w-3.5 h-3.5" />
                      <span>{artist.user?.email || "N/A"}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => handleUnbanArtist({ id: artist._id })}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-black text-white dark:bg-white dark:text-black hover:opacity-80 transition-opacity"
                    >
                      <UserCheck className="w-3.5 h-3.5" />
                      Unban
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
}