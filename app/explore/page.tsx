import { Suspense } from "react";
import { MapExperience } from "@/components/map/MapExperience";
import { ParticipateProvider } from "@/components/participate/ParticipateProvider";
import { getSupabasePublicConfig } from "@/lib/supabase/env";

export const dynamic = "force-dynamic";

function ExploreFallback() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <p className="map-chrome-body text-sm text-white/50">Loading the atlas…</p>
    </div>
  );
}

export default function ExplorePage() {
  const supabaseConfig = getSupabasePublicConfig();

  return (
    <main className="map-scene h-dvh w-full overflow-hidden bg-[#141310]">
      <Suspense fallback={<ExploreFallback />}>
        <ParticipateProvider supabaseConfig={supabaseConfig}>
          <MapExperience />
        </ParticipateProvider>
      </Suspense>
    </main>
  );
}
