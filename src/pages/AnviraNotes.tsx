import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  BookOpen,
  Brain,
  FileDown,
  Flame,
  LayoutTemplate,
  Mic,
  Sparkles,
  Table2,
  Trophy,
} from 'lucide-react';

import CleanLayout from '@/components/CleanLayout';
import SEO from '@/components/SEO';
import { Reveal, SectionHead, ShowcaseRow, FeatureCard, Frame, Faq, DownloadButton } from '@/components/anvira/AvKit';

import iconAnviraNotes from '@/assets/anvira-notes/icon-anvira-notes.png';
import iconAnvira from '@/assets/anvira/icon-anvira.png';
import shotEditor from '@/assets/anvira-notes/01-notes-editor.png';
import shotTableChart from '@/assets/anvira-notes/02-notes-table-and-chart.png';
import shotTemplates from '@/assets/anvira-notes/03-notes-templates.png';
import shotMoreMenu from '@/assets/anvira-notes/04-notes-more-menu.png';
import shotSideRail from '@/assets/anvira-notes/05-notes-side-rail.png';
import shotSignIn from '@/assets/anvira-notes/06-notes-sign-in.png';
import shotModelLibrary from '@/assets/anvira-notes/07-model-library.png';
import shotStudyPath from '@/assets/anvira-notes/08-study-path.png';
import shotLessonCard from '@/assets/anvira-notes/09-study-lesson-card.png';
import shotQuizQuestion from '@/assets/anvira-notes/10-study-quiz-question.png';
import shotQuizCorrect from '@/assets/anvira-notes/11-study-quiz-correct.png';
import shotFlashcard from '@/assets/anvira-notes/12-study-flashcard.png';

import '@/pages/anvira-premium.css';

const RELEASES_URL = 'https://github.com/Vansh-synthetica/Anvira-Notes-release/releases/latest';
const REPO = 'Vansh-synthetica/Anvira-Notes-release';

const features = [
  {
    icon: <LayoutTemplate />,
    title: 'Pages that feel Notion-fast',
    body: 'Cover, icon, blocks, sub-pages, tags, backlinks and version history — with Google Docs-style menus and page layout.',
  },
  {
    icon: <Table2 />,
    title: 'Tables, charts, diagrams',
    body: 'Turn a table into a live chart with one click. Whiteboards and spreadsheets sit right next to your writing.',
  },
  {
    icon: <BookOpen />,
    title: 'Grounded in your own sources',
    body: 'Ask AI for summaries, writing help and answers grounded in the PDFs, slides, docs and images you attached.',
  },
  {
    icon: <FileDown />,
    title: '22 templates, plus the web',
    body: 'Included templates for study, work and writing — or pull in the Good Docs Project, Obsidian collections, or any GitHub file.',
  },
  {
    icon: <Trophy />,
    title: 'Study that adapts to you',
    body: 'A learning path built from your own notes: FSRS-based spaced-repetition flashcards, quizzes with explanations, timed exams and grade calculation.',
  },
  {
    icon: <Sparkles />,
    title: 'Study from a file',
    body: 'Drop in a PDF or deck and it becomes lessons. Change the source notes, and the lesson tells you — without losing your progress.',
  },
  {
    icon: <Brain />,
    title: 'Mind maps, from your notes',
    body: 'Turn a notebook into a mind map to see how ideas connect, or ask notebook-grounded chat a question without leaving the page.',
  },
  {
    icon: <Mic />,
    title: 'Record it. Transcribe it. Study it.',
    body: 'Record audio straight into a notebook and get a transcript you can turn into flashcards or a quiz, same as any other source.',
  },
];

const faqs = [
  {
    q: 'Is Anvira Notes free?',
    a: 'Yes. Anvira Notes is free for Windows — notebooks, templates and Study are all included, no paid tier.',
  },
  {
    q: 'Do I need an internet connection to use Study or Notes?',
    a: 'No. Both run on the local Anvira Runtime on your PC. Ask AI, summaries and Study generation all work fully offline.',
  },
  {
    q: 'Can it make flashcards and quizzes from my own notes?',
    a: 'Yes — turn any notebook into a learning path, or drop in a PDF or slide deck with "Study from a file" and it becomes lessons, flashcards and quizzes automatically.',
  },
  {
    q: 'What happens if I edit the notes a lesson was built from?',
    a: 'The lesson tells you its source notes changed and offers to update — without losing your streak or progress.',
  },
  {
    q: 'Do I need an account?',
    a: 'No. An account is optional and only adds sync. Notes and Study both work fully without signing in.',
  },
  {
    q: 'What spaced-repetition system do the flashcards use?',
    a: 'FSRS — the same free-spaced-repetition scheduler used by modern flashcard tools — decides when each card comes back, and you can export your decks to Anki at any time.',
  },
];

