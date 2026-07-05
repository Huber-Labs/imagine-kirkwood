"use client";

import { TIMELINE_PHASES, type TimelinePhase } from "@/lib/types";

interface SitePhaseFilterProps {
  activePhase: TimelinePhase;
  onPhaseChange: (phase: TimelinePhase) => void;
  isPlaceholder?: boolean;
}

export function SitePhaseFilter({
  activePhase,
  onPhaseChange,
  isPlaceholder = false,
}: SitePhaseFilterProps) {
  return (
    <div className="site-phase-filter">
      <p className="panel-eyebrow mb-3">Explore over time</p>
      <div
        className="site-phase-filter__track"
        role="tablist"
        aria-label="Timeline for this place"
      >
        {TIMELINE_PHASES.map((phase) => {
          const isActive = activePhase === phase.id;
          const isDisabled = isPlaceholder && phase.id !== "today";

          return (
            <button
              key={phase.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-disabled={isDisabled}
              disabled={isDisabled}
              title={phase.label}
              onClick={() => onPhaseChange(phase.id)}
              className={`site-phase-filter__btn ${
                isActive ? "site-phase-filter__btn--active" : ""
              } ${isDisabled ? "site-phase-filter__btn--disabled" : ""}`}
            >
              <span className="site-phase-filter__label">{phase.label}</span>
              <span className="site-phase-filter__short">{phase.shortLabel}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
