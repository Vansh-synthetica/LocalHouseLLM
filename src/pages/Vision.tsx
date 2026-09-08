import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import { Reveal, SectionIntro } from '@/components/system/Motion';

const pillars = [
  {
    title: 'AICL — the communication layer',
    body: 'AICL (Adaptive Inter-Module Communication Language) is the system’s neural pathway. It coordinates expert modules, routes tasks, enforces safety protocols, and ensures every inter-module message is symbolic, structured, and unambiguous — enabling faster reasoning and cleaner logic without relying on uncontrolled parameter growth.',
  },
  {
    title: 'Verification, not heavy filters',
    body: 'Instead of a single heavy moderation pass, AMAI runs a streamlined funnel of factual, logical, and safety evaluators. Every output is checked for coherence and trustworthiness before it reaches a user — stable, interpretable behaviour without sacrificing speed.',
  },
  {
    title: 'Architecture over parameter count',
    body: 'No idle parameters consuming resources for their own sake. AMAI is built on activation-based computation and modular upgrades: expert modules can be replaced, improved, or expanded independently, with reasoning that stays traceable end to end.',
  },
];

const approach = [
  { title: 'Modular parameter sharing', body: 'Specialised expert modules share a common AICL interface while focusing on specific knowledge domains, instead of one model carrying everything.' },
  { title: 'Adaptive activation', body: 'Only the modules relevant to a query are activated through intelligent routing, reducing computational cost without giving up output quality.' },
  { title: 'Multi-stage verification', body: 'Every output passes through checks for factual accuracy, logical consistency, and safety compliance before it reaches a user.' },
  { title: 'Continuous, validated learning', body: 'New knowledge is validated against existing knowledge through AICL protocols before it is integrated into the relevant expert modules.' },
];

const Vision = () => {
  const visionSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'AI Architecture Vision: Modular AI with AMAI and AICL',
    description: 'A technical approach to modular AI architecture using AICL communication, adaptive activation, and built-in verification.',
    author: { '@type': 'Organization', name: 'LocalHouseLLM' },
    publisher: { '@type': 'Organization', name: 'LocalHouseLLM' },
  };

  return (
    <Layout>
      <SEO
        title="Vision — Modular AI Architecture with AMAI & AICL | LocalHouseLLM"
        description="LocalHouseLLM's architectural vision: modular expert modules, an AICL communication layer, and built-in verification, in place of parameter-count scaling alone."
        keywords="AICL, AMAI, AI architecture vision, expert modules, modular AI systems, AI communication layer, adaptive activation, AI verification, scalable AI"
        canonical="https://localhousellm.com/vision"
        type="article"
        schema={visionSchema}
      />

      <section className="pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="max-container max-w-4xl">
          <Reveal>
            <p className="technical-label">Our vision</p>
            <h1 className="mt-4 font-display font-semibold tracking-tight text-4xl md:text-6xl leading-[1.05] mb-8">
              Architecture, not scale, is the path forward.
            </h1>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
              We build modular AI systems around specialised expert modules, adaptive activation, and layered
              verification — using AMAI and AICL as the underlying architecture, in place of ever-larger single
              models.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-border py-20 md:py-28">
        <div className="max-container max-w-3xl space-y-16">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.05}>
              <p className="technical-label">{String(i + 1).padStart(2, '0')}</p>
              <h2 className="mt-4 font-display text-2xl md:text-3xl font-semibold mb-4">{p.title}</h2>
              <p className="text-muted-foreground leading-relaxed">{p.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-t border-border py-20 md:py-28">
        <div className="max-container max-w-3xl">
          <SectionIntro kicker="Technical approach" title="Four principles behind the architecture." className="mb-14" />
          <div className="grid sm:grid-cols-2 gap-x-10 gap-y-10">
            {approach.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.04}>
                <div className="border-t border-border pt-5">
                  <h3 className="font-display text-lg font-semibold mb-1.5">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Vision;
