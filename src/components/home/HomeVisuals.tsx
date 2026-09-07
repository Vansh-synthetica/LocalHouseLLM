import { Link } from 'react-router-dom';
import { motion, type MotionValue } from 'framer-motion';

// Hand-placed node positions (not random) so the "living system" reads as
// deliberate composition rather than noise, and stays stable across renders.
const heroNodes: [number, number, number][] = [
  [120, 90, 4], [230, 60, 3], [340, 140, 5], [90, 220, 3], [260, 250, 4],
  [410, 90, 3], [430, 230, 5], [180, 330, 3], [320, 360, 4], [60, 130, 2],
  [370, 300, 3], [150, 190, 2], [280, 170, 3], [400, 350, 2],
];
const heroEdges: [number, number][] = [
  [0, 1], [1, 2], [0, 3], [3, 4], [4, 2], [2, 5], [5, 6], [4, 6], [3, 7],
  [7, 8], [4, 8], [0, 9], [9, 3], [2, 10], [6, 10], [7, 11], [11, 0],
  [12, 2], [12, 5], [8, 13], [6, 13],
];

export const NodeField = () => (
  <div className="lh-hero__field" aria-hidden="true">
    <svg viewBox="0 0 480 420" preserveAspectRatio="xMidYMid meet" className="lh-hero__field-svg">
      {heroEdges.map(([a, b], i) => {
        const [x1, y1] = heroNodes[a];
        const [x2, y2] = heroNodes[b];
        const mx = (x1 + x2) / 2 + (i % 2 === 0 ? 14 : -14);
        const my = (y1 + y2) / 2 + (i % 3 === 0 ? -10 : 10);
        return <path key={i} className="lh-edge" d={`M${x1},${y1} Q${mx},${my} ${x2},${y2}`} />;
      })}
      {heroNodes.map(([x, y, r], i) => (
        <circle
          key={i}
          className={i % 4 === 0 ? 'lh-node lh-node--soft' : 'lh-node'}
          cx={x}
          cy={y}
          r={r}
          opacity={0.7}
          style={{ transformOrigin: `${x}px ${y}px`, animationDelay: `${(i * 0.7) % 6.4}s` }}
        />
      ))}
    </svg>
  </div>
);

// The opening transition: a scattered field crossfades into an ordered grid
// as you scroll, standing in for "a single system becomes structured layers."
const scatterNodes: [number, number][] = [
  [90, 70], [220, 40], [340, 100], [60, 180], [180, 150], [300, 200], [400, 60],
  [130, 260], [260, 280], [380, 220], [40, 320], [210, 340], [340, 330], [440, 300],
];
const gridCols = [70, 170, 270, 370, 470];
const gridRows = [80, 180, 280];
const gridNodes: [number, number][] = gridRows.flatMap((y) => gridCols.map((x): [number, number] => [x, y]));

export const StructureField = ({
  scatterOpacity,
  gridOpacity,
}: {
  scatterOpacity: MotionValue<number>;
  gridOpacity: MotionValue<number>;
}) => (
  <div className="lh-structure__field" aria-hidden="true">
    <svg viewBox="0 0 500 360" preserveAspectRatio="xMidYMid meet">
      <motion.g style={{ opacity: scatterOpacity }}>
        {scatterNodes.map(([x, y], i) =>
          scatterNodes.slice(i + 1, i + 3).map(([x2, y2], j) => (
            <path key={`s-${i}-${j}`} className="lh-structure__line" d={`M${x},${y} L${x2},${y2}`} />
          )),
        )}
        {scatterNodes.map(([x, y], i) => (
          <circle key={`sn-${i}`} className="lh-structure__node" cx={x} cy={y} r={3.2} />
        ))}
      </motion.g>
      <motion.g style={{ opacity: gridOpacity }}>
        {gridRows.map((y, ri) =>
          gridCols.slice(0, -1).map((x, ci) => (
            <path key={`gh-${ri}-${ci}`} className="lh-structure__line" d={`M${x},${y} L${gridCols[ci + 1]},${y}`} />
          )),
        )}
        {gridCols.map((x, ci) =>
          gridRows.slice(0, -1).map((y, ri) => (
            <path key={`gv-${ci}-${ri}`} className="lh-structure__line" d={`M${x},${y} L${x},${gridRows[ri + 1]}`} />
          )),
        )}
        {gridNodes.map(([x, y], i) => (
          <circle key={`gn-${i}`} className="lh-structure__node" cx={x} cy={y} r={3.2} />
        ))}
      </motion.g>
    </svg>
  </div>
);

