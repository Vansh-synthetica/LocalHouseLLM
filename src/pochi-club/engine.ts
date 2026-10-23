/**
 * Pochi Club's engine: the ledger and look kept on the device (works with no connection at all), and synced with the
 * account when there is one. Hosts (the app, the website) give it a place to keep data and, optionally, a backend.
 *
 * Sync: events not sent yet are sent (the server ignores ids it has), then every event of the account is fetched and
 * merged by id. An event the server refuses (over the daily limit, against the rules) is dropped here too, so every
 * device ends with the same ledger. The look is last-write-wins by time.
 *
 * SHARED FILE: identical copies in Anvira Notes (src/pochi-club/) and the website (LocalHouseLLM src/pochi-club/).
 */
import { DEFAULT_LOOK, dayOf, newId, priceOf, reduce, sanitizeLook, type ClubState, type Look, type PochiEvent, type SpendWhat } from './ledger'

export interface Storage {
  get(key: string): string | null
  set(key: string, value: string): void
}

export interface Backend {
  /** sends events; returns the ids the server refused (they are dropped) */
  push(events: PochiEvent[]): Promise<{ refused: string[] }>
  /** every event of the account */
  pull(): Promise<PochiEvent[]>
  pushLook(look: Look, at: string): Promise<void>
  pullLook(): Promise<{ look: Partial<Look>; at: string } | null>
}

interface Saved {
  v: 1
  events: PochiEvent[]
  /** ids not yet on the server */
  pending: string[]
  look: Partial<Look>
  lookAt: string
  lookPending: boolean
  lastSync: string | null
}

export interface ClubSnapshot {
  state: ClubState
  look: Look
  /** events waiting to be sent */
  pending: number
  syncing: boolean
  online: boolean
  lastSync: string | null
  error: string | null
}

export interface Club {
  get(): ClubSnapshot
  subscribe(fn: () => void): () => void
  /** coins in, for study done (only the app calls this) */
  earn(reason: 'welcome' | 'study' | 'goal' | 'streak' | 'exam' | 'quest', amount: number, ref: string, note?: string): boolean
  buy(what: SpendWhat, id: string): { ok: boolean; why?: string }
  setLook(patch: Partial<Look>): void
  hello(): void
  claimQuest(id: 'hello' | 'lesson' | 'style'): boolean
  sync(): Promise<void>
}

const empty = (): Saved => ({ v: 1, events: [], pending: [], look: { ...DEFAULT_LOOK }, lookAt: new Date(0).toISOString(), lookPending: false, lastSync: null })

