import React, { useState, useMemo } from 'react';
import { Sparkles, SlidersHorizontal, Flame, Play, Clock } from 'lucide-react';
import { Series, UserSeriesProgress, WatchStatus } from '../lib/types';
import { HeroFeatured } from '../components/HeroFeatured';
import { SeriesCard } from '../components/SeriesCard';

interface DiscoverPageProps {
  seriesList: Series[];
  progressMap: Record<string, UserSeriesProgress>;
  searchQuery: string;
  onSelectSeries: (series: Series) => void;
  onOpenTrailer: (series: Series) => void;
  onUpdateStatus: (seriesId: string, status: WatchStatus) => void;
  onToggleFavorite: (seriesId: string) => void;
  onToggleWatchlist: (seriesId: string) => void;
}

const GENRES = [
  'All',
  'Sci-Fi',
  'Cyberpunk',
  'Psychological Thriller',
  'Animation',
  'Drama',
  'Mystery',
  'Post-Apocalyptic',
  'Action'
];

const NETWORKS = [
  'All Networks',
  'Apple TV+',
  'HBO Max',
  'Netflix',
  'FX',
  'Prime Video'
];

export const DiscoverPage: React.FC<DiscoverPageProps> = ({
  seriesList,
  progressMap,
  searchQuery,
  onSelectSeries,
  onOpenTrailer,
  onUpdateStatus,
  onToggleFavorite,
  onToggleWatchlist
}) => {
  const [selectedGenre, setSelectedGenre] = useState<string>('All');
  const [selectedNetwork, setSelectedNetwork] = useState<string>('All Networks');
  const [sortBy, setSortBy] = useState<'zScore' | 'imdb' | 'year' | 'title'>('zScore');

  // Featured spotlight series
  const featuredCandidates = useMemo(() => {
    return seriesList.filter(s => s.featured).slice(0, 3);
  }, [seriesList]);

  const [currentFeatured, setCurrentFeatured] = useState<Series>(
    featuredCandidates[0] || seriesList[0]
  );

  // Filtered & Sorted Series
  const filteredSeries = useMemo(() => {
    return seriesList.filter((s) => {
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = s.title.toLowerCase().includes(q);
        const matchesSynopsis = s.synopsis.toLowerCase().includes(q);
        const matchesGenre = s.genres.some(g => g.toLowerCase().includes(q));
        const matchesCast = s.cast.some(c => c.name.toLowerCase().includes(q) || c.character.toLowerCase().includes(q));
        if (!matchesTitle && !matchesSynopsis && !matchesGenre && !matchesCast) return false;
      }

      // Genre filter
      if (selectedGenre !== 'All') {
        if (!s.genres.some(g => g.toLowerCase().includes(selectedGenre.toLowerCase()))) {
          return false;
        }
      }

      // Network filter
      if (selectedNetwork !== 'All Networks') {
        if (!s.network.toLowerCase().includes(selectedNetwork.toLowerCase())) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'zScore') return b.zScore - a.zScore;
      if (sortBy === 'imdb') return b.imdbScore - a.imdbScore;
      if (sortBy === 'year') return b.releaseYear - a.releaseYear;
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      return 0;
    });
  }, [seriesList, searchQuery, selectedGenre, selectedNetwork, sortBy]);

  // "Continue Watching" items (if any are currently in 'watching' status)
  const continueWatchingList = useMemo(() => {
    return seriesList.filter(s => {
      const prog = progressMap[s.id];
      return prog && prog.status === 'watching' && (prog.watchedEpisodeIds?.length || 0) > 0;
    });
  }, [seriesList, progressMap]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-10">
      
      {/* Hero Featured Billboard */}
      {!searchQuery && currentFeatured && (
        <HeroFeatured
          series={currentFeatured}
          onSelectSeries={onSelectSeries}
          onOpenTrailer={onOpenTrailer}
          watchStatus={progressMap[currentFeatured.id]?.status}
          onToggleWatchlist={onToggleWatchlist}
          featuredList={featuredCandidates}
          onSwitchFeatured={(s) => setCurrentFeatured(s)}
        />
      )}

      {/* Continue Watching Section */}
      {!searchQuery && continueWatchingList.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-rose-500" />
            <h2 className="font-heading font-bold text-xl text-zinc-100">
              Continue Watching
            </h2>
            <span className="text-xs text-zinc-400">
              Pick up right where you left off
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {continueWatchingList.map((series) => (
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
        </section>
      )}

      {/* Main Browse Section */}
      <section className="space-y-6">
        
        {/* Filter Controls Row */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800">
          
          {/* Genre Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
            {GENRES.map((genre) => (
              <button
                key={genre}
                onClick={() => setSelectedGenre(genre)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  selectedGenre === genre
                    ? 'bg-rose-600 text-white font-semibold shadow-md shadow-rose-950/40'
                    : 'bg-zinc-800/80 text-zinc-300 hover:bg-zinc-750 hover:text-white'
                }`}
              >
                {genre}
              </button>
            ))}
          </div>

          {/* Network and Sort Dropdowns */}
          <div className="flex items-center gap-3 w-full lg:w-auto justify-end">
            {/* Network selector */}
            <select
              value={selectedNetwork}
              onChange={(e) => setSelectedNetwork(e.target.value)}
              className="px-3 py-1.5 bg-zinc-950 border border-zinc-800 rounded-lg text-xs text-zinc-200 focus:outline-none focus:border-rose-500/70 cursor-pointer"
            >
              {NETWORKS.map(net => (
                <option key={net} value={net}>{net}</option>
              ))}
            </select>

            {/* Sort selector */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-1.5 bg-zinc-950 border border-zinc-800 rounded-lg text-xs text-zinc-200 focus:outline-none focus:border-rose-500/70 cursor-pointer"
            >
              <option value="zScore">Sort: Z-Score (Highest)</option>
              <option value="imdb">Sort: IMDb Rating</option>
              <option value="year">Sort: Release Year</option>
              <option value="title">Sort: Title (A-Z)</option>
            </select>
          </div>

        </div>

        {/* Section title & count */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-rose-500" />
            <h2 className="font-heading font-bold text-xl text-zinc-100">
              {searchQuery ? `Search Results for "${searchQuery}"` : 'All Series Catalog'}
            </h2>
            <span className="text-xs text-zinc-400 font-medium">
              ({filteredSeries.length} titles)
            </span>
          </div>
        </div>

        {/* Series Cards Grid */}
        {filteredSeries.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
            {filteredSeries.map((series) => (
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
          <div className="text-center py-16 bg-zinc-900/30 rounded-2xl border border-zinc-800/80 p-8 space-y-3">
            <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center mx-auto text-zinc-500">
              <SlidersHorizontal className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-lg text-zinc-200">No series found</h3>
            <p className="text-xs text-zinc-400 max-w-sm mx-auto">
              We couldn't find any TV series matching your selected filters or search terms. Try resetting filters.
            </p>
            <button
              onClick={() => {
                setSelectedGenre('All');
                setSelectedNetwork('All Networks');
              }}
              className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-zinc-200 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}

      </section>

    </div>
  );
};
