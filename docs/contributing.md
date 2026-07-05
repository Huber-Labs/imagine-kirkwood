# Contributing

This guide is for humans and AI agents working on Imagine Kirkwood. It explains how the project is organized, how to extend it without breaking consistency, and what to read before proposing changes.

**Read first:** [`vision.md`](vision.md) · [`product-principles.md`](product-principles.md) · [`data-model.md`](data-model.md) · [`decision-log.md`](decision-log.md)

**Do not treat this file as setup documentation.** For local install, see `README.md`.

---

## Project structure

Imagine Kirkwood is a **Next.js 16 App Router** application. Content lives in `lib/`; UI lives in `components/`; routes are thin.

```
imagine-kirkwood/
├── app/                    # Routes and global styles
│   ├── page.tsx            # Exhibition homepage (/)
│   ├── explore/page.tsx    # Opportunity atlas (/explore)
│   ├── layout.tsx          # Fonts, metadata, shell
│   └── globals.css         # Design tokens + editorial CSS
│
├── components/
│   ├── cards/              # Small reusable content blocks
│   ├── exhibition/         # Homepage sections
│   ├── landing/            # Shared header / legacy hero
│   ├── map/                # Atlas, markers, scrubber, chrome
│   ├── panel/              # Slide-out place panel
│   └── ui/                 # Generic UI primitives (Button, …)
│
├── lib/
│   ├── data/               # Editorial content (sites, districts)
│   ├── ideas/              # Client-side support helpers
│   ├── map/                # Map geometry, treatment, locations
│   ├── types.ts            # Shared TypeScript models
│   ├── concepts.ts         # Concept image path helpers
│   └── images.ts           # Photo / precedent path helpers
│
├── public/images/          # Static assets (see Image organization)
└── docs/                   # Product, data, and process documentation
```

### Layer responsibilities

| Layer | Responsibility | Should not |
|-------|----------------|------------|
| `app/` | Routing, page shells, metadata | Hold business logic or site copy |
| `lib/data/` | Site stories, districts, content arrays | Import React components |
| `lib/map/` | Map math, filters, marker positions | Know about panel UI |
| `components/map/` | Map rendering and interaction | Hard-code site copy |
| `components/panel/` | Place panel and phase storytelling | Define content types |
| `lib/types.ts` | Canonical data shapes | Contain implementation logic |

### Key routes

| Route | Purpose |
|-------|---------|
| `/` | Civic exhibition — hero, philosophy, enter atlas |
| `/explore` | Full-screen opportunity atlas + place panel |

---

## Naming conventions

Consistency matters more than cleverness. Match existing names before inventing new ones.

### IDs and slugs

- **kebab-case** for stable identifiers: `peoples-park`, `dining-district`, `try-soon`
- Site `id` must match `OpportunityLocation.siteId` and the image folder name
- Idea IDs: `idea-{site-short}-{slug}` — e.g. `idea-pp-seating`

### TypeScript

- **PascalCase** interfaces and components: `OpportunitySite`, `PlaceIdeasSection`
- **camelCase** fields and functions: `trySoon`, `getPhaseContent`, `seedVotes`
- Phase keys on sites: `today`, `trySoon`, `grow`, `longTerm`
- Phase IDs in `TimelinePhase`: `"today"`, `"try-soon"`, `"grow"`, `"long-term"`

### Files

- React components: **PascalCase** file matching export — `PhaseChapter.tsx`
- Utilities and data: **kebab-case** or descriptive camel — `opportunity-sites.ts`, `exhibit-treatment.ts`
- One primary export per component file

### CSS

- Prefer **BEM-like** classes in `globals.css` for editorial components: `phase-chapter__lead`, `place-idea-row__support`
- Tailwind for layout and spacing in TSX; extract repeated editorial patterns to CSS when they stabilize
- Panel animation tokens: `panel-rise`, `panel-eyebrow`, `exhibition-rise`

### Copy and labels

- **Place names** as people say them: "People's Park," not "Theater Row Opportunity Zone"
- Phase labels from `TIMELINE_PHASES` — do not invent alternate names in UI
- Avoid planning jargon in public UI: timeline, investment, confidence, innovation area (see [`decision-log.md`](decision-log.md))

