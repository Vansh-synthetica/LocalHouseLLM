import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AuthShell from '@/components/auth/AuthShell';

const VerifyEmail = () => {
  return (
    <AuthShell
      title="Verify your email"
      subtitle="Check your inbox to activate your account"
    >
      <div className="text-center space-y-5">
        <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
          <Mail className="w-6 h-6 text-primary" />
        </div>
        <p className="text-sm text-muted-foreground">
          We sent you a verification link. Once verified, you can sign in with your email and password.
        </p>
        <Link to="/login">
          <Button variant="outline" className="w-full">Back to sign in</Button>
        </Link>
      </div>
    </AuthShell>
  );
};

export default VerifyEmail;
