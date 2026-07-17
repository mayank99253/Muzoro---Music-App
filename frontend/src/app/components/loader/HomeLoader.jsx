import React from 'react';

export default function HomeLoader() {
  // Array to generate 5 placeholder cards for the grids
  const placeholderCards = Array.from({ length: 5 });

  return (
    <main className="flex-1 bg-[#0a0f24] border border-purple-900/40 rounded-2xl p-6 overflow-y-auto h-full flex flex-col gap-6 animate-pulse">

      {/* Welcome Banner Skeleton */}
      <div className="bg-[#0f1636] border border-purple-900/30 rounded-2xl p-5 flex justify-between items-center shadow-inner">
        <div className="flex flex-col gap-2">
          {/* Welcome Text line */}
          <div className="h-6 w-48 bg-purple-950/60 rounded-md"></div>
          {/* Subtitle text line */}
          <div className="h-4 w-64 bg-purple-950/40 rounded-md"></div>
        </div>
        <div className="flex flex-col items-end gap-1.5">
          <div className="h-3 w-10 bg-purple-950/40 rounded-sm"></div>
          <div className="h-5 w-16 bg-purple-950/50 rounded-md"></div>
        </div>
      </div>

      {/* Latest Songs Grid Skeleton */}
      <div>
        <div className="h-5 w-28 bg-purple-950/60 rounded-md mb-4"></div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {placeholderCards.map((_, idx) => (
            <div
              key={`latest-${idx}`}
              className="bg-[#0f1636] border border-purple-950/60 rounded-xl p-3 flex flex-col gap-2.5 shadow-md"
            >
              {/* Image box skeleton */}
              <div className="relative aspect-square w-full rounded-lg bg-purple-950/50"></div>
              {/* Title & Artist lines */}
              <div className="flex flex-col gap-1.5">
                <div className="h-3.5 w-3/4 bg-purple-950/60 rounded"></div>
                <div className="h-2.5 w-1/2 bg-purple-950/40 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Popular Songs Grid Skeleton */}
      <div>
        <div className="h-5 w-32 bg-purple-950/60 rounded-md mb-4"></div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {placeholderCards.map((_, idx) => (
            <div
              key={`popular-${idx}`}
              className="bg-[#0f1636] border border-purple-950/60 rounded-xl p-3 flex flex-col gap-2.5 shadow-md"
            >
              {/* Image box skeleton */}
              <div className="relative aspect-square w-full rounded-lg bg-purple-950/50"></div>
              {/* Title & Artist lines */}
              <div className="flex flex-col gap-1.5">
                <div className="h-3.5 w-3/4 bg-purple-950/60 rounded"></div>
                <div className="h-2.5 w-1/2 bg-purple-950/40 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </main>
  );
}