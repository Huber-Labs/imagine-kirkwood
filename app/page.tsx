import { ExhibitionHero } from "@/components/exhibition/ExhibitionHero";
import { SiteHeader } from "@/components/landing/SiteHeader";

export default function Home() {
  return (
    <div className="flex flex-col">
      <SiteHeader variant="exhibition" />
      <main>
        <ExhibitionHero />
      </main>
    </div>
  );
}
