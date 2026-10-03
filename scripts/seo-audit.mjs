// Crawler's-eye audit of the built site (run after `npm run build`):
//   node scripts/seo-audit.mjs
// Reads only the static HTML in dist/ — exactly what a non-JS crawler receives.
import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = resolve(root, 'dist');
const { siteRoutes, appOnlyPaths, legacyRedirects, SITE_URL } = await import(
  pathToFileURL(resolve(root, 'dist-server/entry-server.js')).href
);

const fileFor = (p) => (p === '/' ? resolve(dist, 'index.html') : resolve(dist, `_pages${p}.html`));
const text = (h) => h.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, ' ').replace(/<[^>]+>/g, ' ').replace(/&[a-z#0-9]+;/g, ' ').replace(/\s+/g, ' ').trim();
const attr = (tag, name) => (tag.match(new RegExp(`${name}="([^"]*)"`)) || [])[1];

const known = new Set(siteRoutes.map((r) => r.path));
const redirectFrom = new Set(legacyRedirects.map(([f]) => f));
const appOnly = (p) => appOnlyPaths.some((a) => (a.endsWith('/*') ? p.startsWith(a.slice(0, -1)) : p === a));
const isStaticFile = (p) => existsSync(resolve(dist, '.' + p));

const issues = [];
const add = (sev, page, msg) => issues.push({ sev, page, msg });
const inbound = new Map([...known].map((p) => [p, new Set()]));
const titles = new Map();
const descs = new Map();
const schemaUse = new Map();
const rows = [];

for (const { path } of siteRoutes) {
  const html = readFileSync(fileFor(path), 'utf8');
  const title = (html.match(/<title[^>]*>([^<]*)<\/title>/) || [])[1]?.replace(/&amp;/g, '&') ?? '';
  const desc = attr(html.match(/<meta[^>]+name="description"[^>]*>/)?.[0] ?? '', 'content') ?? '';
  const canon = attr(html.match(/<link[^>]+rel="canonical"[^>]*>/)?.[0] ?? '', 'href');
  const canonCount = (html.match(/rel="canonical"/g) || []).length;
  const h1s = (html.match(/<h1[\s>]/g) || []).length;
  const words = text(html.match(/<div id="root">([\s\S]*)<\/body>/)?.[1] ?? '').split(' ').length;

  if (!title) add('P1', path, 'missing <title>');
  else if (title.length > 65) add('P3', path, `title is ${title.length} chars (may truncate): "${title}"`);
  if (!desc) add('P2', path, 'missing meta description');
  else if (desc.length > 170) add('P4', path, `description is ${desc.length} chars`);
  if (canonCount !== 1) add('P1', path, `${canonCount} canonical tags`);
  if (canon !== SITE_URL + (path === '/' ? '/' : path)) add('P1', path, `canonical is ${canon}`);
  if (h1s !== 1) add('P2', path, `${h1s} <h1> elements`);
  if (words < 150) add('P3', path, `only ${words} words of body text`);
  titles.set(title, [...(titles.get(title) || []), path]);
  descs.set(desc, [...(descs.get(desc) || []), path]);

  for (const img of html.match(/<img\b[^>]*>/g) || []) {
    if (!/\balt="/.test(img)) add('P3', path, `<img> without alt: ${attr(img, 'src')}`);
  }

  for (const m of html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
    try {
      const data = JSON.parse(m[1]);
      const nodes = data['@graph'] ?? [data];
      for (const n of nodes) {
        const t = [].concat(n['@type'] ?? '?').join('+');
        schemaUse.set(t, new Set([...(schemaUse.get(t) || []), path]));
      }
    } catch (e) {
      add('P1', path, `invalid JSON-LD: ${e.message}`);
    }
  }

  for (const a of html.match(/<a\b[^>]*href="[^"]*"[^>]*>/g) || []) {
    let href = attr(a, 'href');
    if (!href || href.startsWith('#') || href.startsWith('mailto:')) continue;
    if (href.startsWith(SITE_URL)) href = href.slice(SITE_URL.length) || '/';
    if (!href.startsWith('/')) continue;
    const p = href.split(/[?#]/)[0].replace(/(.)\/$/, '$1');
    if (known.has(p)) {
      if (p !== path) inbound.get(p).add(path);
    } else if (redirectFrom.has(p)) add('P3', path, `links to redirecting URL ${p}`);
    else if (!appOnly(p) && !isStaticFile(p)) add('P1', path, `broken internal link ${href}`);
  }
  rows.push({ path, title, words, h1s });
}

for (const [t, ps] of titles) if (t && ps.length > 1) add('P2', ps.join(', '), `duplicate title "${t}"`);
for (const [d, ps] of descs) if (d && ps.length > 1) add('P3', ps.join(', '), 'duplicate meta description');
for (const [p, from] of inbound) if (p !== '/' && from.size === 0) add('P2', p, 'orphan: no internal links from other pages');

const nf = readFileSync(resolve(dist, '404.html'), 'utf8');
if (!/name="robots" content="noindex/.test(nf)) add('P1', '404.html', 'not noindex');
const shell = readFileSync(resolve(dist, 'app.html'), 'utf8');
if (!/noindex/.test(shell)) add('P1', 'app.html', 'app shell is not noindex');

const order = ['P0', 'P1', 'P2', 'P3', 'P4'];
issues.sort((a, b) => order.indexOf(a.sev) - order.indexOf(b.sev));
console.log('\nPAGES');
for (const r of rows) console.log(`  ${r.path.padEnd(48)} ${String(r.words).padStart(5)} words  h1=${r.h1s}  ${r.title}`);
console.log('\nSTRUCTURED DATA');
for (const [t, ps] of schemaUse) console.log(`  ${t.padEnd(22)} ${ps.size === siteRoutes.length ? 'all pages' : [...ps].join(', ')}`);
console.log('\nINBOUND INTERNAL LINKS');
for (const [p, from] of inbound) console.log(`  ${p.padEnd(48)} ${from.size}`);
console.log(`\nISSUES (${issues.length})`);
for (const i of issues) console.log(`  [${i.sev}] ${i.page}: ${i.msg}`);
process.exit(issues.some((i) => i.sev === 'P0' || i.sev === 'P1') ? 1 : 0);
