import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

import CleanLayout from '@/components/CleanLayout';
import SEO from '@/components/SEO';
import { NodeField, LocalMachine } from '@/components/home/HomeVisuals';
import { ParallaxImage, ScrollWords, StackFlow } from '@/components/home/HomeMotion';
import { CountUp } from '@/components/anvira/AvMotion';
import { archive, getEntry } from '@/data/archive';
import { WorkspaceVisual } from '@/components/anvira/AnviraVisuals';
import { DownloadButton } from '@/components/anvira/AvKit';
import {
  type ProductId,
  formatReleaseDate,
  formatSize,
  latestRelease,
  recentHighlights,
  releaseProducts,
} from '@/data/releases';
import forestImage from '@/assets/video-poster.jpg';
import iconAnvira from '@/assets/anvira/icon-anvira.png';
import iconAnviraNotes from '@/assets/anvira-notes/icon-anvira-notes.png';
import '@/pages/anvira.css';
import './home.css';

const revealUp = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
};

const revealStage = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

const Reveal = ({
  children,
  className,
  variants = revealUp,
}: {
  children: React.ReactNode;
  className?: string;
  variants?: typeof revealUp | typeof revealStage;
}) => (
  <motion.div
    className={className}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-80px' }}
    variants={variants}
  >
    {children}
  </motion.div>
);

// Hand-written card copy for specific versions. When a newer version ships
// before this is updated, the card falls back to that release's own highlights.
const CARD_COPY: Record<string, string> = {
  'anvira-notes@1.2.11':
    'One look across the whole app, more private Messages, and your profile on the web — on top of study groups, graded mock exams and GPU acceleration.',
  'anvira@1.0.1':
    'The local agent workspace now updates itself and its runtime from one button, adds an optional account, and explains engine errors in plain language.',
  'anvira-runtime@1.0.2':
    'The local AI engine under both apps now serves several requests at once, so chat and Ask AI never wait behind an exam or lesson being written.',
};

const CARD_LINKS: Record<ProductId, { to: string; cta: string; category: string }> = {
  'anvira-notes': { to: '/anvira-notes', cta: 'Explore Anvira Notes', category: 'Product release' },
  anvira: { to: '/anvira', cta: 'Explore Anvira', category: 'Product release' },
  'anvira-runtime': { to: '/anvira#runtime', cta: 'How the runtime works', category: 'Infrastructure' },
};

const latestReleases = releaseProducts
  .map((p) => {
    const r = latestRelease(p.id);
    return {
      key: p.id,
      title: `${p.name} ${r.version}`,
      description:
        CARD_COPY[`${p.id}@${r.version}`] ??
        `${recentHighlights(p.id, 3)
          .map((h) => h.text)
          .join(' · ')}.`,
      iso: r.date,
      date: formatReleaseDate(r.date),
      ...CARD_LINKS[p.id],
    };
  })
  .sort((a, b) => b.iso.localeCompare(a.iso));

const allReleases = releaseProducts.flatMap((p) => p.releases.map((r) => r.date)).sort();
const releaseCount = allReleases.length;
const releaseDays = Math.max(
  1,
  Math.round((Date.parse(allReleases[allReleases.length - 1]) - Date.parse(allReleases[0])) / 86_400_000),
);

const notesLatest = latestRelease('anvira-notes');
const [notesNewest] = recentHighlights('anvira-notes', 1);
const ANNOUNCE =
  notesNewest?.text === 'Messages'
    ? { text: `Anvira Notes ${notesLatest.version}: study groups, mock exams and grades`, to: '/anvira-notes#messages' }
    : { text: `Anvira Notes ${notesLatest.version}: ${notesNewest?.text ?? 'what’s new'}`, to: '/releases/anvira-notes' };

const researchHighlights = [
  'localhousellm-master-report',
  'kv-cache-optimization',
  'five-layer-execution-stack',
  'adaptive-modular-ai',
]
  .map((slug) => getEntry(slug))
  .filter((e): e is NonNullable<typeof e> => Boolean(e));

