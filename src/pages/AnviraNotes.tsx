import { type CSSProperties, type ReactNode, type PointerEvent, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Brain,
  CalendarCheck,
  Check,
  Flame,
  GraduationCap,
  Layers,
  LayoutTemplate,
  ListChecks,
  Mic,
  MousePointer2,
  Plus,
  RefreshCw,
  RotateCcw,
  Route,
  ScanText,
  Table2,
  Trophy,
  Users,
  Zap,
} from 'lucide-react';

import CleanLayout from '@/components/CleanLayout';
import SEO from '@/components/SEO';
import { DownloadButton } from '@/components/anvira/AvKit';
import { CountUp, Magnetic, ScrollProgress, TiltCard } from '@/components/anvira/AvMotion';

import iconAnviraNotes from '@/assets/anvira-notes/icon-anvira-notes.png';
import iconAnvira from '@/assets/anvira/icon-anvira.png';
import shotEditor from '@/assets/anvira-notes/01-notes-editor.png';
import shotTableChart from '@/assets/anvira-notes/02-notes-table-and-chart.png';
import shotTemplates from '@/assets/anvira-notes/03-notes-templates.png';
import shotMoreMenu from '@/assets/anvira-notes/04-notes-more-menu.png';
import shotSideRail from '@/assets/anvira-notes/05-notes-side-rail.png';
import shotModelLibrary from '@/assets/anvira-notes/07-model-library.png';
import shotStudyPath from '@/assets/anvira-notes/08-study-path.png';
import shotLessonCard from '@/assets/anvira-notes/09-study-lesson-card.png';
import shotQuizQuestion from '@/assets/anvira-notes/10-study-quiz-question.png';
import shotQuizCorrect from '@/assets/anvira-notes/11-study-quiz-correct.png';
import shotFlashcard from '@/assets/anvira-notes/12-study-flashcard.png';

import '@/pages/anvira-notes.css';

const RELEASES_URL = 'https://github.com/Vansh-synthetica/Anvira-Notes-release/releases/latest';
const REPO = 'Vansh-synthetica/Anvira-Notes-release';
const EASE = [0.22, 1, 0.36, 1] as const;

type Color = 'purple' | 'pink' | 'orange' | 'yellow' | 'green' | 'blue' | 'teal' | 'red';

/* ------------------------------------------------------------------ */
/* Small building blocks                                               */
/* ------------------------------------------------------------------ */

const Pop = ({
  children,
  className,
  delay = 0,
  y = 34,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y, scale: 0.97 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ type: 'spring', stiffness: 120, damping: 18, delay }}
  >
    {children}
  </motion.div>
);

const Pill = ({ color, icon, children }: { color: Color; icon?: ReactNode; children: ReactNode }) => (
  <span className={`an-pill c-${color}`}>
    {icon}
    {children}
  </span>
);

const Head = ({
  pill,
  color,
  icon,
  title,
  children,
  center = false,
}: {
  pill: string;
  color: Color;
  icon?: ReactNode;
  title: ReactNode;
  children?: ReactNode;
  center?: boolean;
}) => (
  <div className={`an-head ${center ? 'an-head--center' : ''}`}>
    <Pop>
      <Pill color={color} icon={icon}>
        {pill}
      </Pill>
    </Pop>
    <Pop delay={0.06}>
      <h2>{title}</h2>
    </Pop>
    {children && (
      <Pop delay={0.12}>
        <p>{children}</p>
      </Pop>
    )}
  </div>
);

const Cursor = ({ name, color, className }: { name: string; color: Color; className: string }) => (
  <span className={`an-cursor c-${color} ${className}`} aria-hidden="true">
    <svg viewBox="0 0 24 24" width="22" height="22">
      <path d="M4 2.5 L4 19 L8.6 14.7 L11.6 21.3 L14.4 20.1 L11.5 13.6 L17.8 13.6 Z" />
    </svg>
    <span>{name}</span>
  </span>
);

const COLORS = ['#7c5cff', '#ff4f9a', '#ffc21a', '#19b46c', '#1f8bff', '#ff7a2f'];

const Confetti = ({ fire }: { fire: number }) => {
  const reduce = useReducedMotion();
  if (!fire || reduce) return null;
  return (
    <div className="an-confetti" aria-hidden="true" key={fire}>
      {Array.from({ length: 30 }).map((_, i) => {
        const angle = (i / 30) * Math.PI * 2;
        const dist = 90 + (i % 5) * 30;
        return (
          <motion.i
            key={i}
            style={{ background: COLORS[i % COLORS.length] }}
            initial={{ x: 0, y: 0, opacity: 1, rotate: 0, scale: 1 }}
            animate={{
              x: Math.cos(angle) * dist,
              y: Math.sin(angle) * dist + 70,
              opacity: 0,
              rotate: (i % 2 ? 1 : -1) * 280,
              scale: 0.6,
            }}
            transition={{ duration: 1.1 + (i % 4) * 0.12, ease: [0.15, 0.7, 0.3, 1] }}
          />
        );
      })}
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

const Highlight = ({
  children,
  color,
  delay,
  light = false,
}: {
  children: ReactNode;
  color: Color;
  delay: number;
  light?: boolean;
}) => (
  <span className={`an-hl c-${color} ${light ? 'an-hl--light' : ''}`}>
    <motion.span
      className="an-hl__bg"
      aria-hidden="true"
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ delay, type: 'spring', stiffness: 150, damping: 20 }}
    />
    <span className="an-hl__text">{children}</span>
  </span>
);

const HeroLine = ({ children, delay }: { children: ReactNode; delay: number }) => (
  <motion.span
    className="an-hero__line"
    initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
    transition={{ duration: 0.9, ease: EASE, delay }}
  >
    {children}
  </motion.span>
);

