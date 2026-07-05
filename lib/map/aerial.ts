/** Aerial map configuration — SVG overlay coordinates match this viewBox. */
export const MAP_VIEWBOX = "0 0 1000 600";

/** Primary aerial photograph. */
export const AERIAL_IMAGE_PATH = "/images/aerials/kirkwood-aerial.png";

/** Fallback if the primary image is missing. */
export const AERIAL_IMAGE_FALLBACK = "/images/aerials/kirkwood-aerial.svg";

/** @deprecated Use EXHIBIT_* filters in exhibit-treatment.ts — kept for label tokens. */
export const AERIAL_EDITORIAL = {
  saturation: 0.16,
  brightness: { slope: 0.78, intercept: -0.1 },
  soften: 1.1,
  limestone: { color: "#E8E4DC", opacity: 0.06 },
  scrim: { color: "#141310", opacity: 0 },
  vignette: { color: "#0A0908", opacity: 0.18 },
  labelColor: "255,255,255",
  labelOpacity: 0.48,
  titleOpacity: 0.62,
};

/** Cross-street labels — subdued so places read first. */
export const corridorLabels = [
  { x: 115, y: 228, label: "Indiana Ave", anchor: "middle" as const },
  { x: 268, y: 224, label: "Dunn St", anchor: "middle" as const },
  { x: 432, y: 222, label: "Grant St", anchor: "middle" as const },
  { x: 592, y: 224, label: "College Ave", anchor: "middle" as const },
  { x: 752, y: 228, label: "Walnut St", anchor: "middle" as const },
];

/** @deprecated Use KIRKWOOD_STREET_LABEL textPath in AerialMap. */
export const corridorTitle = {
  x: 500,
  y: 298,
  label: "Kirkwood Avenue",
};
