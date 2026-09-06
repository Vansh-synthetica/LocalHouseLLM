import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Download,
  ArrowRight,
  Terminal,
  FileStack,
  RefreshCcw,
  ShieldCheck,
  Cpu,
  Gauge,
  Boxes,
  GitCompare,
  CheckCircle2,
  Braces,
} from 'lucide-react';

import CleanLayout from '@/components/CleanLayout';
import Breadcrumbs from '@/components/Breadcrumbs';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const DOWNLOAD_URL =
  'https://drive.google.com/file/d/1Gp4gIoyrV584rAubII_Fk-zNb1hCZHM2/view?usp=sharing';

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

const inView = {
  variants: fadeUp,
  initial: 'hidden' as const,
  whileInView: 'visible' as const,
  viewport: { once: true, margin: '-80px' },
};

const staggerInView = {
  variants: stagger,
  initial: 'hidden' as const,
  whileInView: 'visible' as const,
  viewport: { once: true, margin: '-60px' },
};

const changes = [
  { title: 'Real filesystem and terminal execution', body: 'Files are read, written, and edited; commands run on your machine and their output comes back into the loop.' },
  { title: 'Multi-step coding workflows', body: 'Tasks are decomposed into ordered steps that span multiple files and commands.' },
  { title: 'Self-correcting agent loops', body: 'Failures are read, diagnosed, and turned into corrective steps instead of ending the run.' },
  { title: 'Verification and failure-recovery gates', body: 'Work is pushed toward execution and verification before it is reported as complete.' },
  { title: 'Tool-call recovery', body: 'Tool calls are recovered across several structured output formats produced by different local models.' },
  { title: 'Schema-constrained strict tool mode', body: 'Action envelopes constrain generation so smaller models emit valid, parseable calls.' },
  { title: 'Conversation and workspace continuity', body: 'Sessions keep their workspace and history so long tasks survive across steps.' },
  { title: 'Hardware-aware local inference', body: 'Detected CPU, RAM, GPU, and VRAM inform how models are loaded and run.' },
  { title: 'CUDA/GPU optimization', body: 'NVIDIA acceleration with GPU layer and context tuning for the available VRAM.' },
  { title: 'Production-tested packaged application', body: 'The packaged desktop build is smoke-tested, not just the underlying engine.' },
];

const trace = [
  'Inspect workspace',
  'Create / edit files',
  'Run command',
  'Read output',
  'Detect failure',
  'Apply correction',
  'Run again',
  'Verify',
];

const correction = [
  { icon: ShieldCheck, title: 'Verification gates', body: 'Written code is pushed toward actual execution and verification.' },
  { icon: RefreshCcw, title: 'Failure-aware correction', body: 'Real error output becomes part of the next corrective step.' },
  { icon: GitCompare, title: 'Retry escalation', body: 'Repeated failures receive increasingly explicit corrective instructions.' },
  { icon: Braces, title: 'Truncated-call protection', body: 'Incomplete generated file operations are rejected rather than blindly executed.' },
];

const dialects = [
  'Native tool calls',
  'JSON objects',
  'Qwen-style tags',
  'Python-style dictionaries',
  'XML function calls',
  'Fenced structured blocks',
  'Mixed prose + call output',
];

const hardware = [
  'GGUF models',
  'NVIDIA CUDA acceleration',
  'VRAM-aware configuration',
  'Context sizing',
  'GPU layer optimization',
  'Inference profiles',
];

const benchmarks = [
  { model: 'Qwen2.5-Coder 7B', quant: 'Q4_K_M', gen: '~21.5 tok/s' },
  { model: 'Qwen2.5-Coder 3B', quant: 'Q4_K_M', gen: '~20 tok/s' },
  { model: 'Qwen2.5-Coder 1.5B', quant: 'Q4_K_M', gen: '~68.3 tok/s' },
];

