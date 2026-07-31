import React, { useState, useEffect, useCallback, useRef } from 'react';
import { playPolyNote, playClickSound, frequencyFromNoteNumber, noteDetails } from '../../utils/audioEngine';
import { Music, Grid, Repeat, Play, Pause, Keyboard, Volume2, Sliders, VolumeX, Sparkles, Trash2, Shuffle, Zap } from 'lucide-react';

interface KeyConfig {
  name: string;
  isBlack: boolean;
  baseMidi: number;
  kbdKey: string;
  displayKey: string;
}

const PIANO_KEY_CONFIGS: KeyConfig[] = [
  { name: 'C', isBlack: false, baseMidi: 60, kbdKey: 'a', displayKey: 'A' },
  { name: 'C#', isBlack: true, baseMidi: 61, kbdKey: 'w', displayKey: 'W' },
  { name: 'D', isBlack: false, baseMidi: 62, kbdKey: 's', displayKey: 'S' },
  { name: 'D#', isBlack: true, baseMidi: 63, kbdKey: 'e', displayKey: 'E' },
  { name: 'E', isBlack: false, baseMidi: 64, kbdKey: 'd', displayKey: 'D' },
  { name: 'F', isBlack: false, baseMidi: 65, kbdKey: 'f', displayKey: 'F' },
  { name: 'F#', isBlack: true, baseMidi: 66, kbdKey: 't', displayKey: 'T' },
  { name: 'G', isBlack: false, baseMidi: 67, kbdKey: 'g', displayKey: 'G' },
  { name: 'G#', isBlack: true, baseMidi: 68, kbdKey: 'y', displayKey: 'Y' },
  { name: 'A', isBlack: false, baseMidi: 69, kbdKey: 'h', displayKey: 'H' },
  { name: 'A#', isBlack: true, baseMidi: 70, kbdKey: 'u', displayKey: 'U' },
  { name: 'B', isBlack: false, baseMidi: 71, kbdKey: 'j', displayKey: 'J' },
  { name: 'C', isBlack: false, baseMidi: 72, kbdKey: 'k', displayKey: 'K' },
  { name: 'C#', isBlack: true, baseMidi: 73, kbdKey: 'o', displayKey: 'O' },
  { name: 'D', isBlack: false, baseMidi: 74, kbdKey: 'l', displayKey: 'L' },
  { name: 'D#', isBlack: true, baseMidi: 75, kbdKey: 'p', displayKey: 'P' },
  { name: 'E', isBlack: false, baseMidi: 76, kbdKey: ';', displayKey: ';' },
];

interface LooperTrack {
  id: string;
  name: string;
  category: 'drums' | 'keys' | 'synths' | 'world';
  type: 'sound' | 'note';
  soundType?: 'woodblock' | 'rimshot' | 'digital' | 'cowbell';
  freq?: number;
  mode?: 'piano' | 'organ' | 'synth' | 'marimba';
  pattern: boolean[];
  volume: number;
  muted: boolean;
  solo: boolean;
}

