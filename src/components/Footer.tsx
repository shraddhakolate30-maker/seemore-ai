import React from 'react';
import { Eye } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: 'home' | 'observe' | 'progress' | 'how-it-works') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="border-t border-white/5 bg-[#080B12] py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#5EE7F2]/10 text-[#5EE7F2] border border-[#5EE7F2]/20">
              <Eye className="h-4 w-4" />
            </div>
            <div>
              <span className="text-sm font-bold tracking-tight text-[#F5F7FA]">
                SeeMore AI
              </span>
              <span className="text-xs text-[#A8B0C0] ml-2">
                Look closer. See more.
              </span>
            </div>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-xs text-[#A8B0C0]">
            <button
              onClick={() => onNavigate('home')}
              className="hover:text-[#5EE7F2] transition"
            >
              Home
            </button>
            <button
              onClick={() => onNavigate('observe')}
              className="hover:text-[#5EE7F2] transition"
            >
              Observe
            </button>
            <button
              onClick={() => onNavigate('progress')}
              className="hover:text-[#5EE7F2] transition"
            >
              Progress
            </button>
            <button
              onClick={() => onNavigate('how-it-works')}
              className="hover:text-[#5EE7F2] transition"
            >
              How It Works
            </button>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#A8B0C0]/80">
          <p>
            Observation engine powered by Gemma open weights models. Built for open innovation.
          </p>
          <p>
            Your photos are processed ephemerally and never shared publicly.
          </p>
        </div>
      </div>
    </footer>
  );
};
