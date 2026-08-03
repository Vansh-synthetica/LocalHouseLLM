import { useEffect, useState } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Download, Share2, ArrowUpRight, Clock, FileText, Check } from 'lucide-react';
import CleanLayout from '@/components/CleanLayout';
import SEO from '@/components/SEO';
import Breadcrumbs from '@/components/Breadcrumbs';
import { archive, getEntry } from '@/data/archive';
import { toast } from '@/hooks/use-toast';

const PaperReader = () => {
  const { slug = '' } = useParams();
  const entry = getEntry(slug);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setCopied(false);
  }, [slug]);

  if (!entry) return <Navigate to="/archive" replace />;

  const url = `https://localhousellm.com/archive/${entry.slug}`;

  const share = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: entry.title, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast({ title: 'Link copied', description: 'Paper URL copied to your clipboard.' });
    } catch {
      /* user cancelled */
    }
  };

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ScholarlyArticle',
    headline: entry.title,
    abstract: entry.abstract,
    datePublished: entry.date,
    inLanguage: 'en',
    keywords: entry.tags.join(', '),
    about: entry.category,
    url,
    author: { '@type': 'Organization', name: 'LocalHouseLLM' },
    publisher: { '@type': 'Organization', name: 'LocalHouseLLM' },
    isPartOf: { '@type': 'CollectionPage', name: 'LocalHouseLLM Archive', url: 'https://localhousellm.com/archive' },
  };

  const others = archive.filter((e) => e.slug !== entry.slug).slice(0, 3);

  return (
    <CleanLayout>
      <SEO
        title={`${entry.title.length > 62 ? entry.title.slice(0, 59) + '…' : entry.title} | LocalHouseLLM`}
        description={entry.abstract.slice(0, 155)}
        keywords={`${entry.tags.join(', ')}, ${entry.category}, LocalHouseLLM research`}
        canonical={url}
        type="article"
        schema={schema}
      />

      <article className="pb-16">
        <header className="pt-2 pb-10">
          <Breadcrumbs
            items={[
              { name: 'Archive', to: '/archive' },
              { name: entry.reportNumber ? `Report ${entry.reportNumber}` : entry.category },
            ]}
          />
          <div className="max-container max-w-4xl mt-8">
            <Link
              to="/archive"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Archive
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] tracking-[0.16em] uppercase text-muted-foreground">
                <span>{entry.series}</span>
                <span className="text-foreground/30">·</span>
                <span>{entry.year}</span>
                <span className="text-foreground/30">·</span>
                <span>{entry.category}</span>
                {entry.pages && (
                  <>
                    <span className="text-foreground/30">·</span>
                    <span className="inline-flex items-center gap-1 normal-case tracking-normal">
                      <FileText className="w-3 h-3" /> {entry.pages} pages
                    </span>
                  </>
                )}
                {entry.readingMinutes && (
                  <>
                    <span className="text-foreground/30">·</span>
                    <span className="inline-flex items-center gap-1 normal-case tracking-normal">
                      <Clock className="w-3 h-3" /> {entry.readingMinutes} min
                    </span>
                  </>
                )}
              </div>

              <h1 className="mt-4 text-3xl md:text-5xl font-semibold tracking-tight leading-[1.08]">
                {entry.title}
              </h1>
              <p className="mt-6 text-base md:text-lg text-muted-foreground leading-relaxed">
                {entry.abstract}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                {entry.pdfUrl && (
                  <a
                    href={entry.pdfUrl}
                    download
                    className="inline-flex items-center gap-2 rounded-full bg-foreground text-background px-4 py-2 text-sm font-medium hover:opacity-90 transition-opacity"
                  >
                    <Download className="w-4 h-4" /> Download PDF
                  </a>
                )}
                <button
                  onClick={share}
                  className="inline-flex items-center gap-2 rounded-full border border-border/60 px-4 py-2 text-sm hover:bg-foreground/5 hover:border-border transition-colors"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
                  {copied ? 'Link copied' : 'Share'}
                </button>
                {entry.externalUrl && (
                  <a
                    href={entry.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-border/60 px-4 py-2 text-sm hover:bg-foreground/5 hover:border-border transition-colors"
                  >
                    <ArrowUpRight className="w-4 h-4" /> View on {entry.source}
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        </header>

        {/* READER */}
        <div className="max-container">
          {entry.pdfUrl ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="rounded-2xl border border-border/60 bg-card/40 backdrop-blur-sm overflow-hidden"
            >
              <div className="flex items-center justify-between px-4 py-3 border-b border-border/50 text-xs text-muted-foreground">
                <span>Reader · {entry.pages ?? '—'} pages</span>
                <a href={entry.pdfUrl} target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
                  Open full screen
                </a>
              </div>
              <iframe
                src={`${entry.pdfUrl}#view=FitH&navpanes=0`}
                title={`${entry.title} — PDF reader`}
                loading="lazy"
                className="w-full h-[70vh] md:h-[85vh] bg-background"
              />
              <div className="px-4 py-3 border-t border-border/50 text-xs text-muted-foreground">
                PDF not displaying?{' '}
                <a href={entry.pdfUrl} target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground transition-colors">
                  Open the PDF directly
                </a>{' '}
                or download it above.
              </div>
            </motion.div>

          ) : (
            <div className="rounded-2xl border border-border/60 p-8 md:p-12 text-center">
              <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
                This publication is hosted by its publisher. Read the full text at the source
                below — the abstract above summarises the contribution.
              </p>
              {entry.externalUrl && (
                <a
                  href={entry.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-foreground text-background px-5 py-2.5 text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  Read on {entry.source} <ArrowUpRight className="w-4 h-4" />
                </a>
              )}
            </div>
          )}
        </div>

        {/* MORE */}
        <section className="max-container mt-16 pt-12 border-t border-border/40">
          <p className="text-[11px] tracking-[0.25em] uppercase text-muted-foreground mb-6">
            More from the Archive
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            {others.map((e) => (
              <Link
                key={e.slug}
                to={e.pdfUrl ? `/archive/${e.slug}` : '/archive'}
                className="group rounded-2xl border border-border/50 p-6 hover:border-border hover:bg-foreground/[0.03] transition-all"
              >
                <p className="text-[11px] tracking-[0.16em] uppercase text-muted-foreground">
                  {e.category}
                </p>
                <h2 className="mt-2 text-base font-semibold leading-snug group-hover:text-foreground">
                  {e.title}
                </h2>
              </Link>
            ))}
          </div>
        </section>
      </article>
    </CleanLayout>
  );
};

export default PaperReader;
