import { useRef, useState } from 'react';
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion';

/* ------------------------------------------------------------------ */
/* Mission statement that brightens word by word as it scrolls past.   */
/* ------------------------------------------------------------------ */

const Word = ({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) => {
  const opacity = useTransform(progress, range, [0.16, 1]);
  return (
    <span className="lh-sw__word">
      <motion.span style={{ opacity }}>{children}</motion.span>{' '}
    </span>
  );
};

export const ScrollWords = ({ text, className }: { text: string; className?: string }) => {
  const ref = useRef<HTMLHeadingElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] });
  const words = text.split(' ');
  return (
    <h2 ref={ref} className={`${className ?? ''} lh-sw`} aria-label={text}>
      <span aria-hidden="true">
        {words.map((w, i) => (
          <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
            {w}
          </Word>
        ))}
      </span>
    </h2>
  );
};

/* ------------------------------------------------------------------ */
/* Slow parallax for full-bleed imagery.                               */
/* ------------------------------------------------------------------ */

export const ParallaxImage = ({ src, className }: { src: string; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.14, 1.08, 1.14]);
  return (
    <div ref={ref} className={className} aria-hidden="true">
      <motion.div className="lh-parallax__img" style={{ backgroundImage: `url(${src})`, y, scale }} />
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* "How a request moves through the stack" — scroll-driven diagram.    */
/* Desktop pins the panel and advances one step per scroll segment;    */
/* on small screens or with reduced motion it is a normal list.        */
/* ------------------------------------------------------------------ */

type NodeId = 'app' | 'runtime' | 'orcha' | 'nomi' | 'tools' | 'model';

const NODES: Record<NodeId, { x: number; y: number; w: number; label: string; sub: string }> = {
  app: { x: 260, y: 48, w: 220, label: 'Anvira · Anvira Notes', sub: 'Application' },
  runtime: { x: 260, y: 150, w: 200, label: 'Anvira Runtime', sub: 'Local API · permissions' },
  orcha: { x: 260, y: 262, w: 180, label: 'ORCHA', sub: 'Plans · routes · verifies' },
  nomi: { x: 96, y: 366, w: 150, label: 'Nomi', sub: 'Memory' },
  tools: { x: 424, y: 366, w: 150, label: 'Tools', sub: 'Files · terminal · search' },
  model: { x: 260, y: 470, w: 210, label: 'Local model', sub: 'GGUF via llama.cpp' },
};

const STEPS: { title: string; body: string; nodes: NodeId[]; at: NodeId; bus?: boolean }[] = [
  {
    title: 'You ask',
    body: 'Anvira or Anvira Notes sends the request to Anvira Runtime — a background service on your own PC, not a server in someone else’s cloud.',
    nodes: ['app'],
    at: 'app',
  },
  {
    title: 'The runtime checks permissions',
    body: 'Each application only sees the files, memory and tools you have allowed it to use. Applications connect to one shared runtime instead of each embedding its own AI stack.',
    nodes: ['runtime'],
    at: 'runtime',
  },
  {
    title: 'Components talk in AICL',
    body: 'Every hop between components is a structured AICL message, so a part can be inspected, replaced or upgraded without rewiring the rest.',
    nodes: ['runtime', 'orcha'],
    at: 'orcha',
    bus: true,
  },
  {
    title: 'ORCHA plans the work',
    body: 'ORCHA decides what to do next and which tools to use — reading and editing files, running commands, searching — and recovers when a smaller model returns a malformed tool call.',
    nodes: ['orcha', 'tools'],
    at: 'tools',
  },
  {
    title: 'Nomi brings the context',
    body: 'Nomi supplies what is worth remembering from earlier work. Memory is private to each application unless you choose to share it.',
    nodes: ['nomi'],
    at: 'nomi',
  },
  {
    title: 'A local model reasons',
    body: 'A GGUF model runs through llama.cpp on your hardware. A cloud provider is used only if you add one yourself.',
    nodes: ['model'],
    at: 'model',
  },
  {
    title: 'The result is verified',
    body: 'Before anything is applied, ORCHA checks the result. In Anvira, file changes come back as a diff you can review and undo.',
    nodes: ['orcha', 'app'],
    at: 'app',
  },
];

const EDGES: [NodeId, NodeId][] = [
  ['app', 'runtime'],
  ['runtime', 'orcha'],
  ['orcha', 'nomi'],
  ['orcha', 'tools'],
  ['orcha', 'model'],
];

const edgePath = (a: NodeId, b: NodeId) => {
  const A = NODES[a];
  const B = NODES[b];
  const y1 = A.y + 22;
  const y2 = B.y - 22;
  const my = (y1 + y2) / 2;
  return `M${A.x} ${y1} C ${A.x} ${my}, ${B.x} ${my}, ${B.x} ${y2}`;
};

const Diagram = ({ step }: { step: number }) => {
  const s = STEPS[step];
  const at = NODES[s.at];
  const lit = new Set(STEPS.slice(0, step + 1).flatMap((x) => x.nodes));
  return (
    <svg className="lh-flow__svg" viewBox="0 0 520 520" role="img" aria-label="Diagram of a request moving from the application through Anvira Runtime, ORCHA, Nomi memory, tools and a local model">
      <defs>
        <pattern id="lh-flow-dots" width="16" height="16" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" className="lh-flow__dot" />
        </pattern>
      </defs>
      <rect x="0" y="0" width="520" height="520" fill="url(#lh-flow-dots)" />
      <text x="16" y="508" className={`lh-flow__bus-label ${s.bus ? 'is-on' : ''}`}>
        AICL — the message layer between components
      </text>
      {EDGES.map(([a, b]) => {
        const on = lit.has(a) && lit.has(b);
        return (
          <g key={`${a}-${b}`}>
            <path d={edgePath(a, b)} className="lh-flow__edge" />
            <path d={edgePath(a, b)} className={`lh-flow__edge lh-flow__edge--on ${on ? 'is-on' : ''} ${s.bus ? 'is-bus' : ''}`} />
          </g>
        );
      })}
      {(Object.keys(NODES) as NodeId[]).map((id) => {
        const n = NODES[id];
        const active = s.nodes.includes(id);
        return (
          <g key={id} className={`lh-flow__node ${active ? 'is-active' : ''} ${lit.has(id) ? 'is-lit' : ''}`}>
            <rect x={n.x - n.w / 2} y={n.y - 22} width={n.w} height={44} rx={10} />
            <text x={n.x} y={n.y - 2} textAnchor="middle" className="lh-flow__label">
              {n.label}
            </text>
            <text x={n.x} y={n.y + 13} textAnchor="middle" className="lh-flow__sub">
              {n.sub}
            </text>
          </g>
        );
      })}
      <motion.circle
        r={6}
        className="lh-flow__packet"
        initial={false}
        animate={{ cx: at.x - at.w / 2, cy: at.y }}
        transition={{ type: 'spring', stiffness: 90, damping: 16 }}
      />
    </svg>
  );
};

export const StackFlow = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const bar = useSpring(scrollYProgress, { stiffness: 140, damping: 30 });
  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    setStep(Math.min(STEPS.length - 1, Math.max(0, Math.floor(p * STEPS.length))));
  });

  return (
    <div ref={ref} className="lh-flow" style={{ ['--lh-flow-steps' as string]: STEPS.length }}>
      <div className="lh-flow__sticky">
        <div className="lh-flow__grid">
          <ol className="lh-flow__steps">
            {STEPS.map((s, i) => (
              <li key={s.title} className={`lh-flow__step ${i === step ? 'is-active' : ''} ${i < step ? 'is-done' : ''}`}>
                <span className="lh-flow__num">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="lh-flow__stage">
            <Diagram step={step} />
            <div className="lh-flow__progress" aria-hidden="true">
              <motion.i style={{ scaleX: bar }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
