# REELTRACE — Product, Creative Direction & Build Brief for an AI Coding Agent

**Document type:** Design research + product specification + implementation handoff  
**Prepared:** 28 October 2026  
**Project concept:** REELTRACE — *The Cinema Memory Machine*  
**Purpose:** Give another AI agent enough context to design and build a distinctive, creative, usable movie-discovery website—not merely a generic streaming catalogue or a copy of the reference sites.

---

## 0. Instructions to the Agent

Act as a senior digital art director, interaction designer, UX researcher, and full-stack engineer. Read this brief before changing code. Inspect the existing repository and available assets first, then implement a coherent, working website that reflects the product and creative direction below.

**Do not clone the reference websites.** Study their publicly visible design principles and reinterpret those principles for this product. Do not copy their source code, distinctive layouts, brand assets, copy, illustrations, exact transitions, or signature visual devices. The result needs its own visual identity, interaction grammar, and voice.

Make reasonable product decisions without stopping for routine preference questions. If a real blocker exists—such as a required API key or a repository constraint—implement a good local/demo fallback and clearly explain the blocker. Avoid replacing existing project work without inspecting it first.

Do not stop after producing a static landing page or design description. Build the actual responsive interface and make the visible interactions work. If no existing application is provided, establish a clean, maintainable starting structure.

### Definition of success

The product should make a visitor think: **“This feels like a creative cinema object I want to explore,”** while still making it immediately obvious how to find a remembered line, locate a scene, or discover what to watch next. Originality and usability are equally important.

---

## 1. Product Summary

### Working name

**REELTRACE**  
Tagline: **The Cinema Memory Machine**  
Alternate headline: **You remember the moment. We find the movie.**

The name is provisional; preserve it unless the repository or user has already chosen another. Do not spend the build on a naming exercise.

### The problem

People often remember a small fragment of a film but not its title:

- A line of dialogue, even if only a few words are remembered.
- A scene, image, character, setting, or approximate moment.
- A general feeling or genre when they cannot decide what to watch.

Typical film catalogues begin with title-based browsing. REELTRACE should begin with **memory** and help people move from a vague clue to a useful result.

### Core promise

“Bring us the fragment you remember. We’ll help you trace it back to a film—or help you discover your next one.”

### Product personality

- Curious, cinematic, tactile, editorial, slightly mischievous.
- Designed by people who love films, but not inaccessible or self-important.
- Premium and expressive without looking like a luxury-car website.
- Playful without looking childish.
- Visually rich without sacrificing clarity, performance, accessibility, or mobile usability.

### Primary users and jobs to be done

1. **The quote rememberer:** “I can remember a phrase. What film was it from?”
2. **The scene rememberer:** “I remember what happened in a scene, but not its title or timestamp.”
3. **The indecisive viewer:** “I want a film to watch, but I am tired of scrolling through endless lists.”
4. **The personal curator:** “I want to save promising films and keep track of what I have already seen.”

---

## 2. Reference-Site Research: What to Learn, Not What to Copy

The four sites below were reviewed for their visible presentation and interaction ideas on 28 October 2026. Treat the observations as research, not a component library to reproduce.

### A. A24 Television — curated library and designed objects

Reference: https://a24.raviklaassens.com/television

**Visible qualities observed:**
- The page presents a curated A24 television library with distinctive disc-like artwork for individual titles.
- Artwork behaves as the visual anchor while title, year, director, cast, and review snippets supply context.
- The interface exposes media controls such as sound, pause, and maximise, giving the experience a more immersive, media-led character.
- The catalogue feels art-directed rather than like a default grid of identical streaming cards.

**Transferable lesson for REELTRACE:**
- Let film imagery and the user's remembered fragment drive the experience.
- Treat each result as a small artefact with meaningful metadata, not simply a rectangle with a poster and an “Open” button.
- Curate the visual rhythm: use a few large moments, smaller supporting elements, and deliberate spacing.
- If sound is ever used, make it opt-in and provide obvious controls. The core experience must remain useful with sound off.

**Do not copy:** the exact disc metaphor, artwork styling, page structure, A24 branding, proprietary images, or specific motion sequence. Invent a different signature device for REELTRACE.

### B. Forge Automotive — conviction, immersive imagery, authored process

Reference: https://forgeautomotive.co.uk/

