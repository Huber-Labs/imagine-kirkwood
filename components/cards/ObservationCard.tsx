import type { Observation } from "@/lib/types";

export function ObservationCard({ observation }: { observation: Observation }) {
  return (
    <article className="card">
      <p className="text-sm leading-relaxed text-foreground">{observation.text}</p>
      {observation.author && (
        <p className="mt-2 text-xs text-muted">— {observation.author}</p>
      )}
    </article>
  );
}