---

## Component organization

Components are grouped by **experience**, not by atomic design tier.

### `components/map/`

Everything visible on `/explore` except panel contents.

| Component | Role |
|-----------|------|
| `MapExperience` | State owner: selected site, active phase, panel open |
| `AerialMap` | SVG aerial + spotlight treatment + markers |
| `OpportunityPlaceMarker` | Pin, label, ripple, phase glow |
| `PhaseScrubber` | Global Today · Try · Grow · Long control |
| `MapLegend`, `MapChrome` | Legend and attribution |

**Rule:** Map components receive data via props or `lib/data` — never embed site narratives.

### `components/panel/`

Slide-out place story. Composition root: `SlideOutPanel` → `SiteDetail`.

| Component | Role |
|-----------|------|
| `SiteDetail` | Panel shell: name, phase filter, chapter, ideas |
| `SitePhaseFilter` | In-panel phase tabs |
| `PhaseChapter` | Hero + title + one narrative |
| `PlaceIdeasSection` | Ideas list + local support |
| `SiteConceptHero`, `StoryMedia` | Image heroes |

**Rule:** The panel loop is **name → phases → one image → one sentence → ideas**. Do not add sections without checking [`product-principles.md`](product-principles.md).

### `components/exhibition/`

Homepage-only sections. Keep `/` independent from map state.

### `components/cards/`

Small presentational blocks (`IdeaCard`, `ObservationCard`). Prefer using these over duplicating markup — but note some cards are legacy (observations no longer rendered in panel).

### Client vs server

- `"use client"` only when needed: state, effects, localStorage, event handlers
- Pages may stay server components; interactive subtrees are client islands
- `MapExperience`, `SiteDetail`, `PlaceIdeasSection`, `PhaseScrubber` are client components

### Deprecated but retained

Do not delete without an explicit cleanup task:

- `InnovationAreaOverlay` — zone polygons; not mounted
- `SmallWinsSection`, `ConfidenceIndicator` — removed from panel flow
- `ResearchComingSoon` — stub for future depth

---

## Image organization

All public assets live under `public/images/`. Paths are referenced from the site root (`/images/...`).

### Directory layout

```
public/images/
├── aerials/                          # Base map imagery
├── exhibition/                       # Homepage hero
├── concepts/                         # Shared placeholders
├── placeholders/                     # Fallback SVGs
└── opportunities/
    └── {site-id}/                    # Matches OpportunitySite.id
        ├── today/
        │   └── street.jpg            # Today hero photo
        ├── try-soon/
        │   └── hero.webp             # Try Soon concept
        ├── grow/
        │   └── hero.webp             # Grow concept
        ├── long-term/
        │   └── hero.webp             # Long Term concept
        └── precedents/               # Optional — not in current UI
            ├── 01.jpg
            ├── 02.jpg
            └── 03.jpg
```

### Conventions

| Asset | Format | Aspect | Path helper |
|-------|--------|--------|-------------|
| Today photo | `.jpg` | landscape | `getSitePhotoPath(siteId)` |
| Concept hero | `.webp` | 16:9 | `getSiteConceptImage(siteId, phase)` |
| Precedent | `.jpg` | landscape | `getPrecedentImagePath(siteId, index)` |
| Placeholder | `.svg` | any | `CONCEPT_PLACEHOLDER_PATH`, `PHOTO_PLACEHOLDER_PATH` |

### Visual standards

Follow [`image-style-guide.md`](image-style-guide.md): optimistic realism, Bloomington character, Gehl/ULI-quality civic visualization, warm light, no sci-fi, no text baked into renders.

### Fallback behavior

Image components should fail gracefully to placeholders (`onError` handlers in `SiteConceptHero`, `TodayPhoto`). Never ship a broken hero without a fallback path.

---

## How to add a new Opportunity Site

Use **People's Park** in `lib/data/opportunity-sites.ts` as the gold standard. Work through these steps in order.

### 1. Choose identity

