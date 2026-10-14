import { createRoot, hydrateRoot } from 'react-dom/client';

// Premium typography — Sora headings, Manrope body
import '@fontsource/sora/300.css';
import '@fontsource/sora/400.css';
import '@fontsource/sora/500.css';
import '@fontsource/sora/600.css';
import '@fontsource/sora/700.css';
import '@fontsource/manrope/300.css';
import '@fontsource/manrope/400.css';
import '@fontsource/manrope/500.css';
import '@fontsource/manrope/600.css';
import '@fontsource/manrope/700.css';
// Editorial serif — prototype for large headlines only
import '@fontsource/source-serif-4/400.css';
import '@fontsource/source-serif-4/500.css';
import '@fontsource/source-serif-4/600.css';
import '@fontsource/source-serif-4/400-italic.css';

import App from './App.tsx';
import { preloadAllPages, preloadPage } from './pages';
import './index.css';

const root = document.getElementById('root')!;

// Warm every other page's chunk once the browser is idle, so later clicks are instant.
const warmOtherPages = () => {
  const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 1500));
  idle(() => void preloadAllPages());
};

// Public pages ship as prerendered HTML (scripts/prerender.mjs); hydrate them once
// this page's chunk is loaded, so the first render matches that HTML exactly.
// App-only routes are served an empty shell, so render from scratch there.
if (root.firstElementChild) {
  preloadPage(window.location.pathname)
    .catch(() => undefined)
    .then(() => {
      hydrateRoot(root, <App />);
      warmOtherPages();
    });
} else {
  createRoot(root).render(<App />);
  warmOtherPages();
}
