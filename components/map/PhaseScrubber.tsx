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
  const activeIndex = TIMELINE_PHASES.findIndex((p) => p.id === activePhase);
  const segment = `(100% - 0.75rem) / ${TIMELINE_PHASES.length}`;

  return (
    <div
      className="phase-scrubber absolute inset-x-0 bottom-0 z-20 flex justify-center px-3 pb-[max(0.875rem,env(safe-area-inset-bottom))] pt-8 sm:px-4 sm:pb-[max(1rem,env(safe-area-inset-bottom))] sm:pt-6"
      role="group"
      aria-label="Timeline phase"
    >
      <div className="phase-scrubber__track map-chrome-panel relative grid w-full max-w-2xl grid-cols-4 rounded-2xl p-1.5">
        <span
          className="phase-scrubber__indicator"
          aria-hidden="true"
          style={{
            width: `calc(${segment})`,
            left: `calc(0.375rem + ${activeIndex} * (${segment}))`,
          }}
        />
        {TIMELINE_PHASES.map((phase) => {
          const isActive = activePhase === phase.id;
          return (
            <button
              key={phase.id}
              type="button"
              aria-pressed={isActive}
              aria-label={`${phase.label}: ${phase.subtitle}`}
              onClick={() => onPhaseChange(phase.id)}
              className={`phase-scrubber__btn relative z-[1] min-h-[2.75rem] rounded-xl px-1 py-2 text-center transition-[color,transform] duration-500 ease-[var(--panel-ease)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/35 sm:min-h-[3.25rem] sm:px-2 sm:py-2.5 ${
                isActive
                  ? "phase-scrubber__btn--active text-white"
                  : "text-white/40 hover:text-white/65"
              }`}
            >
              <span
                className={`block text-[0.625rem] font-semibold uppercase tracking-[0.1em] sm:text-[0.6875rem] sm:tracking-[0.12em] ${
                  isActive ? "text-white" : ""
                }`}
              >
                <span className="hidden md:inline">{phase.label}</span>
                <span className="hidden sm:inline md:hidden">{phase.shortLabel}</span>
                <span className="sm:hidden">{phase.shortLabel}</span>
              </span>
              <span
                className={`mt-0.5 hidden text-[0.5625rem] leading-tight tracking-[0.02em] sm:block sm:text-[0.625rem] ${
                  isActive ? "text-white/75" : "text-white/30"
                }`}
              >
                {phase.subtitle}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
