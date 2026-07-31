import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MUSIC_TOOLS } from '../../data/toolsData';
import { Sliders, Search, ArrowRight, Bookmark, Check } from 'lucide-react';

export const ToolsCatalogView: React.FC = () => {
  const { setActiveView, setSelectedToolId, favorites, toggleFavorite } = useApp();
  const [selectedCat, setSelectedCat] = useState<string>('all');
  const [filterQuery, setFilterQuery] = useState<string>('');

  const categories = [
    { id: 'all', label: 'All Modules' },
    { id: 'music-tools', label: 'Music & Pitch Tools' },
    { id: 'studio-tools', label: 'Studio & Gain Staging' },
    { id: 'analysis', label: 'Audio Analysis' },
    { id: 'recording', label: 'Recording' },
    { id: 'instruments', label: 'Virtual Instruments' },
    { id: 'theory', label: 'Music Theory' },
    { id: 'practice', label: 'Practice' },
  ];

  const handleToolClick = (toolId: string) => {
    setSelectedToolId(toolId);
    if (toolId === 'metronome') setActiveView('metronome');
    else if (toolId === 'chromatic-tuner') setActiveView('tuner');
    else if (toolId === 'tap-bpm') setActiveView('tap-bpm');
    else if (toolId === 'pitch-generator') setActiveView('pitch-generator');
    else if (toolId === 'spectrum-analyzer') setActiveView('spectrum-analyzer');
    else if (toolId === 'audio-recorder') setActiveView('audio-recorder');
    else if (toolId === 'virtual-piano') setActiveView('virtual-piano');
    else if (toolId === 'drum-machine') setActiveView('drum-machine');
    else if (toolId === 'fretboard-visualizer' || toolId === 'multi-track-looper') setActiveView('instruments');
    else if (toolId === 'gain-staging-calc') setActiveView('gain-staging-calc');
    else if (toolId === 'audio-converters') setActiveView('audio-converters');
    else if (toolId === 'circle-of-fifths') setActiveView('circle-of-fifths');
    else if (toolId === 'ear-training') setActiveView('ear-training');
    else if (toolId === 'music-dictionary') setActiveView('music-dictionary');
    else if (toolId === 'practice-hub') setActiveView('practice');
    else setActiveView('music-tools');
  };

  const filteredTools = MUSIC_TOOLS.filter(tool => {
    const matchesCat = selectedCat === 'all' || tool.category === selectedCat;
    const q = filterQuery.toLowerCase().trim();
    const matchesQuery = !q || tool.name.toLowerCase().includes(q) || tool.description.toLowerCase().includes(q) || tool.tags.some(t => t.toLowerCase().includes(q));
    return matchesCat && matchesQuery;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-8 py-4">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8DCCB] pb-6">
        <div>
          <h1 className="font-heading font-bold text-2xl sm:text-3xl text-[#2F2A26]">Music & Studio Tools Directory</h1>
          <p className="text-sm text-[#6D655D] mt-1">Explore all independent audio DSP tools, meters, generators, and virtual instruments.</p>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-3 text-[#AD8B73]" />
          <input
            type="text"
            placeholder="Filter tools by name..."
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-[#FFFDF8] border border-[#E8DCCB] focus:border-[#AD8B73] focus:outline-none"
          />
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap gap-2">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCat(cat.id)}
            className={`px-4 py-2 text-xs font-semibold rounded-xl border transition-all ${
              selectedCat === cat.id
                ? 'bg-[#AD8B73] text-[#FFFBE9] border-[#AD8B73]'
                : 'bg-[#FFFDF8] border-[#E8DCCB] text-[#6D655D] hover:border-[#AD8B73]'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTools.map(tool => {
          const isFav = favorites.includes(tool.id);
          return (
            <div
              key={tool.id}
              className="bg-[#FFFDF8] border border-[#E8DCCB] rounded-2xl p-6 shadow-xs hover:border-[#AD8B73] transition-all group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div className="w-10 h-10 rounded-xl bg-[#E3CAA5]/30 text-[#AD8B73] flex items-center justify-center group-hover:bg-[#AD8B73] group-hover:text-[#FFFBE9] transition-colors">
                    <Sliders className="w-5 h-5" />
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(tool.id);
                    }}
                    className={`p-2 rounded-lg transition-colors ${
                      isFav ? 'text-[#5F8B4C] bg-[#5F8B4C]/10' : 'text-[#6D655D] hover:text-[#AD8B73]'
                    }`}
                    title={isFav ? 'Remove Favorite' : 'Pin Favorite'}
                  >
                    <Bookmark className="w-4 h-4 fill-current" />
                  </button>
                </div>

                <h3 className="font-heading font-bold text-lg text-[#2F2A26] group-hover:text-[#AD8B73] transition-colors">
                  {tool.name}
                </h3>
                <p className="text-xs text-[#6D655D] leading-relaxed line-clamp-3">
                  {tool.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-[#E8DCCB]/60 flex items-center justify-between text-xs font-semibold">
                <button
                  onClick={() => handleToolClick(tool.id)}
                  className="text-[#AD8B73] hover:underline flex items-center space-x-1"
                >
                  <span>Launch Tool</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <span className="text-[10px] uppercase font-mono text-[#6D655D]">{tool.category}</span>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
