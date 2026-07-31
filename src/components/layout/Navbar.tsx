import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import logoImg from '../../assets/images/regenerated_image_1785479386199.png';
import { 
  Music, 
  Search, 
  Sliders, 
  BookOpen, 
  Mic, 
  BarChart2, 
  RefreshCw, 
  Award, 
  ShoppingBag, 
  FileText, 
  User, 
  ShieldAlert, 
  Menu, 
  X,
  Grid
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { activeView, setActiveView, setSearchOpen, storeEnabled, cart } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const totalCartCount = cart.reduce((sum, i) => sum + i.quantity, 0);

  const navItems = [
    { id: 'home', label: 'Home', icon: Music },
    { id: 'music-tools', label: 'Music Tools', icon: Sliders },
    { id: 'studio-tools', label: 'Studio Tools', icon: Sliders },
    { id: 'theory', label: 'Music Theory', icon: BookOpen },
    { id: 'recording', label: 'Recording', icon: Mic },
    { id: 'analysis', label: 'Analysis', icon: BarChart2 },
    { id: 'instruments', label: 'Instruments', icon: Grid },
    { id: 'practice', label: 'Practice', icon: Award },
    { id: 'store', label: 'Store', icon: ShoppingBag, badge: storeEnabled ? '' : 'Soon' },
    { id: 'articles', label: 'Articles', icon: FileText },
  ];

  const handleNavClick = (viewId: string) => {
    setActiveView(viewId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FFFDF8]/90 backdrop-blur-md border-b border-[#E8DCCB] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <button 
            onClick={() => handleNavClick('home')}
            className="flex items-center space-x-3 text-left focus:outline-none group"
            aria-label="TuneIndiaGlobal Home"
          >
            <div className="w-12 h-12 rounded-xl overflow-hidden bg-[#FFFDF8] border border-[#E8DCCB] p-0.5 shadow-sm group-hover:border-[#AD8B73] transition-all shrink-0">
              <img 
                src={logoImg} 
                alt="TuneIndiaGlobal Logo" 
                className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-300" 
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <span className="font-heading font-bold text-xl tracking-tight text-[#2F2A26] block">
                TuneIndia<span className="text-[#AD8B73]">Global</span>
              </span>
              <span className="text-[11px] font-medium tracking-wide text-[#6D655D] uppercase block -mt-1">
                Everything Music
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-2 rounded-xl text-sm font-medium flex items-center space-x-1.5 transition-all ${
                    isActive 
                      ? 'bg-[#E3CAA5]/30 text-[#AD8B73] font-semibold' 
                      : 'text-[#6D655D] hover:text-[#2F2A26] hover:bg-[#E8DCCB]/30'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-[#AD8B73]/15 text-[#AD8B73]">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Search Trigger */}
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2.5 rounded-xl bg-[#FFFBE9] border border-[#E8DCCB] text-[#6D655D] hover:text-[#2F2A26] hover:border-[#AD8B73] transition-all flex items-center space-x-2 text-sm shadow-xs"
              aria-label="Open Universal Search"
            >
              <Search className="w-4 h-4 text-[#AD8B73]" />
              <span className="hidden md:inline font-medium text-xs">Search tools & theory...</span>
              <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-[#E8DCCB]/50 rounded-md text-[#6D655D]">⌘K</kbd>
            </button>

            {/* Dashboard / Profile */}
            <button
              onClick={() => handleNavClick('dashboard')}
              className={`p-2.5 rounded-xl border transition-all ${
                activeView === 'dashboard'
                  ? 'bg-[#AD8B73] text-[#FFFBE9] border-[#AD8B73]'
                  : 'bg-[#FFFDF8] border-[#E8DCCB] text-[#6D655D] hover:text-[#2F2A26]'
              }`}
              title="User Dashboard"
              aria-label="User Dashboard"
            >
              <User className="w-4 h-4" />
            </button>

            {/* Admin Panel Toggle */}
            <button
              onClick={() => handleNavClick('admin')}
              className={`p-2.5 rounded-xl border transition-all ${
                activeView === 'admin'
                  ? 'bg-[#2F2A26] text-[#E3CAA5] border-[#2F2A26]'
                  : 'bg-[#FFFDF8] border-[#E8DCCB] text-[#6D655D] hover:text-[#2F2A26]'
              }`}
              title="Admin Panel"
              aria-label="Admin Panel"
            >
              <ShieldAlert className="w-4 h-4" />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2.5 rounded-xl bg-[#FFFDF8] border border-[#E8DCCB] text-[#2F2A26]"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-b border-[#E8DCCB] bg-[#FFFDF8] px-4 pt-2 pb-6 space-y-1 shadow-lg">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full px-4 py-3 rounded-xl text-left font-medium flex items-center justify-between text-base transition-all ${
                  isActive 
                    ? 'bg-[#E3CAA5]/30 text-[#AD8B73] font-semibold' 
                    : 'text-[#6D655D] hover:bg-[#E8DCCB]/20'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className="w-5 h-5 text-[#AD8B73]" />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#AD8B73]/15 text-[#AD8B73]">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
