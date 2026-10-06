import React, { useState } from 'react';
import { Eye, Sparkles, Menu, X, ShieldCheck } from 'lucide-react';
import { SystemStatus } from '../types.js';

interface NavbarProps {
  currentTab: 'home' | 'observe' | 'progress' | 'how-it-works';
  onNavigate: (tab: 'home' | 'observe' | 'progress' | 'how-it-works') => void;
  systemStatus: SystemStatus | null;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, onNavigate, systemStatus }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'observe', label: 'Observe' },
    { id: 'progress', label: 'Progress' },
    { id: 'how-it-works', label: 'How It Works' },
  ] as const;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#080B12]/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand / Logo */}
        <button
          onClick={() => {
            onNavigate('home');
            setMobileMenuOpen(false);
          }}
          className="group flex items-center gap-3 text-left focus:outline-none"
        >
          <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-[#5EE7F2]/20 to-[#8B7CFF]/20 border border-[#5EE7F2]/30 transition-transform group-hover:scale-105">
            <Eye className="h-5 w-5 text-[#5EE7F2]" />
            <div className="absolute inset-0 rounded-lg ring-1 ring-inset ring-white/10" />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold tracking-tight text-[#F5F7FA]">
              SeeMore <span className="text-[#5EE7F2]">AI</span>
            </span>
            <span className="text-[10px] font-medium tracking-wider uppercase text-[#A8B0C0]">
              Look closer. See more.
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`text-sm font-medium transition-colors hover:text-[#5EE7F2] ${
                currentTab === item.id
                  ? 'text-[#5EE7F2] border-b-2 border-[#5EE7F2] pb-1'
                  : 'text-[#A8B0C0]'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right side: AI Model info & Primary CTA */}
        <div className="hidden sm:flex items-center gap-4">
          {/* Subtle model indicator without pill slop */}
          <div className="flex items-center gap-1.5 text-xs text-[#A8B0C0]">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-[11px] text-[#A8B0C0]">
              {systemStatus?.ai?.model || 'Gemma 4 (26B)'}
            </span>
          </div>

          <button
            onClick={() => onNavigate('observe')}
            className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#5EE7F2] to-[#8B7CFF] px-4 py-2 text-sm font-semibold text-[#080B12] shadow-sm transition hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-[#5EE7F2] focus:ring-offset-2 focus:ring-offset-[#080B12]"
          >
            <Sparkles className="h-4 w-4" />
            Start Observing
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex sm:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg p-2 text-[#A8B0C0] hover:text-[#F5F7FA] focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="border-b border-white/10 bg-[#080B12] px-4 pt-2 pb-6 sm:hidden">
          <nav className="flex flex-col gap-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`py-2 text-left text-base font-medium ${
                  currentTab === item.id ? 'text-[#5EE7F2]' : 'text-[#A8B0C0]'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="pt-3 border-t border-white/10 flex flex-col gap-3">
              <div className="flex items-center gap-2 text-xs text-[#A8B0C0]">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                <span>Engine: {systemStatus?.ai?.model || 'Gemma 4 (26B)'}</span>
              </div>
              <button
                onClick={() => {
                  onNavigate('observe');
                  setMobileMenuOpen(false);
                }}
                className="w-full rounded-lg bg-gradient-to-r from-[#5EE7F2] to-[#8B7CFF] px-4 py-2.5 text-center text-sm font-semibold text-[#080B12]"
              >
                Start Observing
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
