export function getSitePhotoPath(siteId: string): string {
  return `/images/opportunities/${siteId}/today/street.jpg`;
}

const preloadedConceptImages = new Set<string>();

/** Start fetching a concept hero as soon as a place is selected. */
export function preloadConceptImage(src: string): void {
  if (typeof window === "undefined" || !src || preloadedConceptImages.has(src)) {
    return;
  }
  preloadedConceptImages.add(src);
  const img = new window.Image();
  img.src = src;
}

export function getPrecedentImagePath(
  siteId: string,
  precedentIndex: number,
): string {
  const file = String(precedentIndex).padStart(2, "0");
  return `/images/opportunities/${siteId}/precedents/${file}.jpg`;
}

export const PHOTO_PLACEHOLDER_PATH = "/images/placeholders/photo.svg";
