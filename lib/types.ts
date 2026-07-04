export type InnovationPhase = "test" | "next" | "vision";

export type AreaCategory =
  | "gateway"
  | "shared-street"
  | "gathering"
  | "retail"
  | "mobility"
  | "civic";

export type PanelTab = "today" | "ideas" | "inspiration" | "participate";

export interface Stat {
  label: string;
  value: string;
}

export interface AreaGeometry {
  points: string;
  /** Optional label anchor when centroid isn't ideal for organic shapes. */
  labelX?: number;
  labelY?: number;
}

export interface Idea {
  id: string;
  title: string;
  description: string;
}

export interface Observation {
  id: string;
  text: string;
  author?: string;
}

export interface ResearchItem {
  id: string;
  title: string;
  summary: string;
  source?: string;
}

export interface Proposal {
  id: string;
  title: string;
  summary: string;
  status?: "draft" | "under-review" | "approved";
}

export interface Precedent {
  id: string;
  place: string;
  summary: string;
  image?: string;
}

export interface AreaVision {
  northStar: string;
  paragraphs: string[];
  /** Explicit paths override the default /images/concepts/{id}/concept-01.webp */
  conceptImages?: string[];
}

export interface InnovationArea {
  id: string;
  block: string;
  name: string;
  category: AreaCategory;
  phase: InnovationPhase;
  accent: string;
  geometry: AreaGeometry;
  vision: AreaVision;
  today: {
    summary: string;
    description: string;
    stats: Stat[];
    observations?: Observation[];
    photo?: string;
  };
  ideas: Idea[];
  precedents: Precedent[];
  imagineWithUs: {
    prompt: string;
    examples: string[];
  };
}

export const STORY_SECTIONS = {
  today: "Today",
  imagine: "Imagine",
  aroundTheWorld: "Around the World",
  imagineWithUs: "Imagine With Us",
  learnMore: "Learn More",
} as const;

export const PHASE_LABELS: Record<InnovationPhase, string> = {
  test: "Test Tomorrow",
  next: "Next Five Years",
  vision: "Long-Term Vision",
};

export const CATEGORY_LABELS: Record<AreaCategory, string> = {
  gateway: "Gateway",
  "shared-street": "Shared Street",
  gathering: "Gathering",
  retail: "Retail",
  mobility: "Mobility",
  civic: "Civic",
};

export const PANEL_TABS: { id: PanelTab; label: string }[] = [
  { id: "today", label: "Today" },
  { id: "ideas", label: "Ideas" },
  { id: "inspiration", label: "Inspiration" },
  { id: "participate", label: "Participate" },
];
