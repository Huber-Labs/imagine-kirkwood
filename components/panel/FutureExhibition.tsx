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

  const placeStory = !isDeepLink
    ? { today: site.story.today, whatIf: site.story.whatIf }
    : null;

  return (
    <div className="future-exhibition flex flex-col gap-12 sm:gap-20">
      {!isDeepLink && futures.length > 1 && (
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
          showEyebrow={false}
        />
      )}

      {(!isDeepLink || otherFutures.length > 0) && (
        <div
          ref={othersRef}
          className={`future-exhibition__stack space-y-12 sm:space-y-20${
            isDeepLink ? " future-exhibition__stack--others" : ""
          }`}
        >
          {(isDeepLink ? otherFutures : futures).map((future) => (
            <FutureSection
              key={future.id}
              site={site}
              future={future}
              showEyebrow={false}
              placeStory={isDeepLink ? null : placeStory}
            />
          ))}
        </div>
      )}

      {futures.length === 0 && (
        <p className="text-[0.9375rem] leading-relaxed text-foreground/55">
          A concept for this place is on the way.
        </p>
      )}
    </div>
  );
}
