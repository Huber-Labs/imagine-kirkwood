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
        <p className="map-chrome-label mb-2 text-xs">Phase</p>
        <ul className="space-y-1.5">
          {phases.map((phase) => (
            <li
              key={phase}
              className="map-chrome-body flex items-center gap-2 text-xs"
            >
              <span className={`phase-dot phase-dot--${phase}`} />
              {PHASE_LABELS[phase]}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <p className="map-chrome-label mb-2 text-xs">Category</p>
        <ul className="space-y-1.5">
          {categories.map((category) => {
            const area = innovationAreas.find((a) => a.category === category);
            return (
              <li
                key={category}
                className="map-chrome-body flex items-center gap-2 text-xs"
              >
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-sm ring-1 ring-white/25"
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

const panelClasses = "map-chrome-panel rounded-xl p-3 sm:p-4";

export function MapLegend() {
  return (
    <>
      <details
        className={`absolute bottom-3 right-3 z-10 max-w-[calc(100%-1.5rem)] sm:hidden ${panelClasses}`}
      >
        <summary className="map-chrome-body cursor-pointer list-none text-xs font-medium uppercase tracking-wider [&::-webkit-details-marker]:hidden">
          <span className="flex items-center justify-between gap-4">
            Innovation Areas
            <span className="map-chrome-label">+</span>
          </span>
        </summary>
        <div className="mt-3 max-h-40 overflow-y-auto">
          <LegendContent />
        </div>
      </details>

      <div
        className={`absolute bottom-6 right-6 z-10 hidden sm:block ${panelClasses}`}
      >
        <p className="map-chrome-body mb-3 text-xs font-medium uppercase tracking-wider">
          Innovation Areas
        </p>
        <LegendContent />
      </div>
    </>
  );
}
