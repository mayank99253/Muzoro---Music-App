import { UserCheck, ShieldAlert } from "lucide-react";
import { useAdmin } from "../hook/useAdmin.js";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const VerifiedUsers = () => {
  const { handleGetApproveArtist, handleBanArtist } = useAdmin();
  const { verifiedAritist } = useSelector((state) => state.admin);

  useEffect(() => {
    handleGetApproveArtist();
  }, [handleGetApproveArtist]);


  return (
    <div className="text-black dark:text-zinc-100">
      <div className="mb-8">
        <p className="font-mono text-[11px] tracking-[0.2em] text-zinc-500 mb-1">ROSTER</p>
        <h1 className="text-xl font-semibold text-black dark:text-white">Verified users</h1>
        <p className="text-sm text-zinc-500 mt-1">Artists approved and active on Muzoro.</p>
      </div>

      <div className="bg-white dark:bg-[#0a0a0a] border border-black/10 dark:border-white/10 transition-colors">
        <div className="overflow-auto max-h-[65vh]">
        <table className="w-full text-sm">
          <thead className="sticky top-0 bg-white dark:bg-[#0a0a0a] z-10">
            <tr className="border-b border-black/10 dark:border-white/10 text-left text-[11px] font-mono uppercase tracking-widest text-zinc-500">
              <th className="px-6 py-4 font-medium w-14">#</th>
              <th className="px-6 py-4 font-medium">Artist</th>
              <th className="px-6 py-4 font-medium">Email</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium text-center w-[120px]">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5 dark:divide-white/5">
            {verifiedAritist?.length > 0 ? (
              verifiedAritist.map((artist, i) => (
                <tr key={artist._id} className="hover:bg-black/2 dark:hover:bg-white/[0.03] transition-colors">
                  <td className="px-6 py-4 font-mono text-xs text-zinc-500">{String(i + 1).padStart(2, "0")}</td>
                  <td className="px-6 py-4 font-medium text-black dark:text-zinc-200">{artist.stageName}</td>
                  <td className="px-6 py-4 text-zinc-500">{artist.user?.email || "N/A"}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 text-xs text-black dark:text-white">
                      <UserCheck className="w-3.5 h-3.5" />
                      Approved
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => handleBanArtist({ id: artist._id })}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-black/10 dark:border-white/10 text-zinc-500 hover:text-black dark:hover:text-white hover:border-black dark:hover:border-white transition-colors"
                    >
                      <ShieldAlert className="w-3.5 h-3.5" />
                      Ban
                    </button>
                  </td>
                </tr>
              ))
            ):(
               <tr>
                <td colSpan="5" className="px-6 py-14 text-center text-zinc-500">
                  No verified artists found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
};

export default VerifiedUsers;