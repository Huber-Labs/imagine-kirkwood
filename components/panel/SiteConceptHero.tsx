"use client";

import { useState } from "react";
import {
  CONCEPT_PLACEHOLDER_PATH,
  getSiteConceptImage,
} from "@/lib/concepts";
import type { TimelinePhase } from "@/lib/types";

interface SiteConceptHeroProps {
  siteId: string;
  siteName: string;
  accent: string;
  activePhase: Exclude<TimelinePhase, "today">;
  conceptImages?: string[];
  embedded?: boolean;
}

export function SiteConceptHero({
  siteId,
  siteName,
  accent,
  activePhase,
  conceptImages,
  embedded = true,
}: SiteConceptHeroProps) {
  const slides = conceptImages ?? [getSiteConceptImage(siteId, activePhase)];
  const [activeSlide] = useState(0);
  const [imageFailed, setImageFailed] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const src = slides[activeSlide] ?? CONCEPT_PLACEHOLDER_PATH;
  const showPlaceholder = imageFailed || !src;

  return (
    <figure
      className={`relative w-full shrink-0 ${embedded ? "" : "panel-hero-reveal"}`}
      style={{ "--hero-accent": accent } as React.CSSProperties}
    >
      <div
        className={`concept-hero__frame relative aspect-[4/3] max-h-[34vh] w-full overflow-hidden bg-[color-mix(in_srgb,var(--hero-accent)_6%,var(--background))] sm:max-h-none sm:aspect-[16/10] ${
          embedded ? "" : "md:aspect-[16/10]"
        }`}
      >
        <div className="concept-hero__track h-full w-full">
          <div className="concept-hero__slide h-full w-full">
            {showPlaceholder ? (
              <img
                src={CONCEPT_PLACEHOLDER_PATH}
                alt={`Concept rendering for ${siteName}`}
                className="h-full w-full object-cover object-[center_40%] transition-opacity duration-700 ease-out"
                onLoad={() => setImageLoaded(true)}
              />
            ) : (
              <img
                src={src}
                alt={`Concept rendering for ${siteName}`}
                className={`h-full w-full object-cover object-[center_40%] transition-opacity duration-700 ease-out ${
                  imageLoaded ? "opacity-100" : "opacity-0"
                }`}
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageFailed(true)}
              />
            )}
          </div>
        </div>
      </div>
    </figure>
  );
}
