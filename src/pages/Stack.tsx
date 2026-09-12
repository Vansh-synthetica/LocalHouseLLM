import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CleanLayout from '@/components/CleanLayout';
import Breadcrumbs from '@/components/Breadcrumbs';
import SEO from '@/components/SEO';
import { Reveal, SectionIntro } from '@/components/system/Motion';
import {
  CommunicationVisual,
  ExecutionVisual,
  ContinuityVisual,
  VerificationVisual,
  CapabilityVisual,
  SpecializationVisual,
} from '@/components/system/StackVisuals';

const layers = [
  { to: '#aicl', tag: 'Communication', name: 'AICL', desc: 'A structured protocol that lets AI modules talk to each other clearly, safely, and predictably.' },
  { to: '#orcha', tag: 'Orchestration', name: 'ORCHA', desc: 'Decomposes requests, routes work across experts, and aggregates results into coherent answers.' },
  { to: '#memory', tag: 'Context', name: 'Memory', desc: 'A portable, user-owned context layer — your history travels with you across tools and sessions.' },
  { to: '#safety', tag: 'Verification', name: 'Safety', desc: 'Factual, logical, and policy checks at every step. Verification is a first-class layer, not an afterthought.' },
  { to: '#tools', tag: 'Actions', name: 'Tools', desc: 'A library of reusable, sandboxed actions: retrieval, calculation, code execution, and integrations.' },
  { to: '#modules', tag: 'Experts', name: 'Intelligence Modules', desc: 'Specialized expert models you can swap, extend, or upgrade independently of the rest of the system.' },
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
            <h1 className="mt-4 font-serif font-normal tracking-tight text-4xl md:text-6xl leading-[1.05] mb-8">
              The LocalHouseLLM stack.
            </h1>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6 max-w-3xl">
              Every layer here exists for one reason: to keep your AI on your machine, aware of your context, and
              working for you — not dependent on someone else's cloud.
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-6 max-w-3xl">
              Modern AI systems collapse too many concerns into a single monolithic model. LocalHouseLLM separates
              them. Each capability — communication, orchestration, memory, safety, tools, intelligence — is its
              own well-defined layer, with a clear contract and an open interface.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
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
                <a
                  href={l.to}
                  className="group grid grid-cols-[3rem_1fr] sm:grid-cols-[4rem_10rem_1fr_auto] items-baseline gap-x-4 gap-y-1 py-6 transition-colors hover:bg-foreground/[0.02]"
                >
                  <span className="text-xs text-muted-foreground font-mono">{String(i + 1).padStart(2, '0')}</span>
                  <span className="text-xs uppercase tracking-[0.14em] text-primary sm:col-start-2">{l.tag}</span>
                  <span className="col-span-2 sm:col-span-1 sm:col-start-3 font-display text-xl font-semibold text-foreground">
                    {l.name}
                  </span>
                  <span className="hidden sm:block col-start-4 self-center">
                    <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all rotate-90" />
                  </span>
                  <span className="col-span-2 sm:col-span-3 sm:col-start-2 text-sm text-muted-foreground leading-relaxed max-w-xl">
                    {l.desc}
                  </span>
                </a>
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

      {/* ---------- AICL ---------- */}
      <section id="aicl" className="border-t border-border py-20 md:py-28 scroll-mt-20">
        <div className="max-container max-w-3xl">
          <Reveal>
            <p className="technical-label">Communication layer</p>
            <h2 className="mt-4 font-serif font-normal tracking-tight text-3xl md:text-5xl leading-[1.05] mb-6">
              AICL
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-10">
              AICL — the Adaptive Inter-module Communication Language — is the protocol AI modules use to talk to
              each other inside the LocalHouseLLM stack. Every request, response, and capability advertisement
              moves as a structured AICL packet.
            </p>
          </Reveal>

          <Reveal className="mb-10">
            <CommunicationVisual />
          </Reveal>
          <Reveal>
            <p className="text-muted-foreground leading-relaxed mb-10">
              Free-form prompt strings are a fine interface for a chat box, but a terrible interface for an
              ecosystem. When orchestrators, experts, tools, and verifiers all need to interoperate, you need a
              contract — schemas, routing metadata, capability discovery, and traceable provenance. AICL is that
              contract.
            </p>

            <h3 className="font-display text-xl md:text-2xl font-semibold mb-4">What problem AICL solves</h3>
            <ul className="space-y-3 text-muted-foreground mb-10 list-disc pl-6">
              <li><strong className="text-foreground">Ambiguity.</strong> Strings can be interpreted a hundred ways. Packets cannot.</li>
              <li><strong className="text-foreground">Routing.</strong> Orchestrators need typed metadata to decide which module handles a task.</li>
              <li><strong className="text-foreground">Observability.</strong> Every exchange is loggable, replayable, and auditable.</li>
              <li><strong className="text-foreground">Capability discovery.</strong> Modules advertise what they can do — the orchestrator does not need to be told.</li>
              <li><strong className="text-foreground">Safety surface.</strong> Verification can inspect packets, not opaque text blobs.</li>
            </ul>

            <h3 className="font-display text-xl md:text-2xl font-semibold mb-4">What is inside a packet</h3>
            <div className="p-6 rounded-sm border border-border font-mono text-xs md:text-sm leading-relaxed bg-card mb-10 whitespace-pre overflow-x-auto">{`{
  "id":         "pkt_01H...",
  "from":       "orcha",
  "to":         "expert.medical",
  "intent":     "answer.question",
  "payload":    { "question": "...", "context_ref": "mem_..." },
  "constraints":{ "max_tokens": 1200, "must_cite": true },
  "trace":      { "request_id": "...", "parent": "..." },
  "policy":     ["pii.redact", "no.medical.advice"]
}`}</div>

            <p className="text-muted-foreground mb-3">
              AICL is the wire format; ORCHA (below) is the policy that decides what to send. Decoupling the two
              means an ORCHA upgrade does not break modules, and a new module does not require touching the
              orchestrator.
            </p>
            <p className="text-muted-foreground">
              The open-source reference implementation is on{' '}
              <a href="https://github.com/LocalHouseLLM/AICL" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-4">GitHub</a>,
              with a draft specification published alongside our{' '}
              <Link to="/archive" className="text-foreground underline underline-offset-4">research papers</Link>.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------- ORCHA ---------- */}
      <section id="orcha" className="border-t border-border py-20 md:py-28 scroll-mt-20">
        <div className="max-container max-w-3xl">
          <Reveal>
            <p className="technical-label">Orchestration layer</p>
            <h2 className="mt-4 font-serif font-normal tracking-tight text-3xl md:text-5xl leading-[1.05] mb-6">
              ORCHA
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-10">
              ORCHA is the orchestration engine at the centre of the stack — the layer that decides what should
              happen, in what order, by which expert, and how to put the pieces back together.
            </p>
          </Reveal>

          <Reveal className="mb-10">
            <ExecutionVisual />
          </Reveal>

          <Reveal>
            <ol className="space-y-3 text-muted-foreground mb-10 list-decimal pl-6">
              <li><strong className="text-foreground">Decompose.</strong> Break the request into typed sub-tasks.</li>
              <li><strong className="text-foreground">Route.</strong> Match each sub-task to the most capable available module, using AICL capability advertisements.</li>
              <li><strong className="text-foreground">Execute.</strong> Run sub-tasks in parallel where possible; respect dependency edges.</li>
              <li><strong className="text-foreground">Aggregate.</strong> Reconcile partial answers into a single coherent response.</li>
              <li><strong className="text-foreground">Evaluate.</strong> Score confidence, check verifier output, decide whether to ship or retry.</li>
              <li><strong className="text-foreground">Retry.</strong> Reroute, refine the prompt, or escalate to a stronger module — deterministically.</li>
            </ol>

            <h3 className="font-display text-xl md:text-2xl font-semibold mb-4">A 10-minute integration sketch</h3>
            <div className="p-6 rounded-sm border border-border font-mono text-xs md:text-sm leading-relaxed bg-card mb-10 whitespace-pre overflow-x-auto">{`import { Orcha } from "@localhousellm/orcha";

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

            <p className="text-muted-foreground">
              A full walk-through lives in the{' '}
              <Link to="/docs" className="text-foreground underline underline-offset-4">docs</Link>. The{' '}
              <a href="https://github.com/LocalHouseLLM/orcha01" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-4">
                ORCHA source
              </a>{' '}
              is open on GitHub.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------- Memory ---------- */}
      <section id="memory" className="border-t border-border py-20 md:py-28 scroll-mt-20">
        <div className="max-container max-w-3xl">
          <Reveal>
            <p className="technical-label">Context layer</p>
            <h2 className="mt-4 font-serif font-normal tracking-tight text-3xl md:text-5xl leading-[1.05] mb-6">
              Memory
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-10">
              The memory layer holds the context an AI system uses to be useful over time: preferences, past
              conversations, documents, relationships, decisions. In the LocalHouseLLM stack, that memory is
              portable and user-owned.
            </p>
          </Reveal>

          <Reveal className="mb-10">
            <ContinuityVisual />
          </Reveal>

          <Reveal>
            <p className="text-muted-foreground leading-relaxed mb-10">
              Memory lives in a store you control — local disk, your private cloud, or our reference Nomi service.
              Modules read it through a typed AICL request and a scoped capability grant. Nothing is implicitly
              retained, and nothing is shared without permission. The persona and identity surface built on top of
              this layer is called <strong className="text-foreground">Nomi</strong> — a user-controlled profile
              that carries your context, tone, and preferences wherever you use it.
            </p>

            <h3 className="font-display text-xl md:text-2xl font-semibold mb-4">Three properties that matter</h3>
            <ul className="space-y-3 text-muted-foreground list-disc pl-6">
              <li><strong className="text-foreground">Portability.</strong> The same memory plugs into different orchestrators, products, and devices.</li>
              <li><strong className="text-foreground">Ownership.</strong> The user — not a vendor — holds the keys and the export rights.</li>
              <li><strong className="text-foreground">Scoping.</strong> Every read is policy-checked. Memory is not a global mutable blob.</li>
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ---------- Safety ---------- */}
      <section id="safety" className="border-t border-border py-20 md:py-28 scroll-mt-20">
        <div className="max-container max-w-3xl">
          <Reveal>
            <p className="technical-label">Verification layer</p>
            <h2 className="mt-4 font-serif font-normal tracking-tight text-3xl md:text-5xl leading-[1.05] mb-6">
              Safety
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-10">
              Safety is not a system prompt. It is an explicit, inspectable layer every response passes through
              before it reaches a user.
            </p>
          </Reveal>

          <Reveal className="mb-10">
            <VerificationVisual />
          </Reveal>

          <Reveal>
            <p className="text-muted-foreground leading-relaxed mb-10">
              Because all module exchanges are typed AICL packets, the safety layer has something concrete to
              inspect: claims, citations, tool calls, policy tags, and provenance. Verification can be
              deterministic in places where models cannot.
            </p>

            <h3 className="font-display text-xl md:text-2xl font-semibold mb-4">Three checks, always on</h3>
            <ul className="space-y-3 text-muted-foreground mb-10 list-disc pl-6">
              <li><strong className="text-foreground">Factual.</strong> Claims are grounded in retrieved context, citations, or tool output — or flagged as unsupported.</li>
              <li><strong className="text-foreground">Logical.</strong> Multi-step reasoning is checked for internal consistency before it ships.</li>
              <li><strong className="text-foreground">Policy.</strong> Per-deployment rules — privacy, jurisdiction, domain restrictions — are enforced at packet level.</li>
            </ul>

            <p className="text-muted-foreground">
              The verification model is described in our research note on Shadow AMAI; see the{' '}
              <Link to="/archive" className="text-foreground underline underline-offset-4">research page</Link>.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------- Tools ---------- */}
      <section id="tools" className="border-t border-border py-20 md:py-28 scroll-mt-20">
        <div className="max-container max-w-3xl">
          <Reveal>
            <p className="technical-label">Actions layer</p>
            <h2 className="mt-4 font-serif font-normal tracking-tight text-3xl md:text-5xl leading-[1.05] mb-6">
              Tools
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-10">
              Models reason. Tools act. The tools layer is the library of reusable, sandboxed actions that
              intelligence modules call out to whenever they need to retrieve, compute, or change something in the
              real world.
            </p>
          </Reveal>

          <Reveal className="mb-10">
            <CapabilityVisual />
          </Reveal>

          <Reveal>
            <p className="text-muted-foreground leading-relaxed mb-10">
              Every tool ships with a typed schema, a permission scope, and a verification hook. Calls and
              responses flow through AICL, so tool use is loggable and auditable end-to-end.
            </p>

            <h3 className="font-display text-xl md:text-2xl font-semibold mb-4">Built-in categories</h3>
            <ul className="space-y-3 text-muted-foreground list-disc pl-6">
              <li><strong className="text-foreground">Retrieval.</strong> Vector and keyword search across local and remote corpora.</li>
              <li><strong className="text-foreground">Computation.</strong> Sandboxed code and math execution.</li>
              <li><strong className="text-foreground">Integration.</strong> Typed connectors for files, calendars, databases, and APIs.</li>
              <li><strong className="text-foreground">Observation.</strong> Read-only probes against external systems for grounded answers.</li>
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ---------- Modules ---------- */}
      <section id="modules" className="border-t border-border py-20 md:py-28 scroll-mt-20">
        <div className="max-container max-w-3xl">
          <Reveal>
            <p className="technical-label">Experts layer</p>
            <h2 className="mt-4 font-serif font-normal tracking-tight text-3xl md:text-5xl leading-[1.05] mb-6">
              Intelligence Modules
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-10">
              An intelligence module is a single, focused expert: a model (or a small system of models)
              responsible for one well-scoped capability. A medical reasoner. A code synthesizer. A
              retrieval-augmented summariser. A planner.
            </p>
          </Reveal>

          <Reveal className="mb-10">
            <SpecializationVisual />
          </Reveal>

          <Reveal>
            <p className="text-muted-foreground leading-relaxed mb-10">
              Because every module exposes itself through the same AICL capability contract, the orchestrator can
              swap one implementation for another without rewriting the system around it. A small local model
              today, a fine-tuned domain expert tomorrow.
            </p>

            <h3 className="font-display text-xl md:text-2xl font-semibold mb-4">Why specialization wins</h3>
            <ul className="space-y-3 text-muted-foreground mb-10 list-disc pl-6">
              <li><strong className="text-foreground">Cheaper inference.</strong> Activate only what a task needs.</li>
              <li><strong className="text-foreground">Better accuracy.</strong> Domain-tuned experts beat generalists in their domain.</li>
              <li><strong className="text-foreground">Independent evolution.</strong> Upgrade or retire a module without a system rewrite.</li>
              <li><strong className="text-foreground">Auditability.</strong> Provenance is per-module, not lost inside a monolith.</li>
            </ul>

            <p className="text-muted-foreground">
              See the <Link to="/archive" className="text-foreground underline underline-offset-4">Adaptive Modular AI paper</Link>{' '}
              for the architectural argument, and{' '}
              <Link to="/anvira" className="text-foreground underline underline-offset-4">Anvira</Link> for the
              reference product that ships modules end-to-end.
            </p>
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
              <a href="https://github.com/LocalHouseLLM" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="rounded-sm h-11 px-6">
                  GitHub
                </Button>
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </CleanLayout>
  );
};

export default Stack;
