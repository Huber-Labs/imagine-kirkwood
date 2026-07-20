"use client";

import Link from "next/link";
import { useEffect } from "react";
import { AuthStatus } from "@/components/auth/AuthStatus";
import { MobileConceptExplorer } from "@/components/panel/MobileConceptExplorer";
import { SiteDetail } from "@/components/panel/SiteDetail";
import type { OpportunitySite } from "@/lib/types";

interface SlideOutPanelProps {
  site: OpportunitySite | null;
  focusedConceptId: string | null;
  isOpen: boolean;
  isMobileExplore?: boolean;
  onConceptChange?: (siteId: string, conceptId: string) => void;
  onClose: () => void;
}

export function SlideOutPanel({
  site,
  focusedConceptId,
  isOpen,
  isMobileExplore = false,
  onConceptChange,
  onClose,
}: SlideOutPanelProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !isMobileExplore) onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isMobileExplore, isOpen, onClose]);

  if (!site) return null;

  const activeConceptId = focusedConceptId ?? site.futures[0]?.id ?? null;

  return (
    <>
      {isOpen && !isMobileExplore && (
        <button
          type="button"
          aria-label="Close panel"
          onClick={onClose}
          className="fixed inset-x-0 top-0 z-40 h-[var(--map-mobile-height)] bg-transparent transition-opacity duration-500 ease-[var(--panel-ease)] md:inset-0 md:h-auto md:bg-black/25"
        />
      )}

      <aside
        role="dialog"
        aria-modal={!isMobileExplore}
        aria-label={
          isMobileExplore ? "Explore Kirkwood concepts" : `${site.name} details`
        }
        className={`fixed z-50 flex h-[var(--panel-mobile-height)] max-h-[var(--panel-mobile-height)] flex-col overflow-y-auto bg-background pb-[env(safe-area-inset-bottom)] shadow-[var(--panel-shadow)] transition-transform duration-500 ease-[var(--panel-ease)] inset-x-0 bottom-0 md:inset-x-auto md:inset-y-0 md:right-0 md:h-full md:max-h-none md:w-[var(--panel-width)] md:rounded-none md:pb-0 ${
          isMobileExplore ? "rounded-none" : "rounded-t-[1.25rem]"
        } ${
          isOpen
            ? "translate-y-0 md:translate-x-0"
            : "translate-y-full md:translate-y-0 md:translate-x-full"
        }`}
      >
        {isMobileExplore ? (
          <div className="mobile-explore-chrome flex shrink-0 items-center justify-between gap-3 px-5 pb-1 pt-[max(0.625rem,env(safe-area-inset-top))]">
            <Link
              href="/"
              className="mobile-explore-chrome__back inline-flex items-center gap-1 text-sm text-foreground/70 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20"
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
              Exhibition
            </Link>
            <AuthStatus variant="panel" />
          </div>
        ) : (
          <div className="mx-auto mt-3 mb-0.5 h-[3px] w-8 shrink-0 rounded-full bg-foreground/10 md:hidden" />
        )}
        {!isMobileExplore && (
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
        )}
        {isMobileExplore && activeConceptId && onConceptChange ? (
          <MobileConceptExplorer
            siteId={site.id}
            conceptId={activeConceptId}
            onConceptChange={onConceptChange}
          />
        ) : (
          <SiteDetail
            key={`${site.id}-${focusedConceptId ?? "browse"}`}
            site={site}
            focusedConceptId={focusedConceptId}
          />
        )}
      </aside>
    </>
  );
}
