import React, { useState } from 'react';
import { Activity, Clock, Zap, Sliders, RefreshCw } from 'lucide-react';

export const TapBpmTool: React.FC = () => {
  const [bpm, setBpm] = useState<number>(124);
  const [tapHistory, setTapHistory] = useState<number[]>([]);
  const [timeSignature, setTimeSignature] = useState<number>(4);

  const handleTap = () => {
    const now = Date.now();
    const newHistory = [...tapHistory.slice(-7), now];
    setTapHistory(newHistory);

    if (newHistory.length > 1) {
      const intervals = [];
      for (let i = 1; i < newHistory.length; i++) {
        intervals.push(newHistory[i] - newHistory[i - 1]);
      }
      const avgMs = intervals.reduce((a, b) => a + b, 0) / intervals.length;
      const detectedBpm = Math.min(300, Math.max(30, Math.round(60000 / avgMs)));
      setBpm(detectedBpm);
    }
  };

  const handleReset = () => {
    setTapHistory([]);
    setBpm(120);
  };

  // Calculations
  const quarterNoteMs = Math.round(60000 / bpm);
  const eighthNoteMs = Math.round(quarterNoteMs / 2);
  const sixteenthNoteMs = Math.round(quarterNoteMs / 4);
  const dottedEighthMs = Math.round(eighthNoteMs * 1.5);
  const tripletEighthMs = Math.round((quarterNoteMs * 2) / 3);
  const barDurationSec = ((quarterNoteMs * timeSignature) / 1000).toFixed(2);

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4">
      
      {/* Header */}
      <div className="border-b border-[#E8DCCB] pb-6">
        <h1 className="font-heading font-bold text-2xl sm:text-3xl text-[#2F2A26]">Tap BPM & Delay Calculator</h1>
        <p className="text-sm text-[#6D655D] mt-1">Tap along to any music to calculate exact BPM, delay milliseconds, loop bar lengths, and DJ pitch adjustments.</p>
      </div>

      {/* Main Tap Box */}
      <div className="bg-[#FFFDF8] border border-[#E8DCCB] rounded-2xl p-8 sm:p-12 text-center space-y-6 shadow-sm">
        
        <div className="inline-flex items-baseline space-x-2">
          <span className="font-heading font-extrabold text-7xl sm:text-9xl text-[#2F2A26]">{bpm}</span>
          <span className="font-bold text-xl text-[#AD8B73] uppercase">BPM</span>
        </div>

        <p className="text-xs text-[#6D655D]">Taps recorded: {tapHistory.length} • Tap continuously to increase precision</p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <button
            onClick={handleTap}
            className="w-full sm:w-auto px-12 py-6 rounded-2xl bg-[#AD8B73] text-[#FFFBE9] font-heading font-extrabold text-xl hover:bg-[#96745D] active:scale-95 transition-all shadow-md"
          >
            TAP TEMPO HERE
          </button>
          <button
            onClick={handleReset}
            className="p-4 rounded-2xl bg-[#FFFBE9] border border-[#E8DCCB] text-[#6D655D] hover:text-[#2F2A26]"
            title="Reset Tap Counter"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
        </div>

      </div>

      {/* Calculations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Studio Delay Milliseconds */}
        <div className="bg-[#FFFDF8] border border-[#E8DCCB] rounded-2xl p-6 space-y-4">
          <div className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-[#AD8B73]" />
            <h3 className="font-heading font-semibold text-base text-[#2F2A26]">Delay Milliseconds Calculator</h3>
          </div>
          <div className="space-y-2 text-sm">
            {[
              { note: '1/4 Note (Quarter)', ms: quarterNoteMs },
              { note: '1/8 Note (Eighth)', ms: eighthNoteMs },
              { note: '1/8 Dotted (U2 Edge Delay)', ms: dottedEighthMs },
              { note: '1/8 Triplet', ms: tripletEighthMs },
              { note: '1/16 Note (Sixteenth)', ms: sixteenthNoteMs },
            ].map(item => (
              <div key={item.note} className="flex justify-between items-center p-2.5 rounded-xl bg-[#FFFBE9] border border-[#E8DCCB]">
                <span className="text-[#2F2A26] font-medium text-xs">{item.note}</span>
                <span className="font-mono font-bold text-[#AD8B73]">{item.ms} ms</span>
              </div>
            ))}
          </div>
        </div>

        {/* Loop & Bar Lengths */}
        <div className="bg-[#FFFDF8] border border-[#E8DCCB] rounded-2xl p-6 space-y-4">
          <div className="flex items-center space-x-2">
            <Activity className="w-5 h-5 text-[#AD8B73]" />
            <h3 className="font-heading font-semibold text-base text-[#2F2A26]">Loop Bar Lengths ({timeSignature}/4 Time)</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center space-x-2 mb-2">
              <label className="text-xs text-[#6D655D]">Time Signature:</label>
              {[3, 4, 6, 7].map(ts => (
                <button
                  key={ts}
                  onClick={() => setTimeSignature(ts)}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-lg border ${
                    timeSignature === ts ? 'bg-[#AD8B73] text-[#FFFBE9] border-[#AD8B73]' : 'bg-[#FFFBE9] border-[#E8DCCB]'
                  }`}
                >
                  {ts}/4
                </button>
              ))}
            </div>

            {[
              { label: '1 Measure / Bar', sec: barDurationSec },
              { label: '4 Measures (Verse Phrase)', sec: (Number(barDurationSec) * 4).toFixed(2) },
              { label: '8 Measures (Chorus Phrase)', sec: (Number(barDurationSec) * 8).toFixed(2) },
              { label: '16 Measures (Drop / Section)', sec: (Number(barDurationSec) * 16).toFixed(2) },
            ].map(item => (
              <div key={item.label} className="flex justify-between items-center p-2.5 rounded-xl bg-[#FFFBE9] border border-[#E8DCCB]">
                <span className="text-[#2F2A26] font-medium text-xs">{item.label}</span>
                <span className="font-mono font-bold text-[#2F2A26]">{item.sec} sec</span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
