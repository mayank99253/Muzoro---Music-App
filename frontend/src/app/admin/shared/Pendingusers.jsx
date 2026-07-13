import { Check, X, Clock } from "lucide-react";
import { useAdmin } from "../hook/useAdmin.js";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const PendingUsers = () => {
  const { handleGetPendingArtist, handleApproveArtist, handleRejectArtist } = useAdmin();
  const { pendingArtist } = useSelector((state) => state.admin);

  useEffect(() => {
    handleGetPendingArtist();
  }, [handleGetPendingArtist]);

  return (
    <div className="text-black dark:text-zinc-100">
      <div className="mb-8">
        <p className="font-mono text-[11px] tracking-[0.2em] text-zinc-500 mb-1">QUEUE</p>
        <h1 className="text-xl font-semibold text-black dark:text-white">Pending users</h1>
        <p className="text-sm text-zinc-500 mt-1">Artist accounts waiting for approval.</p>
      </div>

      <div className="bg-white dark:bg-[#0a0a0a] border border-black/10 dark:border-white/10 transition-colors">
        <div className="overflow-auto max-h-[65vh]">
        <table className="w-full text-sm">
          <thead className="sticky top-0 bg-white dark:bg-[#0a0a0a] z-10">
            <tr className="border-b border-black/10 dark:border-white/10 text-left text-[11px] font-mono uppercase tracking-widest text-zinc-500">
              <th className="px-6 py-3 font-medium w-14">#</th>
              <th className="px-6 py-3 font-medium">Artist</th>
              <th className="px-6 py-3 font-medium">Email</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5 dark:divide-white/5">
            {pendingArtist.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-14 text-center text-zinc-500">
                  No pending artists right now.
                </td>
              </tr>
            ) : (
              pendingArtist.map((artist, i) => (
                <tr key={artist._id} className="hover:bg-black/[0.02] dark:hover:bg-white/[0.03] transition-colors">
                  <td className="px-6 py-4 font-mono text-xs text-zinc-500">{String(i + 1).padStart(2, "0")}</td>
                  <td className="px-6 py-4 font-medium text-black dark:text-zinc-200">{artist.stageName}</td>
                  <td className="px-6 py-4 text-zinc-500">{artist.user.email}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 text-xs text-zinc-500">
                      <Clock className="w-3 h-3" />
                      Pending
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleApproveArtist({ id: artist._id })}
                        className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 bg-black text-white dark:bg-white dark:text-black hover:opacity-80 transition-opacity"
                      >
                        <Check className="w-3.5 h-3.5" />
                        Approve
                      </button>
                      <button
                        onClick={() => handleRejectArtist({ id: artist._id })}
                        className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 border border-black/10 dark:border-white/10 text-zinc-500 hover:text-black dark:hover:text-white hover:border-black dark:hover:border-white transition-colors"
                      >
                        <X className="w-3.5 h-3.5" />
                        Reject
                      </button>
                    </div>
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
};

export default PendingUsers;