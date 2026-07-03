import { Link } from 'react-router-dom';

const linkClass =
  'text-muted-foreground hover:text-foreground transition-colors duration-200';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-border/60 bg-background/40 backdrop-blur-xl">
      <div className="max-container py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
          <div className="col-span-2 space-y-5">
            <Link to="/" className="inline-flex items-center gap-2.5" aria-label="LocalHouseLLM home">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent text-primary-foreground font-display text-lg leading-none">
                \
              </span>
              <span className="font-display text-base font-semibold tracking-tight text-foreground">
                LocalHouseLLM
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              Open, modular infrastructure for decentralized AI — AICL, ORCHA, memory,
              safety, tools, and intelligence modules for a local-first future.
            </p>
            <div className="flex gap-4 pt-1">
              <a href="https://github.com/LocalHouseLLM" target="_blank" rel="noopener noreferrer" className={linkClass} aria-label="LocalHouseLLM on GitHub">GitHub</a>
              <a href="https://x.com/localhousellm" target="_blank" rel="noopener noreferrer" className={linkClass} aria-label="LocalHouseLLM on X">X</a>
              <a href="https://www.linkedin.com/company/localhousellm" target="_blank" rel="noopener noreferrer" className={linkClass} aria-label="LocalHouseLLM on LinkedIn">LinkedIn</a>
              <a href="https://www.instagram.com/localhousellm/" target="_blank" rel="noopener noreferrer" className={linkClass} aria-label="LocalHouseLLM on Instagram">Instagram</a>
            </div>
          </div>

          <nav className="space-y-4" aria-label="Stack">
            <h4 className="text-xs font-display font-semibold tracking-[0.15em] uppercase text-foreground">Stack</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/stack" className={linkClass}>Overview</Link></li>
              <li><Link to="/stack/aicl" className={linkClass}>AICL</Link></li>
              <li><Link to="/stack/orcha" className={linkClass}>ORCHA</Link></li>
              <li><Link to="/stack/memory" className={linkClass}>Memory</Link></li>
              <li><Link to="/stack/safety" className={linkClass}>Safety</Link></li>
              <li><Link to="/stack/tools" className={linkClass}>Tools</Link></li>
              <li><Link to="/stack/modules" className={linkClass}>Modules</Link></li>
            </ul>
          </nav>

          <nav className="space-y-4" aria-label="Products and build">
            <h4 className="text-xs font-display font-semibold tracking-[0.15em] uppercase text-foreground">Build</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/products" className={linkClass}>All products</Link></li>
              <li><Link to="/anvira" className={linkClass}>Anvira</Link></li>
              <li><Link to="/nomi" className={linkClass}>Nomi</Link></li>
              <li><Link to="/inkflow" className={linkClass}>InkFlow</Link></li>
              <li><Link to="/devquill" className={linkClass}>DevQuill</Link></li>
              <li><Link to="/docs" className={linkClass}>Docs</Link></li>
              <li><Link to="/start" className={linkClass}>Start here</Link></li>
            </ul>
          </nav>

          <nav className="space-y-4" aria-label="Company">
            <h4 className="text-xs font-display font-semibold tracking-[0.15em] uppercase text-foreground">Company</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/mission" className={linkClass}>Mission</Link></li>
              <li><Link to="/vision" className={linkClass}>Vision</Link></li>
              <li><Link to="/research" className={linkClass}>Research</Link></li>
              <li><Link to="/benchmarks" className={linkClass}>Benchmarks</Link></li>
              <li><Link to="/use-cases" className={linkClass}>Use cases</Link></li>
              <li><Link to="/work-with-us" className={linkClass}>Work with us</Link></li>
              <li><Link to="/release-logs" className={linkClass}>Release logs</Link></li>
              <li><Link to="/faq" className={linkClass}>FAQ</Link></li>
              <li><Link to="/about" className={linkClass}>About</Link></li>
              <li><Link to="/contact" className={linkClass}>Contact</Link></li>
              <li><Link to="/sitemap" className={linkClass}>Sitemap</Link></li>
            </ul>
          </nav>
        </div>

        <div className="mt-14 pt-8 border-t border-border/60 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-xs text-muted-foreground">
          <p>© {currentYear} LocalHouseLLM. Open, modular infrastructure for decentralized AI.</p>
          <p className="tracking-wide">Built with intention. Local-first by design.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
