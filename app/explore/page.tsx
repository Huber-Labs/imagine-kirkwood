import { Suspense } from "react";
import { MapExperience } from "@/components/map/MapExperience";

function ExploreFallback() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <p className="map-chrome-body text-sm text-white/50">Loading the atlas…</p>
    </div>
  );
}

export default function ExplorePage() {
  return (
    <main className="map-scene h-dvh w-full overflow-hidden bg-[#141310]">
      <Suspense fallback={<ExploreFallback />}>
        <MapExperience />
      </Suspense>
    </main>
  );
}
