import React from 'react';
import { Leaf, ArrowRight, Menu, X } from 'lucide-react';

interface NavbarProps {
  currentView: 'home' | 'quiz' | 'results' | 'about';
  onNavigate: (view: 'home' | 'quiz' | 'results' | 'about') => void;
  hasResults: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate, hasResults }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const handleNavClick = (view: 'home' | 'quiz' | 'results' | 'about') => {
    onNavigate(view);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAFBF9]/95 backdrop-blur-md border-b border-emerald-950/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Zone 1: Single text element Brand wordmark with subtle leaf emblem */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2 group text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 rounded-lg"
        >
          <div className="w-8 h-8 rounded-lg bg-emerald-700 text-white flex items-center justify-center shadow-xs transition-transform group-hover:scale-105">
            <Leaf className="w-4 h-4 text-emerald-100" />
          </div>
          <span className="font-semibold text-lg text-slate-900 tracking-tight">EcoMeter</span>
        </button>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <button
            onClick={() => handleNavClick('home')}
            className={`transition-colors hover:text-emerald-800 cursor-pointer ${
              currentView === 'home' ? 'text-emerald-800 font-semibold border-b-2 border-emerald-700 pb-0.5' : ''
            }`}
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick('quiz')}
            className={`transition-colors hover:text-emerald-800 cursor-pointer ${
              currentView === 'quiz' ? 'text-emerald-800 font-semibold border-b-2 border-emerald-700 pb-0.5' : ''
            }`}
          >
            Take the Quiz
          </button>
          {hasResults && (
            <button
              onClick={() => handleNavClick('results')}
              className={`transition-colors hover:text-emerald-800 cursor-pointer ${
                currentView === 'results' ? 'text-emerald-800 font-semibold border-b-2 border-emerald-700 pb-0.5' : ''
              }`}
            >
              My Results
            </button>
          )}
          <button
            onClick={() => handleNavClick('about')}
            className={`transition-colors hover:text-emerald-800 cursor-pointer ${
              currentView === 'about' ? 'text-emerald-800 font-semibold border-b-2 border-emerald-700 pb-0.5' : ''
            }`}
          >
            About
          </button>
        </nav>

        {/* Zone 3: Primary Action */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => handleNavClick('quiz')}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 rounded-lg transition-colors shadow-xs cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 whitespace-nowrap"
          >
            <span>{hasResults ? 'Retake Quiz' : 'Calculate Footprint'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile menu toggle */}
        <div className="flex md:hidden items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="p-2 text-slate-600 hover:text-slate-900 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-[#FAFBF9] px-4 pt-3 pb-5 space-y-2">
          <button
            onClick={() => handleNavClick('home')}
            className={`block w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${
              currentView === 'home' ? 'bg-emerald-50 text-emerald-800 font-semibold' : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick('quiz')}
            className={`block w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${
              currentView === 'quiz' ? 'bg-emerald-50 text-emerald-800 font-semibold' : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            Take the Quiz
          </button>
          {hasResults && (
            <button
              onClick={() => handleNavClick('results')}
              className={`block w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${
                currentView === 'results' ? 'bg-emerald-50 text-emerald-800 font-semibold' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              My Results
            </button>
          )}
          <button
            onClick={() => handleNavClick('about')}
            className={`block w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${
              currentView === 'about' ? 'bg-emerald-50 text-emerald-800 font-semibold' : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            About
          </button>
          <div className="pt-2">
            <button
              onClick={() => handleNavClick('quiz')}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-emerald-700 rounded-lg shadow-xs"
            >
              <span>{hasResults ? 'Retake Quiz' : 'Calculate Footprint'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
