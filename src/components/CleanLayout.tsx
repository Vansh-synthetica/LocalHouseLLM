import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { useSpotlight } from './fx/useSpotlight';

interface CleanLayoutProps {
  children: React.ReactNode;
}

/**
 * A calm, premium layout without the video background.
 * Used for mission-driven and content-focused pages where readability,
 * crawlability, and editorial clarity matter most.
 */
const CleanLayout = ({ children }: CleanLayoutProps) => {
  const location = useLocation();
  useSpotlight();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  return (
    <div className="relative flex flex-col min-h-screen bg-background text-foreground">
      {/* Studio backdrop — glow blooms + technical grid */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-56 left-[8%] w-[820px] h-[560px] rounded-full bg-primary/25 blur-[140px]" />
        <div className="absolute -top-40 right-[4%] w-[620px] h-[460px] rounded-full bg-accent/15 blur-[150px]" />
        <div className="absolute top-[45%] left-1/2 -translate-x-1/2 w-[900px] h-[520px] rounded-full bg-primary/10 blur-[160px]" />
        <div className="absolute -bottom-56 right-[10%] w-[760px] h-[520px] rounded-full bg-accent/10 blur-[150px]" />
        {/* Hairline grid */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
            backgroundSize: '72px 72px',
            color: 'hsl(var(--foreground))',
            maskImage:
              'radial-gradient(ellipse 80% 60% at 50% 0%, black 10%, transparent 80%)',
            WebkitMaskImage:
              'radial-gradient(ellipse 80% 60% at 50% 0%, black 10%, transparent 80%)',
          }}
        />
      </div>


      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow pt-20">{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default CleanLayout;
