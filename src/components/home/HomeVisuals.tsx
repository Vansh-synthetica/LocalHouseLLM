import { Link } from 'react-router-dom';

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

const localItems = ['Models', 'Workspace', 'Memory', 'Knowledge', 'Agents'];

export const LocalMachine = () => (
  <div className="lh-machine">
    <p className="lh-machine__items">
      {localItems.map((item, i) => (
        <span key={item}>
          {i > 0 && <i aria-hidden="true" />}
          {item}
        </span>
      ))}
    </p>
    <p className="lh-machine__caption">External connections only exist when you add them.</p>
  </div>
);

