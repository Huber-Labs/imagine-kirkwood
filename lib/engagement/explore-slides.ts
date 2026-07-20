import {
  getOpportunitySiteById,
  getPublishedFutures,
  opportunitySites,
  resolveFutureId,
} from "@/lib/data/opportunity-sites";
import type { OpportunitySite, PlaceFuture } from "@/lib/types";

export const DEFAULT_EXPLORE_SITE_ID = "dining-district";

export interface ExploreSlide {
  siteId: string;
  site: OpportunitySite;
  futures: PlaceFuture[];
}

export function getExploreSlides(): ExploreSlide[] {
  const slides: ExploreSlide[] = [];

  for (const site of opportunitySites) {
    const futures = getPublishedFutures(site).filter(
      (future) => future.status === "published",
    );
    if (futures.length === 0) continue;

    slides.push({
      siteId: site.id,
      site,
      futures,
    });
  }

  return slides;
}

export function resolveActiveFuture(
  site: OpportunitySite,
  conceptId: string | null,
): PlaceFuture | undefined {
  const futures = getPublishedFutures(site).filter(
    (future) => future.status === "published",
  );
  if (futures.length === 0) return undefined;

  if (conceptId) {
    const resolvedId = resolveFutureId(site, conceptId);
    const match = futures.find((future) => future.id === resolvedId);
    if (match) return match;
  }

  return futures[0];
}

export function findExploreSlideIndex(
  siteId: string | null,
  conceptId: string | null,
): number {
  const slides = getExploreSlides();
  if (!siteId || slides.length === 0) return 0;

  const siteIndex = slides.findIndex((slide) => slide.siteId === siteId);
  if (siteIndex >= 0) return siteIndex;

  if (conceptId) {
    const conceptIndex = slides.findIndex((slide) =>
      slide.futures.some((future) => future.id === conceptId),
    );
    if (conceptIndex >= 0) return conceptIndex;
  }

  return 0;
}

export function getExploreSlideBySiteId(
  siteId: string,
): ExploreSlide | undefined {
  return getExploreSlides().find((slide) => slide.siteId === siteId);
}

export function resolveExploreConceptId(
  siteId: string,
  conceptId: string | null,
): string | null {
  const site = getOpportunitySiteById(siteId);
  if (!site) return null;
  return resolveActiveFuture(site, conceptId)?.id ?? null;
}
