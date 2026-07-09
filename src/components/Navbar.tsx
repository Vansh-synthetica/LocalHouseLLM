import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeToggle } from './ThemeToggle';
import { useAuth } from '@/hooks/useAuth';

type NavLink = { to: string; label: string; desc?: string };
type NavGroup = { heading: string; links: NavLink[] };

const stackGroups: NavGroup[] = [
  {
    heading: 'Layers',
    links: [
      { to: '/stack/aicl', label: 'AICL', desc: 'Communication protocol' },
      { to: '/stack/orcha', label: 'ORCHA', desc: 'Orchestration engine' },
      { to: '/stack/memory', label: 'Memory', desc: 'User-owned context' },
      { to: '/stack/safety', label: 'Safety', desc: 'Verification layer' },
      { to: '/stack/tools', label: 'Tools', desc: 'Reusable actions' },
      { to: '/stack/modules', label: 'Intelligence Modules', desc: 'Specialized experts' },
    ],
  },
  {
    heading: 'Overview',
    links: [
      { to: '/stack', label: 'Full architecture', desc: 'How the layers fit together' },
      { to: '/use-cases', label: 'Use Cases', desc: 'Real-world applications' },
      { to: '/benchmarks', label: 'Benchmarks', desc: 'Latency, cost, reliability' },
      { to: '/research', label: 'Research', desc: 'Papers & technical notes' },
    ],
  },
];

const productsGroups: NavGroup[] = [
  {
    heading: 'Products',
    links: [
      { to: '/anvira', label: 'Anvira', desc: 'Modular AI architecture' },
      { to: '/nomi', label: 'Nomi', desc: 'AI persona infrastructure' },
    ],
  },
  {
    heading: 'Early Access',
    links: [
      { to: '/inkflow', label: 'InkFlow', desc: 'AI writing assistant' },
      { to: '/devquill', label: 'DevQuill', desc: 'For developers' },
    ],
  },
];

const companyLinks: NavLink[] = [
  { to: '/mission', label: 'Mission' },
  { to: '/vision', label: 'Vision' },
  { to: '/about', label: 'About' },
  { to: '/release-logs', label: 'Release Logs' },
  { to: '/faq', label: 'FAQ' },
  { to: '/contact', label: 'Contact' },
];

