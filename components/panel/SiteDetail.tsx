"use client";

import { useState } from "react";
import { IdeaCard } from "@/components/cards/IdeaCard";
import { ObservationCard } from "@/components/cards/ObservationCard";
import { Button } from "@/components/ui/Button";
import { PanelSection } from "@/components/panel/PanelSection";
import { PrecedentCard, TodayPhoto } from "@/components/panel/StoryMedia";
import { SiteConceptHero } from "@/components/panel/SiteConceptHero";
import { getInnovationAreaById } from "@/lib/data/innovation-areas";
import {
  getPhaseContent,
  isSiteToday,
} from "@/lib/data/opportunity-sites";
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
  const phaseLabel =
    TIMELINE_PHASES.find((p) => p.id === activePhase)?.label ?? activePhase;

  const handleShare = () => {
    if (!inspirationText.trim()) return;
    setShared(true);
  };

  return (
    <article
      className="flex flex-col"
      style={{ "--hero-accent": site.accent } as React.CSSProperties}
    >
      <header className="panel-rise px-8 pb-2 pt-10 space-y-4">
        {area && (
          <p className="panel-eyebrow">
            {area.name} · {CATEGORY_LABELS[area.category]}
          </p>
        )}
        <h2 className="font-[family-name:var(--font-instrument-serif)] text-[2rem] leading-[1.08] tracking-[-0.01em] text-foreground md:text-[2.125rem]">
          {site.name}
        </h2>
        {site.isPlaceholder && (
          <p className="text-sm text-[var(--panel-muted)]">
            Story in development — explore People&apos;s Park for a complete
            example.
          </p>
        )}
      </header>

      <div className="space-y-[4.5rem] px-8 pb-20 pt-6">
        <PanelSection title={phaseLabel} className="panel-rise panel-rise--1">
          {isSiteToday(phaseContent) ? (
            <div className="space-y-6">
              <p className="font-[family-name:var(--font-instrument-serif)] text-[1.125rem] leading-[1.55] text-foreground/80">
                {phaseContent.summary}
              </p>
              <TodayPhoto
                siteId={site.id}
                siteName={site.name}
                photoPath={phaseContent.photo}
              />
              {phaseContent.description && (
                <p className="text-[0.9375rem] leading-[1.85] text-foreground/65">
                  {phaseContent.description}
                </p>
              )}
              {phaseContent.stats && phaseContent.stats.length > 0 && (
                <dl>
                  {phaseContent.stats.map((stat) => (
                    <div key={stat.label} className="panel-stat-row">
                      <dt>{stat.label}</dt>
                      <dd>{stat.value}</dd>
                    </div>
                  ))}
                </dl>
              )}
              {phaseContent.observations &&
                phaseContent.observations.length > 0 && (
                  <div className="space-y-5">
                    {phaseContent.observations.map((obs) => (
                      <ObservationCard
                        key={obs.id}
                        observation={obs}
                        variant="editorial"
                      />
                    ))}
                  </div>
                )}
            </div>
          ) : (
            <div className="-mx-8 space-y-7">
              <SiteConceptHero
                siteId={site.id}
                siteName={site.name}
                accent={site.accent}
                conceptImages={phaseContent.conceptImages}
              />
              <div className="space-y-5 px-8">
                <p className="font-[family-name:var(--font-instrument-serif)] text-[1.625rem] leading-[1.2] tracking-[-0.01em] text-foreground">
                  {phaseContent.northStar}
                </p>
                {phaseContent.paragraphs.map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-[0.9375rem] leading-[1.85] text-foreground/75"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          )}
        </PanelSection>

        {site.precedents.length > 0 && (
          <PanelSection
            title={SITE_SECTIONS.precedents}
            className="panel-rise panel-rise--2"
          >
            <div className="space-y-10">
              {site.precedents.map((precedent) => (
                <PrecedentCard
                  key={precedent.id}
                  siteId={site.id}
                  precedent={precedent}
                />
              ))}
            </div>
          </PanelSection>
        )}

        <PanelSection
          title={SITE_SECTIONS.community}
          className="panel-rise panel-rise--3"
        >
          <div className="space-y-8">
            <p className="text-[0.9375rem] leading-[1.85] text-foreground/65">
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
