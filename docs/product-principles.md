# Product Principles

This is the constitution of Imagine Kirkwood.

Every feature — every panel, map treatment, vote flow, upload form, and admin screen — must align with these principles. They are not branding language. They are decision tools. When an idea fails here, we redesign the idea or we do not ship it.

For purpose and North Star, see [`vision.md`](vision.md). For how principles map to code and content, see [`data-model.md`](data-model.md) and [`contributing.md`](contributing.md).

---

## 1. Show possibilities before asking opinions

**Why it exists.** People cannot meaningfully react to what they cannot see. When engagement opens with a survey or a blank comment field, participants invent positions in a vacuum — or default to opposition. Possibilities give the conversation something to hold onto.

**Good implementations**

- Place panel opens with a today photo or concept render, then a single narrative sentence, before any support button.
- Phase scrubber lets visitors browse Try / Grow / Long futures before signaling preference.
- Homepage exhibition leads with "What could Kirkwood become?" — not "Tell us what you think."

**Avoid**

- Empty-state prompts asking for feedback before showing a vision.
- Surveys on the homepage or map entry.
- "Vote yes or no" on an undescribed master plan.
- Comment boxes placed above the hero image.

---

## 2. Start with places, not policies

**Why it exists.** Policies are abstract. Places are personal. Nobody says "meet me in the mid-block mobility innovation area" — they say "meet me at People's Park." Grounding the product in named, mappable places keeps engagement human and lowers the cost of participation.

**Good implementations**

- Map markers and panel titles use place names: People's Park, Library Plaza, Dining District.
- `OpportunitySite` is the atomic unit of content and interaction.
- District data (`InnovationArea`) exists for context but does not lead the panel or map legend.

**Avoid**

- Category-first navigation (gateway, mobility, gathering) as the primary IA.
- Innovation-area eyebrows and planning jargon in public UI.
- Features that require users to understand municipal structure before they understand a place.
- Colored zoning overlays as the main map interaction.

---

## 3. Prototype before investing

**Why it exists.** Permanent infrastructure is expensive and hard to undo. Temporary experiments — movable chairs, a pop-up stage, a weekend food cart — reveal whether an idea belongs in a place before capital is committed. The product should mirror that humility in how it tells stories about time and commitment.

**Good implementations**

- **Try Soon** phase content describes low-cost, reversible activations with concept imagery that looks temporary and lively — not monumental.
- Ideas tagged `phase: "try-soon"` emphasize things that could happen next week.
- Copy frames long-term visions as *direction*, not funded construction.

**Avoid**

- Only showing grand final renders with no credible near-term path.
- Treating every idea as a capital project in tone or visuals.
- Language that implies irreversible commitment for early-phase content.
- Skipping the Try Soon chapter and jumping straight to "Bloomington's Front Porch."

---

## 4. Small wins create momentum

**Why it exists.** Communities lose trust when everything is promised at once. Incremental change is honest: it acknowledges constraints, respects skeptics, and builds confidence through visible progress. Small wins prove that improvement is possible — and teach officials and neighbors to think in phases, not single groundbreakings.

**Good implementations**

- Timeline phases: **Today → Try → Grow → Long** — synced on map scrubber and in-panel filter.
- People's Park ideas list includes lightweight wins (temporary seating, shade umbrellas, weekend music) alongside larger ambitions.
- Product shipped in slices: exhibition → atlas → editorial panel → local idea support — each completing one step of the civic loop.

**Avoid**

- Monolithic "master plan" views that collapse all futures into one screen.
- Panels that require four scrolls of reading before any action.
- Promising six fully authored sites when one gold-standard place would serve the pilot better.
- Backend complexity before the core loop works on the client.

---

## 5. Beautiful visuals create better conversations

**Why it exists.** Ugly civic tools signal that participation is an obligation, not a gift. Beautiful ones signal respect — for the place, for the user's time, for the seriousness of shared space. Aesthetic quality is not decoration; it is trust architecture.

**Good implementations**

- Editorial spotlight map treatment: desaturated context, warm corridor spotlight, feathered pedestrian pools.
- Instrument Serif headlines, generous spacing, image-first panel layout.
- Concept renders following [`image-style-guide.md`](image-style-guide.md): optimistic realism, Bloomington character, 16:9 heroes.

**Avoid**

- Stock-photo grids with no place specificity.
- Dense data tables and stats blocks in the public panel.
- UI that looks like a government ERP or comment portal.
- Treating photography and map treatment as "polish at the end" rather than core product work.

---

## 6. Every place tells a story

**Why it exists.** Generic improvement sites feel interchangeable — and interchangeable places don't earn care. Each location has a history, a rhythm, and a reason it is empty or full. Story converts coordinates into belonging.

**Good implementations**

- People's Park: chapter titles ("A Place to Pass Through," "The Pop-Up Lawn") and narratives tied to show-night energy and foot traffic.
- Distinct `ideas[]` per site — not copy-pasted lists.
- Placeholder sites clearly marked `isPlaceholder` — never fake a complete story.

**Avoid**

- Identical phase copy across all six opportunity sites.
- Markers that differ only by accent color, not by name and character.
- Generic ideas ("more greenery," "better lighting") with no local context.
- Fabricated neighbor quotes or stats to fill space.

---

