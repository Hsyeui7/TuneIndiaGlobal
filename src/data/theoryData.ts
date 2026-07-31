import { DictionaryTerm } from '../types';

export const CIRCLE_OF_FIFTHS_KEYS = [
  { note: 'C', majorKey: 'C Major', minorKey: 'A Minor', accidentals: '0 (Natural)', sharpsFlats: '' },
  { note: 'G', majorKey: 'G Major', minorKey: 'E Minor', accidentals: '1 Sharp', sharpsFlats: 'F#' },
  { note: 'D', majorKey: 'D Major', minorKey: 'B Minor', accidentals: '2 Sharps', sharpsFlats: 'F#, C#' },
  { note: 'A', majorKey: 'A Major', minorKey: 'F# Minor', accidentals: '3 Sharps', sharpsFlats: 'F#, C#, G#' },
  { note: 'E', majorKey: 'E Major', minorKey: 'C# Minor', accidentals: '4 Sharps', sharpsFlats: 'F#, C#, G#, D#' },
  { note: 'B', majorKey: 'B Major', minorKey: 'G# Minor', accidentals: '5 Sharps', sharpsFlats: 'F#, C#, G#, D#, A#' },
  { note: 'F#', majorKey: 'F# Major / Gb Major', minorKey: 'D# Minor', accidentals: '6 Sharps / 6 Flats', sharpsFlats: 'F#, C#, G#, D#, A#, E#' },
  { note: 'Db', majorKey: 'Db Major', minorKey: 'Bb Minor', accidentals: '5 Flats', sharpsFlats: 'Bb, Eb, Ab, Db, Gb' },
  { note: 'Ab', majorKey: 'Ab Major', minorKey: 'F Minor', accidentals: '4 Flats', sharpsFlats: 'Bb, Eb, Ab, Db' },
  { note: 'Eb', majorKey: 'Eb Major', minorKey: 'C Minor', accidentals: '3 Flats', sharpsFlats: 'Bb, Eb, Ab' },
  { note: 'Bb', majorKey: 'Bb Major', minorKey: 'G Minor', accidentals: '2 Flats', sharpsFlats: 'Bb, Eb' },
  { note: 'F', majorKey: 'F Major', minorKey: 'D Minor', accidentals: '1 Flat', sharpsFlats: 'Bb' },
];

export const SCALES_LIBRARY = [
  { name: 'Major (Ionian)', formula: '1 - 2 - 3 - 4 - 5 - 6 - 7', intervals: [0, 2, 4, 5, 7, 9, 11], mood: 'Bright, Uplifting, Triumphant' },
  { name: 'Natural Minor (Aeolian)', formula: '1 - 2 - b3 - 4 - 5 - b6 - b7', intervals: [0, 2, 3, 5, 7, 8, 10], mood: 'Melancholic, Somber, Reflective' },
  { name: 'Harmonic Minor', formula: '1 - 2 - b3 - 4 - 5 - b6 - 7', intervals: [0, 2, 3, 5, 7, 8, 11], mood: 'Exotic, Classical, Neoclassical' },
  { name: 'Melodic Minor', formula: '1 - 2 - b3 - 4 - 5 - 6 - 7', intervals: [0, 2, 3, 5, 7, 9, 11], mood: 'Jazz, Mysterious, Complex' },
  { name: 'Major Pentatonic', formula: '1 - 2 - 3 - 5 - 6', intervals: [0, 2, 4, 7, 9], mood: 'Folk, Country, Catchy Pop' },
  { name: 'Minor Pentatonic', formula: '1 - b3 - 4 - 5 - b7', intervals: [0, 3, 5, 7, 10], mood: 'Blues, Rock, Soulful' },
  { name: 'Blues Scale', formula: '1 - b3 - 4 - b5 - 5 - b7', intervals: [0, 3, 5, 6, 7, 10], mood: 'Gritty, Gritty Blues, Expressive' },
  { name: 'Dorian Mode', formula: '1 - 2 - b3 - 4 - 5 - 6 - b7', intervals: [0, 2, 3, 5, 7, 9, 10], mood: 'Groovy, Jazzy Minor, Sophisticated' },
  { name: 'Mixolydian Mode', formula: '1 - 2 - 3 - 4 - 5 - 6 - b7', intervals: [0, 2, 4, 5, 7, 9, 10], mood: 'Bluesy Major, Classic Rock, Festival' },
  { name: 'Lydian Mode', formula: '1 - 2 - 3 - #4 - 5 - 6 - 7', intervals: [0, 2, 4, 6, 7, 9, 11], mood: 'Dreamy, Ethereal, Cinematic' },
  { name: 'Phrygian Mode', formula: '1 - b2 - b3 - 4 - 5 - b6 - b7', intervals: [0, 1, 3, 5, 7, 8, 10], mood: 'Spanish, Dark, Intense' },
  { name: 'Raga Bhairav (Indian Classical)', formula: '1 - b2 - 3 - 4 - 5 - b6 - 7', intervals: [0, 1, 4, 5, 7, 8, 11], mood: 'Devotional, Majestic Dawn' },
  { name: 'Raga Yaman (Indian Classical)', formula: '1 - 2 - 3 - #4 - 5 - 6 - 7', intervals: [0, 2, 4, 6, 7, 9, 11], mood: 'Serene Evening, Pure Joy' },
];

