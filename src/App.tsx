/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeView } from './views/HomeView';
import { QuizView } from './views/QuizView';
import { ResultsView } from './views/ResultsView';
import { AboutView } from './views/AboutView';
import { calculateFootprint } from './data/recommendations';
import { FootprintResult } from './types';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'quiz' | 'results' | 'about'>('home');
  const [savedAnswers, setSavedAnswers] = useState<Record<number, string> | null>(null);
  const [results, setResults] = useState<FootprintResult | null>(null);

  const handleNavigate = (view: 'home' | 'quiz' | 'results' | 'about') => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuizComplete = (answers: Record<number, string>) => {
    setSavedAnswers(answers);
    const calculatedResult = calculateFootprint(answers);
    setResults(calculatedResult);
    setCurrentView('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRetakeQuiz = () => {
    setCurrentView('quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FAFBF9] text-slate-900 flex flex-col font-sans selection:bg-emerald-100 selection:text-emerald-900 antialiased">
      {/* Navigation Bar */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        hasResults={!!results}
      />

      {/* Main Content View Container */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6">
        {currentView === 'home' && (
          <HomeView
            onStartQuiz={() => handleNavigate('quiz')}
            onGoToAbout={() => handleNavigate('about')}
          />
        )}

        {currentView === 'quiz' && (
          <QuizView
            onComplete={handleQuizComplete}
            savedAnswers={savedAnswers || {}}
            onBackToHome={() => handleNavigate('home')}
          />
        )}

        {currentView === 'results' && results && (
          <ResultsView
            result={results}
            onRetake={handleRetakeQuiz}
            onGoToAbout={() => handleNavigate('about')}
          />
        )}

        {currentView === 'about' && (
          <AboutView onStartQuiz={() => handleNavigate('quiz')} />
        )}
      </main>

      {/* Clean Footer */}
      <Footer onNavigate={handleNavigate} hasResults={!!results} />
    </div>
  );
}
