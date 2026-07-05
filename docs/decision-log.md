# Decision Log

This file records **major product decisions** for Imagine Kirkwood — so a new contributor (human or AI) can understand *why* the product evolved, not just *what* shipped.

Each entry uses the same format:

| Field | Purpose |
|-------|---------|
| **Decision** | Short name |
| **Date** | When accepted (approximate if pre-log) |
| **Context** | What problem or fork prompted the choice |
| **Alternatives Considered** | Real options, including the rejected status quo |
| **Decision** | What we chose |
| **Reasoning** | Why — tied to product principles where relevant |
| **Implications** | What future work must respect or revisit |

Related docs: [`vision.md`](vision.md) · [`product-principles.md`](product-principles.md) · [`data-model.md`](data-model.md) · [`contributing.md`](contributing.md)

**Status key:** Accepted · Under review · Superseded

---

## Decision 001 — Innovation Areas became Opportunity Sites

| | |
|---|---|
| **Decision** | Innovation Areas became Opportunity Sites |
| **Date** | Pilot phase, map redesign sprint (2026) |
| **Status** | Accepted |

### Context

Early prototypes organized Kirkwood around **Innovation Areas** — block-scale planning zones such as Theater Row, Parklet Promenade, and Indiana Avenue Gateway. Each area had a category (gateway, gathering, mobility), colored map geometry, and nested sites. That structure matched how planners divide a corridor, not how residents describe where they are going.

### Alternatives Considered

- **Area-first navigation** — click a colored zone, then drill into sites inside it.
- **Dual hierarchy** — equal weight for area panels and site panels.
- **Place-first navigation** — named sites as primary; areas as background context only.
- **Single corridor story** — one narrative for all of Kirkwood with no site-level granularity.

### Decision

**Opportunity Sites became the primary unit of navigation and storytelling.** Innovation Areas remain in the data model (`InnovationArea`, `areaId` on each site) but no longer lead the experience.

### Reasoning

Places are easier for residents to understand than planning categories. Nobody says "meet me in the mid-block mobility innovation area" — they say "meet me at People's Park." Starting with places aligns with *start with places, not policies* ([`product-principles.md`](product-principles.md)).

### Implications

- `OpportunitySite` is the atomic content unit for stories, ideas, and map markers.
- Site IDs use place language: `peoples-park`, `library-plaza`, `dining-district`.
- `geometry` was removed from sites; map positions live in `lib/map/opportunity-locations.ts`.
- Innovation-area eyebrow removed from the place panel.
- Phase 4 multi-district work can use `areaId` without restoring area-first UI.

---

## Decision 002 — Timeline phases replaced static proposals

| | |
|---|---|
| **Decision** | Timeline phases replaced static proposals |
| **Date** | Pilot phase, storytelling sprints (2026) |
| **Status** | Accepted |

### Context

Traditional civic engagement presents **one proposal** — a master plan, a single rendering, a yes/no vote. That framing forces all-or-nothing thinking and invites opposition before communities agree on direction.

### Alternatives Considered

- **Single future proposal** per site — one concept image and one narrative.
- **Before / after only** — today versus one imagined future.
- **Four timeline phases** — Today · Try Soon · Grow · Long Term.
- **Continuous timeline slider** — scrub by year (e.g. 2026 → 2040).

### Decision

**Every opportunity site carries four phased chapters** — `today`, `trySoon`, `grow`, `longTerm` — synchronized through a global map **`PhaseScrubber`** and in-panel **`SitePhaseFilter`**.

### Reasoning

The platform should communicate **incremental change**, not a single groundbreaking. Phases mirror how public space actually improves and map to the civic loop in [`vision.md`](vision.md): Observe (Today) → Imagine (Try / Grow / Long) → Experiment (Try) → Grow.

### Implications

- `TimelinePhase` and `TIMELINE_PHASES` are shared constants in `lib/types.ts`.
- `getPhaseContent(site, phase)` resolves active chapter content.
- Map markers show phase glow on the selected pin.
- Placeholder sites lock the phase filter to Today until content is complete.
- Phase chapters narrate **vision**; they do not duplicate the ideas list (see Decision 007).

---

## Decision 003 — Editorial storytelling replaced planning documents

| | |
|---|---|
| **Decision** | Editorial storytelling replaced planning documents |
| **Date** | Pilot phase, panel pare-back sprint (2026) |
| **Status** | Accepted |

### Context

The first complete site story grew into an **exhibit wall** — stats, observations, improvement bullets per phase, timeline/investment/confidence metadata, small wins, precedent cards, community prompts, and duplicate idea lists. Visitors scrolled through three or four screens before reaching anything they could **do**.

The content model reflected planning document structure, not how neighbors engage with a place.

### Alternatives Considered

- **Full planning portal** — expose all metadata in the public panel.
- **Progressive disclosure** — collapsed sections for stats, precedents, community.
- **Editorial core + optional depth** — one image, one sentence, ideas with support; depth on demand.
- **Hard delete of legacy types** — remove `Precedent`, `SmallWin`, `SiteCommunity` entirely.