const facts: { value: number; suffix?: string; label: string }[] = [
  { value: 21, suffix: '/21', label: 'agent workflow checks passed by a 7B model in our own testing' },
  { value: archive.length, label: 'research papers and technical reports, free to read' },
  { value: releaseCount, label: `releases shipped in ${releaseDays} days, each with public notes` },
  { value: 0, label: 'notes or prompts sent to a cloud AI by default — models run on your PC' },
];

const SectionIntro = ({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  children?: React.ReactNode;
}) => (
  <Reveal className="lh-section__intro">
    <p className="lh-eyebrow">{eyebrow}</p>
    <h2>{title}</h2>
    {children}
  </Reveal>
);

const Hero = () => (
  <section className="lh-hero">
    <div className="lh-shell">
      <Link to={ANNOUNCE.to} className="lh-announce lh-rise" style={{ ['--d' as string]: '0ms' }}>
        <span className="lh-announce__tag">New</span>
        <span className="lh-announce__text">{ANNOUNCE.text}</span>
        <ArrowRight className="h-3.5 w-3.5" />
      </Link>
      <div className="lh-hero__top">
        <h1 className="lh-hero__title">
          <span className="lh-rise" style={{ ['--d' as string]: '0ms' }}>
            Modular <span className="lh-draw" style={{ ['--d' as string]: '700ms' }}>research</span> and
          </span>{' '}
          <span className="lh-rise" style={{ ['--d' as string]: '90ms' }}>
            <span className="lh-draw" style={{ ['--d' as string]: '850ms' }}>infrastructure</span> for
          </span>{' '}
          <span className="lh-rise" style={{ ['--d' as string]: '180ms' }}>
            intelligence that belongs to you.
          </span>
        </h1>
        <div className="lh-hero__aside lh-rise" style={{ ['--d' as string]: '260ms' }}>
          <p>
            AI will reshape how we work and live. LocalHouseLLM is building open systems that keep
            intelligence modular, persistent, and on hardware you control — not locked in someone
            else&apos;s cloud.
          </p>
          <div className="lh-actions lh-actions--compact">
            <a href="#anvira" className="lh-button lh-button--primary">
              Get the free apps <ArrowRight className="h-3.5 w-3.5" />
            </a>
            <Link to="/stack" className="lh-button lh-button--ghost">
              Explore the stack
            </Link>
          </div>
        </div>
      </div>

      <div className="lh-hero__visual lh-rise" style={{ ['--d' as string]: '360ms' }}>
        <div className="lh-hero__visual-inner">
          <NodeField />
        </div>
      </div>
    </div>
  </section>
);

const SpotlightBand = () => (
  <section className="lh-spotlight" aria-labelledby="spotlight-heading">
    <div className="lh-spotlight__frame">
      <ParallaxImage src={forestImage} className="lh-parallax" />
      <div className="lh-shell lh-spotlight__content">
        <Reveal>
          <p className="lh-spotlight__label">Anvira</p>
          <h2 id="spotlight-heading">
            Local-first workspace for chat, agents, and knowledge — on your machine.
          </h2>
          <Link to="/anvira" className="lh-button lh-button--on-dark">
            Read more <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </Reveal>
      </div>
    </div>
  </section>
);

const LatestReleases = () => (
  <section className="lh-section lh-section--flush" id="updates">
    <div className="lh-shell">
      <Reveal>
        <h2 className="lh-section-title">Latest releases</h2>
      </Reveal>
      <ul className="lh-release-grid">
        {latestReleases.map((item) => (
          <li key={item.key}>
            <Reveal className="lh-release-card">
              <Link to={item.to} className="lh-release-card__link">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <div className="lh-release-card__meta">
                  <span className="lh-meta-label">Date</span>
                  <time dateTime={item.iso}>{item.date}</time>
                  <span className="lh-meta-label">Category</span>
                  <span>{item.category}</span>
                </div>
                <span className="lh-release-card__cta">
                  {item.cta} <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            </Reveal>
          </li>
        ))}
      </ul>
      <Reveal>
        <Link to="/releases" className="lh-text-link">
          All release notes <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </Reveal>
    </div>
  </section>
);

