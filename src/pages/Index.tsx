import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

import CleanLayout from '@/components/CleanLayout';
import SEO from '@/components/SEO';
import { NodeField, LocalMachine } from '@/components/home/HomeVisuals';
import { WorkspaceVisual } from '@/components/anvira/AnviraVisuals';
import forestImage from '@/assets/video-poster.jpg';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import '@/pages/anvira.css';
import './home.css';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const isCoarsePointer = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(pointer: coarse)').matches;

const revealUp = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
};

const revealStage = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

const Reveal = ({
  children,
  className,
  variants = revealUp,
}: {
  children: React.ReactNode;
  className?: string;
  variants?: typeof revealUp | typeof revealStage;
}) => (
  <motion.div
    className={className}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-80px' }}
    variants={variants}
  >
    {children}
  </motion.div>
);

const latestReleases = [
  {
    title: 'Introducing Anvira',
    description:
      'A local-first AI workspace where conversation, knowledge, agents, and notes live together — built on the LocalHouseLLM stack.',
    date: 'March 2026',
    category: 'Product',
    to: '/anvira',
    cta: 'Explore Anvira',
  },
  {
    title: 'The AICL communication layer',
    description:
      'A protocol for messages between intelligence modules — so orchestration, memory, and experts can interoperate without a monolith.',
    date: 'February 2026',
    category: 'Research',
    to: '/stack#aicl',
    cta: 'Read overview',
  },
  {
    title: 'ORCHA orchestration engine',
    description:
      'Decides what runs, when, and how modules compose — the execution spine applications like Anvira are built on.',
    date: 'January 2026',
    category: 'Engineering',
    to: '/stack#orcha',
    cta: 'See ORCHA',
  },
];

const researchHighlights = [
  {
    title: 'Modular intelligence thesis',
    tags: ['Research', 'Architecture'],
    to: '/stack',
  },
  {
    title: 'Local-first by default',
    tags: ['Product', 'Privacy'],
    to: '/anvira',
  },
  {
    title: 'Safety in the stack',
    tags: ['Safety', 'Engineering'],
    to: '/stack#safety',
  },
  {
    title: 'Open research archive',
    tags: ['Publications'],
    to: '/archive',
  },
];

const SectionIntro = ({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  children?: React.ReactNode;
}) => (
  <Reveal className="lh-section__intro">
    <p className="lh-eyebrow">{eyebrow}</p>
    <h2>{title}</h2>
    {children}
  </Reveal>
);

const Hero = () => (
  <section className="lh-hero">
    <div className="lh-shell">
      <div className="lh-hero__top">
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          Modular <span className="lh-mark">research</span> and{' '}
          <span className="lh-mark">infrastructure</span> for intelligence that belongs to you.
        </motion.h1>
        <motion.div
          className="lh-hero__aside"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        >
          <p>
            AI will reshape how we work and live. LocalHouseLLM is building open systems that keep
            intelligence modular, persistent, and on hardware you control — not locked in someone
            else&apos;s cloud.
          </p>
          <div className="lh-actions lh-actions--compact">
            <Link to="/anvira" className="lh-button lh-button--primary">
              Try Anvira <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link to="/stack" className="lh-button lh-button--ghost">
              Explore the stack
            </Link>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="lh-hero__visual"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="lh-hero__visual-inner">
          <NodeField />
        </div>
      </motion.div>
    </div>
  </section>
);

const SpotlightBand = () => (
  <section className="lh-spotlight" aria-labelledby="spotlight-heading">
    <div
      className="lh-spotlight__frame"
      style={{ backgroundImage: `url(${forestImage})` }}
    >
      <div className="lh-shell lh-spotlight__content">
        <Reveal>
          <p className="lh-spotlight__label">Anvira</p>
          <h2 id="spotlight-heading">
            Local-first workspace for chat, agents, and knowledge — on your machine.
          </h2>
          <Link to="/anvira" className="lh-button lh-button--on-dark">
            Read more <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </Reveal>
      </div>
    </div>
  </section>
);

