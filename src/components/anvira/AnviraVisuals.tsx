import { motion } from 'framer-motion';
import {
  Activity,
  Bot,
  BrainCircuit,
  Check,
  ChevronDown,
  ChevronRight,
  Circle,
  Cloud,
  Download,
  FileText,
  FolderOpen,
  Layers3,
  MessageSquare,
  NotebookPen,
  Paperclip,
  Search,
  Send,
  Settings,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import anviraMascot from '@/assets/anvira-mascot.png';

const Mark = () => <img src={anviraMascot} alt="" aria-hidden="true" />;

// A single hand-drawn leaf, styled from the site's own moss tokens rather than
// the sepia photo assets — used where a leaf needs to read as flat, moving
// artwork (e.g. a scroll-driven sweep) rather than a static framing photo.
export const SprigLeaf = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 240 620" className={className} aria-hidden="true">
    <path
      className="anvira-sprig-leaf__outline"
      d="M120 8 C 205 130 226 340 120 612 C 14 340 35 130 120 8 Z"
    />
    <path className="anvira-sprig-leaf__vein" d="M120 46 L120 574" />
    <path className="anvira-sprig-leaf__vein" d="M120 130 L66 96 M120 130 L174 96" />
    <path className="anvira-sprig-leaf__vein" d="M120 236 L58 192 M120 236 L182 192" />
    <path className="anvira-sprig-leaf__vein" d="M120 350 L62 306 M120 350 L178 306" />
    <path className="anvira-sprig-leaf__vein" d="M120 460 L74 424 M120 460 L166 424" />
  </svg>
);

const APP_NAV = [
  { label: 'Chat', icon: MessageSquare },
  { label: 'Agents', icon: Bot },
  { label: 'Activity', icon: Activity },
  { label: 'Notes', icon: NotebookPen },
  { label: 'Study', icon: BrainCircuit },
  { label: 'Library', icon: Layers3 },
  { label: 'Downloads', icon: Download },
  { label: 'Models', icon: Sparkles },
  { label: 'Settings', icon: Settings },
];

const surfaces = [
  { label: 'Chat', icon: MessageSquare },
  { label: 'Notes', icon: NotebookPen },
  { label: 'Study', icon: BrainCircuit },
  { label: 'Agents', icon: Bot },
  { label: 'Files', icon: FolderOpen },
  { label: 'Knowledge', icon: Layers3 },
  { label: 'Models', icon: Sparkles },
];

export const WorkspaceVisual = () => (
  <div className="anvira-app">
    <aside className="anvira-app__sidebar" aria-label="Anvira workspace areas">
      <div className="anvira-app__brand">
        <img src={anviraMascot} alt="" aria-hidden="true" />
        <div><strong>Anvira</strong><small>Local AI Desktop</small></div>
      </div>
      <nav className="anvira-app__nav">
        {APP_NAV.map(({ label, icon: Icon }, index) => (
          <span key={label} className={index === 0 ? 'is-active' : ''}>
            <Icon aria-hidden="true" /><i>{label}</i>
          </span>
        ))}
      </nav>
      <div className="anvira-app__footer">
        <img src={anviraMascot} alt="" aria-hidden="true" />
        <small>Glad you're here.</small>
      </div>
    </aside>

    <section className="anvira-app__main">
      <header className="anvira-app__topbar">
        <div className="anvira-app__selects">
          <span>New workspace <ChevronDown aria-hidden="true" /></span>
          <span>Anvira Guide <ChevronDown aria-hidden="true" /></span>
          <span>Approval <ChevronDown aria-hidden="true" /></span>
        </div>
        <div className="anvira-app__effort">
          {['Fast', 'Light', 'Medium', 'High', 'Max'].map((level) => (
            <button key={level} type="button" className={level === 'Medium' ? 'is-active' : ''}>
              {level}
            </button>
          ))}
        </div>
      </header>

      <div className="anvira-app__thread">
        <p className="anvira-app__bubble--user">
          Connect the findings in my interview notes with the model evaluation. What should we change?
        </p>
        <div className="anvira-app__bubble--agent">
          <span className="anvira-app__avatar"><img src={anviraMascot} alt="" aria-hidden="true" /></span>
          <div>
            <strong>Anvira Guide</strong>
            <p>The strongest pattern isn't model capability — it's continuity. Learners lose momentum whenever context must be rebuilt.</p>
          </div>
        </div>
      </div>

      <footer className="anvira-app__composer">
        <Paperclip aria-hidden="true" />
        <span>Message Anvira…</span>
        <button type="button" aria-label="Send message"><Send aria-hidden="true" /></button>
      </footer>

      <img className="anvira-app__mascot-float" src={anviraMascot} alt="" aria-hidden="true" />
    </section>
  </div>
);

