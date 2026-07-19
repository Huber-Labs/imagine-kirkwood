import { toOpportunityLocationFields } from "@/lib/author/session";
import type { AuthorPlace } from "@/lib/author/types";

const DEFAULT_STUB_AREA_ID = "theater-row";
const DEFAULT_STUB_ACCENT = "#7B6BA8";

function escapeString(value: string): string {
  return value.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

function formatLabelAlign(align: AuthorPlace["labelAlign"]): string {
  return align ?? "center";
}

function formatLabelOffset(offset: AuthorPlace["labelOffset"]): string {
  const value = offset ?? { x: 0, y: 18 };
  return `{ x: ${value.x}, y: ${value.y} }`;
}

export function formatMapEntry(place: AuthorPlace): string {
  const fields = toOpportunityLocationFields(place);

  return `{
  siteId: "${escapeString(fields.siteId)}",
  x: ${fields.x.toFixed(1)},
  y: ${fields.y.toFixed(1)},
  label: "${escapeString(fields.label)}",
  labelAlign: "${formatLabelAlign(fields.labelAlign)}",
  labelOffset: ${formatLabelOffset(fields.labelOffset)},
},`;
}

export function formatAllMapEntries(places: AuthorPlace[]): string {
  const body = places.map((place) => formatMapEntry(place)).join("\n");
  return `export const opportunityLocations: OpportunityLocation[] = [
${body}
];`;
}

/**
 * Minimal OpportunitySite stub — matches createPlaceholderSite() in
 * lib/data/opportunity-sites.ts for pasting into opportunitySites[].
 */
export function formatPlaceStub(place: AuthorPlace): string {
  return `createPlaceholderSite(
  "${escapeString(place.siteId)}",
  "${escapeString(place.title)}",
  "${DEFAULT_STUB_AREA_ID}",
  "${DEFAULT_STUB_ACCENT}",
),`;
}
