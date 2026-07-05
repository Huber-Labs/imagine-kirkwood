"use client";

import { TIMELINE_PHASES, type TimelinePhase } from "@/lib/types";

interface PhaseScrubberProps {
  activePhase: TimelinePhase;
  onPhaseChange: (phase: TimelinePhase) => void;
}

export function PhaseScrubber({
  activePhase,
  onPhaseChange,
}: PhaseScrubberProps) {
  return (
    <div
      className="phase-scrubber absolute inset-x-0 bottom-0 z-20 flex justify-center px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-6"
      role="group"
      aria-label="Timeline phase"
    >
      <div className="phase-scrubber__track map-chrome-panel flex w-full max-w-lg items-stretch gap-0.5 rounded-2xl p-1.5 sm:max-w-xl">
        {TIMELINE_PHASES.map((phase) => {
          const isActive = activePhase === phase.id;
          return (
            <button
              key={phase.id}
              type="button"
              aria-pressed={isActive}
              onClick={() => onPhaseChange(phase.id)}
              className={`phase-scrubber__btn flex-1 rounded-xl px-2 py-2.5 text-center transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 sm:px-3 sm:py-3 ${
                isActive
                  ? "bg-white/12 text-white"
                  : "text-white/50 hover:bg-white/5 hover:text-white/75"
              }`}
            >
              <span className="block text-[0.625rem] font-medium uppercase tracking-[0.14em] sm:text-[0.6875rem]">
                <span className="hidden sm:inline">{phase.label}</span>
                <span className="sm:hidden">{phase.shortLabel}</span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
