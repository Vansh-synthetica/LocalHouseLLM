import { useEffect, useRef, useState, type PointerEvent, type ReactNode, type RefObject } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, Download, Menu, X } from 'lucide-react';

import SEO from '@/components/SEO';
import {
  WorkspaceVisual,
  WorkspaceOrbit,
  ContextFlow,
  MachineVisual,
  AgentVisual,
  NotesVisual,
  StudyLoop,
  ModelFoundation,
  SystemVisual,
  SprigLeaf,
} from '@/components/anvira/AnviraVisuals';
import anviraBranch from '@/assets/anvira-botanical-branch.png';
import anviraFoliage from '@/assets/anvira-foliage-silhouette.png';
import anviraMascot from '@/assets/anvira-mascot.png';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import './anvira.css';

const DOWNLOAD_URL =
  'https://github.com/Vansh-synthetica/LocalHouseLLM/releases/download/anvira-v1.1/Anvira.1.1.Pochi.exe';

const NAV_LINKS = [
  { href: '#workspace', label: 'Product' },
  { href: '#agents', label: 'Agents' },
  { href: '#notes', label: 'Notes' },
  { href: '#study', label: 'Study' },
  { href: '#models', label: 'Models' },
];

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
  children: ReactNode;
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

const SectionIntro = ({ number, title, children }: { number: string; title: ReactNode; children?: ReactNode }) => (
  <Reveal className="anvira-section__intro">
    <span className="anvira-section__number">{number}</span>
    <h2>{title}</h2>
    {children}
  </Reveal>
);

const Botanical = ({
  src,
  className,
  containerRef,
  range = 46,
}: {
  src: string;
  className: string;
  containerRef: RefObject<HTMLElement>;
  range?: number;
}) => {
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start end', 'end start'] });
  const distance = prefersReducedMotion() ? 0 : range;
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
  // The placement classes (anvira-botanical--left/right/...) carry their own static
  // `transform: rotate(...)`. Scroll-parallax is applied to an inner element instead
  // of directly on the classed one, so that rotation isn't overwritten.
  return (
    <div className={className} style={{ position: 'absolute' }}>
      <motion.img src={src} alt="" aria-hidden="true" style={{ y, display: 'block', width: '100%' }} />
    </div>
  );
};

const PrivacyEye = () => (
  <div className="anvira-local__device" aria-hidden="true">
    <svg viewBox="0 0 64 40" width="64" height="40">
      <motion.path
        d="M4 20 Q32 3 60 20 Q32 37 4 20 Z"
        className="anvira-local__eye-outline"
        initial={{ opacity: 0, scale: 0.85 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.circle
        cx="32"
        cy="20"
        r="6"
        className="anvira-local__eye-pupil"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5, delay: 0.3 }}
      />
      <motion.line
        x1="8"
        y1="9"
        x2="56"
        y2="31"
        className="anvira-local__eye-slash"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ pathLength: { duration: 1.6, delay: 0.7, ease: 'easeInOut' }, opacity: { duration: 0.2, delay: 0.7 } }}
      />
    </svg>
  </div>
);

const AnviraNav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`anvira-nav${scrolled ? ' is-scrolled' : ''}`}>
      <div className="anvira-shell anvira-nav__inner">
        <a href="#top" className="anvira-nav__brand">
          <span><img src={anviraMascot} alt="" aria-hidden="true" /></span> Anvira
        </a>
        <nav className="anvira-nav__links" aria-label="Anvira sections">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>
        <a href={DOWNLOAD_URL} target="_blank" rel="noopener noreferrer" className="anvira-nav__download">
          Download
        </a>
        <button
          type="button"
          className="anvira-nav__menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>
      {open && (
        <div className="anvira-nav__mobile">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
          <a href={DOWNLOAD_URL} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>
            Download Anvira
          </a>
        </div>
      )}
    </header>
  );
};

