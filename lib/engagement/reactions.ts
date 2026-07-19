export type ReactionType = "love" | "worth-trying";

const STORAGE_PREFIX = "imagine-kirkwood:reactions:v2:";

function storageKey(siteId: string): string {
  return `${STORAGE_PREFIX}${siteId}`;
}

function readReactions(siteId: string): Record<string, ReactionType[]> {
  if (typeof window === "undefined") return {};

  try {
    const raw = window.localStorage.getItem(storageKey(siteId));
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Record<string, ReactionType[]>;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function writeReactions(
  siteId: string,
  reactions: Record<string, ReactionType[]>,
): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(storageKey(siteId), JSON.stringify(reactions));
}

export function getFutureReactions(
  siteId: string,
  futureId: string,
): ReactionType[] {
  return readReactions(siteId)[futureId] ?? [];
}

export function hasReaction(
  siteId: string,
  futureId: string,
  type: ReactionType,
): boolean {
  return getFutureReactions(siteId, futureId).includes(type);
}

export function toggleReaction(
  siteId: string,
  futureId: string,
  type: ReactionType,
): boolean {
  const reactions = readReactions(siteId);
  const current = reactions[futureId] ?? [];
  const isActive = current.includes(type);
  const next = isActive
    ? current.filter((entry) => entry !== type)
    : [...current, type];

  if (next.length === 0) {
    delete reactions[futureId];
  } else {
    reactions[futureId] = next;
  }

  writeReactions(siteId, reactions);
  return !isActive;
}
