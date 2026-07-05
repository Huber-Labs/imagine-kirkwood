import type { SmallWin } from "@/lib/types";

interface SmallWinsSectionProps {
  wins: SmallWin[];
}

export function SmallWinsSection({ wins }: SmallWinsSectionProps) {
  return (
    <div className="small-wins space-y-5">
      <p className="text-[0.875rem] leading-[1.65] text-foreground/62 sm:text-[0.9375rem] sm:leading-[1.7]">
        Small steps first. Each one teaches us what works.
      </p>
      <ol className="small-wins__list space-y-4 sm:space-y-4">
        {wins.map((win, index) => (
          <li key={win.id} className="small-wins__item">
            <span className="small-wins__index" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className="space-y-1">
              <p className="font-[family-name:var(--font-instrument-serif)] text-[1rem] leading-[1.35] text-foreground sm:text-[1.03125rem]">
                {win.title}
              </p>
              {win.description && (
                <p className="text-[0.8125rem] leading-[1.6] text-foreground/55 sm:text-[0.875rem]">
                  {win.description}
                </p>
              )}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
