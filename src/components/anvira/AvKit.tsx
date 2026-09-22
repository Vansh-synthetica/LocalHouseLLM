import { type ReactNode, useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Download, Loader2 } from 'lucide-react';

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
 * One-click download button: resolves the newest .exe asset from a GitHub
 * repo's "latest" release on click and downloads it directly — no detour
 * through the GitHub releases page. Falls back to opening that page if the
 * GitHub API call fails (rate limit, offline, asset renamed, etc).
 */
export const DownloadButton = ({
  repo,
  label,
  className = 'av-btn av-btn--primary',
}: {
  repo: string;
  label: string;
  className?: string;
}) => {
  const [state, setState] = useState<'idle' | 'loading'>('idle');
  const releasesUrl = `https://github.com/${repo}/releases/latest`;

  const handleClick = async () => {
    if (state === 'loading') return;
    setState('loading');
    try {
      const res = await fetch(`https://api.github.com/repos/${repo}/releases/latest`);
      if (!res.ok) throw new Error('release lookup failed');
      const data = await res.json();
      const asset = (data.assets ?? []).find((a: { name: string }) => /\.exe$/i.test(a.name));
      if (!asset) throw new Error('no installer asset found');
      triggerFileDownload(asset.browser_download_url);
    } catch {
      window.open(releasesUrl, '_blank', 'noopener,noreferrer');
    } finally {
      setState('idle');
    }
  };

  return (
    <button type="button" onClick={handleClick} className={className} disabled={state === 'loading'}>
      {state === 'loading' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
      {state === 'loading' ? 'Preparing download…' : label}
    </button>
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
