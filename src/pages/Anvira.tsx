import { type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';

import CleanLayout from '@/components/CleanLayout';
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
} from '@/components/anvira/AnviraVisuals';
import '@/pages/home.css';
import './anvira.css';

const DOWNLOAD_URL =
  'https://github.com/Vansh-synthetica/Anvira-release/releases/download/v1.6.2/Anvira-1.6-Pochi.exe';
const BLOCKMAP_URL =
  'https://github.com/Vansh-synthetica/Anvira-release/releases/download/v1.6.2/Anvira-1.6-Pochi.exe.blockmap';

// Fires a direct download for a single URL via a throwaway <a download>,
// rather than navigating the page to it.
const triggerDownload = (url: string) => {
  const a = document.createElement('a');
  a.href = url;
  a.download = '';
  a.rel = 'noopener noreferrer';
  document.body.appendChild(a);
  a.click();
  a.remove();
};

// Downloads the installer and its blockmap together from one click. Browsers
// treat this as two downloads and may show their own "allow multiple
// downloads" prompt the first time on a given site — that's the browser's
// safeguard, not something a page can suppress, and only appears once per
// origin after the user allows it.
const handleDownloadBoth = () => {
  triggerDownload(DOWNLOAD_URL);
  setTimeout(() => triggerDownload(BLOCKMAP_URL), 300);
};

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
  children: ReactNode;
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

const SectionIntro = ({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
}) => (
  <Reveal className="lh-section__intro">
    <p className="lh-eyebrow">{eyebrow}</p>
    <h2>{title}</h2>
    {children}
  </Reveal>
);

const surfaceCards = [
  {
    label: 'Chat',
    title: 'Ask, attach and act — without leaving the thread',
    body: 'Attach a file and it becomes context immediately. Point an agent at a task and watch it work in the same thread.',
    to: '#chat',
  },
  {
    label: 'Agents',
    title: "Don't just ask AI. Give it a role",
    body: 'Anvira Guide, Research Scout, Builder Panel and Product Architect ship with defined goals and tools.',
    to: '#agents',
  },
  {
    label: 'Notes',
    title: 'Knowledge, connected to your intelligence',
    body: 'Notebooks, pages and sources stay next to the same intelligence that powers Chat and Agents.',
    to: '#notes',
  },
  {
    label: 'Study',
    title: 'Learn from what you already work with',
    body: 'A notebook becomes a study guide, flashcards, a quiz and a weak-spot review — the loop adapts as you learn.',
    to: '#study',
  },
  {
    label: 'Models',
    title: 'Intelligence underneath, invisible until you need it',
    body: 'Local GGUF models run through llama.cpp with hardware-aware inference, or bring your own cloud provider.',
    to: '#models',
  },
  {
    label: 'Local-first',
    title: 'Your machine, by default',
    body: 'Anvira runs locally. Nothing leaves your machine unless you choose to connect a cloud provider.',
    to: '#local-first',
  },
];

const chain = [
  { name: 'Chat', role: 'the thread everything else feeds into' },
  { name: 'Notes & Knowledge', role: 'the material Anvira remembers' },
  { name: 'Agents', role: 'roles that act inside your workspace' },
  { name: 'Study', role: 'the same material, turned into learning' },
  { name: 'Local models', role: "what it all runs on — your hardware, first" },
];

const AnviraHero = () => (
  <section className="lh-hero" id="top">
    <div className="lh-shell">
      <div className="lh-hero__top">
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          One workspace, one context, your <span className="lh-mark">intelligence</span>.
        </motion.h1>
        <motion.div
          className="lh-hero__aside"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        >
          <p>
            Anvira brings conversation, knowledge, agents, notes and learning together in one
            local-first AI workspace. It lives on your machine, remembers your context, and works
            for you — not somewhere else&apos;s cloud.
          </p>
          <div className="lh-actions lh-actions--compact">
            <a href="#workspace" className="lh-button lh-button--primary">
              Explore Anvira <ArrowRight className="h-3.5 w-3.5" />
            </a>
            <button type="button" onClick={handleDownloadBoth} className="lh-button lh-button--ghost">
              <Download className="h-3.5 w-3.5" /> Download
            </button>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="lh-hero__visual"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="lh-anvira-preview anvira-hero__stage">
          <WorkspaceVisual />
        </div>
      </motion.div>
    </div>
  </section>
);

