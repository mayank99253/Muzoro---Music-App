import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, Smartphone, Heart, Music, FolderPlus, Plus, X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { playNext, playPrevious, setIsPlaying } from '../../feature/song/song.slice';
import { useHistory } from "../../feature/history/hooks/useHistory.js"
import { useLikedSong } from '../../feature/liked song/hook/useLikedSong.js';

export default function RightSidebar() {

  // 1. Fetching Global Song State & User History Slice
  const { isPlaying, currentSong: activeSong } = useSelector((state) => state.song);
  const { history } = useSelector((state) => state.history);
  const { handleGetHistory } = useHistory();
  const { handleUnlikeSong, handleLikeSong, handleCreatePlaylist, handleGetPlaylists, handleAddSongToPlaylist, handleGetLikedSong } = useLikedSong();
  const { likedSong: likedSongList, playlist } = useSelector((state) => state.likedSong);



  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Playlist Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const dispatch = useDispatch();
  const audioRef = useRef(null);

  useEffect(() => {
    handleGetLikedSong()
  }, [handleGetLikedSong])

  // 2. Fetch history on mount if not loaded to know the last track
  useEffect(() => {
      handleGetHistory();
  }, [handleGetHistory]);

  // 3. Fallback logic: If no dynamic song active, target the latest item from history array
  const lastPlayedSongItem = history && history.length > 0 ? history[0]?.song : null;
  const currentSong = activeSong || lastPlayedSongItem;

  // Play/Pause control jab state change ho
  useEffect(() => {
    if (!audioRef.current || !currentSong) return;
    if (isPlaying) { // Only play dynamically if an active selection exists
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, currentSong]);

  // Jab naya song load ho, time reset karo
  useEffect(() => {
    setCurrentTime(0);
    setDuration(0);
  }, [currentSong]);


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

  const togglePlaySong = () => {
    dispatch(setIsPlaying(!isPlaying));
  };

  // Audio ka current time track karne ke liye
  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  // Jab audio metadata load ho (duration milta hai yahin)
  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  // Progress bar drag karke seek karna
  const handleSeek = (e) => {
    const seekTime = Number(e.target.value);
    audioRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  // Seconds ko mm:ss format mein convert karo
  const formatTime = (time) => {
    if (!time || isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  // --- Playlist Logic Handlers ---

  // Fetch playlists from API when modal opens
  const fetchPlaylists = async () => {
    const response = await handleGetPlaylists()
  };

  const handleOpenPlaylistModal = () => {
    if (!currentSong) return;
    setIsModalOpen(true);
    fetchPlaylists();
  };

  const handleAddToPlaylist = async (playlistId) => {
    const songId = currentSong._id || currentSong.id;
    await handleAddSongToPlaylist({ playlistId, songId })
    setIsModalOpen(false);

  };

  const handleCreateAndAddPlaylist = async (e) => {
    e.preventDefault();
    if (!newPlaylistName.trim()) return;
    await handleCreatePlaylist({ name: newPlaylistName.trim() })
    setNewPlaylistName("");
    setIsCreating(false);
    setIsModalOpen(false);
  };

  return (
    <>
      <aside className="w-72 bg-[#0a0f24] border border-purple-900/40 rounded-2xl p-3 flex flex-col gap-3 h-full text-slate-300">

        {/* 1st Top Div: Current Play */}
        <div className="flex flex-col">
          <h2 className="text-sm font-bold text-white tracking-wide">Current Play</h2>
          <div className="bg-[#0f1636] border border-purple-950/60 rounded-xl p-4 flex flex-col items-center gap-1">

            {/* Dynamic Image Wrapper */}
            <div className="w-full aspect-[5/5] rounded-xl overflow-hidden bg-purple-950/20 relative group shadow-lg flex items-center justify-center border border-purple-900/20">
              {currentSong?.coverImageUrl ? (
                <img
                  src={currentSong.coverImageUrl}
                  alt={currentSong?.songTitle || "Cover"}
                  className="object-cover w-full h-full opacity-90"
                />
              ) : (
                <div className="flex flex-col items-center gap-2 text-purple-500/60 animate-pulse">
                  <Music className="w-10 h-10 stroke-[1.5]" />
                  <span className="text-[10px] tracking-wider uppercase font-semibold">Queue Empty</span>
                </div>
              )}
            </div>

            {/* Metadata Area */}
            <div className="flex items-center justify-between w-full mt-2">
              <div className="text-left min-w-0 flex-1">
                <h3 className="text-xs font-bold text-white truncate">
                  {currentSong?.songTitle || currentSong?.title || "No Track Selected"}
                </h3>
                <p className="text-[10px] text-slate-400 truncate mt-0.5">
                  {currentSong?.artist?.stageName || (typeof currentSong?.artist === 'string' ? currentSong.artist : 'Unknown Artist')}
                </p>
              </div>

              {currentSong && (
                <div className="flex items-center gap-2 ml-2">
                  {/* Add to Playlist Button */}
                  <button
                    onClick={handleOpenPlaylistModal}
                    className="p-1 text-slate-400 hover:text-purple-400 hover:scale-110 active:scale-90 transition-transform duration-150"
                    aria-label="Add to playlist"
                  >
                    <FolderPlus className="w-4.5 h-4.5" />
                  </button>

                  {/* Like Button */}
                  <button
                    onClick={handleToggleLike}
                    className="p-1 hover:scale-110 active:scale-90 transition-transform duration-150"
                    aria-label={isLiked ? "Unlike song" : "Like song"}
                  >
                    <Heart
                      className={`w-4.5 h-4.5  ${isLiked
                        ? 'fill-purple-500 text-purple-500 drop-shadow-[0_0_10px_rgba(168,85,247,0.6)] transition-all duration-300 ease-in-out'
                        : 'text-slate-400 hover:text-purple-400 transition-all duration-300 ease-in-out'
                        }`}
                    />
                  </button>
                </div>
              )}
            </div>

            {/* Progress bar + duration */}
            <div className="w-full flex flex-col gap-1 mt-2">
              <input
                type="range"
                min="0"
                max={duration || 0}
                value={currentTime}
                onChange={handleSeek}
                disabled={!currentSong}
                className="w-full h-1 accent-purple-500 cursor-pointer disabled:cursor-not-allowed"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Controls Panel */}
            <div className="flex items-center gap-5 mt-1 text-slate-300">
              <button
                onClick={() => dispatch(playPrevious())}
                disabled={!currentSong}
                className="hover:text-purple-400 transition-colors disabled:opacity-30 disabled:hover:text-slate-300"
              >
                <SkipBack className="w-5 h-5" />
              </button>
              <button
                onClick={togglePlaySong}
                disabled={!currentSong}
                className="bg-purple-500 text-white p-2.5 rounded-full shadow-lg shadow-purple-500/20 hover:scale-105 active:scale-95 transition-all disabled:opacity-40"
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4 fill-white" />
                ) : (
                  <Play className="w-4 h-4 fill-white ml-0.5" />
                )}
              </button>
              <button
                onClick={() => dispatch(playNext())}
                disabled={!currentSong}
                className="hover:text-purple-400 transition-colors disabled:opacity-30 disabled:hover:text-slate-300"
              >
                <SkipForward className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* responsible for the play song */}
        <audio
          ref={audioRef}
          src={currentSong?.audioUrl}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={() => dispatch(playNext())}
        />

        {/* 2nd Bottom Div: Device/Face expression mockup wrapper */}
        <div className="flex flex-col gap-2 justify-end">
          <div className="bg-[#0f1636] border border-purple-950/60 rounded-2xl p-4 flex flex-col items-center justify-between min-h-[210px] relative overflow-hidden group">
            <div className="absolute inset-2 border border-purple-900/20 rounded-xl pointer-events-none" />
            <div className="flex flex-col items-center gap-2 mt-4 text-center z-10">
              <div className="p-2.5 bg-purple-950/40 border border-purple-500/20 rounded-full mb-1 text-purple-400 group-hover:animate-pulse">
                <Smartphone className="w-5 h-5" />
              </div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">Detect Face</h3>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider -mt-1.5">Expression</h3>
            </div>
            <button className="w-full py-2.5 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold tracking-widest uppercase rounded-xl transition-all duration-200 z-10 shadow-md shadow-purple-600/10 hover:shadow-purple-500/20 active:scale-[0.98]">
              Detect
            </button>
          </div>
        </div>

      </aside>

      {/* --- Add To Playlist Modal Overlay --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="w-80 bg-[#0f1636] border border-purple-900/60 rounded-2xl p-5 shadow-2xl flex flex-col gap-4 text-slate-300">

            {/* Modal Header */}
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white">Add to Playlist</h3>
              <button
                onClick={() => { setIsModalOpen(false); setIsCreating(false); }}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            {!isCreating ? (
              <>
                {/* Playlist Selection View */}
                <div className="flex flex-col gap-2 max-h-48 overflow-y-auto pr-1">
                  {playlist.length > 0 ? (
                    playlist.map((playlist) => (
                      <button
                        key={playlist._id}
                        onClick={() => handleAddToPlaylist(playlist._id)}
                        className="w-full text-left p-2.5 rounded-lg bg-purple-950/20 hover:bg-purple-900/40 border border-purple-900/10 hover:border-purple-500/30 text-xs font-semibold text-slate-200 transition-all truncate"
                      >
                        {playlist.name}
                      </button>
                    ))
                  ) : (
                    <p className="text-center text-[11px] text-slate-500 my-4">No playlists found.</p>
                  )}
                </div>

                {/* Option to create a new playlist */}
                <button
                  onClick={() => setIsCreating(true)}
                  className="mt-2 flex items-center justify-center gap-1.5 py-2.5 border border-dashed border-purple-500/40 rounded-xl text-xs text-purple-400 font-semibold hover:border-purple-400 hover:text-purple-300 transition-all"
                >
                  <Plus className="w-3.5 h-3.5" /> Create New Playlist
                </button>
              </>
            ) : (
              /* Create Playlist View */
              <form onSubmit={handleCreateAndAddPlaylist} className="flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] uppercase font-bold text-purple-400 tracking-wider">Playlist Name</label>
                  <input
                    type="text"
                    required
                    autoFocus
                    value={newPlaylistName}
                    onChange={(e) => setNewPlaylistName(e.target.value)}
                    placeholder="My chill vibes..."
                    className="w-full bg-purple-950/30 border border-purple-900/60 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div className="flex gap-2 mt-1">
                  <button
                    type="button"
                    onClick={() => setIsCreating(false)}
                    className="flex-1 py-2 rounded-xl bg-purple-950/40 text-slate-400 hover:text-slate-200 text-xs font-bold transition-all border border-purple-900/40"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all shadow-md shadow-purple-600/15"
                  >
                    Create & Add
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}
    </>
  );
}