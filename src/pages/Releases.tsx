import { Link, useParams } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Cpu, Download, Rss } from 'lucide-react';

import CleanLayout from '@/components/CleanLayout';
import SEO from '@/components/SEO';
import NotFound from '@/pages/NotFound';
import { CopyValue } from '@/components/anvira/AvKit';
import data from '@/data/releases.json';
import {
  type Product,
  type ProductId,
  type Release,
  formatReleaseDate,
  formatSize,
  releaseAnchor,
} from '@/data/releases';

import iconAnvira from '@/assets/anvira/icon-anvira.png';
import iconAnviraNotes from '@/assets/anvira-notes/icon-anvira-notes.png';
import './releases.css';

const SITE = 'https://localhousellm.com';
const products = data.products as Product<Release>[];

const META: Record<ProductId, { blurb: string; title: string; description: string; icon?: string }> = {
  'anvira-notes': {
    icon: iconAnviraNotes,
    blurb: 'The free notes and study app: Notion-style pages, flashcards, mock exams, grades and study groups.',
    title: 'Anvira Notes Release Notes — Every Version & Changelog',
    description:
      'What changed in every Anvira Notes release, newest first: new features, fixes, download sizes and SHA-256 checksums for the free AI notes and study app for Windows.',
  },
  anvira: {
    icon: iconAnvira,
    blurb: 'The local-first AI chat and coding agent workspace for Windows.',
    title: 'Anvira Release Notes — Every Version & Changelog',
    description:
      'What changed in every Anvira release, newest first: new features, fixes, installer sizes and SHA-256 checksums for the free local AI coding agent for Windows.',
  },
  'anvira-runtime': {
    blurb: 'The shared local AI service under both apps: models, ORCHA agent execution, Nomi memory, API and SDKs.',
    title: 'Anvira Runtime Release Notes — Every Version & Changelog',
    description:
      'What changed in every Anvira Runtime release: the local AI engine behind Anvira and Anvira Notes, with llama.cpp, ORCHA, Nomi, a local API and SDKs.',
  },
};

type Entry = { product: Product<Release>; release: Release };

const ProductIcon = ({ id, size = 22 }: { id: ProductId; size?: number }) =>
  META[id].icon ? (
    <img src={META[id].icon} alt="" width={size} height={size} className="rl-icon" />
  ) : (
    <span className="rl-icon rl-icon--runtime" style={{ width: size, height: size }}>
      <Cpu />
    </span>
  );

const ReleaseEntry = ({ product, release, showProduct }: Entry & { showProduct: boolean }) => {
  const anchor = releaseAnchor(product.id, release.version);
  return (
    <li className="rl-entry" id={anchor}>
      <div className="rl-entry__aside">
        <time dateTime={release.date}>{formatReleaseDate(release.date)}</time>
        <a href={`#${anchor}`} className="rl-entry__ver" aria-label={`Link to ${release.name}`}>
          v{release.version}
        </a>
      </div>
      <article className="rl-entry__main">
        <header className="rl-entry__head">
          {showProduct && (
            <Link to={`/releases/${product.id}`} className="rl-chip">
              <ProductIcon id={product.id} size={16} />
              {product.name}
            </Link>
          )}
          <h2>
            {release.name}
            {release.latest && <span className="rl-latest">Latest</span>}
          </h2>
        </header>

        {release.notes.length ? (
          release.notes.map((section, i) => (
            <section key={section.title || i} className="rl-notes">
              {section.title && <h3>{section.title}</h3>}
              <div dangerouslySetInnerHTML={{ __html: section.html }} />
            </section>
          ))
        ) : (
          <p className="rl-empty">No written notes for this build.</p>
        )}

        <footer className="rl-dl">
          {release.installer && (
            <a href={release.installer.url} className="rl-dl__file" rel="nofollow">
              <Download />
              <span>
                <b>{release.installer.name}</b>
                <small>{formatSize(release.installer.size)}</small>
              </span>
            </a>
          )}
          {release.installer?.sha256 && (
            <div className="rl-dl__sha">
              <span>SHA-256</span>
              <code>{release.installer.sha256}</code>
              <CopyValue value={release.installer.sha256} className="rl-copy" />
            </div>
          )}
          <a href={release.url} target="_blank" rel="noopener noreferrer" className="rl-dl__gh">
            GitHub <ArrowUpRight />
          </a>
        </footer>
      </article>
    </li>
  );
};

