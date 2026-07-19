export interface ExhibitionHeroStage {
  id: string;
  src: string;
  alt: string;
}

/**
 * Homepage hero carousel slides.
 *
 * Interim sources use People's Park — the strongest complete image set on hand.
 * When corridor-wide exhibition renders exist, swap `src` to dedicated assets under
 * `/images/exhibition/`. See docs/image-style-guide.md § Exhibition homepage hero.
 *
 * Expected asset spec: ~1920×1080+ landscape, 16:9, no text overlays.
 */
export const EXHIBITION_HERO_STAGES: ExhibitionHeroStage[] = [
  {
    id: "peoples-park-today",
    src: "/images/opportunities/peoples-park/today/street.jpg",
    alt: "People's Park on Kirkwood Avenue today — seating, shade, and everyday street life",
  },
  {
    id: "performance-plaza",
    src: "/images/opportunities/peoples-park/try-soon/hero.webp",
    alt: "Concept rendering — a shared performance and gathering space at People's Park",
  },
  {
    id: "community-market",
    src: "/images/opportunities/peoples-park/grow/hero.webp",
    alt: "Concept rendering — a market lawn and evening gathering at People's Park",
  },
  {
    id: "outdoor-living-room",
    src: "/images/opportunities/peoples-park/long-term/hero.webp",
    alt: "Concept rendering — a shaded outdoor living room along Kirkwood Avenue",
  },
];

/** Milliseconds between automatic slide transitions. */
export const EXHIBITION_HERO_INTERVAL_MS = 6000;