const changelog = {
  notes: [
    'Notion-style pages with cover, icon, blocks, sub-pages, tags, backlinks and version history.',
    '22 included templates, a web library, and your own.',
    'Find and replace, outline, quick switcher, whiteboard, spreadsheet, charts, diagrams and mind maps.',
    'Grammar checking and AI writing assistance, grounded in your attached sources.',
    'Audio recording and transcription straight into a notebook.',
    'Export to PDF, Markdown, HTML, CSV and text — covers, icons, charts and callouts included.',
  ],
  study: [
    'A learning path of lessons made from your own notes and files.',
    'FSRS-based spaced-repetition flashcards, quizzes with explanations, timed exams.',
    'Grade calculation and Anki export for existing decks.',
    'Daily goal, streak, XP, achievements, weak spots, and a plan for exam day.',
    'AI & Models in Settings, with the same Hugging Face model library as Anvira.',
  ],
};

const NotesHero = () => (
  <section className="av-hero" id="top">
    <div className="av-shell">
      <div className="av-hero__head">
        <Reveal>
          <span className="av-eyebrow">
            <img src={iconAnviraNotes} alt="" />
            Anvira Notes <strong>1.0.0</strong> · by LocalHouseLLM
          </span>
        </Reveal>
        <motion.h1
          className="av-hero__title"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          Write it once. <span className="av-accent-text">Learn it for good.</span>
        </motion.h1>
        <motion.p
          className="av-hero__sub"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.12 }}
        >
          Write in notebooks that stay organized on their own, then turn what you wrote into a
          learning path — flashcards, quizzes and exams — powered by Anvira Runtime running fully
          on your PC.
        </motion.p>
        <motion.div
          className="av-hero__actions"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className="av-actions">
            <DownloadButton repo={REPO} label="Download for Windows" />
            <a href="#notes" className="av-btn av-btn--ghost">
              See how it works <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <p className="av-hero__note">Free · one-click install · per-user, no admin rights · notebooks stay on your PC</p>
        </motion.div>
      </div>

      <motion.div
        className="av-frame-stage"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
      >
        <Frame src={shotEditor} alt="Anvira Notes editor open on a Biology 101 page, with sources and tags" drift />
      </motion.div>
    </div>
  </section>
);

const ProofStrip = () => (
  <div className="av-shell">
    <Reveal className="av-strip">
      {[
        'Notion-style pages & backlinks',
        '22 templates + a web library',
        'Study from a file',
        'FSRS spaced repetition',
        'Mind maps & audio transcription',
        'Grounded, source-aware AI',
      ].map((item) => (
        <span className="av-strip__pill" key={item}>
          <span className="dot" /> {item}
        </span>
      ))}
    </Reveal>
  </div>
);

const FeatureGrid = () => (
  <section className="av-section av-section--tight" id="notes">
    <div className="av-shell">
      <SectionHead eyebrow="Everything, in one app" title="Your knowledge, connected to your intelligence." center>
        Notes and Study don&apos;t live in separate apps here. They share the same notebooks, the
        same sources, and the same local models.
      </SectionHead>
      <div className="av-grid">
        {features.map((f, i) => (
          <FeatureCard icon={f.icon} title={f.title} key={f.title} delay={(i % 3) * 0.06}>
            {f.body}
          </FeatureCard>
        ))}
      </div>
    </div>
  </section>
);

const TableChartSection = () => (
  <section className="av-section">
    <div className="av-shell">
      <ShowcaseRow
        eyebrow="Notes"
        title="A table becomes a chart. In one click."
        description={
          'Rich blocks sit inline with your writing — tables, callouts, headings, checklists — and a ' +
          'table can turn straight into a live chart without leaving the page.'
        }
        points={[
          'Tables, callouts, headings and checklists as native blocks',
          'Charts and diagrams generated straight from your table data',
          'Everything stays editable, right where you wrote it',
        ]}
        image={shotTableChart}
        alt="Anvira Notes page with a data table and a bar chart generated from it"
      />
    </div>
  </section>
);

