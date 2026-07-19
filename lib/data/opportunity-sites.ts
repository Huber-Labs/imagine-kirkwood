import { CONCEPT_PLACEHOLDER_PATH } from "@/lib/concepts";
import type { OpportunitySite, PlaceFuture } from "@/lib/types";

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
        {
          id: `${id}-vision`,
          title: name,
          description: `A concept for what ${name} could become.`,
          image: heroImage,
          alt: `Concept rendering — ${name}`,
          qualities: [],
          status: "published",
        },
      ]
    : [
        comingSoonFuture(
          `${id}-shared-street`,
          "Shared street vision",
          "A fuller story for this place is on the way.",
        ),
        comingSoonFuture(
          `${id}-gathering-place`,
          "Gathering place vision",
          "More possible futures will appear here soon.",
        ),
      ];

  return {
    id,
    name,
    areaId,
    accent,
    isPlaceholder: true,
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
    "/images/opportunities/dining-district/hero.png",
  ),
  createPlaceholderSite(
    "library-plaza",
    "Library Plaza",
    "theater-row",
    "#7B6BA8",
    "/images/opportunities/library-plaza/hero.png",
  ),
  createPlaceholderSite(
    "bank-alley",
    "Bank Alley",
    "theater-row",
    "#7B6BA8",
    "/images/opportunities/bank-alley/hero.png",
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
      {
        id: "outdoor-living-room",
        title: "Outdoor Living Room",
        description:
          "A shaded public room for reading, meeting friends, working outdoors, and spending unhurried time downtown.",
        shareHook:
          "Imagine People's Park as Bloomington's outdoor living room.",
        image: "/images/opportunities/peoples-park/long-term/hero.webp",
        alt: "Concept rendering — People's Park as a shaded outdoor living room with seating and tree canopy",
        qualities: ["shade", "seating", "trees", "coworking", "dining"],
        perfectFor: [
          "Reading",
          "Meeting friends",
          "Outdoor work",
          "Lunch",
          "Families",
        ],
        status: "published",
      },
      {
        id: "performance-plaza",
        title: "Performance Plaza",
        description:
          "Movable chairs, string lights, and a flexible stage — a gathering place for small concerts, outdoor films, and community performances.",
        shareHook:
          "What if People's Park hosted the city's best small outdoor shows?",
        image: "/images/opportunities/peoples-park/try-soon/hero.webp",
        alt: "Concept rendering — a pop-up lawn with temporary stage and evening gathering",
        qualities: ["performance", "music", "seating", "nightlife", "families"],
        perfectFor: [
          "Live music",
          "Outdoor films",
          "Student performances",
          "Community events",
        ],
        status: "published",
      },
      {
        id: "community-market",
        title: "Community Market",
        description:
          "A flexible event lawn with shade, power, and room for local vendors, seasonal markets, and food on show nights.",
        shareHook: "Picture a downtown market that draws people to stay.",
        image: "/images/opportunities/peoples-park/grow/hero.webp",
        alt: "Concept rendering — an event lawn with markets and evening gathering",
        qualities: ["markets", "dining", "seating", "families", "nightlife"],
        perfectFor: [
          "Local vendors",
          "Seasonal markets",
          "Food and drink",
          "Evening gatherings",
        ],
        status: "published",
      },
      {
        id: "reading-garden",
        title: "Reading Garden",
        description:
          "A quieter, greener retreat designed around reading, conversation, native planting, and restoration.",
        shareHook:
          "A calmer corner of downtown — a reading garden for People's Park.",
        image: "/images/opportunities/peoples-park/hero.png",
        alt: "Concept rendering — a reading garden for People's Park",
        qualities: ["reading", "trees", "shade", "rain-gardens", "families"],
        perfectFor: [
          "Reading",
          "Quiet conversation",
          "Native planting",
          "Restoration",
        ],
        status: "published",
      },
    ],
  },
  createPlaceholderSite(
    "restaurant-alley",
    "Restaurant Alley",
    "parklet-promenade",
    "#C4A35A",
    "/images/opportunities/restaurant-alley/hero.png",
  ),
  createPlaceholderSite(
    "crossing-plaza",
    "Crossing Plaza",
    "mid-block-crossing",
    "#4A90A4",
    "/images/opportunities/crossing-plaza/hero.png",
  ),
  createPlaceholderSite(
    "village-courtyard",
    "Village Courtyard",
    "courthouse-edge",
    "#8B6914",
    "/images/opportunities/village-courtyard/hero.png",
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
