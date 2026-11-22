/**
 * Pochi Club, the console: shelves of tiles you drive with the arrow keys (or the mouse), and a big stage above them
 * that always shows Pochi with whatever you are looking at. Tuna Coins are earned by studying, never bought.
 *
 *   ↑ ↓  change shelf (Pochi, Wardrobe, Colours, Moves, Homes, Quests, Wallet)    ← →  move along it
 *   Enter  the main thing for that tile (wear, try on, play, claim…)    B  buy it    Q / E  wardrobe category
 *
 * Trying on is free: anything (even what is not unlocked yet) goes into the fitting room, and Pochi wears all of it
 * together on the stage. Buy one, or keep the whole look in one go.
 *
 * SHARED FILE: identical copies in Anvira Notes (src/pochi-club/) and the website (LocalHouseLLM src/pochi-club/).
 * Plain React and its own stylesheets (pochi-club.css, pochi-art.css), so it fits either host. ES2020 only.
 */
import { useEffect, useMemo, useRef, useState, useSyncExternalStore, type CSSProperties, type KeyboardEvent as ReactKeyboardEvent, type ReactNode } from 'react'
import { HOMES, ITEMS, MOODS, MOVES, PACKS, PALETTES, VIEWBOX, type Item, type Mood, type Slot } from './catalog'
import { COINS_PER_XP, EXAM_COINS, GOAL_BONUS, STREAK_BONUS, WELCOME_COINS, homeUnlocked, moveUnlocked } from './ledger'
import { FACE_BOX, SCENE_VIEWBOX, itemMarkup, pochiMarkup, sceneMarkup } from './render'
import { uid } from './art'
import { TunaCoin } from './coin'
import type { Club } from './engine'
import { RIGS, particlesFor, type Particle } from './moves'
import './pochi-art.css'
import './pochi-moves.css'

// a move without its own rig borrows one that fits its mood
const MOOD_RIG: Partial<Record<string, string>> = { happy: 'hello', sleepy: 'nap', thinking: 'focus-nod', excited: 'wiggle', proud: 'stretch', curious: 'page-flip', love: 'heartstorm' }

export interface PochiClubProps {
  club: Club
  /** 'app': coins come in as you study here; 'web': the same account, studying happens in the app */
  host: 'app' | 'web'
  /** streak and today's XP, when the host knows them (the app) */
  stats?: { streak: number; todayXp: number; dailyGoal: number }
  onClose?: () => void
  /** graphite (default) or Study's light paper look */
  dark?: boolean
  /** something the host adds under the header (the website's "open Anvira Notes to study") */
  banner?: ReactNode
}

// ── The wardrobe's categories ───────────────────────────────────────────────────────────────────────────────────────

type Cat = 'all' | 'headwear' | 'glasses' | 'face' | 'outfits' | 'back' | 'auras'
const CATS: { id: Cat; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'headwear', label: 'Hats & bows' },
  { id: 'glasses', label: 'Glasses' },
  { id: 'face', label: 'Face' },
  { id: 'outfits', label: 'Outfits' },
  { id: 'back', label: 'Bags & wings' },
  { id: 'auras', label: 'Auras' },
]
const GLASSES = /frames|glasses|goggles|specs|shades|monocle/
function catOf(it: Item): Cat {
  if (GLASSES.test(it.id)) return 'glasses'
  return ({ Head: 'headwear', Face: 'face', Outfit: 'outfits', Back: 'back', Aura: 'auras' } as Record<Slot, Cat>)[it.slot] ?? 'all'
}
type Sort = 'shelf' | 'price' | 'owned'
const SORTS: { id: Sort; label: string }[] = [
  { id: 'shelf', label: 'By type' },
  { id: 'price', label: 'Cheapest first' },
  { id: 'owned', label: 'Yours first' },
]
const RARITY_ORDER = ['Common', 'Rare', 'Epic', 'Legendary', 'Festival']

const MOOD_LABEL: Record<string, string> = { happy: 'Happy', excited: 'Excited', proud: 'Proud', curious: 'Curious', thinking: 'Thinking', sleepy: 'Sleepy', love: 'Lovey' }
const HOME_NOTE: Record<string, string> = {
  cloud: 'Soft clouds and a warm rug. Where every Pochi starts.',
  moon: 'A quiet night garden with a big moon and glowing blooms.',
  jelly: 'Underwater light, drifting jellies and swaying kelp.',
  stars: 'A round window full of stars and a little telescope.',
}

// ── Shelves and tiles ───────────────────────────────────────────────────────────────────────────────────────────────

type ShelfId = 'pochi' | 'wardrobe' | 'colours' | 'moves' | 'homes' | 'quests' | 'wallet'
const SHELVES: { id: ShelfId; label: string }[] = [
  { id: 'pochi', label: 'Pochi' },
  { id: 'wardrobe', label: 'Wardrobe' },
  { id: 'colours', label: 'Colours' },
  { id: 'moves', label: 'Moves' },
  { id: 'homes', label: 'Homes' },
  { id: 'quests', label: 'Quests' },
  { id: 'wallet', label: 'Wallet' },
]

type QuestId = 'hello' | 'lesson' | 'goal' | 'style'
type Tile =
  | { k: 'item'; id: string; group?: string }
  | { k: 'pal'; id: string }
  | { k: 'move'; id: string }
  | { k: 'pack'; id: string }
  | { k: 'home'; id: string }
  | { k: 'mood'; id: Mood }
  | { k: 'act'; id: 'hello' | 'routine' | 'rename' | 'stats' }
  | { k: 'quest'; id: QuestId }
  | { k: 'earn'; id: 'how' }
  | { k: 'bal'; id: 'balance' }
  | { k: 'hist'; id: string }

const tileKey = (t: Tile) => `${t.k}:${t.id}`

/** What Pochi is trying on: per slot, and a colour. Free, and only on the stage. */
interface Fitting {
  equipped: Partial<Record<string, string>>
  palette?: string
}
const NO_FIT: Fitting = { equipped: {} }

// ── Little drawings ────────────────────────────────────────────────────────────────────────────────────────────────

const Ico = ({ d, size = 18 }: { d: string; size?: number }) => (
  <svg className="pc-ico" width={size} height={size} viewBox="0 0 24 24" aria-hidden dangerouslySetInnerHTML={{ __html: d }} />
)
const IC = {
  back: '<path d="M15 6l-6 6 6 6"/>',
  lock: '<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 018 0v3"/>',
  check: '<path d="M5 12l4 4 10-10"/>',
  x: '<path d="M6 6l12 12M18 6L6 18"/>',
  play: '<path d="M8 5l11 7-11 7z" fill="currentColor" stroke="none"/>',
  hand: '<path d="M8 13V6a1.5 1.5 0 013 0v5M11 11V4.5a1.5 1.5 0 013 0V11M14 11V6a1.5 1.5 0 013 0v7a6 6 0 01-6 6h-1a6 6 0 01-5-3l-2-4a1.5 1.5 0 012.5-1.5L8 13"/>',
  book: '<path d="M4 5a2 2 0 012-2h13v16H6a2 2 0 00-2 2z"/><path d="M4 19V5"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M5 19l1.5-1.5M17.5 6.5L19 5"/>',
  ribbon: '<path d="M12 12c-3-4-8-4-8-1s5 3 8 1zm0 0c3-4 8-4 8-1s-5 3-8 1zm0 0l-3 8m3-8l3 8"/>',
  film: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M7 5v14M17 5v14M3 9h4M3 15h4M17 9h4M17 15h4"/>',
  pen: '<path d="M4 20h4L19 9l-4-4L4 16z"/><path d="M13 7l4 4"/>',
  sync: '<path d="M20 12a8 8 0 01-14 5.3M4 12a8 8 0 0114-5.3"/><path d="M18 3v4h-4M6 21v-4h4"/>',
  hanger: '<path d="M12 7a2 2 0 112-2c0 1-2 1.5-2 3"/><path d="M12 8l9 7H3z"/>',
  fish: '<path d="M3 12c3-4 8-5 12-3l4-3v12l-4-3c-4 2-9 1-12-3z"/><circle cx="8" cy="11" r=".8" fill="currentColor"/>',
}
const QUEST_IC: Record<string, string> = { hello: IC.hand, lesson: IC.book, goal: IC.sun, style: IC.ribbon }

