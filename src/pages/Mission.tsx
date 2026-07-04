import CleanLayout from '@/components/CleanLayout';
import SEO from '@/components/SEO';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Blocks,
  Network,
  Lock,
  Globe,
  Cpu,
  BookOpen,
  Stethoscope,
  Sprout,
  GraduationCap,
  FlaskConical,
  ArrowRight,
} from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[11px] tracking-[0.25em] uppercase text-muted-foreground mb-5">{children}</p>
);

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

  const stack = [
    { icon: Network, title: 'Communication', desc: 'AICL — a structured protocol that lets AI modules coordinate clearly and safely.' },
    { icon: Cpu, title: 'Orchestration', desc: 'Route tasks across expert modules with transparent, traceable logic.' },
    { icon: BookOpen, title: 'Memory', desc: 'Portable, user-owned context that persists across tools, sessions, and devices.' },
    { icon: Lock, title: 'Safety', desc: 'Built-in verification — factual, logical, and ethical checks at every step.' },
    { icon: Blocks, title: 'Tools', desc: 'Reusable components for retrieval, action, and integration with real systems.' },
    { icon: Globe, title: 'Intelligence Modules', desc: 'Specialised experts — extend, swap, or upgrade independently of the whole.' },
  ];

  const useCases = [
    { icon: GraduationCap, title: 'AI tutors', desc: 'Personalised learning shaped to a student, school, or language.' },
    { icon: Stethoscope, title: 'Healthcare support', desc: 'On-premise assistants for clinics that require privacy and accuracy.' },
    { icon: Sprout, title: 'Agricultural advisors', desc: 'Offline-capable systems for rural communities and local knowledge.' },
    { icon: FlaskConical, title: 'Research assistants', desc: 'Composable reasoning systems built for specific fields and institutions.' },
  ];

  return (
    <CleanLayout>
      <SEO
        title="Mission — Open, Modular Infrastructure for Decentralized AI | LocalHouseLLM"
        description="LocalHouseLLM exists to make artificial intelligence accessible, modular, and owned by the people who use it. We build open, interoperable infrastructure for decentralised AI."
        keywords="LocalHouseLLM mission, decentralized AI, open AI infrastructure, modular AI, AI ownership, interoperable components, composable AI, open source AI, AICL, AMAI"
        canonical="https://localhousellm.lovable.app/mission"
        type="article"
        schema={missionSchema}
      />

      {/* HERO */}
      <section className="pt-12 md:pt-24 pb-20 md:pb-28">
        <div className="max-container max-w-4xl">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <Eyebrow>Our Mission</Eyebrow>
          </motion.div>
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={1}
            className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight leading-[1.05] mb-8"
          >
            Making intelligence accessible, modular, and owned by the people who use it.
          </motion.h1>
          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={2}
            className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl"
          >
            LocalHouseLLM is building open, modular infrastructure for decentralised AI — the
            foundational components for a future where intelligence is composable, transparent, and
            shared.
          </motion.p>
        </div>
      </section>

      {/* MANIFESTO */}
      <section className="border-t border-border/40 py-20 md:py-28">
        <div className="max-container">
          <div className="grid md:grid-cols-12 gap-10 md:gap-16">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="md:col-span-4"
            >
              <Eyebrow>Manifesto</Eyebrow>
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight leading-tight">
                The principles we build on.
              </h2>
            </motion.div>
            <motion.article
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={fadeUp}
              custom={1}
              className="md:col-span-8 space-y-6 text-foreground/90 text-lg md:text-xl leading-relaxed"
            >
              <p>
                LocalHouseLLM exists to make artificial intelligence accessible, modular, and owned
                by the people who use it.
              </p>
              <p>
                Rather than depending on centralised AI controlled by a handful of organisations,
                we are building open infrastructure that allows anyone to create, customise, and
                deploy AI systems for their own needs.
              </p>
              <p>
                Our goal is to provide the foundational components of artificial intelligence —
                communication, orchestration, memory, safety, tools, and intelligence modules — as
                a modular ecosystem of interoperable parts.
              </p>
              <p>
                Whether the system is an AI tutor, a research assistant, an agricultural advisor,
                a healthcare support tool, or an entirely new category of intelligence, builders
                should be able to compose reusable components and shape systems for their
                community, language, industry, or mission.
              </p>
              <p>
                We believe the future of AI should be decentralised, transparent, and accessible to
                everyone — not concentrated within large corporations.
              </p>
              <p className="text-foreground font-medium pt-2">
                LocalHouseLLM is building the foundation for that future.
              </p>
            </motion.article>
          </div>
        </div>
      </section>

      {/* MODULAR STACK */}
      <section className="border-t border-border/40 py-20 md:py-28">
        <div className="max-container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="max-w-3xl mb-14"
          >
            <Eyebrow>The modular stack</Eyebrow>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-5">
              Composable layers, not a monolith.
            </h2>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
              Each component does one thing well, exposes a clear interface, and can be replaced or
              improved without rebuilding the system around it.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 border border-border/40 rounded-2xl overflow-hidden">
            {stack.map((item, i) => (
              <motion.div
                key={item.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                variants={fadeUp}
                custom={i}
                className="p-7 border-b border-r border-border/40 last:border-r-0 [&:nth-child(3n)]:border-r-0 [&:nth-last-child(-n+3)]:border-b-0"
              >
                <item.icon className="w-5 h-5 mb-5 text-foreground" />
                <h3 className="text-base font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section className="border-t border-border/40 py-20 md:py-28">
        <div className="max-container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="max-w-3xl mb-14"
          >
            <Eyebrow>In practice</Eyebrow>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-5">
              Intelligence shaped to its context.
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-px bg-border/40 border border-border/40 rounded-2xl overflow-hidden">
            {useCases.map((item, i) => (
              <motion.div
                key={item.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
                className="bg-background p-7 flex gap-5"
              >
                <item.icon className="w-6 h-6 shrink-0 mt-1 text-foreground" />
                <div>
                  <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border/40 py-24 md:py-32">
        <div className="max-container max-w-3xl">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-3xl md:text-5xl font-semibold tracking-tight mb-6 leading-tight"
          >
            Help us build the foundation.
          </motion.h2>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={1}
            className="text-muted-foreground text-base md:text-lg leading-relaxed mb-10 max-w-2xl"
          >
            We work in the open. If a decentralised, modular future for AI matters to you, there is
            a place for you here.
          </motion.p>
          <div className="flex flex-wrap gap-3">
            <Link to="/opensource">
              <Button className="bg-foreground text-background hover:bg-foreground/90 h-11 px-6">
                Explore open source <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
            <Link to="/research">
              <Button variant="outline" className="border-border bg-transparent hover:bg-foreground/5 h-11 px-6">
                Read our research
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </CleanLayout>
  );
};

export default Mission;