- Pick a **place-first** `id` (kebab-case) and display `name`
- Assign `areaId` → an existing `InnovationArea.id` in `lib/data/innovation-areas.ts`
- Pick `accent` hex — typically matches district accent

### 2. Add map position

In `lib/map/opportunity-locations.ts`, append an `OpportunityLocation`:

```typescript
{
  siteId: "your-site-id",   // must match OpportunitySite.id
  x: 50,                    // 0–100% of map width
  y: 55,                    // 0–100% of map height
  label: "Your Place Name",
  labelAlign: "center",     // "left" | "right" | "center"
  labelOffset: { x: 0, y: 18 },
}
```

Tune `x` / `y` against the aerial (west → east along Kirkwood). Markers are percent-based so they scale with the viewBox.

### 3. Add site content

In `lib/data/opportunity-sites.ts`, either:

- **`createPlaceholderSite(...)`** while content is stubbed, or
- A full `OpportunitySite` object when editorial is ready

Full site checklist:

- [ ] `today` — `chapterTitle`, **one** `narrative`, `photo` path
- [ ] `trySoon`, `grow`, `longTerm` — `chapterTitle`, **one** `narrative`, `conceptImages`
- [ ] `ideas[]` — ~8 deduplicated `PlaceIdea` entries with optional `phase` and `seedVotes`
- [ ] `improvements: []` — leave empty; not rendered
- [ ] Remove `isPlaceholder` (or set `false`) when all phases and ideas are complete

### 4. Add images

Create `public/images/opportunities/{site-id}/` with today photo and three concept heroes (see below).

### 5. Verify in UI

- Marker appears at the correct location on `/explore`
- Panel shows phase filter (all phases if complete; Today only if placeholder)
- Phase scrubber updates hero + copy
- Ideas list renders with support buttons

### 6. Do not (unless explicitly requested)

- Add innovation-area eyebrow to the panel
- Populate `smallWins`, `precedents`, or `community` for new sites
- Duplicate ideas inside phase `improvements[]`
- Add `geometry` to the site model — positions live in `opportunity-locations.ts`

---

## How to add concept imagery

Concept images power **Try Soon**, **Grow**, and **Long Term** chapters.

### File placement

```
public/images/opportunities/{site-id}/try-soon/hero.webp
public/images/opportunities/{site-id}/grow/hero.webp
public/images/opportunities/{site-id}/long-term/hero.webp
```

### Wire into content

Reference explicitly in `SitePhaseContent`:

```typescript
trySoon: {
  chapterTitle: "…",
  narrative: "…",
  conceptImages: ["/images/opportunities/your-site-id/try-soon/hero.webp"],
  // …
},
```

If `conceptImages` is omitted, `SiteConceptHero` falls back to `getSiteConceptImage(siteId, phase)` — which assumes the standard path above.

### Editorial pairing

Each concept image must pair with **one narrative sentence** in the same phase. The image carries detail; the copy stays short. See People's Park for tone.

### Quality bar

- One hero per phase — not a gallery in the default panel
- 16:9 landscape, hero-safe composition (center-weighted activity)
- Match phase ambition: Try = temporary/light, Grow = durable infrastructure, Long = civic landmark

---

## How to add precedents

Precedents are **learn-from-elsewhere** stories — not supportable ideas for this site. They are **deprecated in the current UI** (removed in panel pare-back) but the type and image paths remain for future Phase 2 discovery features.

### Data shape

```typescript
precedents: [
  {
    id: "prec-{site}-1",
    place: "Madison, WI",
    summary: "One sentence — what this place proved.",
    image: "/images/opportunities/{site-id}/precedents/01.jpg",
  },
],
```

### Image placement

```
public/images/opportunities/{site-id}/precedents/01.jpg
public/images/opportunities/{site-id}/precedents/02.jpg
public/images/opportunities/{site-id}/precedents/03.jpg
```

Use `getPrecedentImagePath(siteId, index)` where `index` is 1-based.

### When to add them

- Do **not** add precedents to new sites for the current exhibition panel
- If reintroducing precedents, treat as **optional depth** — never before the ideas list in the scroll order
- Keep precedents separate from `ideas[]` — precedents inform; ideas are supported

