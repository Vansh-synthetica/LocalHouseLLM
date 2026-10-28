import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CleanLayout from '@/components/CleanLayout';
import Breadcrumbs from '@/components/Breadcrumbs';
import SEO from '@/components/SEO';

const ORCHA_REPO = 'https://github.com/Vansh-synthetica/orcha';
const AICL_REPO = 'https://github.com/Vansh-synthetica/aicl';
const DISCORD_URL = 'https://discord.gg/URfnsy4Mt3';

type Block =
  | { kind: 'code'; text: string }
  | { kind: 'note'; text: string }
  | { kind: 'links'; links: { label: string; href: string }[] };

const sections: { heading: string; body: string; blocks?: Block[] }[] = [
  {
    heading: 'Quickstart',
    body: 'Install ORCHA, point it at a local model, and run a tool-using agent sandboxed to a folder: about ten minutes end to end.',
    blocks: [
      {
        kind: 'code',
        text: `pip install "localhousellm-orcha[local] @ git+https://github.com/Vansh-synthetica/orcha"
ollama pull qwen2.5:7b-instruct
git clone https://github.com/Vansh-synthetica/orcha
python orcha/examples/basic_agent.py "list the files in the current directory"`,
      },
      { kind: 'note', text: "Works with any OpenAI-compatible local server: Ollama, LM Studio, llama.cpp's llama-server or vLLM." },
    ],
  },
  {
    heading: 'Installation',
    body: "Both SDKs are Python 3.10+. Until they're published on PyPI, install them from GitHub.",
    blocks: [
      {
        kind: 'code',
        text: `# ORCHA: agent orchestration (core needs only pydantic; [local] adds httpx for local model servers)
pip install "localhousellm-orcha[local] @ git+https://github.com/Vansh-synthetica/orcha"

# AICL: the binary wire protocol (pure standard library)
pip install "localhousellm-aicl @ git+https://github.com/Vansh-synthetica/aicl"`,
      },
      { kind: 'note', text: 'ORCHA extras: [config] YAML configs, [pdf] PDF text extraction, [lang] LangGraph, [agents] Deep Agents, [eval] ragas, [obs] Phoenix/OpenTelemetry, [all] everything.' },
      { kind: 'note', text: "AICL's native transport needs its Rust core built (cd core-rust && cargo build --release). The pure-Python codec (aicl.bin, aicl.semantic) works without it." },
      { kind: 'note', text: 'Your first AICL packet:' },
      {
        kind: 'code',
        text: `from aicl import encode, decode, Packet
from aicl.bin.types import Symbol
from aicl.bin.symbol_types import S_STRING

wire = encode(Packet(symbols=[Symbol(S_STRING, "hello")]))
assert decode(wire).symbols[0].value == "hello"`,
      },
    ],
  },
  {
    heading: 'API reference',
    body: "The public surface is documented in each repo's README. ORCHA: orcha.core (OrchaPacket), orcha.graph (Graph, Node, GraphRuntime), orcha.capabilities (CapabilityRegistry, ToolExecutor, PermissionPolicy), orcha.nodes (AgentNode, ToolNode, IntentGateNode, RetrievalNode), orcha.builders.agent, orcha.experts, orcha.integrations, orcha.evaluation. AICL: aicl.bin, aicl.semantic, aicl.sdk, aicl.transport, aicl.sl.",
    blocks: [
      {
        kind: 'links',
        links: [
          { label: 'ORCHA', href: ORCHA_REPO },
          { label: 'AICL', href: AICL_REPO },
        ],
      },
    ],
  },
  {
    heading: 'Config reference',
    body: 'ORCHA is configured in code: tool permissions through PermissionPolicy (action, approval or partial modes), workspace roots through CapabilityContext, and model backends through your completion function or orcha.experts. YAML expert-registry configs are available with the [config] extra.',
  },
  {
    heading: 'Build a tool-using agent',
    body: 'Build a tool executor from the capability registry, sandboxed to your workspace, and hand it to the agent runner with your own completion function for any local model server.',
    blocks: [
      {
        kind: 'code',
        text: `from orcha.builders.agent import AgentGraphConfig, build_agent_runner
from orcha.capabilities.base import CapabilityContext, PermissionPolicy
from orcha.capabilities.registry import CapabilityRegistry
from orcha.nodes.agent import AgentConfig

registry = CapabilityRegistry().register_defaults()
executor = registry.build(
    ["filesystem", "workspace", "search", "git"],
    ctx=CapabilityContext(roots=["/path/to/workspace"]),
    policy=PermissionPolicy(access_mode="action"),
)
runner = build_agent_runner(AgentGraphConfig(
    agent_config=AgentConfig(completion_fn=my_completion_fn, max_iterations=6),
    executor=executor,
))
result = await runner.run("find every TODO in this repo")
print(result.answer)`,
      },
      { kind: 'note', text: 'A complete runnable version, including my_completion_fn, is examples/basic_agent.py in the ORCHA repo.' },
    ],
  },
  {
    heading: 'Integrations',
    body: 'ORCHA ships lazily-imported boundaries for LangGraph, Deep Agents, ragas evaluation and Phoenix/OpenTelemetry tracing. Anything else can be wrapped as a capability (tool).',
  },
];

