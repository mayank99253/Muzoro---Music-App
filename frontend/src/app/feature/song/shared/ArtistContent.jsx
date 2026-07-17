import React from 'react';
import { Users, UserPlus, UserCheck } from 'lucide-react';

const dummyArtists = [
  { id: 1, name: 'Neon Pulse', followers: '128K', following: false, avatar: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&auto=format&fit=crop&q=60' },
  { id: 2, name: 'Aria West', followers: '86K', following: true, avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&auto=format&fit=crop&q=60' },
  { id: 3, name: 'Ravi Kohli', followers: '54K', following: false, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=60' },
  { id: 4, name: 'The Lowkeys', followers: '212K', following: true, avatar: 'https://images.unsplash.com/photo-1520785643438-5bf77931f493?w=200&auto=format&fit=crop&q=60' },
  { id: 5, name: 'Mira Sen', followers: '31K', following: false, avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&auto=format&fit=crop&q=60' },
  { id: 6, name: 'Echo Bloom', followers: '9K', following: false, avatar: 'https://images.unsplash.com/photo-1516575150278-77136aed6920?w=200&auto=format&fit=crop&q=60' },
];

export default function ArtistContent() {
  return (
    <main className="flex-1 bg-[#0a0f24] border border-purple-900/40 rounded-2xl p-6 overflow-y-auto h-full text-slate-300 flex flex-col gap-6">

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
        {dummyArtists.map((artist) => (
          <div
            key={artist.id}
            className="bg-[#0f1636] border border-purple-950/60 hover:border-purple-500/40 rounded-xl p-4 flex flex-col items-center gap-3 text-center transition-all duration-300 hover:-translate-y-0.5"
          >
            <div className="w-20 h-20 rounded-full overflow-hidden bg-slate-900 border border-purple-900/40">
              <img src={artist.avatar} alt={artist.name} className="object-cover w-full h-full" />
            </div>
            <div className="min-w-0">
              <h3 className="text-sm font-semibold text-white truncate">{artist.name}</h3>
              <p className="text-[11px] text-slate-500 mt-0.5">{artist.followers} followers</p>
            </div>
            <button
              className={`w-full flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                artist.following
                  ? 'bg-purple-900/30 border border-purple-500/30 text-purple-300 hover:bg-purple-950/40'
                  : 'bg-purple-500 text-white hover:bg-purple-400'
              }`}
            >
              {artist.following ? (
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
        ))}
      </div>
    </main>
  );
}