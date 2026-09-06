import UseCaseTemplate from '@/components/UseCaseTemplate';

const Enterprise = () => (
  <UseCaseTemplate
    slug="enterprise-private-ai"
    title="Enterprise private AI"
    metaTitle="Enterprise Private AI — Modular AI Behind Your Firewall"
    metaDescription="Run modular AI inside your firewall with the LocalHouseLLM stack. Your data never leaves the boundary; routing, retries, and verification are typed and auditable."
    keywords="enterprise private AI, private AI infrastructure, on-premise AI, internal AI, modular enterprise AI, AI behind firewall, SOC2 AI, audit-ready AI"
    eyebrow="Use case · Enterprise"
    intro="Enterprises do not need another AI vendor. They need infrastructure they can run inside their own perimeter, tune to their own data, and audit to their own standard."
    body={[
      "The LocalHouseLLM stack ships as software, not as a service. ORCHA, AICL, memory, safety, tools, and modules all run wherever the enterprise wants them — datacenter, private cloud, or air-gapped network. Data does not leave the boundary because it does not have to.",
      "Routing policies, retry budgets, safety thresholds, and acceptable-model lists are all configuration. Compliance and security teams have a typed surface to review, not a black-box endpoint to take on faith.",
      "Anvira's enterprise edition packages this for organisations that want the reference deployment.",
    ]}
    architecture={[
      { layer: 'Deployment', role: 'Runs entirely on-prem or in your private cloud.' },
      { layer: 'AICL', role: 'Typed, logged, auditable inter-module traffic.' },
      { layer: 'Safety', role: 'Per-deployment policy enforcement at packet level.' },
      { layer: 'Modules', role: 'Mix of internal fine-tuned experts and external models, swappable by configuration.' },
    ]}
  />
);

export default Enterprise;
