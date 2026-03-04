
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';
import { motion } from 'framer-motion';
import SEO from '@/components/SEO';

const Index = () => {
  const featuresRef = useRef<HTMLDivElement>(null);

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
      el.classList.add('opacity-0', 'translate-y-5');
    });
    return () => observer.disconnect();
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 15 },
    visible: (custom: number) => ({ 
      opacity: 1, y: 0,
      transition: { delay: custom * 0.15, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }
    })
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } }
  };

  const line = {
    hidden: { width: 0 },
    visible: { width: '100%', transition: { duration: 0.8, ease: 'easeInOut' } }
  };

  const homeSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "LocalHouseLLM — Modular AI Architecture",
    "description": "Build private, modular AI with Anvira. Local-first AI models, enterprise on-prem infrastructure, and edge AI for robotics.",
    "url": "https://localhousellm.com/",
    "mainEntity": {
      "@type": "SoftwareApplication",
      "name": "Anvira",
      "applicationCategory": "AI Platform",
      "description": "Modular AI that runs locally — personal (o1), enterprise (o1e), and robotics (h1) variants",
      "operatingSystem": "Cross-platform"
    }
  };

  return (
    <Layout>
      <SEO
        title="LocalHouseLLM - Modular AI Architecture | AMAI & AICL Technology"
        description="Revolutionary modular AI using AMAI expert modules and AICL communication. Build adaptive, scalable AI with built-in safety verification. Experience modular intelligence that learns, adapts, and evolves safely."
        keywords="LocalHouseLLM, Local House AI, modular AI architecture, AMAI, AICL, adaptive AI systems, expert modules, AI safety verification, modular language models, scalable intelligence, verified AI, distributed AI architecture, specialized AI modules, AI communication layer, activation-based AI, efficient AI systems"
        canonical="https://localhousellm.com/"
        schema={homeSchema}
      />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] md:h-screen flex items-center overflow-hidden">
        <div className="max-container relative z-10 pt-8 md:pt-16">
          <motion.div 
            className="w-full flex flex-col items-center text-center"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div 
              className="mb-4 md:mb-6 text-foreground font-semibold text-3xl md:text-4xl"
              variants={fadeIn}
              custom={0}
            >
              <span className="font-lato text-white">\</span>
            </motion.div>
            
            <motion.h1 
              className="text-3xl md:text-5xl lg:text-6xl font-lato font-semibold mb-4 md:mb-6 tracking-tight text-foreground max-w-4xl leading-tight px-2"
              variants={fadeIn}
              custom={1}
            >
              Redefining Language Models —
              <span className="text-gradient"> Modular. Adaptive. Safe.</span>
            </motion.h1>
            
            <motion.div
              className="overflow-hidden w-12 md:w-16 mb-4 md:mb-6"
              variants={fadeIn}
              custom={2}
            >
              <motion.div className="h-[1px] bg-foreground/40" variants={line} />
            </motion.div>

            <motion.p 
              className="text-base md:text-xl text-muted-foreground mb-8 md:mb-12 max-w-2xl px-4"
              variants={fadeIn}
              custom={3}
            >
              Not bigger. <span className="text-foreground font-medium">Smarter.</span>
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full max-w-4xl px-4"
              variants={fadeIn}
              custom={4}
            >
              <Link to="/vision" className="w-full sm:w-auto">
                <Button className="bg-white/90 text-black hover:bg-white text-sm md:text-base group px-6 py-2 w-full sm:w-auto backdrop-blur-sm">
                  Explore Our Vision
                  <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
        
        <motion.div 
          className="absolute bottom-6 md:bottom-10 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <motion.button 
            onClick={() => featuresRef.current?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-foreground/10 backdrop-blur-sm rounded-full p-2 hover:bg-foreground/20 transition-colors"
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-foreground rotate-90" />
          </motion.button>
        </motion.div>
      </section>
      
      {/* Features Grid */}
      <section ref={featuresRef} className="py-16 md:py-24 relative overflow-hidden">
        <div className="max-container relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-10 md:mb-16"
          >
            <motion.h2 
              className="text-2xl md:text-3xl lg:text-4xl font-lato font-semibold mb-4 md:mb-5 px-2"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              Why Modular AI Architecture is Different
            </motion.h2>
            
            <motion.div 
              className="h-[1px] w-12 md:w-16 bg-foreground/30 mx-auto mb-4"
              initial={{ width: 0 }}
              whileInView={{ width: 64 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            />
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {[
              {
                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />,
                title: "Modular Intelligence with Expert Modules",
                desc: "Specialized AI expert modules for different knowledge domains deliver precise, context-aware responses. Our modular AI architecture enables efficient computation without sacrificing accuracy."
              },
              {
                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />,
                title: "Adaptive Learning Systems",
                desc: "Our adaptive AI systems learn and improve continuously through AICL communication while maintaining strict privacy and safety standards. Experience AI that evolves with real-world usage."
              },
              {
                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />,
                title: "Built-In AI Safety Verification",
                desc: "Multi-stage safety verification ensures every AI output is reliable, accurate, and trustworthy. Our funnel-based verification system provides enterprise-grade AI safety for all applications."
              }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                className="feature-item feature-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                viewport={{ once: true }}
                whileHover={{ y: -4, transition: { duration: 0.25 } }}
              >
                <div className="mb-4 w-10 h-10 md:w-12 md:h-12 rounded-md bg-foreground/10 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 md:w-6 md:h-6 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {feature.icon}
                  </svg>
                </div>
                <h3 className="text-lg md:text-xl font-lato font-semibold mb-2 md:mb-3 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground text-xs md:text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Terminal Section */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="max-container relative z-10">
          <motion.div 
            className="premium-glass p-5 md:p-8 text-left font-mono text-sm md:text-base mx-auto max-w-3xl relative"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <div className="flex items-center gap-1.5 md:gap-2">
                <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-foreground/30"></div>
                <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-foreground/20"></div>
                <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-foreground/15"></div>
              </div>
              <span className="text-muted-foreground text-xs font-sans flex items-center">
                <Terminal className="w-3 h-3 md:w-3.5 md:h-3.5 mr-1.5" />
                LocalHouseLLM
              </span>
            </div>

            <div className="space-y-2 md:space-y-3 text-foreground/80 font-mono font-light tracking-tight text-xs md:text-sm">
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">$</span>
                <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4, duration: 0.4 }}>
                  localhouse --run --module="science"
                </motion.span>
              </div>
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.6, duration: 0.4 }} className="text-muted-foreground">
                Loading modules...
              </motion.div>
              {["Core initialized", "Module [science] loaded", "Verification layer active [1000/1000]"].map((text, i) => (
                <motion.div key={i} className="text-foreground/70" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.8 + i * 0.15, duration: 0.4 }}>
                  <span className="mr-1.5">✓</span>{text}
                </motion.div>
              ))}
              <motion.div className="border-l border-foreground/30 pl-3 mt-3 pt-1" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 1.3, duration: 0.4 }}>
                <div className="text-foreground">$LocalHouseLLM ready. Ask your question.</div>
                <div className="h-4 w-[1px] bg-foreground/60 animate-pulse inline-block ml-1"></div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Vision Teaser */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="max-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-lato font-semibold mb-4 md:mb-5 text-foreground">The Future of AI: Modular & Adaptive Architecture</h2>
              <motion.div 
                className="h-[1px] w-12 md:w-16 bg-foreground/30 mb-4 md:mb-6"
                initial={{ width: 0 }}
                whileInView={{ width: 64 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              />
              <p className="text-muted-foreground mb-5 md:mb-6 text-sm md:text-base leading-relaxed">
                The era of brute-force AI scaling is ending. We're pioneering modular AI architecture inspired by nature's intelligence: specialized expert modules, adaptive learning systems, and comprehensive safety protocols.
              </p>
              <Link to="/vision">
                <Button variant="outline" className="border-white/15 text-foreground bg-transparent hover:bg-white/5 text-sm group">
                  Learn More <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </Link>
            </motion.div>
            
            <motion.div 
              className="premium-glass p-6 md:p-8"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <div className="space-y-5 md:space-y-6">
                {[
                  { num: "1", title: "AICL Communication Layer", desc: "AICL coordinates expert modules, routes tasks, and ensures structured AI communication for faster reasoning." },
                  { num: "2", title: "Adaptive Verification", desc: "Multi-stage verification ensures AI outputs are factually accurate and safe before reaching users." },
                  { num: "3", title: "Replacing bloat with elegance", desc: "No more tens of billions of unused parameters. Only precision, activation-based computation." }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    className="flex items-start"
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.15 }}
                    viewport={{ once: true }}
                  >
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-foreground/10 flex items-center justify-center mr-3 md:mr-4 mt-1 shrink-0">
                      <span className="text-foreground font-medium font-lato text-sm md:text-base">{item.num}</span>
                    </div>
                    <div>
                      <h3 className="text-base md:text-lg font-semibold font-lato mb-1.5 md:mb-2 text-foreground">{item.title}</h3>
                      <p className="text-muted-foreground text-xs md:text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
