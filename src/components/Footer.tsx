import React from 'react';
import { Leaf, Globe } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: 'home' | 'quiz' | 'results' | 'about') => void;
  hasResults: boolean;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, hasResults }) => {
  return (
    <footer className="mt-20 border-t border-slate-200 bg-[#FAFBF9] text-slate-600 text-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-slate-200/70">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-6 h-6 rounded-md bg-emerald-700 text-white flex items-center justify-center">
                <Leaf className="w-3.5 h-3.5 text-emerald-100" />
              </div>
              <span className="font-bold text-sm text-slate-900">EcoMeter</span>
            </div>
            <p className="text-slate-500 max-w-sm mt-1 text-[11px] leading-relaxed">
              An educational ecological footprint calculator designed for Environment &
              Sustainability studies.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs font-medium text-slate-600">
            <button
              onClick={() => onNavigate('home')}
              className="hover:text-emerald-800 transition-colors cursor-pointer"
            >
              Home
            </button>
            <button
              onClick={() => onNavigate('quiz')}
              className="hover:text-emerald-800 transition-colors cursor-pointer"
            >
              Take the Quiz
            </button>
            {hasResults && (
              <button
                onClick={() => onNavigate('results')}
                className="hover:text-emerald-800 transition-colors cursor-pointer"
              >
                My Results
              </button>
            )}
            <button
              onClick={() => onNavigate('about')}
              className="hover:text-emerald-800 transition-colors cursor-pointer"
            >
              About & Methodology
            </button>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400">
          <p>© {new Date().getFullYear()} EcoMeter · Environment & Sustainability College Project</p>
          <p className="text-slate-500">
            Predefined educational scoring rules based on Global Footprint Network principles.
          </p>
        </div>
      </div>
    </footer>
  );
};
