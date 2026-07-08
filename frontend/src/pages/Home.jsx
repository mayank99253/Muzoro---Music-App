import { 
  Home, Search, Library, ListMusic, Heart, History, 
  Settings, LogOut, Bell, Smile, Frown, Meh, 
  Play, SkipBack, SkipForward, Shuffle, Repeat, 
  Volume2, Maximize2, MoreHorizontal, User
} from 'lucide-react';
import Profile from '../feature/auth/pages/Profile';

export default function Homepage() {
  return (
    <div className="min-h-screen bg-[#060816] text-zinc-400 font-sans flex p-6 gap-6 select-none overflow-x-hidden">
      
      {/* 1. LEFT SIDEBAR */}
     <Profile />

      {/* 2. MAIN CONTENT AREA */}
      <main className="flex-1 bg-zinc-900/20 border border-zinc-900/60 rounded-3xl p-6 flex flex-col justify-between overflow-y-auto">
        <div>
          {/* Header */}
          <header className="flex justify-between items-center mb-8">
            <div className="flex gap-2">
              <button className="p-2 bg-zinc-900 rounded-full text-zinc-500 cursor-not-allowed">&lt;</button>
              <button className="p-2 bg-zinc-900 rounded-full text-zinc-300">&gt;</button>
            </div>
            <div className="flex-1 max-w-md mx-6 relative">
              <Search className="absolute left-4 top-3 text-zinc-500" size={18} />
              <input 
                type="text" 
                placeholder="What do you want to listen to?" 
                className="w-full bg-zinc-900/60 border border-zinc-800/80 rounded-full pl-11 pr-4 py-2.5 text-sm text-zinc-200 focus:outline-none focus:border-purple-500/50 transition placeholder-zinc-500"
              />
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2.5 bg-zinc-900/60 rounded-full text-zinc-300 hover:text-white transition">
                <Bell size={18} />
              </button>
              <div className="w-9 h-9 rounded-full bg-purple-900 border border-purple-500/30 flex items-center justify-center text-white text-sm font-medium overflow-hidden">
                <User size={18} />
              </div>
            </div>
          </header>

          {/* Hero Banner (AI Scanner UI) */}
          <section className="relative bg-gradient-to-r from-zinc-900/40 via-zinc-900/20 to-transparent border border-zinc-800/30 rounded-3xl p-8 mb-8 flex justify-between items-center overflow-hidden">
            <div className="relative z-10">
              <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-2">
                Good evening, Arjun <span className="animate-pulse">👋</span>
              </h1>
              <p className="text-zinc-400 max-w-sm text-sm leading-relaxed">
                Let Muzoro read your vibe and play the perfect music for you.
              </p>
            </div>

            {/* AI Face Matrix Mesh Overlay Animation Visualizer */}
            <div className="absolute right-12 top-1/2 -translate-y-1/2 flex items-center gap-6">
              <div className="flex flex-col gap-4 text-zinc-600">
                <Smile className="text-emerald-500/40" size={20} />
                <Meh size={20} />
                <Frown size={20} />
              </div>
              <div className="relative w-32 h-32 border-2 border-purple-500/30 border-dashed rounded-full flex items-center justify-center animate-[spin_20s_linear_infinite]">
                <div className="absolute inset-2 border border-indigo-500/40 rounded-full flex items-center justify-center">
                  <User className="text-purple-400/60" size={48} />
                </div>
              </div>
            </div>
          </section>

          {/* For Your Mood Grid */}
          <section className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-white font-semibold text-lg">For your mood</h3>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {/* Card 1 */}
              <div className="group bg-gradient-to-b from-amber-500/10 to-zinc-900/40 border border-amber-500/30 rounded-2xl p-4 relative cursor-pointer hover:border-amber-500/50 transition">
                <div className="aspect-square bg-gradient-to-tr from-amber-600 to-yellow-400 rounded-xl mb-4 overflow-hidden relative">
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition" />
                </div>
                <h4 className="text-white font-medium text-sm mb-1">Happy Vibes</h4>
                <p className="text-xs text-zinc-500">Upbeat and positive</p>
                <button className="absolute bottom-14 right-6 p-3 bg-amber-500 text-black rounded-full shadow-lg shadow-amber-500/20 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-200">
                  <Play fill="black" size={16} />
                </button>
              </div>
              {/* Card 2 */}
              <div className="group bg-zinc-900/40 border border-zinc-800/60 rounded-2xl p-4 relative cursor-pointer hover:border-zinc-700/60 transition">
                <div className="aspect-square bg-gradient-to-tr from-indigo-900 to-purple-600 rounded-xl mb-4 overflow-hidden" />
                <h4 className="text-white font-medium text-sm mb-1">Chill Vibes</h4>
                <p className="text-xs text-zinc-500">Relax and unwind</p>
                <button className="absolute bottom-14 right-6 p-3 bg-purple-500 text-white rounded-full opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-200">
                  <Play fill="white" size={16} />
                </button>
              </div>
              {/* Card 3 */}
              <div className="group bg-zinc-900/40 border border-zinc-800/60 rounded-2xl p-4 relative cursor-pointer hover:border-zinc-700/60 transition">
                <div className="aspect-square bg-gradient-to-tr from-blue-900 to-cyan-700 rounded-xl mb-4 overflow-hidden" />
                <h4 className="text-white font-medium text-sm mb-1">Focus Mode</h4>
                <p className="text-xs text-zinc-500">Deep focus music</p>
                <button className="absolute bottom-14 right-6 p-3 bg-cyan-500 text-black rounded-full opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-200">
                  <Play fill="black" size={16} />
                </button>
              </div>
              {/* Card 4 */}
              <div className="group bg-zinc-900/40 border border-zinc-800/60 rounded-2xl p-4 relative cursor-pointer hover:border-zinc-700/60 transition">
                <div className="aspect-square bg-gradient-to-tr from-zinc-800 to-slate-900 rounded-xl mb-4 overflow-hidden" />
                <h4 className="text-white font-medium text-sm mb-1">Melancholy</h4>
                <p className="text-xs text-zinc-500">For your rainy days</p>
                <button className="absolute bottom-14 right-6 p-3 bg-zinc-400 text-black rounded-full opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-200">
                  <Play fill="black" size={16} />
                </button>
              </div>
            </div>
          </section>

          {/* Recently Played List */}
          <section>
            <h3 className="text-white font-semibold text-lg mb-4">Recently played</h3>
            <div className="space-y-1">
              {[
                { title: "Blinding Lights", artist: "The Weeknd", duration: "3:20", active: true },
                { title: "As It Was", artist: "Harry Styles", duration: "2:47", active: false },
                { title: "Kesariya", artist: "Arijit Singh", duration: "4:17", active: false },
                { title: "Tum Hi Ho", artist: "Arijit Singh", duration: "4:22", active: false },
              ].map((song, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-xl hover:bg-zinc-900/40 transition group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-zinc-800 rounded-lg shrink-0 overflow-hidden" />
                    <div>
                      <h5 className={`text-sm font-medium ${song.active ? 'text-emerald-400' : 'text-white'}`}>{song.title}</h5>
                      <p className="text-xs text-zinc-500 mt-0.5">{song.artist}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 text-sm text-zinc-500">
                    <Heart size={16} className={song.active ? "text-emerald-400 fill-emerald-400" : "opacity-0 group-hover:opacity-100 hover:text-white transition"} />
                    <span>{song.duration}</span>
                    <button className="hover:text-white transition"><MoreHorizontal size={16} /></button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Bottom Global Player Controls */}
        <footer className="mt-8 pt-4 border-t border-zinc-900 flex items-center justify-between">
          <div className="flex items-center gap-3 w-1/4">
            <div className="w-11 h-11 bg-rose-950 rounded-lg shrink-0" />
            <div>
              <h5 className="text-sm font-medium text-white">Sunflower</h5>
              <p className="text-xs text-zinc-500 mt-0.5">Post Malone, Swae Lee</p>
            </div>
            <Heart size={16} className="text-emerald-400 fill-emerald-400 ml-3 shrink-0" />
          </div>

          <div className="flex flex-col items-center gap-2 w-2/4 max-w-xl">
            <div className="flex items-center gap-6 text-zinc-400">
              <button className="hover:text-white transition"><Shuffle size={16} /></button>
              <button className="hover:text-white transition"><SkipBack size={18} /></button>
              <button className="p-2.5 bg-white text-black rounded-full hover:scale-105 transition">
                <Play fill="black" size={16} />
              </button>
              <button className="hover:text-white transition"><SkipForward size={18} /></button>
              <button className="hover:text-white transition"><Repeat size={16} /></button>
            </div>
            <div className="w-full flex items-center gap-3 text-xs text-zinc-500">
              <span>1:32</span>
              <div className="flex-1 h-1 bg-zinc-800 rounded-full relative group cursor-pointer">
                <div className="absolute top-0 left-0 h-full w-1/3 bg-purple-500 rounded-full group-hover:bg-purple-400" />
                <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-2.5 h-2.5 bg-white rounded-full opacity-0 group-hover:opacity-100 transition" />
              </div>
              <span>3:05</span>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 w-1/4 text-zinc-400">
            <Volume2 size={18} />
            <div className="w-20 h-1 bg-zinc-800 rounded-full relative">
              <div className="absolute top-0 left-0 h-full w-3/4 bg-purple-500 rounded-full" />
            </div>
            <Maximize2 size={16} className="ml-2" />
          </div>
        </footer>
      </main>

      {/* 3. RIGHT SIDEBAR - NOW PLAYING PIP PANEL */}
      <aside className="w-80 flex flex-col gap-6 shrink-0">
        <div className="bg-zinc-900/20 border border-zinc-900/60 rounded-3xl p-4 flex flex-col flex-1 justify-between">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-white font-semibold text-sm">Now Playing</h4>
              <button className="text-zinc-500 hover:text-white"><MoreHorizontal size={16} /></button>
            </div>
            <div className="aspect-square bg-gradient-to-b from-indigo-950 to-purple-900 rounded-2xl mb-4 relative overflow-hidden flex items-center justify-center">
              <div className="absolute bottom-4 left-4 text-left">
                <div className="text-[10px] uppercase tracking-wider text-purple-300 font-bold bg-purple-950/60 px-2 py-0.5 rounded-md inline-block mb-1">Live Vibe</div>
              </div>
            </div>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-white font-bold text-base">Until I Found You</h3>
                <p className="text-xs text-zinc-500 mt-1">Stephen Sanchez</p>
              </div>
              <Heart size={18} className="text-emerald-400 fill-emerald-400" />
            </div>
            <div className="w-full flex items-center gap-2 text-[11px] text-zinc-500 mb-6">
              <span>1:32</span>
              <div className="flex-1 h-1 bg-zinc-800 rounded-full">
                <div className="h-full w-1/2 bg-purple-500 rounded-full" />
              </div>
              <span>3:05</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-6 text-zinc-300">
            <button className="hover:text-white transition"><SkipBack size={20} /></button>
            <button className="p-4 bg-white text-black rounded-full hover:scale-105 transition shadow-lg">
              <Play fill="black" size={20} />
            </button>
            <button className="hover:text-white transition"><SkipForward size={20} /></button>
          </div>
        </div>

        {/* 4. MOBILE APP PREVIEW COMPONENT CONTAINER */}
        <div className="h-72 border border-zinc-800/80 bg-black rounded-[32px] p-3 relative overflow-hidden shadow-2xl flex flex-col justify-between">
          <div className="flex justify-between items-center px-2 pt-1 text-[11px] text-white font-semibold">
            <span>9:41</span>
            <div className="flex gap-1 text-[10px]">
              <span>📶</span><span>🔋</span>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center text-center px-4 flex-1">
            <div className="text-xs font-black bg-gradient-to-r from-purple-500 to-indigo-400 bg-clip-text text-transparent mb-4">Muzoro</div>
            <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400 mb-3 shadow-inner">
              <Smile size={32} />
            </div>
            <h4 className="text-white text-sm font-semibold">Happy</h4>
            <p className="text-[10px] text-zinc-500 mt-1 leading-snug">Muzoro is detecting your expression and playing the best music for you.</p>
          </div>

          {/* Mini Mobile Nav */}
          <div className="grid grid-cols-4 border-t border-zinc-900 pt-2 text-center text-[10px] text-zinc-500">
            <div className="text-purple-400 font-medium">Home</div>
            <div>Search</div>
            <div>Library</div>
            <div>Profile</div>
          </div>
        </div>
      </aside>

    </div>
  );
}