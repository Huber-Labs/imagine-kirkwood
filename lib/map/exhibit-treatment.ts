/**
 * Editorial exhibit map treatment — museum spotlight over the study corridor.
 * Coordinates match MAP_VIEWBOX 0 0 1000 600.
 */

/** Kirkwood Avenue street band (west → east). */
export const KIRKWOOD_CORRIDOR = {
  x: 42,
  y: 272,
  width: 916,
  height: 56,
  rx: 28,
} as const;

/** Feathered pools for adjacent pedestrian opportunity spaces. */
export const PEDESTRIAN_SPOTLIGHTS = [
  { cx: 105, cy: 321, rx: 62, ry: 44 },
  { cx: 275, cy: 345, rx: 54, ry: 40 },
  { cx: 395, cy: 267, rx: 50, ry: 38 },
  { cx: 445, cy: 378, rx: 58, ry: 42 },
  { cx: 655, cy: 351, rx: 54, ry: 40 },
] as const;

/** Soft edge falloff for the museum spotlight mask (SVG units). */
export const SPOTLIGHT_FEATHER = 32;

/** Base layer — receded, desaturated study context. */
export const EXHIBIT_BASE_FILTER = {
  saturation: 0.16,
  brightness: { slope: 0.78, intercept: -0.1 },
  soften: 1.1,
} as const;

/** Spotlight layer — warmer, clearer corridor detail. */
export const EXHIBIT_SPOTLIGHT_FILTER = {
  saturation: 0.62,
  brightness: { slope: 1.06, intercept: 0.04 },
  soften: 0.35,
} as const;

/** Outer study-area dimming (outside the feathered mask). */
export const EXHIBIT_OUTER_DIM = {
  color: "#121110",
  opacity: 0.62,
} as const;

/** Subtle warm paper tint over the full canvas. */
export const EXHIBIT_PAPER_TINT = {
  color: "#E8E4DC",
  opacity: 0.06,
} as const;

/** Indiana University crimson — opportunity place markers. */
export const IU_CRIMSON = "#990000";

/** Kirkwood Avenue label traced along the street centerline. */
export const KIRKWOOD_STREET_LABEL = {
  path: "M 72 300 L 928 300",
  fontSize: 10.5,
  letterSpacing: "0.22em",
  opacity: 0.92,
} as const;
