import React, { useState, useEffect, useRef } from 'react';
import { autoCorrelate, noteDetails, startTone, stopTone } from '../../utils/audioEngine';
import { Mic, MicOff, Volume2, ShieldCheck, RefreshCw, Bookmark, Share2, Check } from 'lucide-react';

const INSTRUMENT_TUNINGS = [
  { name: 'Guitar (Standard E)', notes: [
    { note: 'E2', freq: 82.41 },
    { note: 'A2', freq: 110.00 },
    { note: 'D3', freq: 146.83 },
    { note: 'G3', freq: 196.00 },
    { note: 'B3', freq: 246.94 },
    { note: 'E4', freq: 329.63 }
  ]},
  { name: 'Guitar (Drop D)', notes: [
    { note: 'D2', freq: 73.42 },
    { note: 'A2', freq: 110.00 },
    { note: 'D3', freq: 146.83 },
    { note: 'G3', freq: 196.00 },
    { note: 'B3', freq: 246.94 },
    { note: 'E4', freq: 329.63 }
  ]},
  { name: 'Bass Guitar (4-String)', notes: [
    { note: 'E1', freq: 41.20 },
    { note: 'A1', freq: 55.00 },
    { note: 'D2', freq: 73.42 },
    { note: 'G2', freq: 98.00 }
  ]},
  { name: 'Ukulele (Standard C)', notes: [
    { note: 'G4', freq: 392.00 },
    { note: 'C4', freq: 261.63 },
    { note: 'E4', freq: 329.63 },
    { note: 'A4', freq: 440.00 }
  ]},
  { name: 'Violin (Standard)', notes: [
    { note: 'G3', freq: 196.00 },
    { note: 'D4', freq: 293.66 },
    { note: 'A4', freq: 440.00 },
    { note: 'E5', freq: 659.25 }
  ]},
  { name: 'Indian Sitar (Kharaj-Pancham)', notes: [
    { note: 'Ma (F3)', freq: 174.61 },
    { note: 'Sa (C3)', freq: 130.81 },
    { note: 'Pa (G2)', freq: 98.00 },
    { note: 'Sa (C2)', freq: 65.41 }
  ]},
  { name: 'Indian Tanpura Drone', notes: [
    { note: 'Pa (G3)', freq: 196.00 },
    { note: 'Sa (C4)', freq: 261.63 },
    { note: 'Sa (C4)', freq: 261.63 },
    { note: 'Sa (C3)', freq: 130.81 }
  ]}
];

