import {
  getDefaultFuture,
  getOpportunitySiteById,
  resolveFutureId,
} from "@/lib/data/opportunity-sites";
import type { TimelinePhase } from "@/lib/types";

/** Legacy phase URLs → future IDs (People's Park migration). */
export const LEGACY_PHASE_TO_FUTURE: Record<TimelinePhase, string> = {
  today: "reading-garden",
  "try-soon": "reading-garden",
  grow: "reading-garden",
  "long-term": "reading-garden",
};

const PHASE_IDS = new Set<TimelinePhase>([
  "today",
  "try-soon",
  "grow",
  "long-term",
]);

export function isLegacyTimelinePhase(
  value: string | null,
): value is TimelinePhase {
  return value !== null && PHASE_IDS.has(value as TimelinePhase);
}

export function parseExploreParams(searchParams: URLSearchParams): {
  siteId: string | null;
  conceptId: string | null;
} {
  const site = searchParams.get("site");
  const siteId = site && getOpportunitySiteById(site) ? site : null;

  if (!siteId) {
    return { siteId: null, conceptId: null };
  }

  const conceptParam = searchParams.get("concept");
  if (conceptParam) {
    return {
      siteId,
      conceptId: resolveFutureId(
        getOpportunitySiteById(siteId)!,
        conceptParam,
      ),
    };
  }

  const legacyPhase = searchParams.get("phase");
  if (isLegacyTimelinePhase(legacyPhase)) {
    const siteData = getOpportunitySiteById(siteId)!;
    const mappedId = LEGACY_PHASE_TO_FUTURE[legacyPhase];
    return {
      siteId,
      conceptId: resolveFutureId(siteData, mappedId),
    };
  }

  return { siteId, conceptId: null };
}

export function buildExploreUrl(
  siteId: string,
  conceptId?: string | null,
): string {
  const params = new URLSearchParams({ site: siteId });
  if (conceptId) {
    params.set("concept", conceptId);
  }
  return `/explore?${params.toString()}`;
}

export function buildExploreShareUrl(
  siteId: string,
  conceptId: string,
  origin?: string,
): string {
  const path = buildExploreUrl(siteId, conceptId);
  if (typeof window !== "undefined") {
    return `${window.location.origin}${path}`;
  }
  if (origin) {
    return `${origin.replace(/\/$/, "")}${path}`;
  }
  return path;
}

export function getDefaultConceptForSite(siteId: string): string | null {
  const site = getOpportunitySiteById(siteId);
  if (!site) return null;
  return getDefaultFuture(site)?.id ?? null;
}
