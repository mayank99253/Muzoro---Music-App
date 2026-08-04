import React, { useState, useRef } from 'react';
import { useSelector } from "react-redux"
import { CloudUpload, Image, Music, X, Tag, Clock, Type, ArrowLeft } from 'lucide-react';
import { Link , useNavigate} from 'react-router-dom';
import { useProfile } from '../hook/useProfile.js';
import toast from 'react-hot-toast';

export default function UploadSong() {
  const { handleUploadSong } = useProfile()
  const { loading } = useSelector((state) => state.profile)

  const navigate = useNavigate()

  const [songTitle, setSongTitle] = useState('');
  const [duration, setDuration] = useState('');
  const [category, setCategory] = useState('');

  // File state & preview references
  const [coverImage, setCoverImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [audioFile, setAudioFile] = useState(null);

  const imageInputRef = useRef(null);
  const audioInputRef = useRef(null);

  const categories = [
    'Hip-Hop',
    'Pop',
    'Rock',
    'R&B',
    'Lo-Fi',
    'Electronic',
    'Jazz',
    'Classical',
    'Indie',
    'Love',
    'Sad',
    'Happy',
    'phonk'
  ];
  // Handle Cover Image selection & preview URL creation
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Remove Cover Image handler
  const handleRemoveImage = () => {
    setCoverImage(null);
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
      setImagePreview(null);
    }
    if (imageInputRef.current) {
      imageInputRef.current.value = '';
    }
  };

  // Handle Audio File selection
  const handleAudioChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAudioFile(file);
    }
  };

  // Remove Audio File handler
  const handleRemoveAudio = () => {
    setAudioFile(null);
    if (audioInputRef.current) {
      audioInputRef.current.value = '';
    }
  };

  const handleSubmitUploadSong = async (e) => {
    e.preventDefault();

    if (!coverImage || !audioFile || !songTitle.trim() || !duration.trim() || !category) {
      toast.error("Please fill in all required fields and select both files.");
      return;
    }
    const formData = new FormData();
    formData.append('image', coverImage);
    formData.append('audio', audioFile);
    formData.append('title', songTitle);
    formData.append('category', category);
    formData.append('duration', duration);

    await handleUploadSong(formData);

    setSongTitle('');
    setDuration('');
    setCategory('');
    handleRemoveImage();
    handleRemoveAudio();
    navigate('/profile');

  };



  return (
    <main className="flex-1 bg-[#0a0f24] border border-purple-900/40 p-4 sm:p-8 overflow-y-auto h-dvh text-slate-300 custom-scrollbar">

      {/* CONSTRAINED MAX-WIDTH CONTAINER */}
      <div className="max-w-3xl mx-auto flex flex-col gap-6">

        {/* HEADER SECTION */}
        <div className="bg-[#0f1636] border border-purple-900/30 rounded-2xl p-5 sm:p-6 shadow-inner flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-4">
            <Link
              to="/profile"
              className="p-2.5 bg-[#070b1e] border border-purple-900/60 hover:bg-purple-900/20 text-slate-300 rounded-xl transition-all"
              title="Back to Profile"
            >
              <ArrowLeft className="w-5 h-5 text-purple-400" />
            </Link>
            <div>
              <h1 className="text-xl font-bold text-white tracking-wide">Upload New Track</h1>
              <p className="text-xs text-slate-400 mt-0.5">Share your music with your listeners</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-[#070b1e] border border-purple-900/60 px-3.5 py-1.5 rounded-xl text-xs text-purple-300 font-mono">
            <CloudUpload className="w-4 h-4 text-purple-400" /> Studio Portal
          </div>
        </div>

        {/* FORM CONTAINER */}
        <div className="bg-[#0f1636] border border-purple-500/30 rounded-2xl p-5 sm:p-6 shadow-lg flex flex-col gap-6">

          <form onSubmit={handleSubmitUploadSong}>
            {/* ROW 1: FILE UPLOADS (IMAGE PREVIEW & AUDIO FILE) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

              {/* COVER IMAGE FIELD */}
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase font-bold text-purple-400 tracking-wider flex items-center gap-1.5">
                  <Image className="w-3.5 h-3.5" /> Cover Image
                </label>

                <input
                  type="file"
                  accept="image/*"
                  ref={imageInputRef}
                  onChange={handleImageChange}
                  className="hidden"
                />

                {!imagePreview ? (
                  <div
                    onClick={() => imageInputRef.current.click()}
                    className="border-2 border-dashed border-purple-900/60 hover:border-purple-500/50 bg-[#070b1e] rounded-xl p-5 flex flex-col items-center justify-center cursor-pointer transition-all h-40 group text-center"
                  >
                    <div className="p-2.5 bg-purple-950/40 rounded-full border border-purple-900/50 group-hover:scale-110 transition-transform mb-2">
                      <Image className="w-5 h-5 text-purple-400" />
                    </div>
                    <p className="text-xs font-semibold text-slate-300">Click to upload cover</p>
                    <p className="text-[10px] text-slate-500 mt-0.5">PNG, JPG or WEBP</p>
                  </div>
                ) : (
                  <div className="relative w-full h-40 rounded-xl overflow-hidden border border-purple-500/40 bg-[#070b1e] group">
                    <img
                      src={imagePreview}
                      alt="Cover Preview"
                      className="w-full h-full object-cover"
                    />
                    {/* Hover Overlay with Close Button */}
                    <div className="absolute inset-0 bg-black/40 opacity-100 transition-opacity flex items-center justify-center">
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="p-2 bg-red-600/80 hover:bg-red-600 text-white rounded-full transition-all shadow-lg"
                        title="Remove Image"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute top-2 right-2 p-1 bg-black/60 hover:bg-red-600 text-white rounded-full transition-all md:hidden"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>

              {/* AUDIO FILE FIELD */}
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase font-bold text-purple-400 tracking-wider flex items-center gap-1.5">
                  <Music className="w-3.5 h-3.5" /> Audio File
                </label>

                <input
                  type="file"
                  accept="audio/*"
                  ref={audioInputRef}
                  onChange={handleAudioChange}
                  className="hidden"
                />

                {!audioFile ? (
                  <div
                    onClick={() => audioInputRef.current.click()}
                    className="border-2 border-dashed border-purple-900/60 hover:border-purple-500/50 bg-[#070b1e] rounded-xl p-5 flex flex-col items-center justify-center cursor-pointer transition-all h-40 group text-center"
                  >
                    <div className="p-2.5 bg-purple-950/40 rounded-full border border-purple-900/50 group-hover:scale-110 transition-transform mb-2">
                      <Music className="w-5 h-5 text-purple-400" />
                    </div>
                    <p className="text-xs font-semibold text-slate-300">Click to upload track</p>
                    <p className="text-[10px] text-slate-500 mt-0.5">MP3, WAV, or AAC</p>
                  </div>
                ) : (
                  <div className="h-40 rounded-xl border border-purple-500/40 bg-[#070b1e] p-3.5 flex flex-col justify-between">
                    <div className="flex items-center justify-between bg-[#0f1636] p-2.5 rounded-lg border border-purple-950/60">
                      <div className="flex items-center gap-2.5 overflow-hidden">
                        <div className="p-2 bg-purple-950/60 text-purple-400 rounded-lg shrink-0">
                          <Music className="w-4 h-4" />
                        </div>
                        <div className="truncate">
                          <p className="text-xs font-semibold text-white truncate">{audioFile.name}</p>
                          <p className="text-[10px] text-slate-400">{(audioFile.size / (1024 * 1024)).toFixed(2)} MB</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={handleRemoveAudio}
                        className="p-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors ml-2 shrink-0"
                        title="Remove Audio"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => audioInputRef.current.click()}
                      className="w-full py-1.5 bg-[#0f1636] hover:bg-purple-950/40 border border-purple-900/60 rounded-xl text-xs font-semibold text-purple-300 transition-colors"
                    >
                      Change Audio File
                    </button>
                  </div>
                )}
              </div>

            </div>

            {/* ROW 2: TEXT INPUTS */}
            <div className="flex flex-col gap-4 border-t border-purple-900/30 pt-4">

              {/* SONG TITLE */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1">
                  <Type className="w-3 h-3 text-purple-400" /> Song Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. Midnight City Vibes"
                  value={songTitle}
                  onChange={(e) => setSongTitle(e.target.value)}
                  className="w-full bg-[#070b1e] border border-purple-950/60 focus:border-purple-500/50 rounded-xl py-2.5 px-4 text-xs text-white outline-none transition-all"
                />
              </div>

              {/* DURATION & CATEGORY (GRID) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                {/* DURATION */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1">
                    <Clock className="w-3 h-3 text-purple-400" /> Duration (MM:SS)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 03:45"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full bg-[#070b1e] border border-purple-950/60 focus:border-purple-500/50 rounded-xl py-2.5 px-4 text-xs text-white outline-none transition-all"
                  />
                </div>

                {/* CATEGORY */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1">
                    <Tag className="w-3 h-3 text-purple-400" /> Genre / Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-[#070b1e] border border-purple-950/60 focus:border-purple-500/50 rounded-xl py-2.5 px-4 text-xs text-white outline-none transition-all cursor-pointer"
                  >
                    <option value="" disabled className="bg-[#070b1e] text-slate-500">
                      Select category
                    </option>
                    {categories.map((cat, idx) => (
                      <option key={idx} value={cat.toLowerCase()} className="bg-[#070b1e] text-white">
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

              </div>

            </div>

            {/* ACTION BUTTON */}
            <div className="flex justify-end pt-2 border-t border-purple-900/30">
              <button
                disabled={loading}
              type="submit"
              className="w-full sm:w-auto px-6 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs tracking-wider rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                <CloudUpload className="w-4 h-4" />
              {loading ?  "Upload Song" : "Uploading Song..."}
            </button>
        </div>
      </form>

    </div>

      </div >

    </main >
  );
}