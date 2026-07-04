import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="absolute inset-x-0 top-0 z-10">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <Link
          href="/"
          className="font-[family-name:var(--font-instrument-serif)] text-lg tracking-tight text-foreground"
        >
          Imagine Kirkwood
        </Link>
        <Link
          href="/explore"
          className="text-sm text-muted transition-colors hover:text-foreground"
        >
          Explore
        </Link>
      </div>
    </header>
  );
}
