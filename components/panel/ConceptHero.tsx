"use client";

import { useState } from "react";
import {
  CONCEPT_PLACEHOLDER_PATH,
  getPrimaryConceptImage,
} from "@/lib/concepts";
import type { InnovationArea } from "@/lib/types";

interface ConceptHeroProps {
  area: InnovationArea;
  embedded?: boolean;
}

export function ConceptHero({ area, embedded = false }: ConceptHeroProps) {
  const slides =
    area.vision.conceptImages ?? [getPrimaryConceptImage(area.id)];
  const [activeSlide] = useState(0);
  const [imageFailed, setImageFailed] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const src = slides[activeSlide] ?? CONCEPT_PLACEHOLDER_PATH;
  const showPlaceholder = imageFailed || !src;

  return (
    <figure className={`relative w-full shrink-0 ${embedded ? "" : "panel-hero-reveal"}`}>
      <div
        className={`concept-hero__frame relative aspect-video w-full overflow-hidden bg-[color-mix(in_srgb,var(--hero-accent)_6%,var(--background))] ${
          embedded ? "md:aspect-[16/9]" : "md:aspect-[16/10]"
        }`}
      >
        <div className="concept-hero__track h-full w-full">
          <div className="concept-hero__slide h-full w-full">
            {showPlaceholder ? (
              <img
                src={CONCEPT_PLACEHOLDER_PATH}
                alt={`Concept rendering for ${area.name}`}
                className="h-full w-full object-cover transition-opacity duration-700 ease-out"
                onLoad={() => setImageLoaded(true)}
              />
            ) : (
              <img
                src={src}
                alt={`Concept rendering for ${area.name}`}
                className={`h-full w-full object-cover transition-opacity duration-700 ease-out ${
                  imageLoaded ? "opacity-100" : "opacity-0"
                }`}
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageFailed(true)}
              />
            )}
          </div>
        </div>
        {!embedded && (
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[var(--background)] to-transparent"
            aria-hidden="true"
          />
        )}
      </div>
    </figure>
  );
}
