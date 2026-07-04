import {
  CATEGORY_LABELS,
  PHASE_LABELS,
  type AreaCategory,
  type InnovationPhase,
} from "@/lib/types";
import { innovationAreas } from "@/lib/data/innovation-areas";

const phases: InnovationPhase[] = ["test", "next", "vision"];

function LegendContent() {
  const categories = [
    ...new Set(innovationAreas.map((area) => area.category)),
  ] as AreaCategory[];

  return (
    <div className="space-y-3">
      <div>
        <p className="mb-2 text-xs text-white/45">Phase</p>
        <ul className="space-y-1.5">
          {phases.map((phase) => (
            <li
              key={phase}
              className="flex items-center gap-2 text-xs text-white/80"
            >
              <span className={`phase-dot phase-dot--${phase}`} />
              {PHASE_LABELS[phase]}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <p className="mb-2 text-xs text-white/45">Category</p>
        <ul className="space-y-1.5">
          {categories.map((category) => {
            const area = innovationAreas.find((a) => a.category === category);
            return (
              <li
                key={category}
                className="flex items-center gap-2 text-xs text-white/80"
              >
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-sm ring-1 ring-white/20"
                  style={{ backgroundColor: area?.accent }}
                />
                {CATEGORY_LABELS[category]}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

const panelClasses =
  "rounded-xl border border-white/10 bg-black/55 p-3 shadow-lg backdrop-blur-md sm:p-4";

export function MapLegend() {
  return (
    <>
      {/* Mobile: collapsible legend */}
      <details
        className={`absolute bottom-3 right-3 z-10 max-w-[calc(100%-1.5rem)] sm:hidden ${panelClasses}`}
      >
        <summary className="cursor-pointer list-none text-xs font-medium uppercase tracking-wider text-white/70 [&::-webkit-details-marker]:hidden">
          <span className="flex items-center justify-between gap-4">
            Innovation Areas
            <span className="text-white/40">+</span>
          </span>
        </summary>
        <div className="mt-3 max-h-40 overflow-y-auto">
          <LegendContent />
        </div>
      </details>

      {/* Desktop: always visible */}
      <div
        className={`absolute bottom-6 right-6 z-10 hidden sm:block ${panelClasses}`}
      >
        <p className="mb-3 text-xs font-medium uppercase tracking-wider text-white/70">
          Innovation Areas
        </p>
        <LegendContent />
      </div>
    </>
  );
}
