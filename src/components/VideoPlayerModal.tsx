import React, { useEffect } from 'react';
import { X, Tv, Film, ExternalLink } from 'lucide-react';
import { Series } from '../lib/types';

interface VideoPlayerModalProps {
  series: Series | null;
  youtubeId?: string;
  customTitle?: string;
  onClose: () => void;
}

export const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({
  series,
  youtubeId,
  customTitle,
  onClose
}) => {
  const activeId = youtubeId || series?.trailerYoutubeId || 'xEQP4VVuyrY';

  // Listen to Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!series && !youtubeId) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-xl animate-in fade-in duration-200">
      
      {/* Click outside to close */}
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-4xl bg-zinc-950 rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl z-10">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-zinc-900/90 border-b border-zinc-800">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-rose-500/20 text-rose-400">
              <Film className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-semibold text-sm sm:text-base text-zinc-100">
                {customTitle || `${series?.title} - Official Trailer`}
              </h3>
              <p className="text-xs text-zinc-400">
                {series?.network ? `Airing on ${series.network}` : 'Z-SERIES Cinema Player'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 16:9 Video Embed Player */}
        <div className="relative w-full aspect-video bg-black">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${activeId}?autoplay=1&rel=0&modestbranding=1`}
            title={series?.title || 'Video Player'}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>

        {/* Footer info */}
        {series && (
          <div className="px-5 py-3 bg-zinc-900/60 border-t border-zinc-800/80 flex items-center justify-between text-xs text-zinc-400">
            <div className="flex items-center gap-3">
              <span className="font-semibold text-zinc-200">Z-Score: {series.zScore} ★</span>
              <span>•</span>
              <span>{series.genres.slice(0, 2).join(', ')}</span>
              <span>•</span>
              <span>{series.totalSeasons} Seasons Available</span>
            </div>

            <a
              href={`https://www.youtube.com/watch?v=${activeId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-rose-400 hover:text-rose-300 font-medium transition-colors"
            >
              <span>Watch on YouTube</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        )}

      </div>
    </div>
  );
};
