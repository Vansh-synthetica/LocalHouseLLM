## Goal
Turn localhousellm.com into the canonical, entity-authoritative home of the LocalHouseLLM modular AI stack — strong SEO, clear IA, developer-grade content, and a new favicon from the uploaded backslash pfp.

## 1. Branding / Favicon
- Convert `user-uploads://Localjhousellm_pfp.png` into `public/favicon.ico` + `public/favicon-192.png` + `public/favicon-512.png` + `public/apple-touch-icon.png`.
- Update `index.html` `<link rel="icon">`, apple-touch-icon, and manifest references.
- Refresh OG image reference if needed (keep existing `/og-image.png`; do not fabricate).

## 2. Information Architecture (new routes)
Add these pages (each: `<SEO>` with unique title/description/canonical/JSON-LD, single H1, breadcrumb, internal links, CTA footer):

| Route | Page | Schema |
|---|---|---|
| `/stack` | Full modular architecture | TechArticle + BreadcrumbList |
| `/stack/aicl` | AICL communication layer | TechArticle |
| `/stack/orcha` | ORCHA orchestration layer | TechArticle |
| `/stack/memory` | Memory layer | TechArticle |
| `/stack/safety` | Safety / verification layer | TechArticle |
| `/stack/tools` | Tools layer | TechArticle |
| `/stack/modules` | Intelligence Modules | TechArticle |
| `/products` | Product hub | CollectionPage |
| `/docs` | Docs hub (Quickstart, Install, API, Config, Custom Expert, Integrations) | TechArticle |
| `/start` | "Start Here" developer onramp | HowTo |
| `/faq` | FAQ | FAQPage |
| `/benchmarks` | Latency / cost / reliability tables | Dataset |
| `/use-cases` | Index | CollectionPage |
| `/use-cases/ai-tutors` | | Article |
| `/use-cases/healthcare` | | Article |
| `/use-cases/agriculture` | | Article |
| `/use-cases/research` | | Article |
| `/use-cases/enterprise-private-ai` | | Article |
| `/use-cases/edge-ai` | | Article |

Existing pages kept: `/`, `/mission`, `/vision`, `/research`, `/release-logs`, `/anvira*`, `/nomi`, `/inkflow`, `/devquill`, `/about`, `/contact`, `/sitemap`.

## 3. Navigation
Rework `Navbar.tsx`:
- Top-level: **Stack** (dropdown: AICL, ORCHA, Memory, Safety, Tools, Modules, Full stack), **Products** (Anvira, Nomi, InkFlow, DevQuill), **Research**, **Docs**, **Company** (Mission, Vision, About, Release Logs, FAQ, Contact).
- Persistent "Start" CTA → `/start`.
- Mobile: collapsible accordion.

Add a shared `Breadcrumbs.tsx` component used on all non-home pages, emitting visible nav + `BreadcrumbList` JSON-LD.

## 4. Homepage refresh (`pages/Index.tsx`)
- Strengthen H1; keep current. Add explicit "LocalHouseLLM is an AI infrastructure company" sentence early.
- Add 5 CTA buttons (Explore stack, Mission, Research, Products, Docs).
- Link each stack card to its new `/stack/*` page.
- Fix dead `/opensource` CTA → `/research`.
- Add FAQ snippet (3 Qs) with FAQPage JSON-LD for rich results.

## 5. SEO infrastructure
- `index.html`: tighten JSON-LD Organization (sameAs GitHub/X/LinkedIn), add WebSite + SearchAction, ensure no Lovable branding.
- `SEO.tsx`: already solid; add optional `breadcrumbs` prop emitting BreadcrumbList JSON-LD inline.
- `public/sitemap.xml`: regenerate with every new route, 2026-06-18 lastmod, priorities tuned.
- `public/robots.txt`: keep as-is (already good); confirm sitemap line.
- Add per-page canonical (already supported via SEO component).

## 6. Content tone
- Confident, technical, grounded. No hype words ("revolutionary", "magical").
- Each new page: 400–800 words of real explanation, examples, internal links to 2–4 sibling pages.

## 7. Out of scope (won't do this turn)
- Real benchmark numbers — page will be scaffolded with "methodology + placeholder pending publication" framing rather than fabricated charts.
- Real API code samples for unimplemented APIs — Docs page presents the documented surface honestly as "in progress" where applicable.
- SSR/Next migration. Site remains Vite SPA; we lean on Helmet + crawlable HTML + sitemap. (True SSR would require a stack change — flagged for follow-up.)
- Auto-generated sitemap script. Keeping static `public/sitemap.xml` per existing pattern.

## Technical notes
- All new pages use existing `CleanLayout` + `SEO` + new `Breadcrumbs`.
- No new dependencies.
- Favicon conversion via ImageMagick (`nix run nixpkgs#imagemagick`).
- ~20 new files; ~6 edits. Will batch writes in parallel.

## Deliverable
Single implementation pass producing all routes, nav, breadcrumbs, sitemap, favicon, and SEO wiring. Build verified before handing back.
