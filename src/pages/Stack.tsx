import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CleanLayout from '@/components/CleanLayout';
import Breadcrumbs from '@/components/Breadcrumbs';
import SEO from '@/components/SEO';
import { Reveal, SectionIntro } from '@/components/system/Motion';

const layers = [
  { to: '/stack/aicl', tag: 'Communication', name: 'AICL', desc: 'A structured protocol that lets AI modules talk to each other clearly, safely, and predictably.' },
  { to: '/stack/orcha', tag: 'Orchestration', name: 'ORCHA', desc: 'Decomposes requests, routes work across experts, and aggregates results into coherent answers.' },
  { to: '/stack/memory', tag: 'Context', name: 'Memory', desc: 'A portable, user-owned context layer — your history travels with you across tools and sessions.' },
  { to: '/stack/safety', tag: 'Verification', name: 'Safety', desc: 'Factual, logical, and policy checks at every step. Verification is a first-class layer, not an afterthought.' },
  { to: '/stack/tools', tag: 'Actions', name: 'Tools', desc: 'A library of reusable, sandboxed actions: retrieval, calculation, code execution, and integrations.' },
  { to: '/stack/modules', tag: 'Experts', name: 'Intelligence Modules', desc: 'Specialized expert models you can swap, extend, or upgrade independently of the rest of the system.' },
];

const chain = [
  { name: 'AICL', role: 'the messages that move between every module' },
  { name: 'ORCHA', role: 'decides what happens, in what order, by whom' },
  { name: 'NOMI / Memory', role: 'the context a request can read from' },
  { name: 'Safety', role: 'the checks a response has to pass before it ships' },
  { name: 'Tools', role: 'the actions a module can reach for' },
  { name: 'Modules', role: 'the experts that actually do the reasoning' },
  { name: 'Applications', role: 'Anvira and everything built on top' },
];

const Stack = () => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: 'The LocalHouseLLM Stack — Modular AI Architecture',
    about: 'Modular AI infrastructure',
    author: { '@type': 'Organization', name: 'LocalHouseLLM' },
    publisher: { '@type': 'Organization', name: 'LocalHouseLLM' },
    url: 'https://localhousellm.com/stack',
  };

  return (
    <CleanLayout>
      <SEO
        title="The LocalHouseLLM Stack — Modular AI Architecture"
        description="A complete overview of the LocalHouseLLM modular AI stack: AICL communication, ORCHA orchestration, memory, safety, tools, and intelligence modules — the open infrastructure for decentralized AI."
        canonical="https://localhousellm.com/stack"
        keywords="LocalHouseLLM stack, modular AI architecture, AICL, ORCHA, AI orchestration, AI communication layer, AI memory, AI safety, intelligence modules, decentralized AI infrastructure"
        schema={schema}
      />
      <Breadcrumbs items={[{ name: 'Stack', to: '/stack' }]} />

      <section className="pt-10 pb-20 md:pb-28">
        <div className="max-container max-w-4xl">
          <Reveal>
            <p className="technical-label">Architecture</p>
            <h1 className="mt-4 font-display font-semibold tracking-tight text-4xl md:text-6xl leading-[1.05] mb-8">
              The LocalHouseLLM stack.
            </h1>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6 max-w-3xl">
              Modern AI systems collapse too many concerns into a single monolithic model. LocalHouseLLM separates
              them. Each capability — communication, orchestration, memory, safety, tools, intelligence — is its
              own well-defined layer, with a clear contract and an open interface.
            </p>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl">
              The result is infrastructure you can inspect, replace, and own. Swap a memory backend. Plug in a
              domain-specific expert. Run on local hardware or in your private cloud. The stack stays the same.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-border py-16 md:py-24">
        <div className="max-container">
          <SectionIntro kicker="The six layers" title="Read top to bottom, or jump straight to what you need." />
          <div className="mt-14 divide-y divide-border border-t border-b border-border">
            {layers.map((l, i) => (
              <Reveal key={l.to} delay={i * 0.04}>
                <Link
                  to={l.to}
                  className="group grid grid-cols-[3rem_1fr] sm:grid-cols-[4rem_10rem_1fr_auto] items-baseline gap-x-4 gap-y-1 py-6 transition-colors hover:bg-foreground/[0.02]"
                >
                  <span className="text-xs text-muted-foreground font-mono">{String(i + 1).padStart(2, '0')}</span>
                  <span className="text-xs uppercase tracking-[0.14em] text-primary sm:col-start-2">{l.tag}</span>
                  <span className="col-span-2 sm:col-span-1 sm:col-start-3 font-display text-xl font-semibold text-foreground">
                    {l.name}
                  </span>
                  <span className="hidden sm:block col-start-4 self-center">
                    <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </span>
                  <span className="col-span-2 sm:col-span-3 sm:col-start-2 text-sm text-muted-foreground leading-relaxed max-w-xl">
                    {l.desc}
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border py-16 md:py-24">
        <div className="max-container max-w-3xl">
          <SectionIntro kicker="How it fits together" title="A living system, not a flowchart." />

          <div className="mt-10 space-y-5 text-muted-foreground leading-relaxed">
            <p>
              A request enters the system. <strong className="text-foreground">ORCHA</strong> decomposes it into
              sub-tasks and decides which experts should handle each. It speaks to those experts using{' '}
              <strong className="text-foreground">AICL</strong> — a structured packet format so every exchange is
              observable and routable.
            </p>
            <p>
              Each expert call may read from <strong className="text-foreground">Memory</strong> (your portable
              context) or invoke a <strong className="text-foreground">Tool</strong> (retrieval, calculation, code
              execution). Before any response returns to the user, the{' '}
              <strong className="text-foreground">Safety</strong> layer applies factual, logical, and policy
              checks.
            </p>
            <p>
              The experts themselves — <strong className="text-foreground">Intelligence Modules</strong> — are
              independently swappable. A small local model, a fine-tuned domain expert, or a hosted frontier model
              can fill the same slot. The protocol does not care which.
            </p>
          </div>

          <Reveal className="mt-14" delay={0.1}>
            <div className="space-y-0">
              {chain.map((c, i) => (
                <div key={c.name} className="flex gap-5">
                  <div className="flex flex-col items-center">
                    <span className="h-2 w-2 rounded-full bg-primary shrink-0" />
                    {i < chain.length - 1 && <span className="w-px flex-1 bg-border" />}
                  </div>
                  <div className={i < chain.length - 1 ? 'pb-8' : ''}>
                    <span className="font-display text-lg font-semibold text-foreground">{c.name}</span>
                    <p className="text-sm text-muted-foreground mt-0.5">{c.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-border py-20 md:py-28">
        <div className="max-container max-w-3xl">
          <Reveal>
            <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-tight mb-5">
              Build on the stack.
            </h2>
            <p className="text-muted-foreground mb-8">
              The Docs walk through installation, integration, and your first module.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/docs">
                <Button className="rounded-sm bg-foreground text-background hover:bg-primary hover:text-primary-foreground h-11 px-6">
                  Read the docs <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
              <Link to="/start">
                <Button variant="outline" className="rounded-sm h-11 px-6">
                  Start here
                </Button>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </CleanLayout>
  );
};

export default Stack;
