import React from 'react';
import { Film, Database, Heart, ArrowUp } from 'lucide-react';

interface FooterProps {
  onOpenSqlModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenSqlModal }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#06070a] border-t border-zinc-800/80 pt-12 pb-8 mt-20 text-zinc-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Col 1: Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-600 text-white font-heading font-extrabold text-lg">
                Z
              </div>
              <span className="font-heading font-bold text-lg text-zinc-100">Z-SERIES</span>
            </div>
            <p className="text-zinc-400 leading-relaxed text-[11px]">
              The next-generation binge tracking, season discovery, and discussion platform for prestige television and series connoisseurs.
            </p>
          </div>

          {/* Col 2: Popular Genres */}
          <div className="space-y-2">
            <h5 className="font-semibold text-zinc-200 uppercase tracking-wider text-[11px]">
              Trending Genres
            </h5>
            <ul className="space-y-1.5 text-[11px]">
              <li><span className="hover:text-rose-400 cursor-pointer">Sci-Fi &amp; Cyberpunk</span></li>
              <li><span className="hover:text-rose-400 cursor-pointer">Psychological Thrillers</span></li>
              <li><span className="hover:text-rose-400 cursor-pointer">Anime &amp; Animated Masterpieces</span></li>
              <li><span className="hover:text-rose-400 cursor-pointer">Post-Apocalyptic Survival</span></li>
            </ul>
          </div>

          {/* Col 3: Streaming Networks */}
          <div className="space-y-2">
            <h5 className="font-semibold text-zinc-200 uppercase tracking-wider text-[11px]">
              Supported Networks
            </h5>
            <ul className="space-y-1.5 text-[11px]">
              <li><span className="hover:text-zinc-200">Apple TV+</span></li>
              <li><span className="hover:text-zinc-200">HBO Max</span></li>
              <li><span className="hover:text-zinc-200">Netflix</span></li>
              <li><span className="hover:text-zinc-200">FX &amp; Hulu</span></li>
            </ul>
          </div>

          {/* Col 4: Supabase & Architecture */}
          <div className="space-y-3">
            <h5 className="font-semibold text-zinc-200 uppercase tracking-wider text-[11px]">
              Full-Stack Architecture
            </h5>
            <p className="text-[11px] text-zinc-400">
              Built with React 19, TypeScript, Tailwind CSS, and Supabase PostgreSQL with Row Level Security.
            </p>
            <button
              onClick={onOpenSqlModal}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/30 text-[11px] font-medium transition-colors"
            >
              <Database className="w-3.5 h-3.5" />
              <span>Inspect supabase/schema.sql</span>
            </button>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-zinc-800/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-zinc-500">
            &copy; {new Date().getFullYear()} Z-SERIES. Designed for prestige television enthusiasts.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
