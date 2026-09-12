import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

import CleanLayout from '@/components/CleanLayout';
import SEO from '@/components/SEO';
import { NodeField, LocalMachine } from '@/components/home/HomeVisuals';
import { WorkspaceVisual } from '@/components/anvira/AnviraVisuals';
import anviraBranch from '@/assets/anvira-botanical-branch.png';
import anviraFoliage from '@/assets/anvira-foliage-silhouette.png';
import forestImage from '@/assets/video-poster.jpg';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import '@/pages/anvira.css';
import './home.css';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Lenis's own scroll virtualization can fight with a sticky-heavy,
// scroll-linked page like this one on touch devices; native mobile scroll
// is already smooth via OS momentum, so only run it on non-touch input.
const isCoarsePointer = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(pointer: coarse)').matches;

const revealUp = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
};

const revealStage = {
  hidden: { opacity: 0, scale: 0.97 },
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
    viewport={{ once: true, margin: '-100px' }}
    variants={variants}
  >
    {children}
  </motion.div>
);

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

const Hero = () => {
  return (
    <section className="lh-hero">
      <div className="lh-shell lh-hero__grid">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lh-eyebrow"
          >
            LocalHouseLLM
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="lh-mark">Intelligence,</span>
            <span>built</span>
            <span>differently.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="lh-hero__copy"
          >
            Building the systems that make intelligence modular, persistent, executable and yours.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="lh-hero__copy"
          >
            We believe your AI should live on your machine, remember you, and work for you — not live in someone
            else's cloud.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="lh-actions"
          >
            <a href="#idea" className="lh-button lh-button--primary">
              Explore LocalHouseLLM <ArrowRight className="h-3.5 w-3.5" />
            </a>
            <Link to="/anvira" className="lh-button lh-button--secondary">
              Meet Anvira
            </Link>
          </motion.div>
        </div>

        <div style={{ position: 'relative' }}>
          <NodeField />
          <img src={anviraBranch} alt="" aria-hidden="true" className="lh-hero__branch" />
          <img src={anviraFoliage} alt="" aria-hidden="true" className="lh-hero__leaf" />
        </div>
      </div>

      <div className="lh-scroll-cue">
        <span>Scroll</span>
        <i aria-hidden="true" />
      </div>
    </section>
  );
};

const OpeningTransition = () => (
  <div className="lh-opener">
    <Reveal className="lh-opener__line">
      <p>
        One <strong>intelligence</strong>.
      </p>
    </Reveal>
    <Reveal className="lh-opener__line">
      <p>
        Becomes <strong>systems</strong>.
      </p>
    </Reveal>
    <Reveal className="lh-opener__line">
      <p>
        Becomes <strong>infrastructure</strong>.
      </p>
    </Reveal>
  </div>
);

// One real photograph, used exactly once — the same restraint Anthropic
// applies to its own single full-bleed image band, rather than scattering
// abstract decoration through every section.
const ImageBand = () => (
  <div className="lh-imageband">
    <div className="lh-imageband__frame" style={{ backgroundImage: `url(${forestImage})` }}>
      <div className="lh-shell lh-imageband__quote">
        <Reveal>
          <p>Grown, not assembled — intelligence that adapts to where it lives.</p>
          <span>LocalHouseLLM</span>
        </Reveal>
      </div>
    </div>
  </div>
);

// A quiet watermark inside the Anvira section rather than a dedicated
// transition — the same eye + line-sweep drawing technique as Anvira's own
// privacy motif, sitting behind the copy so it reads as ambient texture,
// not a moment the page stops for.
const EyeWatermark = () => (
  <motion.div
    className="lh-eye-mark"
    aria-hidden="true"
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-100px' }}
  >
    <svg viewBox="0 0 240 150">
      <motion.path
        className="lh-eye-mark__outline"
        d="M12 75 Q120 6 228 75 Q120 144 12 75 Z"
        variants={{ hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 } }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.circle
        className="lh-eye-mark__pupil"
        cx="120"
        cy="75"
        r="19"
        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
        transition={{ duration: 0.5, delay: 0.35 }}
      />
      <motion.line
        className="lh-eye-mark__slash"
        x1="26"
        y1="26"
        x2="214"
        y2="124"
        variants={{ hidden: { pathLength: 0, opacity: 0 }, visible: { pathLength: 1, opacity: 1 } }}
        transition={{ pathLength: { duration: 1.3, delay: 0.6, ease: 'easeInOut' }, opacity: { duration: 0.2, delay: 0.6 } }}
      />
    </svg>
  </motion.div>
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
      <SectionIntro eyebrow="The idea" title={<>Intelligence shouldn't<br />live inside a<br /><span className="lh-mark">single model</span>.</>}>
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
        <Link to="/stack" className="lh-button lh-button--secondary">
          See the full architecture <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </Reveal>
    </div>
  </section>
);

// A single calm teaser, not a full demo — the full workspace experience
// lives on its own dedicated page at /anvira.
const AnviraSection = () => (
  <section className="lh-section lh-section--line lh-anvira-teaser" id="anvira">
    <EyeWatermark />
    <div className="lh-shell">
      <Reveal className="lh-anvira-teaser__intro">
        <p className="lh-eyebrow">Our first environment</p>
        <h2>
          Meet <span className="lh-mark">Anvira</span>.
        </h2>
        <p>
          A local-first AI workspace where conversation, knowledge, agents, notes and learning
          live together.
        </p>
      </Reveal>
      <Reveal className="lh-anvira__lines">
        <span>One workspace.</span>
        <span>One context.</span>
        <span>Your intelligence.</span>
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
      <SectionIntro eyebrow="Local-first" title={<>Intelligence should<br /><span className="lh-mark">belong</span> to the<br />people using it.</>}>
        <p>Local-first by default. Cloud when you choose it.</p>
      </SectionIntro>
      <Reveal className="lh-section__stage" variants={revealStage}>
        <LocalMachine />
      </Reveal>
    </div>
  </section>
);

const BiggerPicture = () => (
  <div className="lh-cinema">
    <Reveal className="lh-cinema__line">
      <p>The best AI won't be the biggest model. It'll be the one that's actually yours.</p>
    </Reveal>
    <Reveal className="lh-cinema__sub">
      <p>Systems you can inspect, extend, and keep — not rent.</p>
    </Reveal>
  </div>
);

const FinalSection = () => (
  <section className="lh-final">
    <img src={anviraBranch} alt="" aria-hidden="true" className="lh-final__branch" />
    <div className="lh-shell">
      <Reveal variants={revealStage}>
        <h2>
          <span>Intelligence,</span>
          <span>built to</span>
          <span className="lh-mark">belong.</span>
        </h2>
        <p>Building infrastructure for modular, persistent, executable intelligence.</p>
        <p className="lh-final__meta">LocalHouseLLM</p>
        <div className="lh-actions">
          <Link to="/anvira" className="lh-button lh-button--primary">
            Explore Anvira <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <Link to="/stack" className="lh-button lh-button--secondary">
            Explore the technology
          </Link>
        </div>
      </Reveal>
    </div>
  </section>
);

const Index = () => {
  // Same slower, heavier scroll feel as the Anvira page, scoped to this
  // page only, so the scroll-linked transitions read as motion.
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
        <OpeningTransition />
        <ImageBand />
        <ThesisSection />
        <AnviraSection />
        <LocalFirstSection />
        <BiggerPicture />
        <FinalSection />
      </div>
    </CleanLayout>
  );
};

export default Index;
