import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Download,
  ArrowRight,
  Lock,
  Boxes,
  Workflow,
  MonitorSmartphone,
  Brain,
  Layers,
  Terminal,
  FileStack,
} from 'lucide-react';

import CleanLayout from '@/components/CleanLayout';
import Breadcrumbs from '@/components/Breadcrumbs';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';

const DOWNLOAD_URL =
  'https://drive.google.com/file/d/1rRvE1c6N1gHpD-Ybqqtf2FdFvrQ58sgV/view?usp=sharing';

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

const differences = [
  {
    icon: Lock,
    title: 'Local-first',
    body: 'Anvira runs on your machine. Your files, context, and conversations stay where you put them.',
  },
  {
    icon: Boxes,
    title: 'Modular intelligence',
    body: 'Capabilities are separate modules you can compose, replace, and extend instead of one opaque model.',
  },
  {
    icon: Workflow,
    title: 'Agentic execution',
    body: 'Anvira plans and carries out multi-step work rather than answering one message at a time.',
  },
  {
    icon: MonitorSmartphone,
    title: 'Desktop-native',
    body: 'A real application built for focused work — not a browser tab wrapped in a chat box.',
  },
];

const highlights = [
  {
    icon: Brain,
    title: 'Reasoning modes',
    body: 'Switch between fast answers and deeper, structured reasoning depending on the task.',
  },
  {
    icon: FileStack,
    title: 'Workspace context',
    body: 'Anvira works against the project you are actually in, not a blank prompt window.',
  },
  {
    icon: Layers,
    title: 'Agent system',
    body: 'Delegate multi-step work to agents that keep track of goals, steps, and results.',
  },
  {
    icon: Terminal,
    title: 'Local execution',
    body: 'Actions run on your device, giving you visibility and control over what happens.',
  },
];

