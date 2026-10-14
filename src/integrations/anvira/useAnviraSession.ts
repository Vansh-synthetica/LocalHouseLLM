import { useEffect, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import { anvira } from './client';

/** The signed-in Anvira session (separate from the website's own sign-in), kept in sync. */
export const useAnviraSession = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let alive = true;
    anvira.auth.getSession().then(({ data }) => {
      if (!alive) return;
      setSession(data.session);
      setReady(true);
    });
    const { data: sub } = anvira.auth.onAuthStateChange((_event, s) => {
      setSession(s);
      setReady(true);
    });
    return () => {
      alive = false;
      sub.subscription.unsubscribe();
    };
  }, []);
  return { session, ready };
};
