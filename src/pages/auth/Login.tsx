import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Loader2, Mail, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/useAuth';
import { signInSchema } from '@/lib/authSchemas';
import { toast } from '@/hooks/use-toast';
import AuthShell from '@/components/auth/AuthShell';

const Login = () => {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string } | null)?.from ?? '/dashboard';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const parsed = signInSchema.safeParse({ email, password });
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      parsed.error.issues.forEach((i) => {
        if (i.path[0]) fieldErrors[i.path[0] as string] = i.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);
    const { error } = await signIn(parsed.data.email, parsed.data.password);
    setLoading(false);

    if (error) {
      const msg = error.message.toLowerCase().includes('invalid')
        ? 'Invalid email or password.'
        : error.message.toLowerCase().includes('confirm')
        ? 'Please verify your email before signing in.'
        : error.message;
      toast({ title: 'Sign in failed', description: msg, variant: 'destructive' });
      return;
    }

    toast({ title: 'Welcome back', description: 'You are now signed in.' });
    navigate(from, { replace: true });
  };

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to your LocalHouseLLM account"
      seoDescription="Sign in to your LocalHouseLLM account."
      footer={
        <>
          Don't have an account?{' '}
          <Link to="/register" className="font-medium text-foreground hover:underline">
            Create one
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-9"
              placeholder="you@example.com"
              aria-invalid={!!errors.email}
            />
          </div>
          {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link to="/forgot-password" className="text-xs text-muted-foreground hover:text-foreground">
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-9"
              placeholder="••••••••"
              aria-invalid={!!errors.password}
            />
          </div>
          {errors.password && <p className="text-xs text-destructive">{errors.password}</p>}
        </div>

        <Button type="submit" disabled={loading} className="w-full h-10">
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Sign in'}
        </Button>
      </form>
    </AuthShell>
  );
};

export default Login;
