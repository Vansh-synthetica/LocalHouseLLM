import UseCaseTemplate from '@/components/UseCaseTemplate';

const AiTutors = () => (
  <UseCaseTemplate
    slug="ai-tutors"
    title="AI tutors"
    metaTitle="AI Tutors — Modular AI for Personalised Learning"
    metaDescription="How the LocalHouseLLM modular AI stack powers personalised AI tutors — owned by the school, shaped to the student, and grounded in real curriculum."
    keywords="AI tutor, personalised learning AI, education AI, school AI, modular AI tutor, on-premise AI for schools"
    eyebrow="Use case · Education"
    intro="An AI tutor that is useful in classrooms is not a chatbot bolted onto a textbook. It is a system that remembers what a student already knows, speaks their language, follows the curriculum the school actually uses, and stays inside the boundaries the school sets."
    body={[
      "Generic hosted assistants struggle here. The data is sensitive, the curriculum is local, and the cost of a wrong answer is a misled student. A modular stack lets the tutor be assembled from parts that each respect those constraints.",
      "An intelligence module tuned on the school's curriculum handles subject reasoning. The memory layer holds each student's learning history — owned by the school, exportable, never shared. The safety layer enforces age-appropriate output and citation requirements. Tools wrap the school's existing systems: gradebook, lesson plans, calendar.",
      "Crucially, the school can run the whole thing on its own hardware. The same stack a small school deploys on a single server scales to a district without changing the architecture.",
    ]}
    architecture={[
      { layer: 'Memory', role: 'Holds each student\'s learning history, owned by the school.' },
      { layer: 'Modules', role: 'Subject experts tuned on local curriculum.' },
      { layer: 'Safety', role: 'Age-appropriate output, citation requirements, policy enforcement.' },
      { layer: 'Tools', role: 'Connectors to existing gradebook, lesson plans, calendars.' },
      { layer: 'ORCHA', role: 'Routes each question to the right expert and applies verification before responding.' },
    ]}
  />
);

export default AiTutors;
