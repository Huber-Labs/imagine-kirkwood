import type { TimelinePhase } from "@/lib/types";

/** Phase hero rendering for an opportunity site. */
export function getSiteConceptImage(
  siteId: string,
  phase: Exclude<TimelinePhase, "today"> = "long-term",
): string {
  return `/images/opportunities/${siteId}/${phase}/hero.webp`;
}

export const CONCEPT_PLACEHOLDER_PATH = "/images/concepts/placeholder.svg";