const Sticker = ({
  icon,
  color,
  children,
  delay,
  rotate,
}: {
  icon: ReactNode;
  color: Color;
  children: ReactNode;
  delay: number;
  rotate: number;
}) => (
  <span className="an-bob" style={{ animationDelay: `${delay}s` }}>
    <motion.span
      className={`an-sticker__inner c-${color}`}
      initial={{ scale: 0, rotate: rotate - 25 }}
      animate={{ scale: 1, rotate }}
      transition={{ type: 'spring', stiffness: 260, damping: 14, delay: 0.9 + delay }}
      whileHover={{ scale: 1.08, rotate: 0 }}
    >
      <i>{icon}</i>
      {children}
    </motion.span>
  </span>
);

const HeroStage = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const frameY = useTransform(scrollYProgress, [0, 1], [70, -70]);
  const frameRotate = useTransform(scrollYProgress, [0.15, 0.5], [3, 0]);
  const blobRotate = useTransform(scrollYProgress, [0, 1], [-5, 5]);
  const s1 = useTransform(scrollYProgress, [0, 1], [90, -150]);
  const s2 = useTransform(scrollYProgress, [0, 1], [40, -220]);
  const s3 = useTransform(scrollYProgress, [0, 1], [130, -90]);

  return (
    <motion.div
      ref={ref}
      className="an-stage"
      initial={{ opacity: 0, y: 70 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.1, ease: EASE, delay: 0.45 }}
    >
      <motion.div className="an-stage__blob" style={{ rotate: blobRotate }} aria-hidden="true" />
      <motion.div className="an-stage__frame" style={{ y: frameY, rotate: frameRotate }}>
        <img src={shotEditor} alt="Anvira Notes editor open on a Biology 101 page, with sources and tags" />
      </motion.div>
      <Cursor name="Maya" color="purple" className="an-cursor--1" />
      <Cursor name="Arjun" color="orange" className="an-cursor--2" />
      <motion.div className="an-sticker an-sticker--1" style={{ y: s1 }}>
        <Sticker icon={<Flame />} color="orange" delay={0} rotate={-6}>
          12 day streak
        </Sticker>
      </motion.div>
      <motion.div className="an-sticker an-sticker--2" style={{ y: s2 }}>
        <Sticker icon={<RefreshCw />} color="green" delay={0.15} rotate={5}>
          Synced with Google Docs
        </Sticker>
      </motion.div>
      <motion.div className="an-sticker an-sticker--3" style={{ y: s3 }}>
        <Sticker icon={<Zap />} color="blue" delay={0.3} rotate={-3}>
          35 / 50 XP today
        </Sticker>
      </motion.div>
    </motion.div>
  );
};

const Hero = () => (
  <section className="an-hero" id="top">
    <div className="an-hero__canvas" aria-hidden="true" />
    <div className="an-hero__blobs" aria-hidden="true">
      <span />
      <span />
      <span />
    </div>
    <div className="an-shell">
      <motion.a
        href="#changelog"
        className="an-new"
        initial={{ opacity: 0, y: -12, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 18 }}
      >
        <img src={iconAnviraNotes} alt="" />
        <b>New in 1.2</b> Google Docs fidelity, both ways
        <ArrowRight className="an-new__arrow" />
      </motion.a>

      <h1 className="an-hero__title">
        <HeroLine delay={0.05}>
          Write it <Highlight color="yellow" delay={0.65}>once.</Highlight>
        </HeroLine>
        <HeroLine delay={0.2}>
          Learn it{' '}
          <Highlight color="purple" delay={0.85} light>
            for good.
          </Highlight>
        </HeroLine>
      </h1>

      <motion.p
        className="an-hero__sub"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.35, ease: EASE }}
      >
        Notion-style notebooks and a Duolingo-style study coach in one free app. Write your notes,
        then turn them into flashcards, quizzes and exams — with private AI that runs on your own PC.
      </motion.p>

      <motion.div
        className="an-actions"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.45, ease: EASE }}
      >
        <Magnetic>
          <DownloadButton repo={REPO} label="Download for Windows" className="an-btn an-btn--dark" />
        </Magnetic>
        <a href="#study" className="an-btn an-btn--light">
          Try the Study demo <MousePointer2 />
        </a>
      </motion.div>
      <motion.p
        className="an-hero__note"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        Free <span>·</span> v1.2.2 <span>·</span> No account needed <span>·</span> Works with Google
        Docs &amp; Notion
      </motion.p>

      <HeroStage />
    </div>
  </section>
);

/* ------------------------------------------------------------------ */
/* Marquee                                                             */
/* ------------------------------------------------------------------ */

const CHIPS: { t: string; c: Color }[] = [
  { t: 'Notebooks', c: 'purple' },
  { t: 'Backlinks', c: 'blue' },
  { t: 'Whiteboards', c: 'orange' },
  { t: 'Spreadsheets', c: 'green' },
  { t: 'Mind maps', c: 'pink' },
  { t: 'FSRS flashcards', c: 'yellow' },
  { t: 'Quizzes', c: 'teal' },
  { t: 'Lecture recorder', c: 'red' },
  { t: 'Offline OCR', c: 'purple' },
  { t: 'Google Docs sync', c: 'green' },
  { t: 'Notion sync', c: 'blue' },
  { t: 'Word export', c: 'orange' },
  { t: 'Anki export', c: 'pink' },
  { t: 'Private local AI', c: 'yellow' },
];

const Marquee = () => (
  <div className="an-marquee" aria-hidden="true">
    {[CHIPS, [...CHIPS].reverse()].map((row, r) => (
      <div key={r} className={`an-marquee__track ${r ? 'an-marquee__track--rev' : ''}`}>
        {[...row, ...row].map((c, i) => (
          <span key={i} className={`an-chip c-${c.c}`}>
            {c.t}
          </span>
        ))}
      </div>
    ))}
  </div>
);

/* ------------------------------------------------------------------ */
/* Bento                                                               */
/* ------------------------------------------------------------------ */

