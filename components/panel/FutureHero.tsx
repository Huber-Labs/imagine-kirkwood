"use client";

import { useState } from "react";
import { CONCEPT_PLACEHOLDER_PATH } from "@/lib/concepts";

interface FutureHeroProps {
  siteName: string;
  accent: string;
  image: string;
  alt: string;
  isComingSoon?: boolean;
}

export function FutureHero({
  siteName,
  accent,
  image,
  alt,
  isComingSoon = false,
}: FutureHeroProps) {
  const src = image || CONCEPT_PLACEHOLDER_PATH;
  const imageKey = `${src}-${isComingSoon}`;
  const [failedKey, setFailedKey] = useState<string | null>(null);

  const imageFailed = failedKey === imageKey;
  const showPlaceholder = imageFailed || !src || isComingSoon;

  return (
    <figure
      className="future-hero relative w-full shrink-0"
      style={{ "--hero-accent": accent } as React.CSSProperties}
    >
      <div className="future-hero__frame relative aspect-[4/3] w-full overflow-hidden bg-[color-mix(in_srgb,var(--hero-accent)_6%,var(--background))] sm:aspect-[16/10]">
        {showPlaceholder ? (
          <img
            src={CONCEPT_PLACEHOLDER_PATH}
            alt={alt || `Rendering coming soon for ${siteName}`}
            className="h-full w-full object-cover object-[center_40%] opacity-80"
          />
        ) : (
          <img
            key={imageKey}
            src={src}
            alt={alt}
            loading="eager"
            decoding="async"
            className="h-full w-full object-cover object-[center_40%]"
            onError={() => setFailedKey(imageKey)}
          />
        )}
        {isComingSoon && (
          <div className="future-hero__badge">Rendering coming soon</div>
        )}
      </div>
    </figure>
  );
}
