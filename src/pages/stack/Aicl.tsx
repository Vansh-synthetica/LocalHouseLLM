import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CleanLayout from '@/components/CleanLayout';
import Breadcrumbs from '@/components/Breadcrumbs';
import SEO from '@/components/SEO';
import { Reveal } from '@/components/system/Motion';
import { CommunicationVisual } from '@/components/system/StackVisuals';

const Aicl = () => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: 'AICL — Adaptive Inter-module Communication Language',
    about: 'AI communication protocol',
    author: { '@type': 'Organization', name: 'LocalHouseLLM' },
    publisher: { '@type': 'Organization', name: 'LocalHouseLLM' },
    url: 'https://localhousellm.com/stack/aicl',
  };

  return (
    <CleanLayout>
      <SEO
        title="AICL — The Communication Layer of the LocalHouseLLM Stack"
        description="AICL (Adaptive Inter-module Communication Language) is a structured packet protocol that lets AI modules coordinate clearly, safely, and predictably across the LocalHouseLLM modular stack."
        canonical="https://localhousellm.com/stack/aicl"
        keywords="AICL, AI communication layer, AI protocol, inter-module communication, modular AI protocol, LocalHouseLLM AICL, adaptive inter-module communication language"
        schema={schema}
      />
      <Breadcrumbs items={[{ name: 'Stack', to: '/stack' }, { name: 'AICL' }]} />

      <article className="pt-10 pb-20">
        <div className="max-container max-w-5xl grid lg:grid-cols-[1fr_auto] gap-10 items-start mb-14">
          <Reveal>
            <p className="technical-label">Communication layer</p>
            <h1 className="mt-4 font-display font-semibold tracking-tight text-4xl md:text-6xl leading-[1.05] mb-8">
              AICL
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6 max-w-2xl">
              AICL — the Adaptive Inter-module Communication Language — is the protocol AI modules use to talk to
              each other inside the LocalHouseLLM stack. Every request, response, and capability advertisement
              moves as a structured AICL packet.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="hidden lg:block pt-8">
            <CommunicationVisual />
          </Reveal>
        </div>

        <div className="max-container max-w-3xl">
          <Reveal>
            <p className="text-base text-muted-foreground leading-relaxed mb-12">
              Free-form prompt strings are a fine interface for a chat box, but a terrible interface for an
              ecosystem. When orchestrators, experts, tools, and verifiers all need to interoperate, you need a
              contract — schemas, routing metadata, capability discovery, and traceable provenance. AICL is that
              contract.
            </p>
          </Reveal>

          <Reveal>
            <h2 className="font-display text-2xl md:text-3xl font-semibold mb-5">What problem AICL solves</h2>
            <ul className="space-y-3 text-muted-foreground mb-12 list-disc pl-6">
              <li><strong className="text-foreground">Ambiguity.</strong> Strings can be interpreted a hundred ways. Packets cannot.</li>
              <li><strong className="text-foreground">Routing.</strong> Orchestrators need typed metadata to decide which module handles a task.</li>
              <li><strong className="text-foreground">Observability.</strong> Every exchange is loggable, replayable, and auditable.</li>
              <li><strong className="text-foreground">Capability discovery.</strong> Modules advertise what they can do — the orchestrator does not need to be told.</li>
              <li><strong className="text-foreground">Safety surface.</strong> Verification can inspect packets, not opaque text blobs.</li>
            </ul>
          </Reveal>

          <Reveal>
            <h2 className="font-display text-2xl md:text-3xl font-semibold mb-5">What is inside a packet</h2>
            <div className="p-6 rounded-sm border border-border font-mono text-xs md:text-sm leading-relaxed bg-card mb-12 whitespace-pre overflow-x-auto">{`{
  "id":         "pkt_01H...",
  "from":       "orcha",
  "to":         "expert.medical",
  "intent":     "answer.question",
  "payload":    { "question": "...", "context_ref": "mem_..." },
  "constraints":{ "max_tokens": 1200, "must_cite": true },
  "trace":      { "request_id": "...", "parent": "..." },
  "policy":     ["pii.redact", "no.medical.advice"]
}`}</div>
          </Reveal>

          <Reveal>
            <h2 className="font-display text-2xl md:text-3xl font-semibold mb-5">How AICL fits underneath ORCHA</h2>
            <p className="text-muted-foreground mb-4">
              ORCHA is the policy: it decides what should happen. AICL is the wire format: it defines how that
              decision is expressed and transported. Decoupling the two means an ORCHA upgrade does not break
              modules, and a new module does not require touching the orchestrator.
            </p>
            <p className="text-muted-foreground mb-12">
              Read the orchestration side at{' '}
              <Link to="/stack/orcha" className="text-foreground underline underline-offset-4">ORCHA</Link>, and the
              safety inspection model at{' '}
              <Link to="/stack/safety" className="text-foreground underline underline-offset-4">Safety</Link>.
            </p>
          </Reveal>

          <Reveal>
            <h2 className="font-display text-2xl md:text-3xl font-semibold mb-5">Reference implementation</h2>
            <p className="text-muted-foreground mb-8">
              The open-source AICL reference is on GitHub. A draft specification is published alongside our{' '}
              <Link to="/archive" className="text-foreground underline underline-offset-4">research papers</Link>.
            </p>

            <div className="flex flex-wrap gap-3">
              <a href="https://github.com/LocalHouseLLM/AICL" target="_blank" rel="noopener noreferrer">
                <Button className="rounded-sm bg-foreground text-background hover:bg-primary hover:text-primary-foreground h-11 px-6">
                  View on GitHub <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </a>
              <Link to="/stack">
                <Button variant="outline" className="rounded-sm h-11 px-6">Back to the stack</Button>
              </Link>
            </div>
          </Reveal>
        </div>
      </article>
    </CleanLayout>
  );
};

export default Aicl;
