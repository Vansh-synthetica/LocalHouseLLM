/**
 * Pochi Club on the Anvira account (the app's Supabase project): tables pochi_events and pochi_looks, each person's
 * own rows only (row-level security), with the same earning limits as the ledger (see supabase migration
 * 20261024120000_pochi_club).
 *
 * SHARED FILE: identical copies in Anvira Notes (src/pochi-club/) and the website (LocalHouseLLM src/pochi-club/).
 */
import type { SupabaseClient } from '@supabase/supabase-js'
import type { Backend } from './engine'
import type { Look, PochiEvent } from './ledger'

interface Row {
  id: string
  kind: string
  reason: string
  amount: number
  ref: string
  note: string | null
  at: string
}

const toRow = (e: PochiEvent) => ({ id: e.id, kind: e.kind, reason: e.reason, amount: e.amount, ref: e.ref, note: e.note ?? null, at: e.at })
const fromRow = (r: Row): PochiEvent => ({ id: r.id, kind: r.kind as PochiEvent['kind'], reason: r.reason, amount: r.amount, ref: r.ref, at: new Date(r.at).toISOString(), ...(r.note ? { note: r.note } : {}) })

/** A refusal by the rules (check constraint, the daily limit), not a connection problem: the event is dropped. */
const isRuleError = (e: { code?: string } | null) => Boolean(e && (e.code === '23514' || e.code === 'P0001' || e.code === '22023'))

export function supabaseBackend(client: () => Promise<SupabaseClient>, userId: string): Backend {
  return {
    async push(events) {
      const c = await client()
      const refused: string[] = []
      for (let i = 0; i < events.length; i += 200) {
        const batch = events.slice(i, i + 200)
        const { error } = await c.from('pochi_events').upsert(batch.map(toRow), { onConflict: 'user_id,id', ignoreDuplicates: true })
        if (!error) continue
        if (!isRuleError(error)) throw new Error(error.message || 'Could not sync Pochi Club')
        // one of them broke a rule: send them one by one to find which
        for (const e of batch) {
          const r = await c.from('pochi_events').upsert([toRow(e)], { onConflict: 'user_id,id', ignoreDuplicates: true })
          if (r.error && isRuleError(r.error)) refused.push(e.id)
          else if (r.error) throw new Error(r.error.message || 'Could not sync Pochi Club')
        }
      }
      return { refused }
    },
    async pull() {
      const c = await client()
      const out: PochiEvent[] = []
      for (let from = 0; ; from += 1000) {
        const { data, error } = await c.from('pochi_events').select('id, kind, reason, amount, ref, note, at').eq('user_id', userId).order('at').range(from, from + 999)
        if (error) throw new Error(error.message || 'Could not load Pochi Club')
        out.push(...((data ?? []) as Row[]).map(fromRow))
        if (!data || data.length < 1000) break
      }
      return out
    },
    async pushLook(look: Look, at: string) {
      const c = await client()
      const { error } = await c.from('pochi_looks').upsert({ user_id: userId, look, at }, { onConflict: 'user_id' })
      if (error) throw new Error(error.message || 'Could not save Pochi’s look')
    },
    async pullLook() {
      const c = await client()
      const { data, error } = await c.from('pochi_looks').select('look, at').eq('user_id', userId).maybeSingle()
      if (error) throw new Error(error.message || 'Could not load Pochi’s look')
      return data ? { look: data.look as Partial<Look>, at: new Date(data.at as string).toISOString() } : null
    },
  }
}
