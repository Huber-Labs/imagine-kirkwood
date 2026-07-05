"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { AerialMap } from "@/components/map/AerialMap";
import { MapAttribution, MapChrome } from "@/components/map/MapChrome";
import { MapLegend } from "@/components/map/MapLegend";
import { PhaseScrubber } from "@/components/map/PhaseScrubber";
import { SlideOutPanel } from "@/components/panel/SlideOutPanel";
import { getOpportunitySiteById } from "@/lib/data/opportunity-sites";
import type { TimelinePhase } from "@/lib/types";

export function MapExperience() {
  const [selectedSiteId, setSelectedSiteId] = useState<string | null>(null);
  const [activePhase, setActivePhase] = useState<TimelinePhase>("today");
  const [panelOpen, setPanelOpen] = useState(false);

  const selectedSite = selectedSiteId
    ? getOpportunitySiteById(selectedSiteId) ?? null
    : null;

  const handleSelectSite = useCallback((id: string) => {
    setSelectedSiteId(id);
    setPanelOpen(true);
  }, []);

  const handleClosePanel = useCallback(() => {
    setPanelOpen(false);
  }, []);

  const handlePhaseChange = useCallback((phase: TimelinePhase) => {
    setActivePhase(phase);
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

      <div className="absolute inset-0 pb-24">
        <AerialMap
          selectedSiteId={selectedSiteId}
          activePhase={activePhase}
          onSelectSite={handleSelectSite}
        />
      </div>

      <MapChrome />
      <MapAttribution />
      <MapLegend />

      <PhaseScrubber
        activePhase={activePhase}
        onPhaseChange={handlePhaseChange}
      />

      <SlideOutPanel
        site={selectedSite}
        activePhase={activePhase}
        isOpen={panelOpen && selectedSite !== null}
        onClose={handleClosePanel}
      />
    </div>
  );
}