const Anvira = () => (
  <CleanLayout>
    <SEO
      title="Anvira — Local-First AI Desktop Workspace"
      description="Anvira is a local-first AI desktop app built around modular intelligence and agentic workflows. Download the first public build of Anvira v0.1."
      keywords="Anvira, local-first AI, AI desktop app, modular intelligence, agentic workflows, user-owned AI, LocalHouseLLM"
      canonical="https://localhousellm.com/anvira"
      schema={{
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'Anvira',
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'Windows',
        softwareVersion: '0.1',
        description:
          'Anvira is a local-first AI desktop workspace built around modular intelligence and agentic workflows.',
        url: 'https://localhousellm.com/anvira',
        downloadUrl: DOWNLOAD_URL,
        publisher: { '@type': 'Organization', name: 'LocalHouseLLM' },
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      }}
    />

    {/* Hero */}
    <section className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 h-[520px] w-[820px] rounded-full bg-primary/10 blur-[120px]"
      />

      <div className="max-container relative pt-10 pb-24 md:pb-32">
        <Breadcrumbs items={[{ name: 'Anvira' }]} />

        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-3xl text-center"
        >
          <motion.p
            variants={fadeUp}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-border px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-muted-foreground"
          >
            Anvira v0.1 · first public build
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="text-4xl md:text-6xl font-light leading-[1.08] tracking-tight"
          >
            A local-first AI workspace
            <br />
            you actually own
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed"
          >
            Anvira is a desktop AI application built around modular intelligence and agentic
            workflows. It runs locally, understands the work in front of you, and carries out
            multi-step tasks instead of just replying to messages.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <Button
              size="lg"
              asChild
              className="group h-12 px-7 text-base transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
            >
              <a href={DOWNLOAD_URL} target="_blank" rel="noopener noreferrer">
                <Download className="mr-2 h-4 w-4" />
                Download Anvira v0.1
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="group h-12 px-7 text-base transition-all duration-300 hover:-translate-y-0.5"
            >
              <a href="#what-is-anvira">
                Learn how it works
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
          </motion.div>

          <motion.p variants={fadeUp} className="mt-5 text-sm text-muted-foreground">
            This is the first public release. It is early, honest, and the foundation for
            something much larger.
          </motion.p>
        </motion.div>
      </div>
    </section>

    {/* What is Anvira */}
    <section id="what-is-anvira" className="border-t border-border py-20 md:py-24">
      <div className="max-container grid gap-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] md:gap-20">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="text-2xl md:text-3xl font-light tracking-tight"
        >
          What is Anvira?
        </motion.h2>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="space-y-5 text-lg text-muted-foreground leading-relaxed"
        >
          <motion.p variants={fadeUp}>
            Anvira is a local-first AI desktop app. It installs on your computer and works from
            there — no dependency on a browser tab, no requirement to hand your working context to
            someone else's platform.
          </motion.p>
          <motion.p variants={fadeUp}>
            Instead of a single monolithic model doing everything, Anvira is built around{' '}
            <span className="text-foreground">modular intelligence</span>: separate reasoning,
            memory, tool, and execution components that work together. That structure is what makes{' '}
            <span className="text-foreground">agentic workflows</span> possible — Anvira can plan a
            task, take steps, and report back.
          </motion.p>
          <motion.p variants={fadeUp}>
            It is designed to be extensible and user-owned. The parts are meant to be understood,
            swapped, and built on, not sealed shut.
          </motion.p>
        </motion.div>
      </div>
    </section>

    {/* Why Anvira exists */}
    <section className="border-t border-border py-20 md:py-24">
      <div className="max-container grid gap-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] md:gap-20">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="text-2xl md:text-3xl font-light tracking-tight"
        >
          Why Anvira exists
        </motion.h2>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="space-y-5 text-lg text-muted-foreground leading-relaxed"
        >
          <motion.p variants={fadeUp}>
            Most AI tools today ask you to send your work somewhere else and accept whatever the
            product decides you need. You get a chat box, a rate limit, and very little control over
            how the system reasons or what it remembers.
          </motion.p>
          <motion.p variants={fadeUp}>
            We wanted the opposite: intelligence that lives on your machine, that you can inspect,
            configure, and extend. Ownership matters — of your data, of your workflow, and of the
            components doing the work.
          </motion.p>
          <motion.p variants={fadeUp}>
            Anvira is our attempt at a genuinely capable AI workspace built on that principle. It is
            also the first product surface of the modular infrastructure we build at{' '}
            <Link to="/mission" className="text-foreground underline underline-offset-4">
              LocalHouseLLM
            </Link>
            .
          </motion.p>
        </motion.div>
      </div>
    </section>

    {/* How it works */}
    <section className="border-t border-border py-20 md:py-24">
      <div className="max-container">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="max-w-2xl"
        >
          <h2 className="text-2xl md:text-3xl font-light tracking-tight">How it works</h2>
          <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
            Anvira brings chat, workspace context, agents, reasoning, and local execution into one
            application. You describe what you want; Anvira decides how to approach it, uses the
            context it has, and executes step by step on your machine.
          </p>
        </motion.div>

        <motion.ol
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4"
        >
          {[
            { step: '01', title: 'You ask', body: 'A request, a goal, or an open-ended task in plain language.' },
            { step: '02', title: 'It understands', body: 'Workspace context and memory shape what Anvira knows about the job.' },
            { step: '03', title: 'It plans', body: 'Reasoning modules break the goal into concrete, ordered steps.' },
            { step: '04', title: 'It executes', body: 'Agents run those steps locally and hand back verifiable results.' },
          ].map((s) => (
            <motion.li key={s.step} variants={fadeUp} className="bg-background p-7">
              <span className="text-xs tracking-[0.2em] text-muted-foreground">{s.step}</span>
              <h3 className="mt-4 text-base font-medium">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.body}</p>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>

    {/* What makes it different */}
    <section className="border-t border-border py-20 md:py-24">
      <div className="max-container">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="max-w-2xl text-2xl md:text-3xl font-light tracking-tight"
        >
          What makes it different
        </motion.h2>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4"
        >
          {differences.map((d) => (
            <motion.div key={d.title} variants={fadeUp}>
              <d.icon className="h-5 w-5 text-primary" aria-hidden="true" />
              <h3 className="mt-4 text-base font-medium">{d.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{d.body}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-12 max-w-2xl text-muted-foreground"
        >
          Anvira is built as a foundation, not a chat app. v0.1 is the smallest honest version of
          that foundation.
        </motion.p>
      </div>
    </section>

    {/* Highlights */}
    <section className="border-t border-border py-20 md:py-24">
      <div className="max-container">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="max-w-2xl text-2xl md:text-3xl font-light tracking-tight"
        >
          In this build
        </motion.h2>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="mt-12 grid gap-5 sm:grid-cols-2"
        >
          {highlights.map((h) => (
            <motion.article
              key={h.title}
              variants={fadeUp}
              className="glass rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg"
            >
              <h.icon className="h-5 w-5 text-primary" aria-hidden="true" />
              <h3 className="mt-4 text-lg font-medium">{h.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{h.body}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>

    {/* Final CTA */}
    <section className="relative overflow-hidden border-t border-border py-24 md:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 h-[400px] w-[760px] rounded-full bg-primary/10 blur-[130px]"
      />
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="max-container relative text-center"
      >
        <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-light tracking-tight">
          Try the first public build
        </motion.h2>
        <motion.p
          variants={fadeUp}
          className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground leading-relaxed"
        >
          Anvira v0.1 is early. Some things are rough, and that is the point of releasing it — we
          would rather build this in the open with people who care about local, user-owned AI.
        </motion.p>

        <motion.div variants={fadeUp} className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            size="lg"
            asChild
            className="h-12 px-7 text-base transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
          >
            <a href={DOWNLOAD_URL} target="_blank" rel="noopener noreferrer">
              <Download className="mr-2 h-4 w-4" />
              Download Anvira v0.1
            </a>
          </Button>
          <Button size="lg" variant="ghost" asChild className="h-12 px-7 text-base">
            <Link to="/contact">Send feedback</Link>
          </Button>
        </motion.div>

        <motion.p variants={fadeUp} className="mt-8 text-sm text-muted-foreground">
          Thanks for being here this early. — the LocalHouseLLM team
        </motion.p>
      </motion.div>
    </section>
  </CleanLayout>
);

export default Anvira;