---

## How to add a new implementation phase

**Implementation phases** are the shared timeline axis: **Today · Try Soon · Grow · Long Term**. They are not the same as roadmap phases (Civic Exhibition, Civic Discovery, …).

Adding a new timeline phase is a **major architectural change**. Only do it with explicit product approval and a decision log entry.

### What must change

1. **`TimelinePhase`** union in `lib/types.ts`
2. **`TIMELINE_PHASES`** array — `id`, `label`, `shortLabel`, `subtitle`, `confidenceLevel`
3. **`OpportunitySite`** — new field for phase content (e.g. `midTerm: SitePhaseContent`) *or* redefine an existing phase
4. **`getPhaseContent()`** in `lib/data/opportunity-sites.ts`
5. **Every site** in `opportunitySites` — content for the new phase
6. **`SitePhaseFilter`** and **`PhaseScrubber`** — render new tab
7. **`PlaceIdea.phase`** union — if ideas can tag the new phase
8. **Image paths** in `lib/concepts.ts` — folder name convention
9. **Map marker phase glow** logic in `OpportunityPlaceMarker`
10. **Docs** — `data-model.md`, `decision-log.md`, this file

### Alternatives to a new phase

Prefer these before expanding the timeline:

- Tag an idea with an existing phase (`phase: "grow"`)
- Add a second sentence to `paragraphs[]` — **not rendered today**, but type supports it
- Use Phase 3 **Experiments** (future) for pilot-specific storytelling

### Naming a new phase

If approved, use kebab-case ID (`mid-term`), a short scrubber label (≤4 chars), and a clear subtitle that communicates commitment level.

---

## Git workflow

### Branches

- **`main`** — production-ready; deploys to production
- **Feature branches** — `feature/short-description` or `fix/short-description`
- Keep branches focused: one site editorial pass, one panel change, one map tweak

### Commits

- Write commit messages in **imperative mood**: "Add Library Plaza concept images", not "Added…"
- One logical change per commit when possible
- **Do not commit** unless asked (human workflow) or task explicitly includes commit (agent workflow)
- Never commit secrets (`.env`, credentials)

### Before opening a PR

- Run `npm run build` — must pass
- Run `npm run lint` if you touched TS/TSX
- Spot-check `/` and `/explore` — especially mobile panel scroll and phase scrubber sync
- Update `docs/` when you change architecture, content model, or product behavior

### Pull requests

Include:

- **What** changed (one paragraph)
- **Why** — link to product principle or decision log if non-obvious
- **Test plan** — checklist of routes and interactions verified
- Screenshots for visual changes (homepage, map, panel)

### What not to do

- Force-push `main`
- Skip hooks (`--no-verify`) unless explicitly requested
- Amend commits already pushed to shared remote
- Large unrelated refactors bundled with content edits

---

## Deployment workflow

Imagine Kirkwood deploys as a **static-friendly Next.js app** (App Router, no custom server required).

### Environments

| Environment | Trigger | Purpose |
|-------------|---------|---------|
| **Preview** | Pull request branch push | Review visual and interaction changes |
| **Production** | Merge to `main` | Public exhibition |

Hosting is intended for **Vercel** (Next.js native). No `vercel.json` is required for default behavior.

### Deployment checklist

Before merging to `main`:

- [ ] `npm run build` succeeds locally
- [ ] New images committed under `public/images/` (not hot-linked externally)
- [ ] No broken asset paths — heroes fall back to placeholders, not 404 loops
- [ ] Content changes don't require env vars (MVP has no backend secrets)

### After deploy

- Verify `/` homepage and `/explore` atlas on production URL
- Open People's Park (or changed site) on a phone — panel + phase scrubber
- If map positions changed, confirm markers align on production aerial

### Rollback

Revert the merge commit on `main` or redeploy a prior production build from the hosting dashboard. Prefer revert over force-push.

---

## Coding philosophy

These rules keep the codebase maintainable for humans and AI agents alike.

### Minimize scope