**Visible qualities observed:**
- A strong hero statement establishes the brand's attitude quickly.
- Large automotive imagery and strong contrast are used to create impact.
- The site explains its approach as a small set of authored principles (identity, insight, cohesion), so the work feels considered rather than arbitrary.
- The page combines strong visual moments with clear paths to learn more or take action.

**Transferable lesson for REELTRACE:**
- The opening message should make a specific promise, not say “Discover amazing movies.”
- Give the homepage a strong focal point and one clear primary action.
- Make the product's three discovery modes feel like a deliberate system, each with its own personality but shared design logic.
- Use large imagery with purpose; a hero should communicate the product, not be decorative wallpaper.

**Do not copy:** the vehicle photography, automotive tone, exact slogan structure, branded service sequence, layout, or visual treatment.

### C. Brandon Yasin — curated archive, restraint, purposeful motion

Reference: https://brandonyasin.com/

**Visible qualities observed:**
- An archive is framed as a curated selection of work and explorations rather than a conventional list.
- Navigation and content presentation feel authored; minimalism is used to direct attention, not merely to remove content.
- There are distinctive utility and motion cues, including menu/contact treatments and a time-related interaction.
- Sections use a carefully controlled editorial rhythm; the work has room to breathe.

**Transferable lesson for REELTRACE:**
- The saved-film feature should feel like a personal archive or collection, not a generic account dashboard.
- Use whitespace and short labels to make visually complex pages understandable.
- Motion should communicate state, reveal relationships, or reward exploration. It should not be added just because an animation library is available.
- A small number of surprising, purposeful interactions is better than dozens of unrelated effects.

**Do not copy:** the portfolio archive layout, exact navigation, text, contact flow, time-travel concept, pointer effects, or distinctive transitions.

### D. ESR Bespoke — refined presentation, material care, confident hierarchy

Reference: https://www.esrbespoke.au/

**Visible qualities observed:**
- The site relies on strong photography and a restrained navigation structure.
- The headline and supporting copy establish quality and trust without excessive interface decoration.
- Brands, services, and numbered sections give complex information a clear hierarchy.
- The visual language is polished and spacious rather than crowded with boxes.

**Transferable lesson for REELTRACE:**
- Use a disciplined hierarchy: one headline, one supporting idea, one primary action, then supporting discovery paths.
- Keep film metadata readable and consistent. The visual system should make uncertainty and source information clear rather than hide it.
- Use image crops, margins, and typography deliberately; avoid packing every screen with cards.
- Build trust by distinguishing live data from sample/demo content and by showing provenance where relevant.

**Do not copy:** the site's luxury automotive imagery, marque list, service presentation, exact page order, or branded typography and composition.

### Synthesis: the creative brief in one table

| Reference | Principle to learn | REELTRACE interpretation |
|---|---|---|
| A24 Television | A catalogue can feel like a designed collection | Film fragments become collectible-looking “memory artefacts” with art, snippets, timestamps, and metadata |
| Forge Automotive | A confident idea and visual focal point create impact | “You remember the moment. We find the movie.” becomes the opening proposition; the hero interaction demonstrates it immediately |
| Brandon Yasin | A curated archive and restrained motion can feel personal | “Keep Pile” becomes a personal film archive, with purposeful hover states and transitions |
| ESR Bespoke | Strong hierarchy and polished presentation create confidence | Clear labels, clean typography, deliberate spacing, honest data/source labels, and a consistent result layout |

**The intended synthesis is not four site styles placed side by side.** It is a single product identity: a tactile cinema archive that turns fragments of memory into film discoveries.

---

## 3. Existing Prototype Context

A previous front-end concept was created as a standalone HTML prototype. It is a useful reference for product scope and early visual decisions, but it is **not a finished application and should not be copied blindly**.

### Existing artifacts, if available to the agent

- `reeltrace_prototype.html` — self-contained HTML/CSS/JS prototype.
- `reeltrace_prototype_bundle.zip` — prototype bundle.
- `README_REELTRACE.txt` — opening instructions and limitations.

If these files are not in the current repository, do not assume they exist or invent their contents. The user can provide them separately if the agent needs to inspect them.

### Existing direction

- Working name: REELTRACE — The Cinema Memory Machine.
- Visual palette in the prototype: warm paper `#EEECE4`, ink `#191A17`, signal orange `#FF4C25`, lime `#D8F36A`, muted blue `#B8C9FC`, and secondary paper `#E4E1D7`.
- Type direction: a clean sans serif, monospaced archival labels, and an expressive serif accent. The prototype used DM Sans, DM Mono, and Instrument Serif.
- Visual materials: paper-like field, subtle grain, layered poster-like imagery, orbit lines, ticket/stamp motifs, marquee strip, and archive-style metadata.
- The prototype has three tools: Find a line, Find a scene, and Spin the shelf; a local Keep Pile; sample fuzzy-style search; browser `localStorage` for saved/watched state; and a text export.

