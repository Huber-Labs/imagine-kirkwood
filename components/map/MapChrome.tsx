export function MapChrome() {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-start justify-between p-4 sm:p-6">
      <div className="max-w-sm rounded-2xl border border-white/20 bg-white/75 px-4 py-3 shadow-sm backdrop-blur-md">
        <p className="text-xs font-medium uppercase tracking-widest text-foreground/40">
          Bloomington, IN
        </p>
        <h1 className="mt-1 font-[family-name:var(--font-instrument-serif)] text-xl text-foreground sm:text-2xl">
          Kirkwood Avenue
        </h1>
        <p className="mt-1 text-sm text-muted">
          Six blocks · Indiana Avenue to Walnut Street
        </p>
      </div>
      <div
        className="flex flex-col items-center gap-1 rounded-full border border-white/25 bg-white/60 px-3 py-2 text-foreground/35 backdrop-blur-md"
        aria-hidden="true"
      >
        <span className="text-xs font-medium">N</span>
        <div className="h-6 w-px bg-foreground/15" />
        <svg width="10" height="7" viewBox="0 0 12 8" fill="none">
          <path d="M6 0L11.2 8H0.8L6 0Z" fill="currentColor" />
        </svg>
      </div>
    </div>
  );
}

export function MapAttribution() {
  return (
    <p className="pointer-events-none absolute bottom-4 left-4 z-10 text-xs text-foreground/35 sm:bottom-6 sm:left-6">
      Click an innovation area to explore
    </p>
  );
}
