"use client";

import { useState } from "react";
import { SubmitIdeaModal } from "@/components/submit/SubmitIdeaModal";

type Tone = "light" | "dark";

interface SubmitIdeaLauncherProps {
  tone?: Tone;
}

export function SubmitIdeaLauncher({ tone = "dark" }: SubmitIdeaLauncherProps) {
  const [open, setOpen] = useState(false);

  const triggerClasses =
    tone === "light"
      ? "rounded-full border border-white/40 px-4 py-1.5 text-sm text-white/90 transition-colors hover:border-white/70 hover:text-white"
      : "rounded-full border border-foreground/20 px-4 py-1.5 text-sm text-foreground transition-colors hover:border-foreground/40";

  return (
    <>
      <button type="button" className={triggerClasses} onClick={() => setOpen(true)}>
        Submit an idea
      </button>
      {open && <SubmitIdeaModal onClose={() => setOpen(false)} />}
    </>
  );
}
