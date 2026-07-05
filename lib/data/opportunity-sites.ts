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
    precedents: [],
    community: {
      prompt: "What would you like to see here?",
      examples: [],
    },
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
      improvements: [
        "Comfortable places to sit and linger",
        "Shade for hot summer afternoons",
        "A reason to stay beyond cutting through",
        "Connection to show-night energy on Kirkwood",
      ],
      timeline: "Now",
      investment: "No cost — observe and listen",
      confidence: "What we see today",
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
      chapterTitle: "The Pop-Up Lawn",
      narrative:
        "Imagine movable chairs, string lights, and a temporary stage — a low-cost way to test what draws people to stay.",
      improvements: [
        "Movable chairs and café tables",
        "String lights for evening warmth",
        "Pop-up stage for acoustic sets",
        "Weekend food cart permits",
        "Chalk art and temporary street paint",
      ],
      timeline: "Weeks to months",
      investment: "Pocket change — mostly borrowed and rented",
      confidence: "Worth trying soon",
      paragraphs: [
        "Food carts, acoustic sets, and open mic nights could activate the park on weekends without permanent construction.",
      ],
      conceptImages: [
        "/images/opportunities/peoples-park/try-soon/hero.webp",
      ],
    },
    grow: {
      chapterTitle: "The Event Lawn",
      narrative:
        "With modest investment, People's Park becomes a flexible event lawn — shade trees, permanent power, and accessible seating.",
      improvements: [
        "Young shade trees with room to mature",
        "Permanent power for events and markets",
        "Accessible seating and gathering edges",
        "Improved lighting for evening use",
        "Flexible lawn for markets and art fairs",
      ],
      timeline: "1–3 years",
      investment: "Modest budget — phased over seasons",
      confidence: "Proven in peer cities",
      paragraphs: [
        "Farmers market stalls, art fairs, and community gatherings find a natural home steps from Kirkwood's theaters.",
      ],
      conceptImages: ["/images/opportunities/peoples-park/grow/hero.webp"],
    },
    longTerm: {
      chapterTitle: "Bloomington's Front Porch",
      narrative:
        "A designed amphitheater, tree canopy, and generous plaza transform People's Park into the city's outdoor living room.",
      improvements: [
        "Amphitheater facing the Buskirk-Chumley",
        "Mature tree canopy across the lawn",
        "Generous plaza for daily gathering",
        "Integrated stormwater and native plantings",
        "Year-round programming infrastructure",
      ],
      timeline: "5+ years",
      investment: "Major investment — a civic landmark",
      confidence: "A shared community vision",
      paragraphs: [
        "Performances spill from the Buskirk-Chumley onto the lawn. Neighbors gather on summer evenings. The park becomes the heart of downtown life.",
      ],
      conceptImages: [
        "/images/opportunities/peoples-park/long-term/hero.webp",
      ],
    },
    smallWins: [
      {
        id: "win-pp-1",
        title: "Temporary seating",
        description:
          "Roll out movable chairs on Friday afternoons — see if people stay.",
      },
      {
        id: "win-pp-2",
        title: "Shade umbrellas",
        description:
          "Partner with a nearby café to loan umbrellas on sunny days.",
      },
      {
        id: "win-pp-3",
        title: "Weekend music",
        description:
          "Invite a busker or acoustic duo for Saturday afternoons.",
      },
      {
        id: "win-pp-4",
        title: "Chalk and street paint",
        description:
          "A one-day community art event to claim the space together.",
      },
      {
        id: "win-pp-5",
        title: "Food carts",
        description:
          "Pilot a single cart on show nights — low risk, high energy.",
      },
    ],
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
