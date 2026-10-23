/**
 * Pochi drawn with a look: body in the palette colour, eyes for the mood, accessories behind and in front.
 * Returns SVG inner markup for <svg viewBox={VIEWBOX}>; the moves animate `.pochi-sprite` (see pochi-club.css).
 *
 * SHARED FILE: identical copies in Anvira Notes (src/pochi-club/) and the website (LocalHouseLLM src/pochi-club/).
 */
import { ART, BACK_ORDER, BLINK, BODY, EYES, FRONT_ORDER, ITEMS, PALETTES } from './catalog'
import type { Look } from './ledger'

export function pochiMarkup(look: Pick<Look, 'palette' | 'equipped' | 'mood'>, opts: { preview?: string } = {}): string {
  const color = PALETTES.find((p) => p.id === look.palette)?.color ?? PALETTES[0].color
  const worn = new Set(Object.values(look.equipped ?? {}).filter(Boolean) as string[])
  // trying something on in the shop: it replaces whatever is in its slot
  if (opts.preview) {
    const slot = ITEMS.find((i) => i.id === opts.preview)?.slot
    for (const id of [...worn]) if (ITEMS.find((i) => i.id === id)?.slot === slot) worn.delete(id)
    worn.add(opts.preview)
  }
  const back = BACK_ORDER.filter((id) => worn.has(id)).map((id) => ART[id] ?? '').join('')
  const front = FRONT_ORDER.filter((id) => worn.has(id)).map((id) => ART[id] ?? '').join('')
  const eyes = EYES[look.mood] ?? EYES.default ?? EYES.happy
  return `<g class="pochi-sprite">${back}<g fill="${color}" shape-rendering="crispEdges">${BODY}</g>${eyes}<g class="pochi-blink" fill="${color}" shape-rendering="crispEdges">${BLINK}</g>${front}</g>`
}

/** Just an accessory, centred, for shop cards. */
export function itemMarkup(id: string): string {
  return `<g class="pochi-sprite">${ART[id] ?? ''}</g>`
}
