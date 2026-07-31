import { Article } from '../types';

export const ARTICLES_DATA: Article[] = [
  {
    id: 'art-01',
    slug: 'mastering-gain-staging-for-pristine-mixes',
    title: 'The Ultimate Guide to Gain Staging in Modern Digital Audio Workstations',
    category: 'Music Production',
    summary: 'Learn why digital headroom matters, how to calibrate your plugin inputs to -18 dBFS RMS, and eliminate harsh clipping before mastering.',
    author: 'Aarav Sharma (Principal Audio Engineer)',
    readTime: '6 min read',
    date: 'July 24, 2026',
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=800',
    tags: ['gain staging', 'mixing', 'audio engineering', 'headroom', 'daw'],
    content: `
Gain staging is one of the most misunderstood aspects of modern digital music production. In the analog era, pushing signals hot against magnetic tape created desirable saturation. However, in modern 24-bit floating point DAWs, clipping digital converters leads to harsh odd-order harmonic distortion.

### Why -18 dBFS is the Sweet Spot
Most analog-modeled audio plugins (compressors, tape emulations, tube preamps) are calibrated to perform at nominal levels of **-18 dBFS RMS** (which equals 0 VU). Pushing audio into these plugins at -2 dBFS causes unwanted mud and intermodulation distortion.

### 3 Steps to Perfect Gain Staging
1. **Calibrate Raw Clips**: Lower clip gains before feeding channel strips so peaks rest between -12 dBFS and -18 dBFS.
2. **Monitor Insert Gain**: Ensure every plugin output matches its input level using the output trim control.
3. **Protect Master Bus**: Leave at least 3dB to 6dB of peak headroom on your master bus prior to final mastering.
    `
  },
  {
    id: 'art-02',
    slug: 'understanding-modes-in-indian-western-fusion',
    title: 'Demystifying Modes: Bridging Western Modes and Indian Classical Ragas',
    category: 'Music Theory',
    summary: 'Discover the profound structural parallels between Dorian, Mixolydian, and Lydian modes with ancient Indian Ragas like Kafi, Khamaj, and Kalyan.',
    author: 'Priya Mukherjee (Musicologist & Composer)',
    readTime: '8 min read',
    date: 'July 18, 2026',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=800',
    tags: ['music theory', 'modes', 'ragas', 'dorian', 'fusion', 'composition'],
    content: `
Music theory across the globe shares deep mathematical foundations. While Western modal theory organizes 7 scale steps relative to a tonic, Indian Classical music organizes scale intervals into Thats and Ragas.

### Structural Equivalent Parallels
- **Major (Ionian)** = *That Bilaval* (1 - 2 - 3 - 4 - 5 - 6 - 7)
- **Dorian Mode** = *That Kafi* (1 - 2 - b3 - 4 - 5 - 6 - b7)
- **Mixolydian Mode** = *That Khamaj* (1 - 2 - 3 - 4 - 5 - 6 - b7)
- **Lydian Mode** = *That Kalyan / Raga Yaman* (1 - 2 - 3 - #4 - 5 - 6 - 7)

By viewing modal improvisation through the lens of Raga ornamentation (Gamaka, Meend), Western instrumentalists can unlock expressive micro-tonal bends and soul-stirring phrasing.
    `
  },
  {
    id: 'art-03',
    slug: 'acoustic-guitar-setup-and-maintenance',
    title: 'How to Calibrate Acoustic Guitar Action, Relief, and Intonation',
    category: 'Instrument Guides',
    summary: 'Step-by-step instructions on adjusting truss rods, nut height, and saddle radius for smooth playability without fret buzz.',
    author: 'Vikram Sethi (Master Luthier)',
    readTime: '7 min read',
    date: 'July 10, 2026',
    image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&q=80&w=800',
    tags: ['guitar setup', 'lutherie', 'truss rod', 'intonation', 'guitar care'],
    content: `
A poorly set up guitar makes learning twice as difficult. Action that is too high causes finger fatigue, while action that is too low leads to severe fret buzz.

### Key Metrics for a Great Setup
- **Neck Relief**: Measure at the 7th fret while holding down 1st and 14th frets. Ideal gap: **0.008 to 0.010 inches**.
- **12th Fret Action**: Low E should sit around **2.0mm**, High E around **1.5mm**.
- **Nut Slot Depth**: Press down at the 3rd fret; there should be a paper-thin hair gap above the 1st fret.
    `
  }
];