export function createClub(opts: { storage: Storage; key: string; backend?: Backend | null; now?: () => Date }): Club {
  const now = opts.now ?? (() => new Date())
  let saved: Saved = (() => {
    try {
      const raw = opts.storage.get(opts.key)
      const s = raw ? (JSON.parse(raw) as Saved) : null
      return s && s.v === 1 && Array.isArray(s.events) ? { ...empty(), ...s } : empty()
    } catch {
      return empty()
    }
  })()
  const listeners = new Set<() => void>()
  let syncing = false
  let error: string | null = null
  let snap: ClubSnapshot | null = null

  const persist = () => {
    try {
      opts.storage.set(opts.key, JSON.stringify(saved))
    } catch {
      // full storage: kept in memory until it can be written
    }
  }
  const changed = () => {
    snap = null
    persist()
    listeners.forEach((f) => f())
  }
  const online = () => (typeof navigator === 'undefined' ? true : navigator.onLine !== false)

  const get = (): ClubSnapshot => {
    if (snap) return snap
    const state = reduce(saved.events, now())
    snap = { state, look: sanitizeLook(saved.look, state), pending: saved.pending.length, syncing, online: online(), lastSync: saved.lastSync, error }
    return snap
  }

  const add = (e: Omit<PochiEvent, 'id' | 'at'> & { id?: string }) => {
    const ev: PochiEvent = { ...e, id: e.id ?? newId(), at: now().toISOString() }
    if (saved.events.some((x) => x.id === ev.id)) return null
    saved = { ...saved, events: [...saved.events, ev], pending: [...saved.pending, ev.id] }
    changed()
    scheduleSync()
    return ev
  }

  let timer: ReturnType<typeof setTimeout> | null = null
  const scheduleSync = () => {
    if (!opts.backend) return
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => void sync(), 1500)
  }

  const sync = async () => {
    const b = opts.backend
    if (!b || syncing || !online()) return
    syncing = true
    error = null
    changed()
    try {
      const pend = saved.events.filter((e) => saved.pending.includes(e.id))
      if (pend.length) {
        const { refused } = await b.push(pend)
        const gone = new Set(refused)
        const sent = new Set(pend.map((e) => e.id))
        saved = { ...saved, events: saved.events.filter((e) => !gone.has(e.id)), pending: saved.pending.filter((id) => !sent.has(id)) }
      }
      // the server's copy of an event wins (two devices may have recorded the same once-only event, say the day's goal
      // bonus, at different times): every device then holds exactly the same events
      const remote = await b.pull()
      const have = new Map(saved.events.map((e) => [e.id, e]))
      for (const e of remote) have.set(e.id, e)
      saved = { ...saved, events: [...have.values()] }
      // the look: newer wins
      const rl = await b.pullLook()
      if (saved.lookPending && (!rl || rl.at <= saved.lookAt)) {
        await b.pushLook(sanitizeLook(saved.look, reduce(saved.events, now())), saved.lookAt)
        saved = { ...saved, lookPending: false }
      } else if (rl && rl.at > saved.lookAt) saved = { ...saved, look: rl.look, lookAt: rl.at, lookPending: false }
      saved = { ...saved, lastSync: now().toISOString() }
    } catch (err) {
      error = err instanceof Error ? err.message : 'Could not sync'
    } finally {
      syncing = false
      changed()
    }
  }

  const day = () => dayOf(now())

  return {
    get,
    subscribe(fn) {
      listeners.add(fn)
      return () => listeners.delete(fn)
    },
    earn(reason, amount, ref, note) {
      // things that happen once (a day's goal, the welcome gift…) have fixed ids, so two devices never count them twice
      const id = reason === 'study' ? undefined : `${reason}:${ref}`
      return add({ id, kind: 'earn', reason, amount: Math.round(amount), ref, note }) !== null
    },
    buy(what, id) {
      const s = get().state
      const price = priceOf(what, id)
      if (price === null) return { ok: false, why: 'That is not in the shop.' }
      const have = what === 'item' ? s.owned : what === 'palette' ? s.palettes : s.packs
      if (have.has(id)) return { ok: false, why: 'Already yours.' }
      if (s.coins < price) return { ok: false, why: `You need ${price - s.coins} more Tuna Coins. Study a little and they come in.` }
      add({ kind: 'spend', reason: what, amount: price, ref: id })
      return { ok: true }
    },
    setLook(patch) {
      const s = get().state
      const next = sanitizeLook({ ...saved.look, ...patch }, s)
      const styled = ['palette', 'equipped', 'home'].some((k) => k in patch)
      saved = { ...saved, look: next, lookAt: now().toISOString(), lookPending: true }
      changed()
      if (styled) add({ id: `care:style:${day()}`, kind: 'care', reason: 'style', amount: 0, ref: day() })
      scheduleSync()
    },
    hello() {
      add({ id: `care:hello:${day()}`, kind: 'care', reason: 'hello', amount: 0, ref: day() })
    },
    claimQuest(id) {
      const q = get().state.quests.find((x) => x.quest.id === id)
      if (!q || !q.done || q.claimed) return false
      return add({ id: `quest:${id}:${day()}`, kind: 'earn', reason: 'quest', amount: q.quest.reward, ref: `${id}:${day()}` }) !== null
    },
    sync,
  }
}

/** localStorage, or nothing (private windows, tests). */
export const browserStorage: Storage = {
  get: (k) => {
    try {
      return localStorage.getItem(k)
    } catch {
      return null
    }
  },
  set: (k, v) => {
    try {
      localStorage.setItem(k, v)
    } catch {
      // not kept
    }
  },
}
