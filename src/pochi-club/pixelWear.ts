/**
 * What the blob wears, as pixel art on the mascot's own 32-square grid (src/components/pochi/pochiData.ts), so the
 * outfits look like they belong on Pochi. The cat wears the drawn set in art.ts (WEAR).
 *
 * Each item is a few sprites: rows of characters, one per pixel ('.' is empty), coloured by the item's palette and
 * stacked at a depth. Grid facts used throughout: the head's top row is y 4 (x 10–21), the body is widest at y 9–12
 * (x 4–27), the eyes are at y 10–12 (x 10–12 and 19–21), the fins at x 1–3 / 28–30, the feet stand on y 24.
 *
 * SHARED FILE: identical copies in Anvira Notes (src/pochi-club/) and the website (LocalHouseLLM src/pochi-club/).
 */
import type { Depth, Layers } from './art'

/** The grid placed in art.ts's 200 × 165 space (the inverse of PLACE). */
const PXT = `transform="scale(${(1 / 0.23).toFixed(5)}) translate(7 8)"`

interface Sprite {
  /** top-left pixel */
  at: [number, number]
  rows: string[]
  pal: Record<string, string>
  depth: Depth
  /** idle motion (pochi-art.css); `pa-px` makes it turn and scale about the sprite itself */
  cls?: string
  /** a little delay for the motion, in seconds */
  wait?: number
}

interface PixelItem {
  parts: Sprite[]
  /** shown on Pochi in shop cards: things that only make sense worn */
  model?: boolean
}

/** A sprite as one path per colour, rows merged into runs (so no hairline seams between pixels). */
function spriteMarkup(s: Sprite): string {
  const runs: Record<string, string> = {}
  s.rows.forEach((row, j) => {
    let i = 0
    while (i < row.length) {
      const ch = row[i]
      if (ch === '.' || ch === ' ' || !s.pal[ch]) {
        i++
        continue
      }
      let k = i
      while (k < row.length && row[k] === ch) k++
      const x = s.at[0] + i
      const y = s.at[1] + j
      runs[ch] = (runs[ch] ?? '') + `M${x} ${y}H${x + k - i}V${y + 1}H${x}Z`
      i = k
    }
  })
  const paths = Object.keys(runs).map((ch) => `<path fill="${s.pal[ch]}" d="${runs[ch]}"/>`).join('')
  const style = s.wait ? ` style="animation-delay:${s.wait}s"` : ''
  return `<g class="pa-pop"><g${s.cls ? ` class="${s.cls}"` : ''}${style}><g ${PXT}>${paths}</g></g></g>`
}

/** The same sprite on Pochi's other side (the grid mirrors about x = 15.5 + 0.5). */
function mirror(s: Sprite): Sprite {
  const w = Math.max(...s.rows.map((r) => r.length))
  return { ...s, at: [32 - s.at[0] - w, s.at[1]], rows: s.rows.map((r) => r.padEnd(w, '.').split('').reverse().join('')) }
}

/** Aurora ribbons: three stepped waves of colour behind Pochi's head. */
function auroraRows(): string[] {
  const W = 46
  const rows = Array.from({ length: 12 }, () => Array<string>(W).fill('.'))
  for (let i = 0; i < W; i++) {
    const y = Math.round(4 + 2.6 * Math.sin(i / 5.2))
    const bands: [number, string][] = [[0, 't'], [1, 't'], [2, 'b'], [3, 'b'], [4, 'p']]
    for (const [d, ch] of bands) if (y + d >= 0 && y + d < 12) rows[y + d][i] = ch
    if ((i * 7) % 11 === 0 && y - 1 >= 0) rows[y - 1][i] = 'w'
  }
  return rows.map((r) => r.join(''))
}

