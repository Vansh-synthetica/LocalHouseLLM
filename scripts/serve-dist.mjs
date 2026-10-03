// Local stand-in for Netlify, for testing the prerendered build:
//   node scripts/serve-dist.mjs [port]
// Applies dist/_redirects (200 rewrites, 301 redirects, /* splats), serves
// static files, and falls back to dist/404.html with a real 404 status.
import { createServer } from 'node:http';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { dirname, extname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = resolve(dirname(fileURLToPath(import.meta.url)), '../dist');
const port = Number(process.argv[2] || 4173);
const types = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.json': 'application/json', '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8', '.pdf': 'application/pdf', '.woff2': 'font/woff2', '.woff': 'font/woff',
};

const rules = readFileSync(resolve(dist, '_redirects'), 'utf8')
  .split('\n')
  .map((l) => l.trim())
  .filter((l) => l && !l.startsWith('#'))
  .map((l) => {
    const [from, to, status] = l.split(/\s+/);
    return { from, to, status: Number(status) };
  });

const fileAt = (p) => {
  const f = resolve(dist, '.' + decodeURIComponent(p));
  return f.startsWith(dist) && existsSync(f) && statSync(f).isFile() ? f : null;
};

const send = (res, status, file, extra = {}) => {
  res.writeHead(status, { 'Content-Type': types[extname(file)] || 'application/octet-stream', ...extra });
  res.end(readFileSync(file));
};

createServer((req, res) => {
  const url = new URL(req.url, 'http://x');
  const path = url.pathname;
  const direct = path === '/' ? resolve(dist, 'index.html') : fileAt(path);
  if (direct) return send(res, 200, direct);

  for (const r of rules) {
    const splat = r.from.endsWith('/*') && path.startsWith(r.from.slice(0, -1));
    if (r.from !== path && !splat) continue;
    if (r.status === 301) {
      res.writeHead(301, { Location: r.to });
      return res.end();
    }
    const target = fileAt(r.to.split('#')[0]);
    if (target) return send(res, r.status, target);
  }
  return send(res, 404, resolve(dist, '404.html'));
}).listen(port, () => console.log(`dist served like Netlify on http://localhost:${port}`));
