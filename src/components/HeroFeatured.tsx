import React from 'react';
import { Play, Plus, Check, Star, Info, ShieldAlert, Sparkles, Tv } from 'lucide-react';
import { Series, WatchStatus } from '../lib/types';

interface HeroFeaturedProps {
  series: Series;
  onSelectSeries: (series: Series) => void;
  onOpenTrailer: (series: Series) => void;
  watchStatus?: WatchStatus;
  onToggleWatchlist: (seriesId: string) => void;
  featuredList: Series[];
  onSwitchFeatured: (series: Series) => void;
}

export const HeroFeatured: React.FC<HeroFeaturedProps> = ({
  series,
  onSelectSeries,
  onOpenTrailer,
  watchStatus,
  onToggleWatchlist,
  featuredList,
  onSwitchFeatured
}) => {
  const isInWatchlist = watchStatus === 'watching' || watchStatus === 'plan_to_watch';

  return (
    <div className="relative w-full h-[520px] sm:h-[600px] lg:h-[650px] overflow-hidden rounded-2xl sm:rounded-3xl border border-zinc-800/80 shadow-2xl mb-10 bg-zinc-950">
      
      {/* Background Backdrop Image */}
      <div className="absolute inset-0">
        <img
          src={series.backdropUrl}
          alt={series.title}
          className="w-full h-full object-cover object-top scale-105 filter brightness-90 contrast-110 transition-transform duration-1000 ease-out"
        />
        {/* Cinematic Vignette & Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#08090c] via-[#08090c]/70 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#08090c] via-[#08090c]/85 to-transparent sm:w-3/4"></div>
      </div>

      {/* Hero Content */}
      <div className="relative h-full max-w-7xl mx-auto px-6 sm:px-10 flex flex-col justify-end pb-12 sm:pb-16 z-10">
        
        {/* Badges row */}
        <div className="flex flex-wrap items-center gap-2.5 mb-3 sm:mb-4">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-300 font-bold text-xs">
            <Sparkles className="w-3.5 h-3.5 text-rose-400" />
            <span>Z-SERIES FEATURED</span>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-500/15 border border-amber-500/30 text-amber-300 font-bold text-xs">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{series.zScore} Z-Score</span>
          </div>

          <span className="px-2 py-0.5 rounded bg-zinc-800/80 text-zinc-300 text-xs font-semibold border border-zinc-700/60">
            {series.ageRating}
          </span>

          <span className="px-2 py-0.5 rounded bg-zinc-800/80 text-zinc-300 text-xs font-semibold border border-zinc-700/60">
            {series.totalSeasons} {series.totalSeasons > 1 ? 'Seasons' : 'Season'}
          </span>

          <span className="hidden sm:inline-block px-2 py-0.5 rounded bg-red-900/30 text-red-300 text-xs font-semibold border border-red-800/40">
            {series.network}
          </span>
        </div>

        {/* Series Title */}
        <h1 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-none mb-3 drop-shadow-md">
          {series.title}
        </h1>

        {/* Genres */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          {series.genres.map((g) => (
            <span key={g} className="text-xs text-zinc-400 hover:text-zinc-200 transition-colors">
              • {g}
            </span>
          ))}
          <span className="text-xs text-zinc-500 hidden sm:inline">
            | Created by {series.creator}
          </span>
        </div>

        {/* Synopsis */}
        <p className="max-w-2xl text-xs sm:text-sm lg:text-base text-zinc-300 line-clamp-3 mb-6 sm:mb-8 leading-relaxed drop-shadow">
          {series.synopsis}
        </p>

        {/* Actions Button Group */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          <button
            onClick={() => onOpenTrailer(series)}
            className="flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-semibold text-sm shadow-xl shadow-rose-950/50 hover:scale-105 active:scale-95 transition-all"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Play Trailer</span>
          </button>

          <button
            onClick={() => onSelectSeries(series)}
            className="flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl bg-zinc-800/90 hover:bg-zinc-750 border border-zinc-700 text-white font-medium text-sm hover:border-zinc-500 transition-all"
          >
            <Info className="w-4 h-4 text-zinc-300" />
            <span>Episodes &amp; Details</span>
          </button>

          <button
            onClick={() => onToggleWatchlist(series.id)}
            className={`flex items-center gap-2 px-4 py-2.5 sm:py-3 rounded-xl font-medium text-sm transition-all border ${
              isInWatchlist
                ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300'
                : 'bg-zinc-900/80 border-zinc-700/80 text-zinc-300 hover:bg-zinc-800'
            }`}
          >
            {isInWatchlist ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span>In Library</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                <span>Add to Watchlist</span>
              </>
            )}
          </button>
        </div>

      </div>

      {/* Featured Switcher Dots (Bottom Right) */}
      <div className="absolute bottom-6 right-6 z-20 hidden sm:flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
        <span className="text-[11px] text-zinc-400 font-medium mr-1">Spotlight:</span>
        {featuredList.map((f, i) => (
          <button
            key={f.id}
            onClick={() => onSwitchFeatured(f)}
            className={`text-xs px-2.5 py-0.5 rounded-full font-semibold transition-all ${
              f.id === series.id
                ? 'bg-rose-600 text-white shadow'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
            }`}
          >
            {f.title}
          </button>
        ))}
      </div>

    </div>
  );
};