export const PIXEL_WEAR: Record<string, PixelItem> = {
  'sprout-pin': {
    parts: [{
      at: [16, -3], depth: 'head', cls: 'pa-sway pa-px top',
      rows: ['hL.....GG', 'LLL...GGG', '.LLLs.GGg', '..Ls.gGg.', '....sg...', '....s....', '...yYy...', '...yyy...'],
      pal: { h: '#d8f5c8', L: '#9ad98a', G: '#6cc070', g: '#3f8a4c', s: '#4f9a58', Y: '#f6d36b', y: '#c99a35' },
    }],
  },
  'berry-beret': {
    parts: [{
      at: [6, 1], depth: 'head',
      rows: ['........gGg........', '.....ooRRgRRoo.....', '...oRRRhRRRRRRRo...', '..oRRhRRRsRRRsRRRo.', '.oRRRRRsRRRRRRRRsRo', '.ooRRsRRRRRsRRRRRoo', '..ooooooooooooooo..'],
      pal: { R: '#ec5d6f', h: '#ff9aa5', s: '#ffe0a0', o: '#b13a50', g: '#4f9a58', G: '#7cc47f' },
    }],
  },
  'scholar-cap': {
    parts: [
      {
        at: [5, -2], depth: 'head',
        rows: ['..........oo..........', '.......ooNNNNoo.......', '....ooNNNNNNNNNNoo....', '.ooNNNNNNNNNNNNNNNNoo.', 'oNNNNNNNNNYNNNNNNNNNNo', '.ooNNNNNNNNYYYYYYYYYo.', '....oooNNNNNNNNooo....', '......oNNNNNNNNNNo....', '.....onnnnnnnnnnnno...'],
        pal: { N: '#3d4180', n: '#565cab', o: '#22254f', Y: '#f4c54f' },
      },
      { at: [25, 2], depth: 'head', cls: 'pa-sway pa-px top', rows: ['Y.', 'Y.', 'Y.', 'YY', 'yy'], pal: { Y: '#f4c54f', y: '#c8922c' } },
    ],
  },
  'star-headphones': {
    parts: [{
      at: [2, -1], depth: 'head',
      rows: [
        '........BBBBBBBBBBBB........', '......BBbbbbbbbbbbbbBB......', '.....Bb..............bB.....', '....Bb................bB....',
        '....B..................B....', '...B....................B...', '...B....................B...', '...B....................B...',
        '.oooo..................oooo.', 'oPPPPo................oPPPPo', 'oPhPPo................oPPhPo', 'oPPYPo................oPYPPo',
        'oPPPPo................oPPPPo', '.oooo..................oooo.',
      ],
      pal: { B: '#6e5bc9', b: '#9a88ea', o: '#4a3b8f', P: '#f2a6c4', h: '#ffd8e6', Y: '#ffe07a' },
    }],
  },
  'moon-ribbon': {
    parts: [{
      at: [17, 0], depth: 'head', cls: 'pa-bob',
      rows: ['.oo...oo.', 'oBBo.oBBo', 'oBbBoBbBo', 'oBBBYBBBo', '.oBBoBBo.', '..oB.Bo..', '..o...o..'],
      pal: { B: '#4f6fd1', b: '#8eaaf5', o: '#2c3f86', Y: '#ffd36b' },
    }],
  },
  'focus-frames': {
    model: true,
    parts: [{
      at: [5, 9], depth: 'face',
      rows: ['...ooooooo..ooooooo...', 'oooowLLLLoooowLLLLoooo', '...oLLLLLo..oLLLLLo...', '...oLLLLLo..oLLLLLo...', '...ooooooo..ooooooo...'],
      pal: { o: '#3a3348', L: 'rgba(255,255,255,0.22)', w: 'rgba(255,255,255,0.75)' },
    }],
  },
  'star-freckles': {
    model: true,
    parts: [{
      at: [6, 13], depth: 'face', cls: 'pa-shimmer',
      rows: ['..Y..............Y.', '.YYY............YYY', '..Y..y........y..Y.'],
      pal: { Y: '#f6c453', y: '#f9dc8c' },
    }],
  },
  'heart-blush': {
    model: true,
    parts: [{
      at: [5, 13], depth: 'face', cls: 'pa-pulse pa-px',
      rows: ['.P.P..............P.P', '.PPP..............PPP', '..P................P.'],
      pal: { P: '#f07fa0' },
    }],
  },
  'cozy-scarf': {
    model: true,
    parts: [{
      at: [5, 14], depth: 'body',
      rows: [
        '.oooooooooooooooooooo.', 'oRRrrRRrrRRrrRRrrRRrRo', 'oRRRRRRRRRRRRRRRRRRRRo', '.ooooooooooooooRrRooo.',
        '..............oRrRo...', '..............oRrRo...', '..............oRrRo...', '..............f.f.f...',
      ],
      pal: { R: '#e3685c', r: '#f6a184', o: '#a8413d', f: '#f6a184' },
    }],
  },
  'cloud-hoodie': {
    model: true,
    parts: [{
      at: [4, 13], depth: 'body',
      rows: [
        '.oWWWo............oWWWo.', 'oWWWWWWWWWWWzWWWWWWWWWWo', '.oWWWWWWWWWWzWWWWWWWWWo.', '.oWWWWWWWWWWzWWWWWWWWWo.',
        '.oWWWwwwwwwwzwwwwwwWWWo.', '..oWWwWWWWWWzWWWWWwWWo..', '..oWWwwwwwwwzwwwwwwWWo..', '...oWWWWWWWWzWWWWWWWo...',
        '....oooooooooooooooo....',
      ],
      pal: { W: '#eef3ff', w: '#d3def4', o: '#8ea3c9', z: '#9fb1d6' },
    }],
  },
  'jelly-raincoat': {
    model: true,
    parts: [{
      at: [4, 13], depth: 'body',
      rows: [
        '...oYYYo........oYYYo...', 'oYYYYYYYYYYYoYYYYYYYYYYo', '.oYYYYYYYYYYoBYYYYYYYYo.', '.oYYYYYYYYYYoYYYYYYYYYo.',
        '.oYYYYYYYYYYoBYYYYYYYYo.', '..oyYYYYYYYYoYYYYYYYyo..', '..oyYYYYYYYYoBYYYYYYyo..', '...oyyyyyyyyoyyyyyyyo...',
        '....oooooooooooooooo....',
      ],
      pal: { Y: '#f6cf4f', y: '#e0ae2f', o: '#a87a1c', B: '#5cc3d6' },
    }],
  },
  'bookworm-cape': {
    model: true,
    parts: [
      {
        at: [1, 12], depth: 'back',
        rows: [
          '...oCCCCCCCCCCCCCCCCCCCCCCo...', '..oCCCCCCCCCCCCCCCCCCCCCCCCo..', '..oCCCCCCCCCCCCCCCCCCCCCCCCo..', '..ocCCCCCCCCCCCCCCCCCCCCCCco..',
          '.ocCCCCCCCCCCCCCCCCCCCCCCCCco.', '.ocCCCCCCCCCCCCCCCCCCCCCCCCco.', '.ocCCCCCCCCCCCCCCCCCCCCCCCCco.', '.occCCCCCCCCCCCCCCCCCCCCCCcco.',
          '.occCCCCCCCCCCCCCCCCCCCCCCcco.', '.occCCCCCCCCCCCCCCCCCCCCCCcco.', '.occcCCCCCCCCCCCCCCCCCCCCccco.', '.ocococococococococococococo..',
        ],
        pal: { C: '#7b5cc9', c: '#5f45a6', o: '#3d2a75' },
      },
      { at: [7, 13], depth: 'body', rows: ['oPPPPPPPYYPPPPPPPo', '..ooooooYYoooooo..'], pal: { P: '#9a7de0', o: '#3d2a75', Y: '#f4c54f' } },
    ],
  },
  'mini-backpack': {
    model: true,
    parts: [
      {
        at: [24, 8], depth: 'back',
        rows: [
          '.......k.', '.......Y.', '.......Y.', '..oooo.Y.', '.o....oY.', 'oOOOOOOOo', 'oOhOOOOOo', 'oooooooOo',
          'oOOOOOOOo', 'oOOoooOOo', 'oOOoPoOOo', 'oOOoooOOo', 'oOOOOOOOo', '.ooooooo.',
        ],
        pal: { O: '#ef9a52', h: '#ffc68c', o: '#a85a24', P: '#ffe09a', k: '#f58fae', Y: '#f6cf4f' },
      },
      { at: [8, 9], depth: 'body', rows: ['s..............s', 's..............s', 's..............s', 's..............s', 's..............s', 's..............s', 'b..............b', 's..............s', 's..............s'], pal: { s: '#a85a24', b: '#f6cf4f' } },
    ],
  },
  'paper-wings': {
    model: true,
    parts: (() => {
      const left: Sprite = {
        at: [-8, 7], depth: 'back', cls: 'pa-bob',
        rows: ['oo.........', 'oPPo.......', 'oPPPPo.....', '.oPpPPPo...', '.oPPpPPPPo.', '..oPPpPPPPo', '..oPPPpppPo', '...oooooooo'],
        pal: { P: '#fbf4e2', p: '#d8c7a0', o: '#b7a57c' },
      }
      return [left, { ...mirror(left), wait: 0.4 }]
    })(),
  },
  'rocket-satchel': {
    parts: [
      {
        at: [-3, 5], depth: 'back', cls: 'pa-bob',
        rows: ['..r..', '.rRr.', '.WWW.', 'oWBWo', 'oWbWo', 'oWWWo', 'oWWWo', 'RoWoR', 'RR.RR'],
        pal: { R: '#e8574e', r: '#ff8a7a', W: '#eef1f6', o: '#9aa3b5', B: '#6cc6e6', b: '#3b8fb5' },
      },
      { at: [-3, 14], depth: 'back', cls: 'pa-flame pa-px', rows: ['.FfF.', '..F..', '..f..'], pal: { F: '#ffd25a', f: '#ff8d3a' } },
    ],
  },
  'bubble-halo': {
    model: true,
    parts: [
      { at: [9, -4], depth: 'front', cls: 'pa-bob', rows: ['..wooooooooo..', 'o............o', '..oooooooooo..'], pal: { o: '#9fd6f5', w: '#ffffff' } },
      { at: [4, -2], depth: 'front', cls: 'pa-rise', rows: ['.b.', 'b.b', '.b.'], pal: { b: '#bfe6fb' } },
      { at: [26, 1], depth: 'front', cls: 'pa-rise', wait: 1.4, rows: ['b'], pal: { b: '#bfe6fb' } },
    ],
  },
  'starlight-aura': {
    model: true,
    parts: [
      ...([[-3, 3, 0], [33, 5, 0.6], [-1, 18, 1.2], [32, 19, 1.8], [15, -6, 0.9]] as [number, number, number][]).map(([x, y, w]): Sprite => ({
        at: [x - 2, y - 2], depth: 'aura', cls: 'pa-pxtw', wait: w,
        rows: ['..Y..', '..y..', 'YyWyY', '..y..', '..Y..'], pal: { Y: '#f6c453', y: '#ffe7a0', W: '#fffbe8' },
      })),
      ...([[2, 0, 0.3], [29, 1, 1.5], [6, 21, 0.8], [26, 23, 2.1]] as [number, number, number][]).map(([x, y, w]): Sprite => ({
        at: [x, y], depth: 'front', cls: 'pa-pxtw', wait: w, rows: ['Y'], pal: { Y: '#f6c453' },
      })),
    ],
  },
  'aurora-orbit': {
    model: true,
    parts: [{
      at: [-7, -4], depth: 'aura', cls: 'pa-wave',
      rows: auroraRows(),
      pal: { t: 'rgba(125,217,189,0.85)', b: 'rgba(159,202,255,0.8)', p: 'rgba(230,169,221,0.75)', w: '#ffffff' },
    }],
  },
  'firefly-trail': {
    model: true,
    parts: ([[-3, 5, 'pa-fly'], [33, 3, 'pa-fly f1'], [34, 16, 'pa-fly f2'], [-5, 17, 'pa-fly f1'], [24, -4, 'pa-fly f2']] as [number, number, string][]).map(([x, y, c], i): Sprite => ({
      at: [x, y], depth: 'front', cls: c, wait: i * 0.5,
      rows: ['.g.', 'gYg', '.g.'], pal: { Y: i % 2 ? '#c4f5b0' : '#ffe27a', g: i % 2 ? 'rgba(196,245,176,0.4)' : 'rgba(255,226,122,0.4)' },
    })),
  },
  'moon-jelly-crown': {
    parts: [{
      at: [9, -3], depth: 'head', cls: 'pa-bob',
      rows: ['....oooooo....', '..ooJJjJJJoo..', '.oJJjJJJJJJJo.', 'oJJJJJMJJJJJJo', 'oJJJJMMJJJJJJo', 'oooooooooooooo', '.J.J.J..J.J.J.', '.j.j......j.j.'],
      pal: { J: '#a9e3f2', j: '#e8f8fd', o: '#5fb3cf', M: '#ffd76b' },
    }],
  },
}

