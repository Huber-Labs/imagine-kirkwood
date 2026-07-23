"use client";

import { useState } from "react";
import { SubmitIdeaModal } from "@/components/submit/SubmitIdeaModal";

interface ExploreSubmitButtonProps {
  variant: "pill" | "fab";
  className?: string;
}

function PlusIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M8 3.25V12.75M3.25 8H12.75"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ExploreSubmitButton({
  variant,
  className = "",
}: ExploreSubmitButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {variant === "fab" ? (
        <button
          type="button"
          aria-label="Submit an idea"
          onClick={() => setOpen(true)}
          className={`map-chrome-panel map-chrome-body inline-flex h-11 w-11 items-center justify-center rounded-full transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 ${className}`}
        >
          <PlusIcon size={20} />
        </button>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className={`map-chrome-panel map-chrome-body inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 ${className}`}
        >
          <PlusIcon size={14} />
          Submit an idea
        </button>
      )}
      {open && <SubmitIdeaModal onClose={() => setOpen(false)} />}
    </>
  );
}
