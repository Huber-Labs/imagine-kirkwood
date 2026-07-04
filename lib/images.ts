export function getTodayPhotoPath(areaId: string): string {
  return `/images/today/${areaId}/photo.webp`;
}

export function getPrecedentImagePath(
  areaId: string,
  precedentId: string,
): string {
  return `/images/precedents/${areaId}/${precedentId}.webp`;
}

export const PHOTO_PLACEHOLDER_PATH = "/images/placeholders/photo.svg";
