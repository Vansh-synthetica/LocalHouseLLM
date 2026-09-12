import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const revealUp = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
};

/** Scroll-triggered reveal, once per element. Shared across every rebuilt page. */
export const Reveal = ({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) => (
  <motion.div
    className={className}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-100px' }}
    variants={{
      hidden: revealUp.hidden,
      visible: { ...revealUp.visible, transition: { ...revealUp.visible.transition, delay } },
    }}
  >
    {children}
  </motion.div>
);

/** Kicker + large section title, the standard section opener. */
export const SectionIntro = ({
  kicker,
  title,
  children,
  className = '',
}: {
  kicker: string;
  title: ReactNode;
  children?: ReactNode;
  className?: string;
}) => (
  <Reveal className={className}>
    <p className="technical-label">{kicker}</p>
    <h2 className="mt-4 font-serif font-normal tracking-tight text-4xl sm:text-5xl lg:text-6xl text-foreground leading-[1.05]">
      {title}
    </h2>
    {children}
  </Reveal>
);
