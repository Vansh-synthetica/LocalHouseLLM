import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CleanLayout from '@/components/CleanLayout';
import Breadcrumbs from '@/components/Breadcrumbs';
import SEO from '@/components/SEO';

const steps = [
  { n: '01', t: 'Read the mission', d: 'Understand why a modular, decentralized stack exists in the first place.', to: '/mission' },
  { n: '02', t: 'Tour the stack', d: 'Six layers, each with one job: communication, orchestration, memory, safety, tools, modules.', to: '/stack' },
  { n: '03', t: 'Skim the AICL spec', d: 'See the packet shape every module speaks. Most integrations start by reading one example.', to: '/stack/aicl' },
  { n: '04', t: 'Install the SDK', d: 'A few commands, and you have ORCHA running locally with a starter module.', to: '/docs' },
  { n: '05', t: 'Ship your first module', d: 'Implement the Module interface, register a capability, route real traffic through it.', to: '/docs' },
  { n: '06', t: 'Read the research', d: 'The architectural arguments live in the papers. Worth half an hour.', to: '/research' },
];

const Start = () => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'Start with LocalHouseLLM',
    description: 'A short guide to getting started with the LocalHouseLLM modular AI stack.',
    step: steps.map((s, i) => ({ '@type': 'HowToStep', position: i + 1, name: s.t, text: s.d, url: `https://localhousellm.com${s.to}` })),
  };

  return (
    <CleanLayout>
      <SEO
        title="Start Here — LocalHouseLLM"
        description="A short, ordered guide to getting started with LocalHouseLLM — the modular, decentralized AI stack. Read the mission, tour the stack, install the SDK, ship your first module."
        canonical="https://localhousellm.com/start"
        keywords="LocalHouseLLM getting started, start here, AI infrastructure quickstart, modular AI quickstart, ORCHA quickstart, AICL quickstart"
        schema={schema}
      />
      <Breadcrumbs items={[{ name: 'Start', to: '/start' }]} />

      <section className="pt-10 pb-16">
        <div className="max-container max-w-4xl">
          <p className="text-[11px] tracking-[0.25em] uppercase text-muted-foreground mb-5">Onramp</p>
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight leading-[1.05] mb-8">Start here.</h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Six short steps from never having heard of LocalHouseLLM to running your own module in production. Skim or follow in order.
          </p>
        </div>
      </section>

      <section className="border-t border-border/40 py-12 md:py-16">
        <div className="max-container max-w-4xl">
          <ol className="space-y-3">
            {steps.map((s) => (
              <li key={s.n}>
                <Link to={s.to} className="group flex items-start gap-6 p-6 rounded-xl border border-border/40 hover:border-border transition-colors">
                  <span className="font-mono text-xs text-muted-foreground pt-1 w-10 shrink-0">{s.n}</span>
                  <div className="flex-1">
                    <h2 className="text-lg font-semibold mb-1 flex items-center gap-2">
                      {s.t}
                      <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">{s.d}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-border/40 py-20">
        <div className="max-container max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-semibold mb-5">Why use this instead of manual orchestration?</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            You can wire prompts and function calls by hand. Many people do, and for a single-purpose script it is the right call. The moment you have more than one model, more than one user, or any audit requirement, the cost of doing it by hand compounds: routing logic gets reinvented, retries become folklore, observability is bolted on at the end, and safety is a paragraph in a system prompt.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-8">
            ORCHA is the routing, retry, evaluation, and verification you would eventually have to build — already designed, already typed, and open.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/docs"><Button className="bg-foreground text-background hover:bg-foreground/90 h-11 px-6">Docs <ArrowRight className="w-4 h-4 ml-1" /></Button></Link>
            <a href="https://github.com/LocalHouseLLM" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="border-border bg-transparent h-11 px-6">Contribute on GitHub</Button>
            </a>
          </div>
        </div>
      </section>
    </CleanLayout>
  );
};

export default Start;
