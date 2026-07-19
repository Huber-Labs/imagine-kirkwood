/**
 * Session-only authoring model for Author Mode.
 *
 * AuthorPlace holds in-memory edits while scouting or repositioning locations.
 * It is NOT the public exhibition data model and must not be treated as a future
 * container for community submissions — moderated submissions remain separate
 * entities that may reference coordinates or an existing Place.
 */

export type PlaceCategory =
  | "street"
  | "park"
  | "alley"
  | "parking-lot"
  | "corner"
  | "plaza"
  | "gateway"
  | "building"
  | "other";

export type PlaceOrigin = "committed" | "scouted";

export const PLACE_CATEGORIES: { value: PlaceCategory; label: string }[] = [
  { value: "street", label: "Street" },
  { value: "park", label: "Park" },
  { value: "alley", label: "Alley" },
  { value: "parking-lot", label: "Parking Lot" },
  { value: "corner", label: "Corner" },
  { value: "plaza", label: "Plaza" },
  { value: "gateway", label: "Gateway" },
  { value: "building", label: "Building" },
  { value: "other", label: "Other" },
];

export interface AuthorPlace {
  siteId: string;
  title: string;
  x: number;
  y: number;
  labelAlign?: "left" | "center" | "right";
  labelOffset?: { x: number; y: number };
  category: PlaceCategory;
  /** Internal scratchpad — never exported to public map or site files. */
  notes: string;
  origin: PlaceOrigin;
}
