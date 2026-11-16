/**
 * Pochi drawn with a look: fur in the palette colour, a face for the mood, and what Pochi wears, stacked by depth.
 * Returns SVG inner markup for <svg viewBox={VIEWBOX}>; the moves animate `.pochi-sprite` and idle life comes from the
 * `pa-*` classes (see pochi-club.css). The art itself is in art.ts.
 *
 * SHARED FILE: identical copies in Anvira Notes (src/pochi-club/) and the website (LocalHouseLLM src/pochi-club/).
 */
import { ITEMS, PALETTES } from './catalog'
import { ART_H, ART_W, PLACE, WEAR, WEAR_ORDER, drawPochi, furOf, layersFor, sceneMarkup, uid } from './art'
import { PIXEL_WEAR, pixelBox, pixelLayersFor } from './pixelWear'
import type { Look } from './ledger'

export { sceneMarkup }
/** The homes' own viewBox (sceneMarkup). */
export const SCENE_VIEWBOX = '0 0 400 300'

/** A part of the drawing to zoom into: [x, y, w, h] in art.ts's 200 × 165 space. */
export type Box = [number, number, number, number]
/** Pochi's face, for little mood buttons. */
export const FACE_BOX: Box = [40, 14, 120, 112]

function zoom(box: Box | undefined, inner: string): string {
  if (!box) return `<g class="pochi-art" transform="${PLACE}">${inner}</g>`
  const [x, y, w, h] = box
  const s = Math.min(ART_W / w, ART_H / h)
  const ox = (ART_W - w * s) / 2 - x * s
  const oy = (ART_H - h * s) / 2 - y * s
  return `<g class="pochi-art" transform="${PLACE} translate(${ox.toFixed(2)} ${oy.toFixed(2)}) scale(${s.toFixed(4)})">${inner}</g>`
}

export function pochiMarkup(look: Pick<Look, 'palette' | 'equipped' | 'mood'> & { form?: Look['form'] }, opts: { preview?: string; box?: Box } = {}): string {
  const color = PALETTES.find((p) => p.id === look.palette)?.color ?? PALETTES[0].color
  const worn = new Set(Object.values(look.equipped ?? {}).filter(Boolean) as string[])
  // trying something on in the shop: it replaces whatever is in its slot
  if (opts.preview) {
    const slot = ITEMS.find((i) => i.id === opts.preview)?.slot
    for (const id of [...worn]) if (ITEMS.find((i) => i.id === id)?.slot === slot) worn.delete(id)
    worn.add(opts.preview)
  }
  const ids = [...worn].sort()
  const form = look.form === 'cat' ? 'cat' : 'blob'
  const u = uid(`${form}|${color}|${look.mood}|${ids.join(',')}|${opts.box ? opts.box.join(',') : ''}`)
  // the blob is the pixel mascot and wears pixel things; the cat wears the drawn set
  const layers = form === 'blob' ? pixelLayersFor(ids, WEAR_ORDER) : layersFor(ids, u)
  return zoom(opts.box, drawPochi(furOf(color), look.mood, u, layers, form))
}

/**
 * An accessory for shop cards, zoomed onto it: on its own, or on Pochi for the things that only make sense worn
 * (blush, auras, coats).
 */
export function itemMarkup(id: string, form: Look['form'] = 'blob'): string {
  if (form !== 'cat') {
    const p = PIXEL_WEAR[id]
    if (!p) return ''
    if (p.model) return pochiMarkup({ palette: 'lavender', equipped: { x: id }, mood: 'happy', form: 'blob' }, { box: pixelBox(id, true) })
    const L = pixelLayersFor([id], [id])
    return zoom(pixelBox(id, false), `<g class="pochi-sprite pa-item">${L.aura}${L.back}${L.body}${L.face}${L.head}${L.front}</g>`)
  }
  const w = WEAR[id]
  if (!w) return ''
  if (w.model) return pochiMarkup({ palette: 'lavender', equipped: { x: id }, mood: 'happy', form }, { box: w.box })
  const u = uid(`item|${id}`)
  const L = layersFor([id], u)
  return zoom(w.box, `<defs>${L.defs}</defs><g class="pochi-sprite pa-item">${L.aura}${L.back}${L.body}${L.face}${L.head}${L.front}</g>`)
}