### Known prototype limitations

- Its movie data and search results are a tiny illustrative sample.
- Dialogue matching is a lightweight local approximation, not real semantic or typo-tolerant subtitle search.
- Scene times are illustrative, not verified playback coordinates.
- It does not connect to a live subtitle database, film metadata API, streaming provider, or backend.
- Browser-local saves are not synced across accounts/devices.
- Hosted images and fonts may require an internet connection.

The new implementation should preserve the *product learning* and improve the creative direction, responsiveness, maintainability, accessibility, and future backend integration.

---

## 4. Original Creative Direction: “The Cinema Memory Machine”

### The central metaphor

A film rarely returns to memory as a complete title card. It comes back as scraps: a sentence, a colour, a face in a doorway, a long silence, a time of night, or an emotion. REELTRACE is the machine that connects those fragments.

Build the visual language around **film evidence, memory fragments, and archival discovery**. The interface can feel part film library, part detective's evidence board, part personal collection—but it must remain calm enough to use.

### Suggested opening copy

Eyebrow: `CINEMA MEMORY MACHINE / FIELD NOTES 001`  
Main headline: `You remember the moment.` / `We'll find the movie.`  
Supporting text: `A line, a scene, a feeling. Start with whatever stayed with you.`  
Primary action: `Trace a memory ↗`  
Secondary action: `Surprise me instead ↻`

Copy can be refined, but avoid generic wording like “Your ultimate movie destination,” “Explore endless entertainment,” or “Discover your next favourite.”

### Design character

- **Editorial:** intentional type scale, composition, and pacing.
- **Tactile:** paper-like surfaces, registration marks, stamped labels, perforation-inspired edges, film contact-sheet cues—use selectively and in a way that is original.
- **Cinematic:** use strong film imagery with thoughtful crops, a few immersive moments, and subtle depth.
- **Functional:** visual novelty never obscures the search field, result title, timestamp, save action, or navigation.
- **Responsive:** not just a desktop art direction squeezed onto a phone.

### Palette proposal

Use the existing palette as a starting point, not a mandatory exact recipe.

| Token | Suggested value | Purpose |
|---|---|---|
| Archive paper | `#EEECE4` | Warm base; helps the page feel unlike a generic black streaming dashboard |
| Ink | `#191A17` | Strong text, navigation, and dark areas |
| Signal orange | `#FF4C25` | Primary action, active trace, important state |
| Acid/lime marker | `#D8F36A` | Small accent for status, coordinates, or a highlight; use sparingly |
| Dusty blue | `#B8C9FC` | Secondary accent for alternate modes or scene coordinates |
| Secondary paper | `#E4E1D7` | Cards, tracks, drawers, and quiet contrast |

Maintain accessible text contrast. Accent colours are not a replacement for meaningful labels, borders, focus indicators, or icons.

### Typography

Choose a small, coherent system rather than using many display fonts:

- **Headline/display face:** expressive editorial serif or a distinctive grotesk, used for short large headings only.
- **Interface/body face:** highly readable sans serif.
- **Metadata face:** monospace for scene timecodes, match labels, film numbers, and small data-like details.

Fonts may use a hosted provider, but configure robust local/system fallbacks. Do not load excessive font families/weights. Preserve readable body sizing on mobile.

### Signature motion language

Choose only a few interactions and make them feel related:

1. **Trace scan:** after a query, a thin scan marker moves once across the search area, then resolves into a clear loading/result state. Keep this short; never block input while it runs.
2. **Fragment-to-film transition:** a search result's little fragment/metadata grows into a more detailed film record, preserving spatial continuity where practical.
3. **Scene coordinates:** an interactive time track with tick marks, timestamp labels, and subtitle fragments. A focus/hover state can reveal nearby context.
4. **The reel selection:** the random picker can rotate through a strip of visual film fragments/contact-sheet tiles and settle on one selection. It should feel like a tactile selection mechanism, not a casino wheel.
5. **Collection pinning:** saving a title produces a restrained pin/stamp/insert motion and updates the collection count.

