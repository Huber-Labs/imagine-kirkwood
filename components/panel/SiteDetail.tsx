"use client";

import { useState } from "react";
import { IdeaCard } from "@/components/cards/IdeaCard";
import { Button } from "@/components/ui/Button";
import { PanelSection } from "@/components/panel/PanelSection";
import { PhaseChapter } from "@/components/panel/PhaseChapter";
import { PrecedentCard } from "@/components/panel/StoryMedia";
import { SmallWinsSection } from "@/components/panel/SmallWinsSection";
import { getInnovationAreaById } from "@/lib/data/innovation-areas";
import { getPhaseContent } from "@/lib/data/opportunity-sites";
import {
  CATEGORY_LABELS,
  SITE_SECTIONS,
  TIMELINE_PHASES,
  type OpportunitySite,
  type TimelinePhase,
} from "@/lib/types";

interface SiteDetailProps {
  site: OpportunitySite;
  activePhase: TimelinePhase;
}

export function SiteDetail({ site, activePhase }: SiteDetailProps) {
  const [inspirationText, setInspirationText] = useState("");
  const [shared, setShared] = useState(false);
  const area = getInnovationAreaById(site.areaId);
  const phaseContent = getPhaseContent(site, activePhase);
  const phaseMeta =
    TIMELINE_PHASES.find((p) => p.id === activePhase) ?? TIMELINE_PHASES[0];

  const handleShare = () => {
    if (!inspirationText.trim()) return;
    setShared(true);
  };

  return (
    <article
      className="flex flex-col"
      style={{ "--hero-accent": site.accent } as React.CSSProperties}
    >
      <header className="panel-rise px-5 pb-1 pt-8 space-y-2 sm:px-8 sm:pb-2 sm:pt-10 sm:space-y-3">
        {area && (
          <p className="panel-eyebrow">
            {area.name} · {CATEGORY_LABELS[area.category]}
          </p>
        )}
        <h2 className="font-[family-name:var(--font-instrument-serif)] text-[1.875rem] leading-[1.06] tracking-[-0.02em] text-foreground sm:text-[2.25rem]">
          {site.name}
        </h2>
        {site.isPlaceholder && (
          <p className="text-sm text-[var(--panel-muted)]">
            Story in development — explore People&apos;s Park for a complete
            example.
          </p>
        )}
      </header>

      <div className="space-y-12 px-5 pb-24 pt-4 sm:space-y-14 sm:px-8 sm:pb-20 sm:pt-6">
        <section className="panel-rise panel-rise--1">
          <PhaseChapter
            siteId={site.id}
            siteName={site.name}
            accent={site.accent}
            phaseLabel={phaseMeta.label}
            activePhase={activePhase}
            confidenceLevel={phaseMeta.confidenceLevel}
            content={phaseContent}
          />
        </section>

        {site.smallWins && site.smallWins.length > 0 && (
          <PanelSection
            title={SITE_SECTIONS.smallWins}
            className="panel-rise panel-rise--2"
          >
            <SmallWinsSection wins={site.smallWins} />
          </PanelSection>
        )}

        {site.precedents.length > 0 && (
          <PanelSection
            title={SITE_SECTIONS.precedents}
            className="panel-rise panel-rise--3"
          >
            <div className="space-y-8 sm:space-y-10">
              {site.precedents.map((precedent, index) => (
                <PrecedentCard
                  key={precedent.id}
                  siteId={site.id}
                  precedentIndex={index + 1}
                  precedent={precedent}
                />
              ))}
            </div>
          </PanelSection>
        )}

        <PanelSection
          title={SITE_SECTIONS.community}
          className="panel-rise panel-rise--4"
        >
          <div className="space-y-6 sm:space-y-8">
            <p className="text-[0.875rem] leading-[1.75] text-foreground/62 sm:text-[0.9375rem] sm:leading-[1.8]">
              {site.community.prompt}
            </p>

            {site.community.ideas && site.community.ideas.length > 0 && (
              <div className="space-y-6">
                <p className="panel-eyebrow">Ideas on the table</p>
                <div className="space-y-6">
                  {site.community.ideas.map((idea) => (
                    <IdeaCard key={idea.id} idea={idea} variant="editorial" />
                  ))}
                </div>
              </div>
            )}

            {shared ? (
              <p className="font-[family-name:var(--font-instrument-serif)] text-[1rem] leading-[1.6] text-foreground">
                Thank you — your story helps others see what&apos;s possible
                here.
              </p>
            ) : (
              !site.isPlaceholder && (
                <>
                  <textarea
                    value={inspirationText}
                    onChange={(e) => setInspirationText(e.target.value)}
                    placeholder="Share a place you love, a photo that inspires you, or a moment that stayed with you…"
                    rows={4}
                    className="w-full resize-none rounded-lg border border-transparent bg-foreground/[0.04] px-4 py-3.5 text-[0.9375rem] leading-relaxed text-foreground placeholder:text-[var(--panel-muted)] transition-colors focus-visible:border-border focus-visible:bg-background focus-visible:outline-none"
                  />
                  <Button
                    onClick={handleShare}
                    variant="ghost"
                    className="w-full border-foreground/15"
                  >
                    Share Your Inspiration
                  </Button>
                </>
              )
            )}

            {site.community.examples.length > 0 && (
              <div className="space-y-4 pt-2">
                <p className="panel-eyebrow">Stories from neighbors</p>
                <div className="space-y-4">
                  {site.community.examples.map((example, index) => (
                    <p
                      key={index}
                      className="font-[family-name:var(--font-instrument-serif)] text-[0.9375rem] leading-[1.65] text-foreground/60"
                    >
                      &ldquo;{example}&rdquo;
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>
        </PanelSection>
      </div>
    </article>
  );
}
