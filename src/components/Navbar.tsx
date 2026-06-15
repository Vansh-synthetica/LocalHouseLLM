import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

type NavLink = { to: string; label: string; desc?: string };
type NavGroup = { heading: string; links: NavLink[] };

const projectsGroups: NavGroup[] = [
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

const resourcesLinks: NavLink[] = [
  { to: '/mission', label: 'Mission' },
  { to: '/research', label: 'Research' },
  { to: '/opensource', label: 'Open Source' },
  { to: '/vision', label: 'Vision' },
  { to: '/release-logs', label: 'Release Logs' },
];

const projectsPaths = ['/anvira', '/nomi', '/inkflow', '/devquill'];
const resourcesPaths = ['/mission', '/research', '/opensource', '/vision', '/release-logs'];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [projectsOpen, setProjectsOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [mobileProjects, setMobileProjects] = useState(false);
  const [mobileResources, setMobileResources] = useState(false);
  const projectsTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const resourcesTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
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
    setMobileProjects(false);
    setMobileResources(false);
    setProjectsOpen(false);
    setResourcesOpen(false);
  }, [location.pathname]);

  const isProjectsActive = projectsPaths.some((p) => location.pathname.startsWith(p));
  const isResourcesActive = resourcesPaths.some((p) => location.pathname.startsWith(p));

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
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <span className="text-2xl text-foreground font-lato leading-none">\</span>
          <span className="font-lato text-base font-semibold tracking-tight">LocalHouseLLM</span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {/* Projects mega dropdown */}
          <div
            className="relative"
            onMouseEnter={() => enter(setProjectsOpen, projectsTimeout)}
            onMouseLeave={() => leave(setProjectsOpen, projectsTimeout)}
          >
            <button
              className={`flex items-center gap-1 ${linkClass(isProjectsActive)}`}
              onClick={() => setProjectsOpen((p) => !p)}
            >
              Projects
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  projectsOpen ? 'rotate-180' : ''
                }`}
              />
            </button>
            <AnimatePresence>
              {projectsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.18 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[460px] rounded-xl border border-border/60 bg-background/95 backdrop-blur-xl shadow-2xl overflow-hidden"
                >
                  <div className="grid grid-cols-2">
                    {projectsGroups.map((group) => (
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
                            onClick={() => setProjectsOpen(false)}
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
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Resources dropdown */}
          <div
            className="relative"
            onMouseEnter={() => enter(setResourcesOpen, resourcesTimeout)}
            onMouseLeave={() => leave(setResourcesOpen, resourcesTimeout)}
          >
            <button
              className={`flex items-center gap-1 ${linkClass(isResourcesActive)}`}
              onClick={() => setResourcesOpen((p) => !p)}
            >
              Resources
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  resourcesOpen ? 'rotate-180' : ''
                }`}
              />
            </button>
            <AnimatePresence>
              {resourcesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.18 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-56 rounded-xl border border-border/60 bg-background/95 backdrop-blur-xl shadow-2xl overflow-hidden py-2"
                >
                  {resourcesLinks.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      className={`block px-4 py-2 text-sm transition-colors hover:bg-foreground/5 ${
                        location.pathname === link.to
                          ? 'text-foreground bg-foreground/5'
                          : 'text-muted-foreground'
                      }`}
                      onClick={() => setResourcesOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link to="/about" className={linkClass(location.pathname.startsWith('/about'))}>
            About
          </Link>

          <Link to="/contact">
            <Button
              variant="outline"
              className="border-border bg-transparent hover:bg-foreground/5 h-9 text-sm"
            >
              Contact
            </Button>
          </Link>
        </div>

        {/* Mobile button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-foreground p-2"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border/40"
          >
            <div className="max-container py-4 flex flex-col gap-1">
              {/* Projects */}
              <button
                onClick={() => setMobileProjects((p) => !p)}
                className="flex items-center justify-between px-3 py-2 text-sm rounded-md hover:bg-foreground/5"
              >
                Projects
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileProjects ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {mobileProjects && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    {projectsGroups.map((group) => (
                      <div key={group.heading} className="pt-2">
                        <p className="px-6 text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-1">
                          {group.heading}
                        </p>
                        {group.links.map((link) => (
                          <Link
                            key={link.to}
                            to={link.to}
                            className={`block px-6 py-2 text-sm rounded-md hover:bg-foreground/5 ${
                              location.pathname === link.to
                                ? 'text-foreground'
                                : 'text-muted-foreground'
                            }`}
                          >
                            {link.label}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Resources */}
              <button
                onClick={() => setMobileResources((p) => !p)}
                className="flex items-center justify-between px-3 py-2 text-sm rounded-md hover:bg-foreground/5 mt-1"
              >
                Resources
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileResources ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {mobileResources && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    {resourcesLinks.map((link) => (
                      <Link
                        key={link.to}
                        to={link.to}
                        className={`block px-6 py-2 text-sm rounded-md hover:bg-foreground/5 ${
                          location.pathname === link.to ? 'text-foreground' : 'text-muted-foreground'
                        }`}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              <Link to="/about" className="px-3 py-2 text-sm rounded-md hover:bg-foreground/5 mt-1">
                About
              </Link>
              <Link to="/contact" className="px-3 py-2 text-sm rounded-md hover:bg-foreground/5">
                Contact
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
