
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const About = () => {
  return (
    <Layout>
      <section className="py-20">
        <div className="max-container">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About Us</h1>
            <p className="text-xl text-secondaryText max-w-3xl mx-auto">
              We're reshaping the way language models are built — modular, responsive, and fundamentally safer.
            </p>
          </div>
          
          {/* Mission */}
          <div className="glass p-8 mb-16">
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-lg text-secondaryText">
              LocalHouseLLM was founded with a clear mission: to challenge the status quo of AI development. 
              We believe that simply scaling up model size and parameter count is not the path to true machine intelligence. 
              Instead, we're focused on creating modular, specialized systems that can reason, adapt, and grow safely over time.
            </p>
          </div>
          
          {/* Leadership */}
          <h2 className="text-3xl font-bold mb-8 text-center">Leadership</h2>
          
          <div className="glass hover-glow text-center p-8 mb-16 max-w-md mx-auto">
            <h3 className="text-xl font-semibold">Vansh Bukkarwal & Shandie Ventura</h3>
            <p className="text-secondaryText">Founder & CEO</p>
          </div>
          
          {/* Join Us */}
          <div className="bg-gradient-to-r from-cyberBlue/30 to-neonMint/30 rounded-lg p-8 text-center border border-white/10">
            <h2 className="text-2xl font-bold mb-4">Join Us</h2>
            <p className="text-lg text-secondaryText mb-6 max-w-2xl mx-auto">
              The team behind LocalHouseLLM is forming now. 
              We're looking for collaborators, systems engineers, research scientists, and bold thinkers.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact">
                <Button className="bg-cyberBlue text-black hover:bg-cyberBlue/90 shadow-2xl hover:shadow-cyberBlue/40 transform hover:scale-105 transition-all">
                  Contact Us
                </Button>
              </Link>
              <a href="#" onClick={(e) => { e.preventDefault(); alert('404 Not Found'); }}>
                <Button variant="outline" className="border-white/20 hover:bg-white/5">
                  GitHub
                </Button>
              </a>
              <a href="#" onClick={(e) => { e.preventDefault(); alert('404 Not Found'); }}>
                <Button variant="outline" className="border-white/20 hover:bg-white/5">
                  Twitter
                </Button>
              </a>
            </div>
          </div>
          
          {/* Timeline */}
          <div className="mt-20">
            <h2 className="text-3xl font-bold mb-8 text-center">Our Journey</h2>
            
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-secondary/50"></div>
              
              {/* Timeline items */}
              <div className="space-y-12">
                <div className="relative">
                  <div className="md:absolute md:left-1/2 md:transform md:-translate-x-1/2 w-4 h-4 rounded-full bg-cyberBlue shadow-glow"></div>
                  <div className="md:w-1/2 md:pr-8 md:text-right ml-6 md:ml-0">
                    <h3 className="font-semibold">April 2025</h3>
                    <p className="text-secondaryText">LocalHouseLLM founded</p>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="md:absolute md:left-1/2 md:transform md:-translate-x-1/2 w-4 h-4 rounded-full bg-cyberBlue shadow-glow"></div>
                  <div className="md:w-1/2 md:pl-8 md:ml-auto ml-6 md:text-left">
                    <h3 className="font-semibold">July 2025</h3>
                    <p className="text-secondaryText">Initial research whitepaper published</p>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="md:absolute md:left-1/2 md:transform md:-translate-x-1/2 w-4 h-4 rounded-full bg-cyberBlue shadow-glow"></div>
                  <div className="md:w-1/2 md:pr-8 md:text-right ml-6 md:ml-0">
                    <h3 className="font-semibold">October 2025</h3>
                    <p className="text-secondaryText">First prototype of modular LLM system</p>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="md:absolute md:left-1/2 md:transform md:-translate-x-1/2 w-4 h-4 rounded-full bg-cyberBlue shadow-glow"></div>
                  <div className="md:w-1/2 md:pl-8 md:ml-auto ml-6 md:text-left">
                    <h3 className="font-semibold">Q1 2026</h3>
                    <p className="text-secondaryText">Alpha release planned</p>
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
