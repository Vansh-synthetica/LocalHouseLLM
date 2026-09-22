import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Bot,
  CalendarClock,
  CheckCircle2,
  Cpu,
  FolderGit2,
  GitBranch,
  MessageSquare,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Terminal,
} from 'lucide-react';

import CleanLayout from '@/components/CleanLayout';
import SEO from '@/components/SEO';
import { Reveal, SectionHead, ShowcaseRow, FeatureCard, Frame, Faq, DownloadButton } from '@/components/anvira/AvKit';

import iconAnvira from '@/assets/anvira/icon-anvira.png';
import iconAnviraNotes from '@/assets/anvira-notes/icon-anvira-notes.png';
import shotConversation from '@/assets/anvira/01-conversation-and-agent-run.png';
import shotChanges from '@/assets/anvira/02-changes-diff-and-undo.png';
import shotHome from '@/assets/anvira/03-home.png';
import shotModels from '@/assets/anvira/04-settings-models.png';

import '@/pages/anvira-premium.css';

const RELEASES_URL = 'https://github.com/Vansh-synthetica/Anvira-release/releases/latest';
const REPO = 'Vansh-synthetica/Anvira-release';

const features = [
  {
    icon: <MessageSquare />,
    title: 'Chat, or hand it the keys',
    body: 'One composer, two modes. Ask a question in Chat, or flip to Agent and let Anvira read your project, plan the work, and make the changes itself.',
  },
  {
    icon: <FolderGit2 />,
    title: 'Projects that stay in context',
    body: 'Conversations live inside a project folder. Anvira already knows what demo-project is before you type a word.',
  },
  {
    icon: <GitBranch />,
    title: 'Every change, reviewable',
    body: 'Agent runs land in a Changes panel with a real diff — added, edited, and removed lines per file. Undo one file or undo all of it.',
  },
  {
    icon: <Cpu />,
    title: 'Your GPU, doing the work',
    body: 'Anvira Runtime runs GGUF models through llama.cpp with hardware-aware, GPU-accelerated inference — detected automatically.',
  },
  {
    icon: <RefreshCw />,
    title: 'Updates by themselves',
    body: 'A small button appears when a new Anvira — or a new Runtime — is ready. Nothing downloads or restarts until you click it.',
  },
  {
    icon: <ShieldCheck />,
    title: 'Optional account, real privacy',
    body: 'Sign in for sync if you want it. Everything already works without one — your chats and files stay on your PC either way.',
  },
  {
    icon: <CalendarClock />,
    title: 'Scheduled tasks, rules and skills',
    body: 'Give Anvira a rule to follow or a skill to reuse, or schedule a task to run on its own — the agent keeps working inside the permissions you set.',
  },
];

const faqs = [
  {
    q: 'Is Anvira free to download?',
    a: 'Yes. Anvira is free for Windows — no license key, no paid tier. Download the installer straight from GitHub releases.',
  },
  {
    q: 'Does Anvira work fully offline?',
    a: 'Yes. Anvira Runtime runs local GGUF models on your own GPU or CPU via llama.cpp, so Chat and Agent both work with no internet connection. Connecting a cloud provider is optional.',
  },
  {
    q: 'What models can Anvira run?',
    a: 'Any local GGUF model — the built-in Hugging Face model library shows fit badges for your hardware, and you can also bring your own cloud provider (OpenAI-compatible, Anthropic, etc.).',
  },
  {
    q: 'Can I undo what the Agent changes?',
    a: 'Every agent run opens a Changes panel with a real per-file diff. You can undo a single file or Undo all to roll the whole run back — nothing is applied silently.',
  },
  {
    q: 'Do I need an account to use Anvira?',
    a: 'No. An account is optional and only adds sync. Your chats, files and projects stay on your PC either way.',
  },
  {
    q: 'How small a model can I actually use?',
    a: 'It depends on the task. In our own workflow testing, a 7B model passed all 21 checks we test agent behavior against. 3B models handle a good amount of real work but aren’t reliable for everything yet, and 1.5B models are currently best suited to grounded Notes and Study tasks. We’d rather tell you that than oversell it.',
  },
];

