"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { AerialMap } from "@/components/map/AerialMap";
import { MapAttribution, MapChrome } from "@/components/map/MapChrome";
import { MapLegend } from "@/components/map/MapLegend";
import { SlideOutPanel } from "@/components/panel/SlideOutPanel";
import { getOpportunitySiteById } from "@/lib/data/opportunity-sites";
import { migrateEngagementStorage } from "@/lib/engagement/migrate";
import { parseExploreParams } from "@/lib/engagement/explore-url";

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
  const [selectedSiteId, setSelectedSiteId] = useState<string | null>(
    () => readInitialExploreState(searchParams).selectedSiteId,
  );
  const [focusedConceptId, setFocusedConceptId] = useState<string | null>(
    () => readInitialExploreState(searchParams).focusedConceptId,
  );
  const [panelOpen, setPanelOpen] = useState(
    () => readInitialExploreState(searchParams).panelOpen,
  );

  const selectedSite = selectedSiteId
    ? getOpportunitySiteById(selectedSiteId) ?? null
    : null;

  useEffect(() => {
    migrateEngagementStorage();
  }, []);

  useEffect(() => {
    if (panelOpen && selectedSiteId) {
      const params = new URLSearchParams({ site: selectedSiteId });
      if (focusedConceptId) {
        params.set("concept", focusedConceptId);
      }
      window.history.replaceState(null, "", `/explore?${params.toString()}`);
      return;
    }

    window.history.replaceState(null, "", "/explore");
  }, [selectedSiteId, focusedConceptId, panelOpen]);

  const handleSelectSite = useCallback((id: string) => {
    setSelectedSiteId(id);
    setFocusedConceptId(null);
    setPanelOpen(true);
  }, []);

  const handleClosePanel = useCallback(() => {
    setPanelOpen(false);
    setFocusedConceptId(null);
  }, []);

  return (
    <div className="map-scene relative h-full w-full overflow-hidden bg-[#141310]">
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

      <div className="absolute inset-0 pb-[7.25rem] sm:pb-24">
        <AerialMap
          selectedSiteId={selectedSiteId}
          onSelectSite={handleSelectSite}
        />
      </div>

      <MapChrome />
      <MapAttribution />
      <MapLegend />

      <SlideOutPanel
        site={selectedSite}
        focusedConceptId={focusedConceptId}
        isOpen={panelOpen && selectedSite !== null}
        onClose={handleClosePanel}
      />
    </div>
  );
}
