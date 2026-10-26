/**
 * Pochi Club: Pochi's home, closet, move book, shop and quests, paid for in Tuna Coins earned by studying.
 * The same component in Anvira Notes (works offline) and on localhousellm.com/account/study (the same account).
 *
 * SHARED FILE: identical copies in Anvira Notes (src/pochi-club/) and the website (LocalHouseLLM src/pochi-club/).
 * Plain React and its own stylesheet (pochi-club.css), so it fits either host.
 */
import { useEffect, useMemo, useRef, useState, useSyncExternalStore, type CSSProperties, type ReactNode } from 'react'
import { HOMES, ITEMS, MOODS, MOVES, PACKS, PALETTES, VIEWBOX, type Item, type Mood, type Move, type Slot } from './catalog'
import { COINS_PER_XP, EXAM_COINS, GOAL_BONUS, STREAK_BONUS, WELCOME_COINS, homeUnlocked, moveUnlocked, type ClubState, type Look } from './ledger'
import { itemMarkup, pochiMarkup } from './render'
import type { Club } from './engine'

type Tab = 'buddy' | 'shop' | 'moves' | 'quests' | 'wallet'
type ShopShelf = 'all' | Slot | 'colors' | 'homes' | 'packs'

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

/** Pochi, drawn with a look, playing a move when `move` changes (with its little particles). */
export function PochiSprite({ look, preview, move, size = 220, className = '' }: { look: Pick<Look, 'palette' | 'equipped' | 'mood'>; preview?: string; move?: { id: string; n: number; duration: number; effect?: string } | null; size?: number; className?: string }) {
  const ref = useRef<SVGSVGElement>(null)
  const [particles, setParticles] = useState<{ k: number; x: number; y: number; d: number; ch: string }[]>([])
  useEffect(() => {
    const el = ref.current
    if (!el || !move) return
    el.dataset.move = move.id
    el.style.setProperty('--pochi-move-duration', `${move.duration}ms`)
    el.classList.remove('is-playing')
    void el.getBoundingClientRect()
    el.classList.add('is-playing')
    if (move.effect) setParticles(Array.from({ length: 7 }, (_, i) => ({ k: move.n * 10 + i, x: Math.cos((i / 7) * Math.PI * 2) * 46 + (Math.random() * 16 - 8), y: Math.sin((i / 7) * Math.PI * 2) * 34 - 20, d: i * 70, ch: move.effect! })))
    const t = setTimeout(() => {
      el.classList.remove('is-playing')
      setParticles([])
    }, move.duration + 120)
    return () => clearTimeout(t)
  }, [move])
  const markup = useMemo(() => pochiMarkup(look, { preview }), [look, preview])
  return (
    <div className={`pc-sprite-wrap ${className}`} style={{ width: size, height: (size * 38) / 46 }}>
      <svg ref={ref} className="pc-sprite pc-float" viewBox={VIEWBOX} role="img" aria-label="Pochi" dangerouslySetInnerHTML={{ __html: markup }} />
      {particles.map((p) => (
        <span key={p.k} className={`pc-particle ${p.ch === '♥' ? 'is-heart' : ''}`} style={{ '--x': `${p.x}px`, '--y': `${p.y}px`, '--wait': `${p.d}ms` } as CSSProperties}>
          {p.ch}
        </span>
      ))}
    </div>
  )
}