## 7. Separate ideas from implementation phases

**Why it exists.** "Should we have shade?" and "Should we plant oaks this fall?" are different conversations. Collapsing them invites argument about implementation before agreement on direction. Ideas are *what* we want; phases are *when and how* we might get there.

**Good implementations**

- Single **`ideas[]` list** per site with optional phase pills (Try / Grow / Long).
- `PhaseChapter` shows hero + one narrative only — no per-phase improvement bullet lists.
- Support attaches to **ideas**, not to entire phase renders or master plans.

**Avoid**

- Duplicate improvement lists inside every phase chapter *and* the ideas section.
- Voting on "Long Term vision" as a single yes/no.
- Conflating "I like this direction" with "Build this now."
- Four separate idea lists — one hidden inside each phase tab.

---

## 8. Community enthusiasm informs decisions but does not replace planning

**Why it exists.** Support signals reveal what resonates — invaluable for prioritization and morale. They are not engineering studies, budget approvals, or equity analyses. Overpromising that clicks equal policy misleads the public and erodes trust with officials.

**Good implementations**

- Support button labeled **Support / Supported** with copy: "saved on this device only."
- Display count = `seedVotes` + user's local support — presented as signal, not mandate.
- Roadmap Phase 3 reserved for cost, feasibility, and implementation tracking — honest about who decides.

**Avoid**

- "The winning idea will be built."
- Leaderboards styled like elections.
- Removing all nuance about official decision-making.
- Implying city staff are bound by browser localStorage tallies.

---

## 9. Evidence beats assumptions

**Why it exists.** Shared imagination must eventually meet reality. Observations, precedents, pilot outcomes, and measurements turn gut feeling into something a skeptic can engage with — without killing the hope that draws people in first. Evidence disciplines investment; it should not strangle exploration.

**Good implementations**

- **Observe** step: today photography grounds the story in what the place actually looks like.
- Future **Measure** step (Phase 3): dwell time, attendance, before/after documentation tied to experiments.
- Precedents (when reintroduced) as optional "learn from elsewhere" depth — not a wall before action.

**Avoid**

- Fabricated stats presented as authoritative ("Daily foot traffic: High") without source.
- Dismissing community support because "data isn't ready yet" — signals and evidence serve different roles.
- Dumping raw data tables into the public panel without narrative.
- Treating concept renders as guaranteed outcomes.

---

## 10. Design for curiosity rather than conflict

**Why it exists.** Conflict-oriented UX — binary votes, threaded arguments, us-vs-them framing — selects for the loudest voices and repels the curious middle. Curiosity-oriented UX invites exploration: *What if?* *What has worked elsewhere?* *What could we try next month?*

**Good implementations**

- Map + phase scrubber as primary interaction — browse futures without committing.
- Support as a positive signal, not a downvote on alternatives.
- Empty placeholder state: "Explore People's Park for a complete example" — not "You haven't participated."

**Avoid**

- Comment wars as a core feature.
- Forced registration before viewing visions.
- Binary framing when a spectrum of futures is available.
- Dark patterns that manufacture urgency, shame, or outrage.

---

## 11. Prioritize inspiration over administration

**Why it exists.** Facts alone rarely move neighborhoods. People need to *feel* what a better place could be — the evening light on a lawn, the hum of a market, the ease of staying instead of passing through. Administration has its place, but it is not the front door. Inspiration creates the emotional fuel for planning, compromise, and long civic work.

**Good implementations**

- One memorable narrative sentence per phase — not five bullets of metadata.
- Pared-back panel: name → phases → image → sentence → ideas (see [`decision-log.md`](decision-log.md) Decision 003).
- Copy a neighbor would read aloud — not language pasted from an RFP.

**Avoid**

- Timeline / Investment / Confidence rows in the public panel.
- Panels that read like planning appendices before anything actionable.
- Adding widgets (stats, forms, precedent galleries) that crowd out story.
- Leading with process documentation instead of place vision.

---

## Feature Evaluation Checklist

Before adding a feature, ask:

| Question | If **no**… |
|----------|------------|
| **Does this inspire?** | Redesign for vision-first storytelling or do not ship. |
| **Does this reduce conflict?** | Remove binary framing, debate mechanics, or adversarial copy. |
| **Does it help residents understand a place?** | Anchor to a named site, photo, or narrative — not abstract policy. |
| **Does it encourage experimentation?** | Add a try-soon path or defer until Phase 3 experiment tooling exists. |
| **Does it create better alignment?** | Clarify how it surfaces shared direction — not just more noise. |

**If the answer is no to any of these, reconsider the feature.**

### Extended review (optional)

Use when the feature is large or architectural:

- [ ] Does it serve the Observe → Imagine → Learn → Support → Experiment → Measure → Grow loop?
- [ ] Does the user see **possibilities** before being asked for **opinions**?
- [ ] Are **ideas** kept distinct from **phase / implementation** content?
- [ ] Is community enthusiasm labeled as **informing** decisions — not replacing planning?
- [ ] Is this the **smallest** version that validates the idea?
- [ ] Would it fit the People's Park mobile flow: **name → phase tabs → one image → one sentence → ideas with support**?

---

*When in doubt, open People's Park on a phone. If the feature doesn't belong in that flow, it probably doesn't belong in the product.*
