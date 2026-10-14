// Renders the social-share images (public/og/*.png, 1200×630) and app icons
// (favicon-32, apple-touch-icon, icon-192/512, logo) with a local headless
// Chrome or Edge. Run by hand after changing the brand or the page headlines:
//
//   node scripts/make-og-images.mjs
//
// The images carry no version numbers on purpose, so they never go stale.
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const out = resolve(root, 'public');
const asset = (p) => pathToFileURL(resolve(root, p)).href;
const font = (family, weight) =>
  asset(`node_modules/@fontsource/${family}/files/${family}-latin-${weight}-normal.woff2`);

const browser = [
  process.env.CHROME_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
].find((p) => p && existsSync(p));
if (!browser) throw new Error('No Chrome/Edge found. Set CHROME_PATH.');

const base = `
  @font-face { font-family: Sora; font-weight: 600; src: url(${font('sora', 600)}); }
  @font-face { font-family: Sora; font-weight: 700; src: url(${font('sora', 700)}); }
  @font-face { font-family: Manrope; font-weight: 500; src: url(${font('manrope', 500)}); }
  @font-face { font-family: Manrope; font-weight: 700; src: url(${font('manrope', 700)}); }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { width: 100%; height: 100%; overflow: hidden; }
  body { font-family: Manrope, sans-serif; -webkit-font-smoothing: antialiased; }
`;

const mark = (color, size) =>
  `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none"><line x1="7" y1="3" x2="17" y2="21" stroke="${color}" stroke-width="2.25" stroke-linecap="round"/></svg>`;

const brandRow = (color) => `
  <div style="display:flex;align-items:center;gap:14px;color:${color}">
    ${mark(color, 34)}
    <span style="font-family:Sora;font-weight:600;font-size:21px;letter-spacing:.16em">LOCALHOUSELLM</span>
  </div>`;

