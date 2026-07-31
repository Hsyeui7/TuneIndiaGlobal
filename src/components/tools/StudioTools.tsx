import React, { useState } from 'react';
import { Sliders, RefreshCw, Activity, Volume2, ShieldCheck } from 'lucide-react';

export const StudioTools: React.FC = () => {
  const [targetDb, setTargetDb] = useState<number>(-18);
  const [inputPeakDb, setInputPeakDb] = useState<number>(-4);

  // Bit Depth calculation
  const [sampleRate, setSampleRate] = useState<number>(48000);
  const [bitDepth, setBitDepth] = useState<number>(24);
  const [channels, setChannels] = useState<number>(2);
  const [durationMin, setDurationMin] = useState<number>(3.5);

  const gainAdjust = (targetDb - inputPeakDb).toFixed(1);

  // File size in MB = (SampleRate * BitDepth * Channels * DurationSeconds) / (8 * 1024 * 1024)
  const durationSec = durationMin * 60;
  const rawBytes = (sampleRate * (bitDepth / 8) * channels * durationSec);
  const sizeMb = (rawBytes / (1024 * 1024)).toFixed(2);

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4">
      
      {/* Header */}
      <div className="border-b border-[#E8DCCB] pb-6">
        <h1 className="font-heading font-bold text-2xl sm:text-3xl text-[#2F2A26]">Studio Audio Utilities</h1>
        <p className="text-sm text-[#6D655D] mt-1">Calibrate plugin gain staging, calculate uncompressed audio storage sizes, and convert bit depth resolution.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Gain Staging Calculator */}
        <div className="bg-[#FFFDF8] border border-[#E8DCCB] rounded-2xl p-6 space-y-4 shadow-sm">
          <div className="flex items-center space-x-2">
            <Sliders className="w-5 h-5 text-[#AD8B73]" />
            <h3 className="font-heading font-semibold text-base text-[#2F2A26]">Gain Staging Calculator</h3>
          </div>
          <p className="text-xs text-[#6D655D]">Calculate input trim reduction required to feed analog-modeled plugins at -18 dBFS nominal level.</p>

          <div className="space-y-3">
            <div>
              <label className="text-xs text-[#6D655D] block mb-1">Raw Input Audio Peak (dBFS)</label>
              <input
                type="number"
                value={inputPeakDb}
                onChange={(e) => setInputPeakDb(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl bg-[#FFFBE9] border border-[#E8DCCB] text-xs font-mono focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs text-[#6D655D] block mb-1">Target Nominal Level (dBFS)</label>
              <select
                value={targetDb}
                onChange={(e) => setTargetDb(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl bg-[#FFFBE9] border border-[#E8DCCB] text-xs font-mono font-semibold text-[#2F2A26]"
              >
                <option value={-18}>-18 dBFS RMS (Analog Calibration Standard)</option>
                <option value={-14}>-14 dBFS RMS (Streaming Master Target)</option>
                <option value={-12}>-12 dBFS RMS (Loud Master)</option>
              </select>
            </div>

            <div className="bg-[#FFFBE9] border border-[#E8DCCB] rounded-xl p-4 text-center">
              <span className="text-xs text-[#6D655D] block">Required Channel Input Trim adjustment</span>
              <span className={`font-heading font-extrabold text-2xl block ${Number(gainAdjust) < 0 ? 'text-[#B65A4A]' : 'text-[#5F8B4C]'}`}>
                {Number(gainAdjust) > 0 ? `+${gainAdjust}` : gainAdjust} dB
              </span>
            </div>
          </div>
        </div>

        {/* Storage & Bitrate Estimator */}
        <div className="bg-[#FFFDF8] border border-[#E8DCCB] rounded-2xl p-6 space-y-4 shadow-sm">
          <div className="flex items-center space-x-2">
            <Activity className="w-5 h-5 text-[#AD8B73]" />
            <h3 className="font-heading font-semibold text-base text-[#2F2A26]">Sample Rate & Size Estimator</h3>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="text-[#6D655D] block mb-1">Sample Rate</label>
              <select
                value={sampleRate}
                onChange={(e) => setSampleRate(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl bg-[#FFFBE9] border border-[#E8DCCB] text-xs font-mono font-semibold"
              >
                <option value={44100}>44.1 kHz (CD Quality)</option>
                <option value={48000}>48.0 kHz (Film & Studio Default)</option>
                <option value={96000}>96.0 kHz (Hi-Res Master)</option>
                <option value={192000}>192.0 kHz (Audiophile Ultra)</option>
              </select>
            </div>

            <div>
              <label className="text-[#6D655D] block mb-1">Bit Depth Resolution</label>
              <select
                value={bitDepth}
                onChange={(e) => setBitDepth(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl bg-[#FFFBE9] border border-[#E8DCCB] text-xs font-mono font-semibold"
              >
                <option value={16}>16-bit PCM (108 dB Dynamic Range)</option>
                <option value={24}>24-bit PCM (144 dB Dynamic Range)</option>
                <option value={32}>32-bit Float (Infinite Dynamic Range)</option>
              </select>
            </div>

            <div>
              <label className="text-[#6D655D] block mb-1">Track Duration (Minutes)</label>
              <input
                type="number"
                step="0.5"
                value={durationMin}
                onChange={(e) => setDurationMin(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl bg-[#FFFBE9] border border-[#E8DCCB] text-xs font-mono"
              />
            </div>

            <div className="bg-[#FFFBE9] border border-[#E8DCCB] rounded-xl p-4 text-center">
              <span className="text-xs text-[#6D655D] block">Uncompressed WAV File Size</span>
              <span className="font-heading font-extrabold text-2xl text-[#AD8B73] block">{sizeMb} MB</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
