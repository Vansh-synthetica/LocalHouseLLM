/**
 * The Tuna Coin: a small minted gold coin with a fish pressed into it.
 *
 * SHARED FILE: identical copies in Anvira Notes (src/pochi-club/) and the website (LocalHouseLLM src/pochi-club/).
 */
import { useId } from 'react'

/** The coin as markup for <svg viewBox="0 0 24 24">, with its gradient ids prefixed by `u`. */
export function coinMarkup(u: string): string {
  return (
    `<defs><radialGradient id="${u}a" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#fff2b8"/><stop offset=".45" stop-color="#f6c94e"/><stop offset="1" stop-color="#d4952a"/></radialGradient>` +
    `<linearGradient id="${u}b" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffe9a0"/><stop offset="1" stop-color="#b8771c"/></linearGradient></defs>` +
    `<circle cx="12" cy="12" r="11" fill="url(#${u}b)"/><circle cx="12" cy="12" r="9.2" fill="url(#${u}a)"/>` +
    `<circle cx="12" cy="12" r="9.2" fill="none" stroke="#c88a22" stroke-width=".6" stroke-dasharray=".9 .9" opacity=".6"/>` +
    `<path d="M5.6 12c1.9-2.6 4.6-3.6 7.3-3 1.5.3 2.7 1.2 3.6 2.2l2-1.6-.6 2.4.6 2.4-2-1.6c-.9 1-2.1 1.9-3.6 2.2-2.7.6-5.4-.4-7.3-3Z" fill="#c4862a" opacity=".85"/>` +
    `<circle cx="9" cy="11.3" r=".8" fill="#fff3c6"/><path d="M7.2 6.6a7 7 0 0 1 5.6-1.9" fill="none" stroke="#fff" stroke-opacity=".75" stroke-width="1.2" stroke-linecap="round"/>`
  )
}

export function TunaCoin({ size = 18, className = '' }: { size?: number; className?: string }) {
  const u = 'tc' + useId().replace(/[^a-zA-Z0-9]/g, '')
  return <svg className={`pc-tuna ${className}`} width={size} height={size} viewBox="0 0 24 24" aria-hidden dangerouslySetInnerHTML={{ __html: coinMarkup(u) }} />
}
