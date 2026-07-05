"use client";

import { useEffect } from "react";
import { SiteDetail } from "@/components/panel/SiteDetail";
import type { OpportunitySite, TimelinePhase } from "@/lib/types";

interface SlideOutPanelProps {
  site: OpportunitySite | null;
  activePhase: TimelinePhase;
  isOpen: boolean;
  onClose: () => void;
  onPhaseChange: (phase: TimelinePhase) => void;
}

export function SlideOutPanel({
  site,
  activePhase,
  isOpen,
  onClose,
  onPhaseChange,
}: SlideOutPanelProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!site) return null;

  return (
    <>
      {isOpen && (
        <button
          type="button"
          aria-label="Close panel"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/40 transition-opacity duration-500 ease-[var(--panel-ease)] md:bg-black/25"
        />
      )}

      <aside
        role="dialog"
        aria-modal="true"
        aria-label={`${site.name} details`}
        className={`fixed z-50 flex flex-col overflow-y-auto bg-background shadow-[var(--panel-shadow)] transition-transform duration-500 ease-[var(--panel-ease)] inset-x-0 bottom-0 max-h-[94vh] rounded-t-[1.25rem] md:inset-x-auto md:inset-y-0 md:right-0 md:max-h-none md:w-[var(--panel-width)] md:rounded-none ${
          isOpen
            ? "translate-y-0 md:translate-x-0"
            : "translate-y-full md:translate-y-0 md:translate-x-full"
        }`}
      >
        <div className="mx-auto mt-3 mb-0.5 h-[3px] w-8 shrink-0 rounded-full bg-foreground/10 md:hidden" />
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-foreground/[0.06] text-foreground/70 transition-[background-color,transform,color] duration-300 hover:bg-foreground/10 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20 active:scale-95 sm:right-5 sm:top-5 md:top-6 md:right-6"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path
              d="M1 1L13 13M13 1L1 13"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
        <SiteDetail
          key={`${site.id}-${activePhase}`}
          site={site}
          activePhase={activePhase}
          onPhaseChange={onPhaseChange}
        />
      </aside>
    </>
  );
}
