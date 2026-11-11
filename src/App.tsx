import React, { useState, useEffect } from 'react';
import { CosmicBackground } from './components/CosmicBackground';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { CalendarGrid } from './components/CalendarGrid';
import { MemoryVault } from './components/MemoryVault';
import { Footer } from './components/Footer';
import { SurpriseModal } from './components/SurpriseModal';
import { WishModal } from './components/WishModal';
import { SurpriseDay, UserWish, VaultNote } from './types';
import { INITIAL_VAULT_NOTES, CALENDAR_DAYS } from './data/calendarData';

export default function App() {
  // Sound states
  const [isMuted, setIsMuted] = useState(false);
  const [isAmbientPlaying, setIsAmbientPlaying] = useState(false);

  // Wishes State with LocalStorage
  const [wishes, setWishes] = useState<UserWish[]>(() => {
    try {
      const saved = localStorage.getItem('mitva_1111_wishes');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [
      {
        id: 'initial-wish',
        timestamp: Date.now(),
        text: 'To have the most extraordinary, joyful, and peaceful new adventure starting December 11th! 🌸',
        flower: 'Cosmic Lotus',
      },
    ];
  });

  useEffect(() => {
    localStorage.setItem('mitva_1111_wishes', JSON.stringify(wishes));
  }, [wishes]);

  // Completed Days State with LocalStorage
  const [completedDays, setCompletedDays] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('mitva_completed_days');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [];
  });

  useEffect(() => {
    localStorage.setItem('mitva_completed_days', JSON.stringify(completedDays));
  }, [completedDays]);

  // Vault Notes State with LocalStorage
  const [notes, setNotes] = useState<VaultNote[]>(() => {
    try {
      const saved = localStorage.getItem('mitva_vault_notes');
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_VAULT_NOTES;
  });

  useEffect(() => {
    localStorage.setItem('mitva_vault_notes', JSON.stringify(notes));
  }, [notes]);

  // Modal states
  const [activeSurpriseDay, setActiveSurpriseDay] = useState<SurpriseDay | null>(null);
  const [isWishJarOpen, setIsWishJarOpen] = useState(false);

  const handleAddWish = (wish: UserWish) => {
    setWishes((prev) => [wish, ...prev]);
  };

  const handleDeleteWish = (id: string) => {
    setWishes((prev) => prev.filter((w) => w.id !== id));
  };

  const handleAddNote = (note: VaultNote) => {
    setNotes((prev) => [note, ...prev]);
  };

  const handleDeleteNote = (id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  const handleTogglePin = (id: string) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, pinned: !n.pinned } : n))
    );
  };

  const handleMarkCompleted = (dayNumber: number) => {
    if (!completedDays.includes(dayNumber)) {
      setCompletedDays((prev) => [...prev, dayNumber]);
    }
  };

  return (
    <div className="min-h-screen bg-[#070815] text-[#E2E8F0] relative selection:bg-purple-500/30 selection:text-purple-200">
      {/* Dynamic Starry Night Sky Canvas */}
      <CosmicBackground />

      {/* Main Content Hierarchy */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header
          isMuted={isMuted}
          setIsMuted={setIsMuted}
          isAmbientPlaying={isAmbientPlaying}
          setIsAmbientPlaying={setIsAmbientPlaying}
          onOpenWishJar={() => setIsWishJarOpen(true)}
        />

        <main className="flex-1">
          {/* Hero Section: 11/11 Special Wish & Countdown */}
          <HeroSection
            onOpenWishJar={() => setIsWishJarOpen(true)}
            unlockedCount={CALENDAR_DAYS.length}
            totalDays={CALENDAR_DAYS.length}
          />

          {/* 30-Day Daily Surprise Roadmap - All Days Unlocked */}
          <CalendarGrid
            completedDays={completedDays}
            onSelectDay={(day) => setActiveSurpriseDay(day)}
          />

          {/* Memory Vault & Garden Section */}
          <MemoryVault
            notes={notes}
            wishes={wishes}
            onAddNote={handleAddNote}
            onDeleteNote={handleDeleteNote}
            onTogglePin={handleTogglePin}
          />
        </main>

        <Footer />
      </div>

      {/* Modals */}
      <SurpriseModal
        day={activeSurpriseDay}
        onClose={() => setActiveSurpriseDay(null)}
        onMarkCompleted={handleMarkCompleted}
        isCompleted={activeSurpriseDay ? completedDays.includes(activeSurpriseDay.dayNumber) : false}
      />

      <WishModal
        isOpen={isWishJarOpen}
        onClose={() => setIsWishJarOpen(false)}
        wishes={wishes}
        onAddWish={handleAddWish}
        onDeleteWish={handleDeleteWish}
      />
    </div>
  );
}
