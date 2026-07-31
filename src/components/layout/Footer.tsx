import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import logoImg from '../../assets/images/regenerated_image_1785479386199.png';
import { Music, Heart, ShieldCheck, Mail, CheckCircle, Globe } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveView } = useApp();
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#FFFDF8] border-t border-[#E8DCCB] pt-16 pb-12 mt-20 text-[#6D655D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#E8DCCB]">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-11 h-11 rounded-xl overflow-hidden bg-[#FFFDF8] border border-[#E8DCCB] p-0.5 shadow-sm shrink-0">
                <img 
                  src={logoImg} 
                  alt="TuneIndiaGlobal Logo" 
                  className="w-full h-full object-cover rounded-lg" 
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="font-heading font-bold text-xl text-[#2F2A26]">
                TuneIndia<span className="text-[#AD8B73]">Global</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed max-w-sm text-[#6D655D]">
              Everything Music. One Destination. Building the internet’s most complete, organic music ecosystem for artists, producers, educators, and music enthusiasts worldwide.
            </p>
            <div className="flex items-center space-x-2 text-xs font-medium text-[#5F8B4C] bg-[#5F8B4C]/10 px-3 py-1.5 rounded-full w-fit">
              <ShieldCheck className="w-4 h-4" />
              <span>Verified Audio Signal Processing Suite</span>
            </div>
          </div>

          {/* Core Modules */}
          <div className="space-y-3">
            <h4 className="font-heading font-semibold text-[#2F2A26] text-sm tracking-wide">Popular Tools</h4>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => setActiveView('metronome')} className="hover:text-[#AD8B73] transition-colors">Precision Metronome</button></li>
              <li><button onClick={() => setActiveView('tuner')} className="hover:text-[#AD8B73] transition-colors">Chromatic Tuner</button></li>
              <li><button onClick={() => setActiveView('tap-bpm')} className="hover:text-[#AD8B73] transition-colors">Live Tap BPM & Tempo</button></li>
              <li><button onClick={() => setActiveView('spectrum-analyzer')} className="hover:text-[#AD8B73] transition-colors">FFT Spectrum Analyzer</button></li>
              <li><button onClick={() => setActiveView('audio-recorder')} className="hover:text-[#AD8B73] transition-colors">Studio Audio Recorder</button></li>
              <li><button onClick={() => setActiveView('virtual-piano')} className="hover:text-[#AD8B73] transition-colors">Virtual Piano & Synth</button></li>
            </ul>
          </div>

          {/* Theory & Learn */}
          <div className="space-y-3">
            <h4 className="font-heading font-semibold text-[#2F2A26] text-sm tracking-wide">Theory & Resources</h4>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => setActiveView('circle-of-fifths')} className="hover:text-[#AD8B73] transition-colors">Circle of Fifths</button></li>
              <li><button onClick={() => setActiveView('ear-training')} className="hover:text-[#AD8B73] transition-colors">Ear Training & Rhythm</button></li>
              <li><button onClick={() => setActiveView('scale-chord-finder')} className="hover:text-[#AD8B73] transition-colors">Scale & Chord Finder</button></li>
              <li><button onClick={() => setActiveView('practice')} className="hover:text-[#AD8B73] transition-colors">Practice Routine Hub</button></li>
              <li><button onClick={() => setActiveView('articles')} className="hover:text-[#AD8B73] transition-colors">Articles & Guides</button></li>
              <li><button onClick={() => setActiveView('music-dictionary')} className="hover:text-[#AD8B73] transition-colors">Music Dictionary</button></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-3">
            <h4 className="font-heading font-semibold text-[#2F2A26] text-sm tracking-wide">Stay Inspired</h4>
            <p className="text-xs text-[#6D655D]">
              Subscribe for weekly music production guides, instrument tips, and early access to upcoming marketplace launches.
            </p>
            {subscribed ? (
              <div className="flex items-center space-x-2 text-xs font-semibold text-[#5F8B4C] bg-[#5F8B4C]/10 p-3 rounded-xl">
                <CheckCircle className="w-4 h-4 shrink-0" />
                <span>You're subscribed! Welcome to TuneIndiaGlobal.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-3 text-[#AD8B73]" />
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-[#FFFBE9] border border-[#E8DCCB] text-[#2F2A26] focus:border-[#AD8B73] focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 bg-[#AD8B73] text-[#FFFBE9] font-medium text-xs rounded-xl hover:bg-[#96745D] transition-colors"
                >
                  Join Community
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Sub-footer */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-[#6D655D] gap-4">
          <p>© {new Date().getFullYear()} TuneIndiaGlobal. Everything Music. One Destination. Crafted with precision & warmth.</p>
          <div className="flex items-center space-x-6">
            <button onClick={() => setActiveView('about')} className="hover:text-[#2F2A26]">About Mission</button>
            <button onClick={() => setActiveView('admin')} className="hover:text-[#2F2A26]">Admin Control</button>
            <span className="flex items-center space-x-1">
              <Globe className="w-3.5 h-3.5 text-[#AD8B73]" />
              <span>India • Global</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
