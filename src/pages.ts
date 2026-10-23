import { type ComponentType, createElement, lazy } from 'react';
import { matchPath } from 'react-router-dom';

/**
 * Route-level code splitting that still works with prerendered HTML.
 *
 * Each page lives in its own chunk. Before hydrating, the browser loads the
 * chunk for the current URL (preloadPage), and the prerenderer loads all of
 * them (preloadAllPages), so the first render is synchronous on both sides and
 * matches the static HTML exactly. Later navigations fall back to React.lazy.
 */
type PageModule = { default: ComponentType };

interface PageEntry {
  /** Route patterns this page renders, for matching a URL to its chunk. */
  patterns: string[];
  /** Source file, used to find the chunk in Vite's manifest for <link rel="modulepreload">. */
  module: string;
  preload: () => Promise<void>;
}

const registry: PageEntry[] = [];

const page = (patterns: string[], module: string, load: () => Promise<PageModule>) => {
  let Loaded: ComponentType | null = null;
  const preload = () =>
    load().then((m) => {
      Loaded = m.default;
    });
  const Lazy = lazy(() => load().then((m) => ((Loaded = m.default), m)));
  registry.push({ patterns, module, preload });
  const Page = (props: Record<string, never>) => createElement(Loaded ?? Lazy, props);
  Page.displayName = `Page(${module})`;
  return Page;
};

export const Index = page(['/'], 'src/pages/Index.tsx', () => import('./pages/Index'));
export const Anvira = page(['/anvira'], 'src/pages/Anvira.tsx', () => import('./pages/Anvira'));
export const AnviraNotes = page(['/anvira-notes'], 'src/pages/AnviraNotes.tsx', () => import('./pages/AnviraNotes'));
export const Releases = page(['/releases', '/releases/:product'], 'src/pages/Releases.tsx', () => import('./pages/Releases'));
export const About = page(['/about'], 'src/pages/About.tsx', () => import('./pages/About'));
export const Stack = page(['/stack'], 'src/pages/Stack.tsx', () => import('./pages/Stack'));
export const Archive = page(['/archive'], 'src/pages/Archive.tsx', () => import('./pages/Archive'));
export const PaperReader = page(['/archive/:slug'], 'src/pages/PaperReader.tsx', () => import('./pages/PaperReader'));
export const Docs = page(['/docs'], 'src/pages/Docs.tsx', () => import('./pages/Docs'));
export const Faq = page(['/faq'], 'src/pages/Faq.tsx', () => import('./pages/Faq'));
export const OrchaLicense = page(['/orcha/license'], 'src/pages/orcha/License.tsx', () => import('./pages/orcha/License'));


// Anvira accounts (the apps' sign-in). Anvira Notes' "Manage profile" opens /account/profile.
export const AccountProfile = page(['/account/profile', '/account/signin', '/account/signup'], 'src/pages/account/AccountProfile.tsx', () => import('./pages/account/AccountProfile'));
export const AccountReset = page(['/account/reset'], 'src/pages/account/AccountReset.tsx', () => import('./pages/account/AccountReset'));
export const AccountStudy = page(['/account/study'], 'src/pages/account/AccountStudy.tsx', () => import('./pages/account/AccountStudy'));


const entriesFor = (pathname: string) =>
  registry.filter((e) => e.patterns.some((pattern) => matchPath({ path: pattern, end: true }, pathname)));

/** Loads the chunk(s) for a URL so hydration renders the same markup as the prerendered HTML. */
export const preloadPage = (pathname: string) => Promise.all(entriesFor(pathname).map((e) => e.preload()));

export const preloadAllPages = () => Promise.all(registry.map((e) => e.preload()));

/** Source modules for a URL — the prerenderer turns these into modulepreload links. */
export const pageModulesFor = (pathname: string) => entriesFor(pathname).map((e) => e.module);
