import { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import SEO from '@/components/SEO';
import { Reveal, SectionIntro } from '@/components/system/Motion';

const leadership = [
  { name: 'Vansh Bukkarwal', role: 'CEO & Founder' },
  { name: 'Shandie', role: 'Co-owner' },
];

const coFounders = [{ name: 'Raghav', role: 'Co-Founder' }];

const timeline = [
  { date: 'April 2025', title: 'LocalHouseLLM founded', body: 'LocalHouseLLM begins with a mission to make intelligent systems local, modular, and user-owned.' },
  { date: 'July 2025', title: 'Foundational research', body: 'Initial research into modular AI architectures and adaptive intelligence establishes the company’s research direction.' },
  { date: 'October 2025', title: 'First AMAI prototype', body: 'The first Adaptive Modular AI (AMAI) prototype demonstrates a modular approach to AI systems and becomes the foundation for subsequent research.' },
  { date: 'Q1 2026', title: 'Research → systems', body: 'LocalHouseLLM expands beyond research prototypes into a broader systems architecture, introducing the foundations of Nomi, AICL, and ORCHA.' },
  { date: 'Q2 2026', title: 'Anvira begins', body: 'Development begins on Anvira, a local-first AI desktop environment bringing models, agents, memory, tools, and workspaces into a single application.' },
  { date: 'Q2 2026', title: 'ORCHA agent runtime', body: 'ORCHA evolves into a dedicated agent execution layer with event-driven execution, tools, memory, checkpoints, replay, multi-agent workflows, and runtime observability.' },
  { date: 'Q2–Q3 2026', title: 'Anvira 0.1', body: 'The first complete Anvira product emerges: local model management, chat, workspaces, Agent Hub, ORCHA, Nomi, AICL, file intelligence, and multi-model support.' },
  { date: 'Q3 2026', title: 'The agentic stack', body: 'LocalHouseLLM expands ORCHA with LangChain, LangGraph, MCP, deep agents, RAG evaluation, durable checkpoints, human approval, multi-agent execution, and persistent agent state.' },
  { date: 'Q3 2026', title: 'Anvira 0.2', body: 'Anvira evolves from a local AI application into a stateful AI workspace: project understanding, agent execution, tool use, code creation and editing, verification, GPU-accelerated local inference, and persistent workspaces.' },
  { date: 'Q3 2026', title: 'Edge AI research', body: 'Research begins on bringing the LocalHouseLLM stack beyond desktop hardware toward mobile and CPU-first edge AI.' },
  { date: 'Now', title: 'Building the local AI stack', body: 'LocalHouseLLM is developing an integrated ecosystem across Models, Anvira, ORCHA, Nomi, AICL, Agents, and Evaluation, with the long-term goal of making advanced AI systems local, modular, interoperable, and user-owned.' },
];

const socials = [
  { label: 'GitHub', href: 'https://github.com/LocalHouseLLM', desc: 'Follow our open source work' },
  { label: 'X (Twitter)', href: 'https://x.com/localhousellm', desc: 'Latest updates and news' },
  { label: 'Instagram', href: 'https://www.instagram.com/localhousellm/', desc: 'Behind the scenes' },
  { label: 'Discord', href: '#', desc: 'Coming soon', comingSoon: true },
];

const About = () => {
  const aboutSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About LocalHouseLLM',
    description: 'LocalHouseLLM builds modular AI architecture, specialized expert systems, and adaptive learning infrastructure.',
    author: {
      '@type': 'Organization',
      name: 'LocalHouseLLM',
      founder: { '@type': 'Person', name: 'Vansh Bukkarwal', jobTitle: 'Founder & CEO' },
    },
  };

  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: 'Message sent!',
        description: "We'll get back to you within 48 hours.",
        duration: 5000,
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <Layout>
      <SEO
        title="About LocalHouseLLM — Mission, Vision, Team & Contact"
        description="Why LocalHouseLLM exists, how we think about modular AI architecture, who's building it, and how to reach us."
        keywords="LocalHouseLLM team, AI company, modular AI development, Vansh Bukkarwal founder, AI research team, AMAI development, AICL technology team, contact LocalHouseLLM"
        canonical="https://localhousellm.com/about"
        schema={aboutSchema}
      />

      <section className="pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="max-container max-w-4xl">
          <Reveal>
            <p className="technical-label">About</p>
            <h1 className="mt-4 font-display font-semibold tracking-tight text-4xl md:text-6xl leading-[1.05] mb-8">
              Building smarter, not just bigger, AI.
            </h1>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mb-4">
              We believe your AI should live on your machine, remember you, and work for you — not disappear into
              someone else's cloud.
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl">
              LocalHouseLLM was founded on a simple premise: scaling model size and parameter count is not the
              only path to useful machine intelligence. We build modular AI systems — specialised expert modules
              that reason, adapt, and evolve safely over time — using AMAI and AICL as the underlying architecture.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------- Why we exist ---------- */}
      <section className="border-t border-border py-20 md:py-28">
        <div className="max-container">
          <div className="grid md:grid-cols-12 gap-10 md:gap-16">
            <Reveal className="md:col-span-4">
              <p className="technical-label">Why we exist</p>
              <h2 className="mt-4 font-display text-2xl md:text-3xl font-semibold tracking-tight leading-tight">
                The principles we build on.
              </h2>
            </Reveal>
            <Reveal delay={0.08} className="md:col-span-8 space-y-6 text-foreground/90 text-lg md:text-xl leading-relaxed">
              <p>
                LocalHouseLLM exists to make artificial intelligence accessible, modular, and owned by the people
                who use it.
              </p>
              <p>
                Rather than depending on centralised AI controlled by a handful of organisations, we are building
                open infrastructure that allows anyone to create, customise, and deploy AI systems for their own
                needs.
              </p>
              <p>
                Our goal is to provide the foundational components of artificial intelligence — communication,
                orchestration, memory, safety, tools, and intelligence modules — as a modular ecosystem of
                interoperable parts.
              </p>
              <p>
                We believe the future of AI should be decentralised, transparent, and accessible to everyone — not
                concentrated within large corporations.
              </p>
              <p className="text-foreground font-medium pt-2">
                LocalHouseLLM is building the foundation for that future.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- How we think about it ---------- */}
      <section className="border-t border-border py-20 md:py-28">
        <div className="max-container max-w-3xl">
          <SectionIntro kicker="How we think about it" title="Architecture, not scale, is the path forward." className="mb-10" />
          <Reveal delay={0.06}>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Scaling a single model's parameter count is not the only way to build useful intelligence. We build
              around specialised expert modules, a structured communication layer (AICL) between them, and
              verification as a first-class step rather than an afterthought — activation-based computation
              instead of idle parameters, and reasoning that stays traceable end to end.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              The full technical picture — how AICL, ORCHA, Memory, Safety, Tools, and Intelligence Modules fit
              together — lives on the{' '}
              <a href="/stack" className="text-foreground underline underline-offset-4">Stack page</a>.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------- Leadership ---------- */}
      <section className="border-t border-border py-20 md:py-28">
        <div className="max-container max-w-4xl">
          <SectionIntro kicker="Leadership" title="The people behind LocalHouseLLM." className="mb-14" />

          <div className="divide-y divide-border border-t border-b border-border">
            {leadership.map((p) => (
              <div key={p.name} className="flex items-baseline justify-between py-5">
                <span className="font-display text-lg font-semibold text-foreground">{p.name}</span>
                <span className="text-sm text-muted-foreground">{p.role}</span>
              </div>
            ))}
            {coFounders.map((p) => (
              <div key={p.name} className="flex items-baseline justify-between py-5">
                <span className="font-display text-lg font-semibold text-foreground">{p.name}</span>
                <span className="text-sm text-muted-foreground">{p.role}</span>
              </div>
            ))}
            <div className="flex items-baseline justify-between py-5">
              <span className="font-display text-lg font-semibold text-muted-foreground">Team</span>
              <span className="text-sm text-muted-foreground">Coming soon</span>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border py-20 md:py-28">
        <div className="max-container max-w-3xl">
          <Reveal>
            <h2 className="font-display text-2xl md:text-3xl font-semibold mb-5">Join us</h2>
            <p className="text-muted-foreground leading-relaxed mb-8 max-w-2xl">
              We're building the future of AI and looking for systems engineers, AI research scientists, and
              collaborators who want to shape a modular AI architecture from its early days.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="#contact">
                <Button className="rounded-sm bg-foreground text-background hover:bg-primary hover:text-primary-foreground h-11 px-6">
                  Contact us
                </Button>
              </a>
              <a href="mailto:vanshbukkarwal@localhousellm.com">
                <Button variant="outline" className="rounded-sm h-11 px-6">
                  Reach out directly
                </Button>
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- Timeline ---------- */}
      <section className="border-t border-border py-20 md:py-28">
        <div className="max-container max-w-3xl">
          <SectionIntro kicker="Timeline" title="How we got here." className="mb-14" />

          <div className="space-y-0">
            {timeline.map((t, i) => (
              <Reveal key={t.title} delay={i * 0.02}>
                <div className="flex gap-6">
                  <div className="flex flex-col items-center pt-1.5">
                    <span className="h-2 w-2 rounded-full bg-primary shrink-0" />
                    {i < timeline.length - 1 && <span className="w-px flex-1 bg-border" />}
                  </div>
                  <div className={i < timeline.length - 1 ? 'pb-10' : ''}>
                    <p className="technical-label">{t.date}</p>
                    <h3 className="mt-2 font-display text-lg font-semibold text-foreground">{t.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mt-1 max-w-xl">{t.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Contact ---------- */}
      <section id="contact" className="border-t border-border py-20 md:py-28 scroll-mt-20">
        <div className="max-container max-w-4xl mb-14">
          <SectionIntro kicker="Contact" title="Let's build the future of AI together." />
          <Reveal delay={0.08}>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mt-5">
              Have ideas, questions, or want to collaborate on modular AI architecture? Reach out directly — we
              respond within 48 hours.
            </p>
          </Reveal>
        </div>

        <div className="max-container grid grid-cols-1 lg:grid-cols-2 gap-16">
          <Reveal>
            <h3 className="font-display text-2xl font-semibold mb-6">Send us a message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm text-foreground mb-2">Name</label>
                <Input id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Your name" required className="rounded-sm bg-card border-border" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm text-foreground mb-2">Email</label>
                <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Your email address" required className="rounded-sm bg-card border-border" />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm text-foreground mb-2">Subject</label>
                <Input id="subject" name="subject" value={formData.subject} onChange={handleChange} placeholder="Subject of your message" required className="rounded-sm bg-card border-border" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm text-foreground mb-2">Message</label>
                <Textarea id="message" name="message" value={formData.message} onChange={handleChange} placeholder="Your message" required className="rounded-sm min-h-[150px] bg-card border-border" />
              </div>
              <Button
                type="submit"
                className="w-full rounded-sm bg-foreground text-background hover:bg-primary hover:text-primary-foreground h-11"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send message'}
              </Button>
            </form>
          </Reveal>

          <Reveal delay={0.08} className="space-y-12">
            <div>
              <h3 className="font-display text-2xl font-semibold mb-6">Direct</h3>
              <div className="space-y-5">
                <div>
                  <p className="technical-label">Email</p>
                  <p className="text-muted-foreground mt-1">contact@localhousellm.com</p>
                </div>
                <div>
                  <p className="technical-label">Location</p>
                  <p className="text-muted-foreground mt-1">India</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-display text-2xl font-semibold mb-6">Elsewhere</h3>
              <div className="divide-y divide-border border-t border-b border-border">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target={s.comingSoon ? undefined : '_blank'}
                    rel={s.comingSoon ? undefined : 'noopener noreferrer'}
                    onClick={s.comingSoon ? (e) => e.preventDefault() : undefined}
                    className="flex items-baseline justify-between py-4 group"
                  >
                    <span className="font-display font-semibold text-foreground group-hover:text-primary transition-colors">{s.label}</span>
                    <span className="text-sm text-muted-foreground">{s.desc}</span>
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </Layout>
  );
};

export default About;