const Tile = ({
  className = '',
  color,
  icon,
  title,
  children,
  visual,
  delay = 0,
  tilt = 0,
}: {
  className?: string;
  color: Color;
  icon: ReactNode;
  title: string;
  children: ReactNode;
  visual?: ReactNode;
  delay?: number;
  tilt?: number;
}) => (
  <motion.article
    className={`an-tile c-${color} ${className}`}
    initial={{ opacity: 0, y: 60, rotate: tilt }}
    whileInView={{ opacity: 1, y: 0, rotate: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ type: 'spring', stiffness: 100, damping: 17, delay }}
    whileHover={{ y: -6 }}
  >
    <div className="an-tile__text">
      <span className="an-tile__icon">{icon}</span>
      <h3>{title}</h3>
      <p>{children}</p>
    </div>
    {visual && <div className="an-tile__visual">{visual}</div>}
  </motion.article>
);

const Crop = ({ src, alt }: { src: string; alt: string }) => (
  <div className="an-crop">
    <img src={src} alt={alt} loading="lazy" />
  </div>
);

const TemplatesVisual = () => (
  <div className="an-tpl">
    <div className="an-big">
      <CountUp to={22} />
    </div>
    <div className="an-fan" aria-hidden="true">
      <span>Lecture notes</span>
      <span>Lab report</span>
      <span>Weekly study plan</span>
    </div>
  </div>
);

const SyncVisual = () => (
  <div className="an-sync" aria-hidden="true">
    <span className="an-node an-node--main">Anvira Notes</span>
    <div className="an-sync__tracks">
      <div className="an-track">
        <i />
        <i />
      </div>
      <div className="an-track">
        <i />
        <i />
      </div>
    </div>
    <div className="an-sync__ends">
      <span className="an-node">Google Docs</span>
      <span className="an-node">Notion</span>
    </div>
    <span className="an-merge">3-way merge</span>
  </div>
);

const RecorderVisual = () => (
  <div aria-hidden="true">
    <span className="an-rec">
      <i /> REC 00:42
    </span>
    <div className="an-wave">
      {Array.from({ length: 30 }).map((_, i) => (
        <span
          key={i}
          style={
            {
              '--h': `${30 + Math.abs(Math.sin(i * 1.7)) * 70}%`,
              '--d': `${(i % 10) * 0.08}s`,
            } as CSSProperties
          }
        />
      ))}
    </div>
    <p className="an-quote">“…so the electron transport chain makes most of the ATP…”</p>
  </div>
);

const ScanVisual = () => (
  <div className="an-scan" aria-hidden="true">
    {[92, 78, 86, 60, 82, 48].map((w, i) => (
      <i key={i} style={{ width: `${w}%` }} />
    ))}
    <span className="an-scan__beam" />
    <span className="an-scan__badge">
      <Check /> 6 lines found · offline
    </span>
  </div>
);

const MIND_NODES = [
  { x: 52, y: 32, label: 'Glycolysis', c: '#ff7a2f' },
  { x: 248, y: 32, label: 'Krebs cycle', c: '#19b46c' },
  { x: 52, y: 140, label: 'ETC', c: '#1f8bff' },
  { x: 248, y: 140, label: 'ATP', c: '#ff4f9a' },
];

const MindMapVisual = () => (
  <svg className="an-mind" viewBox="0 0 300 172" aria-hidden="true">
    {MIND_NODES.map((n, i) => (
      <motion.path
        key={n.label}
        d={`M150 86 Q ${(150 + n.x) / 2} ${n.y < 86 ? 86 : 86} ${n.x} ${n.y}`}
        fill="none"
        stroke={n.c}
        strokeWidth="3"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 + i * 0.12, ease: EASE }}
      />
    ))}
    <motion.g
      initial={{ scale: 0 }}
      whileInView={{ scale: 1 }}
      viewport={{ once: true }}
      transition={{ type: 'spring', stiffness: 220, damping: 14 }}
      style={{ transformOrigin: '150px 86px' }}
    >
      <rect x="96" y="70" width="108" height="32" rx="16" fill="#16131f" />
      <text x="150" y="91" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">
        Cell respiration
      </text>
    </motion.g>
    {MIND_NODES.map((n, i) => (
      <motion.g
        key={n.label}
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', stiffness: 260, damping: 14, delay: 0.7 + i * 0.12 }}
        style={{ transformOrigin: `${n.x}px ${n.y}px` }}
      >
        <rect x={n.x - 42} y={n.y - 14} width="84" height="28" rx="14" fill="#fff" stroke={n.c} strokeWidth="2.5" />
        <text x={n.x} y={n.y + 4.5} textAnchor="middle" fontSize="11.5" fontWeight="700" fill="#16131f">
          {n.label}
        </text>
      </motion.g>
    ))}
  </svg>
);

const PresenceVisual = () => (
  <div className="an-presence" aria-hidden="true">
    <div className="an-avatars">
      <span style={{ background: '#7c5cff' }}>M</span>
      <span style={{ background: '#ff7a2f' }}>A</span>
      <span style={{ background: '#19b46c' }}>V</span>
      <em>3 people on this page</em>
    </div>
    <div className="an-minidoc">
      {[88, 70, 80, 54].map((w, i) => (
        <i key={i} style={{ width: `${w}%` }} />
      ))}
      <Cursor name="Maya" color="purple" className="an-cursor--mini1" />
      <Cursor name="Arjun" color="orange" className="an-cursor--mini2" />
    </div>
  </div>
);

const SourcesVisual = () => (
  <div aria-hidden="true">
    <div className="an-files">
      {[
        { n: 'Lab handout', t: 'PDF', c: 'red' },
        { n: 'Lecture 6', t: 'PPTX', c: 'orange' },
        { n: 'Textbook ch.4', t: 'DOCX', c: 'blue' },
        { n: 'Grades', t: 'XLSX', c: 'green' },
        { n: 'Whiteboard', t: 'PNG', c: 'purple' },
      ].map((f, i) => (
        <span key={f.n} className={`an-file c-${f.c} an-bob`} style={{ animationDelay: `${i * 0.35}s` }}>
          <b>{f.t}</b>
          {f.n}
        </span>
      ))}
    </div>
    <div className="an-answer">
      Most of the ATP comes from the electron transport chain, not from glycolysis.
      <small>from Lecture 6 – Cell energy.pptx</small>
    </div>
  </div>
);

