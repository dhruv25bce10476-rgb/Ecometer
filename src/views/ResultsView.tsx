import React, { useState } from 'react';
import { FootprintResult } from '../types';
import { EarthMeter } from '../components/EarthMeter';
import { CategoryBreakdown } from '../components/CategoryBreakdown';
import { ActionSimulator } from '../components/ActionSimulator';
import { AlertCircle, Calendar, RefreshCw, Share2, Check, ArrowRight, BookOpen } from 'lucide-react';

interface ResultsViewProps {
  result: FootprintResult;
  onRetake: () => void;
  onGoToAbout: () => void;
}

export const ResultsView: React.FC<ResultsViewProps> = ({ result, onRetake, onGoToAbout }) => {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    const text = `My ecological footprint on EcoMeter is ${result.totalEarths} Earths. If everyone lived like me, humanity would need ${result.totalEarths} planets. Discover your footprint:`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-6 md:py-10 px-4 space-y-10">
      {/* Primary Statement Header */}
      <section className="text-center max-w-2xl mx-auto">
        <div className="text-xs font-semibold uppercase tracking-wider text-emerald-800 mb-2">
          Your Ecological Footprint Result
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug text-balance">
          If everyone lived like you, we would need approximately{' '}
          <span className="text-emerald-700 underline decoration-emerald-300 underline-offset-4">
            {result.totalEarths.toFixed(1)} Earths
          </span>
          .
        </h1>

        <p className="mt-3 text-sm text-slate-600 leading-relaxed text-balance">
          This estimate measures your personal demand on global bioproductive land and resources
          compared to the Earth's natural replenishment rate.
        </p>

        {/* Action button row */}
        <div className="mt-5 flex items-center justify-center gap-3">
          <button
            onClick={onRetake}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg shadow-2xs transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
            <span>Retake Quiz</span>
          </button>

          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100/70 rounded-lg shadow-2xs transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-700" />
                <span>Summary Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-emerald-700" />
                <span>Share Summary</span>
              </>
            )}
          </button>
        </div>
      </section>

      {/* Earth Visual Meter */}
      <section>
        <EarthMeter totalEarths={result.totalEarths} />
      </section>

      {/* Personal Earth Overshoot Day Card */}
      <section className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-6 md:p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-700 text-white flex items-center justify-center shrink-0 mt-0.5">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm sm:text-base text-slate-900">
              Personal Earth Overshoot Day
            </h3>
            <p className="text-xs text-slate-600 mt-0.5 leading-relaxed max-w-xl">
              If everyone on Earth lived with your lifestyle habits, humanity would exhaust the
              planet's annual ecological budget by:
            </p>
          </div>
        </div>

        <div className="bg-white px-4 py-2.5 rounded-xl border border-emerald-200 text-right shrink-0">
          <span className="text-xs text-slate-500 block">Projected date</span>
          <span className="text-base sm:text-lg font-bold text-emerald-900 tabular-nums">
            {result.personalOvershootDay}
          </span>
        </div>
      </section>

      {/* Highest-Impact Habits Highlight Box */}
      <section className="bg-white rounded-2xl border border-emerald-950/10 p-6 md:p-8 shadow-xs">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
            <AlertCircle className="w-4 h-4 text-amber-700" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">Your Highest-Impact Habits</h3>
            <p className="text-xs text-slate-500">
              Targeting these specific areas produces the greatest ecological payoff.
            </p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Primary driver */}
          <div className="p-4 rounded-xl bg-amber-50/40 border border-amber-200">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 block mb-1">
              Top Impact Sector: {result.highestImpactCategory.name}
            </span>
            <h4 className="font-semibold text-sm text-slate-900 mb-1">
              {result.highestImpactCategory.highestImpactAnswerTitle || 'High energy or transit intensity'}
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              This single area accounts for{' '}
              <strong className="text-slate-900">{result.highestImpactCategory.percentageOfTotal}%</strong>{' '}
              of your entire ecological footprint ({result.highestImpactCategory.score.toFixed(2)} Earths).
              Focusing your initial conservation efforts here will yield rapid improvements.
            </p>
          </div>

          {/* Secondary driver */}
          {result.secondHighestCategory && (
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600 block mb-1">
                Secondary Sector: {result.secondHighestCategory.name}
              </span>
              <h4 className="font-semibold text-sm text-slate-900 mb-1">
                {result.secondHighestCategory.highestImpactAnswerTitle || 'Household consumption habits'}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Contributes{' '}
                <strong className="text-slate-900">{result.secondHighestCategory.percentageOfTotal}%</strong>{' '}
                of your total footprint ({result.secondHighestCategory.score.toFixed(2)} Earths).
                Modest everyday adjustments can lower this sector significantly.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Category Breakdown Component */}
      <section>
        <CategoryBreakdown categories={result.categoryResults} />
      </section>

      {/* Interactive Action Simulator with Realistic Suggestions */}
      <section>
        <ActionSimulator
          currentEarths={result.totalEarths}
          recommendations={result.recommendations}
          onRetake={onRetake}
        />
      </section>

      {/* College Project Context & Next Steps */}
      <section className="bg-white rounded-2xl border border-emerald-950/10 p-6 md:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-slate-900 text-sm sm:text-base">
            Curious about the scientific calculation?
          </h3>
          <p className="text-xs text-slate-500 mt-1 max-w-lg">
            Read about the Global Footprint Network biocapacity model, consumption coefficients, and
            how college research projects interpret ecological overshoot.
          </p>
        </div>
        <button
          onClick={onGoToAbout}
          className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors shrink-0 cursor-pointer"
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Read Project Methodology</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </section>
    </div>
  );
};
