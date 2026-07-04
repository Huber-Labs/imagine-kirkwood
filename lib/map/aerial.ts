/** Aerial map configuration — SVG overlay coordinates match this viewBox. */
export const MAP_VIEWBOX = "0 0 1000 600";

/** Primary aerial photograph. */
export const AERIAL_IMAGE_PATH = "/images/aerials/kirkwood-aerial.png";

/** Fallback if the primary image is missing. */
export const AERIAL_IMAGE_FALLBACK = "/images/aerials/kirkwood-aerial.svg";

/** Editorial treatment — calm, limestone, not GIS. */
export const AERIAL_EDITORIAL = {
  /** feColorMatrix saturate: 0.5 = 50% desaturation */
  saturation: 0.5,
  /** Linear slope on RGB channels for subtle lift */
  brightness: { slope: 1.1, intercept: 0.05 },
  /** Soft blur to reduce roof/parking noise */
  soften: 0.75,
  /** Warm limestone wash */
  limestone: { color: "#F2EDE4", opacity: 0.44 },
  /** Edge vignette — warm, restrained */
  vignette: { color: "#1C1B18", opacity: 0.18 },
  /** Corridor labels — whisper, not signage */
  labelOpacity: 0.28,
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
