import React, { useState } from 'react';
import { Calendar, Clock, Tv, Bell, Check, Play, Sparkles } from 'lucide-react';
import { Series } from '../lib/types';

interface SchedulePageProps {
  seriesList: Series[];
  onSelectSeries: (series: Series) => void;
  onOpenTrailer: (series: Series) => void;
}

interface AiringEvent {
  id: string;
  seriesId: string;
  seriesTitle: string;
  seasonNumber: number;
  episodeNumber: number;
  episodeTitle: string;
  airDate: string;
  dayOfWeek: string;
  timeSlot: string;
  network: string;
  tag: 'Season Premiere' | 'New Episode' | 'Season Finale' | 'Mid-Season';
  posterUrl: string;
}

export const SchedulePage: React.FC<SchedulePageProps> = ({
  seriesList,
  onSelectSeries,
  onOpenTrailer
}) => {
  const [reminders, setReminders] = useState<Record<string, boolean>>({});
  const [selectedDay, setSelectedDay] = useState<string>('All');

  const scheduleEvents: AiringEvent[] = [
    {
      id: 'sch-1',
      seriesId: 'severance-s1',
      seriesTitle: 'Severance',
      seasonNumber: 2,
      episodeNumber: 1,
      episodeTitle: 'Hello, Ms. Cobel',
      airDate: 'Jan 17, 2025',
      dayOfWeek: 'Friday',
      timeSlot: '9:00 PM EST',
      network: 'Apple TV+',
      tag: 'Season Premiere',
      posterUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'sch-2',
      seriesId: 'the-last-of-us',
      seriesTitle: 'The Last of Us',
      seasonNumber: 2,
      episodeNumber: 1,
      episodeTitle: 'Seattle Day One',
      airDate: 'Spring 2025',
      dayOfWeek: 'Sunday',
      timeSlot: '9:00 PM EST',
      network: 'HBO Max',
      tag: 'Season Premiere',
      posterUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'sch-3',
      seriesId: 'shogun-s1',
      seriesTitle: 'Shōgun',
      seasonNumber: 2,
      episodeNumber: 1,
      episodeTitle: 'The Council of Regents',
      airDate: 'TBA 2025',
      dayOfWeek: 'Tuesday',
      timeSlot: '10:00 PM EST',
      network: 'FX',
      tag: 'Season Premiere',
      posterUrl: 'https://images.unsplash.com/photo-1528164344705-475647b2a1e5?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'sch-4',
      seriesId: 'arcane-s1',
      seriesTitle: 'Arcane',
      seasonNumber: 2,
      episodeNumber: 9,
      episodeTitle: 'The Hexgates Fall',
      airDate: 'Nov 23, 2024',
      dayOfWeek: 'Saturday',
      timeSlot: '3:00 AM EST',
      network: 'Netflix',
      tag: 'Season Finale',
      posterUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=400&q=80'
    }
  ];

  const days = ['All', 'Friday', 'Sunday', 'Saturday', 'Tuesday'];

  const filteredEvents = scheduleEvents.filter(ev => {
    if (selectedDay === 'All') return true;
    return ev.dayOfWeek === selectedDay;
  });

  const toggleReminder = (id: string) => {
    setReminders(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Page Title */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Calendar className="w-6 h-6 text-rose-500" />
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
            Episode Airing Schedule
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-zinc-400">
          Weekly air dates, season release calendars, and upcoming episode premieres.
        </p>
      </div>

      {/* Day Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {days.map(day => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
              selectedDay === day
                ? 'bg-rose-600 text-white shadow-md shadow-rose-950/40'
                : 'bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800'
            }`}
          >
            {day === 'All' ? 'All Days' : day}
          </button>
        ))}
      </div>

      {/* Schedule Timeline Cards */}
      <div className="space-y-4">
        {filteredEvents.map(event => {
          const series = seriesList.find(s => s.id === event.seriesId);
          const hasReminder = Boolean(reminders[event.id]);

          return (
            <div
              key={event.id}
              className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-5"
            >
              
              {/* Left thumbnail & series details */}
              <div className="flex items-center gap-4">
                <img
                  src={event.posterUrl}
                  alt={event.seriesTitle}
                  className="w-16 h-22 object-cover rounded-xl shrink-0 ring-1 ring-zinc-700 cursor-pointer"
                  onClick={() => series && onSelectSeries(series)}
                />

                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-heading font-bold text-lg text-white hover:text-rose-400 cursor-pointer transition-colors"
                      onClick={() => series && onSelectSeries(series)}>
                      {event.seriesTitle}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                      {event.tag}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 text-[10px] font-semibold border border-zinc-700">
                      {event.network}
                    </span>
                  </div>

                  <p className="text-sm font-medium text-zinc-300">
                    Season {event.seasonNumber}, Ep {event.episodeNumber}: &ldquo;{event.episodeTitle}&rdquo;
                  </p>

                  <div className="flex items-center gap-3 text-xs text-zinc-400 pt-0.5">
                    <span className="flex items-center gap-1 text-amber-300 font-semibold">
                      <Calendar className="w-3.5 h-3.5" />
                      {event.dayOfWeek}, {event.airDate}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {event.timeSlot}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right action controls */}
              <div className="flex items-center gap-3 w-full md:w-auto justify-end pt-2 md:pt-0 border-t md:border-t-0 border-zinc-800/60">
                <button
                  onClick={() => toggleReminder(event.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all border ${
                    hasReminder
                      ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300'
                      : 'bg-zinc-800 border-zinc-700 text-zinc-300 hover:text-white'
                  }`}
                >
                  {hasReminder ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Reminder Set</span>
                    </>
                  ) : (
                    <>
                      <Bell className="w-3.5 h-3.5" />
                      <span>Remind Me</span>
                    </>
                  )}
                </button>

                {series && (
                  <button
                    onClick={() => onOpenTrailer(series)}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-xs font-semibold text-zinc-200 transition-colors"
                  >
                    <Play className="w-3.5 h-3.5 text-rose-500" />
                    <span>Trailer</span>
                  </button>
                )}
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
