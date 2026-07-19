import { buildExploreShareUrl } from "@/lib/engagement/explore-url";

export type ShareResult = "shared" | "copied" | "cancelled" | "unsupported";

export async function shareFuture(options: {
  siteName: string;
  siteId: string;
  futureId: string;
  futureTitle: string;
  shareHook?: string;
  description: string;
}): Promise<ShareResult> {
  const url = buildExploreShareUrl(options.siteId, options.futureId);
  const title = `${options.futureTitle} — ${options.siteName}`;
  const text = options.shareHook ?? options.description;

  if (typeof navigator !== "undefined" && navigator.share) {
    try {
      await navigator.share({ title, text, url });
      return "shared";
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return "cancelled";
      }
    }
  }

  if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(url);
      return "copied";
    } catch {
      return "unsupported";
    }
  }

  return "unsupported";
}
