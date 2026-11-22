/**
 * Pochi's art: a soft, round, sitting cat drawn in vector (shaded fur, glossy eyes, whiskers, a curling tail), every
 * wearable, and the four homes. Everything is drawn in a 200 × 165 space that sits exactly on the club's VIEWBOX
 * ("-7 -8 46 38"), so every host that sizes Pochi by VIEWBOX keeps working.
 *
 * Gradient ids are made from what is drawn (`uid`), so two Pochis on one page never borrow each other's colours.
 * Idle life (breathing, blinking, a swaying tail, an ear twitch) and each item's own little motion are CSS on the
 * `pa-*` classes (pochi-club.css), all off under prefers-reduced-motion.
 *
 * SHARED FILE: identical copies in Anvira Notes (src/pochi-club/) and the website (LocalHouseLLM src/pochi-club/).
 * ES2020: no replaceAll / .at().
 */

// ── colour ─────────────────────────────────────────────────────────────────────────────────────────────────────────

function rgb(c: string): [number, number, number] {
  let h = c.replace('#', '')
  if (h.length === 3) h = h.split('').map((x) => x + x).join('')
  const n = parseInt(h, 16) || 0
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}
/** a + (b − a) · t, as #rrggbb */
export function mix(a: string, b: string, t: number): string {
  const A = rgb(a)
  const B = rgb(b)
  return '#' + A.map((v, i) => Math.round(v + (B[i] - v) * t).toString(16).padStart(2, '0')).join('')
}

export interface Fur {
  base: string
  light: string
  hi: string
  shade: string
  deep: string
  belly: string
}
export function furOf(color: string): Fur {
  return {
    base: color,
    light: mix(color, '#ffffff', 0.45),
    hi: mix(color, '#ffffff', 0.78),
    shade: mix(mix(color, '#000000', 0.18), '#4b3870', 0.18),
    deep: mix(mix(color, '#000000', 0.58), '#30224a', 0.3),
    belly: mix(color, '#fffaf2', 0.72),
  }
}

/** A short id from a string (djb2), for gradient ids. */
export function uid(s: string): string {
  let h = 5381
  for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) | 0
  return 'pa' + (h >>> 0).toString(36)
}

/** The 200 × 165 drawing space, placed on VIEWBOX "-7 -8 46 38". */
export const ART_W = 200
export const ART_H = 165
export const PLACE = 'translate(-7 -8) scale(0.23)'

// ── Pochi ──────────────────────────────────────────────────────────────────────────────────────────────────────────

const EYE_L = 80
const EYE_R = 120
const EYE_Y = 84
const INK = '#2a2036'
const MOUTH = '#6b2b45'

const HEAD = 'M100 34C128 34 150 50 152 76C153 87 151 95 147 100L153 104L144 106C135 116 119 121 100 121C81 121 65 116 56 106L47 104L53 100C49 95 47 87 48 76C50 50 72 34 100 34Z'
const BODY = 'M60 128C58 105 75 97 100 97C125 97 142 105 140 128C139 146 124 153 100 153C76 153 61 146 60 128Z'
const EAR_L = 'M51 68C48 48 52 30 59 20C64 18 79 29 91 40Z'
const EAR_R = 'M149 68C152 48 148 30 141 20C136 18 121 29 109 40Z'
const EAR_IN_L = 'M57 58C56 45 58 34 62 28C66 29 74 35 81 42Z'
const EAR_IN_R = 'M143 58C144 45 142 34 138 28C134 29 126 35 119 42Z'
const TAIL = 'M134 141C158 145 174 128 168 106C164 94 171 85 180 89'

function openEye(cx: number, u: string, r = 1): string {
  const rx = 9.5 * r
  const ry = 11.5 * r
  return (
    `<ellipse cx="${cx}" cy="${EYE_Y}" rx="${rx}" ry="${ry}" fill="url(#${u}e)"/>` +
    `<g class="pa-look"><ellipse cx="${cx}" cy="${EYE_Y + 3.6 * r}" rx="${5.6 * r}" ry="${5 * r}" fill="#8b77c4" opacity=".42"/>` +
    `<circle cx="${cx - 3.2 * r}" cy="${EYE_Y - 4.6 * r}" r="${3.5 * r}" fill="#fff"/>` +
    `<circle cx="${cx + 3.6 * r}" cy="${EYE_Y + 4.2 * r}" r="${1.5 * r}" fill="#fff" opacity=".85"/></g>`
  )
}
function sparkleEye(cx: number, u: string): string {
  const s = (x: number, y: number, k: number) => `<path d="M${x} ${y - 4.6 * k}Q${x + 0.9 * k} ${y - 0.9 * k} ${x + 4.6 * k} ${y}Q${x + 0.9 * k} ${y + 0.9 * k} ${x} ${y + 4.6 * k}Q${x - 0.9 * k} ${y + 0.9 * k} ${x - 4.6 * k} ${y}Q${x - 0.9 * k} ${y - 0.9 * k} ${x} ${y - 4.6 * k}Z" fill="#fff"/>`
  return `<ellipse cx="${cx}" cy="${EYE_Y}" rx="10.4" ry="12.4" fill="url(#${u}e)"/><g class="pa-look">${s(cx - 2.6, EYE_Y - 3.8, 1)}<circle cx="${cx + 3.8}" cy="${EYE_Y + 4.6}" r="1.7" fill="#fff" opacity=".9"/></g>`
}
const arcUp = (cx: number) => `<path d="M${cx - 9} ${EYE_Y + 3}Q${cx} ${EYE_Y - 8} ${cx + 9} ${EYE_Y + 3}" fill="none" stroke="${INK}" stroke-width="3.2" stroke-linecap="round"/>`
const arcDown = (cx: number) => `<path d="M${cx - 9} ${EYE_Y}Q${cx} ${EYE_Y + 7} ${cx + 9} ${EYE_Y}" fill="none" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>`
const heartEye = (cx: number) =>
  `<path d="M${cx} ${EYE_Y + 9}C${cx - 13} ${EYE_Y} ${cx - 8} ${EYE_Y - 11} ${cx} ${EYE_Y - 4}C${cx + 8} ${EYE_Y - 11} ${cx + 13} ${EYE_Y} ${cx} ${EYE_Y + 9}Z" fill="#f0628f"/><ellipse cx="${cx - 4}" cy="${EYE_Y - 3}" rx="2.4" ry="1.6" fill="#fff" opacity=".85" transform="rotate(-30 ${cx - 4} ${EYE_Y - 3})"/>`

const M_OMEGA = `<path d="M100 99.6V102M93.5 102.2Q96.8 105.9 100 102.2Q103.2 105.9 106.5 102.2" fill="none" stroke="${MOUTH}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>`
const M_SMILE = `<path d="M92.5 101.4Q100 111.5 107.5 101.4Q100 103.8 92.5 101.4Z" fill="${MOUTH}"/><path d="M96.3 105.9Q100 103.3 103.7 105.9Q100 108.5 96.3 105.9Z" fill="#f08aa5"/>`
const M_O = `<ellipse cx="100" cy="104.2" rx="2.7" ry="3.1" fill="${MOUTH}"/>`
const M_FLAT = `<path d="M95 103.6Q97.5 102.2 100 103.6T105 103.6" fill="none" stroke="${MOUTH}" stroke-width="1.8" stroke-linecap="round"/>`
const M_SMIRK = `<path d="M94 102Q100 106.5 106.5 100.8" fill="none" stroke="${MOUTH}" stroke-width="1.9" stroke-linecap="round"/>`
const twinkle = (x: number, y: number, k: number, d: number) =>
  `<path class="pa-twinkle" style="animation-delay:${d}s" d="M${x} ${y - 6 * k}Q${x + 1.2 * k} ${y - 1.2 * k} ${x + 6 * k} ${y}Q${x + 1.2 * k} ${y + 1.2 * k} ${x} ${y + 6 * k}Q${x - 1.2 * k} ${y + 1.2 * k} ${x - 6 * k} ${y}Q${x - 1.2 * k} ${y - 1.2 * k} ${x} ${y - 6 * k}Z" fill="#f6c453"/>`

