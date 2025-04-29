
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';

const Index = () => {
  const featuresRef = useRef<HTMLDivElement>(null);

  // Simple scroll animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const featureElements = document.querySelectorAll('.feature-item');
    featureElements.forEach((el) => {
      observer.observe(el);
      el.classList.remove('animate-fade-in');
      el.style.opacity = '0';
    });

    return () => observer.disconnect();
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-richBlack relative overflow-hidden">
        {/* Gradient backdrop */}
        <div className="absolute inset-0 bg-gradient-to-b from-cyberBlue/10 to-transparent pointer-events-none" />
        
        <div className="max-container min-h-[calc(100vh-80px)] flex items-center">
          <div className="w-full py-20 md:py-32 flex flex-col items-center text-center">
            <div className="w-16 h-16 mb-6 rounded-xl bg-gradient-to-tr from-cyberBlue to-neonMint flex items-center justify-center text-richBlack font-bold text-xl animate-pulse-light">
              LH
            </div>
            
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight text-white max-w-3xl">
              Redefining Language Models —
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyberBlue to-neonMint"> Modular. Adaptive. Safe.</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-secondaryText mb-12 max-w-2xl">
              Not bigger. <span className="text-white font-medium">Smarter.</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/vision">
                <Button className="px-8 py-6 text-lg bg-cyberBlue text-black hover:bg-cyberBlue/90">
                  Explore Our Vision
                </Button>
              </Link>
              <Link to="/demo">
                <Button variant="outline" className="px-8 py-6 text-lg border-white/20 hover:bg-white/5">
                  Try the Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Animated down arrow */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <button 
            onClick={() => featuresRef.current?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-white/10 rounded-full p-2 hover:bg-white/20 transition-colors"
          >
            <ArrowRight className="w-6 h-6 text-white rotate-90" />
          </button>
        </div>
      </section>
      
      {/* Features Grid */}
      <section ref={featuresRef} className="py-20 bg-richBlack relative overflow-hidden">
        <div className="max-container">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">Why We're Different</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="feature-item feature-card">
              <div className="mb-4 w-12 h-12 rounded-md bg-cyberBlue/10 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-cyberBlue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Modular Intelligence</h3>
              <p className="text-secondaryText">Specialized models for word categories leading to more accurate and context-aware responses.</p>
            </div>
            
            <div className="feature-item feature-card">
              <div className="mb-4 w-12 h-12 rounded-md bg-neonMint/10 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-neonMint" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Live Learning</h3>
              <p className="text-secondaryText">Adaptive models that grow smarter from usage while maintaining privacy and safety guardrails.</p>
            </div>
            
            <div className="feature-item feature-card">
              <div className="mb-4 w-12 h-12 rounded-md bg-cyberBlue/10 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-cyberBlue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Verified Safety</h3>
              <p className="text-secondaryText">1,000-point funnel-based verification layer ensures outputs are reliable, accurate, and safe.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Demo Teaser */}
      <section className="py-20 bg-gradient-to-b from-richBlack to-black relative overflow-hidden">
        <div className="max-container flex flex-col items-center text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Try the Demo</h2>
          <p className="text-secondaryText max-w-2xl mb-12">
            Experience our vision for the future of language models. This demo is powered by Gemini API while our modular engine is under construction.
          </p>
          
          <Link to="/demo">
            <Button className="px-8 py-6 text-lg bg-gradient-to-r from-cyberBlue to-neonMint text-black hover:opacity-90">
              Jump to Demo <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
          
          {/* Decorative elements */}
          <div className="mt-16 w-full max-w-4xl h-48 bg-gradient-to-b from-secondary to-transparent rounded-t-xl border-t border-x border-white/10" />
        </div>
      </section>
      
      {/* Vision Teaser */}
      <section className="py-20 bg-black">
        <div className="max-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Vision</h2>
              <p className="text-secondaryText mb-6">
                The age of brute-force scaling is fading. We're building language models the way nature builds intelligence: with specialization, adaptation, and caution.
              </p>
              <Link to="/vision">
                <Button variant="outline" className="px-6 py-2 border-cyberBlue text-cyberBlue hover:bg-cyberBlue/10">
                  Learn More <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
            
            <div className="glass p-8 border-white/10 glow-border">
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-cyberBlue/10 flex items-center justify-center mr-4 mt-1">
                    <span className="text-cyberBlue font-medium">1</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Modular Knowledge</h3>
                    <p className="text-secondaryText">We segment words and concepts into micro-expert modules for precise contextual understanding.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-cyberBlue/10 flex items-center justify-center mr-4 mt-1">
                    <span className="text-cyberBlue font-medium">2</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Live Learning with Safety</h3>
                    <p className="text-secondaryText">Passive and active learning with a 1,000-funnel verification pipeline — allowing evolution without sacrificing control.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-cyberBlue/10 flex items-center justify-center mr-4 mt-1">
                    <span className="text-cyberBlue font-medium">3</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Replacing bloat with elegance</h3>
                    <p className="text-secondaryText">No more tens of billions of unused parameters. Only precision, activation-based computation.</p>
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

export default Index;
