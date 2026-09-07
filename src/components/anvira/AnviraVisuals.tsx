import { motion } from 'framer-motion';
import {
  Bot,
  BrainCircuit,
  Check,
  ChevronRight,
  Circle,
  Cloud,
  FileText,
  FolderOpen,
  Layers3,
  MessageSquare,
  NotebookPen,
  Search,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

const surfaces = [
  { label: 'Chat', icon: MessageSquare },
  { label: 'Notes', icon: NotebookPen },
  { label: 'Study', icon: BrainCircuit },
  { label: 'Agents', icon: Bot },
  { label: 'Files', icon: FolderOpen },
  { label: 'Knowledge', icon: Layers3 },
  { label: 'Models', icon: Sparkles },
];

export const WorkspaceVisual = ({ compact = false }: { compact?: boolean }) => (
  <div className={`anvira-workspace ${compact ? 'anvira-workspace--compact' : ''}`}>
    <aside className="anvira-workspace__rail" aria-label="Anvira workspace areas">
      <div className="anvira-workspace__mark">A</div>
      <div className="anvira-workspace__rail-icons">
        {surfaces.slice(0, 5).map(({ label, icon: Icon }, index) => (
          <span key={label} className={index === 0 ? 'is-active' : ''} title={label}>
            <Icon aria-hidden="true" />
          </span>
        ))}
      </div>
      <span className="anvira-workspace__avatar">VB</span>
    </aside>

    <section className="anvira-workspace__context">
      <div className="anvira-workspace__eyebrow">Research workspace</div>
      <h3>Adaptive systems</h3>
      <div className="anvira-workspace__search"><Search aria-hidden="true" /> Search context</div>
      <div className="anvira-workspace__tree">
        <span><ChevronRight /> Sources <small>12</small></span>
        <span className="is-selected"><FileText /> Architecture notes</span>
        <span><FileText /> Model evaluation</span>
        <span><FileText /> Field interviews</span>
      </div>
      <div className="anvira-workspace__context-foot">
        <span><Circle /> Local context active</span>
        <small>18 sources · 42 notes</small>
      </div>
    </section>

    <section className="anvira-workspace__conversation">
      <header>
        <div><small>Conversation</small><strong>Designing an adaptive learning loop</strong></div>
        <span className="anvira-status"><Circle /> Local</span>
      </header>
      <div className="anvira-thread">
        <p className="anvira-thread__user">Connect the findings in my interview notes with the model evaluation. What should we change?</p>
        <div className="anvira-thread__context-row">
          <span><FileText /> 3 notes</span><span><Layers3 /> Research context</span>
        </div>
        <div className="anvira-thread__response">
          <span className="anvira-thread__agent"><Sparkles /> Anvira</span>
          <p>The strongest pattern is not model capability—it is continuity. Learners lose momentum whenever context must be rebuilt.</p>
          <p>I found three supporting observations and turned them into a proposed learning loop.</p>
          <div className="anvira-thread__action"><Check /> Added to “Learning system” <ChevronRight /></div>
        </div>
      </div>
      <footer>
        <span>Ask anything in this workspace…</span>
        <button aria-label="Send message"><ChevronRight /></button>
      </footer>
    </section>

    <aside className="anvira-workspace__insight">
      <div className="anvira-workspace__eyebrow">Live context</div>
      <h4>What Anvira sees</h4>
      <div className="anvira-mini-source"><FileText /><span><strong>Architecture notes</strong><small>Referenced now</small></span></div>
      <div className="anvira-mini-source"><Bot /><span><strong>Product Architect</strong><small>Available agent</small></span></div>
      <div className="anvira-context-meter"><span>Context window</span><strong>42%</strong><i /></div>
      <p>Everything here remains available to Chat, Notes, Study and Agents.</p>
    </aside>
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
    <div className="anvira-orbit__center"><span>A</span><strong>Anvira</strong><small>Shared context</small></div>
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
      <span>A</span><strong>Your workspace</strong><small>Local by default</small>
    </div>
    {['Models', 'Knowledge', 'Notes', 'Agents', 'Memory'].map((item, index) => (
      <div className={`anvira-machine__item anvira-machine__item--${index + 1}`} key={item}>{item}</div>
    ))}
    <div className="anvira-machine__cloud anvira-machine__cloud--one"><Cloud /> Optional provider</div>
    <div className="anvira-machine__cloud anvira-machine__cloud--two"><Cloud /> Optional provider</div>
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
    <div className="anvira-model-foundation__workspace"><span>A</span><strong>Anvira workspace</strong><small>The experience stays consistent.</small></div>
    <div className="anvira-model-foundation__bridge"><i /><span>Intelligence layer</span><i /></div>
    <div className="anvira-model-foundation__models">
      {['GGUF', 'llama.cpp', 'GPU acceleration', 'Hardware aware', 'Multiple models', 'BYOK cloud'].map((model) => <span key={model}>{model}</span>)}
    </div>
  </div>
);

export const SystemVisual = () => (
  <div className="anvira-system-visual">
    <svg viewBox="0 0 900 700" aria-hidden="true">
      <circle cx="450" cy="350" r="210" />
      <circle cx="450" cy="350" r="125" />
      {[0, 1, 2, 3, 4, 5, 6].map((index) => {
        const angle = (Math.PI * 2 * index) / 7 - Math.PI / 2;
        const x = 450 + Math.cos(angle) * 265;
        const y = 350 + Math.sin(angle) * 265;
        return <line key={index} x1="450" y1="350" x2={x} y2={y} />;
      })}
    </svg>
    <div className="anvira-system-visual__center"><span>A</span><strong>Anvira</strong><small>One context</small></div>
    {surfaces.map(({ label, icon: Icon }, index) => (
      <div className={`anvira-system-visual__node anvira-system-visual__node--${index + 1}`} key={label}><Icon /><span>{label}</span></div>
    ))}
    <div className="anvira-system-visual__caption"><ShieldCheck /><span><strong>Everything remains connected.</strong><small>One workspace—not seven products.</small></span></div>
  </div>
);