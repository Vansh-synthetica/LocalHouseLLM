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

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const outFile = resolve(root, 'src/data/releases.json');
// Same data without the release-note bodies, for pages that only need versions and links.
const summaryFile = resolve(root, 'src/data/releases-summary.json');
const soft = process.argv.includes('--soft');

const PRODUCTS = [
  { id: 'anvira-notes', name: 'Anvira Notes', repo: 'Vansh-synthetica/Anvira-Notes-release', page: '/anvira-notes', installer: /\.exe$/i },
  { id: 'anvira', name: 'Anvira', repo: 'Vansh-synthetica/Anvira-release', page: '/anvira', installer: /\.exe$/i },
  { id: 'anvira-runtime', name: 'Anvira Runtime', repo: 'Vansh-synthetica/Anvira-Runtime', page: '/anvira#runtime', installer: /win-x64\.zip$/i },
];

// Sections that only make sense on GitHub ("download … below", upload checklists).
// The site shows its own download row with the installer, size and SHA-256 instead.
const DROP_SECTIONS = /^(update|install|install \/ update|checksum|checksums|verify the download|packages)$/i;

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

/* ------------------------------------------------------------------ */
/* Markdown → HTML for release notes (headings, lists, code, emphasis) */
/* ------------------------------------------------------------------ */

const MOJIBAKE = [
  ['ΓÇö', '—'], ['ΓÇô', '–'], ['ΓÇÖ', '’'], ['ΓÇÿ', '‘'], ['ΓÇ£', '“'], ['ΓÇ¥', '”'],
  ['ΓÇª', '…'], ['ΓåÆ', '→'], ['ΓåÉ', '←'], ['┬╖', '·'], ['┬á', ' '], ['ΓÇó', '•'],
];

