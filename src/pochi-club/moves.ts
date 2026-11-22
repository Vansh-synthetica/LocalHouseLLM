/**
 * How each move is acted: which animation every part of Pochi plays (body, wings, antenna, feet, eyes, shadow,
 * sparkles), and the little pixel effects that go with it. The keyframes are in pochi-moves.css; a part with no
 * animation keeps still for the move.
 *
 * SHARED FILE: identical copies in Anvira Notes (src/pochi-club/) and the website (LocalHouseLLM src/pochi-club/).
 */

export type FxKind = 'heart' | 'note' | 'star' | 'zzz' | 'dust' | 'confetti' | 'page' | 'scribble' | 'bang'

/** A burst of particles: when (0–1 of the move), how many, from where (% of Pochi's box), and how they fly. */
export interface Burst {
  at: number
  kind: FxKind
  n: number
  x?: number
  y?: number
  /** how far they spread (% of the box) */
  spread?: number
}

export interface Rig {
  body: string
  wingL?: string
  wingR?: string
  antenna?: string
  /** the outer feet, and the middle one (walking alternates them) */
  feetA?: string
  feetB?: string
  eyes?: string
  shadow?: string
  sparkles?: string
  fx?: Burst[]
}

const dustLand = (at: number): Burst[] => [
  { at, kind: 'dust', n: 3, x: 38, y: 96, spread: 14 },
  { at, kind: 'dust', n: 3, x: 62, y: 96, spread: 14 },
]

