import UseCaseTemplate from '@/components/UseCaseTemplate';

const EdgeAi = () => (
  <UseCaseTemplate
    slug="edge-ai"
    title="Edge AI & robotics"
    metaTitle="Edge AI & Robotics — Modular Intelligence at the Edge"
    metaDescription="Real-time modular AI for robotics, IoT, and edge devices on the LocalHouseLLM stack — small specialized modules, deterministic orchestration, and verifiable decisions on-device."
    keywords="edge AI, robotics AI, on-device AI, IoT AI, embedded AI, modular edge AI, real-time AI, autonomous systems AI"
    eyebrow="Use case · Edge"
    intro="At the edge, every millisecond costs and every watt matters. A monolithic model is the wrong shape. A small set of focused modules, orchestrated deterministically, is the right one."
    body={[
      "The same stack that runs on a server runs on embedded hardware. Small intelligence modules handle perception, planning, and control. The orchestrator schedules them with real-time constraints. The safety layer turns into a hard gate on any actuator-touching decision.",
      "Because the AICL contract is the same on the edge as in the datacenter, a system can offload to a richer model upstream when bandwidth allows, and run the local stack standalone when it does not. The behaviour is the same shape, only the participating modules differ.",
      "Anvira's embedded edition is the reference deployment.",
    ]}
    architecture={[
      { layer: 'Modules', role: 'Small, specialized experts for perception, planning, control.' },
      { layer: 'ORCHA', role: 'Real-time scheduling under tight latency and power budgets.' },
      { layer: 'Safety', role: 'Hard gate on every actuator decision.' },
      { layer: 'AICL', role: 'Same wire format on-device and upstream, so offload is a configuration choice.' },
    ]}
  />
);

export default EdgeAi;
