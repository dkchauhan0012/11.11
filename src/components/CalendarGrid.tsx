import React, { useState } from 'react';
import {
  Sparkles,
  CheckCircle2,
  Calendar as CalendarIcon,
  Crown,
  Flower2,
  Scissors,
  Plane,
} from 'lucide-react';
import { CALENDAR_DAYS } from '../data/calendarData';
import { SurpriseDay, WeekCategory } from '../types';
import { sound } from '../utils/audio';

interface CalendarGridProps {
  completedDays: number[];
  onSelectDay: (day: SurpriseDay) => void;
}

export const CalendarGrid: React.FC<CalendarGridProps> = ({
  completedDays,
  onSelectDay,
}) => {
  const [selectedWeek, setSelectedWeek] = useState<number | 'all'>('all');
  const [categoryFilter, setCategoryFilter] = useState<WeekCategory | 'all'>('all');

  const filteredDays = CALENDAR_DAYS.filter((d) => {
    if (selectedWeek !== 'all' && d.weekNumber !== selectedWeek) return false;
    if (categoryFilter !== 'all' && d.category !== categoryFilter) return false;
    return true;
  });

  const getCategoryIcon = (category: WeekCategory) => {
    switch (category) {
      case 'flowers':
        return <Flower2 className="w-3.5 h-3.5 text-pink-300" />;
      case 'reality_tv':
        return <Crown className="w-3.5 h-3.5 text-amber-300" />;
      case 'crafts':
        return <Scissors className="w-3.5 h-3.5 text-cyan-300" />;
      case 'finale':
        return <Plane className="w-3.5 h-3.5 text-purple-300" />;
    }
  };

  return (
    <section id="calendar" className="py-16 md:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-medium text-amber-300">
              <CalendarIcon className="w-3.5 h-3.5" />
              <span>30-DAY DAILY SCRATCH & SURPRISE ROADMAP</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif-dreamy font-normal text-white">
              November 11 to December 11
            </h2>
            <p className="text-sm text-slate-400 max-w-xl font-light">
              All 30 days are fully unlocked for your journey! Tap any day to dive directly into its interactive activity, game, letter, or heartfelt milestone before your big move to your new city.
            </p>
          </div>

          {/* Interactive Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-white/[0.03] border border-white/10 rounded-xl">
            <button
              onClick={() => {
                sound.playPop();
                setSelectedWeek('all');
              }}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                selectedWeek === 'all'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All 30 Days
            </button>
            <button
              onClick={() => {
                sound.playPop();
                setSelectedWeek(1);
              }}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                selectedWeek === 1
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Week 1: Flowers
            </button>
            <button
              onClick={() => {
                sound.playPop();
                setSelectedWeek(2);
              }}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                selectedWeek === 2
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Week 2: Reality TV
            </button>
            <button
              onClick={() => {
                sound.playPop();
                setSelectedWeek(3);
              }}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                selectedWeek === 3
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Week 3: Crafts
            </button>
            <button
              onClick={() => {
                sound.playPop();
                setSelectedWeek(4);
              }}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                selectedWeek === 4
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Week 4: Finale
            </button>
          </div>
        </div>

        {/* 30-Day Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {filteredDays.map((day) => {
            const completed = completedDays.includes(day.dayNumber);

            return (
              <div
                key={day.dayNumber}
                onClick={() => {
                  sound.playPop();
                  onSelectDay(day);
                }}
                className="group relative rounded-2xl p-4 sm:p-5 border transition-all duration-300 cursor-pointer flex flex-col justify-between min-h-[12rem] h-auto select-none bg-[#0E1124] hover:bg-[#131733] border-white/10 hover:border-purple-400/50 shadow-md hover:shadow-purple-900/20 hover:-translate-y-1"
              >
                {/* Card Top Row: Clean Unboxed Metadata */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-mono-numbers font-semibold text-white">
                      Day {day.dayNumber}
                    </span>
                    <span aria-hidden="true" className="text-white/20">·</span>
                    <span className="text-slate-400">{day.displayDate}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {completed ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Sparkles className="w-4 h-4 text-amber-300 group-hover:rotate-12 transition-transform" />
                    )}
                  </div>
                </div>

                {/* Card Body */}
                <div className="space-y-1.5 my-auto">
                  <h3 className="text-base font-serif-dreamy leading-snug line-clamp-2 transition-colors text-white group-hover:text-amber-200">
                    {day.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 font-light">
                    {day.teaser}
                  </p>
                </div>

                {/* Card Footer: Category & Status */}
                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400">
                  <div className="flex items-center gap-1.5">
                    {getCategoryIcon(day.category)}
                    <span className="capitalize">{day.category.replace('_', ' ')}</span>
                  </div>

                  <span
                    className={`font-medium ${
                      completed
                        ? 'text-emerald-400'
                        : 'text-amber-300 group-hover:underline'
                    }`}
                  >
                    {completed ? 'Completed ✓' : 'Ready ✨'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
