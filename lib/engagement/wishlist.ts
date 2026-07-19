const STORAGE_KEY = "imagine-kirkwood:wishlist:v2";

export interface WishlistItem {
  siteId: string;
  futureId: string;
  savedAt: number;
}

function readWishlist(): WishlistItem[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as WishlistItem[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeWishlist(items: WishlistItem[]): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

function itemKey(siteId: string, futureId: string): string {
  return `${siteId}:${futureId}`;
}

export function getWishlist(): WishlistItem[] {
  return readWishlist().sort((a, b) => b.savedAt - a.savedAt);
}

export function isInWishlist(siteId: string, futureId: string): boolean {
  const key = itemKey(siteId, futureId);
  return readWishlist().some(
    (item) => itemKey(item.siteId, item.futureId) === key,
  );
}

export function toggleWishlist(siteId: string, futureId: string): boolean {
  const items = readWishlist();
  const key = itemKey(siteId, futureId);
  const existing = items.find(
    (item) => itemKey(item.siteId, item.futureId) === key,
  );

  if (existing) {
    writeWishlist(
      items.filter((item) => itemKey(item.siteId, item.futureId) !== key),
    );
    return false;
  }

  writeWishlist([{ siteId, futureId, savedAt: Date.now() }, ...items]);
  return true;
}

export function getWishlistCount(): number {
  return readWishlist().length;
}
