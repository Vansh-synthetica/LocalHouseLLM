import { NavLink, Outlet, useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { LayoutDashboard, UserCircle, Settings, LogOut, Shield } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

const AppLayout = () => {
  const { signOut, profile, user, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    toast({ title: 'Signed out', description: 'See you next time.' });
    navigate('/login', { replace: true });
  };

  const initials =
    profile?.full_name?.split(' ').map((s) => s[0]).slice(0, 2).join('').toUpperCase() ||
    user?.email?.[0]?.toUpperCase() ||
    '?';

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
      isActive
        ? 'bg-foreground/10 text-foreground font-medium'
        : 'text-muted-foreground hover:bg-foreground/5 hover:text-foreground'
    }`;

  return (
    <>
      <Helmet>
        <title>Dashboard — LocalHouseLLM</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <div className="min-h-dvh bg-background text-foreground flex">
        <aside className="hidden md:flex w-64 shrink-0 flex-col border-r border-border/60 bg-card/30 backdrop-blur-xl">
          <Link to="/" className="flex items-center gap-2.5 px-5 h-16 border-b border-border/60">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent text-primary-foreground font-display text-lg leading-none">
              \
            </span>
            <span className="font-display text-[14px] font-semibold tracking-tight">
              LocalHouseLLM
            </span>
          </Link>

          <nav className="flex-1 p-3 space-y-1">
            <NavLink to="/dashboard" end className={linkClass}>
              <LayoutDashboard className="w-4 h-4" /> Dashboard
            </NavLink>
            <NavLink to="/dashboard/profile" className={linkClass}>
              <UserCircle className="w-4 h-4" /> Profile
            </NavLink>
            <NavLink to="/dashboard/settings" className={linkClass}>
              <Settings className="w-4 h-4" /> Settings
            </NavLink>
            {isAdmin && (
              <div className="pt-2 mt-2 border-t border-border/60">
                <p className="px-3 pb-1 text-[10px] tracking-[0.22em] uppercase text-muted-foreground/70">
                  Admin
                </p>
                <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground">
                  <Shield className="w-4 h-4" /> Admin access
                </div>
              </div>
            )}
          </nav>

          <div className="p-3 border-t border-border/60">
            <div className="flex items-center gap-3 px-2 py-2">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-accent text-primary-foreground text-sm font-semibold flex items-center justify-center">
                {initials}
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-medium truncate">
                  {profile?.full_name || user?.email}
                </div>
                <div className="text-xs text-muted-foreground truncate">{user?.email}</div>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={handleSignOut} className="w-full justify-start mt-2">
              <LogOut className="w-4 h-4 mr-2" /> Sign out
            </Button>
          </div>
        </aside>

        <div className="flex-1 flex flex-col min-w-0">
          {/* Mobile header */}
          <header className="md:hidden flex items-center justify-between px-4 h-14 border-b border-border/60 bg-card/40 backdrop-blur-xl">
            <Link to="/" className="flex items-center gap-2">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent text-primary-foreground font-display leading-none">
                \
              </span>
              <span className="font-display text-sm font-semibold">LocalHouseLLM</span>
            </Link>
            <Button variant="ghost" size="sm" onClick={handleSignOut}>
              <LogOut className="w-4 h-4" />
            </Button>
          </header>

          {/* Mobile tab bar */}
          <nav className="md:hidden flex border-b border-border/60 bg-card/20">
            <NavLink to="/dashboard" end className={({ isActive }) => `flex-1 text-center py-3 text-xs ${isActive ? 'text-foreground border-b-2 border-foreground' : 'text-muted-foreground'}`}>
              Overview
            </NavLink>
            <NavLink to="/dashboard/profile" className={({ isActive }) => `flex-1 text-center py-3 text-xs ${isActive ? 'text-foreground border-b-2 border-foreground' : 'text-muted-foreground'}`}>
              Profile
            </NavLink>
            <NavLink to="/dashboard/settings" className={({ isActive }) => `flex-1 text-center py-3 text-xs ${isActive ? 'text-foreground border-b-2 border-foreground' : 'text-muted-foreground'}`}>
              Settings
            </NavLink>
          </nav>

          <main className="flex-1 overflow-y-auto">
            <div className="max-w-5xl mx-auto px-6 py-8 sm:py-12">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default AppLayout;
