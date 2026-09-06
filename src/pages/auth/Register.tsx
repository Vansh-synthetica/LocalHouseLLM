import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Loader2, Mail, Lock, User as UserIcon, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/useAuth';
import { signUpSchema } from '@/lib/authSchemas';
import { toast } from '@/hooks/use-toast';
import AuthShell from '@/components/auth/AuthShell';

const Register = () => {
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const parsed = signUpSchema.safeParse({ fullName, email, password });
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      parsed.error.issues.forEach((i) => {
        if (i.path[0]) fieldErrors[i.path[0] as string] = i.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);
    const { error } = await signUp(parsed.data.email, parsed.data.password, parsed.data.fullName);
    setLoading(false);

    if (error) {
      const msg = error.message.toLowerCase().includes('registered')
        ? 'This email is already registered. Try signing in.'
        : error.message;
      toast({ title: 'Sign up failed', description: msg, variant: 'destructive' });
      return;
    }

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <AuthShell title="Check your email" subtitle="Almost there">
        <div className="text-center space-y-4">
          <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6 text-primary" />
          </div>
          <p className="text-sm text-muted-foreground">
            We sent a verification link to <span className="font-medium text-foreground">{email}</span>.
            Click it to activate your account, then sign in.
          </p>
          <Button variant="outline" className="w-full" onClick={() => navigate('/login')}>
            Back to sign in
          </Button>
        </div>
      </AuthShell>
    );
  }

  return (
    <AuthShell
      title="Create your account"
      subtitle="One account for LocalHouseLLM and Anvira"
      seoDescription="Create your LocalHouseLLM account."
      footer={
        <>
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-foreground hover:underline">
            Sign in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        <div className="space-y-2">
          <Label htmlFor="fullName">Full name</Label>
          <div className="relative">
            <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="fullName"
              autoComplete="name"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="pl-9"
              placeholder="Ada Lovelace"
              aria-invalid={!!errors.fullName}
            />
          </div>
          {errors.fullName && <p className="text-xs text-destructive">{errors.fullName}</p>}
        </div>

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
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="password"
              type="password"
              autoComplete="new-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-9"
              placeholder="At least 8 characters"
              aria-invalid={!!errors.password}
            />
          </div>
          {errors.password && <p className="text-xs text-destructive">{errors.password}</p>}
        </div>

        <Button type="submit" disabled={loading} className="w-full h-10">
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Create account'}
        </Button>

        <p className="text-[11px] text-center text-muted-foreground leading-relaxed">
          By continuing you agree to our terms and privacy policy.
        </p>
      </form>
    </AuthShell>
  );
};

export default Register;
