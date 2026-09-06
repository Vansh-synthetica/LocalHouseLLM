import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import CleanLayout from '@/components/CleanLayout';
import Breadcrumbs from '@/components/Breadcrumbs';
import SEO from '@/components/SEO';

interface Props {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  eyebrow: string;
  intro: string;
  body: string[];
  architecture: { layer: string; role: string }[];
}

const UseCaseTemplate = ({ slug, title, metaTitle, metaDescription, keywords, eyebrow, intro, body, architecture }: Props) => {
  const canonical = `https://localhousellm.com/use-cases/${slug}`;
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    author: { '@type': 'Organization', name: 'LocalHouseLLM' },
    publisher: { '@type': 'Organization', name: 'LocalHouseLLM' },
    url: canonical,
  };

  return (
    <CleanLayout>
      <SEO title={metaTitle} description={metaDescription} canonical={canonical} keywords={keywords} schema={schema} />
      <Breadcrumbs items={[{ name: 'Use Cases', to: '/use-cases' }, { name: title }]} />

      <article className="pt-10 pb-20">
        <div className="max-container max-w-3xl">
          <p className="text-[11px] tracking-[0.25em] uppercase text-muted-foreground mb-5">{eyebrow}</p>
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight leading-[1.05] mb-8">{title}</h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10">{intro}</p>

          <div className="space-y-5 text-muted-foreground leading-relaxed mb-12">
            {body.map((p, i) => <p key={i}>{p}</p>)}
          </div>

          <h2 className="text-2xl md:text-3xl font-semibold mb-5">How the stack helps</h2>
          <div className="space-y-3 mb-12">
            {architecture.map((a) => (
              <div key={a.layer} className="flex gap-4 p-4 rounded-lg border border-border/40">
                <span className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground w-32 shrink-0 pt-0.5">{a.layer}</span>
                <span className="text-sm text-muted-foreground leading-relaxed flex-1">{a.role}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            <Link to="/stack"><Button className="bg-foreground text-background hover:bg-foreground/90 h-11 px-6">Explore the stack</Button></Link>
            <Link to="/use-cases"><Button variant="outline" className="border-border bg-transparent h-11 px-6">All use cases</Button></Link>
          </div>
        </div>
      </article>
    </CleanLayout>
  );
};

export default UseCaseTemplate;