export const ArchitectureTree = () => (
  <div className="lh-tree">
    <div className="lh-tree__root">
      <strong>LOCALHOUSELLM</strong>
      <small>Company</small>
    </div>
    <div className="lh-tree__connector" />
    <p className="lh-tree__label">Infrastructure</p>
    <div className="lh-tree__row-wrap">
      <div className="lh-tree__row lh-tree__row--3">
        <div className="lh-tree__node"><strong>AICL</strong><small>Communication</small></div>
        <div className="lh-tree__node"><strong>ORCHA</strong><small>Execution</small></div>
        <div className="lh-tree__node"><strong>NOMI</strong><small>Memory</small></div>
      </div>
    </div>
    <div className="lh-tree__connector" style={{ marginTop: 24 }} />
    <p className="lh-tree__label">Intelligence &amp; Tools</p>
    <div className="lh-tree__node" style={{ maxWidth: 320, marginInline: 'auto' }}>
      <strong>Intelligence Modules</strong>
      <small>Models and specialized experts</small>
    </div>
    <div className="lh-tree__connector" style={{ marginTop: 24 }} />
    <p className="lh-tree__label">Applications</p>
    <div className="lh-tree__apps">
      <Link to="/anvira">Anvira — the workspace</Link>
      <span className="is-future">Zynvera — the education environment</span>
      <span className="is-future">Future environments</span>
    </div>
  </div>
);

const orchaSteps = ['Decompose', 'Plan', 'Select', 'Execute', 'Evaluate', 'Resolve', 'Result'];

export const OrchaFlow = () => (
  <div className="lh-flow">
    {orchaSteps.map((step, i) => (
      <div key={step} style={{ display: 'flex', alignItems: 'center' }}>
        <span className="lh-flow__step">{step}</span>
        {i < orchaSteps.length - 1 && <span className="lh-flow__arrow" aria-hidden="true" />}
      </div>
    ))}
  </div>
);

const threadSteps = [
  ['Interaction', 'A conversation happens'],
  ['Context', 'What mattered is captured'],
  ['Memory', 'It persists, user-owned'],
  ['Future interaction', 'The system remembers'],
];

export const NomiThread = () => (
  <div className="lh-thread">
    {threadSteps.map(([title, caption]) => (
      <div className="lh-thread__node" key={title}>
        <i />
        <strong>{title}</strong>
        <small>{caption}</small>
      </div>
    ))}
  </div>
);

const aiclNodes: [number, number, string][] = [
  [400, 60, 'Module A'], [620, 140, 'Module B'], [640, 320, 'Module C'],
  [420, 380, 'Module D'], [200, 320, 'Module E'], [180, 130, 'Module F'],
];

export const AiclNetwork = () => (
  <div className="lh-network" aria-hidden="true">
    <svg viewBox="0 0 800 460">
      {aiclNodes.map(([x, y], i) => {
        const [x2, y2] = aiclNodes[(i + 1) % aiclNodes.length];
        const mx = (x + x2) / 2 + (i % 2 === 0 ? 30 : -30);
        const my = (y + y2) / 2 + (i % 2 === 0 ? -24 : 24);
        return <path key={`e-${i}`} d={`M${x},${y} Q${mx},${my} ${x2},${y2}`} style={{ animation: `lh-dash ${8 + i}s linear infinite` }} strokeDasharray="3 8" />;
      })}
      <path d="M400,60 Q410,220 420,380" strokeDasharray="3 8" style={{ animation: 'lh-dash 12s linear infinite' }} />
      <path d="M620,140 Q400,230 200,320" strokeDasharray="3 8" style={{ animation: 'lh-dash 10s linear infinite' }} />
      {aiclNodes.map(([x, y], i) => (
        <circle key={`n-${i}`} cx={x} cy={y} r={5} />
      ))}
    </svg>
    {aiclNodes.map(([x, y, label], i) => (
      <span key={label} className="lh-network__label" style={{ left: `${(x / 800) * 100}%`, top: `${(y / 460) * 100}%` }}>
        {label}
      </span>
    ))}
  </div>
);

export const LocalMachine = () => (
  <div className="lh-machine">
    <p className="lh-machine__items">
      Models<i>·</i>Workspace<i>·</i>Memory<i>·</i>Knowledge<i>·</i>Agents
    </p>
    <p className="lh-machine__caption">External connections only exist when you add them.</p>
  </div>
);

const researchItems = [
  ['2026', 'Adaptive Modular AI: A New Paradigm for Scalable, Safe, and Efficient Language Models'],
  ['2026', 'Shadow AMAI: An Architecture for Unconstrained Adaptive Modular Intelligence'],
  ['2026', 'CoT Looping Systems, Continuous Hypothesis Propagation, and Predictability Ratios'],
  ['2026', 'ADAPT: Adaptive Decomposition and Parallel Task Execution for Memory-Efficient LLM Inference'],
];

export const ResearchList = () => (
  <div className="lh-research">
    {researchItems.map(([year, title]) => (
      <div className="lh-research__item" key={title}>
        <small>{year}</small>
        <strong>{title}</strong>
      </div>
    ))}
  </div>
);
