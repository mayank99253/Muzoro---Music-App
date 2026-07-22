import React, { useEffect, useState } from 'react';
import { Play, Search, Clock, ListMusic } from 'lucide-react';
import { useSong } from '../hook/useSong.js';
import { useSelector } from 'react-redux';
import SongLoader from "../../../components/loader/SongLoader.jsx";

const genres = ['Pop', 'Hip-Hop', 'Sad Vibe', 'Lo-Fi', 'Rock', 'Electronic'];

export default function SearchContent() {
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState([]);

  const { handleGetAllSongs, handlePlaySong } = useSong();
  const { allSongs, loading } = useSelector((state) => state.song);

  useEffect(() => {
    handleGetAllSongs();
  }, [handleGetAllSongs]);

  if (loading) return <SongLoader />;

  const filtered = allSongs.filter((song) => {
    const q = query.toLowerCase();
    const titleMatch = song.songTitle?.toLowerCase().includes(q);
    const artistMatch = song.artist?.stageName?.toLowerCase().includes(q);
    const moodMatch = song.category?.toLowerCase().includes(q);
    return titleMatch || artistMatch || moodMatch;
  });

  // Jab user Enter dabaye ya search kare, term ko "Recent Searches" mein add karo
  const handleSearch = (term) => {
    setQuery(term);
    if (term && !recentSearches.includes(term)) {
      setRecentSearches((prev) => [term, ...prev].slice(0, 5)); // sirf latest 5 rakho
    }
  };

  return (
    <main className="flex-1 bg-[#0a0f24] border border-purple-900/40 rounded-2xl p-6 overflow-y-auto h-full text-slate-300 flex flex-col gap-6">

      {/* Header + Search Bar */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <ListMusic className="w-5 h-5 text-purple-400" />
          <h1 className="text-base font-bold text-white tracking-wide">All Songs</h1>
        </div>

        <div className="relative w-full max-w-xs">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch(query)}
            placeholder="Search songs or artists..."
            className="w-full bg-[#0f1636] border border-purple-950/60 focus:border-purple-500/50 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-500 outline-none transition-all"
          />
        </div>
      </div>

      {query ? (
        /* ================= Search Results Table ================= */
        <div className="bg-[#0f1636] border border-purple-950/60 rounded-2xl overflow-y-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-purple-950/60 text-[11px] uppercase tracking-widest text-slate-500">
                <th className="py-3 px-5 w-12">#</th>
                <th className="py-3 px-5">Title</th>
                <th className="py-3 px-5">Artist</th>
                <th className="py-3 px-5">Mood</th>
                <th className="py-3 px-5 text-right">
                  <Clock className="w-3.5 h-3.5 inline" />
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-950/40">
              {filtered.length > 0 ? (
                filtered.map((song, idx) => (
                  <tr key={song._id} className="group hover:bg-purple-950/20 transition-colors">
                    <td className="py-3 px-5 text-xs text-slate-500">
                      <span className="group-hover:hidden">{String(idx + 1).padStart(2, '0')}</span>
                      <button
                        onClick={() => handlePlaySong(song, filtered)}
                        aria-label={`Play ${song.songTitle}`}
                        className="inline-flex text-purple-400"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                      </button>
                    </td>
                    <td className="py-3 px-5 text-sm font-medium text-white">{song.songTitle}</td>
                    <td className="py-3 px-5 text-sm text-slate-400">{song.artist?.stageName || 'Unknown Artist'}</td>
                    <td className="py-3 px-5">
                      <span className="px-2.5 py-1 text-[11px] rounded-full bg-purple-950/40 border border-purple-900/50 text-purple-300">
                        {song.category}
                      </span>
                    </td>
                    <td className="py-3 px-5 text-right text-xs text-slate-500">{song.duration}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-12 text-center text-slate-500 text-sm">
                    No songs match "{query}".
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        /* ================= Default View: Recent + Genres + Full List ================= */
        <>
          {/* Recent Searches */}
          {recentSearches.length > 0 && (
            <div>
              <h2 className="text-base font-bold text-white tracking-wide mb-3 flex items-center gap-2">
                <Clock className="w-4 h-4 text-purple-400" />
                Recent Searches
              </h2>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((term) => (
                  <button
                    key={term}
                    onClick={() => handleSearch(term)}
                    className="px-3.5 py-1.5 text-xs font-medium rounded-full bg-[#0f1636] border border-purple-950/60 text-slate-300 hover:border-purple-500/40 hover:text-white transition-all"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Browse Genres */}
          <div>
            <h2 className="text-base font-bold text-white tracking-wide mb-4">Browse Genres</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {genres.map((genre, idx) => (
                <div
                  key={idx}
                  onClick={() => handleSearch(genre)}
                  className="h-28 rounded-xl bg-gradient-to-br from-purple-900/40 to-[#0f1636] border border-purple-950/60 p-4 flex justify-between items-end hover:border-purple-500/30 cursor-pointer group transition-all"
                >
                  <span className="font-bold text-white tracking-wide">{genre}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Full Song Table (jab koi search na ho) */}
          <div>
            <h2 className="text-base font-bold text-white tracking-wide mb-4">All Songs</h2>
            <div className="bg-[#0f1636] border border-purple-950/60 rounded-2xl overflow-y-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-purple-950/60 text-[11px] uppercase tracking-widest text-slate-500">
                    <th className="py-3 px-5 w-12">#</th>
                    <th className="py-3 px-5">Title</th>
                    <th className="py-3 px-5">Artist</th>
                    <th className="py-3 px-5">Mood</th>
                    <th className="py-3 px-5 text-right">
                      <Clock className="w-3.5 h-3.5 inline" />
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-purple-950/40">
                  {allSongs.map((song, idx) => (
                    <tr key={song._id} className="group hover:bg-purple-950/20 transition-colors">
                      <td className="py-3 px-5 text-xs text-slate-500">
                        <span className="group-hover:hidden">{String(idx + 1).padStart(2, '0')}</span>
                        <button
                          onClick={() => handlePlaySong(song, allSongs)}
                          aria-label={`Play ${song.songTitle}`}
                          className="inline-flex text-purple-400"
                        >
                          <Play className="w-3.5 h-3.5 fill-current" />
                        </button>
                      </td>
                      <td className="py-3 px-5 text-sm font-medium text-white">{song.songTitle}</td>
                      <td className="py-3 px-5 text-sm text-slate-400">{song.artist?.stageName || 'Unknown Artist'}</td>
                      <td className="py-3 px-5">
                        <span className="px-2.5 py-1 text-[11px] rounded-full bg-purple-950/40 border border-purple-900/50 text-purple-300">
                          {song.category}
                        </span>
                      </td>
                      <td className="py-3 px-5 text-right text-xs text-slate-500">{song.duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )
      }
    </main >
  );
}