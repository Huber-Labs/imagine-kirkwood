import type { Idea } from "@/lib/types";

interface IdeaCardProps {
  idea: Idea;
  variant?: "default" | "editorial";
}

export function IdeaCard({ idea, variant = "default" }: IdeaCardProps) {
  if (variant === "editorial") {
    return (
      <article>
        <h4 className="font-[family-name:var(--font-instrument-serif)] text-[1.0625rem] leading-snug text-foreground">
          {idea.title}
        </h4>
        <p className="mt-2.5 text-[0.9375rem] leading-[1.75] text-foreground/60">
          {idea.description}
        </p>
      </article>
    );
  }

  return (
    <article className="card">
      <h4 className="text-sm font-medium text-foreground">{idea.title}</h4>
      <p className="mt-2 text-sm leading-relaxed text-muted">{idea.description}</p>
    </article>
  );
}
