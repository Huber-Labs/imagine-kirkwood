import type { ResearchItem } from "@/lib/types";

export function ResearchCard({ item }: { item: ResearchItem }) {
  return (
    <article className="card">
      <h4 className="text-sm font-medium text-foreground">{item.title}</h4>
      <p className="mt-2 text-sm leading-relaxed text-muted">{item.summary}</p>
      {item.source && <p className="mt-2 text-xs text-muted">{item.source}</p>}
    </article>
  );
}
