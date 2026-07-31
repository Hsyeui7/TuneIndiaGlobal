import React, { useState } from 'react';
import { CIRCLE_OF_FIFTHS_KEYS, SCALES_LIBRARY, MUSIC_DICTIONARY } from '../../data/theoryData';
import { playPolyNote } from '../../utils/audioEngine';
import { Disc, BookOpen, Headphones, Search, Volume2, CheckCircle2 } from 'lucide-react';

export const MusicTheoryHub: React.FC = () => {
  const [theorySubTab, setTheorySubTab] = useState<'circle' | 'scales' | 'ear' | 'dictionary'>('circle');
  const [selectedKey, setSelectedKey] = useState(CIRCLE_OF_FIFTHS_KEYS[0]);
  const [dictQuery, setDictQuery] = useState('');

  // Ear training state
  const [intervalQuestion, setIntervalQuestion] = useState<{ name: string; semitones: number } | null>(null);
  const [earScore, setEarScore] = useState(0);
  const [earFeedback, setEarFeedback] = useState<string | null>(null);

  const generateEarQuestion = () => {
    const intervals = [
      { name: 'Minor 3rd (Sad / Dark)', semitones: 3 },
      { name: 'Major 3rd (Happy / Bright)', semitones: 4 },
      { name: 'Perfect 5th (Power Chord)', semitones: 7 },
      { name: 'Octave (Same Note Higher)', semitones: 12 },
    ];
    const picked = intervals[Math.floor(Math.random() * intervals.length)];
    setIntervalQuestion(picked);
    setEarFeedback(null);

    // Play initial root note and interval note
    const baseFreq = 261.63; // C4
    playPolyNote(baseFreq, 1.0, 0.6);
    setTimeout(() => {
      playPolyNote(baseFreq * Math.pow(2, picked.semitones / 12), 1.0, 0.6);
    }, 600);
  };

  const handleEarGuess = (semitones: number) => {
    if (!intervalQuestion) return;
    if (semitones === intervalQuestion.semitones) {
      setEarScore(prev => prev + 1);
      setEarFeedback('✓ Correct! Outstanding ear!');
    } else {
      setEarFeedback(`✗ Not quite! It was ${intervalQuestion.name}`);
    }
  };

  const filteredDict = MUSIC_DICTIONARY.filter(d =>
    d.term.toLowerCase().includes(dictQuery.toLowerCase()) ||
    d.definition.toLowerCase().includes(dictQuery.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4">
      
      {/* Header */}
      <div className="border-b border-[#E8DCCB] pb-6">
        <h1 className="font-heading font-bold text-2xl sm:text-3xl text-[#2F2A26]">Music Theory & Ear Training Hub</h1>
        <p className="text-sm text-[#6D655D] mt-1">Interactive Circle of Fifths, Scale & Mode Library, Interval Ear Trainer, and Music Glossary.</p>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex flex-wrap justify-center gap-2">
        {[
          { id: 'circle', label: 'Circle of Fifths', icon: Disc },
          { id: 'scales', label: 'Scale & Mode Library', icon: BookOpen },
          { id: 'ear', label: 'Ear Training Quiz', icon: Headphones },
          { id: 'dictionary', label: 'Music Dictionary', icon: Search }
        ].map(t => {
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              onClick={() => setTheorySubTab(t.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center space-x-2 transition-all ${
                theorySubTab === t.id ? 'bg-[#AD8B73] text-[#FFFBE9]' : 'bg-[#FFFDF8] border border-[#E8DCCB] text-[#6D655D]'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* Circle of Fifths View */}
      {theorySubTab === 'circle' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1 bg-[#FFFDF8] border border-[#E8DCCB] rounded-2xl p-4 space-y-2">
            <h3 className="font-heading font-semibold text-xs text-[#6D655D] uppercase tracking-wider mb-2">Select Key Signature</h3>
            <div className="grid grid-cols-3 gap-1.5">
              {CIRCLE_OF_FIFTHS_KEYS.map(k => (
                <button
                  key={k.note}
                  onClick={() => setSelectedKey(k)}
                  className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                    selectedKey.note === k.note ? 'bg-[#AD8B73] text-[#FFFBE9] border-[#AD8B73]' : 'bg-[#FFFBE9] border-[#E8DCCB] text-[#2F2A26]'
                  }`}
                >
                  {k.note}
                </button>
              ))}
            </div>
          </div>

          <div className="md:col-span-2 bg-[#FFFDF8] border border-[#E8DCCB] rounded-2xl p-6 space-y-4">
            <h2 className="font-heading font-bold text-2xl text-[#2F2A26]">{selectedKey.majorKey}</h2>
            <div className="space-y-2 text-sm text-[#6D655D]">
              <p>• <strong>Relative Minor:</strong> <span className="text-[#AD8B73] font-bold">{selectedKey.minorKey}</span></p>
              <p>• <strong>Key Accidentals:</strong> {selectedKey.accidentals}</p>
              {selectedKey.sharpsFlats && <p>• <strong>Altered Notes:</strong> {selectedKey.sharpsFlats}</p>}
            </div>
          </div>
        </div>
      )}

      {/* Scales View */}
      {theorySubTab === 'scales' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {SCALES_LIBRARY.map(scale => (
              <div key={scale.name} className="bg-[#FFFDF8] border border-[#E8DCCB] rounded-2xl p-5 space-y-2">
                <h3 className="font-heading font-bold text-base text-[#2F2A26]">{scale.name}</h3>
                <p className="text-xs text-[#AD8B73] font-mono font-bold">Formula: {scale.formula}</p>
                <p className="text-xs text-[#6D655D]">Emotional Characteristic: {scale.mood}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Ear Training View */}
      {theorySubTab === 'ear' && (
        <div className="bg-[#FFFDF8] border border-[#E8DCCB] rounded-2xl p-8 text-center space-y-6 shadow-sm">
          <div className="flex justify-between items-center text-xs font-semibold text-[#6D655D]">
            <span>Ear Training Score: <strong className="text-[#5F8B4C]">{earScore} Points</strong></span>
          </div>

          {!intervalQuestion ? (
            <div className="py-6 space-y-4">
              <p className="text-sm text-[#6D655D]">Listen to two consecutive notes and identify the musical interval relationship.</p>
              <button
                onClick={generateEarQuestion}
                className="px-8 py-3 bg-[#AD8B73] text-[#FFFBE9] font-heading font-bold text-sm rounded-xl hover:bg-[#96745D] transition-all"
              >
                START EAR QUIZ
              </button>
            </div>
          ) : (
            <div className="space-y-6 py-4">
              <button
                onClick={generateEarQuestion}
                className="p-4 bg-[#FFFBE9] border border-[#E8DCCB] rounded-full text-[#AD8B73] hover:scale-110 transition-transform"
                title="Replay Audio Interval"
              >
                <Volume2 className="w-8 h-8" />
              </button>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-md mx-auto">
                {[
                  { name: 'Minor 3rd', semitones: 3 },
                  { name: 'Major 3rd', semitones: 4 },
                  { name: 'Perfect 5th', semitones: 7 },
                  { name: 'Octave', semitones: 12 },
                ].map(item => (
                  <button
                    key={item.name}
                    onClick={() => handleEarGuess(item.semitones)}
                    className="p-3 text-xs font-semibold rounded-xl bg-[#FFFBE9] border border-[#E8DCCB] hover:border-[#AD8B73]"
                  >
                    {item.name}
                  </button>
                ))}
              </div>

              {earFeedback && (
                <p className="text-sm font-bold text-[#AD8B73]">{earFeedback}</p>
              )}
            </div>
          )}
        </div>
      )}

      {/* Dictionary View */}
      {theorySubTab === 'dictionary' && (
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Filter dictionary terms (e.g. Allegro, Gain Staging, LUFS, Raga)..."
            value={dictQuery}
            onChange={(e) => setDictQuery(e.target.value)}
            className="w-full p-3 rounded-xl bg-[#FFFBE9] border border-[#E8DCCB] text-sm focus:outline-none"
          />

          <div className="space-y-3">
            {filteredDict.map(item => (
              <div key={item.term} className="bg-[#FFFDF8] border border-[#E8DCCB] rounded-2xl p-4 space-y-1">
                <div className="flex justify-between items-center">
                  <h4 className="font-heading font-bold text-base text-[#2F2A26]">{item.term}</h4>
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-[#E8DCCB]/50 rounded-full text-[#6D655D]">{item.category}</span>
                </div>
                <p className="text-xs text-[#6D655D]">{item.definition}</p>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
