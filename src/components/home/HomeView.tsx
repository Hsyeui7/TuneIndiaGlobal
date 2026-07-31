import React from 'react';
import { useApp } from '../../context/AppContext';
import { MUSIC_TOOLS } from '../../data/toolsData';
import { ARTICLES_DATA } from '../../data/articlesData';
import { 
  Search, 
  Sliders, 
  BookOpen, 
  Mic, 
  BarChart2, 
  Award, 
  ShoppingBag, 
  Sparkles, 
  ArrowRight, 
  Music, 
  ShieldCheck, 
  CheckCircle2, 
  Star,
  Activity,
  Zap,
  Grid
} from 'lucide-react';

export const HomeView: React.FC = () => {
  const { setActiveView, setSelectedToolId, setSearchOpen, storeEnabled } = useApp();

  const handleToolClick = (toolId: string) => {
    setSelectedToolId(toolId);
    if (toolId === 'metronome') setActiveView('metronome');
    else if (toolId === 'chromatic-tuner') setActiveView('tuner');
    else if (toolId === 'tap-bpm') setActiveView('tap-bpm');
    else if (toolId === 'pitch-generator') setActiveView('pitch-generator');
    else if (toolId === 'spectrum-analyzer') setActiveView('spectrum-analyzer');
    else if (toolId === 'audio-recorder') setActiveView('audio-recorder');
    else if (toolId === 'virtual-piano') setActiveView('virtual-piano');
    else if (toolId === 'circle-of-fifths') setActiveView('circle-of-fifths');
    else if (toolId === 'practice-hub') setActiveView('practice');
    else setActiveView('music-tools');
  };

  const categories = [
    { id: 'music-tools', name: 'Music Tools & Pitch', count: '12 Modules', icon: Sliders, color: 'bg-[#AD8B73]' },
    { id: 'studio-tools', name: 'Studio & Gain Staging', count: '6 Utilities', icon: Activity, color: 'bg-[#CEAB93]' },
    { id: 'theory', name: 'Music Theory & Modes', count: '8 Guides', icon: BookOpen, color: 'bg-[#AD8B73]' },
    { id: 'recording', name: 'Studio Audio Recorder', count: '4 Features', icon: Mic, color: 'bg-[#5F8B4C]' },
    { id: 'analysis', name: 'FFT & Spectrum Analysis', count: '6 Meters', icon: BarChart2, color: 'bg-[#AD8B73]' },
    { id: 'instruments', name: 'Virtual Instruments', count: 'Piano, Drums, Fretboard', icon: Grid, color: 'bg-[#CEAB93]' },
    { id: 'practice', name: 'Practice Tracker & Streaks', count: 'Log & Goals', icon: Award, color: 'bg-[#C9A227]' },
    { id: 'store', name: 'Store Marketplace', count: storeEnabled ? 'In Stock' : 'Coming Soon', icon: ShoppingBag, color: 'bg-[#AD8B73]' },
  ];

  const featuredTools = MUSIC_TOOLS.filter(t => t.featured);

  return (
    <div className="space-y-20 py-6">
      
      {/* Hero Section */}
      <section className="text-center space-y-8 max-w-4xl mx-auto px-4 pt-4 sm:pt-10">
        
        {/* Subtle Pill Badge */}
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#E3CAA5]/30 border border-[#E8DCCB] text-[#AD8B73] text-xs font-semibold">
          <Sparkles className="w-4 h-4" />
          <span>The All-In-One Ecosystem For Everything Music</span>
        </div>

        {/* Hero Title */}
        <h1 className="font-heading font-extrabold text-4xl sm:text-6xl lg:text-7xl text-[#2F2A26] tracking-tight leading-[1.1]">
          Everything Music. <br className="hidden sm:inline" />
          <span className="text-[#AD8B73]">One Destination.</span>
        </h1>

        <p className="text-base sm:text-lg text-[#6D655D] max-w-2xl mx-auto leading-relaxed">
          The ultimate digital platform for musicians, producers, sound engineers, and teachers. Precision metronome, pitch tuner, FFT analysis, theory guides, and recording—all in one place.
        </p>

        {/* Hero Search Box */}
        <div className="max-w-2xl mx-auto relative shadow-sm">
          <button
            onClick={() => setSearchOpen(true)}
            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-[#FFFDF8] border border-[#E8DCCB] hover:border-[#AD8B73] text-[#6D655D] flex items-center justify-between text-sm transition-all group"
          >
            <div className="flex items-center space-x-3">
              <Search className="w-5 h-5 text-[#AD8B73] group-hover:scale-110 transition-transform" />
              <span>Search metronome, tuner, circle of fifths, LUFS, ragas...</span>
            </div>
            <kbd className="hidden sm:inline-block px-2 py-1 text-xs font-mono bg-[#E8DCCB]/50 rounded-lg text-[#2F2A26]">⌘K</kbd>
          </button>
        </div>

        {/* Quick Shortcut Buttons */}
        <div className="flex flex-wrap justify-center items-center gap-2 text-xs font-medium text-[#6D655D]">
          <span className="text-[#AD8B73] font-semibold">Quick Launch:</span>
          {[
            { id: 'metronome', label: 'Metronome' },
            { id: 'chromatic-tuner', label: 'Guitar Tuner' },
            { id: 'circle-of-fifths', label: 'Circle of Fifths' },
            { id: 'spectrum-analyzer', label: 'Spectrum Analyzer' },
            { id: 'virtual-piano', label: 'Virtual Piano' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => handleToolClick(item.id)}
              className="px-3 py-1.5 rounded-xl bg-[#FFFDF8] border border-[#E8DCCB] hover:border-[#AD8B73] hover:text-[#AD8B73] transition-all"
            >
              {item.label}
            </button>
          ))}
        </div>

      </section>

      {/* Featured Tools Grid */}
      <section className="max-w-7xl mx-auto px-4 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-[#E8DCCB] pb-4">
          <div>
            <h2 className="font-heading font-bold text-2xl text-[#2F2A26]">Featured Audio & Music Modules</h2>
            <p className="text-sm text-[#6D655D] mt-0.5">Crafted with high-precision Web Audio DSP for studio accuracy.</p>
          </div>
          <button
            onClick={() => setActiveView('music-tools')}
            className="text-xs font-bold text-[#AD8B73] hover:underline flex items-center space-x-1"
          >
            <span>Explore All 40+ Tools</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredTools.map((tool) => (
            <div
              key={tool.id}
              onClick={() => handleToolClick(tool.id)}
              className="bg-[#FFFDF8] border border-[#E8DCCB] rounded-2xl p-6 shadow-xs hover:border-[#AD8B73] hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div className="w-10 h-10 rounded-xl bg-[#E3CAA5]/30 text-[#AD8B73] flex items-center justify-center group-hover:bg-[#AD8B73] group-hover:text-[#FFFBE9] transition-colors">
                    <Sliders className="w-5 h-5" />
                  </div>
                  {tool.popular && (
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#AD8B73]/15 text-[#AD8B73]">
                      POPULAR
                    </span>
                  )}
                </div>

                <h3 className="font-heading font-bold text-lg text-[#2F2A26] group-hover:text-[#AD8B73] transition-colors">
                  {tool.name}
                </h3>
                <p className="text-xs text-[#6D655D] leading-relaxed line-clamp-3">
                  {tool.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-[#E8DCCB]/60 flex items-center justify-between text-xs font-semibold text-[#AD8B73]">
                <span>Open Module</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Music Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 space-y-6">
        <div className="border-b border-[#E8DCCB] pb-4">
          <h2 className="font-heading font-bold text-2xl text-[#2F2A26]">Complete Ecosystem Categories</h2>
          <p className="text-sm text-[#6D655D] mt-0.5">Organized modules spanning theory, studio engineering, practice, and instruments.</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveView(cat.id)}
                className="bg-[#FFFDF8] border border-[#E8DCCB] rounded-2xl p-5 text-left hover:border-[#AD8B73] transition-all group flex flex-col justify-between h-36"
              >
                <div className="w-10 h-10 rounded-xl bg-[#FFFBE9] border border-[#E8DCCB] flex items-center justify-center text-[#AD8B73] group-hover:bg-[#AD8B73] group-hover:text-[#FFFBE9] transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-sm text-[#2F2A26] group-hover:text-[#AD8B73]">{cat.name}</h3>
                  <span className="text-[11px] text-[#6D655D]">{cat.count}</span>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Latest Educational Articles */}
      <section className="max-w-7xl mx-auto px-4 space-y-6">
        <div className="flex items-center justify-between border-b border-[#E8DCCB] pb-4">
          <div>
            <h2 className="font-heading font-bold text-2xl text-[#2F2A26]">Latest Guides & Masterclasses</h2>
            <p className="text-sm text-[#6D655D] mt-0.5">Written by industry engineers, luthiers, and musicologists.</p>
          </div>
          <button onClick={() => setActiveView('articles')} className="text-xs font-bold text-[#AD8B73] hover:underline">
            View All Articles →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ARTICLES_DATA.map((art) => (
            <div
              key={art.id}
              onClick={() => setActiveView('articles')}
              className="bg-[#FFFDF8] border border-[#E8DCCB] rounded-2xl overflow-hidden shadow-xs hover:border-[#AD8B73] transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <img src={art.image} alt={art.title} className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="p-5 space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#AD8B73]">{art.category}</span>
                  <h3 className="font-heading font-bold text-base text-[#2F2A26] line-clamp-2 group-hover:text-[#AD8B73]">{art.title}</h3>
                  <p className="text-xs text-[#6D655D] line-clamp-2 leading-relaxed">{art.summary}</p>
                </div>
              </div>
              <div className="p-5 pt-0 text-xs font-semibold text-[#AD8B73] flex justify-between items-center">
                <span>{art.readTime}</span>
                <span>Read Guide →</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trust & Craftsmanship Banner */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="bg-[#FFFDF8] border border-[#E8DCCB] rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-[#AD8B73] text-[#FFFBE9] mx-auto flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#2F2A26]">
            Crafted for Uninterrupted Creative Flow
          </h2>
          <p className="text-sm text-[#6D655D] max-w-2xl mx-auto leading-relaxed">
            No intrusive ads, no visual clutter, no subscription popups. Designed with warm organic aesthetics and mathematical precision so you can practice and produce for hours comfortably.
          </p>
        </div>
      </section>

    </div>
  );
};
