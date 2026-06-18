import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CleanLayout from '@/components/CleanLayout';
import Breadcrumbs from '@/components/Breadcrumbs';
import SEO from '@/components/SEO';

const Orcha = () => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: 'ORCHA — Orchestration engine for modular AI',
    author: { '@type': 'Organization', name: 'LocalHouseLLM' },
    publisher: { '@type': 'Organization', name: 'LocalHouseLLM' },
    url: 'https://localhousellm.com/stack/orcha',
  };

  return (
    <CleanLayout>
      <SEO
        title="ORCHA — The Orchestration Engine of the LocalHouseLLM Stack"
        description="ORCHA is the orchestration engine inside the LocalHouseLLM modular AI stack. It decomposes requests, routes work to expert modules, aggregates results, and applies verification — turning a fleet of specialized models into a single coherent system."
        canonical="https://localhousellm.com/stack/orcha"
        keywords="ORCHA, AI orchestration, AI orchestration engine, modular AI orchestration, LocalHouseLLM ORCHA, AI routing, AI decomposition, multi-agent orchestration"
        schema={schema}
      />
      <Breadcrumbs items={[{ name: 'Stack', to: '/stack' }, { name: 'ORCHA' }]} />

      <article className="pt-10 pb-20">
        <div className="max-container max-w-3xl">
          <p className="text-[11px] tracking-[0.25em] uppercase text-muted-foreground mb-5">Orchestration layer</p>
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight leading-[1.05] mb-8">ORCHA</h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6">
            ORCHA is the orchestration engine at the centre of the LocalHouseLLM stack. It is the layer that decides what should happen, in what order, by which expert, and how to put the pieces back together.
          </p>
          <p className="text-base text-muted-foreground leading-relaxed mb-12">
            A modern AI request is rarely one thing. It is a question, a retrieval, a calculation, a synthesis, and a verification — often interleaved. ORCHA makes those steps explicit so they can be inspected, retried, and improved.
          </p>

          <h2 className="text-2xl md:text-3xl font-semibold mb-5">The orchestration loop</h2>
          <ol className="space-y-3 text-muted-foreground mb-12 list-decimal pl-6">
            <li><strong className="text-foreground">Decompose.</strong> Break the request into typed sub-tasks.</li>
            <li><strong className="text-foreground">Route.</strong> Match each sub-task to the most capable available module, using AICL capability advertisements.</li>
            <li><strong className="text-foreground">Execute.</strong> Run sub-tasks in parallel where possible; respect dependency edges.</li>
            <li><strong className="text-foreground">Aggregate.</strong> Reconcile partial answers into a single coherent response.</li>
            <li><strong className="text-foreground">Evaluate.</strong> Score confidence, check verifier output, decide whether to ship or retry.</li>
            <li><strong className="text-foreground">Retry.</strong> Reroute, refine the prompt, or escalate to a stronger module — deterministically.</li>
          </ol>

          <h2 className="text-2xl md:text-3xl font-semibold mb-5">Why orchestration is not communication</h2>
          <p className="text-muted-foreground mb-4">It is tempting to treat &ldquo;the orchestrator&rdquo; and &ldquo;the protocol&rdquo; as one thing. They are not. <Link to="/stack/aicl" className="text-foreground underline underline-offset-4">AICL</Link> defines how messages move. ORCHA decides which messages to send, and what to do with the responses. Keeping these separate is what makes either of them upgradable in isolation.</p>
          <p className="text-muted-foreground mb-12">It is also what allows third-party orchestrators. Anyone can ship their own routing policy on top of AICL without forking the rest of the stack.</p>

          <h2 className="text-2xl md:text-3xl font-semibold mb-5">A 10-minute integration sketch</h2>
          <div className="p-6 rounded-xl border border-border/40 font-mono text-xs md:text-sm leading-relaxed bg-foreground/[0.02] mb-12 whitespace-pre">{`import { Orcha } from "@localhousellm/orcha";

const orcha = new Orcha({
  modules:  [retrieval, mathExpert, medicalExpert],
  memory:   userMemory,
  safety:   defaultVerifier,
});

const result = await orcha.handle({
  user:    "u_123",
  intent:  "answer.question",
  payload: { question: "..." },
});`}</div>

          <p className="text-muted-foreground mb-12">A full walk-through lives in the <Link to="/docs" className="text-foreground underline underline-offset-4">docs</Link>. Numbers for routing quality, latency, and confidence calibration are tracked on the <Link to="/benchmarks" className="text-foreground underline underline-offset-4">benchmarks page</Link>.</p>

          <div className="flex flex-wrap gap-3">
            <a href="https://github.com/LocalHouseLLM/orcha01" target="_blank" rel="noopener noreferrer">
              <Button className="bg-foreground text-background hover:bg-foreground/90 h-11 px-6">ORCHA on GitHub <ArrowRight className="w-4 h-4 ml-1" /></Button>
            </a>
            <Link to="/stack"><Button variant="outline" className="border-border bg-transparent h-11 px-6">Back to the stack</Button></Link>
          </div>
        </div>
      </article>
    </CleanLayout>
  );
};

export default Orcha;
