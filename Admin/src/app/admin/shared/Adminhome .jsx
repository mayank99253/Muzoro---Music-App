import { UserCheck, Clock, Users, Trash2, Music, Search, Snowflake, ShieldAlert } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAdmin } from "../hook/useAdmin.js";

const StatCard = ({ icon: Icon, label, value }) => (
  <div className="bg-white dark:bg-[#0a0a0a] border border-black/10 dark:border-white/10 p-6 flex items-center gap-4 transition-colors">
    <div className="p-3 border border-black/10 dark:border-white/10 text-black dark:text-white">
      <Icon className="w-5 h-5" />
    </div>
    <div>
      <p className="text-2xl font-semibold font-mono tabular-nums text-black dark:text-white">{value}</p>
      <p className="text-sm text-zinc-500">{label}</p>
    </div>
  </div>
);

const AdminHome = () => {
  const { handleGetAllSongs, handleGetApproveArtist, handleGetPendingArtist, handleDeleteSong } = useAdmin();
  const { allSongs, verifiedAritist, pendingArtist, banArtist } = useSelector((state) => state.admin);

  useEffect(() => {
    handleGetAllSongs();
    handleGetPendingArtist();
    handleGetApproveArtist();
  }, [handleGetAllSongs, handleGetPendingArtist, handleGetApproveArtist]);

  const [searchQuery, setSearchQuery] = useState("");
  const filteredSongs = allSongs.filter((song) => {
    const query = searchQuery.toLowerCase();
    const matchesTitle = song.songTitle?.toLowerCase().includes(query);
    const matchesArtist = song.artist?.stageName?.toLowerCase().includes(query);
    const matchesMood = song.category?.toLowerCase().includes(query);
    return matchesTitle || matchesArtist || matchesMood;
  });

  return (
    <div className="text-black dark:text-zinc-100">
      <div className="mb-8">
        <p className="font-mono text-[11px] tracking-[0.2em] text-zinc-500 mb-1">OVERVIEW</p>
        <h1 className="text-xl font-semibold text-black dark:text-white">Dashboard</h1>
        <p className="text-sm text-zinc-500 mt-1">Artist verification activity and song moderation.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-black/10 dark:divide-white/10 border border-black/10 dark:border-white/10 mb-8">
        <StatCard icon={Users} label="Total artists" value={verifiedAritist.length + pendingArtist.length} />
        <StatCard icon={Clock} label="Pending approval" value={pendingArtist.length} />
        <StatCard icon={UserCheck} label="Verified artists" value={verifiedAritist.length} />
        <StatCard icon={ShieldAlert} label="Banned artists" value={banArtist.length} />
      </div>

      {/* Songs ledger */}
      <div className="bg-white dark:bg-[#0a0a0a] border border-black/10 dark:border-white/10 transition-colors">
        <div className="p-6 border-b border-black/10 dark:border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-2">
            <Music className="w-4 h-4 text-zinc-500" />
            <h2 className="text-sm font-semibold tracking-wide uppercase text-black dark:text-white">All songs</h2>
            <span className="font-mono text-xs text-zinc-500">({filteredSongs.length})</span>
          </div>

          <div className="relative max-w-xs w-full">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search song, artist, mood…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border border-black/10 dark:border-white/10 py-2 pl-9 pr-4 text-sm text-black dark:text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-black dark:focus:border-white transition-colors"
            />
          </div>
        </div>

        <div className="overflow-auto max-h-[60vh]">
          <table className="w-full text-left border-collapse">
            <thead className="sticky top-0 bg-white dark:bg-[#0a0a0a] z-10">
              <tr className="border-b border-black/10 dark:border-white/10 text-[11px] font-mono uppercase tracking-widest text-zinc-500">
                <th className="py-3 px-6 w-14">#</th>
                <th className="py-3 px-6">Song title</th>
                <th className="py-3 px-6">Artist</th>
                <th className="py-3 px-6">Mood</th>
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5 dark:divide-white/5 text-sm">
              {filteredSongs.length > 0 ? (
                filteredSongs.map((song, i) => (
                  <tr key={song.id ?? song._id} className="hover:bg-black/[0.02] dark:hover:bg-white/[0.03] transition-colors">
                    <td className="py-4 px-6 font-mono text-xs text-zinc-500">{String(i + 1).padStart(2, "0")}</td>
                    <td className="py-4 px-6 font-medium text-black dark:text-zinc-200">{song.songTitle}</td>
                    <td className="py-4 px-6 text-zinc-500">{song.artist?.stageName || "Unknown"}</td>
                    <td className="py-4 px-6">
                      <span className="px-2 py-0.5 text-xs border border-black/10 dark:border-white/10 text-zinc-500">
                        {song.category}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      {song.isFreeze ? (
                        <span className="inline-flex items-center gap-1.5 text-xs text-zinc-500">
                          <Snowflake className="w-3 h-3" />
                          Frozen
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-xs text-black dark:text-white">
                          <span className="w-1.5 h-1.5 rounded-full bg-black dark:bg-white" />
                          Active
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => handleDeleteSong({ id: song._id })}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-black/10 dark:border-white/10 text-zinc-500 hover:text-black dark:hover:text-white hover:border-black dark:hover:border-white transition-colors"
                        title="Delete song"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="py-14 text-center text-zinc-500 text-sm">
                    No songs match your search.
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

export default AdminHome;