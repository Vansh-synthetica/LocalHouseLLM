import { type FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

import CleanLayout from '@/components/CleanLayout';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { anvira, friendlyError } from '@/integrations/anvira/client';
import { useAnviraSession } from '@/integrations/anvira/useAnviraSession';

/**
 * Where Anvira password-reset emails land (redirectTo …/account/reset). The link
 * signs the person in for this one purpose; they choose a new password here.
 */
const AccountReset = () => {
  const { session, ready } = useAnviraSession();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [again, setAgain] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  // Give the client a moment to read the token from the link before saying it is invalid.
  const [waited, setWaited] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setWaited(true), 1500);
    return () => clearTimeout(t);
  }, []);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    if (password.length < 8) return setError('Please choose a password of at least 8 characters.');
    if (password !== again) return setError('The two passwords are not the same.');
    setBusy(true);
    const { error: err } = await anvira.auth.updateUser({ password });
    setBusy(false);
    if (err) return setError(friendlyError(err));
    navigate('/account/profile', { replace: true });
  };

  return (
    <CleanLayout>
      <SEO title="Choose a new password — Anvira" description="Choose a new password for your Anvira account." noindex />
      <div className="max-container px-4 py-12 md:py-20">
        <div className="mx-auto w-full max-w-md">
          <h1 className="text-3xl md:text-4xl font-display font-semibold tracking-tight">Choose a new password</h1>
          {!ready || (!session && !waited) ? (
            <p className="mt-6 inline-flex items-center gap-2 text-muted-foreground" role="status">
              <Loader2 className="h-4 w-4 animate-spin" /> Checking your link…
            </p>
          ) : !session ? (
            <div className="mt-6 space-y-4 text-muted-foreground">
              <p>This link has expired or was already used.</p>
              <Link to="/account/profile" className="font-medium text-foreground underline underline-offset-4">
                Ask for a new link
              </Link>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="mt-8 space-y-5 rounded-2xl border border-border/70 bg-card p-6 sm:p-8">
              <p className="text-sm text-muted-foreground">For {session.user.email}</p>
              <div className="space-y-1.5">
                <Label htmlFor="reset-pw1" className="text-[13px] font-medium">New password</Label>
                <Input id="reset-pw1" type="password" autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} className="h-11" autoFocus />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="reset-pw2" className="text-[13px] font-medium">New password again</Label>
                <Input id="reset-pw2" type="password" autoComplete="new-password" value={again} onChange={(e) => setAgain(e.target.value)} className="h-11" />
              </div>
              <p role="alert" className="min-h-[1.25rem] text-[13px] text-destructive">{error}</p>
              <Button type="submit" disabled={busy} className="h-11 w-full rounded-full bg-foreground text-background hover:bg-foreground/90">
                {busy && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Save new password
              </Button>
            </form>
          )}
        </div>
      </div>
    </CleanLayout>
  );
};

export default AccountReset;
