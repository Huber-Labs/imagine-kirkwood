/** Timeline phases for the global phase scrubber. */
export type TimelinePhase = "today" | "try-soon" | "grow" | "long-term";

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

export interface SiteToday {
  summary: string;
  description?: string;
  stats?: Stat[];
  observations?: Observation[];
  photo?: string;
}

export interface SitePhaseContent {
  northStar: string;
  paragraphs: string[];
  conceptImages?: string[];
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
  geometry: AreaGeometry;
  today: SiteToday;
  trySoon: SitePhaseContent;
  grow: SitePhaseContent;
  longTerm: SitePhaseContent;
  precedents: Precedent[];
  community: SiteCommunity;
  /** When true, content is a stub awaiting editorial pass. */
  isPlaceholder?: boolean;
}

export const TIMELINE_PHASES: {
  id: TimelinePhase;
  label: string;
  shortLabel: string;
}[] = [
  { id: "today", label: "Today", shortLabel: "Today" },
  { id: "try-soon", label: "Try Soon", shortLabel: "Try Soon" },
  { id: "grow", label: "Grow What Works", shortLabel: "Grow" },
  { id: "long-term", label: "Long Term", shortLabel: "Long Term" },
];

export const SITE_SECTIONS = {
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
