import React from 'react';
import { CategoryResult } from '../types';
import { Utensils, Home, Car, PackageCheck, AlertTriangle } from 'lucide-react';

interface CategoryBreakdownProps {
  categories: CategoryResult[];
}

export const CategoryBreakdown: React.FC<CategoryBreakdownProps> = ({ categories }) => {
  const getIcon = (id: string) => {
    switch (id) {
      case 'food':
        return <Utensils className="w-4 h-4 text-emerald-700" />;
      case 'housing':
        return <Home className="w-4 h-4 text-emerald-700" />;
      case 'mobility':
        return <Car className="w-4 h-4 text-emerald-700" />;
      case 'consumption':
      default:
        return <PackageCheck className="w-4 h-4 text-emerald-700" />;
    }
  };

  const getImpactBadge = (level: CategoryResult['impactLevel']) => {
    switch (level) {
      case 'critical':
        return <span className="text-xs font-semibold text-rose-700">Highest Impact Area</span>;
      case 'elevated':
        return <span className="text-xs font-semibold text-amber-700">Elevated Demand</span>;
      case 'moderate':
        return <span className="text-xs font-medium text-slate-600">Moderate Footprint</span>;
      case 'low':
      default:
        return <span className="text-xs font-medium text-emerald-700">Low / Sustainable</span>;
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-emerald-950/10 p-6 md:p-8 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-4 border-b border-slate-100">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Footprint Breakdown by Category</h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Understand which lifestyle sectors contribute most to your resource demand.
          </p>
        </div>
        <div className="text-xs text-slate-500">
          <span>Shares sum to total footprint</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories.map((cat) => {
          const isHigh = cat.impactLevel === 'critical' || cat.impactLevel === 'elevated';
          return (
            <div
              key={cat.categoryId}
              className={`p-4 rounded-xl border transition-colors ${
                isHigh
                  ? 'border-amber-200/80 bg-amber-50/20'
                  : 'border-slate-150 bg-slate-50/50 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-100/70 flex items-center justify-center shrink-0">
                    {getIcon(cat.categoryId)}
                  </div>
                  <h4 className="font-semibold text-sm text-slate-900">{cat.name}</h4>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-slate-900 tabular-nums">
                    {cat.score.toFixed(2)}
                  </span>
                  <span className="text-xs text-slate-500 ml-1">Earths</span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden mb-2.5">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    cat.impactLevel === 'critical'
                      ? 'bg-rose-600'
                      : cat.impactLevel === 'elevated'
                      ? 'bg-amber-600'
                      : cat.impactLevel === 'moderate'
                      ? 'bg-teal-600'
                      : 'bg-emerald-600'
                  }`}
                  style={{ width: `${Math.min(100, Math.max(8, cat.percentageOfTotal))}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                <span>{cat.percentageOfTotal}% of your total footprint</span>
                {getImpactBadge(cat.impactLevel)}
              </div>

              <p className="text-xs text-slate-600 border-t border-slate-200/60 pt-2 leading-relaxed">
                {cat.keyObservation}
              </p>

              {cat.highestImpactAnswerTitle && isHigh && (
                <div className="mt-2 pt-2 border-t border-dashed border-amber-200/80 flex items-start gap-1.5 text-xs text-amber-900">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                  <span>
                    <strong className="font-semibold">Key driver:</strong>{' '}
                    {cat.highestImpactAnswerTitle}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
