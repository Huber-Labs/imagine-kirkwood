import Link from "next/link";
import { SubmitIdeaLauncher } from "@/components/submit/SubmitIdeaLauncher";

interface SiteHeaderProps {
  variant?: "default" | "exhibition";
}

export function SiteHeader({ variant = "default" }: SiteHeaderProps) {
  const isExhibition = variant === "exhibition";

  return (
    <header className="absolute inset-x-0 top-0 z-20">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-8 py-7">
        <Link
          href="/"
          className={`font-[family-name:var(--font-instrument-serif)] text-lg tracking-tight ${
            isExhibition ? "text-white/90" : "text-foreground"
          }`}
        >
          Imagine Kirkwood
        </Link>
        <div className="flex items-center gap-4 sm:gap-5">
          {!isExhibition && (
            <Link
              href="/explore"
              className="text-sm text-muted transition-colors hover:text-foreground"
            >
              Explore
            </Link>
          )}
          <SubmitIdeaLauncher tone={isExhibition ? "light" : "dark"} />
        </div>
      </div>
    </header>
  );
}