const FactsBand = () => (
  <section className="lh-facts" aria-label="LocalHouseLLM in numbers">
    <div className="lh-shell">
      <ul className="lh-facts__grid">
        {facts.map((f, i) => (
          <li key={f.label}>
            <Reveal className="lh-fact">
              <strong style={{ transitionDelay: `${i * 60}ms` }}>
                <CountUp to={f.value} suffix={f.suffix} />
              </strong>
              <span>{f.label}</span>
            </Reveal>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

const MissionBand = () => (
  <section className="lh-mission">
    <div className="lh-shell">
      <Reveal>
        <ScrollWords
          className="lh-mission__title"
          text="At LocalHouseLLM, we build AI infrastructure to serve people who want to own their intelligence."
        />
        <Link to="/about" className="lh-text-link">
          Learn more about our mission <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </Reveal>
    </div>
  </section>
);

const ThesisSection = () => (
  <section className="lh-section lh-section--line" id="idea">
    <div className="lh-shell">
      <SectionIntro
        eyebrow="The idea"
        title={
          <>
            Intelligence shouldn&apos;t live inside a single <span className="lh-mark">model</span>.
          </>
        }
      >
        <p>
          Models are only one part of an intelligent system. Ours separates the rest into layers —
          here is what happens to a single request, step by step.
        </p>
      </SectionIntro>

      <StackFlow />

      <Reveal className="lh-chain-cta">
        <Link to="/stack" className="lh-button lh-button--ghost">
          See the full architecture <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </Reveal>
    </div>
  </section>
);

const ResearchGrid = () => (
  <section className="lh-section lh-section--line">
    <div className="lh-shell">
      <Reveal>
        <h2 className="lh-section-title">From the lab</h2>
      </Reveal>
      <ul className="lh-research-grid">
        {researchHighlights.map((item) => (
          <li key={item.slug}>
            <Reveal>
              <Link to={`/archive/${item.slug}`} className="lh-research-card">
                <div className="lh-research-card__tags">
                  <span>{item.category}</span>
                  <span>{item.source}</span>
                </div>
                <h3>{item.title}</h3>
                <span className="lh-research-card__more">
                  Read <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            </Reveal>
          </li>
        ))}
      </ul>
      <Reveal>
        <Link to="/archive" className="lh-text-link">
          All research and reports <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </Reveal>
    </div>
  </section>
);

const APPS: { id: ProductId; name: string; to: string; icon: string; body: string }[] = [
  {
    id: 'anvira-notes',
    name: 'Anvira Notes',
    to: '/anvira-notes',
    icon: iconAnviraNotes,
    body: 'Notion-style notes and a study coach in one app: flashcards, quizzes and graded mock exams made from your own notes, Google Docs and Notion sync, and study groups.',
  },
  {
    id: 'anvira',
    name: 'Anvira',
    to: '/anvira',
    icon: iconAnvira,
    body: 'A local AI chat and coding agent: point it at a project folder and it plans, writes and verifies the work — every change a diff you can undo.',
  },
];

const AnviraSection = () => (
  <section className="lh-section lh-section--line lh-anvira-teaser" id="anvira">
    <div className="lh-shell">
      <Reveal className="lh-anvira-teaser__intro">
        <p className="lh-eyebrow">Our first products</p>
        <h2>
          Meet <span className="lh-mark">Anvira</span> and Anvira Notes.
        </h2>
        <p>
          A local-first agent workspace and a notes-and-study app, both running on one shared
          local runtime — on your machine, with models you choose.
        </p>
      </Reveal>
      <Reveal className="lh-anvira-preview" variants={revealStage}>
        <WorkspaceVisual />
      </Reveal>
      <ul className="lh-apps">
        {APPS.map((app) => {
          const r = latestRelease(app.id);
          return (
            <li key={app.id}>
              <Reveal className="lh-app">
                <div className="lh-app__top">
                  <img src={app.icon} alt="" width={52} height={52} />
                  <div>
                    <h3>
                      <Link to={app.to}>{app.name}</Link>
                    </h3>
                    <p className="lh-app__meta">
                      Version {r.version} · Windows 10 &amp; 11{r.installer ? ` · ${formatSize(r.installer.size)}` : ''}
                    </p>
                  </div>
                </div>
                <p className="lh-app__body">{app.body}</p>
                <div className="lh-actions lh-actions--compact">
                  <DownloadButton product={app.id} label="Download free" className="lh-button lh-button--primary" />
                  <Link to={app.to} className="lh-button lh-button--ghost">
                    Learn more
                  </Link>
                </div>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </div>
  </section>
);

const LocalFirstSection = () => (
  <section className="lh-section lh-section--line" id="local-first">
    <div className="lh-shell">
      <SectionIntro
        eyebrow="Local-first"
        title={
          <>
            Intelligence should <span className="lh-mark">belong</span> to the people using it.
          </>
        }
      >
        <p>Local-first by default. Cloud when you choose it.</p>
      </SectionIntro>
      <Reveal className="lh-section__stage" variants={revealStage}>
        <LocalMachine />
      </Reveal>
    </div>
  </section>
);

const FinalSection = () => (
  <section className="lh-final">
    <div className="lh-shell">
      <Reveal variants={revealStage}>
        <h2>
          Intelligence, built to <span className="lh-mark">belong</span>.
        </h2>
        <p>Building infrastructure for modular, persistent, executable intelligence.</p>
        <div className="lh-actions">
          <Link to="/anvira" className="lh-button lh-button--primary">
            Try Anvira <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <Link to="/docs" className="lh-button lh-button--ghost">
            Developer docs
          </Link>
        </div>
      </Reveal>
    </div>
  </section>
);

const Index = () => {
  const homeSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': 'https://localhousellm.com/#webpage',
    url: 'https://localhousellm.com/',
    name: 'LocalHouseLLM — Local-First AI Infrastructure, Anvira and Anvira Notes',
    isPartOf: { '@id': 'https://localhousellm.com/#website' },
    about: { '@id': 'https://localhousellm.com/#organization' },
    primaryImageOfPage: 'https://localhousellm.com/og/default.png',
    dateModified: latestReleases[0]?.iso,
    mainEntity: {
      '@type': 'ItemList',
      name: 'LocalHouseLLM apps',
      itemListElement: APPS.map((app, i) => {
        const r = latestRelease(app.id);
        return {
          '@type': 'ListItem',
          position: i + 1,
          item: {
            '@type': 'SoftwareApplication',
            '@id': `https://localhousellm.com${app.to}#app`,
            name: app.name,
            url: `https://localhousellm.com${app.to}`,
            description: app.body,
            applicationCategory: app.id === 'anvira' ? 'DeveloperApplication' : 'EducationApplication',
            operatingSystem: 'Windows 10, Windows 11',
            softwareVersion: r.version,
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
          },
        };
      }),
    },
  };

  return (
    <CleanLayout>
      <SEO
        title="LocalHouseLLM — Local-First AI Apps and Infrastructure"
        description="LocalHouseLLM makes free, local-first AI apps for Windows — Anvira Notes and the Anvira coding agent — and the open AI infrastructure they run on."
        keywords="LocalHouseLLM, Local House LLM, Anvira, Anvira Notes, Anvira Runtime, local AI, local-first AI, AI notes app, local AI coding agent, AI infrastructure, AICL, ORCHA, Nomi, modular AI"
        modifiedTime={latestReleases[0]?.iso}
        canonical="https://localhousellm.com/"
        schema={homeSchema}
      />

      <div className="lhllm-home">
        <Hero />
        <SpotlightBand />
        <FactsBand />
        <LatestReleases />
        <MissionBand />
        <ThesisSection />
        <ResearchGrid />
        <AnviraSection />
        <LocalFirstSection />
        <FinalSection />
      </div>
    </CleanLayout>
  );
};

export default Index;
