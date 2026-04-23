
import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

const opensourceLinks = [
  { to: '/opensource', label: 'Open Source' },
  { to: '/vision', label: 'Vision' },
  { to: '/release-logs', label: 'Release Logs' },
];

const earlyAccessLinks = [
  { to: '/inkflow', label: 'InkFlow' },
  { to: '/devquill', label: 'DevQuill' },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [earlyOpen, setEarlyOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const [mobileEarlyOpen, setMobileEarlyOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const earlyRef = useRef<HTMLDivElement>(null);
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const earlyTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) setScrolled(isScrolled);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
    setMobileDropdownOpen(false);
    setMobileEarlyOpen(false);
    setDropdownOpen(false);
    setEarlyOpen(false);
  }, [location.pathname]);

  const isOSActive = ['/opensource', '/vision', '/release-logs'].some(p => location.pathname.startsWith(p));
  const isEarlyActive = ['/inkflow', '/devquill'].some(p => location.pathname.startsWith(p));

  const handleMouseEnter = () => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setDropdownOpen(true);
  };
  const handleMouseLeave = () => {
    dropdownTimeout.current = setTimeout(() => setDropdownOpen(false), 150);
  };

  const handleEarlyEnter = () => {
    if (earlyTimeout.current) clearTimeout(earlyTimeout.current);
    setEarlyOpen(true);
  };
  const handleEarlyLeave = () => {
    earlyTimeout.current = setTimeout(() => setEarlyOpen(false), 150);
  };

  const navVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  const linkVariants = {
    hidden: { opacity: 0, y: -5 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: custom * 0.1, duration: 0.5, ease: 'easeOut' },
    }),
  };

  const underlineClass = (active: boolean) =>
    `text-foreground text-sm relative pb-1 after:content-[''] after:block after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:bg-foreground after:transform after:transition-transform after:duration-300 ${active ? 'after:scale-x-100' : 'after:scale-x-0 hover:after:scale-x-100'}`;

  return (
    <motion.nav
      initial="hidden"
      animate="visible"
      variants={navVariants}
      className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/50 backdrop-blur-md shadow-md' : 'bg-transparent'}`}
    >
      <div className="max-container py-4 flex items-center justify-between">
        <Link to="/" className="text-xl text-foreground flex items-center gap-2 group">
          <motion.span
            className="text-2xl text-white font-lato relative overflow-hidden"
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
          {/* Anvira */}
          <motion.div custom={0} variants={linkVariants} initial="hidden" animate="visible">
            <Link to="/anvira" className={underlineClass(location.pathname.startsWith('/anvira'))}>
              Anvira
            </Link>
          </motion.div>

          {/* Nomi */}
          <motion.div custom={1} variants={linkVariants} initial="hidden" animate="visible">
            <Link to="/nomi" className={underlineClass(location.pathname.startsWith('/nomi'))}>
              Nomi
            </Link>
          </motion.div>

          {/* Opensource Dropdown */}
          <motion.div
            custom={2}
            variants={linkVariants}
            initial="hidden"
            animate="visible"
            className="relative"
            ref={dropdownRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button
              className={`flex items-center gap-1 ${underlineClass(isOSActive)}`}
              onClick={() => setDropdownOpen(p => !p)}
            >
              Opensource
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-48 rounded-lg border border-border bg-black/80 backdrop-blur-xl shadow-xl overflow-hidden"
                >
                  {opensourceLinks.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      className={`block px-4 py-2.5 text-sm transition-colors duration-200 hover:bg-white/5 ${
                        location.pathname === link.to ? 'text-foreground bg-white/5' : 'text-muted-foreground'
                      }`}
                      onClick={() => setDropdownOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Early Access Dropdown */}
          <motion.div
            custom={3}
            variants={linkVariants}
            initial="hidden"
            animate="visible"
            className="relative"
            ref={earlyRef}
            onMouseEnter={handleEarlyEnter}
            onMouseLeave={handleEarlyLeave}
          >
            <button
              className={`flex items-center gap-1 ${underlineClass(isEarlyActive)}`}
              onClick={() => setEarlyOpen(p => !p)}
            >
              Early Access
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${earlyOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {earlyOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-48 rounded-lg border border-border bg-black/80 backdrop-blur-xl shadow-xl overflow-hidden"
                >
                  {earlyAccessLinks.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      className={`block px-4 py-2.5 text-sm transition-colors duration-200 hover:bg-white/5 ${
                        location.pathname === link.to ? 'text-foreground bg-white/5' : 'text-muted-foreground'
                      }`}
                      onClick={() => setEarlyOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* About */}
          <motion.div custom={4} variants={linkVariants} initial="hidden" animate="visible">
            <Link to="/about" className={underlineClass(location.pathname.startsWith('/about'))}>
              About
            </Link>
          </motion.div>

          {/* Contact */}
          <motion.div custom={5} variants={linkVariants} initial="hidden" animate="visible">
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
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden bg-black/80 backdrop-blur-xl border-b border-border shadow-lg"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="max-container py-4 flex flex-col gap-1">
              <MobileLink to="/anvira" label="Anvira" index={0} />
              <MobileLink to="/nomi" label="Nomi" index={1} />

              {/* Opensource expandable */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.3 }}
              >
                <button
                  className={`flex items-center justify-between w-full text-foreground text-sm px-4 py-2 rounded-md transition-all duration-300 hover:bg-foreground/5 ${isOSActive ? 'bg-foreground/10' : ''}`}
                  onClick={() => setMobileDropdownOpen(p => !p)}
                >
                  Opensource
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {mobileDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      {opensourceLinks.map((link) => (
                        <Link
                          key={link.to}
                          to={link.to}
                          className={`block text-sm px-8 py-2 transition-colors duration-200 rounded-md hover:bg-foreground/5 ${
                            location.pathname === link.to ? 'text-foreground bg-foreground/5' : 'text-muted-foreground'
                          }`}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {link.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Early Access expandable */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.3 }}
              >
                <button
                  className={`flex items-center justify-between w-full text-foreground text-sm px-4 py-2 rounded-md transition-all duration-300 hover:bg-foreground/5 ${isEarlyActive ? 'bg-foreground/10' : ''}`}
                  onClick={() => setMobileEarlyOpen(p => !p)}
                >
                  Early Access
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileEarlyOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {mobileEarlyOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      {earlyAccessLinks.map((link) => (
                        <Link
                          key={link.to}
                          to={link.to}
                          className={`block text-sm px-8 py-2 transition-colors duration-200 rounded-md hover:bg-foreground/5 ${
                            location.pathname === link.to ? 'text-foreground bg-foreground/5' : 'text-muted-foreground'
                          }`}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {link.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              <MobileLink to="/about" label="About" index={4} />
              <MobileLink to="/contact" label="Contact" index={5} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

const MobileLink = ({ to, label, index }: { to: string; label: string; index: number }) => {
  const location = useLocation();
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.3 }}
    >
      <Link
        to={to}
        className={`text-foreground text-sm px-4 py-2 block transition-all duration-300 hover:bg-foreground/5 rounded-md ${
          location.pathname.startsWith(to) ? 'bg-foreground/10' : ''
        }`}
      >
        {label}
      </Link>
    </motion.div>
  );
};

export default Navbar;