All motion must respect `prefers-reduced-motion`. Provide keyboard interaction and visible focus styles. Never force autoplay audio. Avoid long intro animations, scroll hijacking, cursor gimmicks that hinder use, and animation that causes layout shift.

---

## 5. Information Architecture

### Global navigation

- **Trace** — dialogue/quote search; main entry point.
- **Scene Finder** — search by film and remembered scene.
- **Spin the Shelf** — random discovery by genre/mood.
- **Keep Pile** — saved list/watchlist.
- Optional About/How it works page only if it adds meaningful value.

Use a short, compact header. On mobile, provide a clear menu or compact navigation, not a cramped desktop nav.

### Homepage structure

1. **Hero:** memorable proposition, one dominant interactive search area, a strong piece of original visual composition, and one secondary discovery CTA.
2. **Three discovery modes:** not three identical generic cards. Give each a visual treatment that corresponds to its task, while preserving a coherent design system.
3. **A sample “trace” result:** show what happens after entering a clue, with clear labels that it is an example if the underlying data is not live.
4. **Spin the Shelf feature:** an enticing but compact entry point into random discovery.
5. **Keep Pile preview:** show a saved film collection or an elegant empty state.
6. **Footer:** minimal links, data/disclaimer information if relevant, and no redundant giant navigation.

This is a suggested architecture, not a demand to show every section above the fold. Prioritize one memorable opening, a useful tool, and a clear hierarchy.

---

## 6. Core Features and Expected Behaviour

### Feature A — Find My Movie / Trace a Line

**User intent:** “I remember part of a line, but not the film.”

**Interface:**
- A prominent multiline or single-line query field with a natural-language placeholder, e.g. `Type the words you remember…`.
- A visible submit/search action and Enter-key support.
- Optional example queries should be clearly labelled as examples and must not reproduce long copyrighted dialogue.
- Optional filters: release year/range, genre, film vs TV, and perhaps source/coverage if meaningful.
- A compact status label showing whether results are demo data or live search.

**Result design:**
- Rank matches by relevance and explain the match quality in plain terms (exact phrase, close phrase, likely match).
- Include title, year, film/TV type, poster/artwork, a short permitted snippet, relevant timecode when verified, and a source/provider label when available.
- Save to Keep Pile.
- Allow the user to refine or broaden the query without losing their text.
- Empty state: propose useful next steps, e.g. shorten the phrase, try a distinctive word, or switch to Scene Finder. Avoid a dead end.

**Search quality:**
- Support case/punctuation normalization, partial phrase matches, token overlap, typo tolerance, and a clear way to score/rank results.
- Use semantic search only if useful and feasible; do not label a simple substring matcher “AI-powered semantic search.”
- Return useful metadata with the hit so a query result can be rendered independently of the provider.

### Feature B — Scene Finder

**User intent:** “I remember a scene or what happened, but not the exact quote.”

**Inputs:**
- Film or show title (optional if the user only remembers a clue).
- Scene description / keywords / remembered dialogue fragment.
- Optional approximate time or era/genre filters if justified.

**Results:**
- Film/show title, year, matched scene clue, contextual summary, verified timecode if the provider supplies it, and source information.
- A timeline or scene-coordinate visual, with accessible keyboard-operable controls if it is interactive.
- A legitimate “open at this time” link only when a supported provider supplies a valid, authorised destination. Do not fabricate playback links or pretend a timestamp is verified.
- Clearly distinguish **verified source timecodes** from estimated or demo coordinates.

**Fallback:** If no authorised scene/subtitle source has been integrated, show sample data only in an explicitly marked demo state and keep the data adapter replaceable.

### Feature C — Spin the Shelf / Movie Roulette

**User intent:** “Help me choose something to watch without scrolling forever.”

**Inputs and controls:**
- Genre selector plus an “Any genre” option.
- Optional mood selector only if it can be defined clearly and consistently (e.g. tense, uplifting, strange, thoughtful).
- One primary random-selection action.

**Selection rules:**
- Do not immediately repeat the previous pick when other eligible options exist.
- Exclude titles the user has marked as already watched.
- Optionally avoid recently rejected picks within the current session, but allow a reset or a way to explore again.
- If no eligible movies remain in the chosen filter, explain why and offer to reset filters or include watched movies. Do not silently show an invalid pick.

**After a pick:**
- Show artwork, title, year, genre, and a short factual summary.
- `Already watched` marks the title as watched and chooses another eligible title.
- `Yeah, I'll watch this` / `Save to Keep Pile` adds it to the list and confirms the action.
- `Another pick` selects a different eligible title.
- Make all three actions unambiguous, keyboard accessible, and mobile friendly.

