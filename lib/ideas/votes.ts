const STORAGE_PREFIX = "imagine-kirkwood:votes:";

function storageKey(siteId: string): string {
  return `${STORAGE_PREFIX}${siteId}`;
}

export function getSupportedIdeaIds(siteId: string): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(storageKey(siteId));
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed)
      ? parsed.filter((id): id is string => typeof id === "string")
      : [];
  } catch {
    return [];
  }
}

export function isIdeaSupported(siteId: string, ideaId: string): boolean {
  return getSupportedIdeaIds(siteId).includes(ideaId);
}

export function toggleIdeaSupport(siteId: string, ideaId: string): boolean {
  const supported = getSupportedIdeaIds(siteId);
  const isSupported = supported.includes(ideaId);
  const next = isSupported
    ? supported.filter((id) => id !== ideaId)
    : [...supported, ideaId];
  localStorage.setItem(storageKey(siteId), JSON.stringify(next));
  return !isSupported;
}

export function getIdeaVoteCount(
  siteId: string,
  ideaId: string,
  seedVotes = 0,
): number {
  return seedVotes + (isIdeaSupported(siteId, ideaId) ? 1 : 0);
}
