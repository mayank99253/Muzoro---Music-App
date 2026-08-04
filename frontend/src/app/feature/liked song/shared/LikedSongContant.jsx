import React, { useEffect, useState } from 'react';
import { Play, Heart, PlusCircle, Music, ChevronDown, ListMusic, Plus, CircleMinus } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { playSong } from "../../song/song.slice.js"; // Retained from your architecture
import LikedSongLoader from "../../../components/loader/LikedSongLoader.jsx"
import { useLikedSong } from '../hook/useLikedSong.js';


// Small reusable header used by Liked Songs / Playlists section shells
function SectionHeader({ icon, title, count, isOpen, onToggle, accent = "purple" }) {
  const accentClasses = {
    purple: "text-purple-400",
    pink: "text-pink-500",
  };

  return (
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between px-5 py-4 group"
    >
      <div className="flex items-center gap-2.5">
        <span className={accentClasses[accent]}>{icon}</span>
        <h2 className="text-sm font-bold text-white tracking-wide">{title}</h2>
        <span className="text-[11px] font-semibold text-slate-500 bg-[#0f1636] border border-purple-950/60 rounded-full px-2 py-0.5">
          {count}
        </span>
      </div>
      <ChevronDown
        className={`w-4 h-4 text-slate-500 group-hover:text-slate-300 transition-transform duration-300 ease-in-out ${
          isOpen ? "rotate-180" : ""
        }`}
      />
    </button>
  );
}

// Wrapper that animates its children in/out smoothly using max-height + opacity
function Collapse({ isOpen, children }) {
  return (
    <div
      className={`transition-all duration-300 ease-in-out overflow-hidden ${
        isOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
      }`}
    >
      {children}
    </div>
  );
}

// A single track row — reused for both Liked Songs and songs nested inside a playlist
function SongRow({ title, artist, onPlay, onRemove, removeIcon }) {
  return (
    <div className="flex items-center justify-between bg-[#0a0f24] border border-purple-950/50 hover:border-purple-500/40 rounded-xl px-4 py-2.5 transition-all group">
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onPlay}
          className="bg-purple-900/30 border border-purple-500/20 text-purple-400 p-1.5 rounded-full hover:bg-purple-500 hover:text-white transition-all shrink-0"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
        </button>
        <div className="min-w-0">
          <p className="text-sm font-medium text-white truncate">{title}</p>
          <p className="text-xs text-slate-400 truncate">{artist}</p>
        </div>
      </div>

      {onRemove && (
        <button
          onClick={onRemove}
          className="text-pink-500 hover:text-slate-400 transition-colors p-1 shrink-0"
          title="Unlike song"
        >
          {removeIcon}
        </button>
      )}
    </div>
  );
}

