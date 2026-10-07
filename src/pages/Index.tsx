import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

import CleanLayout from '@/components/CleanLayout';
import SEO from '@/components/SEO';
import { NodeField, LocalMachine } from '@/components/home/HomeVisuals';
import { ParallaxImage, ScrollWords, StackFlow } from '@/components/home/HomeMotion';
import { CountUp } from '@/components/anvira/AvMotion';
import { archive, getEntry } from '@/data/archive';
import { WorkspaceVisual } from '@/components/anvira/AnviraVisuals';
import forestImage from '@/assets/video-poster.jpg';
import '@/pages/anvira.css';
import './home.css';

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
    title: 'Anvira Notes 1.2.2',
    description:
      'Google Docs fidelity in both directions, offline OCR, faster Study on small models, and a first-run guide that only offers models your PC can run.',
    date: '1 October 2026',
    category: 'Product release',
    to: '/anvira-notes',
    cta: 'Explore Anvira Notes',
  },
  {
    title: 'Anvira 1.0.1',
    description:
      'The local agent workspace now updates itself and its runtime from one button, adds an optional account, and explains engine errors in plain language.',
    date: '21 September 2026',
    category: 'Product release',
    to: '/anvira',
    cta: 'Explore Anvira',
  },
  {
    title: 'Anvira Runtime 1.0.0',
    description:
      'One local service that both apps share: an authenticated local API, CLI, Python and TypeScript SDKs, model management, ORCHA agent execution and Nomi memory.',
    date: '20 September 2026',
    category: 'Infrastructure',
    to: '/anvira#runtime',
    cta: 'How the runtime works',
  },
];

const researchHighlights = [
  'localhousellm-master-report',
  'kv-cache-optimization',
  'five-layer-execution-stack',
  'adaptive-modular-ai',
]
  .map((slug) => getEntry(slug))
  .filter((e): e is NonNullable<typeof e> => Boolean(e));

const facts: { value: number; suffix?: string; label: string }[] = [
  { value: 21, suffix: '/21', label: 'agent workflow checks passed by a 7B model in our own testing' },
  { value: archive.length, label: 'research papers and technical reports, free to read' },
  { value: 2, label: 'desktop applications sharing one local runtime' },
  { value: 0, label: 'cloud services required — local by default, cloud only if you add it' },
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
        <h1 className="lh-hero__title">
          <span className="lh-rise" style={{ ['--d' as string]: '0ms' }}>
            Modular <span className="lh-draw" style={{ ['--d' as string]: '700ms' }}>research</span> and
          </span>{' '}
          <span className="lh-rise" style={{ ['--d' as string]: '90ms' }}>
            <span className="lh-draw" style={{ ['--d' as string]: '850ms' }}>infrastructure</span> for
          </span>{' '}
          <span className="lh-rise" style={{ ['--d' as string]: '180ms' }}>
            intelligence that belongs to you.
          </span>
        </h1>
        <div className="lh-hero__aside lh-rise" style={{ ['--d' as string]: '260ms' }}>
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
        </div>
      </div>

      <div className="lh-hero__visual lh-rise" style={{ ['--d' as string]: '360ms' }}>
        <div className="lh-hero__visual-inner">
          <NodeField />
        </div>
      </div>
    </div>
  </section>
);

const SpotlightBand = () => (
  <section className="lh-spotlight" aria-labelledby="spotlight-heading">
    <div className="lh-spotlight__frame">
      <ParallaxImage src={forestImage} className="lh-parallax" />
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

const FactsBand = () => (
  <section className="lh-facts" aria-label="LocalHouseLLM in numbers">
    <div className="lh-shell">
      <ul className="lh-facts__grid">
        {facts.map((f, i) => (
          <li key={f.label}>
            <Reveal className="lh-fact">
              <strong style={{ transitionDelay: `${i * 60}ms` }}>
                <CountUp to={f.value} suffix={f.suffix} />
              </strong>
              <span>{f.label}</span>
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
        <ScrollWords
          className="lh-mission__title"
          text="At LocalHouseLLM, we build AI infrastructure to serve people who want to own their intelligence."
        />
        <Link to="/about" className="lh-text-link">
          Learn more about our mission <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </Reveal>
    </div>
  </section>
);

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
        <p>
          Models are only one part of an intelligent system. Ours separates the rest into layers —
          here is what happens to a single request, step by step.
        </p>
      </SectionIntro>

      <StackFlow />

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
          <li key={item.slug}>
            <Reveal>
              <Link to={`/archive/${item.slug}`} className="lh-research-card">
                <div className="lh-research-card__tags">
                  <span>{item.category}</span>
                  <span>{item.source}</span>
                </div>
                <h3>{item.title}</h3>
                <span className="lh-research-card__more">
                  Read <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            </Reveal>
          </li>
        ))}
      </ul>
      <Reveal>
        <Link to="/archive" className="lh-text-link">
          All research and reports <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </Reveal>
    </div>
  </section>
);

const AnviraSection = () => (
  <section className="lh-section lh-section--line lh-anvira-teaser" id="anvira">
    <div className="lh-shell">
      <Reveal className="lh-anvira-teaser__intro">
        <p className="lh-eyebrow">Our first products</p>
        <h2>
          Meet <span className="lh-mark">Anvira</span> and Anvira Notes.
        </h2>
        <p>
          A local-first agent workspace and a notes-and-study app, both running on one shared
          local runtime — on your machine, with models you choose.
        </p>
      </Reveal>
      <Reveal className="lh-anvira-preview" variants={revealStage}>
        <WorkspaceVisual />
      </Reveal>
      <Reveal>
        <div className="lh-actions lh-actions--compact">
          <Link to="/anvira" className="lh-button lh-button--primary">
            Explore Anvira <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <Link to="/anvira-notes" className="lh-button lh-button--ghost">
            Explore Anvira Notes
          </Link>
        </div>
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
  const homeSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': 'https://localhousellm.com/#webpage',
    url: 'https://localhousellm.com/',
    name: 'LocalHouseLLM — Local-First AI Infrastructure, Anvira and Anvira Notes',
    isPartOf: { '@id': 'https://localhousellm.com/#website' },
    about: { '@id': 'https://localhousellm.com/#organization' },
    mentions: [
      { '@id': 'https://localhousellm.com/anvira#app' },
      { '@id': 'https://localhousellm.com/anvira-notes#app' },
    ],
  };

  return (
    <CleanLayout>
      <SEO
        title="LocalHouseLLM — Local-First AI Infrastructure and Apps"
        description="LocalHouseLLM builds local-first AI infrastructure — AICL, ORCHA, Nomi and Anvira Runtime — and the apps on it: the Anvira agent workspace and Anvira Notes."
        keywords="LocalHouseLLM, AI infrastructure, modular AI, AICL, ORCHA, Nomi, Anvira, Zynvera, local-first AI, decentralized AI, adaptive modular AI"
        canonical="https://localhousellm.com/"
        schema={homeSchema}
      />

      <div className="lhllm-home">
        <Hero />
        <SpotlightBand />
        <FactsBand />
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
