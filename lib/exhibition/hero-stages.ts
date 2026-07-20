import { CONCEPT_PLACEHOLDER_PATH } from "@/lib/concepts";
import {
  getDefaultFuture,
  opportunitySites,
} from "@/lib/data/opportunity-sites";

export interface ExhibitionHeroStage {
  id: string;
  src: string;
  alt: string;
}

/** Homepage hero opens on People's Park, then cycles other map concepts. */
const HOMEPAGE_HERO_LEAD_SITE_ID = "peoples-park";

/** Published concept hero images from opportunity sites on the explore map. */
export function getExhibitionHeroStages(): ExhibitionHeroStage[] {
  const orderedSites = [
    ...opportunitySites.filter((site) => site.id === HOMEPAGE_HERO_LEAD_SITE_ID),
    ...opportunitySites.filter((site) => site.id !== HOMEPAGE_HERO_LEAD_SITE_ID),
  ];

  return orderedSites.flatMap((site) => {
    if (site.isPlaceholder) return [];

    const future = getDefaultFuture(site);
    if (!future || future.status !== "published") return [];
    if (!future.image || future.image === CONCEPT_PLACEHOLDER_PATH) return [];

    return [
      {
        id: `${site.id}-${future.id}`,
        src: future.image,
        alt: future.alt,
      },
    ];
  });
}

export const EXHIBITION_HERO_STAGES = getExhibitionHeroStages();

/** Milliseconds between automatic slide transitions. */
export const EXHIBITION_HERO_INTERVAL_MS = 8000;
