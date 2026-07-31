import React from 'react';
import logoImg from '../../assets/images/regenerated_image_1785479386199.png';
import { Music, ShieldCheck, Heart, Globe, Sparkles } from 'lucide-react';

export const AboutView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-10 py-6">
      
      {/* Header */}
      <div className="text-center space-y-4 flex flex-col items-center">
        <div className="w-24 h-24 rounded-2xl overflow-hidden bg-[#FFFDF8] border border-[#E8DCCB] p-1 shadow-md mb-2">
          <img 
            src={logoImg} 
            alt="TuneIndiaGlobal Peacock Veena Logo" 
            className="w-full h-full object-cover rounded-xl"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#E3CAA5]/30 text-[#AD8B73] text-xs font-semibold">
          <Sparkles className="w-4 h-4" />
          <span>The Google of Music</span>
        </div>
        <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-[#2F2A26]">
          TuneIndia<span className="text-[#AD8B73]">Global</span>
        </h1>
        <p className="font-heading font-semibold text-lg text-[#AD8B73]">
          Everything Music. One Destination.
        </p>
      </div>

      {/* Main Mission */}
      <div className="bg-[#FFFDF8] border border-[#E8DCCB] rounded-3xl p-8 sm:p-12 space-y-6 shadow-xs leading-relaxed text-[#2F2A26]">
        <h2 className="font-heading font-bold text-2xl text-[#2F2A26]">Our Vision</h2>
        <p className="text-sm text-[#6D655D] leading-relaxed">
          Create the internet's most complete music ecosystem where musicians, producers, DJs, singers, students, teachers, composers, sound engineers, and music enthusiasts can find every music-related tool, resource, guide, service, and product in one place.
        </p>
        <p className="text-sm text-[#6D655D] leading-relaxed">
          Users should never need to leave TuneIndiaGlobal to complete any music-related task. From real-time chromatic tuning and precision metronomes to complex gain staging calculators, FFT spectrum analyzers, and artisanal handcrafted gifts, every tool is architected for long-term depth and ease of use.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-[#E8DCCB]">
          <div className="space-y-2">
            <h3 className="font-heading font-bold text-base text-[#AD8B73]">Organic & Calm</h3>
            <p className="text-xs text-[#6D655D]">Warm ivory palettes, generous whitespace, and zero visual clutter designed for comfortable, long studio sessions.</p>
          </div>
          <div className="space-y-2">
            <h3 className="font-heading font-bold text-base text-[#AD8B73]">DSP Precision</h3>
            <p className="text-xs text-[#6D655D]">Built with native Web Audio API signal processing for microsecond timing and pitch accuracy.</p>
          </div>
          <div className="space-y-2">
            <h3 className="font-heading font-bold text-base text-[#AD8B73]">Global Community</h3>
            <p className="text-xs text-[#6D655D]">Bridging Western music theory, digital audio production, and ancient Indian Classical Ragas & Talas.</p>
          </div>
        </div>
      </div>

    </div>
  );
};
