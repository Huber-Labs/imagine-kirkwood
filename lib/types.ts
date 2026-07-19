/** @deprecated Homepage hero only — exhibition uses PlaceFuture per site. */
export type TimelinePhase = "today" | "try-soon" | "grow" | "long-term";

export type FutureQuality =
  | "shade"
  | "seating"
  | "trees"
  | "dining"
  | "music"
  | "performance"
  | "markets"
  | "families"
  | "play"
  | "reading"
  | "coworking"
  | "public-art"
  | "cycling"
  | "rain-gardens"
  | "nightlife"
  | "history";

export type FutureStatus = "published" | "draft" | "coming-soon";

/** One complete vision for what a place could become. */
export interface PlaceFuture {
  id: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  shareHook?: string;
  qualities: FutureQuality[];
  perfectFor?: string[];
  status?: FutureStatus;
}

export interface PlaceStory {
  today: string;
  whatIf: string;
}

export type AreaCategory =
  | "gateway"
  | "shared-street"
  | "gathering"
  | "retail"
  | "mobility"
  | "civic";

export interface Stat {
  label: string;
  value: string;
}

export interface AreaGeometry {
  points: string;
  labelX?: number;
  labelY?: number;
}

export interface Observation {
  id: string;
  text: string;
  author?: string;
}

export interface Precedent {
  id: string;
  place: string;
  summary: string;
  image?: string;
}

export interface Idea {
  id: string;
  title: string;
  description: string;
}

/** Contextual block overlay — not a primary click target. */
export interface InnovationArea {
  id: string;
  block: string;
  name: string;
  category: AreaCategory;
  accent: string;
  geometry: AreaGeometry;
  chapterIntro: string;
}

/** Editorial chapter metadata shared across timeline phases. */
export interface PhaseChapterFields {
  chapterTitle: string;
  narrative: string;
  improvements: string[];
  timeline: string;
  investment: string;
  confidence: string;
}

export interface SiteToday extends PhaseChapterFields {
  /** @deprecated Use narrative — kept for placeholder fallbacks. */
  summary?: string;
  description?: string;
  stats?: Stat[];
  observations?: Observation[];
  photo?: string;
}

export interface SitePhaseContent extends PhaseChapterFields {
  /** @deprecated Use chapterTitle — kept for placeholder fallbacks. */
  northStar?: string;
  /** Extended copy after the opening narrative. */
  paragraphs?: string[];
  conceptImages?: string[];
}

export interface SmallWin {
  id: string;
  title: string;
  description?: string;
}

export interface PlaceIdea {
  id: string;
  title: string;
  description?: string;
  phase?: Exclude<TimelinePhase, "today">;
  seedVotes?: number;
}

export interface SiteCommunity {
  prompt: string;
  examples: string[];
  ideas?: Idea[];
}

export interface OpportunitySite {
  id: string;
  name: string;
  areaId: string;
  accent: string;
  story: PlaceStory;
  futures: PlaceFuture[];
  /** When true, content is a stub awaiting editorial pass. */
  isPlaceholder?: boolean;
}

/** @deprecated Homepage hero + dormant Supabase only. */
export const TIMELINE_PHASES: {
  id: TimelinePhase;
  label: string;
  shortLabel: string;
  subtitle: string;
  confidenceLevel: 1 | 2 | 3 | 4;
}[] = [
  {
    id: "today",
    label: "Today — Protect What Works",
    shortLabel: "Today",
    subtitle: "Preserve what we love",
    confidenceLevel: 1,
  },
  {
    id: "try-soon",
    label: "Try Soon",
    shortLabel: "Try",
    subtitle: "Quick experiments",
    confidenceLevel: 2,
  },
  {
    id: "grow",
    label: "Grow What Works",
    shortLabel: "Grow",
    subtitle: "Build on success",
    confidenceLevel: 3,
  },
  {
    id: "long-term",
    label: "Long Term",
    shortLabel: "Long",
    subtitle: "Full transformation",
    confidenceLevel: 4,
  },
];

export const SITE_SECTIONS = {
  ideas: "Ideas for this place",
  smallWins: "Start Tomorrow",
  precedents: "Around the World",
  community: "Imagine With Us",
} as const;

export const CATEGORY_LABELS: Record<AreaCategory, string> = {
  gateway: "Gateway",
  "shared-street": "Shared Street",
  gathering: "Gathering",
  retail: "Retail",
  mobility: "Mobility",
  civic: "Civic",
};
