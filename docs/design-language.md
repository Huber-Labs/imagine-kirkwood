# Design Language

We are not building planning software.

We are building a **civic exhibition** — a place where neighbors, leaders, and visitors can stand inside a shared question: *What could our public life become?*

The interface should feel like walking into a well-curated gallery on a main street, not logging into a municipal system. Every pixel either invites imagination or gets out of the way.

For product rules, see [`product-principles.md`](product-principles.md). For image direction, see [`image-style-guide.md`](image-style-guide.md). For panel structure, see [`decision-log.md`](decision-log.md).

---

## The desired feeling

Calm curiosity. Warm authority. Optimistic realism.

A visitor should feel **welcomed**, not audited. **Inspired**, not overwhelmed. **Capable of participating**, not forced to choose sides.

The product whisper: *This place matters. Something better is possible. You can be part of finding it — at your own pace.*

---

## What it should feel like

Draw from these references — not as pastiche, but as emotional targets:

| Reference | What we borrow |
|-----------|----------------|
| **Apple Maps** | Clear place pins, legible labels, confident cartography, touch-native calm |
| **Monocle** | Editorial typography, generous whitespace, global civic taste |
| **National Park visitor centers** | Interpretive storytelling, photography-first, "you are here" orientation |
| **Design museums** | Spotlight on the object of study; context recedes; pacing through rooms |
| **Gehl Architects** | Human-scale public life, people sitting, staying, belonging |
| **Urban Land Institute exhibitions** | Polished civic visualization — possible, not fantastical |
| **Copenhagen public spaces** | Everyday delight in the street — chairs, shade, bikes, unhurried gathering |

Together: **a beautiful instrument for public imagination** — precise where it needs to be, human everywhere else.

---

## What it should NOT feel like

If it feels like any of these, stop and redesign:

| Anti-reference | Why it fails |
|----------------|--------------|
| **ArcGIS** | Tool-first; layers and legends for analysts, not neighbors |
| **Government portals** | Form fields, case numbers, institutional gray |
| **Engineering software** | Precision without soul; specs without story |
| **Planning PDFs** | Wall of text; metadata masquerading as engagement |
| **PowerPoint presentations** | Bullet hierarchies; clip art optimism |
| **Permit applications** | Compliance mindset; participation as obligation |

We never punish curiosity with bureaucracy.

---

## Typography

**Display — Instrument Serif**  
Headlines, place names, chapter titles, idea titles, support counts. Feels editorial, timeless, slightly literary — a museum label, not a dashboard widget.

Use tight tracking on large headlines (`tracking-[-0.02em]`), comfortable line-height on narrative copy (~1.5).

**Body — Inter**  
UI chrome, descriptions, hints, map labels, buttons. Neutral, highly legible, invisible when doing its job.

**Eyebrows and section labels**  
Small caps rhythm: `0.625rem`, wide letter-spacing (`0.2em`), uppercase, `--panel-muted`. Used sparingly — "Explore over time," phase labels, section titles. Never shout.

**Hierarchy rule:** Image → serif headline → one serif sentence → everything else. If typography competes with photography, typography loses.

---

## Spacing

**Air is content.** The exhibition breathes.

- Panel horizontal padding: `px-5` mobile, `px-8` desktop — consistent editorial margins.
- Vertical rhythm between major sections: `space-y-12` / `space-y-14` — chapters feel distinct, not cramped.
- Hero images bleed to panel edge (`-mx-5 sm:-mx-8`) — cinematic, magazine spread.
- Idea rows separated by hairline borders, not heavy cards — scannable, not boxy.

Avoid dashboard density. One primary action per viewport height on mobile.

---

## Photography

**Today images** ground the story in honesty.

- Real Kirkwood/Bloomington character: limestone, brick, mature trees, local storefronts.
- Landscape orientation; works as panel hero.
- Minimal treatment — light scale, subtle radius (`story-photo`), no heavy filters on documentary photos.
- Fallback to placeholder SVG on error — never a broken image icon.

Photography says: *This is real. We are starting from truth.*

---

## Concept imagery

