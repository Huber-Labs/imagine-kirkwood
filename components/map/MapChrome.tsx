export function MapChrome() {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-start justify-between gap-3 p-3 pt-[max(3.5rem,env(safe-area-inset-top))] sm:p-6 sm:pt-16">
      <div className="map-chrome-panel max-w-[calc(100%-3rem)] rounded-2xl px-3.5 py-2.5 sm:max-w-sm sm:px-4 sm:py-3">
        <p className="map-chrome-label text-[10px] font-medium uppercase tracking-widest sm:text-xs">
          Bloomington, IN
        </p>
        <h1 className="map-chrome-title mt-0.5 font-[family-name:var(--font-instrument-serif)] text-lg sm:mt-1 sm:text-2xl">
          Kirkwood Avenue
        </h1>
        <p className="map-chrome-body mt-0.5 text-xs sm:mt-1 sm:text-sm">
          Six blocks · Indiana Avenue to Walnut Street
        </p>
      </div>
      <div
        className="map-chrome-panel hidden shrink-0 flex-col items-center gap-1 rounded-full px-3 py-2 sm:flex"
        aria-hidden="true"
      >
        <span className="map-chrome-label text-xs font-medium">N</span>
        <div className="h-6 w-px bg-white/20" />
        <svg width="10" height="7" viewBox="0 0 12 8" fill="none" className="text-white/55">
          <path d="M6 0L11.2 8H0.8L6 0Z" fill="currentColor" />
        </svg>
      </div>
    </div>
  );
}

export function MapAttribution() {
  return (
    <p className="pointer-events-none absolute bottom-3 left-3 z-10 max-w-[55%] text-[11px] leading-snug text-white/70 sm:bottom-6 sm:left-6 sm:max-w-none sm:text-xs">
      Tap an innovation area to explore
    </p>
  );
}