const scaling = [
  { size: '7B', body: 'Best suited for complex coding and multi-file reasoning.' },
  { size: '3B', body: 'A practical balance between capability and local resource usage.' },
  { size: '1.5B', body: 'Very fast for simpler structured tasks, particularly with strict tool mode.' },
];

const architecture = [
  'User',
  'Anvira Desktop',
  'Agent Runtime',
  'Tools & Workspace',
  'Local Model',
  'Verification / Correction',
  'Result',
];

const stackLayers = [
  { name: 'AICL', to: '/stack/aicl' },
  { name: 'ORCHA', to: '/stack/orcha' },
  { name: 'Nomi', to: '/nomi' },
  { name: 'Safety', to: '/stack/safety' },
  { name: 'Tools', to: '/stack/tools' },
  { name: 'Intelligence Modules', to: '/stack/modules' },
];

const metrics = [
  { value: '652', label: 'tests passing' },
  { value: '7+', label: 'tool-call dialects recovered' },
  { value: 'Verified', label: 'real coding workflows' },
  { value: 'Smoke-tested', label: 'production package' },
  { value: 'Verified', label: 'runtime process chain' },
];

const limitations = [
  'More capable models perform better on difficult multi-file reasoning.',
  'Large one-shot prompts can still be less reliable than incremental workflows.',
  'Local performance depends heavily on hardware and model selection.',
  "Nomi's deeper memory capabilities remain an area of continued development.",
];

