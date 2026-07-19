export interface ExhibitionHeroStage {
  id: string;
  src: string;
  alt: string;
}

/**
 * Homepage hero carousel slides.
 *
 * When additional corridor-wide exhibition renders exist, add slides under
 * `/images/exhibition/`. See docs/image-style-guide.md § Exhibition homepage hero.
 *
 * Expected asset spec: ~1920×1080+ landscape, 16:9, no text overlays.
 */
export const EXHIBITION_HERO_STAGES: ExhibitionHeroStage[] = [
  {
    id: "peoples-park-reading-garden",
    src: "/images/opportunities/peoples-park/hero.png",
    alt: "Concept rendering — a reading garden for People's Park on Kirkwood Avenue",
  },
];

/** Milliseconds between automatic slide transitions. */
export const EXHIBITION_HERO_INTERVAL_MS = 6000;
