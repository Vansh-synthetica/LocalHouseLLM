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
import './index.css';

const root = document.getElementById('root')!;

// Public pages ship as prerendered HTML (scripts/prerender.mjs); hydrate them.
// App-only routes are served an empty shell, so render from scratch there.
if (root.firstElementChild) {
  hydrateRoot(root, <App />);
} else {
  createRoot(root).render(<App />);
}
