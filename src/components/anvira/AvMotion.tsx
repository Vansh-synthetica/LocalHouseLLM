import { type ReactNode, type PointerEvent, useEffect, useRef, useState } from 'react';
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1] as const;

const useFinePointer = () => {
  const [fine, setFine] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    const update = () => setFine(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);
  return fine;
};

/** Thin accent bar that fills as the page scrolls. */
export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.3 });
  return <motion.div className="avm-progress" style={{ scaleX }} aria-hidden="true" />;
};

/** Scroll-linked parallax + gentle scale for large visuals. */
export const ParallaxStage = ({
  children,
  className,
  distance = 60,
}: {
  children: ReactNode;
  className?: string;
  distance?: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
  const scale = useTransform(scrollYProgress, [0, 0.45, 1], [0.94, 1, 0.97]);
  const rotateX = useTransform(scrollYProgress, [0, 0.45, 1], [6, 0, -2]);
  return (
    <motion.div
      ref={ref}
      className={`avm-parallax ${className ?? ''}`}
      style={reduce ? undefined : { y, scale, rotateX }}
    >
      {children}
    </motion.div>
  );
};

/** 3D tilt + cursor spotlight on hover (fine pointers only). */
export const TiltCard = ({
  children,
  className = '',
  max = 6,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) => {
  const fine = useFinePointer();
  const reduce = useReducedMotion();
  const rx = useSpring(useMotionValue(0), { stiffness: 180, damping: 18 });
  const ry = useSpring(useMotionValue(0), { stiffness: 180, damping: 18 });
  const ref = useRef<HTMLDivElement>(null);
  const active = fine && !reduce;

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || !active) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    ry.set((px - 0.5) * max * 2);
    rx.set(-(py - 0.5) * max * 2);
    el.style.setProperty('--mx', `${px * 100}%`);
    el.style.setProperty('--my', `${py * 100}%`);
  };
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={`avm-tilt ${className}`}
      style={active ? { rotateX: rx, rotateY: ry, transformPerspective: 1000 } : undefined}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      {children}
      {active && <span className="avm-tilt__spot" aria-hidden="true" />}
    </motion.div>
  );
};

/** Button/link that leans toward the cursor. */
export const Magnetic = ({ children }: { children: ReactNode }) => {
  const fine = useFinePointer();
  const reduce = useReducedMotion();
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 16 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 16 });
  const ref = useRef<HTMLDivElement>(null);
  if (!fine || reduce) return <div className="avm-magnetic">{children}</div>;
  return (
    <motion.div
      ref={ref}
      className="avm-magnetic"
      style={{ x, y }}
      onPointerMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * 0.22);
        y.set((e.clientY - (r.top + r.height / 2)) * 0.3);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
};

/** Number that counts up when scrolled into view. */
export const CountUp = ({ to, suffix = '', duration = 1.6 }: { to: number; suffix?: string; duration?: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const [v, setV] = useState(reduce ? to : 0);
  useEffect(() => {
    if (!inView || reduce) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / (duration * 1000));
      setV(Math.round((1 - Math.pow(1 - p, 3)) * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, to, duration]);
  return (
    <span ref={ref}>
      {v}
      {suffix}
    </span>
  );
};
