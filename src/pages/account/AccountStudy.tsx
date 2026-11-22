import { useMemo, useSyncExternalStore } from 'react';
import { Link } from 'react-router-dom';
import { Loader2, X } from 'lucide-react';
import type { Session } from '@supabase/supabase-js';

import CleanLayout from '@/components/CleanLayout';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { AccountShell, AuthFrame } from '@/components/account/AccountShell';
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
 *
 * The shared club files stay identical to the app's; the website's look (calmer palette, no emoji tabs, page-height
 * layout) comes from the .acc-club overrides in src/components/account/account.css.
 */
const Club = ({ session }: { session: Session }) => {
  const userId = session.user.id;
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
  const { state: s } = useSyncExternalStore(club.subscribe, club.get, club.get);
  const questsOpen = s.quests.filter((q) => !q.claimed).length;

  return (
    <AccountShell
      session={session}
      active="study"
      title="Pochi Club"
      lead="Your study companion. Tuna Coins come from studying in Anvira Notes; spend them here on Pochi's closet, homes and moves. Same Pochi, same account, in the app and on the web."
    >
      <div className="acc-club-stats">
        <div className="acc-tile">
          <p>Tuna Coins</p>
          <p>{s.coins.toLocaleString()}</p>
        </div>
        <div className="acc-tile">
          <p>Rank</p>
          <p>{s.rank.name}</p>
        </div>
        <div className="acc-tile">
          <p>Friendship</p>
          <p>{s.bondTier.name}</p>
        </div>
        <div className="acc-tile">
          <p>Study days</p>
          <p>{s.studyDays.toLocaleString()}</p>
        </div>
        <div className="acc-tile">
          <p>Quests today</p>
          <p>{questsOpen ? `${questsOpen} open` : 'All done'}</p>
        </div>
      </div>
      <div className="acc-club" data-lenis-prevent>
        <PochiClubView club={club} host="web" />
      </div>
      <p className="acc-club-note">
        <span>Coins are earned by studying in Anvira Notes. What you buy here shows up in the app, and the other way round.</span>
        <Link to="/anvira-notes#download">Get Anvira Notes</Link>
      </p>
    </AccountShell>
  );
};

const AccountStudy = () => {
  const { session, ready } = useAnviraSession();
  return (
    <CleanLayout>
      <SEO title="Study · Pochi Club — LocalHouseLLM" description="Your Pochi Club: the buddy, closet and Tuna Coins you earn by studying in Anvira Notes." noindex />
      <div className="max-container px-4 py-10 md:py-16">
        {!anviraConfigured ? (
          <p className="mx-auto max-w-md py-16 text-center text-destructive">
            <X className="mr-1 inline h-4 w-4" /> Anvira sign-in is not configured on this site yet.
          </p>
        ) : !ready ? (
          <div className="flex items-center justify-center gap-2 py-24 text-muted-foreground" role="status">
            <Loader2 className="h-4 w-4 animate-spin" /> Loading…
          </div>
        ) : session ? (
          <Club key={session.user.id} session={session} />
        ) : (
          <AuthFrame>
            <p className="acc-kicker">Pochi Club</p>
            <h1 className="mt-3 text-3xl md:text-[34px] font-display font-semibold tracking-tight leading-[1.1]">Sign in to meet your Pochi</h1>
            <p className="mt-3 font-sans text-[15px] leading-relaxed text-muted-foreground">
              Pochi Club lives on your Anvira account: the Tuna Coins you earn studying in Anvira Notes, Pochi&rsquo;s closet,
              homes and moves.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild className="h-11 rounded-full bg-foreground px-6 text-background hover:bg-foreground/90">
                <Link to="/account/signin?next=/account/study">Sign in</Link>
              </Button>
              <Button asChild variant="outline" className="h-11 rounded-full px-6">
                <Link to="/account/signup?next=/account/study">Create a free account</Link>
              </Button>
            </div>
          </AuthFrame>
        )}
      </div>
    </CleanLayout>
  );
};

export default AccountStudy;
