
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
        canonical="https://localhouse.ai/about"
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
          <h2 className="text-3xl font-bold mb-8 text-center">Leadership Team</h2>
          
          <div className="glass hover-glow text-center p-8 mb-16 max-w-md mx-auto">
            <h3 className="text-xl font-semibold">Vansh Bukkarwal</h3>
            <p className="text-muted-foreground">Founder & CEO</p>
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
              <a href="#" onClick={(e) => { e.preventDefault(); alert('404 Not Found'); }}>
                <Button variant="outline" className="border-border hover:bg-muted/50">
                  GitHub
                </Button>
              </a>
              <a href="#" onClick={(e) => { e.preventDefault(); alert('404 Not Found'); }}>
                <Button variant="outline" className="border-border hover:bg-muted/50">
                  Twitter
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
              <div className="space-y-12">
                <div className="relative">
                  <div className="md:absolute md:left-1/2 md:transform md:-translate-x-1/2 w-4 h-4 rounded-full bg-primary "></div>
                  <div className="md:w-1/2 md:pr-8 md:text-right ml-6 md:ml-0">
                    <h3 className="font-semibold">April 2025</h3>
                    <p className="text-muted-foreground">LocalHouseLLM founded</p>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="md:absolute md:left-1/2 md:transform md:-translate-x-1/2 w-4 h-4 rounded-full bg-primary "></div>
                  <div className="md:w-1/2 md:pl-8 md:ml-auto ml-6 md:text-left">
                    <h3 className="font-semibold">July 2025</h3>
                    <p className="text-muted-foreground">Initial modular AI research whitepaper published</p>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="md:absolute md:left-1/2 md:transform md:-translate-x-1/2 w-4 h-4 rounded-full bg-primary "></div>
                  <div className="md:w-1/2 md:pr-8 md:text-right ml-6 md:ml-0">
                    <h3 className="font-semibold">October 2025</h3>
                    <p className="text-muted-foreground">First AMAI prototype with modular architecture</p>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="md:absolute md:left-1/2 md:transform md:-translate-x-1/2 w-4 h-4 rounded-full bg-primary "></div>
                  <div className="md:w-1/2 md:pl-8 md:ml-auto ml-6 md:text-left">
                    <h3 className="font-semibold">Q1 2026</h3>
                    <p className="text-muted-foreground">Alpha release planned</p>
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
