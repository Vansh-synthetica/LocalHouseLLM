import { Link } from 'react-router-dom';
import CleanLayout from '@/components/CleanLayout';
import SEO from '@/components/SEO';

type Entry = { to: string; label: string; desc?: string };
type Group = { heading: string; items: Entry[] };

const groups: Group[] = [
  {
    heading: 'Company',
    items: [
      { to: '/', label: 'Home', desc: 'Open, modular infrastructure for decentralized AI.' },
      { to: '/mission', label: 'Mission', desc: 'Why LocalHouseLLM exists and what we believe.' },
      { to: '/vision', label: 'Vision', desc: 'Where decentralized, modular AI is going.' },
      { to: '/about', label: 'About', desc: 'The team and the work behind LocalHouseLLM.' },
      { to: '/contact', label: 'Contact', desc: 'Get in touch with the LocalHouseLLM team.' },
    ],
  },
  {
    heading: 'Research',
    items: [
      { to: '/archive', label: 'Research', desc: 'Papers on modular, adaptive, decentralized AI.' },
      { to: '/benchmarks', label: 'Benchmarks', desc: 'Latency, cost, and reliability measurements.' },
      { to: '/release-logs', label: 'Release Logs', desc: 'Updates across the LocalHouseLLM stack.' },
    ],
  },
  {
    heading: 'Stack',
    items: [
      { to: '/stack', label: 'Stack overview', desc: 'The full modular AI architecture.' },
      { to: '/stack/aicl', label: 'AICL', desc: 'The communication layer between modules.' },
      { to: '/stack/orcha', label: 'ORCHA', desc: 'The orchestration engine.' },
      { to: '/stack/memory', label: 'Memory', desc: 'Portable, user-owned context.' },
      { to: '/stack/safety', label: 'Safety', desc: 'Verification and policy checks.' },
      { to: '/stack/tools', label: 'Tools', desc: 'Reusable, sandboxed actions.' },
      { to: '/stack/modules', label: 'Intelligence Modules', desc: 'Specialized, swappable experts.' },
    ],
  },
  {
    heading: 'Projects',
    items: [
      { to: '/anvira', label: 'Anvira', desc: 'Local-first modular AI workspace.' },
      { to: '/nomi', label: 'Nomi', desc: 'User-owned AI persona and memory infrastructure.' },
      { to: '/products', label: 'All products', desc: 'Everything built on the LocalHouseLLM stack.' },
    ],
  },
  {
    heading: 'Resources',
    items: [
      { to: '/docs', label: 'Docs', desc: 'Technical documentation hub.' },
      { to: '/start', label: 'Start here', desc: 'Installation, integration, first module.' },
      { to: '/use-cases', label: 'Use cases', desc: 'Where modular local AI applies.' },
      { to: '/faq', label: 'FAQ', desc: 'Common questions, answered directly.' },
      { to: '/work-with-us', label: 'Work with us', desc: 'Consulting and infrastructure partnerships.' },
    ],
  },
];

const Sitemap = () => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Sitemap — LocalHouseLLM',
    url: 'https://localhousellm.com/sitemap',
    description:
      'A human-readable sitemap of every public page on LocalHouseLLM — mission, research, projects, and resources.',
  };

  return (
    <CleanLayout>
      <SEO
        title="Sitemap — LocalHouseLLM | All Pages, Research, and Projects"
        description="Human-readable sitemap of LocalHouseLLM — mission, research, open source, and all projects including Anvira and Nomi."
        canonical="https://localhousellm.com/sitemap"
        keywords="LocalHouseLLM sitemap, site index, pages, decentralized AI, modular AI"
        schema={schema}
      />

      <section className="pt-12 md:pt-24 pb-12">
        <div className="max-container max-w-4xl">
          <p className="text-[11px] tracking-[0.25em] uppercase text-muted-foreground mb-5">Sitemap</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight leading-[1.05] mb-6">
            Every page on LocalHouseLLM.
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
            A human-readable index of our public site — research, projects, and resources. Looking
            for the machine-readable version? It lives at{' '}
            <a href="/sitemap.xml" className="text-foreground underline underline-offset-4">
              /sitemap.xml
            </a>
            .
          </p>
        </div>
      </section>

      <section className="border-t border-border/40 py-16 md:py-20">
        <div className="max-container">
          <div className="grid md:grid-cols-3 gap-10 md:gap-12">
            {groups.map((g) => (
              <nav key={g.heading} aria-label={g.heading}>
                <h2 className="text-[11px] tracking-[0.25em] uppercase text-muted-foreground mb-5">
                  {g.heading}
                </h2>
                <ul className="space-y-4">
                  {g.items.map((it) => (
                    <li key={it.to}>
                      <Link
                        to={it.to}
                        className="group block border-l border-border/40 pl-4 hover:border-foreground transition-colors"
                      >
                        <div className="text-base font-semibold text-foreground group-hover:underline underline-offset-4">
                          {it.label}
                        </div>
                        {it.desc && (
                          <div className="text-sm text-muted-foreground mt-1 leading-relaxed">
                            {it.desc}
                          </div>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>
      </section>
    </CleanLayout>
  );
};

export default Sitemap;