/** Eyes and mouth for a mood. Open eyes blink and follow the pointer; closed ones don't. */
export function face(mood: string, u: string): string {
  const eyes = (inner: string, blinks = true, extra = '') => `<g class="pa-eyes${blinks ? ' pa-blinks' : ''}"><g class="pa-glance">${extra ? `<g transform="${extra}">${inner}</g>` : inner}</g></g>`
  switch (mood) {
    case 'happy':
      return eyes(openEye(EYE_L, u) + openEye(EYE_R, u)) + M_SMILE
    case 'excited':
      return eyes(sparkleEye(EYE_L, u) + sparkleEye(EYE_R, u)) + M_SMILE + twinkle(46, 52, 1, 0) + twinkle(156, 44, 0.8, 0.6)
    case 'proud':
      return eyes(arcUp(EYE_L) + arcUp(EYE_R), false) + M_SMIRK
    case 'curious':
      return eyes(openEye(EYE_L, u, 1.08) + openEye(EYE_R, u, 0.98), true, 'translate(1.5 -1.5)') + M_O
    case 'thinking':
      return eyes(openEye(EYE_L, u, 0.95) + openEye(EYE_R, u, 0.95), true, 'translate(-2.6 -3)') + M_FLAT
    case 'sleepy':
      return eyes(arcDown(EYE_L) + arcDown(EYE_R), false) + M_O + `<g class="pa-zzz" fill="none" stroke="${INK}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" opacity=".55"><path d="M150 50h7l-7 8h7"/><path d="M162 36h5l-5 6h5" stroke-width="1.6"/></g>`
    case 'love':
      return eyes(heartEye(EYE_L) + heartEye(EYE_R), false) + M_SMILE
    default:
      return eyes(openEye(EYE_L, u) + openEye(EYE_R, u)) + M_OMEGA
  }
}


/**
 * The blob is Pochi itself: the mascot's own pixel art (src/components/pochi/pochiData.ts), pixel for pixel, on its
 * 32-square grid. `PXT` puts that grid into this 200 × 165 space (it is the inverse of PLACE), so worn items line up.
 */
const PXT = `transform="scale(${(1 / 0.23).toFixed(5)}) translate(7 8)"`
/** Inclusive pixel boxes [x1, y1, x2, y2], as pochiData's rect(). */
type Run = [number, number, number, number]
/** Pixel boxes as one path in one colour (one path, so there are no hairline seams between pixels). */
function pix(runs: Run[], fill: string): string {
  return `<path ${PXT} fill="${fill}" d="${runs.map(([a, b, c, d]) => `M${a} ${b}H${c + 1}V${d + 1}H${a}Z`).join('')}"/>`
}
const plusRuns = (x: number, y: number, s = 2): Run[] => [[x - s, y, x + s, y], [x, y - s, x, y + s]]
const PX_ANTENNA: Run[] = [[14, 2, 17, 2], [15, 1, 16, 3]]
const PX_BODY: Run[] = [
  [10, 4, 21, 4], [8, 5, 23, 5], [7, 6, 24, 6], [6, 7, 25, 7], [5, 8, 26, 8], [4, 9, 27, 12], [5, 13, 26, 14],
  [6, 15, 25, 17], [7, 18, 24, 19], [8, 20, 23, 20], [9, 21, 22, 21],
]
const PX_FEET: Run[] = [[10, 22, 12, 23], [15, 22, 17, 23], [20, 22, 22, 23]]
const PX_WING_L: Run[] = [[2, 10, 3, 13], [1, 11, 1, 12]]
const PX_WING_R: Run[] = [[28, 10, 29, 13], [30, 11, 30, 12]]
const PX_INK = '#1E1E1E'
const PX_BLUSH = '#D4A5FF'
const PX_EYES: Run[] = [[10, 10, 12, 12], [19, 10, 21, 12]]
const SPARKS_4: [number, number][] = [[6, 2], [25, 2], [2, 7], [29, 7]]
const SPARKS_6: [number, number][] = [[5, 0], [26, 0], [1, 5], [30, 5], [3, 15], [28, 15]]

/** The mascot's face for a mood: its eyes, any blush or thought dots, and which + sparkles float around it. */
function pixelFace(mood: string, fur: string): { eyes: string; extra: string; sparks: [number, number][] } {
  const open = (runs: Run[]) => `<g class="pa-eyes pa-blinks"><g class="pa-glance"><g class="pa-look">${pix(runs, PX_INK)}</g></g></g>`
  const shut = (runs: Run[]) => `<g class="pa-eyes"><g class="pa-glance">${pix(runs, PX_INK)}</g></g>`
  const dots = (runs: Run[]) => runs.map((r, i) => `<g class="pa-think" style="animation-delay:${(i * 0.45).toFixed(2)}s">${pix([r], fur)}</g>`).join('')
  switch (mood) {
    case 'happy':
      return { eyes: shut([[10, 10, 12, 10], [19, 10, 21, 10], [9, 11, 9, 11], [13, 11, 13, 11], [18, 11, 18, 11], [22, 11, 22, 11]]), extra: '', sparks: SPARKS_4 }
    case 'thinking':
      return { eyes: open([[10, 10, 12, 12], [19, 9, 21, 11]]), extra: dots([[23, 5, 23, 5], [25, 2, 26, 3], [28, -2, 30, 0]]), sparks: [] }
    case 'excited':
      return { eyes: shut([[9, 10, 13, 11], [18, 10, 22, 11]]), extra: '', sparks: SPARKS_6 }
    case 'proud':
      return { eyes: shut([[9, 10, 13, 11], [18, 10, 22, 11]]), extra: pix([[6, 13, 8, 14], [23, 13, 25, 14]], PX_BLUSH), sparks: SPARKS_4 }
    case 'sleepy':
      return { eyes: shut([[9, 11, 13, 11], [18, 11, 22, 11]]), extra: dots([[24, 4, 24, 4], [26, 1, 27, 2]]), sparks: [] }
    case 'curious':
      return { eyes: open([[9, 10, 12, 13], [19, 9, 22, 13]]), extra: '', sparks: [[6, 2], [25, 2]] }
    case 'love':
      return { eyes: `<g class="pa-eyes"><g class="pa-glance"><path ${PXT} fill="#ed83a8" d="M8 11c0-2 3-3 4-1 1-2 4-1 4 1 0 2-4 5-4 5s-4-3-4-5Zm10 0c0-2 3-3 4-1 1-2 4-1 4 1 0 2-4 5-4 5s-4-3-4-5Z"/></g></g>`, extra: pix([[6, 13, 8, 14], [23, 13, 25, 14]], PX_BLUSH), sparks: SPARKS_4 }
    default:
      return { eyes: open(PX_EYES), extra: '', sparks: SPARKS_4 }
  }
}

