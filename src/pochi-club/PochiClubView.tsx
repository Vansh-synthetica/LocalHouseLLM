/**
 * Pochi Club: Pochi's home, closet, move book, shop and quests, paid for in Tuna Coins earned by studying.
 * The same component in Anvira Notes (works offline) and on localhousellm.com/account/study (the same account).
 *
 * SHARED FILE: identical copies in Anvira Notes (src/pochi-club/) and the website (LocalHouseLLM src/pochi-club/).
 * Plain React and its own stylesheet (pochi-club.css), so it fits either host.
 */
import { useEffect, useMemo, useRef, useState, useSyncExternalStore, type CSSProperties, type ReactNode } from 'react'
import { HOMES, ITEMS, MOODS, MOVES, PACKS, PALETTES, VIEWBOX, type Item, type Mood, type Move, type Slot } from './catalog'
import { COINS_PER_XP, EXAM_COINS, GOAL_BONUS, STREAK_BONUS, WELCOME_COINS, homeUnlocked, moveUnlocked, type ClubState, type Look, type PochiForm } from './ledger'
import { FACE_BOX, SCENE_VIEWBOX, itemMarkup, pochiMarkup, sceneMarkup } from './render'
import { uid } from './art'
import { TunaCoin, coinMarkup } from './coin'
import type { Club } from './engine'

type Tab = 'buddy' | 'shop' | 'moves' | 'quests' | 'wallet'
type ShopShelf = 'all' | Slot | 'colors' | 'homes' | 'packs'
type Buy = (what: 'item' | 'palette' | 'pack', id: string, name: string, from?: Element | null) => boolean
type Playing = { id: string; n: number; duration: number; effect?: string } | null

export interface PochiClubProps {
  club: Club
  /** 'app': coins come in as you study here; 'web': the same account, studying happens in the app */
  host: 'app' | 'web'
  /** streak and today's XP, when the host knows them (the app) */
  stats?: { streak: number; todayXp: number; dailyGoal: number }
  onClose?: () => void
  /** dark colours (the host's theme) */
  dark?: boolean
  /** something the host adds under the header (the website's "open Anvira Notes to study") */
  banner?: ReactNode
}

const MOOD_LABEL: Record<string, string> = { happy: 'Happy', excited: 'Excited', proud: 'Proud', curious: 'Curious', thinking: 'Thinking', sleepy: 'Sleepy', love: 'Lovey' }
const SLOT_LABEL: Record<string, string> = { Head: 'Hats', Face: 'Face', Outfit: 'Outfits', Back: 'Back', Aura: 'Auras' }
const SLOTS: Slot[] = ['Head', 'Face', 'Outfit', 'Back', 'Aura']
const BOOP_LINES = ['Hehe, that tickles!', 'Mrrp?', 'Purrrr…', 'Boop right back!', 'I like it when you visit.']

const calm = () => typeof window !== 'undefined' && !!window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// ── little icons ───────────────────────────────────────────────────────────────────────────────────────────────────

