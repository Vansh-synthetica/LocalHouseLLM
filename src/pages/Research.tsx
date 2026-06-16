import CleanLayout from '@/components/CleanLayout';
import SEO from '@/components/SEO';
import { motion } from 'framer-motion';
import { ArrowUpRight, FileText, Github } from 'lucide-react';

const papers = [
  {
    title: 'Adaptive Modular AI: A New Paradigm for Scalable, Safe, and Efficient Language Models',
    summary:
      'Introduces AMAI — a modular architecture that replaces parameter bloat with composable expert modules, structured communication, and built-in verification.',
    year: '2026',
    venue: 'SSRN',
    url: 'https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5695122',
  },
  {
    title: 'Shadow AMAI: An Architecture for Unconstrained Adaptive Modular Intelligence',
    summary:
      'Extends AMAI with a shadow execution layer that enables exploratory reasoning, parallel hypothesis generation, and safer experimentation.',
    year: '2026',
    venue: 'SSRN',
    url: 'https://papers.ssrn.com/sol3/cf_dev/AbsByAuth.cfm?per_id=7748829',
  },
  {
    title: 'CoT Looping Systems, Continuous Hypothesis Propagation, and Predictability Ratios',
    summary:
      'A framework for iterative chain-of-thought reasoning, where hypotheses are propagated, evaluated, and refined under measurable predictability constraints.',
    year: '2026',
    venue: 'SSRN',
    url: 'https://papers.ssrn.com/sol3/papers.cfm?abstract_id=6041794',
  },
  {
    title:
      'ADAPT: Adaptive Decomposition and Parallel Task Execution for Memory-Efficient Large Language Model Inference',
    summary:
      'Proposes a decomposition strategy that breaks inference into parallel sub-tasks, lowering memory overhead while preserving reasoning fidelity.',
    year: '2026',
    venue: 'SSRN',
    url: 'https://papers.ssrn.com/sol3/cf_dev/AbsByAuth.cfm?per_id=7748829',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const Research = () => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Research — LocalHouseLLM',
    url: 'https://localhousellm.com/research',
    description:
      'Research from LocalHouseLLM on modular AI architecture, adaptive intelligence, chain-of-thought reasoning, and memory-efficient inference.',
    hasPart: papers.map((p) => ({
      '@type': 'ScholarlyArticle',
      headline: p.title,
      url: p.url,
      datePublished: p.year,
      publisher: { '@type': 'Organization', name: 'LocalHouseLLM' },
    })),
  };

  return (
    <CleanLayout>
      <SEO
        title="Research — Modular AI, Adaptive Intelligence & Reasoning | LocalHouseLLM"
        description="Read LocalHouseLLM's research on modular AI architecture, adaptive intelligence, chain-of-thought reasoning, and memory-efficient inference. Foundational work for decentralised AI."
        keywords="LocalHouseLLM research, AMAI, Shadow AMAI, CoT looping, ADAPT, modular AI papers, AICL research, AI infrastructure research"
        canonical="https://localhousellm.com/research"
        type="article"
        schema={schema}
      />

      {/* HERO */}
      <section className="pt-12 md:pt-24 pb-16 md:pb-20">
        <div className="max-container max-w-4xl">
          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-[11px] tracking-[0.25em] uppercase text-muted-foreground mb-5"
          >
            Research
          </motion.p>
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={1}
            className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight leading-[1.05] mb-8"
          >
            Foundational work on modular, adaptive AI.
          </motion.h1>
          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={2}
            className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl"
          >
            Our research investigates the architectural questions behind decentralised
            intelligence — how modules communicate, how reasoning is decomposed, and how systems
            stay efficient at scale.
          </motion.p>
        </div>
      </section>

      {/* PAPERS */}
      <section className="border-t border-border/40 py-16 md:py-24">
        <div className="max-container">
          <ul className="divide-y divide-border/40 border-y border-border/40">
            {papers.map((p, i) => (
              <motion.li
                key={p.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                variants={fadeUp}
                custom={i}
              >
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block py-8 md:py-10"
                >
                  <div className="grid md:grid-cols-12 gap-4 md:gap-8 items-start">
                    <div className="md:col-span-2 flex md:flex-col items-center md:items-start gap-3 md:gap-2 text-[11px] tracking-[0.2em] uppercase text-muted-foreground">
                      <span>{p.year}</span>
                      <span className="text-foreground/40">·</span>
                      <span>{p.venue}</span>
                    </div>
                    <div className="md:col-span-9">
                      <h2 className="text-xl md:text-2xl font-semibold leading-snug text-foreground group-hover:text-foreground transition-colors">
                        {p.title}
                      </h2>
                      <p className="mt-3 text-muted-foreground text-base leading-relaxed max-w-3xl">
                        {p.summary}
                      </p>
                    </div>
                    <div className="md:col-span-1 flex md:justify-end">
                      <span className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-border/40 group-hover:border-border group-hover:bg-foreground/5 transition-all">
                        <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                      </span>
                    </div>
                  </div>
                </a>
              </motion.li>
            ))}
          </ul>

          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mt-12 text-sm text-muted-foreground flex items-center gap-2"
          >
            <FileText className="w-4 h-4" />
            Papers are hosted on SSRN. New work is published as the research programme advances.
          </motion.p>
        </div>
      </section>
    </CleanLayout>
  );
};

export default Research;
