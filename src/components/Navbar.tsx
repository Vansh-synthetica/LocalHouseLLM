import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  // Animation variants
  const navVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const linkVariants = {
    hidden: { opacity: 0, y: -5 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: custom * 0.1, duration: 0.5, ease: "easeOut" }
    })
  };

  return (
    <motion.nav
      initial="hidden"
      animate="visible"
      variants={navVariants}
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/50 backdrop-blur-md shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="max-container py-4 flex items-center justify-between">
        <Link to="/" className="text-xl text-foreground flex items-center gap-2 group">
          <motion.span
            className="text-2xl text-black dark:text-white font-lato relative overflow-hidden"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          >
            \
          </motion.span>
          <div className="overflow-hidden">
            <motion.span 
              className="font-lato text-lg font-bold tracking-tight"
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.5 }}
            >
              LocalHouseLLM
            </motion.span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {['anvira', 'vision', 'about', 'opensource', 'release-logs'].map((item, index) => (
            <motion.div
              key={item}
              custom={index}
              variants={linkVariants}
              initial="hidden"
              animate="visible"
            >
              <Link 
                to={`/${item}`} 
                className={`text-foreground text-sm relative pb-1 after:content-[''] after:block after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:bg-foreground after:transform after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100 ${
                  location.pathname.startsWith(`/${item}`) ? 'after:scale-x-100' : ''
                }`}
              >
                {item === 'release-logs' ? 'Release Logs' : item === 'research-papers' ? 'Research Papers' : item === 'anvira' ? 'Anvira' : item.charAt(0).toUpperCase() + item.slice(1)}
              </Link>
            </motion.div>
          ))}
          <motion.div
            custom={4}
            variants={linkVariants}
            initial="hidden"
            animate="visible"
          >
            <Link to="/contact">
              <motion.div whileHover={{ scale: 1.03 }} transition={{ type: 'spring', stiffness: 300 }}>
                <Button 
                  variant="outline" 
                  className="border-border text-foreground text-sm bg-transparent hover:bg-foreground/5 hover:border-border"
                >
                  Contact
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <motion.button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-foreground p-2"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <motion.div 
          className="md:hidden bg-black/80 backdrop-blur-xl border-b border-border shadow-lg"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="max-container py-4 flex flex-col gap-3">
            {['anvira', 'vision', 'about', 'opensource', 'release-logs', 'contact'].map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
              >
                <Link 
                  to={`/${item}`} 
                  className={`text-foreground text-sm px-4 py-2 block transition-all duration-300 hover:bg-foreground/5 rounded-md ${
                    location.pathname.startsWith(`/${item}`) ? 'bg-foreground/10' : ''
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item === 'release-logs' ? 'Release Logs' : item === 'opensource' ? 'Open Source' : item === 'anvira' ? 'Anvira' : item.charAt(0).toUpperCase() + item.slice(1)}
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
