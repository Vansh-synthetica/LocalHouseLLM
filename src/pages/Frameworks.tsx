import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Github, BookOpen, Network, Cpu, Brain } from 'lucide-react';
import CleanLayout from '@/components/CleanLayout';
import SEO from '@/components/SEO';
import Breadcrumbs from '@/components/Breadcrumbs';

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: Math.min(i, 5) * 0.06, duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const frameworks = [
  {
    id: 'aicl',
    name: 'AICL',
    subtitle: 'Adaptive Inter-Module Communication Language',
    icon: Network,
    summary:
      'The communication protocol of the stack. AICL lets independent AI modules exchange structured information through standardized packets, deterministic routing, safety filters, and low-overhead inter-module transport.',
    why: 'Monolithic models hide their reasoning inside opaque weights. AICL makes every exchange between modules explicit, inspectable, and filterable — so provenance, safety, and versioning become properties of the protocol instead of habits of the prompt.',
    role: 'Layer 1 — the substrate every other framework speaks over.',
    points: [
      'Typed packets with provenance, intent, and confidence metadata',
      'Routing between experts, tools, and memory without bespoke glue code',
      'Safety filters applied in transit, before a claim reaches the user',
      'Transport-agnostic: in-process, cross-process, or across devices',
    ],
    learnMore: '/stack/aicl',
    docs: '/docs',
    github: 'https://github.com/LocalHouseLLM/AICL',
  },
  {
    id: 'orcha',
    name: 'Orcha',
    subtitle: 'Orchestration runtime',
    icon: Cpu,
    summary:
      'The runtime that coordinates multiple AI experts. Orcha plans work, executes modules in parallel, verifies and scores results, retries weak outputs, and composes a single coherent final answer.',
    why: 'Capability comes from coordination, not parameter count. Orcha turns a set of small specialists into a system that reasons — with retries, verification, and traces that make behaviour reproducible.',
    role: 'Layer 2 — the execution engine on top of AICL.',
    points: [
      'Planning and decomposition into parallel sub-tasks',
      'Parallel expert execution with result selection and scoring',
      'Verification passes and automatic retries on weak outputs',
      'Full execution traces for reproducibility and debugging',
    ],
    learnMore: '/stack/orcha',
    docs: '/docs',
    github: 'https://github.com/LocalHouseLLM/orcha01',
  },
  {
    id: 'nomi',
    name: 'Nomi',
    subtitle: 'Identity, memory & personalization layer',
    icon: Brain,
    summary:
      'The persistence layer. Nomi holds user identity, long-lived memory, project understanding, contextual recall, and adaptive behaviour — owned by the user and portable across AI tools.',
    why: 'A system that forgets cannot be trusted with long-running work. Persistent, user-controlled memory turns isolated sessions into an accumulating relationship: preferences, tone, constraints, and project context survive across tools and time.',
    role: 'Layer 3 — the continuity layer products build on.',
    points: [
      'Portable identity and preferences across AI systems',
      'Long-term memory with contextual, scoped recall',
      'Project-level understanding rather than per-chat context',
      'User-owned and user-revocable by design',
    ],
    learnMore: '/nomi',
    docs: '/docs',
    github: null,
  },
];

const chain = [
  { label: 'AICL', desc: 'Communication protocol' },
  { label: 'Orcha', desc: 'Orchestration runtime' },
  { label: 'Nomi', desc: 'Identity & memory' },
  { label: 'Products', desc: 'Applied systems' },
  { label: 'Anvira', desc: 'Local-first modular AI' },
];

