import { opportunitySites } from "@/lib/data/opportunity-sites";

function LegendContent() {
  return (
    <ul className="space-y-1.5">
      {opportunitySites.map((site) => (
        <li
          key={site.id}
          className="map-chrome-body flex items-center gap-2 text-xs"
        >
          <span
            className={`h-2 w-2 shrink-0 rounded-full ring-1 ring-white/25 ${
              site.isPlaceholder ? "bg-white/25" : "bg-white/85"
            }`}
            style={
              site.isPlaceholder
                ? undefined
                : { backgroundColor: site.accent, boxShadow: `0 0 8px ${site.accent}55` }
            }
          />
          {site.name}
          {site.isPlaceholder && (
            <span className="map-chrome-label text-[0.625rem]">(soon)</span>
          )}
        </li>
      ))}
    </ul>
  );
}

const panelClasses = "map-chrome-panel rounded-xl p-3 sm:p-4";

export function MapLegend() {
  return (
    <>
      <details
        className={`absolute bottom-28 right-3 z-10 max-w-[calc(100%-1.5rem)] sm:bottom-32 sm:right-6 sm:hidden ${panelClasses}`}
      >
        <summary className="map-chrome-body cursor-pointer list-none text-xs font-medium uppercase tracking-wider [&::-webkit-details-marker]:hidden">
          <span className="flex items-center justify-between gap-4">
            Places
            <span className="map-chrome-label">+</span>
          </span>
        </summary>
        <div className="mt-3 max-h-48 overflow-y-auto">
          <LegendContent />
        </div>
      </details>

      <div
        className={`absolute bottom-32 right-6 z-10 hidden max-h-[40vh] overflow-y-auto sm:block ${panelClasses}`}
      >
        <p className="map-chrome-body mb-3 text-xs font-medium uppercase tracking-wider">
          Places
        </p>
        <LegendContent />
      </div>
    </>
  );
}