const Bento = () => (
  <section className="an-section" id="notes">
    <div className="an-shell">
      <Head pill="Notes" color="purple" icon={<BookOpen />} title="Everything you write, in one place." center>
        Pages, tables, whiteboards, recordings and sources — in notebooks that stay organized on their
        own, and that sync with the tools you already use.
      </Head>
      <div className="an-bento">
        <Tile
          className="an-tile--w7 an-tile--wide-md"
          color="purple"
          icon={<LayoutTemplate />}
          title="Pages that feel Notion-fast"
          visual={<Crop src={shotEditor} alt="Anvira Notes page with cover, tags and blocks" />}
          tilt={-2}
        >
          Cover, icon, blocks, sub-pages, tags, backlinks and version history — with Google Docs-style
          menus, page sizes and layout.
        </Tile>
        <Tile
          className="an-tile--w5"
          color="yellow"
          icon={<LayoutTemplate />}
          title="Templates, ready to go"
          visual={<TemplatesVisual />}
          delay={0.08}
          tilt={2}
        >
          Included for study, work and writing — or pull one from the Good Docs Project, Obsidian or any
          GitHub file.
        </Tile>
        <Tile
          className="an-tile--w5"
          color="green"
          icon={<RefreshCw />}
          title="Two-way Google Docs & Notion sync"
          visual={<SyncVisual />}
          tilt={-2}
        >
          Link a page and edits flow both ways. Fonts, margins and pictures survive the round trip to
          Google Docs.
        </Tile>
        <Tile
          className="an-tile--w7 an-tile--wide-md"
          color="blue"
          icon={<Table2 />}
          title="A table becomes a chart in one click"
          visual={<Crop src={shotTableChart} alt="A data table and a bar chart generated from it" />}
          delay={0.08}
          tilt={2}
        >
          Tables, callouts, checklists, diagrams, whiteboards and spreadsheets — right next to your
          writing, all still editable.
        </Tile>
        <Tile
          className="an-tile--w4"
          color="pink"
          icon={<Mic />}
          title="Record the lecture"
          visual={<RecorderVisual />}
          tilt={-2}
        >
          whisper.cpp transcribes on your PC, then AI turns the transcript into lecture notes.
        </Tile>
        <Tile
          className="an-tile--w4"
          color="orange"
          icon={<ScanText />}
          title="Offline OCR & web research"
          visual={<ScanVisual />}
          delay={0.06}
        >
          Pull text out of pictures and scanned PDFs with no internet, or research the web from a page.
        </Tile>
        <Tile
          className="an-tile--w4"
          color="teal"
          icon={<Brain />}
          title="Mind maps from your notes"
          visual={<MindMapVisual />}
          delay={0.12}
          tilt={2}
        >
          See how ideas connect, then jump straight back into the page they came from.
        </Tile>
        <Tile
          className="an-tile--w6"
          color="orange"
          icon={<Users />}
          title="Live cursors on shared pages"
          visual={<PresenceVisual />}
          tilt={-2}
        >
          See who else is on a page in real time. Google Docs editors show up from Drive revisions.
        </Tile>
        <Tile
          className="an-tile--w6 an-tile--wide-md an-tile--white"
          color="purple"
          icon={<Zap />}
          title="Ask AI, grounded in your sources"
          visual={<SourcesVisual />}
          delay={0.08}
          tilt={2}
        >
          Summaries, writing help and answers that come from the PDFs, slides, docs and pictures you
          attached — not from the internet.
        </Tile>
      </div>
    </div>
  </section>
);

/* ------------------------------------------------------------------ */
/* Study                                                               */
/* ------------------------------------------------------------------ */

const STUDY: { key: string; icon: ReactNode; color: Color; title: string; body: string; img: string; alt: string }[] = [
  {
    key: 'path',
    icon: <Route />,
    color: 'purple',
    title: 'A learning path',
    body: 'Units and lessons built from your notebooks, with a daily goal, streak, XP and achievements.',
    img: shotStudyPath,
    alt: 'Study path for Calculus II with a streak, daily goal and achievements',
  },
  {
    key: 'lesson',
    icon: <GraduationCap />,
    color: 'blue',
    title: 'Lessons on tap',
    body: 'Open a lesson for practice problems and pick up exactly where you left off.',
    img: shotLessonCard,
    alt: 'Lesson card open for u-substitution practice',
  },
  {
    key: 'quiz',
    icon: <ListChecks />,
    color: 'orange',
    title: 'Quizzes from your notes',
    body: 'Questions generated from your own material, one at a time, with keyboard shortcuts.',
    img: shotQuizQuestion,
    alt: 'Quiz question asking which organelle produces most of a cell’s ATP',
  },
  {
    key: 'feedback',
    icon: <Check />,
    color: 'green',
    title: 'Instant feedback',
    body: 'Every answer comes with a short explanation, so you know why — not just whether.',
    img: shotQuizCorrect,
    alt: 'Quiz showing a correct answer with an explanation',
  },
  {
    key: 'cards',
    icon: <Layers />,
    color: 'pink',
    title: 'FSRS flashcards',
    body: 'Flip, rate Again, Hard, Good or Easy, and FSRS decides when each card comes back.',
    img: shotFlashcard,
    alt: 'Flashcard showing its answer with Again, Hard, Good and Easy buttons',
  },
];

const DURATION = 5200;

