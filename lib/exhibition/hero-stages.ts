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

/** Published concept hero images from opportunity sites on the explore map. */
export function getExhibitionHeroStages(): ExhibitionHeroStage[] {
  return opportunitySites.flatMap((site) => {
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