const AnviraHero = () => {
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sPx = useSpring(px, { stiffness: 60, damping: 20, mass: 0.4 });
  const sPy = useSpring(py, { stiffness: 60, damping: 20, mass: 0.4 });

  const reduced = prefersReducedMotion();
  const visualX = useTransform(sPx, [-0.5, 0.5], reduced ? [0, 0] : [-16, 16]);
  const visualY = useTransform(sPy, [-0.5, 0.5], reduced ? [0, 0] : [-12, 12]);
  const branchX = useTransform(sPx, [-0.5, 0.5], reduced ? [0, 0] : [12, -12]);
  const branchY = useTransform(sPy, [-0.5, 0.5], reduced ? [0, 0] : [10, -10]);
  const leafX = useTransform(sPx, [-0.5, 0.5], reduced ? [0, 0] : [-8, 8]);
  const leafY = useTransform(sPy, [-0.5, 0.5], reduced ? [0, 0] : [-6, 6]);

  // The CSS on these elements already carries a static transform (3D tilt / rotation).
  // Compose it into the motion-driven transform instead of using the x/y shorthand,
  // which would otherwise overwrite the element's inline transform entirely.
  const visualTransform = useTransform([visualX, visualY], ([vx, vy]: number[]) =>
    `translate(${vx}px, ${vy}px) rotateY(-4deg) rotateX(2deg)`,
  );
  const branchTransform = useTransform([branchX, branchY], ([bx, by]: number[]) =>
    `translate(${bx}px, ${by}px) rotate(-20deg)`,
  );

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduced || e.pointerType !== 'mouse') return;
    const rect = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width - 0.5);
    py.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handlePointerLeave = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <section className="anvira-hero" id="top">
      <div className="anvira-hero__sticky" onPointerMove={handlePointerMove} onPointerLeave={handlePointerLeave}>
        <div className="anvira-hero__wash" aria-hidden="true" />
        <div className="anvira-shell anvira-hero__grid">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="anvira-kicker"
            >
              Anvira · Local-first AI workspace
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <span>One workspace.</span>
              <span>One context.</span>
              <span>Your intelligence.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
              className="anvira-hero__copy"
            >
              Anvira brings conversation, knowledge, agents, notes and learning together in one
              local-first AI workspace.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.34, ease: [0.22, 1, 0.36, 1] }}
              className="anvira-actions"
            >
              <a href="#workspace" className="anvira-button anvira-button--primary">
                Explore Anvira <ArrowRight className="h-3.5 w-3.5" />
              </a>
              <a href="#context" className="anvira-button anvira-button--secondary">
                See how it works
              </a>
            </motion.div>
          </div>

          <div className="anvira-hero__visual">
            <motion.div className="anvira-hero__visual-inner" style={{ transform: visualTransform }}>
              <WorkspaceVisual />
            </motion.div>
            <motion.img
              src={anviraBranch}
              alt=""
              aria-hidden="true"
              className="anvira-hero__branch"
              style={{ transform: branchTransform }}
            />
            <motion.img
              src={anviraFoliage}
              alt=""
              aria-hidden="true"
              className="anvira-hero__leaf"
              style={{ x: leafX, y: leafY }}
            />
          </div>
        </div>

        <div className="anvira-scroll-cue">
          <span>Scroll</span>
          <i aria-hidden="true" />
        </div>
      </div>
    </section>
  );
};

