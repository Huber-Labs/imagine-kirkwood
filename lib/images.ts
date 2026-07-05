export function getSitePhotoPath(siteId: string): string {
  return `/images/opportunities/${siteId}/today/street.jpg`;
}

export function getPrecedentImagePath(
  siteId: string,
  precedentIndex: number,
): string {
  const file = String(precedentIndex).padStart(2, "0");
  return `/images/opportunities/${siteId}/precedents/${file}.jpg`;
}

export const PHOTO_PLACEHOLDER_PATH = "/images/placeholders/photo.svg";
