import { ExhibitionHero } from "@/components/exhibition/ExhibitionHero";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { SiteHeader } from "@/components/landing/SiteHeader";

export default function Home() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader variant="exhibition" />
      <main className="flex-1">
        <ExhibitionHero />
      </main>
      <SiteFooter variant="exhibition" />
    </div>
  );
}
