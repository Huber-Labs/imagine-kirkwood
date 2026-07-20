"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { CivicPointsBar } from "@/components/panel/CivicPointsStepper";
import { FutureHero } from "@/components/panel/FutureHero";
import { FutureSection } from "@/components/panel/FutureSection";
import {
  findExploreSlideIndex,
  getExploreSlides,
} from "@/lib/engagement/explore-slides";

interface MobileConceptExplorerProps {
  siteId: string;
  conceptId: string;
  onConceptChange: (siteId: string, conceptId: string) => void;
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

  const syncActiveSlide = useCallback(
    (index: number) => {
      const slide = slides[index];
      if (!slide) return;
      setVisibleIndex(index);
      if (slide.siteId === siteId && slide.conceptId === conceptId) return;
      onConceptChange(slide.siteId, slide.conceptId);
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
  }, [activeIndex, siteId, conceptId]);

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

  if (!activeSlide) {
    return null;
  }

  return (
    <article
      className="mobile-concept-explorer flex flex-col"
      style={{ "--hero-accent": activeSlide.site.accent } as React.CSSProperties}
    >
      <div className="civic-points-dock civic-points-dock--site px-5">
        <CivicPointsBar />
      </div>

      <div className="concept-carousel">
        <div className="concept-carousel__header px-5">
          <p className="concept-carousel__hint panel-eyebrow">
            Swipe to explore places
          </p>
          <p className="concept-carousel__counter" aria-live="polite">
            {visibleIndex + 1} / {slides.length}
          </p>
        </div>

        <div
          ref={trackRef}
          className="concept-carousel__track"
          onScroll={handleTrackScroll}
        >
          {slides.map((slide, index) => (
            <div
              key={`${slide.siteId}-${slide.conceptId}`}
              className={`concept-carousel__slide${
                index === visibleIndex ? " concept-carousel__slide--active" : ""
              }`}
              aria-hidden={index !== visibleIndex}
            >
              <p className="concept-carousel__place panel-eyebrow">
                {slide.site.name}
              </p>
              <FutureHero
                siteName={slide.site.name}
                accent={slide.site.accent}
                image={slide.future.image}
                alt={slide.future.alt}
              />
            </div>
          ))}
        </div>

        <div
          className="concept-carousel__dots"
          role="tablist"
          aria-label="Places along Kirkwood"
        >
          {slides.map((slide, index) => (
            <button
              key={`${slide.siteId}-${slide.conceptId}-dot`}
              type="button"
              role="tab"
              aria-selected={index === visibleIndex}
              aria-label={slide.site.name}
              className={`concept-carousel__dot${
                index === visibleIndex ? " concept-carousel__dot--active" : ""
              }`}
              onClick={() => syncActiveSlide(index)}
            />
          ))}
        </div>
      </div>

      <div className="mobile-concept-explorer__body px-5 pb-24 pt-4">
        <FutureSection
          key={`${activeSlide.siteId}-${activeSlide.conceptId}`}
          site={activeSlide.site}
          future={activeSlide.future}
          showHero={false}
          showEyebrow={false}
        />
      </div>
    </article>
  );
}