### Decision

**The public panel shows editorial story, not planning administration:**

1. Place name  
2. Phase filter  
3. Hero image + chapter title + **one narrative sentence**  
4. Unified **ideas list** with support  

Removed from UI: stats, observations, improvement lists, meta rows, small wins, precedents, community form, innovation-area eyebrow.

### Reasoning

Planning documents inform professionals; **stories invite everyone**. The product principles require possibilities before opinions and inspiration over administration — none of which survive a panel that reads like an RFP appendix.

### Implications

- `PhaseChapter` renders hero + title + narrative only.
- Legacy fields (`improvements[]`, `timeline`, `investment`, `confidence`) remain in types but are **not rendered** — do not maintain them for new sites.
- Precedents and community may return as **optional Phase 2 depth**, not default panel layers.
- Panel composition rules documented in [`contributing.md`](contributing.md).

---

## Decision 004 — Opportunity Atlas replaced colored planning zones

| | |
|---|---|
| **Decision** | Opportunity Atlas replaced colored planning zones |
| **Date** | Pilot phase, map redesign sprint (2026) |
| **Status** | Accepted |

### Context

The first map used **colored SVG polygons** per innovation area — semi-transparent zone fills and category labels over an aerial photo. Users were meant to learn the corridor through planning graphics.

In practice, overlays read as **zoning maps and study boundaries**, not as an invitation to explore named places.

### Alternatives Considered

- **Colored zone polygons** — keep innovation-area overlays as primary interaction (`InnovationAreaOverlay`).
- **Clickable site footprints** — polygon shapes per opportunity site.
- **Place markers on aerial** — pins at calibrated positions; zones hidden.
- **List-first navigation** — card grid without a map.

### Decision

**The Opportunity Atlas** (`/explore`) became the primary map experience: full-screen aerial, **place markers** (`OpportunityPlaceMarker`), legend, phase scrubber, and slide-out panel. Zone overlays are **not rendered** — component retained but unreferenced.

### Reasoning

Residents navigate by **landmarks**, not land-use categories. Pin markers match consumer-map mental models, keep focus on named places, and scale to new cities by swapping location data in `opportunity-locations.ts`.

### Implications

- Marker positions decoupled from site content (`OpportunityLocation` vs. `OpportunitySite`).
- Map legend describes places and phases, not zone categories.
- `InnovationAreaOverlay.tsx` kept for optional future orientation only.
- Phase 4 GIS may import official boundaries without restoring zone-first interaction.

---

## Decision 005 — Editorial spotlight map treatment

| | |
|---|---|
| **Decision** | Editorial spotlight map treatment |
| **Date** | Pilot phase, exhibition map sprint (2026) |
| **Status** | Accepted |

### Context

A raw aerial photograph gives every block equal weight. The corridor study area, adjacent streets, and regional context competed for attention. The map needed to feel like a **museum exhibition** — curated, intentional — not a GIS export.

### Alternatives Considered

- **Unmodified aerial** — full-color photo, no treatment.
- **Uniform desaturation** — mute the entire image equally.
- **Hard rectangular clip** — sharp crop around the study area.
- **Feathered spotlight** — desaturated base + warm corridor and pedestrian pools with soft falloff.
- **Illustrated / 3D map** — non-photographic base.

### Decision

**Adopt a feathered editorial spotlight** in `lib/map/exhibit-treatment.ts`:

- Desaturated **base layer** for receded context  
- Warmer **spotlight layer** on Kirkwood Avenue and pedestrian spaces  
- Outer dim and subtle paper tint  
- **Kirkwood Avenue** street label on the corridor  

### Reasoning

Beautiful visuals create better conversations ([`product-principles.md`](product-principles.md)). The spotlight says "look here" without a bureaucratic boundary line. Pins sit in illuminated pools; context stays visible but subordinate.

### Implications

- Treatment constants live in `exhibit-treatment.ts`; coordinates assume viewBox 1000×600.
- New cities need recalibrated spotlight geometry.
- Future GIS layers should sit under or beside this treatment — not replace editorial intent.

---

## Decision 006 — People's Park became the canonical reference implementation

| | |
|---|---|
| **Decision** | People's Park became the canonical reference implementation |
| **Date** | Pilot phase, editorial sprints (2026) |
| **Status** | Accepted |

### Context

Six opportunity sites exist along Kirkwood, but shipping six half-finished stories would dilute quality and confuse the product narrative. Contributors needed a **single gold standard** for content, imagery, panel density, and ideas — not six competing templates.

### Alternatives Considered

- **Equal completeness** — fully author all six sites before any public launch.
- **Corridor-wide generic story** — one shared narrative with site name swaps.
- **People's Park as gold standard** — one complete site; others as clearly marked placeholders.
- **Rotating spotlight** — different canonical site each release cycle.