/** The study star, in pixels like Pochi. */
function Star({ size = 14 }: { size?: number }) {
  const rows = ['...s...', '...s...', 'sssssss', '.sssss.', '..sss..', '.ss.ss.', 's.....s']
  return (
    <svg className="pc-star" width={size} height={size} viewBox="0 0 7 7" shapeRendering="crispEdges" aria-hidden>
      {rows.map((r, y) => r.split('').map((c, x) => (c === 's' ? <rect key={`${x}-${y}`} x={x} y={y} width="1.02" height="1.02" /> : null)))}
    </svg>
  )
}
function Hearts({ value, of = 5 }: { value: number; of?: number }) {
  return (
    <span className="pc-hearts" aria-hidden>
      {Array.from({ length: of }, (_, i) => (
        <svg key={i} viewBox="0 0 7 6" width="11" height="10" shapeRendering="crispEdges" className={i < value ? 'on' : ''}>
          <path d="M1 0h2v1h1V0h2v1h1v2H6v1H5v1H4v1H3V5H2V4H1V3H0V1h1z" />
        </svg>
      ))}
    </span>
  )
}

/** An svg of Pochi-art markup. */
const Art = ({ html, box = VIEWBOX }: { html: string; box?: string }) => <svg className="pc-art" viewBox={box} aria-hidden dangerouslySetInnerHTML={{ __html: html }} />

function SceneArt({ home, dark }: { home: string; dark: boolean }) {
  const html = useMemo(() => sceneMarkup(home, uid(`tile|${home}`)), [home])
  return <svg className={`pc-scene pa-scene pcs-${home}${dark ? ' pcs-dark' : ''}`} viewBox={SCENE_VIEWBOX} preserveAspectRatio="xMidYMax slice" aria-hidden dangerouslySetInnerHTML={{ __html: html }} />
}