- Solve the task in the fewest files possible
- Do not refactor adjacent code unless required
- Do not add abstractions for one call site

### Match existing patterns

- Read surrounding code before writing
- Reuse helpers in `lib/` (`getPhaseContent`, `getSiteConceptImage`, vote helpers)
- Extend types in `lib/types.ts` — don't duplicate shapes in components

### Types over comments

- Prefer explicit interfaces to JSDOM or `any`
- Mark deprecated fields with `@deprecated` — don't delete types mid-migration
- Keep content types serializable (plain objects, no class instances)

### Client-side MVP first

- No backend until roadmap Phase 2+ explicitly requires it
- localStorage for support votes is intentional (`lib/ideas/votes.ts`)
- Label participatory features honestly ("saved on this device only")

### Next.js specifics

- Read `node_modules/next/dist/docs/` before assuming Next.js APIs — this project uses **Next.js 16** with breaking changes from older versions (see `AGENTS.md`)
- Prefer App Router conventions; keep pages thin

### Tests

- No test suite today — manual verification via build + spot-check
- Add tests only when requested or when covering non-obvious logic worth guarding

---

## Design philosophy

Design and code serve the same civic goal. When in doubt, read [`product-principles.md`](product-principles.md) and run the feature checklist at the bottom.

### Core beliefs

| Principle | In practice |
|-----------|-------------|
| **Places, not policies** | Panel leads with "People's Park," not "Theater Row · Gathering" |
| **Possibilities before opinions** | Hero + narrative before support buttons |
| **Incremental futures** | Four phases, not one master plan |
| **Editorial, not administrative** | Magazine/exhibit feel — not a dashboard |
| **Curiosity, not conflict** | Exploration and support — not debate threads |
| **Beautiful visuals** | Spotlight map, serif headlines, intentional photography |
| **Technology disappears** | No chrome that screams "civic tech portal" |

### Panel composition (canonical)

```
Place name
Phase filter (Today · Try · Grow · Long)
Hero image
Phase label + chapter title
One narrative sentence
Ideas for this place (support buttons)
```

Anything else is suspect unless a decision log entry says otherwise.

### Typography and color

- Headlines: **Instrument Serif** (`font-[family-name:var(--font-instrument-serif)]`)
- Body: **Inter**
- Map markers: **IU crimson** `#990000` (see `lib/map/exhibit-treatment.ts`)
- Site accent: per-site `accent` → CSS `--hero-accent`

### Motion

- Subtle panel rise animations (`panel-rise`)
- Marker ripple on atlas — respect `prefers-reduced-motion` (see `globals.css`)
- Phase transitions should feel like turning a page, not loading a dashboard widget

### Storytelling voice

From [`storytelling-principles.md`](storytelling-principles.md):

- Inspire before you persuade
- Tell stories before presenting evidence
- Every place deserves a hopeful future
- Celebrate Bloomington while learning from the world

Write copy a neighbor would read aloud — not language copied from a planning document.

---

## Agent-specific guidance

If you are an AI contributor:

1. Read `docs/product-principles.md` **before** proposing features
2. Read `docs/decision-log.md` **before** reversing a UX or architecture choice
3. Use `docs/data-model.md` for content structure — don't invent parallel models
4. Copy **People's Park** patterns for new sites
5. Do not restore removed panel sections (precedents, community form, stats) without explicit user request
6. Do not edit plan files in `.cursor/plans/` unless asked
7. Prefer `npm run build` over `dev` for verification when finishing a task

---

## Documentation map

| Doc | When to read |
|-----|----------------|
| [`vision.md`](vision.md) | Purpose, civic loop, North Star |
| [`product-principles.md`](product-principles.md) | Feature design decisions |
| [`data-model.md`](data-model.md) | Types, hierarchy, images |
| [`decision-log.md`](decision-log.md) | Why the architecture looks this way |
| [`roadmap.md`](roadmap.md) | What's shipped vs planned |
| [`image-style-guide.md`](image-style-guide.md) | Concept render direction |
| [`storytelling-principles.md`](storytelling-principles.md) | Voice and narrative tone |

When you change behavior, update the relevant doc in the same PR.