**Future images** carry ambition — with restraint.

- Optimistic realism: Gehl / ULI-quality civic renders, not sci-fi.
- Warm late-afternoon light; active but not crowded public life.
- 16:9 heroes; one strong image per phase — not a carousel gallery in the default panel.
- Bloomington-specific: college town, human scale, local businesses.

See [`image-style-guide.md`](image-style-guide.md) for prompts and composition rules.

Concept imagery says: *This could happen here — and it would feel like us.*

---

## Motion

Motion should feel like **turning a page**, not loading a widget.

**Easing:** `--panel-ease: cubic-bezier(0.16, 1, 0.3, 1)` — soft deceleration, exhibition calm.

**Panel entrance:** `panel-rise` — subtle upward fade (18px), staggered delays for header → chapter → ideas.

**Hero reveal:** `panel-hero-reveal` — gentle scale from 1.04 → 1.0 over ~0.9s.

**Homepage:** `exhibition-rise` — slightly larger travel (24px), slower stagger — arrival, not splash screen.

**Map markers:** `place-marker-ripple` — slow crimson pulse on authored pins; invitation, not alarm.

**Reduced motion:** All animations collapse to instant state when `prefers-reduced-motion: reduce` — respect access needs without stripping dignity.

No bounce, no spinners for content that should feel already present.

---

## Color palette

**Exhibition light (default)**  
Warm paper, not clinical white:

| Token | Role |
|-------|------|
| `--background` `#fafaf8` | Page ground — soft off-white |
| `--foreground` `#1a1a18` | Primary text — warm near-black |
| `--panel-muted` `#8a8a84` | Eyebrows, secondary copy |
| `--border` `#e8e8e4` | Hairlines, subtle structure |
| `--surface` `#ffffff` | Cards when used |

**Map canvas**  
Dark limestone atmosphere: `#141310` (`--map-limestone`) — night-at-the-museum around the aerial.

**Place markers**  
IU crimson `#990000` (`IU_CRIMSON`) — authored sites; confident, local, unmistakable. Placeholder markers: muted white, no ripple.

**Per-site accent**  
`--hero-accent` from each site's `accent` — phase glow on selected pin, active support button tint. District colors inform but do not dominate.

**Phase scrubber dots** (map chrome)  
Google-adjacent phase hints: green / amber / blue — small, secondary; never the hero palette.

**Avoid:** institutional navy, warning orange banners, traffic-cone civic tech gradients.

---

## Panel composition

The place panel is a **single chapter in an ongoing exhibition**. Canonical order:

```
Place name                    (Instrument Serif, large)
[Placeholder note if stub]

Explore over time             (eyebrow + phase filter)
─────────────────────────
[Hero — photo or concept]     (full bleed)
Phase label                   (eyebrow)
Chapter title                 (serif)
One narrative sentence        (serif lead)

Ideas for this place          (section rule + title)
Hint — device-local support
Idea rows with Support        (editorial list, not cards grid)
```

**Not in the default panel:** stats tables, timeline/investment/confidence rows, precedent galleries, comment forms, innovation-area eyebrows.

Image first. One sentence second. Action third.

---

## Map treatment

The atlas is an **editorial model**, not a GIS viewport.

**Base layer** — desaturated, softened aerial (`EXHIBIT_BASE_FILTER`). Context recedes.

**Spotlight layer** — warmer, clearer corridor and pedestrian pools (`EXHIBIT_SPOTLIGHT_FILTER`) through a **feathered mask** — museum lighting, not a hard study-area boundary.

**Outer dim** — soft darkening beyond the study corridor; focus without amputation.

**Paper tint** — barely perceptible warm wash over the canvas.

**Street label** — "Kirkwood Avenue" on the corridor via `textPath`; halo for legibility.

**Markers** — Apple Maps–inspired pins with name labels; ripple on authored places; phase glow when selected.

**Chrome** — frosted `map-chrome-panel` pills: legend, back link, phase scrubber. Legible on dark aerial; never opaque government gray bars.

The map says: *Look here — these places, this street, this possible future.*

---

