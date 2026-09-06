
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import SEO from '@/components/SEO';

const About = () => {
  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About LocalHouseLLM",
    "description": "Learn about LocalHouseLLM's mission to revolutionize AI through modular architecture, adaptive learning, and safety-first design",
    "author": {
      "@type": "Organization",
      "name": "LocalHouseLLM",
      "founder": {
        "@type": "Person",
        "name": "Vansh Bukkarwal",
        "jobTitle": "Founder & CEO"
      }
    }
  };

  return (
    <Layout>
      <SEO
        title="About LocalHouseLLM - Pioneering Modular AI Architecture"
        description="Discover LocalHouseLLM's mission to transform AI development through modular architecture, specialized expert systems, and adaptive learning. Meet our leadership and join our journey building the future of artificial intelligence with AMAI and AICL."
        keywords="LocalHouseLLM team, AI company, modular AI development, AI innovation, Vansh Bukkarwal founder, AI research team, AI collaboration, modular AI startup, AMAI development, AICL technology team"
        canonical="https://localhousellm.com/about"
        schema={aboutSchema}
      />
      <section className="py-20">
        <div className="max-container">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About LocalHouseLLM: Pioneering Modular AI</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We're revolutionizing AI development with modular architecture, adaptive learning systems, and safety-first design principles. Building smarter, not just bigger AI.
            </p>
          </div>
          
          {/* Mission */}
          <div className="glass p-8 mb-16">
            <h2 className="text-2xl font-bold mb-4">Our Mission: Redefining AI Architecture</h2>
            <p className="text-lg text-muted-foreground">
              LocalHouseLLM was founded with a transformative mission: to challenge conventional AI development paradigms. 
              We believe that merely scaling up model size and parameter count is not the path to genuine machine intelligence. 
              Instead, we're pioneering modular AI systems with specialized expert modules that can reason intelligently, adapt continuously, and evolve safely over time using AMAI and AICL technologies.
            </p>
          </div>
          
          {/* Leadership */}
          <h2 className="text-3xl font-bold mb-8 text-center">Leadership</h2>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-12">
            <div className="glass hover-glow text-center p-8">
              <h3 className="text-xl font-semibold">Vansh Bukkarwal</h3>
              <p className="text-muted-foreground">CEO-Founder</p>
            </div>
            <div className="glass hover-glow text-center p-8">
              <h3 className="text-xl font-semibold">Shandie</h3>
              <p className="text-muted-foreground">Co-owner</p>
            </div>
          </div>

          {/* Co-Founders */}
          <h3 className="text-2xl font-bold mb-6 text-center">Co-Founders</h3>
          <div className="grid md:grid-cols-1 gap-6 max-w-xl mx-auto mb-16">
            <div className="glass hover-glow text-center p-8">
              <h3 className="text-xl font-semibold">Raghav</h3>
              <p className="text-muted-foreground">Co-Founder</p>
            </div>
          </div>

          {/* Team */}
          <h3 className="text-2xl font-bold mb-6 text-center">Team</h3>
          <div className="glass text-center p-8 max-w-xl mx-auto mb-16">
            <p className="text-lg text-muted-foreground">Coming soon</p>
          </div>
          
          {/* Join Us */}
          <div className="bg-gradient-to-r from-primary/30 to-accent/30 rounded-lg p-8 text-center border border-border">
            <h2 className="text-2xl font-bold mb-4">Join the AI Revolution</h2>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              The LocalHouseLLM team is actively building the future of AI. 
              We're seeking talented collaborators, systems engineers, AI research scientists, and visionary thinkers to shape modular AI architecture.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-2xl hover:shadow-primary/40 transform hover:scale-105 transition-all">
                  Contact Us
                </Button>
              </Link>
              <a href="mailto:vanshbukkarwal@localhousellm.com">
                <Button variant="outline" className="border-border hover:bg-muted/50">
                  Want to join us? Reach out here
                </Button>
              </a>
            </div>
          </div>
          
          {/* Timeline */}
          <div className="mt-20">
            <h2 className="text-3xl font-bold mb-8 text-center">Our AI Innovation Journey</h2>
            
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-secondary/50"></div>
              
              {/* Timeline items */}
              <div className="space-y-16">
                <div className="relative">
                  <div className="md:absolute md:left-1/2 md:transform md:-translate-x-1/2 w-4 h-4 rounded-full bg-primary"></div>
                  <div className="md:w-1/2 md:pr-8 md:text-right ml-6 md:ml-0">
                    <h3 className="font-semibold">April 2025</h3>
                    <p className="text-primary font-medium">LocalHouseLLM Founded</p>
                    <p className="text-muted-foreground mt-1">LocalHouseLLM begins with a mission to make intelligent systems local, modular, and user-owned.</p>
                  </div>
                </div>

                <div className="relative">
                  <div className="md:absolute md:left-1/2 md:transform md:-translate-x-1/2 w-4 h-4 rounded-full bg-primary"></div>
                  <div className="md:w-1/2 md:pl-8 md:ml-auto ml-6 md:text-left">
                    <h3 className="font-semibold">July 2025</h3>
                    <p className="text-primary font-medium">Foundational AI Research</p>
                    <p className="text-muted-foreground mt-1">Initial research into modular AI architectures and adaptive intelligence begins, establishing the foundation for the company's research direction.</p>
                  </div>
                </div>

                <div className="relative">
                  <div className="md:absolute md:left-1/2 md:transform md:-translate-x-1/2 w-4 h-4 rounded-full bg-primary"></div>
                  <div className="md:w-1/2 md:pr-8 md:text-right ml-6 md:ml-0">
                    <h3 className="font-semibold">October 2025</h3>
                    <p className="text-primary font-medium">First AMAI Prototype</p>
                    <p className="text-muted-foreground mt-1">The first Adaptive Modular AI (AMAI) prototype demonstrates a modular approach to AI systems and becomes the foundation for subsequent research.</p>
                  </div>
                </div>

                <div className="relative">
                  <div className="md:absolute md:left-1/2 md:transform md:-translate-x-1/2 w-4 h-4 rounded-full bg-primary"></div>
                  <div className="md:w-1/2 md:pl-8 md:ml-auto ml-6 md:text-left">
                    <h3 className="font-semibold">Q1 2026</h3>
                    <p className="text-primary font-medium">Research → Systems</p>
                    <p className="text-muted-foreground mt-1">LocalHouseLLM expands beyond research prototypes into a broader systems architecture, introducing the foundations of Nomi, AICL, and Orcha.</p>
                  </div>
                </div>

                <div className="relative">
                  <div className="md:absolute md:left-1/2 md:transform md:-translate-x-1/2 w-4 h-4 rounded-full bg-primary"></div>
                  <div className="md:w-1/2 md:pr-8 md:text-right ml-6 md:ml-0">
                    <h3 className="font-semibold">Q2 2026</h3>
                    <p className="text-primary font-medium">Anvira Begins</p>
                    <p className="text-muted-foreground mt-1">Development begins on Anvira, a local-first AI desktop environment designed to bring models, agents, memory, tools, and workspaces into a single application.</p>
                  </div>
                </div>

                <div className="relative">
                  <div className="md:absolute md:left-1/2 md:transform md:-translate-x-1/2 w-4 h-4 rounded-full bg-primary"></div>
                  <div className="md:w-1/2 md:pl-8 md:ml-auto ml-6 md:text-left">
                    <h3 className="font-semibold">Q2 2026</h3>
                    <p className="text-primary font-medium">Orcha Agent Runtime</p>
                    <p className="text-muted-foreground mt-1">Orcha evolves into a dedicated agent execution layer with event-driven execution, tools, memory, checkpoints, replay, multi-agent workflows, and runtime observability.</p>
                  </div>
                </div>

                <div className="relative">
                  <div className="md:absolute md:left-1/2 md:transform md:-translate-x-1/2 w-4 h-4 rounded-full bg-primary"></div>
                  <div className="md:w-1/2 md:pr-8 md:text-right ml-6 md:ml-0">
                    <h3 className="font-semibold">Q2–Q3 2026</h3>
                    <p className="text-primary font-medium">Anvira 0.1</p>
                    <p className="text-muted-foreground mt-1">The first complete Anvira product emerges with: local model management · chat · workspaces · Agent Hub · Orcha · Nomi · AICL · file intelligence · multi-model support.</p>
                  </div>
                </div>

                <div className="relative">
                  <div className="md:absolute md:left-1/2 md:transform md:-translate-x-1/2 w-4 h-4 rounded-full bg-primary"></div>
                  <div className="md:w-1/2 md:pl-8 md:ml-auto ml-6 md:text-left">
                    <h3 className="font-semibold">Q3 2026</h3>
                    <p className="text-primary font-medium">The Agentic Stack</p>
                    <p className="text-muted-foreground mt-1">LocalHouseLLM expands Orcha with LangChain, LangGraph, MCP, Deep Agents, RAG evaluation, durable checkpoints, human approval, multi-agent execution, and persistent agent state.</p>
                  </div>
                </div>

                <div className="relative">
                  <div className="md:absolute md:left-1/2 md:transform md:-translate-x-1/2 w-4 h-4 rounded-full bg-primary"></div>
                  <div className="md:w-1/2 md:pr-8 md:text-right ml-6 md:ml-0">
                    <h3 className="font-semibold">Q3 2026</h3>
                    <p className="text-primary font-medium">Anvira 0.2</p>
                    <p className="text-muted-foreground mt-1">Anvira evolves from a local AI application into a stateful AI workspace capable of project understanding, agent execution, tool use, code creation and editing, verification, GPU-accelerated local inference, and persistent workspaces.</p>
                  </div>
                </div>

                <div className="relative">
                  <div className="md:absolute md:left-1/2 md:transform md:-translate-x-1/2 w-4 h-4 rounded-full bg-primary"></div>
                  <div className="md:w-1/2 md:pl-8 md:ml-auto ml-6 md:text-left">
                    <h3 className="font-semibold">Q3 2026</h3>
                    <p className="text-primary font-medium">Edge AI Expansion</p>
                    <p className="text-muted-foreground mt-1">Research begins on bringing the LocalHouseLLM stack beyond desktop hardware toward mobile and CPU-first edge AI, extending the vision of locally owned intelligence to constrained devices.</p>
                  </div>
                </div>

                <div className="relative">
                  <div className="md:absolute md:left-1/2 md:transform md:-translate-x-1/2 w-4 h-4 rounded-full bg-primary"></div>
                  <div className="md:w-1/2 md:pr-8 md:text-right ml-6 md:ml-0">
                    <h3 className="font-semibold">Now</h3>
                    <p className="text-primary font-medium">Building the Local AI Stack</p>
                    <p className="text-muted-foreground mt-1">LocalHouseLLM is developing an integrated ecosystem across Models · Anvira · Orcha · Nomi · AICL · Agents · Evaluation · Edge AI, with the long-term goal of making advanced AI systems local, modular, interoperable, and user-owned.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
