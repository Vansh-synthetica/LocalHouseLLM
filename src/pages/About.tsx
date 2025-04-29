
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

// Sample team members - would be replaced with real team
const teamMembers = [
  {
    id: 1,
    name: "Alex Chen",
    role: "Founder & AI Researcher",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Jordan Taylor",
    role: "Chief Technology Officer",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Sam Rodriguez",
    role: "Lead ML Engineer",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop"
  },
  {
    id: 4,
    name: "Taylor Morgan",
    role: "Research Scientist",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop"
  }
];

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
          
          {/* Team */}
          <h2 className="text-3xl font-bold mb-8 text-center">Our Team</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {teamMembers.map(member => (
              <div key={member.id} className="glass hover-glow text-center p-4">
                <div 
                  className="w-32 h-32 rounded-full mx-auto mb-4 bg-cover bg-center border-2 border-white/10"
                  style={{ backgroundImage: `url(${member.image})` }}
                />
                <h3 className="text-lg font-semibold">{member.name}</h3>
                <p className="text-sm text-secondaryText">{member.role}</p>
              </div>
            ))}
          </div>
          
          {/* Join Us */}
          <div className="bg-gradient-to-r from-cyberBlue/20 to-neonMint/20 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Join Us</h2>
            <p className="text-lg text-secondaryText mb-6 max-w-2xl mx-auto">
              The team behind LocalHouseLLM is forming now. 
              We're looking for collaborators, systems engineers, research scientists, and bold thinkers.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact">
                <Button className="bg-cyberBlue text-black hover:bg-cyberBlue/90">
                  Contact Us
                </Button>
              </Link>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="border-white/20 hover:bg-white/5">
                  GitHub
                </Button>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
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
