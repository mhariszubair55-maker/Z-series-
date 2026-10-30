-- ==============================================================================
-- Z-SERIES Database Schema (Supabase / PostgreSQL)
-- Description: Next-generation TV Series streaming discovery, binge tracker,
--              ratings, season/episode manager, and community reviews.
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. ENUMS & DOMAINS
CREATE TYPE series_status AS ENUM ('airing', 'completed', 'upcoming', 'returning');
CREATE TYPE user_watch_status AS ENUM ('watching', 'plan_to_watch', 'completed', 'dropped', 'on_hold');

-- 3. PROFILES TABLE (Mirrors Supabase Auth Users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    username TEXT UNIQUE NOT NULL,
    full_name TEXT,
    avatar_url TEXT,
    bio TEXT,
    role TEXT DEFAULT 'user' CHECK (role IN ('user', 'critic', 'admin')),
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 4. SERIES TABLE
CREATE TABLE IF NOT EXISTS public.series (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    original_title TEXT,
    slug TEXT UNIQUE NOT NULL,
    synopsis TEXT NOT NULL,
    poster_url TEXT NOT NULL,
    backdrop_url TEXT NOT NULL,
    logo_url TEXT,
    release_year INTEGER NOT NULL,
    end_year INTEGER,
    status series_status DEFAULT 'returning' NOT NULL,
    age_rating TEXT DEFAULT 'TV-MA',
    network TEXT NOT NULL,
    genres TEXT[] NOT NULL DEFAULT '{}',
    z_score NUMERIC(3, 1) DEFAULT 9.0 CHECK (z_score >= 0 AND z_score <= 10.0),
    imdb_score NUMERIC(3, 1) DEFAULT 8.8,
    total_seasons INTEGER DEFAULT 1 NOT NULL,
    total_episodes INTEGER DEFAULT 1 NOT NULL,
    featured BOOLEAN DEFAULT FALSE,
    trailer_youtube_id TEXT,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 5. SEASONS TABLE
CREATE TABLE IF NOT EXISTS public.seasons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    series_id UUID NOT NULL REFERENCES public.series(id) ON DELETE CASCADE,
    season_number INTEGER NOT NULL,
    title TEXT NOT NULL,
    synopsis TEXT,
    poster_url TEXT,
    episode_count INTEGER DEFAULT 0 NOT NULL,
    release_year INTEGER,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    CONSTRAINT unq_series_season UNIQUE (series_id, season_number)
);

-- 6. EPISODES TABLE
CREATE TABLE IF NOT EXISTS public.episodes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    series_id UUID NOT NULL REFERENCES public.series(id) ON DELETE CASCADE,
    season_id UUID NOT NULL REFERENCES public.seasons(id) ON DELETE CASCADE,
    episode_number INTEGER NOT NULL,
    title TEXT NOT NULL,
    overview TEXT NOT NULL,
    duration_minutes INTEGER DEFAULT 50 NOT NULL,
    still_url TEXT,
    air_date DATE,
    video_preview_url TEXT,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    CONSTRAINT unq_season_episode UNIQUE (season_id, episode_number)
);

-- 7. USER WATCHLIST & PROGRESS TABLE
CREATE TABLE IF NOT EXISTS public.user_series_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    series_id UUID NOT NULL REFERENCES public.series(id) ON DELETE CASCADE,
    status user_watch_status DEFAULT 'plan_to_watch' NOT NULL,
    is_favorite BOOLEAN DEFAULT FALSE,
    current_season INTEGER DEFAULT 1 NOT NULL,
    current_episode INTEGER DEFAULT 1 NOT NULL,
    user_rating INTEGER CHECK (user_rating BETWEEN 1 AND 10),
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    CONSTRAINT unq_user_series UNIQUE (user_id, series_id)
);

-- 8. WATCHED EPISODES LOG
CREATE TABLE IF NOT EXISTS public.watched_episodes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    episode_id UUID NOT NULL REFERENCES public.episodes(id) ON DELETE CASCADE,
    progress_percent INTEGER DEFAULT 100 CHECK (progress_percent >= 0 AND progress_percent <= 100),
    watched_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    CONSTRAINT unq_user_episode UNIQUE (user_id, episode_id)
);

