import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import SEO from '@/components/SEO';
import { Reveal, SectionIntro } from '@/components/system/Motion';

const leadership = [
  { name: 'Vansh Bukkarwal', role: 'CEO & Founder' },
  { name: 'Shandie', role: 'Co-owner' },
];

const coFounders = [{ name: 'Raghav', role: 'Co-Founder' }];

const timeline = [
  { date: 'April 2025', title: 'LocalHouseLLM founded', body: 'LocalHouseLLM begins with a mission to make intelligent systems local, modular, and user-owned.' },
  { date: 'July 2025', title: 'Foundational research', body: 'Initial research into modular AI architectures and adaptive intelligence establishes the company’s research direction.' },
  { date: 'October 2025', title: 'First AMAI prototype', body: 'The first Adaptive Modular AI (AMAI) prototype demonstrates a modular approach to AI systems and becomes the foundation for subsequent research.' },
  { date: 'Q1 2026', title: 'Research → systems', body: 'LocalHouseLLM expands beyond research prototypes into a broader systems architecture, introducing the foundations of Nomi, AICL, and ORCHA.' },
  { date: 'Q2 2026', title: 'Anvira begins', body: 'Development begins on Anvira, a local-first AI desktop environment bringing models, agents, memory, tools, and workspaces into a single application.' },
  { date: 'Q2 2026', title: 'ORCHA agent runtime', body: 'ORCHA evolves into a dedicated agent execution layer with event-driven execution, tools, memory, checkpoints, replay, multi-agent workflows, and runtime observability.' },
  { date: 'Q2–Q3 2026', title: 'Anvira 0.1', body: 'The first complete Anvira product emerges: local model management, chat, workspaces, Agent Hub, ORCHA, Nomi, AICL, file intelligence, and multi-model support.' },
  { date: 'Q3 2026', title: 'The agentic stack', body: 'LocalHouseLLM expands ORCHA with LangChain, LangGraph, MCP, deep agents, RAG evaluation, durable checkpoints, human approval, multi-agent execution, and persistent agent state.' },
  { date: 'Q3 2026', title: 'Anvira 0.2', body: 'Anvira evolves from a local AI application into a stateful AI workspace: project understanding, agent execution, tool use, code creation and editing, verification, GPU-accelerated local inference, and persistent workspaces.' },
  { date: 'Q3 2026', title: 'Edge AI research', body: 'Research begins on bringing the LocalHouseLLM stack beyond desktop hardware toward mobile and CPU-first edge AI.' },
  { date: 'Now', title: 'Building the local AI stack', body: 'LocalHouseLLM is developing an integrated ecosystem across Models, Anvira, ORCHA, Nomi, AICL, Agents, and Evaluation, with the long-term goal of making advanced AI systems local, modular, interoperable, and user-owned.' },
];

const About = () => {
  const aboutSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About LocalHouseLLM',
    description: 'LocalHouseLLM builds modular AI architecture, specialized expert systems, and adaptive learning infrastructure.',
    author: {
      '@type': 'Organization',
      name: 'LocalHouseLLM',
      founder: { '@type': 'Person', name: 'Vansh Bukkarwal', jobTitle: 'Founder & CEO' },
    },
  };

  return (
    <Layout>
      <SEO
        title="About LocalHouseLLM — Modular AI Architecture"
        description="LocalHouseLLM builds modular AI architecture, specialized expert systems, and adaptive learning infrastructure. Meet the team building AMAI and AICL."
        keywords="LocalHouseLLM team, AI company, modular AI development, Vansh Bukkarwal founder, AI research team, AMAI development, AICL technology team"
        canonical="https://localhousellm.com/about"
        schema={aboutSchema}
      />

      <section className="pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="max-container max-w-4xl">
          <Reveal>
            <p className="technical-label">About</p>
            <h1 className="mt-4 font-display font-semibold tracking-tight text-4xl md:text-6xl leading-[1.05] mb-8">
              Building smarter, not just bigger, AI.
            </h1>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
              LocalHouseLLM was founded on a simple premise: scaling model size and parameter count is not the
              only path to useful machine intelligence. We build modular AI systems — specialised expert modules
              that reason, adapt, and evolve safely over time — using AMAI and AICL as the underlying architecture.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-border py-20 md:py-28">
        <div className="max-container max-w-4xl">
          <SectionIntro kicker="Leadership" title="The people behind LocalHouseLLM." className="mb-14" />

          <div className="divide-y divide-border border-t border-b border-border">
            {leadership.map((p) => (
              <div key={p.name} className="flex items-baseline justify-between py-5">
                <span className="font-display text-lg font-semibold text-foreground">{p.name}</span>
                <span className="text-sm text-muted-foreground">{p.role}</span>
              </div>
            ))}
            {coFounders.map((p) => (
              <div key={p.name} className="flex items-baseline justify-between py-5">
                <span className="font-display text-lg font-semibold text-foreground">{p.name}</span>
                <span className="text-sm text-muted-foreground">{p.role}</span>
              </div>
            ))}
            <div className="flex items-baseline justify-between py-5">
              <span className="font-display text-lg font-semibold text-muted-foreground">Team</span>
              <span className="text-sm text-muted-foreground">Coming soon</span>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border py-20 md:py-28">
        <div className="max-container max-w-3xl">
          <Reveal>
            <h2 className="font-display text-2xl md:text-3xl font-semibold mb-5">Join us</h2>
            <p className="text-muted-foreground leading-relaxed mb-8 max-w-2xl">
              We're building the future of AI and looking for systems engineers, AI research scientists, and
              collaborators who want to shape a modular AI architecture from its early days.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/contact">
                <Button className="rounded-sm bg-foreground text-background hover:bg-primary hover:text-primary-foreground h-11 px-6">
                  Contact us
                </Button>
              </Link>
              <a href="mailto:vanshbukkarwal@localhousellm.com">
                <Button variant="outline" className="rounded-sm h-11 px-6">
                  Reach out directly
                </Button>
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-border py-20 md:py-28">
        <div className="max-container max-w-3xl">
          <SectionIntro kicker="Timeline" title="How we got here." className="mb-14" />

          <div className="space-y-0">
            {timeline.map((t, i) => (
              <Reveal key={t.title} delay={i * 0.02}>
                <div className="flex gap-6">
                  <div className="flex flex-col items-center pt-1.5">
                    <span className="h-2 w-2 rounded-full bg-primary shrink-0" />
                    {i < timeline.length - 1 && <span className="w-px flex-1 bg-border" />}
                  </div>
                  <div className={i < timeline.length - 1 ? 'pb-10' : ''}>
                    <p className="technical-label">{t.date}</p>
                    <h3 className="mt-2 font-display text-lg font-semibold text-foreground">{t.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mt-1 max-w-xl">{t.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