## Language and voice

Write like a **thoughtful host**, not a planning department.

**Do:**  
- Short sentences a neighbor would read aloud.  
- Place names, sensory detail, hopeful but honest tone.  
- "Explore," "imagine," "support," "try soon" — verbs of invitation.  
- Clear honesty about limits: "saved on this device only."

**Don't:**  
- Acronyms, RFP language, "stakeholder alignment workshops."  
- False promises: "Your vote will build this."  
- Passive bureaucratic voice: "Feedback shall be collected."

Celebrate Bloomington; learn from the world. Technology disappears behind the experience ([`storytelling-principles.md`](storytelling-principles.md)).

---

## Microinteractions

Small moments should confirm without celebrating excessively.

**Support button** — toggles Support ↔ Supported; count updates instantly; active state uses `--hero-accent` tint — a quiet "I added my voice," not a slot machine.

**Phase filter / scrubber** — immediate hero and copy swap; selected phase readable at a glance; no page reload feel.

**Map pin select** — panel slides open; selected pin glows with phase color; ripples calm on placeholder sites.

**Focus states** — visible rings on interactive chrome (`focus-visible:ring-2`); keyboard-usable without ugly defaults.

**Hover** — subtle border/background shifts on buttons; never layout shift or aggressive scale.

Microinteractions whisper. They never applause.

---

## Scrolling

The panel is a **vertical essay**, not a dashboard with pinned widgets.

- Natural document scroll inside the slide-out panel.
- Generous bottom padding (`pb-24`) so last idea clears the phase scrubber on mobile.
- No nested scroll traps unless unavoidable.
- Phase scrubber and map chrome **fixed**; content moves — stable orientation while reading.

Scrolling should feel like moving through a gallery wall, not parsing a spreadsheet.

---

## Loading states

Content should appear **already worth waiting for** — or show honest placeholders immediately.

**Images** — fade in on load; placeholder SVG on error; no infinite spinners over gray boxes.

**Concept heroes** — subtle reveal animation once loaded; placeholder concept SVG until then.

**No skeleton dashboards** — no shimmer rows mimicking stats tables we removed on purpose.

**Placeholder sites** — candid copy: "Story in development — explore People's Park." Never fake completeness.

Loading is a beat of anticipation, not an apology for bureaucracy.

---

## Animation

Animation serves **orientation and delight**, not decoration.

| Use | Avoid |
|-----|-------|
| Staggered panel rise on open | Parallax for its own sake |
| Hero scale-in on phase change | Bouncing buttons |
| Marker ripple on map | Flashing CTAs |
| Smooth scrubber selection | Long chained transitions |
| Exhibition homepage entrance | Auto-playing video backgrounds |

Default duration band: **0.7s – 0.9s** with `--panel-ease`. Faster for toggles (~0.2s).

When animation does not aid understanding, remove it.

---

## Every screen should answer

Before shipping any screen, it must help a visitor answer four questions:

### What exists?

Ground truth — today photography, honest place names, the map pin where they stand in the story. Observation before opinion.

### What could exist?

Phased visions — Try, Grow, Long — shown through concept imagery and one human sentence each. Multiple futures, not one take-it-or-leave-it plan.

### How could we get there?

Incremental path — small experiments before permanent builds; phase language that teaches try → grow → dream; ideas tagged by timing without collapsing vision and implementation.

### How can I participate?

A clear, low-friction action — support an idea, explore another place, scrub time, enter the atlas — without registration walls, fake elections, or comment-box exhaustion.

If a screen cannot answer at least one of these, it does not belong in the exhibition.

---

## For designers and agents

When you open a mockup or a pull request, ask:

1. Does this feel like a **civic exhibition** or a **planning portal**?  
2. Would a mayor and a student both feel **respected** here?  
3. Is the **photography** doing the persuasive work so the **copy** can stay short?  
4. Can I answer **what exists / what could / how / how to participate** from this screen alone?

When in doubt, open **People's Park on a phone** — dark map, crimson pin, panel rise, one image, one sentence, support buttons.

That is the design language in one gesture.
