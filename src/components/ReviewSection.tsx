import React, { useState } from 'react';
import { Star, ThumbsUp, MessageSquare, AlertTriangle, Send, Sparkles } from 'lucide-react';
import { Review, UserProfile } from '../lib/types';

interface ReviewSectionProps {
  seriesId: string;
  seriesTitle: string;
  reviews: Review[];
  currentUser: UserProfile;
  onAddReview: (review: Omit<Review, 'id' | 'createdAt' | 'likesCount'>) => void;
  onLikeReview: (reviewId: string) => void;
}

export const ReviewSection: React.FC<ReviewSectionProps> = ({
  seriesId,
  seriesTitle,
  reviews,
  currentUser,
  onAddReview,
  onLikeReview
}) => {
  const [rating, setRating] = useState<number>(9.5);
  const [headline, setHeadline] = useState('');
  const [content, setContent] = useState('');
  const [hasSpoilers, setHasSpoilers] = useState(false);
  const [revealedSpoilers, setRevealedSpoilers] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!headline.trim() || !content.trim()) return;

    setIsSubmitting(true);
    onAddReview({
      seriesId,
      userId: currentUser.id,
      userName: currentUser.fullName,
      userAvatar: currentUser.avatarUrl,
      userRole: currentUser.role === 'critic' ? 'Lead Critic' : 'Verified Fan',
      rating,
      headline: headline.trim(),
      content: content.trim(),
      hasSpoilers
    });

    setHeadline('');
    setContent('');
    setHasSpoilers(false);
    setIsSubmitting(false);
  };

  const toggleRevealSpoiler = (id: string) => {
    setRevealedSpoilers(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="w-full space-y-8">
      
      {/* Header & Write Review Form */}
      <div className="bg-zinc-900/60 rounded-2xl p-5 sm:p-7 border border-zinc-800 shadow-xl">
        <div className="flex items-center gap-2.5 mb-4">
          <div className="p-2 rounded-xl bg-rose-500/10 text-rose-400">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-lg text-zinc-100">
              Community Reviews &amp; Critiques
            </h3>
            <p className="text-xs text-zinc-400">
              Share your score and verdict on {seriesTitle}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Rating picker slider */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3.5 bg-zinc-950/70 rounded-xl border border-zinc-800/80">
            <div className="flex items-center gap-2">
              <span className="text-xs text-zinc-400 font-medium">Your Score:</span>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-300 font-bold text-sm">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>{rating.toFixed(1)} / 10.0</span>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-64">
              <span className="text-[11px] text-zinc-500">1.0</span>
              <input
                type="range"
                min="1.0"
                max="10.0"
                step="0.1"
                value={rating}
                onChange={(e) => setRating(parseFloat(e.target.value))}
                className="w-full accent-rose-500 cursor-pointer"
              />
              <span className="text-[11px] text-zinc-500">10.0</span>
            </div>
          </div>

          {/* Headline */}
          <input
            type="text"
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
            placeholder="Review Headline (e.g., 'An absolute cinematic tour de force...')"
            required
            className="w-full px-4 py-2.5 rounded-xl bg-zinc-950/80 border border-zinc-800 text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-rose-500/70 focus:ring-1 focus:ring-rose-500/40"
          />

          {/* Review Content */}
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your in-depth review, episode thoughts, soundtrack impressions, directing..."
            rows={3}
            required
            className="w-full px-4 py-2.5 rounded-xl bg-zinc-950/80 border border-zinc-800 text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-rose-500/70 focus:ring-1 focus:ring-rose-500/40 resize-none"
          />

          {/* Footer Controls: Spoiler toggle & Submit button */}
          <div className="flex items-center justify-between gap-3 pt-1">
            <label className="flex items-center gap-2 cursor-pointer select-none text-xs text-zinc-400 hover:text-zinc-200">
              <input
                type="checkbox"
                checked={hasSpoilers}
                onChange={(e) => setHasSpoilers(e.target.checked)}
                className="w-4 h-4 rounded bg-zinc-900 border-zinc-700 accent-rose-500"
              />
              <span className="flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                Contains plot spoilers
              </span>
            </label>

            <button
              type="submit"
              disabled={isSubmitting || !headline.trim() || !content.trim()}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-semibold text-xs shadow-lg shadow-rose-950/40 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-102 transition-all"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Publish Review</span>
            </button>
          </div>

        </form>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        <h4 className="font-heading font-semibold text-base text-zinc-200">
          User Reviews ({reviews.length})
        </h4>

        {reviews.length === 0 ? (
          <div className="text-center py-8 bg-zinc-900/30 rounded-xl border border-zinc-800/60 text-zinc-400 text-sm">
            Be the first to review {seriesTitle}!
          </div>
        ) : (
          reviews.map((rev) => {
            const isSpoilerHidden = rev.hasSpoilers && !revealedSpoilers[rev.id];

            return (
              <div
                key={rev.id}
                className="p-5 rounded-xl bg-zinc-900/40 border border-zinc-800/80 space-y-3"
              >
                {/* Review Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={rev.userAvatar}
                      alt={rev.userName}
                      className="w-9 h-9 rounded-full object-cover ring-1 ring-zinc-700"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-zinc-200">{rev.userName}</span>
                        {rev.userRole && (
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-rose-500/15 text-rose-300 border border-rose-500/25">
                            {rev.userRole}
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-zinc-400">{rev.createdAt}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/15 text-amber-300 font-bold text-xs border border-amber-500/25">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{rev.rating.toFixed(1)}</span>
                  </div>
                </div>

                {/* Review Headline */}
                <h5 className="font-semibold text-sm sm:text-base text-zinc-100">
                  {rev.headline}
                </h5>

                {/* Spoiler Warning or Content */}
                {isSpoilerHidden ? (
                  <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg flex items-center justify-between text-xs text-amber-300">
                    <span className="flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4 text-amber-400" />
                      This review contains spoilers for this series.
                    </span>
                    <button
                      onClick={() => toggleRevealSpoiler(rev.id)}
                      className="underline font-semibold hover:text-white ml-2"
                    >
                      Reveal
                    </button>
                  </div>
                ) : (
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    {rev.content}
                  </p>
                )}

                {/* Likes action */}
                <div className="flex items-center justify-between pt-2 border-t border-zinc-800/40 text-xs text-zinc-400">
                  <button
                    onClick={() => onLikeReview(rev.id)}
                    className="flex items-center gap-1.5 hover:text-rose-400 transition-colors"
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>Helpful ({rev.likesCount})</span>
                  </button>

                  {rev.hasSpoilers && !isSpoilerHidden && (
                    <button
                      onClick={() => toggleRevealSpoiler(rev.id)}
                      className="text-[11px] text-zinc-400 hover:text-zinc-300"
                    >
                      Hide Spoilers
                    </button>
                  )}
                </div>

              </div>
            );
          })
        )}
      </div>

    </div>
  );
};
