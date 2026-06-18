import UseCaseTemplate from '@/components/UseCaseTemplate';

const Healthcare = () => (
  <UseCaseTemplate
    slug="healthcare"
    title="Healthcare support"
    metaTitle="Healthcare AI — On-Premise Modular AI for Clinics"
    metaDescription="On-premise AI assistants for clinics and hospitals, built on the LocalHouseLLM modular stack — patient data never leaves the boundary, every claim is verified, every action is auditable."
    keywords="healthcare AI, clinical AI assistant, on-premise medical AI, private healthcare AI, modular medical AI, HIPAA AI, verified medical AI"
    eyebrow="Use case · Healthcare"
    intro="Healthcare AI cannot afford a wrong answer, a leaked record, or an unauditable decision. Cloud-only assistants ask clinicians to choose between usefulness and compliance. The modular stack removes the choice."
    body={[
      "Every layer runs on premise. Patient context lives in a memory store the clinic controls, accessible only through scoped, policy-checked AICL reads. Intelligence modules are domain-tuned and citation-bound — a claim without a source does not ship.",
      "The safety layer is not advisory. It is a gate: factual checks against the clinic's source-of-truth corpus, logical checks on multi-step reasoning, and policy checks against jurisdiction and specialty rules. Every packet is recorded so any decision can be reconstructed months later.",
      "Anvira's enterprise edition is the reference deployment for this pattern — see the Anvira pages for the packaged product.",
    ]}
    architecture={[
      { layer: 'Memory', role: 'Patient context held in a clinic-controlled store with scoped reads.' },
      { layer: 'Modules', role: 'Domain-tuned medical reasoners, citation-bound by default.' },
      { layer: 'Safety', role: 'Factual, logical, and policy gates — verification is not optional.' },
      { layer: 'AICL', role: 'Every exchange is recorded, replayable, and auditable.' },
      { layer: 'ORCHA', role: 'Decomposes clinical queries, routes to the right specialist module, enforces retries.' },
    ]}
  />
);

export default Healthcare;
