import { useAuth } from '@/hooks/useAuth';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { CheckCircle2, AlertCircle, Sparkles, Shield, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Dashboard = () => {
  const { user, profile, isAdmin } = useAuth();
  const emailVerified = !!user?.email_confirmed_at;

  const created = profile?.created_at ? new Date(profile.created_at) : null;
  const lastLogin = profile?.last_login_at ? new Date(profile.last_login_at) : null;

  const fmt = (d: Date | null) =>
    d
      ? d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
      : '—';

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
          Welcome{profile?.full_name ? `, ${profile.full_name.split(' ')[0]}` : ''}
        </h1>
        <p className="mt-2 text-muted-foreground">
          Your LocalHouseLLM account. Same identity powers Anvira and every LocalHouseLLM product.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="p-5 border-border/60 bg-card/50 backdrop-blur-xl">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Plan</p>
              <p className="mt-2 text-2xl font-semibold capitalize">
                {profile?.subscription_tier ?? 'free'}
              </p>
            </div>
            <Sparkles className="w-5 h-5 text-muted-foreground" />
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Upgrade options coming soon.
          </p>
        </Card>

        <Card className="p-5 border-border/60 bg-card/50 backdrop-blur-xl">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Email</p>
              <p className="mt-2 flex items-center gap-2">
                {emailVerified ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span className="text-sm font-medium">Verified</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-4 h-4 text-amber-500" />
                    <span className="text-sm font-medium">Unverified</span>
                  </>
                )}
              </p>
            </div>
          </div>
          <p className="mt-3 text-xs text-muted-foreground truncate">{user?.email}</p>
        </Card>

        <Card className="p-5 border-border/60 bg-card/50 backdrop-blur-xl">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Status</p>
              <p className="mt-2 text-sm font-medium capitalize">
                {profile?.account_status ?? 'active'}
              </p>
            </div>
            <Shield className="w-5 h-5 text-muted-foreground" />
          </div>
          {isAdmin && (
            <Badge variant="secondary" className="mt-3">
              Admin
            </Badge>
          )}
        </Card>
      </div>

      <Card className="p-6 border-border/60 bg-card/50 backdrop-blur-xl">
        <h2 className="text-lg font-semibold mb-4">Account activity</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-foreground/5 flex items-center justify-center">
              <Clock className="w-4 h-4 text-muted-foreground" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Member since</p>
              <p className="text-sm font-medium">{fmt(created)}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-foreground/5 flex items-center justify-center">
              <Clock className="w-4 h-4 text-muted-foreground" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Last login</p>
              <p className="text-sm font-medium">{fmt(lastLogin)}</p>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6 border-border/60 bg-card/50 backdrop-blur-xl">
        <h2 className="text-lg font-semibold">Anvira desktop</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The Anvira desktop app will use this same account. When it launches, you'll be able to sign in with the credentials you use here — no separate registration.
        </p>
        <div className="mt-4 flex gap-3">
          <Link to="/anvira">
            <Button variant="outline" size="sm">Learn about Anvira</Button>
          </Link>
          <Link to="/dashboard/profile">
            <Button size="sm">Complete your profile</Button>
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;
