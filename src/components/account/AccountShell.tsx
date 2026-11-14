import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import type { Session } from '@supabase/supabase-js';
import { ArrowUpRight, Download, KeyRound, LogOut, MessageCircle, Sparkles, UserRound } from 'lucide-react';

import { type ProductId, formatReleaseDate, latestRelease } from '@/data/releases';
import { useLiveReleases } from '@/data/liveReleases';
import { anvira } from '@/integrations/anvira/client';
import './account.css';

/**
 * The frame every signed-in account page shares: who is signed in, where you
 * can go, and the current version of each app the account signs in to.
 */

export type AccountTab = 'profile' | 'study';

const APPS: { id: ProductId; name: string; to: string }[] = [
  { id: 'anvira-notes', name: 'Anvira Notes', to: '/anvira-notes#download' },
  { id: 'anvira-notes-android', name: 'Anvira Notes · Android', to: '/anvira-notes#mobile' },
  { id: 'anvira', name: 'Anvira', to: '/anvira#download' },
];

const initialsOf = (name: string) =>
  name
    .split(/[\s@._-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join('') || 'A';

export const AppVersions = ({ compact }: { compact?: boolean }) => {
  useLiveReleases();
  return (
    <ul className={`acc-apps ${compact ? 'acc-apps--compact' : ''}`}>
      {APPS.map((app) => {
        const r = latestRelease(app.id);
        return (
          <li key={app.id}>
            <Link to={app.to}>
              <span className="acc-apps__name">{app.name}</span>
              <span className="acc-apps__ver" title={`Released ${formatReleaseDate(r.date)}`}>
                v{r.version}
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export const AccountShell = ({
  session,
  active,
  title,
  lead,
  actions,
  children,
}: {
  session: Session;
  active: AccountTab;
  title: ReactNode;
  lead?: ReactNode;
  actions?: ReactNode;
  children: ReactNode;
}) => {
  const meta = (session.user.user_metadata ?? {}) as { display_name?: string; full_name?: string; name?: string };
  const email = session.user.email ?? '';
  const name = meta.display_name || meta.full_name || meta.name || email.split('@')[0] || 'Your account';

  const nav: { id: AccountTab | 'security' | 'messages'; label: string; to: string; icon: ReactNode }[] = [
    { id: 'profile', label: 'Profile', to: '/account/profile', icon: <UserRound /> },
    { id: 'messages', label: 'Messages', to: '/account/profile#messages', icon: <MessageCircle /> },
    { id: 'security', label: 'Sign-in & security', to: '/account/profile#security', icon: <KeyRound /> },
    { id: 'study', label: 'Pochi Club', to: '/account/study', icon: <Sparkles /> },
  ];

  return (
    <div className="acc">
      <aside className="acc-side" aria-label="Account">
        <div className="acc-id">
          <span className="acc-id__mark" aria-hidden="true">
            {initialsOf(name)}
          </span>
          <span className="acc-id__text">
            <b>{name}</b>
            <small>{email}</small>
          </span>
        </div>

        <nav className="acc-nav">
          {nav.map((item) => (
            <Link
              key={item.id}
              to={item.to}
              className={item.id === active ? 'is-active' : undefined}
              aria-current={item.id === active ? 'page' : undefined}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
          <button type="button" onClick={() => anvira.auth.signOut()}>
            <LogOut />
            Sign out
          </button>
        </nav>

        <div className="acc-side__block">
          <p className="acc-kicker">Signed in on</p>
          <AppVersions />
          <Link to="/releases" className="acc-side__more">
            Release notes <ArrowUpRight />
          </Link>
        </div>
      </aside>

      <div className="acc-main">
        <header className="acc-head">
          <div>
            <p className="acc-kicker">Anvira account</p>
            <h1>{title}</h1>
            {lead && <p className="acc-head__lead">{lead}</p>}
          </div>
          {actions && <div className="acc-head__actions">{actions}</div>}
        </header>
        {children}
      </div>
    </div>
  );
};

/** Two-panel frame for sign-in, sign-up and password reset. */
export const AuthFrame = ({ children }: { children: ReactNode }) => (
  <div className="acc-auth">
    <aside className="acc-auth__brand">
      <div className="acc-auth__grid" aria-hidden="true" />
      <p className="acc-kicker acc-kicker--light">One account · every Anvira app</p>
      <h2>Your AI runs on your machine. Your account just keeps you in sync.</h2>
      <ul className="acc-auth__points">
        <li>
          <b>Local by default.</b> Notes, files and model prompts stay on your device.
        </li>
        <li>
          <b>One sign-in.</b> The same account works in Anvira Notes on Windows and Android, Anvira, and here.
        </li>
        <li>
          <b>Free.</b> No card, no trial clock.
        </li>
      </ul>
      <div className="acc-auth__apps">
        <p className="acc-kicker acc-kicker--light">Current releases</p>
        <AppVersions compact />
      </div>
      <Link to="/anvira-notes#download" className="acc-auth__dl">
        <Download /> Get the apps
      </Link>
    </aside>
    <div className="acc-auth__form">{children}</div>
  </div>
);