export const RIGS: Record<string, Rig> = {
  // ── the eight core moves ──
  hello: { body: 'mv-b-wave', wingR: 'mv-w-wave-r', wingL: 'mv-w-perk-l', antenna: 'mv-a-boing', eyes: 'mv-e-blink-late', sparkles: 'mv-s-glint', fx: [{ at: 0.2, kind: 'bang', n: 1, x: 84, y: 30 }] },
  wiggle: { body: 'mv-b-shimmy', wingL: 'mv-w-flap-l', wingR: 'mv-w-flap-r', antenna: 'mv-a-shake', feetA: 'mv-f-step-a', feetB: 'mv-f-step-b', eyes: 'mv-e-blink', fx: [{ at: 0.3, kind: 'star', n: 3, x: 50, y: 20, spread: 40 }] },
  hop: { body: 'mv-b-hop', wingL: 'mv-w-air-l', wingR: 'mv-w-air-r', antenna: 'mv-a-lag', feetA: 'mv-f-tuck', feetB: 'mv-f-tuck', shadow: 'mv-sh-hop', eyes: 'mv-e-land', fx: dustLand(0.64) },
  spin: { body: 'mv-b-turn', wingL: 'mv-w-out-l', wingR: 'mv-w-out-r', antenna: 'mv-a-whip', feetA: 'mv-f-tuck', feetB: 'mv-f-tuck', shadow: 'mv-sh-small', sparkles: 'mv-s-burst', fx: [{ at: 0.45, kind: 'star', n: 6, x: 50, y: 40, spread: 55 }, ...dustLand(0.78)] },
  dance: { body: 'mv-b-dance', wingL: 'mv-w-dance-l', wingR: 'mv-w-dance-r', antenna: 'mv-a-bop', feetA: 'mv-f-step-a', feetB: 'mv-f-step-b', shadow: 'mv-sh-dance', sparkles: 'mv-s-glint', fx: [{ at: 0.1, kind: 'note', n: 2, x: 30, y: 25, spread: 20 }, { at: 0.45, kind: 'note', n: 2, x: 72, y: 20, spread: 20 }, { at: 0.8, kind: 'star', n: 4, x: 50, y: 15, spread: 50 }] },
  stretch: { body: 'mv-b-stretch', wingL: 'mv-w-up-l', wingR: 'mv-w-up-r', antenna: 'mv-a-reach', eyes: 'mv-e-squeeze', fx: [{ at: 0.42, kind: 'star', n: 2, x: 50, y: 5, spread: 40 }] },
  nap: { body: 'mv-b-nap', wingL: 'mv-w-tuck-l', wingR: 'mv-w-tuck-r', antenna: 'mv-a-droop', shadow: 'mv-sh-breathe', fx: [{ at: 0.18, kind: 'zzz', n: 1, x: 72, y: 18 }, { at: 0.42, kind: 'zzz', n: 1, x: 76, y: 14 }, { at: 0.66, kind: 'zzz', n: 1, x: 74, y: 16 }] },
  heartstorm: { body: 'mv-b-heart', wingL: 'mv-w-air-l', wingR: 'mv-w-air-r', antenna: 'mv-a-boing', feetA: 'mv-f-tuck', feetB: 'mv-f-tuck', shadow: 'mv-sh-double', eyes: 'mv-e-squeeze', fx: [{ at: 0.22, kind: 'heart', n: 4, x: 50, y: 30, spread: 50 }, { at: 0.5, kind: 'heart', n: 5, x: 50, y: 25, spread: 60 }, { at: 0.75, kind: 'heart', n: 3, x: 50, y: 30, spread: 45 }] },

  // ── Study Flow ──
  'desk-walk': { body: 'mv-b-walk', wingL: 'mv-w-swing-l', wingR: 'mv-w-swing-r', antenna: 'mv-a-bounce', feetA: 'mv-f-walk-a', feetB: 'mv-f-walk-b', shadow: 'mv-sh-walk', eyes: 'mv-e-blink' },
  'scoot-seat': { body: 'mv-b-scoot', wingL: 'mv-w-flap-l', wingR: 'mv-w-flap-r', antenna: 'mv-a-boing', feetA: 'mv-f-tuck', feetB: 'mv-f-tuck', shadow: 'mv-sh-scoot', fx: [{ at: 0.3, kind: 'dust', n: 3, x: 64, y: 96, spread: 12 }, { at: 0.7, kind: 'dust', n: 4, x: 50, y: 96, spread: 22 }] },
  'page-flip': { body: 'mv-b-pageflip', wingR: 'mv-w-turn-r', wingL: 'mv-w-perk-l', antenna: 'mv-a-shake', eyes: 'mv-e-blink', fx: [{ at: 0.45, kind: 'page', n: 1, x: 78, y: 50 }] },
  'focus-nod': { body: 'mv-b-nod', wingL: 'mv-w-tuck-l', wingR: 'mv-w-tuck-r', antenna: 'mv-a-nod', eyes: 'mv-e-blink', fx: [{ at: 0.82, kind: 'bang', n: 1, x: 80, y: 22 }] },
  'note-scribble': { body: 'mv-b-scribble', wingR: 'mv-w-scribble-r', wingL: 'mv-w-perk-l', antenna: 'mv-a-shake', fx: [{ at: 0.2, kind: 'scribble', n: 3, x: 80, y: 60, spread: 14 }, { at: 0.55, kind: 'scribble', n: 3, x: 80, y: 60, spread: 14 }] },

  // ── Cozy Reset ──
  'window-walk': { body: 'mv-b-wander', wingL: 'mv-w-swing-l', wingR: 'mv-w-swing-r', antenna: 'mv-a-bounce', feetA: 'mv-f-walk-a', feetB: 'mv-f-walk-b', shadow: 'mv-sh-wander', eyes: 'mv-e-blink' },
  'stretch-awake': { body: 'mv-b-stretch', wingL: 'mv-w-up-l', wingR: 'mv-w-up-r', antenna: 'mv-a-reach', eyes: 'mv-e-squeeze', fx: [{ at: 0.45, kind: 'star', n: 3, x: 50, y: 5, spread: 50 }] },
  'pillow-crawl': { body: 'mv-b-crawl', wingL: 'mv-w-row-l', wingR: 'mv-w-row-r', antenna: 'mv-a-droop', feetA: 'mv-f-walk-a', feetB: 'mv-f-walk-b', shadow: 'mv-sh-crawl', fx: [{ at: 0.75, kind: 'zzz', n: 1, x: 74, y: 30 }] },
  'curl-up': { body: 'mv-b-curl', wingL: 'mv-w-tuck-l', wingR: 'mv-w-tuck-r', antenna: 'mv-a-droop', shadow: 'mv-sh-breathe', fx: [{ at: 0.4, kind: 'zzz', n: 1, x: 70, y: 30 }, { at: 0.68, kind: 'zzz', n: 1, x: 74, y: 26 }] },
  'wake-wiggle': { body: 'mv-b-shimmy', wingL: 'mv-w-flap-l', wingR: 'mv-w-flap-r', antenna: 'mv-a-shake', feetA: 'mv-f-step-a', feetB: 'mv-f-step-b', eyes: 'mv-e-blink', fx: [{ at: 0.1, kind: 'bang', n: 1, x: 80, y: 24 }, { at: 0.55, kind: 'star', n: 3, x: 50, y: 20, spread: 40 }] },

  // ── Tiny Wins ──
  'quest-clap': { body: 'mv-b-clap', wingL: 'mv-w-clap-l', wingR: 'mv-w-clap-r', antenna: 'mv-a-bop', eyes: 'mv-e-squeeze', sparkles: 'mv-s-glint', fx: [{ at: 0.18, kind: 'star', n: 2, x: 50, y: 40, spread: 30 }, { at: 0.42, kind: 'star', n: 2, x: 50, y: 40, spread: 34 }, { at: 0.66, kind: 'star', n: 3, x: 50, y: 35, spread: 44 }] },
  'sparkle-spin': { body: 'mv-b-spin2', wingL: 'mv-w-out-l', wingR: 'mv-w-out-r', antenna: 'mv-a-whip', feetA: 'mv-f-tuck', feetB: 'mv-f-tuck', shadow: 'mv-sh-small', sparkles: 'mv-s-burst', fx: [{ at: 0.3, kind: 'star', n: 5, x: 50, y: 40, spread: 60 }, { at: 0.6, kind: 'star', n: 5, x: 50, y: 35, spread: 70 }] },
  'sky-hop': { body: 'mv-b-skyhop', wingL: 'mv-w-air-l', wingR: 'mv-w-air-r', antenna: 'mv-a-lag', feetA: 'mv-f-tuck', feetB: 'mv-f-tuck', shadow: 'mv-sh-sky', eyes: 'mv-e-land', fx: [...dustLand(0.08), { at: 0.36, kind: 'star', n: 5, x: 50, y: 0, spread: 60 }, ...dustLand(0.7)] },
  'confetti-dance': { body: 'mv-b-dance', wingL: 'mv-w-dance-l', wingR: 'mv-w-dance-r', antenna: 'mv-a-bop', feetA: 'mv-f-step-a', feetB: 'mv-f-step-b', shadow: 'mv-sh-dance', eyes: 'mv-e-squeeze', fx: [{ at: 0.05, kind: 'confetti', n: 14, x: 50, y: -10, spread: 90 }, { at: 0.5, kind: 'confetti', n: 12, x: 50, y: -10, spread: 90 }] },
  'heart-pop': { body: 'mv-b-pop', wingL: 'mv-w-air-l', wingR: 'mv-w-air-r', antenna: 'mv-a-boing', shadow: 'mv-sh-small', eyes: 'mv-e-squeeze', fx: [{ at: 0.4, kind: 'heart', n: 8, x: 50, y: 40, spread: 70 }] },

  // ── little reactions (not moves in the catalog) ──
  'try-on': { body: 'mv-b-try', wingL: 'mv-w-perk-l', wingR: 'mv-w-perk-r', antenna: 'mv-a-boing', eyes: 'mv-e-blink-late', fx: [{ at: 0.15, kind: 'star', n: 2, x: 50, y: 8, spread: 40 }] },
  'take-off': { body: 'mv-b-shake', antenna: 'mv-a-shake', wingL: 'mv-w-flap-l', wingR: 'mv-w-flap-r' },
  'got-it': { body: 'mv-b-hop', wingL: 'mv-w-air-l', wingR: 'mv-w-air-r', antenna: 'mv-a-lag', feetA: 'mv-f-tuck', feetB: 'mv-f-tuck', shadow: 'mv-sh-hop', eyes: 'mv-e-land', fx: [{ at: 0.3, kind: 'star', n: 5, x: 50, y: 10, spread: 70 }, ...dustLand(0.64)] },
}