const AnviraMorph = () => {
  const morphRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: morphRef, offset: ['start start', 'end end'] });
  const reduced = prefersReducedMotion();
  const dy = reduced ? 0 : 24;

  const opacity1 = useTransform(scrollYProgress, [0, 0.22, 0.34], [1, 1, 0]);
  const opacity2 = useTransform(scrollYProgress, [0.28, 0.4, 0.62, 0.74], [0, 1, 1, 0]);
  const opacity3 = useTransform(scrollYProgress, [0.68, 0.82, 1], [0, 1, 1]);
  const y1 = useTransform(scrollYProgress, [0, 0.34], [0, -dy]);
  const y2 = useTransform(scrollYProgress, [0.28, 0.74], [dy, -dy]);
  const y3 = useTransform(scrollYProgress, [0.68, 1], [dy, 0]);
  // Compose with the CSS centering transform (translate(-50%, -50%)) so it isn't overwritten.
  const t1 = useTransform(y1, (v) => `translate(-50%, calc(-50% + ${v}px))`);
  const t2 = useTransform(y2, (v) => `translate(-50%, calc(-50% + ${v}px))`);
  const t3 = useTransform(y3, (v) => `translate(-50%, calc(-50% + ${v}px))`);

  const interfaceOpacity = useTransform(scrollYProgress, [0, 0.4, 1], [0, 0.16, 0.62]);
  const interfaceScale = useTransform(scrollYProgress, [0, 1], reduced ? [1, 1] : [0.9, 1.04]);
  const interfaceY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [26, -18]);
  // Compose with the CSS centering transform (translate(-50%, -50%)) so it isn't overwritten.
  const interfaceTransform = useTransform([interfaceScale, interfaceY], ([s, y]: number[]) =>
    `translate(-50%, calc(-50% + ${y}px)) scale(${s})`,
  );

  return (
    <div className="anvira-morph" ref={morphRef} aria-hidden="true">
      <div className="anvira-morph__sticky">
        <div className="anvira-morph__wash" />
        <motion.div
          className="anvira-morph__interface"
          style={{ opacity: interfaceOpacity, transform: interfaceTransform }}
        >
          <WorkspaceVisual />
        </motion.div>
        <motion.p className="anvira-morph__line" style={{ opacity: opacity1, transform: t1 }}>
          One workspace.
        </motion.p>
        <motion.p className="anvira-morph__line" style={{ opacity: opacity2, transform: t2 }}>
          One context.
        </motion.p>
        <motion.p className="anvira-morph__line" style={{ opacity: opacity3, transform: t3 }}>
          Your intelligence.
        </motion.p>
      </div>
    </div>
  );
};

// A single leaf enters from the top-left corner and drifts across to the
// right as you scroll from "One context" into "Your intelligence", fading
// out as it clears the frame. The headline underneath changes right as the
// leaf passes over the middle of the screen, so the two feel like one motion.
const AnviraLeafWipe = () => {
  const wipeRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: wipeRef, offset: ['start start', 'end end'] });
  const reduced = prefersReducedMotion();

  // vw/vh (not %, which resolves against the leaf's own small size) so the
  // sweep distance is relative to the actual viewport.
  const leafX = useTransform(scrollYProgress, [0, 1], reduced ? [-32, -32] : [-32, 118]);
  const leafY = useTransform(scrollYProgress, [0, 1], reduced ? [-34, -34] : [-34, 16]);
  const leafRotate = useTransform(scrollYProgress, [0, 1], reduced ? [-22, -22] : [-30, -8]);
  const leafOpacity = useTransform(scrollYProgress, [0, 0.14, 0.76, 0.94], reduced ? [1, 1, 1, 1] : [0, 1, 1, 0]);
  const leafTransform = useTransform([leafX, leafY, leafRotate], ([x, y, r]: number[]) =>
    `translate(calc(-50% + ${x}vw), calc(-50% + ${y}vh)) rotate(${r}deg)`,
  );

  const nightOpacity = useTransform(scrollYProgress, [0.42, 0.6], [0, 1]);
  const contextOpacity = useTransform(scrollYProgress, [0, 0.36, 0.5], [1, 1, 0]);
  const intelligenceOpacity = useTransform(scrollYProgress, [0.5, 0.64, 1], [0, 1, 1]);

  return (
    <div className="anvira-leaf-wipe" ref={wipeRef}>
      <div className="anvira-leaf-wipe__sticky">
        <motion.div className="anvira-leaf-wipe__night" style={{ opacity: nightOpacity }} aria-hidden="true" />
        <motion.p className="anvira-leaf-wipe__line" style={{ opacity: contextOpacity }}>
          One context.
        </motion.p>
        <motion.p className="anvira-leaf-wipe__line anvira-leaf-wipe__line--light" style={{ opacity: intelligenceOpacity }}>
          Your intelligence.
        </motion.p>
        <motion.div className="anvira-leaf-wipe__leaf" style={{ opacity: leafOpacity, transform: leafTransform }}>
          <SprigLeaf />
        </motion.div>
      </div>
    </div>
  );
};

