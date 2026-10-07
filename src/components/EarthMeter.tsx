import React from 'react';
import { Globe, AlertCircle, CheckCircle2 } from 'lucide-react';

interface EarthMeterProps {
  totalEarths: number;
}

export const EarthMeter: React.FC<EarthMeterProps> = ({ totalEarths }) => {
  const fullEarths = Math.floor(totalEarths);
  const remainder = Math.round((totalEarths - fullEarths) * 100);
  const maxDisplayEarths = Math.max(5, Math.ceil(totalEarths) + 1);

  // Status descriptor
  let statusText = 'Sustainable Lifestyle';
  let statusDetail = 'Within the regenerative capacity of one planet Earth.';
  let badgeColor = 'text-emerald-700 bg-emerald-50 border-emerald-200';

  if (totalEarths > 3.0) {
    statusText = 'Critical Ecological Overshoot';
    statusDetail = 'High resource consumption exceeding planetary replenishment boundaries.';
    badgeColor = 'text-rose-700 bg-rose-50 border-rose-200';
  } else if (totalEarths > 1.8) {
    statusText = 'Elevated Footprint';
    statusDetail = 'Above sustainable biocapacity; common among modern urban lifestyles.';
    badgeColor = 'text-amber-800 bg-amber-50 border-amber-200';
  } else if (totalEarths > 1.1) {
    statusText = 'Near Sustainable Limit';
    statusDetail = 'Slightly above the global biocapacity limit of 1.0 planet.';
    badgeColor = 'text-teal-800 bg-teal-50 border-teal-200';
  }

  return (
    <div className="bg-white rounded-2xl border border-emerald-950/10 p-6 md:p-8 shadow-xs">
      {/* Top status indicator */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-slate-100">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Estimated Planetary Demand
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-4xl md:text-5xl font-extrabold text-slate-900 tabular-nums">
              {totalEarths.toFixed(1)}
            </span>
            <span className="text-xl md:text-2xl font-bold text-emerald-800">Earths</span>
          </div>
        </div>

        <div className={`px-3 py-2 rounded-xl border text-xs font-medium max-w-xs ${badgeColor}`}>
          <div className="flex items-center gap-1.5 font-semibold">
            {totalEarths <= 1.0 ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            )}
            <span>{statusText}</span>
          </div>
          <p className="mt-0.5 text-[11px] leading-tight opacity-90">{statusDetail}</p>
        </div>
      </div>

      {/* Visual Earth Display */}
      <div className="py-6">
        <p className="text-xs font-medium text-slate-500 mb-4">
          Visual representation of required natural capital:
        </p>

        <div className="flex flex-wrap items-center gap-3 md:gap-4">
          {Array.from({ length: maxDisplayEarths }).map((_, index) => {
            const isFull = index < fullEarths;
            const isPartial = index === fullEarths && remainder > 0;
            const isFutureSustainableBoundary = index === 1;

            if (isFull) {
              return (
                <div
                  key={index}
                  className="flex flex-col items-center group relative"
                  title={`Full Earth #${index + 1}`}
                >
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-emerald-700 text-white flex items-center justify-center shadow-sm transition-transform group-hover:scale-105">
                    <Globe className="w-7 h-7 md:w-8 md:h-8 text-emerald-100" />
                  </div>
                  <span className="text-[11px] font-medium text-slate-600 mt-1.5 tabular-nums">
                    Earth {index + 1}
                  </span>
                </div>
              );
            }

            if (isPartial) {
              return (
                <div
                  key={index}
                  className="flex flex-col items-center group relative"
                  title={`Fractional Earth: ${remainder}%`}
                >
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-slate-100 border border-slate-200 relative overflow-hidden flex items-center justify-center shadow-xs">
                    {/* Partial fill */}
                    <div
                      className="absolute left-0 bottom-0 top-0 bg-emerald-600 transition-all"
                      style={{ width: `${remainder}%` }}
                    />
                    <Globe className="w-7 h-7 md:w-8 md:h-8 text-slate-800 relative z-10 opacity-70" />
                  </div>
                  <span className="text-[11px] font-medium text-slate-600 mt-1.5 tabular-nums">
                    +{remainder}%
                  </span>
                </div>
              );
            }

            return (
              <div
                key={index}
                className="flex flex-col items-center opacity-30"
                title="Unused Earth boundary"
              >
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-dashed border-slate-300 flex items-center justify-center">
                  <Globe className="w-6 h-6 text-slate-400" />
                </div>
                <span className="text-[11px] text-slate-400 mt-1.5">
                  {isFutureSustainableBoundary ? 'Target' : ''}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Planetary Benchmark Comparison Scale */}
      <div className="pt-4 border-t border-slate-100">
        <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
          <span>Benchmark comparison:</span>
          <span className="font-medium text-slate-700">1.0 Earth = Global Biocapacity</span>
        </div>

        <div className="space-y-2">
          {/* User Score Bar */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="font-semibold text-slate-800">Your Lifestyle</span>
              <span className="font-semibold text-emerald-800 tabular-nums">{totalEarths.toFixed(1)} Earths</span>
            </div>
            <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden relative">
              {/* Sustainable boundary line indicator at 1.0 (assuming scale 0 to 6) */}
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-emerald-800 z-10"
                style={{ left: `${(1.0 / 6) * 100}%` }}
                title="Sustainable 1 Earth line"
              />
              <div
                className={`h-full rounded-full transition-all duration-700 ${
                  totalEarths <= 1.0 ? 'bg-emerald-600' : totalEarths <= 2.2 ? 'bg-teal-600' : 'bg-amber-600'
                }`}
                style={{ width: `${Math.min(100, (totalEarths / 6) * 100)}%` }}
              />
            </div>
          </div>

          {/* World Average Reference Bar */}
          <div>
            <div className="flex justify-between text-[11px] text-slate-500 mb-0.5">
              <span>World Average (Global Footprint Network)</span>
              <span className="tabular-nums">1.7 Earths</span>
            </div>
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden relative">
              <div
                className="h-full bg-slate-400 rounded-full"
                style={{ width: `${(1.7 / 6) * 100}%` }}
              />
            </div>
          </div>

          {/* Sustainable Target Reference Bar */}
          <div>
            <div className="flex justify-between text-[11px] text-emerald-800 mb-0.5">
              <span className="font-medium">One-Planet Biocapacity Ceiling</span>
              <span className="tabular-nums font-semibold">1.0 Earth (Max Sustainable)</span>
            </div>
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-600 rounded-full"
                style={{ width: `${(1.0 / 6) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
