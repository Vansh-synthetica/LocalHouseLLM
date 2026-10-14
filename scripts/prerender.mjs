// Build step 3 of 3 (see package.json "build").
// Renders every public route to static HTML so search engines and AI crawlers
// that do not execute JavaScript still get each page's real content, title,
// description, canonical URL and JSON-LD. Also emits 404.html, an app-only
// shell, sitemap.xml and Netlify _redirects — all from src/seo/routes.ts.
import { execSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = resolve(root, 'dist');
const serverEntry = resolve(root, 'dist-server/entry-server.js');

const { render, ready, pageModulesFor, siteRoutes, appOnlyPaths, legacyRedirects, SITE_URL } = await import(
  pathToFileURL(serverEntry).href
);
await ready;

// ---- per-page chunks: each page is code-split (src/pages.ts), so its JS and CSS
// are linked from its HTML. The CSS must be there for the first paint; the JS is
// preloaded so hydration does not wait on a request chain. ----
// Kept in dist-server too (like the template) so this script can be re-run without a fresh build.
const manifestFile = resolve(dist, '.vite/manifest.json');
const manifestCopy = resolve(root, 'dist-server/client-manifest.json');
if (existsSync(manifestFile)) writeFileSync(manifestCopy, readFileSync(manifestFile));
const manifest = JSON.parse(readFileSync(manifestCopy, 'utf8'));
const chunkAssets = (modules) => {
  const js = new Set();
  const css = new Set();
  const visit = (key) => {
    const chunk = manifest[key];
    if (!chunk || chunk.isEntry) return;
    if (js.has(chunk.file)) return;
    js.add(chunk.file);
    for (const c of chunk.css ?? []) css.add(c);
    for (const i of chunk.imports ?? []) visit(i);
  };
  modules.forEach(visit);
  return [
    ...[...css].map((c) => `<link rel="stylesheet" crossorigin href="/${c}">`),
    ...[...js].map((j) => `<link rel="modulepreload" crossorigin href="/${j}">`),
  ].join('\n    ');
};
const pageHead = (path, head) => {
  const assets = chunkAssets(pageModulesFor(path));
  return assets ? `${head}\n    ${assets}` : head;
};

// Keep a pristine copy of the client template so this script can be re-run
// without a fresh `vite build` (it overwrites dist/index.html with the homepage).
const hasSlots = (t) => t.includes('<!--app-head-->') && t.includes('<!--app-html-->');
const templateCopy = resolve(root, 'dist-server/template.html');
let template = readFileSync(resolve(dist, 'index.html'), 'utf8');
if (hasSlots(template)) writeFileSync(templateCopy, template);
else template = readFileSync(templateCopy, 'utf8');
if (!hasSlots(template)) throw new Error('index.html template is missing <!--app-head--> / <!--app-html-->');

const fill = (head, html) =>
  template.replace('<!--app-head-->', head).replace('<!--app-html-->', html);

const write = (file, contents) => {
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, contents);
};

const pageFile = (path) => (path === '/' ? resolve(dist, 'index.html') : resolve(dist, `_pages${path}.html`));
const pageUrl = (path) => (path === '/' ? '/index.html' : `/_pages${path}.html`);

// ---- lastmod from git (falls back to the route's declared date) ----
let gitUsable = false;
try {
  gitUsable = execSync('git rev-parse --is-shallow-repository', { cwd: root }).toString().trim() === 'false';
} catch {
  gitUsable = false;
}
const lastmodFor = (route) => {
  if (!gitUsable) return route.fallbackLastmod;
  try {
    const out = execSync(`git log -1 --format=%cs -- ${route.sources.map((s) => `"${s}"`).join(' ')}`, { cwd: root })
      .toString()
      .trim();
    return out || route.fallbackLastmod;
  } catch {
    return route.fallbackLastmod;
  }
};

// ---- render pages ----
rmSync(resolve(dist, '_pages'), { recursive: true, force: true });
const problems = [];
const rendered = [];

