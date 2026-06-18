import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

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

const stackPaths = ['/stack'];
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

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) setScrolled(isScrolled);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  useEffect(() => {
    setIsMenuOpen(false);
    setMobileStack(false);
    setMobileProducts(false);
    setMobileCompany(false);
    setStackOpen(false);
    setProductsOpen(false);
    setCompanyOpen(false);
  }, [location.pathname]);

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
    `text-sm transition-colors duration-200 ${
      active ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
    }`;

  const renderMegaDropdown = (groups: NavGroup[], width: string) => (
    <div className={`grid grid-cols-2`} style={{ minWidth: width }}>
      {groups.map((group) => (
        <div key={group.heading} className="p-4 border-r border-border/40 last:border-r-0">
          <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground px-3 mb-2">
            {group.heading}
          </p>
          {group.links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`block px-3 py-2 rounded-md transition-colors hover:bg-foreground/5 ${
                location.pathname === link.to ? 'bg-foreground/5' : ''
              }`}
            >
              <div className="text-sm font-medium text-foreground">{link.label}</div>
              {link.desc && (
                <div className="text-xs text-muted-foreground mt-0.5">{link.desc}</div>
              )}
            </Link>
          ))}
        </div>
      ))}
    </div>
  );

  return (
    <motion.nav
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-background/80 backdrop-blur-xl border-b border-border/40'
          : 'bg-transparent'
      }`}
    >
      <div className="max-container py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="text-2xl text-foreground font-lato leading-none">\</span>
          <span className="font-lato text-base font-semibold tracking-tight">LocalHouseLLM</span>
        </Link>

        <div className="hidden md:flex items-center gap-7">
          {/* Stack */}
          <div
            className="relative"
            onMouseEnter={() => enter(setStackOpen, stackTimeout)}
            onMouseLeave={() => leave(setStackOpen, stackTimeout)}
          >
            <button className={`flex items-center gap-1 ${linkClass(isStackActive)}`}>
              Stack
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  stackOpen ? 'rotate-180' : ''
                }`}
              />
            </button>
            <AnimatePresence>
              {stackOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.18 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[520px] rounded-xl border border-border/60 bg-background/95 backdrop-blur-xl shadow-2xl overflow-hidden"
                >
                  {renderMegaDropdown(stackGroups, '520px')}
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
            <button className={`flex items-center gap-1 ${linkClass(isProductsActive)}`}>
              Products
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  productsOpen ? 'rotate-180' : ''
                }`}
              />
            </button>
            <AnimatePresence>
              {productsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.18 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[460px] rounded-xl border border-border/60 bg-background/95 backdrop-blur-xl shadow-2xl overflow-hidden"
                >
                  {renderMegaDropdown(productsGroups, '460px')}
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

          <Link to="/use-cases" className={linkClass(location.pathname.startsWith('/use-cases'))}>
            Use Cases
          </Link>

          {/* Company */}
          <div
            className="relative"
            onMouseEnter={() => enter(setCompanyOpen, companyTimeout)}
            onMouseLeave={() => leave(setCompanyOpen, companyTimeout)}
          >
            <button className={`flex items-center gap-1 ${linkClass(isCompanyActive)}`}>
              Company
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  companyOpen ? 'rotate-180' : ''
                }`}
              />
            </button>
            <AnimatePresence>
              {companyOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.18 }}
                  className="absolute top-full right-0 mt-3 w-56 rounded-xl border border-border/60 bg-background/95 backdrop-blur-xl shadow-2xl overflow-hidden py-2"
                >
                  {companyLinks.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      className={`block px-4 py-2 text-sm transition-colors hover:bg-foreground/5 ${
                        location.pathname === link.to
                          ? 'text-foreground bg-foreground/5'
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

          <Link to="/start">
            <Button className="bg-foreground text-background hover:bg-foreground/90 h-9 text-sm px-4">
              Start
            </Button>
          </Link>
        </div>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-foreground p-2"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border/40 max-h-[calc(100vh-4rem)] overflow-y-auto"
          >
            <div className="max-container py-4 flex flex-col gap-1">
              {/* Stack */}
              <button
                onClick={() => setMobileStack((p) => !p)}
                className="flex items-center justify-between px-3 py-2 text-sm rounded-md hover:bg-foreground/5"
              >
                Stack
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileStack ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {mobileStack && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    {stackGroups.map((group) => (
                      <div key={group.heading} className="pt-2">
                        <p className="px-6 text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-1">
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

              {/* Products */}
              <button
                onClick={() => setMobileProducts((p) => !p)}
                className="flex items-center justify-between px-3 py-2 text-sm rounded-md hover:bg-foreground/5 mt-1"
              >
                Products
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileProducts ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {mobileProducts && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    {productsGroups.map((group) => (
                      <div key={group.heading} className="pt-2">
                        <p className="px-6 text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-1">
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

              <Link to="/research" className="px-3 py-2 text-sm rounded-md hover:bg-foreground/5 mt-1">
                Research
              </Link>
              <Link to="/docs" className="px-3 py-2 text-sm rounded-md hover:bg-foreground/5">
                Docs
              </Link>
              <Link to="/use-cases" className="px-3 py-2 text-sm rounded-md hover:bg-foreground/5">
                Use Cases
              </Link>

              {/* Company */}
              <button
                onClick={() => setMobileCompany((p) => !p)}
                className="flex items-center justify-between px-3 py-2 text-sm rounded-md hover:bg-foreground/5 mt-1"
              >
                Company
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileCompany ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {mobileCompany && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    {companyLinks.map((link) => (
                      <Link key={link.to} to={link.to} className="block px-6 py-2 text-sm rounded-md hover:bg-foreground/5 text-muted-foreground">
                        {link.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              <Link to="/start" className="mt-3">
                <Button className="bg-foreground text-background hover:bg-foreground/90 w-full">
                  Start
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
