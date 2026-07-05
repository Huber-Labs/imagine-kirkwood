import type {
  OpportunitySite,
  SitePhaseContent,
  SiteToday,
  TimelinePhase,
} from "@/lib/types";

function placeholderPhase(name: string): SitePhaseContent {
  return {
    chapterTitle: `${name} — coming soon`,
    narrative:
      "This opportunity site is part of the Kirkwood exhibition. Full stories will arrive in a future sprint.",
    improvements: [],
    timeline: "—",
    investment: "—",
    confidence: "Story in development",
    paragraphs: [],
  };
}

function placeholderToday(name: string): SiteToday {
  return {
    chapterTitle: name,
    narrative: `${name} today — story in development.`,
    improvements: [],
    timeline: "Now",
    investment: "—",
    confidence: "Story in development",
    observations: [],
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
    today: placeholderToday(name),
    trySoon: placeholderPhase(name),
    grow: placeholderPhase(name),
    longTerm: placeholderPhase(name),
    ideas: [],
  };
}

export const opportunitySites: OpportunitySite[] = [
  createPlaceholderSite(
    "dining-district",
    "Dining District",
    "indiana-gateway",
    "#C4A35A",
  ),
  createPlaceholderSite(
    "library-plaza",
    "Library Plaza",
    "theater-row",
    "#7B6BA8",
  ),
  {
    id: "peoples-park",
    name: "People's Park",
    areaId: "theater-row",
    accent: "#7B6BA8",
    today: {
      chapterTitle: "A Place to Pass Through",
      narrative:
        "A small downtown park where students, buskers, and neighbors cross paths — but it rarely feels like a destination.",
      improvements: [],
      timeline: "Now",
      investment: "No cost — observe and listen",
      confidence: "What we see today",
      photo: "/images/opportunities/peoples-park/today/street.jpg",
    },
    trySoon: {
      chapterTitle: "The Pop-Up Lawn",
      narrative:
        "Imagine movable chairs, string lights, and a temporary stage — a low-cost way to test what draws people to stay.",
      improvements: [],
      timeline: "Weeks to months",
      investment: "Pocket change — mostly borrowed and rented",
      confidence: "Worth trying soon",
      conceptImages: [
        "/images/opportunities/peoples-park/try-soon/hero.webp",
      ],
    },
    grow: {
      chapterTitle: "The Event Lawn",
      narrative:
        "With modest investment, People's Park becomes a flexible event lawn — shade trees, permanent power, and accessible seating.",
      improvements: [],
      timeline: "1–3 years",
      investment: "Modest budget — phased over seasons",
      confidence: "Proven in peer cities",
      conceptImages: ["/images/opportunities/peoples-park/grow/hero.webp"],
    },
    longTerm: {
      chapterTitle: "Bloomington's Front Porch",
      narrative:
        "A designed amphitheater, tree canopy, and generous plaza transform People's Park into the city's outdoor living room.",
      improvements: [],
      timeline: "5+ years",
      investment: "Major investment — a civic landmark",
      confidence: "A shared community vision",
      conceptImages: [
        "/images/opportunities/peoples-park/long-term/hero.webp",
      ],
    },
    ideas: [
      {
        id: "idea-pp-seating",
        title: "Temporary seating",
        description:
          "Roll out movable chairs on Friday afternoons — see if people stay.",
        phase: "try-soon",
        seedVotes: 18,
      },
      {
        id: "idea-pp-shade-umbrellas",
        title: "Shade umbrellas",
        description:
          "Partner with a nearby café to loan umbrellas on sunny days.",
        phase: "try-soon",
        seedVotes: 14,
      },
      {
        id: "idea-pp-weekend-music",
        title: "Weekend music",
        description:
          "Invite a busker or acoustic duo for Saturday afternoons.",
        phase: "try-soon",
        seedVotes: 22,
      },
      {
        id: "idea-pp-pop-up-stage",
        title: "Pop-up stage",
        description:
          "A simple platform for buskers, poets, and community announcements.",
        phase: "try-soon",
        seedVotes: 16,
      },
      {
        id: "idea-pp-shade-grove",
        title: "Shade grove",
        description:
          "A cluster of mature trees at the park's center — instant comfort on hot days.",
        phase: "grow",
        seedVotes: 24,
      },
      {
        id: "idea-pp-food-carts",
        title: "Food carts",
        description:
          "Pilot a single cart on show nights — low risk, high energy.",
        phase: "try-soon",
        seedVotes: 12,
      },
      {
        id: "idea-pp-event-power",
        title: "Event lawn power",
        description:
          "Permanent outlets for markets, performances, and evening gatherings.",
        phase: "grow",
        seedVotes: 10,
      },
      {
        id: "idea-pp-amphitheater",
        title: "Amphitheater",
        description:
          "A designed bowl facing the Buskirk-Chumley for performances and community events.",
        phase: "long-term",
        seedVotes: 20,
      },
    ],
  },
  createPlaceholderSite(
    "restaurant-alley",
    "Restaurant Alley",
    "parklet-promenade",
    "#C4A35A",
  ),
  createPlaceholderSite(
    "crossing-plaza",
    "Crossing Plaza",
    "mid-block-crossing",
    "#4A90A4",
  ),
  createPlaceholderSite(
    "village-courtyard",
    "Village Courtyard",
    "courthouse-edge",
    "#8B6914",
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
  return !("paragraphs" in content);
}
