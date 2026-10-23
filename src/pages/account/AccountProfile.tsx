import { type FormEvent, type ReactNode, useCallback, useEffect, useId, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import type { Session } from '@supabase/supabase-js';
import { AtSign, Camera, Check, Loader2, LogOut, Trash2, X } from 'lucide-react';

import CleanLayout from '@/components/CleanLayout';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import {
  AVATAR_COLORS,
  HANDLE_RE,
  type AnviraPerson,
  type AnviraProfile,
  anvira,
  anviraConfigured,
  friendlyError,
  isPro,
} from '@/integrations/anvira/client';
import { useAnviraSession } from '@/integrations/anvira/useAnviraSession';

const BASE_COLS = 'user_id, display_name, handle, avatar_color, searchable';
const DETAIL_COLS = `${BASE_COLS}, avatar_url, bio, school, website`;
const BIO_MAX = 160;

/* ------------------------------------------------------------------ */
/* Small pieces                                                        */
/* ------------------------------------------------------------------ */

type Status = { kind: 'idle' } | { kind: 'saving' } | { kind: 'saved' } | { kind: 'error'; message: string };

const StatusLine = ({ status }: { status: Status }) => (
  <p
    role="status"
    aria-live="polite"
    className={`text-[13px] min-h-[1.25rem] ${status.kind === 'error' ? 'text-destructive' : 'text-muted-foreground'}`}
  >
    {status.kind === 'saving' && 'Saving…'}
    {status.kind === 'saved' && (
      <span className="inline-flex items-center gap-1.5 text-[hsl(var(--success))]">
        <Check className="h-3.5 w-3.5" /> Saved. Anvira Notes picks this up the next time you switch back to it.
      </span>
    )}
    {status.kind === 'error' && status.message}
  </p>
);

const Section = ({ id, title, description, children }: { id: string; title: string; description?: string; children: ReactNode }) => (
  <section aria-labelledby={id} className="rounded-2xl border border-border/70 bg-card p-5 sm:p-7">
    <h2 id={id} className="text-lg font-semibold tracking-tight">
      {title}
    </h2>
    {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
    <div className="mt-6 space-y-5">{children}</div>
  </section>
);

const Field = ({ label, hint, error, children, htmlFor }: { label: string; hint?: ReactNode; error?: string; children: ReactNode; htmlFor: string }) => (
  <div className="space-y-1.5">
    <Label htmlFor={htmlFor} className="text-[13px] font-medium">
      {label}
    </Label>
    {children}
    {error ? (
      <p className="text-[12.5px] text-destructive">{error}</p>
    ) : (
      hint && <p className="text-[12.5px] text-muted-foreground">{hint}</p>
    )}
  </div>
);

const initials = (name: string, handle: string | null) =>
  (name.trim() || handle || '?')
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('');

const Avatar = ({ person, size = 88 }: { person: Pick<AnviraPerson, 'display_name' | 'handle' | 'avatar_color' | 'avatar_url'>; size?: number }) =>
  person.avatar_url ? (
    <img
      src={person.avatar_url}
      alt=""
      width={size}
      height={size}
      className="rounded-full object-cover shadow-sm"
      style={{ width: size, height: size }}
    />
  ) : (
    <span
      aria-hidden="true"
      className="inline-grid place-items-center rounded-full font-display font-semibold text-white shadow-sm"
      style={{ width: size, height: size, background: person.avatar_color ?? AVATAR_COLORS[0], fontSize: size * 0.36 }}
    >
      {initials(person.display_name, person.handle)}
    </span>
  );

/** Centre-crops and scales a picture to a 512×512 WebP (JPEG where WebP encoding is unavailable). */
const squareImage = async (file: File): Promise<Blob> => {
  const bitmap = await createImageBitmap(file);
  const side = Math.min(bitmap.width, bitmap.height);
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(bitmap, (bitmap.width - side) / 2, (bitmap.height - side) / 2, side, side, 0, 0, 512, 512);
  bitmap.close();
  const toBlob = (type: string) => new Promise<Blob | null>((r) => canvas.toBlob(r, type, 0.86));
  const webp = await toBlob('image/webp');
  if (webp && webp.type === 'image/webp') return webp;
  const jpeg = await toBlob('image/jpeg');
  if (!jpeg) throw new Error('This picture could not be read.');
  return jpeg;
};

/* ------------------------------------------------------------------ */
/* Sign in                                                             */
/* ------------------------------------------------------------------ */

export type AuthMode = 'signin' | 'signup' | 'forgot';

const COPY: Record<AuthMode, { title: string; lead: string; cta: string }> = {
  signin: {
    title: 'Sign in to Anvira',
    lead: 'One account for Anvira Notes and this site. Sign in to change your photo, name, @username and how people find you in Messages.',
    cta: 'Sign in',
  },
  signup: {
    title: 'Create your Anvira account',
    lead: 'Free. The same account signs you in to Anvira Notes, and your notes and files stay on your PC.',
    cta: 'Create account',
  },
  forgot: {
    title: 'Reset your password',
    lead: 'Enter your Anvira account email and we’ll send you a link to choose a new password.',
    cta: 'Send the link',
  },
};

const SignIn = ({ initialMode = 'signin' }: { initialMode?: AuthMode }) => {
  const [mode, setModeState] = useState<AuthMode>(initialMode);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  // After sign-up: the address waiting for its confirmation email.
  const [confirming, setConfirming] = useState('');

  const setMode = (m: AuthMode) => {
    setModeState(m);
    setError('');
    setNotice('');
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setNotice('');
    const addr = email.trim().toLowerCase();
    if (!/^\S+@\S+\.\S+$/.test(addr)) return setError('Please enter your email address.');
    if (mode !== 'forgot' && !password) return setError('Please enter a password.');
    if (mode === 'signup' && password.length < 8) return setError('Please choose a password of at least 8 characters.');
    setBusy(true);
    if (mode === 'signin') {
      const { error: err } = await anvira.auth.signInWithPassword({ email: addr, password });
      if (err) setError(friendlyError(err));
    } else if (mode === 'signup') {
      const { data, error: err } = await anvira.auth.signUp({
        email: addr,
        password,
        options: {
          data: { full_name: name.trim() || undefined },
          emailRedirectTo: `${window.location.origin}/account/profile`,
        },
      });
      if (err) setError(friendlyError(err));
      // With email confirmation on, there is no session yet: ask them to confirm.
      else if (!data.session) setConfirming(addr);
    } else {
      const { error: err } = await anvira.auth.resetPasswordForEmail(addr, {
        redirectTo: `${window.location.origin}/account/reset`,
      });
      if (err) setError(friendlyError(err));
      else setNotice('If there is an Anvira account for that email, a link to choose a new password is on its way.');
    }
    setBusy(false);
  };

  const resend = async () => {
    setBusy(true);
    setNotice('');
    setError('');
    const { error: err } = await anvira.auth.resend({
      type: 'signup',
      email: confirming,
      options: { emailRedirectTo: `${window.location.origin}/account/profile` },
    });
    setBusy(false);
    if (err) setError(friendlyError(err));
    else setNotice('Sent again. It can take a minute — check your spam folder too.');
  };

  if (confirming) {
    return (
      <div className="mx-auto w-full max-w-md">
        <h1 className="text-3xl md:text-4xl font-display font-semibold tracking-tight">Check your email</h1>
        <p className="mt-3 text-muted-foreground">
          We sent a confirmation link to <strong className="text-foreground">{confirming}</strong>. Open it to finish creating
          your account, then sign in here or in Anvira Notes.
        </p>
        <div className="mt-8 space-y-4 rounded-2xl border border-border/70 bg-card p-6 sm:p-8">
          <div role="alert" aria-live="polite" className="min-h-[1.25rem] text-[13px]">
            {error && <span className="text-destructive">{error}</span>}
            {notice && <span className="text-muted-foreground">{notice}</span>}
          </div>
          <Button type="button" variant="outline" disabled={busy} onClick={resend} className="h-11 w-full rounded-full">
            {busy && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Send it again
          </Button>
          <Button
            type="button"
            onClick={() => {
              setConfirming('');
              setMode('signin');
            }}
            className="h-11 w-full rounded-full bg-foreground text-background hover:bg-foreground/90"
          >
            I’ve confirmed — sign in
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-md">
      <h1 className="text-3xl md:text-4xl font-display font-semibold tracking-tight">{COPY[mode].title}</h1>
      <p className="mt-3 text-muted-foreground">{COPY[mode].lead}</p>

      <form onSubmit={submit} noValidate className="mt-8 space-y-5 rounded-2xl border border-border/70 bg-card p-6 sm:p-8">
        {mode === 'signup' && (
          <Field label="Your name" htmlFor="anv-name" hint="Shown to classmates in Messages. You can change it later.">
            <Input id="anv-name" autoComplete="name" value={name} maxLength={60} onChange={(e) => setName(e.target.value)} className="h-11" />
          </Field>
        )}
        <Field label="Email" htmlFor="anv-email">
          <Input
            id="anv-email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-11"
            autoFocus
          />
        </Field>
        {mode !== 'forgot' && (
          <Field label="Password" htmlFor="anv-password" hint={mode === 'signup' ? 'At least 8 characters.' : undefined}>
            <Input
              id="anv-password"
              type="password"
              autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-11"
            />
          </Field>
        )}

        <div role="alert" aria-live="assertive" className="min-h-[1.25rem] text-[13px]">
          {error && <span className="text-destructive">{error}</span>}
          {notice && <span className="text-muted-foreground">{notice}</span>}
        </div>

        <Button type="submit" disabled={busy} className="h-11 w-full rounded-full bg-foreground text-background hover:bg-foreground/90">
          {busy && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {COPY[mode].cta}
        </Button>

        {mode !== 'signup' && (
          <button
            type="button"
            onClick={() => setMode(mode === 'signin' ? 'forgot' : 'signin')}
            className="block w-full text-center text-[13px] text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
          >
            {mode === 'signin' ? 'Forgot password?' : 'Back to sign in'}
          </button>
        )}
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        {mode === 'signup' ? 'Already have an account? ' : 'No account yet? '}
        <button
          type="button"
          onClick={() => setMode(mode === 'signup' ? 'signin' : 'signup')}
          className="font-medium text-foreground underline underline-offset-4"
        >
          {mode === 'signup' ? 'Sign in' : 'Create one free'}
        </button>
      </p>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Profile                                                             */
/* ------------------------------------------------------------------ */

type HandleState = 'idle' | 'checking' | 'available' | 'taken' | 'invalid' | 'yours';

const ProfileEditor = ({ session }: { session: Session }) => {
  const uid = session.user.id;
  const ids = useId();
  const fileRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [hasDetails, setHasDetails] = useState(true);
  const [saved, setSaved] = useState<AnviraPerson | null>(null);
  const [account, setAccount] = useState<AnviraProfile | null>(null);

  // Profile section
  const [name, setName] = useState('');
  const [handle, setHandle] = useState('');
  const [bio, setBio] = useState('');
  const [school, setSchool] = useState('');
  const [website, setWebsite] = useState('');
  const [profileStatus, setProfileStatus] = useState<Status>({ kind: 'idle' });
  const [handleState, setHandleState] = useState<HandleState>('idle');
  const [photoStatus, setPhotoStatus] = useState<Status>({ kind: 'idle' });

  // Messages section
  const [searchable, setSearchable] = useState(true);
  const [color, setColor] = useState(AVATAR_COLORS[0]);
  const [messagesStatus, setMessagesStatus] = useState<Status>({ kind: 'idle' });

  // Account section
  const [fullName, setFullName] = useState('');
  const [accountStatus, setAccountStatus] = useState<Status>({ kind: 'idle' });
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordStatus, setPasswordStatus] = useState<Status>({ kind: 'idle' });

  const apply = useCallback((p: AnviraPerson) => {
    setSaved(p);
    setName(p.display_name ?? '');
    setHandle(p.handle ?? '');
    setBio(p.bio ?? '');
    setSchool(p.school ?? '');
    setWebsite(p.website ?? '');
    setSearchable(p.searchable);
    setColor(p.avatar_color ?? AVATAR_COLORS[0]);
  }, []);

  // Load. The photo/bio/school/website columns arrive with a database update; until then, fall back.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      let { data, error } = await anvira.from('people').select(DETAIL_COLS).eq('user_id', uid).maybeSingle();
      let details = true;
      if (error && (error.code === '42703' || /does not exist|could not find/i.test(error.message))) {
        details = false;
        ({ data, error } = await anvira.from('people').select(BASE_COLS).eq('user_id', uid).maybeSingle());
      }
      const prof = await anvira
        .from('profiles')
        .select('user_id, email, full_name, subscription_tier, account_status')
        .eq('user_id', uid)
        .maybeSingle();
      if (cancelled) return;
      if (error || !data) {
        setLoadError(error ? friendlyError(error) : 'Your Messages profile was not found. Open Anvira Notes once, then try again.');
      } else {
        setHasDetails(details);
        apply(data as AnviraPerson);
      }
      if (prof.data) {
        setAccount(prof.data as AnviraProfile);
        setFullName(prof.data.full_name ?? '');
      }
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [uid, apply]);

  // Live @username check (others' hidden accounts can still hold a name; saving has the final word).
  useEffect(() => {
    const h = handle.trim().toLowerCase();
    if (!saved) return;
    if (!h || h === (saved.handle ?? '')) return setHandleState(h ? 'yours' : 'idle');
    if (!HANDLE_RE.test(h)) return setHandleState('invalid');
    setHandleState('checking');
    const t = setTimeout(async () => {
      const { data } = await anvira.from('people').select('user_id').eq('handle', h).maybeSingle();
      setHandleState(data && data.user_id !== uid ? 'taken' : 'available');
    }, 400);
    return () => clearTimeout(t);
  }, [handle, saved, uid]);

  const update = async (patch: Partial<AnviraPerson>) => {
    const { data, error } = await anvira
      .from('people')
      .update({ ...patch, updated_at: new Date().toISOString() })
      .eq('user_id', uid)
      .select(hasDetails ? DETAIL_COLS : BASE_COLS)
      .single();
    if (error) throw error;
    return data as unknown as AnviraPerson;
  };

  const saveProfile = async (e: FormEvent) => {
    e.preventDefault();
    const h = handle.trim().toLowerCase();
    if (!name.trim()) return setProfileStatus({ kind: 'error', message: 'Please add a name — it is how people see you in Messages.' });
    if (h && !HANDLE_RE.test(h)) return setProfileStatus({ kind: 'error', message: 'A @username is 3–20 lowercase letters, numbers or _.' });
    if (handleState === 'taken') return setProfileStatus({ kind: 'error', message: 'That @username is taken.' });
    let site = website.trim();
    if (site && !/^https?:\/\//i.test(site)) site = `https://${site}`;
    if (site && !/^https?:\/\/[^\s/$.?#].[^\s]*$/i.test(site)) return setProfileStatus({ kind: 'error', message: 'That website address does not look right.' });
    if (bio.length > BIO_MAX) return setProfileStatus({ kind: 'error', message: `A bio can be up to ${BIO_MAX} characters.` });

    setProfileStatus({ kind: 'saving' });
    try {
      const next = await update({
        display_name: name.trim().slice(0, 60),
        handle: h || null,
        ...(hasDetails && { bio: bio.trim() || null, school: school.trim() || null, website: site || null }),
      });
      // Show what was stored (lower-cased @username, https:// added), leaving the other sections' edits alone.
      setSaved(next);
      setHandle(next.handle ?? '');
      if (hasDetails) setWebsite(next.website ?? '');
      setProfileStatus({ kind: 'saved' });
    } catch (err) {
      setProfileStatus({ kind: 'error', message: friendlyError(err as { message?: string; code?: string }) });
    }
  };

  const saveMessages = async () => {
    setMessagesStatus({ kind: 'saving' });
    try {
      const next = await update({ searchable, avatar_color: color });
      setSaved(next);
      setMessagesStatus({ kind: 'saved' });
    } catch (err) {
      setMessagesStatus({ kind: 'error', message: friendlyError(err as { message?: string; code?: string }) });
    }
  };

  const choosePhoto = async (file: File | undefined) => {
    if (!file) return;
    if (!/^image\/(jpeg|png|webp)$/.test(file.type)) return setPhotoStatus({ kind: 'error', message: 'Please use a JPEG, PNG or WebP picture.' });
    if (file.size > 15 * 1024 * 1024) return setPhotoStatus({ kind: 'error', message: 'That picture is very large. Please pick one under 15 MB.' });
    setPhotoStatus({ kind: 'saving' });
    let uploaded: string | null = null;
    try {
      const blob = await squareImage(file);
      const ext = blob.type === 'image/webp' ? 'webp' : 'jpg';
      uploaded = `${uid}/avatar-${Date.now()}.${ext}`;
      const up = await anvira.storage.from('avatars').upload(uploaded, blob, { contentType: blob.type, cacheControl: '31536000' });
      if (up.error) throw up.error;
      const url = anvira.storage.from('avatars').getPublicUrl(uploaded).data.publicUrl;
      const previous = saved?.avatar_url;
      const next = await update({ avatar_url: url });
      setSaved(next);
      setPhotoStatus({ kind: 'saved' });
      // Tidy up the old picture (best effort; only ever inside this person's folder).
      const old = previous?.split('/avatars/')[1];
      if (old?.startsWith(`${uid}/`)) void anvira.storage.from('avatars').remove([old]);
    } catch (err) {
      if (uploaded) void anvira.storage.from('avatars').remove([uploaded]);
      setPhotoStatus({ kind: 'error', message: friendlyError(err as { message?: string; code?: string }) });
    } finally {
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  const removePhoto = async () => {
    setPhotoStatus({ kind: 'saving' });
    try {
      const old = saved?.avatar_url?.split('/avatars/')[1];
      const next = await update({ avatar_url: null });
      setSaved(next);
      if (old?.startsWith(`${uid}/`)) void anvira.storage.from('avatars').remove([old]);
      setPhotoStatus({ kind: 'saved' });
    } catch (err) {
      setPhotoStatus({ kind: 'error', message: friendlyError(err as { message?: string; code?: string }) });
    }
  };

  const saveAccount = async (e: FormEvent) => {
    e.preventDefault();
    setAccountStatus({ kind: 'saving' });
    const { error } = await anvira
      .from('profiles')
      .update({ full_name: fullName.trim() || null, updated_at: new Date().toISOString() })
      .eq('user_id', uid);
    setAccountStatus(error ? { kind: 'error', message: friendlyError(error) } : { kind: 'saved' });
  };

  const savePassword = async (e: FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 8) return setPasswordStatus({ kind: 'error', message: 'Please choose a password of at least 8 characters.' });
    if (newPassword !== confirmPassword) return setPasswordStatus({ kind: 'error', message: 'The two passwords are not the same.' });
    setPasswordStatus({ kind: 'saving' });
    const { error } = await anvira.auth.updateUser({ password: newPassword });
    if (error) return setPasswordStatus({ kind: 'error', message: friendlyError(error) });
    setNewPassword('');
    setConfirmPassword('');
    setPasswordStatus({ kind: 'saved' });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center gap-2 py-24 text-muted-foreground" role="status">
        <Loader2 className="h-4 w-4 animate-spin" /> Loading your profile…
      </div>
    );
  }
  if (loadError || !saved) {
    return (
      <div className="mx-auto max-w-md py-16 text-center">
        <p className="text-destructive">{loadError}</p>
        <Button variant="outline" className="mt-6 rounded-full" onClick={() => anvira.auth.signOut()}>
          Sign out
        </Button>
      </div>
    );
  }

  const preview = { display_name: name, handle: handle || null, avatar_color: color, avatar_url: saved.avatar_url ?? null };
  const pro = isPro(account);
  const handleHint: Record<HandleState, ReactNode> = {
    idle: 'How people find you in Messages: 3–20 lowercase letters, numbers or _.',
    checking: 'Checking…',
    available: <span className="text-[hsl(var(--success))]">Available</span>,
    taken: <span className="text-destructive">That @username is taken.</span>,
    invalid: <span className="text-destructive">3–20 lowercase letters, numbers or _.</span>,
    yours: 'This is your @username.',
  };

  return (
    <div className="mx-auto w-full max-w-3xl [&_p]:font-sans">
      <header className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
        <Avatar person={preview} />
        <div className="min-w-0 flex-1">
          <h1 className="truncate text-3xl md:text-4xl font-display font-semibold tracking-tight">{name.trim() || 'Your profile'}</h1>
          <p className="mt-1 text-muted-foreground">
            {saved.handle ? `@${saved.handle}` : 'No @username yet'} · {pro ? 'Anvira Pro' : 'Free plan'}
          </p>
        </div>
        <Button variant="outline" className="rounded-full" onClick={() => anvira.auth.signOut()}>
          <LogOut className="mr-2 h-4 w-4" /> Sign out
        </Button>
      </header>

      <div className="mt-10 space-y-6">
        <Section id={`${ids}-study`} title="Study" description="Pochi Club: the Tuna Coins you earn studying in Anvira Notes, Pochi's closet and moves.">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">The same Pochi as in the app. It works offline in the app and syncs here.</p>
            <Button asChild className="rounded-full">
              <Link to="/account/study">Open Pochi Club</Link>
            </Button>
          </div>
        </Section>
        <Section id={`${ids}-profile`} title="Profile" description="What people see when you chat in Anvira Notes.">
          <div className="flex flex-wrap items-center gap-4">
            <Avatar person={preview} size={64} />
            <div className="flex flex-wrap gap-2">
              <input
                ref={fileRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="sr-only"
                id={`${ids}-photo`}
                disabled={!hasDetails || photoStatus.kind === 'saving'}
                onChange={(e) => choosePhoto(e.target.files?.[0])}
              />
              <Button
                type="button"
                variant="outline"
                className="rounded-full"
                disabled={!hasDetails || photoStatus.kind === 'saving'}
                onClick={() => fileRef.current?.click()}
              >
                {photoStatus.kind === 'saving' ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Camera className="mr-2 h-4 w-4" />}
                {saved.avatar_url ? 'Change photo' : 'Add a photo'}
              </Button>
              {saved.avatar_url && (
                <Button type="button" variant="ghost" className="rounded-full" onClick={removePhoto} disabled={photoStatus.kind === 'saving'}>
                  <Trash2 className="mr-2 h-4 w-4" /> Remove
                </Button>
              )}
            </div>
            {/* Only take up room when there is something to say — an empty line left a big gap here. */}
            {!hasDetails ? (
              <p className="w-full text-[12.5px] text-muted-foreground">Photos, bios, school and website are coming to Anvira very soon.</p>
            ) : (
              photoStatus.kind !== 'idle' && (
                <div className="w-full">
                  <StatusLine status={photoStatus} />
                </div>
              )
            )}
            {hasDetails && photoStatus.kind === 'idle' && (
              <p className="w-full -mt-1 text-[12.5px] text-muted-foreground">JPEG, PNG or WebP. It is cropped to a square.</p>
            )}
          </div>

          <form onSubmit={saveProfile} className="space-y-5" noValidate>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Display name" htmlFor={`${ids}-name`}>
                <Input id={`${ids}-name`} value={name} maxLength={60} onChange={(e) => setName(e.target.value)} autoComplete="nickname" />
              </Field>
              <Field label="@username" htmlFor={`${ids}-handle`} hint={handleHint[handleState]}>
                <div className="relative">
                  <AtSign className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
                  <Input
                    id={`${ids}-handle`}
                    value={handle}
                    maxLength={20}
                    onChange={(e) => setHandle(e.target.value.toLowerCase().replace(/\s/g, ''))}
                    className="pl-9"
                    placeholder="yourname"
                    autoComplete="username"
                    aria-invalid={handleState === 'taken' || handleState === 'invalid'}
                    spellCheck={false}
                  />
                </div>
              </Field>
            </div>

            <Field label="Bio" htmlFor={`${ids}-bio`} hint={hasDetails ? `${bio.length}/${BIO_MAX}` : undefined}>
              <Textarea
                id={`${ids}-bio`}
                value={bio}
                maxLength={BIO_MAX}
                rows={3}
                disabled={!hasDetails}
                placeholder="A line about you, up to 160 characters"
                onChange={(e) => setBio(e.target.value)}
              />
            </Field>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="School or university" htmlFor={`${ids}-school`}>
                <Input id={`${ids}-school`} value={school} maxLength={80} disabled={!hasDetails} onChange={(e) => setSchool(e.target.value)} placeholder="Optional" />
              </Field>
              <Field label="Website" htmlFor={`${ids}-site`}>
                <Input
                  id={`${ids}-site`}
                  value={website}
                  maxLength={200}
                  inputMode="url"
                  disabled={!hasDetails}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="Optional, e.g. yoursite.com"
                />
              </Field>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Button type="submit" disabled={profileStatus.kind === 'saving'} className="rounded-full bg-foreground text-background hover:bg-foreground/90">
                {profileStatus.kind === 'saving' && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Save profile
              </Button>
              <StatusLine status={profileStatus} />
            </div>
          </form>
        </Section>

        <Section id={`${ids}-messages`} title="Messages" description="How classmates find you and how you look in chats.">
          <div className="flex items-start justify-between gap-6">
            <div>
              <Label htmlFor={`${ids}-searchable`} className="text-[13px] font-medium">
                Let people find me by @username
              </Label>
              <p className="mt-1 text-[12.5px] text-muted-foreground">
                When this is off, only people who know your exact email or share a group with you can reach you.
              </p>
            </div>
            <Switch id={`${ids}-searchable`} checked={searchable} onCheckedChange={setSearchable} />
          </div>

          <fieldset>
            <legend className="text-[13px] font-medium">Colour</legend>
            <p className="mt-1 text-[12.5px] text-muted-foreground">Shown behind your initials when you have no photo.</p>
            <div className="mt-3 flex flex-wrap gap-2.5" role="radiogroup" aria-label="Colour">
              {AVATAR_COLORS.map((c) => (
                <button
                  key={c}
                  type="button"
                  role="radio"
                  aria-checked={color === c}
                  aria-label={c}
                  onClick={() => setColor(c)}
                  className={`grid h-9 w-9 place-items-center rounded-full transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                    color === c ? 'scale-110 ring-2 ring-foreground ring-offset-2 ring-offset-card' : 'hover:scale-105'
                  }`}
                  style={{ background: c }}
                >
                  {color === c && <Check className="h-4 w-4 text-white" />}
                </button>
              ))}
            </div>
          </fieldset>

          <div className="flex flex-wrap items-center gap-4">
            <Button type="button" onClick={saveMessages} disabled={messagesStatus.kind === 'saving'} className="rounded-full bg-foreground text-background hover:bg-foreground/90">
              {messagesStatus.kind === 'saving' && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Save
            </Button>
            <StatusLine status={messagesStatus} />
          </div>
        </Section>

        <Section id={`${ids}-account`} title="Account" description="Private to you.">
          <form onSubmit={saveAccount} className="space-y-5" noValidate>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Email" htmlFor={`${ids}-email`} hint="Your sign-in email can’t be changed here.">
                <Input id={`${ids}-email`} value={session.user.email ?? account?.email ?? ''} readOnly disabled />
              </Field>
              <Field label="Full name" htmlFor={`${ids}-full`} hint="Not shown in Messages.">
                <Input id={`${ids}-full`} value={fullName} maxLength={120} onChange={(e) => setFullName(e.target.value)} autoComplete="name" />
              </Field>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <Button type="submit" disabled={accountStatus.kind === 'saving'} className="rounded-full bg-foreground text-background hover:bg-foreground/90">
                {accountStatus.kind === 'saving' && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Save
              </Button>
              <StatusLine status={accountStatus} />
            </div>
          </form>

          <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border/70 px-4 py-3">
            <div>
              <p className="text-[13px] font-medium">Plan</p>
              <p className="text-sm text-muted-foreground">{pro ? 'Pro' : 'Free'}</p>
            </div>
            {!pro && (
              <Link to="/anvira-notes#faq" className="text-[13px] font-medium underline underline-offset-4">
                See Pro
              </Link>
            )}
          </div>

          <form onSubmit={savePassword} className="space-y-5 border-t border-border/70 pt-5" noValidate>
            <p className="text-[13px] font-medium">Change password</p>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="New password" htmlFor={`${ids}-pw1`}>
                <Input id={`${ids}-pw1`} type="password" autoComplete="new-password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
              </Field>
              <Field label="New password again" htmlFor={`${ids}-pw2`}>
                <Input id={`${ids}-pw2`} type="password" autoComplete="new-password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
              </Field>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <Button type="submit" variant="outline" disabled={passwordStatus.kind === 'saving'} className="rounded-full">
                {passwordStatus.kind === 'saving' && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Change password
              </Button>
              <StatusLine status={passwordStatus.kind === 'saved' ? { kind: 'idle' } : passwordStatus} />
              {passwordStatus.kind === 'saved' && (
                <p role="status" className="inline-flex items-center gap-1.5 text-[13px] text-[hsl(var(--success))]">
                  <Check className="h-3.5 w-3.5" /> Password changed.
                </p>
              )}
            </div>
          </form>
        </Section>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */

const AccountProfile = () => {
  const { session, ready } = useAnviraSession();
  const { pathname, search } = useLocation();
  const navigate = useNavigate();
  const initialMode: AuthMode = pathname.endsWith('/signup') ? 'signup' : 'signin';
  // Signed in on /account/signin or /account/signup: go to the profile, or back to the account page that sent them (?next=).
  useEffect(() => {
    if (!session || pathname === '/account/profile') return;
    const next = new URLSearchParams(search).get('next');
    navigate(next && /^\/account\/[a-z]+$/.test(next) ? next : '/account/profile', { replace: true });
  }, [session, pathname, search, navigate]);
  return (
    <CleanLayout>
      <SEO
        title={initialMode === 'signup' && !session ? 'Create your Anvira account — LocalHouseLLM' : 'Your Anvira account — LocalHouseLLM'}
        description="Sign in or create your free Anvira account, and manage the profile Anvira Notes shows in Messages."
        noindex
      />
      <div className="max-container px-4 py-12 md:py-20">
        {!anviraConfigured ? (
          <p className="mx-auto max-w-md text-center text-destructive">
            <X className="mr-1 inline h-4 w-4" /> Anvira sign-in is not configured on this site yet.
          </p>
        ) : !ready ? (
          <div className="flex items-center justify-center gap-2 py-24 text-muted-foreground" role="status">
            <Loader2 className="h-4 w-4 animate-spin" /> Loading…
          </div>
        ) : session ? (
          <ProfileEditor key={session.user.id} session={session} />
        ) : (
          <SignIn key={initialMode} initialMode={initialMode} />
        )}
      </div>
    </CleanLayout>
  );
};

export default AccountProfile;