/** Pixel glyphs for the effects, drawn on a tiny grid like Pochi. */
const GLYPHS: Record<FxKind, { rows: string[]; pal: Record<string, string> }> = {
  heart: { rows: ['.hh.hh.', 'hhhhhhh', 'hwhhhhh', '.hhhhh.', '..hhh..', '...h...'], pal: { h: '#ef6f8f', w: '#ffd0dc' } },
  note: { rows: ['...nnn', '...n.n', '...n.n', '...n.n', 'nnnn.n', 'nnnnnn', '.nn.nn'], pal: { n: '#b9a9ff' } },
  star: { rows: ['..s..', '..s..', 'sswss', '..s..', '..s..'], pal: { s: '#f2c94c', w: '#fff6cf' } },
  zzz: { rows: ['zzzz', '..z.', '.z..', 'zzzz'], pal: { z: '#9d8ff5' } },
  dust: { rows: ['.dd.', 'dddd', '.dd.'], pal: { d: 'rgba(200,196,214,.75)' } },
  confetti: { rows: ['cc', 'cc'], pal: { c: '#f2c94c' } },
  page: { rows: ['pppppp', 'plllpp', 'pppppp', 'plllll', 'pppppp', 'pllllp', 'pppppp'], pal: { p: '#fbf8ff', l: '#b9b2cc' } },
  scribble: { rows: ['s...s.', '.s.s.s', '..s...'], pal: { s: '#8f86a8' } },
  bang: { rows: ['bb', 'bb', 'bb', '..', 'bb'], pal: { b: '#f2c94c' } },
}
const CONFETTI = ['#f2c94c', '#ef6f8f', '#8cc3f5', '#a5dbc6', '#b9a9ff', '#f4b9a8']

