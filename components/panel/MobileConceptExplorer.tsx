"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FutureHero } from "@/components/panel/FutureHero";
import { FutureSection } from "@/components/panel/FutureSection";
import {
  findExploreSlideIndex,
  getExploreSlides,
  resolveActiveFuture,
} from "@/lib/engagement/explore-slides";

interface MobileConceptExplorerProps {
  siteId: string;
  conceptId: string;
  onConceptChange: (siteId: string, conceptId: string) => void;
}

function ConceptSwitcher({
  futures,
  activeFutureId,
  onSelect,
}: {
  futures: Array<{ id: string; title: string }>;
  activeFutureId: string;
  onSelect: (futureId: string) => void;
}) {
  if (futures.length <= 1) return null;

  return (
    <div
      className="concept-switcher"
      role="tablist"
      aria-label="Concepts for this place"
    >
      {futures.map((future) => (
        <button
          key={future.id}
          type="button"
          role="tab"
          aria-selected={future.id === activeFutureId}
          className={`concept-switcher__option${
            future.id === activeFutureId ? " concept-switcher__option--active" : ""
          }`}
          onClick={() => onSelect(future.id)}
        >
          {future.title}
        </button>
      ))}
    </div>
  );
}

export function MobileConceptExplorer({
  siteId,
  conceptId,
  onConceptChange,
}: MobileConceptExplorerProps) {
  const slides = useMemo(() => getExploreSlides(), []);
  const activeIndex = findExploreSlideIndex(siteId, conceptId);
  const activeSlide = slides[activeIndex] ?? slides[0];
  const trackRef = useRef<HTMLDivElement | null>(null);
  const programmaticScrollRef = useRef(false);
  const scrollEndTimerRef = useRef<number | null>(null);
  const [visibleIndex, setVisibleIndex] = useState(activeIndex);
  const visibleSlide = slides[visibleIndex] ?? activeSlide;

  const activeFuture = useMemo(() => {
    if (!visibleSlide) return null;
    const isCurrentPlace = visibleSlide.siteId === siteId;
    return resolveActiveFuture(
      visibleSlide.site,
      isCurrentPlace ? conceptId : null,
    );
  }, [conceptId, siteId, visibleSlide]);

  const syncActiveSlide = useCallback(
    (index: number) => {
      const slide = slides[index];
      if (!slide) return;

      setVisibleIndex(index);

      const future = resolveActiveFuture(slide.site, null);
      if (!future) return;

      if (slide.siteId === siteId && future.id === conceptId) return;
      onConceptChange(slide.siteId, future.id);
    },
    [conceptId, onConceptChange, siteId, slides],
  );

  useEffect(() => {
    setVisibleIndex(activeIndex);
  }, [activeIndex]);

  useEffect(() => {
    const track = trackRef.current;
    const target = track?.children[activeIndex] as HTMLElement | undefined;
    if (!track || !target) return;

    programmaticScrollRef.current = true;
    target.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });

    const timer = window.setTimeout(() => {
      programmaticScrollRef.current = false;
    }, 350);

    return () => window.clearTimeout(timer);
  }, [activeIndex]);

  const handleTrackScroll = useCallback(() => {
    if (programmaticScrollRef.current) return;

    if (scrollEndTimerRef.current !== null) {
      window.clearTimeout(scrollEndTimerRef.current);
    }

    scrollEndTimerRef.current = window.setTimeout(() => {
      const track = trackRef.current;
      if (!track) return;

      const trackRect = track.getBoundingClientRect();
      const trackCenter = trackRect.left + trackRect.width / 2;
      let closestIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      Array.from(track.children).forEach((child, index) => {
        const rect = child.getBoundingClientRect();
        const childCenter = rect.left + rect.width / 2;
        const distance = Math.abs(childCenter - trackCenter);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      syncActiveSlide(closestIndex);
    }, 80);
  }, [syncActiveSlide]);

  useEffect(() => {
    return () => {
      if (scrollEndTimerRef.current !== null) {
        window.clearTimeout(scrollEndTimerRef.current);
      }
    };
  }, []);

  const navigateToIndex = useCallback(
    (index: number) => {
      if (index < 0 || index >= slides.length) return;

      syncActiveSlide(index);

      const track = trackRef.current;
      const target = track?.children[index] as HTMLElement | undefined;
      if (!track || !target) return;

      programmaticScrollRef.current = true;
      target.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });

      window.setTimeout(() => {
        programmaticScrollRef.current = false;
      }, 350);
    },
    [slides.length, syncActiveSlide],
  );

  const goToPrevious = useCallback(() => {
    navigateToIndex(visibleIndex - 1);
  }, [navigateToIndex, visibleIndex]);

  const goToNext = useCallback(() => {
    navigateToIndex(visibleIndex + 1);
  }, [navigateToIndex, visibleIndex]);

  const handleConceptSelect = useCallback(
    (futureId: string) => {
      if (!visibleSlide) return;
      onConceptChange(visibleSlide.siteId, futureId);
    },
    [onConceptChange, visibleSlide],
  );

  if (!activeSlide || !activeFuture) {
    return null;
  }

  const displayFuture =
    visibleSlide.siteId === siteId
      ? resolveActiveFuture(visibleSlide.site, conceptId) ?? activeFuture
      : resolveActiveFuture(visibleSlide.site, null) ?? activeFuture;

  const heroFutureBySlide = (slideIndex: number) => {
    const slide = slides[slideIndex];
    if (!slide) return null;
    if (slide.siteId === siteId && slideIndex === visibleIndex) {
      return displayFuture;
    }
    return resolveActiveFuture(slide.site, null);
  };

  return (
    <article
      className="mobile-concept-explorer flex flex-col"
      style={{ "--hero-accent": visibleSlide.site.accent } as React.CSSProperties}
    >
      <div className="concept-carousel">
        <div className="concept-carousel__stage">
          <div
            ref={trackRef}
            className="concept-carousel__track"
            onScroll={handleTrackScroll}
          >
            {slides.map((slide, index) => {
              const slideFuture = heroFutureBySlide(index);
              if (!slideFuture) return null;

              return (
                <div
                  key={slide.siteId}
                  className={`concept-carousel__slide${
                    index === visibleIndex ? " concept-carousel__slide--active" : ""
                  }`}
                  aria-hidden={index !== visibleIndex}
                >
                  <FutureHero
                    siteName={slide.site.name}
                    accent={slide.site.accent}
                    image={slideFuture.image}
                    alt={slideFuture.alt}
                    siteId={slide.siteId}
                    futureId={slideFuture.id}
                    showVoting
                    immersive
                  />
                </div>
              );
            })}
          </div>

          <p
            className="concept-carousel__counter concept-carousel__counter--top"
            aria-live="polite"
          >
            {visibleIndex + 1} / {slides.length}
          </p>

          {visibleIndex > 0 && (
            <button
              type="button"
              className="concept-carousel__nav concept-carousel__nav--prev"
              aria-label="Previous place"
              onClick={goToPrevious}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path
                  d="M10 3L5 8L10 13"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}

          {visibleIndex < slides.length - 1 && (
            <button
              type="button"
              className="concept-carousel__nav concept-carousel__nav--next"
              aria-label="Next place"
              onClick={goToNext}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path
                  d="M6 3L11 8L6 13"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}

          <div className="concept-carousel__chrome">
            {visibleSlide.futures.length > 1 && displayFuture && (
              <ConceptSwitcher
                futures={visibleSlide.futures}
                activeFutureId={displayFuture.id}
                onSelect={handleConceptSelect}
              />
            )}
            <div
              className="concept-carousel__dots"
              role="tablist"
              aria-label="Places along Kirkwood"
            >
              {slides.map((slide, index) => (
                <button
                  key={`${slide.siteId}-dot`}
                  type="button"
                  role="tab"
                  aria-selected={index === visibleIndex}
                  aria-label={slide.site.name}
                  className={`concept-carousel__dot${
                    index === visibleIndex ? " concept-carousel__dot--active" : ""
                  }`}
                  onClick={() => navigateToIndex(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mobile-concept-explorer__body px-5 pb-24 pt-4">
        {displayFuture && (
          <FutureSection
            key={`${visibleSlide.siteId}-${displayFuture.id}`}
            site={visibleSlide.site}
            future={displayFuture}
            showHero={false}
            showEyebrow={false}
            headline="site"
            showConceptSubtitle={visibleSlide.futures.length > 1}
          />
        )}
      </div>
    </article>
  );
}
