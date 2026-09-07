# Anvira premium product experience

## Goal
Rebuild `/anvira` as a standalone, cinematic product story around one idea: **One workspace. One context. Your intelligence.** The page will feel like an invitation into Anvira rather than a conventional SaaS feature page, while preserving the existing download destination and accurate local-first positioning.

## What will change

### 1. A distinct Anvira page shell
- Replace the shared company layout on `/anvira` with a dedicated warm-ivory Anvira shell.
- Add a minimal Anvira navigation: Product, Agents, Notes, Study, Models, and Download.
- Keep the rest of the LocalHouseLLM website and its global navigation unchanged.
- Add a compact, deliberate mobile menu and a restrained scrolled state.

### 2. Cinematic opening sequence
- Build the three-line hero: “One workspace. One context. Your intelligence.” with only the two requested actions.
- Create an original, layered Anvira workspace composition rather than a browser screenshot: workspace rail, conversation, attached context, notes, study and active-agent states.
- Frame it with subtle botanical artwork, paper texture, moving shadows and independent depth layers.
- Use a scroll-linked transition that progressively emphasizes the three statements while revealing more of the workspace.

### 3. Story-led product sections
Build a sequence of large visual chapters rather than feature-card grids:
- **One workspace:** a central workspace with Chat, Notes, Study, Agents, Files, Knowledge and Models connected around it.
- **One context:** an animated document journey through ingestion, chat, notes, agent work and study.
- **Your intelligence:** a quiet local-machine diagram with optional cloud connections outside the boundary.
- **Chat:** immersive conversation scene with context, attachments, agent actions and approvals.
- **Agents:** four built-in agents plus a role/capabilities/tools/permissions execution timeline.
- **Notes:** editorial notebook/pages/sources/AI composition.
- **Study:** Pochi → guide → flashcards → quiz → weak spots → review learning loop.
- **Model layer:** local-model infrastructure presented as the invisible foundation, not the product.
- **Local-first:** minimal full-viewport ownership statement.
- **Whole system:** the final interactive ecosystem map tying every surface back to Anvira.
- **Final invitation:** the core statement repeated with Explore and Download actions.

### 4. Motion and interaction
- Use Framer Motion plus the existing smooth-scroll utility; no new animation dependency.
- Add restrained pointer parallax on capable desktop devices and scroll-linked movement for background, interface and botanical layers.
- Use masked text reveals, subtle interface state changes, animated connection paths and purposeful micro-interactions.
- Disable pointer parallax on touch devices and substantially simplify motion under `prefers-reduced-motion`.

### 5. Visual system and assets
- Add Anvira-scoped semantic tokens for warm paper, near-black ink, moss accents and tactile surface colors without changing the rest of the site.
- Generate a cohesive transparent botanical asset set (fine branches/leaves and soft silhouettes) for foreground and background framing.
- Keep corners restrained, avoid excessive glass, pills and nested cards, and use strong editorial spacing on desktop and a separately composed mobile flow.

### 6. Production quality
- Split the page into small reusable Anvira components instead of one oversized page file.
- Keep one semantic H1, accessible controls, meaningful labels, stable aspect ratios and no layout-shifting media.
- Update Anvira SEO copy/schema to describe the unified local-first workspace accurately.
- Preserve the current download URL unless a newer installer URL is provided.
- Verify the desktop and mobile compositions, anchor navigation, reduced-motion behavior, console state and production build.

## Technical details
- Primary files: `src/pages/Anvira.tsx`, new components/styles/assets under an Anvira-specific folder.
- The dedicated shell will not alter other routes or the shared `Navbar`/`Footer` behavior.
- Product visuals will be original React/CSS compositions with generated botanical bitmap assets; no stock imagery or copied product UI.
- Expensive movement will use transforms/opacity only, `requestAnimationFrame` where needed, and pointer listeners scoped to the hero.

## Assumption
“Entire Anvira website/landing page” means the existing `/anvira` route only, not the LocalHouseLLM homepage or Anvira model subpages (`/anvira/o1`, `/anvira/o1e`, `/anvira/h1`).
