import React, { useState, useMemo } from 'react';
import { Bookmark, Clock, CheckCircle2, Heart, Film, ArrowRight, Play, Star } from 'lucide-react';
import { Series, UserSeriesProgress, WatchStatus } from '../lib/types';
import { SeriesCard } from '../components/SeriesCard';

interface MyLibraryPageProps {
  seriesList: Series[];
  progressMap: Record<string, UserSeriesProgress>;
  onSelectSeries: (series: Series) => void;
  onOpenTrailer: (series: Series) => void;
  onUpdateStatus: (seriesId: string, status: WatchStatus) => void;
  onToggleFavorite: (seriesId: string) => void;
  onNavigateDiscover: () => void;
}

export const MyLibraryPage: React.FC<MyLibraryPageProps> = ({
  seriesList,
  progressMap,
  onSelectSeries,
  onOpenTrailer,
  onUpdateStatus,
  onToggleFavorite,
  onNavigateDiscover
}) => {
  const [filterTab, setFilterTab] = useState<'all' | 'watching' | 'plan_to_watch' | 'completed' | 'favorites'>('all');

  // Filtered series in library
  const librarySeries = useMemo(() => {
    return seriesList.filter(s => {
      const prog = progressMap[s.id];
      if (!prog) return false;

      if (filterTab === 'favorites') return prog.isFavorite;
      if (filterTab === 'all') return true;
      return prog.status === filterTab;
    });
  }, [seriesList, progressMap, filterTab]);

  // Compute overall library stats
  const stats = useMemo(() => {
    let totalEpisodesWatched = 0;
    let totalEstimatedMinutes = 0;
    let completedCount = 0;
    let watchingCount = 0;
    let favoritesCount = 0;

    Object.values(progressMap).forEach(prog => {
      const series = seriesList.find(s => s.id === prog.seriesId);
      if (!series) return;

      if (prog.status === 'completed') completedCount++;
      if (prog.status === 'watching') watchingCount++;
      if (prog.isFavorite) favoritesCount++;

      const count = prog.watchedEpisodeIds?.length || 0;
      totalEpisodesWatched += count;
      totalEstimatedMinutes += count * 52; // average 52 min per episode
    });

    const hours = (totalEstimatedMinutes / 60).toFixed(1);

    return {
      totalEpisodesWatched,
      totalHours: hours,
      completedCount,
      watchingCount,
      favoritesCount,
      totalInLibrary: Object.keys(progressMap).length
    };
  }, [seriesList, progressMap]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Header & Stats Banner */}
      <div className="space-y-6">
        <div>
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
            My Binge Library
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Track your ongoing seasons, plan your watch queue, and log watched episodes.
          </p>
        </div>

        {/* 4 Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          
          <div className="p-4 sm:p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-1">
            <span className="text-zinc-400 text-xs font-medium">Episodes Watched</span>
            <div className="flex items-baseline gap-2">
              <span className="font-heading font-extrabold text-2xl sm:text-3xl text-rose-500">
                {stats.totalEpisodesWatched}
              </span>
              <span className="text-xs text-zinc-500">episodes</span>
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-1">
            <span className="text-zinc-400 text-xs font-medium">Total Binge Time</span>
            <div className="flex items-baseline gap-2">
              <span className="font-heading font-extrabold text-2xl sm:text-3xl text-amber-400">
                {stats.totalHours}
              </span>
              <span className="text-xs text-zinc-500">hours logged</span>
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-1">
            <span className="text-zinc-400 text-xs font-medium">Currently Watching</span>
            <div className="flex items-baseline gap-2">
              <span className="font-heading font-extrabold text-2xl sm:text-3xl text-emerald-400">
                {stats.watchingCount}
              </span>
              <span className="text-xs text-zinc-500">series</span>
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-1">
            <span className="text-zinc-400 text-xs font-medium">Completed Series</span>
            <div className="flex items-baseline gap-2">
              <span className="font-heading font-extrabold text-2xl sm:text-3xl text-sky-400">
                {stats.completedCount}
              </span>
              <span className="text-xs text-zinc-500">finishes</span>
            </div>
          </div>

        </div>
      </div>

      {/* Segmented Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-zinc-800">
        <button
          onClick={() => setFilterTab('all')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
            filterTab === 'all'
              ? 'bg-rose-600 text-white shadow-md shadow-rose-950/40'
              : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
          }`}
        >
          All Library ({stats.totalInLibrary})
        </button>

        <button
          onClick={() => setFilterTab('watching')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
            filterTab === 'watching'
              ? 'bg-rose-600 text-white shadow-md shadow-rose-950/40'
              : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
          }`}
        >
          Watching ({stats.watchingCount})
        </button>

        <button
          onClick={() => setFilterTab('plan_to_watch')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
            filterTab === 'plan_to_watch'
              ? 'bg-rose-600 text-white shadow-md shadow-rose-950/40'
              : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
          }`}
        >
          Plan to Watch
        </button>

        <button
          onClick={() => setFilterTab('completed')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
            filterTab === 'completed'
              ? 'bg-rose-600 text-white shadow-md shadow-rose-950/40'
              : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
          }`}
        >
          Completed ({stats.completedCount})
        </button>

        <button
          onClick={() => setFilterTab('favorites')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
            filterTab === 'favorites'
              ? 'bg-rose-600 text-white shadow-md shadow-rose-950/40'
              : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
          }`}
        >
          Favorites ({stats.favoritesCount})
        </button>
      </div>

      {/* Series Cards Grid */}
      {librarySeries.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {librarySeries.map((series) => (
            <SeriesCard
              key={series.id}
              series={series}
              progress={progressMap[series.id]}
              onSelectSeries={onSelectSeries}
              onOpenTrailer={onOpenTrailer}
              onUpdateStatus={onUpdateStatus}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-zinc-900/30 rounded-2xl border border-zinc-800/80 p-8 space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-zinc-800/80 flex items-center justify-center mx-auto text-zinc-500">
            <Bookmark className="w-7 h-7 text-rose-500/70" />
          </div>
          <h3 className="font-heading font-bold text-xl text-zinc-200">
            No series in this list
          </h3>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-md mx-auto">
            You don't have any television series filed under this status yet. Browse our top-rated recommendations and add your next binge!
          </p>
          <button
            onClick={onNavigateDiscover}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-rose-950/40 transition-all"
          >
            <Film className="w-4 h-4" />
            <span>Discover Top Series</span>
          </button>
        </div>
      )}

    </div>
  );
};
