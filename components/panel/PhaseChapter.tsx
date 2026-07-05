"use client";

import { ObservationCard } from "@/components/cards/ObservationCard";
import { ConfidenceIndicator } from "@/components/panel/ConfidenceIndicator";
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
  confidenceLevel: 1 | 2 | 3 | 4;
  content: SiteToday | SitePhaseContent;
}

export function PhaseChapter({
  siteId,
  siteName,
  accent,
  phaseLabel,
  activePhase,
  confidenceLevel,
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
  const extraParagraphs = isToday ? [] : (content.paragraphs ?? []);

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

      <div className="phase-chapter__body space-y-5">
        <p className="phase-chapter__lead font-[family-name:var(--font-instrument-serif)] text-[1.0625rem] leading-[1.5] text-foreground/88 sm:text-[1.125rem] sm:leading-[1.55]">
          {narrative}
        </p>

        {extraParagraphs.map((paragraph, index) => (
          <p
            key={index}
            className="text-[0.875rem] leading-[1.75] text-foreground/68 sm:text-[0.9375rem] sm:leading-[1.8]"
          >
            {paragraph}
          </p>
        ))}

        {content.improvements.length > 0 && (
          <div className="phase-chapter__improvements space-y-3 pt-1">
            <p className="panel-eyebrow">
              {isToday ? "What's missing" : "What changes"}
            </p>
            <ul className="phase-chapter__list">
              {content.improvements.map((item) => (
                <li key={item} className="phase-chapter__list-item">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {isToday && (content as SiteToday).stats && (
          <dl className="phase-chapter__stats">
            {(content as SiteToday).stats!.map((stat) => (
              <div key={stat.label} className="panel-stat-row">
                <dt>{stat.label}</dt>
                <dd>{stat.value}</dd>
              </div>
            ))}
          </dl>
        )}

        {isToday &&
          (content as SiteToday).observations &&
          (content as SiteToday).observations!.length > 0 && (
            <div className="space-y-4 pt-1">
              <p className="panel-eyebrow">On the ground</p>
              {(content as SiteToday).observations!.map((obs) => (
                <ObservationCard
                  key={obs.id}
                  observation={obs}
                  variant="editorial"
                />
              ))}
            </div>
          )}

        {!isToday && (
          <div className="phase-chapter__meta">
            <div className="phase-chapter__meta-item">
              <span className="phase-chapter__meta-label">Timeline</span>
              <span className="phase-chapter__meta-value">
                {content.timeline}
              </span>
            </div>
            <div className="phase-chapter__meta-item">
              <span className="phase-chapter__meta-label">Investment</span>
              <span className="phase-chapter__meta-value">
                {content.investment}
              </span>
            </div>
            <div className="phase-chapter__meta-item">
              <span className="phase-chapter__meta-label">Confidence</span>
              <ConfidenceIndicator
                level={confidenceLevel}
                label={content.confidence}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
