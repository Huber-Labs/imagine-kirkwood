/** Aerial map configuration — SVG overlay coordinates match this viewBox. */
export const MAP_VIEWBOX = "0 0 1000 600";

/** Primary aerial photograph. */
export const AERIAL_IMAGE_PATH = "/images/aerials/kirkwood-aerial.png";

/** Fallback if the primary image is missing. */
export const AERIAL_IMAGE_FALLBACK = "/images/aerials/kirkwood-aerial.svg";

/** Editorial treatment — calm, restrained, readable. */
export const AERIAL_EDITORIAL = {
  saturation: 0.45,
  brightness: { slope: 0.9, intercept: -0.04 },
  soften: 0.75,
  /** Subtle warm tint — kept light so the scrim does the heavy lifting */
  limestone: { color: "#E8E4DC", opacity: 0.1 },
  /** Base dark wash for label + polygon contrast */
  scrim: { color: "#141310", opacity: 0.48 },
  vignette: { color: "#0A0908", opacity: 0.32 },
  /** Light corridor labels on darkened map */
  labelColor: "255,255,255",
  labelOpacity: 0.72,
  titleOpacity: 0.85,
};

/** Refined corridor labels aligned to the aerial frame. */
export const corridorLabels = [
  { x: 115, y: 218, label: "Indiana Ave", anchor: "middle" as const },
  { x: 268, y: 212, label: "Dunn St", anchor: "middle" as const },
  { x: 432, y: 208, label: "Grant St", anchor: "middle" as const },
  { x: 592, y: 212, label: "College Ave", anchor: "middle" as const },
  { x: 752, y: 218, label: "Walnut St", anchor: "middle" as const },
];

export const corridorTitle = {
  x: 500,
  y: 178,
  label: "Kirkwood Avenue",
};