const changelog = {
  added: [
    'Updates by themselves — Anvira and Anvira Runtime both offer new versions from a small top-right button.',
    'Optional account — sign in from the sidebar or Settings → Account, with no change to how local-first storage works.',
    'Settings → About → Check for updates, now accurate.',
  ],
  fixed: [
    'The window always fits your screen and remembers where you left it.',
    'A dropped connection to the AI engine now explains what happened, instead of a bare "terminated".',
    'Memory recall across chats works correctly.',
    'Very long messages fold behind "Show more" instead of taking over the screen.',
  ],
};

const AnviraHero = () => (
  <section className="av-hero" id="top">
    <div className="av-shell">
      <div className="av-hero__head">
        <Reveal>
          <span className="av-eyebrow">
            <img src={iconAnvira} alt="" />
            Anvira <strong>1.0.1</strong> · by LocalHouseLLM
          </span>
        </Reveal>
        <motion.h1
          className="av-hero__title"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          Small models. <span className="av-accent-text">Serious workflows.</span>
        </motion.h1>
        <motion.p
          className="av-hero__sub"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.12 }}
        >
          Anvira is a local-first AI chat and coding agent that runs entirely on your own GPU. Ask
          it something, or point it at a project and let it plan, write, and verify the work —
          every change landing in a diff you can undo.
        </motion.p>
        <motion.div
          className="av-hero__actions"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className="av-actions">
            <DownloadButton repo={REPO} label="Download for Windows" />
            <a href="#agent" className="av-btn av-btn--ghost">
              See it work <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <p className="av-hero__note">Free · one-click install · per-user, no admin rights · runs fully offline</p>
        </motion.div>
      </div>

      <motion.div
        className="av-frame-stage"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
      >
        <Frame src={shotHome} alt="Anvira home screen with a project, model picker, and Chat/Agent switch" drift />
      </motion.div>
    </div>
  </section>
);

const ProofStrip = () => (
  <div className="av-shell">
    <Reveal className="av-strip">
      {[
        'Local GGUF models via llama.cpp',
        'GPU-accelerated inference',
        'Bring your own cloud provider',
        'Chat and Agent in one composer',
        'Per-file undo on every run',
      ].map((item) => (
        <span className="av-strip__pill" key={item}>
          <span className="dot" /> {item}
        </span>
      ))}
    </Reveal>
  </div>
);

