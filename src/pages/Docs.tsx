import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CleanLayout from '@/components/CleanLayout';
import Breadcrumbs from '@/components/Breadcrumbs';
import SEO from '@/components/SEO';

const sections = [
  {
    heading: 'Quickstart',
    body: 'Install the SDK, instantiate ORCHA, register a module, and send your first AICL packet — about ten minutes end-to-end.',
    code: `npm install @localhousellm/orcha @localhousellm/aicl

import { Orcha } from "@localhousellm/orcha";
const orcha = new Orcha({ modules: [helloModule] });
await orcha.handle({ intent: "echo", payload: { text: "hi" } });`,
  },
  {
    heading: 'Installation',
    body: 'SDKs ship for Node and Python. Both speak the same AICL wire format, so mixed-language deployments are first-class.',
    code: `# Python\npip install localhousellm-orcha\n\n# Node\nnpm install @localhousellm/orcha`,
  },
  {
    heading: 'API reference',
    body: 'The full surface — Orcha, Module, Memory, Tool, Verifier — is documented per method, with request and response schemas pulled directly from the AICL spec.',
  },
  {
    heading: 'Config reference',
    body: 'Every layer is configurable: routing policy, retry budgets, memory backend, safety thresholds, telemetry sinks. Configuration is typed and validated at startup.',
  },
  {
    heading: 'Build a custom expert',
    body: 'Implement the Module interface, declare your capabilities, and register with an Orcha instance. The orchestrator routes matching intents to you automatically.',
    code: `export const myExpert: Module = {
  name: "expert.myDomain",
  capabilities: ["answer.myDomain"],
  async handle(packet) { /* ... */ },
};`,
  },
  {
    heading: 'Integrations',
    body: 'First-party connectors for vector databases, object storage, identity providers, and observability stacks. Anything else can be wrapped as a Tool in a few lines.',
  },
];

const Docs = () => (
  <CleanLayout>
    <SEO
      title="Docs — LocalHouseLLM Developer Documentation"
      description="Developer documentation for the LocalHouseLLM modular AI stack: quickstart, installation, API reference, config reference, custom expert guide, and integrations."
      canonical="https://localhousellm.com/docs"
      keywords="LocalHouseLLM docs, ORCHA documentation, AICL documentation, modular AI SDK, AI orchestration SDK, AI developer documentation"
      schema={{ '@context': 'https://schema.org', '@type': 'TechArticle', headline: 'LocalHouseLLM Developer Documentation', author: { '@type': 'Organization', name: 'LocalHouseLLM' }, url: 'https://localhousellm.com/docs' }}
    />
    <Breadcrumbs items={[{ name: 'Docs', to: '/docs' }]} />

    <section className="pt-10 pb-12">
      <div className="max-container max-w-4xl">
        <p className="text-[11px] tracking-[0.25em] uppercase text-muted-foreground mb-5">Documentation</p>
        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight leading-[1.05] mb-8">Docs</h1>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-4">
          You're building AI that lives on the user's machine, remembers their context, and works for them — not
          one more thing running in someone else's cloud.
        </p>
        <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
          The LocalHouseLLM stack is open infrastructure. These docs are how you build on it. Some sections are still being written — references to the open-source repositories are linked throughout for current source-of-truth.
        </p>
      </div>
    </section>

    <section className="border-t border-border/40 py-12 md:py-16">
      <div className="max-container max-w-4xl space-y-12">
        {sections.map((s) => (
          <article key={s.heading} id={s.heading.toLowerCase().replace(/\s+/g, '-')}>
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">{s.heading}</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">{s.body}</p>
            {s.code && (
              <pre className="p-5 rounded-xl border border-border/40 font-mono text-xs md:text-sm leading-relaxed bg-foreground/[0.02] whitespace-pre overflow-x-auto">{s.code}</pre>
            )}
          </article>
        ))}
      </div>
    </section>

    <section className="border-t border-border/40 py-20">
      <div className="max-container max-w-3xl">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-5">Where to go next.</h2>
        <div className="flex flex-wrap gap-3">
          <Link to="/start"><Button className="bg-foreground text-background hover:bg-foreground/90 h-11 px-6">Start here <ArrowRight className="w-4 h-4 ml-1" /></Button></Link>
          <Link to="/stack"><Button variant="outline" className="border-border bg-transparent h-11 px-6">The stack</Button></Link>
          <a href="https://github.com/LocalHouseLLM" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" className="border-border bg-transparent h-11 px-6">GitHub</Button>
          </a>
        </div>
      </div>
    </section>
  </CleanLayout>
);

export default Docs;
