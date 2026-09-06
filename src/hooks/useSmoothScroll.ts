import { useEffect } from 'react';
import Lenis from 'lenis';

/**
 * Premium smooth-scroll for a single page.
 * Mounts Lenis on mount, destroys on unmount — keeps it scoped.
 */
export const useSmoothScroll = (enabled: boolean = true) => {
  useEffect(() => {
    if (!enabled) return;

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.2,
      lerp: 0.08,
    });

    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [enabled]);
};
