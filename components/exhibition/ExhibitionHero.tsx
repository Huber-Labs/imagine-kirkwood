"use client";

import { Button } from "@/components/ui/Button";

const EXHIBITION_HERO_IMAGE = "/images/exhibition/hero.webp";
const HERO_FALLBACK = "/images/concepts/placeholder.svg";

export function ExhibitionHero() {
  const scrollToPhilosophy = () => {
    document.getElementById("philosophy")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <section className="relative flex min-h-dvh flex-col justify-end overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={EXHIBITION_HERO_IMAGE}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover"
          onError={(e) => {
            e.currentTarget.src = HERO_FALLBACK;
          }}
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-[var(--background)]/55 to-black/25"
          aria-hidden="true"
        />
      </div>

      <div className="exhibition-rise relative mx-auto w-full max-w-3xl px-8 pb-24 pt-32 text-center md:pb-32 md:pt-40">
        <h1 className="font-[family-name:var(--font-instrument-serif)] text-[2.75rem] leading-[1.05] tracking-[-0.02em] text-foreground md:text-[3.75rem]">
          What could Kirkwood become?
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-[1.0625rem] leading-[1.7] text-foreground/70 md:text-lg">
          Imagine the future of Bloomington&apos;s main street through interactive
          stories, inspiration from around the world, and ideas from your
          community.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button href="/explore">Begin Exploring</Button>
          <button
            type="button"
            onClick={scrollToPhilosophy}
            className="text-sm tracking-wide text-foreground/55 transition-colors hover:text-foreground"
          >
            Scroll
          </button>
        </div>
      </div>
    </section>
  );
}