const SurfaceGrid = () => (
  <section className="lh-section lh-section--flush" id="surfaces">
    <div className="lh-shell">
      <Reveal>
        <h2 className="lh-section-title">Everything, in one workspace</h2>
      </Reveal>
      <ul className="lh-release-grid">
        {surfaceCards.map((item) => (
          <li key={item.label}>
            <Reveal className="lh-release-card">
              <a href={item.to} className="lh-release-card__link">
                <span className="lh-meta-label">{item.label}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
                <span className="lh-release-card__cta">
                  See how it works <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </a>
            </Reveal>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

const ChainSection = () => (
  <section className="lh-section lh-section--line" id="idea">
    <div className="lh-shell">
      <SectionIntro
        eyebrow="The idea"
        title={
          <>
            Your context shouldn&apos;t <span className="lh-mark">disappear</span> between apps.
          </>
        }
      >
        <p>
          A document enters Anvira once. From there it becomes part of the workspace — nothing is
          re-uploaded, nothing is re-explained.
        </p>
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
        <a href="#workspace" className="lh-button lh-button--ghost">
          See the whole workspace <ArrowRight className="h-3.5 w-3.5" />
        </a>
      </Reveal>
    </div>
  </section>
);

const WorkspaceSection = () => (
  <section className="lh-section lh-section--line" id="workspace">
    <div className="lh-shell">
      <SectionIntro
        eyebrow="Workspace"
        title={
          <>
            Everything you do. <span className="lh-mark">One workspace.</span>
          </>
        }
      >
        <p>
          Chat, Notes, Study, Agents, Files, Knowledge and Models don&apos;t live in separate apps
          inside Anvira. They share one workspace, one history and one context — so switching
          between them never means starting over.
        </p>
      </SectionIntro>
      <Reveal className="lh-section__stage" variants={revealStage}>
        <WorkspaceOrbit />
      </Reveal>
    </div>
  </section>
);

const ContextSection = () => (
  <section className="lh-section lh-section--line" id="context">
    <div className="lh-shell anvira-context-layout">
      <SectionIntro
        eyebrow="Context"
        title={<>One document becomes part of everything.</>}
      >
        <p>
          Chat understands it, Notes organizes it, an agent can act on it, and Study turns it into
          material you can learn from.
        </p>
      </SectionIntro>
      <ContextFlow />
    </div>
  </section>
);

const ChatSection = () => (
  <section className="lh-section lh-section--line" id="chat">
    <div className="lh-shell anvira-immersive">
      <SectionIntro
        eyebrow="Chat"
        title={<>Ask, attach and act — without leaving the thread.</>}
      >
        <p>
          Conversations in Anvira carry the workspace with them. Attach a file and it becomes
          context immediately. Point an agent at a task and watch it work inside the same thread,
          with results flowing straight back into your workspace.
        </p>
        <ul className="anvira-detail-list">
          <li>Multi-workspace conversations</li>
          <li>Attachments become live context</li>
          <li>Project-aware responses</li>
          <li>Agentic actions, in-thread</li>
          <li>Permissions on every action</li>
          <li>Saved approvals for repeat work</li>
        </ul>
      </SectionIntro>
      <Reveal variants={revealStage}>
        <WorkspaceVisual />
      </Reveal>
    </div>
  </section>
);

const AgentsSection = () => (
  <section className="lh-section lh-section--line" id="agents">
    <div className="lh-shell">
      <SectionIntro
        eyebrow="Agents"
        title={<>Don&apos;t just ask AI. <span className="lh-mark">Give it a role.</span></>}
      >
        <p>
          Anvira Guide, Research Scout, Builder Panel and Product Architect ship with defined
          goals, capabilities and tools. Give an agent a role and it reasons inside your workspace
          with the permissions you set — or design a custom agent of your own.
        </p>
      </SectionIntro>
      <Reveal className="lh-section__stage" variants={revealStage}>
        <AgentVisual />
      </Reveal>
    </div>
  </section>
);

const NotesSection = () => (
  <section className="lh-section lh-section--line" id="notes">
    <div className="lh-shell">
      <SectionIntro
        eyebrow="Notes"
        title={<>Your knowledge, finally connected to your intelligence.</>}
      >
        <p>
          Notebooks, pages and sources sit next to the same intelligence that powers Chat and
          Agents. Rich notes, citations, meeting notes and whiteboards stay connected to the
          material they came from.
        </p>
      </SectionIntro>
      <Reveal className="lh-section__stage" variants={revealStage}>
        <NotesVisual />
      </Reveal>
    </div>
  </section>
);

const StudySection = () => (
  <section className="lh-section lh-section--line" id="study">
    <div className="lh-shell">
      <SectionIntro
        eyebrow="Study"
        title={<>Learn from the same intelligence you work with.</>}
      >
        <p>
          A notebook becomes a study guide. A study guide becomes flashcards, a quiz and a
          weak-spot review. The loop adapts as you learn, because it understands the material —
          not just what it should generate next.
        </p>
      </SectionIntro>
      <Reveal className="lh-section__stage" variants={revealStage}>
        <StudyLoop />
      </Reveal>
    </div>
  </section>
);

const ModelsSection = () => (
  <section className="lh-section lh-section--line" id="models">
    <div className="lh-shell">
      <SectionIntro
        eyebrow="The model layer"
        title={<>Intelligence underneath. <span className="lh-mark">Invisible</span> when you don&apos;t need it.</>}
      >
        <p>
          Local GGUF models run through llama.cpp with hardware-aware, GPU-accelerated inference.
          Swap models, scale with your hardware, or bring your own cloud provider — the workspace
          above stays exactly the same.
        </p>
      </SectionIntro>
      <Reveal className="lh-section__stage" variants={revealStage}>
        <ModelFoundation />
      </Reveal>
    </div>
  </section>
);

const LocalFirstSection = () => (
  <section className="lh-mission" id="local-first">
    <div className="lh-shell">
      <Reveal>
        <h2 className="lh-mission__title">
          Your workspace. Your machine. Your <span className="lh-mark">intelligence.</span>
        </h2>
        <p className="anvira-local__caption">
          Anvira runs locally by default. Nothing leaves your machine unless you choose to connect
          a cloud provider.
        </p>
        <Reveal className="lh-section__stage" variants={revealStage}>
          <MachineVisual />
        </Reveal>
      </Reveal>
    </div>
  </section>
);

const SystemSection = () => (
  <section className="lh-section lh-section--line" id="system">
    <div className="lh-shell">
      <SectionIntro
        eyebrow="The whole system"
        title={<>One workspace. One context. <span className="lh-mark">Your intelligence.</span></>}
      >
        <p>
          Chat, Agents, Notes, Study, Knowledge, Files and Models aren&apos;t separate products
          orbiting Anvira — they behave like one interconnected system, sharing everything you
          bring into it.
        </p>
      </SectionIntro>
      <Reveal className="lh-section__stage" variants={revealStage}>
        <SystemVisual />
      </Reveal>
    </div>
  </section>
);

const AnviraFinal = () => (
  <section className="lh-final">
    <div className="lh-shell">
      <Reveal variants={revealStage}>
        <h2>
          Meet <span className="lh-mark">Anvira.</span>
        </h2>
        <p>One workspace. One context. Your intelligence — built to belong to you.</p>
        <div className="lh-actions">
          <a href="#top" className="lh-button lh-button--primary">
            Explore Anvira <ArrowRight className="h-3.5 w-3.5" />
          </a>
          <button type="button" onClick={handleDownloadBoth} className="lh-button lh-button--ghost">
            <Download className="h-3.5 w-3.5" /> Download Anvira
          </button>
        </div>
        <Link to="/" className="lh-text-link">
          ← Back to LocalHouseLLM
        </Link>
      </Reveal>
    </div>
  </section>
);

const Anvira = () => {
  return (
    <CleanLayout>
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

      <div className="lhllm-home anvira-site">
        <AnviraHero />
        <SurfaceGrid />
        <ChainSection />
        <WorkspaceSection />
        <ContextSection />
        <ChatSection />
        <AgentsSection />
        <NotesSection />
        <StudySection />
        <ModelsSection />
        <LocalFirstSection />
        <SystemSection />
        <AnviraFinal />
      </div>
    </CleanLayout>
  );
};

export default Anvira;
