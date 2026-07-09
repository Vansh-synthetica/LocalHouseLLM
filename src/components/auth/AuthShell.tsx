import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

interface AuthShellProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
  seoTitle?: string;
  seoDescription?: string;
}

const AuthShell = ({ title, subtitle, children, footer, seoTitle, seoDescription }: AuthShellProps) => {
  return (
    <>
      <Helmet>
        <title>{seoTitle ?? `${title} — LocalHouseLLM`}</title>
        {seoDescription && <meta name="description" content={seoDescription} />}
        <meta name="robots" content="noindex" />
      </Helmet>
      <div className="min-h-dvh flex flex-col bg-background text-foreground">
        <header className="px-6 py-5">
          <Link to="/" className="inline-flex items-center gap-2.5 group" aria-label="LocalHouseLLM home">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent text-primary-foreground font-display text-lg leading-none shadow-sm">
              \
            </span>
            <span className="font-display text-[15px] font-semibold tracking-tight">
              LocalHouseLLM
            </span>
          </Link>
        </header>

        <main className="flex-1 flex items-center justify-center px-6 py-10">
          <div className="w-full max-w-md">
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
              {subtitle && (
                <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
              )}
            </div>

            <div className="rounded-2xl border border-border/60 bg-card/60 backdrop-blur-xl p-6 sm:p-8 shadow-sm">
              {children}
            </div>

            {footer && (
              <div className="mt-6 text-center text-sm text-muted-foreground">
                {footer}
              </div>
            )}
          </div>
        </main>

        <footer className="px-6 py-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} LocalHouseLLM
        </footer>
      </div>
    </>
  );
};

export default AuthShell;
