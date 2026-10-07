import React from 'react';
import { ArrowRight, Globe, Leaf, RefreshCw, BarChart3, ShieldCheck } from 'lucide-react';

interface HomeViewProps {
  onStartQuiz: () => void;
  onGoToAbout: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onStartQuiz, onGoToAbout }) => {
  return (
    <div className="space-y-16 py-6 md:py-12">
      {/* Hero Section */}
      <section className="text-center max-w-3xl mx-auto px-4">
        {/* Subtle metadata lead-in, compliant with zero-pill rule */}
        <div className="text-xs font-semibold uppercase tracking-wider text-emerald-800 mb-3 flex items-center justify-center gap-2">
          <span>Sustainability Project</span>
          <span aria-hidden="true">·</span>
          <span>Ecological Footprint Model</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight text-balance leading-tight">
          How many Earths does your lifestyle need?
        </h1>

        <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed text-balance">
          Answer a few simple questions about your everyday habits and discover your estimated
          ecological footprint.
        </p>

        {/* Primary CTA Button */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={onStartQuiz}
            className="w-full sm:w-auto px-8 py-3.5 text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
          >
            <span>Calculate My Footprint</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>

          <button
            onClick={onGoToAbout}
            className="w-full sm:w-auto px-6 py-3.5 text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
          >
            Learn the Science & Methodology
          </button>
        </div>

        {/* Simple Visual requested in prompt: 🌍 → 🌍 → 🌍 */}
        <div className="mt-12 p-6 bg-white border border-emerald-950/10 rounded-2xl shadow-xs max-w-xl mx-auto">
          <div className="flex items-center justify-center gap-3 md:gap-5 py-2">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-emerald-700 text-white flex items-center justify-center shadow-xs">
              <Globe className="w-7 h-7 text-emerald-100" />
            </div>
            <ArrowRight className="w-5 h-5 text-emerald-700 stroke-[2.5]" />
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-teal-700 text-white flex items-center justify-center shadow-xs">
              <Globe className="w-7 h-7 text-teal-100" />
            </div>
            <ArrowRight className="w-5 h-5 text-teal-700 stroke-[2.5]" />
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-slate-800 text-white flex items-center justify-center shadow-xs">
              <Globe className="w-7 h-7 text-slate-200" />
            </div>
          </div>

          <p className="mt-4 text-xs sm:text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
            Your lifestyle affects the amount of energy, food, water, land and natural resources
            needed to support you.
          </p>
        </div>
      </section>

      {/* Feature Cards requested in prompt: 🌱 Understand, 🌍 Measure, 🔄 Improve */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Feature 1 */}
          <div className="bg-white rounded-2xl p-6 md:p-7 border border-emerald-950/10 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-100/70 text-emerald-800 flex items-center justify-center mb-4">
                <Leaf className="w-5 h-5 text-emerald-700" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">🌱 Understand</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Discover which everyday habits have the greatest environmental impact across food,
                energy, transit, and household consumption.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-500">
              Clear sector breakdowns
            </div>
          </div>

          {/* Feature 2 */}
          <div className="bg-white rounded-2xl p-6 md:p-7 border border-emerald-950/10 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-teal-100/70 text-teal-800 flex items-center justify-center mb-4">
                <Globe className="w-5 h-5 text-teal-700" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">🌍 Measure</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Get an estimated number of Earths required to support your lifestyle if everyone on
                the planet lived the same way.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-500">
              Biocapacity benchmarked
            </div>
          </div>

          {/* Feature 3 */}
          <div className="bg-white rounded-2xl p-6 md:p-7 border border-emerald-950/10 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-100/70 text-emerald-800 flex items-center justify-center mb-4">
                <RefreshCw className="w-5 h-5 text-emerald-700" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">🔄 Improve</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Receive practical suggestions to reduce your environmental footprint through
                manageable, high-leverage lifestyle adjustments.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-500">
              Actionable & student-friendly
            </div>
          </div>
        </div>
      </section>

      {/* Educational Insight Banner */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="bg-emerald-900 text-white rounded-2xl p-8 md:p-10 shadow-sm relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <span className="text-xs font-semibold text-emerald-300 uppercase tracking-wider">
              College Environmental Science Fact
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1 mb-3">
              One Planet. Finite Resources.
            </h2>
            <p className="text-sm text-emerald-100 leading-relaxed mb-6">
              Ecological footprint accounting compares human demand on natural capital against the
              biosphere’s biological capacity to regenerate. At present, global human demand exceeds
              Earth's annual biological capacity by roughly 70%—equivalent to 1.7 Earths.
            </p>
            <button
              onClick={onStartQuiz}
              className="px-6 py-2.5 text-xs font-semibold text-emerald-950 bg-white hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer"
            >
              Take the 3-Minute Quiz →
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
