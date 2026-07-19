"use client";

import { FutureExhibition } from "@/components/panel/FutureExhibition";
import type { OpportunitySite } from "@/lib/types";

interface SiteDetailProps {
  site: OpportunitySite;
  focusedConceptId: string | null;
}

export function SiteDetail({ site, focusedConceptId }: SiteDetailProps) {
  return (
    <article
      className="flex flex-col"
      style={{ "--hero-accent": site.accent } as React.CSSProperties}
    >
      {!focusedConceptId && (
        <header className="panel-rise px-5 pb-2 pt-8 sm:px-8 sm:pb-3 sm:pt-10">
          <div className="min-w-0 pr-10 sm:pr-12">
            <h2 className="font-[family-name:var(--font-instrument-serif)] text-[1.875rem] leading-[1.06] tracking-[-0.02em] text-foreground sm:text-[2.25rem]">
              {site.name}
            </h2>
            {site.isPlaceholder && (
              <p className="mt-2 text-sm text-[var(--panel-muted)]">
                Place story in development.
              </p>
            )}
          </div>
        </header>
      )}

      <div
        className={`space-y-12 px-5 pb-24 sm:space-y-14 sm:px-8 sm:pb-20 ${
          focusedConceptId ? "pt-8 sm:pt-10" : "pt-2 sm:pt-4"
        }`}
      >
        <FutureExhibition site={site} focusedConceptId={focusedConceptId} />
      </div>
    </article>
  );
}
