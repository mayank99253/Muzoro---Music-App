import { Heart, History, Home, HomeIcon, Library, ListMusic, LogOut, Search, Settings, Smile } from 'lucide-react'
import React from 'react'

const Profile = () => {
    const name = [
        "Home" , "Search" , "Your Library" , "Playlists" , "Liked Songs" , "Recently Played"
    ]
  return (
    <main className='card1 w-48 h-full rounded-3xl bg-zinc-900/20 border border-zinc-900/60 p-6 flex flex-col gap-6'>
        <div className='logo flex items-center gap-2'>
            <img src="/muzoro.png" alt="" />
        </div>

        <div className='menu flex flex-col gap-4'>
            <a href="#" className='flex items-center gap-3 text-sm font-medium text-zinc-400 hover:text-zinc-100 transition-colors'>
                <Home /> Home
            </a>
            <a href="#" className='flex items-center gap-3 text-sm font-medium text-zinc-400 hover:text-zinc-100 transition-colors'>
                <Search /> Search
            </a>
            <a href="#" className='flex items-center gap-3 text-sm font-medium text-zinc-400 hover:text-zinc-100 transition-colors'>
                <Library /> Your Library
            </a>
            <a href="#" className='flex items-center gap-3 text-sm font-medium text-zinc-400 hover:text-zinc-100 transition-colors'>
                <ListMusic /> Playlists
            </a>
            <a href="#" className='flex items-center gap-3 text-sm font-medium text-zinc-400 hover:text-zinc-100 transition-colors'>
                <Heart /> Liked Songs
            </a>
            <a href="#" className='flex items-center gap-3 text-sm font-medium text-zinc-400 hover:text-zinc-100 transition-colors'>
                <History /> Recents Played
            </a>
        </div>

        <div className='h-0.5 w-full bg-zinc-400/20' />

        <div>
            <h6 className='font-bold '>EXPRESSION MODE</h6>
        </div>

    </main>
  )
}

export default Profile