const StudyTabs = () => {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { margin: '-15% 0px' });
  const reduce = useReducedMotion();
  const playing = inView && !paused && !reduce;

  useEffect(() => {
    if (!playing) return;
    const t = setTimeout(() => setI((v) => (v + 1) % STUDY.length), DURATION);
    return () => clearTimeout(t);
  }, [i, playing]);

  useEffect(() => {
    const c = tabsRef.current;
    const el = c?.children[i] as HTMLElement | undefined;
    if (!c || !el || c.scrollWidth <= c.clientWidth + 2) return;
    c.scrollTo({ left: el.offsetLeft - (c.clientWidth - el.clientWidth) / 2, behavior: 'smooth' });
  }, [i]);

  const onEnter = (e: PointerEvent) => e.pointerType === 'mouse' && setPaused(true);
  const cur = STUDY[i];

  return (
    <div ref={rootRef} className="an-study" onPointerEnter={onEnter} onPointerLeave={() => setPaused(false)}>
      <div ref={tabsRef} className="an-study__tabs" role="tablist" aria-label="Study tools">
        {STUDY.map((s, idx) => (
          <button
            key={s.key}
            type="button"
            role="tab"
            aria-selected={idx === i}
            className={`an-tab c-${s.color} ${idx === i ? 'is-active' : ''}`}
            onClick={() => setI(idx)}
          >
            <span className="an-tab__icon">{s.icon}</span>
            <span className="an-tab__text">
              <strong>{s.title}</strong>
              <span>{s.body}</span>
            </span>
            {idx === i && playing && (
              <motion.span
                key={`bar-${i}`}
                className="an-tab__bar"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: DURATION / 1000, ease: 'linear' }}
              />
            )}
          </button>
        ))}
      </div>

      <div className={`an-study__view c-${cur.color}`}>
        <span className="an-study__step">
          {String(i + 1).padStart(2, '0')} / {String(STUDY.length).padStart(2, '0')}
        </span>
        <AnimatePresence mode="wait">
          <motion.img
            key={cur.key}
            src={cur.img}
            alt={cur.alt}
            initial={{ opacity: 0, y: 34, scale: 0.95, rotate: -2 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, y: -24, scale: 0.97, rotate: 1 }}
            transition={{ duration: 0.5, ease: EASE }}
          />
        </AnimatePresence>
      </div>
      <AnimatePresence mode="wait">
        <motion.p
          key={cur.key}
          className="an-study__caption"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.3 }}
        >
          <strong>{cur.title}.</strong> {cur.body}
        </motion.p>
      </AnimatePresence>
    </div>
  );
};

const OPTIONS = ['Nucleus', 'Mitochondrion', 'Ribosome', 'Golgi apparatus'];
const CORRECT = 1;

const QuizDemo = () => {
  const [picked, setPicked] = useState<number | null>(null);
  const [tries, setTries] = useState(0);
  const [burst, setBurst] = useState(0);
  const done = picked === CORRECT;

  const pick = (idx: number) => {
    if (done) return;
    setPicked(idx);
    setTries((t) => t + 1);
    if (idx === CORRECT) setBurst((b) => b + 1);
  };

  return (
    <div className="an-play">
      <div className="an-play__top">
        <Pill color="orange" icon={<ListChecks />}>
          Quiz · try it
        </Pill>
        <div className="an-progress" aria-hidden="true">
          <motion.i animate={{ width: done ? '100%' : '14%' }} transition={{ type: 'spring', stiffness: 120, damping: 18 }} />
        </div>
      </div>
      <p className="an-play__label">QUESTION 1 OF 1</p>
      <h4>Which organelle produces most of a cell’s ATP?</h4>
      <div className="an-options">
        {OPTIONS.map((o, idx) => {
          const state = picked === idx ? (idx === CORRECT ? 'right' : 'wrong') : '';
          return (
            <motion.button
              key={`${o}-${state === 'wrong' ? tries : 0}`}
              type="button"
              className={`an-option ${state ? `is-${state}` : ''}`}
              onClick={() => pick(idx)}
              disabled={done}
              whileTap={{ scale: 0.97 }}
              animate={state === 'wrong' ? { x: [0, -9, 9, -6, 6, 0] } : { x: 0 }}
              transition={{ duration: 0.4 }}
            >
              <span className="an-option__key">{idx + 1}</span>
              {o}
              {state === 'right' && <Check className="an-option__check" />}
            </motion.button>
          );
        })}
      </div>
      <AnimatePresence mode="popLayout">
        {picked !== null && (
          <motion.div
            key={done ? 'ok' : `no-${tries}`}
            className={`an-feedback ${done ? 'is-right' : 'is-wrong'}`}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
          >
            {done ? (
              <>
                <span>
                  <strong>Nicely done!</strong> Mitochondria make most ATP through cellular respiration.
                </span>
                <button type="button" onClick={() => setPicked(null)}>
                  Again
                </button>
              </>
            ) : (
              <span>
                <strong>Not quite.</strong> Think about where cellular respiration happens.
              </span>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      <Confetti fire={burst} />
    </div>
  );
};

const CARDS = [
  { q: 'Where does glycolysis happen?', a: 'In the cytoplasm' },
  { q: 'Where does the Krebs cycle run?', a: 'In the mitochondrial matrix' },
  { q: 'Which stage makes most of the ATP?', a: 'The electron transport chain — about 28 ATP' },
];

const RATINGS: { label: string; hint: string; color: Color }[] = [
  { label: 'Again', hint: '< 1 min', color: 'red' },
  { label: 'Hard', hint: '6 min', color: 'orange' },
  { label: 'Good', hint: '1 day', color: 'green' },
  { label: 'Easy', hint: '4 days', color: 'blue' },
];

const swipe = {
  enter: { opacity: 0, y: 40, scale: 0.9 },
  center: { opacity: 1, y: 0, scale: 1 },
  exit: (d: number) => ({ opacity: 0, x: d * 280, rotate: d * 16 }),
};

const FlashcardDemo = () => {
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [dir, setDir] = useState(1);
  const [burst, setBurst] = useState(0);
  const finished = idx >= CARDS.length;

  const rate = (r: number) => {
    setDir(r === 0 ? -1 : 1);
    setFlipped(false);
    const next = idx + 1;
    setIdx(next);
    if (next >= CARDS.length) setBurst((b) => b + 1);
  };

  return (
    <div className="an-play">
      <div className="an-play__top">
        <Pill color="pink" icon={<Layers />}>
          Flashcards · try it
        </Pill>
        <span className="an-play__count">
          {Math.min(idx + 1, CARDS.length)}/{CARDS.length}
        </span>
      </div>
      <div className="an-card-stage">
        <AnimatePresence mode="popLayout" custom={dir}>
          {!finished ? (
            <motion.button
              key={idx}
              type="button"
              className="an-flip"
              custom={dir}
              variants={swipe}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: 'spring', stiffness: 200, damping: 22 }}
              onClick={() => setFlipped((f) => !f)}
              aria-label={flipped ? `Answer: ${CARDS[idx].a}. Tap to see the question.` : `${CARDS[idx].q} Tap to see the answer.`}
            >
              <motion.span
                className="an-flip__inner"
                animate={{ rotateY: flipped ? 180 : 0 }}
                transition={{ type: 'spring', stiffness: 150, damping: 17 }}
              >
                <span className="an-flip__face an-flip__front">
                  <small>QUESTION</small>
                  {CARDS[idx].q}
                  <em>Tap to flip</em>
                </span>
                <span className="an-flip__face an-flip__back">
                  <small>ANSWER</small>
                  {CARDS[idx].a}
                </span>
              </motion.span>
            </motion.button>
          ) : (
            <motion.div
              key="done"
              className="an-done"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 16 }}
            >
              <Trophy />
              <strong>Deck done!</strong>
              <span>3 cards reviewed. See you tomorrow.</span>
              <button
                type="button"
                onClick={() => {
                  setIdx(0);
                  setFlipped(false);
                }}
              >
                <RotateCcw /> Restart
              </button>
            </motion.div>
          )}
        </AnimatePresence>
        <Confetti fire={burst} />
      </div>
      <div className={`an-ratings ${flipped && !finished ? 'is-on' : ''}`}>
        {RATINGS.map((r, i) => (
          <motion.button
            key={r.label}
            type="button"
            className={`an-rate c-${r.color}`}
            disabled={!flipped || finished}
            onClick={() => rate(i)}
            whileTap={{ scale: 0.92, y: 3 }}
          >
            {r.label}
            <small>{r.hint}</small>
          </motion.button>
        ))}
      </div>
      <p className="an-play__note">Example intervals — FSRS adjusts them to how well you know each card.</p>
    </div>
  );
};

