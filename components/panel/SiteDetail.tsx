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
        <header className="panel-rise px-5 pb-3 pt-6 sm:px-8 sm:pb-3 sm:pt-10">
          <div className="min-w-0 pr-10 sm:pr-12">
            <h2 className="font-[family-name:var(--font-instrument-serif)] text-[1.875rem] leading-[1.06] tracking-[-0.02em] text-foreground sm:text-[2.25rem]">
              {site.name}
            </h2>
          </div>
        </header>
      )}

      <div
        className={`px-5 pb-24 sm:px-8 sm:pb-20 ${
          focusedConceptId ? "space-y-12 pt-8 sm:space-y-14 sm:pt-10" : "pt-0"
        }`}
      >
        <FutureExhibition site={site} focusedConceptId={focusedConceptId} />
      </div>
    </article>
  );
}
