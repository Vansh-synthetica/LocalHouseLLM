import Layout from '@/components/Layout';
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
  ArrowRight,
} from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const Section = ({
  children,
  className = '',
  as: Tag = 'section',
}: {
  children: React.ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}) => (
  <Tag className={`py-20 md:py-28 ${className}`}>
    <div className="max-container">{children}</div>
  </Tag>
);

const Mission = () => {
  const missionSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'LocalHouseLLM Mission — Open, Modular Infrastructure for Decentralized AI',
    url: 'https://localhousellm.com/mission',
    description:
      'LocalHouseLLM is building open, modular infrastructure for decentralized AI — communication, orchestration, memory, safety, tools, and intelligence modules anyone can assemble.',
    publisher: {
      '@type': 'Organization',
      name: 'LocalHouseLLM',
      url: 'https://localhousellm.com',
    },
  };

  const stack = [
    { icon: Network, title: 'Communication', desc: 'AICL — a structured protocol for AI modules to coordinate clearly and safely.' },
    { icon: Cpu, title: 'Orchestration', desc: 'Route tasks between expert modules with transparent, traceable logic.' },
    { icon: BookOpen, title: 'Memory', desc: 'Portable, user-owned context that travels across tools and sessions.' },
    { icon: Lock, title: 'Safety', desc: 'Built-in verification — factual, logical, and ethical checks at every step.' },
    { icon: Blocks, title: 'Tools', desc: 'Reusable components for retrieval, action, and integration with real systems.' },
    { icon: Globe, title: 'Intelligence Modules', desc: 'Specialized experts — swap, upgrade, or extend without retraining the whole stack.' },
  ];

  const useCases = [
    { icon: GraduationCap, title: 'AI Tutors', desc: 'Personalized learning systems tuned to a student, school, or language.' },
    { icon: Stethoscope, title: 'Healthcare Support', desc: 'On-premise assistants for clinics that need privacy and accuracy.' },
    { icon: Sprout, title: 'Farming Advisors', desc: 'Offline-capable AI for rural communities and local agricultural knowledge.' },
    { icon: BookOpen, title: 'Research Assistants', desc: 'Composable reasoning systems built for specific fields and institutions.' },
  ];

  return (
    <Layout>
      <SEO
        title="Mission — Open, Modular Infrastructure for Decentralized AI | LocalHouseLLM"
        description="LocalHouseLLM is building open, modular infrastructure for decentralized AI. Communication, orchestration, memory, safety, tools, and intelligence — assembled like LEGO bricks, owned by the people who use it."
        keywords="LocalHouseLLM mission, decentralized AI, open AI infrastructure, modular AI, AI ownership, AI sovereignty, open source AI, AICL, AMAI, AI building blocks"
        canonical="https://localhousellm.com/mission"
        type="article"
        schema={missionSchema}
      />

      {/* HERO */}
      <Section className="pt-24 md:pt-32">
        <div className="max-w-4xl mx-auto text-center">
          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={0}
            className="text-xs tracking-[0.25em] uppercase text-muted-foreground mb-6"
          >
            Our Mission
          </motion.p>
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={1}
            className="text-4xl md:text-6xl font-bold leading-[1.1] tracking-tight mb-8"
          >
            Open, modular infrastructure
            <br />
            <span className="text-muted-foreground">for decentralized AI.</span>
          </motion.h1>
          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={2}
            className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto"
          >
            LocalHouseLLM exists to make artificial intelligence accessible, modular, and owned by
            the people who use it.
          </motion.p>
        </div>
      </Section>

      {/* MANIFESTO */}
      <Section className="border-t border-border/40">
        <motion.article
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeUp}
          className="max-w-3xl mx-auto space-y-6 text-lg md:text-xl text-foreground/90 leading-relaxed"
        >
          <h2 className="sr-only">Manifesto</h2>
          <p>
            Instead of relying on centralized AI controlled by a handful of organizations, we are
            building open infrastructure that enables anyone to create, customize, and deploy AI
            systems for their own needs.
          </p>
          <p>
            Our goal is to provide the building blocks of AI — communication, orchestration, memory,
            safety, tools, and intelligence modules — as a modular ecosystem that can be assembled
            like LEGO bricks.
          </p>
          <p>
            Whether you are building an AI tutor, a research assistant, a farming advisor, a
            healthcare support system, or an entirely new category of intelligence, you should be
            able to combine reusable components and create systems tailored to your community,
            language, industry, or mission.
          </p>
          <p>
            We believe the future of AI should be decentralized, transparent, and accessible to
            everyone — not limited to large corporations.
          </p>
          <p className="text-foreground font-medium pt-2">
            LocalHouseLLM is building the foundation for that future.
          </p>
        </motion.article>
      </Section>

      {/* WHY THIS MATTERS */}
      <Section className="border-t border-border/40">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground mb-4">
              Why this matters
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              AI is becoming infrastructure. Who owns it matters.
            </h2>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={1}
            className="space-y-5 text-muted-foreground text-base md:text-lg leading-relaxed"
          >
            <p>
              The most powerful AI systems today are concentrated inside a handful of companies.
              Their priorities, biases, and constraints quietly shape the tools the rest of the
              world depends on.
            </p>
            <p>
              We think that is a fragile foundation for something as important as intelligence.
              Communities, researchers, and builders deserve AI they can inspect, adapt, and
              actually own.
            </p>
            <p>
              Decentralization is not a slogan. It is a design choice — and it has to be built into
              the infrastructure from the start.
            </p>
          </motion.div>
        </div>
      </Section>

      {/* WHAT WE ARE BUILDING */}
      <Section className="border-t border-border/40">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="max-w-3xl mb-14"
        >
          <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground mb-4">
            What we are building
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
            A modular ecosystem, not a single model.
          </h2>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
            Instead of one monolithic system, LocalHouseLLM is a set of interoperable layers.
            Each piece does one thing well — and every piece is replaceable.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {stack.map((item, i) => (
            <motion.div
              key={item.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={fadeUp}
              custom={i}
              className="glass p-6 rounded-xl border border-border/40 hover:border-border transition-colors duration-300"
            >
              <item.icon className="w-5 h-5 mb-4 text-foreground" />
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* USE CASES */}
      <Section className="border-t border-border/40">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="max-w-3xl mb-14"
        >
          <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground mb-4">
            Real-world use cases
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
            Intelligence shaped to its context.
          </h2>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
            The same building blocks. Different missions. Built by the communities they serve.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-4">
          {useCases.map((item, i) => (
            <motion.div
              key={item.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={fadeUp}
              custom={i}
              className="glass p-6 rounded-xl border border-border/40 flex gap-5"
            >
              <item.icon className="w-6 h-6 shrink-0 mt-1 text-foreground" />
              <div>
                <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section className="border-t border-border/40">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
            Build the future of AI with us.
          </h2>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-10">
            We are early, deliberate, and building in the open. If decentralized, modular AI matters
            to you — there is a place for you here.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/opensource">
              <Button variant="outline" className="border-border bg-transparent hover:bg-foreground/5">
                Explore Open Source
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button className="bg-foreground text-background hover:bg-foreground/90">
                Get in touch
              </Button>
            </Link>
          </div>
        </motion.div>
      </Section>
    </Layout>
  );
};

export default Mission;
