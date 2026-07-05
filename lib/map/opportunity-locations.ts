/**
 * Opportunity Place positions on the map canvas.
 *
 * Coordinates are percentages (0–100) of the active map viewBox so the same
 * data can scale to Kirkwood today, Hopewell tomorrow, or any future corridor.
 *
 * Positions are tuned to the Kirkwood aerial (Indiana → Walnut, viewBox 1000×600).
 * Replace or extend this file when adding new cities — do not hard-code SVG math
 * in components.
 */
export interface OpportunityLocation {
  /** Matches OpportunitySite.id */
  siteId: string;
  /** Horizontal position, 0–100% of map width */
  x: number;
  /** Vertical position, 0–100% of map height */
  y: number;
  label: string;
  /** Where the name sits relative to the pin */
  labelAlign?: "left" | "right" | "center";
  /** Label offset from pin in SVG units (post-conversion) */
  labelOffset?: { x: number; y: number };
}

export const MAP_CANVAS = {
  width: 1000,
  height: 600,
} as const;

/** Kirkwood Avenue opportunity places — west to east. */
export const opportunityLocations: OpportunityLocation[] = [
  {
    siteId: "dining-district",
    x: 10.5,
    y: 53.5,
    label: "Dining District",
    labelAlign: "right",
    labelOffset: { x: 14, y: 4 },
  },
  {
    siteId: "peoples-park",
    x: 27.5,
    y: 57.5,
    label: "People's Park",
    labelAlign: "center",
    labelOffset: { x: 0, y: 18 },
  },
  {
    siteId: "library-plaza",
    x: 39.5,
    y: 44.5,
    label: "Library Plaza",
    labelAlign: "center",
    labelOffset: { x: 0, y: -16 },
  },
  {
    siteId: "restaurant-alley",
    x: 44.5,
    y: 63,
    label: "Restaurant Alley",
    labelAlign: "left",
    labelOffset: { x: -14, y: 4 },
  },
  {
    siteId: "crossing-plaza",
    x: 58.5,
    y: 49.5,
    label: "Crossing Plaza",
    labelAlign: "center",
    labelOffset: { x: 0, y: -16 },
  },
  {
    siteId: "village-courtyard",
    x: 65.5,
    y: 58.5,
    label: "Village Courtyard",
    labelAlign: "right",
    labelOffset: { x: 14, y: 4 },
  },
];

export function toViewBoxPoint(location: Pick<OpportunityLocation, "x" | "y">): {
  x: number;
  y: number;
} {
  return {
    x: (location.x / 100) * MAP_CANVAS.width,
    y: (location.y / 100) * MAP_CANVAS.height,
  };
}

export function getOpportunityLocation(
  siteId: string,
): OpportunityLocation | undefined {
  return opportunityLocations.find((location) => location.siteId === siteId);
}

export function getLabelAnchor(
  location: OpportunityLocation,
  pin: { x: number; y: number },
): { x: number; y: number; textAnchor: "start" | "middle" | "end" } {
  const offset = location.labelOffset ?? { x: 0, y: -14 };
  const x = pin.x + offset.x;
  const y = pin.y + offset.y;

  switch (location.labelAlign) {
    case "left":
      return { x, y, textAnchor: "end" };
    case "right":
      return { x, y, textAnchor: "start" };
    default:
      return { x, y, textAnchor: "middle" };
  }
}