export default function LikedSongContent() {
  const { handleGetLikedSong, handleCreatePlaylist, handleGetPlaylists , handleAddRemoveToPlaylist ,handleLikeSong , handleUnlikeSong } = useLikedSong();
  const { likedSong : likedSongList, playlist , loading } = useSelector((state) => state.likedSong);
  const { currentSong } = useSelector((state) => state.song);
  const dispatch = useDispatch();

  useEffect(() => {
    handleGetLikedSong();
    handleGetPlaylists();
  }, [handleGetLikedSong, handleGetPlaylists]);

  // Keep local editable copies in sync with the store (so optimistic UI actions like
  // "unlike" have something to update, without losing data once the async fetch resolves)
  const [likedSongs, setLikedSongs] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  useEffect(() => setLikedSongs([...likedSongList] || []), [likedSongList]);
  useEffect(() => setPlaylists(playlist || []), [playlist]);

  const [playlistName, setPlaylistName] = useState('');
  const [isPlaylistsOpen, setIsPlaylistsOpen] = useState(true);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isLikedOpen, setIsLikedOpen] = useState(false);

  // Per-playlist toggle — which playlist cards are expanded to show their songs
  const [expandedPlaylistIds, setExpandedPlaylistIds] = useState({});

    const isLiked = currentSong
    ? likedSongList?.some((s) => (s.song?._id) === (currentSong._id || currentSong.id))
    : false;

  const handleToggleLike = async () => {
    if (!currentSong) return;

    const songId = currentSong._id || currentSong.id;

    try {
      if (isLiked) {
        await handleUnlikeSong({ songId });
      } else {
        await handleLikeSong({ songId });
      }
    } catch (error) {
      console.error("Error toggling like state:", error);
    }
  };

  const togglePlaylistExpand = (id) => {
    setExpandedPlaylistIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };


  // Playback integration matching your History logic
  const handlePlaySong = (songItem) => {
    const songsOnly = likedSongs.map((l) => l.song);
    dispatch(playSong({ song: songItem.song, list: songsOnly }));
  };

  // Play a song that lives inside a playlist (songs here are plain Song docs, not wrapped)
  const handlePlaySongInPlaylist = (song, allSongsInPlaylist) => {
    dispatch(playSong({ song, list: allSongsInPlaylist }));
  };

  // Playlist creation — just type a name and hit create, no modal
  const handleCreatePlaylistSubmit = async (e) => {
    e.preventDefault();
    if (!playlistName.trim()) return;
    await handleCreatePlaylist({ name: playlistName.trim() });
    setPlaylistName('');
    setIsCreateOpen(false);
  };
  
  if(loading) return <LikedSongLoader />

  return (
    <main className="flex-1 bg-[#0a0f24] rounded-2xl p-4 sm:p-6 overflow-y-auto h-full text-slate-300 flex flex-col gap-5">

      {/* Page Title + Create Playlist trigger */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2.5">
            <Heart className="w-5 h-5 text-pink-500 fill-pink-500" />
            <h1 className="text-lg font-bold text-white tracking-wide">Your Library</h1>
          </div>

          <button
            onClick={() => setIsCreateOpen(!isCreateOpen)}
            title="Create Playlist"
            className={`flex items-center justify-center w-8 h-8 rounded-full border transition-all duration-300 ease-in-out ${
              isCreateOpen
                ? "bg-purple-600 border-purple-500 text-white rotate-45"
                : "bg-[#0f1636] border-purple-900/40 text-purple-400 hover:bg-purple-900/40 hover:border-purple-500/40"
            }`}
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        <Collapse isOpen={isCreateOpen}>
          <div className="bg-[#0f1636] border border-purple-900/40 rounded-2xl p-4 mt-1">
            <form onSubmit={handleCreatePlaylistSubmit} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <input
                type="text"
                required
                autoFocus
                value={playlistName}
                onChange={(e) => setPlaylistName(e.target.value)}
                placeholder="e.g., Chill Vibes, Midnight Drive"
                className="flex-1 bg-[#0a0f24] border border-purple-950 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500 transition-all placeholder:text-slate-600"
              />
              <button
                type="submit"
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white px-5 py-2.5 text-xs font-semibold rounded-xl shadow-lg shadow-purple-900/20 transition-all shrink-0"
              >
                <PlusCircle className="w-4 h-4" />
                Create Playlist
              </button>
            </form>
          </div>
        </Collapse>
      </div>

      {/* Section 1: Liked Songs */}
      <div className="bg-[#0f1636] border border-purple-900/40 rounded-2xl overflow-y-scroll">
        <SectionHeader
          icon={<Heart className="w-4 h-4 fill-current" />}
          title="Liked Songs"
          count={likedSongs.length}
          isOpen={isLikedOpen}
          onToggle={()=> setIsLikedOpen(!isLikedOpen)}
          accent="pink"
        />

        <Collapse isOpen={isLikedOpen}>
          <div className="flex flex-col gap-2 px-4 pb-4">
            {likedSongs.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 gap-2">
                <Heart className="w-8 h-8 text-slate-600 stroke-[1.5]" />
                <p className="text-sm text-slate-500 text-center">No liked songs yet</p>
              </div>
            ) : (
              likedSongs.map((item) => (
                <SongRow
                  key={item._id}
                  title={item.song?.songTitle}
                  artist={item.song?.artist?.stageName}
                  onPlay={() => handlePlaySong(item)}
                  onRemove={() => handleUnlikeSong({songId : item.song?._id})}
                  removeIcon={ <Heart className="w-4 h-4 fill-current" /> }
                />
              ))
            )}
          </div>
        </Collapse>
      </div>

      {/* Section 2: User-Created Playlists — each one expands to reveal its own songs */}
      <div className="bg-[#0f1636] border border-purple-900/40 rounded-2xl overflow-y-auto">
        <SectionHeader
          icon={<ListMusic className="w-4 h-4" />}
          title="Your Playlists"
          count={playlists.length}
          isOpen={isPlaylistsOpen}
          onToggle={() => setIsPlaylistsOpen(!isPlaylistsOpen)}
          accent="purple"
        />

        <Collapse isOpen={isPlaylistsOpen}>
          <div className="flex flex-col gap-2 px-4 pb-4">
            {playlists.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 gap-2">
                <Music className="w-8 h-8 text-slate-600 stroke-[1.5]" />
                <p className="text-sm text-slate-500 text-center">No playlists created yet</p>
              </div>
            ) : (
              playlists.map((pl) => {
                const songs = pl.songs || [];
                const isExpanded = !!expandedPlaylistIds[pl._id];

                return (
                  <div
                    key={pl._id}
                    className="bg-[#0a0f24] border border-purple-950/50 hover:border-purple-500/30 rounded-xl overflow-hidden transition-all"
                  >
                    <button
                      onClick={() => togglePlaylistExpand(pl._id)}
                      className="w-full flex items-center justify-between gap-3 px-4 py-3 group"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="p-2 bg-purple-950 rounded-lg text-purple-400 shrink-0">
                          <Music className="w-4 h-4" />
                        </div>
                        <div className="min-w-0 text-left">
                          <h4 className="text-sm font-medium text-slate-200 truncate">{pl.name}</h4>
                          <p className="text-xs text-slate-500">{songs.length} songs</p>
                        </div>
                      </div>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-500 group-hover:text-slate-300 transition-transform duration-300 ease-in-out shrink-0 ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <Collapse isOpen={isExpanded}>
                      <div className="flex flex-col gap-2 px-3 pb-3">
                        {songs.length === 0 ? (
                          <p className="text-xs text-slate-500 text-center py-4">
                            No songs added to this playlist yet
                          </p>
                        ) : (
                          songs.map((song) => (
                            <SongRow
                              key={song._id}
                              title={song.songTitle}
                              artist={song.artist?.stageName}
                              onPlay={() => handlePlaySongInPlaylist(song, songs)}
                              onRemove={() => handleAddRemoveToPlaylist({playlistId : pl._id , songId : song._id})}
                              removeIcon={<CircleMinus />}
                            />
                          ))
                        )}
                      </div>
                    </Collapse>
                  </div>
                );
              })
            )}
          </div>
        </Collapse>
      </div>
    </main>
  );
}