function furDefs(u: string, f: Fur): string {
  return (
    `<radialGradient id="${u}f" cx=".36" cy=".26" r=".9"><stop offset="0" stop-color="${f.hi}"/><stop offset=".42" stop-color="${f.base}"/><stop offset="1" stop-color="${f.shade}"/></radialGradient>` +
    `<radialGradient id="${u}b" cx=".4" cy=".2" r="1"><stop offset="0" stop-color="${f.light}"/><stop offset=".5" stop-color="${f.base}"/><stop offset="1" stop-color="${f.shade}"/></radialGradient>` +
    `<linearGradient id="${u}t" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="${f.shade}"/><stop offset=".6" stop-color="${f.base}"/><stop offset="1" stop-color="${f.light}"/></linearGradient>` +
    `<linearGradient id="${u}i" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffc7d6"/><stop offset="1" stop-color="#f59ab4"/></linearGradient>` +
    `<linearGradient id="${u}e" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#16111f"/><stop offset="1" stop-color="#3f3159"/></linearGradient>`
  )
}

export interface Layers {
  /** behind everything (auras' far side) */
  aura: string
  /** behind the body (bags, wings, capes) */
  back: string
  /** on the body, under the head (outfits, straps) */
  body: string
  /** on the face (glasses, freckles, blush): never moved */
  face: string
  /** on top of the head (hats, bows, headphones): a little lower on the blob, whose top is rounder */
  head: string
  /** in front of everything (auras' near side) */
  front: string
  defs: string
}

/**
 * Pochi, in the 200 × 165 space: `layers` are the worn items, already split by depth. Returns markup for inside the
 * placed group (see PLACE).
 */
export function drawPochi(f: Fur, mood: string, u: string, layers: Layers, form: 'blob' | 'cat' = 'blob'): string {
  const stroke = `stroke="${f.deep}" stroke-width="2.2" stroke-linejoin="round"`
  const whisk = `fill="none" stroke="${f.deep}" stroke-opacity=".38" stroke-width="1.1" stroke-linecap="round"`
  const blush = `<ellipse cx="67" cy="100" rx="8.5" ry="4.8" fill="#ff8fae" opacity=".42"/><ellipse cx="133" cy="100" rx="8.5" ry="4.8" fill="#ff8fae" opacity=".42"/>`
  const open = `<defs>${furDefs(u, f)}${layers.defs}</defs><ellipse class="pa-shadow" cx="100" cy="153.5" rx="50" ry="5.5" fill="#1d1430" opacity=".16"/><g class="pochi-sprite"><g class="pa-react">` + layers.aura + layers.back
  if (form === 'blob') {
    // Pochi the mascot, pixel for pixel (see pixelFace above), drawn 12 lower so the feet stand on the same ground as
    // the cat. Only the life is new: it breathes, blinks, glances, sways its antenna and fins, and its sparkles twinkle.
    // `layers` are pixel sprites (pixelWear.ts) on the same grid, so they need no fitting
    const c = f.base
    const pf = pixelFace(mood, c)
    return (
      `<defs>${layers.defs}</defs><ellipse class="pa-shadow" cx="100" cy="153.5" rx="50" ry="5" fill="#1d1430" opacity=".13"/>` +
      `<g class="pochi-sprite"><g class="pa-react"><g transform="translate(0 12)">` +
      layers.aura +
      `<g class="pa-sparkles">${pf.sparks.map(([x, y], i) => `<g class="pa-pxtw" style="animation-delay:${((i * 0.7) % 2.8).toFixed(1)}s">${pix(plusRuns(x, y), c)}</g>`).join('')}</g>` +
      layers.back +
      `<g class="pa-breathe">` +
      // each foot on its own (same pixels), so a move can step with them
      PX_FEET.map((r, i) => `<g class="pa-foot f${i + 1}">${pix([r], c)}</g>`).join('') +
      `<g class="pa-wing-l">${pix(PX_WING_L, c)}</g><g class="pa-wing-r">${pix(PX_WING_R, c)}</g>` +
      `<g class="pa-antenna">${pix(PX_ANTENNA, c)}</g>` +
      pix(PX_BODY, c) +
      layers.body +
      `<g class="pa-face">${pf.extra}${pf.eyes}${layers.face}</g>` +
      layers.head +
      `</g>` +
      layers.front +
      `</g></g></g>`
    )
  }
  return (
    open +
    `<g class="pa-tail"><path d="${TAIL}" fill="none" stroke="${f.deep}" stroke-width="16.4" stroke-linecap="round"/><path d="${TAIL}" fill="none" stroke="url(#${u}t)" stroke-width="12" stroke-linecap="round"/><path d="M166 104C163 96 168 89 176 89" fill="none" stroke="${f.hi}" stroke-opacity=".55" stroke-width="3" stroke-linecap="round"/></g>` +
    `<g class="pa-breathe">` +
    `<path d="${BODY}" fill="url(#${u}b)" ${stroke}/>` +
    `<ellipse cx="100" cy="131" rx="24" ry="17" fill="${f.belly}" opacity=".75"/>` +
    `<path d="M90 118l3 4 3-4 4 4 4-4 3 4 3-4" fill="none" stroke="${f.hi}" stroke-opacity=".7" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>` +
    layers.body +
    `<g class="pa-paws"><ellipse cx="83" cy="148" rx="11.5" ry="7" fill="${f.light}" ${stroke}/><ellipse cx="117" cy="148" rx="11.5" ry="7" fill="${f.light}" ${stroke}/>` +
    `<path d="M80 147.5v3M86 147.5v3M114 147.5v3M120 147.5v3" stroke="${f.deep}" stroke-opacity=".45" stroke-width="1.2" stroke-linecap="round"/></g>` +
    `<g class="pa-head">` +
    `<g class="pa-ear-l"><path d="${EAR_L}" fill="url(#${u}f)" ${stroke}/><path d="${EAR_IN_L}" fill="url(#${u}i)"/></g>` +
    `<g class="pa-ear-r"><path d="${EAR_R}" fill="url(#${u}f)" ${stroke}/><path d="${EAR_IN_R}" fill="url(#${u}i)"/></g>` +
    `<path d="${HEAD}" fill="url(#${u}f)" ${stroke}/>` +
    `<path d="M91 38C93 30 97 27 100 25C99 29 100 32 103 34C105 29 109 27 112 28C109 31 108 34 109 38" fill="url(#${u}f)" ${stroke}/>` +
    `<path d="M60 64C65 50 78 41 93 38" fill="none" stroke="#fff" stroke-opacity=".45" stroke-width="3" stroke-linecap="round"/>` +
    `<ellipse cx="100" cy="101" rx="17" ry="10.5" fill="${f.belly}" opacity=".6"/>` +
    blush +
    `<path d="M61 97Q49 94 38 95M61 102.5Q49 102.5 37 105.5M62 108Q51 110 42 115" ${whisk}/><path d="M139 97Q151 94 162 95M139 102.5Q151 102.5 163 105.5M138 108Q149 110 158 115" ${whisk}/>` +
    face(mood, u) +
    layers.face +
    `<path d="M95.6 95.4Q100 93.6 104.4 95.4Q102.6 99.2 100 99.8Q97.4 99.2 95.6 95.4Z" fill="#e7849d"/><ellipse cx="98.6" cy="95.6" rx="1.6" ry=".8" fill="#fff" opacity=".6"/>` +
    layers.head +
    `</g></g>` +
    layers.front +
    `</g></g>`
  )
}

// ── wearables ──────────────────────────────────────────────────────────────────────────────────────────────────────

export type Depth = 'aura' | 'back' | 'body' | 'face' | 'head' | 'front'

export interface Wearable {
  /** markup per depth, given the id prefix */
  draw: (u: string) => Partial<Record<Depth, string>>
  defs?: (u: string) => string
  /** the part of the 200 × 165 space a shop card zooms into */
  box: [number, number, number, number]
  /** shop cards show Pochi wearing it (blush, auras, coats) rather than the item alone */
  model?: boolean
}

