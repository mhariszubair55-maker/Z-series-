import React, { useState } from 'react';
import { Check, Play, Clock, Calendar, CheckCheck, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Series, Season, Episode } from '../lib/types';

interface EpisodeListProps {
  series: Series;
  watchedEpisodeIds: string[];
  onToggleEpisodeWatched: (episodeId: string, seasonNumber: number, episodeNumber: number) => void;
  onPlayEpisodePreview: (episode: Episode) => void;
}

export const EpisodeList: React.FC<EpisodeListProps> = ({
  series,
  watchedEpisodeIds,
  onToggleEpisodeWatched,
  onPlayEpisodePreview
}) => {
  const [selectedSeasonNumber, setSelectedSeasonNumber] = useState<number>(1);

  const activeSeason = series.seasons.find(s => s.seasonNumber === selectedSeasonNumber) || series.seasons[0];

  // Calculate season progress
  const episodesInSeason = activeSeason?.episodes || [];
  const watchedInSeasonCount = episodesInSeason.filter(ep => watchedEpisodeIds.includes(ep.id)).length;
  const isSeasonComplete = episodesInSeason.length > 0 && watchedInSeasonCount === episodesInSeason.length;
  const seasonPercent = episodesInSeason.length > 0 ? Math.round((watchedInSeasonCount / episodesInSeason.length) * 100) : 0;

  const handleToggle = (ep: Episode) => {
    onToggleEpisodeWatched(ep.id, ep.seasonNumber, ep.episodeNumber);
    // If completing the last episode of this season, trigger celebration
    if (!watchedEpisodeIds.includes(ep.id) && watchedInSeasonCount + 1 === episodesInSeason.length) {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 }
      });
    }
  };

  const markAllInSeason = () => {
    episodesInSeason.forEach(ep => {
      if (!watchedEpisodeIds.includes(ep.id)) {
        onToggleEpisodeWatched(ep.id, ep.seasonNumber, ep.episodeNumber);
      }
    });
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="w-full space-y-6">
      
      {/* Season Selector Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-zinc-800/80">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
          {series.seasons.map((season) => {
            const isSelected = season.seasonNumber === selectedSeasonNumber;
            const seasonWatched = season.episodes.filter(ep => watchedEpisodeIds.includes(ep.id)).length;
            const seasonDone = season.episodes.length > 0 && seasonWatched === season.episodes.length;

            return (
              <button
                key={season.id}
                onClick={() => setSelectedSeasonNumber(season.seasonNumber)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${
                  isSelected
                    ? 'bg-gradient-to-r from-rose-600 to-red-600 text-white shadow-lg shadow-rose-950/40'
                    : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800 border border-zinc-800'
                }`}
              >
                <span>Season {season.seasonNumber}</span>
                {seasonDone && <Check className="w-3.5 h-3.5 text-emerald-300" />}
              </button>
            );
          })}
        </div>

        {/* Season progress stats & batch mark */}
        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-2 bg-zinc-900/80 px-3 py-1.5 rounded-lg border border-zinc-800">
            <span className="text-zinc-400">Progress:</span>
            <span className="font-semibold text-zinc-200">
              {watchedInSeasonCount}/{episodesInSeason.length} ({seasonPercent}%)
            </span>
            <div className="w-16 h-1.5 bg-zinc-800 rounded-full overflow-hidden ml-1">
              <div 
                className="h-full bg-rose-500 rounded-full transition-all duration-300"
                style={{ width: `${seasonPercent}%` }}
              />
            </div>
          </div>

          {!isSeasonComplete && episodesInSeason.length > 0 && (
            <button
              onClick={markAllInSeason}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white transition-colors"
            >
              <CheckCheck className="w-3.5 h-3.5 text-rose-400" />
              <span>Mark Season Done</span>
            </button>
          )}
        </div>
      </div>

      {/* Season Synopsis */}
      {activeSeason?.synopsis && (
        <p className="text-xs sm:text-sm text-zinc-400 italic bg-zinc-900/40 p-3.5 rounded-xl border border-zinc-800/60">
          "{activeSeason.synopsis}"
        </p>
      )}

      {/* Episodes List */}
      <div className="space-y-3.5">
        {episodesInSeason.map((episode) => {
          const isWatched = watchedEpisodeIds.includes(episode.id);

          return (
            <div
              key={episode.id}
              className={`group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl border transition-all ${
                isWatched
                  ? 'bg-zinc-900/30 border-zinc-800/50 opacity-90'
                  : 'bg-zinc-900/70 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900'
              }`}
            >
              {/* Left thumbnail & info */}
              <div className="flex items-start gap-4 flex-1">
                {/* Thumbnail still */}
                <div 
                  onClick={() => onPlayEpisodePreview(episode)}
                  className="relative w-28 sm:w-36 aspect-video shrink-0 rounded-lg overflow-hidden bg-zinc-950 cursor-pointer group-hover:ring-2 ring-rose-500/30 transition-all"
                >
                  <img
                    src={episode.stillUrl}
                    alt={episode.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 flex items-center justify-center transition-colors">
                    <div className="w-8 h-8 rounded-full bg-rose-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
                    </div>
                  </div>
                  {isWatched && (
                    <div className="absolute bottom-1 right-1 px-1.5 py-0.2 rounded bg-emerald-600 text-white text-[9px] font-bold flex items-center gap-0.5">
                      <Check className="w-2.5 h-2.5" />
                      <span>Watched</span>
                    </div>
                  )}
                </div>

                {/* Episode text content */}
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs font-bold text-rose-400">
                      EP {episode.episodeNumber}
                    </span>
                    <h4 className="font-semibold text-sm sm:text-base text-zinc-100 group-hover:text-rose-300 transition-colors">
                      {episode.title}
                    </h4>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-zinc-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-zinc-400" />
                      {episode.durationMinutes}m
                    </span>
                    {episode.airDate && (
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-zinc-400" />
                        {episode.airDate}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed pt-1">
                    {episode.overview}
                  </p>
                </div>
              </div>

              {/* Right Action: Watched Checkbox Button */}
              <div className="flex items-center gap-2 sm:self-center shrink-0 w-full sm:w-auto justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-zinc-800/40">
                <button
                  onClick={() => handleToggle(episode)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                    isWatched
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-rose-500/20 hover:text-rose-300 hover:border-rose-500/40'
                      : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white border border-zinc-750'
                  }`}
                  title={isWatched ? 'Click to unmark as watched' : 'Mark this episode as watched'}
                >
                  <div className={`w-4 h-4 rounded flex items-center justify-center border ${
                    isWatched ? 'bg-emerald-500 border-emerald-400 text-black' : 'border-zinc-500'
                  }`}>
                    {isWatched && <Check className="w-3 h-3 text-zinc-950 font-bold" />}
                  </div>
                  <span>{isWatched ? 'Watched' : 'Mark Watched'}</span>
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
