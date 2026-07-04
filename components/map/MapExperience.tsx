"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { AerialMap } from "@/components/map/AerialMap";
import { MapAttribution, MapChrome } from "@/components/map/MapChrome";
import { MapLegend } from "@/components/map/MapLegend";
import { SlideOutPanel } from "@/components/panel/SlideOutPanel";
import { getInnovationAreaById } from "@/lib/data/innovation-areas";

export function MapExperience() {
  const [selectedAreaId, setSelectedAreaId] = useState<string | null>(null);
  const [panelOpen, setPanelOpen] = useState(false);

  const selectedArea = selectedAreaId
    ? getInnovationAreaById(selectedAreaId) ?? null
    : null;

  const handleSelectArea = useCallback((id: string) => {
    setSelectedAreaId(id);
    setPanelOpen(true);
  }, []);

  const handleClosePanel = useCallback(() => {
    setPanelOpen(false);
  }, []);

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#141310]">
      <div className="absolute left-3 top-[max(0.75rem,env(safe-area-inset-top))] z-20 sm:left-6 sm:top-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/55 px-3.5 py-2 text-sm text-white/75 shadow-lg backdrop-blur-md transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
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

      <div className="absolute inset-0">
        <AerialMap
          selectedAreaId={selectedAreaId}
          onSelectArea={handleSelectArea}
        />
      </div>

      <MapChrome />
      <MapAttribution />
      <MapLegend />

      <SlideOutPanel
        area={selectedArea}
        isOpen={panelOpen && selectedArea !== null}
        onClose={handleClosePanel}
      />
    </div>
  );
}
