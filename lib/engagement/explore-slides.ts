import {
  getPublishedFutures,
  opportunitySites,
} from "@/lib/data/opportunity-sites";
import type { OpportunitySite, PlaceFuture } from "@/lib/types";

export const DEFAULT_EXPLORE_SITE_ID = "dining-district";

export interface ExploreSlide {
  siteId: string;
  conceptId: string;
  site: OpportunitySite;
  future: PlaceFuture;
}

export function getExploreSlides(): ExploreSlide[] {
  const slides: ExploreSlide[] = [];

  for (const site of opportunitySites) {
    for (const future of getPublishedFutures(site)) {
      if (future.status !== "published") continue;
      slides.push({
        siteId: site.id,
        conceptId: future.id,
        site,
        future,
      });
    }
  }

  return slides;
}

export function findExploreSlideIndex(
  siteId: string | null,
  conceptId: string | null,
): number {
  const slides = getExploreSlides();
  if (!siteId || slides.length === 0) return 0;

  if (conceptId) {
    const exactIndex = slides.findIndex(
      (slide) => slide.siteId === siteId && slide.conceptId === conceptId,
    );
    if (exactIndex >= 0) return exactIndex;
  }

  const siteIndex = slides.findIndex((slide) => slide.siteId === siteId);
  return siteIndex >= 0 ? siteIndex : 0;
}