**Visual approach:** Create an original tactile selection mechanic such as a film-frame carousel, index-card shuffle, or contact-sheet reveal. The interaction must have a clear final selected state and must not be only a decorative animation.

### Feature D — Keep Pile / Personal Archive

- Show the user's saved movies in a curated archive-style list/grid.
- Allow save and remove actions from any result and update the count immediately.
- Distinguish “saved for later” from “already watched.” Do not automatically treat saving as watching.
- Persist locally in the demo version. If user accounts are later added, synchronize through the backend.
- Provide an elegant empty state that directs users to discover films.
- Offer export as a simple text/CSV file if it is cheap and reliable; do not let an export feature distract from core workflows.

### Cross-cutting behaviour

- Every button and link must have a working destination/action or be clearly marked as disabled with a reason.
- Show loading, success, empty, error, and unavailable states.
- Do not make users lose their query or filters unexpectedly.
- Provide clear feedback after saving, removing, or marking watched.

---

## 7. Visual and Interaction Requirements

### Layout rules

- Avoid the default SaaS dashboard pattern: sidebar + metric cards + identical grids.
- Avoid filling every blank area with labels or decorative marks.
- Use deliberate asymmetry, scale, and spacing, but maintain a readable grid and alignment logic.
- Make the search tool visible early on the page. Creativity cannot hide the product's primary purpose.
- Use real, high-quality movie imagery only where rights/source permit. For placeholder artwork, choose coherent licensed/stock imagery or generated original art and label demo data honestly.
- Never rely on color alone to convey status or match relevance.

### Artwork and assets

- Keep image ratios consistent within each component, and use object-fit/crops intentionally.
- Add `alt` text for meaningful imagery and empty alt for decorative imagery.
- Use an image component or loading strategy appropriate for the selected framework; lazy-load below-the-fold imagery and avoid large layout shifts.
- Do not embed copyrighted reference-site imagery or assets into REELTRACE.
- Avoid generic emoji as the main icon system. Use a small consistent SVG/icon set or custom CSS line marks.

### Responsive design

Design and verify at approximately:
- Small mobile: 320–390 px.
- Large mobile: 390–430 px.
- Tablet: 768 px.
- Desktop: 1280–1440 px.
- Large desktop: 1600 px.

Requirements:
- No horizontal page overflow.
- Controls have comfortable touch targets (aim for at least 44 × 44 CSS pixels for primary interactive targets).
- Long movie titles wrap correctly.
- The random-picker animation does not become awkward or overly tall on mobile.
- Result metadata remains readable; do not cram a desktop information hierarchy into narrow cards.

### Accessibility

- Use semantic landmarks, correct heading levels, form labels, buttons for actions, and anchors for navigation.
- Fully support keyboard navigation; show visible focus.
- Respect reduced-motion preference.
- Ensure readable contrast and non-color-only status indicators.
- Give icon-only buttons accessible names.
- Announce result counts and important save/error states politely for screen readers where practical.
- Avoid trapping focus in modal/drawer UI; return focus correctly after closing.

### Performance

- No unnecessary heavy animation or 3D dependency by default.
- Avoid loading giant assets or all movie images up front.
- Keep the first screen responsive and usable while optional imagery loads.
- Do not cause major layout shifts during font/image loading.
- Use motion libraries only when they materially simplify or improve the experience; CSS transitions are enough for many interactions.

---

## 8. Technical Direction

### Recommended stack

- **Language:** TypeScript.
- **UI:** React with Next.js App Router.
- **Styling:** Tailwind CSS if the repository uses it; otherwise use a well-organized CSS Modules/global-token system. Avoid mixing several styling systems without a reason.
- **Motion:** CSS for simple states; use a maintained React motion library only for meaningful sequences. Check current package/version/API documentation before installing.
- **Icons:** a single consistent icon set, or custom SVG line icons.
- **Testing:** use the repo's existing test setup. If none exists, at minimum add useful component/utility tests for ranking, roulette eligibility, and saved/watched-state logic.

The interface and data/search layer must be separated so the UI can be built now while a licensed search backend is developed later.

### Suggested structure

Adapt to the actual project rather than forcing this exact tree:

