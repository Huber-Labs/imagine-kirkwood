"use client";

import { TodayPhoto } from "@/components/panel/StoryMedia";
import { SiteConceptHero } from "@/components/panel/SiteConceptHero";
import { isSiteToday } from "@/lib/data/opportunity-sites";
import type {
  SitePhaseContent,
  SiteToday,
  TimelinePhase,
} from "@/lib/types";

interface PhaseChapterProps {
  siteId: string;
  siteName: string;
  accent: string;
  phaseLabel: string;
  activePhase: TimelinePhase;
  content: SiteToday | SitePhaseContent;
}

export function PhaseChapter({
  siteId,
  siteName,
  accent,
  phaseLabel,
  activePhase,
  content,
}: PhaseChapterProps) {
  const isToday = isSiteToday(content);
  const chapterTitle =
    content.chapterTitle ??
    (isToday
      ? content.narrative
      : (content as SitePhaseContent).northStar ?? phaseLabel);
  const narrative =
    content.narrative ??
    (isToday ? (content as SiteToday).summary : "") ??
    "";

  return (
    <div className="phase-chapter space-y-5 sm:space-y-6">
      <div className="-mx-5 sm:-mx-8">
        {isToday ? (
          <TodayPhoto
            siteId={siteId}
            siteName={siteName}
            photoPath={(content as SiteToday).photo}
          />
        ) : (
          <SiteConceptHero
            siteId={siteId}
            siteName={siteName}
            accent={accent}
            activePhase={activePhase as Exclude<TimelinePhase, "today">}
            conceptImages={(content as SitePhaseContent).conceptImages}
          />
        )}
      </div>

      <header className="phase-chapter__head space-y-2">
        <p className="panel-eyebrow">{phaseLabel}</p>
        <h3 className="font-[family-name:var(--font-instrument-serif)] text-[1.375rem] leading-[1.2] tracking-[-0.01em] text-foreground sm:text-[1.5rem]">
          {chapterTitle}
        </h3>
      </header>

      <p className="phase-chapter__lead font-[family-name:var(--font-instrument-serif)] text-[1.0625rem] leading-[1.5] text-foreground/88 sm:text-[1.125rem] sm:leading-[1.55]">
        {narrative}
      </p>
    </div>
  );
}
