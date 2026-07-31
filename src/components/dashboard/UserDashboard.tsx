import React from 'react';
import { useApp } from '../../context/AppContext';
import { MUSIC_TOOLS } from '../../data/toolsData';
import { Bookmark, Award, Flame, Sliders, History, ArrowRight } from 'lucide-react';

export const UserDashboard: React.FC = () => {
  const { favorites, userPresets, practiceSessions, dailyStreak, setActiveView, setSelectedToolId } = useApp();

  const favoriteTools = MUSIC_TOOLS.filter(t => favorites.includes(t.id));

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4">
      
      {/* Header */}
      <div className="border-b border-[#E8DCCB] pb-6">
        <h1 className="font-heading font-bold text-2xl sm:text-3xl text-[#2F2A26]">Musician Profile & Dashboard</h1>
        <p className="text-sm text-[#6D655D] mt-1">Manage saved tool presets, favorite modules, daily streaks, and practice session logs.</p>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#FFFDF8] border border-[#E8DCCB] rounded-2xl p-5 flex items-center space-x-3">
          <Flame className="w-8 h-8 text-[#AD8B73]" />
          <div>
            <span className="font-heading font-bold text-2xl text-[#2F2A26] block">{dailyStreak} Days</span>
            <span className="text-xs text-[#6D655D]">Practice Streak</span>
          </div>
        </div>

        <div className="bg-[#FFFDF8] border border-[#E8DCCB] rounded-2xl p-5 flex items-center space-x-3">
          <Bookmark className="w-8 h-8 text-[#5F8B4C]" />
          <div>
            <span className="font-heading font-bold text-2xl text-[#2F2A26] block">{userPresets.length} Presets</span>
            <span className="text-xs text-[#6D655D]">Saved Configurations</span>
          </div>
        </div>

        <div className="bg-[#FFFDF8] border border-[#E8DCCB] rounded-2xl p-5 flex items-center space-x-3">
          <Award className="w-8 h-8 text-[#C9A227]" />
          <div>
            <span className="font-heading font-bold text-2xl text-[#2F2A26] block">{favorites.length} Modules</span>
            <span className="text-xs text-[#6D655D]">Pinned Favorites</span>
          </div>
        </div>
      </div>

      {/* Favorite Tools */}
      <div className="bg-[#FFFDF8] border border-[#E8DCCB] rounded-2xl p-6 space-y-4 shadow-sm">
        <h3 className="font-heading font-semibold text-base text-[#2F2A26]">Pinned Favorite Tools</h3>
        {favoriteTools.length === 0 ? (
          <p className="text-xs text-[#6D655D]">No tools pinned yet. Pin any tool to access it instantly here.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {favoriteTools.map(t => (
              <button
                key={t.id}
                onClick={() => {
                  setSelectedToolId(t.id);
                  setActiveView(t.id);
                }}
                className="p-3 text-left rounded-xl bg-[#FFFBE9] border border-[#E8DCCB] hover:border-[#AD8B73] transition-all flex items-center justify-between group"
              >
                <div>
                  <h4 className="font-heading font-bold text-sm text-[#2F2A26] group-hover:text-[#AD8B73]">{t.name}</h4>
                  <p className="text-xs text-[#6D655D] line-clamp-1">{t.description}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-[#AD8B73]" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Practice Log History */}
      <div className="bg-[#FFFDF8] border border-[#E8DCCB] rounded-2xl p-6 space-y-4 shadow-sm">
        <h3 className="font-heading font-semibold text-base text-[#2F2A26]">Recent Session History</h3>
        <div className="space-y-2">
          {practiceSessions.slice(0, 5).map(s => (
            <div key={s.id} className="p-3 rounded-xl bg-[#FFFBE9] border border-[#E8DCCB] flex justify-between items-center text-xs">
              <div>
                <span className="font-heading font-bold text-[#2F2A26] block">{s.topic}</span>
                <span className="text-[#6D655D]">{s.notes}</span>
              </div>
              <div className="text-right">
                <span className="font-mono font-bold text-[#AD8B73] block">{s.durationMinutes} min</span>
                <span className="text-[10px] text-[#6D655D]">{s.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
