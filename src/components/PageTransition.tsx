import { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

/**
 * Full-screen veil that fades between dark and light theme routes.
 * Creates the feeling of "flowing into each other" when navigating
 * between LocalHouseLLM (dark) and Nomi (light).
 */
const isLightRoute = (path: string) => path.startsWith('/nomi');

const PageTransition = () => {
  const location = useLocation();
  const [veil, setVeil] = useState<null | 'to-light' | 'to-dark'>(null);
  const prevPath = useRef(location.pathname);

  useEffect(() => {
    const from = prevPath.current;
    const to = location.pathname;
    if (from === to) return;

    const fromLight = isLightRoute(from);
    const toLight = isLightRoute(to);

    if (fromLight !== toLight) {
      setVeil(toLight ? 'to-light' : 'to-dark');
      const t = setTimeout(() => setVeil(null), 900);
      prevPath.current = to;
      return () => clearTimeout(t);
    }
    prevPath.current = to;
  }, [location.pathname]);

  return (
    <AnimatePresence>
      {veil && (
        <motion.div
          key={veil}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.45,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="fixed inset-0 z-[100] pointer-events-none"
          style={{
            background:
              veil === 'to-light'
                ? 'radial-gradient(ellipse at center, #FAFAF7 0%, #FAFAF7 60%, rgba(250,250,247,0.95) 100%)'
                : 'radial-gradient(ellipse at center, #050505 0%, #050505 60%, rgba(5,5,5,0.95) 100%)',
          }}
        />
      )}
    </AnimatePresence>
  );
};

export default PageTransition;
