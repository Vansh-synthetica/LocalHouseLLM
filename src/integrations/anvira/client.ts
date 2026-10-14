import { createClient } from '@supabase/supabase-js';

/**
 * Anvira accounts — the desktop apps' own Supabase project, NOT the website's
 * (src/integrations/supabase). Used only by /account/*, where Anvira Notes users
 * manage the profile the app shows in Messages.
 *
 * Its own storageKey keeps this session apart from the website's sign-in.
 * Only the public anon key belongs here; row-level security in that project
 * limits each person to their own rows.
 *
 * The tables are a contract with released desktop apps: read and write only the
 * columns below, never rename or drop anything from here.
 */
const ANVIRA_URL = import.meta.env.VITE_ANVIRA_SUPABASE_URL ?? 'https://pxtvpvftzweayzhvrbze.supabase.co';
const ANVIRA_ANON_KEY = import.meta.env.VITE_ANVIRA_SUPABASE_ANON_KEY;

export interface AnviraPerson {
  user_id: string;
  display_name: string;
  handle: string | null;
  avatar_color: string | null;
  searchable: boolean;
  /** Added by migration 20261014150000_profile_details; absent until it is applied. */
  avatar_url?: string | null;
  bio?: string | null;
  school?: string | null;
  website?: string | null;
}

export interface AnviraProfile {
  user_id: string;
  email: string | null;
  full_name: string | null;
  subscription_tier: string | null;
  account_status: string | null;
}

const isBrowser = typeof window !== 'undefined';

export const anvira = createClient(ANVIRA_URL, ANVIRA_ANON_KEY ?? 'missing-anon-key', {
  auth: {
    storageKey: 'anvira-auth',
    persistSession: isBrowser,
    autoRefreshToken: isBrowser,
    // Password-reset links come back with the session in the URL (see /account/reset).
    detectSessionInUrl: isBrowser,
  },
});

export const ANVIRA_URL_BASE = ANVIRA_URL;
export const anviraConfigured = Boolean(ANVIRA_ANON_KEY);

/** The colours Messages offers (people.avatar_color). */
export const AVATAR_COLORS = ['#5b8def', '#8b6cf0', '#e0679b', '#f0915b', '#3fb68b', '#d4a72c', '#4fb3d9', '#e5534b'];

export const HANDLE_RE = /^[a-z0-9_]{3,20}$/;

export const isPro = (p: AnviraProfile | null) =>
  !!p && ['pro', 'team', 'lifetime'].includes(p.subscription_tier ?? '') && p.account_status === 'active';

/** Supabase and Postgres errors as plain sentences. */
export const friendlyError = (err: { message?: string; code?: string } | null | undefined): string => {
  if (!err) return 'Something went wrong. Please try again.';
  const m = (err.message ?? '').toLowerCase();
  if (err.code === '23505' || m.includes('people_handle_key')) return 'That @username is taken.';
  if (m.includes('invalid login credentials')) return 'That email and password do not match.';
  if (m.includes('email not confirmed')) return 'Please confirm your email first. The link is in the email we sent when you signed up.';
  if (m.includes('rate limit') || m.includes('too many')) return 'Too many tries. Please wait a minute and try again.';
  if (m.includes('should be different')) return 'The new password must be different from the current one.';
  if (m.includes('password should be at least') || m.includes('weak password')) return 'Please choose a longer password (at least 8 characters).';
  if (m.includes('failed to fetch') || m.includes('network')) return 'Could not reach Anvira. Check your connection and try again.';
  if (m.includes('jwt expired') || m.includes('not authenticated')) return 'You were signed out. Please sign in again.';
  if (err.code === '23514') {
    if (m.includes('handle')) return 'A @username is 3–20 lowercase letters, numbers or _.';
    if (m.includes('bio')) return 'A bio can be up to 160 characters.';
    if (m.includes('website')) return 'A website must start with https:// or http://.';
    if (m.includes('school')) return 'School can be up to 80 characters.';
    if (m.includes('display_name')) return 'A name can be up to 60 characters.';
    return 'One of the values is not allowed.';
  }
  if (m.includes('mime') || m.includes('content type')) return 'Please use a JPEG, PNG or WebP picture.';
  if (m.includes('exceeded the maximum allowed size') || m.includes('payload too large')) return 'That picture is too large (2 MB at most).';
  return err.message || 'Something went wrong. Please try again.';
};