const LatestReleases = () => (
  <section className="lh-section lh-section--flush" id="updates">
    <div className="lh-shell">
      <Reveal>
        <h2 className="lh-section-title">Latest releases</h2>
      </Reveal>
      <ul className="lh-release-grid">
        {latestReleases.map((item) => (
          <li key={item.title}>
            <Reveal className="lh-release-card">
              <Link to={item.to} className="lh-release-card__link">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <div className="lh-release-card__meta">
                  <span className="lh-meta-label">Date</span>
                  <span>{item.date}</span>
                  <span className="lh-meta-label">Category</span>
                  <span>{item.category}</span>
                </div>
                <span className="lh-release-card__cta">
                  {item.cta} <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            </Reveal>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

const MissionBand = () => (
  <section className="lh-mission">
    <div className="lh-shell">
      <Reveal>
        <h2 className="lh-mission__title">
          At LocalHouseLLM, we build AI infrastructure to serve people who want to{' '}
          <span className="lh-mark">own</span> their intelligence.
        </h2>
        <Link to="/about" className="lh-text-link">
          Learn more about our mission <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </Reveal>
    </div>
  </section>
);

const chain = [
  { name: 'AICL', role: 'the messages that move between every module' },
  { name: 'ORCHA', role: 'decides what happens, and when' },
  { name: 'Memory', role: 'the context that persists, user-owned' },
  { name: 'Intelligence Modules', role: 'the experts that do the reasoning' },
  { name: 'Applications', role: "Anvira, and what's built next" },
];

const ThesisSection = () => (
  <section className="lh-section lh-section--line" id="idea">
    <div className="lh-shell">
      <SectionIntro
        eyebrow="The idea"
        title={
          <>
            Intelligence shouldn&apos;t live inside a single <span className="lh-mark">model</span>.
          </>
        }
      >
        <p>Models are only one part of an intelligent system. Ours separates the rest into layers.</p>
      </SectionIntro>

      <Reveal className="lh-chain">
        {chain.map((c, i) => (
          <div className="lh-chain__item" key={c.name}>
            <div className="lh-chain__rail">
              <span className="lh-chain__dot" />
              {i < chain.length - 1 && <span className="lh-chain__line" />}
            </div>
            <div className={`lh-chain__body${i === chain.length - 1 ? ' lh-chain__body--last' : ''}`}>
              <strong>{c.name}</strong>
              <p>{c.role}</p>
            </div>
          </div>
        ))}
      </Reveal>

      <Reveal className="lh-chain-cta">
        <Link to="/stack" className="lh-button lh-button--ghost">
          See the full architecture <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </Reveal>
    </div>
  </section>
);

const ResearchGrid = () => (
  <section className="lh-section lh-section--line">
    <div className="lh-shell">
      <Reveal>
        <h2 className="lh-section-title">From the lab</h2>
      </Reveal>
      <ul className="lh-research-grid">
        {researchHighlights.map((item) => (
          <li key={item.title}>
            <Reveal>
              <Link to={item.to} className="lh-research-card">
                <div className="lh-research-card__tags">
                  {item.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <h3>{item.title}</h3>
              </Link>
            </Reveal>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

const AnviraSection = () => (
  <section className="lh-section lh-section--line lh-anvira-teaser" id="anvira">
    <div className="lh-shell">
      <Reveal className="lh-anvira-teaser__intro">
        <p className="lh-eyebrow">Our first environment</p>
        <h2>
          Meet <span className="lh-mark">Anvira</span>.
        </h2>
        <p>
          A local-first AI workspace where conversation, knowledge, agents, notes and learning live
          together.
        </p>
      </Reveal>
      <Reveal className="lh-anvira-preview" variants={revealStage}>
        <WorkspaceVisual />
      </Reveal>
      <Reveal>
        <Link to="/anvira" className="lh-button lh-button--primary">
          Explore Anvira <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </Reveal>
    </div>
  </section>
);

const LocalFirstSection = () => (
  <section className="lh-section lh-section--line" id="local-first">
    <div className="lh-shell">
      <SectionIntro
        eyebrow="Local-first"
        title={
          <>
            Intelligence should <span className="lh-mark">belong</span> to the people using it.
          </>
        }
      >
        <p>Local-first by default. Cloud when you choose it.</p>
      </SectionIntro>
      <Reveal className="lh-section__stage" variants={revealStage}>
        <LocalMachine />
      </Reveal>
    </div>
  </section>
);

const FinalSection = () => (
  <section className="lh-final">
    <div className="lh-shell">
      <Reveal variants={revealStage}>
        <h2>
          Intelligence, built to <span className="lh-mark">belong</span>.
        </h2>
        <p>Building infrastructure for modular, persistent, executable intelligence.</p>
        <div className="lh-actions">
          <Link to="/anvira" className="lh-button lh-button--primary">
            Try Anvira <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <Link to="/docs" className="lh-button lh-button--ghost">
            Developer docs
          </Link>
        </div>
      </Reveal>
    </div>
  </section>
);

const Index = () => {
  useSmoothScroll(!prefersReducedMotion() && !isCoarsePointer(), {
    duration: 2,
    wheelMultiplier: 0.7,
    touchMultiplier: 1,
    lerp: 0.06,
  });

  const homeSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'LocalHouseLLM',
    url: 'https://localhousellm.com/',
    description:
      'LocalHouseLLM builds infrastructure for modular, persistent, executable intelligence — communication, execution, memory and intelligence modules that applications like Anvira are built on.',
    sameAs: [
      'https://github.com/LocalHouseLLM',
      'https://x.com/localhousellm',
      'https://www.linkedin.com/company/localhousellm',
    ],
  };

  return (
    <CleanLayout>
      <SEO
        title="LocalHouseLLM — Intelligence, Built Differently"
        description="LocalHouseLLM builds the infrastructure that makes intelligence modular, persistent, executable and yours — AICL, Orcha, Nomi, and the environments built on them, starting with Anvira."
        keywords="LocalHouseLLM, AI infrastructure, modular AI, AICL, ORCHA, Nomi, Anvira, Zynvera, local-first AI, decentralized AI, adaptive modular AI"
        canonical="https://localhousellm.com/"
        schema={homeSchema}
      />

      <div className="lhllm-home">
        <Hero />
        <SpotlightBand />
        <LatestReleases />
        <MissionBand />
        <ThesisSection />
        <ResearchGrid />
        <AnviraSection />
        <LocalFirstSection />
        <FinalSection />
      </div>
    </CleanLayout>
  );
};

export default Index;