```text
app/
  page.tsx
  trace/page.tsx
  scenes/page.tsx
  roulette/page.tsx
  keep-pile/page.tsx
  api/                     # optional Next.js route handlers
components/
  layout/
  navigation/
  hero/
  trace/
  scenes/
  roulette/
  keep-pile/
  film/
  feedback/
lib/
  domain/
  search/
  providers/
  storage/
  validation/
  utils/
styles/
  tokens.css               # or Tailwind theme tokens
public/
  images/
  icons/
```

### Suggested domain types

Keep provider details out of the core UI by normalizing the data:

```ts
type MediaKind = "movie" | "tv";

type Film = {
  id: string;
  title: string;
  year?: number;
  kind: MediaKind;
  genres: string[];
  overview?: string;
  posterUrl?: string;
  backdropUrl?: string;
  runtimeMinutes?: number;
  externalIds?: Record<string, string>;
};

type TraceMatch = {
  id: string;
  film: Film;
  snippet?: string;         // keep short and within provider/licensing limits
  startMs?: number;         // only when available from a trustworthy source
  endMs?: number;
  matchType: "exact" | "close" | "related";
  score?: number;
  sourceLabel?: string;
  sourceUrl?: string;       // valid/authorised URL only
  timecodeVerified: boolean;
};

type UserFilmState = {
  watchlistIds: string[];
  watchedIds: string[];
  skippedIds?: string[];
};
```

Names may change to match the repository's conventions. The core principle is that UI components should not depend directly on raw third-party API responses.

### API / service boundaries

Make provider adapters and server-side endpoints so the UI can use a demo provider today and a licensed data provider later. For example:

- `searchTrace(query, filters)` → normalized `TraceMatch[]`
- `searchScenes(query, filmTitle?, filters)` → normalized scene results
- `getFilmById(id)` → normalized `Film`
- `getRecommendations(filters, excludedIds)` → eligible picks
- `getFilmState()` / `saveFilmState()` for local or account-backed state

Use mock/demo implementations behind the same interfaces. Do not scatter hard-coded sample data throughout component markup.

### Possible backend approaches

**Option A — fastest coherent first release:** Next.js UI + Next.js route handlers + a database/provider adapter. This is enough for most application APIs and can keep the deployment simpler.

**Option B — if subtitle processing becomes a distinct service:** Next.js frontend plus a Python FastAPI service for indexing, normalization, fuzzy matching, and search. Communicate through documented HTTP APIs. Use Python only where its data/search ecosystem is a real benefit; do not add a separate backend just for fashion.

**Persistence:** browser `localStorage` is acceptable for the first demo. If accounts, multi-device sync, or shared collections are required later, use a managed database/auth service or PostgreSQL-backed API. Keep secrets on the server and out of client bundles.

### Data provider and copyright constraints

- A movie metadata API and a dialogue/subtitle index are different capabilities. Do not assume movie metadata access automatically grants searchable dialogue or subtitles.
- Review the current provider's documentation, API rate limits, attribution requirements, content rights, and acceptable-use terms before connecting it.
- Prefer authorised data feeds and links to legitimate media destinations.
- Do not scrape, republish, or index copyrighted subtitle/transcript corpora without appropriate permission/licensing.
- Do not invent exact dialogue, verified timestamps, viewing URLs, cast/crew data, or availability claims.
- Demo content must be marked `SAMPLE DATA` / `DEMO INDEX` wherever ambiguity is possible.
- If a live provider cannot support a feature, explain the limitation and preserve a clean integration boundary rather than faking success.

---

## 9. Data, State, and Logic Rules

### Search normalisation and ranking

For demo data, implement a transparent baseline that can be unit tested:

1. Normalize case, whitespace, and harmless punctuation.
2. Score exact phrase matches highest.
3. Score contained phrase and token overlap below exact matches.
4. Add typo tolerance with a dependable small library or a well-tested edit-distance helper, if it improves results on realistic examples.
5. Use deterministic tie-breaking for stable results.
6. Keep the scoring function separate from the view.
7. Avoid claiming semantic understanding when it is only lexical matching.

For a live subtitle index, choose appropriate indexing (e.g., normalized token/inverted index, full-text search, or dedicated search service) only after understanding data volume and licence constraints. A full corpus should not be loaded into the browser.

### Roulette selection

Implement and test these rules:

- Candidates respect genre/mood filters.
- Watched titles are excluded by default.
- The last pick is excluded when another eligible title exists.
- A new random pick is selected from the remaining eligible candidates.
- A title marked “Already watched” is added to watched state and then the next eligible pick is shown.
- A title saved to Keep Pile does not automatically become watched.
- Empty eligible results have a useful recovery path.
- No eligible result is presented as if it were random when the filter has left no candidates.