const Anvira = () => (
  <CleanLayout>
    <SEO
      title="Anvira v0.2 — Local-First Agentic Desktop Platform"
      description="Anvira v0.2 is a local-first agentic desktop platform: real file and terminal execution, self-correcting agent loops, tool-call recovery, strict tool mode, and hardware-aware l[...]"
      keywords="Anvira v0.2, local agent, agentic desktop, local-first AI, GGUF, CUDA inference, tool calling, self-correcting agent, LocalHouseLLM"
      canonical="https://localhousellm.com/anvira"
      schema={{
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'Anvira',
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'Windows',
        softwareVersion: '0.2',
        description:
          'Anvira is a local-first agentic desktop platform that executes real work on your machine with tool use, verification, self-correction, and hardware-aware local inference.',
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
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
          backgroundSize: '72px 72px',
          maskImage: 'radial-gradient(ellipse at 50% 0%, black 20%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 50% 0%, black 20%, transparent 70%)',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 h-[480px] w-[820px] rounded-full bg-primary/10 blur-[130px]"
      />

      <div className="max-container relative pt-10 pb-24 md:pb-28">
        <Breadcrumbs items={[{ name: 'Anvira' }]} />

        <motion.div variants={stagger} initial="hidden" animate="visible" className="max-w-4xl">
          <motion.p
            variants={fadeUp}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-border px-4 py-1.5 text-xs uppercase tracking-[0.22em] text-muted-foreground"
          >
            Anvira v0.2 · release
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="text-4xl md:text-6xl font-light leading-[1.06] tracking-tight"
          >
            Local AI that actually
            <br />
            does the work.
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-7 max-w-2xl text-lg text-muted-foreground leading-relaxed"
          >
            Anvira is a local-first agentic desktop platform that can understand tasks, use tools,
            work with real files, execute commands, recover from failures, verify its work, and
            return results — directly on your machine.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-10 flex flex-col sm:flex-row gap-3">
            <Button
              size="lg"
              asChild
              className="h-12 px-7 text-base transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
            >
              <a href={DOWNLOAD_URL} target="_blank" rel="noopener noreferrer">
                <Download className="mr-2 h-4 w-4" />
                Download Anvira v0.2
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild className="group h-12 px-7 text-base">
              <a href="#agent-engine">
                Explore the agent engine
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="mt-8 font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground"
          >
            Local execution · Agentic workflows · Self-correction · Hardware-aware inference
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="mt-10 border-l border-border pl-5 text-base text-muted-foreground"
          >
            v0.1 established the local-first workspace.{' '}
            <span className="text-foreground">v0.2 makes the agent execute real work.</span>
          </motion.p>
        </motion.div>
      </div>
    </section>

    {/* What v0.2 changes */}
    <section id="agent-engine" className="border-t border-border py-20 md:py-24">
      <div className="max-container">
        <motion.div {...inView} className="max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-light tracking-tight">What v0.2 changes</h2>
          <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
            This release is about execution reliability rather than additional interface surface.
            The work went into the runtime: how the agent uses tools, how it reads real output,
            how it recovers when something fails, and how it confirms that a task is actually done.
          </p>
        </motion.div>

        <motion.div
          {...staggerInView}
          className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3"
        >
          {changes.map((c, i) => (
            <motion.div key={c.title} variants={fadeUp} className="bg-background p-7">
              <span className="font-mono text-xs text-muted-foreground">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-4 text-base font-medium">{c.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{c.body}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>

    {/* From conversation to execution */}
    <section className="border-t border-border py-20 md:py-24">
      <div className="max-container">
        <motion.div {...inView} className="max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-light tracking-tight">
            From conversation to execution
          </h2>
          <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
            A chatbot returns text. An agentic system takes the request into a workspace, acts on
            it, and keeps going until the result holds up.
          </p>
        </motion.div>

        <motion.div
          {...inView}
          className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground"
        >
          {['Request', 'Understand', 'Execute', 'Inspect', 'Correct', 'Verify', 'Complete'].map(
            (s, i) => (
              <span key={s} className="flex items-center gap-3">
                {i > 0 && <span className="text-border">→</span>}
                <span className={i === 6 ? 'text-foreground' : undefined}>{s}</span>
              </span>
            ),
          )}
        </motion.div>

        <motion.div {...staggerInView} className="mt-12 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <motion.div
            variants={fadeUp}
            className="rounded-2xl border border-border bg-background overflow-hidden"
          >
            <div className="flex items-center gap-2 border-b border-border px-5 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-muted" />
              <span className="h-2.5 w-2.5 rounded-full bg-muted" />
              <span className="h-2.5 w-2.5 rounded-full bg-muted" />
              <span className="ml-3 font-mono text-xs text-muted-foreground">anvira · request</span>
            </div>
            <div className="p-6 font-mono text-sm leading-relaxed text-foreground">
              <span className="text-muted-foreground">&gt; </span>
              Create a Python script that processes this dataset, run it, fix any errors, and
              verify the results.
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="rounded-2xl border border-border bg-background overflow-hidden"
          >
            <div className="flex items-center gap-2 border-b border-border px-5 py-3">
              <Terminal className="h-3.5 w-3.5 text-muted-foreground" aria-hidden="true" />
              <span className="font-mono text-xs text-muted-foreground">execution trace</span>
            </div>
            <ol className="p-6 space-y-0">
              {trace.map((step, i) => (
                <li key={step} className="relative pl-8 pb-4 last:pb-0">
                  {i < trace.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="absolute left-[7px] top-4 bottom-0 w-px bg-border"
                    />
                  )}
                  <span
                    aria-hidden="true"
                    className={`absolute left-0 top-[5px] h-[15px] w-[15px] rounded-full border ${
                      i === trace.length - 1
                        ? 'border-primary bg-primary/20'
                        : 'border-border bg-background'
                    }`}
                  />
                  <span className="font-mono text-sm">{step}</span>
                </li>
              ))}
            </ol>
          </motion.div>
        </motion.div>
      </div>
    </section>

    {/* Self-correcting execution */}
    <section className="border-t border-border py-20 md:py-24">
      <div className="max-container">
        <motion.div {...inView} className="max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-light tracking-tight">
            Anvira doesn't stop at the first error.
          </h2>
          <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
            The runtime can detect when work has not been properly verified, feed actual command
            failures back into the workflow, and drive corrective iterations until the step either
            passes verification or is reported honestly.
          </p>
        </motion.div>

        <motion.div {...staggerInView} className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {correction.map((c) => (
            <motion.div key={c.title} variants={fadeUp}>
              <c.icon className="h-5 w-5 text-primary" aria-hidden="true" />
              <h3 className="mt-4 text-base font-medium">{c.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{c.body}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>

    {/* Tool-call resilience */}
    <section className="border-t border-border py-20 md:py-24">
      <div className="max-container grid gap-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] md:gap-20">
        <motion.div {...inView}>
          <h2 className="text-2xl md:text-3xl font-light tracking-tight">Tool-call resilience</h2>
          <p className="mt-5 text-muted-foreground leading-relaxed">
            Local models do not all emit tool calls in the same format. v0.2 includes a recovery
            layer that parses and repairs calls across 7+ observed dialects.
          </p>
          <p className="mt-5 text-foreground">
            Different local models should not require rebuilding the execution layer around them.
          </p>
        </motion.div>

        <motion.ul {...staggerInView} className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
          {dialects.map((d) => (
            <motion.li
              key={d}
              variants={fadeUp}
              className="bg-background px-6 py-5 font-mono text-sm text-muted-foreground"
            >
              {d}
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>

    {/* Strict tool mode */}
    <section className="border-t border-border py-20 md:py-24">
      <div className="max-container grid gap-12 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] md:gap-20 items-start">
        <motion.div {...inView}>
          <h2 className="text-2xl md:text-3xl font-light tracking-tight">Strict tool mode</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Structured execution for smaller local models.
          </p>
          <p className="mt-5 text-muted-foreground leading-relaxed">
            Anvira supports schema-constrained action envelopes for agent execution. Generation is
            held to a defined shape, which reduces malformed tool calls and improves protocol
            adherence on smaller models. On environments without structured decoding support,
            Anvira falls back to legacy native tool behaviour.
          </p>
        </motion.div>

        <motion.div {...staggerInView} className="grid gap-4">
          {['tool', 'final'].map((action) => (
            <motion.pre
              key={action}
              variants={fadeUp}
              className="rounded-xl border border-border bg-background p-6 font-mono text-sm text-foreground overflow-x-auto"
            >
{`{
  "action": "${action}"
}`}            </motion.pre>
          ))}
        </motion.div>
      </div>
    </section>

    {/* Local inference */}
    <section className="border-t border-border py-20 md:py-24">
      <div className="max-container">
        <motion.div {...inView} className="max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-light tracking-tight">
            Your hardware matters. Anvira adapts to it.
          </h2>
          <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
            Anvira detects and works with local hardware — CPU, RAM, NVIDIA GPU, VRAM, and CUDA
            capability — and uses that information to tune how models are loaded and run.
          </p>
        </motion.div>

        <motion.div {...staggerInView} className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {hardware.map((h) => (
            <motion.div key={h} variants={fadeUp} className="bg-background px-6 py-6">
              <Cpu className="h-4 w-4 text-primary" aria-hidden="true" />
              <p className="mt-3 text-sm font-medium">{h}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div {...inView} className="mt-10 max-w-3xl">
          <Accordion type="single" collapsible className="rounded-2xl border border-border px-6">
            <AccordionItem value="engineering" className="border-none">
              <AccordionTrigger className="text-sm">
                Engineering details — inference configuration
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed space-y-3">
                <p>
                  Anvira runs GGUF models through a CUDA-enabled local runtime. On startup it
                  profiles available VRAM and system RAM, then selects an inference profile that
                  sets how many transformer layers are offloaded to the GPU and how large a context
                  window can be held without spilling.
                </p>
                <p>
                  Context size, GPU layer count, and batch behaviour are derived from that profile
                  rather than fixed defaults, so the same model file behaves differently on a 4GB
                  laptop GPU than on a larger card. Profiles can be overridden inside the
                  application for users who want manual control.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </motion.div>
      </div>
    </section>

    {/* Benchmarks */}
    <section className="border-t border-border py-20 md:py-24">
      <div className="max-container">
        <motion.div {...inView} className="max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-light tracking-tight">
            Verified local performance
          </h2>
          <p className="mt-5 text-muted-foreground leading-relaxed">
            Measured on the development machine:{' '}
            <span className="text-foreground">NVIDIA RTX 3050 Laptop GPU · 4GB VRAM</span>.
          </p>
        </motion.div>

        <motion.div {...staggerInView} className="mt-12 grid gap-5 sm:grid-cols-3">
          {benchmarks.map((b) => (
            <motion.div
              key={b.model}
              variants={fadeUp}
              className="glass rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30"
            >
              <p className="font-mono text-xs text-muted-foreground">{b.quant}</p>
              <h3 className="mt-3 text-base font-medium">{b.model}</h3>
              <p className="mt-5 text-3xl font-light tracking-tight">{b.gen}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.16em] text-muted-foreground">
                generation
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div {...inView} className="mt-8 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <Gauge className="h-4 w-4 text-primary" aria-hidden="true" />
          <span>
            Prompt processing measured at <span className="text-foreground">~49 tok/s</span> on the
            7B configuration.
          </span>
        </motion.div>

        <motion.p {...inView} className="mt-4 text-xs text-muted-foreground">
          These are development-machine measurements, not universal performance guarantees.
          Performance varies with model, quantization, hardware, context size, and workload.
        </motion.p>
      </div>
    </section>

    {/* Model scaling */}
    <section className="border-t border-border py-20 md:py-24">
      <div className="max-container">
        <motion.div {...inView} className="max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-light tracking-tight">Model scaling</h2>
          <p className="mt-5 text-muted-foreground leading-relaxed">
            Anvira is designed to make local models useful across different hardware classes.
          </p>
        </motion.div>

        <motion.div {...staggerInView} className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3">
          {scaling.map((s) => (
            <motion.div key={s.size} variants={fadeUp} className="bg-background p-7">
              <p className="text-3xl font-light tracking-tight">{s.size}</p>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{s.body}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.p {...inView} className="mt-8 max-w-2xl text-sm text-muted-foreground">
          Smaller models still have a lower reasoning ceiling. Complex workflows benefit from
          stronger models.
        </motion.p>
      </div>
    </section>

    {/* Architecture */}
    <section className="border-t border-border py-20 md:py-24">
      <div className="max-container">
        <motion.h2 {...inView} className="max-w-2xl text-2xl md:text-3xl font-light tracking-tight">
          Architecture
        </motion.h2>

        <motion.ol {...staggerInView} className="mt-12 mx-auto max-w-md">
          {architecture.map((node, i) => (
            <motion.li key={node} variants={fadeUp} className="text-center">
              <div
                className={`rounded-xl border px-6 py-4 font-mono text-sm ${
                  i === architecture.length - 1
                    ? 'border-primary/40 bg-primary/5 text-foreground'
                    : 'border-border bg-background text-muted-foreground'
                }`}
              >
                {node}
              </div>
              {i < architecture.length - 1 && (
                <span aria-hidden="true" className="block py-1.5 text-border">
                  ↓
                </span>
              )}
            </motion.li>
          ))}
        </motion.ol>

        <motion.div {...inView} className="mt-16 rounded-2xl border border-border p-8 text-center">
          <p className="text-sm text-muted-foreground">
            Anvira is a product built on the LocalHouseLLM modular stack — not an Electron chat
            interface.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {stackLayers.map((l) => (
              <Link
                key={l.name}
                to={l.to}
                className="rounded-full border border-border px-4 py-1.5 font-mono text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
              >
                {l.name}
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </section>

    {/* v0.1 → v0.2 */}
    <section className="border-t border-border py-20 md:py-24">
      <div className="max-container">
        <motion.h2 {...inView} className="max-w-2xl text-2xl md:text-3xl font-light tracking-tight">
          v0.1 → v0.2
        </motion.h2>

        <motion.div {...staggerInView} className="mt-12 grid gap-5 md:grid-cols-2">
          <motion.div variants={fadeUp} className="rounded-2xl border border-border p-8">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              v0.1
            </p>
            <h3 className="mt-3 text-xl font-light">The local-first foundation</h3>
            <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
              {['Local workspace', 'Agents', 'Context', 'Local execution', 'Modular architecture'].map(
                (x) => (
                  <li key={x} className="flex items-center gap-3">
                    <Boxes className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    {x}
                  </li>
                ),
              )}
            </ul>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="glass rounded-2xl border border-primary/25 p-8"
          >
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              v0.2
            </p>
            <h3 className="mt-3 text-xl font-light">The execution layer</h3>
            <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
              {[
                'Real tool execution',
                'Self-correction',
                'Verification',
                'Tool-call recovery',
                'Strict tool mode',
                'Hardware-aware inference',
                'Production verification',
              ].map((x) => (
                <li key={x} className="flex items-center gap-3">
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-primary" aria-hidden="true" />
                  {x}
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        <motion.p {...inView} className="mt-8 max-w-2xl text-sm text-muted-foreground">
          v0.2 is an extension of the foundation v0.1 established — the workspace stayed, the
          execution layer grew around it.
        </motion.p>
      </div>
    </section>

    {/* Verification */}
    <section className="border-t border-border py-20 md:py-24">
      <div className="max-container">
        <motion.div {...inView} className="max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-light tracking-tight">
            Built, tested, packaged, verified.
          </h2>
          <p className="mt-5 text-muted-foreground leading-relaxed">
            Verification covered both the underlying engine and the packaged desktop application,
            including the runtime process chain the shipped build depends on.
          </p>
        </motion.div>

        <motion.div {...staggerInView} className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-5">
          {metrics.map((m) => (
            <motion.div key={m.label} variants={fadeUp} className="bg-background p-7">
              <p className="text-2xl font-light tracking-tight">{m.value}</p>
              <p className="mt-2 text-xs uppercase tracking-[0.14em] text-muted-foreground">
                {m.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>

    {/* Limitations */}
    <section className="border-t border-border py-16">
      <div className="max-container max-w-3xl">
        <motion.h2 {...inView} className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
          Honest limitations
        </motion.h2>
        <motion.ul {...staggerInView} className="mt-6 space-y-3 text-sm text-muted-foreground">
          {limitations.map((l) => (
            <motion.li key={l} variants={fadeUp} className="flex gap-3">
              <FileStack className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              {l}
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>

    {/* Final CTA */}
    <section className="relative overflow-hidden border-t border-border py-24 md:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 h-[400px] w-[760px] rounded-full bg-primary/10 blur-[130px]"
      />
      <motion.div {...staggerInView} className="max-container relative text-center">
        <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-light tracking-tight">
          Run your AI where your work lives.
        </motion.h2>
        <motion.p
          variants={fadeUp}
          className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground leading-relaxed"
        >
          Anvira v0.2 brings local models, agent execution, tools, verification, and hardware-aware
          inference into one desktop environment.
        </motion.p>

        <motion.div variants={fadeUp} className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            size="lg"
            asChild
            className="h-12 px-7 text-base transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
          >
            <a href={DOWNLOAD_URL} target="_blank" rel="noopener noreferrer">
              <Download className="mr-2 h-4 w-4" />
              Download Anvira v0.2
            </a>
          </Button>
          <Button size="lg" variant="ghost" asChild className="h-12 px-7 text-base">
            <Link to="/contact">Send feedback</Link>
          </Button>
        </motion.div>

        <motion.p
          variants={fadeUp}
          className="mt-8 font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground"
        >
          Windows · Local GGUF inference · CUDA support · Local execution
        </motion.p>
      </motion.div>
    </section>
  </CleanLayout>
);

export default Anvira;
