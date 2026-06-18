import UseCaseTemplate from '@/components/UseCaseTemplate';

const Agriculture = () => (
  <UseCaseTemplate
    slug="agriculture"
    title="Agricultural advisors"
    metaTitle="Agricultural AI Advisors — Offline-Capable Modular AI"
    metaDescription="Offline-capable agricultural AI advisors built on the LocalHouseLLM modular stack — local language, local crops, local conditions, no cloud dependency."
    keywords="agricultural AI, farming AI advisor, offline AI, rural AI, local AI advisor, modular AI for agriculture"
    eyebrow="Use case · Agriculture"
    intro="An advisor that works for a farmer in a village with patchy connectivity has to run locally, speak the local language, and reason about local crops and local weather — not a foreign average."
    body={[
      "A modular stack makes this tractable. A small intelligence module tuned on regional crop science runs on commodity hardware. The memory layer holds each farm's history — soil, yields, treatments — owned by the farmer or cooperative. Tools wrap the data that actually matters here: weather feeds when online, cached almanacs when not.",
      "When connectivity is available, larger expert modules can be consulted; when it is not, the local stack still produces useful answers. The orchestrator handles the transition without the user noticing.",
    ]}
    architecture={[
      { layer: 'Modules', role: 'Regionally-tuned crop and agronomy experts, runnable on commodity hardware.' },
      { layer: 'Memory', role: 'Per-farm history owned by the farmer or cooperative.' },
      { layer: 'Tools', role: 'Weather feeds online, cached references offline.' },
      { layer: 'ORCHA', role: 'Falls back to local modules gracefully when offline.' },
    ]}
  />
);

export default Agriculture;
