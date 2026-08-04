import React from 'react';

export default function ArtistLoader() {
  return (
    <main className="flex-1 bg-[#0a0f24] border border-purple-900/40 rounded-2xl p-6 overflow-y-auto h-full text-slate-300 flex flex-col gap-6 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex items-center gap-2.5">
        {/* Icon placeholder */}
        <div className="w-5 h-5 bg-purple-950/60 rounded-md" />
        <div className="flex flex-col gap-1.5">
          {/* Title placeholder */}
          <div className="h-4 w-24 bg-purple-950/60 rounded-md" />
          {/* Subtitle placeholder */}
          <div className="h-3 w-44 bg-purple-950/40 rounded-md" />
        </div>
      </div>

      {/* Grid Skeleton */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="bg-[#0f1636] border border-purple-950/60 rounded-xl p-4 flex flex-col items-center gap-3 text-center"
          >
            <div className="flex flex-col items-center w-full">
              {/* Profile Image Skeleton */}
              <div className="w-20 h-20 rounded-full bg-purple-950/50 border border-purple-900/20" />
              
              {/* Stage Name Skeleton */}
              <div className="h-3.5 w-24 bg-purple-950/60 rounded-md mt-3 mb-1.5" />
              
              {/* Followers Count Skeleton */}
              <div className="h-2.5 w-16 bg-purple-950/40 rounded-md mb-3" />
              
              {/* Follow Button Skeleton */}
              <div className="w-24 h-7 bg-purple-950/60 rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}