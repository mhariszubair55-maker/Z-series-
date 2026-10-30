export type WatchStatus = 'watching' | 'plan_to_watch' | 'completed' | 'dropped';

export interface Episode {
  id: string;
  seasonId: string;
  seriesId: string;
  episodeNumber: number;
  seasonNumber: number;
  title: string;
  overview: string;
  durationMinutes: number;
  stillUrl: string;
  airDate: string;
  videoPreviewUrl?: string;
  youtubeTrailerId?: string;
}

export interface Season {
  id: string;
  seriesId: string;
  seasonNumber: number;
  title: string;
  synopsis: string;
  episodeCount: number;
  releaseYear: number;
  posterUrl?: string;
  episodes: Episode[];
}

export interface CastMember {
  id: string;
  name: string;
  role: string;
  character: string;
  avatarUrl: string;
}

export interface Series {
  id: string;
  title: string;
  originalTitle?: string;
  slug: string;
  synopsis: string;
  posterUrl: string;
  backdropUrl: string;
  releaseYear: number;
  endYear?: number;
  status: 'airing' | 'completed' | 'upcoming' | 'returning';
  ageRating: string;
  network: string;
  streamingPlatforms: string[];
  genres: string[];
  zScore: number;
  imdbScore: number;
  totalSeasons: number;
  totalEpisodes: number;
  featured?: boolean;
  trailerYoutubeId: string;
  seasons: Season[];
  cast: CastMember[];
  creator: string;
}

export interface UserSeriesProgress {
  seriesId: string;
  status: WatchStatus;
  isFavorite: boolean;
  currentSeason: number;
  currentEpisode: number;
  userRating?: number;
  updatedAt: string;
  watchedEpisodeIds: string[];
}

export interface Review {
  id: string;
  seriesId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  userRole?: 'VIP Member' | 'Lead Critic' | 'Verified Fan';
  rating: number;
  headline: string;
  content: string;
  hasSpoilers: boolean;
  likesCount: number;
  createdAt: string;
}

export interface UserProfile {
  id: string;
  username: string;
  fullName: string;
  avatarUrl: string;
  bio: string;
  role: 'user' | 'critic' | 'admin';
}
