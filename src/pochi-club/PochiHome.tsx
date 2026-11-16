/**
 * Pochi standing in its home, small and self-contained: for places outside the club (the Study home, the account
 * page). The idle life (breathing, blinking, glances) comes from pochi-art.css; the eyes follow the pointer a little
 * when `follow` is set, and a tap squishes Pochi when `onBoop` is given.
 *
 * SHARED FILE: identical copies in Anvira Notes (src/pochi-club/) and the website (LocalHouseLLM src/pochi-club/).
 */
import { useEffect, useMemo, useRef } from 'react'
import { VIEWBOX } from './catalog'
import { SCENE_VIEWBOX, pochiMarkup, sceneMarkup } from './render'
import { uid } from './art'
import type { Look } from './ledger'
import type { Mood } from './catalog'
import './pochi-art.css'

const calm = () => typeof window !== 'undefined' && !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

export default function PochiHome({ look, mood, dark, follow, onBoop, close, className = '', title }: {
  look: Pick<Look, 'palette' | 'equipped' | 'mood' | 'home' | 'form'>
  /** overrides the look's own mood (Pochi reacting to what is happening) */
  mood?: Mood
  /** the graphite home colours */
  dark?: boolean
  follow?: boolean
  /** a closer view of Pochi, for small tiles */
  close?: boolean
  onBoop?: () => void
  className?: string
  title?: string
}) {
  const ref = useRef<SVGSVGElement>(null)
  const worn = JSON.stringify(look.equipped)
  const shown = mood ?? look.mood
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const markup = useMemo(() => pochiMarkup({ palette: look.palette, equipped: look.equipped, mood: shown, form: look.form }), [look.palette, shown, look.form, worn])
  const scene = useMemo(() => sceneMarkup(look.home, uid(`scene|${look.home}`)), [look.home])

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
    onBoop()
  }

  return (
    <svg className={`pcs-room pcs-${look.home} ${dark ? 'pcs-dark' : ''} ${className}`} viewBox={close ? '64 84 272 216' : SCENE_VIEWBOX} preserveAspectRatio="xMidYMax slice" role={title ? 'img' : undefined} aria-label={title} aria-hidden={title ? undefined : true}>
      <g className="pa-scene" dangerouslySetInnerHTML={{ __html: scene }} />
      <svg ref={ref} className={`pc-sprite ${onBoop ? 'is-boopable' : ''}`} x="104" y="114" width="192" height="158.6" viewBox={VIEWBOX} overflow="visible" onClick={boop} dangerouslySetInnerHTML={{ __html: markup }} />
    </svg>
  )
}
