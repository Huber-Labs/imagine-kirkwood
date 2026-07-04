import { Button } from "@/components/ui/Button";

export function ExploreTransition() {
  return (
    <section className="exhibition-rise exhibition-rise--5 border-t border-[color-mix(in_srgb,var(--foreground)_6%,var(--border))] px-8 py-28 md:py-36">
      <div className="mx-auto max-w-2xl text-center">
        <p className="panel-eyebrow">Six blocks · Infinite possibilities</p>
        <h2 className="mt-6 font-[family-name:var(--font-instrument-serif)] text-[2rem] leading-[1.12] tracking-[-0.01em] text-foreground md:text-[2.5rem]">
          Step into the exhibition
        </h2>
        <p className="mx-auto mt-5 max-w-md text-[0.9375rem] leading-[1.75] text-foreground/60">
          The map is the beginning of exploration — six stories waiting to be
          discovered along Bloomington&apos;s main street.
        </p>
        <div className="mt-10">
          <Button href="/explore">Begin Exploring</Button>
        </div>
      </div>
    </section>
  );
}
