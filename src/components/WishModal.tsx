import React, { useState } from 'react';
import { X, Sparkles, Star, Trash2, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { UserWish } from '../types';
import { FLOWER_BED_OPTIONS } from '../data/calendarData';
import { sound } from '../utils/audio';
import { sendActivityToWeb3Forms } from '../utils/web3forms';

interface WishModalProps {
  isOpen: boolean;
  onClose: () => void;
  wishes: UserWish[];
  onAddWish: (wish: UserWish) => void;
  onDeleteWish: (id: string) => void;
}

export const WishModal: React.FC<WishModalProps> = ({
  isOpen,
  onClose,
  wishes,
  onAddWish,
  onDeleteWish,
}) => {
  const [wishText, setWishText] = useState('');
  const [selectedFlower, setSelectedFlower] = useState(FLOWER_BED_OPTIONS[0].name);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!wishText.trim()) return;

    setIsSubmitting(true);
    sound.playWishBell();

    confetti({
      particleCount: 70,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#FDE68A', '#F472B6', '#C084FC', '#67E8F9'],
      disableForReducedMotion: true,
    });

    const newWish: UserWish = {
      id: `wish-${Date.now()}`,
      timestamp: Date.now(),
      text: wishText.trim(),
      flower: selectedFlower,
    };

    onAddWish(newWish);

    // Transmit to creator's email via Web3Forms
    sendActivityToWeb3Forms({
      activity: '11:11 Wish Cast into the Stars',
      message: `Mitva cast a wish with guardian flower: ${selectedFlower}`,
      details: {
        wish: newWish.text,
        flower: newWish.flower,
        timestamp: new Date().toISOString(),
      },
    });

    setWishText('');
    setTimeout(() => {
      setIsSubmitting(false);
    }, 400);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto bg-[#0C0E20] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => {
            sound.playPop();
            onClose();
          }}
          className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
          aria-label="Close Wish Jar"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-2 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-medium text-amber-300">
            <Star className="w-4 h-4 fill-amber-300" />
            <span>11:11 CELESTIAL WISH JAR</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif-dreamy font-normal text-white">
            Make your 11:11 Wish, Mitva
          </h2>
          <p className="text-sm text-purple-200/90 font-serif-dreamy italic leading-relaxed">
            “Make your 11:11 wish today... no matter where you go, every wish you make will find its way.”
          </p>
        </div>

        {/* Wish Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-2">
              Choose a Guardian Flower for this Wish:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {FLOWER_BED_OPTIONS.map((f) => {
                const isSelected = selectedFlower === f.name;
                return (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => {
                      sound.playPop();
                      setSelectedFlower(f.name);
                    }}
                    className={`p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-purple-950/50 border-amber-300/60 text-white shadow-sm'
                        : 'bg-white/[0.02] border-white/5 text-slate-300 hover:bg-white/5'
                    }`}
                  >
                    <span className="block font-medium truncate">{f.name}</span>
                    <span className="block text-[10px] text-slate-400 truncate">{f.meaning}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label htmlFor="wish-input" className="block text-xs font-medium text-slate-300 mb-2">
              Your Secret Wish / Dream (saved privately in your browser):
            </label>
            <textarea
              id="wish-input"
              rows={3}
              value={wishText}
              onChange={(e) => setWishText(e.target.value)}
              placeholder="What does your heart wish for on 11/11? A peaceful new city, wild adventures, lifelong friendships..."
              className="w-full px-4 py-3 bg-white/[0.03] border border-white/10 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-400 transition-colors resize-none"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting || !wishText.trim()}
            className="w-full py-3 px-4 bg-gradient-to-r from-amber-400 via-rose-400 to-purple-500 hover:from-amber-300 hover:to-purple-400 disabled:opacity-50 text-slate-950 font-semibold text-sm rounded-xl shadow-md transition-all active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-slate-950" />
            <span>Cast Wish into the Stars ✨</span>
          </button>
        </form>

        {/* Existing Wishes in Jar */}
        <div className="pt-4 border-t border-white/5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">
              Wishes Inside Mitva's Jar ({wishes.length})
            </span>
          </div>

          {wishes.length === 0 ? (
            <div className="p-4 rounded-xl bg-white/[0.02] border border-dashed border-white/10 text-center text-xs text-slate-400">
              Your jar is ready. Drop your first 11:11 wish above!
            </div>
          ) : (
            <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
              {wishes.map((w) => (
                <div
                  key={w.id}
                  className="p-3 rounded-xl bg-white/[0.03] border border-white/5 flex items-start justify-between gap-3 group hover:border-purple-500/20 transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-[11px] text-amber-300">
                      <Heart className="w-3 h-3 fill-amber-300" />
                      <span>{w.flower}</span>
                      <span aria-hidden="true" className="text-white/20">·</span>
                      <span className="text-slate-400 font-mono-numbers">
                        {new Date(w.timestamp).toLocaleDateString(undefined, {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                    <p className="text-xs text-slate-200 leading-relaxed font-serif-dreamy">
                      “{w.text}”
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      sound.playPop();
                      onDeleteWish(w.id);
                    }}
                    className="p-1.5 text-slate-500 hover:text-rose-400 transition-colors opacity-60 group-hover:opacity-100"
                    title="Remove wish"
                    aria-label="Delete wish"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
