import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { playClickSound } from '../../utils/audioEngine';
import { Play, Pause, RefreshCw, Volume2, Bookmark, Share2, Copy, Check, Clock, Sparkles } from 'lucide-react';

export const MetronomeTool: React.FC = () => {
  const { savePreset } = useApp();
  const [bpm, setBpm] = useState<number>(120);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [beatsPerMeasure, setBeatsPerMeasure] = useState<number>(4);
  const [subdivision, setSubdivision] = useState<'quarter' | 'eighth' | 'sixteenth' | 'triplet'>('quarter');
  const [soundType, setSoundType] = useState<'woodblock' | 'digital' | 'rimshot' | 'cowbell'>('woodblock');
  const [volume, setVolume] = useState<number>(0.8);
  const [currentBeat, setCurrentBeat] = useState<number>(0);
  const [tapTimes, setTapTimes] = useState<number[]>([]);
  const [presetSaved, setPresetSaved] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  // Timer mode
  const [timerMinutes, setTimerMinutes] = useState<number>(10);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);

  const beatRef = useRef<number>(0);
  const timerIntervalRef = useRef<any>(null);
  const audioIntervalRef = useRef<any>(null);

  // Sound & Beat Scheduler
  useEffect(() => {
    if (isPlaying) {
      let subMultiplier = 1;
      if (subdivision === 'eighth') subMultiplier = 2;
      else if (subdivision === 'sixteenth') subMultiplier = 4;
      else if (subdivision === 'triplet') subMultiplier = 3;

      const intervalMs = (60 / bpm / subMultiplier) * 1000;

      audioIntervalRef.current = setInterval(() => {
        beatRef.current = (beatRef.current + 1) % (beatsPerMeasure * subMultiplier);
        const beatInMeasure = Math.floor(beatRef.current / subMultiplier);
        const isMainBeat = beatRef.current % subMultiplier === 0;
        const isAccent = isMainBeat && beatInMeasure === 0;

        if (isMainBeat) {
          setCurrentBeat(beatInMeasure);
        }

        playClickSound(soundType, isAccent, volume);
      }, intervalMs);

      // Practice elapsed timer
      timerIntervalRef.current = setInterval(() => {
        setElapsedSeconds(prev => prev + 1);
      }, 1000);

    } else {
      if (audioIntervalRef.current) clearInterval(audioIntervalRef.current);
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      setCurrentBeat(0);
      beatRef.current = 0;
    }

    return () => {
      if (audioIntervalRef.current) clearInterval(audioIntervalRef.current);
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [isPlaying, bpm, beatsPerMeasure, subdivision, soundType, volume]);

  const handleTapTempo = () => {
    const now = Date.now();
    const newTapTimes = [...tapTimes.slice(-4), now];
    setTapTimes(newTapTimes);

    if (newTapTimes.length > 1) {
      const intervals = [];
      for (let i = 1; i < newTapTimes.length; i++) {
        intervals.push(newTapTimes[i] - newTapTimes[i - 1]);
      }
      const avgMs = intervals.reduce((a, b) => a + b, 0) / intervals.length;
      const calculatedBpm = Math.min(300, Math.max(20, Math.round(60000 / avgMs)));
      setBpm(calculatedBpm);
    }
  };

  const handleSavePreset = () => {
    savePreset({
      toolId: 'metronome',
      name: `${bpm} BPM (${beatsPerMeasure}/4, ${soundType})`,
      settings: { bpm, beatsPerMeasure, subdivision, soundType, volume }
    });
    setPresetSaved(true);
    setTimeout(() => setPresetSaved(false), 2000);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}?tool=metronome&bpm=${bpm}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8DCCB] pb-6">
        <div>
          <h1 className="font-heading font-bold text-2xl sm:text-3xl text-[#2F2A26]">Precision Metronome</h1>
          <p className="text-sm text-[#6D655D] mt-1">20–300 BPM with accent beats, subdivisions, pendulum, tap tempo & practice timer.</p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleSavePreset}
            className="px-3 py-2 rounded-xl bg-[#FFFDF8] border border-[#E8DCCB] text-xs font-semibold text-[#2F2A26] hover:border-[#AD8B73] transition-all flex items-center space-x-1.5 shadow-xs"
          >
            {presetSaved ? <Check className="w-4 h-4 text-[#5F8B4C]" /> : <Bookmark className="w-4 h-4 text-[#AD8B73]" />}
            <span>{presetSaved ? 'Preset Saved' : 'Save Preset'}</span>
          </button>
          <button
            onClick={handleCopyLink}
            className="px-3 py-2 rounded-xl bg-[#FFFDF8] border border-[#E8DCCB] text-xs font-semibold text-[#2F2A26] hover:border-[#AD8B73] transition-all flex items-center space-x-1.5 shadow-xs"
          >
            {copied ? <Check className="w-4 h-4 text-[#5F8B4C]" /> : <Share2 className="w-4 h-4 text-[#AD8B73]" />}
            <span>{copied ? 'Link Copied' : 'Share'}</span>
          </button>
        </div>
      </div>

      {/* Main Display Box */}
      <div className="bg-[#FFFDF8] border border-[#E8DCCB] rounded-2xl p-6 sm:p-10 shadow-sm space-y-8 relative overflow-hidden">
        
        {/* Animated Pendulum Line */}
        <div className="relative w-full h-12 flex items-center justify-center border-b border-[#E8DCCB]/60 pb-4">
          <div className="w-full bg-[#E8DCCB]/30 h-1 rounded-full relative">
            <div 
              className={`w-6 h-6 rounded-full bg-[#AD8B73] border-2 border-[#FFFDF8] shadow-md absolute -top-2.5 transition-all duration-100 ${
                isPlaying ? 'scale-110' : ''
              }`}
              style={{
                left: isPlaying ? `${((currentBeat + 1) / beatsPerMeasure) * 90}%` : '50%',
                transform: 'translateX(-50%)'
              }}
            />
          </div>
        </div>

        {/* BPM Counter */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-baseline space-x-2">
            <span className="font-heading font-extrabold text-6xl sm:text-8xl text-[#2F2A26] tracking-tight">{bpm}</span>
            <span className="font-medium text-lg text-[#AD8B73] uppercase tracking-wider">BPM</span>
          </div>

          {/* Range Slider */}
          <div className="max-w-md mx-auto px-4">
            <input
              type="range"
              min="20"
              max="300"
              value={bpm}
              onChange={(e) => setBpm(Number(e.target.value))}
              className="w-full h-2 bg-[#E8DCCB] rounded-lg appearance-none cursor-pointer accent-[#AD8B73]"
            />
            <div className="flex justify-between text-[11px] text-[#6D655D] font-mono mt-1">
              <span>20 Adagio</span>
              <span>120 Moderato</span>
              <span>200 Presto</span>
              <span>300 Maximum</span>
            </div>
          </div>
        </div>

        {/* Visual Beat Indicator Dots */}
        <div className="flex justify-center items-center gap-3">
          {Array.from({ length: beatsPerMeasure }).map((_, idx) => {
            const isCurrent = isPlaying && currentBeat === idx;
            const isAccentBeat = idx === 0;
            return (
              <div
                key={idx}
                className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center font-bold text-sm transition-all ${
                  isCurrent
                    ? isAccentBeat
                      ? 'bg-[#AD8B73] text-[#FFFBE9] scale-110 shadow-md ring-4 ring-[#E3CAA5]'
                      : 'bg-[#CEAB93] text-[#FFFBE9] scale-105'
                    : 'bg-[#FFFBE9] border border-[#E8DCCB] text-[#6D655D]'
                }`}
              >
                {idx + 1}
              </div>
            );
          })}
        </div>

        {/* Play/Pause & Tap Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`w-full sm:w-auto px-10 py-4 rounded-2xl font-heading font-bold text-lg flex items-center justify-center space-x-3 transition-all shadow-md ${
              isPlaying
                ? 'bg-[#B65A4A] text-[#FFFBE9] hover:bg-[#A34D3E]'
                : 'bg-[#AD8B73] text-[#FFFBE9] hover:bg-[#96745D] ring-2 ring-[#AD8B73]/20'
            }`}
          >
            {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-1" />}
            <span>{isPlaying ? 'STOP METRONOME' : 'START METRONOME'}</span>
          </button>

          <button
            onClick={handleTapTempo}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#FFFBE9] border border-[#E8DCCB] text-[#2F2A26] font-heading font-semibold text-base hover:border-[#AD8B73] active:scale-95 transition-all shadow-xs"
          >
            TAP TEMPO
          </button>
        </div>

      </div>

      {/* Controls Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Time Signature & Subdivision */}
        <div className="bg-[#FFFDF8] border border-[#E8DCCB] rounded-2xl p-5 space-y-4">
          <h3 className="font-heading font-semibold text-sm text-[#2F2A26]">Time Signature & Rhythm</h3>
          <div className="space-y-3">
            <div>
              <label className="text-xs text-[#6D655D] block mb-1">Beats Per Measure</label>
              <div className="grid grid-cols-5 gap-1.5">
                {[2, 3, 4, 5, 6, 7, 8, 9, 12].map((num) => (
                  <button
                    key={num}
                    onClick={() => setBeatsPerMeasure(num)}
                    className={`py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                      beatsPerMeasure === num
                        ? 'bg-[#AD8B73] text-[#FFFBE9] border-[#AD8B73]'
                        : 'bg-[#FFFBE9] border-[#E8DCCB] text-[#2F2A26] hover:border-[#AD8B73]'
                    }`}
                  >
                    {num}/4
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs text-[#6D655D] block mb-1">Subdivision</label>
              <div className="grid grid-cols-2 gap-1.5 text-xs font-medium">
                {[
                  { id: 'quarter', label: '1/4 Quarter' },
                  { id: 'eighth', label: '1/8 Eighth' },
                  { id: 'sixteenth', label: '1/16 Sixteenth' },
                  { id: 'triplet', label: '1/3 Triplet' }
                ].map((sub) => (
                  <button
                    key={sub.id}
                    onClick={() => setSubdivision(sub.id as any)}
                    className={`py-2 px-3 rounded-xl border text-left transition-all ${
                      subdivision === sub.id
                        ? 'bg-[#E3CAA5]/40 text-[#AD8B73] border-[#AD8B73] font-semibold'
                        : 'bg-[#FFFBE9] border-[#E8DCCB] text-[#6D655D] hover:border-[#AD8B73]'
                    }`}
                  >
                    {sub.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sound Voice & Volume */}
        <div className="bg-[#FFFDF8] border border-[#E8DCCB] rounded-2xl p-5 space-y-4">
          <h3 className="font-heading font-semibold text-sm text-[#2F2A26]">Sound Voice & Volume</h3>
          <div className="space-y-3">
            <div>
              <label className="text-xs text-[#6D655D] block mb-1">Click Voice</label>
              <div className="grid grid-cols-2 gap-2 text-xs font-medium">
                {[
                  { id: 'woodblock', label: 'Woodblock (Organic)' },
                  { id: 'digital', label: 'Digital Beep' },
                  { id: 'rimshot', label: 'Snare Rimshot' },
                  { id: 'cowbell', label: 'Studio Cowbell' }
                ].map((sound) => (
                  <button
                    key={sound.id}
                    onClick={() => setSoundType(sound.id as any)}
                    className={`py-2 px-3 rounded-xl border text-left transition-all ${
                      soundType === sound.id
                        ? 'bg-[#AD8B73] text-[#FFFBE9] border-[#AD8B73] font-semibold'
                        : 'bg-[#FFFBE9] border-[#E8DCCB] text-[#6D655D] hover:border-[#AD8B73]'
                    }`}
                  >
                    {sound.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center text-xs text-[#6D655D] mb-1">
                <span className="flex items-center space-x-1">
                  <Volume2 className="w-3.5 h-3.5 text-[#AD8B73]" />
                  <span>Volume Level</span>
                </span>
                <span className="font-mono">{Math.round(volume * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="w-full h-2 bg-[#E8DCCB] rounded-lg appearance-none cursor-pointer accent-[#AD8B73]"
              />
            </div>
          </div>
        </div>

        {/* Practice Timer & Presets */}
        <div className="bg-[#FFFDF8] border border-[#E8DCCB] rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-semibold text-sm text-[#2F2A26]">Session Practice Timer</h3>
            <Clock className="w-4 h-4 text-[#AD8B73]" />
          </div>
          <div className="space-y-3">
            <div className="bg-[#FFFBE9] border border-[#E8DCCB] rounded-xl p-3 text-center">
              <span className="text-2xl font-mono font-bold text-[#2F2A26] block">{formatTime(elapsedSeconds)}</span>
              <span className="text-[11px] text-[#6D655D]">Continuous Practice Elapsed</span>
            </div>

            <div className="flex items-center justify-between gap-2">
              {[60, 90, 120, 140, 160].map((quickBpm) => (
                <button
                  key={quickBpm}
                  onClick={() => setBpm(quickBpm)}
                  className={`flex-1 py-1.5 text-xs font-mono rounded-lg border transition-all ${
                    bpm === quickBpm
                      ? 'bg-[#E3CAA5] text-[#2F2A26] font-bold border-[#AD8B73]'
                      : 'bg-[#FFFBE9] border-[#E8DCCB] text-[#6D655D] hover:border-[#AD8B73]'
                  }`}
                >
                  {quickBpm}
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
