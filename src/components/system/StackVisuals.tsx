import { motion } from 'framer-motion';
import { prefersReducedMotion } from './Motion';

/** AICL — communication: a flowing signal between two typed endpoints. */
export const CommunicationVisual = () => {
  const reduced = prefersReducedMotion();
  const d = 'M36 80 C 120 24, 200 136, 284 80';
  return (
    <svg viewBox="0 0 320 160" className="w-full h-auto max-w-sm" aria-hidden="true">
      <circle cx="36" cy="80" r="5" className="fill-foreground" />
      <circle cx="284" cy="80" r="5" className="fill-foreground" />
      <path d={d} fill="none" className="stroke-border" strokeWidth="1.25" />
      <motion.path
        d={d}
        fill="none"
        className="stroke-primary"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeDasharray="2 14"
        animate={reduced ? undefined : { strokeDashoffset: [0, -160] }}
        transition={{ duration: 3.4, repeat: Infinity, ease: 'linear' }}
      />
    </svg>
  );
};

/** ORCHA — execution: work moving through a sequence of named stages. */
export const ExecutionVisual = () => {
  const reduced = prefersReducedMotion();
  const stages = ['Decompose', 'Route', 'Execute', 'Aggregate', 'Evaluate'];
  return (
    <div className="relative w-full max-w-md pt-5 border-t border-border">
      {!reduced && (
        <motion.span
          className="absolute -top-[3px] h-1.5 w-1.5 rounded-full bg-primary"
          animate={{ left: ['1%', '20%', '39%', '58%', '78%', '95%'] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', times: [0, 0.2, 0.4, 0.6, 0.8, 1] }}
        />
      )}
      <div className="flex justify-between gap-2">
        {stages.map((s) => (
          <span key={s} className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground text-center flex-1">
            {s}
          </span>
        ))}
      </div>
    </div>
  );
};

/** Memory / continuity: one thread drawn through persistent context points. */
export const ContinuityVisual = () => {
  const reduced = prefersReducedMotion();
  const d = 'M10 50 Q 60 10, 110 50 T 210 50 T 310 50';
  return (
    <svg viewBox="0 0 320 100" className="w-full h-auto max-w-sm" aria-hidden="true">
      <path d={d} fill="none" className="stroke-border" strokeWidth="1.25" />
      <motion.path
        d={d}
        fill="none"
        className="stroke-primary"
        strokeWidth="1.5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: reduced ? 0 : 1.8, ease: [0.22, 1, 0.36, 1] }}
      />
      {[10, 110, 210, 310].map((x) => (
        <circle key={x} cx={x} cy={50} r="4" className="fill-foreground" />
      ))}
    </svg>
  );
};

/** Safety — verification: sequential gates a response has to pass through. */
export const VerificationVisual = () => {
  const reduced = prefersReducedMotion();
  const gates = ['Factual', 'Logical', 'Policy'];
  return (
    <div className="flex flex-col items-center gap-0 w-full max-w-xs mx-auto">
      <span className="h-6 w-px bg-border" />
      {gates.map((g, i) => (
        <div key={g} className="contents">
          <motion.span
            className="rounded-sm border border-border px-4 py-1.5 text-[10px] uppercase tracking-[0.14em] text-muted-foreground"
            animate={
              reduced
                ? undefined
                : { borderColor: ['hsl(var(--border))', 'hsl(var(--primary))', 'hsl(var(--border))'] }
            }
            transition={{ duration: 4.5, repeat: Infinity, delay: i * 1.4, ease: 'easeInOut' }}
          >
            {g}
          </motion.span>
          <span className="h-6 w-px bg-border" />
        </div>
      ))}
    </div>
  );
};

/** Tools — capability: intelligence reaching into the environment. */
export const CapabilityVisual = () => {
  const actions = ['Retrieval', 'Computation', 'Integration', 'Observation'];
  return (
    <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
      {actions.map((a) => (
        <div key={a} className="flex items-center gap-2 rounded-sm border border-border px-3 py-2.5">
          <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
          <span className="text-xs text-muted-foreground">{a}</span>
        </div>
      ))}
    </div>
  );
};

/** Modules — specialized intelligence: independent components, no shared wiring. */
export const SpecializationVisual = () => {
  const reduced = prefersReducedMotion();
  const shapes = [
    { cx: 34, cy: 55, r: 15 },
    { cx: 96, cy: 28, r: 8 },
    { cx: 152, cy: 72, r: 11 },
    { cx: 214, cy: 36, r: 6 },
    { cx: 268, cy: 62, r: 10 },
  ];
  return (
    <svg viewBox="0 0 300 100" className="w-full h-auto max-w-sm" aria-hidden="true">
      {shapes.map((s, i) => (
        <motion.circle
          key={i}
          cx={s.cx}
          cy={s.cy}
          r={s.r}
          className="fill-none stroke-foreground/40"
          strokeWidth="1.25"
          animate={reduced ? undefined : { opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 3, repeat: Infinity, delay: i * 0.4, ease: 'easeInOut' }}
        />
      ))}
    </svg>
  );
};
