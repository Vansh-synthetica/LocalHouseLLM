import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, Download, BookOpen, Github, FileText, Clock } from 'lucide-react';
import CleanLayout from '@/components/CleanLayout';
import SEO from '@/components/SEO';
import Breadcrumbs from '@/components/Breadcrumbs';
import { archive, categories, repos, type ArchiveEntry } from '@/data/archive';

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: Math.min(i, 6) * 0.05, duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const Meta = ({ entry }: { entry: ArchiveEntry }) => (
  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] tracking-[0.16em] uppercase text-muted-foreground">
    <span>{entry.year}</span>
    <span className="text-foreground/30">·</span>
    <span>{entry.source}</span>
    <span className="text-foreground/30">·</span>
    <span>{entry.category}</span>
    {entry.readingMinutes && (
      <>
        <span className="text-foreground/30">·</span>
        <span className="inline-flex items-center gap-1 normal-case tracking-normal">
          <Clock className="w-3 h-3" /> {entry.readingMinutes} min read
        </span>
      </>
    )}
  </div>
);

const Actions = ({ entry }: { entry: ArchiveEntry }) => (
  <div className="mt-6 flex flex-wrap items-center gap-3">
    {entry.pdfUrl && (
      <>
        <Link
          to={`/archive/${entry.slug}`}
          className="inline-flex items-center gap-2 rounded-full bg-foreground text-background px-4 py-2 text-sm font-medium hover:opacity-90 transition-opacity"
        >
          <BookOpen className="w-4 h-4" /> Read in browser
        </Link>
        <a
          href={entry.pdfUrl}
          download
          className="inline-flex items-center gap-2 rounded-full border border-border/60 px-4 py-2 text-sm text-foreground/90 hover:bg-foreground/5 hover:border-border transition-colors"
        >
          <Download className="w-4 h-4" /> Download PDF
        </a>
      </>
    )}
    {entry.externalUrl && (
      <a
        href={entry.externalUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-full border border-border/60 px-4 py-2 text-sm text-foreground/90 hover:bg-foreground/5 hover:border-border transition-colors"
      >
        <ArrowUpRight className="w-4 h-4" /> {entry.source === 'SSRN' ? 'Read on SSRN' : 'External source'}
      </a>
    )}
  </div>
);

const PaperCard = ({ entry, i }: { entry: ArchiveEntry; i: number }) => (
  <motion.article
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-60px' }}
    variants={fadeUp}
    custom={i}
    className="group relative rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm p-6 md:p-8 transition-all duration-300 hover:border-border hover:bg-card/60 hover:-translate-y-0.5"
  >
    <Meta entry={entry} />
    <h3 className="mt-3 text-lg md:text-xl font-semibold leading-snug tracking-tight">
      {entry.reportNumber && (
        <span className="text-muted-foreground/70 mr-2 font-normal tabular-nums">
          {entry.reportNumber}
        </span>
      )}
      {entry.title}
    </h3>
    <p className="mt-3 text-sm md:text-base text-muted-foreground leading-relaxed">
      {entry.abstract}
    </p>
    {entry.tags.length > 0 && (
      <ul className="mt-5 flex flex-wrap gap-2">
        {entry.tags.map((t) => (
          <li
            key={t}
            className="rounded-full border border-border/50 px-2.5 py-1 text-[11px] text-muted-foreground"
          >
            {t}
          </li>
        ))}
      </ul>
    )}
    <Actions entry={entry} />
  </motion.article>
);

const Archive = () => {
  const [active, setActive] = useState<string>('All');

  const featured = archive.find((e) => e.featured) ?? archive[0];
  const collection = archive.filter((e) => e.series === 'LocalHouseLLM Research Collection');
  const ssrn = archive.filter((e) => e.series === 'SSRN Publication');

  const filtered = useMemo(
    () => (active === 'All' ? archive : archive.filter((e) => e.category === active)),
    [active],
  );

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Archive — LocalHouseLLM Research',
    url: 'https://localhousellm.com/archive',
    description:
      'The LocalHouseLLM Archive: foundational research, technical reports, whitepapers, and SSRN publications on modular intelligence, decentralized AI, local-first systems, orchestration, reasoning, and efficient inference.',
    hasPart: archive.map((e) => ({
      '@type': 'ScholarlyArticle',
      headline: e.title,
      abstract: e.abstract,
      datePublished: e.date,
      url: e.externalUrl ?? `https://localhousellm.com/archive/${e.slug}`,
      about: e.category,
      publisher: { '@type': 'Organization', name: 'LocalHouseLLM' },
    })),
  };

  return (
    <CleanLayout>
      <SEO
        title="Archive — LocalHouseLLM Research Papers & Technical Reports"
        description="Read LocalHouseLLM research in the browser: papers on modular AI, orchestration runtimes, local-first inference, KV-cache optimization, reasoning, and decentralized intelligence."
        keywords="LocalHouseLLM archive, LocalHouseLLM research papers, modular AI research, local AI inference research, KV cache optimization, AMAI, Shadow AMAI, ADAPT, CoT looping, AICL research"
        canonical="https://localhousellm.com/archive"
        type="article"
        schema={schema}
      />

      {/* HERO */}
      <section className="relative overflow-hidden pt-10 md:pt-20 pb-14 md:pb-20">
        {/* animated ambient element */}
        <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
          <motion.div
            animate={{ opacity: [0.25, 0.45, 0.25], scale: [1, 1.06, 1] }}
            transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-24 left-1/2 -translate-x-1/2 h-[420px] w-[820px] rounded-full bg-primary/10 blur-[120px]"
          />
        </div>
        <div className="max-container max-w-4xl">
          <Breadcrumbs items={[{ name: 'Archive', to: '/archive' }]} />
          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mt-6 text-[11px] tracking-[0.25em] uppercase text-muted-foreground mb-5"
          >
            Research Library
          </motion.p>
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={1}
            className="text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tight leading-[1.02]"
          >
            Archive
          </motion.h1>
          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={2}
            className="mt-7 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl"
          >
            Foundational research, technical reports, whitepapers, and publications exploring
            modular intelligence, decentralized AI, local-first systems, orchestration, reasoning,
            and efficient inference.
          </motion.p>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={3}
            className="mt-10 flex flex-wrap gap-x-10 gap-y-3 text-sm text-muted-foreground"
          >
            <span>{archive.length} publications</span>
            <span>{categories.length} research areas</span>
            <span>Read in browser · no downloads required</span>
          </motion.div>
        </div>
      </section>

      {/* FEATURED */}
      <section className="border-t border-border/40 py-14 md:py-20">
        <div className="max-container">
          <p className="text-[11px] tracking-[0.25em] uppercase text-muted-foreground mb-6">
            Featured research
          </p>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="relative overflow-hidden rounded-3xl border border-border/60 bg-card/40 backdrop-blur-md p-7 md:p-12"
          >
            <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
            <Meta entry={featured} />
            <h2 className="mt-4 text-2xl md:text-4xl font-semibold tracking-tight leading-[1.12] max-w-3xl">
              {featured.title}
            </h2>
            <p className="mt-5 text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl">
              {featured.abstract}
            </p>
            <Actions entry={featured} />
          </motion.div>
        </div>
      </section>

      {/* CATEGORIES + BROWSE */}
      <section className="border-t border-border/40 py-14 md:py-20">
        <div className="max-container">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
            <div>
              <p className="text-[11px] tracking-[0.25em] uppercase text-muted-foreground mb-3">
                Browse by category
              </p>
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
                Research areas
              </h2>
            </div>
            <p className="text-sm text-muted-foreground">
              {filtered.length} {filtered.length === 1 ? 'entry' : 'entries'}
            </p>
          </div>

          <div
            className="flex flex-wrap gap-2 mb-10"
            role="tablist"
            aria-label="Research categories"
          >
            {['All', ...categories].map((c) => (
              <button
                key={c}
                role="tab"
                aria-selected={active === c}
                onClick={() => setActive(c)}
                className={`rounded-full px-4 py-2 text-sm transition-colors border ${
                  active === c
                    ? 'bg-foreground text-background border-transparent'
                    : 'border-border/60 text-muted-foreground hover:text-foreground hover:bg-foreground/5'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {filtered.map((e, i) => (
              <PaperCard key={e.slug} entry={e} i={i} />
            ))}
          </div>
        </div>
      </section>

      {/* RESEARCH COLLECTION */}
      <section id="collection" className="border-t border-border/40 py-14 md:py-20">
        <div className="max-container">
          <p className="text-[11px] tracking-[0.25em] uppercase text-muted-foreground mb-4">
            Series
          </p>
          <h2 className="text-2xl md:text-4xl font-semibold tracking-tight mb-4">
            LocalHouseLLM Research Collection
          </h2>
          <p className="text-muted-foreground max-w-2xl mb-10 leading-relaxed">
            Six technical reports from the Independent AI Systems &amp; Local Inference Research
            Division, published as one continuous series. All readable directly in the browser.
          </p>
          <div className="grid gap-5 md:grid-cols-2">
            {collection.map((e, i) => (
              <PaperCard key={e.slug} entry={e} i={i} />
            ))}
          </div>
        </div>
      </section>

      {/* SSRN */}
      <section id="ssrn" className="border-t border-border/40 py-14 md:py-20">
        <div className="max-container">
          <p className="text-[11px] tracking-[0.25em] uppercase text-muted-foreground mb-4">
            Publications
          </p>
          <h2 className="text-2xl md:text-4xl font-semibold tracking-tight mb-10">
            SSRN publications
          </h2>
          <div className="grid gap-5 md:grid-cols-2">
            {ssrn.map((e, i) => (
              <PaperCard key={e.slug} entry={e} i={i} />
            ))}
          </div>
          <p className="mt-10 text-sm text-muted-foreground flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Peer-facing publications are hosted on SSRN. New work is added as the programme
            advances.
          </p>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="border-t border-border/40 py-14 md:py-20">
        <div className="max-container max-w-4xl">
          <p className="text-[11px] tracking-[0.25em] uppercase text-muted-foreground mb-4">
            Programme
          </p>
          <h2 className="text-2xl md:text-4xl font-semibold tracking-tight mb-10">
            Research timeline
          </h2>
          <ol className="relative border-l border-border/50 pl-8 space-y-10">
            {[
              {
                year: '2026',
                items: [
                  'SSRN publications — AMAI, Shadow AMAI, CoT Looping, ADAPT',
                  'LocalHouseLLM Research Collection — six local-inference reports',
                  'Master Report — consolidated local inference compendium',
                ],
              },
              {
                year: 'Ongoing',
                items: [
                  'Technical reports on orchestration and memory systems',
                  'Whitepapers on decentralized, user-owned intelligence',
                  'Open reference implementations — AICL, Orcha',
                ],
              },
            ].map((row, i) => (
              <motion.li
                key={row.year}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
              >
                <span className="absolute -left-[7px] mt-2 h-3 w-3 rounded-full bg-foreground/70 ring-4 ring-background" />
                <p className="text-[11px] tracking-[0.22em] uppercase text-muted-foreground">
                  {row.year}
                </p>
                <ul className="mt-3 space-y-2">
                  {row.items.map((it) => (
                    <li key={it} className="text-base md:text-lg text-foreground/90">
                      {it}
                    </li>
                  ))}
                </ul>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* CODE */}
      <section className="border-t border-border/40 py-14 md:py-20">
        <div className="max-container max-w-4xl">
          <p className="text-[11px] tracking-[0.25em] uppercase text-muted-foreground mb-4">
            Code
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-8">
            Open implementations
          </h2>
          <div className="space-y-5">
            {repos.map((repo, i) => (
              <motion.a
                key={repo.url}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
                className="group flex items-start justify-between gap-4 rounded-2xl border border-border/50 p-6 md:p-8 hover:border-border hover:bg-foreground/[0.03] transition-all"
              >
                <div>
                  <h3 className="text-lg md:text-xl font-semibold">{repo.name}</h3>
                  <p className="mt-2 text-muted-foreground leading-relaxed max-w-2xl">
                    {repo.desc}
                  </p>
                </div>
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-border/50 group-hover:border-border group-hover:bg-foreground/5 transition-all shrink-0">
                  <Github className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                </span>
              </motion.a>
            ))}
          </div>
        </div>
      </section>
    </CleanLayout>
  );
};

export default Archive;
