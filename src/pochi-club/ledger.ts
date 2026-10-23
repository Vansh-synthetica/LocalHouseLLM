/**
 * Pochi Club's ledger: every Tuna Coin earned or spent, and every hello, as an append-only list of events. Everything
 * else — the balance, the closet, unlocks, the friendship bond, memories — is worked out from it (reduce), the same way
 * on every device.
 *
 * Why a ledger: Pochi Club works offline in the app and online on localhousellm.com. Each device keeps its own events
 * and sends them when it can; merging two devices is the union of their events by id, so nothing is lost or counted
 * twice, and no device ever has to win a conflict. A purchase that the merged history cannot pay for (two devices
 * spent the same coins while offline) simply does not count, everywhere alike.
 *
 * SHARED FILE: identical copies in Anvira Notes (src/pochi-club/) and the website (LocalHouseLLM src/pochi-club/).
 */
import { BOND_TIERS, HOMES, ITEMS, MOVES, PACKS, PALETTES, RANKS, type Mood } from './catalog'

export type EventKind = 'earn' | 'spend' | 'care'

/** Why coins came in. Study is the only real source; the rest are bonuses for studying (and one welcome gift). */
export type EarnReason = 'welcome' | 'study' | 'goal' | 'streak' | 'exam' | 'quest'
export type SpendWhat = 'item' | 'palette' | 'pack'

export interface PochiEvent {
  /** made on the device that recorded it; the same id is never counted twice */
  id: string
  kind: EventKind
  /** earn: an EarnReason; spend: 'item' | 'palette' | 'pack'; care: 'hello' | 'style' */
  reason: string
  /** coins (earn and spend); 0 for care */
  amount: number
  /** what it is about: a purchase's catalog id, a day ("2026-10-24"), a quest, an exam… */
  ref: string
  /** when it happened (ISO) */
  at: string
  /** a short note for the history ("Quiz: Cell biology") */
  note?: string
}

// ── Earning rules ───────────────────────────────────────────────────────────────────────────────────────────────────

/** One Tuna Coin for every 4 XP earned in a lesson (a quiz with 12 right answers, 120 XP, gives 30). */
export const COINS_PER_XP = 1 / 4
export const WELCOME_COINS = 120
export const GOAL_BONUS = 40
export const EXAM_COINS = 30
/** Streak milestones (days in a row) and their bonus. */
export const STREAK_BONUS: [number, number][] = [
  [3, 25],
  [7, 50],
  [14, 80],
  [30, 120],
  [60, 200],
  [100, 300],
]
/** Most one event may earn, and one day in all (the server holds to the same limits). */
export const MAX_EARN_EVENT = 300
export const MAX_EARN_DAY = 800

export const coinsForXp = (xp: number) => Math.max(0, Math.min(80, Math.round(xp * COINS_PER_XP)))

/** "2026-10-24" in local time. */
export const dayOf = (d: Date | string = new Date()) => {
  const x = typeof d === 'string' ? new Date(d) : d
  return `${x.getFullYear()}-${String(x.getMonth() + 1).padStart(2, '0')}-${String(x.getDate()).padStart(2, '0')}`
}

/** A unique event id (time-ordered, so ties sort the same everywhere). */
export function newId(): string {
  const r = typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : `${Math.random().toString(36).slice(2)}${Math.random().toString(36).slice(2)}`
  return r
}

/** Daily quests: what today's study and care can still earn. */
export interface Quest {
  id: 'lesson' | 'goal' | 'style' | 'hello'
  title: string
  detail: string
  reward: number
  icon: string
}
export const QUESTS: Quest[] = [
  { id: 'hello', title: 'Say good morning', detail: 'Say hello to Pochi', reward: 5, icon: '👋' },
  { id: 'lesson', title: 'One focused little lesson', detail: 'Finish a lesson, quiz or review in Anvira Notes', reward: 15, icon: '📚' },
  { id: 'goal', title: 'Make today count', detail: 'Reach your daily XP goal', reward: GOAL_BONUS, icon: '☀️' },
  { id: 'style', title: 'Give Pochi a new look', detail: 'Change an accessory, colour or home', reward: 10, icon: '🎀' },
]

// ── The look (what Pochi wears; synced last-write-wins, checked against what is owned) ─────────────────────────────

export interface Look {
  nickname: string
  palette: string
  /** slot → item id */
  equipped: Partial<Record<string, string>>
  mood: Mood
  home: string
  /** the move played on hello */
  favoriteMove: string
  /** a two-move routine */
  routine: [string, string]
}

export const DEFAULT_LOOK: Look = { nickname: 'Pochi', palette: 'lavender', equipped: {}, mood: 'happy', home: 'cloud', favoriteMove: 'hello', routine: ['hello', 'hop'] }

// ── Reducing the ledger ─────────────────────────────────────────────────────────────────────────────────────────────

export interface Moment {
  icon: string
  title: string
  at: string
}

