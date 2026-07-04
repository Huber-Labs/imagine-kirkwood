"use client";

import { useEffect } from "react";
import { AreaDetail } from "@/components/panel/AreaDetail";
import type { InnovationArea } from "@/lib/types";

interface SlideOutPanelProps {
  area: InnovationArea | null;
  isOpen: boolean;
  onClose: () => void;
}

export function SlideOutPanel({ area, isOpen, onClose }: SlideOutPanelProps) {
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

  if (!area) return null;

  return (
    <>
      <button
        type="button"
        aria-label="Close panel"
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-foreground/20 backdrop-blur-[2px] transition-opacity duration-300 md:bg-foreground/10 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label={`${area.name} details`}
        className={`fixed z-50 flex flex-col bg-surface shadow-[var(--panel-shadow)] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] inset-x-0 bottom-0 max-h-[85vh] rounded-t-2xl border-t border-border p-6 md:inset-x-auto md:inset-y-0 md:right-0 md:max-h-none md:w-[var(--panel-width)] md:rounded-none md:border-l md:border-t-0 ${
          isOpen
            ? "translate-y-0 md:translate-x-0"
            : "translate-y-full md:translate-y-0 md:translate-x-full"
        }`}
      >
        <div className="mx-auto mb-4 h-1 w-10 shrink-0 rounded-full bg-border md:hidden" />
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-muted transition-colors hover:bg-foreground/5 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20 md:top-6 md:right-6"
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
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden pt-2">
          <AreaDetail key={area.id} area={area} />
        </div>
      </aside>
    </>
  );
}
