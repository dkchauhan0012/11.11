import React, { useState, useEffect } from 'react';
import { Sparkles, Star, Calendar, Heart, Compass } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/audio';

interface HeroSectionProps {
  onOpenWishJar: () => void;
  unlockedCount: number;
  totalDays: number;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenWishJar,
  unlockedCount,
  totalDays,
}) => {
  // Countdown to December 11, 2026 (or 30 days from Nov 11)
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 30, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Target: Dec 11 of the target year at 00:00:00
    const now = new Date();
    // If current year is 2026 (or whichever year it is evaluated in), target Dec 11
    const currentYear = now.getFullYear();
    let target = new Date(currentYear, 11, 11, 0, 0, 0); // Month 11 is December
    if (now.getTime() > target.getTime()) {
      target = new Date(currentYear + 1, 11, 11, 0, 0, 0);
    }

    const updateCountdown = () => {
      const diff = target.getTime() - Date.now();
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleWishClick = (e: React.MouseEvent) => {
    sound.playWishBell();

    // Trigger celestial particle shower
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 50,
      spread: 70,
      origin: { x, y },
      colors: ['#FDE68A', '#F472B6', '#C084FC', '#FFFFFF'],
      disableForReducedMotion: true,
    });

    onOpenWishJar();
  };

  return (
    <section id="hero" className="relative pt-12 pb-16 md:pt-16 md:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Split Screen Hero Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Typographic Hierarchy & Actions */}
          <div className="lg:col-span-7 space-y-6">
            {/* Quiet 1-line kicker (no pills) */}
            <div className="flex items-center gap-2 text-xs font-medium text-amber-200/90 tracking-wide">
              <span>11/11 MAKE A WISH DAY</span>
              <span aria-hidden="true" className="text-white/30">·</span>
              <span>SPECIAL 30-DAY COUNTDOWN</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-serif-dreamy font-normal tracking-tight text-white text-balance leading-tight">
              Make a Wish, Mitva <span className="text-amber-300">✨</span>
              <span className="block text-2xl sm:text-3xl md:text-3xl text-purple-200/80 font-light mt-2">
                11:11 Special Edition
              </span>
            </h1>

            {/* Emotional Lead Copy */}
            <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed max-w-2xl">
              Today is 11/11, the day the universe pauses to listen. In exactly 30 days, on
              December 11th, you shift to your brand new city to begin an extraordinary new life.
              Here is a daily handmade surprise, blooming one day at a time, to keep you smiling
              and cherished every single day until moving day.
            </p>

            {/* Primary Interactive Affordance: Wish Jar Button */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={handleWishClick}
                className="group relative px-6 py-3.5 bg-gradient-to-r from-amber-400 via-rose-400 to-purple-500 hover:from-amber-300 hover:to-purple-400 text-slate-950 font-medium text-sm rounded-xl shadow-lg shadow-purple-950/40 hover:shadow-purple-500/25 transition-all duration-200 active:scale-95 flex items-center gap-3 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-slate-950 transition-transform group-hover:rotate-12" />
                <span className="font-semibold">Open 11:11 Wish Jar</span>
                <span className="text-xs bg-black/15 px-2 py-0.5 rounded text-slate-900 font-mono-numbers">
                  Make a Wish
                </span>
              </button>

              <a
                href="#calendar"
                onClick={() => sound.playPop()}
                className="px-5 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 font-medium text-sm rounded-xl transition-all duration-200 flex items-center gap-2"
              >
                <Calendar className="w-4 h-4 text-purple-300" />
                <span>Explore 30 Surprises</span>
              </a>
            </div>

            {/* Wish Affirmation Quote */}
            <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/15 backdrop-blur-sm max-w-xl">
              <p className="text-xs sm:text-sm text-purple-200/90 font-serif-dreamy italic leading-relaxed">
                “Make your 11:11 wish today... no matter where you go across the world, every wish you make with a full heart will always find its way.”
              </p>
            </div>
          </div>

          {/* Right Column: Visual Hero Container matching height */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-slate-900/40 group aspect-[4/3] sm:aspect-[16/10] lg:aspect-square flex items-center justify-center">
              {/* Generated Hero Asset */}
              <img
                src="/src/assets/images/hero_starry_night_jar_1794399249215.jpg"
                alt="Cosmic glass wish jar glowing with stardust under shooting stars"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />

              {/* Scrim Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#080914] via-[#080914]/20 to-transparent" />

              {/* Interactive Wish Jar Floating Button */}
              <button
                onClick={handleWishClick}
                className="absolute bottom-5 left-5 right-5 p-3.5 rounded-xl bg-[#0B0D1F]/85 backdrop-blur-md border border-amber-300/20 flex items-center justify-between text-left hover:border-amber-300/40 transition-colors cursor-pointer group/btn"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-amber-400/20 flex items-center justify-center text-amber-300 shrink-0">
                    <Star className="w-5 h-5 fill-amber-300/40" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-white group-hover/btn:text-amber-200 transition-colors">
                      Interactive Cosmic Jar
                    </p>
                    <p className="text-[11px] text-slate-300">Tap to drop a glowing wish stone</p>
                  </div>
                </div>
                <span className="text-amber-300 text-xs font-medium pr-1">Drop Wish →</span>
              </button>
            </div>
          </div>
        </div>

        {/* Countdown Strip & Milestones (Full-width row below the split) */}
        <div className="mt-12 pt-8 border-t border-white/5">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Countdown Title */}
            <div className="md:col-span-4 space-y-1">
              <span className="text-xs font-medium text-purple-300 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-purple-400" />
                COUNTDOWN TO SHIFTING DAY (11 DEC 2026)
              </span>
              <p className="text-sm text-slate-300">
                Time until you unpack in your brand new city & room
              </p>
            </div>

            {/* Countdown Units */}
            <div className="md:col-span-5 grid grid-cols-4 gap-2 sm:gap-3 md:gap-4">
              <div className="p-2 sm:p-3 rounded-xl bg-white/[0.03] border border-white/10 text-center">
                <span className="block text-xl sm:text-2xl md:text-3xl font-mono-numbers font-semibold text-white">
                  {String(timeLeft.days).padStart(2, '0')}
                </span>
                <span className="text-[9px] sm:text-[11px] text-slate-400 uppercase tracking-wider">Days</span>
              </div>
              <div className="p-2 sm:p-3 rounded-xl bg-white/[0.03] border border-white/10 text-center">
                <span className="block text-xl sm:text-2xl md:text-3xl font-mono-numbers font-semibold text-white">
                  {String(timeLeft.hours).padStart(2, '0')}
                </span>
                <span className="text-[9px] sm:text-[11px] text-slate-400 uppercase tracking-wider">Hours</span>
              </div>
              <div className="p-2 sm:p-3 rounded-xl bg-white/[0.03] border border-white/10 text-center">
                <span className="block text-xl sm:text-2xl md:text-3xl font-mono-numbers font-semibold text-white">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </span>
                <span className="text-[9px] sm:text-[11px] text-slate-400 uppercase tracking-wider">Mins</span>
              </div>
              <div className="p-2 sm:p-3 rounded-xl bg-white/[0.03] border border-white/10 text-center">
                <span className="block text-xl sm:text-2xl md:text-3xl font-mono-numbers font-semibold text-white">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </span>
                <span className="text-[9px] sm:text-[11px] text-slate-400 uppercase tracking-wider">Secs</span>
              </div>
            </div>

            {/* Progress metric */}
            <div className="md:col-span-3 p-3.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-300">
                <span>Journey Progress</span>
                <span className="font-mono-numbers text-amber-300 font-semibold">
                  {unlockedCount} / {totalDays} Days Unlocked
                </span>
              </div>
              <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-amber-400 to-purple-400 h-full rounded-full transition-all duration-500"
                  style={{ width: `${Math.max(5, (unlockedCount / totalDays) * 100)}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