const TemplatesSection = () => (
  <section className="av-section">
    <div className="av-shell">
      <ShowcaseRow
        eyebrow="Templates"
        title="22 templates included. Thousands more, one search away."
        description={
          'Start a page from a template built for exactly what you’re doing — lecture notes, a lab ' +
          'report, exam revision — or pull one in from the Good Docs Project, Obsidian, or any GitHub repo.'
        }
        points={[
          '22 templates included, organized by Study, Work, Personal and Writing',
          'A web library: Good Docs Project, Obsidian collections, READMEs, decision records',
          'Add your own templates, or any file or repository link',
        ]}
        image={shotTemplates}
        alt="Anvira Notes template gallery, showing included templates and a from-the-web library"
        reverse
      />
    </div>
  </section>
);

const WorkspaceSection = () => (
  <section className="av-section">
    <div className="av-shell">
      <ShowcaseRow
        eyebrow="The workspace"
        title="Everything one keystroke away, nothing in the way."
        description={
          'A page’s "more" menu keeps export, history and page actions close at hand. A thin side rail ' +
          'stays out of the way until you reach for it — then it grows, notebooks and all.'
        }
        points={[
          'Export to PDF, Markdown, HTML or text — covers and charts included',
          'Version history and page actions from one menu',
          'A hover side rail that expands only when you need it',
        ]}
        image={shotMoreMenu}
        alt="Anvira Notes page-actions menu with export, version history and page options"
      />
    </div>
  </section>
);

const SideRailSection = () => (
  <section className="av-section">
    <div className="av-shell">
      <ShowcaseRow
        eyebrow="Navigation"
        title="A side bar that gets out of the way."
        description={
          'Notes and Study sit behind a thin rail on the far left. Point at it and it grows into full ' +
          'navigation — notebooks, Study, your account — then shrinks back the moment you look away.'
        }
        points={[
          'Collapses to a sliver so your page gets the full width',
          'Expands on hover with notebooks, Study and settings',
          'Keyboard shortcuts (Ctrl 1 / Ctrl 2) jump straight to Notes or Study',
        ]}
        image={shotSideRail}
        alt="Anvira Notes hover side rail expanded over Notes and Study navigation"
        reverse
      />
    </div>
  </section>
);

const AccountModelSection = () => (
  <section className="av-section">
    <div className="av-shell">
      <ShowcaseRow
        eyebrow="Optional account & models"
        title="Sign in if you want to. Everything works if you don't."
        description={
          'Notes and Study work fully without an account — your notebooks stay on your PC. Sign in from ' +
          'the sidebar only for sync, and pick from the same Hugging Face model library that powers Anvira.'
        }
        points={[
          'Optional account, from the sidebar or Settings',
          'The same Hugging Face model library as Anvira — filters, fit badges, downloads',
          'Anvira Runtime updates itself in place, models and settings kept',
        ]}
        image={shotSignIn}
        alt="Anvira Notes optional sign-in screen"
        reverse
      />
    </div>
  </section>
);

