import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import CleanLayout from '@/components/CleanLayout';
import Breadcrumbs from '@/components/Breadcrumbs';
import SEO from '@/components/SEO';

const Memory = () => (
  <CleanLayout>
    <SEO
      title="Memory — Portable, User-Owned Context for AI"
      description="The LocalHouseLLM memory layer is portable, user-owned context that travels across tools, sessions, and devices — so your AI history belongs to you, not to a vendor."
      canonical="https://localhousellm.lovable.app/stack/memory"
      keywords="AI memory, portable AI memory, user-owned AI context, AI context layer, LocalHouseLLM memory, decentralized AI memory, personal AI memory"
      schema={{ '@context': 'https://schema.org', '@type': 'TechArticle', headline: 'Memory — Portable, User-Owned Context for AI', author: { '@type': 'Organization', name: 'LocalHouseLLM' }, url: 'https://localhousellm.com/stack/memory' }}
    />
    <Breadcrumbs items={[{ name: 'Stack', to: '/stack' }, { name: 'Memory' }]} />

    <article className="pt-10 pb-20">
      <div className="max-container max-w-3xl">
        <p className="text-[11px] tracking-[0.25em] uppercase text-muted-foreground mb-5">Context layer</p>
        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight leading-[1.05] mb-8">Memory</h1>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6">
          The memory layer holds the context an AI system uses to be useful over time: preferences, past conversations, documents, relationships, decisions. In the LocalHouseLLM stack, that memory is portable and user-owned.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-10">
          Memory lives in a store you control — local disk, your private cloud, or our reference Nomi service. Modules read it through a typed AICL request and a scoped capability grant. Nothing is implicitly retained, and nothing is shared without permission.
        </p>

        <h2 className="text-2xl md:text-3xl font-semibold mb-5">Three properties that matter</h2>
        <ul className="space-y-3 text-muted-foreground mb-12 list-disc pl-6">
          <li><strong className="text-foreground">Portability.</strong> The same memory plugs into different orchestrators, products, and devices.</li>
          <li><strong className="text-foreground">Ownership.</strong> The user — not a vendor — holds the keys and the export rights.</li>
          <li><strong className="text-foreground">Scoping.</strong> Every read is policy-checked. Memory is not a global mutable blob.</li>
        </ul>

        <h2 className="text-2xl md:text-3xl font-semibold mb-5">Related</h2>
        <p className="text-muted-foreground mb-10">
          The persona and identity surface around the memory layer ships as <Link to="/nomi" className="text-foreground underline underline-offset-4">Nomi</Link>. The orchestrator that reads from memory is described on the <Link to="/stack/orcha" className="text-foreground underline underline-offset-4">ORCHA page</Link>.
        </p>

        <div className="flex flex-wrap gap-3">
          <Link to="/stack"><Button variant="outline" className="border-border bg-transparent h-11 px-6">Back to the stack</Button></Link>
          <Link to="/nomi"><Button className="bg-foreground text-background hover:bg-foreground/90 h-11 px-6">Explore Nomi</Button></Link>
        </div>
      </div>
    </article>
  </CleanLayout>
);

export default Memory;
