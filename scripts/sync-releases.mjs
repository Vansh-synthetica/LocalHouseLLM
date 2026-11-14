// Pulls every published release of the LocalHouseLLM apps from GitHub and writes
// src/data/releases.json — the single source of truth for versions, dates,
// installer links, sizes, checksums and release notes shown on the site.
//
//   node scripts/sync-releases.mjs          # fail loudly (used by the GitHub Action)
//   node scripts/sync-releases.mjs --soft   # keep the committed file if GitHub is unreachable (used by builds)
//
// Set GITHUB_TOKEN to avoid the 60 requests/hour anonymous rate limit.
// No dependencies on purpose: the scheduled workflow runs it without `npm ci`.
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { PRODUCTS, shape } from '../src/data/releaseShape.js';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const outFile = resolve(root, 'src/data/releases.json');
// Same data without the release-note bodies, for pages that only need versions and links.
const summaryFile = resolve(root, 'src/data/releases-summary.json');
const soft = process.argv.includes('--soft');


const headers = {
  Accept: 'application/vnd.github+json',
  'User-Agent': 'localhousellm-site-sync',
  ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
};

const getJson = async (url) => {
  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error(`${url} → HTTP ${res.status}`);
  return res.json();
};

const syncProduct = async (product) => {
  const [list, latest] = await Promise.all([
    getJson(`https://api.github.com/repos/${product.repo}/releases?per_page=100`),
    getJson(`https://api.github.com/repos/${product.repo}/releases/latest`),
  ]);
  const releases = list
    .filter((r) => !r.draft && !r.prerelease)
    .map((r) => shape(product, r, latest.tag_name))
    .sort((a, b) => b.date.localeCompare(a.date));
  return {
    id: product.id,
    name: product.name,
    repo: product.repo,
    page: product.page,
    releasesUrl: `https://github.com/${product.repo}/releases`,
    latest: releases.find((r) => r.latest)?.tag ?? releases[0]?.tag ?? null,
    releases,
  };
};

try {
  const products = await Promise.all(PRODUCTS.map(syncProduct));
  const next = { products };

  // Only touch the file (and syncedAt) when something real changed, so the
  // scheduled workflow does not commit a new timestamp every run.
  let previous = null;
  try {
    previous = JSON.parse(readFileSync(outFile, 'utf8'));
  } catch {
    previous = null;
  }
  if (previous && JSON.stringify(previous.products) === JSON.stringify(next.products)) {
    console.log('Release data unchanged.');
  } else {
    const syncedAt = new Date().toISOString();
    writeFileSync(outFile, JSON.stringify({ syncedAt, ...next }, null, 2) + '\n');
    // Product pages show the latest release's notes, so keep those; drop the rest.
    const summary = products.map((p) => ({
      ...p,
      releases: p.releases.map(({ notes, ...r }) => (r.tag === p.latest ? { ...r, notes } : r)),
    }));
    writeFileSync(summaryFile, JSON.stringify({ syncedAt, products: summary }, null, 2) + '\n');
    for (const p of products) {
      const l = p.releases.find((r) => r.tag === p.latest);
      console.log(`${p.name}: ${p.releases.length} releases, latest ${l?.version ?? 'none'}`);
    }
  }
} catch (err) {
  if (!soft) throw err;
  console.warn(`Release sync skipped (${err.message}); using the committed src/data/releases.json.`);
}