const ICON: Record<string, string> = {
  back: 'M15 18l-6-6 6-6',
  buddy: 'M4 11.5 12 5l8 6.5V19a1 1 0 0 1-1 1h-4.5v-5h-5v5H5a1 1 0 0 1-1-1z',
  shop: 'M5.5 8.5h13l-1.1 11.1a1 1 0 0 1-1 .9H7.6a1 1 0 0 1-1-.9zM9 8.5V7a3 3 0 0 1 6 0v1.5',
  moves: 'M9 17.5V6.2l10-2.2v11.2M9 17.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0M19 15.2a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0',
  quests: 'M6 21V4.5M6 4.5h11.5l-2.2 4 2.2 4H6',
  wallet: 'M4.5 7.5h14a1.5 1.5 0 0 1 1.5 1.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 18V8M4 8l11-3.5v3M16.5 13.5h.01',
  lock: 'M7 11V8a5 5 0 0 1 10 0v3M6 11h12v9H6z',
  play: 'M8 5.5v13l10.5-6.5z',
  star: 'M12 3.8l2.5 5.1 5.6.8-4 4 1 5.6-5.1-2.7-5 2.7 1-5.6-4.1-4 5.6-.8z',
  check: 'M5 12.5l4.2 4.2L19 7',
  x: 'M7 7l10 10M17 7 7 17',
  hand: 'M8 13V6.5a1.5 1.5 0 0 1 3 0V12M11 11V5a1.5 1.5 0 0 1 3 0v6M14 11V6.5a1.5 1.5 0 0 1 3 0V14a6 6 0 0 1-6 6h-.5a5.5 5.5 0 0 1-4.4-2.2L4.5 15.6a1.5 1.5 0 0 1 2.3-1.9L8 15',
  film: 'M4 5h16v14H4zM4 9h16M4 15h16M8 5v14M16 5v14',
  sync: 'M20 11a8 8 0 0 0-14.3-4.3L4 9M4 4v5h5M4 13a8 8 0 0 0 14.3 4.3L20 15M20 20v-5h-5',
  search: 'M11 18a7 7 0 1 1 0-14 7 7 0 0 1 0 14zM20 20l-4-4',
}
function Icon({ name, size = 16, fill }: { name: string; size?: number; fill?: boolean }) {
  return (
    <svg className="pc-ic" width={size} height={size} viewBox="0 0 24 24" fill={fill ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={fill ? 0 : 1.9} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d={ICON[name]} />
    </svg>
  )
}

/** The little shapes a move or a boop throws (hearts, sparkles, clouds, moons, z's). */
function Glyph({ ch }: { ch: string }) {
  if (ch === '♥' || ch === '♡')
    return (
      <svg viewBox="0 0 24 24" aria-hidden>
        <path d="M12 21C5 15.6 2 12.4 2 8.7 2 5.9 4.2 3.7 7 3.7c2 0 3.6 1 5 2.8 1.4-1.8 3-2.8 5-2.8 2.8 0 5 2.2 5 5 0 3.7-3 6.9-10 12.3Z" fill={ch === '♥' ? '#f0628f' : '#ff9cbc'} />
        <ellipse cx="7.5" cy="8" rx="2" ry="1.3" fill="#fff" opacity=".6" transform="rotate(-30 7.5 8)" />
      </svg>
    )
  if (ch === '☁')
    return (
      <svg viewBox="0 0 24 24" aria-hidden>
        <path d="M6.5 18a4 4 0 0 1-.6-8 5.5 5.5 0 0 1 10.6-1.2A4.6 4.6 0 0 1 17.5 18Z" fill="#fff" stroke="#c9c2e6" strokeWidth="1.2" />
      </svg>
    )
  if (ch === '☾')
    return (
      <svg viewBox="0 0 24 24" aria-hidden>
        <path d="M14 3a9 9 0 1 0 7 13A7.5 7.5 0 0 1 14 3Z" fill="#f6cf6a" />
      </svg>
    )
  if (ch === 'z') return <b className="pc-z">z</b>
  return (
    <svg viewBox="0 0 24 24" aria-hidden>
      <path d="M12 2Q13.6 10.4 22 12Q13.6 13.6 12 22Q10.4 13.6 2 12Q10.4 10.4 12 2Z" fill={ch === '✿' ? '#c9b8ff' : '#f6c453'} />
    </svg>
  )
}

// ── Pochi at home ──────────────────────────────────────────────────────────────────────────────────────────────────

interface Particle {
  k: string
  x: number
  y: number
  d: number
  ch: string
  s: number
}

/**
 * Pochi in a home: the room drawn behind, Pochi on the rug. Pochi plays `move` when it changes, follows the pointer
 * with its eyes (`follow`), and squishes when booped.
 */
function Stage({ look, home, move, preview, follow, onBoop, className = '', label, children }: { look: Look; home: string; move?: Playing; preview?: string; follow?: boolean; onBoop?: () => void; className?: string; label?: string; children?: ReactNode }) {
  const ref = useRef<SVGSVGElement>(null)
  const [particles, setParticles] = useState<Particle[]>([])
  const worn = JSON.stringify(look.equipped)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const markup = useMemo(() => pochiMarkup(look, { preview }), [look.palette, look.mood, look.form, worn, preview])
  const scene = useMemo(() => sceneMarkup(home, uid(`scene|${home}`)), [home])
  const burst = (ch: string, n: number, tag: string) => {
    if (calm()) return
    setParticles(Array.from({ length: n }, (_, i) => {
      const a = (i / n) * Math.PI * 2 - Math.PI / 2 + (Math.random() - 0.5) * 0.6
      return { k: `${tag}-${i}`, x: Math.cos(a) * (70 + Math.random() * 40), y: Math.sin(a) * 60 - 40, d: i * 55, ch, s: 0.8 + Math.random() * 0.6 }
    }))
  }

  useEffect(() => {
    const el = ref.current
    if (!el || !move) return
    el.dataset.move = move.id
    el.style.setProperty('--pochi-move-duration', `${move.duration}ms`)
    el.classList.remove('is-playing')
    void el.getBoundingClientRect()
    el.classList.add('is-playing')
    if (move.effect) burst(move.effect, 8, `m${move.n}`)
    const t = setTimeout(() => {
      el.classList.remove('is-playing')
      setParticles([])
    }, move.duration + 160)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [move])

  // the eyes follow the pointer, a little
  useEffect(() => {
    if (!follow || calm()) return
    let raf = 0
    const on = (e: PointerEvent) => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const el = ref.current
        if (!el) return
        const r = el.getBoundingClientRect()
        const dx = e.clientX - (r.left + r.width / 2)
        const dy = e.clientY - (r.top + r.height * 0.5)
        const d = Math.hypot(dx, dy) || 1
        const k = Math.min(1, d / 240)
        el.style.setProperty('--pa-lx', `${((dx / d) * k * 2.8).toFixed(2)}px`)
        el.style.setProperty('--pa-ly', `${((dy / d) * k * 2.4).toFixed(2)}px`)
      })
    }
    window.addEventListener('pointermove', on, { passive: true })
    return () => {
      window.removeEventListener('pointermove', on)
      cancelAnimationFrame(raf)
    }
  }, [follow])

  const boop = () => {
    const el = ref.current
    if (!el || !onBoop) return
    el.classList.remove('is-booped')
    void el.getBoundingClientRect()
    el.classList.add('is-booped')
    burst('♡', 5, `b${Date.now()}`)
    onBoop()
  }

  return (
    <section className={`pc-stage pcs-${home} ${className}`} aria-label={label}>
      <svg className="pc-scene" viewBox={SCENE_VIEWBOX} preserveAspectRatio="xMidYMax slice" aria-hidden>
        <g className="pa-scene" dangerouslySetInnerHTML={{ __html: scene }} />
        <svg ref={ref} className={`pc-sprite ${onBoop ? 'is-boopable' : ''}`} x="104" y="114" width="192" height="158.6" viewBox={VIEWBOX} overflow="visible" onClick={boop} dangerouslySetInnerHTML={{ __html: markup }} />
      </svg>
      <div className="pc-particles" aria-hidden>
        {particles.map((p) => (
          <span key={p.k} className="pc-particle" style={{ '--x': `${p.x}px`, '--y': `${p.y}px`, '--wait': `${p.d}ms`, '--s': p.s } as CSSProperties}>
            <Glyph ch={p.ch} />
          </span>
        ))}
      </div>
      {children}
    </section>
  )
}

/** Pochi's face in a mood (the mood buttons, the header). */
function Face({ look, mood, className = '' }: { look: Look; mood?: Mood; className?: string }) {
  const html = useMemo(() => pochiMarkup({ palette: look.palette, equipped: {}, mood: mood ?? look.mood, form: look.form }, { box: FACE_BOX }), [look.palette, look.mood, look.form, mood])
  return <svg className={`pc-face ${className}`} viewBox={VIEWBOX} aria-hidden dangerouslySetInnerHTML={{ __html: html }} />
}

function Coin({ n, big }: { n: number; big?: boolean }) {
  return (
    <span className={`pc-coin ${big ? 'big' : ''}`}>
      <TunaCoin size={big ? 22 : 15} />
      <b>{n.toLocaleString()}</b>
    </span>
  )
}

