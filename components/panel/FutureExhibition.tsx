"use client";

import { useEffect, useRef } from "react";
import { FutureSection } from "@/components/panel/FutureSection";
import { getPublishedFutures } from "@/lib/data/opportunity-sites";
import type { OpportunitySite } from "@/lib/types";

interface FutureExhibitionProps {
  site: OpportunitySite;
  focusedConceptId: string | null;
}

export function FutureExhibition({
  site,
  focusedConceptId,
}: FutureExhibitionProps) {
  const futures = getPublishedFutures(site);
  const isDeepLink = focusedConceptId !== null;
  const othersRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!focusedConceptId) return;

    const frame = window.requestAnimationFrame(() => {
      document
        .getElementById(`future-${focusedConceptId}`)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [focusedConceptId, site.id]);

  const focusedFuture = focusedConceptId
    ? futures.find((future) => future.id === focusedConceptId)
    : null;
  const otherFutures = focusedFuture
    ? futures.filter((future) => future.id !== focusedFuture.id)
    : futures;

  const scrollToOthers = () => {
    othersRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="future-exhibition space-y-16 sm:space-y-20">
      {!isDeepLink && (
        <section className="place-story panel-rise space-y-4">
          <p className="place-story__today font-[family-name:var(--font-instrument-serif)] text-[1.0625rem] leading-[1.55] text-foreground/82 sm:text-[1.125rem]">
            {site.story.today}
          </p>
          <p className="place-story__what-if font-[family-name:var(--font-instrument-serif)] text-[1.25rem] leading-[1.4] tracking-[-0.01em] text-foreground sm:text-[1.375rem]">
            {site.story.whatIf}
          </p>
        </section>
      )}

      {!isDeepLink && futures.length > 0 && (
        <p className="future-exhibition__intro panel-eyebrow panel-rise panel-rise--1">
          Explore different futures
        </p>
      )}

      {isDeepLink && focusedFuture && (
        <FutureSection
          site={site}
          future={focusedFuture}
          showExploreHint={otherFutures.length > 0}
          onExploreOthers={scrollToOthers}
        />
      )}

      {(!isDeepLink || otherFutures.length > 0) && (
        <div
          ref={othersRef}
          className={`future-exhibition__stack space-y-16 sm:space-y-20${
            isDeepLink ? " future-exhibition__stack--others" : ""
          }`}
        >
          {(isDeepLink ? otherFutures : futures).map((future) => (
            <FutureSection key={future.id} site={site} future={future} />
          ))}
        </div>
      )}

      {futures.length === 0 && (
        <p className="text-[0.9375rem] leading-relaxed text-foreground/55">
          Possible futures for this place are on the way.
        </p>
      )}
    </div>
  );
}