export interface ClubState {
  coins: number
  /** study stars: lifetime coins from studying — what unlocks items, moves and homes */
  stars: number
  /** everything earned, ever */
  earned: number
  owned: Set<string>
  palettes: Set<string>
  packs: Set<string>
  bond: number
  rank: { index: number; name: string; at: number; next: number | null }
  bondTier: { name: string; from: number; next: number | null }
  /** newest first */
  history: (PochiEvent & { ok: boolean })[]
  moments: Moment[]
  /** today's quests: done (and claimed) */
  quests: { quest: Quest; done: boolean; claimed: boolean }[]
  /** study days, ever */
  studyDays: number
  todayEarned: number
}

const order = (a: PochiEvent, b: PochiEvent) => (a.at < b.at ? -1 : a.at > b.at ? 1 : a.id < b.id ? -1 : a.id > b.id ? 1 : 0)

export const priceOf = (what: string, ref: string): number | null => {
  if (what === 'item') {
    const it = ITEMS.find((i) => i.id === ref)
    return it && !it.event ? it.price : null
  }
  if (what === 'palette') return PALETTES.find((p) => p.id === ref)?.price ?? null
  if (what === 'pack') return PACKS.find((p) => p.id === ref)?.price ?? null
  return null
}

export const unlockOf = (what: string, ref: string): number => (what === 'item' ? ITEMS.find((i) => i.id === ref)?.unlockAt ?? 0 : 0)

const EARN_REASONS = new Set<string>(['welcome', 'study', 'goal', 'streak', 'exam', 'quest'])

/** Whether an earn event follows the rules (amounts within limits; one welcome, one goal bonus a day…). */
function earnValid(e: PochiEvent): boolean {
  if (!EARN_REASONS.has(e.reason) || !Number.isInteger(e.amount) || e.amount <= 0 || e.amount > MAX_EARN_EVENT) return false
  if (e.reason === 'welcome') return e.amount === WELCOME_COINS
  if (e.reason === 'goal') return e.amount === GOAL_BONUS
  if (e.reason === 'exam') return e.amount === EXAM_COINS
  if (e.reason === 'streak') return STREAK_BONUS.some(([, c]) => c === e.amount)
  // (the goal quest is paid by the goal bonus itself, never claimed)
  if (e.reason === 'quest') return QUESTS.some((q) => q.id !== 'goal' && q.reward === e.amount && e.ref.startsWith(`${q.id}:`))
  return e.amount <= 80
}

/** One key per thing that can only happen once (the welcome gift, a day's goal bonus, a claimed quest…). */
const onceKey = (e: PochiEvent) => (e.kind === 'earn' && e.reason !== 'study' ? `${e.reason}|${e.ref}` : e.kind === 'care' ? `care|${e.reason}|${e.ref}` : null)

