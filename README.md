# localhousellm.com

The LocalHouseLLM website: home of Anvira Notes, Anvira and Anvira Runtime. Vite + React + TypeScript + Tailwind, deployed by Netlify from `master`.

```sh
npm ci
npm run dev          # local dev server
npm run build        # sync release data → client build → SSR build → prerender
node scripts/serve-dist.mjs   # serve dist/ like Netlify (rewrites, 301s, real 404s)
npm run seo:audit    # crawler's-eye check of the built HTML
```

## Releases stay up to date by themselves

Versions, dates, installer links, sizes, SHA-256 checksums and release notes are never typed into pages. They come from the GitHub releases of [Anvira Notes](https://github.com/Vansh-synthetica/Anvira-Notes-release), [Anvira](https://github.com/Vansh-synthetica/Anvira-release) and [Anvira Runtime](https://github.com/Vansh-synthetica/Anvira-Runtime):

- `scripts/sync-releases.mjs` writes `src/data/releases.json` (everything) and `src/data/releases-summary.json` (no note bodies, for product pages). `src/data/releases.ts` is the typed API pages use.
- `.github/workflows/sync-releases.yml` runs it every two hours (and on demand). When something changed it commits, Netlify redeploys, and IndexNow is pinged.
- `npm run build` also syncs (in `--soft` mode, falling back to the committed data if GitHub is unreachable).

To update the site the moment a release is published instead of within two hours, have the release repo's workflow send a `repository_dispatch` of type `app-release` to this repo (needs a token with `repo` scope on this repository):

```sh
gh api repos/Vansh-synthetica/LocalHouseLLM/dispatches -f event_type=app-release
```

Hand-written copy that names a version (for example the homepage card text in `src/pages/Index.tsx`, `CARD_COPY`) falls back to the release's own highlights when a newer version ships.

## SEO

- Every public route in `src/seo/routes.ts` is prerendered to static HTML with its own title, description, canonical, Open Graph image and JSON-LD; the same list generates `sitemap.xml` and Netlify `_redirects`.
- Pages are code-split (`src/pages.ts`). The prerenderer links each page's CSS and preloads its JS, and the browser loads the page's chunk before hydrating, so the HTML is used as is.
- `/releases` and `/releases/:product` are generated from the release data; `/releases.xml` is an Atom feed of every release.
- `public/llms.txt` is filled in with current versions at build time.
- Social images and icons are rendered from HTML by `npm run og:images` (needs local Chrome or Edge).
- `scripts/indexnow.mjs` notifies Bing, Yandex and other IndexNow engines; `.github/workflows/indexnow.yml` runs it after each push to `master`.
