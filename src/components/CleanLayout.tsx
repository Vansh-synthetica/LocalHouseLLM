import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';

interface CleanLayoutProps {
  children: React.ReactNode;
}

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const isCoarsePointer = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(pointer: coarse)').matches;

/**
 * Shared layout for all pages — Navbar, Footer, and Lenis smooth scroll.
 */
const CleanLayout = ({ children }: CleanLayoutProps) => {
  const location = useLocation();

  // Lenis smooth scroll — global, present on every page
  useSmoothScroll(!prefersReducedMotion() && !isCoarsePointer(), {
    duration: 2.2,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 0.75,
    touchMultiplier: 1,
    lerp: 0.055,
    anchors: { offset: -84 },
  });

  // New page: start at the top, unless the link points at a section
  // (e.g. /anvira-notes#download or /stack#orcha) — then go to that section.
  useEffect(() => {
    const id = decodeURIComponent(location.hash.slice(1));
    const target = id ? document.getElementById(id) : null;
    if (!target) {
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }
    // Jump after layout and smooth-scroll setup have settled, then once more in
    // case images above the section changed its position.
    const jump = () =>
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 84, behavior: 'instant' });
    const timers = [window.setTimeout(jump, 80), window.setTimeout(jump, 600)];
    return () => timers.forEach(window.clearTimeout);
    // Only on page changes: in-page hash links are handled by the browser and Lenis.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return (
    <div className="relative flex flex-col min-h-screen bg-background text-foreground">
      <div className="pointer-events-none fixed inset-0 z-0 bg-background" aria-hidden="true" />
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        <main id="main" className="flex-grow pt-[4.25rem]">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default CleanLayout;
