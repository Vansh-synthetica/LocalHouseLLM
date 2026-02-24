
import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';
import rainforestBg from '@/assets/rainforest-bg.mp4';
import mountainsBg from '@/assets/mountains-bg.mp4';
import videoPoster from '@/assets/video-poster.jpg';

interface LayoutProps {
  children: React.ReactNode;
}

const videos = [rainforestBg, mountainsBg];

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const videoARef = useRef<HTMLVideoElement>(null);
  const videoBRef = useRef<HTMLVideoElement>(null);
  const [activeVideo, setActiveVideo] = useState(0);
  const [showB, setShowB] = useState(false);
  const videoIndex = useRef(0);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  // Dual-video crossfade: when video A ends, fade to B with next video, and vice versa
  useEffect(() => {
    const vA = videoARef.current;
    const vB = videoBRef.current;
    if (!vA || !vB) return;

    const handleEndedA = () => {
      videoIndex.current = (videoIndex.current + 1) % videos.length;
      vB.src = videos[videoIndex.current];
      vB.load();
      vB.play().catch(() => {});
      setShowB(true);
    };

    const handleEndedB = () => {
      videoIndex.current = (videoIndex.current + 1) % videos.length;
      vA.src = videos[videoIndex.current];
      vA.load();
      vA.play().catch(() => {});
      setShowB(false);
    };

    vA.addEventListener('ended', handleEndedA);
    vB.addEventListener('ended', handleEndedB);
    return () => {
      vA.removeEventListener('ended', handleEndedA);
      vB.removeEventListener('ended', handleEndedB);
    };
  }, []);

  // Page transition variants
  const pageVariants = {
    initial: { opacity: 0, y: 6 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] } 
    },
    exit: { 
      opacity: 0, 
      y: -4,
      transition: { duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] } 
    }
  };

  return (
    <div className="relative flex flex-col min-h-screen text-foreground">
      {/* Video Background with dual crossfade */}
      <div className="fixed inset-0 z-0 bg-background">
        {/* Poster fallback — shows immediately, no black flash */}
        <img
          src={videoPoster}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Video A */}
        <video
          ref={videoARef}
          autoPlay
          muted
          playsInline
          preload="auto"
          poster={videoPoster}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[2500ms] ease-in-out ${showB ? 'opacity-0' : 'opacity-100'}`}
        >
          <source src={videos[0]} type="video/mp4" />
        </video>
        {/* Video B */}
        <video
          ref={videoBRef}
          muted
          playsInline
          preload="none"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[2500ms] ease-in-out ${showB ? 'opacity-100' : 'opacity-0'}`}
        />
        {/* Frosted glass overlay */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[8px]" />
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
