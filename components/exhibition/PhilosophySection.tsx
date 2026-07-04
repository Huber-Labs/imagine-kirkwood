const principles = [
  {
    title: "Places before policies",
    description: "Help people imagine before asking them to judge.",
  },
  {
    title: "Learn from the world's best streets",
    description: "Great cities borrow good ideas.",
  },
  {
    title: "Shape the future together",
    description: "Everyone deserves a voice in the places we share.",
  },
];

export function PhilosophySection() {
  return (
    <section
      id="philosophy"
      className="border-t border-[color-mix(in_srgb,var(--foreground)_6%,var(--border))] px-8 py-28 md:py-36"
    >
      <div className="mx-auto max-w-5xl">
        <p className="exhibition-rise exhibition-rise--1 panel-eyebrow text-center">
          Philosophy
        </p>
        <div className="mt-16 grid gap-16 md:grid-cols-3 md:gap-12">
          {principles.map((principle, index) => (
            <article
              key={principle.title}
              className={`exhibition-rise exhibition-rise--${index + 2} space-y-4 text-center md:text-left`}
            >
              <h2 className="font-[family-name:var(--font-instrument-serif)] text-[1.375rem] leading-snug text-foreground">
                {principle.title}
              </h2>
              <p className="text-[0.9375rem] leading-[1.75] text-foreground/60">
                {principle.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
