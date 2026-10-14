import { type MouseEvent, type ReactNode, useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Copy, Download, Loader2 } from 'lucide-react';
import { ParallaxStage, TiltCard } from './AvMotion';
import { type ProductId, formatReleaseDate, formatSize, getProduct, latestRelease } from '@/data/releases';

/**
 * Fires a direct file download via a throwaway <a download>, rather than
 * navigating the page to it.
 */
const triggerFileDownload = (url: string) => {
  const a = document.createElement('a');
  a.href = url;
  a.download = '';
  a.rel = 'noopener noreferrer';
  document.body.appendChild(a);
  a.click();
  a.remove();
};

/**
 * One-click download link for an app's Windows installer.
 *
 * The href is the installer from the last release sync (src/data/releases.ts),
 * so crawlers, no-JS visitors and "copy link" all get a real file URL. On click
 * it asks GitHub for the current "latest" release first, in case a newer one
 * shipped since the site was built, and falls back to the synced file.
 */
export const DownloadButton = ({
  product,
  label,
  className = 'av-btn av-btn--primary',
}: {
  product: ProductId;
  label: string;
  className?: string;
}) => {
  const [state, setState] = useState<'idle' | 'loading'>('idle');
  const { repo } = getProduct(product);
  const known = latestRelease(product);
  const href = known.installer?.url ?? `https://github.com/${repo}/releases/latest`;

  const handleClick = async (e: MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    if (state === 'loading') return;
    setState('loading');
    let url = href;
    try {
      const res = await fetch(`https://api.github.com/repos/${repo}/releases/latest`);
      if (res.ok) {
        const data = await res.json();
        const asset = (data.assets ?? []).find((a: { name: string }) => /\.exe$/i.test(a.name));
        if (asset) url = asset.browser_download_url;
      }
    } catch {
      // Offline or rate-limited: the synced installer is still a valid download.
    } finally {
      triggerFileDownload(url);
      setState('idle');
    }
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className={className}
      aria-busy={state === 'loading'}
      data-version={known.version}
      rel="nofollow"
    >
      {state === 'loading' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
      {state === 'loading' ? 'Starting download…' : label}
    </a>
  );
};

/** Copies a value (e.g. a SHA-256) and briefly confirms it. */
export const CopyValue = ({ value, label = 'Copy', className }: { value: string; label?: string; className?: string }) => {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      className={className}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          setCopied(true);
          setTimeout(() => setCopied(false), 1600);
        } catch {
          setCopied(false);
        }
      }}
      aria-label={copied ? 'Copied' : `${label} to clipboard`}
    >
      {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
      {copied ? 'Copied' : label}
    </button>
  );
};

/**
 * Version, date, size, requirements and checksum of an app's current release —
 * the facts people look for before running an unsigned installer.
 */
export const InstallerFacts = ({
  product,
  requires,
  className = 'dl-facts',
}: {
  product: ProductId;
  requires: string;
  className?: string;
}) => {
  const r = latestRelease(product);
  return (
    <dl className={className}>
      <div>
        <dt>Version</dt>
        <dd>{r.version}</dd>
      </div>
      <div>
        <dt>Released</dt>
        <dd>
          <time dateTime={r.date}>{formatReleaseDate(r.date)}</time>
        </dd>
      </div>
      {r.installer && (
        <div>
          <dt>Download size</dt>
          <dd>{formatSize(r.installer.size)}</dd>
        </div>
      )}
      <div>
        <dt>Requires</dt>
        <dd>{requires}</dd>
      </div>
      {r.installer?.sha256 && (
        <div className="dl-facts__sha">
          <dt>SHA-256 · {r.installer.name}</dt>
          <dd>
            <code>{r.installer.sha256}</code>
            <CopyValue value={r.installer.sha256} />
          </dd>
        </div>
      )}
    </dl>
  );
};

const revealUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

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
    viewport={{ once: true, margin: '-60px' }}
    variants={{
      hidden: revealUp.hidden,
      visible: { ...revealUp.visible, transition: { ...revealUp.visible.transition, delay } },
    }}
  >
    {children}
  </motion.div>
);

export const Frame = ({
  src,
  alt,
  className = '',
  float = true,
  drift = false,
}: {
  src: string;
  alt: string;
  className?: string;
  float?: boolean;
  drift?: boolean;
}) => (
  <div className={`av-frame ${float ? 'av-frame--float' : ''} ${drift ? 'av-frame--drift' : ''} ${className}`}>
    <img src={src} alt={alt} loading="lazy" />
  </div>
);

export const SectionHead = ({
  eyebrow,
  title,
  children,
  center = false,
}: {
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
  center?: boolean;
}) => (
  <Reveal className={`av-section-head ${center ? 'av-section-head--center' : ''}`}>
    <span className="av-meta-label">{eyebrow}</span>
    <h2>{title}</h2>
    {children && <p>{children}</p>}
  </Reveal>
);

export const ShowcaseRow = ({
  eyebrow,
  title,
  description,
  points,
  image,
  alt,
  reverse = false,
}: {
  eyebrow: string;
  title: ReactNode;
  description: string;
  points: string[];
  image: string;
  alt: string;
  reverse?: boolean;
}) => (
  <div className={`av-showcase ${reverse ? 'av-showcase--reverse' : ''}`}>
    <Reveal className="av-showcase__text">
      <span className="av-meta-label">{eyebrow}</span>
      <h3>{title}</h3>
      <p>{description}</p>
      <ul className="av-showcase__list">
        {points.map((point) => (
          <li key={point}>
            <Check />
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </Reveal>
    <Reveal className="av-showcase__frame" delay={0.08}>
      <Frame src={image} alt={alt} />
    </Reveal>
  </div>
);

export const Faq = ({ items }: { items: { q: string; a: string }[] }) => (
  <div className="av-faq">
    {items.map((item, i) => (
      <Reveal key={item.q} delay={i * 0.04}>
        <details className="av-faq-item">
          <summary>{item.q}</summary>
          <p>{item.a}</p>
        </details>
      </Reveal>
    ))}
  </div>
);

export const FeatureCard = ({
  icon,
  title,
  children,
  delay = 0,
}: {
  icon: ReactNode;
  title: string;
  children: ReactNode;
  delay?: number;
}) => (
  <Reveal className="av-card" delay={delay}>
    <span className="av-card__icon">{icon}</span>
    <h3>{title}</h3>
    <p>{children}</p>
  </Reveal>
);
