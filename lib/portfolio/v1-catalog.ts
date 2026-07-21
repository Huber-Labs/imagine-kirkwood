import {
  getPublishedFutures,
  opportunitySites,
} from "@/lib/data/opportunity-sites";
import { catalogKey } from "@/lib/portfolio/catalog";
import type { CatalogInvestment } from "@/lib/portfolio/types";

/** Stable investment UUIDs from supabase/migrations/003 and 004. */
const V1_INVESTMENT_IDS: Record<string, string> = {
  [catalogKey("dining-district", "dining-district-vision")]:
    "c1000000-0000-4000-8000-000000000001",
  [catalogKey("library-plaza", "library-plaza-vision")]:
    "c1000000-0000-4000-8000-000000000002",
  [catalogKey("bank-alley", "bank-alley-vision")]:
    "c1000000-0000-4000-8000-000000000003",
  [catalogKey("peoples-park", "reading-garden")]:
    "c1000000-0000-4000-8000-000000000004",
  [catalogKey("restaurant-alley", "restaurant-alley-vision")]:
    "c1000000-0000-4000-8000-000000000005",
  [catalogKey("crossing-plaza", "crossing-plaza-vision")]:
    "c1000000-0000-4000-8000-000000000006",
  [catalogKey("village-courtyard", "village-courtyard-vision")]:
    "c1000000-0000-4000-8000-000000000007",
  [catalogKey("shaded", "shaded-vision")]:
    "c1000000-0000-4000-8000-000000000008",
};

/** Fallback catalog when Supabase is missing rows (e.g. migration 004 not applied). */
export function buildV1CatalogInvestments(): CatalogInvestment[] {
  const investments: CatalogInvestment[] = [];

  for (const site of opportunitySites) {
    for (const future of getPublishedFutures(site)) {
      if (future.status !== "published") continue;

      const key = catalogKey(site.id, future.id);
      const id = V1_INVESTMENT_IDS[key];
      if (!id) continue;

      investments.push({
        id,
        placeSlug: site.id,
        placeName: site.name,
        slug: future.id,
        title: future.title,
        pointLimit: 3,
      });
    }
  }

  return investments;
}

export function mergeCatalogInvestments(
  primary: CatalogInvestment[],
  fallback: CatalogInvestment[],
): CatalogInvestment[] {
  const merged = new Map<string, CatalogInvestment>();

  for (const investment of primary) {
    merged.set(catalogKey(investment.placeSlug, investment.slug), investment);
  }

  for (const investment of fallback) {
    const key = catalogKey(investment.placeSlug, investment.slug);
    if (!merged.has(key)) {
      merged.set(key, investment);
    }
  }

  return Array.from(merged.values());
}
