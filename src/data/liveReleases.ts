import { useEffect, useSyncExternalStore } from 'react';
import { PRODUCTS, shape } from './releaseShape.js';
import type { Product, ProductId, Release, ReleaseSummary } from './releases';

/**
 * Keeps every version on the site current, even between deploys.
 *
 * Pages render the release data from the last sync (src/data/releases*.json), so
 * crawlers and the prerendered HTML always carry real versions and file links.
 * After the page has hydrated, the browser asks GitHub for each app's "latest"
 * release (cached for 15 minutes per visitor). When one is newer than the build,
 * it is added to the product's release list in place and every component that
 * calls useLiveReleases() re-renders with it: version labels, download links,
 * sizes, checksums and the "what's new" notes.
 *
 * Failures (offline, rate limits) are silent: the synced data is still correct,
 * just possibly a release behind until the next scheduled sync.
 */

const CACHE_KEY = 'lh-live-releases-v1';
const CACHE_MS = 15 * 60 * 1000;

type GitHubRelease = Parameters<typeof shape>[1];

const lists = new Set<Product<ReleaseSummary>[]>();
const listeners = new Set<() => void>();
let revision = 0;
let started = false;
const fresh = new Map<ProductId, Release>();

/** Registers a product list (summary or full) to receive newer releases. */
export const trackProducts = <R extends ReleaseSummary>(products: Product<R>[]) => {
  lists.add(products as Product<ReleaseSummary>[]);
  if (fresh.size) fresh.forEach((r, id) => insert(products as Product<ReleaseSummary>[], id, r));
};

const parts = (v: string) => v.split(/[.+-]/).map((n) => parseInt(n, 10) || 0);
export const isNewer = (a: string, b: string) => {
  const x = parts(a);
  const y = parts(b);
  for (let i = 0; i < Math.max(x.length, y.length); i++) {
    if ((x[i] ?? 0) !== (y[i] ?? 0)) return (x[i] ?? 0) > (y[i] ?? 0);
  }
  return false;
};

const insert = (products: Product<ReleaseSummary>[], id: ProductId, release: Release) => {
  const p = products.find((x) => x.id === id);
  if (!p) return false;
  const current = p.releases.find((r) => r.tag === p.latest) ?? p.releases[0];
  if (current && !isNewer(release.version, current.version)) return false;
  if (p.releases.some((r) => r.tag === release.tag)) {
    p.latest = release.tag;
  } else {
    p.releases.forEach((r) => (r.latest = false));
    p.releases.unshift(release);
    p.latest = release.tag;
  }
  return true;
};

const apply = (releases: Partial<Record<ProductId, Release>>) => {
  let changed = false;
  for (const [id, r] of Object.entries(releases) as [ProductId, Release][]) {
    if (!r) continue;
    fresh.set(id, r);
    lists.forEach((products) => {
      if (insert(products, id, r)) changed = true;
    });
  }
  if (changed) {
    revision++;
    listeners.forEach((l) => l());
  }
};

const readCache = (): Partial<Record<ProductId, Release>> | null => {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const { at, releases } = JSON.parse(raw);
    return Date.now() - at < CACHE_MS ? releases : null;
  } catch {
    return null;
  }
};

const writeCache = (releases: Partial<Record<ProductId, Release>>) => {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), releases }));
  } catch {
    // Private mode or storage blocked: we just fetch again next time.
  }
};

const fetchLatest = async () => {
  const entries = await Promise.all(
    PRODUCTS.map(async (product) => {
      try {
        const res = await fetch(`https://api.github.com/repos/${product.repo}/releases/latest`, {
          headers: { Accept: 'application/vnd.github+json' },
        });
        if (!res.ok) return null;
        const r = (await res.json()) as GitHubRelease;
        return [product.id, shape(product, r, r.tag_name) as Release] as const;
      } catch {
        return null;
      }
    }),
  );
  return Object.fromEntries(entries.filter(Boolean) as [ProductId, Release][]);
};

const start = () => {
  if (started || typeof window === 'undefined') return;
  started = true;
  const cached = readCache();
  if (cached) {
    apply(cached);
    return;
  }
  fetchLatest()
    .then((releases) => {
      if (Object.keys(releases).length) writeCache(releases);
      apply(releases);
    })
    .catch(() => undefined);
};

const subscribe = (fn: () => void) => {
  listeners.add(fn);
  return () => listeners.delete(fn);
};

/**
 * Re-renders the calling component when a release newer than the build arrives.
 * Starts the check after hydration, so the first render always matches the HTML.
 */
export const useLiveReleases = () => {
  const rev = useSyncExternalStore(subscribe, () => revision, () => 0);
  useEffect(start, []);
  return rev;
};
