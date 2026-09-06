import UseCaseTemplate from '@/components/UseCaseTemplate';

const Research = () => (
  <UseCaseTemplate
    slug="research"
    title="Research assistants"
    metaTitle="Research Assistants — Composable Modular AI for Researchers"
    metaDescription="Composable AI research assistants on the LocalHouseLLM modular stack — domain-specific reasoning, citation-bound output, and auditable provenance for academic and industrial research."
    keywords="research AI, AI research assistant, academic AI, scientific AI, modular AI for research, citation AI, literature AI"
    eyebrow="Use case · Research"
    intro="A research assistant earns trust by showing its work. The modular stack makes provenance and citation a property of the system, not a habit of the prompter."
    body={[
      "Researchers can compose an assistant from the experts their field actually uses: a literature retriever bound to a curated corpus, a methods reasoner tuned on protocols, a statistical evaluator, a writing module. Each is independently swappable as the field evolves.",
      "Because every claim flows through an AICL packet with sources attached, the safety layer can refuse uncited assertions. The orchestrator records the full trace, so any conclusion can be reproduced step by step — a primitive most research tooling lacks.",
    ]}
    architecture={[
      { layer: 'Modules', role: 'Field-specific reasoners — literature, methods, statistics, drafting.' },
      { layer: 'Tools', role: 'Bound to curated corpora and reproducible computation.' },
      { layer: 'Safety', role: 'Refuses uncited claims; enforces methodological rules.' },
      { layer: 'AICL', role: 'Full provenance per packet, end-to-end reproducibility.' },
    ]}
  />
);

export default Research;
