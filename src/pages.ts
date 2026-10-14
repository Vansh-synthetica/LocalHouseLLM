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

export const Login = page(['/login'], 'src/pages/auth/Login.tsx', () => import('./pages/auth/Login'));
export const Register = page(['/register'], 'src/pages/auth/Register.tsx', () => import('./pages/auth/Register'));
export const ForgotPassword = page(['/forgot-password'], 'src/pages/auth/ForgotPassword.tsx', () => import('./pages/auth/ForgotPassword'));
export const ResetPassword = page(['/reset-password'], 'src/pages/auth/ResetPassword.tsx', () => import('./pages/auth/ResetPassword'));
export const VerifyEmail = page(['/verify-email'], 'src/pages/auth/VerifyEmail.tsx', () => import('./pages/auth/VerifyEmail'));

export const AppLayout = page(['/dashboard/*'], 'src/components/app/AppLayout.tsx', () => import('./components/app/AppLayout'));
export const Dashboard = page(['/dashboard'], 'src/pages/app/Dashboard.tsx', () => import('./pages/app/Dashboard'));
export const ProfilePage = page(['/dashboard/profile'], 'src/pages/app/ProfilePage.tsx', () => import('./pages/app/ProfilePage'));
export const AccountSettings = page(['/dashboard/settings'], 'src/pages/app/AccountSettings.tsx', () => import('./pages/app/AccountSettings'));

const entriesFor = (pathname: string) =>
  registry.filter((e) => e.patterns.some((pattern) => matchPath({ path: pattern, end: true }, pathname)));

/** Loads the chunk(s) for a URL so hydration renders the same markup as the prerendered HTML. */
export const preloadPage = (pathname: string) => Promise.all(entriesFor(pathname).map((e) => e.preload()));

export const preloadAllPages = () => Promise.all(registry.map((e) => e.preload()));

/** Source modules for a URL — the prerenderer turns these into modulepreload links. */
export const pageModulesFor = (pathname: string) => entriesFor(pathname).map((e) => e.module);
