import React from 'react';
import { History as HistoryIcon } from 'lucide-react';

export default function HistoryLoader() {
  // Creating a dummy array to render 4 animated skeleton row placeholders
  const skeletonRows = Array.from({ length: 4 });

  return (
    <main className="flex-1 bg-[#0a0f24] border border-purple-900/40 rounded-2xl p-6 overflow-y-auto h-full flex flex-col gap-6 animate-pulse select-none">
      
      {/* Header Skeleton */}
      <div className="flex items-center justify-between border-b border-purple-900/20 pb-4">
        <div className="flex items-center gap-2.5">
          <HistoryIcon className="w-5 h-5 text-purple-950" />
          <div className="h-4 w-32 bg-purple-950 rounded-md" />
        </div>
      </div>

      {/* Grouped Content Skeleton Section */}
      <div className="flex flex-col gap-6">
        <div>
          {/* Section Subtitle Tag (e.g. "TODAY") */}
          <div className="h-3 w-14 bg-purple-950/60 rounded mb-4 tracking-widest" />
          
          {/* Skeleton List Rows */}
          <div className="flex flex-col gap-2">
            {skeletonRows.map((_, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-[#0f1636]/40 border border-purple-950/40 rounded-xl px-5 py-3"
              >
                {/* Left side info placeholder */}
                <div className="flex items-center gap-4 min-w-0 flex-1">
                  {/* Fake Play Button circular icon */}
                  <div className="w-7 h-7 bg-purple-950/80 rounded-full shrink-0" />
                  
                  {/* Fake Title & Artist stack */}
                  <div className="flex flex-col gap-2 min-w-0 flex-1 max-w-[220px]">
                    <div className="h-3.5 bg-purple-950/80 rounded-md w-3/4" />
                    <div className="h-2.5 bg-purple-950/40 rounded-md w-1/2" />
                  </div>
                </div>

                {/* Right side timestamp placeholder */}
                <div className="h-3 w-10 bg-purple-950/40 rounded-md shrink-0" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}