import { CONCEPT_PLACEHOLDER_PATH } from "@/lib/concepts";
import type { OpportunitySite, PlaceFuture } from "@/lib/types";

/** V1 release: one published concept render per opportunity site. */
function createSiteFuture(
  id: string,
  title: string,
  description: string,
  image: string,
  alt: string,
  options: Partial<PlaceFuture> = {},
): PlaceFuture {
  return {
    id,
    title,
    description,
    image,
    alt,
    qualities: [],
    status: "published",
    ...options,
  };
}

function comingSoonFuture(
  id: string,
  title: string,
  description: string,
): PlaceFuture {
  return {
    id,
    title,
    description,
    image: CONCEPT_PLACEHOLDER_PATH,
    alt: `${title} — rendering coming soon`,
    qualities: [],
    status: "coming-soon",
  };
}

function createPlaceholderSite(
  id: string,
  name: string,
  areaId: string,
  accent: string,
  heroImage?: string,
): OpportunitySite {
  const futures: PlaceFuture[] = heroImage
    ? [
        createSiteFuture(
          `${id}-vision`,
          name,
          `A concept for what ${name} could become.`,
          heroImage,
          `Concept rendering — ${name}`,
        ),
      ]
    : [
        comingSoonFuture(
          `${id}-vision`,
          name,
          "A concept rendering for this place is on the way.",
        ),
      ];

  return {
    id,
    name,
    areaId,
    accent,
    ...(heroImage ? {} : { isPlaceholder: true }),
    story: {
      today: `${name} today — story in development.`,
      whatIf: `What could ${name} become?`,
    },
    futures,
  };
}

export const opportunitySites: OpportunitySite[] = [
  createPlaceholderSite(
    "dining-district",
    "Dining District",
    "indiana-gateway",
    "#C4A35A",
    "/images/opportunities/dining-district/hero.webp",
  ),
  createPlaceholderSite(
    "library-plaza",
    "Library Plaza",
    "theater-row",
    "#7B6BA8",
    "/images/opportunities/library-plaza/hero.webp",
  ),
  createPlaceholderSite(
    "bank-alley",
    "Bank Alley",
    "theater-row",
    "#7B6BA8",
    "/images/opportunities/bank-alley/hero.webp",
  ),
  {
    id: "peoples-park",
    name: "People's Park",
    areaId: "theater-row",
    accent: "#7B6BA8",
    story: {
      today:
        "Today, People's Park is mostly a place people walk through — students, buskers, and neighbors cross paths, but it rarely feels like a destination.",
      whatIf:
        "What if it became Bloomington's favorite place to stay?",
    },
    futures: [
      createSiteFuture(
        "reading-garden",
        "Reading Garden",
        "A quieter, greener retreat designed around reading, conversation, native planting, and restoration.",
        "/images/opportunities/peoples-park/hero.webp",
        "Concept rendering — a reading garden for People's Park",
        {
          shareHook:
            "A calmer corner of downtown — a reading garden for People's Park.",
          qualities: ["reading", "trees", "shade", "rain-gardens", "families"],
          perfectFor: [
            "Reading",
            "Quiet conversation",
            "Native planting",
            "Restoration",
          ],
        },
      ),
    ],
  },
  createPlaceholderSite(
    "restaurant-alley",
    "Restaurant Alley",
    "parklet-promenade",
    "#C4A35A",
    "/images/opportunities/restaurant-alley/hero.webp",
  ),
  createPlaceholderSite(
    "crossing-plaza",
    "Crossing Plaza",
    "mid-block-crossing",
    "#4A90A4",
    "/images/opportunities/crossing-plaza/hero.webp",
  ),
  createPlaceholderSite(
    "village-courtyard",
    "Village Courtyard",
    "courthouse-edge",
    "#8B6914",
    "/images/opportunities/village-courtyard/hero.webp",
  ),
  createPlaceholderSite(
    "shaded",
    "Shaded Street",
    "theater-row",
    "#7B6BA8",
    "/images/opportunities/shaded/hero.webp",
  ),
];

export function getOpportunitySiteById(
  id: string,
): OpportunitySite | undefined {
  return opportunitySites.find((site) => site.id === id);
}

export function getSitesByAreaId(areaId: string): OpportunitySite[] {
  return opportunitySites.filter((site) => site.areaId === areaId);
}

export function getPublishedFutures(site: OpportunitySite): PlaceFuture[] {
  return site.futures.filter((future) => future.status !== "draft");
}

export function getDefaultFuture(site: OpportunitySite): PlaceFuture | undefined {
  return getPublishedFutures(site).find((future) => future.status === "published");
}

export function getFutureById(
  site: OpportunitySite,
  futureId: string,
): PlaceFuture | undefined {
  return site.futures.find((future) => future.id === futureId);
}

export function resolveFutureId(
  site: OpportunitySite,
  futureId: string | null,
): string | null {
  if (!futureId) {
    return getDefaultFuture(site)?.id ?? null;
  }

  const match = getFutureById(site, futureId);
  if (match && match.status !== "draft") {
    return match.id;
  }

  return getDefaultFuture(site)?.id ?? null;
}

export function getPublishedFutureCount(site: OpportunitySite): number {
  return getPublishedFutures(site).filter(
    (future) => future.status === "published",
  ).length;
}