/** A number that rolls to its new value. */
function useRolling(value: number) {
  const [shown, setShown] = useState(value)
  const from = useRef(value)
  useEffect(() => {
    const a = from.current
    const b = value
    if (a === b) return
    const t0 = performance.now()
    let raf = 0
    const step = (t: number) => {
      const k = Math.min(1, (t - t0) / 650)
      setShown(Math.round(a + (b - a) * (1 - Math.pow(1 - k, 3))))
      if (k < 1) raf = requestAnimationFrame(step)
      else from.current = b
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [value])
  return shown
}

function historyTitle(e: { kind: string; reason: string; ref: string; note?: string }): string {
  if (e.note) return e.note
  if (e.kind === 'spend') {
    const name = e.reason === 'item' ? ITEMS.find((i) => i.id === e.ref)?.name : e.reason === 'palette' ? PALETTES.find((p) => p.id === e.ref)?.name : PACKS.find((p) => p.id === e.ref)?.name
    return `Bought ${name ?? e.ref}`
  }
  return ({ welcome: 'Welcome gift', study: 'Studied', goal: 'Daily goal reached', streak: `${e.ref.split(':')[1] ?? ''}-day streak`, exam: 'Mock exam finished', quest: 'Quest claimed', gift: 'A gift from Anvira' } as Record<string, string>)[e.reason] ?? e.reason
}

const when = (iso: string) => {
  if (!iso) return ''
  const d = new Date(iso)
  const today = new Date()
  const y = new Date(today.getTime() - 86400000)
  const same = (a: Date, b: Date) => a.toDateString() === b.toDateString()
  const t = d.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
  return same(d, today) ? `Today, ${t}` : same(d, y) ? `Yesterday, ${t}` : d.toLocaleDateString([], { month: 'short', day: 'numeric' })
}

const itemOf = (id: string) => ITEMS.find((i) => i.id === id)

// ── The console ────────────────────────────────────────────────────────────────────────────────────────────────────

export default function PochiClubView({ club, host, stats, onClose, banner, dark = true }: PochiClubProps) {
  const snap = useSyncExternalStore(club.subscribe, club.get, club.get)
  const { state: s, look } = snap
  const coins = useRolling(s.coins)

  const [shelf, setShelf] = useState<ShelfId>('wardrobe')
  const [sel, setSel] = useState<Record<string, string>>({})
  const [cat, setCat] = useState<Cat>('all')
  const [sort, setSort] = useState<Sort>('shelf')
  const [fit, setFit] = useState<Fitting>(NO_FIT)
  const [confirmAll, setConfirmAll] = useState(false)
  const [renaming, setRenaming] = useState(false)
  const [toast, setToast] = useState<{ text: string; n: number } | null>(null)
  const [line, setLine] = useState<{ text: string; n: number } | null>(null)
  const [burst, setBurst] = useState<{ n: number; text: string; minus?: boolean } | null>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const stripRef = useRef<HTMLDivElement>(null)
  const nToast = useRef(0)

  const say = (text: string) => setToast({ text, n: ++nToast.current })
  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 2600)
    return () => clearTimeout(t)
  }, [toast])
  useEffect(() => {
    if (!line) return
    const t = setTimeout(() => setLine(null), 3400)
    return () => clearTimeout(t)
  }, [line])
  useEffect(() => {
    if (!confirmAll) return
    const t = setTimeout(() => setConfirmAll(false), 4000)
    return () => clearTimeout(t)
  }, [confirmAll])

  // coins coming in (studying, a claimed quest) or going out
  const lastCoins = useRef(s.coins)
  useEffect(() => {
    if (s.coins > lastCoins.current) setBurst({ n: Date.now(), text: `+${s.coins - lastCoins.current}` })
    else if (s.coins < lastCoins.current) setBurst({ n: Date.now(), text: `−${lastCoins.current - s.coins}`, minus: true })
    lastCoins.current = s.coins
  }, [s.coins])

  // sync when opened, and when back online
  useEffect(() => {
    void club.sync()
    const on = () => void club.sync()
    window.addEventListener('online', on)
    return () => window.removeEventListener('online', on)
  }, [club])

  // ── what things are ──
  const itemOpen = (it: Item) => s.everything || s.stars >= it.unlockAt
  const owns = (t: Tile) => (t.k === 'item' ? s.owned.has(t.id) : t.k === 'pal' ? s.palettes.has(t.id) : t.k === 'pack' ? s.packs.has(t.id) || s.everything : true)
  const wearing = (t: Tile) => (t.k === 'item' ? Object.values(look.equipped).includes(t.id) : t.k === 'pal' ? look.palette === t.id : t.k === 'home' ? look.home === t.id : t.k === 'mood' ? look.mood === t.id : false)
  const trying = (t: Tile) => (t.k === 'item' ? Object.values(fit.equipped).includes(t.id) : t.k === 'pal' ? fit.palette === t.id : false)

  // ── the shelves' tiles ──
  const wardrobe = useMemo(() => {
    const order = (it: Item) => CATS.findIndex((c) => c.id === catOf(it))
    const list = ITEMS.filter((it) => cat === 'all' || catOf(it) === cat).sort((a, b) => {
      if (sort === 'price') return a.price - b.price
      if (sort === 'owned') return Number(s.owned.has(b.id)) - Number(s.owned.has(a.id)) || order(a) - order(b) || a.price - b.price
      return order(a) - order(b) || a.unlockAt - b.unlockAt || RARITY_ORDER.indexOf(a.rarity) - RARITY_ORDER.indexOf(b.rarity) || a.price - b.price
    })
    let last: Cat | null = null
    return list.map((it): Tile => {
      const c = catOf(it)
      const group = cat === 'all' && sort === 'shelf' && c !== last ? CATS.find((x) => x.id === c)?.label : undefined
      last = c
      return { k: 'item', id: it.id, group }
    })
  }, [cat, sort, s.owned])

  const tilesOf = (id: ShelfId): Tile[] => {
    switch (id) {
      case 'pochi':
        return [{ k: 'act', id: 'stats' }, { k: 'act', id: 'hello' }, { k: 'act', id: 'routine' }, ...MOODS.map((m): Tile => ({ k: 'mood', id: m })), { k: 'act', id: 'rename' }]
      case 'wardrobe':
        return wardrobe
      case 'colours':
        return PALETTES.map((p): Tile => ({ k: 'pal', id: p.id }))
      case 'moves':
        return [...MOVES.filter((m) => !m.packId).map((m): Tile => ({ k: 'move', id: m.id })), ...PACKS.map((p): Tile => ({ k: 'pack', id: p.id }))]
      case 'homes':
        return HOMES.map((h): Tile => ({ k: 'home', id: h.id }))
      case 'quests':
        return [...s.quests.map(({ quest }): Tile => ({ k: 'quest', id: quest.id })), { k: 'earn', id: 'how' }]
      case 'wallet':
        return [{ k: 'bal', id: 'balance' }, ...s.history.filter((e) => e.kind !== 'care').slice(0, 30).map((e): Tile => ({ k: 'hist', id: e.id }))]
    }
  }
  const tiles = tilesOf(shelf)
  const at = Math.max(0, tiles.findIndex((t) => tileKey(t) === sel[shelf]))
  const tile = tiles[at] as Tile | undefined
  const tk = tile ? tileKey(tile) : ''

  // ── focus: the selected tile of the shelf is the one that takes the keys (a roving tab stop) ──
  // on opening, the keys go straight to the shelf
  const wantFocus = useRef(true)
  const focusTile = () => stripRef.current?.querySelector<HTMLElement>('.pc-tile.is-sel')?.focus({ preventScroll: true })
  // keep the selected tile in view, a couple of tiles in from the left
  useEffect(() => {
    const strip = stripRef.current
    const slot = strip?.querySelector<HTMLElement>('.pc-tile.is-sel')?.parentElement
    if (strip && slot) {
      const left = Math.max(0, slot.offsetLeft - (slot.offsetWidth + 14) * 2)
      if (Math.abs(strip.scrollLeft - left) > 2) strip.scrollTo({ left, behavior: 'smooth' })
    }
    if (wantFocus.current) {
      wantFocus.current = false
      focusTile()
    }
  })

  const select = (sh: ShelfId, t: Tile | undefined, focus = true) => {
    if (!t) return
    setSel((x) => ({ ...x, [sh]: tileKey(t) }))
    setConfirmAll(false)
    wantFocus.current = focus
  }
  const goShelf = (sh: ShelfId, focus = true) => {
    setShelf(sh)
    setRenaming(false)
    wantFocus.current = focus
  }
  const setCategory = (c: Cat) => {
    setCat(c)
    setSel((x) => ({ ...x, wardrobe: '' }))
    wantFocus.current = true
  }

  // ── moves on the stage ──
  const nPlay = useRef(0)
  const [fx, setFx] = useState<Particle[]>([])
  // each move is acted part by part: body, fins, antenna, feet, eyes, the shadow and the sparkles all get their own
  // keyframes (pochi-moves.css), and its pixel effects (hearts, notes, dust...) are timed to it
  const animate = (moveId: string, duration: number) => {
    const el = stageRef.current?.querySelector<SVGSVGElement>('svg.pc-sprite')
    if (!el) return
    const m = MOVES.find((x) => x.id === moveId)
    const rig = RIGS[moveId] ?? (m && RIGS[MOOD_RIG[m.mood] ?? '']) ?? RIGS['try-on']
    el.dataset.move = moveId
    el.style.setProperty('--pochi-move-duration', `${duration}ms`)
    const parts: [string, string | undefined][] = [
      ['--mv-body', rig.body], ['--mv-wl', rig.wingL], ['--mv-wr', rig.wingR], ['--mv-ant', rig.antenna], ['--mv-fa', rig.feetA],
      ['--mv-fb', rig.feetB ?? rig.feetA], ['--mv-eyes', rig.eyes], ['--mv-sh', rig.shadow], ['--mv-sp', rig.sparkles],
    ]
    for (const [k, v] of parts) el.style.setProperty(k, v ?? 'none')
    el.classList.remove('is-playing')
    void el.getBoundingClientRect()
    el.classList.add('is-playing')
    const n = ++nPlay.current
    const ps = particlesFor(rig, duration)
    setFx(ps)
    const end = Math.max(duration, ...ps.map((p) => p.wait + p.life)) + 80
    window.setTimeout(() => {
      if (n !== nPlay.current) return
      el.classList.remove('is-playing')
      setFx([])
    }, end)
    window.setTimeout(() => n === nPlay.current && el.classList.remove('is-playing'), duration + 80)
  }
  const play = (id: string, opts: { hello?: boolean; quiet?: boolean } = {}) => {
    const m = MOVES.find((x) => x.id === id)
    if (!m) return
    if (!moveUnlocked(s, m.id)) {
      if (!opts.quiet) say(m.packId ? `${m.name} comes in the ${PACKS.find((p) => p.id === m.packId)?.name} pack.` : `${m.name} unlocks at ${m.unlockAt} study stars${m.bond ? ` and a bond of ${m.bond}` : ''}.`)
      return
    }
    animate(m.id, m.duration)
    if (opts.quiet) return
    setLine({ text: m.line.split('Pochi').join(look.nickname), n: Date.now() })
    if (m.mood !== look.mood) club.setLook({ mood: m.mood })
    if (opts.hello) club.hello()
  }
  const playRoutine = async () => {
    for (const id of look.routine) {
      const m = MOVES.find((x) => x.id === id)
      if (!m) continue
      play(m.id)
      await new Promise((r) => setTimeout(r, m.duration + 250))
    }
  }
  // landing on a move (or a pack) previews it, without changing anything
  useEffect(() => {
    if (!tile || (tile.k !== 'move' && tile.k !== 'pack')) return
    const id = tile.k === 'move' ? tile.id : PACKS.find((p) => p.id === tile.id)?.moves[0]
    const m = MOVES.find((x) => x.id === id)
    if (!m) return
    const t = setTimeout(() => animate(m.id, m.duration), 280)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shelf, tk])

  // ── doing things ──
  const wear = (it: Item) => {
    club.setLook({ equipped: { ...look.equipped, [it.slot]: it.id } })
    setFit((f) => ({ ...f, equipped: { ...f.equipped, [it.slot]: undefined } }))
    animate('try-on', 900)
  }
  const takeOff = (it: Item) => {
    const next = { ...look.equipped }
    delete next[it.slot]
    club.setLook({ equipped: next })
    animate('take-off', 700)
  }
  const tryOn = (t: Tile) => {
    if (t.k === 'item') {
      const it = itemOf(t.id)!
      setFit((f) => ({ ...f, equipped: { ...f.equipped, [it.slot]: f.equipped[it.slot] === it.id ? undefined : it.id } }))
    } else if (t.k === 'pal') setFit((f) => ({ ...f, palette: f.palette === t.id ? undefined : t.id }))
    setConfirmAll(false)
    animate('try-on', 800)
  }
  const buy = (t: Tile, quiet = false): boolean => {
    const what = t.k === 'item' ? 'item' : t.k === 'pal' ? 'palette' : t.k === 'pack' ? 'pack' : null
    if (!what) return false
    if (t.k === 'item') {
      const it = itemOf(t.id)!
      if (it.event) return say('The Moon Jelly Crown is a festival prize: study five days in all and it is yours.'), false
      if (!itemOpen(it)) return say(`${it.name} unlocks at ${it.unlockAt} study stars. You have ${s.stars}.`), false
    }
    const r = club.buy(what, t.id)
    if (!r.ok) return say(r.why ?? 'Not yet.'), false
    wantFocus.current = true
    // what you buy, she wears
    if (t.k === 'item') {
      const it = itemOf(t.id)!
      club.setLook({ equipped: { ...club.get().look.equipped, [it.slot]: it.id } })
      setFit((f) => ({ ...f, equipped: { ...f.equipped, [it.slot]: undefined } }))
    } else if (t.k === 'pal') {
      club.setLook({ palette: t.id })
      setFit((f) => ({ ...f, palette: undefined }))
    }
    if (!quiet) {
      const name = t.k === 'item' ? itemOf(t.id)?.name : t.k === 'pal' ? PALETTES.find((p) => p.id === t.id)?.name : PACKS.find((p) => p.id === t.id)?.name
      say(t.k === 'pack' ? `${name} is yours: five new moves` : `${name} is yours`)
      if (t.k === 'pack') play(PACKS.find((p) => p.id === t.id)!.moves[0])
      else animate('got-it', 1000)
    }
    return true
  }

  // the fitting room: what is being tried, and what of it can be bought now
  const fitting = useMemo(() => {
    const rows: { t: Tile; name: string; price: number; can: boolean; why?: string; art: string }[] = []
    for (const id of Object.values(fit.equipped)) {
      const it = id ? itemOf(id) : undefined
      if (!it) continue
      const mine = s.owned.has(it.id)
      const why = mine ? undefined : it.event ? 'Festival prize' : !(s.everything || s.stars >= it.unlockAt) ? `Opens at ${it.unlockAt} stars` : undefined
      rows.push({ t: { k: 'item', id: it.id }, name: it.name, price: mine ? 0 : it.price, can: !why, why, art: itemMarkup(it.id) })
    }
    if (fit.palette) {
      const p = PALETTES.find((x) => x.id === fit.palette)
      if (p) rows.push({ t: { k: 'pal', id: p.id }, name: p.name, price: s.palettes.has(p.id) ? 0 : p.price, can: true, art: pochiMarkup({ palette: p.id, equipped: {}, mood: 'happy' }, { box: FACE_BOX }) })
    }
    const total = rows.filter((r) => r.can).reduce((a, r) => a + r.price, 0)
    return { rows, total, buyable: rows.filter((r) => r.can).length, blocked: rows.filter((r) => !r.can).length }
  }, [fit, s])

  const keepLook = () => {
    if (!fitting.buyable) return
    if (fitting.total > s.coins) return say(`You need ${fitting.total - s.coins} more Tuna Coins for all of it. Study a little and they come in.`)
    if (!confirmAll && fitting.total > 0) return setConfirmAll(true)
    setConfirmAll(false)
    let n = 0
    for (const r of fitting.rows) {
      if (!r.can) continue
      if (r.price === 0 || buy(r.t, true)) n++
    }
    // put everything on at once
    const cur = club.get().look
    const eq = { ...cur.equipped }
    let palette = cur.palette
    for (const r of fitting.rows) {
      if (!r.can) continue
      if (r.t.k === 'item') eq[itemOf(r.t.id)!.slot] = r.t.id
      else palette = r.t.id
    }
    club.setLook({ equipped: eq, palette })
    // what could not be bought yet stays on the stage
    const left: Fitting = { equipped: {} }
    for (const r of fitting.rows) if (!r.can && r.t.k === 'item') left.equipped[itemOf(r.t.id)!.slot] = r.t.id
    setFit(left)
    wantFocus.current = true
    if (n) {
      say(n === 1 ? 'Kept the new look' : `Kept all ${n}: Pochi is wearing them`)
      play(moveUnlocked(s, 'dance') ? 'dance' : 'hello', { quiet: true })
    }
  }

  const claim = (id: 'hello' | 'lesson' | 'style') => {
    if (club.claimQuest(id)) {
      const q = s.quests.find((x) => x.quest.id === id)
      say(`+${q ? q.quest.reward : ''} Tuna Coins`)
      animate('quest-clap', 1400)
    }
  }

  // ── the stage: Pochi as she is, with the fitting room, with what you are looking at ──
  const stageLook = useMemo(() => {
    const eq: Partial<Record<string, string>> = { ...look.equipped }
    for (const [slot, id] of Object.entries(fit.equipped)) if (id) eq[slot] = id
    let palette = fit.palette ?? look.palette
    let mood: Mood = look.mood
    let home = look.home
    if (tile) {
      if (tile.k === 'item') {
        const it = itemOf(tile.id)
        if (it) eq[it.slot] = it.id
      } else if (tile.k === 'pal') palette = tile.id
      else if (tile.k === 'home') home = tile.id
      else if (tile.k === 'mood') mood = tile.id
      else if (tile.k === 'move') mood = MOVES.find((m) => m.id === tile.id)?.mood ?? mood
      else if (tile.k === 'pack') mood = MOVES.find((m) => m.id === PACKS.find((p) => p.id === tile.id)?.moves[0])?.mood ?? mood
    }
    return { palette, equipped: eq, mood, home, form: look.form }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [look, fit, shelf, tk])
  const spriteHtml = useMemo(() => pochiMarkup(stageLook), [stageLook])
  const sceneHtml = useMemo(() => sceneMarkup(stageLook.home, uid(`stage|${stageLook.home}`)), [stageLook.home])

  // ── the hero text and its buttons, for the selected tile ──
  type Btn = { label: ReactNode; run: () => void; off?: boolean; key?: string }
  const coin = (n: number) => (
    <>
      <TunaCoin size={16} /> {n.toLocaleString()}
    </>
  )
  const lock = (n: number, more = '') => (
    <>
      <Ico d={IC.lock} size={14} /> {n} stars{more}
    </>
  )
  const hero = ((): { kicker: ReactNode; title: ReactNode; body: ReactNode; main?: Btn; second?: Btn; extra?: ReactNode; enter?: string } => {
    if (!tile) return { kicker: null, title: '', body: '' }
    if (tile.k === 'item') {
      const it = itemOf(tile.id)!
      const own = s.owned.has(it.id)
      const on = wearing(tile)
      const tr = trying(tile)
      const open = itemOpen(it)
      const kicker = (
        <>
          <span className={`pc-rar r-${it.rarity}`}>{it.rarity}</span>
          <span>{CATS.find((c) => c.id === catOf(it))?.label}</span>
        </>
      )
      if (own) return { kicker, title: it.name, body: it.note, enter: on ? 'take off' : 'wear', main: { label: on ? 'Take off' : 'Wear', run: () => (on ? takeOff(it) : wear(it)) }, extra: <span className="pc-state"><Ico d={IC.check} size={14} /> Yours</span> }
      return {
        kicker,
        title: it.name,
        body: it.note,
        enter: tr ? 'take off' : 'try on',
        main: { label: tr ? 'Take it off' : 'Try on', run: () => tryOn(tile) },
        second: it.event ? { label: 'Festival prize', run: () => buy(tile), off: true } : open ? { label: <>Buy {coin(it.price)}</>, run: () => buy(tile), key: 'B' } : { label: lock(it.unlockAt), run: () => buy(tile), off: true },
        extra: it.event ? <span className="pc-state">Study five days in all to earn it</span> : !open ? <span className="pc-state">Try it on now; buy it once you have {it.unlockAt} stars.</span> : null,
      }
    }
    if (tile.k === 'pal') {
      const p = PALETTES.find((x) => x.id === tile.id)!
      const body = 'Changes Pochi all over, outfits included.'
      if (s.palettes.has(p.id)) {
        const on = wearing(tile)
        return { kicker: <span>Colour</span>, title: p.name, body, enter: on ? undefined : 'wear', main: { label: on ? 'Wearing it' : 'Wear', run: () => !on && club.setLook({ palette: p.id }), off: on } }
      }
      const tr = trying(tile)
      return { kicker: <span>Colour</span>, title: p.name, body, enter: tr ? 'take off' : 'try on', main: { label: tr ? 'Stop trying' : 'Try on', run: () => tryOn(tile) }, second: { label: <>Buy {coin(p.price)}</>, run: () => buy(tile), key: 'B' } }
    }
    if (tile.k === 'move') {
      const m = MOVES.find((x) => x.id === tile.id)!
      const ok = moveUnlocked(s, m.id)
      const fav = look.favoriteMove === m.id
      return {
        kicker: (
          <>
            <span>Move</span>
            <span>{(m.duration / 1000).toFixed(1)} s</span>
            <span>{MOOD_LABEL[m.mood] ?? m.mood}</span>
          </>
        ),
        title: m.name,
        body: m.note,
        enter: ok ? 'play' : undefined,
        main: ok ? { label: <><Ico d={IC.play} size={13} /> Play</>, run: () => play(m.id) } : { label: lock(m.unlockAt, m.bond ? ` · bond ${m.bond}` : ''), run: () => play(m.id), off: true },
        second: ok ? { label: fav ? 'Her hello move' : 'Use for hello', run: () => { if (!fav) { club.setLook({ favoriteMove: m.id }); say(`${look.nickname} says hello with ${m.name} now`) } }, off: fav } : undefined,
      }
    }
    if (tile.k === 'pack') {
      const p = PACKS.find((x) => x.id === tile.id)!
      const own = owns(tile)
      const names = p.moves.map((id) => MOVES.find((m) => m.id === id)?.name).filter(Boolean).join(' · ')
      return {
        kicker: (
          <>
            <span>Move pack</span>
            <span>{p.task}</span>
          </>
        ),
        title: p.name,
        body: (
          <>
            {p.description}
            <small className="pc-hero-sub">{names}</small>
          </>
        ),
        enter: own ? 'play' : 'buy',
        main: own ? { label: <><Ico d={IC.play} size={13} /> Play the first</>, run: () => play(p.moves[0]) } : { label: <>Buy {coin(p.price)}</>, run: () => buy(tile) },
        extra: own ? <span className="pc-state"><Ico d={IC.check} size={14} /> Yours: its moves are on this shelf's pack</span> : null,
      }
    }
    if (tile.k === 'home') {
      const h = HOMES.find((x) => x.id === tile.id)!
      const ok = homeUnlocked(s, h.id)
      const on = look.home === h.id
      return {
        kicker: <span>Home</span>,
        title: h.name,
        body: HOME_NOTE[h.id] ?? '',
        enter: ok && !on ? 'move here' : undefined,
        main: on ? { label: 'Home now', run: () => undefined, off: true } : ok ? { label: 'Move here', run: () => club.setLook({ home: h.id }) } : { label: lock(h.unlockAt), run: () => undefined, off: true },
        extra: !ok ? <span className="pc-state">Just visiting: it opens at {h.unlockAt} study stars.</span> : null,
      }
    }
    if (tile.k === 'mood') {
      const on = look.mood === tile.id
      return { kicker: <span>Mood</span>, title: MOOD_LABEL[tile.id] ?? tile.id, body: 'How Pochi feels when you open the club. Moves change it too.', enter: on ? undefined : 'set mood', main: { label: on ? 'Her mood now' : 'Set mood', run: () => { if (!on) club.setLook({ mood: tile.id }) }, off: on } }
    }
    if (tile.k === 'act') {
      if (tile.id === 'stats') {
        const goal = stats ? Math.min(100, Math.round((stats.todayXp / Math.max(1, stats.dailyGoal)) * 100)) : null
        const hearts = Math.round(((s.bond - s.bondTier.from) / Math.max(1, (s.bondTier.next ?? s.bond + 1) - s.bondTier.from)) * 5)
        const pct = Math.max(3, Math.min(100, ((s.stars - s.rank.at) / Math.max(1, (s.rank.next ?? s.stars + 1) - s.rank.at)) * 100))
        return {
          kicker: (
            <>
              <span>{s.rank.name}</span>
              <span>{s.bondTier.name}</span>
            </>
          ),
          title: look.nickname,
          body: (
            <span className="pc-meters">
              <span className="pc-mrow">
                <span>
                  <Star size={12} /> Study stars
                </span>
                <b>
                  {s.stars.toLocaleString()}
                  {s.rank.next !== null ? ` / ${s.rank.next.toLocaleString()}` : ''}
                </b>
              </span>
              <span className="pc-meter">
                <i style={{ width: `${pct}%` }} />
              </span>
              <span className="pc-mrow">
                <span>Friendship · bond {s.bond}</span>
                <b>
                  <Hearts value={hearts} />
                </b>
              </span>
              {stats && (
                <span className="pc-mrow">
                  <span>{stats.streak}-day streak</span>
                  <b>{goal}% of today's goal</b>
                </span>
              )}
              {s.moments.length > 0 && <span className="pc-mrow pc-mem">Latest memory: {s.moments[0].title}</span>}
            </span>
          ),
        }
      }
      if (tile.id === 'hello')
        return { kicker: <span>Pochi</span>, title: 'Say hello', body: `${look.nickname} answers with ${MOVES.find((m) => m.id === look.favoriteMove)?.name ?? 'a wave'}. Saying hello once a day is one of today's quests.`, enter: 'say hello', main: { label: <><Ico d={IC.hand} size={15} /> Say hello</>, run: () => play(look.favoriteMove, { hello: true }) } }
      if (tile.id === 'routine') {
        const names = look.routine.map((id) => MOVES.find((m) => m.id === id)?.name ?? id).join(', then ')
        return { kicker: <span>Pochi</span>, title: 'Her routine', body: `${names}.`, enter: 'play', main: { label: <><Ico d={IC.play} size={13} /> Play routine</>, run: () => void playRoutine() } }
      }
      return { kicker: <span>Pochi</span>, title: renaming ? 'A new name' : 'Rename', body: `She is called ${look.nickname}.`, enter: renaming ? undefined : 'rename', main: renaming ? undefined : { label: <><Ico d={IC.pen} size={14} /> Rename</>, run: () => setRenaming(true) } }
    }
    if (tile.k === 'quest') {
      const q = s.quests.find((x) => x.quest.id === tile.id)!
      const ready = q.done && !q.claimed && tile.id !== 'goal'
      const todo: Btn =
        tile.id === 'hello'
          ? { label: <><Ico d={IC.hand} size={15} /> Say hello</>, run: () => play(look.favoriteMove, { hello: true }) }
          : tile.id === 'style'
            ? { label: 'Open the wardrobe', run: () => goShelf('wardrobe') }
            : { label: 'Not done yet', run: () => undefined, off: true }
      return {
        kicker: (
          <>
            <span>Today's quest</span>
            <span>+{q.quest.reward} coins</span>
          </>
        ),
        title: q.quest.title,
        body: tile.id === 'goal' ? `${q.quest.detail}. The bonus comes in by itself.` : host === 'web' && tile.id === 'lesson' ? `${q.quest.detail}. It shows up here the next time it syncs.` : q.quest.detail,
        enter: ready ? 'claim' : q.claimed || todo.off ? undefined : 'go',
        main: q.claimed ? { label: <><Ico d={IC.check} size={14} /> Claimed</>, run: () => undefined, off: true } : ready ? { label: <>Claim {coin(q.quest.reward)}</>, run: () => claim(tile.id as 'hello' | 'lesson' | 'style') } : todo,
      }
    }
    if (tile.k === 'earn') {
      return {
        kicker: <span>Tuna Coins</span>,
        title: 'How coins come in',
        body: (
          <span className="pc-earn">
            <span>
              A lesson, quiz or review <b>1 per {Math.round(1 / COINS_PER_XP)} XP</b>
            </span>
            <span>
              Reach your daily goal <b>+{GOAL_BONUS}</b>
            </span>
            <span>
              Finish a mock exam <b>+{EXAM_COINS}</b>
            </span>
            <span>
              Streaks{' '}
              <b>
                {STREAK_BONUS.slice(0, 3)
                  .map(([d, c]) => `${d} days +${c}`)
                  .join(' · ')}
                …
              </b>
            </span>
            <span>
              Welcome gift <b>+{WELCOME_COINS}</b>
            </span>
            <small className="pc-hero-sub">Coins only come from studying; they can never be bought.</small>
          </span>
        ),
      }
    }
    if (tile.k === 'bal') {
      return {
        kicker: <span>Wallet</span>,
        title: (
          <span className="pc-bal">
            <TunaCoin size={34} /> {s.coins.toLocaleString()}
          </span>
        ),
        body: (
          <span className="pc-earn">
            <span>
              Earned ever <b>{s.earned.toLocaleString()}</b>
            </span>
            <span>
              Today <b>{s.todayEarned.toLocaleString()}</b>
            </span>
            <span>
              Study days <b>{s.studyDays}</b>
            </span>
            <small className="pc-hero-sub">
              {snap.pending ? `${snap.pending} change${snap.pending === 1 ? '' : 's'} waiting to sync. ` : ''}
              {snap.lastSync ? `Last synced ${new Date(snap.lastSync).toLocaleString()}.` : 'Kept on this device until it can sync.'}
            </small>
          </span>
        ),
        main: { label: <><Ico d={IC.sync} size={14} /> {snap.syncing ? 'Syncing…' : 'Sync now'}</>, run: () => void club.sync(), off: snap.syncing },
      }
    }
    const e = s.history.find((x) => x.id === tile.id)
    if (!e) return { kicker: null, title: '', body: '' }
    return {
      kicker: <span>{e.kind === 'earn' ? 'Came in' : 'Spent'}</span>,
      title: historyTitle(e),
      body: (
        <>
          {new Date(e.at).toLocaleString()}
          {!e.ok && <small className="pc-hero-sub">Not counted: it went over a limit (the daily cap, or a buy without enough coins on another device).</small>}
        </>
      ),
      extra: <span className={`pc-amount ${e.kind === 'earn' ? 'plus' : ''}`}>{e.ok ? (e.kind === 'earn' ? '+' : '−') + e.amount.toLocaleString() : 'not counted'}</span>,
    }
  })()

  // ── keys ──
  const onKey = (e: Pick<ReactKeyboardEvent, 'key' | 'target' | 'ctrlKey' | 'metaKey' | 'altKey' | 'preventDefault'>) => {
    const target = e.target as HTMLElement
    if (target.closest('input, textarea, select')) return
    if (e.ctrlKey || e.metaKey || e.altKey) return
    const k = e.key
    if (k === 'ArrowLeft' || k === 'ArrowRight') {
      e.preventDefault()
      const dir = k === 'ArrowLeft' ? -1 : 1
      // in a row of buttons (categories, the hero's buttons, the fitting room): along that row
      const row = target.closest<HTMLElement>('.pc-cats, .pc-fit, .pc-hero-acts, .pc-shelves')
      if (row) {
        const list = Array.from(row.querySelectorAll<HTMLElement>('button:not(:disabled)'))
        list[list.indexOf(target) + dir]?.focus()
        return
      }
      const n = tiles[at + dir]
      if (n) select(shelf, n)
      else focusTile()
      return
    }
    if (k === 'ArrowUp' || k === 'ArrowDown') {
      e.preventDefault()
      const i = SHELVES.findIndex((x) => x.id === shelf) + (k === 'ArrowUp' ? -1 : 1)
      if (i >= 0 && i < SHELVES.length) goShelf(SHELVES[i].id)
      else focusTile()
      return
    }
    if (shelf === 'wardrobe' && 'qQeE[]'.indexOf(k) >= 0 && k.length === 1) {
      e.preventDefault()
      const i = CATS.findIndex((c) => c.id === cat) + ('qQ['.indexOf(k) >= 0 ? -1 : 1)
      setCategory(CATS[(i + CATS.length) % CATS.length].id)
      return
    }
    if ((k === 'b' || k === 'B') && tile && (tile.k === 'item' || tile.k === 'pal' || tile.k === 'pack') && !owns(tile)) {
      e.preventDefault()
      buy(tile)
      return
    }
    if ((k === 'Home' || k === 'End') && target.closest('.pc-strip')) {
      e.preventDefault()
      select(shelf, k === 'Home' ? tiles[0] : tiles[tiles.length - 1])
    }
  }

  // when nothing has focus (a button that did its job and went away), the keys still drive the console
  const onKeyRef = useRef(onKey)
  onKeyRef.current = onKey
  useEffect(() => {
    const on = (e: KeyboardEvent) => {
      const a = document.activeElement
      if (e.defaultPrevented || (a && a !== document.body)) return
      onKeyRef.current(e as unknown as ReactKeyboardEvent)
    }
    window.addEventListener('keydown', on)
    return () => window.removeEventListener('keydown', on)
  }, [])

  // a tile pressed: the first press selects it, a press on the selected one does its main thing (Enter, a 2nd click)
  const press = (t: Tile, i: number) => {
    if (i !== at) return select(shelf, t)
    if (hero.main && !hero.main.off) hero.main.run()
  }

  // ── tile drawings ──
  const face = (palette: string, mood: Mood) => <Art html={pochiMarkup({ palette, equipped: {}, mood }, { box: FACE_BOX })} />
  const tileArt = (t: Tile): ReactNode => {
    if (t.k === 'item') return <Art html={itemMarkup(t.id)} />
    if (t.k === 'pal') return face(t.id, 'happy')
    if (t.k === 'move') return face(look.palette, MOVES.find((m) => m.id === t.id)?.mood ?? 'happy')
    if (t.k === 'pack') {
      const p = PACKS.find((x) => x.id === t.id)!
      return <span className="pc-pack-art">{p.moves.slice(0, 3).map((id) => <span key={id}>{face(look.palette, MOVES.find((m) => m.id === id)?.mood ?? 'happy')}</span>)}</span>
    }
    if (t.k === 'home') return <SceneArt home={t.id} dark={dark} />
    if (t.k === 'mood') return face(look.palette, t.id)
    if (t.k === 'act') {
      if (t.id === 'stats') return <Art html={pochiMarkup({ palette: look.palette, equipped: look.equipped, mood: look.mood })} />
      return <Ico d={t.id === 'hello' ? IC.hand : t.id === 'routine' ? IC.film : IC.pen} size={30} />
    }
    if (t.k === 'quest') return <Ico d={QUEST_IC[t.id]} size={28} />
    if (t.k === 'earn') return <Ico d={IC.fish} size={28} />
    if (t.k === 'bal') return <TunaCoin size={36} />
    const e = s.history.find((x) => x.id === t.id)
    return e && e.kind === 'spend' && e.reason === 'item' ? <Art html={itemMarkup(e.ref)} /> : <TunaCoin size={26} />
  }
  const tileName = (t: Tile): string => {
    if (t.k === 'item') return itemOf(t.id)?.name ?? t.id
    if (t.k === 'pal') return PALETTES.find((p) => p.id === t.id)?.name ?? t.id
    if (t.k === 'move') return MOVES.find((m) => m.id === t.id)?.name ?? t.id
    if (t.k === 'pack') return PACKS.find((p) => p.id === t.id)?.name ?? t.id
    if (t.k === 'home') return HOMES.find((h) => h.id === t.id)?.name ?? t.id
    if (t.k === 'mood') return MOOD_LABEL[t.id] ?? t.id
    if (t.k === 'act') return ({ stats: look.nickname, hello: 'Say hello', routine: 'Routine', rename: 'Rename' } as Record<string, string>)[t.id]
    if (t.k === 'quest') return s.quests.find((q) => q.quest.id === t.id)?.quest.title ?? t.id
    if (t.k === 'earn') return 'How coins come in'
    if (t.k === 'bal') return 'Balance'
    const e = s.history.find((x) => x.id === t.id)
    return e ? historyTitle(e) : ''
  }
  const badge = (cls: string, d: string) => (
    <span className={`pc-badge ${cls}`}>
      <Ico d={d} size={12} />
    </span>
  )
  const lockMark = (
    <span className="pc-lock">
      <Ico d={IC.lock} size={13} />
    </span>
  )
  /** the small mark in a tile's corner, its price line, and whether it is dimmed */
  const tileMark = (t: Tile): { mark?: ReactNode; dim?: boolean; tag?: ReactNode } => {
    if (t.k === 'item' || t.k === 'pal') {
      if (wearing(t)) return { mark: badge('on', IC.check) }
      if (trying(t)) return { mark: badge('try', IC.hanger) }
      if (owns(t)) return { tag: 'Yours' }
      if (t.k === 'pal') return { tag: <><TunaCoin size={12} /> {PALETTES.find((p) => p.id === t.id)?.price}</> }
      const it = itemOf(t.id)!
      if (it.event) return { dim: true, tag: 'Festival' }
      if (!itemOpen(it)) return { dim: true, mark: lockMark, tag: <><Star size={10} /> {it.unlockAt}</> }
      return { tag: <><TunaCoin size={12} /> {it.price}</> }
    }
    if (t.k === 'move') {
      const m = MOVES.find((x) => x.id === t.id)!
      return moveUnlocked(s, m.id) ? { tag: look.favoriteMove === m.id ? 'Hello move' : undefined } : { dim: true, mark: lockMark, tag: <><Star size={10} /> {m.unlockAt}</> }
    }
    if (t.k === 'pack') return owns(t) ? { tag: 'Yours' } : { tag: <><TunaCoin size={12} /> {PACKS.find((p) => p.id === t.id)?.price}</> }
    if (t.k === 'home') {
      if (look.home === t.id) return { mark: badge('on', IC.check) }
      return homeUnlocked(s, t.id) ? {} : { dim: true, mark: lockMark, tag: <><Star size={10} /> {HOMES.find((h) => h.id === t.id)?.unlockAt}</> }
    }
    if (t.k === 'mood') return look.mood === t.id ? { mark: badge('on', IC.check) } : {}
    if (t.k === 'quest') {
      const q = s.quests.find((x) => x.quest.id === t.id)!
      if (q.claimed) return { mark: badge('on', IC.check), tag: `+${q.quest.reward}` }
      if (q.done && t.id !== 'goal') return { mark: <span className="pc-badge ready">!</span>, tag: `Claim +${q.quest.reward}` }
      return { tag: `+${q.quest.reward}` }
    }
    if (t.k === 'hist') {
      const e = s.history.find((x) => x.id === t.id)
      if (!e) return {}
      return { dim: !e.ok, tag: e.ok ? `${e.kind === 'earn' ? '+' : '−'}${e.amount.toLocaleString()}` : 'not counted' }
    }
    return {}
  }

  const ready = s.quests.filter((q) => q.done && !q.claimed && q.quest.id !== 'goal').length
  const textTiles = shelf === 'quests' || shelf === 'wallet'
  const catCount = (c: Cat) => {
    const list = ITEMS.filter((it) => c === 'all' || catOf(it) === c)
    return `${list.filter((it) => s.owned.has(it.id)).length}/${list.length}`
  }

  return (
    <div
      className="pc pc-console"
      data-theme={dark ? 'dark' : 'light'}
      onKeyDown={onKey}
      // a click on the stage or empty space keeps the keys where they were, like a console
      onMouseDown={(e) => {
        if (!(e.target as HTMLElement).closest('button, input, a')) e.preventDefault()
      }}
    >
      {/* the stage: the home, Pochi, what she says */}
      <div className="pc-stage" ref={stageRef}>
        <svg className={`pc-scene pa-scene pcs-${stageLook.home}${dark ? ' pcs-dark' : ''}`} viewBox={SCENE_VIEWBOX} preserveAspectRatio="xMidYMax slice" aria-hidden dangerouslySetInnerHTML={{ __html: sceneHtml }} />
        <div className="pc-shade" aria-hidden />
        <div className="pc-pochi" onClick={() => play(look.favoriteMove, { hello: true })} title={`Say hello to ${look.nickname}`}>
          <svg className="pc-sprite" viewBox={VIEWBOX} role="img" aria-label={look.nickname} dangerouslySetInnerHTML={{ __html: spriteHtml }} />
          <div className="pc-fx" aria-hidden>
            {fx.map((p) => (
              <i key={p.key} className={`fx-${p.kind}`} style={{ left: `${p.x}%`, top: `${p.y}%`, ["--s" as string]: p.size, ["--dx" as string]: p.dx, ["--dy" as string]: p.dy, ["--rot" as string]: p.rot, ["--wait" as string]: `${p.wait}ms`, ["--life" as string]: `${p.life}ms` } as CSSProperties} dangerouslySetInnerHTML={{ __html: p.html }} />
            ))}
          </div>
          {line && (
            <p key={line.n} className="pc-speech">
              {line.text}
            </p>
          )}
        </div>
      </div>

      <header className="pc-top">
        {onClose && (
          <button type="button" className="pc-round" onClick={onClose} aria-label="Close Pochi Club" title="Back (Esc)">
            <Ico d={IC.back} />
          </button>
        )}
        <span className="pc-brand">
          {face(look.palette, 'happy')}
          Pochi Club
        </span>
        <nav className="pc-shelves" aria-label="Shelves">
          {SHELVES.map((x) => (
            <button key={x.id} type="button" tabIndex={-1} className={x.id === shelf ? 'on' : ''} aria-current={x.id === shelf} onClick={() => goShelf(x.id)}>
              {x.label}
              {x.id === 'quests' && ready > 0 && <em>{ready}</em>}
            </button>
          ))}
        </nav>
        <span className="pc-purse">
          <span className="pc-coins" title="Tuna Coins, earned by studying">
            <TunaCoin size={20} />
            <b>{coins.toLocaleString()}</b>
            {burst && (
              <i key={burst.n} className={`pc-burst ${burst.minus ? 'minus' : ''}`} aria-hidden>
                {burst.text}
              </i>
            )}
          </span>
          <span className="pc-stars" title="Study stars: every coin you have earned by studying. They open new things.">
            <Star size={15} />
            <b>{s.stars.toLocaleString()}</b>
          </span>
          <small>{s.rank.name}</small>
        </span>
      </header>

      {banner && <div className="pc-banner">{banner}</div>}
      {!snap.online && <div className="pc-note">You are offline: everything works, and it syncs when you are back online.</div>}
      {snap.error && snap.online && (
        <div className="pc-note warn" title={snap.error}>
          Not synced with your account yet. Your coins and closet are safe on this device and sync later.
        </div>
      )}

      <section className="pc-hero" key={`${shelf}|${tk}`}>
        <div className="pc-kicker">{hero.kicker}</div>
        <h2>{hero.title}</h2>
        {renaming && tile && tile.k === 'act' && tile.id === 'rename' ? (
          <input
            className="pc-name"
            autoFocus
            defaultValue={look.nickname}
            maxLength={18}
            aria-label="Pochi's name"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                const v = (e.target as HTMLInputElement).value.trim()
                if (v && v !== look.nickname) club.setLook({ nickname: v })
                setRenaming(false)
                wantFocus.current = true
              } else if (e.key === 'Escape') {
                e.stopPropagation()
                e.nativeEvent.stopImmediatePropagation()
                setRenaming(false)
                wantFocus.current = true
              }
            }}
            onBlur={() => setRenaming(false)}
          />
        ) : (
          <div className="pc-body">{hero.body}</div>
        )}
        <div className="pc-hero-acts">
          {hero.main && (
            <button type="button" className="pc-btn pri" disabled={hero.main.off} onClick={hero.main.run}>
              {hero.main.label}
            </button>
          )}
          {hero.second && (
            <button type="button" className="pc-btn" disabled={hero.second.off} onClick={hero.second.run}>
              {hero.second.label}
              {hero.second.key && !hero.second.off && <kbd>{hero.second.key}</kbd>}
            </button>
          )}
          {hero.extra}
        </div>
      </section>

      <div className="pc-dock">
        {shelf === 'wardrobe' && (
          <div className="pc-cats" role="tablist" aria-label="Wardrobe categories">
            <kbd className="pc-shoulder" aria-hidden>
              Q
            </kbd>
            {CATS.map((c) => (
              <button key={c.id} type="button" role="tab" tabIndex={-1} aria-selected={cat === c.id} className={cat === c.id ? 'on' : ''} onClick={() => setCategory(c.id)}>
                {c.label}
                <span>{catCount(c.id)}</span>
              </button>
            ))}
            <kbd className="pc-shoulder" aria-hidden>
              E
            </kbd>
            <button type="button" tabIndex={-1} className="pc-sort" onClick={() => setSort(SORTS[(SORTS.findIndex((x) => x.id === sort) + 1) % SORTS.length].id)} title="Change the order">
              {SORTS.find((x) => x.id === sort)?.label}
            </button>
          </div>
        )}

        <div className={`pc-strip ${textTiles ? 'is-text' : ''}`} ref={stripRef} role="listbox" aria-label={SHELVES.find((x) => x.id === shelf)?.label} key={shelf + cat + sort}>
          {tiles.map((t, i) => {
            const m = tileMark(t)
            const isSel = i === at
            const words = t.k === 'quest' || t.k === 'earn' || t.k === 'hist' || t.k === 'bal'
            return (
              <div key={tileKey(t)} className={`pc-slot ${words ? 'is-words' : ''}`} style={{ animationDelay: `${Math.min(i, 10) * 22}ms` }}>
                {t.k === 'item' && t.group && <span className="pc-group">{t.group}</span>}
                <button type="button" role="option" aria-selected={isSel} aria-label={tileName(t)} tabIndex={isSel ? 0 : -1} className={`pc-tile k-${t.k} ${isSel ? 'is-sel' : ''} ${m.dim ? 'is-dim' : ''}`} onClick={() => press(t, i)} onFocus={() => i !== at && select(shelf, t, false)}>
                  <span className="pc-tile-art">{tileArt(t)}</span>
                  {m.mark}
                  {words && (
                    <span className="pc-tile-text">
                      <b>{tileName(t)}</b>
                      {t.k === 'hist' && <small>{when(s.history.find((x) => x.id === t.id)?.at ?? '')}</small>}
                    </span>
                  )}
                  {m.tag && <span className="pc-tag">{m.tag}</span>}
                </button>
                {!words && <span className="pc-tile-name">{tileName(t)}</span>}
              </div>
            )
          })}
        </div>

        {fitting.rows.length > 0 && (
          <div className="pc-fit" aria-label="Trying on">
            <span className="pc-fit-title">
              <Ico d={IC.hanger} size={16} /> Trying on
            </span>
            <span className="pc-fit-list">
              {fitting.rows.map((r) => (
                <button key={tileKey(r.t)} type="button" className={`pc-fit-chip ${r.can ? '' : 'is-off'}`} onClick={() => tryOn(r.t)} title={`Take off ${r.name}`}>
                  <Art html={r.art} />
                  <span>
                    {r.name}
                    <small>{r.why ? r.why : r.price ? <>{coin(r.price)}</> : 'Yours'}</small>
                  </span>
                  <Ico d={IC.x} size={12} />
                </button>
              ))}
            </span>
            <span className="pc-fit-acts">
              <button
                type="button"
                className="pc-btn ghost"
                onClick={() => {
                  setFit(NO_FIT)
                  setConfirmAll(false)
                  wantFocus.current = true
                }}
              >
                Clear
              </button>
              <button type="button" className={`pc-btn pri ${confirmAll ? 'is-confirm' : ''}`} disabled={!fitting.buyable} onClick={keepLook} title={fitting.blocked ? `${fitting.blocked} of them can't be bought yet` : undefined}>
                {confirmAll ? (
                  <>Spend {coin(fitting.total)}?</>
                ) : fitting.total ? (
                  <>
                    {fitting.buyable > 1 ? `Buy all ${fitting.buyable}` : 'Buy it'} {coin(fitting.total)}
                  </>
                ) : (
                  'Wear these'
                )}
              </button>
            </span>
          </div>
        )}

        <div className="pc-hints" aria-hidden>
          <span>
            <kbd>←</kbd>
            <kbd>→</kbd> move
          </span>
          <span>
            <kbd>↑</kbd>
            <kbd>↓</kbd> shelf
          </span>
          {hero.enter && (
            <span>
              <kbd>Enter</kbd> {hero.enter}
            </span>
          )}
          {hero.second && hero.second.key === 'B' && !hero.second.off && (
            <span>
              <kbd>B</kbd> buy
            </span>
          )}
          {shelf === 'wardrobe' && (
            <span>
              <kbd>Q</kbd>
              <kbd>E</kbd> category
            </span>
          )}
          {onClose && (
            <span>
              <kbd>Esc</kbd> back
            </span>
          )}
        </div>
      </div>

      {toast && (
        <div key={`pc-toast-${toast.n}`} className="pc-toast" role="status">
          {toast.text}
        </div>
      )}
    </div>
  )
}
