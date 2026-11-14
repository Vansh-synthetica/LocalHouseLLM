// Shared by scripts/sync-releases.mjs (build time) and src/data/liveReleases.ts
// (in the browser): turns a GitHub release into the shape the site renders —
// version, date, installer, SHA-256, notes (markdown → HTML) and highlights.
// Plain JavaScript with no imports so Node can run it without a build step.

export const PRODUCTS = [
  { id: 'anvira-notes', name: 'Anvira Notes', repo: 'Vansh-synthetica/Anvira-Notes-release', page: '/anvira-notes', installer: /\.exe$/i },
  { id: 'anvira', name: 'Anvira', repo: 'Vansh-synthetica/Anvira-release', page: '/anvira', installer: /\.exe$/i },
  { id: 'anvira-runtime', name: 'Anvira Runtime', repo: 'Vansh-synthetica/Anvira-Runtime', page: '/anvira#runtime', installer: /win-x64\.zip$/i },
  // The Android branch of Anvira Notes, published as signed .apk files (no .exe assets).
  { id: 'anvira-notes-android', name: 'Anvira Notes for Android', repo: 'Vansh-synthetica/Anvira-Notes-Android-release', page: '/anvira-notes#mobile', installer: /\.apk$/i },
];

// Sections that only make sense on GitHub ("download … below", upload checklists).
// The site shows its own download row with the installer, size and SHA-256 instead.
const DROP_SECTIONS = /^(update|install|install \/ update|checksum|checksums|verify the download|packages)$/i;

/* ------------------------------------------------------------------ */
/* Markdown → HTML for release notes (headings, lists, code, emphasis) */
/* ------------------------------------------------------------------ */

const MOJIBAKE = [
  ['ΓÇö', '—'], ['ΓÇô', '–'], ['ΓÇÖ', '’'], ['ΓÇÿ', '‘'], ['ΓÇ£', '“'], ['ΓÇ¥', '”'],
  ['ΓÇª', '…'], ['ΓåÆ', '→'], ['ΓåÉ', '←'], ['┬╖', '·'], ['┬á', ' '], ['ΓÇó', '•'],
];

export const repair = (body) => {
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

export const toNotes = (md) =>
  sections(md)
    .map((sec, idx) => ({ title: isNameHeading(sec.title, idx) ? '' : sec.title, html: renderBlock(sec.lines) }))
    .filter((sec) => sec.html);

/** Bold lead-ins of top-level bullets ("**Messages**", "**Remember me works.**"). */
export const highlightsOf = (md) => {
  const out = [];
  for (const sec of sections(md)) {
    for (const line of sec.lines) {
      const m = line.match(/^[-*+]\s+\*\*([^*]+?)\*\*/);
      if (m) out.push({ kind: sec.title || 'Notes', text: m[1].replace(/[.:]\s*$/, '').trim() });
    }
  }
  return out;
};

export const summaryOf = (notes) => {
  const firstPara = notes.map((n) => n.html).join('').match(/<(?:p|li)>(.*?)(?:<\/p>|<\/li>|<ul>)/);
  const text = stripTags(firstPara?.[1] ?? '').replace(/\s+/g, ' ').trim();
  return text.length > 220 ? `${text.slice(0, 217).replace(/\s+\S*$/, '')}…` : text;
};

/* ------------------------------------------------------------------ */

export const versionOf = (tag) => tag.replace(/^v/i, '');

export const shape = (product, r, latestTag) => {
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
