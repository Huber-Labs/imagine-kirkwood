import { ExhibitionHero } from "@/components/exhibition/ExhibitionHero";
import { ExploreTransition } from "@/components/exhibition/ExploreTransition";
import { PhilosophySection } from "@/components/exhibition/PhilosophySection";
import { SiteHeader } from "@/components/landing/SiteHeader";

export default function Home() {
  return (
    <div className="flex flex-col">
      <SiteHeader variant="exhibition" />
      <main>
        <ExhibitionHero />
        <PhilosophySection />
        <ExploreTransition />
      </main>
    </div>
  );
}