const Study = () => (
  <section className="an-section an-band" id="study">
    <div className="an-shell">
      <Head pill="Study" color="pink" icon={<GraduationCap />} title="Studying, but make it a game." center>
        A learning path, lessons, FSRS flashcards, quizzes and timed exams — all made from what you
        already wrote. Daily goal, streak and XP included.
      </Head>
      <StudyTabs />

      <div className="an-playground">
        <Pop className="an-playground__head">
          <MousePointer2 /> Go on — try it right here.
        </Pop>
        <div className="an-playground__grid">
          <Pop>
            <QuizDemo />
          </Pop>
          <Pop delay={0.1}>
            <FlashcardDemo />
          </Pop>
        </div>
      </div>
    </div>
  </section>
);

/* ------------------------------------------------------------------ */
/* Showcase rows                                                       */
/* ------------------------------------------------------------------ */

const ROWS: {
  color: Color;
  pill: string;
  title: string;
  body: string;
  points: string[];
  img: string;
  alt: string;
  sticker: string;
}[] = [
  {
    color: 'yellow',
    pill: 'Templates',
    title: 'Start from something good.',
    body: 'Lecture notes, lab reports, exam revision, a weekly study plan — or anything from the Good Docs Project, Obsidian or a GitHub link.',
    points: ['Organized by Study, Work, Personal and Writing', 'A web library, plus your own templates', 'Works offline once added'],
    img: shotTemplates,
    alt: 'Template gallery with included and from-the-web templates',
    sticker: 'Weekly study plan',
  },
  {
    color: 'blue',
    pill: 'Page menu',
    title: 'Everything one click away.',
    body: 'Page history, templates, PDF export, “Study this notebook” and summaries all live in one tidy menu.',
    points: ['Export to PDF, Word, Markdown, HTML and more', 'Version history for every page', 'Turn a notebook into flashcards and quizzes'],
    img: shotMoreMenu,
    alt: 'Page menu with history, templates, export, study and summary options',
    sticker: 'Export as PDF',
  },
  {
    color: 'pink',
    pill: 'Side rail',
    title: 'A side bar that gets out of the way.',
    body: 'Notes and Study sit behind a thin rail. Point at it and it grows into full navigation, then tucks itself away again.',
    points: ['Your page gets the full width', 'Expands on hover', 'Ctrl 1 for Notes, Ctrl 2 for Study'],
    img: shotSideRail,
    alt: 'Hover side rail expanded over the Notes and Study navigation',
    sticker: 'Ctrl 1 · Ctrl 2',
  },
  {
    color: 'green',
    pill: 'AI & models',
    title: 'Pick a model that fits your PC.',
    body: 'A first-run hardware scan only offers models of 7B or smaller, and the Hugging Face library flags anything too large before you download.',
    points: ['Filter by GPU, CPU, light or heavy', 'Runs on Anvira Runtime, privately on your PC', 'The same runtime powers the Anvira agent app'],
    img: shotModelLibrary,
    alt: 'AI & Models library with Hugging Face models and size badges',
    sticker: 'Runs on your PC',
  },
];

const Row = ({ row, reverse }: { row: (typeof ROWS)[number]; reverse: boolean }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] });
  const rotate = useTransform(scrollYProgress, [0, 1], [reverse ? 5 : -5, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [80, 0]);

  return (
    <div ref={ref} className={`an-row c-${row.color} ${reverse ? 'an-row--rev' : ''}`}>
      <div className="an-row__text">
        <Pop>
          <Pill color={row.color}>{row.pill}</Pill>
        </Pop>
        <Pop delay={0.05}>
          <h3>{row.title}</h3>
        </Pop>
        <Pop delay={0.1}>
          <p>{row.body}</p>
        </Pop>
        <ul className="an-checks">
          {row.points.map((p, i) => (
            <motion.li
              key={p}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 + i * 0.08, ease: EASE, duration: 0.5 }}
            >
              <i>
                <Check />
              </i>
              {p}
            </motion.li>
          ))}
        </ul>
      </div>
      <div className="an-row__panel">
        <motion.div className="an-row__shot" style={{ rotate, y }}>
          <TiltCard max={4}>
            <img src={row.img} alt={row.alt} loading="lazy" />
          </TiltCard>
        </motion.div>
        <span className="an-row__sticker an-bob">{row.sticker}</span>
      </div>
    </div>
  );
};

