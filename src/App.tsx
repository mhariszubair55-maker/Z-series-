import React, { useState, useEffect } from 'react';
import { Series, UserSeriesProgress, WatchStatus, Episode, Review, UserProfile } from './lib/types';
import { zSeriesApi } from './lib/supabase';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { VideoPlayerModal } from './components/VideoPlayerModal';
import { SupabaseModal } from './components/SupabaseModal';
import { DiscoverPage } from './pages/DiscoverPage';
import { SeriesDetailPage } from './pages/SeriesDetailPage';
import { MyLibraryPage } from './pages/MyLibraryPage';
import { SchedulePage } from './pages/SchedulePage';

export default function App() {
  const [activeTab, setActiveTab] = useState<'discover' | 'library' | 'schedule' | 'sql'>('discover');
  const [seriesList, setSeriesList] = useState<Series[]>([]);
  const [selectedSeries, setSelectedSeries] = useState<Series | null>(null);
  const [progressMap, setProgressMap] = useState<Record<string, UserSeriesProgress>>({});
  const [currentUser, setCurrentUser] = useState<UserProfile>(zSeriesApi.getCurrentUser());
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals
  const [activeTrailerSeries, setActiveTrailerSeries] = useState<Series | null>(null);
  const [activePreviewEpisode, setActivePreviewEpisode] = useState<Episode | null>(null);
  const [isSqlModalOpen, setIsSqlModalOpen] = useState<boolean>(false);

  // Load series & user state
  useEffect(() => {
    async function init() {
      const all = await zSeriesApi.getAllSeries();
      setSeriesList(all);
      setProgressMap(zSeriesApi.getUserProgressMap());
    }
    init();
  }, []);

  // Total watched episodes across all series for the navbar counter
  const totalWatchedCount = Object.values(progressMap).reduce(
    (acc, curr) => acc + (curr.watchedEpisodeIds?.length || 0),
    0
  );

  // Watch status change
  const handleUpdateStatus = (seriesId: string, status: WatchStatus) => {
    const updated = zSeriesApi.updateWatchStatus(seriesId, status);
    setProgressMap({ ...updated });
  };

  // Toggle favorite
  const handleToggleFavorite = (seriesId: string) => {
    const updated = zSeriesApi.toggleFavorite(seriesId);
    setProgressMap({ ...updated });
  };

  // Toggle quick watchlist button from hero
  const handleToggleWatchlist = (seriesId: string) => {
    const current = progressMap[seriesId];
    if (current && (current.status === 'watching' || current.status === 'plan_to_watch')) {
      handleUpdateStatus(seriesId, 'dropped');
    } else {
      handleUpdateStatus(seriesId, 'watching');
    }
  };

  // Toggle episode watched
  const handleToggleEpisodeWatched = (episodeId: string, seasonNumber: number, episodeNumber: number) => {
    if (!selectedSeries) return;
    const updated = zSeriesApi.toggleWatchedEpisode(selectedSeries.id, episodeId, seasonNumber, episodeNumber);
    setProgressMap({ ...updated });
  };

  // Community review handlers
  const handleAddReview = (newReview: Omit<Review, 'id' | 'createdAt' | 'likesCount'>) => {
    zSeriesApi.addReview(newReview);
    // Force re-render of reviews
    if (selectedSeries) {
      setSelectedSeries({ ...selectedSeries });
    }
  };

  const handleLikeReview = (reviewId: string) => {
    zSeriesApi.likeReview(reviewId);
    if (selectedSeries) {
      setSelectedSeries({ ...selectedSeries });
    }
  };

  return (
    <div className="min-h-screen bg-[#08090c] text-zinc-100 flex flex-col selection:bg-rose-500 selection:text-white">
      
      {/* Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setSelectedSeries(null); // Return to list view
        }}
        searchQuery={searchQuery}
        setSearchQuery={(query) => {
          setSearchQuery(query);
          if (query && selectedSeries) setSelectedSeries(null);
          if (query && activeTab !== 'discover') setActiveTab('discover');
        }}
        user={currentUser}
        watchedCount={totalWatchedCount}
        onOpenSqlModal={() => setIsSqlModalOpen(true)}
      />

      {/* Main Page Routing */}
      <main className="flex-1">
        {selectedSeries ? (
          <SeriesDetailPage
            series={selectedSeries}
            progress={progressMap[selectedSeries.id]}
            reviews={zSeriesApi.getReviewsForSeries(selectedSeries.id)}
            currentUser={currentUser}
            onBack={() => setSelectedSeries(null)}
            onOpenTrailer={(s) => setActiveTrailerSeries(s)}
            onPlayEpisodePreview={(ep) => setActivePreviewEpisode(ep)}
            onUpdateStatus={handleUpdateStatus}
            onToggleFavorite={handleToggleFavorite}
            onToggleEpisodeWatched={handleToggleEpisodeWatched}
            onAddReview={handleAddReview}
            onLikeReview={handleLikeReview}
          />
        ) : activeTab === 'discover' ? (
          <DiscoverPage
            seriesList={seriesList}
            progressMap={progressMap}
            searchQuery={searchQuery}
            onSelectSeries={(s) => setSelectedSeries(s)}
            onOpenTrailer={(s) => setActiveTrailerSeries(s)}
            onUpdateStatus={handleUpdateStatus}
            onToggleFavorite={handleToggleFavorite}
            onToggleWatchlist={handleToggleWatchlist}
          />
        ) : activeTab === 'library' ? (
          <MyLibraryPage
            seriesList={seriesList}
            progressMap={progressMap}
            onSelectSeries={(s) => setSelectedSeries(s)}
            onOpenTrailer={(s) => setActiveTrailerSeries(s)}
            onUpdateStatus={handleUpdateStatus}
            onToggleFavorite={handleToggleFavorite}
            onNavigateDiscover={() => setActiveTab('discover')}
          />
        ) : activeTab === 'schedule' ? (
          <SchedulePage
            seriesList={seriesList}
            onSelectSeries={(s) => setSelectedSeries(s)}
            onOpenTrailer={(s) => setActiveTrailerSeries(s)}
          />
        ) : null}
      </main>

      {/* Footer */}
      <Footer onOpenSqlModal={() => setIsSqlModalOpen(true)} />

      {/* Video Trailer Modal */}
      {activeTrailerSeries && (
        <VideoPlayerModal
          series={activeTrailerSeries}
          onClose={() => setActiveTrailerSeries(null)}
        />
      )}

      {/* Episode Preview Video Modal */}
      {activePreviewEpisode && selectedSeries && (
        <VideoPlayerModal
          series={selectedSeries}
          youtubeId={activePreviewEpisode.youtubeTrailerId || selectedSeries.trailerYoutubeId}
          customTitle={`${selectedSeries.title} • S${activePreviewEpisode.seasonNumber}:E${activePreviewEpisode.episodeNumber} "${activePreviewEpisode.title}"`}
          onClose={() => setActivePreviewEpisode(null)}
        />
      )}

      {/* Supabase Schema & Architecture Modal */}
      <SupabaseModal
        isOpen={isSqlModalOpen}
        onClose={() => setIsSqlModalOpen(false)}
      />

    </div>
  );
}