const lin = (id: string, a: string, b: string, x2 = 0, y2 = 1) => `<linearGradient id="${id}" x1="0" y1="0" x2="${x2}" y2="${y2}"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient>`
const rad = (id: string, stops: [number, string, number?][], cx = 0.5, cy = 0.5, r = 0.5) =>
  `<radialGradient id="${id}" cx="${cx}" cy="${cy}" r="${r}">${stops.map(([o, c, a]) => `<stop offset="${o}" stop-color="${c}"${a === undefined ? '' : ` stop-opacity="${a}"`}/>`).join('')}</radialGradient>`
const star4 = (x: number, y: number, r: number, fill: string, cls = '', d = 0) =>
  `<path${cls ? ` class="${cls}"` : ''}${d ? ` style="animation-delay:${d}s"` : ''} d="M${x} ${y - r}Q${x + r * 0.22} ${y - r * 0.22} ${x + r} ${y}Q${x + r * 0.22} ${y + r * 0.22} ${x} ${y + r}Q${x - r * 0.22} ${y + r * 0.22} ${x - r} ${y}Q${x - r * 0.22} ${y - r * 0.22} ${x} ${y - r}Z" fill="${fill}"/>`

export const WEAR: Record<string, Wearable> = {
  'sprout-pin': {
    box: [100, 6, 50, 44],
    defs: (u) => lin(`${u}sp`, '#a6e3a1', '#4f9d63', 1, 1),
    draw: (u) => ({
      head: `<g class="pa-pop"><g class="pa-sway" style="transform-origin:124px 40px"><path d="M124 40C124 32 125 25 128 19" fill="none" stroke="#4f8f58" stroke-width="2.4" stroke-linecap="round"/><path d="M127 22C120 13 109 13 105 17C109 24 119 26 127 22Z" fill="url(#${u}sp)" stroke="#3f7a4c" stroke-width="1.2"/><path d="M127 22C116 19 111 18 106 17" fill="none" stroke="#3f7a4c" stroke-width=".9" opacity=".6"/><path d="M128 19C131 9 141 6 147 9C145 17 137 22 128 19Z" fill="url(#${u}sp)" stroke="#3f7a4c" stroke-width="1.2"/><path d="M128 19C135 15 140 12 146 10" fill="none" stroke="#3f7a4c" stroke-width=".9" opacity=".6"/></g><rect x="116" y="37" width="16" height="7" rx="3.5" fill="#f1c35b" stroke="#b9862a" stroke-width="1.2"/><rect x="118" y="38.2" width="7" height="1.8" rx=".9" fill="#fff" opacity=".6"/></g>`,
    }),
  },
  'berry-beret': {
    box: [62, 4, 80, 54],
    defs: (u) => rad(`${u}bb`, [[0, '#ff98a3'], [0.55, '#ea5b70'], [1, '#b8384f']], 0.38, 0.3, 0.75),
    draw: (u) => ({
      head: `<g class="pa-pop"><path d="M70 45C67 31 86 20 107 20C127 20 138 30 134 41C124 50 84 52 70 45Z" fill="url(#${u}bb)" stroke="#8e2a3e" stroke-width="1.6"/><path d="M70 44C90 51 116 50 134 41" fill="none" stroke="#a83249" stroke-width="5" stroke-linecap="round"/><path d="M71 44C90 50 116 49 133 41" fill="none" stroke="#ffb3bd" stroke-width="1" stroke-opacity=".5" stroke-dasharray="2 3"/>` +
        [[86, 30], [96, 26], [108, 27], [118, 31], [92, 37], [104, 35], [116, 39], [82, 39], [126, 36]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="1.1" ry="1.7" fill="#ffe28a" transform="rotate(20 ${x} ${y})"/>`).join('') +
        `<path d="M102 21L96 14L104 17L107 10L110 17L118 15L111 21Z" fill="#5fae6a" stroke="#3f7a4c" stroke-width="1"/><path d="M107 15V8" stroke="#4f8f58" stroke-width="2" stroke-linecap="round"/><path d="M80 28C86 23 94 21 100 21" fill="none" stroke="#fff" stroke-opacity=".45" stroke-width="2.5" stroke-linecap="round"/></g>`,
    }),
  },
  'scholar-cap': {
    box: [50, 6, 104, 58],
    defs: (u) => lin(`${u}sc`, '#4c4f86', '#2b2d55') + lin(`${u}sk`, '#3a3d6c', '#23244a'),
    draw: (u) => ({
      head: `<g class="pa-pop"><path d="M73 46C74 36 126 36 127 46V52C112 57 88 57 73 52Z" fill="url(#${u}sk)" stroke="#191a36" stroke-width="1.4"/><path d="M100 18L148 31L100 45L52 31Z" fill="#1d1e3f"/><path d="M100 14L148 28L100 42L52 28Z" fill="url(#${u}sc)" stroke="#191a36" stroke-width="1.4" stroke-linejoin="round"/><path d="M62 28L100 17" stroke="#fff" stroke-opacity=".22" stroke-width="2" stroke-linecap="round"/><circle cx="100" cy="28" r="3" fill="#f2c45a" stroke="#b5862a" stroke-width="1"/>` +
        `<g class="pa-swing" style="transform-origin:100px 28px"><path d="M100 28Q122 29 139 33V50" fill="none" stroke="#f2c45a" stroke-width="1.8" stroke-linecap="round"/><path d="M136 49H142L143 60Q139 62 135 60Z" fill="#f2c45a" stroke="#b5862a" stroke-width="1"/><path d="M137 53V60M139 53V61M141 53V60" stroke="#b5862a" stroke-width=".7"/></g></g>`,
    }),
  },
  'star-headphones': {
    box: [32, 16, 136, 88],
    defs: (u) => lin(`${u}hp`, '#ffb9cf', '#e0789f') + lin(`${u}hb`, '#4a4560', '#2e2a40'),
    draw: (u) => ({
      head: `<g class="pa-pop"><path d="M50 78C46 30 154 30 150 78" fill="none" stroke="url(#${u}hb)" stroke-width="7" stroke-linecap="round"/><path d="M56 58C64 38 136 38 144 58" fill="none" stroke="#fff" stroke-opacity=".25" stroke-width="2" stroke-linecap="round"/>` +
        [36, 146].map((x) => `<rect x="${x}" y="66" width="18" height="30" rx="8" fill="url(#${u}hp)" stroke="#a5466d" stroke-width="1.5"/><rect x="${x === 36 ? 49 : 143}" y="70" width="8" height="22" rx="4" fill="#3a3550"/>${star4(x + 9, 81, 5.5, '#ffe08a', 'pa-twinkle', x === 36 ? 0 : 0.8)}<rect x="${x + 3}" y="69" width="3" height="10" rx="1.5" fill="#fff" opacity=".45"/>`).join('') +
        `</g>`,
    }),
  },
  'moon-ribbon': {
    box: [100, 14, 54, 52],
    defs: (u) => lin(`${u}mr`, '#6c7fd6', '#2f3d86', 1, 1),
    draw: (u) => ({
      head: `<g class="pa-pop"><g class="pa-sway" style="transform-origin:128px 40px"><path d="M128 40C117 26 106 32 110 44C114 51 122 47 128 40Z" fill="url(#${u}mr)" stroke="#202a63" stroke-width="1.4"/><path d="M128 40C139 26 150 32 146 44C142 51 134 47 128 40Z" fill="url(#${u}mr)" stroke="#202a63" stroke-width="1.4"/><path d="M114 38C116 33 120 33 124 37M142 38C140 33 136 33 132 37" fill="none" stroke="#fff" stroke-opacity=".4" stroke-width="1.6" stroke-linecap="round"/><path d="M126 42L120 56L124 55L126 59ZM130 42L136 56L132 55L130 59Z" fill="#3a4a9a" stroke="#202a63" stroke-width="1"/><circle cx="128" cy="40" r="4.4" fill="#3a4a9a" stroke="#202a63" stroke-width="1.2"/></g><path d="M128 45a5 5 0 1 0 4 8a4 4 0 1 1 -4 -8Z" fill="#f6cf6a" stroke="#b5862a" stroke-width=".8"/></g>`,
    }),
  },
  'moon-jelly-crown': {
    box: [58, 2, 84, 52],
    defs: (u) => rad(`${u}jc`, [[0, '#eafcff'], [0.6, '#9fe3f2', 0.95], [1, '#6cc6e0', 0.85]], 0.4, 0.3, 0.7),
    draw: (u) => ({
      head: `<g class="pa-pop pa-shimmer"><path d="M70 44C80 49 120 49 130 44L127 38C116 42 84 42 73 38Z" fill="#7fd0e6" stroke="#3f9fbd" stroke-width="1.2"/>` +
        [[78, 31, 9], [100, 24, 12], [122, 31, 9]].map(([x, y, r], i) => `<g class="pa-bob" style="animation-delay:${i * 0.4}s"><path d="M${x - r} ${y + 8}C${x - r} ${y - r} ${x + r} ${y - r} ${x + r} ${y + 8}Q${x} ${y + 5} ${x - r} ${y + 8}Z" fill="url(#${u}jc)" stroke="#4fb3cf" stroke-width="1.1"/><path d="M${x - r * 0.5} ${y + 7}q1 5 -1 9M${x} ${y + 6}q1 6 0 10M${x + r * 0.5} ${y + 7}q-1 5 1 9" fill="none" stroke="#8fdcef" stroke-width="1.1" stroke-linecap="round" opacity=".8"/><ellipse cx="${x - r * 0.35}" cy="${y - r * 0.15}" rx="${r * 0.28}" ry="${r * 0.18}" fill="#fff" opacity=".8"/></g>`).join('') +
        `<circle cx="100" cy="38" r="3.4" fill="#fff4cf" stroke="#d6a94a" stroke-width="1"/><circle cx="99" cy="37" r="1" fill="#fff"/></g>`,
    }),
  },
  'focus-frames': {
    box: [46, 62, 108, 44],
    draw: () => ({
      face: `<g class="pa-pop"><g fill="#ffffff" fill-opacity=".14" stroke="#3b3346" stroke-width="2.8"><circle cx="${EYE_L}" cy="${EYE_Y}" r="14"/><circle cx="${EYE_R}" cy="${EYE_Y}" r="14"/></g><path d="M94 82Q100 77 106 82M66 82L52 78M134 82L148 78" fill="none" stroke="#3b3346" stroke-width="2.6" stroke-linecap="round"/><path class="pa-glint" d="M70 78L78 72M110 78L118 72" stroke="#fff" stroke-width="2.4" stroke-linecap="round" opacity=".75"/></g>`,
    }),
  },
  'star-freckles': {
    box: [48, 62, 104, 52],
    model: true,
    draw: () => ({
      face: `<g class="pa-pop">${[[62, 95, 3.4], [70, 103, 2.6], [58, 104, 2.2], [138, 95, 3.4], [130, 103, 2.6], [142, 104, 2.2]].map(([x, y, r], i) => star4(x, y, r, '#f6c453', 'pa-twinkle', i * 0.35)).join('')}</g>`,
    }),
  },
  'heart-blush': {
    box: [48, 62, 104, 52],
    model: true,
    draw: () => ({
      face: `<g class="pa-pop">${[67, 133].map((x, i) => `<path class="pa-pulse" style="transform-origin:${x}px 100px;animation-delay:${i * 0.25}s" d="M${x} 106C${x - 11} 99 ${x - 7} 90 ${x} 96C${x + 7} 90 ${x + 11} 99 ${x} 106Z" fill="#ff6f99" opacity=".72"/>`).join('')}</g>`,
    }),
  },
  'cozy-scarf': {
    box: [50, 100, 100, 58],
    defs: (u) => lin(`${u}cs`, '#f39a78', '#d2593f'),
    draw: (u) => ({
      body: `<g class="pa-pop"><g class="pa-sway" style="transform-origin:124px 124px"><path d="M116 122L132 120L136 150L119 152Z" fill="url(#${u}cs)" stroke="#9e3d2b" stroke-width="1.4" stroke-linejoin="round"/><path d="M121 128L133 127M122 135L134 134M122 142L135 141" stroke="#fff" stroke-opacity=".25" stroke-width="2"/><path d="M120 152l1 5M124 152l1 5M128 151l1 5M132 151l1 5" stroke="#d2593f" stroke-width="2" stroke-linecap="round"/></g><path d="M57 109C75 125 125 125 143 109L145 120C126 136 74 136 55 120Z" fill="url(#${u}cs)" stroke="#9e3d2b" stroke-width="1.5" stroke-linejoin="round"/>` +
        Array.from({ length: 11 }, (_, i) => { const x = 62 + i * 7.6; const y = 114 + Math.sin((i / 10) * Math.PI) * 9; return `<path d="M${x} ${y}v8" stroke="#9e3d2b" stroke-opacity=".28" stroke-width="2.4" stroke-linecap="round"/>` }).join('') +
        `<path d="M60 113C78 126 122 126 140 113" fill="none" stroke="#fff" stroke-opacity=".3" stroke-width="1.6"/></g>`,
    }),
  },
  'cloud-hoodie': {
    box: [44, 60, 112, 100],
    model: true,
    defs: (u) => lin(`${u}ch`, '#e4f0fd', '#a9c6ea'),
    draw: (u) => ({
      body: `<g class="pa-pop"><path d="M63 124C64 110 80 112 100 112C120 112 136 110 137 124C139 141 127 151 100 151C73 151 61 141 63 124Z" fill="url(#${u}ch)" stroke="#6d8fc0" stroke-width="1.6"/><path d="M54 108C66 126 134 126 146 108C150 116 142 128 128 130C112 132 88 132 72 130C58 128 50 116 54 108Z" fill="#cfe2f8" stroke="#6d8fc0" stroke-width="1.5"/><path d="M80 134C84 128 116 128 120 134L118 146C110 148 90 148 82 146Z" fill="#bcd4f1" stroke="#6d8fc0" stroke-width="1.2"/><path d="M93 124Q91 132 92 138M107 124Q109 132 108 138" fill="none" stroke="#f4f8ff" stroke-width="1.8" stroke-linecap="round"/><circle cx="92" cy="139" r="1.8" fill="#6d8fc0"/><circle cx="108" cy="139" r="1.8" fill="#6d8fc0"/><path d="M70 138c0-4 6-4 6-1c1-3 7-2 6 2c2 0 2 4-1 4h-10c-3 0-3-5-1-5Z" fill="#fff" opacity=".9"/></g>`,
    }),
  },
  'jelly-raincoat': {
    box: [44, 60, 112, 100],
    model: true,
    defs: (u) => lin(`${u}jr`, '#ffe27a', '#f2b632'),
    draw: (u) => ({
      body: `<g class="pa-pop"><path d="M62 124C62 109 80 111 100 111C120 111 138 109 138 124C140 142 127 152 100 152C73 152 60 142 62 124Z" fill="url(#${u}jr)" fill-opacity=".9" stroke="#c88a14" stroke-width="1.6"/><path d="M78 110L100 128L122 110L132 115L100 135L68 115Z" fill="#ffd34f" stroke="#c88a14" stroke-width="1.3" stroke-linejoin="round"/><path d="M100 132V151" stroke="#c88a14" stroke-width="1.4"/><g fill="#5ab6d6" stroke="#2f7f9c" stroke-width=".8"><rect x="95" y="137" width="10" height="3.4" rx="1.7"/><rect x="95" y="144" width="10" height="3.4" rx="1.7"/></g><path d="M70 122C70 132 72 140 78 146" fill="none" stroke="#fff" stroke-opacity=".55" stroke-width="3" stroke-linecap="round"/><path class="pa-drip" d="M128 128q3 5 0 7q-3-2 0-7Z" fill="#8fd6ec"/></g>`,
    }),
  },
  'bookworm-cape': {
    box: [30, 92, 140, 70],
    defs: (u) => lin(`${u}bc`, '#a679de', '#5f3a9c') + lin(`${u}bl`, '#f7d36a', '#d99a2b'),
    draw: (u) => ({
      back: `<g class="pa-pop"><path class="pa-cape" d="M62 112C42 128 34 146 38 158C70 162 130 162 162 158C166 146 158 128 138 112Z" fill="url(#${u}bc)" stroke="#43246f" stroke-width="1.6" stroke-linejoin="round"/><path d="M48 150C62 146 70 152 84 148M116 148C130 152 138 146 152 150" fill="none" stroke="#c8a7f0" stroke-opacity=".5" stroke-width="1.6"/></g>`,
      body: `<g class="pa-pop"><path d="M64 110C78 122 122 122 136 110L134 118C120 128 80 128 66 118Z" fill="#7b4fbf" stroke="#43246f" stroke-width="1.3"/><rect x="92" y="117" width="16" height="11" rx="1.5" fill="url(#${u}bl)" stroke="#9c6b16" stroke-width="1.1"/><path d="M100 118V127M95 120H98M95 123H98M102 120H105M102 123H105" stroke="#9c6b16" stroke-width=".8"/></g>`,
    }),
  },
  'mini-backpack': {
    box: [104, 76, 72, 80],
    defs: (u) => lin(`${u}mb`, '#f8b878', '#de8540'),
    draw: (u) => ({
      back: `<g transform="translate(7 0)"><g class="pa-pop"><path d="M148 96l5-12" stroke="#4a7fd1" stroke-width="3" stroke-linecap="round"/><path d="M151 86l3-5" stroke="#f3c75a" stroke-width="3" stroke-linecap="round"/><rect x="127" y="94" width="34" height="46" rx="11" fill="url(#${u}mb)" stroke="#a5561d" stroke-width="1.6"/><path d="M127 108C138 101 150 101 161 108V100C161 96 157 94 152 94H136C131 94 127 97 127 101Z" fill="#e88d48" stroke="#a5561d" stroke-width="1.4"/><rect x="140" y="106" width="8" height="5" rx="1.5" fill="#ffd99b" stroke="#a5561d" stroke-width="1"/><rect x="133" y="118" width="22" height="15" rx="5" fill="#f2a764" stroke="#a5561d" stroke-width="1.1"/><path d="M131 99C133 97 137 96 140 96" stroke="#fff" stroke-opacity=".5" stroke-width="2" stroke-linecap="round"/></g></g>`,
      body: `<g class="pa-pop"><path d="M131 106C125 118 124 130 126 141" fill="none" stroke="#a5561d" stroke-width="5.6" stroke-linecap="round"/><path d="M131 106C125 118 124 130 126 141" fill="none" stroke="#e88d48" stroke-width="3.4" stroke-linecap="round"/><path d="M69 106C75 118 76 130 74 141" fill="none" stroke="#a5561d" stroke-width="5.6" stroke-linecap="round"/><path d="M69 106C75 118 76 130 74 141" fill="none" stroke="#e88d48" stroke-width="3.4" stroke-linecap="round"/></g>`,
    }),
  },
  'paper-wings': {
    box: [6, 60, 188, 84],
    draw: () => ({
      back: `<g class="pa-pop">${[1, -1].map((s) => {
        const X = (x: number) => (s === 1 ? x : 200 - x)
        return `<g class="pa-flap${s === 1 ? '' : ' r'}" style="transform-origin:${X(66)}px 112px"><path d="M${X(66)} 108L${X(12)} 78L${X(30)} 106L${X(10)} 124L${X(64)} 124Z" fill="#fbf6ea" stroke="#b9a882" stroke-width="1.4" stroke-linejoin="round"/><path d="M${X(66)} 108L${X(30)} 106L${X(64)} 124" fill="#efe6d1" stroke="#b9a882" stroke-width="1" stroke-linejoin="round"/><path d="M${X(56)} 102L${X(24)} 85M${X(50)} 98L${X(20)} 82M${X(54)} 118L${X(20)} 120" stroke="#8fb3e0" stroke-width=".9" opacity=".7"/><path d="M${X(44)} 96L${X(26)} 110" stroke="#ec8f99" stroke-width=".9" opacity=".7"/></g>`
      }).join('')}</g>`,
    }),
  },
  'rocket-satchel': {
    box: [14, 56, 70, 104],
    defs: (u) => lin(`${u}rk`, '#ffffff', '#d9dde8', 1, 0) + lin(`${u}rf`, '#fff3a8', '#ff8a3d'),
    draw: (u) => ({
      back: `<g transform="matrix(-1 0 0 1 212 0)"><g class="pa-pop"><g class="pa-flame" style="transform-origin:146px 134px"><path d="M139 134Q146 156 153 134Z" fill="url(#${u}rf)"/><path d="M142 134Q146 148 150 134Z" fill="#fff6c8"/></g><path d="M133 116L126 132L136 128ZM159 116L166 132L156 128Z" fill="#f07b5a" stroke="#a8432c" stroke-width="1.3" stroke-linejoin="round"/><path d="M146 66C158 78 160 104 156 132H136C132 104 134 78 146 66Z" fill="url(#${u}rk)" stroke="#6f7690" stroke-width="1.6"/><path d="M146 66C151 71 154 77 156 84H136C138 77 141 71 146 66Z" fill="#f07b5a" stroke="#a8432c" stroke-width="1.3"/><circle cx="146" cy="99" r="6.5" fill="#8fd8f0" stroke="#6f7690" stroke-width="1.6"/><circle cx="144" cy="97" r="2" fill="#fff"/><rect x="136" y="124" width="20" height="4" fill="#f07b5a"/></g></g>`,
    }),
  },
  'bubble-halo': {
    box: [44, -4, 112, 56],
    defs: (u) => lin(`${u}bh`, '#a6e7ff', '#e7b7ff', 1, 0) + rad(`${u}bu`, [[0, '#ffffff', 0.1], [0.75, '#c8ecff', 0.25], [1, '#9bc8ff', 0.7]]),
    draw: (u) => ({
      aura: `<g class="pa-pop"><g class="pa-bob"><ellipse cx="100" cy="14" rx="34" ry="7.5" fill="none" stroke="url(#${u}bh)" stroke-width="3.2"/><ellipse cx="100" cy="13" rx="34" ry="7.5" fill="none" stroke="#fff" stroke-opacity=".6" stroke-width="1"/></g></g>`,
      front: `<g class="pa-pop">${[[62, 30, 6, 0], [140, 22, 4.6, 0.7], [152, 52, 3.4, 1.3], [48, 56, 3, 2]].map(([x, y, r, d]) => `<g class="pa-rise" style="animation-delay:${d}s"><circle cx="${x}" cy="${y}" r="${r}" fill="url(#${u}bu)"/><circle cx="${x - r * 0.35}" cy="${y - r * 0.35}" r="${r * 0.25}" fill="#fff" opacity=".9"/></g>`).join('')}</g>`,
    }),
  },
  'starlight-aura': {
    box: [0, 0, 200, 165],
    model: true,
    defs: (u) => rad(`${u}sa`, [[0, '#fff3c4', 0.55], [0.55, '#d9c6ff', 0.22], [1, '#b9a9ff', 0]]),
    draw: (u) => ({
      aura: `<g class="pa-pop"><circle class="pa-glow" cx="100" cy="88" r="84" fill="url(#${u}sa)"/></g>`,
      front: `<g class="pa-pop"><g class="pa-orbit" style="transform-origin:100px 88px">${[[18, 88, 6], [182, 88, 5], [100, 6, 4.4], [100, 168, 3.6], [42, 30, 3.4], [158, 146, 4]].map(([x, y, r], i) => star4(x, y, r, i % 2 ? '#ffe08a' : '#fff1b8', 'pa-twinkle', i * 0.3)).join('')}</g></g>`,
    }),
  },
  'aurora-orbit': {
    box: [0, 0, 200, 165],
    model: true,
    defs: (u) => `<linearGradient id="${u}ao" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#66e3b5" stop-opacity="0"/><stop offset=".3" stop-color="#66e3b5" stop-opacity=".75"/><stop offset=".6" stop-color="#7cc4ff" stop-opacity=".7"/><stop offset="1" stop-color="#e6a2ff" stop-opacity="0"/></linearGradient>`,
    draw: (u) => ({
      aura: `<g class="pa-pop"><g class="pa-wave"><path d="M-6 70C30 30 70 60 100 40C130 20 170 50 206 26" fill="none" stroke="url(#${u}ao)" stroke-width="14" stroke-linecap="round" opacity=".7"/><path d="M-6 92C34 58 70 84 102 64C134 44 168 72 206 50" fill="none" stroke="url(#${u}ao)" stroke-width="9" stroke-linecap="round" opacity=".55"/><path d="M-4 52C30 20 66 44 98 24C132 4 166 30 204 10" fill="none" stroke="url(#${u}ao)" stroke-width="5" stroke-linecap="round" opacity=".5"/></g></g>`,
    }),
  },
  'firefly-trail': {
    box: [0, 0, 200, 165],
    model: true,
    defs: (u) => rad(`${u}ff`, [[0, '#fffbe0'], [0.35, '#ffe48a', 0.95], [1, '#ffd25a', 0]]),
    draw: (u) => ({
      front: `<g class="pa-pop">${[[30, 50, 0], [170, 40, 1.1], [180, 112, 2.3], [22, 118, 0.6], [58, 20, 1.7], [146, 14, 2.9]].map(([x, y, d], i) => `<g class="pa-fly f${i % 3}" style="animation-delay:${d}s"><circle cx="${x}" cy="${y}" r="8" fill="url(#${u}ff)"/><circle cx="${x}" cy="${y}" r="1.8" fill="#fffef2"/></g>`).join('')}</g>`,
    }),
  },
}

/** Every wearable, drawn in the order they stack. */
export const WEAR_ORDER = [
  'aurora-orbit', 'starlight-aura', 'bubble-halo', 'firefly-trail',
  'bookworm-cape', 'paper-wings', 'mini-backpack', 'rocket-satchel',
  'cloud-hoodie', 'jelly-raincoat', 'cozy-scarf',
  'heart-blush', 'star-freckles', 'focus-frames',
  'star-headphones', 'scholar-cap', 'berry-beret', 'moon-jelly-crown', 'moon-ribbon', 'sprout-pin',
]

export function layersFor(ids: Iterable<string>, u: string): Layers {
  const worn = new Set(ids)
  const L: Layers = { aura: '', back: '', body: '', face: '', head: '', front: '', defs: '' }
  for (const id of WEAR_ORDER) {
    const w = WEAR[id]
    if (!w || !worn.has(id)) continue
    const d = w.draw(u)
    for (const k of ['aura', 'back', 'body', 'face', 'head', 'front'] as Depth[]) if (d[k]) L[k] += d[k]
    if (w.defs) L.defs += w.defs(u)
  }
  return L
}

// ── homes ──────────────────────────────────────────────────────────────────────────────────────────────────────────

const cloud = (x: number, y: number, s: number, cls: string, d = 0) =>
  `<g class="${cls}" style="animation-delay:${d}s"><path d="M${x} ${y}c${-18 * s} 0 ${-20 * s} ${-22 * s} ${-2 * s} ${-24 * s}c${4 * s} ${-16 * s} ${30 * s} ${-18 * s} ${36 * s} ${-4 * s}c${10 * s} ${-12 * s} ${34 * s} ${-6 * s} ${32 * s} ${10 * s}c${16 * s} ${2 * s} ${16 * s} ${18 * s} 0 ${18 * s}Z" style="fill:var(--pcs-cloud)"/></g>`

/**
 * A home, as markup for <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMax slice">. Its colours are CSS
 * variables (--pcs-*) set per home and theme in pochi-club.css; Pochi sits on the floor at the bottom middle.
 */
export function sceneMarkup(home: string, u: string): string {
  const sky = `<linearGradient id="${u}k" x1="0" y1="0" x2="0" y2="1"><stop offset="0" style="stop-color:var(--pcs-sky1)"/><stop offset="1" style="stop-color:var(--pcs-sky2)"/></linearGradient>`
  const glow = `<radialGradient id="${u}g"><stop offset="0" style="stop-color:var(--pcs-glow)" stop-opacity=".9"/><stop offset="1" style="stop-color:var(--pcs-glow)" stop-opacity="0"/></radialGradient>`
  const bg = `<rect width="400" height="300" fill="url(#${u}k)"/>`
  const dots = (pts: number[][]) => pts.map(([x, y, r], i) => `<circle class="pa-twinkle" style="animation-delay:${(i * 0.53) % 3}s;fill:var(--pcs-star)" cx="${x}" cy="${y}" r="${r}"/>`).join('')
  switch (home) {
    case 'moon':
      return (
        `<defs>${sky}${glow}</defs>${bg}<circle cx="318" cy="70" r="70" fill="url(#${u}g)"/>` +
        `<path d="M318 34a38 38 0 1 0 34 56a30 30 0 1 1 -34 -56Z" style="fill:var(--pcs-moon)"/>` +
        dots([[40, 40, 1.6], [90, 70, 1.2], [150, 30, 1.8], [210, 60, 1.1], [250, 24, 1.4], [370, 140, 1.2], [60, 120, 1], [180, 110, 1.3], [24, 180, 1.1]]) +
        star4(120, 46, 5, 'var(--pcs-star)', 'pa-twinkle', 0.4) + star4(270, 110, 4, 'var(--pcs-star)', 'pa-twinkle', 1.4) +
        `<path d="M0 236C70 214 130 226 200 222C270 218 330 210 400 228V300H0Z" style="fill:var(--pcs-hill2)"/><path d="M0 256C80 240 140 250 200 248C270 246 330 238 400 252V300H0Z" style="fill:var(--pcs-floor)"/>` +
        [[40, 246, 0], [74, 240, 0.8], [326, 236, 0.4], [360, 244, 1.2], [300, 246, 1.8]].map(([x, y, d]) => `<g class="pa-sway" style="transform-origin:${x}px ${y + 14}px;animation-delay:${d}s"><path d="M${x} ${y + 14}Q${x - 2} ${y + 4} ${x} ${y - 8}" fill="none" style="stroke:var(--pcs-leaf)" stroke-width="2.4" stroke-linecap="round"/><circle cx="${x}" cy="${y - 10}" r="5.5" style="fill:var(--pcs-bloom)"/><circle cx="${x}" cy="${y - 10}" r="11" style="fill:var(--pcs-bloom)" opacity=".18"/></g>`).join('') +
        `<ellipse cx="200" cy="270" rx="92" ry="12" style="fill:var(--pcs-rug)"/>`
      )
    case 'jelly':
      return (
        `<defs>${sky}${glow}</defs>${bg}` +
        `<g class="pa-rays" style="transform-origin:200px 0px"><path d="M120 0L160 0L120 300L40 300Z" style="fill:var(--pcs-ray)"/><path d="M220 0L250 0L270 300L190 300Z" style="fill:var(--pcs-ray)"/><path d="M320 0L340 0L400 260L370 300Z" style="fill:var(--pcs-ray)"/></g>` +
        [[70, 90, 1, 0], [330, 70, 0.8, 1.6], [290, 170, 0.6, 3]].map(([x, y, s, d]) => `<g class="pa-jelly" style="animation-delay:${d}s"><path d="M${x - 18 * s} ${y}C${x - 18 * s} ${y - 26 * s} ${x + 18 * s} ${y - 26 * s} ${x + 18 * s} ${y}Q${x} ${y - 5 * s} ${x - 18 * s} ${y}Z" style="fill:var(--pcs-jelly)" opacity=".85"/><path d="M${x - 10 * s} ${y - 2}q4 14 -2 26M${x} ${y - 3}q-4 16 2 30M${x + 10 * s} ${y - 2}q4 14 -2 24" fill="none" style="stroke:var(--pcs-jelly)" stroke-width="2" stroke-linecap="round" opacity=".6"/><ellipse cx="${x - 7 * s}" cy="${y - 13 * s}" rx="${5 * s}" ry="${3 * s}" fill="#fff" opacity=".55"/></g>`).join('') +
        [[110, 0], [160, 2.2], [260, 1.1], [300, 3.4], [80, 4.4]].map(([x, d]) => `<circle class="pa-bubble" style="animation-delay:${d}s;stroke:var(--pcs-star)" cx="${x}" cy="290" r="4" fill="none" stroke-width="1.4" opacity=".7"/>`).join('') +
        `<path d="M0 252C80 238 150 250 210 246C280 242 340 236 400 248V300H0Z" style="fill:var(--pcs-floor)"/>` +
        [[36, 0], [56, 0.9], [352, 0.4], [372, 1.4]].map(([x, d]) => `<path class="pa-sway" style="transform-origin:${x}px 262px;animation-delay:${d}s;stroke:var(--pcs-leaf)" d="M${x} 262Q${x - 10} 236 ${x} 214Q${x + 10} 196 ${x - 2} 178" fill="none" stroke-width="5" stroke-linecap="round"/>`).join('') +
        `<path d="M300 262c4-10 18-10 22 0Z" style="fill:var(--pcs-bloom)"/><path d="M96 266c2-7 12-7 14 0Z" style="fill:var(--pcs-moon)"/><ellipse cx="200" cy="270" rx="92" ry="12" style="fill:var(--pcs-rug)"/>`
      )
    case 'stars':
      return (
        `<defs>${sky}${glow}<linearGradient id="${u}w" x1="0" y1="0" x2="0" y2="1"><stop offset="0" style="stop-color:var(--pcs-night1)"/><stop offset="1" style="stop-color:var(--pcs-night2)"/></linearGradient><clipPath id="${u}c"><circle cx="200" cy="118" r="86"/></clipPath></defs>${bg}` +
        `<circle cx="200" cy="118" r="98" style="fill:var(--pcs-frame)"/><circle cx="200" cy="118" r="86" fill="url(#${u}w)"/>` +
        `<g clip-path="url(#${u}c)">${[[150, 70, 1.4], [176, 52, 1], [230, 64, 1.6], [262, 92, 1.1], [140, 120, 1.2], [214, 100, 0.9], [250, 150, 1.3], [166, 160, 1], [192, 84, 1.2]].map(([x, y, r], i) => `<circle class="pa-twinkle" style="animation-delay:${(i * 0.47) % 3}s" cx="${x}" cy="${y}" r="${r}" fill="#fff"/>`).join('')}${star4(236, 84, 5, '#fff3c4', 'pa-twinkle', 0.6)}<path class="pa-shoot" d="M140 60L176 76" stroke="#fff" stroke-width="2" stroke-linecap="round"/><circle cx="252" cy="70" r="12" fill="#f4ecd6" opacity=".9"/></g>` +
        `<path d="M200 32V204M114 118H286" style="stroke:var(--pcs-frame)" stroke-width="6"/>` +
        `<rect x="0" y="232" width="400" height="68" style="fill:var(--pcs-floor)"/><rect x="0" y="230" width="400" height="5" style="fill:var(--pcs-hill2)"/>` +
        `<g style="stroke:var(--pcs-leaf)" stroke-width="4" stroke-linecap="round" fill="none"><path d="M330 178L312 232M330 178L348 232M330 178V232"/></g><g transform="rotate(-32 330 172)" style="fill:var(--pcs-leaf)"><rect x="300" y="164" width="62" height="15" rx="5"/><rect x="356" y="161" width="9" height="21" rx="3"/><rect x="292" y="167" width="10" height="9" rx="2"/><rect x="304" y="166" width="40" height="3" rx="1.5" fill="#fff" opacity=".25"/><rect x="326" y="176" width="8" height="6" rx="1"/></g>` +
        `<path d="M52 232h30l-4 -26h-22Z" style="fill:var(--pcs-moon)"/><g class="pa-sway" style="transform-origin:67px 206px"><path d="M67 206C60 186 46 182 40 184C46 194 58 200 67 206ZM67 206C70 184 82 176 90 178C86 190 76 200 67 206ZM67 206C66 190 68 178 72 170" style="fill:var(--pcs-bloom);stroke:var(--pcs-bloom)" stroke-width="2"/></g>` +
        `<ellipse cx="200" cy="262" rx="110" ry="16" style="fill:var(--pcs-rug)"/><ellipse cx="200" cy="262" rx="96" ry="11" fill="none" style="stroke:var(--pcs-star)" stroke-width="1.4" stroke-dasharray="4 5" opacity=".5"/>`
      )
    default:
      return (
        `<defs>${sky}${glow}</defs>${bg}<circle cx="320" cy="64" r="80" fill="url(#${u}g)"/>` +
        cloud(70, 92, 1.3, 'pa-drift') + cloud(260, 60, 1, 'pa-drift slow', 2) + cloud(330, 150, 0.8, 'pa-drift', 5) + cloud(40, 180, 0.7, 'pa-drift slow', 7) +
        star4(150, 60, 4.5, 'var(--pcs-star)', 'pa-twinkle', 0.2) + star4(220, 130, 3.4, 'var(--pcs-star)', 'pa-twinkle', 1.2) +
        `<path d="M0 248C90 236 150 242 200 242C260 242 320 234 400 244V300H0Z" style="fill:var(--pcs-floor)"/>` +
        `<ellipse cx="200" cy="268" rx="96" ry="17" style="fill:var(--pcs-hill2)"/><ellipse cx="200" cy="262" rx="92" ry="15" style="fill:var(--pcs-rug)"/><ellipse cx="200" cy="260" rx="72" ry="9" fill="none" style="stroke:var(--pcs-star)" stroke-width="1.2" stroke-dasharray="3 4" opacity=".55"/>`
      )
  }
}
