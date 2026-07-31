import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { SearchOverlay } from './components/layout/SearchOverlay';

import { HomeView } from './components/home/HomeView';
import { ToolsCatalogView } from './components/tools/ToolsCatalogView';
import { MetronomeTool } from './components/tools/MetronomeTool';
import { PitchTunerTool } from './components/tools/PitchTunerTool';
import { TapBpmTool } from './components/tools/TapBpmTool';
import { PitchGeneratorTool } from './components/tools/PitchGeneratorTool';
import { SpectrumAnalyzerTool } from './components/tools/SpectrumAnalyzerTool';
import { AudioRecorderTool } from './components/tools/AudioRecorderTool';
import { VirtualInstruments } from './components/tools/VirtualInstruments';
import { StudioTools } from './components/tools/StudioTools';
import { MusicTheoryHub } from './components/tools/MusicTheoryHub';
import { PracticeHub } from './components/tools/PracticeHub';
import { StoreView } from './components/store/StoreView';
import { ArticlesView } from './components/articles/ArticlesView';
import { AboutView } from './components/about/AboutView';
import { UserDashboard } from './components/dashboard/UserDashboard';
import { AdminPanel } from './components/admin/AdminPanel';

const AppContent: React.FC = () => {
  const { activeView } = useApp();

  const renderActiveView = () => {
    switch (activeView) {
      case 'home':
        return <HomeView />;
      case 'music-tools':
      case 'converters':
        return <ToolsCatalogView />;
      case 'metronome':
        return <MetronomeTool />;
      case 'tuner':
        return <PitchTunerTool />;
      case 'tap-bpm':
        return <TapBpmTool />;
      case 'pitch-generator':
      case 'scale-chord-finder':
        return <PitchGeneratorTool />;
      case 'spectrum-analyzer':
      case 'analysis':
      case 'decibel-meter':
        return <SpectrumAnalyzerTool />;
      case 'audio-recorder':
      case 'recording':
        return <AudioRecorderTool />;
      case 'virtual-piano':
      case 'drum-machine':
      case 'fretboard':
      case 'instruments':
        return <VirtualInstruments />;
      case 'gain-staging-calc':
      case 'studio-tools':
      case 'audio-converters':
        return <StudioTools />;
      case 'theory':
      case 'circle-of-fifths':
      case 'ear-training':
      case 'music-dictionary':
        return <MusicTheoryHub />;
      case 'practice':
        return <PracticeHub />;
      case 'store':
        return <StoreView />;
      case 'articles':
        return <ArticlesView />;
      case 'about':
        return <AboutView />;
      case 'dashboard':
        return <UserDashboard />;
      case 'admin':
        return <AdminPanel />;
      default:
        return <HomeView />;
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFBE9] text-[#2F2A26] flex flex-col justify-between selection:bg-[#E3CAA5] selection:text-[#2F2A26]">
      <Navbar />
      <SearchOverlay />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {renderActiveView()}
      </main>
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
