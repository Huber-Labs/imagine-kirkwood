import type { AuthorPlace, PlaceCategory } from "@/lib/author/types";
import type { MapPosition } from "@/lib/map/calibration";
import { opportunityLocations } from "@/lib/map/opportunity-locations";

export function slugifyTitle(title: string): string {
  return title
    .trim()
    .toLowerCase()
    .replace(/['']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);
}

export function cloneCommittedPlaces(): AuthorPlace[] {
  return opportunityLocations.map((location) => ({
    siteId: location.siteId,
    title: location.label,
    x: location.x,
    y: location.y,
    labelAlign: location.labelAlign,
    labelOffset: location.labelOffset,
    category: "other",
    notes: "",
    origin: "committed",
  }));
}

export function createScoutedPlace(
  mapPosition: MapPosition,
  existingPlaces: AuthorPlace[],
): AuthorPlace {
  const baseId = "new-place";
  let siteId = baseId;
  let suffix = 2;

  while (existingPlaces.some((place) => place.siteId === siteId)) {
    siteId = `${baseId}-${suffix}`;
    suffix += 1;
  }

  return {
    siteId,
    title: "New Place",
    x: mapPosition.x,
    y: mapPosition.y,
    labelAlign: "center",
    labelOffset: { x: 0, y: 18 },
    category: "other",
    notes: "",
    origin: "scouted",
  };
}

export function updateAuthorPlace(
  places: AuthorPlace[],
  siteId: string,
  patch: Partial<
    Pick<
      AuthorPlace,
      | "siteId"
      | "title"
      | "x"
      | "y"
      | "category"
      | "notes"
      | "labelAlign"
      | "labelOffset"
    >
  >,
): AuthorPlace[] {
  return places.map((place) => {
    if (place.siteId !== siteId) return place;
    return { ...place, ...patch };
  });
}

export function deleteScoutedPlace(
  places: AuthorPlace[],
  siteId: string,
): AuthorPlace[] {
  return places.filter(
    (place) => !(place.siteId === siteId && place.origin === "scouted"),
  );
}

export function moveAuthorPlace(
  places: AuthorPlace[],
  siteId: string,
  mapPosition: MapPosition,
): AuthorPlace[] {
  return updateAuthorPlace(places, siteId, mapPosition);
}

export function hasDuplicateSlug(
  places: AuthorPlace[],
  candidateSlug: string,
  activeSiteId: string,
): boolean {
  const matching = places.filter((place) => place.siteId === candidateSlug);
  if (matching.length === 0) return false;
  if (matching.length === 1) return matching[0].siteId !== activeSiteId;
  return true;
}

export function renameAuthorPlaceSlug(
  places: AuthorPlace[],
  oldSiteId: string,
  newSiteId: string,
): AuthorPlace[] {
  return places.map((place) =>
    place.siteId === oldSiteId ? { ...place, siteId: newSiteId } : place,
  );
}

export function toOpportunityLocationFields(place: AuthorPlace) {
  return {
    siteId: place.siteId,
    x: place.x,
    y: place.y,
    label: place.title,
    labelAlign: place.labelAlign,
    labelOffset: place.labelOffset,
  };
}

export function categoryLabel(category: PlaceCategory): string {
  return category
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}
