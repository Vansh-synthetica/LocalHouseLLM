import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import CleanLayout from '@/components/CleanLayout';
import Breadcrumbs from '@/components/Breadcrumbs';
import SEO from '@/components/SEO';

const Tools = () => (
  <CleanLayout>
    <SEO
      title="Tools — Reusable Action Components for AI Modules"
      description="The LocalHouseLLM tools layer is a library of sandboxed, reusable action components — retrieval, calculation, code execution, and external integrations — that any expert module can call through AICL."
      canonical="https://localhousellm.lovable.app/stack/tools"
      keywords="AI tools, AI tool use, AI function calling, AI action components, AI retrieval tool, AI code execution, LocalHouseLLM tools"
      schema={{ '@context': 'https://schema.org', '@type': 'TechArticle', headline: 'Tools — Reusable Action Components for AI Modules', author: { '@type': 'Organization', name: 'LocalHouseLLM' }, url: 'https://localhousellm.com/stack/tools' }}
    />
    <Breadcrumbs items={[{ name: 'Stack', to: '/stack' }, { name: 'Tools' }]} />

    <article className="pt-10 pb-20">
      <div className="max-container max-w-3xl">
        <p className="text-[11px] tracking-[0.25em] uppercase text-muted-foreground mb-5">Actions layer</p>
        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight leading-[1.05] mb-8">Tools</h1>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6">
          Models reason. Tools act. The tools layer is the library of reusable, sandboxed actions that intelligence modules call out to whenever they need to retrieve, compute, or change something in the real world.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-10">
          Every tool ships with a typed schema, a permission scope, and a verification hook. Calls and responses flow through <Link to="/stack/aicl" className="text-foreground underline underline-offset-4">AICL</Link>, so tool use is loggable and auditable end-to-end.
        </p>

        <h2 className="text-2xl md:text-3xl font-semibold mb-5">Built-in categories</h2>
        <ul className="space-y-3 text-muted-foreground mb-12 list-disc pl-6">
          <li><strong className="text-foreground">Retrieval.</strong> Vector and keyword search across local and remote corpora.</li>
          <li><strong className="text-foreground">Computation.</strong> Sandboxed code and math execution.</li>
          <li><strong className="text-foreground">Integration.</strong> Typed connectors for files, calendars, databases, and APIs.</li>
          <li><strong className="text-foreground">Observation.</strong> Read-only probes against external systems for grounded answers.</li>
        </ul>

        <div className="flex flex-wrap gap-3">
          <Link to="/stack"><Button variant="outline" className="border-border bg-transparent h-11 px-6">Back to the stack</Button></Link>
          <Link to="/docs"><Button className="bg-foreground text-background hover:bg-foreground/90 h-11 px-6">Docs</Button></Link>
        </div>
      </div>
    </article>
  </CleanLayout>
);

export default Tools;
