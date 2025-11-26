
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';
import { motion } from 'framer-motion';
import SEO from '@/components/SEO';

const Index = () => {
  const featuresRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  // Scroll animation
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

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({ 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: custom * 0.2,
        duration: 0.8, 
        ease: [0.215, 0.61, 0.355, 1]
      }
    })
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const line = {
    hidden: { width: 0 },
    visible: { width: '100%', transition: { duration: 0.8, ease: 'easeInOut' } }
  };

  const homeSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "LocalHouseLLM",
    "applicationCategory": "AI Platform",
    "description": "Modular AI architecture using AMAI and AICL for adaptive and scalable intelligent systems",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "operatingSystem": "Web",
    "softwareVersion": "0.4"
  };

  return (
    <Layout>
      <SEO
        title="LocalHouseLLM - Modular AI Architecture | AMAI & AICL Technology"
        description="Revolutionary modular AI architecture using AMAI and AICL. Build adaptive, scalable AI systems with built-in safety verification. Explore modular intelligence, live learning, and verified safety in AI language models."
        keywords="modular AI, AMAI, AICL, adaptive AI systems, AI architecture, modular language models, scalable intelligence, AI safety, verified AI, LocalHouseLLM, expert modules, AI communication"
        canonical="https://localhousellm.com/"
        schema={homeSchema}
      />
      {/* Hero Section */}
      <section className="bg-background relative h-screen flex items-center overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-muted/70 via-background to-background"></div>
          <div className="absolute w-[500px] h-[500px] left-1/2 -translate-x-1/2 top-1/3 -translate-y-1/2 rounded-full bg-foreground/5 blur-[100px] opacity-30"></div>
          <div className="absolute w-[300px] h-[300px] left-[20%] top-[30%] rounded-full bg-foreground/5 blur-[80px] opacity-20"></div>
          <div className="absolute w-[200px] h-[200px] right-[15%] bottom-[20%] rounded-full bg-foreground/5 blur-[60px] opacity-20"></div>
        </div>
        
        <div className="max-container relative z-10 pt-16">
          <motion.div 
            className="w-full flex flex-col items-center text-center"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div 
              className="mb-6 text-foreground font-bold text-4xl relative dark:text-foreground light:text-black"
              variants={fadeIn}
              custom={0}
            >
              <span className="font-lato relative z-10 text-black dark:text-white">\</span>
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-lato font-bold mb-6 tracking-tight text-foreground max-w-4xl leading-tight"
              variants={fadeIn}
              custom={1}
            >
              Redefining Language Models —
              <span className="text-gradient"> Modular. Adaptive. Safe.</span>
            </motion.h1>
            
            <motion.div
              className="overflow-hidden w-16 mb-6"
              variants={fadeIn}
              custom={2}
            >
              <motion.div
                className="h-[1px] bg-foreground/40"
                variants={line}
              />
            </motion.div>

            <motion.p 
              className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl"
              variants={fadeIn}
              custom={3}
            >
              Not bigger. <span className="text-foreground font-medium">Smarter.</span>
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-6 items-center justify-center w-full max-w-4xl"
              variants={fadeIn}
              custom={4}
            >
              <Link to="/vision" className="w-full sm:w-auto">
                <Button className="bg-black text-white hover:bg-black/90 dark:bg-foreground dark:text-background dark:hover:bg-foreground/90 text-base group px-6 py-2 w-full sm:w-auto">
                  Explore Our Vision
                  <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Animated down arrow */}
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <motion.button 
            onClick={() => featuresRef.current?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-foreground/10 rounded-full p-2 hover:bg-foreground/20 transition-colors"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <ArrowRight className="w-5 h-5 text-foreground rotate-90" />
          </motion.button>
        </motion.div>
      </section>
      
      {/* Features Grid */}
      <section ref={featuresRef} className="py-24 bg-background relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-muted/50 via-background to-background"></div>
        </div>
        
        <div className="max-container relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-lato font-bold mb-5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Why Modular AI Architecture is Different
            </motion.h2>
            
            <motion.div 
              className="h-[2px] w-16 bg-foreground/30 mx-auto mb-5"
              initial={{ width: 0 }}
              whileInView={{ width: 64 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            />
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div 
              className="feature-item feature-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -5,
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
                transition: { duration: 0.3 }
              }}
            >
              <div className="mb-5 w-12 h-12 rounded-md bg-foreground/10 flex items-center justify-center relative overflow-hidden">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-foreground/0 via-foreground/10 to-foreground/0"
                  initial={{ x: -100 }}
                  animate={{ x: 100 }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                />
              </div>
              <h3 className="text-xl font-lato font-bold mb-3 text-foreground">Modular Intelligence with Expert Modules</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">Specialized AI expert modules for different knowledge domains deliver precise, context-aware responses. Our modular AI architecture enables efficient computation without sacrificing accuracy.</p>
            </motion.div>
            
            <motion.div 
              className="feature-item feature-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -5,
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
                transition: { duration: 0.3 }
              }}
            >
              <div className="mb-5 w-12 h-12 rounded-md bg-foreground/10 flex items-center justify-center relative overflow-hidden">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-foreground/0 via-foreground/10 to-foreground/0"
                  initial={{ x: -100 }}
                  animate={{ x: 100 }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                />
              </div>
              <h3 className="text-xl font-lato font-bold mb-3 text-foreground">Adaptive Learning Systems</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">Our adaptive AI systems learn and improve continuously through AICL communication while maintaining strict privacy and safety standards. Experience AI that evolves with real-world usage.</p>
            </motion.div>
            
            <motion.div 
              className="feature-item feature-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -5,
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
                transition: { duration: 0.3 }
              }}
            >
              <div className="mb-5 w-12 h-12 rounded-md bg-foreground/10 flex items-center justify-center relative overflow-hidden">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-foreground/0 via-foreground/10 to-foreground/0"
                  initial={{ x: -100 }}
                  animate={{ x: 100 }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                />
              </div>
              <h3 className="text-xl font-lato font-bold mb-3 text-foreground">Built-In AI Safety Verification</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">Multi-stage safety verification ensures every AI output is reliable, accurate, and trustworthy. Our funnel-based verification system provides enterprise-grade AI safety for all applications.</p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Terminal Section */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="max-container relative z-10">
          <motion.div 
            className="premium-glass border-border p-8 text-left font-mono text-base mx-auto max-w-3xl relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            whileHover={{ 
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.10)",
              borderColor: "hsl(var(--border))",
            }}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <span className="text-muted-foreground text-xs font-sans flex items-center">
                <Terminal className="w-3.5 h-3.5 mr-1.5" />
                LocalHouseLLM
              </span>
            </div>

            <div className="space-y-3 text-emerald-400 font-mono font-light tracking-tight">
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">$</span>
                <motion.span 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  localhouse --run --module="science"
                </motion.span>
              </div>
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="text-muted-foreground"
              >
                Loading modules...
              </motion.div>
              <motion.div 
                className="text-emerald-300"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.9, duration: 0.5 }}
              >
                <span className="mr-1.5">✓</span>Core initialized
              </motion.div>
              <motion.div 
                className="text-emerald-300"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1.1, duration: 0.5 }}
              >
                <span className="mr-1.5">✓</span>Module [science] loaded
              </motion.div>
              <motion.div 
                className="text-emerald-300"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1.3, duration: 0.5 }}
              >
                <span className="mr-1.5">✓</span>Verification layer active [1000/1000]
              </motion.div>
              <motion.div 
                className="border-l border-emerald-400/70 pl-3 mt-4 pt-1"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1.5, duration: 0.5 }}
              >
                <div className="text-foreground">$LocalHouseLLM ready. Ask your question.</div>
                <div className="h-5 w-[1px] bg-emerald-400 animate-pulse inline-block ml-1"></div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Vision Teaser */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="max-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-lato font-bold mb-5 text-foreground">The Future of AI: Modular & Adaptive Architecture</h2>
              <motion.div 
                className="h-[2px] w-16 bg-foreground/30 mb-6"
                initial={{ width: 0 }}
                whileInView={{ width: 64 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
              />
              <p className="text-muted-foreground mb-6 text-base leading-relaxed">
                The era of brute-force AI scaling is ending. We're pioneering modular AI architecture inspired by nature's intelligence: specialized expert modules, adaptive learning systems, and comprehensive safety protocols. Discover how AMAI and AICL create smarter, not just bigger, AI systems.
              </p>
              <Link to="/vision">
                <Button variant="outline" className="border-border text-foreground bg-transparent hover:bg-foreground/5 hover:border-border text-sm group">
                  Learn More <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </Link>
            </motion.div>
            
            <motion.div 
              className="premium-glass p-8 border border-border"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              whileHover={{ boxShadow: "0 20px 40px rgba(0, 0, 0, 0.05)" }}
            >
              <div className="space-y-6">
                <motion.div 
                  className="flex items-start"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <div className="w-10 h-10 rounded-full bg-foreground/10 flex items-center justify-center mr-4 mt-1">
                    <span className="text-foreground font-medium font-lato text-base">1</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold font-lato mb-2 text-foreground">AICL Communication Layer</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">AICL coordinates expert modules, routes tasks, and ensures structured AI communication for faster reasoning.</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex items-start"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="w-10 h-10 rounded-full bg-foreground/10 flex items-center justify-center mr-4 mt-1">
                    <span className="text-foreground font-medium font-lato text-base">2</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold font-lato mb-2 text-foreground">Adaptive Verification</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">Multi-stage verification ensures AI outputs are factually accurate and safe before reaching users.</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex items-start"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <div className="w-10 h-10 rounded-full bg-foreground/10 flex items-center justify-center mr-4 mt-1">
                    <span className="text-foreground font-medium font-lato text-base">3</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold font-lato mb-2 text-foreground">Replacing bloat with elegance</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">No more tens of billions of unused parameters. Only precision, activation-based computation.</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