const slug = (s: string) => s.toLowerCase().replace(/\s+/g, '-');

const Docs = () => {
  const [active, setActive] = useState(slug(sections[0].heading));

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) setActive(visible[0].target.id);
      },
      { rootMargin: '-15% 0px -70% 0px', threshold: 0 },
    );
    sections.forEach((s) => {
      const el = document.getElementById(slug(s.heading));
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <CleanLayout>
      <SEO
        title="Docs — LocalHouseLLM Developer Documentation"
        description="Developer documentation for the LocalHouseLLM modular AI stack: quickstart, installation, API reference, config reference, tool-using agent guide, and integrations."
        canonical="https://localhousellm.com/docs"
        keywords="LocalHouseLLM docs, ORCHA documentation, AICL documentation, modular AI SDK, AI orchestration SDK, AI developer documentation"
        schema={{ '@context': 'https://schema.org', '@type': 'TechArticle', headline: 'LocalHouseLLM Developer Documentation', author: { '@id': 'https://localhousellm.com/#organization' }, publisher: { '@id': 'https://localhousellm.com/#organization' }, url: 'https://localhousellm.com/docs', isPartOf: { '@id': 'https://localhousellm.com/#website' } }}
      />
      <Breadcrumbs items={[{ name: 'Docs', to: '/docs' }]} />

      <section className="pt-10 pb-12">
        <div className="max-container max-w-4xl">
          <p className="text-[11px] tracking-[0.25em] uppercase text-muted-foreground mb-5">Documentation</p>
          <h1 className="text-4xl md:text-6xl font-display font-extrabold tracking-tight leading-[1.05] mb-8">Docs</h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-4">
            You're building AI that lives on the user's machine, remembers their context, and works for them — not
            one more thing running in someone else's cloud.
          </p>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            The LocalHouseLLM stack is open infrastructure, and these docs are how you build on it. The open SDKs,
            ORCHA and AICL, are Python libraries. Some sections are still being written; the GitHub READMEs are the
            source of truth.
          </p>
        </div>
      </section>

      <section className="border-t border-border py-12 md:py-16">
        <div className="max-container grid lg:grid-cols-[220px_1fr] gap-12 lg:gap-16">
          <nav aria-label="On this page" className="hidden lg:block">
            <div className="sticky top-28 space-y-1">
              <p className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground mb-4">On this page</p>
              {sections.map((s) => {
                const id = slug(s.heading);
                const isActive = active === id;
                return (
                  <a
                    key={id}
                    href={`#${id}`}
                    className={`block py-1.5 pl-3 text-sm border-l-2 transition-colors font-sans ${
                      isActive
                        ? 'border-foreground text-foreground font-medium'
                        : 'border-border text-muted-foreground hover:text-foreground hover:border-foreground/40'
                    }`}
                  >
                    {s.heading}
                  </a>
                );
              })}
            </div>
          </nav>

          <div className="max-w-3xl space-y-16">
            {sections.map((s) => (
              <article key={s.heading} id={slug(s.heading)} className="scroll-mt-28">
                <h2 className="text-2xl md:text-3xl font-display font-bold tracking-tight mb-4">{s.heading}</h2>
                <p className="text-muted-foreground leading-relaxed mb-5">{s.body}</p>
                {s.blocks && (
                  <div className="space-y-4">
                    {s.blocks.map((b, i) => {
                      if (b.kind === 'code') {
                        return (
                          <pre key={i} className="p-5 rounded-2xl border border-border font-mono text-xs md:text-sm leading-relaxed bg-card whitespace-pre overflow-x-auto">{b.text}</pre>
                        );
                      }
                      if (b.kind === 'note') {
                        return <p key={i} className="text-sm text-muted-foreground leading-relaxed">{b.text}</p>;
                      }
                      return (
                        <p key={i} className="text-sm font-sans">
                          {b.links.map((l, j) => (
                            <span key={l.href}>
                              {j > 0 && <span className="text-muted-foreground mx-2">·</span>}
                              <a href={l.href} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-foreground">
                                {l.label} on GitHub
                              </a>
                            </span>
                          ))}
                        </p>
                      );
                    })}
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border py-20">
        <div className="max-container max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight mb-5">Where to go next.</h2>
          <div className="flex flex-wrap gap-3">
            <a href="#quickstart"><Button className="rounded-full bg-foreground text-background hover:bg-foreground/90 h-11 px-6 font-sans">Start here <ArrowRight className="w-4 h-4 ml-1" /></Button></a>
            <Link to="/stack"><Button variant="outline" className="rounded-full border-border bg-transparent h-11 px-6 font-sans">The stack</Button></Link>
            <a href="https://github.com/LocalHouseLLM" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="rounded-full border-border bg-transparent h-11 px-6 font-sans">GitHub</Button>
            </a>
            <a href={ORCHA_REPO} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="rounded-full border-border bg-transparent h-11 px-6 font-sans">ORCHA on GitHub</Button>
            </a>
            <a href={AICL_REPO} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="rounded-full border-border bg-transparent h-11 px-6 font-sans">AICL on GitHub</Button>
            </a>
            <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="rounded-full border-border bg-transparent h-11 px-6 font-sans">Community</Button>
            </a>
          </div>
        </div>
      </section>
    </CleanLayout>
  );
};

export default Docs;