### State persistence

- Validate persisted JSON before using it; local storage can be empty, stale, or malformed.
- Handle unavailable storage gracefully.
- Keep watchlist and watched state separate.
- Update the interface immediately after state changes.
- Provide a reset/clear operation only with clear confirmation or reversible feedback when data would be lost.

---

## 10. Suggested Creative Opportunities

These are potential directions, not a demand to implement every idea. Choose a few and develop them coherently.

### “Trace status” vocabulary

Use small archival labels such as:
- `EXACT TRACE`
- `CLOSE MATCH`
- `SCENE COORDINATES`
- `MEMORY FRAGMENT`
- `MATCH NOT VERIFIED`

These communicate the search state and make the product feel authored. Keep wording understandable and pair labels with accessible meanings.

### Fragment cards

Instead of generic movie tiles, each result could have:
- one strong image or poster crop,
- one concise match snippet,
- timecode when available,
- a small confidence/match label,
- film title/year/type,
- a simple save action.

Use a mix of larger featured results and smaller supporting results rather than every item receiving the same size.

### Scene coordinates

Build a stylised timeline with time markers and small text fragments. It can look like a film-editing or archivist's annotation tool, but should not mimic a specific product's UI. Keep it functional with keyboard controls and clear timestamps.

### The “Keep Pile” archive

Let saved films feel accumulated, not merely added to a database. Use serial numbers, saved dates, or collection groupings only if they add useful meaning. Offer an empty state that feels inviting rather than a blank table.

### Discovery modes as different instruments

Find My Movie can feel like a **scanner**; Scene Finder like a **timeline/coordinate tool**; Spin the Shelf like a **shuffle mechanism**; Keep Pile like an **archive drawer**. Keep shared typography, colour, spacing, buttons, and motion timing so the modes still belong to one brand.

---

## 11. Implementation Plan

Work through the following phases. Keep the app runnable at the end of each phase.

### Phase 1 — Inspect and establish the foundation

- Inspect the repository, installed packages, existing routes, and any supplied prototype.
- Identify what can be reused and what needs to be replaced.
- Establish TypeScript, design tokens, layout, navigation, and responsive global styles.
- Document the current commands to run, lint, test, and build.

### Phase 2 — Build the core visual experience

- Implement the hero and core discovery navigation.
- Create a distinct layout for Trace, Scene Finder, Spin the Shelf, and Keep Pile.
- Add original CSS/SVG decorative marks, restrained transitions, and image handling.
- Verify the first screen at desktop and mobile breakpoints.

### Phase 3 — Implement interactions using local/demo data

- Add normalized demo data in one file/module, clearly separated from components.
- Implement fuzzy-style trace search and result ranking.
- Implement scene search and verified-vs-demo timestamp labelling.
- Implement random selection with watched/repeat exclusions and genre filters.
- Implement save/remove/mark-watched state and persistence.
- Ensure every visible control performs its advertised action.

### Phase 4 — Make it robust

- Add loading/error/empty states.
- Test query edge cases, malformed storage, no-candidate roulette state, and long titles.
- Add accessibility labels, keyboard support, focus styles, reduced-motion behaviour, and contrast checks.
- Test on narrow screens and check for horizontal overflow.

### Phase 5 — Prepare for real data

- Define adapter contracts before selecting or integrating a live provider.
- Investigate lawful access to movie metadata and subtitle/dialogue data separately.
- Add server-side API routes, input validation, rate limits, secret management, and source attribution as needed.
- Do not claim production-ready dialogue search until it is backed by a suitable authorised corpus.

### Phase 6 — Verify and hand off

- Run lint, type checking, tests, and production build using repository commands.
- Fix errors instead of merely reporting them.
- Summarise changed files and key design decisions.
- State clearly which features use demo data and which use live APIs.
- Provide precise run instructions and any required environment-variable names, but never publish actual secret values.

---

## 12. Acceptance Checklist

The implementation is not complete until the relevant checks pass.

### Product functionality

