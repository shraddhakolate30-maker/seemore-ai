import React from 'react';
import {
  Eye,
  ArrowRight,
  Sparkles,
  Focus,
  Search,
  BrainCircuit,
  Compass,
  CheckCircle2,
  Shield,
  Layers,
} from 'lucide-react';
import { SystemStatus } from '../types.js';

interface LandingPageProps {
  onStartObserving: () => void;
  onHowItWorks: () => void;
  systemStatus: SystemStatus | null;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStartObserving,
  onHowItWorks,
  systemStatus,
}) => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-28 border-b border-white/5">
        {/* Subtle radial ambient background glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-[#5EE7F2]/10 via-[#8B7CFF]/10 to-transparent blur-3xl opacity-60"
        />

        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Subtle model indicator without pill slop */}
          <div className="inline-flex items-center gap-2 text-xs text-[#A8B0C0] mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-[#5EE7F2]" />
            <span className="font-mono text-xs uppercase tracking-widest text-[#5EE7F2]">
              Observation Training Engine
            </span>
            <span aria-hidden="true">·</span>
            <span>Powered by Gemma Open Models</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#F5F7FA] leading-[1.05]">
            Look closer. <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-[#5EE7F2] via-[#8B7CFF] to-[#F5F7FA] bg-clip-text text-transparent">
              See more.
            </span>
          </h1>

          <p className="mt-6 mx-auto max-w-2xl text-lg sm:text-xl text-[#A8B0C0] leading-relaxed">
            SeeMore AI turns everyday photos into observation challenges that train attention, detail detection, pattern recognition, and visual reasoning.
          </p>

          {/* Action Buttons */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onStartObserving}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#5EE7F2] to-[#8B7CFF] px-7 py-3.5 text-base font-semibold text-[#080B12] shadow-lg shadow-[#5EE7F2]/10 transition-all hover:scale-[1.02] hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-[#5EE7F2]"
            >
              <Focus className="h-5 w-5" />
              Start Observing
            </button>

            <button
              onClick={onHowItWorks}
              className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-6 py-3.5 text-base font-medium text-[#F5F7FA] transition hover:bg-white/[0.08] focus:outline-none focus:ring-2 focus:ring-white/20"
            >
              How It Works
              <ArrowRight className="h-4 w-4 text-[#A8B0C0]" />
            </button>
          </div>

          {/* Live comparison rule banner: The central learning principle */}
          <div className="mt-14 mx-auto max-w-3xl rounded-xl border border-white/10 bg-white/[0.02] p-6 text-left">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#5EE7F2]">
              <Sparkles className="h-4 w-4" />
              Core Learning Principle
            </div>
            <p className="mt-2 text-xl font-bold text-[#F5F7FA]">
              AI gives the clue. Human does the observing.
            </p>
            <p className="mt-2 text-sm text-[#A8B0C0] leading-relaxed">
              Unlike generic labeling apps that tell you what to see, SeeMore AI generates indirect functional and contextual clues. You inspect the photo yourself, uncover the detail, and submit your observation.
            </p>

            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-3 pt-4 border-t border-white/5 text-xs">
              <div className="rounded-lg bg-red-950/20 border border-red-500/20 p-3">
                <span className="font-semibold text-red-400 block mb-1">Direct labeling (Passive):</span>
                <span className="text-[#A8B0C0]">"Find the electric pole." (Trivial object spotting)</span>
              </div>
              <div className="rounded-lg bg-cyan-950/20 border border-[#5EE7F2]/20 p-3">
                <span className="font-semibold text-[#5EE7F2] block mb-1">Indirect clue (Active observation):</span>
                <span className="text-[#A8B0C0]">"Find something in this scene that helps provide electricity to the surroundings."</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4-Step Simple Explanation */}
      <section className="py-16 border-b border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-widest text-[#5EE7F2] font-semibold">
              The Observation Flow
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-[#F5F7FA]">
              Upload → Observe → Answer → Learn
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6 relative">
              <span className="text-3xl font-mono font-bold text-[#5EE7F2]/40 block mb-3">01</span>
              <h3 className="text-lg font-semibold text-[#F5F7FA]">Upload Photo</h3>
              <p className="mt-2 text-sm text-[#A8B0C0] leading-relaxed">
                Provide a photo of your everyday surroundings — street scenes, home desks, gardens, or architecture.
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6 relative">
              <span className="text-3xl font-mono font-bold text-[#5EE7F2]/40 block mb-3">02</span>
              <h3 className="text-lg font-semibold text-[#F5F7FA]">Read the Clue</h3>
              <p className="mt-2 text-sm text-[#A8B0C0] leading-relaxed">
                Gemma analyzes the scene and crafts an indirect clue pointing to an actual visible feature without naming it.
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6 relative">
              <span className="text-3xl font-mono font-bold text-[#5EE7F2]/40 block mb-3">03</span>
              <h3 className="text-lg font-semibold text-[#F5F7FA]">Observe & Answer</h3>
              <p className="mt-2 text-sm text-[#A8B0C0] leading-relaxed">
                Inspect details, inspect relationships, and enter what you noticed. The target remains hidden until you respond.
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6 relative">
              <span className="text-3xl font-mono font-bold text-[#5EE7F2]/40 block mb-3">04</span>
              <h3 className="text-lg font-semibold text-[#F5F7FA]">Evaluate & Score</h3>
              <p className="mt-2 text-sm text-[#A8B0C0] leading-relaxed">
                Receive semantic AI evaluation, your SeeMore Observation Score, and learn where the feature connects to the clue.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why SeeMore AI? Section */}
      <section className="py-20 border-b border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-widest text-[#8B7CFF] font-semibold">
              Cognitive Training
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-[#F5F7FA]">
              Why SeeMore AI?
            </h2>
            <p className="mt-3 text-base text-[#A8B0C0]">
              In a world of rapid glances, deep visual observation is a deliberate discipline.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Card 1: Train Attention */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-8 transition hover:border-[#5EE7F2]/30">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#5EE7F2]/10 text-[#5EE7F2] mb-5">
                <Focus className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-[#F5F7FA]">Train Attention</h3>
              <p className="mt-3 text-sm text-[#A8B0C0] leading-relaxed">
                Build the habit of sustained visual focus. Instead of glancing over photos in a fraction of a second, train your mind to scan deliberately and isolate meaningful elements.
              </p>
            </div>

            {/* Card 2: Notice Small Details */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-8 transition hover:border-[#5EE7F2]/30">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#8B7CFF]/10 text-[#8B7CFF] mb-5">
                <Search className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-[#F5F7FA]">Notice Small Details</h3>
              <p className="mt-3 text-sm text-[#A8B0C0] leading-relaxed">
                Spot subtle geometric lines, repeated textures, shadows, and architectural elements that usually escape notice in familiar environments.
              </p>
            </div>

            {/* Card 3: Improve Visual Reasoning */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-8 transition hover:border-[#5EE7F2]/30">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#5EE7F2]/10 text-[#5EE7F2] mb-5">
                <BrainCircuit className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-[#F5F7FA]">Improve Visual Reasoning</h3>
              <p className="mt-3 text-sm text-[#A8B0C0] leading-relaxed">
                Connect functional clues to spatial physical realities. Learn to infer purpose, construction methods, and systemic relationships across an entire scene.
              </p>
            </div>

            {/* Card 4: Build Observation Habits */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-8 transition hover:border-[#5EE7F2]/30">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#8B7CFF]/10 text-[#8B7CFF] mb-5">
                <Compass className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-[#F5F7FA]">Build Observation Habits</h3>
              <p className="mt-3 text-sm text-[#A8B0C0] leading-relaxed">
                Translate in-app visual training into the real world. You will start noticing overlooked details in your daily commute, workspace, and nature.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Open AI & Gemma Foundation Section */}
      <section className="py-16 border-b border-white/5 bg-white/[0.01]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.03] to-white/[0.01] p-8 sm:p-10">
            <div className="flex items-center gap-3 mb-4">
              <Layers className="h-5 w-5 text-[#5EE7F2]" />
              <span className="text-xs font-semibold uppercase tracking-widest text-[#5EE7F2]">
                Architectural Integrity
              </span>
            </div>
            <h3 className="text-2xl font-bold text-[#F5F7FA]">
              Gemma Open Model Engine
            </h3>
            <p className="mt-3 text-sm text-[#A8B0C0] leading-relaxed">
              SeeMore AI uses Google's open Gemma models (<span className="font-mono text-white/90">gemma-4-26b-a4b-it</span>) to understand visual hierarchy and produce contextual observation puzzles. We never use hardcoded mock strings, placeholder evaluations, or synthetic shortcuts.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-6 pt-6 border-t border-white/10 text-xs text-[#A8B0C0]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>Genuine Multimodal Pipeline</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>Zero Target Disclosure Before Answer</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>Authoritative Server-Side Scoring</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy Guarantee Statement */}
      <section className="py-12 bg-[#080B12]">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <div className="inline-flex items-center justify-center p-2 rounded-full bg-white/[0.04] text-[#A8B0C0] mb-3">
            <Shield className="h-4 w-4 text-[#5EE7F2]" />
          </div>
          <p className="text-xs sm:text-sm text-[#A8B0C0]">
            <strong className="text-[#F5F7FA]">Privacy Statement:</strong> Your photos are used only for the current observation experience unless you explicitly choose otherwise. Photos are processed ephemerally in server memory and are never exposed publicly.
          </p>
        </div>
      </section>
    </div>
  );
};