const Rows = () => (
  <section className="an-section">
    <div className="an-shell">
      <Head pill="The little things" color="blue" icon={<Zap />} title="Small touches. Big difference." center />
      <div className="an-rows">
        {ROWS.map((r, i) => (
          <Row key={r.pill} row={r} reverse={i % 2 === 1} />
        ))}
      </div>
    </div>
  </section>
);

/* ------------------------------------------------------------------ */
/* Stats, timeline, FAQ, final                                         */
/* ------------------------------------------------------------------ */

const STATS: { to: number; suffix?: string; label: string; color: Color }[] = [
  { to: 22, label: 'templates included, plus a web library', color: 'purple' },
  { to: 2, label: 'two-way syncs: Google Docs and Notion', color: 'green' },
  { to: 0, label: 'accounts needed to start studying', color: 'orange' },
  { to: 7, suffix: 'B', label: 'largest model the first-run guide offers', color: 'blue' },
];

const Stats = () => (
  <section className="an-section an-section--tight">
    <div className="an-shell">
      <div className="an-stats">
        {STATS.map((s, i) => (
          <Pop key={s.label} delay={i * 0.07} className={`an-stat c-${s.color}`}>
            <b>
              <CountUp to={s.to} suffix={s.suffix} />
            </b>
            <span>{s.label}</span>
          </Pop>
        ))}
      </div>
    </div>
  </section>
);

const TIMELINE: { version: string; title: string; items: string[]; color: Color }[] = [
  {
    version: '1.2',
    title: 'Google Docs fidelity, both ways',
    color: 'purple',
    items: [
      'Fonts, page size, margins and pictures survive the round trip to Google Docs',
      'Offline OCR, a steadier whiteboard brush and faster Study for small models',
      'First-run guide with a hardware scan that only offers models of 7B or smaller',
      'Security audit, crash-safe saves and more accurate, crash-proof recording',
    ],
  },
  { version: '1.1', title: 'Collaborative cursors', color: 'pink', items: ['Live cursors between Anvira users on the same page'] },
  {
    version: '1.0.3',
    title: 'Lecture recorder & research',
    color: 'orange',
    items: [
      'Local lecture recorder turns speech into a transcript and lecture notes',
      'Ask Pochi from "/" and built-in web research',
      'View public Google Docs without signing in; runtime auto-recovery',
    ],
  },
  {
    version: '1.0.2',
    title: 'Google Docs + Notion sync',
    color: 'yellow',
    items: ['Two-way sync, Settings → Connections, and Send to Google Docs or Notion'],
  },
  {
    version: '1.0.1',
    title: "Today's session",
    color: 'green',
    items: ['Review forecast, Trash with Undo, favourites and recents', 'Import files as pages and Word (.docx) export'],
  },
  {
    version: '1.0.0',
    title: 'The first release',
    color: 'blue',
    items: ['Notes, Study, Anvira Runtime, model library, auto-update and optional account'],
  },
];

const Timeline = () => (
  <section className="an-section" id="changelog">
    <div className="an-shell">
      <Head pill="Release history" color="green" icon={<CalendarCheck />} title="Shipping fast. Like, really fast." center>
        Updates install themselves from a small button in the app — nothing downloads until you
        click.
      </Head>
      <ol className="an-timeline">
        {TIMELINE.map((t, i) => (
          <motion.li
            key={t.version}
            className={`an-tl c-${t.color}`}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ type: 'spring', stiffness: 110, damping: 18, delay: i * 0.04 }}
          >
            <motion.span
              className="an-tl__dot"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 300, damping: 12, delay: 0.15 + i * 0.04 }}
            />
            <div className="an-tl__card">
              <span className="an-tl__ver">v{t.version}</span>
              {i === 0 && <span className="an-tl__latest">Latest</span>}
              <h4>{t.title}</h4>
              <ul>
                {t.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </div>
          </motion.li>
        ))}
      </ol>
    </div>
  </section>
);

const FAQS = [
  { q: 'Is Anvira Notes free?', a: 'Yes. Anvira Notes is free for Windows — notebooks, templates and Study are all included, with no paid tier.' },
  { q: 'Do I need an internet connection?', a: 'No. Notes and Study run on Anvira Runtime on your PC, so Ask AI, summaries and Study generation all work offline.' },
  {
    q: 'Does it sync with Google Docs and Notion?',
    a: 'Yes — two-way. Link a page to a Google Doc or Notion page and changes merge both ways. Editing a Google Doc needs a Google sign-in, and local pictures need public hosting to be pushed to Google.',
  },
  { q: 'Can it make flashcards and quizzes from my notes?', a: 'Yes. Turn any notebook into a learning path, or drop in a PDF or slide deck with “Study from a file” and it becomes lessons, flashcards and quizzes.' },
  { q: 'Can I record a lecture?', a: 'Yes. The recorder transcribes on your PC with whisper.cpp and turns the transcript into AI lecture notes. Nothing is uploaded.' },
  { q: 'What spaced-repetition system do the flashcards use?', a: 'FSRS decides when each card comes back, and you can export your decks to Anki at any time.' },
  { q: 'Do I need an account?', a: 'No. An account is optional and only adds sync and presence. Notes and Study work fully without signing in.' },
  { q: 'Why does Windows show a SmartScreen warning?', a: 'The installer isn’t code-signed yet. Choose More info → Run anyway. It installs per user and doesn’t need administrator rights.' },
];
const FAQ_COLORS: Color[] = ['purple', 'pink', 'orange', 'green', 'blue', 'teal', 'yellow', 'red'];

