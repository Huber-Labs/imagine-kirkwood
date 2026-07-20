"use client";

import { useCallback, useState } from "react";
import {
  hasReaction,
  toggleReaction,
  type ReactionType,
} from "@/lib/engagement/reactions";
import { shareFuture } from "@/lib/engagement/share";
import { isInWishlist, toggleWishlist } from "@/lib/engagement/wishlist";
import type { PlaceFuture } from "@/lib/types";

interface FutureEngagementProps {
  siteId: string;
  siteName: string;
  future: PlaceFuture;
}

export function FutureEngagement({
  siteId,
  siteName,
  future,
}: FutureEngagementProps) {
  const [version, setVersion] = useState(0);
  const [shareFeedback, setShareFeedback] = useState<string | null>(null);

  const bump = useCallback(() => setVersion((v) => v + 1), []);

  void version;

  const loved = hasReaction(siteId, future.id, "love");
  const worthTrying = hasReaction(siteId, future.id, "worth-trying");
  const saved = isInWishlist(siteId, future.id);

  const handleReaction = useCallback(
    (type: ReactionType) => {
      toggleReaction(siteId, future.id, type);
      bump();
    },
    [siteId, future.id, bump],
  );

  const handleSave = useCallback(() => {
    toggleWishlist(siteId, future.id);
    bump();
  }, [siteId, future.id, bump]);

  const handleShare = useCallback(async () => {
    const result = await shareFuture({
      siteId,
      siteName,
      futureId: future.id,
      futureTitle: future.title,
      shareHook: future.shareHook,
      description: future.description,
    });

    if (result === "shared") {
      setShareFeedback("Shared");
    } else if (result === "copied") {
      setShareFeedback("Link copied");
    } else if (result === "cancelled") {
      return;
    } else {
      setShareFeedback("Copy unavailable");
    }

    window.setTimeout(() => setShareFeedback(null), 2000);
  }, [siteId, siteName, future]);

  return (
    <div className="future-engagement">
      <div className="future-engagement__actions">
        <button
          type="button"
          className={`future-engagement__action${loved ? " future-engagement__action--active" : ""}`}
          aria-pressed={loved}
          aria-label={loved ? "Unlove this idea" : "Love this idea"}
          onClick={() => handleReaction("love")}
        >
          Love this idea
        </button>
        <button
          type="button"
          className={`future-engagement__action${worthTrying ? " future-engagement__action--active" : ""}`}
          aria-pressed={worthTrying}
          aria-label={
            worthTrying ? "Remove worth trying" : "Mark worth trying"
          }
          onClick={() => handleReaction("worth-trying")}
        >
          Worth trying
        </button>
        <button
          type="button"
          className={`future-engagement__action future-engagement__action--save${saved ? " future-engagement__action--active" : ""}`}
          aria-pressed={saved}
          aria-label={saved ? "Remove from saves" : "Save this idea"}
          onClick={handleSave}
        >
          {saved ? "Saved" : "Save"}
        </button>
        <button
          type="button"
          className="future-engagement__action future-engagement__action--share"
          aria-label={`Share ${future.title}`}
          onClick={handleShare}
        >
          {shareFeedback ?? "Share"}
        </button>
      </div>
    </div>
  );
}
