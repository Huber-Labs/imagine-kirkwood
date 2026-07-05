import type { Observation } from "@/lib/types";

interface ObservationCardProps {
  observation: Observation;
  variant?: "default" | "editorial";
}

export function ObservationCard({
  observation,
  variant = "default",
}: ObservationCardProps) {
  if (variant === "editorial") {
    return (
      <article className="border-l border-[color-mix(in_srgb,var(--foreground)_12%,var(--border))] pl-5">
        <p className="text-[0.875rem] leading-[1.65] text-foreground/72 sm:text-[0.9375rem] sm:leading-[1.7]">
          {observation.text}
        </p>
        {observation.author && (
          <p className="mt-2 text-xs tracking-wide text-[var(--panel-muted)]">
            {observation.author}
          </p>
        )}
      </article>
    );
  }

  return (
    <article className="card">
      <p className="text-sm leading-relaxed text-foreground">{observation.text}</p>
      {observation.author && (
        <p className="mt-2 text-xs text-muted">— {observation.author}</p>
      )}
    </article>
  );
}
