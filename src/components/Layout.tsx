import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [location.pathname]);

  const pageVariants = {
    initial: { opacity: 0, y: 6 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
    },
    exit: {
      opacity: 0,
      y: -4,
      transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <div className="relative flex flex-col min-h-dvh text-foreground bg-background">
      {/* Painterly atmospheric gradient — no video, GPU-cheap */}
      <div className="atmosphere" aria-hidden="true" />

      <div className="relative z-10 flex flex-col min-h-dvh">
        <Navbar />
        <AnimatePresence mode="wait">
          <motion.main
            id="main"
            className="flex-grow pt-24"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            key={location.pathname}
          >
            {children}
          </motion.main>
        </AnimatePresence>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
