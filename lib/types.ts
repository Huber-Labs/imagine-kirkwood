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

export interface Inspiration {
  id: string;
  text: string;
  source?: string;
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

export interface InnovationArea {
  id: string;
  block: string;
  name: string;
  category: AreaCategory;
  phase: InnovationPhase;
  accent: string;
  geometry: AreaGeometry;
  today: {
    summary: string;
    description: string;
    stats: Stat[];
    observations?: Observation[];
  };
  ideas: Idea[];
  inspiration: Inspiration[];
  participate: {
    prompt: string;
    examples: string[];
  };
}

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
