import type { TimelinePhase } from "@/lib/types";
import { LEGACY_PHASE_TO_FUTURE } from "@/lib/engagement/explore-url";

const MIGRATION_FLAG = "imagine-kirkwood:engagement-migrated:v2";

/** Best-effort map from v1 idea IDs to v2 future IDs (People's Park). */
const IDEA_TO_FUTURE: Record<string, string> = {
  "idea-pp-seating": "reading-garden",
  "idea-pp-shade-umbrellas": "reading-garden",
  "idea-pp-weekend-music": "reading-garden",
  "idea-pp-pop-up-stage": "reading-garden",
  "idea-pp-food-carts": "reading-garden",
  "idea-pp-shade-grove": "reading-garden",
  "idea-pp-event-power": "reading-garden",
  "idea-pp-amphitheater": "reading-garden",
};

function phaseFallbackFuture(phase: TimelinePhase | undefined): string | null {
  if (!phase || phase === "today") {
    return LEGACY_PHASE_TO_FUTURE.today;
  }
  return LEGACY_PHASE_TO_FUTURE[phase] ?? null;
}

export function migrateEngagementStorage(): void {
  if (typeof window === "undefined") return;
  if (window.localStorage.getItem(MIGRATION_FLAG)) return;

  migrateReactions();
  migrateWishlist();

  window.localStorage.setItem(MIGRATION_FLAG, new Date().toISOString());
}

function migrateReactions(): void {
  for (let index = 0; index < window.localStorage.length; index += 1) {
    const key = window.localStorage.key(index);
    if (!key?.startsWith("imagine-kirkwood:reactions:")) continue;
    if (key.includes(":v2:")) continue;

    const siteId = key.replace("imagine-kirkwood:reactions:", "");
    if (!siteId) continue;

    try {
      const raw = window.localStorage.getItem(key);
      if (!raw) continue;

      const legacy = JSON.parse(raw) as Record<
        string,
        ("love" | "worth-trying")[]
      >;
      const next: Record<string, ("love" | "worth-trying")[]> = {};

      for (const [ideaId, reactions] of Object.entries(legacy)) {
        const futureId = IDEA_TO_FUTURE[ideaId];
        if (!futureId) continue;

        const existing = next[futureId] ?? [];
        next[futureId] = [...new Set([...existing, ...reactions])];
      }

      if (Object.keys(next).length > 0) {
        window.localStorage.setItem(
          `imagine-kirkwood:reactions:v2:${siteId}`,
          JSON.stringify(next),
        );
      }
    } catch {
      // Skip corrupt legacy entries.
    }
  }
}

function migrateWishlist(): void {
  const legacyKey = "imagine-kirkwood:wishlist";
  const raw = window.localStorage.getItem(legacyKey);
  if (!raw) return;

  try {
    const legacy = JSON.parse(raw) as Array<{
      siteId: string;
      ideaId: string;
      savedAt: number;
      phase?: TimelinePhase;
    }>;

    if (!Array.isArray(legacy)) return;

    const existingRaw = window.localStorage.getItem(
      "imagine-kirkwood:wishlist:v2",
    );
    const existing = existingRaw
      ? (JSON.parse(existingRaw) as Array<{
          siteId: string;
          futureId: string;
          savedAt: number;
        }>)
      : [];

    const keys = new Set(
      existing.map((item) => `${item.siteId}:${item.futureId}`),
    );
    const migrated = [...existing];

    for (const item of legacy) {
      const futureId =
        IDEA_TO_FUTURE[item.ideaId] ?? phaseFallbackFuture(item.phase);
      if (!futureId) continue;

      const key = `${item.siteId}:${futureId}`;
      if (keys.has(key)) continue;

      keys.add(key);
      migrated.push({
        siteId: item.siteId,
        futureId,
        savedAt: item.savedAt,
      });
    }

    if (migrated.length > 0) {
      window.localStorage.setItem(
        "imagine-kirkwood:wishlist:v2",
        JSON.stringify(migrated),
      );
    }
  } catch {
    // Skip corrupt legacy entries.
  }
}
