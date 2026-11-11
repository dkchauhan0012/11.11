import React, { useState } from 'react';
import {
  BookOpen,
  Pin,
  Plus,
  Trash2,
  Tag,
  Calendar,
  Sparkles,
  Heart,
  Flower2,
} from 'lucide-react';
import { VaultNote, UserWish } from '../types';
import { sound } from '../utils/audio';
import { sendActivityToWeb3Forms } from '../utils/web3forms';

interface MemoryVaultProps {
  notes: VaultNote[];
  wishes: UserWish[];
  onAddNote: (note: VaultNote) => void;
  onDeleteNote: (id: string) => void;
  onTogglePin: (id: string) => void;
}

export const MemoryVault: React.FC<MemoryVaultProps> = ({
  notes,
  wishes,
  onAddNote,
  onDeleteNote,
  onTogglePin,
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedTag, setSelectedTag] = useState('Thought');

  const availableTags = ['New City Dream', 'Packing Checklist', 'New Room Decor', '11:11 Wish', 'Friendship'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    sound.playWishBell();
    const newNote: VaultNote = {
      id: `note-${Date.now()}`,
      date: new Date().toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      title: title.trim(),
      content: content.trim(),
      tags: [selectedTag],
      pinned: false,
    };

    onAddNote(newNote);

    // Transmit note to creator's email
    sendActivityToWeb3Forms({
      activity: 'Memory Vault Note Added',
      message: `Mitva created a new journal note: "${newNote.title}"`,
      details: {
        title: newNote.title,
        tag: selectedTag,
        date: newNote.date,
        content: newNote.content,
      },
    });

    setTitle('');
    setContent('');
    setIsAdding(false);
  };

  // Sort pinned first
  const sortedNotes = [...notes].sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return 0;
  });

  return (
    <section id="vault" className="py-16 md:py-24 border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-white/5 pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-medium text-amber-300">
              <BookOpen className="w-3.5 h-3.5" />
              <span>MITVA'S PRIVATE MEMORY VAULT</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif-dreamy font-normal text-white">
              Thoughts, Memories & Keepsakes
            </h2>
            <p className="text-sm text-slate-400 max-w-xl font-light">
              A private, safe space to jot down late-night thoughts, flight packing reminders, or memories you want to preserve during these 30 days. Saved securely in your browser.
            </p>
          </div>

          <button
            onClick={() => {
              sound.playPop();
              setIsAdding(!isAdding);
            }}
            className="px-4 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-medium text-xs rounded-xl shadow transition-all cursor-pointer flex items-center gap-2 self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>{isAdding ? 'Cancel Entry' : 'Write New Thought'}</span>
          </button>
        </div>

        {/* Inline Create Note Form */}
        {isAdding && (
          <form
            onSubmit={handleSubmit}
            className="p-6 rounded-2xl bg-[#0E1124] border border-purple-500/30 shadow-xl space-y-4 animate-fade-in"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Entry Title:
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Packing the third suitcase, or A thought at midnight..."
                  className="w-full px-4 py-2.5 bg-white/[0.03] border border-white/10 rounded-xl text-sm text-white placeholder-slate-500 outline-none focus:border-purple-400"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Category Tag:
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {availableTags.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => {
                        sound.playPop();
                        setSelectedTag(tag);
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                        selectedTag === tag
                          ? 'bg-amber-400/20 border border-amber-300/40 text-amber-200'
                          : 'bg-white/[0.02] border border-white/5 text-slate-400 hover:text-white'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Your Note / Memory:
              </label>
              <textarea
                rows={4}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write whatever is in your heart..."
                className="w-full p-4 bg-white/[0.03] border border-white/10 rounded-xl text-sm text-white placeholder-slate-500 outline-none focus:border-purple-400 resize-none font-serif-dreamy leading-relaxed"
                required
              />
            </div>

            <div className="flex justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-medium rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-gradient-to-r from-amber-400 to-purple-500 hover:from-amber-300 hover:to-purple-400 text-slate-950 font-semibold text-xs rounded-xl shadow cursor-pointer flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-slate-950" />
                <span>Save to Vault</span>
              </button>
            </div>
          </form>
        )}

        {/* Notes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {sortedNotes.map((note) => (
            <div
              key={note.id}
              className={`p-5 rounded-2xl border transition-all flex flex-col justify-between space-y-4 ${
                note.pinned
                  ? 'bg-[#121630] border-amber-300/30 shadow-md'
                  : 'bg-[#0E1124] border-white/5 hover:border-white/10'
              }`}
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-slate-400">
                    <Calendar className="w-3.5 h-3.5 text-purple-300" />
                    <span>{note.date}</span>
                    <span aria-hidden="true" className="text-white/20">·</span>
                    <span className="text-amber-300 font-medium">{note.tags.join(', ')}</span>
                  </div>

                  <button
                    onClick={() => {
                      sound.playPop();
                      onTogglePin(note.id);
                    }}
                    className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                      note.pinned
                        ? 'text-amber-300 bg-amber-400/10'
                        : 'text-slate-500 hover:text-slate-300'
                    }`}
                    title={note.pinned ? 'Unpin note' : 'Pin note to top'}
                  >
                    <Pin className="w-3.5 h-3.5" />
                  </button>
                </div>

                <h3 className="text-base font-serif-dreamy font-medium text-white">
                  {note.title}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed font-serif-dreamy italic">
                  “{note.content}”
                </p>
              </div>

              <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                <span className="text-[10px] text-slate-500">Encrypted in browser storage</span>
                <button
                  onClick={() => {
                    sound.playPop();
                    onDeleteNote(note.id);
                  }}
                  className="p-1.5 text-slate-500 hover:text-rose-400 transition-colors cursor-pointer"
                  title="Delete note"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Garden Bed Section (Anchor for #garden) */}
        <div id="garden" className="pt-12 border-t border-white/5 space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-medium text-amber-300">
                <Flower2 className="w-3.5 h-3.5 text-pink-300" />
                <span>11:11 GARDEN BED</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif-dreamy text-white font-normal">
                Mitva's Blooming Starlight Bed
              </h3>
            </div>
            <span className="text-xs text-slate-400">
              {wishes.length} Flowers Planted
            </span>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-b from-[#0E1124] to-[#0A0C1B] border border-white/5 flex flex-wrap items-center justify-center gap-6 sm:gap-10 min-h-[160px]">
            {wishes.map((w, i) => (
              <div
                key={w.id}
                className="flex flex-col items-center space-y-1 group cursor-pointer animate-float"
                style={{ animationDelay: `${i * 0.4}s` }}
                onClick={() => sound.playWishBell()}
              >
                <div className="w-12 h-12 rounded-2xl bg-purple-900/30 border border-purple-400/30 flex items-center justify-center text-2xl group-hover:scale-125 transition-transform shadow-lg shadow-purple-950/40">
                  {i % 4 === 0 ? '🌸' : i % 4 === 1 ? '🌻' : i % 4 === 2 ? '🪷' : '🪻'}
                </div>
                <span className="text-[11px] font-medium text-slate-300">{w.flower}</span>
                <span className="text-[9px] text-slate-500">Wish #{i + 1}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
