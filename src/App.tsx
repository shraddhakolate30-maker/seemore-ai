import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar.js';
import { LandingPage } from './components/LandingPage.js';
import { ObservationView } from './components/ObservationView.js';
import { ProgressDashboard } from './components/ProgressDashboard.js';
import { HowItWorksPage } from './components/HowItWorksPage.js';
import { Footer } from './components/Footer.js';
import { SystemStatus } from './types.js';

export default function App() {
  const [currentTab, setCurrentTab] = useState<'home' | 'observe' | 'progress' | 'how-it-works'>('home');
  const [systemStatus, setSystemStatus] = useState<SystemStatus | null>(null);

  useEffect(() => {
    fetch('/api/system/status')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) setSystemStatus(data);
      })
      .catch((err) => {
        console.error('System status query error:', err);
      });
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#080B12] text-[#F5F7FA]">
      <Navbar
        currentTab={currentTab}
        onNavigate={setCurrentTab}
        systemStatus={systemStatus}
      />

      <main className="flex-1">
        {currentTab === 'home' && (
          <LandingPage
            onStartObserving={() => setCurrentTab('observe')}
            onHowItWorks={() => setCurrentTab('how-it-works')}
            systemStatus={systemStatus}
          />
        )}

        {currentTab === 'observe' && (
          <ObservationView
            onNavigateToProgress={() => setCurrentTab('progress')}
            systemStatus={systemStatus}
          />
        )}

        {currentTab === 'progress' && (
          <ProgressDashboard
            onStartObserving={() => setCurrentTab('observe')}
          />
        )}

        {currentTab === 'how-it-works' && (
          <HowItWorksPage
            onStartObserving={() => setCurrentTab('observe')}
          />
        )}
      </main>

      <Footer onNavigate={setCurrentTab} />
    </div>
  );
}