export const MUSIC_DICTIONARY: DictionaryTerm[] = [
  { term: 'Adagio', category: 'Tempo', definition: 'Slow and stately tempo; literally "at ease" (typically 66–76 BPM).', origin: 'Italian' },
  { term: 'Allegro', category: 'Tempo', definition: 'Fast, lively and bright tempo (120–156 BPM).', origin: 'Italian' },
  { term: 'Atonality', category: 'Theory', definition: 'Music that lacks a tonal center or key signature.', origin: 'Modern Theory' },
  { term: 'BPM', category: 'Audio/Tech', definition: 'Beats Per Minute—the standard unit measuring musical tempo.', origin: 'Modern Standard' },
  { term: 'Crescendo', category: 'Dynamics', definition: 'Gradually increasing in loudness.', origin: 'Italian' },
  { term: 'Diatonic', category: 'Theory', definition: 'Notes or chords belonging naturally to a key without chromatic alteration.', origin: 'Greek/Theory' },
  { term: 'Gain Staging', category: 'Studio', definition: 'Managing signal levels at each stage of audio processing to maximize dynamic range and minimize noise/distortion.', origin: 'Audio Engineering' },
  { term: 'Interval', category: 'Theory', definition: 'The difference in pitch between two musical sounds.', origin: 'Classical Theory' },
  { term: 'LUFS', category: 'Studio', definition: 'Loudness Units relative to Full Scale—the international standard measurement for perceived audio loudness.', origin: 'EBU/AES' },
  { term: 'Overtone', category: 'Acoustics', definition: 'A resonant frequency produced above the fundamental note in an acoustic sound source.', origin: 'Physics' },
  { term: 'Phase Inversion', category: 'Studio', definition: 'Flipping the polarity of an audio waveform by 180 degrees to detect or resolve acoustic cancellation.', origin: 'Audio Engineering' },
  { term: 'Raga', category: 'Indian Music', definition: 'A melodic framework in Indian classical music characterized by specific note sequences, ornaments, and emotional mood.', origin: 'Sanskrit' },
  { term: 'Tala', category: 'Indian Music', definition: 'The rhythmic cycle and meter in Indian classical music composed of structured beats (matras).', origin: 'Sanskrit' },
  { term: 'Tanpura', category: 'Instruments', definition: 'A long-necked plucked string instrument that creates a continuous harmonic drone underpinning Indian classical performances.', origin: 'India' },
];
