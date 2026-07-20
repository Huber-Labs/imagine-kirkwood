"use client";

import { ConceptComments } from "@/components/panel/ConceptComments";
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
  headline?: "site" | "concept";
  showConceptSubtitle?: boolean;
}

export function FutureSection({
  site,
  future,
  showExploreHint = false,
  onExploreOthers,
  showHero = true,
  showEyebrow = true,
  placeStory = null,
  headline = "concept",
  showConceptSubtitle = false,
}: FutureSectionProps) {
  const isComingSoon = future.status === "coming-soon";
  const showSiteName = headline === "site";
  const hideConceptTitle = !showSiteName && future.title === site.name;
  const headingClassName =
    "font-[family-name:var(--font-instrument-serif)] text-[1.5rem] leading-[1.15] tracking-[-0.02em] text-foreground sm:text-[1.75rem]";
  const conceptSubtitleClassName =
    "future-section__concept-subtitle font-[family-name:var(--font-instrument-serif)] text-[1.125rem] leading-[1.25] tracking-[-0.015em] text-foreground/88 sm:text-[1.25rem]";

  return (
    <section
      id={`future-${future.id}`}
      className="future-section scroll-mt-4"
      aria-labelledby={`future-title-${future.id}`}
    >
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
            siteId={site.id}
            futureId={future.id}
            showVoting={!isComingSoon}
          />
        </div>
      )}

      <div
        className={`future-section__body space-y-4 sm:space-y-5 ${
          showHero ? "pt-5 sm:pt-6" : "pt-0"
        }`}
      >
        {placeStory && (
          <section className="place-story">
            <p className="place-story__what-if font-[family-name:var(--font-instrument-serif)] text-[1.25rem] leading-[1.4] tracking-[-0.01em] text-foreground sm:text-[1.375rem]">
              {placeStory.whatIf}
            </p>
          </section>
        )}

        <header className="space-y-2">
          {showSiteName && (
            <h3 id={`future-title-${future.id}`} className={headingClassName}>
              {site.name}
            </h3>
          )}
          {!showSiteName && !hideConceptTitle && (
            <h3 id={`future-title-${future.id}`} className={headingClassName}>
              {future.title}
            </h3>
          )}
          {!showSiteName && hideConceptTitle && (
            <h3 id={`future-title-${future.id}`} className="sr-only">
              {future.title}
            </h3>
          )}
          {showSiteName && future.title !== site.name && !showConceptSubtitle && (
            <p className="sr-only">{future.title}</p>
          )}
          {showSiteName && showConceptSubtitle && future.title !== site.name && (
            <p className={conceptSubtitleClassName}>{future.title}</p>
          )}
          <p className="future-section__description text-[0.9375rem] leading-[1.65] text-foreground/78 sm:text-base sm:leading-[1.7]">
            {future.description}
          </p>
        </header>

        {!isComingSoon && (
          <FutureEngagement
            siteId={site.id}
            siteName={site.name}
            future={future}
          />
        )}

        {!isComingSoon && (
          <ConceptComments siteId={site.id} futureId={future.id} />
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
