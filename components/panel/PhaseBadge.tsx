import type { InnovationPhase } from "@/lib/types";
import { PHASE_LABELS } from "@/lib/types";

export function PhaseBadge({ phase }: { phase: InnovationPhase }) {
  return (
    <div className="flex items-center gap-2">
      <span className={`phase-dot phase-dot--${phase}`} aria-hidden="true" />
      <span className="text-sm font-medium text-foreground">
        {PHASE_LABELS[phase]}
      </span>
    </div>
  );
}
