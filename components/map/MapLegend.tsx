import { opportunitySites } from "@/lib/data/opportunity-sites";
import { IU_CRIMSON } from "@/lib/map/exhibit-treatment";

function LegendContent() {
  return (
    <ul className="space-y-1.5">
      {opportunitySites.map((site) => (
        <li
          key={site.id}
          className="map-chrome-body flex items-center gap-2 text-xs"
        >
          <span
            className={`h-2.5 w-2.5 shrink-0 rounded-full ring-2 ring-white/40 ${
              site.isPlaceholder ? "bg-white/25" : ""
            }`}
            style={
              site.isPlaceholder
                ? undefined
                : { backgroundColor: IU_CRIMSON }
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
