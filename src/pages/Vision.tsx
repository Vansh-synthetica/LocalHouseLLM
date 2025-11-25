
import Layout from '@/components/Layout';
import { ArrowRight } from 'lucide-react';

const Vision = () => {
  return (
    <Layout>
      <section className="py-20">
        <div className="max-container">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Vision</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The age of brute-force scaling is fading.
              We're building language models the way nature builds intelligence: with specialization, adaptation, and caution.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary mr-3 text-sm">▶</span>
                  AICL: Fast, Safe, High-Precision Communication
                </h2>
                <p className="text-muted-foreground">
                  Our architecture uses AICL (Adaptive Inter-Module Communication Language) as the system's nervous system.
                  AICL coordinates experts, routes tasks, enforces safety rules, and ensures every message between modules is symbolic, structured, and unambiguous.
                  This enables faster reasoning, cleaner logic, and scalable learning — without relying on massive, uncontrollable parameter growth.
                </p>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary mr-3 text-sm">▶</span>
                  Built-In Verification, Not Heavy Filters
                </h2>
                <p className="text-muted-foreground">
                  Instead of a large verification pipeline, AMAI uses a streamlined funnel of factual, logical, and safety evaluators.
                  Every output is checked for coherence and trustworthiness before reaching the user — creating stable, interpretable AI without slowing down performance.
                </p>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary mr-3 text-sm">▶</span>
                  Replacing Bloat With Elegance
                </h2>
                <p className="text-muted-foreground">
                  No more billions of idle parameters.
                  AMAI focuses on activation-based computation, modular upgrades, and transparent traceable reasoning.
                  Modules can be replaced, improved, or expanded independently — giving us evolvable AI without inefficiency or complexity.
                </p>
              </div>
            </div>
            
            <div className="glass p-8 h-auto">
              <h3 className="text-xl font-semibold mb-6 text-center">Architecture Overview</h3>
              
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
            <h3 className="text-2xl font-semibold mb-6">Technical Approach</h3>
            
            <div className="space-y-6">
              <p className="text-muted-foreground">
                Our architecture departs from traditional transformer-based models in several key ways:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h4 className="font-semibold text-foreground">Modular Parameter Sharing</h4>
                  <p className="text-sm text-muted-foreground">
                    Rather than training one massive model, we train specialized modules that share a common interface but focus on specific knowledge domains.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-semibold text-foreground">Adaptive Activation Patterns</h4>
                  <p className="text-sm text-muted-foreground">
                    Only the modules relevant to the query are activated, dramatically reducing computational requirements while maintaining quality.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-semibold text-foreground">Multi-Stage Verification</h4>
                  <p className="text-sm text-muted-foreground">
                    Each output passes through multiple verification stages that check for accuracy, safety, and consistency before being delivered.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-semibold text-foreground">Continuous Integration Learning</h4>
                  <p className="text-sm text-muted-foreground">
                    New knowledge is validated against existing knowledge bases before being integrated into the appropriate modules.
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
