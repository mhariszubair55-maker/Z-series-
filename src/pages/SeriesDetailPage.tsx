import React, { useState } from 'react';
import { 
  ArrowLeft, Star, Play, Bookmark, Heart, Check, Film, 
  Tv, MessageSquare, Users, Sparkles, Share2, ExternalLink, ShieldCheck 
} from 'lucide-react';
import { Series, UserSeriesProgress, WatchStatus, Episode, Review, UserProfile } from '../lib/types';
import { EpisodeList } from '../components/EpisodeList';
import { ReviewSection } from '../components/ReviewSection';

interface SeriesDetailPageProps {
  series: Series;
  progress?: UserSeriesProgress;
  reviews: Review[];
  currentUser: UserProfile;
  onBack: () => void;
  onOpenTrailer: (series: Series) => void;
  onPlayEpisodePreview: (episode: Episode) => void;
  onUpdateStatus: (seriesId: string, status: WatchStatus) => void;
  onToggleFavorite: (seriesId: string) => void;
  onToggleEpisodeWatched: (episodeId: string, seasonNumber: number, episodeNumber: number) => void;
  onAddReview: (review: Omit<Review, 'id' | 'createdAt' | 'likesCount'>) => void;
  onLikeReview: (reviewId: string) => void;
}

export const SeriesDetailPage: React.FC<SeriesDetailPageProps> = ({
  series,
  progress,
  reviews,
  currentUser,
  onBack,
  onOpenTrailer,
  onPlayEpisodePreview,
  onUpdateStatus,
  onToggleFavorite,
  onToggleEpisodeWatched,
  onAddReview,
  onLikeReview
}) => {
  const [activeTab, setActiveTab] = useState<'episodes' | 'cast' | 'reviews' | 'streaming'>('episodes');
  const [copiedShare, setCopiedShare] = useState(false);

  const watchedCount = progress?.watchedEpisodeIds?.length || 0;
  const totalCount = series.totalEpisodes || 1;
  const progressPercent = Math.min(100, Math.round((watchedCount / totalCount) * 100));

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2000);
  };

  return (
    <div className="w-full min-h-screen pb-20">
      
      {/* Backdrop Header with Vignettes */}
      <div className="relative w-full h-[380px] sm:h-[480px] lg:h-[520px] bg-zinc-950 overflow-hidden">
        <img
          src={series.backdropUrl}
          alt={series.title}
          className="w-full h-full object-cover object-center filter brightness-75 contrast-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#08090c] via-[#08090c]/70 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#08090c] via-[#08090c]/60 to-transparent"></div>

        {/* Top Back Navigation Bar */}
        <div className="absolute top-6 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between z-20">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-black/60 hover:bg-black/80 backdrop-blur-md text-white text-xs sm:text-sm font-semibold border border-white/10 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Browse</span>
          </button>

          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-black/60 hover:bg-black/80 backdrop-blur-md text-white text-xs sm:text-sm font-semibold border border-white/10 transition-all"
          >
            <Share2 className="w-4 h-4 text-zinc-300" />
            <span>{copiedShare ? 'Link Copied!' : 'Share Series'}</span>
          </button>
        </div>
      </div>

      {/* Main Content Info Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-44 sm:-mt-52 relative z-20 space-y-10">
        
        {/* Header Block: Poster + Overview */}
        <div className="flex flex-col md:flex-row items-start gap-6 lg:gap-8">
          
          {/* Poster image card */}
          <div className="w-40 sm:w-56 md:w-64 aspect-[2/3] shrink-0 rounded-2xl overflow-hidden shadow-2xl border-2 border-zinc-750 bg-zinc-900 mx-auto md:mx-0">
            <img
              src={series.posterUrl}
              alt={series.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details header */}
          <div className="flex-1 space-y-4 text-center md:text-left">
            
            {/* Badges */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              <span className="px-2.5 py-0.5 rounded-md bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-bold">
                {series.network}
              </span>
              <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 text-xs font-semibold border border-zinc-700">
                {series.ageRating}
              </span>
              <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 text-xs font-semibold border border-zinc-700">
                {series.releaseYear} {series.endYear ? `– ${series.endYear}` : ''}
              </span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300 text-xs font-semibold border border-emerald-500/30 capitalize">
                {series.status}
              </span>
            </div>

            {/* Title */}
            <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
              {series.title}
            </h1>

            {/* Ratings & creator */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs sm:text-sm text-zinc-400">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-300 font-bold">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>{series.zScore} Z-Score</span>
              </div>
              <div className="text-zinc-300 font-semibold">
                IMDb: <span className="text-white">{series.imdbScore}/10</span>
              </div>
              <span>•</span>
              <div>
                Created by <span className="text-zinc-200 font-semibold">{series.creator}</span>
              </div>
            </div>

            {/* Genres */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-1">
              {series.genres.map(genre => (
                <span
                  key={genre}
                  className="px-2.5 py-1 rounded-lg bg-zinc-800/80 text-zinc-300 text-xs font-medium border border-zinc-700/60"
                >
                  {genre}
                </span>
              ))}
            </div>

            {/* Synopsis */}
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-3xl pt-1">
              {series.synopsis}
            </p>

            {/* Interactive Action Buttons */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-3">
              <button
                onClick={() => onOpenTrailer(series)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-semibold text-xs sm:text-sm shadow-xl shadow-rose-950/40 hover:scale-105 active:scale-95 transition-all"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Watch Trailer</span>
              </button>

              {/* Status button selector */}
              <select
                value={progress?.status || 'plan_to_watch'}
                onChange={(e) => onUpdateStatus(series.id, e.target.value as WatchStatus)}
                className="px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-750 border border-zinc-700 text-xs sm:text-sm font-semibold text-zinc-200 cursor-pointer focus:outline-none focus:border-rose-500"
              >
                <option value="plan_to_watch">Plan to Watch</option>
                <option value="watching">Currently Watching</option>
                <option value="completed">Completed</option>
                <option value="dropped">Dropped</option>
              </select>

              {/* Favorite toggle */}
              <button
                onClick={() => onToggleFavorite(series.id)}
                className={`p-2.5 rounded-xl border transition-all ${
                  progress?.isFavorite
                    ? 'bg-rose-600 border-rose-500 text-white shadow'
                    : 'bg-zinc-800 border-zinc-700 text-zinc-400 hover:text-white'
                }`}
                title="Favorite"
              >
                <Heart className={`w-4 h-4 ${progress?.isFavorite ? 'fill-white' : ''}`} />
              </button>
            </div>

          </div>

        </div>

        {/* Overall Series Progress Card */}
        <div className="p-4 sm:p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-heading font-bold text-sm sm:text-base text-zinc-100">
                Your Binge Tracker Progress
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-300">
                {progressPercent}% Complete
              </span>
            </div>
            <p className="text-xs text-zinc-400">
              You have watched <span className="text-zinc-200 font-semibold">{watchedCount}</span> of{' '}
              <span className="text-zinc-200 font-semibold">{totalCount}</span> total episodes across{' '}
              {series.totalSeasons} seasons.
            </p>
          </div>

          <div className="w-full sm:w-60 space-y-1">
            <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-rose-600 to-amber-500 rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-zinc-500">
              <span>0%</span>
              <span>{progressPercent}%</span>
              <span>100%</span>
            </div>
          </div>
        </div>

        {/* Secondary Navigation Tabs */}
        <div className="flex items-center gap-3 border-b border-zinc-800 pb-2">
          <button
            onClick={() => setActiveTab('episodes')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeTab === 'episodes'
                ? 'bg-rose-600 text-white shadow-md'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-850'
            }`}
          >
            <Film className="w-4 h-4" />
            <span>Episodes ({series.totalEpisodes})</span>
          </button>

          <button
            onClick={() => setActiveTab('cast')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeTab === 'cast'
                ? 'bg-rose-600 text-white shadow-md'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-850'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Cast &amp; Crew ({series.cast.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('reviews')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeTab === 'reviews'
                ? 'bg-rose-600 text-white shadow-md'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-850'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Reviews ({reviews.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('streaming')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeTab === 'streaming'
                ? 'bg-rose-600 text-white shadow-md'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-850'
            }`}
          >
            <Tv className="w-4 h-4" />
            <span>Watch Options</span>
          </button>
        </div>

        {/* Tab 1: Episodes Browser */}
        {activeTab === 'episodes' && (
          <EpisodeList
            series={series}
            watchedEpisodeIds={progress?.watchedEpisodeIds || []}
            onToggleEpisodeWatched={onToggleEpisodeWatched}
            onPlayEpisodePreview={onPlayEpisodePreview}
          />
        )}

        {/* Tab 2: Cast & Crew */}
        {activeTab === 'cast' && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {series.cast.map(c => (
              <div
                key={c.id}
                className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 flex items-center gap-3.5"
              >
                <img
                  src={c.avatarUrl}
                  alt={c.name}
                  className="w-12 h-12 rounded-xl object-cover shrink-0 ring-1 ring-zinc-700"
                />
                <div>
                  <h5 className="font-semibold text-sm text-zinc-100">{c.name}</h5>
                  <p className="text-xs text-rose-400 font-medium">{c.character}</p>
                  <p className="text-[10px] text-zinc-500">{c.role}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Community Reviews */}
        {activeTab === 'reviews' && (
          <ReviewSection
            seriesId={series.id}
            seriesTitle={series.title}
            reviews={reviews}
            currentUser={currentUser}
            onAddReview={onAddReview}
            onLikeReview={onLikeReview}
          />
        )}

        {/* Tab 4: Streaming Providers */}
        {activeTab === 'streaming' && (
          <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-4">
            <h4 className="font-heading font-bold text-base text-zinc-100">
              Where to Stream {series.title}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {series.streamingPlatforms.map(platform => (
                <div
                  key={platform}
                  className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-rose-500/20 text-rose-400">
                      <Tv className="w-5 h-5" />
                    </div>
                    <div>
                      <h5 className="font-semibold text-sm text-zinc-200">{platform}</h5>
                      <p className="text-xs text-zinc-500">Subscription • 4K HDR • Dolby Atmos</p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-zinc-800 text-zinc-300">
                    Active Stream
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
