import { createRoot } from 'react-dom/client';

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

import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(<App />);
