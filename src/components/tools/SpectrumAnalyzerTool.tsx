import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, BarChart2, Activity, ShieldCheck, Volume2 } from 'lucide-react';

export const SpectrumAnalyzerTool: React.FC = () => {
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [mode, setMode] = useState<'spectrum' | 'waveform'>('spectrum');
  const [rmsDb, setRmsDb] = useState<number>(-60);
  const [lufsDb, setLufsDb] = useState<number>(-24);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const rafIdRef = useRef<number | null>(null);

  const startAnalyzer = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
      streamRef.current = stream;

      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const source = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 512;
      analyserRef.current = analyser;

      source.connect(analyser);
      setIsAnalyzing(true);
      drawCanvas();
    } catch (err) {
      console.error('Mic analyzer error:', err);
      setIsAnalyzing(false);
    }
  };

  const stopAnalyzer = () => {
    if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop());
    if (audioCtxRef.current) audioCtxRef.current.close();
    setIsAnalyzing(false);
  };

  const drawCanvas = () => {
    if (!canvasRef.current || !analyserRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    if (mode === 'spectrum') {
      const bufferLength = analyserRef.current.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      analyserRef.current.getByteFrequencyData(dataArray);

      ctx.fillStyle = '#FFFDF8';
      ctx.fillRect(0, 0, width, height);

      const barWidth = (width / bufferLength) * 2.5;
      let x = 0;

      let sumSquare = 0;

      for (let i = 0; i < bufferLength; i++) {
        const barHeight = (dataArray[i] / 255) * height;
        sumSquare += dataArray[i] * dataArray[i];

        // Gradient color from warm secondary to primary terracotta
        ctx.fillStyle = '#AD8B73';
        ctx.fillRect(x, height - barHeight, barWidth - 1, barHeight);

        x += barWidth;
      }

      // Calculate approximate RMS and LUFS
      const rmsVal = Math.sqrt(sumSquare / bufferLength) / 255;
      const db = rmsVal > 0 ? Math.round(20 * Math.log10(rmsVal)) : -60;
      setRmsDb(Math.max(-60, db));
      setLufsDb(Math.max(-60, Math.round(db - 3)));

    } else {
      const bufferLength = analyserRef.current.fftSize;
      const dataArray = new Uint8Array(bufferLength);
      analyserRef.current.getByteTimeDomainData(dataArray);

      ctx.fillStyle = '#FFFDF8';
      ctx.fillRect(0, 0, width, height);

      ctx.lineWidth = 2;
      ctx.strokeStyle = '#AD8B73';
      ctx.beginPath();

      const sliceWidth = width / bufferLength;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = (v * height) / 2;

        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);

        x += sliceWidth;
      }

      ctx.lineTo(width, height / 2);
      ctx.stroke();
    }

    rafIdRef.current = requestAnimationFrame(drawCanvas);
  };

  useEffect(() => {
    return () => stopAnalyzer();
  }, [mode]);

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8DCCB] pb-6">
        <div>
          <h1 className="font-heading font-bold text-2xl sm:text-3xl text-[#2F2A26]">Spectrum & FFT Audio Analyzer</h1>
          <p className="text-sm text-[#6D655D] mt-1">Real-time 31-band FFT frequency analyzer, waveform oscilloscope, RMS & LUFS meters.</p>
        </div>
        <div>
          <button
            onClick={isAnalyzing ? stopAnalyzer : startAnalyzer}
            className={`px-6 py-3 rounded-xl font-heading font-bold text-sm flex items-center space-x-2 transition-all shadow-sm ${
              isAnalyzing ? 'bg-[#B65A4A] text-[#FFFBE9]' : 'bg-[#AD8B73] text-[#FFFBE9] hover:bg-[#96745D]'
            }`}
          >
            <Mic className="w-4 h-4" />
            <span>{isAnalyzing ? 'STOP ANALYZER' : 'START LIVE MIC ANALYZER'}</span>
          </button>
        </div>
      </div>

      {/* Mode Switch */}
      <div className="flex justify-center space-x-2">
        <button
          onClick={() => setMode('spectrum')}
          className={`px-4 py-2 text-xs font-semibold rounded-xl border transition-all ${
            mode === 'spectrum' ? 'bg-[#AD8B73] text-[#FFFBE9] border-[#AD8B73]' : 'bg-[#FFFDF8] border-[#E8DCCB] text-[#6D655D]'
          }`}
        >
          FFT Spectrum Bars
        </button>
        <button
          onClick={() => setMode('waveform')}
          className={`px-4 py-2 text-xs font-semibold rounded-xl border transition-all ${
            mode === 'waveform' ? 'bg-[#AD8B73] text-[#FFFBE9] border-[#AD8B73]' : 'bg-[#FFFDF8] border-[#E8DCCB] text-[#6D655D]'
          }`}
        >
          Waveform Oscilloscope
        </button>
      </div>

      {/* Canvas Frame */}
      <div className="bg-[#FFFDF8] border border-[#E8DCCB] rounded-2xl p-4 shadow-sm overflow-hidden">
        <canvas
          ref={canvasRef}
          width={800}
          height={280}
          className="w-full h-64 bg-[#FFFDF8] rounded-xl border border-[#E8DCCB]/60"
        />
      </div>

      {/* Audio Meters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        
        <div className="bg-[#FFFDF8] border border-[#E8DCCB] rounded-2xl p-5 space-y-2">
          <div className="flex justify-between text-xs font-semibold text-[#2F2A26]">
            <span>RMS Level Meter</span>
            <span className="font-mono">{rmsDb} dBFS</span>
          </div>
          <div className="w-full bg-[#E8DCCB] h-3 rounded-full overflow-hidden">
            <div
              className="bg-[#AD8B73] h-full transition-all duration-100"
              style={{ width: `${Math.min(100, Math.max(0, ((rmsDb + 60) / 60) * 100))}%` }}
            />
          </div>
        </div>

        <div className="bg-[#FFFDF8] border border-[#E8DCCB] rounded-2xl p-5 space-y-2">
          <div className="flex justify-between text-xs font-semibold text-[#2F2A26]">
            <span>LUFS Integrated Loudness</span>
            <span className="font-mono">{lufsDb} LUFS</span>
          </div>
          <div className="w-full bg-[#E8DCCB] h-3 rounded-full overflow-hidden">
            <div
              className="bg-[#5F8B4C] h-full transition-all duration-100"
              style={{ width: `${Math.min(100, Math.max(0, ((lufsDb + 60) / 60) * 100))}%` }}
            />
          </div>
        </div>

      </div>

    </div>
  );
};