const Anvira = () => {
  // Slower, heavier-feeling scroll than the site default so the scroll-linked
  // transitions (the hero morph, the leaf wipe, the section reveals) have
  // time to actually read as motion rather than flashing past.
  useSmoothScroll(!prefersReducedMotion() && !isCoarsePointer(), {
    duration: 2,
    wheelMultiplier: 0.7,
    touchMultiplier: 1,
    lerp: 0.06,
  });

  const workspaceRef = useRef<HTMLElement>(null);
  const contextRef = useRef<HTMLElement>(null);
  const agentsRef = useRef<HTMLElement>(null);
  const notesRef = useRef<HTMLElement>(null);
  const studyRef = useRef<HTMLElement>(null);
  const localRef = useRef<HTMLElement>(null);
  const systemRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Scoped to this page only: keeps off-canvas botanical decoration from
    // causing horizontal scroll without using an ancestor `overflow` value,
    // which would otherwise break every `position: sticky` element below.
    document.documentElement.style.scrollPaddingTop = '88px';
    document.documentElement.style.overflowX = 'hidden';

    // `overflow-x: hidden` hides the scrollbar but doesn't retroactively snap
    // an existing horizontal scroll position back to 0 (e.g. after a trackpad
    // swipe or scroll-anchoring nudges it sideways from a previous page),
    // which visibly shifts the whole centered layout left/right. Correct it
    // once on mount only — a continuous scroll listener that calls
    // `scrollTo` from inside a scroll handler fights with scroll-linked
    // animations (their scroll position reads become stale/frozen), so this
    // is deliberately not re-checked on every scroll event.
    if (window.scrollX !== 0) window.scrollTo({ left: 0, top: window.scrollY });

    return () => {
      document.documentElement.style.scrollPaddingTop = '';
      document.documentElement.style.overflowX = '';
    };
  }, []);

  return (
    <div className="anvira-site">
      <SEO
        title="Anvira — One Workspace. One Context. Your Intelligence."
        description="Anvira is a local-first AI workspace where chat, notes, study, agents, knowledge and models work together inside one persistent, connected environment."
        keywords="Anvira, local-first AI workspace, unified AI environment, AI agents, AI notes, AI study, local models, GGUF, llama.cpp, LocalHouseLLM"
        canonical="https://localhousellm.com/anvira"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          name: 'Anvira',
          applicationCategory: 'DeveloperApplication',
          operatingSystem: 'Windows',
          description:
            'Anvira is a local-first AI workspace that unifies chat, notes, study, agents, knowledge and local models inside one persistent, connected environment.',
          url: 'https://localhousellm.com/anvira',
          downloadUrl: DOWNLOAD_URL,
          publisher: { '@type': 'Organization', name: 'LocalHouseLLM' },
          offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        }}
      />

      <div className="anvira-grain" aria-hidden="true" />
      <AnviraNav />
      <AnviraHero />
      <AnviraMorph />

      {/* One workspace */}
      <section className="anvira-section anvira-section--line" id="workspace" ref={workspaceRef}>
        <Botanical src={anviraBranch} className="anvira-botanical anvira-botanical--left" containerRef={workspaceRef} />
        <div className="anvira-shell">
          <SectionIntro number="01 — One workspace" title={<>Everything you do.<br />One workspace.</>}>
            <p>
              Chat, Notes, Study, Agents, Files, Knowledge and Models don't live in separate apps
              inside Anvira. They share one workspace, one history and one context — so switching
              between them never means starting over.
            </p>
          </SectionIntro>
          <Reveal className="anvira-section__stage" variants={revealStage}>
            <WorkspaceOrbit />
          </Reveal>
        </div>
      </section>

      {/* One context */}
      <section className="anvira-section anvira-section--line" id="context" ref={contextRef}>
        <Botanical src={anviraBranch} className="anvira-botanical anvira-botanical--bridge-right" containerRef={contextRef} />
        <div className="anvira-shell anvira-context-layout">
          <SectionIntro number="02 — One context" title={<>Your context shouldn't<br />disappear between apps.</>}>
            <p>
              A document enters Anvira once. From there it becomes part of the workspace — Chat
              understands it, Notes organizes it, an agent can act on it, and Study turns it into
              material you can learn from. Nothing is re-uploaded. Nothing is re-explained.
            </p>
          </SectionIntro>
          <ContextFlow />
        </div>
      </section>

      <AnviraLeafWipe />

      {/* Your intelligence */}
      <section className="anvira-section anvira-section--deep" id="intelligence">
        <div className="anvira-shell">
          <SectionIntro number="03 — Your intelligence" title={<>Intelligence that works<br />where you do.</>}>
            <p>
              Anvira is local-first. Your workspace, your knowledge and your local models live on
              your machine by default. Cloud providers are optional connections you choose — never
              a requirement.
            </p>
          </SectionIntro>
          <Reveal className="anvira-section__stage" variants={revealStage}>
            <MachineVisual />
          </Reveal>
        </div>
      </section>

      {/* Chat */}
      <section className="anvira-section anvira-section--line" id="chat">
        <div className="anvira-shell anvira-immersive">
          <Reveal className="anvira-chapter-label">
            <span className="anvira-section__number">04 — Chat</span>
            <h2>
              Ask, attach and act —<br />without leaving the thread.
            </h2>
            <p>
              Conversations in Anvira carry the workspace with them. Attach a file and it becomes
              context immediately. Point an agent at a task and watch it work inside the same
              thread, with results flowing straight back into your workspace.
            </p>
            <ul className="anvira-detail-list">
              <li>Multi-workspace conversations</li>
              <li>Attachments become live context</li>
              <li>Project-aware responses</li>
              <li>Agentic actions, in-thread</li>
              <li>Permissions on every action</li>
              <li>Saved approvals for repeat work</li>
            </ul>
          </Reveal>
          <Reveal variants={revealStage}>
            <WorkspaceVisual />
          </Reveal>
        </div>
      </section>

      {/* Agents */}
      <section className="anvira-section anvira-section--line" id="agents" ref={agentsRef}>
        <Botanical src={anviraFoliage} className="anvira-botanical anvira-botanical--right" containerRef={agentsRef} />
        <div className="anvira-shell">
          <SectionIntro number="05 — Agents" title={<>Don't just ask AI.<br />Give it a role.</>}>
            <p>
              Anvira Guide, Research Scout, Builder Panel and Product Architect ship with defined
              goals, capabilities and tools. Give an agent a role and it reasons inside your
              workspace with the permissions you set — or design a custom agent of your own.
            </p>
          </SectionIntro>
          <Reveal className="anvira-section__stage" variants={revealStage}>
            <AgentVisual />
          </Reveal>
        </div>
      </section>

      {/* Notes */}
      <section className="anvira-section anvira-section--line" id="notes" ref={notesRef}>
        <Botanical src={anviraFoliage} className="anvira-botanical anvira-botanical--right" containerRef={notesRef} />
        <div className="anvira-shell">
          <SectionIntro number="06 — Notes" title={<>Your knowledge, finally<br />connected to your intelligence.</>}>
            <p>
              Notebooks, pages and sources sit next to the same intelligence that powers Chat and
              Agents. Rich notes, citations, meeting notes and whiteboards stay connected to the
              material they came from — and Anvira can summarize, cite and assist without leaving
              the page.
            </p>
          </SectionIntro>
          <Reveal className="anvira-section__stage" variants={revealStage}>
            <NotesVisual />
          </Reveal>
        </div>
      </section>

      {/* Study */}
      <section className="anvira-section anvira-section--line" id="study" ref={studyRef}>
        <Botanical src={anviraFoliage} className="anvira-botanical anvira-botanical--left" containerRef={studyRef} />
        <div className="anvira-shell">
          <SectionIntro number="07 — Study" title={<>Learn from the same<br />intelligence you work with.</>}>
            <p>
              A notebook becomes a study guide. A study guide becomes flashcards, a quiz and a
              weak-spot review. The loop adapts as you learn, because it understands the material —
              not just what it should generate next.
            </p>
          </SectionIntro>
          <Reveal className="anvira-section__stage" variants={revealStage}>
            <StudyLoop />
          </Reveal>
        </div>
      </section>

      {/* Model layer */}
      <section className="anvira-section anvira-section--line anvira-section--deep" id="models">
        <div className="anvira-shell">
          <SectionIntro number="08 — The model layer" title={<>Intelligence underneath.<br />Invisible when you don't need it.</>}>
            <p>
              Local GGUF models run through llama.cpp with hardware-aware, GPU-accelerated
              inference. Swap models, scale with your hardware, or bring your own cloud provider —
              the workspace above stays exactly the same.
            </p>
          </SectionIntro>
          <Reveal className="anvira-section__stage" variants={revealStage}>
            <ModelFoundation />
          </Reveal>
        </div>
      </section>

      {/* Local-first statement */}
      <section className="anvira-local" ref={localRef}>
        <Botanical src={anviraFoliage} className="anvira-botanical anvira-botanical--bridge-left" containerRef={localRef} />
        <div className="anvira-shell anvira-local__inner">
          <Reveal variants={revealStage}>
            <h2>
              <span>Your workspace.</span>
              <span>Your machine.</span>
              <span>Your intelligence.</span>
            </h2>
            <p>
              Anvira runs locally by default. Nothing leaves your machine unless you choose to
              connect a cloud provider.
            </p>
            <PrivacyEye />
          </Reveal>
        </div>
      </section>

      {/* Whole system */}
      <section className="anvira-section anvira-section--line" id="system" ref={systemRef}>
        <Botanical src={anviraBranch} className="anvira-botanical anvira-botanical--bridge-right" containerRef={systemRef} />
        <div className="anvira-shell">
          <SectionIntro number="09 — The whole system" title={<>One workspace. One context.<br />Your intelligence.</>}>
            <p>
              Chat, Agents, Notes, Study, Knowledge, Files and Models aren't separate products
              orbiting Anvira — they behave like one interconnected system, sharing everything you
              bring into it.
            </p>
          </SectionIntro>
          <Reveal className="anvira-section__stage" variants={revealStage}>
            <SystemVisual />
          </Reveal>
        </div>
      </section>

      {/* Final CTA */}
      <section className="anvira-final">
        <img src={anviraBranch} alt="" aria-hidden="true" className="anvira-final__branch" />
        <div className="anvira-shell anvira-final__content">
          <Reveal variants={revealStage}>
            <h2>
              <span>One workspace.</span>
              <span>One context.</span>
              <span>Your intelligence.</span>
            </h2>
            <p className="anvira-final__meet">Meet Anvira.</p>
            <div className="anvira-actions">
              <a href="#top" className="anvira-button anvira-button--primary">
                Explore Anvira <ArrowRight className="h-3.5 w-3.5" />
              </a>
              <a
                href={DOWNLOAD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="anvira-button anvira-button--secondary"
              >
                <Download className="h-3.5 w-3.5" /> Download Anvira
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <footer className="anvira-footer">
        <div className="anvira-shell anvira-footer__inner">
          <span>© {new Date().getFullYear()} Anvira — built on the LocalHouseLLM stack.</span>
          <Link to="/">← LocalHouseLLM</Link>
        </div>
      </footer>
    </div>
  );
};

export default Anvira;
