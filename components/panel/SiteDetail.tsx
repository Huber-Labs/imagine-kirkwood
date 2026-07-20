"use client";

import { CivicPointsBar } from "@/components/panel/CivicPointsStepper";
import { FutureExhibition } from "@/components/panel/FutureExhibition";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { useParticipate } from "@/components/participate/ParticipateProvider";
import type { OpportunitySite } from "@/lib/types";

interface SiteDetailProps {
  site: OpportunitySite;
  focusedConceptId: string | null;
}

export function SiteDetail({ site, focusedConceptId }: SiteDetailProps) {
  const { user } = useParticipate();

  return (
    <article
      className="flex flex-col"
      style={{ "--hero-accent": site.accent } as React.CSSProperties}
    >
      {user && (
        <div className="civic-points-dock civic-points-dock--site px-5 sm:px-8">
          <CivicPointsBar />
        </div>
      )}

      {!focusedConceptId && (
        <header className="panel-rise px-5 pb-3 pt-4 sm:px-8 sm:pb-3 sm:pt-6">
          <div className="min-w-0 pr-10 sm:pr-12">
            <h2 className="font-[family-name:var(--font-instrument-serif)] text-[1.875rem] leading-[1.06] tracking-[-0.02em] text-foreground sm:text-[2.25rem]">
              {site.name}
            </h2>
          </div>
        </header>
      )}

      <div
        className={`px-5 pb-24 sm:px-8 sm:pb-20 ${
          focusedConceptId ? "space-y-12 pt-4 sm:space-y-14 sm:pt-6" : "pt-2"
        }`}
      >
        <FutureExhibition site={site} focusedConceptId={focusedConceptId} />
        <SiteFooter />
      </div>
    </article>
  );
}
