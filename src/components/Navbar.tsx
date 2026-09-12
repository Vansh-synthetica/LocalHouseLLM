import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import BrandMark from './system/BrandMark';

type NavLink = { to: string; label: string };

const navLinks: NavLink[] = [
  { to: '/stack', label: 'Stack' },
  { to: '/archive', label: 'Research' },
  { to: '/anvira', label: 'Anvira' },
  { to: '/docs', label: 'Docs' },
  { to: '/about', label: 'About' },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Body scroll lock while mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const linkClass = (active: boolean) =>
    `text-sm font-medium transition-colors duration-200 ${
      active ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
    }`;

  return (
    <>
      {/* Skip link — a11y */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:z-[60] focus:top-3 focus:left-3 focus:px-3 focus:py-2 focus:rounded-md focus:bg-primary focus:text-primary-foreground focus:shadow-lg"
      >
        Skip to content
      </a>

      <motion.nav
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-background/95 backdrop-blur-md border-b border-border'
            : 'bg-transparent'
        }`}
        aria-label="Primary"
      >
        <div className="max-container h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 group" aria-label="LocalHouseLLM home">
            <span className="inline-flex h-6 w-6 items-center justify-center text-foreground">
              <BrandMark />
            </span>
            <span className="font-display text-[15px] font-semibold tracking-tight text-foreground">
              LocalHouseLLM
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={linkClass(location.pathname.startsWith(link.to))}
              >
                {link.label}
              </Link>
            ))}

            {user ? (
              <Link to="/dashboard">
                <Button className="h-9 rounded-sm px-4 text-sm font-medium bg-foreground text-background hover:bg-primary hover:text-primary-foreground">
                  <LayoutDashboard className="w-4 h-4 mr-1.5" /> Dashboard
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/login" className={linkClass(location.pathname === '/login')}>
                  Sign in
                </Link>
                <Link to="/register">
                  <Button className="h-9 rounded-sm px-4 text-sm font-medium bg-foreground text-background hover:bg-primary hover:text-primary-foreground">
                    Get started
                  </Button>
                </Link>
              </>
            )}
          </div>

          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setIsMenuOpen((v) => !v)}
              className="text-foreground p-2 rounded-md hover:bg-foreground/5 transition-colors"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden bg-background border-b border-border max-h-[calc(100dvh-4rem)] overflow-y-auto"
            >
              <div className="max-container py-4 flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="px-3 py-2.5 text-sm rounded-md hover:bg-foreground/5"
                  >
                    {link.label}
                  </Link>
                ))}

                {user ? (
                  <Link to="/dashboard" className="mt-3">
                    <Button className="w-full rounded-sm bg-foreground text-background hover:bg-primary hover:text-primary-foreground">Dashboard</Button>
                  </Link>
                ) : (
                  <div className="mt-3 flex flex-col gap-2">
                    <Link to="/login">
                      <Button variant="outline" className="w-full rounded-sm">Sign in</Button>
                    </Link>
                    <Link to="/register">
                      <Button className="w-full rounded-sm bg-foreground text-background hover:bg-primary hover:text-primary-foreground">Get started</Button>
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};

export default Navbar;