for (const route of siteRoutes) {
  const { html, head } = render(route.path);
  if (!html || html.length < 500) problems.push(`${route.path}: rendered body is empty`);
  if (!/<title[^>]*>[^<]+<\/title>/.test(head)) problems.push(`${route.path}: no <title>`);
  if (!head.includes(`rel="canonical" href="${SITE_URL}${route.path === '/' ? '/' : route.path}"`)) {
    problems.push(`${route.path}: canonical does not match its own URL`);
  }
  if (/noindex/.test(head)) problems.push(`${route.path}: marked noindex but listed as indexable`);
  write(pageFile(route.path), fill(pageHead(route.path, head), html));

  const images = [...new Set([...html.matchAll(/<img[^>]+src="(\/assets\/[^"]+\.(?:png|jpe?g|webp))"/g)].map((m) => m[1]))];
  rendered.push({ route, images, lastmod: lastmodFor(route) });
}

const notFound = render('/__not-found__');
write(resolve(dist, '404.html'), fill(notFound.head, notFound.html));

write(
  resolve(dist, 'app.html'),
  fill('<title>LocalHouseLLM</title>\n    <meta name="robots" content="noindex, nofollow" />', ''),
);

if (problems.length) {
  console.error('Prerender checks failed:\n  ' + problems.join('\n  '));
  process.exit(1);
}

// ---- sitemap.xml (with image entries for pages that show product screenshots) ----
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${rendered
  .map(
    ({ route, images, lastmod }) => `  <url>
    <loc>${esc(SITE_URL + (route.path === '/' ? '/' : route.path))}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority.toFixed(2)}</priority>${images
      .slice(0, 20)
      .map((src) => `\n    <image:image><image:loc>${esc(SITE_URL + src)}</image:loc></image:image>`)
      .join('')}
  </url>`,
  )
  .join('\n')}
</urlset>
`;
write(resolve(dist, 'sitemap.xml'), sitemap);

// ---- releases.xml: an Atom feed of every app release (feed readers, and a freshness signal for crawlers) ----
const { products } = JSON.parse(readFileSync(resolve(root, 'src/data/releases.json'), 'utf8'));
const entries = products
  .flatMap((p) => p.releases.map((r) => ({ p, r })))
  .sort((a, b) => b.r.date.localeCompare(a.r.date))
  .slice(0, 50);
const anchor = (p, r) => `${p.id}-${r.version.replace(/\./g, '-')}`;
const feed = `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>LocalHouseLLM release notes</title>
  <subtitle>New versions of Anvira, Anvira Notes and Anvira Runtime.</subtitle>
  <id>${SITE_URL}/releases</id>
  <link rel="alternate" type="text/html" href="${SITE_URL}/releases"/>
  <link rel="self" type="application/atom+xml" href="${SITE_URL}/releases.xml"/>
  <updated>${entries[0]?.r.date ?? new Date().toISOString()}</updated>
  <author><name>LocalHouseLLM</name><uri>${SITE_URL}/</uri></author>
${entries
  .map(({ p, r }) => {
    const html = r.notes.map((n) => (n.title ? `<h3>${esc(n.title)}</h3>` : '') + n.html).join('');
    return `  <entry>
    <title>${esc(r.name)}</title>
    <id>${SITE_URL}/releases/${p.id}#${anchor(p, r)}</id>
    <link rel="alternate" type="text/html" href="${SITE_URL}/releases/${p.id}#${anchor(p, r)}"/>
    <published>${r.date}</published>
    <updated>${r.date}</updated>
    <category term="${esc(p.name)}"/>
    <summary>${esc(r.summary || r.name)}</summary>
    <content type="html">${esc(html)}</content>
  </entry>`;
  })
  .join('\n')}
</feed>
`;
write(resolve(dist, 'releases.xml'), feed);

// ---- llms.txt: fill in current versions, dates and installer links from the release data ----
const latestOf = (id) => {
  const p = products.find((x) => x.id === id);
  return p.releases.find((r) => r.tag === p.latest) ?? p.releases[0];
};
const llms = readFileSync(resolve(root, 'public/llms.txt'), 'utf8').replace(
  /\{\{(version|date|installer):([a-z-]+)\}\}/g,
  (_, field, id) => {
    const r = latestOf(id);
    if (field === 'version') return r.version;
    if (field === 'date') return r.date.slice(0, 10);
    return r.installer?.url ?? `https://github.com/${products.find((x) => x.id === id).repo}/releases/latest`;
  },
);
write(resolve(dist, 'llms.txt'), llms);

// The manifest was only needed to link page chunks above; don't publish it.
rmSync(resolve(dist, '.vite'), { recursive: true, force: true });

// ---- Netlify _redirects. First match wins; no catch-all, so unknown URLs get 404.html with a real 404. ----
const lines = ['# Generated by scripts/prerender.mjs — edit src/seo/routes.ts instead.', ''];
// No trailing-slash redirects: Netlify treats a trailing slash as optional when
// matching rules, so "/page/ -> /page" also matches "/page" and loops. "/page/" is
// served by the rewrite below instead, and its canonical tag points to "/page".
lines.push('# Prerendered pages (also match the same path with a trailing slash)');
for (const { path } of siteRoutes) if (path !== '/') lines.push(`${path}  ${pageUrl(path)}  200`);
lines.push('', '# Legacy URLs (permanent)');
for (const [from, to] of legacyRedirects) lines.push(`${from}  ${to}  301`);
lines.push('', '# Browser-only app routes (auth + dashboard) use a noindex shell');
for (const p of appOnlyPaths) lines.push(`${p}  /app.html  200`);
write(resolve(dist, '_redirects'), lines.join('\n') + '\n');

console.log(
  `Prerendered ${rendered.length} pages + 404 + app shell. lastmod from ${gitUsable ? 'git history' : 'declared fallbacks'}.`,
);
process.exit(0);
