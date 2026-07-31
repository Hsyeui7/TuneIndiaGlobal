import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { MUSIC_TOOLS } from '../../data/toolsData';
import { ARTICLES_DATA } from '../../data/articlesData';
import { MUSIC_DICTIONARY } from '../../data/theoryData';
import { STORE_PRODUCTS } from '../../data/storeData';
import { Search, X, Sliders, BookOpen, FileText, ShoppingBag, ArrowRight } from 'lucide-react';

export const SearchOverlay: React.FC = () => {
  const { searchOpen, setSearchOpen, setActiveView, setSelectedToolId, storeEnabled } = useApp();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === 'Escape' && searchOpen) {
        setSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [searchOpen, setSearchOpen]);

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [searchOpen]);

  if (!searchOpen) return null;

  const q = query.toLowerCase().trim();

  const filteredTools = MUSIC_TOOLS.filter(t => 
    t.name.toLowerCase().includes(q) || 
    t.description.toLowerCase().includes(q) ||
    t.tags.some(tag => tag.toLowerCase().includes(q))
  );

  const filteredArticles = ARTICLES_DATA.filter(a => 
    a.title.toLowerCase().includes(q) || 
    a.summary.toLowerCase().includes(q) ||
    a.tags.some(tag => tag.toLowerCase().includes(q))
  );

  const filteredDictionary = MUSIC_DICTIONARY.filter(d =>
    d.term.toLowerCase().includes(q) ||
    d.definition.toLowerCase().includes(q)
  );

  const filteredProducts = STORE_PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.category.toLowerCase().includes(q)
  );

  const handleSelectTool = (toolId: string) => {
    setSelectedToolId(toolId);
    if (toolId === 'metronome') setActiveView('metronome');
    else if (toolId === 'chromatic-tuner') setActiveView('tuner');
    else if (toolId === 'tap-bpm') setActiveView('tap-bpm');
    else if (toolId === 'pitch-generator') setActiveView('pitch-generator');
    else if (toolId === 'scale-chord-finder') setActiveView('scale-chord-finder');
    else if (toolId === 'spectrum-analyzer') setActiveView('spectrum-analyzer');
    else if (toolId === 'decibel-meter') setActiveView('decibel-meter');
    else if (toolId === 'audio-recorder') setActiveView('audio-recorder');
    else if (toolId === 'virtual-piano') setActiveView('virtual-piano');
    else if (toolId === 'drum-machine') setActiveView('drum-machine');
    else if (toolId === 'fretboard-visualizer') setActiveView('fretboard');
    else if (toolId === 'gain-staging-calc') setActiveView('gain-staging-calc');
    else if (toolId === 'audio-converters') setActiveView('audio-converters');
    else if (toolId === 'circle-of-fifths') setActiveView('circle-of-fifths');
    else if (toolId === 'ear-training') setActiveView('ear-training');
    else if (toolId === 'music-dictionary') setActiveView('music-dictionary');
    else if (toolId === 'practice-hub') setActiveView('practice');
    else setActiveView('music-tools');

    setSearchOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#2F2A26]/50 backdrop-blur-sm flex items-start justify-center pt-16 sm:pt-24 px-4 transition-all">
      <div className="bg-[#FFFDF8] border border-[#E8DCCB] rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        
        {/* Search Header */}
        <div className="p-4 border-b border-[#E8DCCB] flex items-center space-x-3 bg-[#FFFBE9]/50">
          <Search className="w-5 h-5 text-[#AD8B73]" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search metronome, pitch tuner, ragas, LUFS, acoustic guitar..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent border-none text-[#2F2A26] placeholder-[#6D655D] text-base focus:outline-none"
          />
          {query && (
            <button onClick={() => setQuery('')} className="p-1 text-[#6D655D] hover:text-[#2F2A26]">
              <X className="w-4 h-4" />
            </button>
          )}
          <button onClick={() => setSearchOpen(false)} className="px-2 py-1 text-xs font-semibold rounded-md bg-[#E8DCCB]/50 text-[#6D655D]">
            ESC
          </button>
        </div>

        {/* Results Container */}
        <div className="p-4 overflow-y-auto space-y-6 flex-1">
          {!q ? (
            <div className="space-y-4">
              <p className="text-xs font-semibold text-[#6D655D] uppercase tracking-wider">Popular Quick Searches</p>
              <div className="flex flex-wrap gap-2">
                {['Metronome', 'Guitar Tuner', 'Circle of Fifths', 'Tap BPM', 'Audio Recorder', 'Binaural Beats', 'Decibel Meter', 'LUFS Meter', 'Drum Machine'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-3 py-1.5 rounded-xl bg-[#FFFBE9] border border-[#E8DCCB] text-xs text-[#2F2A26] hover:border-[#AD8B73] hover:text-[#AD8B73] transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {/* Music Tools Results */}
              {filteredTools.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-xs font-bold text-[#AD8B73] uppercase tracking-wider">
                    <Sliders className="w-4 h-4" />
                    <span>Music & Studio Tools ({filteredTools.length})</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {filteredTools.slice(0, 6).map((tool) => (
                      <button
                        key={tool.id}
                        onClick={() => handleSelectTool(tool.id)}
                        className="p-3 text-left rounded-xl bg-[#FFFBE9] border border-[#E8DCCB] hover:border-[#AD8B73] transition-all group flex items-start justify-between"
                      >
                        <div>
                          <h4 className="font-heading font-semibold text-sm text-[#2F2A26] group-hover:text-[#AD8B73] transition-colors">
                            {tool.name}
                          </h4>
                          <p className="text-xs text-[#6D655D] line-clamp-1 mt-0.5">{tool.description}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#AD8B73] opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-0.5 ml-2" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Theory Dictionary Results */}
              {filteredDictionary.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-xs font-bold text-[#AD8B73] uppercase tracking-wider">
                    <BookOpen className="w-4 h-4" />
                    <span>Music Theory Terms ({filteredDictionary.length})</span>
                  </div>
                  <div className="space-y-2">
                    {filteredDictionary.slice(0, 3).map((item) => (
                      <div key={item.term} className="p-3 rounded-xl bg-[#FFFBE9] border border-[#E8DCCB]">
                        <div className="flex items-center justify-between">
                          <span className="font-heading font-bold text-sm text-[#2F2A26]">{item.term}</span>
                          <span className="text-[10px] font-medium px-2 py-0.5 bg-[#E8DCCB]/50 rounded-full text-[#6D655D]">{item.category}</span>
                        </div>
                        <p className="text-xs text-[#6D655D] mt-1">{item.definition}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Articles Results */}
              {filteredArticles.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-xs font-bold text-[#AD8B73] uppercase tracking-wider">
                    <FileText className="w-4 h-4" />
                    <span>Articles & Guides ({filteredArticles.length})</span>
                  </div>
                  <div className="space-y-2">
                    {filteredArticles.map((art) => (
                      <button
                        key={art.id}
                        onClick={() => {
                          setActiveView('articles');
                          setSearchOpen(false);
                        }}
                        className="w-full text-left p-3 rounded-xl bg-[#FFFBE9] border border-[#E8DCCB] hover:border-[#AD8B73] transition-all flex items-center justify-between"
                      >
                        <div>
                          <h4 className="font-heading font-semibold text-sm text-[#2F2A26]">{art.title}</h4>
                          <p className="text-xs text-[#6D655D] mt-0.5">{art.author} • {art.readTime}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#AD8B73]" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Store Products */}
              {filteredProducts.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-xs font-bold text-[#AD8B73] uppercase tracking-wider">
                    <ShoppingBag className="w-4 h-4" />
                    <span>Marketplace ({filteredProducts.length})</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {filteredProducts.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => {
                          setActiveView('store');
                          setSearchOpen(false);
                        }}
                        className="p-3 text-left rounded-xl bg-[#FFFBE9] border border-[#E8DCCB] hover:border-[#AD8B73] transition-all flex items-center space-x-3"
                      >
                        <img src={p.image} alt={p.name} className="w-10 h-10 object-cover rounded-lg shrink-0" />
                        <div>
                          <h5 className="font-heading font-medium text-xs text-[#2F2A26] line-clamp-1">{p.name}</h5>
                          <span className="text-xs font-bold text-[#AD8B73]">₹{p.price.toLocaleString()}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {filteredTools.length === 0 && filteredDictionary.length === 0 && filteredArticles.length === 0 && filteredProducts.length === 0 && (
                <div className="text-center py-8 text-[#6D655D]">
                  <p className="text-sm font-medium">No direct matches found for "{query}".</p>
                  <p className="text-xs mt-1">Try searching for terms like "BPM", "Tuner", "Scales", or "Mic".</p>
                </div>
              )}
            </>
          )}
        </div>

      </div>
    </div>
  );
};