const Releases = () => {
  const { product: productParam } = useParams();
  const current = productParam ? products.find((p) => p.id === productParam) : undefined;
  if (productParam && !current) return <NotFound />;

  const scope = current ? [current] : products;
  const entries: Entry[] = scope
    .flatMap((product) => product.releases.map((release) => ({ product, release })))
    .sort((a, b) => b.release.date.localeCompare(a.release.date));
  const newest = entries[0]?.release;
  const path = current ? `/releases/${current.id}` : '/releases';
  const url = `${SITE}${path}`;

  const title = current ? META[current.id].title : 'Release Notes — Anvira, Anvira Notes & Anvira Runtime';
  const description = current
    ? META[current.id].description
    : 'Every release of Anvira, Anvira Notes and Anvira Runtime in one changelog, newest first: what changed, download sizes and SHA-256 checksums.';

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${url}#page`,
        url,
        name: title,
        description,
        inLanguage: 'en',
        isPartOf: { '@id': `${SITE}/#website` },
        publisher: { '@id': `${SITE}/#organization` },
        ...(newest && { dateModified: newest.date }),
        ...(current && current.id !== 'anvira-runtime' && { about: { '@id': `${SITE}${current.page}#app` } }),
        mainEntity: {
          '@type': 'ItemList',
          itemListOrder: 'https://schema.org/ItemListOrderDescending',
          numberOfItems: entries.length,
          itemListElement: entries.slice(0, 30).map(({ product, release }, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            url: `${url}#${releaseAnchor(product.id, release.version)}`,
            name: `${release.name} release notes`,
          })),
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'LocalHouseLLM', item: `${SITE}/` },
          { '@type': 'ListItem', position: 2, name: 'Release notes', item: `${SITE}/releases` },
          ...(current ? [{ '@type': 'ListItem', position: 3, name: current.name, item: url }] : []),
        ],
      },
    ],
  };

  return (
    <CleanLayout>
      <SEO
        title={title}
        description={description}
        canonical={url}
        ogImage="/og/releases.png"
        ogImageAlt="Release notes for Anvira, Anvira Notes and Anvira Runtime"
        ogImageWidth={1200}
        ogImageHeight={630}
        modifiedTime={newest?.date}
        keywords={`${current ? current.name : 'Anvira, Anvira Notes, Anvira Runtime'} release notes, changelog, what's new, latest version, download, LocalHouseLLM`}
        schema={schema}
      />

      <div className="rl">
        <section className="rl-hero">
          <div className="rl-shell">
            <nav className="rl-crumbs" aria-label="Breadcrumb">
              <Link to="/">LocalHouseLLM</Link>
              <span aria-hidden="true">/</span>
              {current ? <Link to="/releases">Release notes</Link> : <span>Release notes</span>}
              {current && (
                <>
                  <span aria-hidden="true">/</span>
                  <span>{current.name}</span>
                </>
              )}
            </nav>
            <h1>{current ? `${current.name} release notes` : 'Release notes'}</h1>
            <p className="rl-hero__lede">
              {current
                ? META[current.id].blurb
                : 'Everything we ship in Anvira, Anvira Notes and Anvira Runtime — newest first, straight from each GitHub release.'}{' '}
              {entries.length} releases, the latest on {newest ? formatReleaseDate(newest.date) : '—'}.
            </p>

            <div className="rl-filter" role="navigation" aria-label="Filter by product">
              <Link to="/releases" className={!current ? 'is-active' : ''} aria-current={!current ? 'page' : undefined}>
                All products
              </Link>
              {products.map((p) => (
                <Link
                  key={p.id}
                  to={`/releases/${p.id}`}
                  className={current?.id === p.id ? 'is-active' : ''}
                  aria-current={current?.id === p.id ? 'page' : undefined}
                >
                  <ProductIcon id={p.id} size={18} />
                  {p.name}
                  <span className="rl-filter__count">{p.releases.length}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="rl-shell rl-latest-grid" aria-label="Current versions">
          {scope.map((p) => {
            const r = p.releases.find((x) => x.tag === p.latest) ?? p.releases[0];
            return (
              <div key={p.id} className="rl-current">
                <div className="rl-current__top">
                  <ProductIcon id={p.id} size={36} />
                  <div>
                    <span className="rl-current__label">Current version</span>
                    <strong>
                      {p.name} {r.version}
                    </strong>
                  </div>
                </div>
                <p>
                  Released <time dateTime={r.date}>{formatReleaseDate(r.date)}</time>
                  {r.installer && <> · {formatSize(r.installer.size)}</>}
                </p>
                <div className="rl-current__links">
                  {p.id !== 'anvira-runtime' ? (
                    <Link to={p.page}>
                      About {p.name} <ArrowRight />
                    </Link>
                  ) : (
                    <Link to="/anvira#runtime">
                      How the runtime works <ArrowRight />
                    </Link>
                  )}
                  <a href={`#${releaseAnchor(p.id, r.version)}`}>Read the notes</a>
                </div>
              </div>
            );
          })}
        </section>

        <section className="rl-shell">
          <ol className="rl-list">
            {entries.map((e) => (
              <ReleaseEntry key={`${e.product.id}-${e.release.tag}`} {...e} showProduct={!current} />
            ))}
          </ol>

          <div className="rl-foot">
            <p>
              Anvira and Anvira Notes update themselves: when a new version is out, a button appears at the
              top right of the app.
              {(!current || current.id === 'anvira') &&
                ' Anvira 1.6.x releases are builds of the earlier Anvira 1.6 “Pochi” app; Anvira 1.0 is the current agent workspace.'}
            </p>
            <div className="rl-foot__links">
              <a href="/releases.xml" className="rl-btn">
                <Rss /> Subscribe (Atom feed)
              </a>
              {(current ? [current] : products).map((p) => (
                <a key={p.id} href={p.releasesUrl} target="_blank" rel="noopener noreferrer" className="rl-btn rl-btn--ghost">
                  {p.name} on GitHub <ArrowUpRight />
                </a>
              ))}
            </div>
          </div>
        </section>
      </div>
    </CleanLayout>
  );
};

export default Releases;