export const WorkspaceOrbit = () => (
  <div className="anvira-orbit" aria-label="Anvira connected workspace diagram">
    <svg viewBox="0 0 800 560" aria-hidden="true">
      <path d="M400 280 C300 140 175 130 105 105" />
      <path d="M400 280 C520 145 645 140 710 105" />
      <path d="M400 280 C240 280 145 285 70 290" />
      <path d="M400 280 C565 280 660 285 735 290" />
      <path d="M400 280 C295 410 210 440 140 475" />
      <path d="M400 280 C400 405 400 455 400 520" />
      <path d="M400 280 C510 405 590 445 660 475" />
    </svg>
    <div className="anvira-orbit__center"><span><Mark /></span><strong>Anvira</strong><small>Shared context</small></div>
    {surfaces.map(({ label, icon: Icon }, index) => (
      <div key={label} className={`anvira-orbit__node anvira-orbit__node--${index + 1}`}>
        <Icon aria-hidden="true" /><span>{label}</span>
      </div>
    ))}
  </div>
);

const flow = [
  ['Document', 'Enters once', FileText],
  ['Workspace', 'Becomes context', Layers3],
  ['Chat', 'Understands it', MessageSquare],
  ['Notes', 'Organizes it', NotebookPen],
  ['Agent', 'Works with it', Bot],
  ['Study', 'Builds learning', BrainCircuit],
] as const;

export const ContextFlow = () => (
  <div className="anvira-context-flow">
    <div className="anvira-context-flow__line" aria-hidden="true" />
    {flow.map(([title, caption, Icon], index) => (
      <motion.div
        className="anvira-context-flow__step"
        key={title}
        initial={{ opacity: 0.25, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ amount: 0.65 }}
        transition={{ duration: 0.55, delay: index * 0.04 }}
      >
        <span><Icon aria-hidden="true" /></span>
        <div><strong>{title}</strong><small>{caption}</small></div>
      </motion.div>
    ))}
  </div>
);

export const MachineVisual = () => (
  <div className="anvira-machine">
    <span className="anvira-machine__label">Your machine</span>
    <div className="anvira-machine__core">
      <div className="anvira-machine__pulse" />
      <span><Mark /></span><strong>Your workspace</strong><small>Local by default</small>
    </div>
    <p className="anvira-machine__items">
      {['Models', 'Knowledge', 'Notes', 'Agents', 'Memory'].map((item, i, arr) => (
        <span key={item}>
          {item}
          {i < arr.length - 1 && <i aria-hidden="true">·</i>}
        </span>
      ))}
    </p>
    <p className="anvira-machine__caption">
      <Cloud aria-hidden="true" /> Cloud providers connect only when you choose them.
    </p>
  </div>
);

