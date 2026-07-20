"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { Button } from "@/components/ui/Button";
import { CONCEPT_PLACEHOLDER_PATH } from "@/lib/concepts";
import { buildExploreUrl } from "@/lib/engagement/explore-url";
import { DEFAULT_EXPLORE_SITE_ID } from "@/lib/engagement/explore-slides";
import {
  EXHIBITION_HERO_INTERVAL_MS,
  EXHIBITION_HERO_STAGES,
} from "@/lib/exhibition/hero-stages";

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPrefersReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return prefersReducedMotion;
}

export function ExhibitionHero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [failedSrcs, setFailedSrcs] = useState<Set<string>>(() => new Set());
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    EXHIBITION_HERO_STAGES.forEach((stage) => {
      const img = new window.Image();
      img.src = stage.src;
    });
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || EXHIBITION_HERO_STAGES.length <= 1) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % EXHIBITION_HERO_STAGES.length);
    }, EXHIBITION_HERO_INTERVAL_MS);

    return () => window.clearInterval(interval);
  }, [prefersReducedMotion]);

  return (
    <section
      className="relative flex min-h-dvh flex-col justify-center overflow-hidden"
      aria-label="Imagine Kirkwood exhibition entrance"
      style={
        {
          "--exhibition-hero-duration": `${EXHIBITION_HERO_INTERVAL_MS}ms`,
        } as CSSProperties
      }
    >
      <div className="absolute inset-0">
        {EXHIBITION_HERO_STAGES.map((stage, index) => {
          const isActive = index === activeIndex;
          const src = failedSrcs.has(stage.src) ? CONCEPT_PLACEHOLDER_PATH : stage.src;

          return (
            <div
              key={stage.id}
              className={`exhibition-hero__slide absolute inset-0 ${
                isActive ? "exhibition-hero__slide--active opacity-100" : "opacity-0"
              } ${isActive && !prefersReducedMotion ? "exhibition-hero__slide--ken-burns" : ""}`}
              aria-hidden={!isActive}
            >
              <img
                src={src}
                alt={isActive ? stage.alt : ""}
                className="h-full w-full object-cover object-center"
                onError={() => {
                  setFailedSrcs((prev) => new Set(prev).add(stage.src));
                }}
              />
            </div>
          );
        })}
        <div className="exhibition-hero__overlay absolute inset-0" aria-hidden="true" />
      </div>

      <div className="exhibition-rise relative mx-auto w-full max-w-2xl px-8 pt-[12vh] pb-12 text-center sm:text-left md:pb-16">
        <p className="exhibition-hero__eyebrow mb-5">
          A visual exhibition for downtown Bloomington
        </p>
        <h1 className="font-[family-name:var(--font-instrument-serif)] text-[2.5rem] leading-[1.05] tracking-[-0.02em] text-white md:text-[4.5rem]">
          What could Kirkwood become?
        </h1>
        <p className="mx-auto mt-5 max-w-md text-[1rem] leading-[1.65] text-white/75 sm:mx-0 md:text-[1.0625rem] md:leading-[1.7]">
          One concept for each place along Kirkwood Avenue — streets, parks,
          plazas, and gathering spaces.
        </p>
        <div className="mt-8 flex justify-center sm:mt-10 sm:justify-start">
          <Button href={buildExploreUrl(DEFAULT_EXPLORE_SITE_ID)}>
            Explore the Map
          </Button>
        </div>
      </div>
    </section>
  );
}
