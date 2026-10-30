import React from 'react';
import { Tv, Bookmark, Calendar, Database, Search, Sparkles, Film, Heart } from 'lucide-react';
import { UserProfile } from '../lib/types';

interface NavbarProps {
  activeTab: 'discover' | 'library' | 'schedule' | 'sql';
  setActiveTab: (tab: 'discover' | 'library' | 'schedule' | 'sql') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  user: UserProfile;
  watchedCount: number;
  onOpenSqlModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  user,
  watchedCount,
  onOpenSqlModal
}) => {
  return (
    <header className="sticky top-0 z-40 w-full glass-nav backdrop-blur-xl border-b border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <div 
          onClick={() => { setActiveTab('discover'); setSearchQuery(''); }}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-rose-600 via-red-600 to-amber-600 shadow-lg shadow-rose-950/40 group-hover:scale-105 transition-transform">
            <span className="font-heading font-extrabold text-2xl text-white tracking-tighter">Z</span>
            <div className="absolute -inset-0.5 rounded-xl bg-rose-500/20 blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-heading font-extrabold text-xl tracking-tight text-white group-hover:text-rose-400 transition-colors">
                Z-SERIES
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-400 border border-rose-500/30 uppercase tracking-wider">
                Pro
              </span>
            </div>
            <span className="text-[11px] text-zinc-400 font-medium tracking-wide">
              Series Stream &amp; Tracker
            </span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1.5 p-1 bg-zinc-900/80 rounded-xl border border-zinc-800/60">
          <button
            onClick={() => { setActiveTab('discover'); }}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'discover'
                ? 'bg-gradient-to-r from-rose-600 to-red-600 text-white shadow-md shadow-rose-950/30'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
            }`}
          >
            <Film className="w-4 h-4" />
            <span>Discover</span>
          </button>

          <button
            onClick={() => setActiveTab('library')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'library'
                ? 'bg-gradient-to-r from-rose-600 to-red-600 text-white shadow-md shadow-rose-950/30'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
            }`}
          >
            <Bookmark className="w-4 h-4" />
            <span>My Library</span>
            {watchedCount > 0 && (
              <span className="ml-1 text-[11px] px-1.5 py-0.2 rounded-full bg-white/20 text-white font-bold">
                {watchedCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('schedule')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'schedule'
                ? 'bg-gradient-to-r from-rose-600 to-red-600 text-white shadow-md shadow-rose-950/30'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Schedule</span>
          </button>

          <button
            onClick={onOpenSqlModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10 border border-emerald-500/20 transition-all ml-1"
            title="Inspect Supabase schema and database architecture"
          >
            <Database className="w-3.5 h-3.5" />
            <span>Supabase SQL</span>
          </button>
        </nav>

        {/* Search Bar & User Profile */}
        <div className="flex items-center gap-3">
          <div className="relative w-40 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search series, genre..."
              className="w-full pl-9 pr-3 py-1.5 text-xs sm:text-sm bg-zinc-900/90 border border-zinc-800 rounded-lg text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-rose-500/60 focus:ring-1 focus:ring-rose-500/30 transition-all"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 text-xs px-1"
              >
                ✕
              </button>
            )}
          </div>

          {/* User profile capsule */}
          <div className="flex items-center gap-2 pl-2 border-l border-zinc-800">
            <img
              src={user.avatarUrl}
              alt={user.fullName}
              className="w-8 h-8 rounded-full ring-2 ring-rose-500/30 object-cover"
            />
            <div className="hidden lg:flex flex-col text-left">
              <span className="text-xs font-semibold text-zinc-200">{user.fullName}</span>
              <span className="text-[10px] text-zinc-400 capitalize">{user.role}</span>
            </div>
          </div>
        </div>

      </div>

      {/* Mobile navigation row */}
      <div className="flex md:hidden items-center justify-around px-2 py-2 border-t border-zinc-800/60 bg-zinc-950/80 text-xs">
        <button
          onClick={() => setActiveTab('discover')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-lg ${
            activeTab === 'discover' ? 'text-rose-400 font-semibold' : 'text-zinc-400'
          }`}
        >
          <Film className="w-4 h-4" />
          <span>Discover</span>
        </button>
        <button
          onClick={() => setActiveTab('library')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-lg ${
            activeTab === 'library' ? 'text-rose-400 font-semibold' : 'text-zinc-400'
          }`}
        >
          <Bookmark className="w-4 h-4" />
          <span>Library</span>
        </button>
        <button
          onClick={() => setActiveTab('schedule')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-lg ${
            activeTab === 'schedule' ? 'text-rose-400 font-semibold' : 'text-zinc-400'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Schedule</span>
        </button>
        <button
          onClick={onOpenSqlModal}
          className="flex flex-col items-center gap-1 py-1 px-3 rounded-lg text-emerald-400 font-medium"
        >
          <Database className="w-4 h-4" />
          <span>Supabase</span>
        </button>
      </div>
    </header>
  );
};
