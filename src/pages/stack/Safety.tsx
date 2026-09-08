import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import CleanLayout from '@/components/CleanLayout';
import Breadcrumbs from '@/components/Breadcrumbs';
import SEO from '@/components/SEO';
import { Reveal } from '@/components/system/Motion';
import { VerificationVisual } from '@/components/system/StackVisuals';

const Safety = () => (
  <CleanLayout>
    <SEO
      title="Safety — Verification Layer for Modular AI"
      description="LocalHouseLLM's safety layer applies factual, logical, and policy checks to every AI exchange. Verification is a first-class component of the modular stack, not an afterthought."
      canonical="https://localhousellm.com/stack/safety"
      keywords="AI safety, AI verification, AI verification layer, factual verification AI, AI policy enforcement, LocalHouseLLM safety, trustworthy AI"
      schema={{ '@context': 'https://schema.org', '@type': 'TechArticle', headline: 'Safety — Verification Layer for Modular AI', author: { '@type': 'Organization', name: 'LocalHouseLLM' }, url: 'https://localhousellm.com/stack/safety' }}
    />
    <Breadcrumbs items={[{ name: 'Stack', to: '/stack' }, { name: 'Safety' }]} />

    <article className="pt-10 pb-20">
      <div className="max-container max-w-3xl">
        <Reveal>
          <p className="technical-label">Verification layer</p>
          <h1 className="mt-4 font-display font-semibold tracking-tight text-4xl md:text-6xl leading-[1.05] mb-8">
            Safety
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6">
            Safety is not a system prompt. In the LocalHouseLLM stack, safety is a layer — an explicit, inspectable
            component every response passes through before it reaches a user.
          </p>
        </Reveal>

        <Reveal className="my-12">
          <VerificationVisual />
        </Reveal>

        <Reveal>
          <p className="text-muted-foreground leading-relaxed mb-10">
            Because all module exchanges are typed{' '}
            <Link to="/stack/aicl" className="text-foreground underline underline-offset-4">AICL</Link> packets, the
            safety layer has something concrete to inspect: claims, citations, tool calls, policy tags, and
            provenance. Verification can be deterministic in places where models cannot.
          </p>

          <h2 className="font-display text-2xl md:text-3xl font-semibold mb-5">Three checks, always on</h2>
          <ul className="space-y-3 text-muted-foreground mb-12 list-disc pl-6">
            <li><strong className="text-foreground">Factual.</strong> Claims are grounded in retrieved context, citations, or tool output — or flagged as unsupported.</li>
            <li><strong className="text-foreground">Logical.</strong> Multi-step reasoning is checked for internal consistency before it ships.</li>
            <li><strong className="text-foreground">Policy.</strong> Per-deployment rules — privacy, jurisdiction, domain restrictions — are enforced at packet level.</li>
          </ul>

          <p className="text-muted-foreground mb-10">
            The verification model is described in our research note on Shadow AMAI; see the{' '}
            <Link to="/archive" className="text-foreground underline underline-offset-4">research page</Link>.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link to="/stack">
              <Button variant="outline" className="rounded-sm h-11 px-6">Back to the stack</Button>
            </Link>
            <Link to="/archive">
              <Button className="rounded-sm bg-foreground text-background hover:bg-primary hover:text-primary-foreground h-11 px-6">
                Read the research
              </Button>
            </Link>
          </div>
        </Reveal>
      </div>
    </article>
  </CleanLayout>
);

export default Safety;
