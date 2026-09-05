import { motion } from 'framer-motion';
import { Network, Cpu, BookOpen, Lock, Blocks, Sparkles } from 'lucide-react';

type Node = {
  id: string;
  x: number; // percent
  y: number; // percent
  label: string;
  sub: string;
  icon: typeof Network;
  tone: 'primary' | 'accent' | 'info';
};

const nodes: Node[] = [
  { id: 'in', x: 6, y: 50, label: 'Request', sub: 'user / agent', icon: Sparkles, tone: 'info' },
  { id: 'aicl', x: 30, y: 22, label: 'AICL', sub: 'communication', icon: Network, tone: 'primary' },
  { id: 'orcha', x: 30, y: 78, label: 'ORCHA', sub: 'orchestration', icon: Cpu, tone: 'primary' },
  { id: 'mem', x: 56, y: 14, label: 'Memory', sub: 'user-owned', icon: BookOpen, tone: 'accent' },
  { id: 'safe', x: 56, y: 50, label: 'Safety', sub: 'verification', icon: Lock, tone: 'accent' },
  { id: 'tools', x: 56, y: 86, label: 'Tools', sub: 'actions', icon: Blocks, tone: 'accent' },
  { id: 'out', x: 84, y: 50, label: 'Anvira', sub: 'local output', icon: Sparkles, tone: 'primary' },
];

const edges: [string, string][] = [
  ['in', 'aicl'],
  ['in', 'orcha'],
  ['aicl', 'mem'],
  ['aicl', 'safe'],
  ['orcha', 'safe'],
  ['orcha', 'tools'],
  ['mem', 'out'],
  ['safe', 'out'],
  ['tools', 'out'],
];

const W = 1000;
const H = 520;

const pos = (id: string) => {
  const n = nodes.find((k) => k.id === id)!;
  return { x: (n.x / 100) * W, y: (n.y / 100) * H };
};

const path = (a: string, b: string) => {
  const p = pos(a);
  const q = pos(b);
  const dx = (q.x - p.x) * 0.5;
  return `M ${p.x + 70} ${p.y} C ${p.x + 70 + dx} ${p.y}, ${q.x - 70 - dx} ${q.y}, ${q.x - 70} ${q.y}`;
};

const toneClass: Record<Node['tone'], string> = {
  primary: 'text-primary border-primary/40 bg-primary/10',
  accent: 'text-accent border-accent/40 bg-accent/10',
  info: 'text-info border-info/40 bg-info/10',
};

/**
 * Langflow-style animated node graph: modules connected by flowing edges.
 */
const FlowCanvas = () => {
  return (
    <div className="relative w-full aspect-[1000/520] select-none" aria-hidden="true">
      {/* Edges */}
      <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 w-full h-full overflow-visible">
        <defs>
          <linearGradient id="edge-grad" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="hsl(var(--primary))" />
            <stop offset="100%" stopColor="hsl(var(--accent))" />
          </linearGradient>
          <filter id="edge-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {edges.map(([a, b], i) => (
          <g key={`${a}-${b}`}>
            <path d={path(a, b)} fill="none" stroke="hsl(var(--border))" strokeWidth="1.5" />
            <motion.path
              d={path(a, b)}
              fill="none"
              stroke="url(#edge-grad)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="10 30"
              className="animate-dash"
              style={{ animationDelay: `${i * 0.18}s` }}
              filter="url(#edge-glow)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.4 + i * 0.08, ease: 'easeOut' }}
            />
            {/* Ports */}
            <circle cx={pos(a).x + 70} cy={pos(a).y} className="animate-node" fill="hsl(var(--accent))" r="4" />
            <circle cx={pos(b).x - 70} cy={pos(b).y} className="animate-node" fill="hsl(var(--primary))" r="4" style={{ animationDelay: `${i * 0.3}s` }} />
          </g>
        ))}
      </svg>

      {/* Nodes */}
      {nodes.map((n, i) => (
        <motion.div
          key={n.id}
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 + i * 0.09, ease: [0.22, 1, 0.36, 1] }}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${n.x}%`, top: `${n.y}%` }}
        >
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 5 + i * 0.4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}
            className="fx-spot glass w-[140px] rounded-xl px-3 py-2.5 flex items-center gap-2.5"
          >
            <span className={`inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border ${toneClass[n.tone]}`}>
              <n.icon className="w-3.5 h-3.5" />
            </span>
            <span className="min-w-0">
              <span className="block text-[13px] font-semibold leading-tight text-foreground">{n.label}</span>
              <span className="block text-[10px] tracking-wide uppercase text-muted-foreground leading-tight mt-0.5 truncate">
                {n.sub}
              </span>
            </span>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};

export default FlowCanvas;
