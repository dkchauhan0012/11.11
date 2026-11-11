import React, { useState, useEffect } from 'react';
import {
  X,
  Sparkles,
  Heart,
  Star,
  CheckCircle2,
  Calendar,
  Volume2,
  Crown,
  Flower2,
  Lock,
  Gift,
  Coins,
  ShieldCheck,
  Award,
  Send,
  Plane,
  Download,
  Share2,
  Sun,
  Flame,
  Scissors,
  Layers,
  Palette,
  Armchair,
  BookOpen,
  Feather,
  RefreshCw,
  Sliders,
  Check,
  Music,
  BellRing,
  Smile,
  Compass,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { SurpriseDay } from '../types';
import { sound } from '../utils/audio';
import { sendActivityToWeb3Forms } from '../utils/web3forms';

interface SurpriseModalProps {
  day: SurpriseDay | null;
  onClose: () => void;
  onMarkCompleted: (dayNumber: number) => void;
  isCompleted: boolean;
}

export const SurpriseModal: React.FC<SurpriseModalProps> = ({
  day,
  onClose,
  onMarkCompleted,
  isCompleted,
}) => {
  // --- INDIVIDUAL DAY STATES ---
  // Day 1: Flower bed
  const [day1Wish, setDay1Wish] = useState('');
  const [day1Flower, setDay1Flower] = useState('Cosmic Lotus');
  const [day1Planted, setDay1Planted] = useState(false);

  // Day 2: 3D Origami Lily
  const [origamiColor, setOrigamiColor] = useState('#F8FAFC');
  const [origamiStep, setOrigamiStep] = useState(0);

  // Day 3: Bigg Boss Captaincy Task
  const [evictedBadVibes, setEvictedBadVibes] = useState<string[]>([]);
  const [chaiSpicesAdded, setChaiSpicesAdded] = useState<string[]>([]);
  const [sirenPressed, setSirenPressed] = useState(false);

  // Day 4: Bouquet Flowers
  const [selectedBouquetFlower, setSelectedBouquetFlower] = useState<number>(0);
  const [favoriteFlowerSaved, setFavoriteFlowerSaved] = useState(false);

  // Day 5: Scrapbook
  const [scrapbookStickers, setScrapbookStickers] = useState<Array<{ id: number; icon: string; x: number; y: number }>>([
    { id: 1, icon: '🌸', x: 20, y: 30 },
    { id: 2, icon: '✨', x: 80, y: 25 },
  ]);
  const [scrapbookCaption, setScrapbookCaption] = useState('Our laughter that crossed all borders.');
  const [scrapbookSaved, setScrapbookSaved] = useState(false);

  // Day 6: Secret Room Keypad
  const [keypadInput, setKeypadInput] = useState('');
  const [secretUnlocked, setSecretUnlocked] = useState(false);
  const [secretError, setSecretError] = useState(false);
  const [secretReply, setSecretReply] = useState('');
  const [secretReplySent, setSecretReplySent] = useState(false);

  // Day 7: Weekend DIY Bookmark Studio
  const [bookmarkColor, setBookmarkColor] = useState<'indigo' | 'kraft' | 'cream'>('indigo');
  const [bookmarkFlowers, setBookmarkFlowers] = useState<string[]>(['Chamomile', 'Fern']);
  const [bookmarkTassel, setBookmarkTassel] = useState('Starlight Gold');
  const [bookmarkDedication, setBookmarkDedication] = useState('To quiet Sundays & bold dreams');
  const [bookmarkSaved, setBookmarkSaved] = useState(false);

  // Day 8: Weekend Ka Vaar Poll
  const [pollVoted, setPollVoted] = useState<string | null>(null);

  // Day 9: Pressed Flower Frame Maker
  const [frameStyle, setFrameStyle] = useState<'gilded' | 'obsidian' | 'wood'>('gilded');
  const [framePetals, setFramePetals] = useState<string[]>(['Hydrangea', 'Lavender', 'Golden Foil']);
  const [frameDedication, setFrameDedication] = useState('For Mitva, who blooms wherever she walks.');
  const [frameSaved, setFrameSaved] = useState(false);

  // Day 10: Confession Room
  const [confessionMood, setConfessionMood] = useState('Nostalgic & Hopeful');
  const [confessionText, setConfessionText] = useState('');
  const [confessionSaved, setConfessionSaved] = useState(false);

  // Day 11: Friendship Braid Weaver
  const [braidStep, setBraidStep] = useState(1);
  const [braidCharm, setBraidCharm] = useState('Star 🌟');

  // Day 12: Wildflower Mood Tracker
  const [loggedMood, setLoggedMood] = useState<string | null>(null);
  const [moodNote, setMoodNote] = useState('');
  const [moodSaved, setMoodSaved] = useState(false);

  // Day 13: Immunity Pass
  const [immunityFlipped, setImmunityFlipped] = useState(false);
  const [immunityClaimed, setImmunityClaimed] = useState(false);

  // Day 14: Halfway Grand Bouquet Assembly
  const [bouquetVaseFlowers, setBouquetVaseFlowers] = useState<number[]>([0, 1, 2]);

  // Day 15: Luxury Budget Task
  const [budgetCoins, setBudgetCoins] = useState(100);
  const [purchasedRewards, setPurchasedRewards] = useState<string[]>([]);

  // Day 16: Daisy Flip Book
  const [flipStep, setFlipStep] = useState(0);

  // Day 17: Pattern Unscramble
  const [puzzleWord, setPuzzleWord] = useState('BLOOM');
  const [scrambledLetters, setScrambledLetters] = useState(['O', 'B', 'M', 'L', 'O']);
  const [puzzleSolved, setPuzzleSolved] = useState(false);

  // Day 18: Golden Buzzer
  const [buzzerPressed, setBuzzerPressed] = useState(false);

  // Day 19: Midnight Jasmine Audio Lounge
  const [audioAmbiance, setAudioAmbiance] = useState<'rain' | 'crickets' | 'chords'>('chords');
  const [nightThought, setNightThought] = useState('');
  const [nightThoughtSent, setNightThoughtSent] = useState(false);

  // Day 20: Glass Terrarium Memory Jar
  const [terrariumItems, setTerrariumItems] = useState<Array<{ id: number; icon: string; name: string }>>([
    { id: 1, icon: '💎', name: 'Laughter Gem' },
    { id: 2, icon: '🌿', name: 'Cozy Moss' },
  ]);
  const [terrariumSealed, setTerrariumSealed] = useState(false);

  // Day 21: 10 Days To Go Bigg Boss Call
  const [pledgeChecked, setPledgeChecked] = useState([true, false, false]);
  const [pledgeSigned, setPledgeSigned] = useState(false);

  // Day 22: Pressed Rose Wax Stamp
  const [waxStep, setWaxStep] = useState<0 | 1 | 2>(0);

  // Day 23: Reality Show Award Trophy Ceremony
  const [speechText, setSpeechText] = useState('');
  const [trophyAccepted, setTrophyAccepted] = useState(false);

  // Day 24: Sunflower Hope Box
  const [openedDrawer, setOpenedDrawer] = useState<number | null>(null);
  const [hugSent, setHugSent] = useState(false);

  // Day 25: 5-Day Finalist Countdown
  const [finalistActiveCard, setFinalistActiveCard] = useState(0);
  const [finalistFavorite, setFinalistFavorite] = useState<string | null>(null);

  // Day 26: Crafting a Dreamcatcher
  const [dreamcatcherFeathers, setDreamcatcherFeathers] = useState<number[]>([]);
  const [dreamBlessed, setDreamBlessed] = useState(false);

  // Day 27: Bigg Boss Flashback Episode
  const [flashbackEpisode, setFlashbackEpisode] = useState(0);
  const [flashbackFavorite, setFlashbackFavorite] = useState('');
  const [flashbackSaved, setFlashbackSaved] = useState(false);

  // Day 28: Cherry Blossom Farewell Letter
  const [sakuraTucked, setSakuraTucked] = useState(false);

  // Day 29: Calm Lounge Breathing Guide
  const [breathPhase, setBreathPhase] = useState<'Inhale' | 'Hold' | 'Exhale'>('Inhale');

  useEffect(() => {
    // Reset temporary states on modal open
    setOrigamiStep(0);
    setKeypadInput('');
    setSecretUnlocked(false);
    setSecretError(false);
    setBuzzerPressed(false);
    setWaxStep(0);
    setImmunityClaimed(false);
    setFavoriteFlowerSaved(false);
    setBookmarkSaved(false);
    setFrameSaved(false);
    setMoodSaved(false);
    setNightThoughtSent(false);
    setTerrariumSealed(false);
    setPledgeSigned(false);
    setTrophyAccepted(false);
    setDreamBlessed(false);
    setFlashbackSaved(false);
    setSakuraTucked(false);

    // Load saved confession if any
    if (day?.dayNumber === 10) {
      const saved = localStorage.getItem('mitva_confession_day10');
      if (saved) {
        setConfessionText(saved);
        setConfessionSaved(true);
      }
    }
  }, [day]);

  // Breathing loop for Day 29
  useEffect(() => {
    if (day?.dayNumber !== 29) return;
    const interval = setInterval(() => {
      setBreathPhase((prev) => {
        if (prev === 'Inhale') return 'Hold';
        if (prev === 'Hold') return 'Exhale';
        return 'Inhale';
      });
    }, 4000);
    return () => clearInterval(interval);
  }, [day?.dayNumber]);

  if (!day) return null;

  const handleComplete = () => {
    sound.playWishBell();
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FDE68A', '#F472B6', '#C084FC'],
      disableForReducedMotion: true,
    });
    onMarkCompleted(day.dayNumber);

    sendActivityToWeb3Forms({
      activity: `Day ${day.dayNumber} Completed`,
      dayNumber: day.dayNumber,
      message: `Mitva completed Day ${day.dayNumber}: "${day.title}" (${day.theme})`,
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl my-8 bg-[#0C0E20] border border-white/10 rounded-2xl p-5 sm:p-8 shadow-2xl space-y-6 text-white max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-start justify-between gap-4 border-b border-white/5 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-medium text-amber-300">
              <span>DAY {day.dayNumber} OF 30</span>
              <span aria-hidden="true" className="text-white/20">·</span>
              <span className="text-purple-300">{day.displayDate} 2026</span>
              <span aria-hidden="true" className="text-white/20">·</span>
              <span className="text-slate-400 capitalize">{day.category.replace('_', ' ')}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif-dreamy font-normal text-white">
              {day.title}
            </h2>
            <p className="text-xs text-slate-400">{day.meaning}</p>
          </div>

          <button
            onClick={() => {
              sound.playPop();
              onClose();
            }}
            className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors cursor-pointer shrink-0"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* --- DEDICATED BESPOKE ACTIVITY FOR EVERY SINGLE DAY --- */}

        {/* DAY 1: 11:11 Wishing Flower Bed */}
        {day.dayNumber === 1 && (
          <div className="space-y-5">
            <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-500/20 text-xs sm:text-sm text-purple-200/90 leading-relaxed font-serif-dreamy italic">
              “Welcome to Day 1, Mitva! Today is 11/11, Make a Wish Day. Pick a guardian flower, type your 11:11 wish, and plant it in your digital starlight bed.”
            </div>

            <div className="space-y-3">
              <label className="block text-xs font-medium text-slate-300">Choose Guardian Bloom:</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { name: 'Cosmic Lotus', vibe: 'Divine Beginnings', icon: '🌸' },
                  { name: 'Golden Sunflower', vibe: 'Endless Warmth', icon: '🌻' },
                  { name: 'Twilight Lavender', vibe: 'Peaceful Calm', icon: '🪻' },
                  { name: 'Stardust Daisy', vibe: 'Joyful Innocence', icon: '🌼' },
                ].map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      sound.playPop();
                      setDay1Flower(item.name);
                    }}
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                      day1Flower === item.name
                        ? 'bg-purple-900/40 border-amber-300/60 text-white'
                        : 'bg-white/[0.02] border-white/5 text-slate-400 hover:text-white'
                    }`}
                  >
                    <span className="text-2xl block mb-1">{item.icon}</span>
                    <span className="text-xs font-medium block">{item.name}</span>
                    <span className="text-[10px] text-slate-400 block">{item.vibe}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-medium text-slate-300">Type Your 11:11 Wish:</label>
              <textarea
                rows={3}
                value={day1Wish}
                onChange={(e) => setDay1Wish(e.target.value)}
                placeholder="What is your heart whispering for this 30-day journey and your flight on Dec 11?"
                className="w-full p-3.5 bg-white/[0.03] border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 outline-none focus:border-purple-400"
              />
            </div>

            <button
              onClick={() => {
                if (!day1Wish.trim()) return;
                sound.playWishBell();
                setDay1Planted(true);
                confetti({ particleCount: 70, spread: 80 });

                sendActivityToWeb3Forms({
                  activity: 'Day 1: 11:11 Wish Planted',
                  dayNumber: 1,
                  message: `Mitva planted a ${day1Flower} with wish: "${day1Wish}"`,
                  details: { flower: day1Flower, wish: day1Wish },
                });
              }}
              disabled={!day1Wish.trim() || day1Planted}
              className="w-full py-3 bg-gradient-to-r from-amber-400 to-purple-500 hover:from-amber-300 hover:to-purple-400 disabled:opacity-50 text-slate-950 font-semibold text-xs rounded-xl shadow cursor-pointer flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-slate-950" />
              <span>{day1Planted ? 'Flower Blooming in Bed ✨' : 'Plant Seed & Lock 11:11 Wish'}</span>
            </button>
          </div>
        )}

        {/* DAY 2: VIRTUAL DIY ORIGAMI LILY */}
        {day.dayNumber === 2 && (
          <div className="space-y-5">
            <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-500/20 text-xs text-purple-200">
              <strong>Interactive Paper Folding:</strong> Select your paper color and fold step-by-step into a 3D blooming Lily!
            </div>

            <div className="flex items-center justify-between text-xs text-slate-300">
              <span>Choose Paper Color:</span>
              <div className="flex items-center gap-2">
                {[
                  { name: 'Pure Pearl', hex: '#F8FAFC' },
                  { name: 'Sakura Pink', hex: '#F472B6' },
                  { name: 'Celestial Lilac', hex: '#C084FC' },
                  { name: 'Sunlight Amber', hex: '#FDE68A' },
                ].map((c) => (
                  <button
                    key={c.name}
                    onClick={() => {
                      sound.playPop();
                      setOrigamiColor(c.hex);
                    }}
                    className={`w-6 h-6 rounded-full border-2 transition-all cursor-pointer ${
                      origamiColor === c.hex ? 'scale-125 border-white shadow-md' : 'border-transparent'
                    }`}
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                  />
                ))}
              </div>
            </div>

            <div className="relative p-8 rounded-2xl bg-[#080A1A] border border-white/10 flex flex-col items-center justify-center min-h-[280px] overflow-hidden select-none">
              {origamiStep === 0 && (
                <div
                  onClick={() => {
                    sound.playPaperFold();
                    setOrigamiStep(1);
                  }}
                  className="w-44 h-44 rounded-sm shadow-2xl relative cursor-pointer group hover:scale-105 transition-transform"
                  style={{ backgroundColor: origamiColor }}
                >
                  <div className="absolute inset-0 border-t border-purple-600/40 rotate-45 origin-top-left translate-y-20 pointer-events-none" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center text-slate-800 text-xs">
                    <span className="font-semibold">Square Paper Sheet</span>
                    <span className="text-[10px] text-purple-700 mt-1 animate-pulse">
                      Tap corner to fold diagonal crease →
                    </span>
                  </div>
                </div>
              )}

              {origamiStep === 1 && (
                <div
                  onClick={() => {
                    sound.playPaperFold();
                    setOrigamiStep(2);
                  }}
                  className="w-44 h-44 relative cursor-pointer"
                >
                  <div
                    className="w-0 h-0 border-l-[88px] border-l-transparent border-r-[88px] border-r-transparent border-b-[176px] mx-auto filter drop-shadow-xl"
                    style={{ borderBottomColor: origamiColor }}
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-slate-800 text-xs pt-10">
                    <span className="font-semibold">Triangle Valley Fold</span>
                    <span className="text-[10px] text-purple-800 mt-1 animate-pulse">
                      Tap to squash fold left & right wings →
                    </span>
                  </div>
                </div>
              )}

              {origamiStep === 2 && (
                <div
                  onClick={() => {
                    sound.playPaperFold();
                    setOrigamiStep(3);
                  }}
                  className="w-40 h-52 relative cursor-pointer"
                >
                  <div
                    className="w-full h-full rounded-b-3xl shadow-2xl border-t-2 border-purple-300/30 flex flex-col items-center justify-center p-3 text-center text-slate-900"
                    style={{ backgroundColor: origamiColor }}
                  >
                    <span className="font-semibold text-xs">Kite Petal Base</span>
                    <span className="text-[10px] text-purple-900 mt-1 animate-pulse">
                      Creases locked! Tap to shape petal tips →
                    </span>
                  </div>
                </div>
              )}

              {origamiStep === 3 && (
                <div
                  onClick={() => {
                    sound.playWishBell();
                    confetti({ particleCount: 80, spread: 90 });
                    setOrigamiStep(4);

                    sendActivityToWeb3Forms({
                      activity: 'Day 2: Virtual DIY Origami Lily Bloomed',
                      dayNumber: 2,
                      message: `Mitva completed all folds and bloomed a custom 3D Origami Lily with color ${origamiColor}`,
                    });
                  }}
                  className="w-40 h-48 relative cursor-pointer"
                >
                  <div
                    className="w-full h-full rounded-b-full shadow-2xl flex flex-col items-center justify-center p-4 text-center text-slate-900 border-2 border-dashed border-amber-400"
                    style={{ backgroundColor: origamiColor }}
                  >
                    <span className="font-bold text-xs">Ready to Bloom</span>
                    <span className="text-[11px] text-amber-900 font-semibold mt-2 animate-bounce">
                      ✨ Tap to Bloom the Lily! ✨
                    </span>
                  </div>
                </div>
              )}

              {origamiStep === 4 && (
                <div className="space-y-4 text-center animate-fade-in">
                  <svg viewBox="0 0 100 100" className="w-36 h-36 mx-auto drop-shadow-2xl animate-float">
                    <path d="M50 10 Q65 35 50 60 Q35 35 50 10" fill={origamiColor} opacity="0.95" />
                    <path d="M10 50 Q35 65 60 50 Q35 35 10 50" fill={origamiColor} opacity="0.9" />
                    <path d="M90 50 Q65 65 40 50 Q65 35 90 50" fill={origamiColor} opacity="0.9" />
                    <path d="M50 90 Q65 65 50 40 Q35 65 50 90" fill={origamiColor} opacity="0.95" />
                    <circle cx="50" cy="50" r="5" fill="#FDE68A" />
                    <line x1="50" y1="50" x2="42" y2="38" stroke="#F59E0B" strokeWidth="1.5" />
                    <line x1="50" y1="50" x2="58" y2="38" stroke="#F59E0B" strokeWidth="1.5" />
                  </svg>
                  <p className="text-sm font-serif-dreamy text-amber-200 font-bold">
                    3D Origami White Lily Bloomed!
                  </p>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Stage: {origamiStep + 1} of 5</span>
              <button
                onClick={() => {
                  sound.playPop();
                  setOrigamiStep(0);
                }}
                className="text-amber-300 hover:text-amber-200 flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Fold Again</span>
              </button>
            </div>
          </div>
        )}

        {/* DAY 3: BIGG BOSS CAPTAINCY TASK */}
        {day.dayNumber === 3 && (
          <div className="space-y-5">
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200 leading-relaxed">
              <strong>Bigg Boss Announcement:</strong> “Mitva, house captaincy ke liye 3 tasks pure kijiye. Evict negative thoughts, claim your tea, and hit the alarm!”
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
              <span className="text-xs font-semibold text-white block">Task 1: Evict Bad Vibes:</span>
              <div className="flex flex-wrap gap-2">
                {['Overthinking 🧠', 'Fear of Distance ✈️', 'Self-Doubt 💭'].map((vibe) => {
                  const evicted = evictedBadVibes.includes(vibe);
                  return (
                    <button
                      key={vibe}
                      onClick={() => {
                        sound.playPop();
                        if (evicted) {
                          setEvictedBadVibes(evictedBadVibes.filter((v) => v !== vibe));
                        } else {
                          setEvictedBadVibes([...evictedBadVibes, vibe]);
                        }
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                        evicted
                          ? 'bg-rose-950/60 border-rose-500/50 text-rose-300 line-through opacity-70'
                          : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
                      }`}
                    >
                      {evicted ? `Evicted ✓` : `Evict: ${vibe}`}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
              <span className="text-xs font-semibold text-white block">Task 2: Brew Immunity Chai:</span>
              <div className="flex flex-wrap gap-2">
                {['Crushed Cardamom 🌿', 'Fresh Ginger 🫚', 'Unlimited Love 💖'].map((spice) => {
                  const added = chaiSpicesAdded.includes(spice);
                  return (
                    <button
                      key={spice}
                      onClick={() => {
                        sound.playPop();
                        if (added) {
                          setChaiSpicesAdded(chaiSpicesAdded.filter((s) => s !== spice));
                        } else {
                          setChaiSpicesAdded([...chaiSpicesAdded, spice]);
                        }
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                        added
                          ? 'bg-amber-400/20 border-amber-300/40 text-amber-200'
                          : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
                      }`}
                    >
                      {added ? `Added ✓` : `Add: ${spice}`}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
              <span className="text-xs font-semibold text-white">Task 3: Sound the Siren Alarm:</span>
              <button
                onClick={() => {
                  sound.playBuzzer();
                  setSirenPressed(true);
                  if (evictedBadVibes.length >= 2 && chaiSpicesAdded.length >= 2) {
                    sound.playFanfare();
                    confetti({ particleCount: 70 });

                    sendActivityToWeb3Forms({
                      activity: 'Day 3: Bigg Boss Captaincy Won',
                      dayNumber: 3,
                      message: 'Mitva completed all 3 captaincy challenges and won the House Captain badge!',
                    });
                  }
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  sirenPressed ? 'bg-amber-400 text-slate-950 shadow-lg' : 'bg-rose-600 hover:bg-rose-500 text-white'
                }`}
              >
                {sirenPressed ? 'Siren Sounded 🚨' : 'Press Siren Alarm 🚨'}
              </button>
            </div>
          </div>
        )}

        {/* DAY 4: FLORA-GRAPHY BOUQUET */}
        {day.dayNumber === 4 && (
          <div className="space-y-5">
            <p className="text-xs text-slate-300">Click each bloom in the bouquet to reveal its secret message:</p>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {[
                { name: 'Hydrangea', icon: '🪻' },
                { name: 'Sunflower', icon: '🌻' },
                { name: 'Purple Tulip', icon: '🌷' },
                { name: 'White Lily', icon: '🪷' },
                { name: 'Wild Lavender', icon: '🌾' },
              ].map((f, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    sound.playPop();
                    setSelectedBouquetFlower(idx);
                  }}
                  className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                    selectedBouquetFlower === idx
                      ? 'bg-purple-900/40 border-purple-400 text-white'
                      : 'bg-white/[0.02] border-white/5 text-slate-400 hover:text-white'
                  }`}
                >
                  <span className="text-2xl block mb-1">{f.icon}</span>
                  <span className="text-xs font-medium block">{f.name}</span>
                </button>
              ))}
            </div>

            <div className="p-5 rounded-xl bg-white/[0.03] border border-white/10 space-y-3 font-serif-dreamy animate-fade-in">
              <span className="text-[11px] font-sans font-semibold text-amber-300 uppercase tracking-wider block">
                Hidden Meaning
              </span>
              <p className="text-sm text-purple-200 leading-relaxed italic">
                {
                  [
                    '“Hydrangea: Deep gratitude. Thank you for making even mundane days feel like poetry.”',
                    '“Sunflower: Unwavering warmth. You bring pure sunshine into every room you enter.”',
                    '“Purple Tulip: Artistic soul. Your aesthetics and authentic spirit set you apart.”',
                    '“White Lily: Purity and grace. Go forward with confidence. You are deeply cherished.”',
                    '“Lavender: Calm amidst the winds. Breathe easy; you are destined for wonderful things.”',
                  ][selectedBouquetFlower]
                }
              </p>
            </div>

            <button
              onClick={() => {
                sound.playWishBell();
                setFavoriteFlowerSaved(true);
                confetti({ particleCount: 30 });

                sendActivityToWeb3Forms({
                  activity: 'Day 4: Flora-Graphy Flower Chosen',
                  dayNumber: 4,
                  message: `Mitva selected bouquet flower index: ${selectedBouquetFlower}`,
                });
              }}
              className="w-full py-2.5 bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold rounded-xl cursor-pointer"
            >
              {favoriteFlowerSaved ? 'Flower Meaning Cherished ✓' : 'Keep This Flower in Your Heart'}
            </button>
          </div>
        )}

        {/* DAY 5: DIGITAL SCRAPBOOK */}
        {day.dayNumber === 5 && (
          <div className="space-y-4">
            <p className="text-xs text-slate-300">Place stickers and write a polaroid caption on Page 1:</p>
            <div className="relative p-6 rounded-2xl bg-[#14172E] border border-white/10 space-y-4 min-h-[220px]">
              <div className="flex items-center justify-between">
                <span className="text-xs font-serif-dreamy text-amber-300">Scrapbook Page #1</span>
                <div className="flex items-center gap-1.5">
                  {['🌸', '🎀', '✨', '📸', '☕'].map((emoji) => (
                    <button
                      key={emoji}
                      onClick={() => {
                        sound.playPop();
                        setScrapbookStickers([
                          ...scrapbookStickers,
                          {
                            id: Date.now(),
                            icon: emoji,
                            x: Math.floor(Math.random() * 70) + 10,
                            y: Math.floor(Math.random() * 60) + 15,
                          },
                        ]);
                      }}
                      className="p-1 rounded bg-white/5 hover:bg-white/10 text-sm cursor-pointer"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              <div className="max-w-sm mx-auto p-4 bg-white/5 border border-white/10 rounded-xl space-y-2 text-center">
                <div className="w-full h-28 bg-slate-900 rounded-lg flex items-center justify-center text-4xl">
                  🫂🌸
                </div>
                <input
                  type="text"
                  value={scrapbookCaption}
                  onChange={(e) => setScrapbookCaption(e.target.value)}
                  className="w-full text-center text-xs text-amber-200 bg-transparent border-b border-white/20 pb-1 outline-none font-serif-dreamy italic"
                />
              </div>

              {scrapbookStickers.map((s) => (
                <span key={s.id} className="absolute text-xl pointer-events-none" style={{ left: `${s.x}%`, top: `${s.y}%` }}>
                  {s.icon}
                </span>
              ))}
            </div>

            <button
              onClick={() => {
                sound.playWishBell();
                setScrapbookSaved(true);
                confetti({ particleCount: 40 });

                sendActivityToWeb3Forms({
                  activity: 'Day 5: Scrapbook Page Created',
                  dayNumber: 5,
                  message: `Mitva designed a scrapbook page with caption: "${scrapbookCaption}"`,
                });
              }}
              className="w-full py-2.5 bg-gradient-to-r from-amber-400 to-rose-400 text-slate-950 font-semibold text-xs rounded-xl shadow cursor-pointer"
            >
              {scrapbookSaved ? 'Scrapbook Page Saved ✓' : 'Save Page to Scrapbook'}
            </button>
          </div>
        )}

        {/* DAY 6: SECRET ROOM KEYPAD */}
        {day.dayNumber === 6 && (
          <div className="space-y-5">
            <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-500/20 text-xs text-purple-200">
              <strong>Bigg Boss Secret Room:</strong> Enter the 4-digit code. Hint: 1111
            </div>

            {!secretUnlocked ? (
              <div className="max-w-xs mx-auto space-y-4">
                <div className="p-4 rounded-xl bg-black/60 border border-white/15 text-center font-mono-numbers text-2xl tracking-widest text-amber-300 min-h-[58px] flex items-center justify-center">
                  {keypadInput ? keypadInput.split('').map(() => '●').join(' ') : '----'}
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 'C', 0, '↵'].map((key) => (
                    <button
                      key={String(key)}
                      onClick={() => {
                        sound.playPop();
                        if (key === 'C') {
                          setKeypadInput('');
                          setSecretError(false);
                        } else if (key === '↵') {
                          if (keypadInput === '1111') {
                            sound.playWishBell();
                            setSecretUnlocked(true);
                            confetti({ particleCount: 70 });
                          } else {
                            sound.playBuzzer();
                            setSecretError(true);
                          }
                        } else {
                          if (keypadInput.length < 4) {
                            const next = keypadInput + key;
                            setKeypadInput(next);
                            if (next === '1111') {
                              sound.playWishBell();
                              setSecretUnlocked(true);
                              confetti({ particleCount: 70 });
                            }
                          }
                        }
                      }}
                      className="p-3.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-white font-mono-numbers text-sm font-semibold cursor-pointer"
                    >
                      {key}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="p-6 rounded-2xl bg-[#12152B] border border-amber-300/40 space-y-4 font-serif-dreamy">
                <span className="text-xs text-amber-300 uppercase tracking-widest block font-sans font-bold">
                  🗝️ Secret Room Letter Unlocked
                </span>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic">
                  “Dear Mitva, leaving for a new chapter takes immense courage. Remember that true friendships don't fade with time zones; they grow deeper across skies.”
                </p>
                <div className="pt-3 border-t border-white/10 space-y-2">
                  <input
                    type="text"
                    value={secretReply}
                    onChange={(e) => setSecretReply(e.target.value)}
                    placeholder="Write a secret reply back..."
                    className="w-full p-2.5 bg-white/5 border border-white/10 rounded-lg text-xs text-white outline-none"
                  />
                  <button
                    onClick={() => {
                      if (!secretReply.trim()) return;
                      sound.playWishBell();
                      setSecretReplySent(true);

                      sendActivityToWeb3Forms({
                        activity: 'Day 6: Secret Room Reply Sent',
                        dayNumber: 6,
                        message: `Mitva replied to secret room: "${secretReply}"`,
                      });
                    }}
                    disabled={secretReplySent}
                    className="px-4 py-2 bg-amber-400 text-slate-950 font-semibold text-xs rounded-lg cursor-pointer"
                  >
                    {secretReplySent ? 'Reply Sent to Secret Vault ✓' : 'Send Secret Reply'}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* DAY 7: WEEKEND DIY CRAFT KIT (PRESSED FLOWER BOOKMARK) */}
        {day.dayNumber === 7 && (
          <div className="space-y-5">
            <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-500/20 text-xs text-purple-200">
              <strong>Weekend Craft Studio:</strong> Design a physical-style pressed flower bookmark keepsake:
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-3">
                <label className="block text-xs text-slate-300">1. Bookmark Paper Base:</label>
                <div className="flex gap-2">
                  {[
                    { id: 'indigo', label: 'Dark Indigo', color: '#1E1B4B' },
                    { id: 'kraft', label: 'Vintage Kraft', color: '#78350F' },
                    { id: 'cream', label: 'Ivory Deckle', color: '#FEF3C7' },
                  ].map((p) => (
                    <button
                      key={p.id}
                      onClick={() => {
                        sound.playPop();
                        setBookmarkColor(p.id as any);
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs border cursor-pointer ${
                        bookmarkColor === p.id ? 'border-amber-300 text-amber-200' : 'border-white/10 text-slate-400'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>

                <label className="block text-xs text-slate-300">2. Inscription on Bookmark:</label>
                <input
                  type="text"
                  value={bookmarkDedication}
                  onChange={(e) => setBookmarkDedication(e.target.value)}
                  className="w-full p-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white outline-none"
                />
              </div>

              {/* Bookmark Preview */}
              <div className="flex justify-center items-center">
                <div
                  className="w-32 h-56 rounded-t-xl rounded-b-md shadow-2xl p-3 flex flex-col justify-between items-center text-center relative border border-white/20"
                  style={{
                    backgroundColor: bookmarkColor === 'indigo' ? '#1E1B4B' : bookmarkColor === 'kraft' ? '#78350F' : '#FFFBEB',
                    color: bookmarkColor === 'cream' ? '#1E293B' : '#F8FAFC',
                  }}
                >
                  <div className="w-3 h-3 rounded-full bg-black/40 border border-white/40 mb-1" />
                  <div className="space-y-2">
                    <span className="text-3xl block">🌿🌸</span>
                    <p className="text-[10px] font-serif-dreamy italic leading-tight px-1">
                      "{bookmarkDedication}"
                    </p>
                  </div>
                  <span className="text-[9px] font-bold tracking-widest uppercase">MITVA 2026</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                sound.playWishBell();
                setBookmarkSaved(true);
                confetti({ particleCount: 40 });

                sendActivityToWeb3Forms({
                  activity: 'Day 7: DIY Bookmark Designed',
                  dayNumber: 7,
                  message: `Mitva designed a bookmark (${bookmarkColor}) with dedication: "${bookmarkDedication}"`,
                });
              }}
              className="w-full py-2.5 bg-gradient-to-r from-amber-400 to-rose-400 text-slate-950 font-semibold text-xs rounded-xl shadow cursor-pointer"
            >
              {bookmarkSaved ? 'Bookmark Crafted & Preserved ✓' : 'Save & Finish Bookmark Companion'}
            </button>
          </div>
        )}

        {/* DAY 8: WEEKEND KA VAAR POLL */}
        {day.dayNumber === 8 && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/20 text-xs text-rose-200">
              <strong>Salman Khan Style Weekend Ka Vaar:</strong> “Bhai says: Mitva is nominated for 100% appreciation! Cast your vote:”
            </div>

            <div className="space-y-2.5">
              {[
                { id: 'heart', label: 'Her pure golden heart & rock-solid loyalty', pct: '99%' },
                { id: 'aesthetic', label: 'Her creative eye & aesthetic sense', pct: '100%' },
                { id: 'humor', label: 'Her witty unfiltered humor & laughs', pct: '98%' },
                { id: 'strength', label: 'Her quiet courage to step into the world', pct: '100%' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => {
                    sound.playWishBell();
                    setPollVoted(opt.id);
                    confetti({ particleCount: 30, spread: 50 });

                    sendActivityToWeb3Forms({
                      activity: 'Day 8: Weekend Ka Vaar Poll Voted',
                      dayNumber: 8,
                      message: `Mitva voted in the appreciation poll: "${opt.label}"`,
                    });
                  }}
                  className={`w-full p-3.5 rounded-xl border text-left text-xs flex items-center justify-between transition-all cursor-pointer ${
                    pollVoted === opt.id
                      ? 'bg-amber-400/15 border-amber-400/50 text-white'
                      : 'bg-white/[0.02] border-white/5 text-slate-300 hover:bg-white/5'
                  }`}
                >
                  <span>{opt.label}</span>
                  {pollVoted && <span className="font-mono-numbers text-amber-300 font-bold">{opt.pct} Votes</span>}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* DAY 9: PRESSED FLOWER FRAME MAKER */}
        {day.dayNumber === 9 && (
          <div className="space-y-5">
            <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-500/20 text-xs text-purple-200">
              <strong>Pressed Flower Frame Studio:</strong> Arrange dried petals into an ornate vintage frame:
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-300">
                <span>Select Frame Style:</span>
                <div className="flex gap-2">
                  {[
                    { id: 'gilded', label: 'Gilded Gold' },
                    { id: 'obsidian', label: 'Obsidian Velvet' },
                    { id: 'wood', label: 'Rustic Walnut' },
                  ].map((s) => (
                    <button
                      key={s.id}
                      onClick={() => {
                        sound.playPop();
                        setFrameStyle(s.id as any);
                      }}
                      className={`px-3 py-1.5 rounded-lg border text-xs cursor-pointer ${
                        frameStyle === s.id ? 'border-amber-300 text-amber-200' : 'border-white/10 text-slate-400'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Frame Visual Canvas */}
              <div
                className={`p-6 rounded-2xl border-4 text-center space-y-3 min-h-[200px] flex flex-col justify-center items-center ${
                  frameStyle === 'gilded'
                    ? 'border-amber-400/70 bg-[#0E1020]'
                    : frameStyle === 'obsidian'
                    ? 'border-slate-700 bg-black'
                    : 'border-amber-900 bg-[#1A120B]'
                }`}
              >
                <div className="flex gap-3 text-3xl">
                  <span>🌸</span>
                  <span>🪻</span>
                  <span>🌻</span>
                  <span>✨</span>
                </div>
                <input
                  type="text"
                  value={frameDedication}
                  onChange={(e) => setFrameDedication(e.target.value)}
                  className="w-full text-center text-xs text-amber-200 bg-transparent outline-none font-serif-dreamy italic"
                />
                <span className="text-[10px] text-slate-400 uppercase tracking-widest">
                  Preserved in Everlasting Amber · Mitva 2026
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                sound.playWishBell();
                setFrameSaved(true);
                confetti({ particleCount: 40 });

                sendActivityToWeb3Forms({
                  activity: 'Day 9: Pressed Flower Frame Saved',
                  dayNumber: 9,
                  message: `Mitva crafted a botanical frame with dedication: "${frameDedication}"`,
                });
              }}
              className="w-full py-2.5 bg-gradient-to-r from-amber-400 to-rose-400 text-slate-950 font-semibold text-xs rounded-xl shadow cursor-pointer"
            >
              {frameSaved ? 'Botanical Frame Preserved ✓' : 'Preserve Botanical Keepsake Frame'}
            </button>
          </div>
        )}

        {/* DAY 10: CONFESSION ROOM */}
        {day.dayNumber === 10 && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-500/20 text-xs text-purple-200">
              <strong>Bigg Boss Confession Room:</strong> “Mitva, aap kaisa mehsus kar rahi hain? Yeh confidential hai.”
            </div>

            <textarea
              rows={4}
              value={confessionText}
              onChange={(e) => {
                setConfessionText(e.target.value);
                setConfessionSaved(false);
              }}
              placeholder="Write your honest, unfiltered thoughts here..."
              className="w-full p-3.5 bg-white/[0.03] border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 outline-none focus:border-purple-400"
            />

            <button
              onClick={() => {
                sound.playWishBell();
                localStorage.setItem('mitva_confession_day10', confessionText);
                setConfessionSaved(true);
                confetti({ particleCount: 40 });

                sendActivityToWeb3Forms({
                  activity: 'Day 10: Confession Room Entry',
                  dayNumber: 10,
                  message: `Mitva logged a confession with mood "${confessionMood}"`,
                  details: { mood: confessionMood, confession: confessionText },
                });
              }}
              disabled={!confessionText.trim()}
              className="w-full py-2.5 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white text-xs font-semibold rounded-xl cursor-pointer"
            >
              {confessionSaved ? 'Confession Safely Locked in Room 🔒' : 'Lock Confession into Vault'}
            </button>
          </div>
        )}

        {/* DAY 11: DIY FRIENDSHIP BRACELET WEAVER */}
        {day.dayNumber === 11 && (
          <div className="space-y-5 text-center">
            <p className="text-xs text-slate-300">Weave your friendship band knot-by-knot:</p>
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-4">
              <div className="flex items-center justify-center gap-1.5 py-4">
                {Array.from({ length: braidStep * 2 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-3 h-16 rounded-full shadow-lg transition-all animate-float"
                    style={{
                      backgroundColor: ['#C084FC', '#F472B6', '#FDE68A', '#60A5FA'][i % 4],
                      transform: `rotate(${i % 2 === 0 ? '-10deg' : '10deg'})`,
                    }}
                  />
                ))}
              </div>
              <span className="text-xs font-serif-dreamy text-amber-200 block font-bold">
                ✦ MITVA & BESTIE · KNOTS {braidStep} OF 5 ✦
              </span>
            </div>

            <button
              onClick={() => {
                sound.playPaperFold();
                if (braidStep < 5) {
                  setBraidStep((s) => s + 1);
                } else {
                  sound.playWishBell();
                  confetti({ particleCount: 50 });

                  sendActivityToWeb3Forms({
                    activity: 'Day 11: Friendship Bracelet Woven',
                    dayNumber: 11,
                    message: `Mitva finished weaving the friendship bracelet with charm ${braidCharm}`,
                  });
                }
              }}
              className="px-5 py-2.5 bg-gradient-to-r from-amber-400 to-rose-400 text-slate-950 font-semibold text-xs rounded-xl shadow cursor-pointer"
            >
              {braidStep < 5 ? `Weave Knot ${braidStep + 1} of 5 🧵` : 'Bracelet Complete! 💖'}
            </button>
          </div>
        )}

        {/* DAY 12: WILDFLOWER MOOD TRACKER */}
        {day.dayNumber === 12 && (
          <div className="space-y-5">
            <p className="text-xs text-slate-300">Tap a wildflower that matches your heart's current weather:</p>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {[
                { name: 'Lavender', mood: 'Peaceful & Serene', icon: '🪻' },
                { name: 'Rose', mood: 'Happy & Loved', icon: '🌹' },
                { name: 'Daisy', mood: 'Energetic & Cheerful', icon: '🌼' },
                { name: 'Chamomile', mood: 'Cozy & Reflective', icon: '🪴' },
                { name: 'Sunflower', mood: 'Inspired & Brave', icon: '🌻' },
              ].map((f) => (
                <button
                  key={f.name}
                  onClick={() => {
                    sound.playPop();
                    setLoggedMood(f.mood);
                  }}
                  className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                    loggedMood === f.mood
                      ? 'bg-purple-900/40 border-amber-300 text-white'
                      : 'bg-white/[0.02] border-white/5 text-slate-400 hover:text-white'
                  }`}
                >
                  <span className="text-2xl block mb-1">{f.icon}</span>
                  <span className="text-xs font-semibold block">{f.name}</span>
                  <span className="text-[10px] text-slate-400 block">{f.mood}</span>
                </button>
              ))}
            </div>

            <input
              type="text"
              value={moodNote}
              onChange={(e) => setMoodNote(e.target.value)}
              placeholder="Why does your soul feel this way today? (Optional)"
              className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-xs text-white outline-none"
            />

            <button
              onClick={() => {
                if (!loggedMood) return;
                sound.playWishBell();
                setMoodSaved(true);
                confetti({ particleCount: 30 });

                sendActivityToWeb3Forms({
                  activity: 'Day 12: Wildflower Mood Logged',
                  dayNumber: 12,
                  message: `Mitva logged mood: "${loggedMood}" with note: "${moodNote}"`,
                });
              }}
              disabled={!loggedMood}
              className="w-full py-2.5 bg-gradient-to-r from-amber-400 to-purple-500 text-slate-950 font-semibold text-xs rounded-xl shadow cursor-pointer disabled:opacity-50"
            >
              {moodSaved ? 'Mood Logged in Wildflower Garden ✓' : 'Log Today’s Vibe into Garden'}
            </button>
          </div>
        )}

        {/* DAY 13: REALITY SHOW IMMUNITY PASS */}
        {day.dayNumber === 13 && (
          <div className="space-y-5 text-center">
            <div
              onClick={() => {
                sound.playPop();
                setImmunityFlipped(!immunityFlipped);
              }}
              className="p-6 rounded-2xl bg-gradient-to-br from-amber-500/20 via-purple-600/20 to-amber-500/10 border-2 border-amber-300/40 shadow-2xl relative space-y-4 max-w-sm mx-auto cursor-pointer"
            >
              {!immunityFlipped ? (
                <>
                  <ShieldCheck className="w-14 h-14 mx-auto text-amber-300 animate-pulse" />
                  <h3 className="text-xl font-serif-dreamy font-bold text-white">
                    GOLDEN IMMUNITY PASS
                  </h3>
                  <p className="text-xs text-amber-200">Issued To: Mitva · Valid Forever</p>
                  <p className="text-[10px] text-slate-400">Tap to flip card ↺</p>
                </>
              ) : (
                <div className="space-y-2 py-4">
                  <p className="text-xs text-slate-200">
                    • 100% Immunity from Self-Doubt<br />
                    • Unlimited FaceTime & Emergency Chai Calls<br />
                    • Automatic VIP Pass to Happiness
                  </p>
                  <p className="text-[10px] text-slate-400 pt-2">Tap to flip back ↺</p>
                </div>
              )}
            </div>

            <button
              onClick={() => {
                sound.playWishBell();
                setImmunityClaimed(true);
                confetti({ particleCount: 50 });

                sendActivityToWeb3Forms({
                  activity: 'Day 13: Golden Immunity Pass Claimed',
                  dayNumber: 13,
                  message: 'Mitva claimed her Golden Immunity Pass!',
                });
              }}
              className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-semibold text-xs rounded-xl shadow cursor-pointer"
            >
              {immunityClaimed ? 'Immunity Activated Forever ✨' : 'Activate Golden Immunity'}
            </button>
          </div>
        )}

        {/* DAY 14: HALFWAY MILESTONE BOUQUET ASSEMBLY */}
        {day.dayNumber === 14 && (
          <div className="space-y-5 text-center">
            <div className="p-4 rounded-xl bg-gradient-to-r from-purple-900/40 to-amber-500/20 border border-amber-300/30 text-xs text-amber-200 font-serif-dreamy">
              “Halfway mark reached! Tap the collected blooms below to assemble your grand celebratory centerpiece bouquet:”
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 min-h-[200px] flex flex-col justify-center items-center space-y-3">
              <div className="flex flex-wrap justify-center gap-2 max-w-xs">
                {bouquetVaseFlowers.map((f, i) => (
                  <span key={i} className="text-3xl animate-bounce" style={{ animationDelay: `${i * 0.1}s` }}>
                    {['🌸', '🌻', '🪻', '🌷', '🪷', '🌼', '🌾', '🌹'][f % 8]}
                  </span>
                ))}
              </div>
              <div className="w-24 h-12 rounded-b-2xl bg-cyan-900/40 border-2 border-cyan-400/40 flex items-center justify-center text-xs text-cyan-200">
                Crystal Vase
              </div>
            </div>

            <button
              onClick={() => {
                sound.playWishBell();
                if (bouquetVaseFlowers.length < 8) {
                  setBouquetVaseFlowers([...bouquetVaseFlowers, bouquetVaseFlowers.length]);
                } else {
                  confetti({ particleCount: 70 });
                  sendActivityToWeb3Forms({
                    activity: 'Day 14: Halfway Grand Bouquet Assembled',
                    dayNumber: 14,
                    message: 'Mitva assembled the grand halfway centerpiece bouquet with all gathered blooms!',
                  });
                }
              }}
              className="px-5 py-2.5 bg-gradient-to-r from-amber-400 to-purple-500 text-slate-950 font-semibold text-xs rounded-xl shadow cursor-pointer"
            >
              {bouquetVaseFlowers.length < 8 ? `Add Flower #${bouquetVaseFlowers.length + 1} to Vase 💐` : 'Grand Halfway Bouquet Complete! 💐✨'}
            </button>
          </div>
        )}

        {/* DAY 15: LUXURY BUDGET TASK */}
        {day.dayNumber === 15 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <div className="flex items-center gap-2 text-xs text-amber-300 font-medium">
                <Coins className="w-4 h-4" />
                <span>Luxury Budget Wallet</span>
              </div>
              <span className="font-mono-numbers text-sm font-bold text-amber-300">
                {budgetCoins} BB Coins
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {[
                { id: 'rant', title: '1-Hour Non-Stop Rant Call', cost: 30 },
                { id: 'chai', title: 'Virtual Chai & Secret Gossip', cost: 25 },
                { id: 'meme', title: 'Emergency Midnight Meme Package', cost: 20 },
                { id: 'compliment', title: '100 Genuine Compliments Pack', cost: 25 },
              ].map((item) => {
                const bought = purchasedRewards.includes(item.id);
                return (
                  <button
                    key={item.id}
                    disabled={bought || budgetCoins < item.cost}
                    onClick={() => {
                      sound.playWishBell();
                      setBudgetCoins((c) => c - item.cost);
                      setPurchasedRewards((r) => [...r, item.id]);
                      confetti({ particleCount: 30 });

                      sendActivityToWeb3Forms({
                        activity: 'Day 15: Luxury Budget Reward Claimed',
                        dayNumber: 15,
                        message: `Mitva purchased reward: "${item.title}" for ${item.cost} coins`,
                      });
                    }}
                    className={`p-3 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                      bought
                        ? 'bg-purple-950/40 border-purple-400/40 text-purple-200'
                        : budgetCoins >= item.cost
                        ? 'bg-white/[0.03] border-white/10 hover:border-amber-300/40 text-white'
                        : 'opacity-40 border-white/5 text-slate-500'
                    }`}
                  >
                    <span className="block font-medium">{item.title}</span>
                    <span className="block text-[11px] text-amber-300 mt-1">
                      {bought ? 'Claimed ✓' : `${item.cost} Coins`}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* DAY 16: PAPER DAISY FLIP BOOK */}
        {day.dayNumber === 16 && (
          <div className="space-y-5 text-center">
            <p className="text-xs text-slate-300">Flip the pages to watch a seed sprout into a daisy:</p>
            <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/10 min-h-[200px] flex flex-col items-center justify-center space-y-3">
              <span className="text-5xl animate-bounce">
                {['🌰', '🌱', '🌿', '🪴', '🌼'][flipStep]}
              </span>
              <p className="text-sm font-serif-dreamy text-amber-200 font-semibold">
                {
                  [
                    'Frame 1: A tiny seed resting in rich quiet soil',
                    'Frame 2: The first green sprout breaks the surface',
                    'Frame 3: Tender leaves greeting the autumn air',
                    'Frame 4: The bud growing tall with quiet strength',
                    'Frame 5: Full radiant Daisy blooming in the sun!',
                  ][flipStep]
                }
              </p>
            </div>

            <button
              onClick={() => {
                sound.playPaperFold();
                setFlipStep((prev) => (prev + 1) % 5);
                if (flipStep === 3) {
                  sound.playWishBell();
                  confetti({ particleCount: 40 });
                }
              }}
              className="px-6 py-2.5 bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold rounded-xl cursor-pointer"
            >
              Flip to Next Page →
            </button>
          </div>
        )}

        {/* DAY 17: CRAFTING CORNER: PATTERN UNSCRAMBLE */}
        {day.dayNumber === 17 && (
          <div className="space-y-5 text-center">
            <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-500/20 text-xs text-purple-200">
              <strong>Crafting Puzzle:</strong> Tap the scrambled letters to spell today's encouraging word:
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-4">
              <div className="flex justify-center gap-2">
                {scrambledLetters.map((letter, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      sound.playPop();
                      const updated = [...scrambledLetters];
                      // Swap adjacent
                      const nextIdx = (idx + 1) % updated.length;
                      [updated[idx], updated[nextIdx]] = [updated[nextIdx], updated[idx]];
                      setScrambledLetters(updated);
                      if (updated.join('') === 'BLOOM') {
                        sound.playWishBell();
                        setPuzzleSolved(true);
                        confetti({ particleCount: 50 });

                        sendActivityToWeb3Forms({
                          activity: 'Day 17: Pattern Unscramble Solved',
                          dayNumber: 17,
                          message: 'Mitva solved the anagram puzzle to reveal: "BLOOM"',
                        });
                      }
                    }}
                    className="w-12 h-14 rounded-xl bg-purple-900/40 border border-purple-400 text-white font-mono-numbers text-xl font-bold flex items-center justify-center cursor-pointer hover:bg-purple-800"
                  >
                    {letter}
                  </button>
                ))}
              </div>

              <p className="text-xs text-amber-200 font-serif-dreamy italic">
                {puzzleSolved ? '“Wherever you go, BLOOM with all your heart!” ✨' : 'Tap tiles to swap & unscramble'}
              </p>
            </div>

            <button
              onClick={() => {
                sound.playWishBell();
                setScrambledLetters(['B', 'L', 'O', 'O', 'M']);
                setPuzzleSolved(true);
                confetti({ particleCount: 40 });

                sendActivityToWeb3Forms({
                  activity: 'Day 17: Pattern Unscramble Solved',
                  dayNumber: 17,
                  message: 'Mitva solved the quote: "WHEREVER YOU GO, BLOOM WITH ALL YOUR HEART"',
                });
              }}
              className="px-4 py-2 bg-white/10 hover:bg-white/15 text-slate-300 text-xs rounded-lg cursor-pointer"
            >
              Auto-Solve Quote 🪄
            </button>
          </div>
        )}

        {/* DAY 18: GOLDEN BUZZER */}
        {day.dayNumber === 18 && (
          <div className="space-y-6 text-center">
            <p className="text-xs text-slate-300">Press the Bigg Boss Golden Buzzer!</p>
            <button
              onClick={() => {
                sound.playBuzzer();
                setBuzzerPressed(true);
                confetti({
                  particleCount: 120,
                  spread: 100,
                  origin: { y: 0.5 },
                  colors: ['#FDE68A', '#F59E0B', '#F472B6', '#FFFFFF'],
                });

                sendActivityToWeb3Forms({
                  activity: 'Day 18: Golden Buzzer Pressed!',
                  dayNumber: 18,
                  message: 'Mitva pressed the Golden Buzzer for a standing ovation!',
                });
              }}
              className="w-32 h-32 mx-auto rounded-full bg-gradient-to-tr from-amber-600 via-amber-400 to-yellow-200 p-2 shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center cursor-pointer border-4 border-amber-200"
            >
              <div className="w-full h-full rounded-full bg-gradient-to-b from-amber-500 to-amber-700 flex flex-col items-center justify-center text-slate-950 font-bold text-sm">
                <Crown className="w-6 h-6 text-slate-950 mb-1" />
                BUZZER
              </div>
            </button>
            {buzzerPressed && (
              <p className="text-xs text-amber-300 font-serif-dreamy italic">
                “Standing ovation for Mitva! The universe salutes your courage!”
              </p>
            )}
          </div>
        )}

        {/* DAY 19: MIDNIGHT JASMINE AUDIO LOUNGE */}
        {day.dayNumber === 19 && (
          <div className="space-y-5">
            <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-500/20 text-xs text-purple-200">
              <strong>Midnight Jasmine Lounge:</strong> Dim the lights, pick your soundscape, and write a quiet late-night thought:
            </div>

            <div className="flex justify-center gap-2">
              {[
                { id: 'chords', label: 'Lo-Fi Synthesizer 🎵' },
                { id: 'crickets', label: 'Night Breeze 🌙' },
                { id: 'rain', label: 'Gentle Rain 🌧️' },
              ].map((s) => (
                <button
                  key={s.id}
                  onClick={() => {
                    sound.playPop();
                    setAudioAmbiance(s.id as any);
                    sound.playWishBell();
                  }}
                  className={`px-3 py-1.5 rounded-lg border text-xs cursor-pointer ${
                    audioAmbiance === s.id ? 'bg-purple-600 border-purple-300 text-white' : 'border-white/10 text-slate-400'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
              <label className="block text-xs text-slate-300">
                What are you looking forward to most in your new city?
              </label>
              <input
                type="text"
                value={nightThought}
                onChange={(e) => setNightThought(e.target.value)}
                placeholder="New cafes, winter coats, walking in new streets..."
                className="w-full p-2.5 bg-white/5 border border-white/10 rounded-lg text-xs text-white outline-none"
              />
            </div>

            <button
              onClick={() => {
                sound.playWishBell();
                setNightThoughtSent(true);
                confetti({ particleCount: 30 });

                sendActivityToWeb3Forms({
                  activity: 'Day 19: Midnight Jasmine Thought Sent',
                  dayNumber: 19,
                  message: `Mitva shared a midnight thought: "${nightThought}" with ambiance "${audioAmbiance}"`,
                });
              }}
              className="w-full py-2.5 bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold text-xs rounded-xl cursor-pointer"
            >
              {nightThoughtSent ? 'Thought Whispered into the Night Sky ✓' : 'Send Thought to Night Skies'}
            </button>
          </div>
        )}

        {/* DAY 20: DIY MEMORY JAR (3D TERRARIUM) */}
        {day.dayNumber === 20 && (
          <div className="space-y-5 text-center">
            <p className="text-xs text-slate-300">Tap items below to drop them into your glowing glass terrarium:</p>
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 min-h-[220px] flex flex-col justify-center items-center space-y-3">
              <div className="w-36 h-48 rounded-t-3xl rounded-b-2xl border-2 border-cyan-400/40 bg-cyan-950/20 p-3 flex flex-wrap justify-center items-end gap-2 shadow-2xl">
                {terrariumItems.map((item) => (
                  <span key={item.id} className="text-2xl animate-float">
                    {item.icon}
                  </span>
                ))}
              </div>
              <span className="text-xs text-slate-400">{terrariumItems.length} Keepsakes Placed</span>
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              {[
                { icon: '💎', name: 'Laughter Crystal' },
                { icon: '🌿', name: 'Comfort Moss' },
                { icon: '🌸', name: 'Cherry Petal' },
                { icon: '✨', name: 'Firefly Light' },
              ].map((it, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    sound.playWishBell();
                    setTerrariumItems([...terrariumItems, { id: Date.now(), icon: it.icon, name: it.name }]);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-200 hover:bg-white/10 cursor-pointer"
                >
                  Add {it.icon} {it.name}
                </button>
              ))}
            </div>

            <button
              onClick={() => {
                sound.playWishBell();
                setTerrariumSealed(true);
                confetti({ particleCount: 50 });

                sendActivityToWeb3Forms({
                  activity: 'Day 20: Memory Terrarium Sealed',
                  dayNumber: 20,
                  message: `Mitva sealed her terrarium with ${terrariumItems.length} glowing items!`,
                });
              }}
              className="w-full py-2.5 bg-amber-400 text-slate-950 font-semibold text-xs rounded-xl cursor-pointer"
            >
              {terrariumSealed ? 'Terrarium Cork Sealed with Starlight ✓' : 'Seal Glass Terrarium'}
            </button>
          </div>
        )}

        {/* DAY 21: 10 DAYS TO GO BIGG BOSS ANNOUNCEMENT */}
        {day.dayNumber === 21 && (
          <div className="space-y-5 text-center">
            <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-400/30 space-y-2">
              <span className="text-xs font-semibold text-amber-300 uppercase tracking-widest">
                The Final 10 Days
              </span>
              <p className="text-base sm:text-lg font-serif-dreamy text-white">
                “Bigg Boss chahte hain ki Mitva agle 10 din apni journey ko full energy aur khushi ke saath celebrate kare.”
              </p>
            </div>

            <div className="space-y-2 text-left max-w-sm mx-auto text-xs">
              {[
                'I promise to laugh daily and not overthink packing',
                'I will eat my favorite meals without counting calories',
                'I know my people will always be a phone call away',
              ].map((pledge, i) => (
                <div
                  key={i}
                  onClick={() => {
                    sound.playPop();
                    const updated = [...pledgeChecked];
                    updated[i] = !updated[i];
                    setPledgeChecked(updated);
                  }}
                  className="p-3 bg-white/5 border border-white/10 rounded-xl flex items-center justify-between cursor-pointer"
                >
                  <span>{pledge}</span>
                  <CheckCircle2 className={`w-4 h-4 ${pledgeChecked[i] ? 'text-amber-300' : 'text-slate-600'}`} />
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                sound.playFanfare();
                setPledgeSigned(true);
                confetti({ particleCount: 60 });

                sendActivityToWeb3Forms({
                  activity: 'Day 21: 10-Day Bigg Boss Pledge Signed',
                  dayNumber: 21,
                  message: 'Mitva signed the official 10-day Bigg Boss finale pledge!',
                });
              }}
              className="px-6 py-2.5 bg-amber-400 text-slate-950 font-semibold text-xs rounded-xl cursor-pointer"
            >
              {pledgeSigned ? '10-Day Pledge Registered with Bigg Boss ✓' : 'Sign 10-Day Finale Pledge'}
            </button>
          </div>
        )}

        {/* DAY 22: PRESSED ROSE WAX STAMP */}
        {day.dayNumber === 22 && (
          <div className="space-y-5 text-center">
            <p className="text-xs text-slate-300">Pour molten rose wax and press the seal:</p>
            {waxStep === 0 && (
              <button
                onClick={() => {
                  sound.playPop();
                  setWaxStep(1);
                }}
                className="w-24 h-24 mx-auto rounded-full bg-rose-950 border-2 border-dashed border-rose-400/60 flex items-center justify-center cursor-pointer hover:scale-105"
              >
                <span className="text-xs font-serif-dreamy text-rose-300">Pour Hot Wax 🕯️</span>
              </button>
            )}

            {waxStep === 1 && (
              <button
                onClick={() => {
                  sound.playWishBell();
                  setWaxStep(2);
                  confetti({ particleCount: 50 });

                  sendActivityToWeb3Forms({
                    activity: 'Day 22: Rose Wax Seal Broken',
                    dayNumber: 22,
                    message: 'Mitva stamped and cracked the royal wax seal!',
                  });
                }}
                className="w-24 h-24 mx-auto rounded-full bg-rose-700 border-2 border-rose-300 shadow-xl flex items-center justify-center cursor-pointer animate-pulse"
              >
                <span className="text-xs font-serif-dreamy text-amber-200 font-bold">Press Seal 🌹</span>
              </button>
            )}

            {waxStep === 2 && (
              <div className="p-5 rounded-2xl bg-[#13152A] border border-rose-500/30 text-left space-y-2.5 font-serif-dreamy">
                <span className="text-[11px] font-sans text-rose-300 uppercase tracking-wider block">
                  Wax Seal Cracked · Pure Heart
                </span>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic">
                  “Mitva, leaving behind familiar roads is not leaving things behind; it's carrying your warmth to new horizons. The world is so lucky to have you.”
                </p>
              </div>
            )}
          </div>
        )}

        {/* DAY 23: REALITY SHOW AWARD TROPHY */}
        {day.dayNumber === 23 && (
          <div className="space-y-5 text-center">
            <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-300/40 space-y-3 max-w-sm mx-auto">
              <Award className="w-16 h-16 text-amber-300 mx-auto animate-bounce" />
              <h3 className="text-lg font-serif-dreamy text-amber-300 font-bold">
                WINNER: MITVA
              </h3>
              <p className="text-xs text-slate-300">
                Awarded for Most Aesthetic, Creative, Resilient & Loving Soul.
              </p>
            </div>

            <input
              type="text"
              value={speechText}
              onChange={(e) => setSpeechText(e.target.value)}
              placeholder="Your acceptance speech: 'I want to thank...'"
              className="w-full p-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white outline-none"
            />

            <button
              onClick={() => {
                sound.playFanfare();
                setTrophyAccepted(true);
                confetti({ particleCount: 70 });

                sendActivityToWeb3Forms({
                  activity: 'Day 23: Award Trophy Accepted',
                  dayNumber: 23,
                  message: `Mitva accepted the season trophy with speech: "${speechText}"`,
                });
              }}
              className="px-6 py-2.5 bg-amber-400 text-slate-950 font-semibold text-xs rounded-xl cursor-pointer"
            >
              {trophyAccepted ? 'Trophy Accepted with Applause! 🏆' : 'Accept Trophy & Give Speech'}
            </button>
          </div>
        )}

        {/* DAY 24: SUNFLOWER HOPE BOX */}
        {day.dayNumber === 24 && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200">
              <strong>Emergency Homesick Kit:</strong> Tap any drawer whenever you miss home:
            </div>
            <div className="space-y-2">
              {[
                { title: 'Drawer 1: Roots', text: 'Home is not a zip code; it lives in everyone who is cheering for you.' },
                { title: 'Drawer 2: The Chai Promise', text: 'Whenever you miss evening chai, FaceTime is just 3 seconds away.' },
                { title: 'Drawer 3: Courage', text: 'You survived every hard day before this; you are unstoppable.' },
              ].map((d, i) => (
                <div
                  key={i}
                  onClick={() => {
                    sound.playPop();
                    setOpenedDrawer(openedDrawer === i ? null : i);
                  }}
                  className="p-3 bg-white/[0.03] border border-white/5 rounded-xl text-xs cursor-pointer"
                >
                  <span className="font-semibold text-amber-300 block">{d.title}</span>
                  {openedDrawer === i && (
                    <p className="text-slate-300 mt-1 font-serif-dreamy italic">“{d.text}”</p>
                  )}
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                sound.playWishBell();
                setHugSent(true);
                confetti({ particleCount: 40 });

                sendActivityToWeb3Forms({
                  activity: 'Day 24: Virtual Hug Sent!',
                  dayNumber: 24,
                  message: 'Mitva pressed the virtual hug button in the Sunflower Hope Box!',
                });
              }}
              className="w-full py-2.5 bg-amber-400 text-slate-950 font-semibold text-xs rounded-xl cursor-pointer"
            >
              {hugSent ? 'Virtual Hug Dispatched Across the World! 🫂' : 'Send Instant Virtual Hug 🫂'}
            </button>
          </div>
        )}

        {/* DAY 25: 5-DAY FINALIST COUNTDOWN */}
        {day.dayNumber === 25 && (
          <div className="space-y-5 text-center">
            <p className="text-xs text-slate-300">Mitva's Top 5 Superpowers (Click to flip through cards):</p>
            <div
              onClick={() => {
                sound.playPop();
                setFinalistActiveCard((c) => (c + 1) % 5);
              }}
              className="p-6 rounded-2xl bg-purple-950/40 border border-purple-400/40 min-h-[160px] flex flex-col justify-center items-center space-y-2 cursor-pointer shadow-xl max-w-sm mx-auto"
            >
              <span className="text-amber-300 font-bold text-xs uppercase tracking-widest">
                Superpower #{finalistActiveCard + 1}
              </span>
              <p className="text-base font-serif-dreamy font-semibold text-white">
                {
                  [
                    '1. Radiant Creativity & Aesthetic Magic ✨',
                    '2. Unconditional Loyalty to Loved Ones 💖',
                    '3. Laughter that Lightens Any Room 😂',
                    '4. Courage to Cross Oceans & Build Dreams ✈️',
                    '5. The Rare Gift of Making Everyone Feel Valued 🌸',
                  ][finalistActiveCard]
                }
              </p>
              <span className="text-[10px] text-slate-400">Tap for next card ({finalistActiveCard + 1}/5)</span>
            </div>

            <button
              onClick={() => {
                sound.playWishBell();
                setFinalistFavorite(`Superpower #${finalistActiveCard + 1}`);
                confetti({ particleCount: 40 });

                sendActivityToWeb3Forms({
                  activity: 'Day 25: Finalist Superpower Reaction',
                  dayNumber: 25,
                  message: `Mitva selected Superpower #${finalistActiveCard + 1} as her favorite!`,
                });
              }}
              className="px-5 py-2.5 bg-amber-400 text-slate-950 font-semibold text-xs rounded-xl cursor-pointer"
            >
              {finalistFavorite ? `Starring ${finalistFavorite} ✓` : 'Star This Superpower'}
            </button>
          </div>
        )}

        {/* DAY 26: CRAFTING A DREAMCATCHER */}
        {day.dayNumber === 26 && (
          <div className="space-y-5 text-center">
            <p className="text-xs text-slate-300">Click each feather to tie a blessing for your new city:</p>
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-4">
              <div className="w-24 h-24 mx-auto rounded-full border-2 border-purple-400/50 flex items-center justify-center text-2xl">
                🕸️✨
              </div>
              <div className="grid grid-cols-2 gap-2">
                {[
                  'Feather of Safe Travels ✈️',
                  'Feather of Kind Friends 💖',
                  'Feather of Big Success 🌟',
                  'Feather of Peaceful Nights 🌙',
                ].map((f, idx) => {
                  const tied = dreamcatcherFeathers.includes(idx);
                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        sound.playWishBell();
                        if (tied) {
                          setDreamcatcherFeathers(dreamcatcherFeathers.filter((i) => i !== idx));
                        } else {
                          setDreamcatcherFeathers([...dreamcatcherFeathers, idx]);
                        }
                      }}
                      className={`p-2.5 rounded-xl border text-xs cursor-pointer ${
                        tied ? 'bg-purple-600/30 border-amber-300 text-amber-200' : 'border-white/10 text-slate-400'
                      }`}
                    >
                      {tied ? `${f} ✓` : f}
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              onClick={() => {
                sound.playWishBell();
                setDreamBlessed(true);
                confetti({ particleCount: 50 });

                sendActivityToWeb3Forms({
                  activity: 'Day 26: Dreamcatcher Feathers Blessed',
                  dayNumber: 26,
                  message: `Mitva tied ${dreamcatcherFeathers.length} blessing feathers to the dreamcatcher!`,
                });
              }}
              className="w-full py-2.5 bg-gradient-to-r from-purple-500 to-amber-400 text-slate-950 font-semibold text-xs rounded-xl cursor-pointer"
            >
              {dreamBlessed ? 'Dreamcatcher Blessed for New Room ✓' : 'Bless Dreamcatcher for New Room'}
            </button>
          </div>
        )}

        {/* DAY 27: BIGG BOSS FLASHBACK EPISODE */}
        {day.dayNumber === 27 && (
          <div className="space-y-5">
            <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-500/20 text-xs text-purple-200">
              <strong>Flashback Timeline:</strong> Rewind the tape across the last 26 days of our journey:
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3 font-serif-dreamy text-center">
              <span className="text-xs font-sans text-amber-300 uppercase tracking-widest font-bold">
                Episode #{flashbackEpisode + 1}
              </span>
              <p className="text-base text-white font-medium">
                {
                  [
                    'Episode 1: Nov 11 · 11:11 Wishing Flower Bed & First Seed Planted 🌸',
                    'Episode 2: Nov 18 · Salman Khan Weekend Ka Vaar Appreciation Poll 🏆',
                    'Episode 3: Nov 24 · Halfway Mark Reached & Grand Bouquet Assembled 💐',
                    'Episode 4: Dec 1 · The Final 10-Day Bigg Boss Siren Sounded 🚨',
                    'Episode 5: Today · 4 Days Left! Look how far you have bloomed ✨',
                  ][flashbackEpisode]
                }
              </p>
              <div className="flex justify-center gap-2 pt-2">
                <button
                  onClick={() => {
                    sound.playPop();
                    setFlashbackEpisode((e) => (e > 0 ? e - 1 : 4));
                  }}
                  className="px-3 py-1 bg-white/5 border border-white/10 text-xs rounded cursor-pointer"
                >
                  ← Prev
                </button>
                <button
                  onClick={() => {
                    sound.playPop();
                    setFlashbackEpisode((e) => (e < 4 ? e + 1 : 0));
                  }}
                  className="px-3 py-1 bg-white/5 border border-white/10 text-xs rounded cursor-pointer"
                >
                  Next →
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <input
                type="text"
                value={flashbackFavorite}
                onChange={(e) => setFlashbackFavorite(e.target.value)}
                placeholder="What was your favorite moment or day so far?"
                className="w-full p-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white outline-none"
              />
              <button
                onClick={() => {
                  sound.playWishBell();
                  setFlashbackSaved(true);
                  confetti({ particleCount: 30 });

                  sendActivityToWeb3Forms({
                    activity: 'Day 27: Flashback Favorite Moment Shared',
                    dayNumber: 27,
                    message: `Mitva shared her favorite moment from the journey: "${flashbackFavorite}"`,
                  });
                }}
                className="w-full py-2 bg-amber-400 text-slate-950 font-semibold text-xs rounded-xl cursor-pointer"
              >
                {flashbackSaved ? 'Memory Recorded in Rewind Reel ✓' : 'Save Favorite Moment to Reel'}
              </button>
            </div>
          </div>
        )}

        {/* DAY 28: CHERRY BLOSSOM FAREWELL LETTER */}
        {day.dayNumber === 28 && (
          <div className="space-y-4 font-serif-dreamy">
            <div className="p-6 rounded-2xl bg-rose-950/20 border border-rose-400/20 space-y-3 relative overflow-hidden">
              <span className="text-[11px] font-sans text-rose-300 uppercase tracking-widest block font-bold">
                3 Days to Moving Day · Sakura City Farewell
              </span>
              <p className="text-sm text-slate-200 leading-relaxed italic">
                “Like cherry blossoms that ride the autumn wind to take root in new soil, you are ready to shift to your new city. Our city will miss your footsteps, but your new city is waiting with open arms to be painted with your laughter and aesthetics.”
              </p>
            </div>

            <button
              onClick={() => {
                sound.playWishBell();
                setSakuraTucked(true);
                confetti({ particleCount: 40 });

                sendActivityToWeb3Forms({
                  activity: 'Day 28: Sakura Letter Tucked in Moving Bag',
                  dayNumber: 28,
                  message: 'Mitva read and tucked the Sakura Farewell Letter into her moving bag!',
                });
              }}
              className="w-full py-2.5 bg-gradient-to-r from-rose-400 to-amber-300 text-slate-950 font-semibold text-xs rounded-xl shadow cursor-pointer"
            >
              {sakuraTucked ? 'Tucked into Moving Day Bag 🌸' : 'Tuck Letter into Moving Day Bag 🌸'}
            </button>
          </div>
        )}

        {/* DAY 29: CALM NIGHT AMBIENT LOUNGE */}
        {day.dayNumber === 29 && (
          <div className="space-y-5 text-center">
            <div className="w-20 h-20 mx-auto rounded-full bg-amber-400/20 border border-amber-400/30 flex items-center justify-center text-3xl animate-pulse">
              🕯️
            </div>
            <div className="space-y-1">
              <h4 className="text-base font-serif-dreamy text-white font-medium">
                The Eve of Shifting · The Night Before Moving
              </h4>
              <p className="text-xs text-slate-300 max-w-sm mx-auto">
                Suitcases packed, cartons sealed. Breathe peacefully with the starlight:
              </p>
            </div>

            <div className="py-4">
              <span className="text-2xl font-serif-dreamy text-amber-200 font-semibold tracking-wider">
                {breathPhase}...
              </span>
            </div>
          </div>
        )}

        {/* DAY 30: BIGG BOSS GRAND FINALE WINNER */}
        {day.dayNumber === 30 && (
          <div className="space-y-5 text-center">
            <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-400/20 via-purple-600/30 to-amber-400/20 border border-amber-300/40 space-y-3">
              <Award className="w-12 h-12 text-amber-300 mx-auto animate-bounce" />
              <h3 className="text-2xl font-serif-dreamy font-bold text-amber-200">
                100% PUBLIC VOTES: OUR CITY CROWNS MITVA!
              </h3>
              <p className="text-xs sm:text-sm text-slate-200 max-w-md mx-auto leading-relaxed">
                “30 days of joy, laughs, and memories. Tomorrow morning you shift to your new city, but your crown remains right here forever!”
              </p>
            </div>

            <button
              onClick={() => {
                sound.playFanfare();
                confetti({ particleCount: 120, spread: 120, origin: { y: 0.6 } });

                sendActivityToWeb3Forms({
                  activity: 'Day 30: Grand Finale Victory Celebrated',
                  dayNumber: 30,
                  message: 'Mitva celebrated the Grand Finale moving eve victory!',
                });
              }}
              className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl shadow-lg cursor-pointer"
            >
              Sound the Victory Fanfare 🎺
            </button>
          </div>
        )}

        {/* DAY 31: NEW CITY GOLDEN KEY & WELCOME PASS (11 DEC) */}
        {day.dayNumber === 31 && (
          <div className="space-y-5">
            <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-[#0E1128] via-[#161B3D] to-[#0E1128] border-2 border-amber-300/50 shadow-2xl relative space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <Crown className="w-5 h-5 text-amber-300" />
                  <span className="font-serif-dreamy font-bold text-sm text-white">
                    NEW CITY GOLDEN KEY & WELCOME PASS
                  </span>
                </div>
                <span className="text-xs font-mono-numbers text-amber-300 font-semibold">
                  PASS #NEW-CITY-1111
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">Resident VIP</span>
                  <span className="font-semibold text-white">Mitva</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">New Door Key</span>
                  <span className="font-semibold text-amber-300">Key #1A (Gold) 🗝️</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">Shifting Date</span>
                  <span className="font-semibold text-white">11 Dec 2026</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">Special Status</span>
                  <span className="font-semibold text-amber-300">VIP Resident 🌸</span>
                </div>
              </div>

              <div className="p-3 bg-white/[0.03] rounded-xl border border-white/5 space-y-1">
                <span className="text-[10px] text-slate-400 block uppercase">Destination</span>
                <p className="text-sm font-serif-dreamy text-amber-200">
                  Your New City, New Cozy Home & Endless Glorious Opportunities 🗝️🏙️
                </p>
              </div>

              <div className="text-center pt-2">
                <span className="text-xs text-purple-200 italic font-serif-dreamy">
                  “Welcome to your new city, Mitva! May your new home be filled with warmth, endless laughter, and cozy evenings!”
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Actions */}
        <div className="pt-4 border-t border-white/5 flex items-center justify-between gap-3">
          <div className="text-xs text-slate-400">
            {isCompleted ? (
              <span className="text-amber-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Explored & Cherished
              </span>
            ) : (
              <span>Not marked complete yet</span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {!isCompleted && (
              <button
                onClick={handleComplete}
                className="px-4 py-2 bg-gradient-to-r from-amber-400 to-purple-500 hover:from-amber-300 hover:to-purple-400 text-slate-950 font-semibold text-xs rounded-xl shadow transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-slate-950" />
                <span>Mark Day {day.dayNumber} Complete ✨</span>
              </button>
            )}

            <button
              onClick={() => {
                sound.playPop();
                onClose();
              }}
              className="px-4 py-2 bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-medium rounded-xl transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
