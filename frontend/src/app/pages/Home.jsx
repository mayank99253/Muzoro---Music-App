import React from 'react';
import { Outlet } from 'react-router-dom';
import LeftSidebar from '../components/Home/LeftSidebar';
import RightSidebar from '../components/Home/RightSidebar';

export default function Homepage() {
  return (
    <div className="w-screen h-screen bg-[#040612] p-4 flex gap-4 overflow-hidden antialiased font-sans select-none">
      {/* 1. Left Sidebar layout */}
      <LeftSidebar />
      
      {/* 2. Middle Content Panel dynamically swaps via Outlet */}
      <Outlet />
      
      {/* 3. Right Sidebar layout */}
      <RightSidebar />
    </div>
  );
}