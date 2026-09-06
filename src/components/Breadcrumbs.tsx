import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ChevronRight } from 'lucide-react';

export interface Crumb {
  name: string;
  to?: string;
}

interface BreadcrumbsProps {
  items: Crumb[];
}

const BASE = 'https://localhousellm.com';

const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
  const list = [{ name: 'Home', to: '/' }, ...items];

  const ld = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: list.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: c.to ? `${BASE}${c.to}` : undefined,
    })),
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(ld)}</script>
      </Helmet>
      <nav aria-label="Breadcrumb" className="max-container pt-6">
        <ol className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
          {list.map((c, i) => {
            const last = i === list.length - 1;
            return (
              <li key={`${c.name}-${i}`} className="flex items-center gap-1.5">
                {c.to && !last ? (
                  <Link to={c.to} className="hover:text-foreground transition-colors">
                    {c.name}
                  </Link>
                ) : (
                  <span className={last ? 'text-foreground' : ''}>{c.name}</span>
                )}
                {!last && <ChevronRight className="w-3 h-3 opacity-60" />}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
};

export default Breadcrumbs;
