// Web Audio Engine for TuneIndiaGlobal

let audioCtx: AudioContext | null = null;

export function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
    audioCtx = new AudioCtxClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// Metronome Click Synthesis
export function playClickSound(type: 'woodblock' | 'digital' | 'rimshot' | 'cowbell' = 'woodblock', isAccent = false, volume = 0.8) {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    gain.gain.setValueAtTime(volume, now);

    if (type === 'woodblock') {
      const freq = isAccent ? 1200 : 800;
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + (isAccent ? 0.08 : 0.05));
      osc.start(now);
      osc.stop(now + 0.09);
    } else if (type === 'digital') {
      const freq = isAccent ? 1800 : 1000;
      osc.type = 'square';
      osc.frequency.setValueAtTime(freq, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
      osc.start(now);
      osc.stop(now + 0.05);
    } else if (type === 'rimshot') {
      const freq = isAccent ? 900 : 500;
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(100, now + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
      osc.start(now);
      osc.stop(now + 0.07);
    } else if (type === 'cowbell') {
      const freq = isAccent ? 800 : 560;
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      osc.start(now);
      osc.stop(now + 0.13);
    }
  } catch (e) {
    console.error('Audio click error:', e);
  }
}

// Note and Pitch Calculations
export const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

export function noteFromPitch(frequency: number) {
  const noteNum = 12 * (Math.log(frequency / 440) / Math.log(2));
  return Math.round(noteNum) + 69;
}

export function frequencyFromNoteNumber(note: number) {
  return 440 * Math.pow(2, (note - 69) / 12);
}

export function centsOffFromPitch(frequency: number, note: number) {
  return Math.floor((1200 * Math.log(frequency / frequencyFromNoteNumber(note))) / Math.log(2));
}

export function noteDetails(frequency: number) {
  const noteNum = noteFromPitch(frequency);
  const noteName = NOTE_NAMES[noteNum % 12];
  const octave = Math.floor(noteNum / 12) - 1;
  const targetFreq = frequencyFromNoteNumber(noteNum);
  const cents = centsOffFromPitch(frequency, noteNum);
  return { noteNum, noteName, octave, targetFreq, cents };
}

// Autocorrelation Pitch Detection Algorithm
export function autoCorrelate(buf: Float32Array, sampleRate: number): number {
  let SIZE = buf.length;
  let rms = 0;

  for (let i = 0; i < SIZE; i++) {
    const val = buf[i];
    rms += val * val;
  }
  rms = Math.sqrt(rms / SIZE);
  if (rms < 0.01) return -1; // Noise floor threshold

  let r1 = 0, r2 = SIZE - 1, thres = 0.2;
  for (let i = 0; i < SIZE / 2; i++) {
    if (Math.abs(buf[i]) < thres) {
      r1 = i;
      break;
    }
  }
  for (let i = 1; i < SIZE / 2; i++) {
    if (Math.abs(buf[SIZE - i]) < thres) {
      r2 = SIZE - i;
      break;
    }
  }

  buf = buf.slice(r1, r2);
  SIZE = buf.length;

  const c = new Float32Array(SIZE);
  for (let i = 0; i < SIZE; i++) {
    for (let j = 0; j < SIZE - i; j++) {
      c[i] = c[i] + buf[j] * buf[j + i];
    }
  }

  let d = 0;
  while (c[d] > c[d + 1]) d++;
  let maxval = -1, maxpos = -1;
  for (let i = d; i < SIZE; i++) {
    if (c[i] > maxval) {
      maxval = c[i];
      maxpos = i;
    }
  }
  let T0 = maxpos;

  const x1 = c[T0 - 1], x2 = c[T0], x3 = c[T0 + 1];
  const a = (x1 + x3 - 2 * x2) / 2;
  const b = (x3 - x1) / 2;
  if (a) T0 = T0 - b / (2 * a);

  return sampleRate / T0;
}

// Single Frequency Note Tone Playback for Tuning / Pitch Reference
let toneOsc: OscillatorNode | null = null;
let toneGain: GainNode | null = null;

export function startTone(frequency: number, type: OscillatorType = 'sine', volume = 0.5) {
  stopTone();
  try {
    const ctx = getAudioContext();
    toneOsc = ctx.createOscillator();
    toneGain = ctx.createGain();

    toneOsc.type = type;
    toneOsc.frequency.setValueAtTime(frequency, ctx.currentTime);

    toneGain.gain.setValueAtTime(volume, ctx.currentTime);

    toneOsc.connect(toneGain);
    toneGain.connect(ctx.destination);

    toneOsc.start();
  } catch (e) {
    console.error('Tone generation error:', e);
  }
}

export function stopTone() {
  if (toneOsc) {
    try {
      toneOsc.stop();
      toneOsc.disconnect();
    } catch (e) {}
    toneOsc = null;
  }
}

// Polyphonic Synth / Piano Playback
export function playPolyNote(freq: number, durationSec = 1.4, volume = 0.6, soundMode: 'piano' | 'organ' | 'synth' | 'marimba' = 'piano') {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    
    const masterGain = ctx.createGain();
    masterGain.connect(ctx.destination);

    if (soundMode === 'piano') {
      // Grand Piano acoustic approximation: fundamental + soft 2nd & 3rd harmonics
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      const gain2 = ctx.createGain();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(freq, now);

      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(freq * 2, now);

      gain1.gain.setValueAtTime(0, now);
      gain1.gain.linearRampToValueAtTime(volume, now + 0.015);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + durationSec);

      gain2.gain.setValueAtTime(0, now);
      gain2.gain.linearRampToValueAtTime(volume * 0.3, now + 0.015);
      gain2.gain.exponentialRampToValueAtTime(0.0005, now + durationSec * 0.6);

      osc1.connect(gain1);
      osc2.connect(gain2);
      gain1.connect(masterGain);
      gain2.connect(masterGain);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + durationSec + 0.1);
      osc2.stop(now + durationSec + 0.1);
    } else if (soundMode === 'organ') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(volume * 0.4, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + durationSec * 0.8);

      osc.connect(gain);
      gain.connect(masterGain);
      osc.start(now);
      osc.stop(now + durationSec + 0.1);
    } else if (soundMode === 'synth') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(volume * 0.35, now + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, now + durationSec * 1.2);

      osc.connect(gain);
      gain.connect(masterGain);
      osc.start(now);
      osc.stop(now + durationSec + 0.1);
    } else {
      // Marimba / Bell
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(volume * 0.8, now + 0.005);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);

      osc.connect(gain);
      gain.connect(masterGain);
      osc.start(now);
      osc.stop(now + 0.7);
    }
  } catch (e) {
    console.error('Polyphonic note error:', e);
  }
}
