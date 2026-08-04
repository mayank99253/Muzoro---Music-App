import React, { useEffect, useState } from 'react';
import { Users, UserPlus, UserCheck, ArrowLeft, Music, Play, Pause } from 'lucide-react';
import { useFollow } from '../hook/useFollow.js';
import { useDispatch, useSelector } from 'react-redux';
import { playSong, setIsPlaying } from '../../song/song.slice.js';
import ArtistLoader from '../../../components/loader/ArtistLoader.jsx';

export default function ArtistContent() {
  const { handleGetAllArtist, handleFollowArtist, handleUnfollowArtist, handleGetArtistSong } = useFollow();
  const { allArtists, isFollow, artistSong ,loading } = useSelector((state) => state.follow);
  const { currentSong, isPlaying } = useSelector((state) => state.song);
  const dispatch = useDispatch();

  // Track the currently selected artist for viewing songs
  const [selectedArtist, setSelectedArtist] = useState(null);

  useEffect(() => {
    handleGetAllArtist();
  }, [handleGetAllArtist]);

  // Handle clicking on an artist box
  const handleArtistClick = (artist) => {
    setSelectedArtist(artist);
    handleGetArtistSong({ artistId: artist._id });
  };

  // Handle clicking back to the artist grid
  const handleBackToArtists = () => {
    setSelectedArtist(null);
  };

  // Add your custom play logic here
  const handlePlaySong = (song) => {
    dispatch(playSong({ song: song, list: artistSong }));
  };

  if(loading) return <ArtistLoader/>

  return (
    <main className="flex-1 bg-[#0a0f24] border border-purple-900/40 rounded-2xl p-6 overflow-y-auto h-full text-slate-300 flex flex-col gap-6">

      {/* Conditionally render Artist Songs View OR Main Grid View */}
      {selectedArtist ? (
        // ARTIST SONGS VIEW
        <div className="flex flex-col gap-4">
          {/* Back Button and Artist Summary Header */}
          <div className="flex items-center gap-4">
            <button
              onClick={handleBackToArtists}
              className="flex items-center gap-2 bg-[#0f1636] border border-purple-950 px-3 py-1.5 rounded-lg text-xs font-semibold text-white hover:border-purple-500/40 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Artists
            </button>
          </div>

          <div className="flex items-center gap-4 mt-2 bg-[#0f1636] p-4 rounded-xl border border-purple-950/60">
            <img
              src={selectedArtist.bannerImageUrl}
              alt={selectedArtist.stageName}
              className="w-16 h-16 rounded-full object-cover border border-purple-900/40"
            />
            <div>
              <h2 className="text-lg font-bold text-white">{selectedArtist.stageName}</h2>
              <p className="text-xs text-slate-500">{selectedArtist.followersCount} followers</p>
            </div>
          </div>

          {/* Songs List */}
          <div className="flex flex-col gap-2 mt-2">
            <h3 className="text-sm font-semibold text-white px-1">Songs</h3>
            {artistSong && artistSong.length > 0 ? (
              artistSong.map((song) => {
                // Moved inside the loop so 'song' is properly defined for each row
                const isThisSongPlaying = isPlaying && (currentSong?._id === song._id);

                return (
                  <div
                    key={song._id}
                    className="flex items-center justify-between bg-[#0f1636] border border-purple-950/60 rounded-xl px-4 py-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-950/50 text-purple-400 rounded-lg">
                        <Music className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">{song.songTitle}</p>
                        <p className="text-xs text-slate-400">{selectedArtist.stageName}</p>
                      </div>
                    </div>

                    {/* Play Button */}
                    <button
                      onClick={() => {
                        if (currentSong?._id === song._id) {
                          dispatch(setIsPlaying(!isPlaying));
                        } else {
                          handlePlaySong(song);
                        }
                      }}
                      className="bg-purple-900/40 text-purple-400 p-2 rounded-full hover:bg-purple-500 hover:text-white transition-all shrink-0"
                      title="Play Song"
                    >
                      {isThisSongPlaying ? (
                        <Pause className="w-3.5 h-3.5 fill-current" />
                      ) : (
                        <Play className="w-3.5 h-3.5 fill-current" />
                      )}
                    </button>
                  </div>
                );
              })
            ) : (
              <p className="text-xs text-slate-500 p-4 text-center">No songs available for this artist.</p>
            )}
          </div>
        </div>
      ) : (
        // MAIN ARTISTS GRID VIEW
        <>
          {/* Header */}
          <div className="flex items-center gap-2.5">
            <Users className="w-5 h-5 text-purple-400" />
            <div>
              <h1 className="text-base font-bold text-white tracking-wide">Artists</h1>
              <p className="text-xs text-slate-500 mt-0.5">Artists you follow and might like</p>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {allArtists.map((artist) => (
              <div
                key={artist._id}
                onClick={() => handleArtistClick(artist)}
                className="bg-[#0f1636] border border-purple-950/60 hover:border-purple-500/40 rounded-xl p-4 flex flex-col items-center gap-3 text-center transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
              >
                <div>
                  <div className="w-20 h-20 rounded-full overflow-hidden bg-slate-900 border border-purple-900/40 mx-auto">
                    <img src={artist.bannerImageUrl} alt={artist.stageName} className="object-cover w-full h-full" />
                  </div>
                  <div className="min-w-0 mt-3">
                    <h3 className="text-sm font-semibold text-white truncate">{artist.stageName}</h3>
                    <p className="text-[11px] text-slate-500 mt-0.5 mb-3">{artist.followersCount} followers</p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      artist.isFollowing
                        ? handleUnfollowArtist({ artistId: artist._id })
                        : handleFollowArtist({ artistId: artist._id });
                    }}
                    className={`w-24 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-medium transition-all ${artist.isFollowing ? 'bg-purple-900/30 border border-purple-500/30 text-purple-300 hover:bg-purple-950/40'
                      : 'bg-purple-500 text-white hover:bg-purple-400'
                      }`}
                      >
                    {artist.isFollowing ? (
                      <>
                        <UserCheck className="w-3.5 h-3.5" />
                        Following
                      </>
                    ) : (
                      <>
                        <UserPlus className="w-3.5 h-3.5" />
                        Follow
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </main>
  );
}