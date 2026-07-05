# Roadmap

Imagine Kirkwood evolves in four stages — each one earning the next. This is not a backlog of tickets. It is the story of how a civic exhibition becomes a reusable platform for public life.

We do not jump from renderings to city dashboards. We prove that neighbors can imagine a place together before we ask them to fund experiments — and we prove experiments on one street before we deploy to many cities.

For *why* we build this way, see [`vision.md`](vision.md). For *how* to judge any feature, see [`product-principles.md`](product-principles.md).

---

# Phase 1 — Civic Exhibition

## Purpose

Help people **imagine what is possible**.

The exhibition is the front door. A visitor should arrive curious, open a place on the map, see what it is like today, scrub through futures, and leave with a felt sense of what Kirkwood — or any main street — could become. No surveys. No master plans. Just possibility, told beautifully.

## Completed

- **Exhibition homepage** — cinematic hero, philosophy, and a path into the atlas (`/`)
- **Opportunity Atlas** — full-screen aerial map with place markers, legend, and slide-out panel (`/explore`)
- **Opportunity Sites** — six named places along Kirkwood; map positions decoupled from content
- **Editorial storytelling** — pared-back place panel: name → phases → one image → one sentence → ideas
- **Phase timeline** — Today · Try · Grow · Long, synced across map scrubber and in-panel filter
- **Concept imagery** — today photography and per-phase concept heroes (People's Park)
- **Spotlight map** — editorial desaturation, feathered corridor spotlight, Kirkwood street label
- **People's Park** — gold-standard site: four phase chapters, eight supportable ideas, full image set

Phase 1 also established the content model (`OpportunitySite`, `PlaceIdea`), local idea support (MVP), and the documentation foundation for contributors.

## Upcoming

- **Complete all opportunity sites** — extend the People's Park template to Dining District, Library Plaza, Restaurant Alley, Crossing Plaza, and Village Courtyard
- **Better renderings** — higher-fidelity concept heroes aligned with [`image-style-guide.md`](image-style-guide.md)
- **Richer precedents** — reintroduce "learn from elsewhere" as optional discovery depth, not a scroll wall before action

Phase 1 is nearly complete. It succeeds when every mapped place tells a full story — not when the feature list grows.

---

# Phase 2 — Civic Discovery

## Purpose

Help communities **discover alignment**.

Discovery turns passive viewing into participation — carefully. The goal is not a social network or a fake election. It is a shared picture of what resonates: which ideas matter, which inspirations neighbors share, and where a community might move together before anyone breaks ground.

## What this stage adds

**Opportunity cards**  
A browsable view of places beyond the map — card grid or list for share links, accessibility, and non-spatial discovery.

**Support ideas**  
*Partially shipped:* local Support / Supported toggles with device storage and editorial seed counts. Next: persisted aggregate signals with honest labeling — informing decisions, not replacing them.

**Upload inspiration**  
Photo and story submissions tied to a place — redesigned after the panel pare-back; moderation-aware, possibilities-first.

**Community collections**  
Neighbor-curated boards ("Shade ideas," "Show night energy") that complement editorial content without duplicating the ideas list.

**Discussion**  
Structured, place-scoped conversation — prompts and reactions designed for curiosity, not conflict. Not open comment wars.

**Filtering**  
Browse places and ideas by phase, theme, or district — without losing the place-first voice.

**Search**  
Find a place, an idea, or an inspiration by name — fast entry for return visitors and officials.

Phase 2 succeeds when a community can signal direction together — and trust what those signals mean.

---

# Phase 3 — Civic Experiments

## Purpose

Turn ideas into **pilots**.

Experiments are where imagination meets the sidewalk. The platform documents what was tried, what changed, and what was learned — so permanent investment follows proof, not politics.

## What this stage adds

**Temporary installations**  
Link ideas to real-world activations: movable seating weekends, pop-up stages, pilot food carts.

**Pilot tracking**  
Each experiment gets a living record — hypothesis, scope, dates, partners, linked place and ideas.

**Implementation status**  
A visible pipeline: proposed → approved → in progress → complete — separating community support from official approval.

**Before / after photos**  
Visual evidence attached to pilots; update the Today chapter when something permanent lands.

**Metrics**  
Plain-language outcomes — dwell time, attendance, new users of a space — not a raw data portal.

**Costs**  
Order-of-magnitude framing (pocket change → modest → major) tied to ideas and phases.

**Funding**  
Transparent view of what is funded, by whom, and what remains aspirational — no implied promises from support clicks alone.

Phase 3 succeeds when at least one Kirkwood pilot is documented end-to-end: from supported idea through temporary install to measured outcome.

---

# Phase 4 — City Platform

## Purpose

**Scale beyond Kirkwood.**

The pilot street proves the process. The platform carries it — to other districts, other cities, and the teams who steward public life.

## What this stage adds

**Multiple districts**  
Separate atlases or layers per corridor and neighborhood within a city — same product, different places.

**Multiple cities**  
Multi-tenant deployments: Bloomington first, then communities that share the same civic discovery loop.

**Admin dashboard**  
Role-based tools for editors, moderators, and city staff — content, pilots, moderation, and support analytics.

**GIS integrations**  
Import official boundaries, parcels, and capital plans; export aligned geometries without forcing planners into our UI paradigms.

**Analytics**  
Engagement funnels, idea support trends, experiment outcomes — privacy-conscious, useful to leaders and residents alike.

**Public API**  
Documented read (and selective write) access for partners, researchers, and civic developers.

**Mobile experience**  
Native or progressive enhancements optimized for on-street discovery — standing at People's Park, not only at a desk.

Phase 4 succeeds when a second city can launch an exhibition on shared infrastructure — and Bloomington runs the full loop from imagination through experiment.

---

## Long-Term Vision

Imagine Kirkwood becomes a **reusable civic discovery platform** — the place where communities answer three questions together:

*What should we build?*  
*Where should it happen?*  
*In what order should we try?*

Not through a single vote on a single plan, but through a rhythm the whole community can run: observe the place as it is, imagine what it could become, learn from elsewhere, support what resonates, experiment cheaply, measure honestly, and grow what works.

Kirkwood Avenue is the first chapter. The product is the book any city can write — with its own places, its own stories, its own pilots, and its own trust to earn.

The long-term measure of success is not traffic or feature count. It is **shared direction**: residents who feel ownership, leaders who understand priorities, experiments that reduce risk, investments grounded in evidence, and public life that improves through imagination rather than attrition.

That is the platform we are building toward.

---

## Where we are now

**Finishing Phase 1.** Entering **Phase 2.**

The immediate work is editorial depth (all opportunity sites, better renderings) and discovery design (cards, persisted support, inspiration uploads) — always checked against the [Feature Evaluation Checklist](product-principles.md#feature-evaluation-checklist).

Build the exhibition until it sings. Then open discovery. Then prove experiments. Then scale the platform.