export function glyphMarkup(kind: FxKind, n: number): string {
  const g = GLYPHS[kind]
  const pal = kind === 'confetti' ? { c: CONFETTI[n % CONFETTI.length] } : g.pal
  let r = ''
  g.rows.forEach((row, y) => row.split('').forEach((ch, x) => { if (pal[ch]) r += `<rect x="${x}" y="${y}" width="1.02" height="1.02" fill="${pal[ch]}"/>` }))
  return `<svg viewBox="0 0 ${g.rows[0].length} ${g.rows.length}" shape-rendering="crispEdges" aria-hidden="true">${r}</svg>`
}

export interface Particle {
  key: number
  kind: FxKind
  html: string
  x: number
  y: number
  dx: number
  dy: number
  rot: number
  wait: number
  size: number
  life: number
}

let nParticle = 0
/** The particles for a move, timed to it (`wait` in ms). */
export function particlesFor(rig: Rig, duration: number): Particle[] {
  const out: Particle[] = []
  for (const b of rig.fx ?? []) {
    for (let i = 0; i < b.n; i++) {
      const sp = b.spread ?? 0
      const k = b.n > 1 ? i / (b.n - 1) - 0.5 : 0
      const jitter = (Math.random() - 0.5) * 8
      const p: Particle = { key: ++nParticle, kind: b.kind, html: glyphMarkup(b.kind, i + nParticle), x: (b.x ?? 50) + k * sp * 0.4 + jitter * 0.3, y: b.y ?? 40, dx: 0, dy: 0, rot: 0, wait: b.at * duration + i * 60, size: 6, life: 1100 }
      switch (b.kind) {
        case 'heart':
        case 'star':
          p.dx = k * sp + jitter
          p.dy = -26 - Math.random() * 22
          p.rot = (Math.random() - 0.5) * 40
          p.size = b.kind === 'heart' ? 8 + Math.random() * 3 : 6 + Math.random() * 3
          break
        case 'note':
          p.dx = (k + (Math.random() - 0.5)) * 18
          p.dy = -34 - Math.random() * 10
          p.rot = (Math.random() - 0.5) * 30
          p.size = 8
          p.life = 1300
          break
        case 'zzz':
          p.dx = 14
          p.dy = -30
          p.size = 7
          p.life = 1500
          break
        case 'dust':
          p.dx = (b.x ?? 50) < 50 ? -12 - Math.random() * 8 : 12 + Math.random() * 8
          p.dy = -4 - Math.random() * 4
          p.size = 5 + Math.random() * 3
          p.life = 650
          p.x = (b.x ?? 50) + jitter * 0.4
          break
        case 'confetti':
          p.x = (b.x ?? 50) + k * sp
          p.dx = (Math.random() - 0.5) * 20
          p.dy = 90 + Math.random() * 30
          p.rot = (Math.random() - 0.5) * 540
          p.size = 2.6 + Math.random() * 1.6
          p.life = 1500 + Math.random() * 400
          p.wait += Math.random() * 250
          break
        case 'page':
          p.dx = 10
          p.dy = -18
          p.rot = 200
          p.size = 9
          p.life = 900
          break
        case 'scribble':
          p.dx = 8 + Math.random() * 8
          p.dy = -6 - Math.random() * 10
          p.size = 6
          p.life = 600
          p.wait += i * 90
          break
        case 'bang':
          p.dy = -6
          p.size = 4
          p.life = 700
          break
      }
      out.push(p)
    }
  }
  return out
}
