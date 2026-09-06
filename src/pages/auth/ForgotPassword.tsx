import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Loader2, Mail, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/useAuth';
import { forgotSchema } from '@/lib/authSchemas';
import { toast } from '@/hooks/use-toast';
import AuthShell from '@/components/auth/AuthShell';

const ForgotPassword = () => {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const parsed = forgotSchema.safeParse({ email });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? 'Invalid email');
      return;
    }
    setLoading(true);
    const { error: err } = await resetPassword(parsed.data.email);
    setLoading(false);
    if (err) {
      toast({ title: 'Something went wrong', description: err.message, variant: 'destructive' });
      return;
    }
    setSent(true);
  };

  if (sent) {
    return (
      <AuthShell title="Check your email" subtitle="Password reset sent">
        <div className="text-center space-y-4">
          <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6 text-primary" />
          </div>
          <p className="text-sm text-muted-foreground">
            If an account exists for <span className="font-medium text-foreground">{email}</span>, we sent a reset link.
          </p>
          <Link to="/login">
            <Button variant="outline" className="w-full">Back to sign in</Button>
          </Link>
        </div>
      </AuthShell>
    );
  }

  return (
    <AuthShell
      title="Forgot password?"
      subtitle="Enter your email and we'll send a reset link"
      footer={
        <Link to="/login" className="font-medium text-foreground hover:underline">
          Back to sign in
        </Link>
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
              aria-invalid={!!error}
            />
          </div>
          {error && <p className="text-xs text-destructive">{error}</p>}
        </div>

        <Button type="submit" disabled={loading} className="w-full h-10">
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Send reset link'}
        </Button>
      </form>
    </AuthShell>
  );
};

export default ForgotPassword;
