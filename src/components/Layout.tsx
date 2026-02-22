
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';
import rainforestBg from '@/assets/rainforest-bg.mp4';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const videoRef = useRef<HTMLVideoElement>(null);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  // Crossfade video at loop point to hide seam
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      const timeLeft = video.duration - video.currentTime;
      if (timeLeft < 1.5) {
        video.style.opacity = String(Math.max(0.3, timeLeft / 1.5));
      } else if (video.currentTime < 1) {
        video.style.opacity = String(Math.min(1, 0.3 + (video.currentTime / 1) * 0.7));
      } else {
        video.style.opacity = '1';
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    return () => video.removeEventListener('timeupdate', handleTimeUpdate);
  }, []);

  // Page transition variants - butter smooth
  const pageVariants = {
    initial: { opacity: 0, y: 8 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } 
    },
    exit: { 
      opacity: 0, 
      y: -8,
      transition: { duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] } 
    }
  };

  return (
    <div className="relative flex flex-col min-h-screen text-foreground">
      {/* Video Background */}
      <div className="fixed inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover transition-opacity duration-1000 will-change-[opacity]"
        >
          <source src={rainforestBg} type="video/mp4" />
        </video>
        {/* Frosted glass overlay */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[6px]" />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        <AnimatePresence mode="wait">
          <motion.main
            className="flex-grow pt-20"
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