- [ ] Main navigation leads to the correct feature.
- [ ] Quote/line search accepts user input and returns ranked results for demo fixtures.
- [ ] Search supports punctuation/case normalization and helpful empty states.
- [ ] Scene Finder accepts a title and/or clue and labels all example timestamps accurately.
- [ ] The random picker respects the selected filters and avoids repeats when possible.
- [ ] “Already watched” marks the film watched and offers another eligible pick.
- [ ] “Save to Keep Pile” saves the film but does not mark it watched.
- [ ] Save/remove updates every visible count/button state consistently.
- [ ] State persists safely in the demo version and recovers from invalid storage.
- [ ] All buttons, links, forms, and menus have meaningful working behaviours.

### Design quality

- [ ] The visual identity feels original and is not a clone of a reference site.
- [ ] The homepage has a clear focal point and distinctive visual signature.
- [ ] The three search/discovery tools feel related but are not generic copies of one card layout.
- [ ] Typography, colour, spacing, imagery, and motion are coherent.
- [ ] The site is visually interesting without making search harder.
- [ ] Demo/live data and verified/unverified timestamps are never confused.

### Accessibility and responsive quality

- [ ] Keyboard-only navigation works.
- [ ] Focus states are visible.
- [ ] Reduced-motion preferences are respected.
- [ ] Images have appropriate alternative text.
- [ ] Buttons have accessible names and touch-friendly sizes.
- [ ] No horizontal overflow at small mobile widths.
- [ ] Long titles, empty states, and large result counts do not break the layout.

### Engineering quality

- [ ] Type checking/lint/build run successfully, or known blockers are recorded precisely.
- [ ] Search and roulette logic are separate from components and testable.
- [ ] Demo data is not scattered through markup.
- [ ] API secrets never appear in client-side code.
- [ ] No fake claims of live subtitle search or verified scene links.
- [ ] No unlicensed transcript/subtitle corpus is scraped or republished.

---

## 13. Research and Stack Notes

The front-end stack suggested for this project is **TypeScript + React + Next.js + Tailwind CSS**, with either Next.js route handlers or an optional Python FastAPI service where the subtitle-processing/search workload justifies it. This is a pragmatic interoperability choice, not a claim that the framework itself creates good design.

Useful research context reviewed earlier in the project:

- Stack Overflow Developer Survey 2026 — web technologies/framework usage: https://survey.stackoverflow.co/2026/technology
- React documentation — recommended ways to start a new React app: https://react.dev/learn/start-a-new-react-project
- Next.js documentation — App Router and backend-for-frontend/route handlers: https://nextjs.org/docs/app
- FastAPI documentation — frontend integration and API usage: https://fastapi.tiangolo.com/

Check the latest official documentation and package APIs when implementing; do not rely on hard-coded assumptions about library versions.

---

## 14. Sources for the Visual Research

Reference pages reviewed on 28 October 2026:

1. A24 Television, art-directed by Ravi Klaassens: https://a24.raviklaassens.com/television
2. Forge Automotive: https://forgeautomotive.co.uk/
3. Brandon Yasin — creative director/designer portfolio: https://brandonyasin.com/
4. ESR Bespoke: https://www.esrbespoke.au/

Observations in this document describe visible presentation and interaction patterns. They are not claims about the sites' private source code, analytics, or internal design process.

---

## 15. Final Agent Prompt (Ready to Use)

> Build REELTRACE, an original, high-quality, responsive movie-discovery website using this brief as the source of truth. Before coding, inspect the repository and any available prototype. Study the four visual references only to extract high-level principles; do not recreate their exact layouts, assets, text, signature effects, or brand identity.
>
> The core jobs are: find a film from a remembered line; find a scene from a title/clue; choose a random film using filters; save films to a personal Keep Pile and separately mark films as watched. Make the visual identity distinctive, tactile, editorial, cinematic, and playful, but keep the primary search immediately discoverable. Use purposeful interactions, not animation for animation's sake. Design mobile and desktop intentionally and meet the accessibility, reduced-motion, and performance requirements in this brief.
>
> Prefer TypeScript + React/Next.js, using the existing repository's conventions. Build data adapters so the UI runs with labelled demo data now and can later connect to lawful, authorised metadata/subtitle providers. Do not fake live search results, exact timecodes, or streaming links. Do not scrape or republish copyrighted subtitle content without permission. Keep all user-visible actions working; add loading, error, and empty states. Run lint, type checks, tests, and build, fix what you can, and provide a concise handoff listing files changed, how to run the app, and what is still demo-only.
>
> Optimise for a memorable creative result with real usability: a site that feels like exploring cinema through memory fragments—not a clone of A24, Forge Automotive, Brandon Yasin, ESR Bespoke, or a stock streaming dashboard.
