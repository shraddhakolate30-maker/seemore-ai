import React, { useState, useEffect } from 'react';
import {
  Trophy,
  Target,
  Award,
  Zap,
  Clock,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Eye,
  BarChart3,
  Calendar,
} from 'lucide-react';
import { ObservationProgress, ChallengeHistoryEntry } from '../types.js';

interface ProgressDashboardProps {
  onStartObserving: () => void;
}

export const ProgressDashboard: React.FC<ProgressDashboardProps> = ({ onStartObserving }) => {
  const [timeframe, setTimeframe] = useState<'today' | '7days' | '30days' | 'all'>('all');
  const [progress, setProgress] = useState<ObservationProgress | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProgress = async (selectedTimeframe: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/progress?timeframe=${selectedTimeframe}`);
      if (!res.ok) throw new Error('Failed to fetch progress');
      const data = await res.json();
      setProgress(data);
    } catch (err: any) {
      setError(err.message || 'Could not load observation history');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProgress(timeframe);
  }, [timeframe]);

  const handleReset = async () => {
    if (!window.confirm('Are you sure you want to reset your observation session history?')) {
      return;
    }
    try {
      await fetch('/api/progress/reset', { method: 'POST' });
      fetchProgress(timeframe);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/5 pb-6 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#5EE7F2]">
            <BarChart3 className="h-4 w-4" />
            Performance & Insights
          </div>
          <h1 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-[#F5F7FA]">
            Your Observation Progress
          </h1>
          <p className="mt-1 text-sm text-[#A8B0C0]">
            Review your accuracy, detail detection ratings, and historical challenge solutions.
          </p>
        </div>

        {/* Timeframe Filter Buttons */}
        <div className="flex items-center gap-1 p-1 bg-white/[0.04] rounded-xl border border-white/10 self-start sm:self-auto">
          {[
            { id: 'today', label: 'Today' },
            { id: '7days', label: '7 Days' },
            { id: '30days', label: '30 Days' },
            { id: 'all', label: 'All Time' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setTimeframe(tab.id as any)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition ${
                timeframe === tab.id
                  ? 'bg-[#5EE7F2] text-[#080B12] font-semibold shadow-sm'
                  : 'text-[#A8B0C0] hover:text-[#F5F7FA]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {loading && (
        <div className="py-20 text-center text-sm text-[#A8B0C0]">
          Loading observation progress...
        </div>
      )}

      {error && (
        <div className="rounded-xl border border-red-500/30 bg-red-950/20 p-4 text-xs text-red-300 mb-8">
          {error}
        </div>
      )}

      {!loading && progress && (
        <div className="space-y-10">
          {/* Top 4 Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card 1: Challenges Completed */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <div className="flex items-center justify-between text-[#A8B0C0] mb-3">
                <span className="text-xs uppercase tracking-wider font-semibold">Completed</span>
                <Target className="h-4 w-4 text-[#5EE7F2]" />
              </div>
              <div className="text-3xl font-bold font-mono text-[#F5F7FA]">
                {progress.challengesCompleted}
              </div>
              <span className="text-xs text-[#A8B0C0] mt-1 block">
                Total observed scenes
              </span>
            </div>

            {/* Card 2: Average Score */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <div className="flex items-center justify-between text-[#A8B0C0] mb-3">
                <span className="text-xs uppercase tracking-wider font-semibold">Average Score</span>
                <Zap className="h-4 w-4 text-[#5EE7F2]" />
              </div>
              <div className="text-3xl font-bold font-mono text-[#F5F7FA]">
                {progress.averageScore}
                <span className="text-sm font-normal text-[#A8B0C0]">/100</span>
              </div>
              <span className="text-xs text-[#A8B0C0] mt-1 block">
                Mean accuracy rating
              </span>
            </div>

            {/* Card 3: Best Score */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <div className="flex items-center justify-between text-[#A8B0C0] mb-3">
                <span className="text-xs uppercase tracking-wider font-semibold">Best Score</span>
                <Trophy className="h-4 w-4 text-[#8B7CFF]" />
              </div>
              <div className="text-3xl font-bold font-mono text-[#F5F7FA]">
                {progress.bestScore}
                <span className="text-sm font-normal text-[#A8B0C0]">/100</span>
              </div>
              <span className="text-xs text-[#A8B0C0] mt-1 block">
                Peak observation test
              </span>
            </div>

            {/* Card 4: Current Level */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <div className="flex items-center justify-between text-[#A8B0C0] mb-3">
                <span className="text-xs uppercase tracking-wider font-semibold">Observation Level</span>
                <Award className="h-4 w-4 text-[#8B7CFF]" />
              </div>
              <div className="text-xl font-bold text-[#5EE7F2] truncate">
                {progress.currentLevel}
              </div>
              <span className="text-xs text-[#A8B0C0] mt-1 block">
                Tier rank (0 - 100)
              </span>
            </div>
          </div>

          {/* Skill Areas Section */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6 border-b border-white/10 pb-4">
              <div>
                <h2 className="text-lg font-bold text-[#F5F7FA]">
                  Observation Skill Areas
                </h2>
                <p className="text-xs text-[#A8B0C0]">
                  Relative performance across visual analysis categories. (In-app game indicators, not scientific measurements).
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Attention */}
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="font-medium text-[#F5F7FA]">Attention</span>
                  <span className="font-mono text-[#5EE7F2]">{progress.skillAreas.attention}%</span>
                </div>
                <div className="h-2 w-full bg-white/[0.08] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#5EE7F2] to-[#8B7CFF] rounded-full transition-all duration-500"
                    style={{ width: `${progress.skillAreas.attention}%` }}
                  />
                </div>
                <span className="text-[11px] text-[#A8B0C0] mt-1 block">
                  Capacity to sustain focus and avoid hasty guesses.
                </span>
              </div>

              {/* Detail Detection */}
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="font-medium text-[#F5F7FA]">Detail Detection</span>
                  <span className="font-mono text-[#5EE7F2]">{progress.skillAreas.detailDetection}%</span>
                </div>
                <div className="h-2 w-full bg-white/[0.08] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#5EE7F2] to-[#8B7CFF] rounded-full transition-all duration-500"
                    style={{ width: `${progress.skillAreas.detailDetection}%` }}
                  />
                </div>
                <span className="text-[11px] text-[#A8B0C0] mt-1 block">
                  Ability to notice small fixtures, textures, and subtle parts.
                </span>
              </div>

              {/* Pattern Recognition */}
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="font-medium text-[#F5F7FA]">Pattern Recognition</span>
                  <span className="font-mono text-[#8B7CFF]">{progress.skillAreas.patternRecognition}%</span>
                </div>
                <div className="h-2 w-full bg-white/[0.08] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#5EE7F2] to-[#8B7CFF] rounded-full transition-all duration-500"
                    style={{ width: `${progress.skillAreas.patternRecognition}%` }}
                  />
                </div>
                <span className="text-[11px] text-[#A8B0C0] mt-1 block">
                  Spotting repetitions, grids, geometry, and structural rhythms.
                </span>
              </div>

              {/* Visual Reasoning */}
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="font-medium text-[#F5F7FA]">Visual Reasoning</span>
                  <span className="font-mono text-[#8B7CFF]">{progress.skillAreas.visualReasoning}%</span>
                </div>
                <div className="h-2 w-full bg-white/[0.08] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#5EE7F2] to-[#8B7CFF] rounded-full transition-all duration-500"
                    style={{ width: `${progress.skillAreas.visualReasoning}%` }}
                  />
                </div>
                <span className="text-[11px] text-[#A8B0C0] mt-1 block">
                  Inferring functions, relationships, and context from physical clues.
                </span>
              </div>
            </div>
          </div>

          {/* Activity History */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-[#F5F7FA]">
                Recent Activity
              </h2>
              {progress.history.length > 0 && (
                <button
                  onClick={handleReset}
                  className="flex items-center gap-1.5 text-xs text-[#A8B0C0] hover:text-red-400 transition"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  Reset History
                </button>
              )}
            </div>

            {progress.history.length === 0 ? (
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-12 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-white/[0.04] text-[#A8B0C0] mb-4">
                  <Eye className="h-6 w-6" />
                </div>
                <h3 className="text-base font-semibold text-[#F5F7FA]">
                  No observation history yet.
                </h3>
                <p className="mt-1 text-xs text-[#A8B0C0] max-w-sm mx-auto">
                  Start your first observation session to train your visual eye and build your score.
                </p>
                <div className="mt-5">
                  <button
                    onClick={onStartObserving}
                    className="rounded-xl bg-gradient-to-r from-[#5EE7F2] to-[#8B7CFF] px-5 py-2.5 text-xs font-semibold text-[#080B12] transition hover:opacity-95"
                  >
                    Start First Challenge
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {progress.history.map((entry) => (
                  <div
                    key={entry.id + entry.timestamp}
                    className="rounded-xl border border-white/10 bg-white/[0.02] p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition hover:bg-white/[0.04]"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 text-xs text-[#A8B0C0] mb-1">
                        <span className="font-mono">{entry.date}</span>
                        <span aria-hidden="true">·</span>
                        <span className="capitalize">{entry.difficulty}</span>
                        <span aria-hidden="true">·</span>
                        <span className="capitalize">{entry.reasoningCategory}</span>
                      </div>
                      <p className="text-sm font-medium text-[#F5F7FA]">
                        "{entry.clue}"
                      </p>
                      <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#A8B0C0]">
                        <span>Your answer: <strong className="text-[#F5F7FA] font-medium">"{entry.userAnswer}"</strong></span>
                        <span>Target: <strong className="text-[#5EE7F2] font-medium">{entry.target}</strong></span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 self-end sm:self-center shrink-0">
                      <div className="text-right">
                        <div className="text-lg font-bold font-mono text-[#F5F7FA]">
                          {entry.score}
                          <span className="text-xs font-normal text-[#A8B0C0]">/100</span>
                        </div>
                        <div className="flex items-center justify-end gap-1 text-[11px]">
                          {entry.status === 'correct' && (
                            <span className="text-emerald-400">Correct</span>
                          )}
                          {entry.status === 'almost' && (
                            <span className="text-amber-400">Almost</span>
                          )}
                          {entry.status === 'needs_another_look' && (
                            <span className="text-indigo-400">Needs Look</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
