"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { CONCEPT_PLACEHOLDER_PATH } from "@/lib/concepts";
import { CivicPointsStepper } from "@/components/panel/CivicPointsStepper";

interface FutureHeroProps {
  siteName: string;
  accent: string;
  image: string;
  alt: string;
  isComingSoon?: boolean;
  siteId?: string;
  futureId?: string;
  showVoting?: boolean;
  immersive?: boolean;
}

function HeroLightbox({
  src,
  alt,
  onClose,
}: {
  src: string;
  alt: string;
  onClose: () => void;
}) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="hero-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={`Full screen view — ${alt}`}
    >
      <button
        type="button"
        className="hero-lightbox__backdrop"
        aria-label="Close full screen image"
        onClick={onClose}
      />
      <img src={src} alt={alt} className="hero-lightbox__image" />
      <button
        type="button"
        className="hero-lightbox__close"
        aria-label="Close"
        onClick={onClose}
      >
        ×
      </button>
    </div>
  );
}

export function FutureHero({
  siteName,
  accent,
  image,
  alt,
  isComingSoon = false,
  siteId,
  futureId,
  showVoting = false,
  immersive = false,
}: FutureHeroProps) {
  const src = image || CONCEPT_PLACEHOLDER_PATH;
  const imageKey = `${src}-${isComingSoon}`;
  const [failedKey, setFailedKey] = useState<string | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const imageFailed = failedKey === imageKey;
  const showPlaceholder = imageFailed || !src || isComingSoon;
  const lightboxSrc = showPlaceholder ? CONCEPT_PLACEHOLDER_PATH : src;
  const canVote = showVoting && siteId && futureId && !isComingSoon;

  const openLightbox = useCallback(() => {
    setLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  return (
    <>
      <figure
        className="future-hero relative w-full shrink-0"
        style={{ "--hero-accent": accent } as React.CSSProperties}
      >
        <div
          className={
            immersive
              ? "future-hero__frame future-hero__frame--immersive relative w-full overflow-hidden bg-[color-mix(in_srgb,var(--hero-accent)_6%,var(--background))]"
              : "future-hero__frame relative aspect-[4/3] w-full overflow-hidden bg-[color-mix(in_srgb,var(--hero-accent)_6%,var(--background))] sm:aspect-[16/10]"
          }
        >
          <button
            type="button"
            className="future-hero__zoom"
            aria-label={`View full screen — ${alt || siteName}`}
            onClick={openLightbox}
          >
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
          </button>

          {canVote && (
            <div className="future-hero__voting">
              <CivicPointsStepper
                siteId={siteId}
                futureId={futureId}
                variant="overlay"
              />
            </div>
          )}

          {isComingSoon && (
            <div className="future-hero__badge">Rendering coming soon</div>
          )}

          {!showPlaceholder && (
            <span className="future-hero__expand-hint" aria-hidden="true">
              Tap to expand
            </span>
          )}
        </div>
      </figure>

      {lightboxOpen &&
        createPortal(
          <HeroLightbox
            src={lightboxSrc}
            alt={alt || siteName}
            onClose={closeLightbox}
          />,
          document.body,
        )}
    </>
  );
}