export function reduce(events: PochiEvent[], now = new Date()): ClubState {
  const sorted = [...events].sort(order)
  const today = dayOf(now)
  // Purchases are checked against everything earned (and every study star), not the balance at that moment: two
  // devices that were offline record times that interleave differently, and a test showed a beret bought offline
  // counting on one device and not on the other. Against the totals, every device reaches the same answer from the
  // same events; the shop itself never lets anyone spend coins they do not have.
  const totals = (() => {
    let e = 0
    let st = 0
    const once = new Set<string>()
    const byDay = new Map<string, number>()
    for (const x of sorted) {
      if (x.kind !== 'earn' || !earnValid(x)) continue
      const k = onceKey(x)
      if (k && once.has(k)) continue
      const d = x.at.slice(0, 10)
      if ((byDay.get(d) ?? 0) + x.amount > MAX_EARN_DAY) continue
      if (k) once.add(k)
      byDay.set(d, (byDay.get(d) ?? 0) + x.amount)
      e += x.amount
      if (x.reason !== 'welcome' && x.reason !== 'quest') st += x.amount
    }
    return { earned: e, stars: st }
  })()
  let spent = 0
  let coins = 0
  let stars = 0
  let earned = 0
  let bond = 0
  const owned = new Set<string>()
  const palettes = new Set<string>(['lavender'])
  const packs = new Set<string>()
  const seenOnce = new Set<string>()
  const earnByDay = new Map<string, number>()
  const studyDays = new Set<string>()
  const careDays = new Set<string>()
  const history: (PochiEvent & { ok: boolean })[] = []
  const moments: Moment[] = []
  const questDone = new Set<string>()
  const questClaimed = new Set<string>()
  let todayEarned = 0

  for (const e of sorted) {
    let ok = false
    // the day for today's quests is local; the daily limit, study days and hello days count by UTC day, so devices in
    // other time zones (and the server) reach the same totals
    const day = dayOf(e.at)
    const uday = e.at.slice(0, 10)
    const once = onceKey(e)
    if (once && seenOnce.has(once)) {
      history.push({ ...e, ok: false })
      continue
    }
    if (e.kind === 'earn' && earnValid(e)) {
      const sofar = earnByDay.get(uday) ?? 0
      if (sofar + e.amount <= MAX_EARN_DAY) {
        ok = true
        earnByDay.set(uday, sofar + e.amount)
        if (day === today) todayEarned += e.amount
        coins += e.amount
        earned += e.amount
        if (e.reason !== 'welcome' && e.reason !== 'quest') stars += e.amount
        if (e.reason === 'study') {
          if (!studyDays.has(uday)) bond += 2
          studyDays.add(uday)
          if (day === today) questDone.add('lesson')
        }
        if (e.reason === 'goal' && day === today) questDone.add('goal')
        if (e.reason === 'quest') questClaimed.add(e.ref)
        if (e.reason === 'streak') moments.push({ icon: '🔥', title: e.note ?? `A ${e.ref.split(':')[1]}-day streak`, at: e.at })
        if (e.reason === 'exam') moments.push({ icon: '🎓', title: e.note ?? 'A mock exam, done together', at: e.at })
      }
    } else if (e.kind === 'spend') {
      const price = priceOf(e.reason, e.ref)
      const have = e.reason === 'item' ? owned : e.reason === 'palette' ? palettes : packs
      if (price !== null && !have.has(e.ref) && spent + price <= totals.earned && totals.stars >= unlockOf(e.reason, e.ref)) {
        ok = true
        spent += price
        coins -= price
        have.add(e.ref)
        const name = e.reason === 'item' ? ITEMS.find((i) => i.id === e.ref)?.name : e.reason === 'palette' ? PALETTES.find((p) => p.id === e.ref)?.name : PACKS.find((p) => p.id === e.ref)?.name
        moments.push({ icon: e.reason === 'pack' ? '💃' : '🛍️', title: `${name ?? 'Something new'} came home`, at: e.at })
      }
    } else if (e.kind === 'care') {
      ok = true
      if (e.reason === 'hello') {
        if (!careDays.has(uday)) bond += 1
        careDays.add(uday)
        if (day === today) questDone.add('hello')
      }
      if (e.reason === 'style' && day === today) questDone.add('style')
    }
    if (once && ok) seenOnce.add(once)
    history.push({ ...e, ok })
  }
  // the festival crown: five study days in all
  if (studyDays.size >= 5) owned.add('moon-jelly-crown')

  const ri = RANKS.reduce((acc, r, i) => (stars >= r.at ? i : acc), 0)
  const bi = BOND_TIERS.reduce((acc, t, i) => (bond >= t.from ? i : acc), 0)
  return {
    coins,
    stars,
    earned,
    owned,
    palettes,
    packs,
    bond,
    rank: { index: ri, name: RANKS[ri].name, at: RANKS[ri].at, next: RANKS[ri + 1]?.at ?? null },
    bondTier: { name: BOND_TIERS[bi].name, from: BOND_TIERS[bi].from, next: BOND_TIERS[bi + 1]?.from ?? null },
    history: history.reverse(),
    moments: moments.reverse().slice(0, 12),
    quests: QUESTS.map((quest) => ({ quest, done: questDone.has(quest.id), claimed: quest.id === 'goal' ? questDone.has('goal') : questClaimed.has(`${quest.id}:${today}`) })),
    studyDays: studyDays.size,
    todayEarned,
  }
}

// ── What is available ───────────────────────────────────────────────────────────────────────────────────────────────

export const moveUnlocked = (s: ClubState, id: string) => {
  const m = MOVES.find((x) => x.id === id)
  if (!m) return false
  return m.packId ? s.packs.has(m.packId) : s.stars >= m.unlockAt && s.bond >= m.bond
}
export const homeUnlocked = (s: ClubState, id: string) => s.stars >= (HOMES.find((h) => h.id === id)?.unlockAt ?? Infinity)

/** A look made safe: only what is owned and unlocked, every field in range. */
export function sanitizeLook(raw: Partial<Look> | null | undefined, s: ClubState): Look {
  const l = { ...DEFAULT_LOOK, ...(raw ?? {}) }
  const equipped: Partial<Record<string, string>> = {}
  for (const [slot, id] of Object.entries(l.equipped ?? {})) {
    const it = ITEMS.find((i) => i.id === id)
    if (it && it.slot === slot && s.owned.has(it.id)) equipped[slot] = it.id
  }
  const move = (id: string, fallback: string) => (moveUnlocked(s, id) ? id : fallback)
  return {
    nickname: String(l.nickname ?? '').replace(/\s+/g, ' ').trim().slice(0, 18) || DEFAULT_LOOK.nickname,
    palette: s.palettes.has(l.palette) ? l.palette : 'lavender',
    equipped,
    mood: l.mood ?? 'happy',
    home: homeUnlocked(s, l.home) ? l.home : 'cloud',
    favoriteMove: move(l.favoriteMove, 'hello'),
    routine: [move(l.routine?.[0] ?? 'hello', 'hello'), move(l.routine?.[1] ?? 'hop', 'hello')],
  }
}
