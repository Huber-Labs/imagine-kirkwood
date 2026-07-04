import type { Idea } from "@/lib/types";

export function IdeaCard({ idea }: { idea: Idea }) {
  return (
    <article className="card">
      <h4 className="text-sm font-medium text-foreground">{idea.title}</h4>
      <p className="mt-2 text-sm leading-relaxed text-muted">{idea.description}</p>
    </article>
  );
}
