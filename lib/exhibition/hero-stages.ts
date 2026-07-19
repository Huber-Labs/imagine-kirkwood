import type { TimelinePhase } from "@/lib/types";

export interface ExhibitionHeroStage {
  id: TimelinePhase;
  label: string;
  /** Interim: People's Park assets. Future corridor-wide paths documented below. */
  src: string;
  alt: string;
}

/**
 * Homepage hero transformation stages.
 *
 * Interim sources use People's Park — the strongest complete image set on hand.
 * When corridor-wide exhibition renders exist, swap `src` to:
 *   /images/exhibition/today.webp
 *   /images/exhibition/try-soon.webp
 *   /images/exhibition/grow.webp
 *   /images/exhibition/long-term.webp
 *
 * Expected asset spec: ~1920×1080+ landscape, 16:9, no text overlays.
 * See docs/image-style-guide.md § Exhibition homepage hero.
 */
export const EXHIBITION_HERO_STAGES: ExhibitionHeroStage[] = [
  {
    id: "today",
    label: "Today",
    src: "/images/opportunities/peoples-park/today/street.jpg",
    alt: "People's Park on Kirkwood Avenue today — seating, shade, and a light-touch pilot",
  },
  {
    id: "try-soon",
    label: "Try Something",
    src: "/images/opportunities/peoples-park/try-soon/hero.webp",
    alt: "Concept rendering — a more active shared street with experiments and gathering",
  },
  {
    id: "grow",
    label: "Grow What Works",
    src: "/images/opportunities/peoples-park/grow/hero.webp",
    alt: "Concept rendering — growing successful street improvements along Kirkwood",
  },
  {
    id: "long-term",
    label: "Long-Term Vision",
    src: "/images/opportunities/peoples-park/long-term/hero.webp",
    alt: "Concept rendering — a long-term pedestrian-oriented Kirkwood destination",
  },
];

/** Seconds between automatic stage transitions. */
export const EXHIBITION_HERO_INTERVAL_MS = 6000;