### Decision

**People's Park is the canonical reference implementation** — full today photo, three concept phases, ~eight deduplicated ideas with support, and the pared-back panel loop. Other sites remain mapped with `isPlaceholder: true` until they match that template.

### Reasoning

One polished place teaches the product better than six uneven ones. People's Park sits at the cultural heart of the pilot corridor — high foot traffic, clear before/after potential, strong show-night narrative — making it a credible demonstration for officials and neighbors.

Placeholder copy explicitly directs visitors: *"Explore People's Park for a complete example."*

### Implications

- Copy People's Park structure when authoring new sites ([`contributing.md`](contributing.md)).
- Feature reviews use the People's Park mobile flow as a gut check.
- Roadmap Phase 1 exit criteria: extend the template to all sites — not invent new panel shapes per place.
- Do not add panel sections to People's Park that other sites would not also receive.

---

## Decision 007 — Ideas are independent objects separate from implementation phases

| | |
|---|---|
| **Decision** | Ideas are independent objects separate from implementation phases |
| **Date** | Pilot phase, panel pare-back sprint (2026) |
| **Status** | Accepted (partially implemented; evolving) |

### Context

Early content duplicated proposals in four places: per-phase `improvements[]` bullets, `smallWins`, `community.ideas`, and phase narratives. Users saw the same suggestion four ways and could not tell whether they were supporting a **direction** or a **specific build**.

"Should we have shade?" and "Should we plant oaks this fall?" are different conversations. Collapsing them produces argument about implementation before agreement on goals.

### Alternatives Considered

- **Ideas embedded in each phase chapter** — four lists, one per tab.
- **Single master plan document** — one PDF-like view with all proposals.
- **Unified ideas list + phase-tagged vision chapters** — one scannable list; phases show hero + one sentence only.
- **Fully normalized idea store** — ideas as first-class API entities from day one (deferred).

### Decision

**Ideas are conceptually and structurally separate from implementation phases.**

- **Phases** (`today`, `trySoon`, `grow`, `longTerm`) narrate *when and at what ambition* a place could evolve — hero image + one sentence.  
- **Ideas** (`PlaceIdea[]`) describe *what* might happen — one unified list per site, optional `phase` tag, support attached to ideas not to phase renders.

Current implementation: `PlaceIdea` on `OpportunitySite` with localStorage support (`lib/ideas/votes.ts`). Future: persisted idea objects, cross-site discovery, experiment linkage (Phase 2–3).

### Reasoning

Aligns with *separate ideas from implementation phases* ([`product-principles.md`](product-principles.md)). Support signals accumulate in one place; phase scrubbing changes vision without hiding or duplicating the ideas catalog.

### Implications

- Do not render per-phase `improvements[]` in `PhaseChapter`.
- New content goes into `ideas[]`; deprecate `smallWins`, `community.ideas` for new sites.
- `PlaceIdea.phase` is an optional hint — not a container.
- Phase 2–3: ideas may become API-backed entities linked to experiments without merging back into phase chapters.
- See [`data-model.md`](data-model.md) for hierarchy and authoring checklist.

---

## Index

| ID | Decision | Status |
|----|----------|--------|
| 001 | Innovation Areas → Opportunity Sites | Accepted |
| 002 | Timeline phases → static proposals | Accepted |
| 003 | Editorial storytelling → planning documents | Accepted |
| 004 | Opportunity Atlas → colored planning zones | Accepted |
| 005 | Editorial spotlight map treatment | Accepted |
| 006 | People's Park → canonical reference | Accepted |
| 007 | Ideas independent from implementation phases | Accepted |
| 008 | *Reserved* | — |
| 009 | *Reserved* | — |
| 010 | *Reserved* | — |

---

## Future decisions (anticipated)

These forks are not yet logged as accepted decisions. When resolved, append entries 008+.

| Topic | Question |
|-------|----------|
| **Persisted support** | How are aggregate support signals stored, displayed, and labeled relative to official planning? |
| **Inspiration uploads** | What moderation and UX model replaces the removed community textarea? |
| **Precedents** | How do "learn from elsewhere" stories return without blocking the action loop? |
| **Experiment records** | What is the data model linking ideas to real-world pilots? |
| **Multi-city tenancy** | How do projects, districts, and atlases partition across deployments? |
| **GIS integration** | How do official layers coexist with the editorial spotlight map? |

---

## How to add a decision

1. Assign the next ID (008, 009, …).  
2. Use the standard fields: **Decision**, **Date**, **Context**, **Alternatives Considered**, **Decision**, **Reasoning**, **Implications**.  
3. Set **Status**: Accepted · Under review · Superseded.  
4. If superseding an earlier entry, update the old decision's status and link forward.  
5. Update [`data-model.md`](data-model.md) or [`contributing.md`](contributing.md) when the decision changes how contributors work.

When in doubt, ask: *Would a new contributor reverse this without context?* If yes, it belongs in this log.
