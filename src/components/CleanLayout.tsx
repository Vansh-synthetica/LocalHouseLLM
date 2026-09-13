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
      {/* Flat editorial paper — no gradient mesh (Anthropic / OpenAI marketing calm) */}
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
