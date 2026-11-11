import React from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { sound } from '../utils/audio';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/5 py-12 bg-[#060712] relative z-10 text-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        {/* Soft closing line */}
        <p className="text-sm font-serif-dreamy text-slate-300 flex items-center justify-center gap-1.5 flex-wrap">
          <span>Created with</span>
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>specially for Mitva</span>
          <span aria-hidden="true" className="text-white/20">·</span>
          <span className="text-purple-300">11/11 to 12/11 Journey</span>
        </p>

        {/* Quiet Subtext */}
        <p className="text-xs text-slate-500 font-light max-w-md mx-auto">
          30 days of daily love, blooming memories, and unwavering support as you shift to your brand new city.
        </p>

        <div className="pt-2">
          <button
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              sound.playPop();
            }}
            className="text-xs text-slate-500 hover:text-amber-200 transition-colors"
          >
            Back to Top ↑
          </button>
        </div>
      </div>
    </footer>
  );
};
