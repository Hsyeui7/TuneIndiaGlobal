import React, { useState, useEffect } from 'react';
import { startTone, stopTone, noteDetails, frequencyFromNoteNumber, NOTE_NAMES } from '../../utils/audioEngine';
import { Zap, Volume2, Play, Square, Activity, RefreshCw } from 'lucide-react';

export const PitchGeneratorTool: React.FC = () => {
  const [freq, setFreq] = useState<number>(440);
  const [waveform, setWaveform] = useState<OscillatorType>('sine');
  const [volume, setVolume] = useState<number>(0.5);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isBinaural, setIsBinaural] = useState<boolean>(false);
  const [binauralBeatHz, setBinauralBeatHz] = useState<number>(7.83); // Schumann resonance

  // Transpose state
  const [originalKey, setOriginalKey] = useState<string>('C');
  const [semitones, setSemitones] = useState<number>(2);

  useEffect(() => {
    if (isPlaying) {
      startTone(freq, waveform, volume);
    } else {
      stopTone();
    }
    return () => stopTone();
  }, [isPlaying, freq, waveform, volume]);

  const details = noteDetails(freq);

  const handleKeyTranspose = () => {
    const origIdx = NOTE_NAMES.indexOf(originalKey);
    if (origIdx === -1) return originalKey;
    const newIdx = (origIdx + semitones + 12) % 12;
    return NOTE_NAMES[newIdx];
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4">
      
      {/* Header */}
      <div className="border-b border-[#E8DCCB] pb-6">
        <h1 className="font-heading font-bold text-2xl sm:text-3xl text-[#2F2A26]">Tone, Pitch & Binaural Generator</h1>
        <p className="text-sm text-[#6D655D] mt-1">Generate pure sine, triangle, square & sawtooth audio tones, tuning references (A440), and binaural beat frequencies.</p>
      </div>

      {/* Main Generator Box */}
      <div className="bg-[#FFFDF8] border border-[#E8DCCB] rounded-2xl p-8 shadow-sm space-y-6">
        
        <div className="text-center space-y-2">
          <div className="inline-flex items-baseline space-x-2">
            <span className="font-heading font-extrabold text-6xl sm:text-8xl text-[#2F2A26]">{freq}</span>
            <span className="font-bold text-xl text-[#AD8B73]">Hz</span>
          </div>
          <div className="text-sm font-semibold text-[#AD8B73]">
            Note: {details.noteName}{details.octave} ({details.cents > 0 ? `+${details.cents}` : details.cents} cents from {details.targetFreq} Hz)
          </div>
        </div>

        {/* Hz Slider */}
        <div className="max-w-lg mx-auto space-y-1">
          <input
            type="range"
            min="20"
            max="4000"
            value={freq}
            onChange={(e) => setFreq(Number(e.target.value))}
            className="w-full h-2 bg-[#E8DCCB] rounded-lg appearance-none cursor-pointer accent-[#AD8B73]"
          />
          <div className="flex justify-between text-[11px] font-mono text-[#6D655D]">
            <span>20 Hz Sub</span>
            <span>440 Hz A4</span>
            <span>1000 Hz Mid</span>
            <span>4000 Hz High</span>
          </div>
        </div>

        {/* Preset Reference Pitches */}
        <div className="flex flex-wrap justify-center gap-2 pt-2">
          {[
            { label: 'A440 Standard', hz: 440 },
            { label: 'A432 Verdi', hz: 432 },
            { label: 'C256 Scientific', hz: 256 },
            { label: '528 Hz Solfeggio', hz: 528 },
            { label: 'E2 Guitar', hz: 82.41 },
            { label: '1000 Hz Test', hz: 1000 },
          ].map(p => (
            <button
              key={p.label}
              onClick={() => setFreq(p.hz)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-xl border transition-all ${
                freq === p.hz ? 'bg-[#AD8B73] text-[#FFFBE9] border-[#AD8B73]' : 'bg-[#FFFBE9] border-[#E8DCCB] text-[#2F2A26]'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#E8DCCB]">
          
          <div>
            <label className="text-xs font-medium text-[#6D655D] block mb-2">Waveform Shape</label>
            <div className="grid grid-cols-4 gap-1.5 text-xs font-semibold">
              {(['sine', 'triangle', 'square', 'sawtooth'] as OscillatorType[]).map(shape => (
                <button
                  key={shape}
                  onClick={() => setWaveform(shape)}
                  className={`py-2 rounded-xl capitalize border ${
                    waveform === shape ? 'bg-[#AD8B73] text-[#FFFBE9] border-[#AD8B73]' : 'bg-[#FFFBE9] border-[#E8DCCB] text-[#6D655D]'
                  }`}
                >
                  {shape}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-[#6D655D] block mb-2">Volume Level ({Math.round(volume * 100)}%)</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="w-full h-2 bg-[#E8DCCB] rounded-lg appearance-none cursor-pointer accent-[#AD8B73] mt-2"
            />
          </div>

        </div>

        {/* Play Button */}
        <div className="flex justify-center pt-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`px-10 py-4 rounded-2xl font-heading font-bold text-base flex items-center space-x-2 transition-all shadow-md ${
              isPlaying ? 'bg-[#B65A4A] text-[#FFFBE9]' : 'bg-[#AD8B73] text-[#FFFBE9] hover:bg-[#96745D]'
            }`}
          >
            {isPlaying ? <Square className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
            <span>{isPlaying ? 'STOP GENERATOR' : 'START TONE GENERATOR'}</span>
          </button>
        </div>

      </div>

      {/* Key Transpose & Capo Calculator */}
      <div className="bg-[#FFFDF8] border border-[#E8DCCB] rounded-2xl p-6 space-y-4">
        <h3 className="font-heading font-semibold text-base text-[#2F2A26]">Key Transpose & Capo Calculator</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-xs text-[#6D655D] block mb-1">Original Song Key</label>
            <select
              value={originalKey}
              onChange={(e) => setOriginalKey(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-[#FFFBE9] border border-[#E8DCCB] text-sm font-semibold text-[#2F2A26]"
            >
              {NOTE_NAMES.map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>

          <div>
            <label className="text-xs text-[#6D655D] block mb-1">Shift Semitones ({semitones > 0 ? `+${semitones}` : semitones})</label>
            <input
              type="range"
              min="-12"
              max="12"
              value={semitones}
              onChange={(e) => setSemitones(Number(e.target.value))}
              className="w-full h-2 bg-[#E8DCCB] rounded-lg appearance-none cursor-pointer accent-[#AD8B73] mt-2"
            />
          </div>

          <div className="bg-[#FFFBE9] border border-[#E8DCCB] rounded-xl p-3 text-center">
            <span className="text-xs text-[#6D655D] block">Transposed New Key</span>
            <span className="font-heading font-bold text-2xl text-[#AD8B73]">{handleKeyTranspose()}</span>
            <span className="text-[10px] text-[#6D655D] block mt-0.5">Capo Fret: {semitones > 0 ? FretName(semitones) : 'No Capo'}</span>
          </div>
        </div>
      </div>

    </div>
  );
};

function FretName(semi: number) {
  if (semi === 1) return '1st Fret';
  if (semi === 2) return '2nd Fret';
  if (semi === 3) return '3rd Fret';
  return `${semi}th Fret`;
}
