"use client";

import { useCallback, useState } from "react";
import { AuthorPlacePanel, useAuthorPlacePanelActions } from "@/components/author/AuthorPlacePanel";
import { AuthorModeFeedback, AuthorToolbar } from "@/components/author/AuthorToolbar";
import { AerialMap } from "@/components/map/AerialMap";
import {
  cloneCommittedPlaces,
  createScoutedPlace,
  deleteScoutedPlace,
  moveAuthorPlace,
  renameAuthorPlaceSlug,
  updateAuthorPlace,
} from "@/lib/author/session";
import type { AuthorPlace } from "@/lib/author/types";
import type { MapPosition } from "@/lib/map/calibration";

interface AuthorModeShellProps {
  onSelectSiteBlocked: () => void;
}

export function AuthorModeShell({ onSelectSiteBlocked }: AuthorModeShellProps) {
  const [draftPlaces, setDraftPlaces] = useState<AuthorPlace[]>(cloneCommittedPlaces);
  const [activePlaceId, setActivePlaceId] = useState<string | null>(
    draftPlaces[0]?.siteId ?? null,
  );
  const [scoutToolActive, setScoutToolActive] = useState(false);

  const {
    feedback,
    copyMapEntry,
    copyPlaceStub,
    copyAllMapEntries,
    canDelete,
    canCopyPlaceStub,
    canCopyMapEntry,
  } = useAuthorPlacePanelActions(draftPlaces, activePlaceId);

  const handlePlaceSelect = useCallback((siteId: string) => {
    setScoutToolActive(false);
    setActivePlaceId(siteId);
  }, []);

  const handlePlaceMove = useCallback(
    (siteId: string, mapPosition: MapPosition) => {
      setDraftPlaces((current) => moveAuthorPlace(current, siteId, mapPosition));
      setActivePlaceId(siteId);
    },
    [],
  );

  const handleMapScout = useCallback((mapPosition: MapPosition) => {
    setDraftPlaces((current) => {
      const nextPlace = createScoutedPlace(mapPosition, current);
      setActivePlaceId(nextPlace.siteId);
      setScoutToolActive(false);
      return [...current, nextPlace];
    });
  }, []);

  const handleUpdatePlace = useCallback(
    (siteId: string, patch: Partial<AuthorPlace>) => {
      setDraftPlaces((current) => updateAuthorPlace(current, siteId, patch));
    },
    [],
  );

  const handleRenamePlace = useCallback((oldSiteId: string, newSiteId: string) => {
    if (!newSiteId || oldSiteId === newSiteId) return;
    setDraftPlaces((current) => renameAuthorPlaceSlug(current, oldSiteId, newSiteId));
    setActivePlaceId((current) => (current === oldSiteId ? newSiteId : current));
  }, []);

  const handleDelete = useCallback(() => {
    if (!activePlaceId) return;
    setDraftPlaces((current) => {
      const next = deleteScoutedPlace(current, activePlaceId);
      setActivePlaceId(next[0]?.siteId ?? null);
      return next;
    });
  }, [activePlaceId]);

  return (
    <>
      <div className="author-mode-toolbar-wrap">
        <AuthorToolbar
          scoutToolActive={scoutToolActive}
          canDelete={canDelete}
          canCopyPlaceStub={canCopyPlaceStub}
          canCopyMapEntry={canCopyMapEntry}
          onScoutPlace={() => setScoutToolActive((active) => !active)}
          onDelete={handleDelete}
          onCopyMapEntry={copyMapEntry}
          onCopyPlaceStub={copyPlaceStub}
          onCopyAllMapEntries={copyAllMapEntries}
        />
        <AuthorModeFeedback message={feedback} />
      </div>

      <AerialMap
        selectedSiteId={null}
        onSelectSite={onSelectSiteBlocked}
        authorMode
        draftPlaces={draftPlaces}
        activePlaceId={activePlaceId}
        scoutToolActive={scoutToolActive}
        onPlaceSelect={handlePlaceSelect}
        onPlaceMove={handlePlaceMove}
        onMapScout={handleMapScout}
      />

      <AuthorPlacePanel
        places={draftPlaces}
        activeSiteId={activePlaceId}
        onUpdatePlace={handleUpdatePlace}
        onRenamePlace={handleRenamePlace}
      />
    </>
  );
}
