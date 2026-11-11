import React, { useState } from 'react';
import { Volume2, VolumeX, Sparkles, Menu, X } from 'lucide-react';
import { sound } from '../utils/audio';

interface HeaderProps {
  isMuted: boolean;
  setIsMuted: (muted: boolean) => void;
  isAmbientPlaying: boolean;
  setIsAmbientPlaying: (playing: boolean) => void;
  onOpenWishJar: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  isMuted,
  setIsMuted,
  isAmbientPlaying,
  setIsAmbientPlaying,
  onOpenWishJar,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleToggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    sound.setMute(next);
    if (!next) {
      sound.playPop();
    }
  };

  const handleToggleAmbient = () => {
    const playing = sound.toggleAmbientMusic();
    setIsAmbientPlaying(playing);
    sound.playPop();
  };

  const handleNavClick = () => {
    sound.playPop();
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#080914]/85 border-b border-white/5 transition-colors">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2 sm:gap-4 md:gap-8">
        {/* Zone 1: Brand Wordmark */}
        <a
          href="#hero"
          className="text-sm sm:text-lg font-serif-dreamy font-semibold tracking-tight text-white hover:text-purple-200 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 sm:gap-2"
        >
          <span className="text-amber-300">✨</span>
          <span className="hidden sm:inline">Mitva's 11:11 Journey</span>
          <span className="sm:hidden font-medium">Mitva · 11:11</span>
        </a>

        {/* Zone 2: 4 Clean Single-Line Nav Links (Desktop & Tablet) */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-xs font-medium text-slate-300">
          <a
            href="#hero"
            className="hover:text-purple-200 transition-colors whitespace-nowrap shrink-0"
          >
            11:11 Wish Jar
          </a>
          <a
            href="#calendar"
            className="hover:text-purple-200 transition-colors whitespace-nowrap shrink-0"
          >
            30-Day Calendar
          </a>
          <a
            href="#garden"
            className="hover:text-purple-200 transition-colors whitespace-nowrap shrink-0"
          >
            Blooming Bed
          </a>
          <a
            href="#vault"
            className="hover:text-purple-200 transition-colors whitespace-nowrap shrink-0"
          >
            Memory Vault
          </a>
        </nav>

        {/* Zone 3: Functional Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* Ambient Music / Soundscape button */}
          <button
            onClick={handleToggleAmbient}
            title={isAmbientPlaying ? 'Pause starry ambient soundscape' : 'Play starry ambient soundscape'}
            className={`p-1.5 sm:p-2 rounded-lg border text-xs transition-all whitespace-nowrap shrink-0 cursor-pointer ${
              isAmbientPlaying
                ? 'bg-purple-500/20 border-purple-500/40 text-purple-200 animate-pulse'
                : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
            }`}
            aria-label="Toggle ambient soundscape"
          >
            <Sparkles className="w-4 h-4 text-purple-300" />
          </button>

          {/* Master sound mute button */}
          <button
            onClick={handleToggleMute}
            title={isMuted ? 'Unmute sounds' : 'Mute sounds'}
            className="p-1.5 sm:p-2 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 transition-all shrink-0 cursor-pointer"
            aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-purple-300" />}
          </button>

          {/* Primary CTA */}
          <button
            onClick={onOpenWishJar}
            className="px-2.5 sm:px-3.5 py-1.5 bg-gradient-to-r from-amber-400/90 to-purple-500/90 hover:from-amber-400 hover:to-purple-500 text-slate-950 font-medium text-xs rounded-lg shadow-sm hover:shadow-purple-500/20 transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer"
          >
            <span className="hidden sm:inline">Make 11:11 Wish</span>
            <span className="sm:hidden font-semibold">Wish ✨</span>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => {
              sound.playPop();
              setIsMobileMenuOpen(!isMobileMenuOpen);
            }}
            className="md:hidden p-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer shrink-0"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#0B0D1F]/95 backdrop-blur-xl px-4 py-4 space-y-3 animate-fade-in">
          <div className="grid grid-cols-2 gap-2 text-xs">
            <a
              href="#hero"
              onClick={handleNavClick}
              className="p-2.5 rounded-xl bg-white/[0.04] border border-white/5 text-slate-200 hover:text-white hover:bg-white/10 transition-colors flex items-center gap-2"
            >
              <span>✨</span>
              <span>11:11 Wish Jar</span>
            </a>
            <a
              href="#calendar"
              onClick={handleNavClick}
              className="p-2.5 rounded-xl bg-white/[0.04] border border-white/5 text-slate-200 hover:text-white hover:bg-white/10 transition-colors flex items-center gap-2"
            >
              <span>📅</span>
              <span>30 Surprises</span>
            </a>
            <a
              href="#garden"
              onClick={handleNavClick}
              className="p-2.5 rounded-xl bg-white/[0.04] border border-white/5 text-slate-200 hover:text-white hover:bg-white/10 transition-colors flex items-center gap-2"
            >
              <span>🌸</span>
              <span>Blooming Bed</span>
            </a>
            <a
              href="#vault"
              onClick={handleNavClick}
              className="p-2.5 rounded-xl bg-white/[0.04] border border-white/5 text-slate-200 hover:text-white hover:bg-white/10 transition-colors flex items-center gap-2"
            >
              <span>📖</span>
              <span>Memory Vault</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