const pages = {
  'og/default': `
    <body style="background:#f4f0ea;color:#1f1d1a;padding:72px 80px;display:flex;flex-direction:column;justify-content:space-between">
      ${brandRow('#1f1d1a')}
      <div>
        <h1 style="font-family:Sora;font-weight:600;font-size:76px;line-height:1.04;letter-spacing:-.035em;max-width:900px">Local-first AI that belongs to you.</h1>
        <p style="margin-top:26px;font-size:28px;color:#5d5850;max-width:880px;line-height:1.4">AI apps and infrastructure that run on your own PC.</p>
      </div>
      <div style="display:flex;align-items:center;gap:18px;font-size:22px;font-weight:700;color:#3d3a35">
        <img src="${asset('src/assets/anvira-notes/icon-anvira-notes.png')}" width="52" height="52" style="border-radius:14px">Anvira Notes
        <img src="${asset('src/assets/anvira/icon-anvira.png')}" width="52" height="52" style="border-radius:14px;margin-left:18px">Anvira
        <span style="margin-left:auto;color:#5f7552">localhousellm.com</span>
      </div>
    </body>`,

  'og/anvira-notes': `
    <body style="background:#fffdf9;color:#16131f;position:relative">
      <div style="position:absolute;width:520px;height:520px;border-radius:50%;left:-140px;top:-160px;background:#c9b8ff;filter:blur(90px);opacity:.7"></div>
      <div style="position:absolute;width:460px;height:460px;border-radius:50%;right:-120px;bottom:-200px;background:#ffc4dd;filter:blur(90px);opacity:.8"></div>
      <div style="position:absolute;inset:0;padding:66px 72px;display:flex;flex-direction:column">
        <div style="display:flex;align-items:center;gap:18px">
          <img src="${asset('src/assets/anvira-notes/icon-anvira-notes.png')}" width="72" height="72" style="border-radius:20px;box-shadow:0 16px 30px -14px rgba(124,92,255,.7)">
          <span style="font-family:Sora;font-weight:700;font-size:36px;letter-spacing:-.02em">Anvira Notes</span>
        </div>
        <h1 style="margin-top:44px;font-family:Sora;font-weight:700;font-size:84px;line-height:1;letter-spacing:-.05em">
          Write it <span style="background:#ffc21a;padding:0 10px;border-radius:12px">once.</span><br>
          Learn it <span style="background:#7c5cff;color:#fff;padding:0 10px;border-radius:12px">for good.</span>
        </h1>
        <p style="margin-top:34px;font-size:28px;font-weight:500;color:#4b4759;max-width:980px;line-height:1.35">Free notes &amp; study app for Windows — flashcards, graded mock exams and study groups, with private AI on your PC.</p>
        <div style="margin-top:auto;display:flex;gap:10px;font-size:19px;font-weight:700">
          <span style="padding:9px 18px;border-radius:99px;background:#efeaff;color:#5a3ee6">Notion-style pages</span>
          <span style="padding:9px 18px;border-radius:99px;background:#e2f7ea;color:#0d8550">Mock exams &amp; grades</span>
          <span style="padding:9px 18px;border-radius:99px;background:#ffe6f1;color:#d02f76">FSRS flashcards</span>
          <span style="padding:9px 18px;border-radius:99px;background:#e4f0ff;color:#0f69d4">Google Docs &amp; Notion sync</span>
        </div>
      </div>
    </body>`,

  'og/anvira': `
    <body style="background:#050507;color:#fff;position:relative">
      <div style="position:absolute;width:760px;height:760px;border-radius:50%;right:-260px;top:-300px;background:radial-gradient(circle,rgba(111,155,255,.55),transparent 65%)"></div>
      <div style="position:absolute;width:620px;height:620px;border-radius:50%;left:-260px;bottom:-360px;background:radial-gradient(circle,rgba(143,111,255,.45),transparent 65%)"></div>
      <div style="position:absolute;inset:0;padding:66px 72px;display:flex;gap:48px">
        <div style="flex:1;display:flex;flex-direction:column">
          <div style="display:flex;align-items:center;gap:18px">
            <img src="${asset('src/assets/anvira/icon-anvira.png')}" width="72" height="72" style="border-radius:20px">
            <span style="font-family:Sora;font-weight:600;font-size:36px">Anvira</span>
          </div>
          <h1 style="margin-top:46px;font-family:Sora;font-weight:600;font-size:64px;line-height:1.02;letter-spacing:-.04em">Small models.<br><span style="background:linear-gradient(90deg,#6f9bff,#b59bff);-webkit-background-clip:text;color:transparent">Serious workflows.</span></h1>
          <p style="margin-top:26px;font-size:24px;line-height:1.4;color:rgba(255,255,255,.66)">Free local AI chat &amp; coding agent for Windows. Every change is a diff you can undo.</p>
          <p style="margin-top:auto;font-size:20px;font-weight:700;color:rgba(255,255,255,.5)">by LocalHouseLLM · localhousellm.com</p>
        </div>
        <div style="width:500px;align-self:center;border-radius:18px;overflow:hidden;box-shadow:0 40px 80px -30px rgba(0,0,0,.9),0 0 0 1px rgba(255,255,255,.12)">
          <img src="${asset('src/assets/anvira/01-conversation-and-agent-run.png')}" style="display:block;width:100%">
        </div>
      </div>
    </body>`,

  'og/releases': `
    <body style="background:#f4f0ea;color:#1f1d1a;padding:72px 80px;display:flex;flex-direction:column">
      ${brandRow('#1f1d1a')}
      <h1 style="margin-top:58px;font-family:Sora;font-weight:600;font-size:96px;line-height:1;letter-spacing:-.045em">Release notes</h1>
      <p style="margin-top:24px;font-size:30px;color:#5d5850">Everything new in every version, newest first.</p>
      <div style="margin-top:auto;display:flex;gap:16px">
        ${[
          ['src/assets/anvira-notes/icon-anvira-notes.png', 'Anvira Notes'],
          ['src/assets/anvira/icon-anvira.png', 'Anvira'],
        ]
          .map(
            ([icon, name]) =>
              `<div style="display:flex;align-items:center;gap:14px;padding:14px 22px 14px 14px;border-radius:20px;background:#fbf9f5;border:1px solid #e3ddd3;font-size:24px;font-weight:700"><img src="${asset(icon)}" width="48" height="48" style="border-radius:13px">${name}</div>`,
          )
          .join('')}
        <div style="display:flex;align-items:center;gap:14px;padding:14px 22px 14px 14px;border-radius:20px;background:#fbf9f5;border:1px solid #e3ddd3;font-size:24px;font-weight:700"><span style="display:grid;place-items:center;width:48px;height:48px;border-radius:13px;background:#1f1d1a;color:#f4f0ea;font-family:Sora;font-size:22px">R</span>Anvira Runtime</div>
      </div>
    </body>`,
};

const icon = (size, radius) => `
  <body style="background:transparent">
    <div style="width:${size}px;height:${size}px;border-radius:${radius}px;background:#1f1d1a;display:grid;place-items:center">
      ${mark('#f4f0ea', Math.round(size * 0.78))}
    </div>
  </body>`;

const icons = {
  'favicon-32': [32, icon(32, 7)],
  'apple-touch-icon': [180, icon(180, 0)],
  'icon-192': [192, icon(192, 0)],
  'icon-512': [512, icon(512, 0)],
  logo: [512, icon(512, 0)],
};

const work = mkdtempSync(join(tmpdir(), 'lh-og-'));
const shoot = (name, html, w, h) => {
  const file = join(work, `${name.replace(/\//g, '_')}.html`);
  writeFileSync(file, `<!doctype html><html><head><meta charset="utf-8"><style>${base}</style></head>${html}</html>`);
  const target = resolve(out, `${name}.png`);
  mkdirSync(dirname(target), { recursive: true });
  execFileSync(browser, [
    '--headless=new',
    '--disable-gpu',
    '--hide-scrollbars',
    '--allow-file-access-from-files',
    '--force-device-scale-factor=1',
    '--default-background-color=00000000',
    '--virtual-time-budget=3000',
    `--window-size=${w},${h}`,
    `--screenshot=${target}`,
    pathToFileURL(file).href,
  ]);
  console.log(`  ${name}.png  ${w}×${h}`);
};

try {
  for (const [name, html] of Object.entries(pages)) shoot(name, html, 1200, 630);
  for (const [name, [size, html]] of Object.entries(icons)) shoot(name, html, size, size);
} finally {
  rmSync(work, { recursive: true, force: true });
}