const FeatureGrid = () => (
  <section className="av-section av-section--tight" id="features">
    <div className="av-shell">
      <SectionHead eyebrow="Everything, in one workspace" title="Built for the loop you're already in." center>
        Ask a question, hand off a task, review what changed. Anvira is designed around that loop —
        not a chat window bolted onto a file tree.
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

const TestedSection = () => (
  <section className="av-section av-section--tight" id="tested">
    <div className="av-shell">
      <SectionHead
        eyebrow="Tested with real models"
        title="Small models, honestly rated — not oversold."
        center
      >
        We run every release against a fixed set of agent workflow checks — grounded Notes answers,
        Study sharing, real file edits — on real local models, not mocked responses.
      </SectionHead>
      <div className="av-stats">
        <Reveal className="av-stat">
          <div className="av-stat__number">21/21</div>
          <div className="av-stat__label">Workflow checks passed</div>
          <p className="av-stat__note">A 7B model completes every check in our current agent test suite.</p>
        </Reveal>
        <Reveal className="av-stat" delay={0.06}>
          <div className="av-stat__number">3B</div>
          <div className="av-stat__label">Capable, not yet reliable everywhere</div>
          <p className="av-stat__note">Handles real work, but not consistently across every workflow yet.</p>
        </Reveal>
        <Reveal className="av-stat" delay={0.12}>
          <div className="av-stat__number">1.5B</div>
          <div className="av-stat__label">Best for grounded Notes & Study</div>
          <p className="av-stat__note">Small enough to run anywhere, tuned for the tasks it's actually good at.</p>
        </Reveal>
      </div>
    </div>
  </section>
);

const RuntimeSection = () => (
  <section className="av-section" id="runtime">
    <div className="av-shell">
      <SectionHead eyebrow="Anvira Runtime" title="One local foundation, not another isolated AI app.">
        Anvira doesn&apos;t embed its own AI stack in isolation. It connects to Anvira Runtime — a
        per-user background service that manages models, memory, permissions and agent execution,
        so the same foundation can serve more than one application.
      </SectionHead>
      <div className="av-grid">
        <FeatureCard icon={<Terminal />} title="A local API, CLI and SDKs">
          A local authenticated API with a CLI and terminal dashboard, plus Python and TypeScript
          SDKs for building on the same runtime.
        </FeatureCard>
        <FeatureCard icon={<CheckCircle2 />} title="Orchestration built for small models" delay={0.06}>
          ORCHA, the agent execution layer underneath, recovers malformed tool calls, detects
          unfinished work and verifies changes — so the surrounding system compensates for what a
          smaller model misses.
        </FeatureCard>
        <FeatureCard icon={<ShieldCheck />} title="Memory, permissioned by default" delay={0.12}>
          Nomi, the memory layer, keeps memory private to each application unless you grant
          access — nothing is shared by default.
        </FeatureCard>
      </div>
    </div>
  </section>
);

const AgentSection = () => (
  <section className="av-section" id="agent">
    <div className="av-shell">
      <ShowcaseRow
        eyebrow="Chat & Agent"
        title="Don't just ask. Let it finish the job."
        description={
          'Switch to Agent and Anvira reads the project folder, works through the task step by step, ' +
          'and reports back with exactly what changed — no black box in between.'
        }
        points={[
          'Live step log: reads files, writes files, verifies it runs',
          'Model picker per project — qwen2.5-coder and others, swappable',
          'A finished run always ends with a plain-language summary',
        ]}
        image={shotConversation}
        alt="Anvira agent building a Snake game, with a live step-by-step log and a finished summary"
      />
    </div>
  </section>
);

const ChangesSection = () => (
  <section className="av-section" id="changes">
    <div className="av-shell">
      <ShowcaseRow
        eyebrow="Changes"
        title="Every edit, shown as a real diff."
        description={
          'The Changes panel opens next to the thread the moment Anvira touches your project — added ' +
          'and removed lines, per file, with nothing hidden.'
        }
        points={[
          'Per-file diffs with line-level additions and deletions',
          'Undo a single file, or Undo all to roll back the whole run',
          'Review before you trust it — not after',
        ]}
        image={shotChanges}
        alt="Anvira Changes panel showing a line-level diff across three files, with Undo controls"
        reverse
      />
    </div>
  </section>
);

const ModelsSection = () => (
  <section className="av-section" id="models">
    <div className="av-shell">
      <ShowcaseRow
        eyebrow="The model layer"
        title="Intelligence underneath. Invisible until you need it."
        description={
          'Anvira Runtime runs local GGUF models through llama.cpp, detects your GPU automatically, and ' +
          'keeps your models on your disk. Swap models, or bring your own cloud provider — the workspace ' +
          'above stays exactly the same.'
        }
        points={[
          'Runtime and hardware shown plainly in Settings → Models',
          'Hugging Face model library built in, with filters and fit badges',
          'Runtime updates in place — your models and settings are kept',
        ]}
        image={shotModels}
        alt="Anvira Settings screen showing the running Anvira Runtime, detected GPU, and installed models"
      />
    </div>
  </section>
);

const ChangelogSection = () => (
  <section className="av-section av-section--tight" id="changelog">
    <div className="av-shell">
      <SectionHead eyebrow="Anvira 1.0.1" title="What's new in this release.">
        The short version — full notes and checksums ship with every GitHub release.
      </SectionHead>
      <Reveal className="av-changelog">
        <div className="av-changelog__col">
          <h4>New</h4>
          <ul>
            {changelog.added.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="av-changelog__col">
          <h4>Fixed</h4>
          <ul>
            {changelog.fixed.map((item) => (
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
          <img src={iconAnviraNotes} alt="" className="av-crosslink__icon" />
          <div>
            <h4>Also from LocalHouseLLM: Anvira Notes</h4>
            <p>Notes and Study in one app, powered by the same local Anvira Runtime.</p>
          </div>
        </div>
        <Link to="/anvira-notes" className="av-btn av-btn--ghost av-btn--sm">
          Explore Anvira Notes <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </Reveal>
    </div>
  </section>
);

const AnviraFinal = () => (
  <section className="av-final">
    <div className="av-shell">
      <Reveal>
        <span className="av-eyebrow" style={{ marginBottom: 24 }}>
          <Sparkles className="h-3.5 w-3.5" /> Free, local-first, yours
        </span>
        <h2>
          Meet <span className="av-accent-text">Anvira.</span>
        </h2>
        <p>One composer. Chat or Agent. Every change reviewable, every model local.</p>
        <div className="av-actions">
          <DownloadButton repo={REPO} label="Download Anvira" />
          <a href="#top" className="av-btn av-btn--ghost">
            <Bot className="h-4 w-4" /> Back to top
          </a>
        </div>
        <Link to="/" className="av-final__back">
          ← Back to LocalHouseLLM
        </Link>
      </Reveal>
    </div>
  </section>
);

const Anvira = () => {
  return (
    <CleanLayout>
      <SEO
        title="Anvira — Free Local AI Coding Agent & Chat App for Windows"
        description="Anvira is a free, local-first AI chat and coding agent for Windows. Runs local GGUF models on your GPU via llama.cpp — every agent change lands in a reviewable diff you can undo."
        keywords="Anvira, Anvira AI, Anvira Runtime, local AI agent, local coding assistant, offline AI coding agent, AI agent for Windows, local-first AI, GGUF models, llama.cpp, local LLM app, AI pair programmer, local AI infrastructure, ORCHA agent orchestration, Python SDK, TypeScript SDK, LocalHouseLLM"
        canonical="https://localhousellm.com/anvira"
        schema={{
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'SoftwareApplication',
              '@id': 'https://localhousellm.com/anvira#app',
              name: 'Anvira',
              alternateName: 'Anvira AI Agent',
              applicationCategory: 'DeveloperApplication',
              operatingSystem: 'Windows',
              softwareVersion: '1.0.1',
              description:
                'Anvira is a free, local-first chat and coding agent that runs local GGUF models via llama.cpp with GPU acceleration, with a reviewable diff and undo for every agent-made change.',
              featureList: [
                'Chat and Agent modes in one composer',
                'Project-aware conversations',
                'Per-file diff review with undo',
                'Local GGUF models via llama.cpp with GPU acceleration',
                'Built-in Hugging Face model library',
                'Optional cloud provider support',
                'Self-updating app and runtime',
                'Scheduled tasks, rules and skills',
                'Persistent, permissioned memory (Nomi)',
                'Local API, CLI and Python/TypeScript SDKs (Anvira Runtime)',
              ],
              url: 'https://localhousellm.com/anvira',
              downloadUrl: RELEASES_URL,
              publisher: { '@type': 'Organization', name: 'LocalHouseLLM', url: 'https://localhousellm.com' },
              offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
            },
            {
              '@type': 'FAQPage',
              '@id': 'https://localhousellm.com/anvira#faq',
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
                { '@type': 'ListItem', position: 2, name: 'Anvira', item: 'https://localhousellm.com/anvira' },
              ],
            },
          ],
        }}
      />

      <div className="av av--blue">
        <div className="av-glow" aria-hidden="true" />
        <div className="av-noise" aria-hidden="true" />
        <AnviraHero />
        <ProofStrip />
        <FeatureGrid />
        <TestedSection />
        <AgentSection />
        <ChangesSection />
        <ModelsSection />
        <RuntimeSection />
        <ChangelogSection />
        <FaqSection />
        <CrossLinkSection />
        <AnviraFinal />
      </div>
    </CleanLayout>
  );
};

export default Anvira;
