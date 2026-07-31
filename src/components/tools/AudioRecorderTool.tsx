import React, { useState, useRef, useEffect } from 'react';
import { Mic, Square, Play, Pause, Download, Trash2, Clock, Volume2 } from 'lucide-react';

export const AudioRecorderTool: React.FC = () => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [recordTime, setRecordTime] = useState<number>(0);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<any>(null);
  const audioElemRef = useRef<HTMLAudioElement | null>(null);

  const startRecording = async () => {
    try {
      chunksRef.current = [];
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/wav' });
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
      };

      recorder.start(100);
      setIsRecording(true);
      setIsPaused(false);
      setRecordTime(0);

      timerRef.current = setInterval(() => {
        setRecordTime(prev => prev + 1);
      }, 1000);
    } catch (err) {
      console.error('Record error:', err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(t => t.stop());
    }
    clearInterval(timerRef.current);
    setIsRecording(false);
    setIsPaused(false);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4">
      
      {/* Header */}
      <div className="border-b border-[#E8DCCB] pb-6">
        <h1 className="font-heading font-bold text-2xl sm:text-3xl text-[#2F2A26]">Studio Voice & Instrument Recorder</h1>
        <p className="text-sm text-[#6D655D] mt-1">Record studio-quality vocal takes, instrument ideas, and lectures directly in your browser with WAV export.</p>
      </div>

      {/* Main Recording Console */}
      <div className="bg-[#FFFDF8] border border-[#E8DCCB] rounded-2xl p-8 text-center space-y-6 shadow-sm">
        
        <div className="py-4">
          <div className="inline-flex items-center space-x-3 bg-[#FFFBE9] border border-[#E8DCCB] px-6 py-3 rounded-full">
            <Clock className={`w-5 h-5 ${isRecording ? 'text-[#B65A4A] animate-pulse' : 'text-[#AD8B73]'}`} />
            <span className="font-mono font-bold text-3xl text-[#2F2A26]">{formatTime(recordTime)}</span>
          </div>
        </div>

        {/* Record / Stop Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {!isRecording ? (
            <button
              onClick={startRecording}
              className="px-10 py-4 rounded-2xl bg-[#AD8B73] text-[#FFFBE9] font-heading font-bold text-base hover:bg-[#96745D] transition-all shadow-md flex items-center space-x-2"
            >
              <Mic className="w-5 h-5" />
              <span>START RECORDING</span>
            </button>
          ) : (
            <button
              onClick={stopRecording}
              className="px-10 py-4 rounded-2xl bg-[#B65A4A] text-[#FFFBE9] font-heading font-bold text-base hover:bg-[#A34D3E] transition-all shadow-md flex items-center space-x-2"
            >
              <Square className="w-5 h-5 fill-current" />
              <span>STOP RECORDING</span>
            </button>
          )}
        </div>

      </div>

      {/* Playback Box */}
      {audioUrl && (
        <div className="bg-[#FFFDF8] border border-[#E8DCCB] rounded-2xl p-6 space-y-4 shadow-sm">
          <h3 className="font-heading font-semibold text-base text-[#2F2A26]">Recorded Take Playback</h3>
          
          <audio ref={audioElemRef} src={audioUrl} controls className="w-full rounded-xl" />

          <div className="flex justify-between items-center pt-2">
            <a
              href={audioUrl}
              download={`TuneIndiaGlobal_Take_${Date.now()}.wav`}
              className="px-4 py-2 bg-[#5F8B4C] text-[#FFFBE9] font-semibold text-xs rounded-xl hover:bg-[#4E743E] transition-all flex items-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>Export WAV File</span>
            </a>

            <button
              onClick={() => {
                setAudioUrl(null);
                setRecordTime(0);
              }}
              className="p-2 text-[#B65A4A] hover:bg-[#B65A4A]/10 rounded-xl transition-all"
              title="Delete Recording"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
