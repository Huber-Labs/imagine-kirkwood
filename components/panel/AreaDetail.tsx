"use client";

import { useState } from "react";
import { IdeaCard } from "@/components/cards/IdeaCard";
import { ObservationCard } from "@/components/cards/ObservationCard";
import { Button } from "@/components/ui/Button";
import { ConceptHero } from "@/components/panel/ConceptHero";
import { PanelSection } from "@/components/panel/PanelSection";
import { PhaseBadge } from "@/components/panel/PhaseBadge";
import { PrecedentCard, TodayPhoto } from "@/components/panel/StoryMedia";
import {
  CATEGORY_LABELS,
  STORY_SECTIONS,
  type InnovationArea,
} from "@/lib/types";

interface AreaDetailProps {
  area: InnovationArea;
}

export function AreaDetail({ area }: AreaDetailProps) {
  const [inspirationText, setInspirationText] = useState("");
  const [shared, setShared] = useState(false);

  const handleShare = () => {
    if (!inspirationText.trim()) return;
    setShared(true);
  };

  return (
    <article
      className="flex flex-col"
      style={{ "--hero-accent": area.accent } as React.CSSProperties}
    >
      <header className="panel-rise px-8 pb-2 pt-10 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
          <p className="panel-eyebrow">
            Block {area.block} · {CATEGORY_LABELS[area.category]}
          </p>
          <PhaseBadge phase={area.phase} />
        </div>
        <h2 className="font-[family-name:var(--font-instrument-serif)] text-[2rem] leading-[1.08] tracking-[-0.01em] text-foreground md:text-[2.125rem]">
          {area.name}
        </h2>
      </header>

      <div className="space-y-[4.5rem] px-8 pb-20 pt-6">
        <PanelSection title={STORY_SECTIONS.today} className="panel-rise panel-rise--1">
          <div className="space-y-6">
            <p className="font-[family-name:var(--font-instrument-serif)] text-[1.125rem] leading-[1.55] text-foreground/80">
              {area.today.summary}
            </p>
            <TodayPhoto
              areaId={area.id}
              areaName={area.name}
              photoPath={area.today.photo}
            />
            {area.today.observations && area.today.observations.length > 0 && (
              <div className="space-y-5">
                {area.today.observations.map((obs) => (
                  <ObservationCard
                    key={obs.id}
                    observation={obs}
                    variant="editorial"
                  />
                ))}
              </div>
            )}
          </div>
        </PanelSection>

        <PanelSection title={STORY_SECTIONS.imagine} className="panel-rise panel-rise--2">
          <div className="-mx-8 space-y-7">
            <ConceptHero area={area} embedded />
            <div className="space-y-5 px-8">
              <p className="font-[family-name:var(--font-instrument-serif)] text-[1.625rem] leading-[1.2] tracking-[-0.01em] text-foreground">
                {area.vision.northStar}
              </p>
              {area.vision.paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-[0.9375rem] leading-[1.85] text-foreground/75"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </PanelSection>

        <PanelSection
          title={STORY_SECTIONS.aroundTheWorld}
          className="panel-rise panel-rise--3"
        >
          <div className="space-y-10">
            {area.precedents.slice(0, 3).map((precedent) => (
              <PrecedentCard
                key={precedent.id}
                areaId={area.id}
                precedent={precedent}
              />
            ))}
          </div>
        </PanelSection>

        <PanelSection
          title={STORY_SECTIONS.imagineWithUs}
          className="panel-rise panel-rise--4"
        >
          <div className="space-y-8">
            <p className="text-[0.9375rem] leading-[1.85] text-foreground/65">
              {area.imagineWithUs.prompt}
            </p>

            <div className="space-y-6">
              <p className="panel-eyebrow">Ideas on the table</p>
              <div className="space-y-6">
                {area.ideas.map((idea) => (
                  <IdeaCard key={idea.id} idea={idea} variant="editorial" />
                ))}
              </div>
            </div>

            {shared ? (
              <p className="font-[family-name:var(--font-instrument-serif)] text-[1rem] leading-[1.6] text-foreground">
                Thank you — your story helps others see what&apos;s possible
                here.
              </p>
            ) : (
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
            )}

            <div className="space-y-4 pt-2">
              <p className="panel-eyebrow">Stories from neighbors</p>
              <div className="space-y-4">
                {area.imagineWithUs.examples.map((example, index) => (
                  <p
                    key={index}
                    className="font-[family-name:var(--font-instrument-serif)] text-[0.9375rem] leading-[1.65] text-foreground/60"
                  >
                    &ldquo;{example}&rdquo;
                  </p>
                ))}
              </div>
            </div>
          </div>
        </PanelSection>

        <PanelSection
          title={STORY_SECTIONS.learnMore}
          className="panel-rise panel-rise--5"
        >
          <div className="space-y-6">
            <p className="text-[0.9375rem] leading-[1.85] text-foreground/65">
              {area.today.description}
            </p>
            <dl>
              {area.today.stats.map((stat) => (
                <div key={stat.label} className="panel-stat-row">
                  <dt>{stat.label}</dt>
                  <dd>{stat.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </PanelSection>
      </div>
    </article>
  );
}