const FaqItem = ({ q, a, i }: { q: string; a: string; i: number }) => {
  const [open, setOpen] = useState(i === 0);
  return (
    <Pop delay={i * 0.03} y={20} className={`an-faq__item c-${FAQ_COLORS[i % FAQ_COLORS.length]} ${open ? 'is-open' : ''}`}>
      <button type="button" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
        {q}
        <span className="an-faq__plus">
          <Plus />
        </span>
      </button>
      <motion.div
        initial={false}
        animate={open ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.35, ease: EASE }}
        style={{ overflow: 'hidden' }}
      >
        <p>{a}</p>
      </motion.div>
    </Pop>
  );
};

const Faq = () => (
  <section className="an-section an-section--tight" id="faq">
    <div className="an-shell">
      <Head pill="FAQ" color="orange" icon={<Plus />} title="Good questions." center />
      <div className="an-faq">
        {FAQS.map((f, i) => (
          <FaqItem key={f.q} q={f.q} a={f.a} i={i} />
        ))}
      </div>
    </div>
  </section>
);

const Final = () => (
  <section className="an-section an-section--tight">
    <div className="an-shell">
      <Pop className="an-final">
        <span className="an-shape an-shape--circle" aria-hidden="true" />
        <span className="an-shape an-shape--square" aria-hidden="true" />
        <span className="an-shape an-shape--ring" aria-hidden="true" />
        <svg className="an-shape an-shape--squiggle" viewBox="0 0 120 40" aria-hidden="true">
          <path d="M4 20 Q 19 4 34 20 T 64 20 T 94 20 T 116 20" />
        </svg>
        <svg className="an-shape an-shape--star" viewBox="0 0 100 100" aria-hidden="true">
          <path d="M50 0 C55 35 65 45 100 50 C65 55 55 65 50 100 C45 65 35 55 0 50 C35 45 45 35 50 0Z" />
        </svg>

        <img src={iconAnviraNotes} alt="" className="an-final__icon" />
        <h2>Your notes, ready to study.</h2>
        <p>Free for Windows. Private AI on your PC. Works with Google Docs and Notion.</p>
        <div className="an-actions">
          <Magnetic>
            <DownloadButton repo={REPO} label="Download Anvira Notes" className="an-btn an-btn--white" />
          </Magnetic>
          <a href={RELEASES_URL} target="_blank" rel="noopener noreferrer" className="an-btn an-btn--glass">
            Release notes <ArrowUpRight />
          </a>
        </div>
        <p className="an-final__fine">Per-user install · no admin rights · SmartScreen: More info → Run anyway</p>
      </Pop>

      <Pop delay={0.1}>
        <Link to="/anvira" className="an-xlink">
          <img src={iconAnvira} alt="" />
          <span>
            Also from LocalHouseLLM: <strong>Anvira</strong>, the local agent workspace
          </span>
          <ArrowRight />
        </Link>
      </Pop>
    </div>
  </section>
);

/* ------------------------------------------------------------------ */

const AnviraNotes = () => (
  <CleanLayout>
    <SEO
      title="Anvira Notes — Free AI Notes & Study App With Flashcards"
      description="Anvira Notes is a free, local-first notes and study app: Notion-style pages, Google Docs and Notion sync, a lecture recorder, and FSRS flashcards from your notes."
      ogImage={shotEditor}
      ogImageAlt="Anvira Notes editor open on a Biology 101 page with sources and tags"
      ogImageWidth={1700}
      ogImageHeight={959}
      keywords="Anvira Notes, AI notes app, study app, flashcards app, FSRS spaced repetition, Anki export, mind maps, lecture recorder, Google Docs sync, Notion sync, offline notes app, Notion alternative, AI study tool, LocalHouseLLM"
      canonical="https://localhousellm.com/anvira-notes"
      schema={{
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'SoftwareApplication',
            '@id': 'https://localhousellm.com/anvira-notes#app',
            name: 'Anvira Notes',
            alternateName: 'Anvira Notes AI Study App',
            applicationCategory: 'EducationApplication',
            operatingSystem: 'Windows',
            softwareVersion: '1.2.2',
            description:
              'Anvira Notes combines Notion-style notebooks with an adaptive Study mode — flashcards, quizzes and exams generated from your own notes and files, with private AI that runs on your PC.',
            featureList: [
              'Notion-style pages with blocks, backlinks and version history',
              'Two-way Google Docs and Notion sync',
              'Local lecture recorder with whisper.cpp transcription',
              'Offline OCR and built-in web research',
              'Live cursors on shared pages',
              'Templates plus a web template library',
              'Tables that turn into charts, diagrams and mind maps',
              'FSRS spaced-repetition flashcards with Anki export',
              'Study path with quizzes, timed exams and grade calculation',
              'Export to PDF, Word, Markdown, HTML and text',
            ],
            url: 'https://localhousellm.com/anvira-notes',
            downloadUrl: RELEASES_URL,
            publisher: { '@id': 'https://localhousellm.com/#organization' },
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
          },
          {
            '@type': 'FAQPage',
            '@id': 'https://localhousellm.com/anvira-notes#faq',
            mainEntity: FAQS.map((f) => ({
              '@type': 'Question',
              name: f.q,
              acceptedAnswer: { '@type': 'Answer', text: f.a },
            })),
          },
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'LocalHouseLLM', item: 'https://localhousellm.com/' },
              { '@type': 'ListItem', position: 2, name: 'Anvira Notes', item: 'https://localhousellm.com/anvira-notes' },
            ],
          },
        ],
      }}
    />
    <MotionConfig reducedMotion="user">
      <div className="an">
        <ScrollProgress />
        <Hero />
        <Marquee />
        <Bento />
        <Study />
        <Rows />
        <Stats />
        <Timeline />
        <Faq />
        <Final />
      </div>
    </MotionConfig>
  </CleanLayout>
);

export default AnviraNotes;
