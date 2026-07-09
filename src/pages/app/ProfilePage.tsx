import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { profileUpdateSchema } from '@/lib/authSchemas';
import { Loader2 } from 'lucide-react';

const ProfilePage = () => {
  const { user, profile, refreshProfile } = useAuth();
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name ?? '');
      setUsername(profile.username ?? '');
      setBio(profile.bio ?? '');
      setAvatarUrl(profile.avatar_url ?? '');
    }
  }, [profile]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setErrors({});

    const parsed = profileUpdateSchema.safeParse({
      full_name: fullName || null,
      username: username || null,
      bio: bio || null,
      avatar_url: avatarUrl || null,
    });

    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      parsed.error.issues.forEach((i) => {
        if (i.path[0]) fieldErrors[i.path[0] as string] = i.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setSaving(true);
    const { error } = await supabase
      .from('profiles')
      .update({
        full_name: parsed.data.full_name || null,
        username: parsed.data.username || null,
        bio: parsed.data.bio || null,
        avatar_url: parsed.data.avatar_url || null,
      })
      .eq('id', user.id);
    setSaving(false);

    if (error) {
      const msg = error.message.includes('duplicate')
        ? 'That username is already taken.'
        : error.message;
      toast({ title: 'Could not save', description: msg, variant: 'destructive' });
      return;
    }

    await refreshProfile();
    toast({ title: 'Profile updated' });
  };

  const initials =
    fullName?.split(' ').map((s) => s[0]).slice(0, 2).join('').toUpperCase() ||
    user?.email?.[0]?.toUpperCase() ||
    '?';

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Profile</h1>
        <p className="mt-2 text-muted-foreground">How you appear across LocalHouseLLM.</p>
      </div>

      <Card className="p-6 border-border/60 bg-card/50 backdrop-blur-xl">
        <form onSubmit={handleSave} className="space-y-6" noValidate>
          <div className="flex items-center gap-4">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt=""
                className="w-16 h-16 rounded-full object-cover border border-border/60"
                onError={(e) => (e.currentTarget.style.display = 'none')}
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent text-primary-foreground text-lg font-semibold flex items-center justify-center">
                {initials}
              </div>
            )}
            <div>
              <p className="text-sm font-medium">{user?.email}</p>
              <p className="text-xs text-muted-foreground">User ID: {user?.id.slice(0, 8)}…</p>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full name</Label>
              <Input
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                aria-invalid={!!errors.full_name}
              />
              {errors.full_name && <p className="text-xs text-destructive">{errors.full_name}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="ada"
                aria-invalid={!!errors.username}
              />
              {errors.username && <p className="text-xs text-destructive">{errors.username}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="avatarUrl">Avatar URL</Label>
            <Input
              id="avatarUrl"
              type="url"
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
              placeholder="https://…"
              aria-invalid={!!errors.avatar_url}
            />
            {errors.avatar_url && <p className="text-xs text-destructive">{errors.avatar_url}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              rows={4}
              maxLength={500}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell us about yourself"
            />
            <p className="text-xs text-muted-foreground text-right">{bio.length}/500</p>
          </div>

          <div className="flex justify-end">
            <Button type="submit" disabled={saving}>
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Save changes'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default ProfilePage;
