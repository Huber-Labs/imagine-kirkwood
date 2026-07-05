"use client";

import { PanelSection } from "@/components/panel/PanelSection";
import { PhaseChapter } from "@/components/panel/PhaseChapter";
import { PlaceIdeasSection } from "@/components/panel/PlaceIdeasSection";
import { SitePhaseFilter } from "@/components/panel/SitePhaseFilter";
import { getPhaseContent } from "@/lib/data/opportunity-sites";
import {
  SITE_SECTIONS,
  TIMELINE_PHASES,
  type OpportunitySite,
  type TimelinePhase,
} from "@/lib/types";

interface SiteDetailProps {
  site: OpportunitySite;
  activePhase: TimelinePhase;
  onPhaseChange: (phase: TimelinePhase) => void;
}

export function SiteDetail({
  site,
  activePhase,
  onPhaseChange,
}: SiteDetailProps) {
  const phaseContent = getPhaseContent(site, activePhase);
  const phaseMeta =
    TIMELINE_PHASES.find((p) => p.id === activePhase) ?? TIMELINE_PHASES[0];

  return (
    <article
      className="flex flex-col"
      style={{ "--hero-accent": site.accent } as React.CSSProperties}
    >
      <header className="panel-rise px-5 pb-1 pt-8 sm:px-8 sm:pb-2 sm:pt-10">
        <h2 className="font-[family-name:var(--font-instrument-serif)] text-[1.875rem] leading-[1.06] tracking-[-0.02em] text-foreground sm:text-[2.25rem]">
          {site.name}
        </h2>
        {site.isPlaceholder && (
          <p className="mt-2 text-sm text-[var(--panel-muted)]">
            Story in development — explore People&apos;s Park for a complete
            example.
          </p>
        )}
      </header>

      <div className="space-y-12 px-5 pb-24 pt-4 sm:space-y-14 sm:px-8 sm:pb-20 sm:pt-6">
        <section className="panel-rise panel-rise--1 space-y-5">
          <SitePhaseFilter
            activePhase={activePhase}
            onPhaseChange={onPhaseChange}
            isPlaceholder={site.isPlaceholder}
          />
          <PhaseChapter
            siteId={site.id}
            siteName={site.name}
            accent={site.accent}
            phaseLabel={phaseMeta.label}
            activePhase={activePhase}
            content={phaseContent}
          />
        </section>

        <PanelSection
          title={SITE_SECTIONS.ideas}
          className="panel-rise panel-rise--2"
        >
          <PlaceIdeasSection siteId={site.id} ideas={site.ideas} />
        </PanelSection>
      </div>
    </article>
  );
}
