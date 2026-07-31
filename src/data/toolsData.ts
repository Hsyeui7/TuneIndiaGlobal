import { MusicTool } from '../types';

export const MUSIC_TOOLS: MusicTool[] = [
  // Music Tools & Pitch
  {
    id: 'metronome',
    name: 'Precision Metronome',
    category: 'music-tools',
    description: '20-300 BPM, tap tempo, subdivisions, accents, swing, visual pendulum, and custom click voices.',
    iconName: 'Timer',
    featured: true,
    popular: true,
    tags: ['bpm', 'tempo', 'rhythm', 'click', 'subdivision', 'practice', 'timing']
  },
  {
    id: 'chromatic-tuner',
    name: 'Chromatic Instrument Tuner',
    category: 'music-tools',
    description: 'Real-time pitch detection via mic, needle visualizer, cents off-pitch, & presets for Guitar, Bass, Sitar, Tanpura & Ukulele.',
    iconName: 'Sliders',
    featured: true,
    popular: true,
    tags: ['tuning', 'pitch', 'guitar', 'sitar', 'tanpura', 'ukulele', 'frequency', 'mic']
  },
  {
    id: 'tap-bpm',
    name: 'Tap BPM & Tempo Suite',
    category: 'music-tools',
    description: 'Tap along to any song to detect live BPM, calculate delay milliseconds, loop bars, and time signatures.',
    iconName: 'Activity',
    popular: true,
    tags: ['tap', 'bpm', 'tempo', 'delay', 'milliseconds', 'dj', 'calculator']
  },
  {
    id: 'pitch-generator',
    name: 'Pitch & Tone Generator',
    category: 'music-tools',
    description: 'Pure sine, triangle, square, sawtooth tones, A440 tuning reference, binaural beats, and custom Hz generator.',
    iconName: 'Zap',
    popular: true,
    tags: ['pitch', 'hz', 'frequency', 'sine', 'tone', 'generator', 'binaural', 'a440']
  },
  {
    id: 'scale-chord-finder',
    name: 'Scale & Chord Finder',
    category: 'music-tools',
    description: 'Discover scales, chord formulas, inversions, modes, interval relations, and guitar/piano fingerings.',
    iconName: 'BookOpen',
    featured: true,
    popular: true,
    tags: ['scale', 'chord', 'modes', 'fingerings', 'transposition', 'capo', 'intervals']
  },
  {
    id: 'capo-calculator',
    name: 'Capo & Transpose Calculator',
    category: 'music-tools',
    description: 'Instantly calculate transposed keys, capo placements for guitar/ukulele, and vocal key adjustments.',
    iconName: 'CornerUpRight',
    tags: ['capo', 'transpose', 'guitar', 'key', 'chords', 'vocal']
  },

  // Audio Analysis
  {
    id: 'spectrum-analyzer',
    name: 'Spectrum & FFT Audio Analyzer',
    category: 'analysis',
    description: 'Real-time 31-band spectrum, FFT frequency waterfall, waveform oscilloscope, phase meter, and LUFS peak meters.',
    iconName: 'BarChart2',
    featured: true,
    popular: true,
    tags: ['spectrum', 'fft', 'oscilloscope', 'lufs', 'phase', 'rms', 'decibel', 'mic']
  },
  {
    id: 'decibel-meter',
    name: 'Decibel & Latency Tester',
    category: 'analysis',
    description: 'Live SPL sound pressure measurement, peak clipping detection, noise floor analyzer, and audio system latency test.',
    iconName: 'Volume2',
    tags: ['decibel', 'spl', 'noise', 'latency', 'clipping', 'meter']
  },

  // Recording
  {
    id: 'audio-recorder',
    name: 'Studio Audio & Voice Recorder',
    category: 'recording',
    description: 'High-fidelity audio recording with live waveform visualizer, pause/resume, trim editor, normalization & WAV/MP3 export.',
    iconName: 'Mic',
    featured: true,
    popular: true,
    tags: ['recorder', 'voice', 'audio', 'waveform', 'export', 'wav', 'mp3', 'normalize']
  },

  // Virtual Instruments
  {
    id: 'virtual-piano',
    name: 'Virtual Piano & Synthesizer',
    category: 'instruments',
    description: 'Interactive 88-key piano with multi-octave support, acoustic & synth sounds, keyboard bindings, and chord highlighting.',
    iconName: 'Music',
    featured: true,
    popular: true,
    tags: ['piano', 'keyboard', 'synth', 'chord player', 'midi', 'notes']
  },
  {
    id: 'drum-machine',
    name: '16-Step Pattern Drum Machine',
    category: 'instruments',
    description: 'Interactive drum machine with Kick, Snare, Hi-Hat, Clap, Tom samples, pattern sequencer, and swing controls.',
    iconName: 'Grid',
    featured: true,
    popular: true,
    tags: ['drum', 'beats', 'sequencer', 'groove', 'rhythm', 'pattern', 'samples']
  },
  {
    id: 'multi-track-looper',
    name: 'Multi-Track Instrument Beat Looper',
    category: 'instruments',
    description: 'Compose, loop, and mix multi-instrument beat patterns with Kick, Snare, Hi-Hat, Piano, Synth, Organ, Marimba & Tanpura.',
    iconName: 'Repeat',
    featured: true,
    popular: true,
    tags: ['looper', 'beats', 'multi-track', 'instruments', 'sequencer', 'piano', 'synth', 'drums', 'groove']
  },

  // Studio Tools
  {
    id: 'gain-staging-calc',
    name: 'Gain Staging & Bit Depth Calculator',
    category: 'studio-tools',
    description: 'Calculate headroom, dynamic range, bit depth resolution (16/24/32-bit float), and sample rate storage sizes.',
    iconName: 'Sliders',
    tags: ['gain staging', 'headroom', 'bit depth', 'sample rate', 'mixing', 'mastering']
  },
  {
    id: 'audio-converters',
    name: 'Audio Format & Sample Rate Converter',
    category: 'converters',
    description: 'Convert between WAV, MP3, FLAC, AAC, OGG, M4A, calculate file bitrates, and pitch shift algorithms.',
    iconName: 'RefreshCw',
    tags: ['converter', 'wav', 'mp3', 'flac', 'sample rate', 'bitrate', 'audio format']
  },

  // Music Theory
  {
    id: 'circle-of-fifths',
    name: 'Interactive Circle of Fifths',
    category: 'theory',
    description: 'Explore key signatures, relative minors, dominant 7ths, chord progressions, and modal interchange seamlessly.',
    iconName: 'Disc',
    featured: true,
    popular: true,
    tags: ['circle of fifths', 'key signature', 'relative minor', 'harmonies', 'chords', 'theory']
  },
  {
    id: 'ear-training',
    name: 'Ear Training & Rhythm Trainer',
    category: 'theory',
    description: 'Interactive audio quizzes for pitch intervals, chord qualities, melodic dictation, and rhythm pattern recognition.',
    iconName: 'Headphones',
    popular: true,
    tags: ['ear training', 'intervals', 'rhythm', 'dictation', 'quiz', 'pitch recognition']
  },
  {
    id: 'music-dictionary',
    name: 'Comprehensive Music Dictionary',
    category: 'theory',
    description: 'Over 1,000 music terms explained—from classical Italian tempo markings to modern audio engineering jargon.',
    iconName: 'Book',
    tags: ['dictionary', 'terms', 'glossary', 'definitions', 'allegro', 'legato', 'lufs']
  },

  // Practice
  {
    id: 'practice-hub',
    name: 'Practice Routine & Goal Tracker',
    category: 'practice',
    description: 'Log daily practice sessions, track daily streaks, set goals, analyze time distribution, and earn skill achievements.',
    iconName: 'Award',
    featured: true,
    popular: true,
    tags: ['practice', 'timer', 'streak', 'goals', 'journal', 'analytics', 'exercises']
  }
];
