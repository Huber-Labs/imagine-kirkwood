import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <div className="flex flex-col items-center text-center">
      <p className="mb-6 font-[family-name:var(--font-instrument-serif)] text-xl text-muted sm:text-2xl">
        Imagine Kirkwood
      </p>
      <h1 className="max-w-lg font-[family-name:var(--font-instrument-serif)] text-4xl leading-tight tracking-tight text-foreground sm:text-5xl sm:leading-tight">
        What could Bloomington&apos;s main street become?
      </h1>
      <div className="mt-12">
        <Button href="/explore">Explore the Map</Button>
      </div>
    </div>
  );
}
