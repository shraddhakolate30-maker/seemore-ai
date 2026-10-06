import React from 'react';
import {
  Upload,
  Brain,
  Lightbulb,
  Search,
  CheckCircle2,
  Trophy,
  ShieldCheck,
  Eye,
  Layers,
  Sparkles,
} from 'lucide-react';

interface HowItWorksPageProps {
  onStartObserving: () => void;
}

export const HowItWorksPage: React.FC<HowItWorksPageProps> = ({ onStartObserving }) => {
  const steps = [
    {
      num: '01',
      title: 'Upload a real-world photo',
      desc: 'Select a photo of your everyday surroundings — architecture, home workspace, nature, or city streets. Real-world scenes have rich visual layers.',
      icon: Upload,
    },
    {
      num: '02',
      title: 'Gemma open model scene analysis',
      desc: 'The open weights Gemma model evaluates the scene structure, identifying distinct objects, textures, lighting, functional mechanisms, and geometric relationships.',
      icon: Brain,
    },
    {
      num: '03',
      title: 'Indirect clue generation',
      desc: 'Instead of revealing the target object directly, SeeMore formulates an indirect functional, relational, or pattern-based clue.',
      icon: Lightbulb,
    },
    {
      num: '04',
      title: 'You inspect the image',
      desc: 'You look closely. Zoom into fine details, scan the composition, and connect the indirect clue with what is physically visible.',
      icon: Search,
    },
    {
      num: '05',
      title: 'Submit your observation',
      desc: 'Enter what you identified. The target is never revealed or highlighted prior to your response to preserve the observation experience.',
      icon: Eye,
    },
    {
      num: '06',
      title: 'Semantic evaluation',
      desc: 'The AI evaluates whether your answer correctly identifies the intended target and understands the clue context, accepting synonyms and descriptive matches.',
      icon: CheckCircle2,
    },
    {
      num: '07',
      title: 'SeeMore score updated',
      desc: 'Your SeeMore Observation Score updates across attention, detail detection, and reasoning, giving you immediate feedback to sharpen your eye.',
      icon: Trophy,
    },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#5EE7F2] mb-3">
          <Sparkles className="h-4 w-4" />
          The Observation Philosophy
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#F5F7FA]">
          AI Detects. You Observe. You Decide.
        </h1>
        <p className="mt-4 text-base sm:text-lg text-[#A8B0C0] leading-relaxed">
          SeeMore AI transforms everyday photography into intentional observation challenges. Here is how the end-to-end learning cycle works.
        </p>
      </div>

      {/* Step by step list */}
      <div className="space-y-6">
        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <div
              key={step.num}
              className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-7 flex flex-col sm:flex-row sm:items-start gap-5 transition hover:bg-white/[0.04]"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#5EE7F2]/10 to-[#8B7CFF]/10 text-[#5EE7F2] border border-[#5EE7F2]/20">
                <Icon className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold text-[#5EE7F2]">
                    STEP {step.num}
                  </span>
                  <h3 className="text-lg font-bold text-[#F5F7FA]">
                    {step.title}
                  </h3>
                </div>
                <p className="mt-2 text-sm text-[#A8B0C0] leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Technology & Open Innovation Callout */}
      <div className="mt-16 rounded-2xl border border-white/10 bg-white/[0.03] p-8">
        <div className="flex items-center gap-3 mb-4">
          <Layers className="h-5 w-5 text-[#8B7CFF]" />
          <h2 className="text-xl font-bold text-[#F5F7FA]">
            Built with Gemma Open Models
          </h2>
        </div>
        <p className="text-sm text-[#A8B0C0] leading-relaxed">
          SeeMore AI uses the open weights <strong className="text-[#F5F7FA]">Gemma</strong> instruction model architecture (<code className="font-mono text-xs text-[#5EE7F2]">gemma-4-26b-a4b-it</code>). Gemma provides rich multimodal reasoning that allows the model to understand image composition, recognize physical causality, and generate nuanced linguistic clues without relying on closed proprietary black boxes.
        </p>
      </div>

      {/* Responsible Disclosure Statement */}
      <div className="mt-10 rounded-xl border border-white/5 bg-white/[0.01] p-6 text-xs text-[#A8B0C0] leading-relaxed">
        <strong className="text-[#F5F7FA] block mb-1">Educational Disclaimer:</strong>
        SeeMore AI is an educational technology and observational training game. The SeeMore Observation Score, skill areas, and observation levels are internal gamification indicators designed to motivate mindful attention; they do not constitute medical, psychological, neurological, or scientifically accredited cognitive diagnostic metrics.
      </div>

      {/* CTA */}
      <div className="mt-12 text-center">
        <button
          onClick={onStartObserving}
          className="rounded-xl bg-gradient-to-r from-[#5EE7F2] to-[#8B7CFF] px-8 py-3.5 text-base font-semibold text-[#080B12] shadow-lg shadow-[#5EE7F2]/10 transition hover:opacity-95"
        >
          Start Observing Now
        </button>
      </div>
    </div>
  );
};
