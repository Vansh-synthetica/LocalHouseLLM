import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Network, Cpu, BookOpen, Lock, Blocks, Globe, GraduationCap, Stethoscope, Sprout, FlaskConical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CleanLayout from '@/components/CleanLayout';
import SEO from '@/components/SEO';
import FlowCanvas from '@/components/fx/FlowCanvas';

const marqueeItems = [
  'AICL Protocol',
  'ORCHA Orchestration',
  'User-owned Memory',
  'Safety Verification',
  'Tool Runtime',
  'Intelligence Modules',
  'Anvira v0.2',
  'Nomi Personas',
  'Local-first inference',
  'Open research',
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[11px] tracking-[0.25em] uppercase text-muted-foreground mb-5">
    {children}
  </p>
);

const Index = () => {
  const homeSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'LocalHouseLLM',
    url: 'https://localhousellm.com/',
    description:
      'LocalHouseLLM is building open, modular infrastructure for decentralized AI — interoperable building blocks for communication, orchestration, memory, safety, tools, and intelligence.',
    sameAs: [
      'https://github.com/LocalHouseLLM',
      'https://x.com/localhousellm',
      'https://www.linkedin.com/company/localhousellm',
    ],
  };

  const stack = [
    { icon: Network, title: 'Communication', desc: 'AICL — a structured protocol that lets AI modules coordinate clearly and safely.' },
    { icon: Cpu, title: 'Orchestration', desc: 'Route tasks across expert modules with transparent, traceable logic.' },
    { icon: BookOpen, title: 'Memory', desc: 'Portable, user-owned context that travels across tools, sessions, and devices.' },
    { icon: Lock, title: 'Safety', desc: 'Built-in verification — factual, logical, and ethical checks at every step.' },
    { icon: Blocks, title: 'Tools', desc: 'Reusable components for retrieval, action, and integration with real systems.' },
    { icon: Globe, title: 'Intelligence Modules', desc: 'Specialized experts — extend, swap, or upgrade independently of the whole.' },
  ];

  const useCases = [
    { icon: GraduationCap, title: 'AI tutors', desc: 'Personalised learning shaped to a student, school, or language.' },
    { icon: Stethoscope, title: 'Healthcare support', desc: 'On-premise assistants for clinics that require privacy and accuracy.' },
    { icon: Sprout, title: 'Agricultural advisors', desc: 'Offline-capable systems for rural communities and local knowledge.' },
    { icon: FlaskConical, title: 'Research assistants', desc: 'Composable reasoning systems built for specific fields and institutions.' },
  ];

  const projects = [
    { to: '/anvira', name: 'Anvira', tag: 'Modular AI', desc: 'A modular AI architecture with personal, enterprise, and edge editions.' },
    { to: '/nomi', name: 'Nomi', tag: 'Persona Infrastructure', desc: 'A user-owned identity and memory layer that travels across AI systems.' },
    { to: '/inkflow', name: 'InkFlow', tag: 'Early Access', desc: 'An AI writing assistant for clarity, tone, and structure.' },
    { to: '/devquill', name: 'DevQuill', tag: 'Early Access', desc: 'A focused environment for developers building with modular AI.' },
  ];

  return (
    <CleanLayout>
      <SEO
        title="LocalHouseLLM — Open, Modular Infrastructure for Decentralized AI"
        description="LocalHouseLLM is building open, modular infrastructure for decentralized AI. Interoperable building blocks for communication, orchestration, memory, safety, tools, and intelligence — owned by the people who use them."
        keywords="LocalHouseLLM, decentralized AI, open AI infrastructure, modular AI, AI ownership, AI sovereignty, open source AI, AICL, AMAI, composable AI, interoperable AI components"
        canonical="https://localhousellm.com/"
        schema={homeSchema}
      />

      {/* HERO */}
      <section className="relative pt-10 md:pt-20 pb-16 md:pb-24 overflow-hidden">
        <div className="max-container">
          <div className="max-w-4xl">
            <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0} className="mb-6">
              <Link to="/anvira" className="pill-glow group">
                <span className="pill-dot" />
                Anvira v0.2 is live — local AI that does the work
                <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:translate-x-0.5 group-hover:text-foreground transition-all" />
              </Link>
            </motion.div>
            <motion.h1
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={1}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.05] mb-8"
            >
              Open, modular infrastructure
              <br />
              <span className="text-aurora">for decentralized AI.</span>
            </motion.h1>
            <motion.p
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={2}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed mb-10"
            >
              We build the foundational components of artificial intelligence — communication,
              orchestration, memory, safety, tools, and expert modules — as interoperable systems
              anyone can compose, customise, and own.
            </motion.p>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={3}
              className="flex flex-wrap items-center gap-3"
            >
              <Link to="/mission">
                <Button className="btn-shine bg-primary text-primary-foreground hover:bg-primary h-11 px-6">
                  Read our mission
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
              <Link to="/archive">
                <Button variant="outline" className="border-border bg-card/40 backdrop-blur-md hover:bg-foreground/5 hover:border-primary/50 h-11 px-6 transition-all">
                  View research
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Flow canvas — the stack as a living graph */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative mt-16 md:mt-24 rounded-3xl border border-border/60 bg-card/30 backdrop-blur-xl p-4 sm:p-8 md:p-12 overflow-hidden"
          >
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_50%_0%,hsl(var(--primary)/0.18),transparent_70%)]" />
            <div
              className="absolute inset-0 -z-10 opacity-[0.08]"
              style={{
                backgroundImage:
                  'radial-gradient(hsl(var(--foreground)) 1px, transparent 1px)',
                backgroundSize: '22px 22px',
              }}
            />
            <div className="flex items-center gap-2 mb-6 text-[11px] tracking-[0.22em] uppercase text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-accent shadow-[0_0_10px_hsl(var(--accent))]" />
              Live: how a request flows through the stack
            </div>
            <FlowCanvas />
          </motion.div>
        </div>

        {/* Marquee of layers */}
        <div className="marquee mt-14 md:mt-20">
          <div className="marquee-track">
            {[...marqueeItems, ...marqueeItems].map((m, i) => (
              <span key={i} className="node-chip">
                <span className="port" />
                {m}
              </span>
            ))}
          </div>
        </div>
      </section>
      <div className="beam max-container" />

      {/* WHY MODULAR AI MATTERS */}
      <section className="py-20 md:py-28">
        <div className="max-container">
          <div className="grid md:grid-cols-12 gap-10 md:gap-16">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={fadeUp}
              className="md:col-span-5"
            >
              <Eyebrow>Why this matters</Eyebrow>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight leading-tight">
                AI is becoming infrastructure.
                <br />
                Who owns it matters.
              </h2>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={fadeUp}
              custom={1}
              className="md:col-span-7 space-y-5 text-muted-foreground text-base md:text-lg leading-relaxed"
            >
              <p>
                The most capable AI systems today are concentrated inside a handful of
                organisations. Their priorities, constraints, and blind spots quietly shape the
                tools the rest of the world depends on.
              </p>
              <p>
                We believe that is a fragile foundation for something as consequential as
                intelligence. Communities, researchers, and builders deserve AI they can inspect,
                adapt, and genuinely own.
              </p>
              <p>
                Decentralisation is not a slogan. It is a design decision — and it must be built
                into the infrastructure from the start.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      <div className="beam max-container" />

      {/* WHAT WE'RE BUILDING — STACK */}
      <section className="py-20 md:py-28">
        <div className="max-container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="max-w-3xl mb-14"
          >
            <Eyebrow>What we are building</Eyebrow>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-5">
              A modular ecosystem of interoperable components.
            </h2>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
              Instead of a single monolithic system, LocalHouseLLM is a set of composable layers.
              Each component is focused, transparent, and independently replaceable.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {stack.map((item, i) => (
              <motion.div
                key={item.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                variants={fadeUp}
                custom={i}
                className="card-premium p-7"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 text-primary mb-5">
                  <item.icon className="w-5 h-5" />
                </span>
                <h3 className="text-base font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <div className="beam max-container" />

      {/* USE CASES */}
      <section className="py-20 md:py-28">
        <div className="max-container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="max-w-3xl mb-14"
          >
            <Eyebrow>Real-world use cases</Eyebrow>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-5">
              Intelligence shaped to its context.
            </h2>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
              The same building blocks, different missions — assembled by the communities and
              industries they serve.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-4">
            {useCases.map((item, i) => (
              <motion.div
                key={item.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                variants={fadeUp}
                custom={i}
                className="card-premium p-7 flex gap-5"
              >
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-accent/30 bg-accent/10 text-accent">
                  <item.icon className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <div className="beam max-container" />

      {/* RESEARCH PREVIEW */}
      <section className="py-20 md:py-28">
        <div className="max-container">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="max-w-2xl"
            >
              <Eyebrow>Research</Eyebrow>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
                Ideas, written down.
              </h2>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                Our research explores the architectural foundations of modular, adaptive,
                and decentralised intelligence.
              </p>
            </motion.div>
            <Link to="/archive" className="shrink-0">
              <Button variant="outline" className="border-border bg-transparent hover:bg-foreground/5">
                All papers <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              'Adaptive Modular AI: A New Paradigm for Scalable, Safe, and Efficient Language Models',
              'Shadow AMAI: An Architecture for Unconstrained Adaptive Modular Intelligence',
              'CoT Looping Systems, Continuous Hypothesis Propagation, and Predictability Ratios',
              'ADAPT: Adaptive Decomposition and Parallel Task Execution for Memory-Efficient LLM Inference',
            ].map((t, i) => (
              <motion.div
                key={t}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                variants={fadeUp}
                custom={i}
                className="card-premium p-7"
              >
                <p className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground mb-3">Paper · 2026</p>
                <h3 className="text-base md:text-lg font-semibold leading-snug">{t}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <div className="beam max-container" />

      {/* PROJECTS */}
      <section className="py-20 md:py-28">
        <div className="max-container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="max-w-3xl mb-12"
          >
            <Eyebrow>Projects</Eyebrow>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-5">
              Systems built on the LocalHouseLLM stack.
            </h2>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
              Practical demonstrations of what becomes possible when intelligence is modular.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-4">
            {projects.map((p, i) => (
              <motion.div
                key={p.to}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                variants={fadeUp}
                custom={i}
              >
                <Link
                  to={p.to}
                  className="card-premium group block p-7"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground">{p.tag}</span>
                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-aurora transition-colors">{p.name}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <div className="beam max-container" />

      {/* WORK WITH US */}
      <section className="py-20 md:py-28">
        <div className="max-container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="max-w-3xl mb-12"
          >
            <Eyebrow>Work With Us</Eyebrow>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-5">
              Serious AI infrastructure, consulting, and custom builds.
            </h2>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
              For founders, companies, and teams building real systems. Engagements are selective
              and reviewed manually — this is collaboration, not a booking form.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-4 mb-10">
            {[
              { title: 'AI Infrastructure & Deployment', desc: 'Private, modular stacks deployed on your hardware or cloud.' },
              { title: 'Custom AI Systems & Development', desc: 'Purpose-built modular systems for your product or research.' },
              { title: 'Strategic Consulting & Partnerships', desc: 'Architecture, roadmap, and long-term collaboration.' },
            ].map((s, i) => (
              <motion.div
                key={s.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                variants={fadeUp}
                custom={i}
                className="card-premium p-6"
              >
                <h3 className="text-base font-semibold mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>

          <Link to="/work-with-us">
            <Button className="btn-shine bg-primary text-primary-foreground hover:bg-primary h-11 px-6">
              Apply to Work With Us
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </div>
      </section>
      <div className="beam max-container" />

      {/* CTA */}
      <section className="py-24 md:py-32">
        <div className="max-container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="max-w-3xl"
          >
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mb-6 leading-tight">
              Build the foundation for decentralised AI with us.
            </h2>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-10 max-w-2xl">
              We are early, deliberate, and building in the open. If a modular, owned, and
              accessible future for AI matters to you — there is a place for you here.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/stack">
                <Button className="btn-shine bg-primary text-primary-foreground hover:bg-primary h-11 px-6">
                  Explore the stack
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
              <Link to="/docs">
                <Button variant="outline" className="border-border bg-transparent hover:bg-foreground/5 h-11 px-6">
                  Read the docs
                </Button>
              </Link>
              <Link to="/work-with-us">
                <Button variant="outline" className="border-border bg-transparent hover:bg-foreground/5 h-11 px-6">
                  Work with us
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </CleanLayout>
  );
};

export default Index;
