import { archive } from '@/data/archive';

/**
 * Every public, indexable URL on the site. This one list drives the build-time
 * prerender (static HTML per page), sitemap.xml and the Netlify rewrite rules,
 * so a page cannot be in the sitemap without also being served as real HTML.
 */
export interface SiteRoute {
  path: string;
  /** Source files whose last git commit date becomes the sitemap <lastmod>. */
  sources: string[];
  /** Used when git history is unavailable (e.g. a shallow clone). */
  fallbackLastmod: string;
  changefreq: 'daily' | 'weekly' | 'monthly' | 'yearly';
  priority: number;
}

export const SITE_URL = 'https://localhousellm.com';

const page = (
  path: string,
  source: string,
  fallbackLastmod: string,
  changefreq: SiteRoute['changefreq'],
  priority: number,
): SiteRoute => ({ path, sources: [source], fallbackLastmod, changefreq, priority });

export const siteRoutes: SiteRoute[] = [
  page('/', 'src/pages/Index.tsx', '2026-10-03', 'weekly', 1.0),
  page('/anvira', 'src/pages/Anvira.tsx', '2026-10-03', 'weekly', 0.95),
  page('/anvira-notes', 'src/pages/AnviraNotes.tsx', '2026-10-03', 'weekly', 0.95),
  page('/stack', 'src/pages/Stack.tsx', '2026-09-22', 'weekly', 0.9),
  page('/docs', 'src/pages/Docs.tsx', '2026-09-12', 'monthly', 0.8),
  page('/about', 'src/pages/About.tsx', '2026-09-22', 'monthly', 0.8),
  page('/faq', 'src/pages/Faq.tsx', '2026-09-12', 'monthly', 0.7),
  page('/archive', 'src/pages/Archive.tsx', '2026-09-12', 'weekly', 0.85),
  ...archive.map((e) => ({
    path: `/archive/${e.slug}`,
    sources: ['src/data/archive.ts'],
    fallbackLastmod: e.date,
    changefreq: 'yearly' as const,
    priority: 0.7,
  })),
];

/** Paths that only work in the browser (auth + signed-in app). Served from a noindex shell. */
export const appOnlyPaths = [
  '/login',
  '/register',
  '/forgot-password',
  '/reset-password',
  '/verify-email',
  '/dashboard',
  '/dashboard/*',
  // License-status lookup tool; intentionally noindex.
  '/orcha/license',
];

/** Old URLs, now permanent (301) server-side redirects instead of client-side ones. */
export const legacyRedirects: [from: string, to: string][] = [
  ['/mission', '/about'],
  ['/vision', '/about'],
  ['/contact', '/about#contact'],
  ['/work-with-us', '/about'],
  ['/stack/aicl', '/stack#aicl'],
  ['/stack/orcha', '/stack#orcha'],
  ['/stack/memory', '/stack#memory'],
  ['/stack/safety', '/stack#safety'],
  ['/stack/tools', '/stack#tools'],
  ['/stack/modules', '/stack#modules'],
  ['/nomi', '/stack#memory'],
  ['/products', '/anvira'],
  ['/frameworks', '/stack'],
  ['/start', '/docs'],
  ['/benchmarks', '/stack'],
  ['/use-cases', '/'],
  ['/use-cases/*', '/'],
  ['/release-logs', '/'],
  ['/sitemap', '/'],
  ['/opensource', '/archive'],
  ['/research', '/archive'],
  ['/signup', '/register'],
  ['/account', '/dashboard/settings'],
];