const INITIAL_LOOPER_TRACKS: LooperTrack[] = [
  {
    id: 'kick',
    name: 'Kick Drum',
    category: 'drums',
    type: 'sound',
    soundType: 'woodblock',
    pattern: [true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false],
    volume: 0.9,
    muted: false,
    solo: false,
  },
  {
    id: 'snare',
    name: 'Snare Rim',
    category: 'drums',
    type: 'sound',
    soundType: 'rimshot',
    pattern: [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false],
    volume: 0.8,
    muted: false,
    solo: false,
  },
  {
    id: 'hihat',
    name: 'Hi-Hat Cymbal',
    category: 'drums',
    type: 'sound',
    soundType: 'digital',
    pattern: [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
    volume: 0.5,
    muted: false,
    solo: false,
  },
  {
    id: 'cowbell',
    name: 'Studio Cowbell',
    category: 'drums',
    type: 'sound',
    soundType: 'cowbell',
    pattern: [false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false],
    volume: 0.7,
    muted: false,
    solo: false,
  },
  {
    id: 'piano_c4',
    name: 'Piano Chord (C4)',
    category: 'keys',
    type: 'note',
    freq: 261.63,
    mode: 'piano',
    pattern: [true, false, false, true, false, false, true, false, true, false, false, true, false, false, true, false],
    volume: 0.8,
    muted: false,
    solo: false,
  },
  {
    id: 'piano_g4',
    name: 'Piano High (G4)',
    category: 'keys',
    type: 'note',
    freq: 392.00,
    mode: 'piano',
    pattern: [false, false, true, false, false, false, false, true, false, false, true, false, false, false, false, true],
    volume: 0.7,
    muted: false,
    solo: false,
  },
  {
    id: 'synth_bass',
    name: 'Synth Bass (C3)',
    category: 'synths',
    type: 'note',
    freq: 130.81,
    mode: 'synth',
    pattern: [true, false, false, false, false, true, false, false, true, false, false, false, false, true, false, false],
    volume: 0.85,
    muted: false,
    solo: false,
  },
  {
    id: 'synth_lead',
    name: 'Synth Lead (G4)',
    category: 'synths',
    type: 'note',
    freq: 392.00,
    mode: 'synth',
    pattern: [false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false],
    volume: 0.65,
    muted: false,
    solo: false,
  },
  {
    id: 'organ_e4',
    name: 'Organ Lead (E4)',
    category: 'keys',
    type: 'note',
    freq: 329.63,
    mode: 'organ',
    pattern: [false, true, false, false, false, true, false, false, false, true, false, false, false, true, false, false],
    volume: 0.7,
    muted: false,
    solo: false,
  },
  {
    id: 'marimba_a4',
    name: 'Marimba Mallet (A4)',
    category: 'keys',
    type: 'note',
    freq: 440.00,
    mode: 'marimba',
    pattern: [false, false, true, false, true, false, false, false, false, false, true, false, true, false, false, false],
    volume: 0.75,
    muted: false,
    solo: false,
  },
  {
    id: 'tanpura_sa',
    name: 'Tanpura Drone (Sa)',
    category: 'world',
    type: 'note',
    freq: 220.00,
    mode: 'organ',
    pattern: [true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false],
    volume: 0.8,
    muted: false,
    solo: false,
  },
  {
    id: 'reed_flute',
    name: 'Reed Flute (D4)',
    category: 'world',
    type: 'note',
    freq: 293.66,
    mode: 'piano',
    pattern: [false, false, false, false, true, false, false, true, false, false, false, false, true, false, false, true],
    volume: 0.7,
    muted: false,
    solo: false,
  }
];

export const VirtualInstruments: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'piano' | 'drums' | 'looper'>('piano');

  // Piano State
  const [octaveShift, setOctaveShift] = useState<number>(0);
  const [soundMode, setSoundMode] = useState<'piano' | 'organ' | 'synth' | 'marimba'>('piano');
  const [volume, setVolume] = useState<number>(0.7);
  const [activeMidiNotes, setActiveMidiNotes] = useState<Set<number>>(new Set());
  const [lastPlayedNote, setLastPlayedNote] = useState<string>('Ready to play');

  // Drum Machine State
  const [drumPlaying, setDrumPlaying] = useState(false);
  const [drumBpm, setDrumBpm] = useState(110);
  const [currentDrumStep, setCurrentDrumStep] = useState(0);

  const [drumGrid, setDrumGrid] = useState({
    kick: [true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false],
    snare: [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false],
    hihat: [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
    clap: [false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false]
  });

  // Multi-Track Beat Looper State
  const [looperPlaying, setLooperPlaying] = useState(false);
  const [looperBpm, setLooperBpm] = useState(120);
  const [currentLooperStep, setCurrentLooperStep] = useState(0);
  const [looperMasterVol, setLooperMasterVol] = useState(0.8);
  const [looperTracks, setLooperTracks] = useState<LooperTrack[]>(INITIAL_LOOPER_TRACKS);
  
  const tapTimesRef = useRef<number[]>([]);

  // Trigger Piano Key
  const triggerKey = useCallback((config: KeyConfig) => {
    const midi = config.baseMidi + (octaveShift * 12);
    const freq = frequencyFromNoteNumber(midi);
    const details = noteDetails(freq);
    
    playPolyNote(freq, 1.4, volume, soundMode);
    setLastPlayedNote(`${details.noteName}${details.octave} (${Math.round(freq)} Hz)`);

    setActiveMidiNotes(prev => new Set(prev).add(midi));

    setTimeout(() => {
      setActiveMidiNotes(prev => {
        const next = new Set(prev);
        next.delete(midi);
        return next;
      });
    }, 280);
  }, [octaveShift, volume, soundMode]);

  // Keyboard Event Listener for Piano
  useEffect(() => {
    if (activeTab !== 'piano') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const activeEl = document.activeElement;
      if (
        activeEl &&
        (activeEl.tagName === 'INPUT' ||
          activeEl.tagName === 'TEXTAREA' ||
          activeEl.tagName === 'SELECT' ||
          (activeEl as HTMLElement).isContentEditable)
      ) {
        return;
      }

      const keyChar = e.key.toLowerCase();
      const matchedConfig = PIANO_KEY_CONFIGS.find(cfg => cfg.kbdKey === keyChar);

      if (matchedConfig) {
        e.preventDefault();
        const midi = matchedConfig.baseMidi + (octaveShift * 12);
        
        if (!e.repeat) {
          const freq = frequencyFromNoteNumber(midi);
          const details = noteDetails(freq);
          playPolyNote(freq, 1.4, volume, soundMode);
          setLastPlayedNote(`${details.noteName}${details.octave} (${Math.round(freq)} Hz)`);
        }

        setActiveMidiNotes(prev => new Set(prev).add(midi));
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const keyChar = e.key.toLowerCase();
      const matchedConfig = PIANO_KEY_CONFIGS.find(cfg => cfg.kbdKey === keyChar);

      if (matchedConfig) {
        const midi = matchedConfig.baseMidi + (octaveShift * 12);
        setActiveMidiNotes(prev => {
          const next = new Set(prev);
          next.delete(midi);
          return next;
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [activeTab, octaveShift, volume, soundMode]);

  // Drum Machine Sequencer Effect
  useEffect(() => {
    let interval: any = null;
    if (drumPlaying) {
      const stepMs = (60 / drumBpm / 4) * 1000;
      interval = setInterval(() => {
        setCurrentDrumStep(prev => {
          const next = (prev + 1) % 16;
          if (drumGrid.kick[next]) playClickSound('woodblock', true, 0.9);
          if (drumGrid.snare[next]) playClickSound('rimshot', true, 0.8);
          if (drumGrid.hihat[next]) playClickSound('digital', false, 0.4);
          if (drumGrid.clap[next]) playClickSound('cowbell', false, 0.6);
          return next;
        });
      }, stepMs);
    } else {
      setCurrentDrumStep(0);
    }
    return () => clearInterval(interval);
  }, [drumPlaying, drumBpm, drumGrid]);

  // Multi-Track Beat Looper Sequencer Effect
  useEffect(() => {
    let interval: any = null;
    if (looperPlaying) {
      const stepMs = (60 / looperBpm / 4) * 1000;
      interval = setInterval(() => {
        setCurrentLooperStep(prevStep => {
          const nextStep = (prevStep + 1) % 16;
          
          // Check if any track is soloed
          const hasSolo = looperTracks.some(t => t.solo);

          looperTracks.forEach(track => {
            if (track.pattern[nextStep]) {
              const isAudible = hasSolo ? track.solo : !track.muted;
              if (isAudible) {
                const effectiveVol = track.volume * looperMasterVol;
                if (track.type === 'sound' && track.soundType) {
                  playClickSound(track.soundType, true, effectiveVol);
                } else if (track.type === 'note' && track.freq) {
                  playPolyNote(track.freq, 0.7, effectiveVol, track.mode || 'piano');
                }
              }
            }
          });

          return nextStep;
        });
      }, stepMs);
    } else {
      setCurrentLooperStep(0);
    }

    return () => clearInterval(interval);
  }, [looperPlaying, looperBpm, looperTracks, looperMasterVol]);

  const toggleDrumStep = (track: 'kick' | 'snare' | 'hihat' | 'clap', stepIdx: number) => {
    setDrumGrid(prev => ({
      ...prev,
      [track]: prev[track].map((val, idx) => idx === stepIdx ? !val : val)
    }));
  };

  // Looper helper actions
  const toggleLooperStep = (trackId: string, stepIdx: number) => {
    setLooperTracks(prev => prev.map(tr => {
      if (tr.id === trackId) {
        const nextPat = [...tr.pattern];
        nextPat[stepIdx] = !nextPat[stepIdx];
        return { ...tr, pattern: nextPat };
      }
      return tr;
    }));
  };

  const toggleLooperMute = (trackId: string) => {
    setLooperTracks(prev => prev.map(tr => tr.id === trackId ? { ...tr, muted: !tr.muted } : tr));
  };

  const toggleLooperSolo = (trackId: string) => {
    setLooperTracks(prev => prev.map(tr => tr.id === trackId ? { ...tr, solo: !tr.solo } : tr));
  };

  const updateLooperVolume = (trackId: string, vol: number) => {
    setLooperTracks(prev => prev.map(tr => tr.id === trackId ? { ...tr, volume: vol } : tr));
  };

  const previewTrackSound = (track: LooperTrack) => {
    if (track.type === 'sound' && track.soundType) {
      playClickSound(track.soundType, true, track.volume * looperMasterVol);
    } else if (track.type === 'note' && track.freq) {
      playPolyNote(track.freq, 1.0, track.volume * looperMasterVol, track.mode || 'piano');
    }
  };

  const handleTapTempo = () => {
    const now = Date.now();
    tapTimesRef.current.push(now);
    if (tapTimesRef.current.length > 4) {
      tapTimesRef.current.shift();
    }
    if (tapTimesRef.current.length > 1) {
      const intervals = [];
      for (let i = 1; i < tapTimesRef.current.length; i++) {
        intervals.push(tapTimesRef.current[i] - tapTimesRef.current[i - 1]);
      }
      const avgMs = intervals.reduce((a, b) => a + b, 0) / intervals.length;
      const calculatedBpm = Math.round(60000 / avgMs);
      if (calculatedBpm >= 60 && calculatedBpm <= 200) {
        setLooperBpm(calculatedBpm);
      }
    }
  };

  const clearAllLooperPatterns = () => {
    setLooperTracks(prev => prev.map(tr => ({ ...tr, pattern: Array(16).fill(false) })));
  };

  const randomizeLooperGroove = () => {
    setLooperTracks(prev => prev.map(tr => {
      const prob = tr.category === 'drums' ? 0.35 : 0.2;
      const randPat = Array(16).fill(false).map(() => Math.random() < prob);
      return { ...tr, pattern: randPat };
    }));
  };

  const applyLooperPreset = (presetName: 'bollywood' | 'lofi' | 'synthwave' | 'classical') => {
    setLooperTracks(prev => prev.map(tr => {
      let pat = Array(16).fill(false);
      if (presetName === 'bollywood') {
        if (tr.id === 'kick') pat = [true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false];
        if (tr.id === 'snare') pat = [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false];
        if (tr.id === 'hihat') pat = [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true];
        if (tr.id === 'tanpura_sa') pat = [true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false];
        if (tr.id === 'reed_flute') pat = [false, false, false, false, true, false, false, true, false, false, false, false, true, false, false, true];
        if (tr.id === 'cowbell') pat = [false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false];
      } else if (presetName === 'lofi') {
        if (tr.id === 'kick') pat = [true, false, false, false, false, false, true, false, false, false, true, false, false, false, false, false];
        if (tr.id === 'snare') pat = [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false];
        if (tr.id === 'hihat') pat = [true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false];
        if (tr.id === 'piano_c4') pat = [true, false, false, true, false, false, true, false, true, false, false, true, false, false, true, false];
        if (tr.id === 'piano_g4') pat = [false, false, true, false, false, false, false, true, false, false, true, false, false, false, false, true];
        if (tr.id === 'marimba_a4') pat = [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false];
      } else if (presetName === 'synthwave') {
        if (tr.id === 'kick') pat = [true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false];
        if (tr.id === 'snare') pat = [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false];
        if (tr.id === 'synth_bass') pat = [true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false];
        if (tr.id === 'synth_lead') pat = [false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false];
        if (tr.id === 'organ_e4') pat = [false, true, false, false, false, true, false, false, false, true, false, false, false, true, false, false];
      } else if (presetName === 'classical') {
        if (tr.id === 'tanpura_sa') pat = [true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false];
        if (tr.id === 'reed_flute') pat = [true, false, false, true, false, false, true, false, true, false, false, true, false, false, true, false];
        if (tr.id === 'cowbell') pat = [true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false];
      }
      return { ...tr, pattern: pat, muted: false, solo: false };
    }));
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 py-4">
      
      {/* Header */}
      <div className="border-b border-[#E8DCCB] pb-6">
        <h1 className="font-heading font-bold text-2xl sm:text-3xl text-[#2F2A26]">Virtual Instruments Suite</h1>
        <p className="text-sm text-[#6D655D] mt-1">Play live Piano with physical keyboard binding, sequence 16-step drums, or build multi-instrument beat loops.</p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center space-x-2">
        {[
          { id: 'piano', label: 'Virtual Piano & Synth', icon: Music },
          { id: 'drums', label: '16-Step Drum Machine', icon: Grid },
          { id: 'looper', label: 'Multi-Track Beat Looper', icon: Repeat }
        ].map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-5 py-2.5 rounded-xl text-xs font-semibold flex items-center space-x-2 transition-all ${
                activeTab === tab.id
                  ? 'bg-[#AD8B73] text-[#FFFBE9] shadow-sm'
                  : 'bg-[#FFFDF8] border border-[#E8DCCB] text-[#6D655D] hover:text-[#2F2A26]'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Piano View */}
      {activeTab === 'piano' && (
        <div className="bg-[#FFFDF8] border border-[#E8DCCB] rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
          
          {/* Top Control Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-[#E8DCCB] pb-4">
            
            <div className="flex items-center space-x-3 bg-[#E3CAA5]/20 px-3.5 py-2 rounded-xl border border-[#E3CAA5]/50 text-xs text-[#2F2A26]">
              <div className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </div>
              <Keyboard className="w-4 h-4 text-[#AD8B73]" />
              <span className="font-medium">Keyboard Live: <strong className="text-[#AD8B73]">{lastPlayedNote}</strong></span>
            </div>

            {/* Sound Mode Preset Selector */}
            <div className="flex items-center space-x-2">
              <span className="text-xs font-semibold text-[#6D655D] flex items-center space-x-1">
                <Sliders className="w-3.5 h-3.5" />
                <span>Sound Mode:</span>
              </span>
              <div className="flex bg-[#FFFBE9] p-1 rounded-xl border border-[#E8DCCB] space-x-1 text-xs font-medium">
                {(['piano', 'organ', 'synth', 'marimba'] as const).map(mode => (
                  <button
                    key={mode}
                    onClick={() => setSoundMode(mode)}
                    className={`px-3 py-1 rounded-lg capitalize transition-all ${
                      soundMode === mode ? 'bg-[#AD8B73] text-[#FFFBE9] font-bold shadow-xs' : 'text-[#6D655D] hover:text-[#2F2A26]'
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            {/* Octave & Volume */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-xs">
                <span className="font-semibold text-[#6D655D]">Octave:</span>
                <div className="flex items-center bg-[#FFFBE9] border border-[#E8DCCB] rounded-xl overflow-hidden">
                  <button
                    onClick={() => setOctaveShift(prev => Math.max(-2, prev - 1))}
                    disabled={octaveShift <= -2}
                    className="px-2.5 py-1 text-xs font-bold text-[#AD8B73] hover:bg-[#E8DCCB]/30 disabled:opacity-40"
                  >
                    -
                  </button>
                  <span className="px-2 font-mono font-bold text-[#2F2A26]">
                    {octaveShift > 0 ? `+${octaveShift}` : octaveShift}
                  </span>
                  <button
                    onClick={() => setOctaveShift(prev => Math.min(2, prev + 1))}
                    disabled={octaveShift >= 2}
                    className="px-2.5 py-1 text-xs font-bold text-[#AD8B73] hover:bg-[#E8DCCB]/30 disabled:opacity-40"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex items-center space-x-1.5 text-xs">
                <Volume2 className="w-4 h-4 text-[#6D655D]" />
                <input
                  type="range"
                  min="0.1"
                  max="1"
                  step="0.05"
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  className="w-20 h-1.5 bg-[#E8DCCB] rounded-lg appearance-none cursor-pointer accent-[#AD8B73]"
                />
              </div>
            </div>

          </div>

          <p className="text-xs text-[#6D655D] text-center">
            Play with your computer keyboard or click the keys below. Mapped to: <span className="font-mono bg-[#E3CAA5]/30 px-1.5 py-0.5 rounded text-[#2F2A26] font-bold">A W S E D F T G Y H U J K O L P ;</span>
          </p>

          {/* Interactive Keyboard Stage */}
          <div className="flex justify-center overflow-x-auto py-4 px-2">
            <div className="relative flex justify-center items-start select-none py-2 min-w-[620px]">
              {PIANO_KEY_CONFIGS.map((config) => {
                const currentMidi = config.baseMidi + (octaveShift * 12);
                const isActive = activeMidiNotes.has(currentMidi);
                const freq = frequencyFromNoteNumber(currentMidi);
                const details = noteDetails(freq);

                if (config.isBlack) {
                  return (
                    <button
                      key={config.kbdKey}
                      onMouseDown={() => triggerKey(config)}
                      onTouchStart={(e) => { e.preventDefault(); triggerKey(config); }}
                      className={`relative w-8 sm:w-10 h-28 sm:h-32 rounded-b-lg font-mono font-bold text-[11px] flex flex-col justify-end pb-2.5 transition-all shadow-md z-20 -mx-4 sm:-mx-5 border ${
                        isActive
                          ? 'bg-[#AD8B73] text-[#FFFBE9] border-[#96745D] ring-2 ring-[#AD8B73] translate-y-1 z-30 shadow-inner'
                          : 'bg-[#2F2A26] text-[#E3CAA5] border-[#1C1917] hover:bg-[#423C37]'
                      }`}
                    >
                      <span className="block leading-none">{details.noteName}</span>
                      <span className="text-[10px] opacity-75 font-sans mt-1">[{config.displayKey}]</span>
                    </button>
                  );
                }

                return (
                  <button
                    key={config.kbdKey}
                    onMouseDown={() => triggerKey(config)}
                    onTouchStart={(e) => { e.preventDefault(); triggerKey(config); }}
                    className={`relative w-11 sm:w-14 h-44 sm:h-48 rounded-b-xl font-mono font-bold text-xs flex flex-col justify-end pb-3 transition-all shadow-sm border ${
                      isActive
                        ? 'bg-[#E8DCCB] text-[#2F2A26] border-[#AD8B73] ring-2 ring-[#AD8B73] translate-y-1 shadow-inner'
                        : 'bg-[#FFFDF8] text-[#6D655D] border-[#E8DCCB] hover:bg-[#FFFBE9]'
                    }`}
                  >
                    <span className="block text-sm font-extrabold text-[#2F2A26] leading-none">{details.noteName}{details.octave}</span>
                    <span className="text-[10px] font-sans text-[#AD8B73] mt-1 font-bold">[{config.displayKey}]</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Key Legend */}
          <div className="bg-[#FFFBE9] border border-[#E8DCCB] rounded-xl p-4 text-xs text-[#6D655D] space-y-2">
            <span className="font-heading font-semibold text-[#2F2A26] block">Physical Keyboard Mapping Guide:</span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
              <div><span className="font-mono font-bold text-[#AD8B73]">A S D F G H J K L ;</span> → Natural Notes</div>
              <div><span className="font-mono font-bold text-[#AD8B73]">W E T Y U O P</span> → Sharps / Flats</div>
              <div><span className="font-mono font-bold text-[#AD8B73]">Octave - / +</span> → Pitch Shift</div>
              <div><span className="font-mono font-bold text-[#AD8B73]">Sound Mode</span> → Acoustic & Synth</div>
            </div>
          </div>

        </div>
      )}

      {/* Drum Machine View */}
      {activeTab === 'drums' && (
        <div className="bg-[#FFFDF8] border border-[#E8DCCB] rounded-2xl p-6 space-y-6 shadow-sm">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-[#E8DCCB] pb-4">
            <button
              onClick={() => setDrumPlaying(!drumPlaying)}
              className={`px-6 py-2.5 rounded-xl font-heading font-bold text-xs flex items-center space-x-2 transition-all ${
                drumPlaying ? 'bg-[#B65A4A] text-[#FFFBE9]' : 'bg-[#AD8B73] text-[#FFFBE9]'
              }`}
            >
              {drumPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{drumPlaying ? 'STOP SEQUENCER' : 'PLAY DRUM LOOP'}</span>
            </button>

            <div className="flex items-center space-x-3">
              <span className="text-xs font-semibold text-[#6D655D]">Tempo: {drumBpm} BPM</span>
              <input
                type="range"
                min="60"
                max="180"
                value={drumBpm}
                onChange={(e) => setDrumBpm(Number(e.target.value))}
                className="w-32 h-2 bg-[#E8DCCB] rounded-lg appearance-none cursor-pointer accent-[#AD8B73]"
              />
            </div>
          </div>

          <div className="space-y-3">
            {[
              { track: 'kick', label: 'Kick Drum' },
              { track: 'snare', label: 'Snare Drum' },
              { track: 'hihat', label: 'Hi-Hat Cymbal' },
              { track: 'clap', label: 'Studio Cowbell' }
            ].map((tr) => (
              <div key={tr.track} className="flex items-center space-x-2">
                <span className="w-28 text-xs font-semibold text-[#2F2A26]">{tr.label}</span>
                <div className="grid grid-cols-16 gap-1 flex-1">
                  {drumGrid[tr.track as keyof typeof drumGrid].map((active, stepIdx) => (
                    <button
                      key={stepIdx}
                      onClick={() => toggleDrumStep(tr.track as any, stepIdx)}
                      className={`h-9 rounded-md border text-[10px] font-mono transition-all ${
                        active
                          ? 'bg-[#AD8B73] text-[#FFFBE9] border-[#AD8B73]'
                          : 'bg-[#FFFBE9] border-[#E8DCCB] text-[#6D655D]'
                      } ${drumPlaying && currentDrumStep === stepIdx ? 'ring-2 ring-[#2F2A26]' : ''}`}
                    >
                      {stepIdx + 1}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Multi-Track Instrument Beat Looper View */}
      {activeTab === 'looper' && (
        <div className="bg-[#FFFDF8] border border-[#E8DCCB] rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
          
          {/* Master Transport & Controls Bar */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#E8DCCB] pb-6">
            
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setLooperPlaying(!looperPlaying)}
                className={`px-6 py-3 rounded-xl font-heading font-bold text-xs flex items-center space-x-2.5 transition-all shadow-sm ${
                  looperPlaying ? 'bg-[#B65A4A] text-[#FFFBE9] hover:bg-[#A34F40]' : 'bg-[#AD8B73] text-[#FFFBE9] hover:bg-[#96745D]'
                }`}
              >
                {looperPlaying ? <Pause className="w-4.5 h-4.5" /> : <Play className="w-4.5 h-4.5" />}
                <span className="tracking-wide">{looperPlaying ? 'STOP BEAT LOOP' : 'START BEAT LOOP'}</span>
              </button>

              <button
                onClick={handleTapTempo}
                className="px-4 py-3 rounded-xl bg-[#E3CAA5]/30 border border-[#E3CAA5] text-[#AD8B73] hover:bg-[#AD8B73] hover:text-[#FFFBE9] text-xs font-bold transition-all flex items-center space-x-1.5"
                title="Tap along to set tempo"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>TAP TEMPO</span>
              </button>
            </div>

            {/* Tempo & Master Volume Sliders */}
            <div className="flex flex-wrap items-center gap-6 text-xs font-semibold text-[#2F2A26]">
              <div className="flex items-center space-x-3">
                <span className="text-[#6D655D]">Tempo: <strong className="font-mono text-[#AD8B73]">{looperBpm} BPM</strong></span>
                <input
                  type="range"
                  min="60"
                  max="200"
                  value={looperBpm}
                  onChange={(e) => setLooperBpm(Number(e.target.value))}
                  className="w-28 sm:w-36 h-2 bg-[#E8DCCB] rounded-lg appearance-none cursor-pointer accent-[#AD8B73]"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Volume2 className="w-4 h-4 text-[#AD8B73]" />
                <span className="text-[#6D655D]">Master Vol:</span>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={looperMasterVol}
                  onChange={(e) => setLooperMasterVol(Number(e.target.value))}
                  className="w-24 h-2 bg-[#E8DCCB] rounded-lg appearance-none cursor-pointer accent-[#AD8B73]"
                />
              </div>
            </div>

          </div>

          {/* Beat Pattern Presets Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#FFFBE9] border border-[#E8DCCB] p-4 rounded-xl text-xs">
            <div className="flex items-center space-x-2 text-[#2F2A26] font-semibold">
              <Sparkles className="w-4 h-4 text-[#AD8B73]" />
              <span>Genre Beat Presets:</span>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => applyLooperPreset('bollywood')}
                className="px-3 py-1.5 rounded-lg bg-[#FFFDF8] border border-[#E8DCCB] text-[#2F2A26] hover:border-[#AD8B73] hover:text-[#AD8B73] font-medium transition-all"
              >
                🪘 Bollywood Fusion
              </button>
              <button
                onClick={() => applyLooperPreset('lofi')}
                className="px-3 py-1.5 rounded-lg bg-[#FFFDF8] border border-[#E8DCCB] text-[#2F2A26] hover:border-[#AD8B73] hover:text-[#AD8B73] font-medium transition-all"
              >
                🎹 Lofi Chill
              </button>
              <button
                onClick={() => applyLooperPreset('synthwave')}
                className="px-3 py-1.5 rounded-lg bg-[#FFFDF8] border border-[#E8DCCB] text-[#2F2A26] hover:border-[#AD8B73] hover:text-[#AD8B73] font-medium transition-all"
              >
                ⚡ Synthwave Beat
              </button>
              <button
                onClick={() => applyLooperPreset('classical')}
                className="px-3 py-1.5 rounded-lg bg-[#FFFDF8] border border-[#E8DCCB] text-[#2F2A26] hover:border-[#AD8B73] hover:text-[#AD8B73] font-medium transition-all"
              >
                🪕 Classical Drone
              </button>
              <button
                onClick={randomizeLooperGroove}
                className="px-3 py-1.5 rounded-lg bg-[#E3CAA5]/30 border border-[#E3CAA5] text-[#AD8B73] hover:bg-[#AD8B73] hover:text-[#FFFBE9] font-semibold transition-all flex items-center space-x-1"
              >
                <Shuffle className="w-3 h-3" />
                <span>Randomize</span>
              </button>
              <button
                onClick={clearAllLooperPatterns}
                className="px-3 py-1.5 rounded-lg bg-red-50 border border-red-200 text-red-700 hover:bg-red-100 font-semibold transition-all flex items-center space-x-1"
              >
                <Trash2 className="w-3 h-3" />
                <span>Clear All</span>
              </button>
            </div>
          </div>

          {/* Multi-Track Sequencer Grid Table */}
          <div className="space-y-3 overflow-x-auto pb-4">
            
            {/* Header step counter row */}
            <div className="flex items-center space-x-2 min-w-[700px] border-b border-[#E8DCCB] pb-2 text-[11px] font-mono text-[#6D655D]">
              <div className="w-48 font-sans font-bold text-[#2F2A26] uppercase tracking-wider text-[10px]">Track & Instrument</div>
              <div className="w-24 text-center">Controls</div>
              <div className="grid grid-cols-16 gap-1 flex-1">
                {Array.from({ length: 16 }).map((_, idx) => (
                  <div
                    key={idx}
                    className={`text-center font-bold py-1 rounded ${
                      looperPlaying && currentLooperStep === idx
                        ? 'bg-[#AD8B73] text-[#FFFBE9]'
                        : (idx % 4 === 0 ? 'text-[#2F2A26] font-extrabold bg-[#E3CAA5]/20' : 'text-[#6D655D]')
                    }`}
                  >
                    {idx + 1}
                  </div>
                ))}
              </div>
            </div>

            {/* Individual Instrument Tracks */}
            {looperTracks.map((track) => (
              <div
                key={track.id}
                className={`flex items-center space-x-2 min-w-[700px] p-2 rounded-xl transition-all border ${
                  track.muted
                    ? 'bg-stone-100/60 opacity-60 border-stone-200'
                    : track.solo
                    ? 'bg-[#FFFBE9] border-[#AD8B73] shadow-xs'
                    : 'bg-[#FFFDF8] border-[#E8DCCB] hover:border-[#AD8B73]/50'
                }`}
              >
                {/* Track Info & Preview Trigger */}
                <div className="w-48 flex items-center space-x-2 shrink-0">
                  <button
                    onClick={() => previewTrackSound(track)}
                    className="w-7 h-7 rounded-lg bg-[#E3CAA5]/30 text-[#AD8B73] hover:bg-[#AD8B73] hover:text-[#FFFBE9] flex items-center justify-center shrink-0 transition-colors"
                    title="Click to preview instrument sound"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                  </button>
                  <div className="truncate">
                    <span className="text-xs font-bold text-[#2F2A26] block truncate">{track.name}</span>
                    <span className="text-[10px] font-mono uppercase text-[#6D655D]">{track.category}</span>
                  </div>
                </div>

                {/* Track Mute / Solo / Volume */}
                <div className="w-24 flex items-center justify-center space-x-1 shrink-0">
                  <button
                    onClick={() => toggleLooperMute(track.id)}
                    className={`w-6 h-6 rounded text-[10px] font-mono font-bold flex items-center justify-center transition-colors ${
                      track.muted ? 'bg-red-600 text-white' : 'bg-[#E8DCCB]/60 text-[#6D655D] hover:bg-[#E8DCCB]'
                    }`}
                    title="Mute Track"
                  >
                    M
                  </button>
                  <button
                    onClick={() => toggleLooperSolo(track.id)}
                    className={`w-6 h-6 rounded text-[10px] font-mono font-bold flex items-center justify-center transition-colors ${
                      track.solo ? 'bg-amber-500 text-white' : 'bg-[#E8DCCB]/60 text-[#6D655D] hover:bg-[#E8DCCB]'
                    }`}
                    title="Solo Track"
                  >
                    S
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={track.volume}
                    onChange={(e) => updateLooperVolume(track.id, Number(e.target.value))}
                    className="w-10 h-1 bg-[#E8DCCB] rounded appearance-none cursor-pointer accent-[#AD8B73]"
                    title={`Volume: ${Math.round(track.volume * 100)}%`}
                  />
                </div>

                {/* 16 Step Buttons */}
                <div className="grid grid-cols-16 gap-1 flex-1">
                  {track.pattern.map((active, stepIdx) => {
                    const isBarStart = stepIdx % 4 === 0;
                    const isCurrentStep = looperPlaying && currentLooperStep === stepIdx;

                    return (
                      <button
                        key={stepIdx}
                        onClick={() => toggleLooperStep(track.id, stepIdx)}
                        className={`h-8 rounded-md text-[10px] font-mono font-bold transition-all border ${
                          active
                            ? 'bg-[#AD8B73] text-[#FFFBE9] border-[#96745D] shadow-xs'
                            : isBarStart
                            ? 'bg-[#E3CAA5]/20 border-[#E8DCCB] text-[#6D655D] hover:bg-[#E3CAA5]/40'
                            : 'bg-[#FFFBE9] border-[#E8DCCB] text-[#6D655D] hover:bg-[#E8DCCB]/30'
                        } ${isCurrentStep ? 'ring-2 ring-[#2F2A26] scale-105 z-10' : ''}`}
                      >
                        {active ? '●' : ''}
                      </button>
                    );
                  })}
                </div>

              </div>
            ))}

          </div>

          {/* Quick Tip Footer */}
          <div className="text-xs text-[#6D655D] bg-[#FFFBE9] p-4 rounded-xl border border-[#E8DCCB] space-y-1">
            <span className="font-heading font-semibold text-[#2F2A26] block">Multi-Track Beat Looper Tips:</span>
            <ul className="list-disc list-inside space-y-1 text-[11px]">
              <li>Toggle steps on any track to trigger notes and sounds synchronously on every loop.</li>
              <li>Use <strong>M</strong> (Mute) and <strong>S</strong> (Solo) to isolate melodic lines or rhythm sections live.</li>
              <li>Click the preview play button (<Play className="w-3 h-3 inline fill-current text-[#AD8B73]" />) on any track label to test its instrument tone anytime.</li>
            </ul>
          </div>

        </div>
      )}

    </div>
  );
};
