"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { AuthStatus } from "@/components/auth/AuthStatus";
import { SignInSheet } from "@/components/auth/SignInSheet";
import { AuthorModeShell } from "@/components/author/AuthorModeShell";
import { AerialMap } from "@/components/map/AerialMap";
import { MapAttribution, MapChrome } from "@/components/map/MapChrome";
import { SlideOutPanel } from "@/components/panel/SlideOutPanel";
import {
  getDefaultFuture,
  getOpportunitySiteById,
} from "@/lib/data/opportunity-sites";
import { AUTHOR_MODE_URL, isAuthorModeEnabled } from "@/lib/author/mode";
import { migrateEngagementStorage } from "@/lib/engagement/migrate";
import {
  DEFAULT_EXPLORE_SITE_ID,
} from "@/lib/engagement/explore-slides";
import {
  getDefaultConceptForSite,
  parseExploreParams,
} from "@/lib/engagement/explore-url";
import { preloadConceptImage } from "@/lib/images";
import { useIsMobile } from "@/lib/ui/use-is-mobile";

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
  const isMobile = useIsMobile();
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
    if (authorMode || !isMobile) return;

    const { siteId, conceptId } = parseExploreParams(
      new URLSearchParams(window.location.search),
    );

    if (!siteId) {
      setSelectedSiteId(DEFAULT_EXPLORE_SITE_ID);
      setFocusedConceptId(getDefaultConceptForSite(DEFAULT_EXPLORE_SITE_ID));
      setPanelOpen(true);
      return;
    }

    if (!conceptId) {
      setFocusedConceptId(getDefaultConceptForSite(siteId));
    }
  }, [authorMode, isMobile]);

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

  const handleSelectSite = useCallback(
    (id: string) => {
      const site = getOpportunitySiteById(id);
      const future = site ? getDefaultFuture(site) : undefined;
      if (future?.image) {
        preloadConceptImage(future.image);
      }
      setSelectedSiteId(id);
      setFocusedConceptId(isMobile ? getDefaultConceptForSite(id) : null);
      setPanelOpen(true);
    },
    [isMobile],
  );

  const handleClosePanel = useCallback(() => {
    if (isMobile) return;
    setPanelOpen(false);
    setFocusedConceptId(null);
  }, [isMobile]);

  const handleConceptChange = useCallback((siteId: string, conceptId: string) => {
    const site = getOpportunitySiteById(siteId);
    const future = site?.futures.find((item) => item.id === conceptId);
    if (future?.image) {
      preloadConceptImage(future.image);
    }
    setSelectedSiteId(siteId);
    setFocusedConceptId(conceptId);
    setPanelOpen(true);
  }, []);

  const handleAuthorSelectBlocked = useCallback(() => {}, []);

  const [authError, setAuthError] = useState(
    () => searchParams.get("auth") === "error",
  );
  const authErrorReason = searchParams.get("reason");

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

  const mobileFocus = isMobile && !authorMode;

  return (
    <div
      className={`map-scene relative h-full w-full overflow-hidden bg-[#141310]${mobileFocus ? " map-scene--mobile-focus" : ""}`}
    >
      {authError && (
        <div className="auth-error-banner" role="alert">
          {authErrorReason
            ? `Sign-in failed: ${authErrorReason}`
            : "Sign-in link expired or failed. Open the link in the same browser where you requested it."}
        </div>
      )}
      <div className="absolute left-3 top-[max(0.75rem,env(safe-area-inset-top))] z-20 sm:left-6 sm:top-6">
        <Link
          href="/"
          className={`map-chrome-panel map-chrome-body inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30${
            mobileFocus ? " hidden" : ""
          }`}
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
        <div
          className={`absolute right-3 top-[max(0.75rem,env(safe-area-inset-top))] z-20 sm:right-6 sm:top-6${
            mobileFocus ? " hidden" : ""
          }`}
        >
          <AuthStatus />
        </div>
      )}

      {!mobileFocus && (
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
      )}

      <MapChrome />
      <MapAttribution />

      {!authorMode && (
        <SlideOutPanel
          site={selectedSite}
          focusedConceptId={focusedConceptId}
          isOpen={(panelOpen && selectedSite !== null) || (isMobile && selectedSite !== null)}
          isMobileExplore={isMobile}
          onConceptChange={handleConceptChange}
          onClose={handleClosePanel}
        />
      )}

      {!authorMode && <SignInSheet />}
    </div>
  );
}
