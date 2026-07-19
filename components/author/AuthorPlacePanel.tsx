"use client";

import { useCallback, useState } from "react";
import {
  formatAllMapEntries,
  formatMapEntry,
  formatPlaceStub,
} from "@/lib/author/export";
import {
  hasDuplicateSlug,
  slugifyTitle,
} from "@/lib/author/session";
import {
  PLACE_CATEGORIES,
  type AuthorPlace,
  type PlaceCategory,
} from "@/lib/author/types";

interface AuthorPlacePanelProps {
  places: AuthorPlace[];
  activeSiteId: string | null;
  onUpdatePlace: (siteId: string, patch: Partial<AuthorPlace>) => void;
  onRenamePlace: (oldSiteId: string, newSiteId: string) => void;
}

export function AuthorPlacePanel({
  places,
  activeSiteId,
  onUpdatePlace,
  onRenamePlace,
}: AuthorPlacePanelProps) {
  const activePlace = activeSiteId
    ? places.find((place) => place.siteId === activeSiteId)
    : places[0];

  if (!activePlace) {
    return (
      <aside className="author-mode-panel" aria-label="Author mode place editor">
        <p className="author-mode-panel__banner">Author Mode</p>
        <p className="author-mode-panel__hint">Select or scout a place to edit.</p>
      </aside>
    );
  }

  const slugDuplicate = hasDuplicateSlug(
    places,
    activePlace.siteId,
    activePlace.siteId,
  );

  return (
    <aside className="author-mode-panel" aria-label="Author mode place editor">
      <p className="author-mode-panel__banner">Author Mode</p>
      <p className="author-mode-panel__hint">
        Session-only edits. Copy map entries and place stubs into source files.
      </p>

      <form
        className="author-mode-panel__form"
        onSubmit={(event) => event.preventDefault()}
      >
        <label className="author-mode-panel__field">
          <span>Title</span>
          <input
            type="text"
            value={activePlace.title}
            onChange={(event) =>
              onUpdatePlace(activePlace.siteId, { title: event.target.value })
            }
          />
        </label>

        <label className="author-mode-panel__field">
          <span>Slug</span>
          <input
            type="text"
            defaultValue={activePlace.siteId}
            key={activePlace.siteId}
            onBlur={(event) => {
              const nextSlug = slugifyTitle(event.target.value);
              if (!nextSlug || nextSlug === activePlace.siteId) return;
              onRenamePlace(activePlace.siteId, nextSlug);
            }}
          />
          {slugDuplicate && (
            <span className="author-mode-panel__warning">
              Slug already in use on the map.
            </span>
          )}
        </label>

        <label className="author-mode-panel__field">
          <span>Category</span>
          <select
            value={activePlace.category}
            onChange={(event) =>
              onUpdatePlace(activePlace.siteId, {
                category: event.target.value as PlaceCategory,
              })
            }
          >
            {PLACE_CATEGORIES.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </label>

        <label className="author-mode-panel__field">
          <span>Notes</span>
          <textarea
            rows={4}
            value={activePlace.notes}
            placeholder="Internal scratchpad while scouting downtown…"
            onChange={(event) =>
              onUpdatePlace(activePlace.siteId, { notes: event.target.value })
            }
          />
        </label>

        <dl className="author-mode-panel__readout">
          <div>
            <dt>X</dt>
            <dd>{activePlace.x.toFixed(1)}</dd>
          </div>
          <div>
            <dt>Y</dt>
            <dd>{activePlace.y.toFixed(1)}</dd>
          </div>
          <div>
            <dt>Origin</dt>
            <dd>{activePlace.origin === "scouted" ? "Scouted" : "Committed"}</dd>
          </div>
        </dl>
      </form>

      <pre className="author-mode-panel__listing">
        {places
          .map(
            (place) =>
              `${place.siteId}: x=${place.x.toFixed(1)}, y=${place.y.toFixed(1)} (${place.origin})`,
          )
          .join("\n")}
      </pre>

      <p className="author-mode-panel__commit">
        Map entries → <code>lib/map/opportunity-locations.ts</code>
        <br />
        Place stubs → <code>lib/data/opportunity-sites.ts</code>
      </p>
    </aside>
  );
}

export function useAuthorPlacePanelActions(
  places: AuthorPlace[],
  activeSiteId: string | null,
) {
  const [feedback, setFeedback] = useState<string | null>(null);

  const activePlace = activeSiteId
    ? places.find((place) => place.siteId === activeSiteId)
    : null;

  const showFeedback = useCallback((message: string) => {
    setFeedback(message);
    window.setTimeout(() => setFeedback(null), 2000);
  }, []);

  const copyText = useCallback(
    async (text: string, successMessage: string) => {
      try {
        await navigator.clipboard.writeText(text);
        showFeedback(successMessage);
      } catch {
        showFeedback("Copy failed");
      }
    },
    [showFeedback],
  );

  const copyMapEntry = useCallback(async () => {
    if (!activePlace) return;
    await copyText(formatMapEntry(activePlace), "Map entry copied");
  }, [activePlace, copyText]);

  const copyPlaceStub = useCallback(async () => {
    if (!activePlace || activePlace.origin !== "scouted") return;
    await copyText(formatPlaceStub(activePlace), "Place stub copied");
  }, [activePlace, copyText]);

  const copyAllMapEntries = useCallback(async () => {
    await copyText(formatAllMapEntries(places), "All map entries copied");
  }, [places, copyText]);

  return {
    feedback,
    copyMapEntry,
    copyPlaceStub,
    copyAllMapEntries,
    canDelete: activePlace?.origin === "scouted",
    canCopyPlaceStub: activePlace?.origin === "scouted",
    canCopyMapEntry: activePlace !== null,
  };
}
