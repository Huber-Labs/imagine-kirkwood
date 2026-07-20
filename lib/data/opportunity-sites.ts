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

interface PublishedSiteCopy {
  description: string;
  alt: string;
  today: string;
  whatIf: string;
  shareHook: string;
  perfectFor: string[];
}

function createPublishedSite(
  id: string,
  name: string,
  areaId: string,
  accent: string,
  heroImage: string,
  copy: PublishedSiteCopy,
): OpportunitySite {
  return {
    id,
    name,
    areaId,
    accent,
    story: {
      today: copy.today,
      whatIf: copy.whatIf,
    },
    futures: [
      createSiteFuture(
        `${id}-vision`,
        name,
        copy.description,
        heroImage,
        copy.alt,
        {
          shareHook: copy.shareHook,
          perfectFor: copy.perfectFor,
        },
      ),
    ],
  };
}

function createPlaceholderSite(
  id: string,
  name: string,
  areaId: string,
  accent: string,
): OpportunitySite {
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
    futures: [
      comingSoonFuture(
        `${id}-vision`,
        name,
        "A rendering for this place is on the way.",
      ),
    ],
  };
}

export const opportunitySites: OpportunitySite[] = [
  createPublishedSite(
    "dining-district",
    "Dining District",
    "indiana-gateway",
    "#C4A35A",
    "/images/opportunities/dining-district/hero.webp",
    {
      description:
        "Outdoor tables along a tree-lined promenade — dinner spilling into the street.",
      alt: "Concept rendering — outdoor dining along the Dining District promenade",
      today:
        "Kirkwood's western end mixes campus energy with restaurant patios — lively, but the street still feels built for cars first.",
      whatIf: "What if dinner spilled into a shared promenade?",
      shareHook:
        "Outdoor dining along a tree-lined promenade — dinner spilling into the street.",
      perfectFor: ["Outdoor dining", "Neighbors", "Evening strolls"],
    },
  ),
  createPublishedSite(
    "library-plaza",
    "Library Plaza",
    "theater-row",
    "#7B6BA8",
    "/images/opportunities/library-plaza/hero.webp",
    {
      description:
        "A front porch for the library — read outside, grab coffee, and stay awhile.",
      alt: "Concept rendering — an outdoor reading room at Library Plaza",
      today:
        "The library frontage is mostly parking and passing foot traffic — a great facade with little room to linger.",
      whatIf: "What if the plaza became a front porch for reading and meeting?",
      shareHook:
        "A front porch for the library — read outside, grab coffee, and stay awhile.",
      perfectFor: ["Reading", "Coffee breaks", "Families"],
    },
  ),
  createPublishedSite(
    "bank-alley",
    "Bank Alley",
    "theater-row",
    "#7B6BA8",
    "/images/opportunities/bank-alley/hero.webp",
    {
      description:
        "A pocket parklet with modular seating, warm light, and room to pause.",
      alt: "Concept rendering — a parklet with modular seating in Bank Alley",
      today:
        "The alley between buildings is functional — a cut-through more than a place to stop.",
      whatIf: "What if a parklet gave neighbors a reason to pause?",
      shareHook:
        "A pocket parklet with modular seating, warm light, and room to pause.",
      perfectFor: ["Quick stops", "Coffee", "Conversation"],
    },
  ),
  createPublishedSite(
    "crossing-plaza",
    "Crossing Plaza",
    "mid-block-crossing",
    "#4A90A4",
    "/images/opportunities/crossing-plaza/hero.webp",
    {
      description:
        "A corner made for staying — shade, seats, and live music in the middle of the block.",
      alt: "Concept rendering — a mid-block corner plaza with live music",
      today:
        "Mid-block corners fill with people at lunch, then empty out — potential without a place to stay.",
      whatIf: "What if the corner invited you to sit and listen?",
      shareHook:
        "A corner made for staying — shade, seats, and live music in the middle of the block.",
      perfectFor: ["Live music", "Lingering", "Mid-block pauses"],
    },
  ),
  createPublishedSite(
    "village-courtyard",
    "Village Courtyard",
    "courthouse-edge",
    "#8B6914",
    "/images/opportunities/village-courtyard/hero.webp",
    {
      description:
        "A courtyard around the fountain — shared tables and patio life between neighbors.",
      alt: "Concept rendering — a courtyard around the fountain at Village Courtyard",
      today:
        "Courthouse Square has history and foot traffic, but the edges feel disconnected.",
      whatIf: "What if a courtyard around the fountain pulled everyone together?",
      shareHook:
        "A courtyard around the fountain — shared tables and patio life between neighbors.",
      perfectFor: ["Meeting friends", "Al fresco dining", "Dogs & strollers"],
    },
  ),
  createPublishedSite(
    "restaurant-alley",
    "Food Truck Alley",
    "parklet-promenade",
    "#C4A35A",
    "/images/opportunities/restaurant-alley/hero.webp",
    {
      description:
        "Food trucks along the street — plug-in power, string lights, and room to eat together.",
      alt: "Concept rendering — food trucks along Food Truck Alley",
      today:
        "Parklet promenade blocks have outdoor dining pockets — still fragmented along the block.",
      whatIf: "What if food trucks and shared tables turned the street into an evening ritual?",
      shareHook:
        "Food trucks along the street — plug-in power, string lights, and room to eat together.",
      perfectFor: ["Street food", "Evening energy", "Local vendors"],
    },
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
        "What if it became Bloomington's favorite place to stay after dark?",
    },
    futures: [
      createSiteFuture(
        "reading-garden",
        "Evening Plaza",
        "String lights, small-stage music, and tables that turn a walk-through into a place to stay.",
        "/images/opportunities/peoples-park/hero.webp",
        "Concept rendering — an evening plaza for People's Park",
        {
          shareHook:
            "An evening plaza for People's Park — music, lights, and neighbors staying put.",
          qualities: ["music", "nightlife", "families"],
          perfectFor: ["Live music", "Evening hangs", "Neighbors"],
        },
      ),
      createSiteFuture(
        "big-screen-nights",
        "Big Screen Nights",
        "An inflatable screen, string lights, and lawn chairs — watch the game or a movie together under the trees.",
        "/images/opportunities/peoples-park/big-screen-nights.png",
        "Concept rendering — Big Screen Nights at People's Park",
        {
          shareHook:
            "Big Screen Nights at People's Park — game days and movie nights on the lawn.",
          qualities: ["performance", "nightlife", "families"],
          perfectFor: ["Game days", "Movie nights", "Neighbors"],
        },
      ),
    ],
  },
  createPublishedSite(
    "shaded",
    "Shaded Street",
    "theater-row",
    "#7B6BA8",
    "/images/opportunities/shaded/hero.webp",
    {
      description:
        "A cooler walk under tree canopy — shade, benches, and a gentler summer stroll.",
      alt: "Concept rendering — a shaded walk along Shaded Street",
      today:
        "Summer on Kirkwood means sun on the sidewalk — shade is uneven and benches are scarce.",
      whatIf: "What if tree canopy made the whole block easier to walk?",
      shareHook:
        "A cooler walk under tree canopy — shade, benches, and a gentler summer stroll.",
      perfectFor: ["Shade", "Walking", "Hot afternoons"],
    },
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
