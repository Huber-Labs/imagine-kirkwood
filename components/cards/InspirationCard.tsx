import type { Inspiration } from "@/lib/types";

export function InspirationCard({ inspiration }: { inspiration: Inspiration }) {
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
