
import Layout from '@/components/Layout';
import { ArrowRight } from 'lucide-react';
import SEO from '@/components/SEO';

const Vision = () => {
  const visionSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "AI Architecture Vision: Modular AI with AMAI and AICL",
    "description": "Technical approach to modular AI architecture using AICL communication, adaptive learning systems, and built-in verification for scalable intelligence",
    "author": {
      "@type": "Organization",
      "name": "LocalHouseLLM"
    },
    "publisher": {
      "@type": "Organization",
      "name": "LocalHouseLLM"
    }
  };

  return (
    <Layout>
      <SEO
        title="AI Vision - Modular Architecture with AMAI & AICL | LocalHouseLLM"
        description="Explore our revolutionary AI architecture vision using AICL communication, expert modules, and adaptive learning. Discover how modular AI replaces bloat with elegance and efficiency."
        keywords="AICL, AMAI, AI architecture, modular AI systems, expert modules, AI communication layer, adaptive activation, AI verification, scalable AI"
        canonical="https://localhousellm.com/vision"
        type="article"
        schema={visionSchema}
      />
      <section className="py-20">
        <div className="max-container">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Vision: The Future of Modular AI Architecture</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The era of brute-force AI scaling is ending.
              We're pioneering modular AI systems inspired by natural intelligence: specialized expert modules, adaptive learning, and comprehensive safety protocols with AMAI and AICL technology.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary mr-3 text-sm">▶</span>
                  AICL: Fast, Safe, High-Precision AI Communication
                </h2>
                <p className="text-muted-foreground">
                  Our modular AI architecture leverages AICL (Adaptive Inter-Module Communication Language) as the system's neural pathway.
                  AICL coordinates expert AI modules, intelligently routes tasks, enforces safety protocols, and ensures every inter-module message is symbolic, structured, and unambiguous.
                  This enables faster AI reasoning, cleaner logic, and scalable learning without relying on massive, uncontrollable parameter growth in traditional AI models.
                </p>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary mr-3 text-sm">▶</span>
                  Built-In AI Verification, Not Heavy Filters
                </h2>
                <p className="text-muted-foreground">
                  Instead of heavy verification pipelines, AMAI employs a streamlined funnel of factual, logical, and safety evaluators.
                  Every AI output undergoes rigorous checks for coherence and trustworthiness before reaching users — creating stable, interpretable AI systems without compromising performance or speed.
                </p>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary mr-3 text-sm">▶</span>
                  Replacing Parameter Bloat With Architectural Elegance
                </h2>
                <p className="text-muted-foreground">
                  No more billions of idle parameters consuming resources.
                  AMAI focuses on activation-based computation, modular AI upgrades, and transparent traceable reasoning.
                  Expert modules can be replaced, improved, or expanded independently — delivering evolvable AI systems without inefficiency or architectural complexity.
                </p>
              </div>
            </div>
            
            <div className="glass p-8 h-auto">
              <h2 className="text-xl font-semibold mb-6 text-center">Modular AI Architecture Overview</h2>
              
              <div className="w-full bg-black/30 rounded-lg p-6 flex flex-col">
                {/* Updated architectural diagram */}
                <div className="flex-grow flex flex-col items-center justify-center space-y-6">
                  {/* Input Layer */}
                  <div className="w-full">
                    <div className="bg-primary/20 p-3 rounded-md text-center border border-primary/50">
                      Input
                    </div>
                  </div>
                  
                  <ArrowRight className="w-6 h-6 text-muted-foreground rotate-90" />
                  
                  {/* Category Router */}
                  <div className="w-full">
                    <div className="bg-secondary p-3 rounded-md text-center border border-border">
                      Category Router
                    </div>
                  </div>
                  
                  <ArrowRight className="w-6 h-6 text-muted-foreground rotate-90" />
                  
                  {/* Expert Modules */}
                  <div className="w-full grid grid-cols-4 gap-2">
                    <div className="bg-accent/20 p-2 rounded-md text-center text-xs border border-accent/50">
                      Science
                    </div>
                    <div className="bg-accent/20 p-2 rounded-md text-center text-xs border border-accent/50">
                      Finance
                    </div>
                    <div className="bg-accent/20 p-2 rounded-md text-center text-xs border border-accent/50">
                      History
                    </div>
                    <div className="bg-accent/20 p-2 rounded-md text-center text-xs border border-accent/50">
                      Ethics
                    </div>
                  </div>
                  
                  <ArrowRight className="w-6 h-6 text-muted-foreground rotate-90" />
                  
                  {/* AICL Communication Layer */}
                  <div className="w-full">
                    <div className="bg-primary/30 p-3 rounded-md text-center border border-primary/50">
                      AICL Communication Layer
                    </div>
                  </div>
                  
                  <ArrowRight className="w-6 h-6 text-muted-foreground rotate-90" />
                  
                  {/* Core Logic */}
                  <div className="w-full">
                    <div className="bg-secondary p-3 rounded-md text-center border border-border">
                      Core Logic Integration
                    </div>
                  </div>
                  
                  <ArrowRight className="w-6 h-6 text-muted-foreground rotate-90" />
                  
                  {/* Verification Layer */}
                  <div className="w-full">
                    <div className="bg-primary/30 p-3 rounded-md text-center border border-primary/30">
                      Funnel Verification Layer
                    </div>
                  </div>
                  
                  <ArrowRight className="w-6 h-6 text-muted-foreground rotate-90" />
                  
                  {/* Output */}
                  <div className="w-full">
                    <div className="bg-primary/20 p-3 rounded-md text-center border border-primary/50">
                      Output
                    </div>
                  </div>
                  
                  <ArrowRight className="w-6 h-6 text-muted-foreground rotate-90" />
                  
                  {/* Active Learning Feedback Loop */}
                  <div className="w-full">
                    <div className="bg-muted/50 p-3 rounded-md text-center border border-muted text-sm">
                      Active Learning Feedback Loop
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="glass p-8 mt-12">
            <h2 className="text-2xl font-semibold mb-6">Technical Approach to Modular AI Systems</h2>
            
            <div className="space-y-6">
              <p className="text-muted-foreground">
                Our modular AI architecture departs from traditional transformer-based models through innovative design principles:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h3 className="font-semibold text-foreground">Modular Parameter Sharing in AI</h3>
                  <p className="text-sm text-muted-foreground">
                    Rather than training one massive AI model, we train specialized expert modules that share a common AICL interface while focusing on specific knowledge domains for optimal efficiency.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-semibold text-foreground">Adaptive Activation Patterns for Efficiency</h3>
                  <p className="text-sm text-muted-foreground">
                    Only the AI modules relevant to each query are activated through intelligent routing, dramatically reducing computational requirements while maintaining output quality and accuracy.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-semibold text-foreground">Multi-Stage AI Verification System</h3>
                  <p className="text-sm text-muted-foreground">
                    Each AI output passes through multiple verification stages that rigorously check for factual accuracy, logical consistency, and safety compliance before delivery to users.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-semibold text-foreground">Continuous Integration Learning for AI</h3>
                  <p className="text-sm text-muted-foreground">
                    New knowledge undergoes validation against existing knowledge bases through AICL protocols before integration into appropriate expert modules, ensuring continuous yet safe AI evolution.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Vision;
