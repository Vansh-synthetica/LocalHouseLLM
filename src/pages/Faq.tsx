import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import CleanLayout from '@/components/CleanLayout';
import Breadcrumbs from '@/components/Breadcrumbs';
import SEO from '@/components/SEO';

const faqs = [
  { q: 'What is LocalHouseLLM?', a: 'LocalHouseLLM is an AI infrastructure company building open, modular components for decentralized AI: the AICL communication protocol, the ORCHA orchestration engine, memory, safety, tools, and intelligence modules. The stack is open infrastructure anyone can compose and own.' },
  { q: 'How is LocalHouseLLM different from a hosted AI provider?', a: 'Hosted AI providers ship a single closed model behind an API. LocalHouseLLM ships interoperable layers you can run on your own hardware, swap independently, and inspect at the packet level. You own the deployment, the memory, and the verification rules.' },
  { q: 'What is AICL?', a: 'AICL — the Adaptive Inter-module Communication Language — is the structured packet protocol AI modules use to talk to each other inside the LocalHouseLLM stack. It defines schemas, routing metadata, capability discovery, and provenance so every exchange is observable and verifiable.' },
  { q: 'What is ORCHA?', a: 'ORCHA is the orchestration engine. It decomposes requests, routes work to the most capable available module, runs sub-tasks in parallel where possible, aggregates results, and applies the verification layer before responding. ORCHA is the policy; AICL is the wire format underneath it.' },
  { q: 'How is AICL different from ORCHA?', a: 'AICL defines how messages move between modules. ORCHA decides which messages to send and what to do with the responses. Keeping the protocol and the orchestrator separate is what makes either of them upgradable in isolation.' },
  { q: 'Why does modular AI matter?', a: 'Monolithic models concentrate capability, cost, and risk in one opaque artifact. Modular AI separates concerns: small specialized experts are cheaper to run, faster to upgrade, easier to audit, and possible to swap. The result is infrastructure that improves piece by piece rather than all-or-nothing.' },
  { q: 'Who should use the LocalHouseLLM stack?', a: 'Developers and researchers building AI systems where ownership, auditability, or local execution matter: healthcare, finance, education, robotics, on-device assistants, and any private-data setting. Anyone tired of rebuilding routing, retries, and verification by hand.' },
  { q: 'Is LocalHouseLLM open source?', a: 'Yes — the core components (AICL, ORCHA) are open source on GitHub. Research papers are published openly on SSRN. Products built on the stack (Anvira, Nomi) have their own licensing.' },
  { q: 'Where can I read the research?', a: 'The Research page collects every paper and technical note, with links to SSRN and GitHub.' },
];

const Faq = () => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <CleanLayout>
      <SEO
        title="FAQ — LocalHouseLLM"
        description="Frequently asked questions about LocalHouseLLM, AICL, ORCHA, modular AI infrastructure, and how to build on the decentralized AI stack."
        canonical="https://localhousellm.com/faq"
        keywords="LocalHouseLLM FAQ, what is LocalHouseLLM, what is AICL, what is ORCHA, modular AI FAQ, decentralized AI FAQ"
        schema={schema}
      />
      <Breadcrumbs items={[{ name: 'FAQ', to: '/faq' }]} />

      <section className="pt-10 pb-12">
        <div className="max-container max-w-4xl">
          <p className="text-[11px] tracking-[0.25em] uppercase text-muted-foreground mb-5">Questions</p>
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight leading-[1.05] mb-8">FAQ</h1>
        </div>
      </section>

      <section className="border-t border-border/40 py-12 md:py-16">
        <div className="max-container max-w-3xl space-y-10">
          {faqs.map((f) => (
            <article key={f.q}>
              <h2 className="text-lg md:text-xl font-semibold mb-3">{f.q}</h2>
              <p className="text-muted-foreground leading-relaxed">{f.a}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-border/40 py-20">
        <div className="max-container max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-semibold mb-5">Still have questions?</h2>
          <div className="flex flex-wrap gap-3">
            <Link to="/contact"><Button className="bg-foreground text-background hover:bg-foreground/90 h-11 px-6">Get in touch</Button></Link>
            <Link to="/docs"><Button variant="outline" className="border-border bg-transparent h-11 px-6">Read the docs</Button></Link>
          </div>
        </div>
      </section>
    </CleanLayout>
  );
};

export default Faq;
