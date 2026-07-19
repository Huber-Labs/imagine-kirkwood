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

function AuthorPanelIntro() {
  return (
    <div className="author-mode-panel__intro">
      <p className="author-mode-panel__hint">
        Developer tool. Changes are temporary until copied into the project files.
      </p>
      <ul className="author-mode-panel__hint-list">
        <li>Copy Coordinates updates an existing map location.</li>
        <li>Copy Site Record copies a starter entry for a new opportunity.</li>
        <li>Export All Coordinates copies every calibrated location at once.</li>
      </ul>
    </div>
  );
}

function AuthorPanelDestinations() {
  return (
    <div className="author-mode-panel__destinations">
      <div className="author-mode-panel__destination">
        <span className="author-mode-panel__destination-label">Coordinates</span>
        <span className="author-mode-panel__destination-arrow">→</span>
        <code>lib/map/opportunity-locations.ts</code>
      </div>
      <div className="author-mode-panel__destination">
        <span className="author-mode-panel__destination-label">Site Records</span>
        <span className="author-mode-panel__destination-arrow">→</span>
        <code>lib/data/opportunity-sites.ts</code>
      </div>
    </div>
  );
}

function AuthorPanelWorkflow() {
  return (
    <div className="author-mode-panel__workflow">
      <p className="author-mode-panel__workflow-title">Typical workflow</p>
      <ol className="author-mode-panel__workflow-list">
        <li>Add New Place</li>
        <li>Drag to correct position</li>
        <li>Fill in title &amp; category</li>
        <li>Copy Coordinates</li>
        <li>Copy Site Record (new places only)</li>
      </ol>
    </div>
  );
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
        <p className="author-mode-panel__hint">
          Select a place or add a new one to edit.
        </p>
        <AuthorPanelIntro />
        <AuthorPanelDestinations />
        <AuthorPanelWorkflow />
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
      <AuthorPanelIntro />

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

      <AuthorPanelDestinations />
      <AuthorPanelWorkflow />
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
    await copyText(formatMapEntry(activePlace), "Coordinates copied");
  }, [activePlace, copyText]);

  const copyPlaceStub = useCallback(async () => {
    if (!activePlace || activePlace.origin !== "scouted") return;
    await copyText(formatPlaceStub(activePlace), "Site record copied");
  }, [activePlace, copyText]);

  const copyAllMapEntries = useCallback(async () => {
    await copyText(formatAllMapEntries(places), "All coordinates copied");
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
