import { useEffect } from 'react';

const SELECTOR = '.fx-spot, .card-premium, .feature-card, .luxury-card, .premium-glass';

/**
 * Tracks the pointer and writes --mx/--my (px) onto every spotlight-capable
 * card so the CSS radial glow + gradient rim follow the cursor.
 */
export function useSpotlight() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let raf = 0;
    let x = 0;
    let y = 0;

    const update = () => {
      raf = 0;
      const els = document.querySelectorAll<HTMLElement>(SELECTOR);
      els.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (y < r.top - 200 || y > r.bottom + 200 || x < r.left - 200 || x > r.right + 200) return;
        el.style.setProperty('--mx', `${x - r.left}px`);
        el.style.setProperty('--my', `${y - r.top}px`);
      });
    };

    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!raf) raf = requestAnimationFrame(update);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
}