export const PitchTunerTool: React.FC = () => {
  const [isListening, setIsListening] = useState<boolean>(false);
  const [pitch, setPitch] = useState<{ noteName: string; octave: number; frequency: number; targetFreq: number; cents: number } | null>(null);
  const [selectedPreset, setSelectedPreset] = useState(INSTRUMENT_TUNINGS[0]);
  const [activeToneNote, setActiveToneNote] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const rafIdRef = useRef<number | null>(null);

  const startListening = async () => {
    try {
      setErrorMsg(null);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
      streamRef.current = stream;

      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const source = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 2048;
      analyserRef.current = analyser;

      source.connect(analyser);

      setIsListening(true);
      updatePitch();
    } catch (err: any) {
      console.error('Microphone error:', err);
      setErrorMsg('Microphone access denied or unavailable. Please enable mic permissions in your browser.');
      setIsListening(false);
    }
  };

  const stopListening = () => {
    if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
    }
    if (audioCtxRef.current) {
      audioCtxRef.current.close();
    }
    setIsListening(false);
    setPitch(null);
  };

  const updatePitch = () => {
    if (!analyserRef.current || !audioCtxRef.current) return;
    const buf = new Float32Array(analyserRef.current.fftSize);
    analyserRef.current.getFloatTimeDomainData(buf);

    const freq = autoCorrelate(buf, audioCtxRef.current.sampleRate);
    if (freq !== -1) {
      const details = noteDetails(freq);
      setPitch({
        noteName: details.noteName,
        octave: details.octave,
        frequency: Math.round(freq * 10) / 10,
        targetFreq: Math.round(details.targetFreq * 10) / 10,
        cents: details.cents
      });
    }

    rafIdRef.current = requestAnimationFrame(updatePitch);
  };

  useEffect(() => {
    return () => {
      stopListening();
      stopTone();
    };
  }, []);

  const handlePlayReferenceTone = (note: string, freq: number) => {
    if (activeToneNote === note) {
      stopTone();
      setActiveToneNote(null);
    } else {
      startTone(freq, 'sine', 0.6);
      setActiveToneNote(note);
    }
  };

  const isInTune = pitch && Math.abs(pitch.cents) <= 4;

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8DCCB] pb-6">
        <div>
          <h1 className="font-heading font-bold text-2xl sm:text-3xl text-[#2F2A26]">Chromatic Instrument Tuner</h1>
          <p className="text-sm text-[#6D655D] mt-1">Real-time DSP pitch detection for Acoustic Guitar, Bass, Sitar, Tanpura, Violin & Ukulele.</p>
        </div>
        <div>
          <button
            onClick={isListening ? stopListening : startListening}
            className={`px-6 py-3 rounded-xl font-heading font-bold text-sm flex items-center space-x-2 transition-all shadow-sm ${
              isListening
                ? 'bg-[#B65A4A] text-[#FFFBE9] hover:bg-[#A34D3E]'
                : 'bg-[#AD8B73] text-[#FFFBE9] hover:bg-[#96745D]'
            }`}
          >
            {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            <span>{isListening ? 'STOP MICROPHONE' : 'START TUNER'}</span>
          </button>
        </div>
      </div>

      {errorMsg && (
        <div className="p-4 rounded-xl bg-[#B65A4A]/10 border border-[#B65A4A]/30 text-[#B65A4A] text-sm flex items-center space-x-2">
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Tuner Main Canvas & Display */}
      <div className="bg-[#FFFDF8] border border-[#E8DCCB] rounded-2xl p-8 shadow-sm text-center space-y-8">
        
        {/* Large Note Visualizer */}
        <div className="py-6 space-y-2">
          <div className="inline-block relative">
            <span className={`font-heading font-extrabold text-7xl sm:text-9xl tracking-tight transition-colors ${
              isInTune ? 'text-[#5F8B4C]' : pitch ? 'text-[#2F2A26]' : 'text-[#6D655D]/40'
            }`}>
              {pitch ? pitch.noteName : '—'}
            </span>
            {pitch && (
              <span className="font-mono text-2xl font-bold text-[#AD8B73] absolute -top-2 -right-6">
                {pitch.octave}
              </span>
            )}
          </div>

          <div className="text-sm font-mono text-[#6D655D] flex justify-center items-center space-x-4">
            <span>Live: <strong className="text-[#2F2A26]">{pitch ? `${pitch.frequency} Hz` : '0.0 Hz'}</strong></span>
            <span>Target: <strong className="text-[#2F2A26]">{pitch ? `${pitch.targetFreq} Hz` : '0.0 Hz'}</strong></span>
          </div>
        </div>

        {/* Gauge Meter */}
        <div className="max-w-md mx-auto space-y-3 px-4">
          <div className="relative w-full bg-[#FFFBE9] border border-[#E8DCCB] h-12 rounded-xl flex items-center justify-between px-4 overflow-hidden">
            
            {/* Center Zero In-Tune Target */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-[#5F8B4C] -translate-x-1/2 z-10" />

            {/* Needle */}
            {pitch && (
              <div
                className={`absolute top-1 bottom-1 w-2 rounded-full transition-all duration-75 shadow-md ${
                  isInTune ? 'bg-[#5F8B4C]' : 'bg-[#AD8B73]'
                }`}
                style={{
                  left: `${Math.min(95, Math.max(5, 50 + pitch.cents))}%`,
                  transform: 'translateX(-50%)'
                }}
              />
            )}

            <span className="text-[11px] font-mono text-[#6D655D] z-0">-50♭</span>
            <span className="text-[11px] font-mono text-[#5F8B4C] font-bold z-0">IN TUNE</span>
            <span className="text-[11px] font-mono text-[#6D655D] z-0">+50♯</span>
          </div>

          <div className="flex justify-between items-center text-xs">
            <span className={`font-mono font-semibold ${pitch && pitch.cents < -4 ? 'text-[#B65A4A]' : 'text-[#6D655D]'}`}>
              {pitch ? `${pitch.cents} cents` : '0 cents'}
            </span>
            <span className={`font-bold uppercase tracking-wider ${
              isInTune ? 'text-[#5F8B4C]' : 'text-[#6D655D]'
            }`}>
              {isInTune ? '✓ Perfect Pitch' : isListening ? 'Adjust Tuning' : 'Microphone Inactive'}
            </span>
          </div>
        </div>

      </div>

      {/* Preset Tuning Library & Reference Pitch Pipe */}
      <div className="bg-[#FFFDF8] border border-[#E8DCCB] rounded-2xl p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E8DCCB] pb-4">
          <div>
            <h3 className="font-heading font-semibold text-base text-[#2F2A26]">Instrument Tuning Presets & Pitch Pipe</h3>
            <p className="text-xs text-[#6D655D]">Click any string note to play a crystal-clear reference tone.</p>
          </div>
          <select
            value={selectedPreset.name}
            onChange={(e) => {
              const found = INSTRUMENT_TUNINGS.find(t => t.name === e.target.value);
              if (found) setSelectedPreset(found);
            }}
            className="px-3 py-2 text-xs rounded-xl bg-[#FFFBE9] border border-[#E8DCCB] text-[#2F2A26] font-semibold focus:outline-none"
          >
            {INSTRUMENT_TUNINGS.map(t => (
              <option key={t.name} value={t.name}>{t.name}</option>
            ))}
          </select>
        </div>

        {/* String Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {selectedPreset.notes.map((item) => {
            const isPlayingThis = activeToneNote === item.note;
            return (
              <button
                key={item.note}
                onClick={() => handlePlayReferenceTone(item.note, item.freq)}
                className={`p-4 rounded-xl border text-center transition-all ${
                  isPlayingThis
                    ? 'bg-[#AD8B73] text-[#FFFBE9] border-[#AD8B73] shadow-md scale-105'
                    : 'bg-[#FFFBE9] border-[#E8DCCB] hover:border-[#AD8B73] text-[#2F2A26]'
                }`}
              >
                <div className="font-heading font-bold text-lg">{item.note}</div>
                <div className="text-[11px] font-mono opacity-80 mt-0.5">{item.freq} Hz</div>
                <div className="mt-2 flex justify-center">
                  <Volume2 className={`w-4 h-4 ${isPlayingThis ? 'text-[#FFFBE9] animate-pulse' : 'text-[#AD8B73]'}`} />
                </div>
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
};
