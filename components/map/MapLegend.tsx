import {
  CATEGORY_LABELS,
  PHASE_LABELS,
  type AreaCategory,
  type InnovationPhase,
} from "@/lib/types";
import { innovationAreas } from "@/lib/data/innovation-areas";

const phases: InnovationPhase[] = ["test", "next", "vision"];

export function MapLegend() {
  const categories = [
    ...new Set(innovationAreas.map((area) => area.category)),
  ] as AreaCategory[];

  return (
    <div className="absolute bottom-4 right-4 z-10 rounded-xl border border-white/30 bg-white/78 p-4 shadow-sm backdrop-blur-md sm:bottom-6 sm:right-6">
      <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted">
        Innovation Areas
      </p>
      <div className="space-y-3">
        <div>
          <p className="mb-2 text-xs text-muted/80">Phase</p>
          <ul className="space-y-1.5">
            {phases.map((phase) => (
              <li
                key={phase}
                className="flex items-center gap-2 text-xs text-foreground/80"
              >
                <span className={`phase-dot phase-dot--${phase}`} />
                {PHASE_LABELS[phase]}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-2 text-xs text-muted/80">Category</p>
          <ul className="space-y-1.5">
            {categories.map((category) => {
              const area = innovationAreas.find((a) => a.category === category);
              return (
                <li
                  key={category}
                  className="flex items-center gap-2 text-xs text-foreground/80"
                >
                  <span
                    className="h-2.5 w-2.5 shrink-0 rounded-sm ring-1 ring-foreground/10"
                    style={{ backgroundColor: area?.accent }}
                  />
                  {CATEGORY_LABELS[category]}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