const StudySection = () => (
  <section className="av-section" id="study">
    <div className="av-shell">
      <SectionHead eyebrow="Study" title="A notebook becomes a learning path." center>
        Lessons, flashcards, quizzes and exams — generated from what you already wrote, with a daily
        goal, a streak, and a weak-spot review that keeps adjusting.
      </SectionHead>
      <div className="av-study-grid">
        {[
          { src: shotStudyPath, alt: 'Study path for Calculus II with streak and XP', caption: 'Learning path' },
          { src: shotLessonCard, alt: 'Study lesson card open for u-substitution practice', caption: 'Lesson card' },
          { src: shotQuizQuestion, alt: 'Study quiz question about cell biology', caption: 'Quiz' },
          { src: shotQuizCorrect, alt: 'Study quiz correct answer feedback', caption: 'Instant feedback' },
          { src: shotFlashcard, alt: 'Study flashcard with a spaced-repetition rating row', caption: 'Flashcards' },
        ].map((item, i) => (
          <Reveal key={item.caption} delay={i * 0.05}>
            <figure>
              <Frame src={item.src} alt={item.alt} float={false} />
              <figcaption>{item.caption}</figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

const ModelLibrarySection = () => (
  <section className="av-section">
    <div className="av-shell">
      <ShowcaseRow
        eyebrow="AI & Models"
        title="One model library, shared with Anvira."
        description={
          'The same Hugging Face model library — filters, fit badges for your hardware, and one-click ' +
          'downloads — sits inside Settings, so Notes and Study run on whatever model suits your machine.'
        }
        points={[
          'Filter by GPU, CPU, Light, Heavy or Large before you download anything',
          'A clear "Too large" flag when a model won’t fit your hardware',
          'Runs through the same local Anvira Runtime as Anvira, entirely on your PC',
        ]}
        image={shotModelLibrary}
        alt="Anvira Notes model library with Hugging Face models and fit badges"
      />
    </div>
  </section>
);

const ChangelogSection = () => (
  <section className="av-section av-section--tight">
    <div className="av-shell">
      <SectionHead eyebrow="Anvira Notes 1.0.0" title="What's inside this first release.">
        Full notes and checksums ship with every GitHub release.
      </SectionHead>
      <Reveal className="av-changelog">
        <div className="av-changelog__col">
          <h4>Notes</h4>
          <ul>
            {changelog.notes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="av-changelog__col">
          <h4>Study</h4>
          <ul>
            {changelog.study.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </Reveal>
    </div>
  </section>
);

const FaqSection = () => (
  <section className="av-section av-section--tight" id="faq">
    <div className="av-shell">
      <SectionHead eyebrow="FAQ" title="Questions people actually ask." center>
        Short answers, no sales pitch.
      </SectionHead>
      <Faq items={faqs} />
    </div>
  </section>
);

const CrossLinkSection = () => (
  <section className="av-section av-section--tight">
    <div className="av-shell">
      <Reveal className="av-crosslink">
        <div className="av-crosslink__body">
          <img src={iconAnvira} alt="" className="av-crosslink__icon" />
          <div>
            <h4>Also from LocalHouseLLM: Anvira</h4>
            <p>A local-first chat and coding agent, running on the same Anvira Runtime.</p>
          </div>
        </div>
        <Link to="/anvira" className="av-btn av-btn--ghost av-btn--sm">
          Explore Anvira <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </Reveal>
    </div>
  </section>
);

const NotesFinal = () => (
  <section className="av-final">
    <div className="av-shell">
      <Reveal>
        <span className="av-eyebrow" style={{ marginBottom: 24 }}>
          <Flame className="h-3.5 w-3.5" /> Free, local-first, yours
        </span>
        <h2>
          Meet <span className="av-accent-text">Anvira Notes.</span>
        </h2>
        <p>Notebooks that organize themselves. Study that adapts as you learn.</p>
        <div className="av-actions">
          <DownloadButton repo={REPO} label="Download Anvira Notes" />
          <a href="#top" className="av-btn av-btn--ghost">
            Back to top
          </a>
        </div>
        <Link to="/" className="av-final__back">
          ← Back to LocalHouseLLM
        </Link>
      </Reveal>
    </div>
  </section>
);

const AnviraNotes = () => {
  return (
    <CleanLayout>
      <SEO
        title="Anvira Notes — Free AI Notes & Study App With Flashcards"
        description="Anvira Notes is a free, local-first notes app with Notion-style pages, 22 templates and an adaptive Study mode — flashcards, quizzes and exams generated from your own notes, offline."
        keywords="Anvira Notes, AI notes app, study app, flashcards app, FSRS spaced repetition, Anki export, mind maps, local AI notes, offline notes app, Notion alternative, AI study tool, LocalHouseLLM"
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
              softwareVersion: '1.0.0',
              description:
                'Anvira Notes combines Notion-style notebooks with an adaptive Study mode — flashcards, quizzes and exams generated from your own notes and files, running fully on-device.',
              featureList: [
                'Notion-style pages with blocks, backlinks and version history',
                '22 included templates plus a web template library',
                'Tables that turn into live charts, diagrams and mind maps',
                'Audio recording and transcription',
                'Export to PDF, Markdown, HTML, CSV and text',
                'FSRS spaced-repetition flashcards with Anki export',
                'Study path with quizzes, timed exams and grade calculation',
                'Study from a file — PDFs and slides become lessons',
                'Shared Hugging Face model library and Anvira Runtime',
              ],
              url: 'https://localhousellm.com/anvira-notes',
              downloadUrl: RELEASES_URL,
              publisher: { '@type': 'Organization', name: 'LocalHouseLLM', url: 'https://localhousellm.com' },
              offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
            },
            {
              '@type': 'FAQPage',
              '@id': 'https://localhousellm.com/anvira-notes#faq',
              mainEntity: faqs.map((f) => ({
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

      <div className="av av--violet">
        <div className="av-glow" aria-hidden="true" />
        <div className="av-noise" aria-hidden="true" />
        <NotesHero />
        <ProofStrip />
        <FeatureGrid />
        <TableChartSection />
        <TemplatesSection />
        <WorkspaceSection />
        <SideRailSection />
        <AccountModelSection />
        <StudySection />
        <ModelLibrarySection />
        <ChangelogSection />
        <FaqSection />
        <CrossLinkSection />
        <NotesFinal />
      </div>
    </CleanLayout>
  );
};

export default AnviraNotes;
