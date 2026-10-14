import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { HelmetProvider, type HelmetServerState } from 'react-helmet-async';

import { AppBody, AppShell } from './App';
import { preloadAllPages } from './pages';

export { siteRoutes, appOnlyPaths, legacyRedirects, SITE_URL } from '@/seo/routes';
export { pageModulesFor } from './pages';

/** Await before render(): loads every page chunk so rendering is synchronous. */
export const ready = preloadAllPages();

/** Renders one URL to static HTML plus the <head> tags its page declared via <SEO>. */
export function render(url: string) {
  const helmetContext: { helmet?: HelmetServerState } = {};
  const html = renderToString(
    <HelmetProvider context={helmetContext}>
      <AppShell>
        <StaticRouter location={url}>
          <AppBody />
        </StaticRouter>
      </AppShell>
    </HelmetProvider>,
  );
  const h = helmetContext.helmet;
  const head = h ? [h.title, h.meta, h.link, h.script].map((t) => t.toString()).filter(Boolean).join('\n    ') : '';
  return { html, head };
}
