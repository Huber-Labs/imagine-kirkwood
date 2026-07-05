export function getSitePhotoPath(siteId: string): string {
  return `/images/today/${siteId}/photo.webp`;
}

export function getPrecedentImagePath(
  siteId: string,
  precedentId: string,
): string {
  return `/images/precedents/${siteId}/${precedentId}.webp`;
}

export const PHOTO_PLACEHOLDER_PATH = "/images/placeholders/photo.svg";
