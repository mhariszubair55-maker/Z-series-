import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { INITIAL_SERIES, INITIAL_REVIEWS, DEMO_USER } from './mockData';
import { Series, Review, UserSeriesProgress, WatchStatus, UserProfile } from './types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl.startsWith('http') && 
  !supabaseUrl.includes('your-project')
);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Local persistent state keys
const STORAGE_KEYS = {
  SERIES: 'zseries_series_cache',
  PROGRESS: 'zseries_user_progress',
  REVIEWS: 'zseries_reviews_cache',
  USER: 'zseries_current_user',
};

// Seed initial local storage state if not present
function initializeLocalStore() {
  if (!localStorage.getItem(STORAGE_KEYS.SERIES)) {
    localStorage.setItem(STORAGE_KEYS.SERIES, JSON.stringify(INITIAL_SERIES));
  }
  if (!localStorage.getItem(STORAGE_KEYS.REVIEWS)) {
    localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(INITIAL_REVIEWS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.PROGRESS)) {
    const defaultProgress: Record<string, UserSeriesProgress> = {
      'severance-s1': {
        seriesId: 'severance-s1',
        status: 'watching',
        isFavorite: true,
        currentSeason: 1,
        currentEpisode: 4,
        userRating: 10,
        updatedAt: new Date().toISOString(),
        watchedEpisodeIds: ['sev-s1-e1', 'sev-s1-e2', 'sev-s1-e3']
      },
      'arcane-s1': {
        seriesId: 'arcane-s1',
        status: 'completed',
        isFavorite: true,
        currentSeason: 2,
        currentEpisode: 9,
        userRating: 10,
        updatedAt: new Date().toISOString(),
        watchedEpisodeIds: ['arc-s1-e1', 'arc-s1-e3']
      },
      'cyberpunk-edgerunners': {
        seriesId: 'cyberpunk-edgerunners',
        status: 'plan_to_watch',
        isFavorite: false,
        currentSeason: 1,
        currentEpisode: 1,
        updatedAt: new Date().toISOString(),
        watchedEpisodeIds: []
      }
    };
    localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(defaultProgress));
  }
}

// Ensure store is ready
if (typeof window !== 'undefined') {
  initializeLocalStore();
}

export const zSeriesApi = {
  isConfigured: () => isSupabaseConfigured,

  // Get all Series
  async getAllSeries(): Promise<Series[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.from('series').select('*');
        if (!error && data && data.length > 0) {
          // If Supabase has data, format and return
          return data as Series[];
        }
      } catch (err) {
        console.warn('Supabase fetch failed, falling back to local dataset', err);
      }
    }
    const local = localStorage.getItem(STORAGE_KEYS.SERIES);
    return local ? JSON.parse(local) : INITIAL_SERIES;
  },

  // Get Series by ID or slug
  async getSeriesById(idOrSlug: string): Promise<Series | null> {
    const list = await this.getAllSeries();
    return list.find(s => s.id === idOrSlug || s.slug === idOrSlug) || null;
  },

  // Get user progress map
  getUserProgressMap(): Record<string, UserSeriesProgress> {
    const raw = localStorage.getItem(STORAGE_KEYS.PROGRESS);
    return raw ? JSON.parse(raw) : {};
  },

  // Update watch status for a series
  updateWatchStatus(seriesId: string, status: WatchStatus): Record<string, UserSeriesProgress> {
    const progressMap = this.getUserProgressMap();
    const existing = progressMap[seriesId] || {
      seriesId,
      status,
      isFavorite: false,
      currentSeason: 1,
      currentEpisode: 1,
      updatedAt: new Date().toISOString(),
      watchedEpisodeIds: []
    };

    existing.status = status;
    existing.updatedAt = new Date().toISOString();
    progressMap[seriesId] = existing;

    localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(progressMap));
    return progressMap;
  },

  // Toggle episode watched
  toggleWatchedEpisode(seriesId: string, episodeId: string, seasonNumber: number, episodeNumber: number): Record<string, UserSeriesProgress> {
    const progressMap = this.getUserProgressMap();
    const current = progressMap[seriesId] || {
      seriesId,
      status: 'watching' as WatchStatus,
      isFavorite: false,
      currentSeason: seasonNumber,
      currentEpisode: episodeNumber,
      updatedAt: new Date().toISOString(),
      watchedEpisodeIds: []
    };

    const hasWatched = current.watchedEpisodeIds.includes(episodeId);
    if (hasWatched) {
      current.watchedEpisodeIds = current.watchedEpisodeIds.filter(id => id !== episodeId);
    } else {
      current.watchedEpisodeIds = [...current.watchedEpisodeIds, episodeId];
      current.currentSeason = seasonNumber;
      current.currentEpisode = episodeNumber;
      if (current.status === 'plan_to_watch') {
        current.status = 'watching';
      }
    }

    current.updatedAt = new Date().toISOString();
    progressMap[seriesId] = current;
    localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(progressMap));
    return progressMap;
  },

  // Toggle favorite
  toggleFavorite(seriesId: string): Record<string, UserSeriesProgress> {
    const progressMap = this.getUserProgressMap();
    const current = progressMap[seriesId] || {
      seriesId,
      status: 'plan_to_watch' as WatchStatus,
      isFavorite: false,
      currentSeason: 1,
      currentEpisode: 1,
      updatedAt: new Date().toISOString(),
      watchedEpisodeIds: []
    };

    current.isFavorite = !current.isFavorite;
    current.updatedAt = new Date().toISOString();
    progressMap[seriesId] = current;
    localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(progressMap));
    return progressMap;
  },

  // Reviews
  getReviewsForSeries(seriesId: string): Review[] {
    const raw = localStorage.getItem(STORAGE_KEYS.REVIEWS);
    const reviews: Review[] = raw ? JSON.parse(raw) : INITIAL_REVIEWS;
    return reviews.filter(r => r.seriesId === seriesId);
  },

  addReview(newReview: Omit<Review, 'id' | 'createdAt' | 'likesCount'>): Review {
    const raw = localStorage.getItem(STORAGE_KEYS.REVIEWS);
    const list: Review[] = raw ? JSON.parse(raw) : INITIAL_REVIEWS;
    const created: Review = {
      ...newReview,
      id: `rev-${Date.now()}`,
      likesCount: 0,
      createdAt: new Date().toISOString().split('T')[0]
    };

    const updated = [created, ...list];
    localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(updated));
    return created;
  },

  likeReview(reviewId: string): void {
    const raw = localStorage.getItem(STORAGE_KEYS.REVIEWS);
    const list: Review[] = raw ? JSON.parse(raw) : INITIAL_REVIEWS;
    const item = list.find(r => r.id === reviewId);
    if (item) {
      item.likesCount += 1;
      localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(list));
    }
  },

  // Active Profile
  getCurrentUser(): UserProfile {
    const raw = localStorage.getItem(STORAGE_KEYS.USER);
    return raw ? JSON.parse(raw) : DEMO_USER;
  }
};