export const AgentVisual = () => {
  const agents = ['Anvira Guide', 'Research Scout', 'Builder Panel', 'Product Architect'];
  return (
    <div className="anvira-agent-visual">
      <div className="anvira-agent-visual__list">
        <span className="anvira-workspace__eyebrow">Built-in agents</span>
        {agents.map((agent, index) => (
          <div key={agent} className={index === 1 ? 'is-active' : ''}>
            <span>{agent.slice(0, 2).toUpperCase()}</span><strong>{agent}</strong><ChevronRight />
          </div>
        ))}
        <button><span>+</span> Create custom agent</button>
      </div>
      <div className="anvira-agent-visual__detail">
        <div className="anvira-agent-visual__header"><span>RS</span><div><small>Active in this workspace</small><strong>Research Scout</strong></div></div>
        <div className="anvira-agent-visual__brief"><small>GOAL</small><p>Find, compare and synthesize evidence without losing the question that started the work.</p></div>
        <div className="anvira-agent-visual__traits">
          {['Web research', 'Workspace search', 'Citations', 'Read files'].map((trait) => <span key={trait}>{trait}</span>)}
        </div>
        <ol>
          <li className="is-done"><Check /><span><strong>Read workspace brief</strong><small>Context permission granted</small></span></li>
          <li className="is-done"><Check /><span><strong>Search trusted sources</strong><small>12 relevant results</small></span></li>
          <li className="is-live"><Search /><span><strong>Compare evidence</strong><small>Working now</small></span></li>
          <li><Circle /><span><strong>Write cited synthesis</strong><small>Waiting</small></span></li>
        </ol>
      </div>
    </div>
  );
};

export const NotesVisual = () => (
  <div className="anvira-notes-visual">
    <aside>
      <small>NOTEBOOK</small><h4>Adaptive learning</h4>
      {['Thesis', 'Field observations', 'Learning loop', 'Open questions'].map((page, i) => <span className={i === 2 ? 'is-active' : ''} key={page}><FileText />{page}</span>)}
      <div className="anvira-notes-visual__sources"><small>SOURCES</small><strong>18 connected</strong></div>
    </aside>
    <article>
      <span className="anvira-workspace__eyebrow">Learning loop</span>
      <h3>Context is the real interface.</h3>
      <p>Learning systems become more useful when every conversation, source and decision remains part of the same environment.</p>
      <blockquote>“Continuity changed how quickly participants could move from understanding to application.”<cite>Field interview 07</cite></blockquote>
      <h5>Working principle</h5>
      <p>The workspace should remember the material, the learner’s weak spots and the decisions already made—without asking them to rebuild that context.</p>
    </article>
    <div className="anvira-notes-visual__ai"><Sparkles /><span><small>Anvira noticed</small><strong>3 sources support this principle.</strong></span><ChevronRight /></div>
  </div>
);

export const StudyLoop = () => {
  const steps = ['Notebook', 'Ask Pochi', 'Study guide', 'Flashcards', 'Quiz', 'Weak spots', 'Review'];
  return (
    <div className="anvira-study-loop">
      <div className="anvira-study-loop__center"><BrainCircuit /><strong>Material understood</strong><small>The loop adapts as you learn.</small></div>
      {steps.map((step, index) => <span className={`anvira-study-loop__step anvira-study-loop__step--${index + 1}`} key={step}><i>{index + 1}</i>{step}</span>)}
    </div>
  );
};

export const ModelFoundation = () => (
  <div className="anvira-model-foundation">
    <div className="anvira-model-foundation__workspace"><span><Mark /></span><strong>Anvira workspace</strong><small>The experience stays consistent.</small></div>
    <div className="anvira-model-foundation__bridge"><i /><span>Intelligence layer</span><i /></div>
    <div className="anvira-model-foundation__models">
      {['GGUF', 'llama.cpp', 'GPU acceleration', 'Hardware aware', 'Multiple models', 'BYOK cloud'].map((model) => <span key={model}>{model}</span>)}
    </div>
  </div>
);

export const SystemVisual = () => (
  <div className="anvira-system-visual">
    <div className="anvira-system-visual__center"><span><Mark /></span><strong>Anvira</strong><small>One context</small></div>
    <p className="anvira-system-visual__words">
      {surfaces.map(({ label }, i, arr) => (
        <span key={label}>
          {label}
          {i < arr.length - 1 && <i aria-hidden="true">+</i>}
        </span>
      ))}
    </p>
    <div className="anvira-system-visual__caption">
      <ShieldCheck aria-hidden="true" />
      <span>
        <strong>Everything remains connected.</strong>
        <small>One workspace—not seven products.</small>
      </span>
    </div>
  </div>
);