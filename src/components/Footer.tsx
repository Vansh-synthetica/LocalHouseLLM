import { Link } from 'react-router-dom';
import BrandMark from './system/BrandMark';

const linkClass =
  'text-muted-foreground hover:text-foreground transition-colors duration-200 text-[13px] leading-snug';

const FooterColumn = ({
  title,
  links,
  'aria-label': ariaLabel,
}: {
  title: string;
  links: { to: string; label: string; external?: boolean }[];
  'aria-label': string;
}) => (
  <nav className="space-y-4" aria-label={ariaLabel}>
    <h4 className="text-[11px] font-display font-semibold tracking-[0.14em] uppercase text-foreground">
      {title}
    </h4>
    <ul className="space-y-2.5">
      {links.map((item) => (
        <li key={item.label}>
          {item.external ? (
            <a href={item.to} target="_blank" rel="noopener noreferrer" className={linkClass}>
              {item.label}
            </a>
          ) : (
            <Link to={item.to} className={linkClass}>
              {item.label}
            </Link>
          )}
        </li>
      ))}
    </ul>
  </nav>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-8 border-t border-border bg-background">
      <div className="max-container py-16 lg:py-20">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-12 pb-14 border-b border-border/70">
          <div className="space-y-5 max-w-sm">
            <Link to="/" className="inline-flex items-center gap-2.5" aria-label="LocalHouseLLM home">
              <span className="inline-flex h-7 w-7 items-center justify-center text-foreground">
                <BrandMark />
              </span>
              <span className="font-display text-[13px] font-semibold tracking-[0.14em] uppercase text-foreground">
                LocalHouseLLM
              </span>
            </Link>
            <p className="text-[13px] text-muted-foreground leading-relaxed font-sans">
              Open, modular infrastructure for local and decentralized AI — built so intelligence
              can live on hardware you control.
            </p>
            <div className="flex flex-wrap gap-x-5 gap-y-2 pt-1">
              <a
                href="https://github.com/LocalHouseLLM"
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
                aria-label="GitHub"
              >
                GitHub
              </a>
              <a
                href="https://x.com/localhousellm"
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
                aria-label="X"
              >
                X
              </a>
              <a
                href="https://www.linkedin.com/company/localhousellm"
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
                aria-label="LinkedIn"
              >
                LinkedIn
              </a>
              <a
                href="https://www.instagram.com/localhousellm/"
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
                aria-label="Instagram"
              >
                Instagram
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-10 lg:gap-12 flex-1 lg:max-w-3xl lg:ml-auto">
            <FooterColumn
              aria-label="Products"
              title="Products"
              links={[
                { to: '/anvira', label: 'Anvira' },
                { to: '/anvira-notes', label: 'Anvira Notes' },
                { to: '/stack#memory', label: 'Nomi' },
                { to: '/docs', label: 'Get started' },
              ]}
            />
            <FooterColumn
              aria-label="Stack"
              title="Stack"
              links={[
                { to: '/stack', label: 'Overview' },
                { to: '/stack#aicl', label: 'AICL' },
                { to: '/stack#orcha', label: 'ORCHA' },
                { to: '/stack#memory', label: 'Memory' },
              ]}
            />
            <FooterColumn
              aria-label="Resources"
              title="Resources"
              links={[
                { to: '/docs', label: 'Developer docs' },
                { to: '/archive', label: 'Research' },
                { to: 'https://github.com/Vansh-synthetica/aicl', label: 'AICL Source', external: true },
                { to: '/faq', label: 'FAQ' },
              ]}
            />
            <FooterColumn
              aria-label="Company"
              title="Company"
              links={[
                { to: '/about', label: 'About' },
                { to: '/about#contact', label: 'Contact' },
                { to: '/about', label: 'Careers' },
                { to: 'https://github.com/LocalHouseLLM', label: 'GitHub', external: true },
              ]}
            />
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-[12px] text-muted-foreground font-sans">
          <p>© {currentYear} LocalHouseLLM</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link to="/faq" className={linkClass}>
              Help
            </Link>
            <a href="mailto:contact@localhousellm.com" className={linkClass}>
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
