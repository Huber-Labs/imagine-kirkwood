import type {
  OpportunitySite,
  SitePhaseContent,
  SiteToday,
  TimelinePhase,
} from "@/lib/types";

function placeholderPhase(name: string): SitePhaseContent {
  return {
    northStar: `${name} — coming soon`,
    paragraphs: [
      "This opportunity site is part of the Kirkwood exhibition. Full stories will arrive in a future sprint.",
    ],
  };
}

function placeholderToday(name: string): SiteToday {
  return {
    summary: `${name} today — story in development.`,
    observations: [],
  };
}

function createPlaceholderSite(
  id: string,
  name: string,
  areaId: string,
  accent: string,
  geometry: OpportunitySite["geometry"],
): OpportunitySite {
  return {
    id,
    name,
    areaId,
    accent,
    geometry,
    isPlaceholder: true,
    today: placeholderToday(name),
    trySoon: placeholderPhase(name),
    grow: placeholderPhase(name),
    longTerm: placeholderPhase(name),
    precedents: [],
    community: {
      prompt: "What would you like to see here?",
      examples: [],
    },
  };
}

export const opportunitySites: OpportunitySite[] = [
  createPlaceholderSite(
    "welcome-corner",
    "Welcome Corner",
    "indiana-gateway",
    "#5B8C5A",
    {
      points: "72,268 148,258 158,328 148,352 62,342 58,288",
      labelX: 108,
      labelY: 312,
    },
  ),
  {
    id: "peoples-park",
    name: "People's Park",
    areaId: "theater-row",
    accent: "#7B6BA8",
    geometry: {
      points: "218,268 298,262 308,318 298,358 212,352 208,298",
      labelX: 258,
      labelY: 318,
    },
    today: {
      summary:
        "A small downtown park where students, buskers, and neighbors cross paths — but it rarely feels like a destination.",
      description:
        "People's Park sits at the heart of Kirkwood's gathering district. It hosts occasional events and daily foot traffic, yet lacks shade, seating, and a clear reason to stay.",
      photo: "/images/opportunities/peoples-park/today/street.jpg",
      stats: [
        { label: "Daily foot traffic", value: "High" },
        { label: "Public seating", value: "Limited" },
        { label: "Shade coverage", value: "Minimal" },
      ],
      observations: [
        {
          id: "obs-pp-1",
          text: "People cut through but rarely stop — there's nowhere comfortable to sit.",
        },
        {
          id: "obs-pp-2",
          text: "On show nights, the park feels like overflow space rather than part of the experience.",
        },
      ],
    },
    trySoon: {
      northStar: "The Pop-Up Lawn",
      paragraphs: [
        "Imagine movable chairs, string lights, and a temporary stage — a low-cost way to test what draws people to stay.",
        "Food carts, acoustic sets, and open mic nights could activate the park on weekends without permanent construction.",
      ],
      conceptImages: [
        "/images/opportunities/peoples-park/try-soon/hero.webp",
      ],
    },
    grow: {
      northStar: "The Event Lawn",
      paragraphs: [
        "With modest investment, People's Park becomes a flexible event lawn — shade trees, permanent power, and accessible seating.",
        "Farmers market stalls, art fairs, and community gatherings find a natural home steps from Kirkwood's theaters.",
      ],
      conceptImages: ["/images/opportunities/peoples-park/grow/hero.webp"],
    },
    longTerm: {
      northStar: "Bloomington's Front Porch",
      paragraphs: [
        "A designed amphitheater, tree canopy, and generous plaza transform People's Park into the city's outdoor living room.",
        "Performances spill from the Buskirk-Chumley onto the lawn. Neighbors gather on summer evenings. The park becomes the heart of downtown life.",
      ],
      conceptImages: [
        "/images/opportunities/peoples-park/long-term/hero.webp",
      ],
    },
    precedents: [
      {
        id: "prec-pp-1",
        place: "Madison, WI",
        summary:
          "Capitol Square's temporary activations prove a small park can anchor an entire downtown.",
        image: "/images/opportunities/peoples-park/precedents/01.jpg",
      },
      {
        id: "prec-pp-2",
        place: "Charlottesville, VA",
        summary:
          "The Downtown Mall's pocket parks give people reasons to pause between shops and shows.",
        image: "/images/opportunities/peoples-park/precedents/02.jpg",
      },
      {
        id: "prec-pp-3",
        place: "Boulder, CO",
        summary:
          "Pearl Street's pop-up stages turn an ordinary block into nightly community ritual.",
        image: "/images/opportunities/peoples-park/precedents/03.jpg",
      },
    ],
    community: {
      prompt:
        "Tell us about a park or plaza where you felt welcome to stay — not just pass through.",
      examples: [
        "I love how Madison's Capitol Square fills up on Saturday mornings.",
        "The pocket park in Asheville always has someone playing guitar.",
        "We need shade more than anything — summer concerts are brutal without it.",
      ],
      ideas: [
        {
          id: "idea-pp-1",
          title: "Shade grove",
          description:
            "A cluster of mature trees at the park's center — instant comfort on hot days.",
        },
        {
          id: "idea-pp-2",
          title: "Weekend stage",
          description:
            "A simple platform for buskers, poets, and community announcements.",
        },
      ],
    },
  },
  createPlaceholderSite(
    "restaurant-alley",
    "Restaurant Alley",
    "parklet-promenade",
    "#C4A35A",
    {
      points: "378,268 468,262 478,328 468,362 372,358 368,298",
      labelX: 422,
      labelY: 318,
    },
  ),
  createPlaceholderSite(
    "crossing-plaza",
    "Crossing Plaza",
    "mid-block-crossing",
    "#4A90A4",
    {
      points: "538,268 628,262 638,318 628,352 532,348 528,298",
      labelX: 582,
      labelY: 312,
    },
  ),
  createPlaceholderSite(
    "civic-porch",
    "Civic Porch",
    "courthouse-edge",
    "#8B6914",
    {
      points: "698,278 788,282 798,328 788,362 692,358 688,302",
      labelX: 742,
      labelY: 322,
    },
  ),
  createPlaceholderSite(
    "market-square",
    "Market Square",
    "walnut-square",
    "#B85C5C",
    {
      points: "848,288 938,292 948,338 938,368 842,362 838,308",
      labelX: 892,
      labelY: 332,
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

export function getPhaseContent(
  site: OpportunitySite,
  phase: TimelinePhase,
): SiteToday | SitePhaseContent {
  switch (phase) {
    case "today":
      return site.today;
    case "try-soon":
      return site.trySoon;
    case "grow":
      return site.grow;
    case "long-term":
      return site.longTerm;
  }
}

export function isSiteToday(
  content: SiteToday | SitePhaseContent,
): content is SiteToday {
  return "summary" in content && !("northStar" in content);
}
