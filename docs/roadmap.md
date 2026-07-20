# Roadmap

Imagine Kirkwood evolves in stages — each one earning the next. We do not jump from renderings to city dashboards. We prove the exhibition is a **destination** before we add accounts, portfolios, or leader analytics.

For *why* we build this way, see [`vision.md`](vision.md). For *how* to judge any feature, see [`product-principles.md`](product-principles.md).

---

# Phase 1 — Civic Exhibition *(current)*

## Purpose

Help people **imagine what is possible** — and keep coming back to look.

The exhibition is the front door. A visitor should arrive curious, open a place on the map, scroll through possible futures, and leave with *I never thought of that* moments. No surveys. No master plans. Just possibility, told beautifully.

**Exit criteria:** every mapped place presents multiple authored futures with real imagery — not participation feature count.

## Completed

- **Exhibition homepage** — cinematic hero, philosophy, path into the atlas (`/`)
- **Opportunity Atlas** — full-screen aerial map, place markers, slide-out exhibition panel (`/explore`)
- **Opportunity Sites** — six named places; map positions decoupled from content
- **Futures exhibition** — story-first panel, vertically scrolling full-bleed renderings per place
- **Concept imagery** — People's Park complete (three published futures + one coming soon)
- **Spotlight map** — editorial desaturation, corridor spotlight, Kirkwood label
- **People's Park** — gold-standard reference site
- **Per-future engagement** — Love this idea, Worth Trying, Save, Share (device-local)
- **Shareable deep links** — `?concept=` URLs with legacy `?phase=` redirect

## Upcoming (Phase 1)

- **Complete all opportunity sites** — extend People's Park futures template across Dining District, Library Plaza, Food Truck Alley, Crossing Plaza, Village Courtyard
- **Better renderings** — higher-fidelity heroes per [`image-style-guide.md`](image-style-guide.md)
- **Homepage polish** — align homepage hero with futures model when ready

Phase 1 succeeds when every mapped place tells a full story — not when the feature list grows.

---

# Phase 2 — Lightweight Engagement

## Purpose

Learn **what resonates** without friction or political tone.

Before accounts or civic workflows, visitors can react to ideas and renderings with low-stakes signals: Love, Worth Trying, Save, Share. Stored on-device initially. No public leaderboards.

## What this stage adds

**Love / Worth Trying** — quiet positive reactions on idea rows; no vote counts.

**Save to wishlist** — bookmark ideas or places; view saved items locally.

**Share** — deep links to `/explore?site=…&concept=…` via Web Share API or copy link.

**Optional later in Phase 2** — opportunity cards grid, filtering by phase/theme, search — only if they serve discovery.

## Deferred from old Phase 2

Discussion threads, inspiration uploads, and community collections wait until the exhibition has depth and lightweight reactions show usage.

Phase 2 succeeds when reactions feel natural beside renderings — not like a survey or election.

---

# Phase 3 — Personal Collections

## Purpose

Help return visitors **pick up where they left off**.

## What this stage adds

**User accounts** — Supabase auth (scaffold exists in repo); sign-in when saving across devices.

**Persisted wishlists** — migrate local saves on first sign-in.

**Auth framing** — *"Save your favorites across devices"* — not portfolio or ballot language.

Phase 3 succeeds when repeat visitors can rebuild their saved ideas without re-tapping everything.

---

# Phase 4 — Civic Portfolio

## Purpose

Help communities **prioritize under scarcity** — collaboratively, not politically.

When content and engagement justify it, residents allocate **10 Civic Points** across catalog investments (including **Today — Protect What Works**), auto-save while building, and **Save My Priorities** with tag-driven portfolio summaries.

## What this stage adds

- Civic Point stepper in place panel (reuse [`supabase/migrations/`](../supabase/migrations/))
- `/portfolio` — stars, tag summary, optional reflection, completion share
- Admin aggregates — investment totals by place and tier

See [`vision.md`](vision.md) § Where this leads. Schema M1 is in the repo; **UI wiring waits for Phase 4.**

Phase 4 succeeds when prioritization feels like a natural extension of exploration — not a separate workflow.

---

# Phase 5 — Planning Insights

## Purpose

Give city leaders **honest aggregate signal** — not a mandate.

## What this stage adds

**Admin dashboard** — role-based tools via `profiles.is_admin`; CSV export; engagement and reaction trends.

**Analytics** — privacy-conscious funnels; useful to stewards, not surveillance.

**GIS / multi-city** — scale beyond Kirkwood when the pilot proves the loop.

Phase 5 succeeds when leaders understand community priorities from discovery data — without residents feeling audited.

---

# Phase 6 — Civic Experiments *(parallel track)*

Turn ideas into **pilots** on the sidewalk — temporary installations, pilot tracking, before/after photos, plain-language metrics. See prior experiment-stage docs in git history for detail; this track runs when a real Kirkwood pilot is ready to document.

---

## Long-Term Vision

Imagine Kirkwood becomes a **reusable civic discovery platform** — the place where communities answer:

*What should we build?* · *Where?* · *In what order?*

Not through a single vote on a single plan, but through a rhythm: observe the place, imagine futures, learn from elsewhere, signal what resonates, experiment cheaply, measure honestly, grow what works.

Kirkwood Avenue is the first chapter. The product is the book any city can write.

---

## Where we are now

**Finishing Phase 1.** Shipping **Phase 2** lightweight engagement alongside content expansion.

Immediate engineering focus:

1. Better homepage and exploration UX
2. More opportunity locations and phased renderings (parallel content)
3. Love / Save / Share reactions (no accounts yet)

**Do not build:** Civic Portfolio UI, auth gates on participation, or admin analytics until the [review checkpoint](#review-checkpoint-before-v3) passes.

---

## Review checkpoint (before V3)

After Phase 1 polish + Phase 2 lightweight engagement ship, pause and ask:

| Question | Proceed to V3 if… |
|----------|---------------------|
| Are people spending time in phase renderings? | Yes — dwell and return visits, not just homepage bounce |
| Are Love / Save / Share used without feeling political? | Yes — reactions feel natural, not contentious |
| Is there enough authored content? | Yes — multiple sites with full four-phase stories |

Only then: user accounts, persisted wishlists (Phase 3), then Civic Portfolio (Phase 4), then leader analytics (Phase 5).

Build the exhibition until it sings. Then open lightweight engagement. Then personal collections. Then prioritization. Then insights.
