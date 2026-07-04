import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import CleanLayout from '@/components/CleanLayout';
import Breadcrumbs from '@/components/Breadcrumbs';
import SEO from '@/components/SEO';

const Modules = () => (
  <CleanLayout>
    <SEO
      title="Intelligence Modules — Specialized Experts for Modular AI"
      description="Intelligence Modules are the specialized experts inside the LocalHouseLLM stack. Each module is independently swappable, upgradable, and routable — small local models, fine-tuned domain experts, or hosted frontier models can all fill the same slot."
      canonical="https://localhousellm.lovable.app/stack/modules"
      keywords="AI expert modules, intelligence modules, mixture of experts, modular AI experts, LocalHouseLLM modules, specialized AI models, AI module architecture"
      schema={{ '@context': 'https://schema.org', '@type': 'TechArticle', headline: 'Intelligence Modules — Specialized Experts for Modular AI', author: { '@type': 'Organization', name: 'LocalHouseLLM' }, url: 'https://localhousellm.com/stack/modules' }}
    />
    <Breadcrumbs items={[{ name: 'Stack', to: '/stack' }, { name: 'Intelligence Modules' }]} />

    <article className="pt-10 pb-20">
      <div className="max-container max-w-3xl">
        <p className="text-[11px] tracking-[0.25em] uppercase text-muted-foreground mb-5">Experts layer</p>
        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight leading-[1.05] mb-8">Intelligence Modules</h1>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6">
          An intelligence module is a single, focused expert: a model (or a small system of models) responsible for one well-scoped capability. A medical reasoner. A code synthesizer. A retrieval-augmented summariser. A planner.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-10">
          Because every module exposes itself through the same AICL capability contract, the orchestrator can swap one implementation for another without rewriting the system around it. A small local model today, a fine-tuned domain expert tomorrow.
        </p>

        <h2 className="text-2xl md:text-3xl font-semibold mb-5">Why specialization wins</h2>
        <ul className="space-y-3 text-muted-foreground mb-12 list-disc pl-6">
          <li><strong className="text-foreground">Cheaper inference.</strong> Activate only what a task needs.</li>
          <li><strong className="text-foreground">Better accuracy.</strong> Domain-tuned experts beat generalists in their domain.</li>
          <li><strong className="text-foreground">Independent evolution.</strong> Upgrade or retire a module without a system rewrite.</li>
          <li><strong className="text-foreground">Auditability.</strong> Provenance is per-module, not lost inside a monolith.</li>
        </ul>

        <p className="text-muted-foreground mb-10">
          See the <Link to="/research" className="text-foreground underline underline-offset-4">Adaptive Modular AI paper</Link> for the architectural argument, and <Link to="/anvira" className="text-foreground underline underline-offset-4">Anvira</Link> for the reference product that ships modules end-to-end.
        </p>

        <div className="flex flex-wrap gap-3">
          <Link to="/stack"><Button variant="outline" className="border-border bg-transparent h-11 px-6">Back to the stack</Button></Link>
          <Link to="/anvira"><Button className="bg-foreground text-background hover:bg-foreground/90 h-11 px-6">Anvira</Button></Link>
        </div>
      </div>
    </article>
  </CleanLayout>
);

export default Modules;
