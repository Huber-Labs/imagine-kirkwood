"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { AuthStatus } from "@/components/auth/AuthStatus";
import { SignInSheet } from "@/components/auth/SignInSheet";
import { AuthorModeShell } from "@/components/author/AuthorModeShell";
import { AerialMap } from "@/components/map/AerialMap";
import { MapAttribution, MapChrome } from "@/components/map/MapChrome";
import { MapLegend } from "@/components/map/MapLegend";
import { SlideOutPanel } from "@/components/panel/SlideOutPanel";
import {
  getDefaultFuture,
  getOpportunitySiteById,
} from "@/lib/data/opportunity-sites";
import { AUTHOR_MODE_URL, isAuthorModeEnabled } from "@/lib/author/mode";
import { migrateEngagementStorage } from "@/lib/engagement/migrate";
import { parseExploreParams } from "@/lib/engagement/explore-url";
import { preloadConceptImage } from "@/lib/images";

function readInitialExploreState(
  searchParams: ReturnType<typeof useSearchParams>,
) {
  const { siteId, conceptId } = parseExploreParams(searchParams);
  return {
    selectedSiteId: siteId,
    focusedConceptId: conceptId,
    panelOpen: siteId !== null,
  };
}

export function MapExperience() {
  const searchParams = useSearchParams();
  const authorMode = isAuthorModeEnabled(searchParams);
  const [selectedSiteId, setSelectedSiteId] = useState<string | null>(
    () => (authorMode ? null : readInitialExploreState(searchParams).selectedSiteId),
  );
  const [focusedConceptId, setFocusedConceptId] = useState<string | null>(
    () => (authorMode ? null : readInitialExploreState(searchParams).focusedConceptId),
  );
  const [panelOpen, setPanelOpen] = useState(
    () => (authorMode ? false : readInitialExploreState(searchParams).panelOpen),
  );

  const selectedSite = selectedSiteId
    ? getOpportunitySiteById(selectedSiteId) ?? null
    : null;

  useEffect(() => {
    migrateEngagementStorage();
  }, []);

  useEffect(() => {
    if (!selectedSite) return;
    const future = getDefaultFuture(selectedSite);
    if (future?.image) {
      preloadConceptImage(future.image);
    }
  }, [selectedSite]);

  useEffect(() => {
    if (authorMode) {
      window.history.replaceState(null, "", AUTHOR_MODE_URL);
      return;
    }

    if (panelOpen && selectedSiteId) {
      const params = new URLSearchParams({ site: selectedSiteId });
      if (focusedConceptId) {
        params.set("concept", focusedConceptId);
      }
      window.history.replaceState(null, "", `/explore?${params.toString()}`);
      return;
    }

    window.history.replaceState(null, "", "/explore");
  }, [authorMode, selectedSiteId, focusedConceptId, panelOpen]);

  const handleSelectSite = useCallback((id: string) => {
    const site = getOpportunitySiteById(id);
    const future = site ? getDefaultFuture(site) : undefined;
    if (future?.image) {
      preloadConceptImage(future.image);
    }
    setSelectedSiteId(id);
    setFocusedConceptId(null);
    setPanelOpen(true);
  }, []);

  const handleClosePanel = useCallback(() => {
    setPanelOpen(false);
    setFocusedConceptId(null);
  }, []);

  const handleAuthorSelectBlocked = useCallback(() => {}, []);

  const [authError, setAuthError] = useState(
    () => searchParams.get("auth") === "error",
  );

  const exploreReturnPath = useMemo(() => {
    if (!selectedSiteId) return "/explore";
    const params = new URLSearchParams({ site: selectedSiteId });
    if (focusedConceptId) {
      params.set("concept", focusedConceptId);
    }
    return `/explore?${params.toString()}`;
  }, [selectedSiteId, focusedConceptId]);

  useEffect(() => {
    if (!authError) return;
    window.history.replaceState(null, "", exploreReturnPath);
    const timer = window.setTimeout(() => setAuthError(false), 6000);
    return () => window.clearTimeout(timer);
  }, [authError, exploreReturnPath]);

  return (
    <div className="map-scene relative h-full w-full overflow-hidden bg-[#141310]">
      {authError && (
        <div className="auth-error-banner" role="alert">
          Sign-in link expired or failed. Please try again.
        </div>
      )}
      <div className="absolute left-3 top-[max(0.75rem,env(safe-area-inset-top))] z-20 sm:left-6 sm:top-6">
        <Link
          href="/"
          className="map-chrome-panel map-chrome-body inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path
              d="M8.5 2.5L4 7L8.5 11.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back to exhibition
        </Link>
      </div>

      {!authorMode && (
        <div className="absolute right-3 top-[max(0.75rem,env(safe-area-inset-top))] z-20 sm:right-6 sm:top-6">
          <AuthStatus />
        </div>
      )}

      <div
        className={
          authorMode
            ? "absolute inset-0 pb-[7.25rem] sm:pb-24"
            : "absolute inset-x-0 top-0 z-0 h-[var(--map-mobile-height)] overflow-hidden md:inset-0 md:h-auto md:pb-24"
        }
      >
        <div
          className={
            authorMode
              ? "h-full w-full"
              : "h-[250%] w-full -translate-y-[30%] md:h-full md:translate-y-0"
          }
        >
          {authorMode ? (
            <AuthorModeShell onSelectSiteBlocked={handleAuthorSelectBlocked} />
          ) : (
            <AerialMap
              selectedSiteId={selectedSiteId}
              onSelectSite={handleSelectSite}
            />
          )}
        </div>
      </div>

      <MapChrome />
      <MapAttribution />
      {!authorMode && <MapLegend />}

      {!authorMode && (
        <SlideOutPanel
          site={selectedSite}
          focusedConceptId={focusedConceptId}
          isOpen={panelOpen && selectedSite !== null}
          onClose={handleClosePanel}
        />
      )}

      {!authorMode && <SignInSheet returnPath={exploreReturnPath} />}
    </div>
  );
}
