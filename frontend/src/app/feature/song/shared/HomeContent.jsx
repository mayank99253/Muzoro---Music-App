import React from 'react';
import { Play } from 'lucide-react';
import { useSelector } from "react-redux";
import { useEffect } from 'react';
import { useSong } from '../hook/useSong.js';
import { useHistory } from '../../history/hooks/useHistory.js';
import HomeLoader from "../../../components/loader/HomeLoader.jsx"

export default function HomeContent() {
  const { handleGetLatestSongs, handlePopularSongs, handlePlaySong } = useSong();
  const { handleAddToHistory } = useHistory()
  const { moodPlaylist, mood } = useSelector((state => state.expression))

  console.log(moodPlaylist)

  const { user, } = useSelector((state) => state.auth);
  const { latestSongs, popularSongs, loading } = useSelector((state) => state.song);

  useEffect(() => {
    handleGetLatestSongs();
    handlePopularSongs()
  }, [handleGetLatestSongs, handlePopularSongs]);

  if (loading) return <HomeLoader />

  return (
    <main className="flex-1 bg-[#0a0f24] border border-purple-900/40 rounded-2xl p-6 overflow-y-auto h-full text-slate-300 custom-scrollbar flex flex-col gap-6">

      {/* Top 1st Section: Welcome Banner */}
      <div className="bg-[#0f1636] border border-purple-900/30 rounded-2xl p-5 flex justify-between items-center shadow-inner">
        <div>
          <h1 className="text-xl font-bold text-white mb-1">
            Welcome Back , <span className="text-purple-400 font-sans">{user?.userName?.toUpperCase()}</span>
          </h1>
          <p className="text-xs text-slate-400 tracking-wide">
            Lets Muzoro read your vibe and play your music perfectly.
          </p>
        </div>
        <div className="text-right">
          <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold block">Mood</span>
          <span className="text-sm font-semibold text-purple-300 flex items-center gap-1 justify-end">
            {mood?.toUpperCase()}<span className="text-base"></span>
          </span>
        </div>
      </div>

      <div>
        <h2 className="text-base font-bold text-white tracking-wide mb-4">Mood Playlist</h2>
        {(!moodPlaylist || moodPlaylist.length === 0) && (
          <div className="flex flex-col items-center justify-center text-center gap-2 py-8 px-4 text-slate-400">
            <p className="text-sm font-medium text-white">No mood playlist yet</p>
            <p className="text-xs text-slate-500">
              Click the <span className="text-purple-400 font-semibold">Detect</span> button to scan your mood and generate a playlist for you.
            </p>
          </div>
        )}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {moodPlaylist && moodPlaylist.map((song, idx) => (
            <div
              onClick={() => {
                handlePlaySong(song, moodPlaylist)
                handleAddToHistory({ id: song._id })
              }}
              key={idx}
              className="bg-[#0f1636] border border-purple-950/60 hover:border-purple-500/40 rounded-xl p-3 flex flex-col gap-2.5 transition-all duration-300 group hover:-translate-y-0.5 shadow-md"
            >
              <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-slate-900">
                <img
                  src={song.coverImageUrl || "/songcover.jpg"}
                  alt={song.songTitle || "Untitled Song"}
                  className="object-cover w-full h-full opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 transition-opacity duration-300 flex items-center justify-center">
                  <button
                    className="bg-purple-500 text-white p-2 rounded-full transform scale-75 group-hover:scale-100 transition-transform duration-300 shadow-lg">
                    <Play className="w-4 h-4 fill-white" />
                  </button>
                </div>
              </div>
              <div className="min-w-0">
                <h3 className="text-xs font-semibold text-white truncate">{song.title || song.songTitle}</h3>
                <p className="text-[10px] text-slate-400 truncate mt-0.5">
                  {typeof song.artist === 'string' ? song.artist : (song.artist?.stageName || 'Unknown Artist')}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Top 2nd Section: Latest Songs Grid */}
      <div>
        <h2 className="text-base font-bold text-white tracking-wide mb-4">Latest Songs</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {latestSongs && latestSongs.map((song, idx) => (
            <div
              onClick={() => {
                handlePlaySong(song, latestSongs)
                handleAddToHistory({ id: song._id })
              }}
              key={idx}
              className="bg-[#0f1636] border border-purple-950/60 hover:border-purple-500/40 rounded-xl p-3 flex flex-col gap-2.5 transition-all duration-300 group hover:-translate-y-0.5 shadow-md"
            >
              <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-slate-900">
                <img
                  src={song.coverImageUrl || "/songcover.jpg"}
                  alt={song.songTitle || "Untitled Song"}
                  className="object-cover w-full h-full opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 transition-opacity duration-300 flex items-center justify-center">
                  <button
                    // onClick={() => {
                    //   handlePlaySong(song, latestSongs)
                    //   handleAddToHistory({ id: song._id })
                    // }}
                    className="bg-purple-500 text-white p-2 rounded-full transform scale-75 group-hover:scale-100 transition-transform duration-300 shadow-lg">
                    <Play className="w-4 h-4 fill-white" />
                  </button>
                </div>
              </div>
              <div className="min-w-0">
                <h3 className="text-xs font-semibold text-white truncate">{song.title || song.songTitle}</h3>
                <p className="text-[10px] text-slate-400 truncate mt-0.5">
                  {typeof song.artist === 'string' ? song.artist : (song.artist?.stageName || 'Unknown Artist')}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top 3rd Section: Popular Songs Grid */}
      <div>
        <h2 className="text-base font-bold text-white tracking-wide mb-4">Popular Songs</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {popularSongs && popularSongs.map((song, idx) => (
            <div onClick={() => { handlePlaySong(song, popularSongs) }}
              key={idx}
              className="bg-[#0f1636] border border-purple-950/60 hover:border-purple-500/40 rounded-xl p-3 flex flex-col gap-2.5 transition-all duration-300 group hover:-translate-y-0.5 shadow-md"
            >
              <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-slate-900">
                <img
                  src={song.coverImageUrl || "/songcover.jpg"}
                  alt={song.songTitle || "Untitled Song"}
                  className="object-cover w-full h-full opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 transition-opacity duration-300 flex items-center justify-center">
                  <button
                    className="bg-purple-500 text-white p-2 rounded-full transform scale-75 group-hover:scale-100 transition-transform duration-300 shadow-lg">
                    <Play className="w-4 h-4 fill-white" />
                  </button>
                </div>
              </div>
              <div className="min-w-0">
                <h3 className="text-xs font-semibold text-white truncate">{song.songTitle || "Untitled Song"}</h3>
                <p className="text-[10px] text-slate-400 truncate mt-0.5">
                  {song.artist?.stageName || (typeof song.artist === 'string' ? song.artist : 'Unknown Artist')}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </main>
  );
}