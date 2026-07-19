# Imagine Kirkwood

A visual civic exploration platform for Bloomington's Kirkwood Avenue — photography, concept renderings, and short stories about what downtown could become.

> **Renderings are the product. Data collection is secondary.**

For purpose and direction, see [`docs/vision.md`](docs/vision.md).

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Supabase is **optional** for local exhibition work — see [`docs/supabase-setup.md`](docs/supabase-setup.md) for future Civic Portfolio setup.

## What's live

- **Exhibition homepage** (`/`) — cinematic hero, philosophy, path into the atlas
- **Opportunity Atlas** (`/explore`) — editorial map with six places, slide-out exhibition panel
- **Multiple futures per place** — story-first intro, then vertically scrolling full-bleed renderings
- **People's Park** — gold-standard reference site with four possible futures
- **Lightweight engagement** — Love this idea, Worth Trying, Save, and Share per future (device-local)
- **Shareable deep links** — `/explore?site=peoples-park&concept=outdoor-living-room`

## Roadmap (summary)

1. **Visual Exhibition** — expand sites, renderings, and exploration UX *(current)*
2. **Lightweight Reactions** — learn what resonates without friction
3. **Accounts + Wishlists** — save favorites across devices
4. **Civic Portfolio** — scarce Civic Points prioritization *(future)*
5. **Planning Insights** — leader-facing analytics *(future)*

See [`docs/roadmap.md`](docs/roadmap.md) for the full story.

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