/** What Pochi wears, by depth, for drawPochi's blob. */
export function pixelLayersFor(ids: Iterable<string>, order: string[]): Layers {
  const worn = new Set(ids)
  const L: Layers = { aura: '', back: '', body: '', face: '', head: '', front: '', defs: '' }
  for (const id of order) {
    const item = PIXEL_WEAR[id]
    if (!item || !worn.has(id)) continue
    for (const s of item.parts) L[s.depth] += spriteMarkup(s)
  }
  return L
}

/**
 * Where to zoom for an item's shop card, in art.ts's 200 × 165 space: the item alone, or (`withPochi`) the item on
 * Pochi, who is drawn 12 lower there.
 */
export function pixelBox(id: string, withPochi: boolean): [number, number, number, number] | undefined {
  const item = PIXEL_WEAR[id]
  if (!item) return undefined
  let [x0, y0, x1, y1] = withPochi ? [1, 1, 31, 24] : [Infinity, Infinity, -Infinity, -Infinity]
  for (const s of item.parts) {
    x0 = Math.min(x0, s.at[0])
    y0 = Math.min(y0, s.at[1])
    x1 = Math.max(x1, s.at[0] + Math.max(...s.rows.map((r) => r.length)))
    y1 = Math.max(y1, s.at[1] + s.rows.length)
  }
  const pad = 1.5
  const dy = withPochi ? 12 : 0
  return [(x0 - pad + 7) / 0.23, (y0 - pad + 8) / 0.23 + dy, (x1 - x0 + 2 * pad) / 0.23, (y1 - y0 + 2 * pad) / 0.23]
}