-- 9. REVIEWS & DISCUSSIONS TABLE
CREATE TABLE IF NOT EXISTS public.reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    series_id UUID NOT NULL REFERENCES public.series(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    rating NUMERIC(3, 1) NOT NULL CHECK (rating >= 1.0 AND rating <= 10.0),
    headline TEXT NOT NULL,
    content TEXT NOT NULL,
    has_spoilers BOOLEAN DEFAULT FALSE,
    likes_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 10. ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.series ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seasons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.episodes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_series_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.watched_episodes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Profiles: Anyone can view public profiles; owners can update their own profile
CREATE POLICY "Public profiles are viewable by everyone" 
ON public.profiles FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" 
ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Series, Seasons, Episodes: Read-only for all public visitors
CREATE POLICY "Series are viewable by everyone" 
ON public.series FOR SELECT USING (true);

CREATE POLICY "Seasons are viewable by everyone" 
ON public.seasons FOR SELECT USING (true);

CREATE POLICY "Episodes are viewable by everyone" 
ON public.episodes FOR SELECT USING (true);

-- User Progress: Only owner can view, insert, update, delete
CREATE POLICY "Users can manage own watch progress" 
ON public.user_series_progress FOR ALL 
USING (auth.uid() = user_id) 
WITH CHECK (auth.uid() = user_id);

-- Watched Episodes: Only owner can manage
CREATE POLICY "Users can manage watched episodes" 
ON public.watched_episodes FOR ALL 
USING (auth.uid() = user_id) 
WITH CHECK (auth.uid() = user_id);

-- Reviews: Everyone can read reviews; authenticated users can insert and update their own
CREATE POLICY "Reviews are viewable by everyone" 
ON public.reviews FOR SELECT USING (true);

CREATE POLICY "Users can write reviews" 
ON public.reviews FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own reviews" 
ON public.reviews FOR UPDATE 
USING (auth.uid() = user_id);

-- 11. AUTOMATIC PROFILE TRIGGER ON SIGNUP
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, username, full_name, avatar_url)
  VALUES (
    new.id, 
    COALESCE(new.raw_user_meta_data->>'username', split_part(new.email, '@', 1)),
    COALESCE(new.raw_user_meta_data->>'full_name', 'Z-Series Fan'),
    COALESCE(new.raw_user_meta_data->>'avatar_url', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 12. SAMPLE SEED DATA
-- Insert starter series for testing
INSERT INTO public.series (id, title, slug, synopsis, poster_url, backdrop_url, release_year, status, age_rating, network, genres, z_score, imdb_score, total_seasons, total_episodes, featured, trailer_youtube_id)
VALUES 
('11111111-1111-1111-1111-111111111111', 
 'Severance', 
 'severance', 
 'Mark leads a team of office workers whose memories have been surgically divided between their work and personal lives. When a mysterious colleague appears outside of work, it begins a journey to discover the truth about their jobs.', 
 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80', 
 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1600&q=80', 
 2022, 'returning', 'TV-MA', 'Apple TV+', ARRAY['Sci-Fi', 'Mystery', 'Psychological Thriller'], 9.6, 8.7, 2, 19, TRUE, 'xEQP4VVuyrY'),

('22222222-2222-2222-2222-222222222222', 
 'Arcane', 
 'arcane', 
 'Set in the utopian region of Piltover and the oppressed underground of Zaun, the story follows the origins of two iconic League champions-and the power that will tear them apart.', 
 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80', 
 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=1600&q=80', 
 2021, 'completed', 'TV-14', 'Netflix', ARRAY['Animation', 'Sci-Fi', 'Action', 'Steampunk'], 9.8, 9.0, 2, 18, TRUE, 'fXmAurh012s'),

('33333333-3333-3333-3333-333333333333', 
 'The Last of Us', 
 'the-last-of-us', 
 'After a global pandemic destroys civilization, a hardened survivor takes charge of a 14-year-old girl who may be humanity''s last hope.', 
 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80', 
 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=80', 
 2023, 'returning', 'TV-MA', 'HBO Max', ARRAY['Post-Apocalyptic', 'Drama', 'Survival', 'Horror'], 9.5, 8.8, 2, 16, TRUE, 'uLtkt8BonwM')
ON CONFLICT (id) DO NOTHING;
