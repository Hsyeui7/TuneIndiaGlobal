import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PRACTICE_EXERCISES } from '../../data/exerciseData';
import { Award, Flame, Calendar, Clock, Plus, CheckCircle2, Play } from 'lucide-react';

export const PracticeHub: React.FC = () => {
  const { practiceSessions, addPracticeSession, dailyStreak } = useApp();
  const [topic, setTopic] = useState('');
  const [duration, setDuration] = useState(30);
  const [notes, setNotes] = useState('');
  const [rating, setRating] = useState(5);
  const [loggedSuccess, setLoggedSuccess] = useState(false);

  const handleLogSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic) return;
    addPracticeSession({
      date: new Date().toISOString().split('T')[0],
      durationMinutes: Number(duration),
      topic,
      notes,
      rating: Number(rating)
    });
    setTopic('');
    setNotes('');
    setLoggedSuccess(true);
    setTimeout(() => setLoggedSuccess(false), 2000);
  };

  const totalMinutes = practiceSessions.reduce((sum, s) => sum + s.durationMinutes, 0);

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4">
      
      {/* Header */}
      <div className="border-b border-[#E8DCCB] pb-6">
        <h1 className="font-heading font-bold text-2xl sm:text-3xl text-[#2F2A26]">Practice Routine & Goal Tracker</h1>
        <p className="text-sm text-[#6D655D] mt-1">Log daily session hours, build daily practice streaks, track mastery stats, and explore guided exercises.</p>
      </div>

      {/* Streak Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        <div className="bg-[#FFFDF8] border border-[#E8DCCB] rounded-2xl p-5 flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-[#AD8B73]/15 text-[#AD8B73] flex items-center justify-center">
            <Flame className="w-6 h-6 fill-current" />
          </div>
          <div>
            <span className="font-heading font-extrabold text-2xl text-[#2F2A26] block">{dailyStreak} Days</span>
            <span className="text-xs text-[#6D655D]">Current Practice Streak</span>
          </div>
        </div>

        <div className="bg-[#FFFDF8] border border-[#E8DCCB] rounded-2xl p-5 flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-[#5F8B4C]/15 text-[#5F8B4C] flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <span className="font-heading font-extrabold text-2xl text-[#2F2A26] block">{Math.round(totalMinutes / 60)} hrs</span>
            <span className="text-xs text-[#6D655D]">Total Hours Logged</span>
          </div>
        </div>

        <div className="bg-[#FFFDF8] border border-[#E8DCCB] rounded-2xl p-5 flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-[#C9A227]/15 text-[#C9A227] flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <span className="font-heading font-extrabold text-2xl text-[#2F2A26] block">{practiceSessions.length} Logs</span>
            <span className="text-xs text-[#6D655D]">Completed Sessions</span>
          </div>
        </div>

      </div>

      {/* Log Session Form */}
      <div className="bg-[#FFFDF8] border border-[#E8DCCB] rounded-2xl p-6 space-y-4 shadow-sm">
        <h3 className="font-heading font-semibold text-base text-[#2F2A26]">Log Practice Session</h3>
        <form onSubmit={handleLogSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-[#6D655D] block mb-1">Focus Topic / Exercise</label>
            <input
              type="text"
              required
              placeholder="e.g. Spider Chromatic Exercise & Metronome Accent"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-[#FFFBE9] border border-[#E8DCCB] text-xs focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs text-[#6D655D] block mb-1">Duration (Minutes)</label>
            <input
              type="number"
              min="5"
              max="300"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="w-full p-2.5 rounded-xl bg-[#FFFBE9] border border-[#E8DCCB] text-xs focus:outline-none"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="text-xs text-[#6D655D] block mb-1">Session Practice Notes</label>
            <textarea
              rows={2}
              placeholder="What went well? Any BPM milestones achieved?"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-[#FFFBE9] border border-[#E8DCCB] text-xs focus:outline-none"
            />
          </div>

          <div className="sm:col-span-2 flex items-center justify-between">
            {loggedSuccess ? (
              <span className="text-xs font-bold text-[#5F8B4C] flex items-center space-x-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>Session logged successfully!</span>
              </span>
            ) : <span />}

            <button
              type="submit"
              className="px-6 py-2.5 bg-[#AD8B73] text-[#FFFBE9] font-semibold text-xs rounded-xl hover:bg-[#96745D] transition-colors flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Log Session</span>
            </button>
          </div>
        </form>
      </div>

      {/* Guided Exercises Library */}
      <div className="bg-[#FFFDF8] border border-[#E8DCCB] rounded-2xl p-6 space-y-4">
        <h3 className="font-heading font-semibold text-base text-[#2F2A26]">Guided Technical Exercise Library</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {PRACTICE_EXERCISES.map(ex => (
            <div key={ex.id} className="p-4 rounded-xl bg-[#FFFBE9] border border-[#E8DCCB] space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-heading font-bold text-sm text-[#2F2A26]">{ex.title}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 bg-[#AD8B73]/15 text-[#AD8B73] rounded-full">{ex.difficulty}</span>
              </div>
              <p className="text-xs text-[#6D655D]">{ex.description}</p>
              <span className="text-[11px] font-mono text-[#5F8B4C] block">Target Tempo: {ex.targetBpm} BPM</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
