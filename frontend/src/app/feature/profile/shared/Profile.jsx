import React, { useState, useRef } from 'react';
import {Link} from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import { User, Mail, Heart, Mic, Music, CloudUpload, Radio, Edit2, Lock, EyeOff, CheckCircle, Pause, Play, LogOut } from 'lucide-react';
import { useProfile } from '../hook/useProfile.js';
import { useEffect } from 'react';
import { playSong, setIsPlaying } from '../../song/song.slice.js';
import { useAuth } from '../../auth/hook/useAuth.js';

export default function Profile() {
  const { user } = useSelector((state) => state.auth);
  const {handleLogout} = useAuth()
  const { followedArtists, createdPlaylists, likedSongs, artist, artistSongs } = useSelector((state) => state.profile);
  const { handleGetMyFollowArtists, handleGetMyPlaylists, handleGetMyLikedSongs, handleGetArtist, handleGetArtistSongs } = useProfile()
  const { currentSong, isPlaying } = useSelector((state) => state.song);
  const dispatch = useDispatch();

  useEffect(() => {
    handleGetMyFollowArtists()
    handleGetMyPlaylists()
    handleGetMyLikedSongs()
    handleGetArtist()
    handleGetArtistSongs()
  }, [handleGetMyFollowArtists, handleGetMyPlaylists, handleGetMyLikedSongs, handleGetArtist, handleGetArtistSongs])

  const handlePlaySong = (song) => {
      dispatch(playSong({ song: song, list: artistSongs }));
    };

  // Core App states for UI demonstration
  const [isArtist, setIsArtist] = useState(false); // Controls regular user vs verified artist dashboard views
  const [showArtistForm, setShowArtistForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // Controls Edit Details toggle button view

  // User details state (initialized with Redux data or fallback defaults)
  const [profileData, setProfileData] = useState({
    userName: user?.userName || 'Muzoro User',
    email: user?.email || '',
    stageName: artist?.stageName,
    bio: artist?.bio,
    profilePic: artist?.bannerImageUrl|| null, // Holds objectURLs for previewing local device uploads
  });

  // Password Validation States
  const [passwords, setPasswords] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [passwordError, setPasswordError] = useState('');

  // Hidden file input references
  const artistPicInputRef = useRef(null);
  const editPicInputRef = useRef(null);

  // File upload logic for local device images
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileData((prev) => ({ ...prev, profilePic: imageUrl }));
    }
  };

  // Profile Save handler
  const handleSaveProfile = (e) => {
    e.preventDefault();

    // Validate passwords only if user fills out any password field
    if (passwords.oldPassword || passwords.newPassword || passwords.confirmPassword) {
      if (passwords.newPassword !== passwords.confirmPassword) {
        setPasswordError('New passwords do not match!');
        return;
      }
      if (passwords.newPassword.length < 6) {
        setPasswordError('Password must be at least 6 characters.');
        return;
      }
    }

    setPasswordError('');
    setIsEditing(false);
    // Reset password fields upon successful change match
    setPasswords({ oldPassword: '', newPassword: '', confirmPassword: '' });
    alert('Profile updated successfully!');
  };

  // Artist Registration mock submit handler
  const handleBecomeArtistSubmit = (e) => {
    e.preventDefault();
    setIsArtist(true);
    setShowArtistForm(false);
  };

  return (
    <main className="flex-1 bg-[#0a0f24] border border-purple-900/40 rounded-2xl p-6 overflow-y-auto h-full text-slate-300 custom-scrollbar flex flex-col gap-6">

      {/* =========================================================
          SECTION 1: HERO DASHBOARD HEADER (DYNAMICS BASED ON ROLE)
         ========================================================= */}
      <div className="bg-[#0f1636] border border-purple-900/30 rounded-2xl p-6 shadow-inner flex flex-col md:flex-row justify-between items-start md:items-center gap-6">

        <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 w-full md:w-auto">
          {/* Dynamic Profile Pic (Local upload preview or default icon) */}
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-600 to-indigo-900 flex items-center justify-center border border-purple-400/40 shadow-lg overflow-hidden shrink-0">
            {profileData.profilePic ? (
              <img src={profileData.profilePic} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <User className="w-10 h-10 text-white" />
            )}
          </div>

          <div className="space-y-1 min-w-0">
            {/* Condition A: If Artist, show username, stageName, profilePic, bio, hide become artist */}
            {artist?.isVerified ? (
              <>
                <div className="flex items-center gap-2 justify-center sm:justify-start">
                  <h1 className="text-xl font-bold text-white truncate">{profileData.userName.toUpperCase()}</h1>
                  <span className="text-[10px] bg-purple-500/20 border border-purple-500/50 text-purple-300 px-2 py-0.5 rounded-full font-mono flex items-center gap-1">
                    <CheckCircle className="w-3 h-3 text-purple-400 fill-purple-400/10" /> Verified Artist
                  </span>
                </div>
                <p className="text-sm font-semibold text-purple-400 font-sans">Stage Name: {profileData.stageName}</p>
                <p className="text-xs text-slate-400 max-w-md italic mt-1 font-light">"{profileData.bio}"</p>
              </>
            ) : (
              /* Condition B: If Normal User, show standard profile with become artist handles */
              <>
                <h1 className="text-xl font-bold text-white truncate">{profileData.userName.toUpperCase()}</h1>
                <p className="text-xs text-slate-400 flex items-center gap-1.5 justify-center sm:justify-start">
                  <Mail className="w-3.5 h-3.5 text-slate-500" /> {profileData.email}
                </p>
              </>
            )}
            <button className='mt-2' onClick={handleLogout} ><LogOut size={18} /></button>
          </div>
        </div>

        {/* Global Control Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          {/* Edit Details Toggle Switch Button */}
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider border transition-all flex items-center justify-center gap-2 ${isEditing
              ? 'bg-purple-950/40 border-purple-500 text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.1)]'
              : 'bg-[#070b1e] border-purple-900/60 hover:bg-purple-900/20 text-slate-300'
              }`}
          >
            <Edit2 className="w-3.5 h-3.5" />
            {isEditing ? 'Cancel Edit' : 'Edit Details'}
          </button>

          {/* Render Become Artist button ONLY if the user is a normal user */}
          {!artist?.isVerified && (
            <button
              onClick={() => setShowArtistForm(!showArtistForm)}
              className="px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs tracking-wider uppercase rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Mic className="w-3.5 h-3.5" />
              {showArtistForm ? 'Close Setup' : 'Become An Artist'}
            </button>
          )}

          {/* Artist exclusive action controls */}
          {artist?.isVerified && (
            <Link to={"/upload-song"} className="px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs tracking-wider uppercase rounded-xl shadow-md transition-all flex items-center justify-center gap-2">
              <CloudUpload className="w-3.5 h-3.5" />
              Upload Song
            </Link>

          )}
        </div>
      </div>

      {/* =========================================================
          SECTION 2: DYNAMIC EDIT DETAILS PANEL (WITH PASSWORD MATCH)
         ========================================================= */}
      {isEditing && (
        <div className="bg-[#0f1636] border border-purple-500/30 rounded-2xl p-5 shadow-lg">
          <h2 className="text-sm font-bold text-white tracking-wider uppercase mb-4 flex items-center gap-2">
            <Edit2 className="w-4 h-4 text-purple-400" /> Account Modification Panel
          </h2>
          <form onSubmit={handleSaveProfile} className="flex flex-col gap-4">

            {/* Core Basic Settings */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-1">Username</label>
                <input
                  type="text"
                  required
                  className="w-full bg-[#070b1e] border border-purple-950/60 focus:border-purple-500/50 rounded-xl py-2.5 px-4 text-xs text-white outline-none transition-all"
                  value={profileData.userName}
                  onChange={(e) => setProfileData({ ...profileData, userName: e.target.value })}
                />
              </div>
              <div>
                <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-1">Gmail Account</label>
                <input
                  type="email"
                  required
                  className="w-full bg-[#070b1e] border border-purple-950/60 focus:border-purple-500/50 rounded-xl py-2.5 px-4 text-xs text-white outline-none transition-all"
                  value={profileData.email}
                  onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                />
              </div>
            </div>

            {/* Conditional Fields: If user is an artist, grant access to modify bio, stagename & image file */}
            {isArtist && (
              <div className="border-t border-purple-900/30 pt-4 mt-2 flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
                  <div>
                    <label className="text-[10px] uppercase font-bold text-purple-400 tracking-wider block mb-1">Stage Name</label>
                    <input
                      type="text"
                      className="w-full bg-[#070b1e] border border-purple-950/60 focus:border-purple-500/50 rounded-xl py-2.5 px-4 text-xs text-white outline-none transition-all"
                      value={profileData.stageName}
                      onChange={(e) => setProfileData({ ...profileData, stageName: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase font-bold text-purple-400 tracking-wider block mb-1.5">Profile Picture</label>
                    <input
                      type="file"
                      accept="image/*"
                      ref={editPicInputRef}
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                    <button
                      type="button"
                      onClick={() => editPicInputRef.current.click()}
                      className="w-full py-2.5 bg-[#070b1e] border border-purple-900/60 hover:bg-purple-950/40 rounded-xl text-xs font-semibold text-purple-300 transition-colors"
                    >
                      Choose Image from Device
                    </button>
                  </div>
                </div>
                <div>
                  <label className="text-[10px] uppercase font-bold text-purple-400 tracking-wider block mb-1">Artist Bio</label>
                  <textarea
                    rows="2"
                    className="w-full bg-[#070b1e] border border-purple-950/60 focus:border-purple-500/50 rounded-xl py-2.5 px-4 text-xs text-white outline-none transition-all resize-none"
                    value={profileData.bio}
                    onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                  />
                </div>
              </div>
            )}

            {/* Password Validation Blocks */}
            <div className="border-t border-purple-900/30 pt-4 mt-2">
              <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-3 flex items-center gap-1">
                <Lock className="w-3 h-3 text-purple-400" /> Change Security Password (Optional)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <input
                  type="password"
                  placeholder="Old Password"
                  className="w-full bg-[#070b1e] border border-purple-950/60 focus:border-purple-500/50 rounded-xl py-2.5 px-4 text-xs text-white outline-none transition-all"
                  value={passwords.oldPassword}
                  onChange={(e) => setPasswords({ ...passwords, oldPassword: e.target.value })}
                />
                <input
                  type="password"
                  placeholder="New Password"
                  className="w-full bg-[#070b1e] border border-purple-950/60 focus:border-purple-500/50 rounded-xl py-2.5 px-4 text-xs text-white outline-none transition-all"
                  value={passwords.newPassword}
                  onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                />
                <input
                  type="password"
                  placeholder="Confirm New Password"
                  className="w-full bg-[#070b1e] border border-purple-950/60 focus:border-purple-500/50 rounded-xl py-2.5 px-4 text-xs text-white outline-none transition-all"
                  value={passwords.confirmPassword}
                  onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
                />
              </div>

              {/* Active client error popup box */}
              {passwordError && (
                <p className="text-[11px] text-red-400 mt-2 flex items-center gap-1 font-medium">
                  <EyeOff className="w-3.5 h-3.5" /> {passwordError}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="self-end px-6 py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all"
            >
              Save Details
            </button>
          </form>
        </div>
      )}

      {/* =========================================================
          SECTION 3: BECOME AN ARTIST REGISTRATION FORM
         ========================================================= */}
      {showArtistForm && !isArtist && (
        <div className="bg-[#0f1636] border border-purple-500/30 rounded-2xl p-5 shadow-lg">
          <h2 className="text-sm font-bold text-white tracking-wider uppercase mb-4 flex items-center gap-2">
            <Radio className="w-4 h-4 text-purple-400" /> Artist Application Portal
          </h2>
          <form onSubmit={handleBecomeArtistSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
              <div>
                <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-1.5">Stage Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. DJ Muzoro"
                  className="w-full bg-[#070b1e] border border-purple-950/60 focus:border-purple-500/50 rounded-xl py-2.5 px-4 text-xs text-white outline-none transition-all"
                  value={profileData.stageName}
                  onChange={(e) => setProfileData({ ...profileData, stageName: e.target.value })}
                />
              </div>
              <div>
                <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-1.5">Artist Display Cover</label>
                <input
                  type="file"
                  accept="image/*"
                  ref={artistPicInputRef}
                  className="hidden"
                  onChange={handleImageUpload}
                />
                <button
                  type="button"
                  onClick={() => artistPicInputRef.current.click()}
                  className="w-full py-2.5 bg-[#070b1e] border border-purple-900/60 hover:bg-purple-950/40 rounded-xl text-xs font-semibold text-purple-300 transition-colors"
                >
                  Upload Profile Pic From Device
                </button>
              </div>
            </div>
            <div>
              <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-1.5">Artist Biography</label>
              <textarea
                rows="3"
                required
                placeholder="Share your background story with the listeners..."
                className="w-full bg-[#070b1e] border border-purple-950/60 focus:border-purple-500/50 rounded-xl py-2.5 px-4 text-xs text-white outline-none transition-all resize-none"
                value={profileData.bio}
                onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
              />
            </div>
            <button
              type="submit"
              className="self-end px-6 py-2 bg-purple-500 hover:bg-purple-400 text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-all"
            >
              Submit & Verify Application
            </button>
          </form>
        </div>
      )}

      {/* Songs of the Artist */}
      <div className="flex flex-col gap-2 mt-2">
        <h3 className="text-sm font-semibold text-white px-1">Songs</h3>
        {artistSongs && artistSongs.length > 0 ? (
          artistSongs.map((song) => {
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
                    <p className="text-xs text-slate-400">{song.likesCount} like</p>
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

      {/* =========================================================
          SECTION 4: STANDARD LISTENING ANALYTICS INFO 
         ========================================================= */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-[#0f1636] border border-purple-950/60 rounded-xl p-4 flex flex-col gap-3">
          <h2 className="text-xs font-bold text-white tracking-wide uppercase">Listening Metrics</h2>
          <div className="flex flex-col gap-2">
            {[
              { label: 'Liked Songs', value: likedSongs },
              { label: 'Playlists Created', value: createdPlaylists },
              { label: 'Current Mood', value: 'Happy' },
            ].map((stat, idx) => (
              <div key={idx} className="flex justify-between items-center py-2 border-b border-purple-950/40 last:border-0">
                <span className="text-xs text-slate-400">{stat.label}</span>
                <span className="text-xs font-semibold text-purple-300">{stat.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#0f1636] border border-purple-950/60 rounded-xl p-4 flex flex-col gap-3">
          <h2 className="text-xs font-bold text-white tracking-wide uppercase flex items-center gap-1.5">
            <Heart className="w-3.5 h-3.5 text-purple-400 fill-purple-400/20" /> Favorite Artists
          </h2>
          <div className="flex flex-col gap-2">
            {followedArtists.map((artist, idx) => (
              <div key={idx} className="h-fit flex justify-between items-center bg-[#070b1e] border border-purple-950/30 rounded-lg p-2.5">
                <span className="text-xs font-medium text-white">{artist.stageName}</span>
                <span className="text-[10px] text-slate-400 bg-purple-950/50 px-2 py-0.5 rounded-full border border-purple-900/40">{artist.followersCount} follower</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* =========================================================
          SECTION 5: ALL SONGS CATALOGUE (ONLY FOR VERIFIED ARTISTS)
         ========================================================= */}
      {isArtist && (
        <div className="mt-2">
          <h2 className="text-base font-bold text-white tracking-wide mb-3 flex items-center gap-2">
            <Music className="w-4 h-4 text-purple-400" /> All Songs
          </h2>
          <div className="bg-[#0f1636] border border-dashed border-purple-900/60 rounded-xl p-8 flex flex-col items-center justify-center text-center">
            <p className="text-xs text-slate-400 italic">no song uploaded</p>
            <p className="text-[10px] text-slate-500 mt-1">Use the dashboard controls to drop your tracks.</p>
          </div>
        </div>
      )}

    </main>
  );
}