import React from 'react';

export default function LikedSongLoader() {
  // Mock array counts to match layout spacing
  const skeletonSongs = Array(3).fill(null);
  const skeletonPlaylists = Array(2).fill(null);

  return (
    <main className="flex-1 bg-[#0a0f24] rounded-2xl p-4 sm:p-6 overflow-y-auto h-full text-slate-300 flex flex-col gap-5 animate-pulse">
      
      {/* Page Title Header Skeleton */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2.5">
            {/* Heart Icon placeholder */}
            <div className="w-5 h-5 bg-purple-950/80 rounded-full" />
            {/* Title text placeholder */}
            <div className="h-5 w-28 bg-purple-950/80 rounded-md" />
          </div>
          {/* Plus button placeholder */}
          <div className="w-8 h-8 rounded-full bg-purple-950/80" />
        </div>
      </div>

      {/* Section 1: Liked Songs Section Skeleton */}
      <div className="bg-[#0f1636] border border-purple-900/40 rounded-2xl p-4 flex flex-col gap-4">
        {/* Fake Section Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-4 h-4 bg-purple-950/80 rounded" />
            <div className="h-4 w-24 bg-purple-950/80 rounded-md" />
            <div className="w-6 h-4 bg-purple-950/80 rounded-full" />
          </div>
          <div className="w-4 h-4 bg-purple-950/80 rounded" />
        </div>

        {/* Fake Song Rows */}
        <div className="flex flex-col gap-2">
          {skeletonSongs.map((_, index) => (
            <div 
              key={`liked-song-${index}`} 
              className="flex items-center justify-between bg-[#0a0f24] border border-purple-950/50 rounded-xl px-4 py-2.5"
            >
              <div className="flex items-center gap-3 w-2/3">
                {/* Play button circle */}
                <div className="w-7 h-7 bg-purple-950/80 rounded-full shrink-0" />
                {/* Song info text lines */}
                <div className="flex flex-col gap-1.5 w-full">
                  <div className="h-3.5 w-1/2 bg-purple-950/80 rounded" />
                  <div className="h-2.5 w-1/3 bg-purple-950/80 rounded" />
                </div>
              </div>
              {/* Unlike heart element */}
              <div className="w-4 h-4 bg-purple-950/80 rounded shrink-0" />
            </div>
          ))}
        </div>
      </div>

      {/* Section 2: User-Created Playlists Section Skeleton */}
      <div className="bg-[#0f1636] border border-purple-900/40 rounded-2xl p-4 flex flex-col gap-4">
        {/* Fake Section Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-4 h-4 bg-purple-950/80 rounded" />
            <div className="h-4 w-28 bg-purple-950/80 rounded-md" />
            <div className="w-6 h-4 bg-purple-950/80 rounded-full" />
          </div>
          <div className="w-4 h-4 bg-purple-950/80 rounded" />
        </div>

        {/* Fake Playlist Outer Cards */}
        <div className="flex flex-col gap-2">
          {skeletonPlaylists.map((_, index) => (
            <div 
              key={`playlist-${index}`} 
              className="bg-[#0a0f24] border border-purple-950/50 rounded-xl px-4 py-3 flex items-center justify-between"
            >
              <div className="flex items-center gap-3 w-1/2">
                {/* Playlist Icon box */}
                <div className="p-4 bg-purple-950/80 rounded-lg shrink-0" />
                {/* Playlist description lines */}
                <div className="flex flex-col gap-1.5 w-full">
                  <div className="h-3.5 w-2/3 bg-purple-950/80 rounded" />
                  <div className="h-2.5 w-1/3 bg-purple-950/80 rounded" />
                </div>
              </div>
              {/* Chevron element */}
              <div className="w-4 h-4 bg-purple-950/80 rounded shrink-0" />
            </div>
          ))}
        </div>
      </div>

    </main>
  );
}