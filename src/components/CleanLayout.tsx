import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

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

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  return (
    <div className="relative flex flex-col min-h-screen bg-background text-foreground">
      {/* Subtle static background — no video, no noise */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        {/* Soft top vignette */}
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1100px] h-[600px] rounded-full bg-foreground/[0.04] blur-3xl" />
        {/* Faint bottom glow */}
        <div className="absolute -bottom-60 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full bg-foreground/[0.025] blur-3xl" />
        {/* Hairline grid */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
            backgroundSize: '64px 64px',
            color: 'hsl(var(--foreground))',
            maskImage:
              'radial-gradient(ellipse at center, black 30%, transparent 75%)',
            WebkitMaskImage:
              'radial-gradient(ellipse at center, black 30%, transparent 75%)',
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
