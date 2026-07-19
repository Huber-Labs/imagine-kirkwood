import type { FutureQuality } from "@/lib/types";

export const FUTURE_QUALITIES: FutureQuality[] = [
  "shade",
  "seating",
  "trees",
  "dining",
  "music",
  "performance",
  "markets",
  "families",
  "play",
  "reading",
  "coworking",
  "public-art",
  "cycling",
  "rain-gardens",
  "nightlife",
  "history",
];

export const QUALITY_LABELS: Record<FutureQuality, string> = {
  shade: "Shade",
  seating: "Flexible seating",
  trees: "Trees",
  dining: "Outdoor dining",
  music: "Live music",
  performance: "Performances",
  markets: "Markets",
  families: "Families",
  play: "Play",
  reading: "Reading",
  coworking: "Outdoor work",
  "public-art": "Public art",
  cycling: "Cycling",
  "rain-gardens": "Rain gardens",
  nightlife: "Evening energy",
  history: "Local history",
};

export function getPerfectForLabels(future: {
  qualities: FutureQuality[];
  perfectFor?: string[];
}): string[] {
  if (future.perfectFor && future.perfectFor.length > 0) {
    return future.perfectFor;
  }
  return future.qualities.map((quality) => QUALITY_LABELS[quality]);
}