function Coin({ n, big }: { n: number; big?: boolean }) {
  return (
    <span className={`pc-coin ${big ? 'big' : ''}`}>
      <i aria-hidden>🐟</i>
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
    const t0 = performance.now()
    let raf = 0
    const step = (t: number) => {
      const k = Math.min(1, (t - t0) / 650)
      setShown(Math.round(a + (b - a) * (1 - (1 - k) ** 3)))
      if (k < 1) raf = requestAnimationFrame(step)
      else from.current = b
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [value])
  return shown
}

function Meter({ value, max, tone = 'var(--pc-accent)' }: { value: number; max: number; tone?: string }) {
  return (
    <span className="pc-meter" role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={max}>
      <i style={{ width: `${Math.max(3, Math.min(100, (value / Math.max(1, max)) * 100))}%`, background: tone }} />
    </span>
  )
}

export default function PochiClubView({ club, host, stats, onClose, dark, banner }: PochiClubProps) {
  const snap = useSyncExternalStore(club.subscribe, club.get, club.get)
  const { state: s, look } = snap
  const [tab, setTab] = useState<Tab>('buddy')
  const [move, setMove] = useState<{ id: string; n: number; duration: number; effect?: string } | null>(null)
  const [line, setLine] = useState<string>('')
  const [toast, setToast] = useState<{ text: string; tone: 'good' | 'info' | 'warn'; n: number } | null>(null)
  const [burst, setBurst] = useState<{ n: number; amount: number } | null>(null)
  const [confetti, setConfetti] = useState(0)
  const coins = useRolling(s.coins)
  const nPlays = useRef(0)

  const say = (text: string, tone: 'good' | 'info' | 'warn' = 'info') => setToast({ text, tone, n: Date.now() })
  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 3200)
    return () => clearTimeout(t)
  }, [toast])

  // coins coming in (studying, a claimed quest): a little burst of fish
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
    setLine(m.line.split('Pochi').join(look.nickname))
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

  const buy = (what: 'item' | 'palette' | 'pack', id: string, name: string) => {
    const r = club.buy(what, id)
    if (!r.ok) return say(r.why ?? 'Not yet.', 'warn')
    setConfetti(Date.now())
    say(`${name} is yours!`, 'good')
    if (what === 'item') {
      const it = ITEMS.find((i) => i.id === id)
      if (it) club.setLook({ equipped: { ...look.equipped, [it.slot]: it.id } })
    } else if (what === 'palette') club.setLook({ palette: id })
    play(MOVES.find((m) => m.id === (moveUnlocked(s, 'dance') ? 'dance' : 'hello')))
  }

  const goalPct = stats ? Math.min(100, Math.round((stats.todayXp / Math.max(1, stats.dailyGoal)) * 100)) : null
  const questsReady = s.quests.filter((q) => q.done && !q.claimed && q.quest.id !== 'goal').length

  return (
    <div className="pc" data-theme={dark ? 'dark' : 'light'}>
      <header className="pc-top">
        {onClose && (
          <button type="button" className="pc-icon" onClick={onClose} aria-label="Close Pochi Club" title="Back (Esc)">
            ←
          </button>
        )}
        <div className="pc-brand">
          <span className="pc-brand-mark" aria-hidden>
            🐾
          </span>
          <div>
            <b>Pochi Club</b>
            <small>
              {s.rank.name} · {s.bondTier.name}
            </small>
          </div>
        </div>
        <nav className="pc-tabs" role="tablist">
          {(
            [
              ['buddy', 'Buddy', '🏡'],
              ['shop', 'Shop', '🛍️'],
              ['moves', 'Moves', '💃'],
              ['quests', 'Quests', '✨'],
              ['wallet', 'Wallet', '🐟'],
            ] as [Tab, string, string][]
          ).map(([id, label, icon]) => (
            <button key={id} type="button" role="tab" aria-selected={tab === id} className={tab === id ? 'on' : ''} onClick={() => setTab(id)}>
              <span aria-hidden>{icon}</span> {label}
              {id === 'quests' && questsReady > 0 && <em className="pc-dot">{questsReady}</em>}
            </button>
          ))}
        </nav>
        <div className="pc-wallet" title="Tuna Coins: earned by studying">
          <Coin n={coins} big />
          {burst && (
            <span key={burst.n} className="pc-burst" aria-hidden>
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
          <div className="pc-buddy">
            <section className={`pc-stage home-${look.home}`} aria-label={`${look.nickname}'s home`}>
              <div className="pc-stage-deco" aria-hidden>
                <i />
                <i />
                <i />
              </div>
              <PochiSprite look={look} move={move} size={300} />
              {line && (
                <p key={line + nPlays.current} className="pc-speech">
                  {line}
                </p>
              )}
              <div className="pc-stage-bar">
                <button type="button" className="pc-btn primary" onClick={() => play(MOVES.find((m) => m.id === look.favoriteMove), { hello: true })}>
                  👋 Say hello
                </button>
                <button type="button" className="pc-btn" onClick={() => void playRoutine()}>
                  🎬 Play routine
                </button>
              </div>
            </section>

            <aside className="pc-side">
              <div className="pc-card">
                <label className="pc-label" htmlFor="pc-name">
                  Name
                </label>
                <input id="pc-name" className="pc-input" defaultValue={look.nickname} maxLength={18} onBlur={(e) => e.target.value.trim() && e.target.value.trim() !== look.nickname && club.setLook({ nickname: e.target.value })} onKeyDown={(e) => e.key === 'Enter' && (e.target as HTMLInputElement).blur()} />
                <p className="pc-label">Mood</p>
                <div className="pc-chips">
                  {(MOODS as Mood[]).map((m) => (
                    <button key={m} type="button" className={`pc-chip ${look.mood === m ? 'on' : ''}`} onClick={() => club.setLook({ mood: m })}>
                      {MOOD_LABEL[m] ?? m}
                    </button>
                  ))}
                </div>
                <p className="pc-label">Home</p>
                <div className="pc-chips">
                  {HOMES.map((h) => {
                    const ok = homeUnlocked(s, h.id)
                    return (
                      <button key={h.id} type="button" className={`pc-chip ${look.home === h.id ? 'on' : ''}`} disabled={!ok} title={ok ? h.name : `Unlocks at ${h.unlockAt} study stars`} onClick={() => club.setLook({ home: h.id })}>
                        {h.icon} {h.name}
                        {!ok && ' 🔒'}
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="pc-card">
                <div className="pc-row">
                  <b>💗 Friendship</b>
                  <span>{s.bondTier.name}</span>
                </div>
                <Meter value={s.bond - s.bondTier.from} max={(s.bondTier.next ?? s.bond + 1) - s.bondTier.from} tone="var(--pc-pink)" />
                <p className="pc-small">
                  Bond {s.bond}
                  {s.bondTier.next !== null ? ` · ${s.bondTier.next - s.bond} to the next chapter` : ' · the very last chapter'}. It grows each day you study and say hello, and it never goes down.
                </p>
                <div className="pc-row" style={{ marginTop: 10 }}>
                  <b>⭐ Study stars</b>
                  <span>{s.rank.name}</span>
                </div>
                <Meter value={s.stars - s.rank.at} max={(s.rank.next ?? s.stars + 1) - s.rank.at} />
                <p className="pc-small">
                  {s.stars} stars{s.rank.next !== null ? ` · ${s.rank.next - s.stars} to the next rank` : ''}. Stars come from studying and unlock moves, homes and rare accessories.
                </p>
                {stats && (
                  <>
                    <div className="pc-row" style={{ marginTop: 10 }}>
                      <b>🔥 {stats.streak}-day streak</b>
                      <span>{goalPct}% of today</span>
                    </div>
                    <Meter value={stats.todayXp} max={stats.dailyGoal} tone="var(--pc-orange)" />
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
                      <li key={i}>
                        <span aria-hidden>{m.icon}</span>
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
          <div className="pc-grid-2">
            <section className="pc-card">
              <h3 className="pc-h">Today’s quests</h3>
              <ul className="pc-quests">
                {s.quests.map(({ quest, done, claimed }) => (
                  <li key={quest.id} className={claimed ? 'is-claimed' : done ? 'is-done' : ''}>
                    <span className="pc-quest-icon" aria-hidden>
                      {quest.icon}
                    </span>
                    <div>
                      <b>{quest.title}</b>
                      <small>{quest.detail}</small>
                    </div>
                    {claimed ? (
                      <span className="pc-tag good">✓ +{quest.reward}</span>
                    ) : done && quest.id !== 'goal' ? (
                      <button
                        type="button"
                        className="pc-btn primary sm"
                        onClick={() => {
                          if (club.claimQuest(quest.id as 'hello' | 'lesson' | 'style')) {
                            setConfetti(Date.now())
                            say(`+${quest.reward} Tuna Coins`, 'good')
                          }
                        }}
                      >
                        Claim +{quest.reward}
                      </button>
                    ) : (
                      <span className="pc-tag">+{quest.reward}</span>
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
                  <span>📚 Finish a lesson, quiz or review</span>
                  <b>1 per {Math.round(1 / COINS_PER_XP)} XP</b>
                </li>
                <li>
                  <span>☀️ Reach your daily goal</span>
                  <b>+{GOAL_BONUS}</b>
                </li>
                <li>
                  <span>🎓 Finish a mock exam</span>
                  <b>+{EXAM_COINS}</b>
                </li>
                {STREAK_BONUS.map(([d, c]) => (
                  <li key={d}>
                    <span>🔥 {d}-day streak</span>
                    <b>+{c}</b>
                  </li>
                ))}
                <li>
                  <span>🎁 Welcome gift</span>
                  <b>+{WELCOME_COINS}</b>
                </li>
              </ul>
              <p className="pc-small">Coins can only be earned by studying, never bought. Study five days in all and Pochi gets the Moon Jelly Crown.</p>
            </section>
          </div>
        )}

        {tab === 'wallet' && (
          <div className="pc-grid-2">
            <section className="pc-card">
              <div className="pc-stats">
                <div>
                  <small>Balance</small>
                  <Coin n={s.coins} />
                </div>
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
                <button type="button" className="pc-link" onClick={() => void club.sync()} disabled={snap.syncing}>
                  {snap.syncing ? 'Syncing…' : 'Sync now'}
                </button>
              </p>
            </section>
            <section className="pc-card">
              <h3 className="pc-h">History</h3>
              <ul className="pc-history">
                {s.history.filter((e) => e.kind !== 'care').slice(0, 40).map((e) => (
                  <li key={e.id} className={e.ok ? '' : 'is-void'}>
                    <span>{historyTitle(e)}</span>
                    <small>{new Date(e.at).toLocaleString()}</small>
                    <b className={e.kind === 'earn' ? 'plus' : 'minus'}>{e.ok ? (e.kind === 'earn' ? '+' : '−') + e.amount.toLocaleString() : 'not counted'}</b>
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
          {toast.text}
        </div>
      )}
      {confetti > 0 && <Confetti key={`confetti-${confetti}`} />}
    </div>
  )
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
  const bits = useMemo(() => Array.from({ length: 26 }, (_, i) => ({ i, x: Math.random() * 100, d: Math.random() * 0.5, r: Math.random() * 360, c: ['#b9a9ff', '#f4b9a8', '#a5dbc6', '#f2d278', '#e9a7cd', '#9dceee'][i % 6] })), [])
  return (
    <div className="pc-confetti" aria-hidden>
      {bits.map((b) => (
        <i key={b.i} style={{ left: `${b.x}%`, animationDelay: `${b.d}s`, background: b.c, transform: `rotate(${b.r}deg)` }} />
      ))}
    </div>
  )
}

// ── Shop ────────────────────────────────────────────────────────────────────────────────────────────────────────────

function Shop({ s, look, club, buy }: { s: ClubState; look: Look; club: Club; buy: (what: 'item' | 'palette' | 'pack', id: string, name: string) => void }) {
  const [shelf, setShelf] = useState<ShopShelf>('all')
  const [q, setQ] = useState('')
  const [sort, setSort] = useState<'price' | 'rarity' | 'name'>('price')
  const [trying, setTrying] = useState<string | undefined>()
  const rarity = ['Common', 'Rare', 'Epic', 'Legendary', 'Festival']
  const items = ITEMS.filter((i) => (shelf === 'all' || i.slot === shelf) && (!q || `${i.name} ${i.note} ${i.rarity}`.toLowerCase().includes(q.toLowerCase()))).sort((a, b) =>
    sort === 'price' ? a.price - b.price : sort === 'rarity' ? rarity.indexOf(a.rarity) - rarity.indexOf(b.rarity) : a.name.localeCompare(b.name)
  )
  const wear = (it: Item) => {
    const on = look.equipped[it.slot] === it.id
    club.setLook({ equipped: { ...look.equipped, [it.slot]: on ? undefined : it.id } })
  }
  return (
    <div className="pc-shop">
      <aside className="pc-mirror">
        <div className={`pc-mirror-stage home-${look.home}`}>
          <PochiSprite look={look} preview={trying} size={200} />
        </div>
        <p className="pc-small" style={{ textAlign: 'center' }}>
          {trying ? `Trying on: ${ITEMS.find((i) => i.id === trying)?.name}` : 'Hover an item to try it on'}
        </p>
        <div className="pc-card" style={{ marginTop: 10 }}>
          <p className="pc-label">Wearing</p>
          <div className="pc-chips">
            {Object.entries(look.equipped).filter(([, id]) => id).length === 0 && <span className="pc-small">Nothing yet</span>}
            {Object.entries(look.equipped)
              .filter(([, id]) => id)
              .map(([slot, id]) => {
                const it = ITEMS.find((i) => i.id === id)
                return (
                  <button key={slot} type="button" className="pc-chip on" onClick={() => club.setLook({ equipped: { ...look.equipped, [slot]: undefined } })} title="Take it off">
                    {it?.emoji} {it?.name} ✕
                  </button>
                )
              })}
          </div>
        </div>
      </aside>
      <section>
        <div className="pc-shop-bar">
          <div className="pc-chips">
            {(['all', 'Head', 'Face', 'Outfit', 'Back', 'Aura', 'colors', 'homes', 'packs'] as ShopShelf[]).map((sh) => (
              <button key={sh} type="button" className={`pc-chip ${shelf === sh ? 'on' : ''}`} onClick={() => setShelf(sh)}>
                {sh === 'all' ? 'Everything' : sh === 'colors' ? 'Colours' : sh === 'homes' ? 'Homes' : sh === 'packs' ? 'Animation packs' : SLOT_LABEL[sh]}
              </button>
            ))}
          </div>
          {!['colors', 'homes', 'packs'].includes(shelf) && (
            <div className="pc-shop-tools">
              <input className="pc-input" placeholder="Search the shop" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search the shop" />
              <select className="pc-input" value={sort} onChange={(e) => setSort(e.target.value as typeof sort)} aria-label="Sort">
                <option value="price">Price</option>
                <option value="rarity">Rarity</option>
                <option value="name">Name</option>
              </select>
            </div>
          )}
        </div>

        {!['colors', 'homes', 'packs'].includes(shelf) && (
          <div className="pc-cards">
            {items.map((it) => {
              const own = s.owned.has(it.id)
              const locked = !own && s.stars < it.unlockAt
              const worn = look.equipped[it.slot] === it.id
              return (
                <article key={it.id} className={`pc-item r-${it.rarity.toLowerCase()} ${own ? 'is-own' : ''} ${locked ? 'is-locked' : ''}`} onMouseEnter={() => setTrying(it.id)} onMouseLeave={() => setTrying(undefined)} onFocus={() => setTrying(it.id)}>
                  <div className="pc-item-art">
                    <svg viewBox={VIEWBOX} aria-hidden dangerouslySetInnerHTML={{ __html: itemMarkup(it.id) }} />
                    <span className="pc-rarity">{it.rarity}</span>
                  </div>
                  <b>
                    {it.emoji} {it.name}
                  </b>
                  <small>{it.note}</small>
                  {it.event ? (
                    <span className={`pc-tag ${own ? 'good' : ''}`}>{own ? (worn ? 'Wearing' : 'Earned') : 'Study 5 days to earn it'}</span>
                  ) : own ? (
                    <button type="button" className={`pc-btn sm ${worn ? '' : 'primary'}`} onClick={() => wear(it)}>
                      {worn ? 'Take off' : 'Wear'}
                    </button>
                  ) : locked ? (
                    <span className="pc-lock">
                      🔒 {it.unlockAt} stars
                      <Meter value={s.stars} max={it.unlockAt} />
                    </span>
                  ) : (
                    <button type="button" className="pc-btn primary sm" disabled={s.coins < it.price} onClick={() => buy('item', it.id, it.name)}>
                      Buy · 🐟 {it.price}
                    </button>
                  )}
                  {it.event && own && (
                    <button type="button" className="pc-btn sm" onClick={() => wear(it)}>
                      {worn ? 'Take off' : 'Wear'}
                    </button>
                  )}
                </article>
              )
            })}
          </div>
        )}

        {shelf === 'colors' && (
          <div className="pc-cards">
            {PALETTES.map((p) => {
              const own = s.palettes.has(p.id)
              return (
                <article key={p.id} className={`pc-item ${own ? 'is-own' : ''}`}>
                  <div className="pc-item-art">
                    <svg viewBox={VIEWBOX} aria-hidden dangerouslySetInnerHTML={{ __html: pochiMarkup({ palette: p.id, equipped: {}, mood: 'happy' }) }} />
                  </div>
                  <b>
                    <span className="pc-swatch" style={{ background: p.color }} /> {p.name}
                  </b>
                  {own ? (
                    <button type="button" className={`pc-btn sm ${look.palette === p.id ? '' : 'primary'}`} disabled={look.palette === p.id} onClick={() => club.setLook({ palette: p.id })}>
                      {look.palette === p.id ? 'Wearing' : 'Wear'}
                    </button>
                  ) : (
                    <button type="button" className="pc-btn primary sm" disabled={s.coins < p.price} onClick={() => buy('palette', p.id, p.name)}>
                      Buy · 🐟 {p.price}
                    </button>
                  )}
                </article>
              )
            })}
          </div>
        )}

        {shelf === 'homes' && (
          <div className="pc-cards">
            {HOMES.map((h) => {
              const ok = homeUnlocked(s, h.id)
              return (
                <article key={h.id} className={`pc-item ${ok ? 'is-own' : 'is-locked'}`}>
                  <div className={`pc-item-art pc-home-swatch home-${h.id}`}>
                    <span style={{ fontSize: 34 }}>{h.icon}</span>
                  </div>
                  <b>{h.name}</b>
                  <small>{ok ? (s.stars >= h.unlockAt ? 'Unlocked by studying' : 'A gift from Anvira') : `Unlocks at ${h.unlockAt} study stars`}</small>
                  {ok ? (
                    <button type="button" className={`pc-btn sm ${look.home === h.id ? '' : 'primary'}`} disabled={look.home === h.id} onClick={() => club.setLook({ home: h.id })}>
                      {look.home === h.id ? 'Home now' : 'Move in'}
                    </button>
                  ) : (
                    <span className="pc-lock">
                      🔒 <Meter value={s.stars} max={h.unlockAt} />
                    </span>
                  )}
                </article>
              )
            })}
          </div>
        )}

        {shelf === 'packs' && <Packs s={s} buy={buy} />}
      </section>
    </div>
  )
}

function Packs({ s, buy }: { s: ClubState; buy: (what: 'item' | 'palette' | 'pack', id: string, name: string) => void }) {
  return (
    <div className="pc-packs">
      {PACKS.map((p) => {
        const own = s.packs.has(p.id)
        return (
          <article key={p.id} className={`pc-pack ${own ? 'is-own' : ''}`}>
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
              <span className="pc-tag good">✓ In your move book</span>
            ) : (
              <button type="button" className="pc-btn primary" disabled={s.coins < p.price} onClick={() => buy('pack', p.id, p.name)}>
                Get all 5 moves · 🐟 {p.price}
              </button>
            )}
          </article>
        )
      })}
    </div>
  )
}

// ── Moves ───────────────────────────────────────────────────────────────────────────────────────────────────────────

function Moves({ s, look, club, play, move, buy }: { s: ClubState; look: Look; club: Club; play: (m: Move | undefined) => void; move: { id: string; n: number; duration: number; effect?: string } | null; buy: (what: 'item' | 'palette' | 'pack', id: string, name: string) => void }) {
  const unlocked = MOVES.filter((m) => moveUnlocked(s, m.id))
  return (
    <div className="pc-movebook">
      <aside className="pc-mirror">
        <div className={`pc-mirror-stage home-${look.home}`}>
          <PochiSprite look={look} move={move} size={220} />
        </div>
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
          {MOVES.map((m) => {
            const ok = moveUnlocked(s, m.id)
            const pack = m.packId ? PACKS.find((p) => p.id === m.packId) : null
            return (
              <article key={m.id} className={`pc-move ${ok ? '' : 'is-locked'} ${look.favoriteMove === m.id ? 'is-fav' : ''}`}>
                <span className="pc-move-icon" aria-hidden>
                  {m.icon}
                </span>
                <b>{m.name}</b>
                <small>{m.note}</small>
                <div className="pc-move-actions">
                  <button type="button" className="pc-btn sm primary" onClick={() => play(m)} disabled={!ok}>
                    ▶ Play
                  </button>
                  {ok && (
                    <button type="button" className={`pc-btn sm ${look.favoriteMove === m.id ? 'gold' : ''}`} onClick={() => club.setLook({ favoriteMove: m.id })} title="Pochi does this when you say hello">
                      ★
                    </button>
                  )}
                </div>
                {!ok && (pack ? <span className="pc-tag">{pack.icon} {pack.name} pack</span> : <span className="pc-tag">🔒 {m.unlockAt} stars{m.bond ? ` · bond ${m.bond}` : ''}</span>)}
              </article>
            )
          })}
        </div>
        <h3 className="pc-h" style={{ marginTop: 18 }}>
          Animation packs
        </h3>
        <Packs s={s} buy={buy} />
      </section>
    </div>
  )
}
