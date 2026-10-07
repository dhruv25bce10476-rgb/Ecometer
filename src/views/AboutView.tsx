import React from 'react';
import { Globe, BookOpen, Sparkles, Scale, GraduationCap, ArrowRight, ShieldCheck } from 'lucide-react';

interface AboutViewProps {
  onStartQuiz: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onStartQuiz }) => {
  return (
    <div className="max-w-4xl mx-auto py-8 md:py-12 px-4 space-y-12">
      {/* Header section */}
      <section className="text-center max-w-2xl mx-auto">
        <div className="flex items-center justify-center gap-2 text-xs font-semibold text-emerald-800 uppercase tracking-wider mb-2">
          <GraduationCap className="w-4 h-4" />
          <span>Environment & Sustainability College Project</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
          About EcoMeter
        </h1>

        <p className="mt-3 text-base text-slate-600 leading-relaxed">
          An educational web initiative designed to translate complex environmental data into a
          single, universally understandable metric: <strong>"How many Earths?"</strong>
        </p>
      </section>

      {/* Core Principle: Why Number of Earths? */}
      <section className="bg-white rounded-2xl border border-emerald-950/10 p-6 md:p-8 shadow-xs">
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
            <Globe className="w-4 h-4 text-emerald-700" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Why "Number of Earths"?</h2>
        </div>

        <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
          <p>
            Standard carbon metrics (such as <em>"12.4 metric tons of CO₂ equivalent per year"</em>)
            are scientifically accurate but abstract to most everyday citizens and students. It is
            difficult to visualize what a ton of gas looks like.
          </p>
          <p>
            The <strong>Ecological Footprint</strong> framework, pioneered by Mathis Wackernagel and
            William Rees at the Global Footprint Network, measures the biologically productive land
            and sea area required to produce the resources an individual consumes and to absorb
            their corresponding waste.
          </p>
          <p>
            By dividing an individual’s annual ecological demand by the planet’s total available
            per-capita biocapacity, we get a clear number:{' '}
            <strong className="text-slate-900">
              "If everyone lived like you, how many Earths would humanity need?"
            </strong>{' '}
            If this number exceeds <strong>1.0</strong>, humanity is living in an{' '}
            <em>ecological deficit</em>, liquidating natural capital rather than living off annual
            ecological interest.
          </p>
        </div>
      </section>

      {/* Four Assessment Pillars */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900">The 4 Assessment Pillars</h2>
        <p className="text-xs text-slate-500">
          Our educational model groups everyday decisions into four major consumption domains:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-5 rounded-xl border border-emerald-950/10 shadow-2xs">
            <h3 className="font-bold text-sm text-slate-900 mb-1">🥗 1. Food & Nutrition</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Considers trophic conversion efficiency. Producing 1 kg of beef requires significantly
              more land, water, and feed grain than producing 1 kg of plant proteins. Food waste also
              releases methane in landfills while squandering the energy spent growing it.
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-emerald-950/10 shadow-2xs">
            <h3 className="font-bold text-sm text-slate-900 mb-1">⚡ 2. Housing & Home Energy</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Considers shelter square-footage per person, heating/cooling thermostat habits, and the
              degree of renewable versus fossil fuels powering the regional electrical grid.
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-emerald-950/10 shadow-2xs">
            <h3 className="font-bold text-sm text-slate-900 mb-1">🚲 3. Mobility & Travel</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Evaluates daily commuting (public transit, active transit, or solo driving) and
              long-distance aviation. High-altitude commercial flight emissions have outsized
              radiative forcing effects.
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-emerald-950/10 shadow-2xs">
            <h3 className="font-bold text-sm text-slate-900 mb-1">📦 4. Goods, Water & Waste</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Tracks the embodied carbon of consumer products (fast fashion, electronics), potable
              water heating and municipal pumping, and packaging waste diversion through recycling.
            </p>
          </div>
        </div>
      </section>

      {/* Educational Scoring Rules & Transparency */}
      <section className="bg-white rounded-2xl border border-emerald-950/10 p-6 md:p-8 shadow-xs">
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center shrink-0">
            <Scale className="w-4 h-4 text-teal-700" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Scoring Rules & Transparency</h2>
        </div>

        <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
          <p>
            Because this tool is built for educational demonstration and awareness, all
            calculations operate locally in your browser using predefined pedagogical weighting
            factors calibrated against empirical data:
          </p>
          <ul className="list-disc list-inside space-y-1.5 text-xs text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-200">
            <li>
              <strong>Public Baseline Overhead (0.20 Earths):</strong> Shared societal
              infrastructure (roads, hospitals, emergency services, water lines) that all members of
              modern society rely on regardless of individual choices.
            </li>
            <li>
              <strong>Diet Weighting (0.20 to 1.50 Earths):</strong> Scaled from plant-rich, low-waste
              living to daily red-meat and heavy food-waste habits.
            </li>
            <li>
              <strong>Mobility Weighting (0.17 to 1.97 Earths):</strong> Scaled from walking/cycling and
              zero flights up to daily solo SUV commutes and multiple annual flights.
            </li>
            <li>
              <strong>Housing & Goods (0.39 to 2.40 Earths):</strong> Scaled from shared compact
              energy-efficient housing to expansive single-family homes and frequent consumer goods purchases.
            </li>
          </ul>
        </div>
      </section>

      {/* Classroom / Project Discussion Questions */}
      <section className="bg-slate-50 border border-slate-200/90 rounded-2xl p-6 md:p-8">
        <h2 className="text-lg font-bold text-slate-900 mb-2">
          Discussion Prompts for Environmental Science Classes
        </h2>
        <p className="text-xs text-slate-500 mb-4">
          Great questions to explore after calculating your score:
        </p>

        <div className="space-y-3">
          <div className="p-3.5 bg-white rounded-xl border border-slate-200 text-xs text-slate-700">
            <strong className="text-slate-900">1. Individual vs. Systemic Impact:</strong> What
            portion of our footprint is governed by personal lifestyle versus structural urban
            planning and energy grid infrastructure?
          </div>
          <div className="p-3.5 bg-white rounded-xl border border-slate-200 text-xs text-slate-700">
            <strong className="text-slate-900">2. Global Equity & Biocapacity:</strong> Why do
            residents of high-income industrialized nations average between 3.0 and 5.0 Earths,
            while global biocapacity only permits 1.0 Earth per person?
          </div>
          <div className="p-3.5 bg-white rounded-xl border border-slate-200 text-xs text-slate-700">
            <strong className="text-slate-900">3. High Leverage Habits:</strong> Which single
            lifestyle adjustment yielded the greatest reduction in the Action Plan simulator, and
            why?
          </div>
        </div>
      </section>

      {/* Ready to Calculate CTA */}
      <section className="text-center pt-4">
        <button
          onClick={onStartQuiz}
          className="px-8 py-3.5 text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 rounded-xl transition-all shadow-xs inline-flex items-center gap-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
        >
          <span>Take the Ecological Footprint Quiz</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </section>
    </div>
  );
};
