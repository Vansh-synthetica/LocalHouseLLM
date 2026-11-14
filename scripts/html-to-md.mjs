// Turns a prerendered page into clean Markdown for AI assistants and LLM crawlers
// (served as /<page>.md and gathered into /llms-full.txt). Dependency-free on
// purpose: it only has to handle the markup our own components produce.

const ENTITIES = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', rsquo: '’', lsquo: '‘', ldquo: '“', rdquo: '”', mdash: '—', ndash: '–', hellip: '…', middot: '·', rarr: '→', larr: '←', times: '×', copy: '©' };
const decode = (s) =>
  s
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&([a-z]+);/gi, (m, n) => ENTITIES[n.toLowerCase()] ?? m);

const strip = (s) => decode(s.replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ').trim();

/**
 * @param {string} html  the rendered app HTML (whole body)
 * @param {string} site  absolute origin, for making links absolute
 */
export const htmlToMarkdown = (html, site) => {
  let s = html.match(/<main[^>]*>([\s\S]*)<\/main>/)?.[1] ?? html;

  // Drop things that are not reading content.
  s = s
    .replace(/<(script|style|noscript|template|svg|video|canvas|form|button|select|textarea)\b[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<(img|input|source|track)\b[^>]*>/gi, (m) => {
      const alt = m.match(/\balt="([^"]+)"/)?.[1];
      return alt ? ` ${decode(alt)} ` : ' ';
    });

  // Code blocks first, so their content is not touched by inline rules.
  const blocks = [];
  s = s.replace(/<pre[^>]*>([\s\S]*?)<\/pre>/gi, (_, inner) => {
    blocks.push('\n\n```\n' + decode(inner.replace(/<[^>]+>/g, '')).trim() + '\n```\n\n');
    return `\u0000${blocks.length - 1}\u0000`;
  });

  s = s
    .replace(/<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/gi, (_, n, inner) => `\n\n${'#'.repeat(Number(n))} ${strip(inner)}\n\n`)
    .replace(/<a\b[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi, (_, href, inner) => {
      const text = strip(inner);
      if (!text) return ' ';
      if (!href || href.startsWith('#') || href.startsWith('javascript:')) return ` ${text} `;
      const abs = href.startsWith('/') ? site + href : href;
      return ` [${text}](${abs}) `;
    })
    .replace(/<(strong|b)\b[^>]*>([\s\S]*?)<\/\1>/gi, (_, __, inner) => {
      const t = strip(inner);
      return t ? ` **${t}** ` : ' ';
    })
    .replace(/<code\b[^>]*>([\s\S]*?)<\/code>/gi, (_, inner) => ` \`${strip(inner)}\` `)
    .replace(/<li\b[^>]*>/gi, '\n- ')
    .replace(/<(dt)\b[^>]*>([\s\S]*?)<\/dt>/gi, (_, __, inner) => `\n- **${strip(inner)}:** `)
    .replace(/<\/(p|div|section|article|header|footer|ul|ol|dl|dd|blockquote|figure|figcaption|table|tr|details|summary|aside)>/gi, '\n')
    .replace(/<(br|hr)\b[^>]*>/gi, '\n')
    .replace(/<(td|th)\b[^>]*>/gi, ' | ')
    .replace(/<[^>]+>/g, ' ');

  s = decode(s)
    .replace(/\u0000(\d+)\u0000/g, (_, i) => blocks[Number(i)])
    .split('\n')
    .map((line) => line.replace(/[ \t ]+/g, ' ').replace(/ ([,.;:!?])/g, '$1').trim())
    .join('\n')
    // de-duplicate consecutive identical lines (marquees, repeated labels)
    .replace(/^(.+)(\n\1)+$/gm, '$1')
    .replace(/^- *$/gm, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
  return s + '\n';
};
