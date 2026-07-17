import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Search, History, Users, Music, User, Heart } from 'lucide-react';

export default function LeftSidebar() {
  const menuItems = [
    { to: '/', icon: Home, label: 'Home', end: true }, // 'end' ensures home isn't highlighted on sub-routes
    { to: '/search', icon: Search, label: 'Search' },
    { to: '/history', icon: History, label: 'History' },
    { to: '/artists', icon: Users, label: 'Artists' },
    { to: '/liked-song', icon:Heart, label: 'Liked Song' },
  ];

  return (
    <main className="w-64 bg-[#0a0f24] border border-purple-900/40 rounded-2xl p-6 flex flex-col gap-6 h-full text-slate-300">
      {/* Logo Container */}
      <div className="flex items-center gap-2 text-xl font-bold text-white tracking-wider px-2">
        <span className="text-purple-400 font-mono">MUZORO</span>
        <Music className="w-5 h-5 text-purple-400" />
      </div>

      {/* Navigation list via React Router NavLinks */}
      <nav className="flex flex-col gap-2 flex-grow">
        {menuItems.map((item, index) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={index}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-4 px-4 py-3 rounded-xl text-left transition-all duration-200 group ${isActive
                  ? 'bg-purple-900/30 text-purple-400 border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.15)]'
                  : 'hover:bg-[#121838] hover:text-white border border-transparent'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon className={`w-5 h-5 transition-transform group-hover:scale-105 ${isActive ? 'text-purple-400' : 'text-slate-400 group-hover:text-purple-400'}`} />
                  <span className="font-medium text-sm">{item.label}</span>
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      <NavLink to="/profile"
        className={({ isActive }) =>
          `flex items-center gap-4 px-4 py-3 rounded-xl text-left transition-all duration-200 group ${isActive
            ? 'bg-purple-900/30 text-purple-400 border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.15)]'
            : 'hover:bg-[#121838] hover:text-white border border-transparent'
          }`}>
        <User /> Profile
      </NavLink>

      {/* <button className="w-full py-3 rounded-xl border border-purple-500/40 text-purple-300 font-medium text-sm hover:bg-purple-500/10 transition-all duration-200 mt-auto text-center">
        Become An Artist
      </button> */}
    </main>
  );
}