const stackPaths = ['/stack', '/use-cases', '/benchmarks'];
const productsPaths = ['/anvira', '/nomi', '/inkflow', '/devquill', '/products'];
const companyPaths = ['/mission', '/vision', '/about', '/release-logs', '/faq', '/contact'];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [stackOpen, setStackOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);
  const [mobileStack, setMobileStack] = useState(false);
  const [mobileProducts, setMobileProducts] = useState(false);
  const [mobileCompany, setMobileCompany] = useState(false);
  const stackTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const productsTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const companyTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
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
    setMobileStack(false);
    setMobileProducts(false);
    setMobileCompany(false);
    setStackOpen(false);
    setProductsOpen(false);
    setCompanyOpen(false);
  }, [location.pathname]);

  // Body scroll lock while mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const isStackActive = stackPaths.some((p) => location.pathname.startsWith(p));
  const isProductsActive = productsPaths.some((p) => location.pathname.startsWith(p));
  const isCompanyActive = companyPaths.some((p) => location.pathname.startsWith(p));

  const enter = (
    setter: (v: boolean) => void,
    timer: React.MutableRefObject<ReturnType<typeof setTimeout> | null>,
  ) => {
    if (timer.current) clearTimeout(timer.current);
    setter(true);
  };
  const leave = (
    setter: (v: boolean) => void,
    timer: React.MutableRefObject<ReturnType<typeof setTimeout> | null>,
  ) => {
    timer.current = setTimeout(() => setter(false), 150);
  };

  const linkClass = (active: boolean) =>
    `text-sm font-medium transition-colors duration-200 ${
      active ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
    }`;

  const renderMegaDropdown = (groups: NavGroup[]) => (
    <div className="grid grid-cols-2 divide-x divide-border/60">
      {groups.map((group) => (
        <div key={group.heading} className="p-3">
          <p className="text-[10px] tracking-[0.22em] uppercase text-muted-foreground/80 px-3 mb-1.5">
            {group.heading}
          </p>
          {group.links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`block px-3 py-2 rounded-lg transition-colors group ${
                location.pathname === link.to
                  ? 'bg-primary/10 text-foreground'
                  : 'text-foreground/90 hover:bg-foreground/5'
              }`}
            >
              <div className="text-sm font-medium">{link.label}</div>
              {link.desc && (
                <div className="text-xs text-muted-foreground mt-0.5 group-hover:text-foreground/70 transition-colors">
                  {link.desc}
                </div>
              )}
            </Link>
          ))}
        </div>
      ))}
    </div>
  );

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
            ? 'bg-background/70 backdrop-blur-xl border-b border-border/60 shadow-[0_1px_0_0_hsl(var(--border)/0.4)]'
            : 'bg-transparent'
        }`}
        aria-label="Primary"
      >
        <div className="max-container h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 group" aria-label="LocalHouseLLM home">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent text-primary-foreground font-display text-lg leading-none shadow-sm">
              \
            </span>
            <span className="font-display text-[15px] font-semibold tracking-tight text-foreground">
              LocalHouseLLM
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-7">
            {/* Stack */}
            <div
              className="relative"
              onMouseEnter={() => enter(setStackOpen, stackTimeout)}
              onMouseLeave={() => leave(setStackOpen, stackTimeout)}
            >
              <button
                className={`flex items-center gap-1 ${linkClass(isStackActive)}`}
                aria-expanded={stackOpen}
                aria-haspopup="true"
              >
                Stack
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${stackOpen ? 'rotate-180' : ''}`}
                />
              </button>
              <AnimatePresence>
                {stackOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.18 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[560px] rounded-2xl border border-border/60 bg-popover/95 backdrop-blur-2xl shadow-2xl overflow-hidden"
                  >
                    {renderMegaDropdown(stackGroups)}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Products */}
            <div
              className="relative"
              onMouseEnter={() => enter(setProductsOpen, productsTimeout)}
              onMouseLeave={() => leave(setProductsOpen, productsTimeout)}
            >
              <button
                className={`flex items-center gap-1 ${linkClass(isProductsActive)}`}
                aria-expanded={productsOpen}
                aria-haspopup="true"
              >
                Products
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${productsOpen ? 'rotate-180' : ''}`}
                />
              </button>
              <AnimatePresence>
                {productsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.18 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[480px] rounded-2xl border border-border/60 bg-popover/95 backdrop-blur-2xl shadow-2xl overflow-hidden"
                  >
                    {renderMegaDropdown(productsGroups)}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link to="/research" className={linkClass(location.pathname.startsWith('/research'))}>
              Research
            </Link>

            <Link to="/docs" className={linkClass(location.pathname.startsWith('/docs'))}>
              Docs
            </Link>

            <Link
              to="/work-with-us"
              className={linkClass(location.pathname.startsWith('/work-with-us'))}
            >
              Work with us
            </Link>

            {/* Company */}
            <div
              className="relative"
              onMouseEnter={() => enter(setCompanyOpen, companyTimeout)}
              onMouseLeave={() => leave(setCompanyOpen, companyTimeout)}
            >
              <button
                className={`flex items-center gap-1 ${linkClass(isCompanyActive)}`}
                aria-expanded={companyOpen}
                aria-haspopup="true"
              >
                Company
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${companyOpen ? 'rotate-180' : ''}`}
                />
              </button>
              <AnimatePresence>
                {companyOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.18 }}
                    className="absolute top-full right-0 mt-3 w-56 rounded-2xl border border-border/60 bg-popover/95 backdrop-blur-2xl shadow-2xl overflow-hidden py-2"
                  >
                    {companyLinks.map((link) => (
                      <Link
                        key={link.to}
                        to={link.to}
                        className={`block px-4 py-2 text-sm transition-colors hover:bg-foreground/5 ${
                          location.pathname === link.to
                            ? 'text-foreground bg-primary/10'
                            : 'text-muted-foreground'
                        }`}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="relative flex items-center">
              <ThemeToggle />
            </div>

            {user ? (
              <Link to="/dashboard">
                <Button className="h-9 rounded-full px-4 text-sm font-medium bg-foreground text-background hover:bg-foreground/90 shadow-sm">
                  <LayoutDashboard className="w-4 h-4 mr-1.5" /> Dashboard
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/login" className={linkClass(location.pathname === '/login')}>
                  Sign in
                </Link>
                <Link to="/register">
                  <Button className="h-9 rounded-full px-4 text-sm font-medium bg-foreground text-background hover:bg-foreground/90 shadow-sm">
                    Get started
                  </Button>
                </Link>
              </>
            )}
          </div>

          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
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
              className="md:hidden bg-background/95 backdrop-blur-2xl border-b border-border/60 max-h-[calc(100dvh-4rem)] overflow-y-auto"
            >
              <div className="max-container py-4 flex flex-col gap-1">
                <button
                  onClick={() => setMobileStack((p) => !p)}
                  className="flex items-center justify-between px-3 py-2.5 text-sm rounded-md hover:bg-foreground/5"
                  aria-expanded={mobileStack}
                >
                  Stack
                  <ChevronDown className={`w-4 h-4 transition-transform ${mobileStack ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {mobileStack && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                      {stackGroups.map((group) => (
                        <div key={group.heading} className="pt-2">
                          <p className="px-6 text-[10px] tracking-[0.22em] uppercase text-muted-foreground/80 mb-1">
                            {group.heading}
                          </p>
                          {group.links.map((link) => (
                            <Link key={link.to} to={link.to} className="block px-6 py-2 text-sm rounded-md hover:bg-foreground/5 text-muted-foreground">
                              {link.label}
                            </Link>
                          ))}
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  onClick={() => setMobileProducts((p) => !p)}
                  className="flex items-center justify-between px-3 py-2.5 text-sm rounded-md hover:bg-foreground/5 mt-1"
                  aria-expanded={mobileProducts}
                >
                  Products
                  <ChevronDown className={`w-4 h-4 transition-transform ${mobileProducts ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {mobileProducts && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                      {productsGroups.map((group) => (
                        <div key={group.heading} className="pt-2">
                          <p className="px-6 text-[10px] tracking-[0.22em] uppercase text-muted-foreground/80 mb-1">
                            {group.heading}
                          </p>
                          {group.links.map((link) => (
                            <Link key={link.to} to={link.to} className="block px-6 py-2 text-sm rounded-md hover:bg-foreground/5 text-muted-foreground">
                              {link.label}
                            </Link>
                          ))}
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

                <Link to="/research" className="px-3 py-2.5 text-sm rounded-md hover:bg-foreground/5 mt-1">Research</Link>
                <Link to="/docs" className="px-3 py-2.5 text-sm rounded-md hover:bg-foreground/5">Docs</Link>
                <Link to="/work-with-us" className="px-3 py-2.5 text-sm rounded-md hover:bg-foreground/5">Work with us</Link>

                <button
                  onClick={() => setMobileCompany((p) => !p)}
                  className="flex items-center justify-between px-3 py-2.5 text-sm rounded-md hover:bg-foreground/5 mt-1"
                  aria-expanded={mobileCompany}
                >
                  Company
                  <ChevronDown className={`w-4 h-4 transition-transform ${mobileCompany ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {mobileCompany && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                      {companyLinks.map((link) => (
                        <Link key={link.to} to={link.to} className="block px-6 py-2 text-sm rounded-md hover:bg-foreground/5 text-muted-foreground">
                          {link.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

                {user ? (
                  <Link to="/dashboard" className="mt-3">
                    <Button className="w-full rounded-full bg-foreground text-background hover:bg-foreground/90">Dashboard</Button>
                  </Link>
                ) : (
                  <div className="mt-3 flex flex-col gap-2">
                    <Link to="/login">
                      <Button variant="outline" className="w-full rounded-full">Sign in</Button>
                    </Link>
                    <Link to="/register">
                      <Button className="w-full rounded-full bg-foreground text-background hover:bg-foreground/90">Get started</Button>
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
