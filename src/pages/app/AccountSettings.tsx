import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { Loader2, LogOut } from 'lucide-react';
import { passwordSchema } from '@/lib/authSchemas';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { supabase } from '@/integrations/supabase/client';

const AccountSettings = () => {
  const { user, updatePassword, signOut, resetPassword } = useAuth();
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [pwErr, setPwErr] = useState('');
  const [savingPw, setSavingPw] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwErr('');
    const p = passwordSchema.safeParse(newPassword);
    if (!p.success) { setPwErr(p.error.issues[0].message); return; }
    if (newPassword !== confirm) { setPwErr('Passwords do not match'); return; }

    setSavingPw(true);
    const { error } = await updatePassword(newPassword);
    setSavingPw(false);
    if (error) {
      toast({ title: 'Could not update password', description: error.message, variant: 'destructive' });
      return;
    }
    setNewPassword(''); setConfirm('');
    toast({ title: 'Password updated' });
  };

  const handleResendReset = async () => {
    if (!user?.email) return;
    const { error } = await resetPassword(user.email);
    if (error) {
      toast({ title: 'Failed to send email', description: error.message, variant: 'destructive' });
      return;
    }
    toast({ title: 'Reset link sent', description: 'Check your inbox.' });
  };

  const handleDeleteAccount = async () => {
    if (!user) return;
    setDeleting(true);
    // Deleting the profile row cascades to related data; auth user removal
    // requires a service-role backend, so we soft-delete the profile.
    const { error } = await supabase
      .from('profiles')
      .update({ account_status: 'deletion_requested' })
      .eq('id', user.id);
    setDeleting(false);
    if (error) {
      toast({ title: 'Could not process request', description: error.message, variant: 'destructive' });
      return;
    }
    await signOut();
    toast({ title: 'Deletion requested', description: 'We will remove your data shortly.' });
    navigate('/', { replace: true });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Settings</h1>
        <p className="mt-2 text-muted-foreground">Manage your account, password and sessions.</p>
      </div>

      <Card className="p-6 border-border/60 bg-card/50 backdrop-blur-xl">
        <h2 className="text-lg font-semibold">Account</h2>
        <div className="mt-4 grid gap-3 text-sm">
          <div className="flex justify-between border-b border-border/40 py-2">
            <span className="text-muted-foreground">Email</span>
            <span>{user?.email}</span>
          </div>
          <div className="flex justify-between border-b border-border/40 py-2">
            <span className="text-muted-foreground">User ID</span>
            <span className="font-mono text-xs">{user?.id}</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-muted-foreground">Email verified</span>
            <span>{user?.email_confirmed_at ? 'Yes' : 'No'}</span>
          </div>
        </div>
      </Card>

      <Card className="p-6 border-border/60 bg-card/50 backdrop-blur-xl">
        <h2 className="text-lg font-semibold">Change password</h2>
        <form onSubmit={handlePasswordChange} className="mt-4 space-y-4" noValidate>
          <div className="space-y-2">
            <Label htmlFor="newPassword">New password</Label>
            <Input
              id="newPassword"
              type="password"
              autoComplete="new-password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm">Confirm new password</Label>
            <Input
              id="confirm"
              type="password"
              autoComplete="new-password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
          </div>
          {pwErr && <p className="text-xs text-destructive">{pwErr}</p>}
          <div className="flex flex-wrap gap-3">
            <Button type="submit" disabled={savingPw}>
              {savingPw ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Update password'}
            </Button>
            <Button type="button" variant="outline" onClick={handleResendReset}>
              Send reset email instead
            </Button>
          </div>
        </form>
      </Card>

      <Card className="p-6 border-border/60 bg-card/50 backdrop-blur-xl">
        <h2 className="text-lg font-semibold">Sessions</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Sign out of this browser. You'll need to sign in again to continue.
        </p>
        <Button
          variant="outline"
          className="mt-4"
          onClick={async () => {
            await signOut();
            navigate('/login', { replace: true });
          }}
        >
          <LogOut className="w-4 h-4 mr-2" /> Sign out
        </Button>
      </Card>

      <Card className="p-6 border-destructive/40 bg-destructive/5 backdrop-blur-xl">
        <h2 className="text-lg font-semibold text-destructive">Danger zone</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Request account deletion. Your profile is marked for removal and you're signed out.
        </p>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" className="mt-4" disabled={deleting}>
              {deleting ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Request account deletion'}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete your account?</AlertDialogTitle>
              <AlertDialogDescription>
                This marks your account for deletion and signs you out. This action cannot be undone from the app.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteAccount}>Delete account</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Card>
    </div>
  );
};

export default AccountSettings;
