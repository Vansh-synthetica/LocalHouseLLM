import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import CleanLayout from '@/components/CleanLayout';
import Breadcrumbs from '@/components/Breadcrumbs';
import SEO from '@/components/SEO';

const dimensions = [
  { name: 'Latency', desc: 'End-to-end time from request to verified response, broken out by orchestrator overhead, module inference, and verification.' },
  { name: 'Cost', desc: 'Cost per successful, verified response. Modular routing avoids paying frontier-model prices for tasks a small expert can handle.' },
  { name: 'Reliability', desc: 'Rate at which the orchestrator returns a verified response without escalation, retry, or fallback to a generic model.' },
  { name: 'Confidence calibration', desc: 'How well stated confidence tracks actual correctness — the gap between "the model says it is sure" and "the model is actually right".' },
  { name: 'Routing quality', desc: 'Fraction of requests routed to the most-appropriate available expert on the first pass.' },
];

const Benchmarks = () => (
  <CleanLayout>
    <SEO
      title="Benchmarks — LocalHouseLLM"
      description="How we measure the LocalHouseLLM modular AI stack: latency, cost, reliability, confidence calibration, and routing quality. Methodology, dimensions, and published results."
      canonical="https://localhousellm.lovable.app/benchmarks"
      keywords="LocalHouseLLM benchmarks, modular AI benchmarks, AI orchestration benchmarks, AI latency, AI cost per response, AI reliability, ORCHA benchmarks"
      schema={{ '@context': 'https://schema.org', '@type': 'Dataset', name: 'LocalHouseLLM Benchmarks', description: 'Methodology and published results for the LocalHouseLLM modular AI stack.', url: 'https://localhousellm.com/benchmarks', creator: { '@type': 'Organization', name: 'LocalHouseLLM' } }}
    />
    <Breadcrumbs items={[{ name: 'Benchmarks', to: '/benchmarks' }]} />

    <section className="pt-10 pb-12">
      <div className="max-container max-w-4xl">
        <p className="text-[11px] tracking-[0.25em] uppercase text-muted-foreground mb-5">Measurement</p>
        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight leading-[1.05] mb-8">Benchmarks</h1>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6">
          A modular stack only earns the claim of being better if it is measured honestly. This page documents what we measure, how, and where to find the published results as they land.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          We do not publish a single headline number. Different deployments — local hardware, private cloud, mixed-expert routing — produce different curves, and a single average hides more than it reveals.
        </p>
      </div>
    </section>

    <section className="border-t border-border/40 py-16">
      <div className="max-container max-w-4xl">
        <h2 className="text-2xl md:text-3xl font-semibold mb-8">What we measure</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {dimensions.map((d) => (
            <div key={d.name} className="p-6 rounded-xl border border-border/40">
              <h3 className="text-base font-semibold mb-2">{d.name}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{d.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="border-t border-border/40 py-16">
      <div className="max-container max-w-3xl">
        <h2 className="text-2xl md:text-3xl font-semibold mb-5">Methodology</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">Each benchmark is run against a fixed task set, with the same prompts, the same memory snapshot, and the same module roster. The orchestrator records every AICL packet, so every reported number is reproducible from the trace.</p>
        <p className="text-muted-foreground leading-relaxed mb-4">Comparisons against monolithic baselines are run with both systems given equal access to the same retrieval and tool layers, so we are measuring orchestration and modularity — not unfair access asymmetries.</p>
        <p className="text-muted-foreground leading-relaxed">Results and the underlying methodology will be published alongside each Anvira and ORCHA release. The latest writeups live on the <Link to="/research" className="text-foreground underline underline-offset-4">research page</Link>.</p>
      </div>
    </section>

    <section className="border-t border-border/40 py-20">
      <div className="max-container max-w-3xl">
        <h2 className="text-2xl md:text-3xl font-semibold mb-5">Follow along.</h2>
        <div className="flex flex-wrap gap-3">
          <Link to="/release-logs"><Button className="bg-foreground text-background hover:bg-foreground/90 h-11 px-6">Release logs</Button></Link>
          <Link to="/research"><Button variant="outline" className="border-border bg-transparent h-11 px-6">Research</Button></Link>
        </div>
      </div>
    </section>
  </CleanLayout>
);

export default Benchmarks;
