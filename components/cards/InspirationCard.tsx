import type { Inspiration } from "@/lib/types";

interface InspirationCardProps {
  inspiration: Inspiration;
  variant?: "default" | "editorial";
}

export function InspirationCard({
  inspiration,
  variant = "default",
}: InspirationCardProps) {
  if (variant === "editorial") {
    return (
      <article>
        <p className="font-[family-name:var(--font-instrument-serif)] text-[1.0625rem] leading-[1.65] text-foreground/85">
          &ldquo;{inspiration.text}&rdquo;
        </p>
        {inspiration.source && (
          <p className="mt-3 text-xs tracking-wide text-[var(--panel-muted)]">
            {inspiration.source}
          </p>
        )}
      </article>
    );
  }

  return (
    <article className="card">
      <p className="text-sm leading-relaxed text-foreground">
        &ldquo;{inspiration.text}&rdquo;
      </p>
      {inspiration.source && (
        <p className="mt-2 text-xs text-muted">— {inspiration.source}</p>
      )}
    </article>
  );
}