/** A number that rolls to its new value. */
function useRolling(value: number) {
  const [shown, setShown] = useState(value)
  const from = useRef(value)
  useEffect(() => {
    const a = from.current
    const b = value
    if (a === b) return
    if (calm()) {
      from.current = b
      setShown(b)
      return
    }
    const t0 = performance.now()
    let raf = 0
    const step = (t: number) => {
      const k = Math.min(1, (t - t0) / 750)
      setShown(Math.round(a + (b - a) * (1 - (1 - k) ** 3)))
      if (k < 1) raf = requestAnimationFrame(step)
      else from.current = b
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [value])
  return shown
}

function Meter({ value, max, tone }: { value: number; max: number; tone?: 'pink' | 'gold' | 'warm' }) {
  return (
    <span className={`pc-meter ${tone ?? ''}`} role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={max}>
      <i style={{ width: `${Math.max(3, Math.min(100, (value / Math.max(1, max)) * 100))}%` }} />
    </span>
  )
}

/** Tuna Coins flying from one place to another (into the wallet when earned, out of it when spent). */
function flyCoins(root: HTMLElement | null, from: Element | null | undefined, to: Element | null | undefined, n: number) {
  if (!root || !from || !to || calm() || typeof root.animate !== 'function') return
  const R = root.getBoundingClientRect()
  const a = from.getBoundingClientRect()
  const b = to.getBoundingClientRect()
  const sx = a.left + a.width / 2 - R.left
  const sy = a.top + a.height / 2 - R.top
  const dx = b.left + b.width / 2 - R.left - sx
  const dy = b.top + b.height / 2 - R.top - sy
  for (let i = 0; i < n; i++) {
    const el = document.createElement('span')
    el.className = 'pc-flycoin'
    el.innerHTML = `<svg viewBox="0 0 24 24" width="20" height="20">${coinMarkup(`fly${i}`)}</svg>`
    el.style.left = `${sx - 10}px`
    el.style.top = `${sy - 10}px`
    root.appendChild(el)
    const jx = (Math.random() - 0.5) * 60
    const lift = -50 - Math.random() * 50
    const anim = el.animate(
      [
        { transform: 'translate(0,0) scale(.4) rotate(0deg)', opacity: 0 },
        { transform: `translate(${jx}px, ${lift}px) scale(1.05) rotate(90deg)`, opacity: 1, offset: 0.3 },
        { transform: `translate(${dx}px, ${dy}px) scale(.55) rotate(260deg)`, opacity: 0.95 },
      ],
      { duration: 820 + Math.random() * 180, delay: i * 70, easing: 'cubic-bezier(.45,0,.25,1)', fill: 'both' },
    )
    anim.onfinish = () => {
      el.remove()
      if (i === n - 1) {
        to.classList.remove('is-hit')
        void (to as HTMLElement).offsetWidth
        to.classList.add('is-hit')
      }
    }
  }
}

export default function PochiClubView({ club, host, stats, onClose, dark, banner }: PochiClubProps) {
  const snap = useSyncExternalStore(club.subscribe, club.get, club.get)
  const { state: s, look } = snap
  const [tab, setTab] = useState<Tab>('buddy')
  const [move, setMove] = useState<Playing>(null)
  const [line, setLine] = useState<{ text: string; n: number } | null>(null)
  const [toast, setToast] = useState<{ text: string; tone: 'good' | 'info' | 'warn'; n: number } | null>(null)
  const [burst, setBurst] = useState<{ n: number; amount: number } | null>(null)
  const [confetti, setConfetti] = useState(0)
  const coins = useRolling(s.coins)
  const nPlays = useRef(0)
  const rootRef = useRef<HTMLDivElement>(null)
  const walletRef = useRef<HTMLDivElement>(null)

  const say = (text: string, tone: 'good' | 'info' | 'warn' = 'info') => setToast({ text, tone, n: Date.now() })
  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 3200)
    return () => clearTimeout(t)
  }, [toast])
  useEffect(() => {
    if (!line) return
    const t = setTimeout(() => setLine(null), 5200)
    return () => clearTimeout(t)
  }, [line])

  // coins coming in (studying, a claimed quest): the number rolls and a "+N" rises from the wallet
  const lastCoins = useRef(s.coins)
  useEffect(() => {
    if (s.coins > lastCoins.current) setBurst({ n: Date.now(), amount: s.coins - lastCoins.current })
    lastCoins.current = s.coins
  }, [s.coins])

  // sync when opened, and when back online
  useEffect(() => {
    void club.sync()
    const on = () => void club.sync()
    window.addEventListener('online', on)
    return () => window.removeEventListener('online', on)
  }, [club])

  const play = (m: Move | undefined, opts: { hello?: boolean } = {}) => {
    if (!m) return
    if (!moveUnlocked(s, m.id)) {
      say(m.packId ? `${m.name} comes in the ${PACKS.find((p) => p.id === m.packId)?.name} pack.` : `${m.name} unlocks at ${m.unlockAt} study stars${m.bond ? ` and a bond of ${m.bond}` : ''}.`)
      return
    }
    nPlays.current += 1
    setMove({ id: m.id, n: nPlays.current, duration: m.duration, effect: m.effect })
    setLine({ text: m.line.split('Pochi').join(look.nickname), n: nPlays.current })
    club.setLook({ mood: m.mood })
    if (opts.hello) club.hello()
  }
  const playRoutine = async () => {
    for (const id of look.routine) {
      const m = MOVES.find((x) => x.id === id)
      if (!m) continue
      play(m)
      await new Promise((r) => setTimeout(r, m.duration + 250))
    }
  }
  const boop = () => {
    nPlays.current += 1
    setLine({ text: BOOP_LINES[nPlays.current % BOOP_LINES.length], n: nPlays.current })
  }

  const buy: Buy = (what, id, name, from) => {
    const r = club.buy(what, id)
    if (!r.ok) {
      say(r.why ?? 'Not yet.', 'warn')
      return false
    }
    flyCoins(rootRef.current, walletRef.current, from, 6)
    setConfetti(Date.now())
    say(`${name} is yours!`, 'good')
    if (what === 'item') {
      const it = ITEMS.find((i) => i.id === id)
      if (it) club.setLook({ equipped: { ...look.equipped, [it.slot]: it.id } })
    } else if (what === 'palette') club.setLook({ palette: id })
    play(MOVES.find((m) => m.id === (moveUnlocked(s, 'dance') ? 'dance' : 'hello')))
    return true
  }
  const claim = (id: 'hello' | 'lesson' | 'style', reward: number, from: Element | null) => {
    if (!club.claimQuest(id)) return
    flyCoins(rootRef.current, from, walletRef.current, Math.min(10, 3 + Math.round(reward / 5)))
    setConfetti(Date.now())
    say(`+${reward} Tuna Coins`, 'good')
  }

  const goalPct = stats ? Math.min(100, Math.round((stats.todayXp / Math.max(1, stats.dailyGoal)) * 100)) : null
  const questsReady = s.quests.filter((q) => q.done && !q.claimed && q.quest.id !== 'goal').length
  const questsDone = s.quests.filter((q) => q.claimed || (q.done && q.quest.id === 'goal')).length

  return (
    <div ref={rootRef} className="pc" data-theme={dark ? 'dark' : 'light'}>
      <header className="pc-top">
        {onClose && (
          <button type="button" className="pc-icon" onClick={onClose} aria-label="Close Pochi Club" title="Back (Esc)">
            <Icon name="back" size={18} />
          </button>
        )}
        <div className="pc-brand">
          <span className="pc-avatar" aria-hidden>
            <Face look={look} mood="happy" />
          </span>
          <div>
            <b>Pochi Club</b>
            <small>
              {s.rank.name} · {s.bondTier.name}
            </small>
          </div>
        </div>
        <nav className="pc-tabs" role="tablist" aria-label="Pochi Club">
          {(
            [
              ['buddy', 'Buddy'],
              ['shop', 'Shop'],
              ['moves', 'Moves'],
              ['quests', 'Quests'],
              ['wallet', 'Wallet'],
            ] as [Tab, string][]
          ).map(([id, label]) => (
            <button key={id} type="button" role="tab" aria-selected={tab === id} className={tab === id ? 'on' : ''} onClick={() => setTab(id)}>
              <Icon name={id} size={16} />
              <span>{label}</span>
              {id === 'quests' && questsReady > 0 && <em className="pc-dot">{questsReady}</em>}
            </button>
          ))}
        </nav>
        <div ref={walletRef} className="pc-wallet" title="Tuna Coins: earned by studying" onAnimationEnd={(e) => e.target === e.currentTarget && e.currentTarget.classList.remove('is-hit')}>
          <Coin n={coins} big />
          {burst && (
            <span key={`burst-${burst.n}`} className="pc-burst" aria-hidden>
              +{burst.amount}
            </span>
          )}
        </div>
      </header>

      {banner}
      {!snap.online && <div className="pc-strip">You are offline: everything works, and it syncs when you are back online.</div>}
      {snap.error && snap.online && (
        <div className="pc-strip warn" title={snap.error}>
          Not synced with your account yet. Your coins and closet are safe on this device and sync later.
        </div>
      )}

      <main className="pc-body">
        {tab === 'buddy' && (
          <div className="pc-buddy pc-in">
            <Stage look={look} home={look.home} move={move} follow onBoop={boop} className="big" label={`${look.nickname}'s home`}>
              <div className="pc-stage-tag">
                <b>{look.nickname}</b>
                <span>
                  {MOOD_LABEL[look.mood] ?? 'Happy'} · {HOMES.find((h) => h.id === look.home)?.name}
                </span>
              </div>
              {line && (
                <p key={`line-${line.n}`} className="pc-speech">
                  {line.text}
                </p>
              )}
              <div className="pc-stage-bar">
                <button type="button" className="pc-btn primary" onClick={() => play(MOVES.find((m) => m.id === look.favoriteMove), { hello: true })}>
                  <Icon name="hand" size={17} /> Say hello
                </button>
                <button type="button" className="pc-btn glass" onClick={() => void playRoutine()}>
                  <Icon name="film" size={16} /> Play routine
                </button>
              </div>
            </Stage>

            <aside className="pc-side">
              <div className="pc-card">
                <label className="pc-label" htmlFor="pc-name">
                  Name
                </label>
                <input id="pc-name" className="pc-input" defaultValue={look.nickname} maxLength={18} onBlur={(e) => e.target.value.trim() && e.target.value.trim() !== look.nickname && club.setLook({ nickname: e.target.value })} onKeyDown={(e) => e.key === 'Enter' && (e.target as HTMLInputElement).blur()} />
                <p className="pc-label">Shape</p>
                <div className="pc-forms" role="radiogroup" aria-label="Pochi's shape">
                  {(
                    [
                      ['blob', 'Blob', 'Pochi as always'],
                      ['cat', 'Cat', 'Ears, whiskers, a tail'],
                    ] as [PochiForm, string, string][]
                  ).map(([f, name, note]) => (
                    <button key={f} type="button" role="radio" aria-checked={(look.form ?? 'blob') === f} className={`pc-form ${(look.form ?? 'blob') === f ? 'on' : ''}`} onClick={() => club.setLook({ form: f })}>
                      <Face look={{ ...look, form: f }} mood="happy" />
                      <span>
                        <b>{name}</b>
                        <small>{note}</small>
                      </span>
                    </button>
                  ))}
                </div>
                <p className="pc-label">Mood</p>
                <div className="pc-moods">
                  {(MOODS as Mood[]).map((m) => (
                    <button key={m} type="button" className={`pc-mood ${look.mood === m ? 'on' : ''}`} onClick={() => club.setLook({ mood: m })} aria-pressed={look.mood === m}>
                      <Face look={look} mood={m} />
                      <span>{MOOD_LABEL[m] ?? m}</span>
                    </button>
                  ))}
                </div>
                <p className="pc-label">Home</p>
                <div className="pc-homes">
                  {HOMES.map((h) => {
                    const ok = homeUnlocked(s, h.id)
                    return (
                      <button key={h.id} type="button" className={`pc-home ${look.home === h.id ? 'on' : ''}`} disabled={!ok} title={ok ? h.name : `Unlocks at ${h.unlockAt} study stars`} onClick={() => club.setLook({ home: h.id })}>
                        <HomeThumb home={h.id} />
                        <span>
                          {!ok && <Icon name="lock" size={11} />} {h.name}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="pc-card">
                <div className="pc-row">
                  <b>Friendship</b>
                  <span>{s.bondTier.name}</span>
                </div>
                <Meter value={s.bond - s.bondTier.from} max={(s.bondTier.next ?? s.bond + 1) - s.bondTier.from} tone="pink" />
                <p className="pc-small">
                  Bond {s.bond}
                  {s.bondTier.next !== null ? ` · ${s.bondTier.next - s.bond} to the next chapter` : ' · the very last chapter'}. It grows each day you study and say hello, and it never goes down.
                </p>
                <div className="pc-row" style={{ marginTop: 14 }}>
                  <b>Study stars</b>
                  <span>{s.rank.name}</span>
                </div>
                <Meter value={s.stars - s.rank.at} max={(s.rank.next ?? s.stars + 1) - s.rank.at} />
                <p className="pc-small">
                  {s.stars} stars{s.rank.next !== null ? ` · ${s.rank.next - s.stars} to the next rank` : ''}. Stars come from studying and unlock moves, homes and rare accessories.
                </p>
                {stats && (
                  <>
                    <div className="pc-row" style={{ marginTop: 14 }}>
                      <b>{stats.streak}-day streak</b>
                      <span>{goalPct}% of today</span>
                    </div>
                    <Meter value={stats.todayXp} max={stats.dailyGoal} tone="warm" />
                  </>
                )}
              </div>

              <div className="pc-card">
                <p className="pc-label">Memories</p>
                {s.moments.length === 0 ? (
                  <p className="pc-small">Your first memories together start with your first lesson.</p>
                ) : (
                  <ul className="pc-memories">
                    {s.moments.slice(0, 6).map((m, i) => (
                      <li key={i} style={{ animationDelay: `${i * 50}ms` }}>
                        <span className="pc-memory-dot" aria-hidden>
                          {m.icon}
                        </span>
                        <span>{m.title}</span>
                        <small>{new Date(m.at).toLocaleDateString()}</small>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </aside>
          </div>
        )}

        {tab === 'shop' && <Shop s={s} look={look} club={club} buy={buy} />}

        {tab === 'moves' && <Moves s={s} look={look} club={club} play={play} move={move} buy={buy} />}

        {tab === 'quests' && (
          <div className="pc-grid-2 pc-in">
            <section className="pc-card">
              <header className="pc-quest-head">
                <span className={`pc-avatar lg ${questsReady ? 'is-eager' : ''}`} aria-hidden>
                  <Face look={look} mood={questsReady ? 'excited' : questsDone === s.quests.length ? 'proud' : 'happy'} />
                </span>
                <div>
                  <h3 className="pc-h">Today’s quests</h3>
                  <p className="pc-small" style={{ marginTop: 0 }}>
                    {questsDone} of {s.quests.length} done{questsReady ? ` · ${questsReady} ready to claim` : ''}
                  </p>
                </div>
                <Ring value={questsDone} max={s.quests.length} />
              </header>
              <ul className="pc-quests">
                {s.quests.map(({ quest, done, claimed }, i) => (
                  <li key={quest.id} className={claimed ? 'is-claimed' : done ? 'is-done' : ''} style={{ animationDelay: `${i * 60}ms` }}>
                    <span className="pc-quest-icon" aria-hidden>
                      {claimed ? (
                        <svg viewBox="0 0 24 24" className="pc-tick">
                          <path d="M5 12.5l4.2 4.2L19 7" />
                        </svg>
                      ) : (
                        quest.icon
                      )}
                    </span>
                    <div>
                      <b>{quest.title}</b>
                      <small>{quest.detail}</small>
                    </div>
                    {claimed ? (
                      <span className="pc-tag good">
                        <TunaCoin size={13} /> +{quest.reward}
                      </span>
                    ) : done && quest.id !== 'goal' ? (
                      <button type="button" className="pc-btn primary sm pc-claim" onClick={(e) => claim(quest.id as 'hello' | 'lesson' | 'style', quest.reward, e.currentTarget)}>
                        Claim <TunaCoin size={14} /> {quest.reward}
                      </button>
                    ) : (
                      <span className="pc-tag">
                        <TunaCoin size={13} /> {quest.reward}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
              {host === 'web' && <p className="pc-small">Lessons and the daily goal count when you study in Anvira Notes. They show up here the next time it syncs.</p>}
            </section>
            <section className="pc-card">
              <h3 className="pc-h">How Tuna Coins come in</h3>
              <ul className="pc-earn">
                <li>
                  <span>Finish a lesson, quiz or review</span>
                  <b>1 per {Math.round(1 / COINS_PER_XP)} XP</b>
                </li>
                <li>
                  <span>Reach your daily goal</span>
                  <b>+{GOAL_BONUS}</b>
                </li>
                <li>
                  <span>Finish a mock exam</span>
                  <b>+{EXAM_COINS}</b>
                </li>
                {STREAK_BONUS.map(([d, c]) => (
                  <li key={d}>
                    <span>{d}-day streak</span>
                    <b>+{c}</b>
                  </li>
                ))}
                <li>
                  <span>Welcome gift</span>
                  <b>+{WELCOME_COINS}</b>
                </li>
              </ul>
              <p className="pc-small">Coins can only be earned by studying, never bought. Study five days in all and Pochi gets the Moon Jelly Crown.</p>
            </section>
          </div>
        )}

        {tab === 'wallet' && (
          <div className="pc-grid-2 pc-in">
            <section className="pc-card pc-vault">
              <div className="pc-vault-coin" aria-hidden>
                <TunaCoin size={64} />
              </div>
              <small>Balance</small>
              <strong>{coins.toLocaleString()}</strong>
              <span className="pc-small" style={{ marginTop: 0 }}>
                Tuna Coins
              </span>
              <div className="pc-stats">
                <div>
                  <small>Earned ever</small>
                  <Coin n={s.earned} />
                </div>
                <div>
                  <small>Today</small>
                  <Coin n={s.todayEarned} />
                </div>
                <div>
                  <small>Study days</small>
                  <b>{s.studyDays}</b>
                </div>
              </div>
              <p className="pc-small">
                {snap.pending ? `${snap.pending} change${snap.pending === 1 ? '' : 's'} waiting to sync. ` : ''}
                {snap.lastSync ? `Last synced ${new Date(snap.lastSync).toLocaleString()}.` : 'Kept on this device until it can sync.'}{' '}
                <button type="button" className={`pc-link ${snap.syncing ? 'is-busy' : ''}`} onClick={() => void club.sync()} disabled={snap.syncing}>
                  <Icon name="sync" size={13} /> {snap.syncing ? 'Syncing…' : 'Sync now'}
                </button>
              </p>
            </section>
            <section className="pc-card">
              <h3 className="pc-h">History</h3>
              <ul className="pc-history">
                {s.history
                  .filter((e) => e.kind !== 'care')
                  .slice(0, 40)
                  .map((e, i) => (
                    <li key={e.id} className={e.ok ? '' : 'is-void'} style={{ animationDelay: `${Math.min(i, 12) * 30}ms` }}>
                      <span className={`pc-history-dot ${e.kind}`} aria-hidden />
                      <span>
                        {historyTitle(e)}
                        <small>{new Date(e.at).toLocaleString()}</small>
                      </span>
                      <b className={e.kind === 'earn' ? 'plus' : 'minus'}>{!e.ok ? 'not counted' : e.amount ? (e.kind === 'earn' ? '+' : '−') + e.amount.toLocaleString() : 'free'}</b>
                    </li>
                  ))}
                {s.history.length === 0 && <li className="pc-small">Nothing yet: finish a lesson and the first coins come in.</li>}
              </ul>
            </section>
          </div>
        )}
      </main>

      {toast && (
        <div key={`toast-${toast.n}`} className={`pc-toast ${toast.tone}`} role="status">
          {toast.tone === 'good' && <TunaCoin size={16} />}
          {toast.text}
        </div>
      )}
      {confetti > 0 && <Confetti key={`confetti-${confetti}`} />}
    </div>
  )
}

function Ring({ value, max }: { value: number; max: number }) {
  const r = 15
  const c = 2 * Math.PI * r
  return (
    <svg className="pc-ring" width="40" height="40" viewBox="0 0 40 40" role="img" aria-label={`${value} of ${max}`}>
      <circle cx="20" cy="20" r={r} fill="none" strokeWidth="4" className="track" />
      <circle cx="20" cy="20" r={r} fill="none" strokeWidth="4" strokeLinecap="round" className="fill" strokeDasharray={c} strokeDashoffset={c * (1 - value / Math.max(1, max))} transform="rotate(-90 20 20)" />
    </svg>
  )
}

function HomeThumb({ home }: { home: string }) {
  const html = useMemo(() => sceneMarkup(home, uid(`scene|${home}`)), [home])
  return <svg className={`pc-home-thumb pcs-${home}`} viewBox="40 40 320 240" preserveAspectRatio="xMidYMid slice" aria-hidden dangerouslySetInnerHTML={{ __html: `<g class="pa-scene">${html}</g>` }} />
}

function historyTitle(e: { kind: string; reason: string; ref: string; note?: string }): string {
  if (e.note) return e.note
  if (e.kind === 'spend') {
    const name = e.reason === 'item' ? ITEMS.find((i) => i.id === e.ref)?.name : e.reason === 'palette' ? PALETTES.find((p) => p.id === e.ref)?.name : PACKS.find((p) => p.id === e.ref)?.name
    return `Bought ${name ?? e.ref}`
  }
  return { welcome: 'Welcome gift', study: 'Studied', goal: 'Daily goal reached', streak: `${e.ref.split(':')[1] ?? ''}-day streak`, exam: 'Mock exam finished', quest: 'Quest claimed', gift: 'A gift from Anvira' }[e.reason] ?? e.reason
}

function Confetti() {
  const bits = useMemo(
    () =>
      Array.from({ length: 30 }, (_, i) => ({
        i,
        x: 8 + Math.random() * 84,
        d: Math.random() * 0.35,
        dx: (Math.random() - 0.5) * 160,
        r: 360 + Math.random() * 540,
        k: i % 3,
        c: ['#b9a9ff', '#f4b9a8', '#a5dbc6', '#f2d278', '#e9a7cd', '#9dceee'][i % 6],
      })),
    [],
  )
  if (calm()) return null
  return (
    <div className="pc-confetti" aria-hidden>
      {bits.map((b) => (
        <i key={b.i} className={`k${b.k}`} style={{ left: `${b.x}%`, animationDelay: `${b.d}s`, background: b.c, '--dx': `${b.dx}px`, '--r': `${b.r}deg` } as CSSProperties} />
      ))}
    </div>
  )
}

// ── Shop ────────────────────────────────────────────────────────────────────────────────────────────────────────────

function Shop({ s, look, club, buy }: { s: ClubState; look: Look; club: Club; buy: Buy }) {
  const [shelf, setShelf] = useState<ShopShelf>('all')
  const [q, setQ] = useState('')
  const [sort, setSort] = useState<'price' | 'rarity' | 'name'>('price')
  // what a click picked to try on, and what a mouse is resting on: hover previews, a click keeps it on
  const [picked, setPicked] = useState<string | undefined>()
  const [hovered, setHovered] = useState<string | undefined>()
  const trying = hovered ?? picked
  const [fresh, setFresh] = useState<string | null>(null)
  const rarity = ['Common', 'Rare', 'Epic', 'Legendary', 'Festival']
  const items = ITEMS.filter((i) => (shelf === 'all' || i.slot === shelf) && (!q || `${i.name} ${i.note} ${i.rarity}`.toLowerCase().includes(q.toLowerCase()))).sort((a, b) =>
    sort === 'price' ? a.price - b.price : sort === 'rarity' ? rarity.indexOf(a.rarity) - rarity.indexOf(b.rarity) : a.name.localeCompare(b.name),
  )
  const wear = (it: Item) => {
    const on = look.equipped[it.slot] === it.id
    club.setLook({ equipped: { ...look.equipped, [it.slot]: on ? undefined : it.id } })
  }
  const get: Buy = (what, id, name, from) => {
    const ok = buy(what, id, name, from)
    if (ok) {
      setFresh(id)
      setPicked(undefined)
      setHovered(undefined)
    }
    return ok
  }
  const tried = trying ? ITEMS.find((i) => i.id === trying) : null
  return (
    <div className="pc-shop pc-in">
      <aside className="pc-mirror">
        <Stage look={look} home={look.home} preview={trying} className="mirror" label="Mirror">
          <div className={`pc-mirror-note ${tried ? 'on' : ''}`}>{tried ? `Trying on: ${tried.name}` : 'Tap an item to try it on'}</div>
        </Stage>
        <div className="pc-slots" aria-label="Wearing">
          {SLOTS.map((slot) => {
            const id = look.equipped[slot]
            const it = id ? ITEMS.find((i) => i.id === id) : null
            return (
              <button key={slot} type="button" className={`pc-slot ${it ? 'on' : ''}`} disabled={!it} onClick={() => club.setLook({ equipped: { ...look.equipped, [slot]: undefined } })} title={it ? `Take off ${it.name}` : `${SLOT_LABEL[slot]}: nothing on`}>
                {it ? <svg viewBox={VIEWBOX} aria-hidden dangerouslySetInnerHTML={{ __html: itemMarkup(it.id, look.form) }} /> : <i />}
                <span>{SLOT_LABEL[slot]}</span>
                {it && (
                  <em aria-hidden>
                    <Icon name="x" size={10} />
                  </em>
                )}
              </button>
            )
          })}
        </div>
      </aside>
      <section>
        <div className="pc-shop-bar">
          <div className="pc-shelves" role="tablist" aria-label="Shelves">
            {(['all', 'Head', 'Face', 'Outfit', 'Back', 'Aura', 'colors', 'homes', 'packs'] as ShopShelf[]).map((sh) => (
              <button key={sh} type="button" role="tab" aria-selected={shelf === sh} className={`pc-chip ${shelf === sh ? 'on' : ''}`} onClick={() => setShelf(sh)}>
                {sh === 'all' ? 'Everything' : sh === 'colors' ? 'Colours' : sh === 'homes' ? 'Homes' : sh === 'packs' ? 'Animation packs' : SLOT_LABEL[sh]}
              </button>
            ))}
          </div>
          {!['colors', 'homes', 'packs'].includes(shelf) && (
            <div className="pc-shop-tools">
              <label className="pc-search">
                <Icon name="search" size={15} />
                <input placeholder="Search the shop" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search the shop" />
              </label>
              <select className="pc-input" value={sort} onChange={(e) => setSort(e.target.value as typeof sort)} aria-label="Sort">
                <option value="price">Price</option>
                <option value="rarity">Rarity</option>
                <option value="name">Name</option>
              </select>
            </div>
          )}
        </div>

        {!['colors', 'homes', 'packs'].includes(shelf) && (
          <div className="pc-cards" key={`shelf-${shelf}`}>
            {items.map((it, i) => {
              const own = s.owned.has(it.id)
              const locked = !own && s.stars < it.unlockAt
              const worn = look.equipped[it.slot] === it.id
              return (
                <article
                  key={it.id}
                  className={`pc-item r-${it.rarity.toLowerCase()} ${own ? 'is-own' : ''} ${locked ? 'is-locked' : ''} ${trying === it.id ? 'is-trying' : ''} ${fresh === it.id ? 'is-fresh' : ''}`}
                  style={{ animationDelay: `${Math.min(i, 14) * 35}ms` }}
                  onPointerEnter={(e) => e.pointerType === 'mouse' && setHovered(it.id)}
                  onPointerLeave={(e) => e.pointerType === 'mouse' && setHovered(undefined)}
                >
                  <button type="button" className="pc-item-art" onClick={() => {
                      setHovered(undefined)
                      setPicked(picked === it.id ? undefined : it.id)
                    }} aria-label={`Try on ${it.name}`}>
                    <svg viewBox={VIEWBOX} aria-hidden dangerouslySetInnerHTML={{ __html: itemMarkup(it.id, look.form) }} />
                    <span className="pc-rarity">{it.rarity}</span>
                    {own && (
                      <span className={`pc-owned ${worn ? 'worn' : ''}`} title={worn ? 'Wearing' : 'Yours'}>
                        <Icon name="check" size={11} />
                      </span>
                    )}
                  </button>
                  <div className="pc-item-meta">
                    <b>{it.name}</b>
                    <small>{it.note}</small>
                  </div>
                  <div className="pc-item-foot">
                    {it.event ? (
                      own ? (
                        <button type="button" className={`pc-btn sm ${worn ? '' : 'primary'}`} onClick={() => wear(it)}>
                          {worn ? 'Take off' : 'Wear'}
                        </button>
                      ) : (
                        <span className="pc-tag">Study 5 days to earn it</span>
                      )
                    ) : own ? (
                      <>
                        <span className="pc-tag good">{worn ? 'Wearing' : 'Yours'}</span>
                        <button type="button" className={`pc-btn sm ${worn ? '' : 'primary'}`} onClick={() => wear(it)}>
                          {worn ? 'Take off' : 'Wear'}
                        </button>
                      </>
                    ) : locked ? (
                      <span className="pc-lock">
                        <span>
                          <Icon name="lock" size={12} /> {it.unlockAt} study stars
                        </span>
                        <Meter value={s.stars} max={it.unlockAt} />
                      </span>
                    ) : (
                      <>
                        <span className="pc-price">
                          <TunaCoin size={15} /> {it.price}
                        </span>
                        <button type="button" className="pc-btn primary sm" disabled={s.coins < it.price} onClick={(e) => get('item', it.id, it.name, e.currentTarget)}>
                          Buy
                        </button>
                      </>
                    )}
                  </div>
                </article>
              )
            })}
            {items.length === 0 && <p className="pc-small">Nothing in the shop matches “{q}”.</p>}
          </div>
        )}

        {shelf === 'colors' && (
          <div className="pc-cards" key="shelf-colors">
            {PALETTES.map((p, i) => {
              const own = s.palettes.has(p.id)
              const on = look.palette === p.id
              return (
                <article key={p.id} className={`pc-item ${own ? 'is-own' : ''} ${fresh === p.id ? 'is-fresh' : ''}`} style={{ animationDelay: `${i * 35}ms` }}>
                  <div className="pc-item-art" style={{ '--swatch': p.color } as CSSProperties}>
                    <Face look={{ ...look, palette: p.id }} mood="happy" />
                    {own && (
                      <span className={`pc-owned ${on ? 'worn' : ''}`}>
                        <Icon name="check" size={11} />
                      </span>
                    )}
                  </div>
                  <div className="pc-item-meta">
                    <b>
                      <span className="pc-swatch" style={{ background: p.color }} /> {p.name}
                    </b>
                  </div>
                  <div className="pc-item-foot">
                    {own ? (
                      <button type="button" className={`pc-btn sm ${on ? '' : 'primary'}`} disabled={on} onClick={() => club.setLook({ palette: p.id })}>
                        {on ? 'Wearing' : 'Wear'}
                      </button>
                    ) : (
                      <>
                        <span className="pc-price">
                          <TunaCoin size={15} /> {p.price}
                        </span>
                        <button type="button" className="pc-btn primary sm" disabled={s.coins < p.price} onClick={(e) => get('palette', p.id, p.name, e.currentTarget)}>
                          Buy
                        </button>
                      </>
                    )}
                  </div>
                </article>
              )
            })}
          </div>
        )}

        {shelf === 'homes' && (
          <div className="pc-cards wide" key="shelf-homes">
            {HOMES.map((h, i) => {
              const ok = homeUnlocked(s, h.id)
              return (
                <article key={h.id} className={`pc-item ${ok ? 'is-own' : 'is-locked'}`} style={{ animationDelay: `${i * 40}ms` }}>
                  <div className="pc-item-art scene">
                    <HomeThumb home={h.id} />
                    {!ok && (
                      <span className="pc-home-lock">
                        <Icon name="lock" size={18} />
                      </span>
                    )}
                  </div>
                  <div className="pc-item-meta">
                    <b>{h.name}</b>
                    <small>{ok ? (s.stars >= h.unlockAt ? 'Unlocked by studying' : 'A gift from Anvira') : `Unlocks at ${h.unlockAt} study stars`}</small>
                  </div>
                  <div className="pc-item-foot">
                    {ok ? (
                      <button type="button" className={`pc-btn sm ${look.home === h.id ? '' : 'primary'}`} disabled={look.home === h.id} onClick={() => club.setLook({ home: h.id })}>
                        {look.home === h.id ? 'Home now' : 'Move in'}
                      </button>
                    ) : (
                      <span className="pc-lock">
                        <Meter value={s.stars} max={h.unlockAt} />
                      </span>
                    )}
                  </div>
                </article>
              )
            })}
          </div>
        )}

        {shelf === 'packs' && <Packs s={s} buy={get} />}
      </section>
    </div>
  )
}

function Packs({ s, buy }: { s: ClubState; buy: Buy }) {
  return (
    <div className="pc-packs">
      {PACKS.map((p, i) => {
        const own = s.packs.has(p.id)
        return (
          <article key={p.id} className={`pc-pack ${own ? 'is-own' : ''}`} style={{ animationDelay: `${i * 50}ms` }}>
            <header>
              <span className="pc-pack-icon" aria-hidden>
                {p.icon}
              </span>
              <div>
                <small>{p.task}</small>
                <b>{p.name}</b>
              </div>
            </header>
            <p className="pc-small">{p.description}</p>
            <ul>
              {p.moves.map((id) => {
                const m = MOVES.find((x) => x.id === id)!
                return (
                  <li key={id}>
                    <span aria-hidden>{m.icon}</span> {m.name}
                  </li>
                )
              })}
            </ul>
            {own ? (
              <span className="pc-tag good">
                <Icon name="check" size={12} /> In your move book
              </span>
            ) : (
              <button type="button" className="pc-btn primary" disabled={s.coins < p.price} onClick={(e) => buy('pack', p.id, p.name, e.currentTarget)}>
                Get all 5 moves · <TunaCoin size={15} /> {p.price}
              </button>
            )}
          </article>
        )
      })}
    </div>
  )
}

// ── Moves ───────────────────────────────────────────────────────────────────────────────────────────────────────────

function Moves({ s, look, club, play, move, buy }: { s: ClubState; look: Look; club: Club; play: (m: Move | undefined) => void; move: Playing; buy: Buy }) {
  const unlocked = MOVES.filter((m) => moveUnlocked(s, m.id))
  return (
    <div className="pc-movebook pc-in">
      <aside className="pc-mirror">
        <Stage look={look} home={look.home} move={move} className="mirror" label="Stage" />
        <div className="pc-card">
          <p className="pc-label">Routine (plays two moves in a row)</p>
          {[0, 1].map((k) => (
            <select
              key={k}
              className="pc-input"
              value={look.routine[k]}
              onChange={(e) => club.setLook({ routine: (k === 0 ? [e.target.value, look.routine[1]] : [look.routine[0], e.target.value]) as [string, string] })}
              aria-label={`Routine move ${k + 1}`}
            >
              {unlocked.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.icon} {m.name}
                </option>
              ))}
            </select>
          ))}
          <p className="pc-small">
            {unlocked.length} of {MOVES.length} moves unlocked. ★ marks the move Pochi does when you say hello.
          </p>
        </div>
      </aside>
      <section>
        <div className="pc-cards moves">
          {MOVES.map((m, i) => {
            const ok = moveUnlocked(s, m.id)
            const pack = m.packId ? PACKS.find((p) => p.id === m.packId) : null
            const fav = look.favoriteMove === m.id
            return (
              <article key={m.id} className={`pc-move ${ok ? '' : 'is-locked'} ${fav ? 'is-fav' : ''} ${move?.id === m.id ? 'is-playing' : ''}`} style={{ animationDelay: `${Math.min(i, 14) * 30}ms` }}>
                <span className="pc-move-icon" aria-hidden>
                  {m.icon}
                </span>
                <b>{m.name}</b>
                <small>{m.note}</small>
                <div className="pc-move-actions">
                  <button type="button" className="pc-btn sm primary" onClick={() => play(m)} disabled={!ok}>
                    <Icon name="play" size={12} fill /> Play
                  </button>
                  {ok && (
                    <button type="button" className={`pc-btn sm pc-fav ${fav ? 'on' : ''}`} onClick={() => club.setLook({ favoriteMove: m.id })} title="Pochi does this when you say hello" aria-pressed={fav}>
                      <Icon name="star" size={14} fill={fav} />
                    </button>
                  )}
                </div>
                {!ok &&
                  (pack ? (
                    <span className="pc-tag">
                      {pack.icon} {pack.name} pack
                    </span>
                  ) : (
                    <span className="pc-tag">
                      <Icon name="lock" size={11} /> {m.unlockAt} stars{m.bond ? ` · bond ${m.bond}` : ''}
                    </span>
                  ))}
              </article>
            )
          })}
        </div>
        <h3 className="pc-h" style={{ marginTop: 22 }}>
          Animation packs
        </h3>
        <Packs s={s} buy={buy} />
      </section>
    </div>
  )
}
