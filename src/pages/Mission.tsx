import CleanLayout from '@/components/CleanLayout';
import SEO from '@/components/SEO';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Reveal, SectionIntro } from '@/components/system/Motion';

const stack = [
  { title: 'Communication', desc: 'AICL — a structured protocol that lets AI modules coordinate clearly and safely.' },
  { title: 'Orchestration', desc: 'Route tasks across expert modules with transparent, traceable logic.' },
  { title: 'Memory', desc: 'Portable, user-owned context that persists across tools, sessions, and devices.' },
  { title: 'Safety', desc: 'Built-in verification — factual, logical, and ethical checks at every step.' },
  { title: 'Tools', desc: 'Reusable components for retrieval, action, and integration with real systems.' },
  { title: 'Intelligence Modules', desc: 'Specialised experts — extend, swap, or upgrade independently of the whole.' },
];

const useCases = [
  { title: 'AI tutors', desc: 'Personalised learning shaped to a student, school, or language.' },
  { title: 'Healthcare support', desc: 'On-premise assistants for clinics that require privacy and accuracy.' },
  { title: 'Agricultural advisors', desc: 'Offline-capable systems for rural communities and local knowledge.' },
  { title: 'Research assistants', desc: 'Composable reasoning systems built for specific fields and institutions.' },
];

const Mission = () => {
  const missionSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'Mission — LocalHouseLLM',
    url: 'https://localhousellm.com/mission',
    description:
      'LocalHouseLLM is building open, modular infrastructure for decentralized AI — interoperable building blocks for communication, orchestration, memory, safety, tools, and intelligence modules.',
    publisher: { '@type': 'Organization', name: 'LocalHouseLLM', url: 'https://localhousellm.com' },
  };

  return (
    <CleanLayout>
      <SEO
        title="Mission — Open, Modular Infrastructure for Decentralized AI | LocalHouseLLM"
        description="LocalHouseLLM exists to make artificial intelligence accessible, modular, and owned by the people who use it. We build open, interoperable infrastructure for decentralised AI."
        keywords="LocalHouseLLM mission, decentralized AI, open AI infrastructure, modular AI, AI ownership, interoperable components, composable AI, open source AI, AICL, AMAI"
        canonical="https://localhousellm.com/mission"
        type="article"
        schema={missionSchema}
      />

      {/* HERO */}
      <section className="pt-12 md:pt-24 pb-20 md:pb-28">
        <div className="max-container max-w-4xl">
          <Reveal>
            <p className="technical-label">Our mission</p>
            <h1 className="mt-4 font-display font-semibold tracking-tight text-4xl sm:text-5xl md:text-6xl leading-[1.05] mb-8">
              Making intelligence accessible, modular, and owned by the people who use it.
            </h1>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
              LocalHouseLLM is building open, modular infrastructure for decentralised AI — the foundational
              components for a future where intelligence is composable, transparent, and shared.
            </p>
          </Reveal>
        </div>
      </section>

      {/* MANIFESTO */}
      <section className="border-t border-border py-20 md:py-28">
        <div className="max-container">
          <div className="grid md:grid-cols-12 gap-10 md:gap-16">
            <Reveal className="md:col-span-4">
              <p className="technical-label">Manifesto</p>
              <h2 className="mt-4 font-display text-2xl md:text-3xl font-semibold tracking-tight leading-tight">
                The principles we build on.
              </h2>
            </Reveal>
            <Reveal delay={0.08} className="md:col-span-8 space-y-6 text-foreground/90 text-lg md:text-xl leading-relaxed">
              <p>
                LocalHouseLLM exists to make artificial intelligence accessible, modular, and owned by the people
                who use it.
              </p>
              <p>
                Rather than depending on centralised AI controlled by a handful of organisations, we are building
                open infrastructure that allows anyone to create, customise, and deploy AI systems for their own
                needs.
              </p>
              <p>
                Our goal is to provide the foundational components of artificial intelligence — communication,
                orchestration, memory, safety, tools, and intelligence modules — as a modular ecosystem of
                interoperable parts.
              </p>
              <p>
                Whether the system is an AI tutor, a research assistant, an agricultural advisor, a healthcare
                support tool, or an entirely new category of intelligence, builders should be able to compose
                reusable components and shape systems for their community, language, industry, or mission.
              </p>
              <p>
                We believe the future of AI should be decentralised, transparent, and accessible to everyone — not
                concentrated within large corporations.
              </p>
              <p className="text-foreground font-medium pt-2">
                LocalHouseLLM is building the foundation for that future.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* MODULAR STACK */}
      <section className="border-t border-border py-20 md:py-28">
        <div className="max-container">
          <SectionIntro kicker="The modular stack" title="Composable layers, not a monolith." className="max-w-3xl mb-14">
            <p className="mt-5 text-muted-foreground text-base md:text-lg leading-relaxed">
              Each component does one thing well, exposes a clear interface, and can be replaced or improved
              without rebuilding the system around it.
            </p>
          </SectionIntro>

          <div className="divide-y divide-border border-t border-b border-border">
            {stack.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.03}>
                <div className="grid sm:grid-cols-[10rem_1fr] gap-x-6 gap-y-1 py-6">
                  <span className="text-xs uppercase tracking-[0.14em] text-primary">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-foreground">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mt-1 max-w-xl">{item.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section className="border-t border-border py-20 md:py-28">
        <div className="max-container">
          <SectionIntro kicker="In practice" title="Intelligence shaped to its context." className="max-w-3xl mb-14" />

          <div className="grid sm:grid-cols-2 gap-x-10 gap-y-10">
            {useCases.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.04}>
                <div className="border-t border-border pt-5">
                  <h3 className="font-display text-lg font-semibold mb-1.5">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border py-24 md:py-32">
        <div className="max-container max-w-3xl">
          <Reveal>
            <h2 className="font-display text-3xl md:text-5xl font-semibold tracking-tight mb-6 leading-tight">
              Help us build the foundation.
            </h2>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-10 max-w-2xl">
              We work in the open. If a decentralised, modular future for AI matters to you, there is a place for
              you here.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/archive">
                <Button className="rounded-sm bg-foreground text-background hover:bg-primary hover:text-primary-foreground h-11 px-6">
                  Explore open source <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
              <Link to="/archive">
                <Button variant="outline" className="rounded-sm h-11 px-6">
                  Read our research
                </Button>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </CleanLayout>
  );
};

export default Mission;
