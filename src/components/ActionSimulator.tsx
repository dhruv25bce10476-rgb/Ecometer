import React, { useState } from 'react';
import { ImprovementTip } from '../types';
import { Check, Sparkles, TrendingDown, ArrowRight } from 'lucide-react';

interface ActionSimulatorProps {
  currentEarths: number;
  recommendations: ImprovementTip[];
  onRetake: () => void;
}

export const ActionSimulator: React.FC<ActionSimulatorProps> = ({
  currentEarths,
  recommendations,
  onRetake,
}) => {
  const [pledgedIds, setPledgedIds] = useState<Set<string>>(
    new Set(recommendations.slice(0, 2).map((r) => r.id))
  );

  const togglePledge = (id: string) => {
    setPledgedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // Calculate total potential reduction
  const totalReduction = recommendations
    .filter((r) => pledgedIds.has(r.id))
    .reduce((acc, curr) => acc + curr.potentialEarthReduction, 0);

  const projectedEarths = Math.max(0.9, Math.round((currentEarths - totalReduction) * 10) / 10);
  const reductionAmount = Math.round((currentEarths - projectedEarths) * 10) / 10;

  return (
    <div className="bg-white rounded-2xl border border-emerald-950/10 p-6 md:p-8 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-700" />
            <h3 className="text-lg font-bold text-slate-900">Your Action & Improvement Plan</h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Select habits below to simulate your projected ecological footprint reduction.
          </p>
        </div>

        {/* Live Simulator Pill / Summary */}
        <div className="bg-emerald-50 border border-emerald-200/80 rounded-xl px-4 py-2.5 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-700 text-white flex items-center justify-center shrink-0">
            <TrendingDown className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11px] font-semibold text-emerald-900 uppercase tracking-wide">
              Simulated Footprint
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-black text-emerald-900 tabular-nums">
                {projectedEarths.toFixed(1)} Earths
              </span>
              {reductionAmount > 0 && (
                <span className="text-xs font-semibold text-emerald-700">
                  (-{reductionAmount.toFixed(1)} Earths)
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations Cards */}
      <div className="space-y-3 mb-6">
        {recommendations.map((item) => {
          const isSelected = pledgedIds.has(item.id);
          return (
            <div
              key={item.id}
              onClick={() => togglePledge(item.id)}
              className={`p-4 rounded-xl border transition-all cursor-pointer select-none flex items-start gap-4 ${
                isSelected
                  ? 'bg-emerald-50/60 border-emerald-300 ring-1 ring-emerald-500/20'
                  : 'bg-slate-50/40 border-slate-200 hover:bg-slate-50 hover:border-slate-300'
              }`}
            >
              <div
                className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                  isSelected
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'border border-slate-300 bg-white text-transparent'
                }`}
              >
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                  <h4 className="font-semibold text-sm text-slate-900">{item.title}</h4>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-slate-500">{item.categoryName}</span>
                    <span className="text-emerald-800 font-semibold tabular-nums">
                      {item.impactTag}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{item.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Realistic College & Household Perspective */}
      <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 text-xs text-slate-600 mb-6 leading-relaxed">
        <p className="font-semibold text-slate-800 mb-1">
          💡 Practical Reality for Students & Households:
        </p>
        <p>
          You do not need to overhaul your entire lifestyle overnight. Modest shifts in the high-impact
          categories—such as swapping two weekly meat meals for beans/pasta, or combining daily errands
          into a single bus ride—deliver the greatest return on effort.
        </p>
      </div>

      {/* Retake or Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
        <button
          onClick={onRetake}
          className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
        >
          Retake Questionnaire
        </button>

        <div className="text-xs text-slate-500 text-center sm:text-right">
          <span>{pledgedIds.size} habits selected in your action pledge</span>
        </div>
      </div>
    </div>
  );
};
