import React from 'react';
import { Clock, ListMusic } from 'lucide-react';

export default function SongsLoader() {
  // Create an array of 5 items to render 5 placeholder rows
  const placeholderRows = Array.from({ length: 5 });

  return (
    <main className="flex-1 bg-[#0a0f24] border border-purple-900/40 rounded-2xl p-6 overflow-y-auto h-full text-slate-300 flex flex-col gap-6 animate-pulse">
      
      {/* Header Skeleton */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <ListMusic className="w-5 h-5 text-purple-950/60" />
          <div className="h-5 w-24 bg-purple-950/60 rounded-md"></div>
        </div>

        {/* Search Bar Skeleton */}
        <div className="w-full max-w-xs h-10 bg-[#0f1636] border border-purple-950/40 rounded-xl"></div>
      </div>

      {/* Table Skeleton */}
      <div className="bg-[#0f1636] border border-purple-950/60 rounded-2xl overflow-y-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-purple-950/60 text-[11px] uppercase tracking-widest text-slate-500">
              <th className="py-3 px-5 w-12">#</th>
              <th className="py-3 px-5">Title</th>
              <th className="py-3 px-5">Artist</th>
              <th className="py-3 px-5">Mood</th>
              <th className="py-3 px-5 text-right">
                <Clock className="w-3.5 h-3.5 inline text-slate-600" />
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-purple-950/40">
            {placeholderRows.map((_, idx) => (
              <tr key={idx} className="border-b border-purple-950/20">
                {/* Index / Play column */}
                <td className="py-4 px-5 w-12">
                  <div className="h-4 w-4 bg-purple-950/50 rounded"></div>
                </td>
                
                {/* Title column */}
                <td className="py-4 px-5">
                  <div className="h-4 w-40 bg-purple-950/60 rounded-md"></div>
                </td>
                
                {/* Artist column */}
                <td className="py-4 px-5">
                  <div className="h-4 w-28 bg-purple-950/40 rounded-md"></div>
                </td>
                
                {/* Mood column */}
                <td className="py-4 px-5">
                  <div className="h-6 w-16 bg-purple-950/30 border border-purple-900/30 rounded-full"></div>
                </td>
                
                {/* Duration column */}
                <td className="py-4 px-5 text-right">
                  <div className="h-4 w-10 bg-purple-950/40 rounded-md inline-block"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}