import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Network, Cpu, BookOpen, Lock, Blocks, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CleanLayout from '@/components/CleanLayout';
import Breadcrumbs from '@/components/Breadcrumbs';
import SEO from '@/components/SEO';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.05, duration: 0.6 } }),
};

const layers = [
  { to: '/stack/aicl', icon: Network, name: 'AICL', tag: 'Communication', desc: 'A structured protocol that lets AI modules talk to each other clearly, safely, and predictably.' },
  { to: '/stack/orcha', icon: Cpu, name: 'ORCHA', tag: 'Orchestration', desc: 'Decomposes requests, routes work across experts, and aggregates results into coherent answers.' },
  { to: '/stack/memory', icon: BookOpen, name: 'Memory', tag: 'Context', desc: 'A portable, user-owned context layer — your history travels with you across tools and sessions.' },
  { to: '/stack/safety', icon: Lock, name: 'Safety', tag: 'Verification', desc: 'Factual, logical, and policy checks at every step. Verification is a first-class layer, not an afterthought.' },
  { to: '/stack/tools', icon: Blocks, name: 'Tools', tag: 'Actions', desc: 'A library of reusable, sandboxed actions: retrieval, calculation, code execution, and integrations.' },
  { to: '/stack/modules', icon: Globe, name: 'Intelligence Modules', tag: 'Experts', desc: 'Specialized expert models you can swap, extend, or upgrade independently of the rest of the system.' },
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
          <motion.p initial="hidden" animate="visible" variants={fadeUp} className="text-[11px] tracking-[0.25em] uppercase text-muted-foreground mb-5">
            Architecture
          </motion.p>
          <motion.h1 initial="hidden" animate="visible" variants={fadeUp} custom={1} className="text-4xl md:text-6xl font-semibold tracking-tight leading-[1.05] mb-8">
            The LocalHouseLLM stack.
          </motion.h1>
          <motion.p initial="hidden" animate="visible" variants={fadeUp} custom={2} className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6">
            Modern AI systems collapse too many concerns into a single monolithic model. LocalHouseLLM separates them. Each capability — communication, orchestration, memory, safety, tools, intelligence — is its own well-defined layer, with a clear contract and an open interface.
          </motion.p>
          <motion.p initial="hidden" animate="visible" variants={fadeUp} custom={3} className="text-base md:text-lg text-muted-foreground leading-relaxed">
            The result is infrastructure you can inspect, replace, and own. Swap a memory backend. Plug in a domain-specific expert. Run on local hardware or in your private cloud. The stack stays the same.
          </motion.p>
        </div>
      </section>

      <section className="border-t border-border/40 py-16 md:py-24">
        <div className="max-container">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-10">The six layers</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {layers.map((l, i) => (
              <motion.div key={l.to} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }} variants={fadeUp} custom={i}>
                <Link to={l.to} className="group block p-7 rounded-xl border border-border/40 hover:border-border transition-colors h-full">
                  <l.icon className="w-5 h-5 mb-5 text-foreground" />
                  <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-2">{l.tag}</p>
                  <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                    {l.name}
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{l.desc}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border/40 py-16 md:py-24">
        <div className="max-container max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-6">How the layers fit together</h2>
          <div className="space-y-5 text-muted-foreground leading-relaxed">
            <p>A request enters the system. <strong className="text-foreground">ORCHA</strong> decomposes it into sub-tasks and decides which experts should handle each. It speaks to those experts using <strong className="text-foreground">AICL</strong> — a structured packet format so every exchange is observable and routable.</p>
            <p>Each expert call may read from <strong className="text-foreground">Memory</strong> (your portable context) or invoke a <strong className="text-foreground">Tool</strong> (retrieval, calculation, code execution). Before any response returns to the user, the <strong className="text-foreground">Safety</strong> layer applies factual, logical, and policy checks.</p>
            <p>The experts themselves — <strong className="text-foreground">Intelligence Modules</strong> — are independently swappable. A small local model, a fine-tuned domain expert, or a hosted frontier model can fill the same slot. The protocol does not care which.</p>
          </div>

          <div className="mt-10 p-6 rounded-xl border border-border/40 font-mono text-xs md:text-sm leading-relaxed bg-foreground/[0.02]">
            <div>user request</div>
            <div className="text-muted-foreground">  ↓</div>
            <div>ORCHA  →  decompose · route · aggregate · retry</div>
            <div className="text-muted-foreground">  ↓ (AICL packets)</div>
            <div>Intelligence Modules  +  Tools  +  Memory</div>
            <div className="text-muted-foreground">  ↓</div>
            <div>Safety  →  factual · logical · policy</div>
            <div className="text-muted-foreground">  ↓</div>
            <div>response</div>
          </div>
        </div>
      </section>

      <section className="border-t border-border/40 py-20 md:py-28">
        <div className="max-container max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-5">Build on the stack.</h2>
          <p className="text-muted-foreground mb-8">The Docs walk through installation, integration, and your first module.</p>
          <div className="flex flex-wrap gap-3">
            <Link to="/docs"><Button className="bg-foreground text-background hover:bg-foreground/90 h-11 px-6">Read the docs <ArrowRight className="w-4 h-4 ml-1" /></Button></Link>
            <Link to="/start"><Button variant="outline" className="border-border bg-transparent hover:bg-foreground/5 h-11 px-6">Start here</Button></Link>
          </div>
        </div>
      </section>
    </CleanLayout>
  );
};

export default Stack;
