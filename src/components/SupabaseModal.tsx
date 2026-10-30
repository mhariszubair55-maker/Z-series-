import React, { useState } from 'react';
import { X, Database, Check, Copy, ExternalLink, ShieldCheck, Layers, Server } from 'lucide-react';
import { isSupabaseConfigured } from '../lib/supabase';

interface SupabaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SupabaseModal: React.FC<SupabaseModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'schema' | 'architecture' | 'env'>('schema');

  if (!isOpen) return null;

  const sqlSchemaText = `-- Z-SERIES Database Schema (PostgreSQL / Supabase)
-- Saved at: supabase/schema.sql

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    username TEXT UNIQUE NOT NULL,
    full_name TEXT,
    avatar_url TEXT,
    bio TEXT,
    role TEXT DEFAULT 'user' CHECK (role IN ('user', 'critic', 'admin')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.series (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    synopsis TEXT NOT NULL,
    poster_url TEXT NOT NULL,
    backdrop_url TEXT NOT NULL,
    release_year INTEGER NOT NULL,
    status TEXT DEFAULT 'returning',
    age_rating TEXT DEFAULT 'TV-MA',
    network TEXT NOT NULL,
    genres TEXT[] DEFAULT '{}',
    z_score NUMERIC(3, 1) DEFAULT 9.0,
    imdb_score NUMERIC(3, 1) DEFAULT 8.8,
    total_seasons INTEGER DEFAULT 1,
    total_episodes INTEGER DEFAULT 1,
    featured BOOLEAN DEFAULT FALSE,
    trailer_youtube_id TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.seasons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    series_id UUID NOT NULL REFERENCES public.series(id) ON DELETE CASCADE,
    season_number INTEGER NOT NULL,
    title TEXT NOT NULL,
    episode_count INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS public.episodes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    series_id UUID NOT NULL REFERENCES public.series(id) ON DELETE CASCADE,
    season_id UUID NOT NULL REFERENCES public.seasons(id) ON DELETE CASCADE,
    episode_number INTEGER NOT NULL,
    title TEXT NOT NULL,
    overview TEXT NOT NULL,
    duration_minutes INTEGER DEFAULT 50,
    still_url TEXT,
    air_date DATE
);

CREATE TABLE IF NOT EXISTS public.user_series_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    series_id UUID NOT NULL REFERENCES public.series(id) ON DELETE CASCADE,
    status TEXT DEFAULT 'plan_to_watch',
    is_favorite BOOLEAN DEFAULT FALSE,
    current_season INTEGER DEFAULT 1,
    current_episode INTEGER DEFAULT 1,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    series_id UUID NOT NULL REFERENCES public.series(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    rating NUMERIC(3, 1) NOT NULL,
    headline TEXT NOT NULL,
    content TEXT NOT NULL,
    has_spoilers BOOLEAN DEFAULT FALSE,
    likes_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS & Security
ALTER TABLE public.series ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Read Series" ON public.series FOR SELECT USING (true);
ALTER TABLE public.user_series_progress ENABLE ROW LEVEL SECURITY;
CREATE POLICY "User Progress Manage" ON public.user_series_progress FOR ALL USING (auth.uid() = user_id);`;

  const handleCopy = () => {
    navigator.clipboard.writeText(sqlSchemaText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-3xl bg-zinc-950 rounded-2xl border border-zinc-800 shadow-2xl overflow-hidden flex flex-col max-h-[85vh] z-10">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-zinc-900/90 border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-heading font-bold text-base text-zinc-100">
                  Supabase Backend &amp; Architecture
                </h3>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                  isSupabaseConfigured
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                    : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                }`}>
                  {isSupabaseConfigured ? 'LIVE CONNECTED' : 'DEMO DATABASE ACTIVE'}
                </span>
              </div>
              <p className="text-xs text-zinc-400">
                Found in <code className="text-zinc-300">supabase/schema.sql</code>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 px-6 pt-3 bg-zinc-950 border-b border-zinc-800/80">
          <button
            onClick={() => setActiveTab('schema')}
            className={`px-3.5 py-2 text-xs font-semibold border-b-2 transition-all ${
              activeTab === 'schema'
                ? 'border-emerald-500 text-emerald-400'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            SQL DDL Schema
          </button>
          <button
            onClick={() => setActiveTab('architecture')}
            className={`px-3.5 py-2 text-xs font-semibold border-b-2 transition-all ${
              activeTab === 'architecture'
                ? 'border-emerald-500 text-emerald-400'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Data Model &amp; Tables
          </button>
          <button
            onClick={() => setActiveTab('env')}
            className={`px-3.5 py-2 text-xs font-semibold border-b-2 transition-all ${
              activeTab === 'env'
                ? 'border-emerald-500 text-emerald-400'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Environment Setup (.env)
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 font-sans text-xs">
          
          {activeTab === 'schema' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-zinc-400">
                  Ready to copy and execute directly in your Supabase SQL Editor:
                </span>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-all shadow"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied to Clipboard!' : 'Copy Schema'}</span>
                </button>
              </div>

              <pre className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 font-mono text-[11px] text-zinc-300 leading-relaxed overflow-x-auto select-all">
                {sqlSchemaText}
              </pre>
            </div>
          )}

          {activeTab === 'architecture' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-zinc-900/70 border border-zinc-800">
                  <div className="flex items-center gap-2 mb-1.5 text-zinc-100 font-semibold">
                    <Layers className="w-4 h-4 text-rose-400" />
                    <span>series &amp; seasons</span>
                  </div>
                  <p className="text-zinc-400 text-[11px] leading-relaxed">
                    Stores master catalog of TV shows, creators, networks, tags, Z-Score ratings, and season hierarchy.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-zinc-900/70 border border-zinc-800">
                  <div className="flex items-center gap-2 mb-1.5 text-zinc-100 font-semibold">
                    <Server className="w-4 h-4 text-sky-400" />
                    <span>episodes</span>
                  </div>
                  <p className="text-zinc-400 text-[11px] leading-relaxed">
                    Granular breakdown of each episode: duration, thumbnail still, air date, and video previews.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-zinc-900/70 border border-zinc-800">
                  <div className="flex items-center gap-2 mb-1.5 text-zinc-100 font-semibold">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>user_series_progress</span>
                  </div>
                  <p className="text-zinc-400 text-[11px] leading-relaxed">
                    Binge tracking state: status ('watching', 'completed', 'plan_to_watch'), watched episodes checklist, and personal favorites.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-zinc-900/70 border border-zinc-800">
                  <div className="flex items-center gap-2 mb-1.5 text-zinc-100 font-semibold">
                    <Database className="w-4 h-4 text-amber-400" />
                    <span>reviews</span>
                  </div>
                  <p className="text-zinc-400 text-[11px] leading-relaxed">
                    User reviews with 10.0 scale ratings, spoiler prevention flags, and helpfulness upvotes.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'env' && (
            <div className="space-y-4">
              <p className="text-zinc-400 leading-relaxed">
                To connect directly to a remote Supabase project, define the following variables in your <code className="text-zinc-200">.env</code> file:
              </p>
              <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 font-mono text-[11px] text-zinc-200 space-y-1">
                <p># Z-SERIES Supabase Configuration</p>
                <p className="text-emerald-400">VITE_SUPABASE_URL="https://xyzcompany.supabase.co"</p>
                <p className="text-emerald-400">VITE_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."</p>
              </div>
              <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
                <span className="font-semibold">Zero-Friction Fallback:</span> When Supabase keys are not set, Z-SERIES automatically utilizes a high-speed local reactive store with localStorage persistence, allowing all search, episode checklist, reviews, and library features to work seamlessly immediately!
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-zinc-900/80 border-t border-zinc-800 flex items-center justify-between">
          <span className="text-zinc-400 text-xs">
            PostgreSQL 15+ compatible with Row Level Security
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
