import React, { useState } from 'react';
import { Star, Play, Bookmark, Heart, Check, MoreVertical, Eye } from 'lucide-react';
import { Series, UserSeriesProgress, WatchStatus } from '../lib/types';

interface SeriesCardProps {
  series: Series;
  progress?: UserSeriesProgress;
  onSelectSeries: (series: Series) => void;
  onOpenTrailer: (series: Series) => void;
  onUpdateStatus: (seriesId: string, status: WatchStatus) => void;
  onToggleFavorite: (seriesId: string) => void;
}

export const SeriesCard: React.FC<SeriesCardProps> = ({
  series,
  progress,
  onSelectSeries,
  onOpenTrailer,
  onUpdateStatus,
  onToggleFavorite
}) => {
  const [showMenu, setShowMenu] = useState(false);

  const watchedCount = progress?.watchedEpisodeIds?.length || 0;
  const totalCount = series.totalEpisodes || 1;
  const progressPercent = Math.min(100, Math.round((watchedCount / totalCount) * 100));

  const getStatusBadge = () => {
    if (!progress?.status) return null;
    switch (progress.status) {
      case 'watching':
        return <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">Watching</span>;
      case 'completed':
        return <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">Completed</span>;
      case 'plan_to_watch':
        return <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-sky-500/20 text-sky-300 border border-sky-500/30">Plan</span>;
      default:
        return null;
    }
  };

  return (
    <div className="group relative flex flex-col bg-zinc-900/60 rounded-xl overflow-hidden border border-zinc-800/80 hover:border-rose-500/50 hover:shadow-xl hover:shadow-rose-950/20 transition-all duration-300">
      
      {/* Poster Image Container */}
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-zinc-950 cursor-pointer" onClick={() => onSelectSeries(series)}>
        <img
          src={series.posterUrl}
          alt={series.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Dark Vignette Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 opacity-80 group-hover:opacity-90 transition-opacity"></div>

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between z-10">
          <div className="flex items-center gap-1.5">
            <span className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-amber-400 font-bold text-xs border border-white/10 shadow">
              <Star className="w-3 h-3 fill-amber-400" />
              {series.zScore}
            </span>
            {getStatusBadge()}
          </div>

          {/* Favorite button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(series.id);
            }}
            className={`p-1.5 rounded-full backdrop-blur-md transition-all ${
              progress?.isFavorite
                ? 'bg-rose-600 text-white shadow-md'
                : 'bg-black/50 text-zinc-300 hover:text-white hover:bg-black/80'
            }`}
            title="Toggle Favorite"
          >
            <Heart className={`w-3.5 h-3.5 ${progress?.isFavorite ? 'fill-white' : ''}`} />
          </button>
        </div>

        {/* Hover Action Overlay: Quick Play Trailer */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 pointer-events-none">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenTrailer(series);
            }}
            className="pointer-events-auto flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-600 text-white font-semibold text-xs shadow-lg hover:scale-110 active:scale-95 transition-transform"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            <span>Trailer</span>
          </button>
        </div>

        {/* Network & Seasons pills at bottom of poster */}
        <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-[11px] text-zinc-300 z-10">
          <span className="px-1.5 py-0.5 rounded bg-black/60 backdrop-blur-sm text-zinc-200 border border-white/10">
            {series.network}
          </span>
          <span className="font-medium text-zinc-300 drop-shadow">
            {series.totalSeasons} {series.totalSeasons > 1 ? 'Seasons' : 'Season'}
          </span>
        </div>

        {/* Episode Progress Bar if user has watched */}
        {watchedCount > 0 && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-zinc-800">
            <div
              className="h-full bg-rose-500 transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        )}
      </div>

      {/* Card Info Details */}
      <div className="p-3 sm:p-4 flex flex-col flex-1 justify-between bg-zinc-900/40">
        <div>
          <div className="flex items-start justify-between gap-1 mb-1">
            <h3 
              onClick={() => onSelectSeries(series)}
              className="font-semibold text-sm sm:text-base text-zinc-100 line-clamp-1 hover:text-rose-400 cursor-pointer transition-colors"
              title={series.title}
            >
              {series.title}
            </h3>
            <span className="text-xs text-zinc-500 font-medium shrink-0">
              {series.releaseYear}
            </span>
          </div>

          <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed mb-3">
            {series.synopsis}
          </p>
        </div>

        {/* Footer info: Genres & Quick Actions Menu */}
        <div className="pt-2 border-t border-zinc-800/60 flex items-center justify-between text-xs text-zinc-400">
          <span className="text-[11px] text-zinc-500 truncate max-w-[120px]">
            {series.genres[0]} • {series.genres[1] || 'Drama'}
          </span>

          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-1 rounded hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors"
              title="Change watch status"
            >
              <MoreVertical className="w-4 h-4" />
            </button>

            {/* Dropdown status menu */}
            {showMenu && (
              <>
                <div 
                  className="fixed inset-0 z-20"
                  onClick={() => setShowMenu(false)}
                />
                <div className="absolute right-0 bottom-full mb-1.5 w-36 py-1 bg-zinc-950 border border-zinc-700 rounded-lg shadow-xl z-30 text-xs">
                  <button
                    onClick={() => {
                      onUpdateStatus(series.id, 'watching');
                      setShowMenu(false);
                    }}
                    className="w-full text-left px-3 py-1.5 hover:bg-zinc-800 text-zinc-200 flex items-center justify-between"
                  >
                    <span>Watching</span>
                    {progress?.status === 'watching' && <Check className="w-3 h-3 text-rose-500" />}
                  </button>
                  <button
                    onClick={() => {
                      onUpdateStatus(series.id, 'plan_to_watch');
                      setShowMenu(false);
                    }}
                    className="w-full text-left px-3 py-1.5 hover:bg-zinc-800 text-zinc-200 flex items-center justify-between"
                  >
                    <span>Plan to Watch</span>
                    {progress?.status === 'plan_to_watch' && <Check className="w-3 h-3 text-rose-500" />}
                  </button>
                  <button
                    onClick={() => {
                      onUpdateStatus(series.id, 'completed');
                      setShowMenu(false);
                    }}
                    className="w-full text-left px-3 py-1.5 hover:bg-zinc-800 text-zinc-200 flex items-center justify-between"
                  >
                    <span>Completed</span>
                    {progress?.status === 'completed' && <Check className="w-3 h-3 text-rose-500" />}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