const Frameworks = () => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Frameworks — LocalHouseLLM',
    url: 'https://localhousellm.com/frameworks',
    description:
      'AICL, Orcha, and Nomi — the foundational frameworks powering the LocalHouseLLM modular AI ecosystem.',
    hasPart: frameworks.map((f) => ({
      '@type': 'SoftwareApplication',
      name: f.name,
      applicationCategory: 'DeveloperApplication',
      description: f.summary,
      operatingSystem: 'Cross-platform',
      url: `https://localhousellm.com/frameworks#${f.id}`,
      publisher: { '@type': 'Organization', name: 'LocalHouseLLM' },
    })),
  };

  return (
    <CleanLayout>
      <SEO
        title="Frameworks — AICL, Orcha & Nomi | LocalHouseLLM"
        description="The foundational frameworks behind LocalHouseLLM: AICL for module communication, Orcha for orchestration, and Nomi for identity and persistent memory."
        keywords="AICL, Orcha, Nomi, AI frameworks, modular AI framework, orchestration runtime, AI memory layer, inter-module communication protocol, LocalHouseLLM frameworks"
        canonical="https://localhousellm.com/frameworks"
        type="website"
        schema={schema}
      />

      {/* HERO */}
      <section className="relative overflow-hidden pt-2 pb-14 md:pb-20">
        <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
          <motion.div
            animate={{ opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-24 left-1/2 -translate-x-1/2 h-[400px] w-[800px] rounded-full bg-primary/10 blur-[120px]"
          />
        </div>
        <Breadcrumbs items={[{ name: 'Frameworks', to: '/frameworks' }]} />
        <div className="max-container max-w-4xl mt-8">
          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-[11px] tracking-[0.25em] uppercase text-muted-foreground mb-5"
          >
            Foundational systems
          </motion.p>
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={1}
            className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight leading-[1.05]"
          >
            Frameworks
          </motion.h1>
          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={2}
            className="mt-7 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl"
          >
            Frameworks are the core technologies that power LocalHouseLLM. Unlike products, these
            are foundational systems — communication, orchestration, and memory — that developers
            and future applications build upon.
          </motion.p>
        </div>
      </section>

      {/* FRAMEWORK CARDS */}
      <section className="border-t border-border/40 py-14 md:py-20">
        <div className="max-container space-y-6">
          {frameworks.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.article
                key={f.id}
                id={f.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                variants={fadeUp}
                custom={i}
                className="group relative overflow-hidden rounded-3xl border border-border/50 bg-card/30 backdrop-blur-sm p-7 md:p-12 transition-all duration-300 hover:border-border hover:bg-card/60"
              >
                <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/[0.07] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="grid md:grid-cols-12 gap-8">
                  <div className="md:col-span-5">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border/60 bg-foreground/[0.04]">
                      <Icon className="w-5 h-5 text-foreground/80" aria-hidden="true" />
                    </span>
                    <h2 className="mt-5 text-2xl md:text-3xl font-semibold tracking-tight">
                      {f.name}
                    </h2>
                    <p className="mt-2 text-sm text-muted-foreground">{f.subtitle}</p>
                    <p className="mt-5 text-[11px] tracking-[0.18em] uppercase text-muted-foreground/80">
                      {f.role}
                    </p>
                    <div className="mt-7 flex flex-wrap gap-3">
                      <Link
                        to={f.learnMore}
                        className="inline-flex items-center gap-2 rounded-full bg-foreground text-background px-4 py-2 text-sm font-medium hover:opacity-90 transition-opacity"
                      >
                        Learn more <ArrowRight className="w-4 h-4" />
                      </Link>
                      <Link
                        to={f.docs}
                        className="inline-flex items-center gap-2 rounded-full border border-border/60 px-4 py-2 text-sm hover:bg-foreground/5 hover:border-border transition-colors"
                      >
                        <BookOpen className="w-4 h-4" /> Documentation
                      </Link>
                      {f.github && (
                        <a
                          href={f.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-full border border-border/60 px-4 py-2 text-sm hover:bg-foreground/5 hover:border-border transition-colors"
                        >
                          <Github className="w-4 h-4" /> GitHub
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="md:col-span-7">
                    <p className="text-base md:text-lg leading-relaxed text-foreground/90">
                      {f.summary}
                    </p>
                    <p className="mt-5 text-base text-muted-foreground leading-relaxed">
                      {f.why}
                    </p>
                    <ul className="mt-7 grid sm:grid-cols-2 gap-x-6 gap-y-3">
                      {f.points.map((p) => (
                        <li
                          key={p}
                          className="text-sm text-muted-foreground leading-relaxed pl-4 relative"
                        >
                          <span className="absolute left-0 top-[0.6em] h-1 w-1 rounded-full bg-foreground/40" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>

      {/* ARCHITECTURE */}
      <section className="border-t border-border/40 py-14 md:py-20">
        <div className="max-container max-w-3xl">
          <p className="text-[11px] tracking-[0.25em] uppercase text-muted-foreground mb-4">
            Architecture
          </p>
          <h2 className="text-2xl md:text-4xl font-semibold tracking-tight mb-4">
            How the frameworks fit together
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-10">
            Each layer depends only on the one beneath it. Products compose the frameworks; they
            never replace them.
          </p>

          <ol className="space-y-3">
            {chain.map((step, i) => (
              <motion.li
                key={step.label}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
              >
                <div className="flex items-center justify-between gap-6 rounded-2xl border border-border/50 bg-card/30 px-5 py-4 md:px-7 md:py-5">
                  <span className="text-lg md:text-xl font-semibold tracking-tight">
                    {step.label}
                  </span>
                  <span className="text-sm text-muted-foreground text-right">{step.desc}</span>
                </div>
                {i < chain.length - 1 && (
                  <div className="flex justify-center py-1.5" aria-hidden="true">
                    <span className="h-5 w-px bg-border" />
                  </div>
                )}
              </motion.li>
            ))}
          </ol>

          <div className="mt-12 flex flex-wrap gap-3">
            <Link
              to="/stack"
              className="inline-flex items-center gap-2 rounded-full border border-border/60 px-5 py-2.5 text-sm hover:bg-foreground/5 hover:border-border transition-colors"
            >
              Full stack architecture <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/archive"
              className="inline-flex items-center gap-2 rounded-full border border-border/60 px-5 py-2.5 text-sm hover:bg-foreground/5 hover:border-border transition-colors"
            >
              Read the research <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </CleanLayout>
  );
};

export default Frameworks;