const repair = (body) => {
  let s = (body ?? '').replace(/\r\n?/g, '\n');
  for (const [bad, good] of MOJIBAKE) s = s.split(bad).join(good);
  // Some notes were pasted as a single line ("## Title  ### New - **A.** … - **B.** …").
  if (/\S\s+#{2,4}\s/.test(s) && s.split('\n').length < 4) {
    s = s.replace(/\s+(#{2,4}\s)/g, '\n\n$1').replace(/\s+-\s+(?=\*\*)/g, '\n- ');
    s = s.replace(/^(#{2,4} [^\n]*?(?:New|Better|Fixed|Faster|Changed|Update|Checksum))\s+(?=[^\n])/gim, '$1\n');
  }
  return s.trim();
};

const escapeHtml = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const inline = (text) => {
  const codes = [];
  let s = text.replace(/`([^`]+)`/g, (_, c) => `\u0000${codes.push(c) - 1}\u0000`);
  s = escapeHtml(s);
  s = s.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, (_, label, href) =>
    `<a href="${href}" rel="noopener noreferrer" target="_blank">${label}</a>`,
  );
  s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  s = s.replace(/(^|[\s(])\*([^*\s][^*]*)\*(?=[\s).,;:!?]|$)/g, '$1<em>$2</em>');
  s = s.replace(/(^|[\s(])_([^_\s][^_]*)_(?=[\s).,;:!?]|$)/g, '$1<em>$2</em>');
  return s.replace(/\u0000(\d+)\u0000/g, (_, i) => `<code>${escapeHtml(codes[Number(i)])}</code>`);
};

/** Splits markdown into sections keyed by their heading, dropping GitHub-only ones. */
const sections = (md) => {
  const out = [];
  let cur = { title: '', lines: [] };
  let fence = false;
  for (const line of md.split('\n')) {
    if (/^```/.test(line.trim())) fence = !fence;
    const h = !fence && line.match(/^#{1,4}\s+(.*)$/);
    if (h) {
      out.push(cur);
      cur = { title: h[1].trim(), lines: [] };
    } else cur.lines.push(line);
  }
  out.push(cur);
  return out.filter((sec) => !DROP_SECTIONS.test(sec.title) && (sec.title || sec.lines.join('').trim()));
};

const renderBlock = (lines) => {
  const html = [];
  let i = 0;
  const listDepthStack = [];
  const closeLists = (toDepth) => {
    while (listDepthStack.length > toDepth) {
      html.push('</li></ul>');
      listDepthStack.pop();
    }
  };
  while (i < lines.length) {
    const line = lines[i];
    if (/^```/.test(line.trim())) {
      closeLists(0);
      const code = [];
      i++;
      while (i < lines.length && !/^```/.test(lines[i].trim())) code.push(lines[i++]);
      i++;
      const text = code.join('\n').trim();
      if (text) html.push(`<pre><code>${escapeHtml(text)}</code></pre>`);
      continue;
    }
    const li = line.match(/^(\s*)[-*+]\s+(.*)$/);
    if (li) {
      const depth = Math.floor(li[1].replace(/\t/g, '  ').length / 2) + 1;
      if (depth > listDepthStack.length) {
        while (listDepthStack.length < depth) {
          html.push('<ul><li>');
          listDepthStack.push(depth);
        }
      } else {
        closeLists(depth);
        html.push('</li><li>');
      }
      html.push(inline(li[2].trim()));
      i++;
      continue;
    }
    if (!line.trim()) {
      i++;
      continue;
    }
    if (listDepthStack.length && /^\s{2,}\S/.test(line)) {
      html.push(' ' + inline(line.trim()));
      i++;
      continue;
    }
    closeLists(0);
    const para = [line.trim()];
    i++;
    while (i < lines.length && lines[i].trim() && !/^(\s*[-*+]\s|```)/.test(lines[i])) para.push(lines[i++].trim());
    html.push(`<p>${inline(para.join(' '))}</p>`);
  }
  closeLists(0);
  return html.join('').replace(/<li><\/li>/g, '');
};

const stripTags = (s) => s.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"');

// A heading at the very top like "## Anvira Notes 1.2.0" just repeats the release name.
const isNameHeading = (title, idx) => idx <= 1 && /^(anvira[\w ]*|v)?\s*\d+\.\d+(\.\d+)?\s*$/i.test(title);

const toNotes = (md) =>
  sections(md)
    .map((sec, idx) => ({ title: isNameHeading(sec.title, idx) ? '' : sec.title, html: renderBlock(sec.lines) }))
    .filter((sec) => sec.html);

/** Bold lead-ins of top-level bullets ("**Messages**", "**Remember me works.**"). */
const highlightsOf = (md) => {
  const out = [];
  for (const sec of sections(md)) {
    for (const line of sec.lines) {
      const m = line.match(/^[-*+]\s+\*\*([^*]+?)\*\*/);
      if (m) out.push({ kind: sec.title || 'Notes', text: m[1].replace(/[.:]\s*$/, '').trim() });
    }
  }
  return out;
};

const summaryOf = (notes) => {
  const firstPara = notes.map((n) => n.html).join('').match(/<(?:p|li)>(.*?)(?:<\/p>|<\/li>|<ul>)/);
  const text = stripTags(firstPara?.[1] ?? '').replace(/\s+/g, ' ').trim();
  return text.length > 220 ? `${text.slice(0, 217).replace(/\s+\S*$/, '')}…` : text;
};

/* ------------------------------------------------------------------ */

const versionOf = (tag) => tag.replace(/^v/i, '');

const shape = (product, r, latestTag) => {
  const md = repair(r.body);
  const notes = toNotes(md);
  const exe = r.assets.find((a) => product.installer.test(a.name));
  const sha = exe?.digest?.startsWith('sha256:') ? exe.digest.slice(7) : md.match(/\b[a-f0-9]{64}\b/)?.[0] ?? null;
  return {
    tag: r.tag_name,
    version: versionOf(r.tag_name),
    name: r.name?.trim() || `${product.name} ${versionOf(r.tag_name)}`,
    date: r.published_at,
    url: r.html_url,
    latest: r.tag_name === latestTag,
    installer: exe ? { name: exe.name, size: exe.size, url: exe.browser_download_url, sha256: sha } : null,
    summary: summaryOf(notes),
    highlights: highlightsOf(md),
    notes,
  };
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
