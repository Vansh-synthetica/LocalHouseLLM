import { useMemo, useSyncExternalStore } from 'react';
import { Link } from 'react-router-dom';
import { Loader2, X } from 'lucide-react';

import CleanLayout from '@/components/CleanLayout';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { anvira, anviraConfigured } from '@/integrations/anvira/client';
import { useAnviraSession } from '@/integrations/anvira/useAnviraSession';
import '@/pochi-club/pochi-club.css';
import PochiClubView from '@/pochi-club/PochiClubView';
import { browserStorage, createClub } from '@/pochi-club/engine';
import { supabaseBackend } from '@/pochi-club/supabaseBackend';
import { WELCOME_COINS } from '@/pochi-club/ledger';

/**
 * Pochi Club on the website: the same club as Anvira Notes (src/pochi-club is shared with the app), on the same
 * Anvira account. Coins are earned by studying in the app; here people dress Pochi up, spend coins and look back.
 * Kept in this browser too, so it keeps working through a dropped connection and syncs when it comes back.
 */
const Club = ({ userId }: { userId: string }) => {
  const club = useMemo(() => {
    const c = createClub({
      storage: browserStorage,
      key: `anvira.pochiClub.v1:${userId}`,
      backend: supabaseBackend(() => Promise.resolve(anvira), userId),
    });
    // a fixed id: the app and the website never give it twice
    c.earn('welcome', WELCOME_COINS, 'first', 'Welcome to Pochi Club');
    return c;
  }, [userId]);
  useSyncExternalStore(club.subscribe, club.get, club.get);

  return (
    <div data-lenis-prevent className="h-[calc(100vh-8rem)] min-h-[620px] overflow-hidden rounded-3xl border border-border/70 shadow-sm">
      <PochiClubView
        club={club}
        host="web"
        banner={
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 border-b border-[#ebe4f8] bg-white/70 px-[18px] py-2 text-[13px] text-[#5d5674]">
            <span>Tuna Coins come from studying in Anvira Notes. This is the same Pochi as in the app.</span>
            <Link to="/anvira-notes#download" className="font-semibold text-[#6f5bd8] underline-offset-2 hover:underline">
              Get Anvira Notes
            </Link>
          </div>
        }
      />
    </div>
  );
};

const AccountStudy = () => {
  const { session, ready } = useAnviraSession();
  return (
    <CleanLayout>
      <SEO title="Study · Pochi Club — LocalHouseLLM" description="Your Pochi Club: the buddy, closet and Tuna Coins you earn by studying in Anvira Notes." noindex />
      <div className="max-container mx-auto w-full max-w-6xl px-4 py-8 md:py-12">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-[13px] font-medium uppercase tracking-wide text-muted-foreground">Your account · Study</p>
            <h1 className="mt-1 text-3xl md:text-4xl font-display font-semibold tracking-tight">Pochi Club</h1>
          </div>
          {session && (
            <Button asChild variant="outline" className="rounded-full">
              <Link to="/account/profile">Profile</Link>
            </Button>
          )}
        </div>
        {!anviraConfigured ? (
          <p className="mx-auto max-w-md py-16 text-center text-destructive">
            <X className="mr-1 inline h-4 w-4" /> Anvira sign-in is not configured on this site yet.
          </p>
        ) : !ready ? (
          <div className="flex items-center justify-center gap-2 py-24 text-muted-foreground" role="status">
            <Loader2 className="h-4 w-4 animate-spin" /> Loading…
          </div>
        ) : session ? (
          <Club key={session.user.id} userId={session.user.id} />
        ) : (
          <div className="mx-auto max-w-md rounded-2xl border border-border/70 bg-card p-7 text-center">
            <p className="text-lg font-semibold">Sign in to meet your Pochi</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Pochi Club lives on your Anvira account: the coins you earn studying in Anvira Notes, the closet and the moves.
            </p>
            <Button asChild className="mt-6 rounded-full">
              <Link to="/account/signin?next=/account/study">Sign in</Link>
            </Button>
          </div>
        )}
      </div>
    </CleanLayout>
  );
};

export default AccountStudy;
