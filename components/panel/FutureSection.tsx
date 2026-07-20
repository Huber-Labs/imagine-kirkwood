"use client";

import { getPerfectForLabels } from "@/lib/concepts/qualities";
import { CivicPointsStepper } from "@/components/panel/CivicPointsStepper";
import { FutureEngagement } from "@/components/panel/FutureEngagement";
import { FutureHero } from "@/components/panel/FutureHero";
import type { OpportunitySite, PlaceFuture } from "@/lib/types";

interface FutureSectionProps {
  site: OpportunitySite;
  future: PlaceFuture;
  showExploreHint?: boolean;
  onExploreOthers?: () => void;
  showHero?: boolean;
  showEyebrow?: boolean;
  placeStory?: {
    today: string;
    whatIf: string;
  } | null;
}

export function FutureSection({
  site,
  future,
  showExploreHint = false,
  onExploreOthers,
  showHero = true,
  showEyebrow = true,
  placeStory = null,
}: FutureSectionProps) {
  const isComingSoon = future.status === "coming-soon";
  const perfectFor = getPerfectForLabels(future);
  const hideTitle = future.title === site.name;

  return (
    <section
      id={`future-${future.id}`}
      className="future-section scroll-mt-4"
      aria-labelledby={`future-title-${future.id}`}
    >
      {!isComingSoon && (
        <div className="civic-points-dock civic-points-dock--concept">
          <CivicPointsStepper siteId={site.id} futureId={future.id} />
        </div>
      )}

      {showEyebrow && (
        <p className="future-section__eyebrow panel-eyebrow">{site.name}</p>
      )}

      {showHero && (
        <div className="-mx-5 sm:-mx-8">
          <FutureHero
            siteName={site.name}
            accent={site.accent}
            image={future.image}
            alt={future.alt}
            isComingSoon={isComingSoon}
          />
        </div>
      )}

      <div
        className={`future-section__body space-y-4 sm:space-y-5 ${
          showHero ? "pt-5 sm:pt-6" : "pt-0"
        }`}
      >
        {placeStory && (
          <section className="place-story space-y-4">
            <p className="place-story__today font-[family-name:var(--font-instrument-serif)] text-[1.0625rem] leading-[1.55] text-foreground/82 sm:text-[1.125rem]">
              {placeStory.today}
            </p>
            <p className="place-story__what-if font-[family-name:var(--font-instrument-serif)] text-[1.25rem] leading-[1.4] tracking-[-0.01em] text-foreground sm:text-[1.375rem]">
              {placeStory.whatIf}
            </p>
          </section>
        )}

        <header className="space-y-2">
          {!hideTitle && (
            <h3
              id={`future-title-${future.id}`}
              className="font-[family-name:var(--font-instrument-serif)] text-[1.5rem] leading-[1.15] tracking-[-0.02em] text-foreground sm:text-[1.75rem]"
            >
              {future.title}
            </h3>
          )}
          {hideTitle && (
            <h3 id={`future-title-${future.id}`} className="sr-only">
              {future.title}
            </h3>
          )}
          <p className="future-section__description text-[0.9375rem] leading-[1.65] text-foreground/78 sm:text-base sm:leading-[1.7]">
            {future.description}
          </p>
        </header>

        {perfectFor.length > 0 && (
          <div className="future-perfect-for">
            <p className="future-perfect-for__label panel-eyebrow">Perfect for</p>
            <ul className="future-perfect-for__list">
              {perfectFor.map((label) => (
                <li key={label}>{label}</li>
              ))}
            </ul>
          </div>
        )}

        {!isComingSoon && (
          <FutureEngagement
            siteId={site.id}
            siteName={site.name}
            future={future}
          />
        )}

        {isComingSoon && (
          <p className="future-section__coming-soon">
            This vision is still taking shape — check back soon.
          </p>
        )}

        {showExploreHint && onExploreOthers && (
          <button
            type="button"
            className="future-section__explore-link"
            onClick={onExploreOthers}
          >
            Explore other futures
            <span aria-hidden="true">↓</span>
          </button>
        )}

        <p className="future-section__disclaimer">
          A speculative idea for conversation — not an approved plan.
        </p>
      </div>
    </section>
  );
}
