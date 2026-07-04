import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Shield, Cpu, Network, ArrowRight, Zap, Eye, Lock } from 'lucide-react';

const Anvira = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
  };

  const staggerChildren = {
    visible: { transition: { staggerChildren: 0.12 } }
  };

  const products = [
    {
      name: 'anvira o1',
      edition: 'standard edition',
      description: 'personal intelligence engine for everyday productivity',
      bullets: ['10+ expert modules', 'local-first privacy', 'adaptive learning'],
      link: '/anvira/o1',
      stats: { experts: '10+', bestFor: 'personal use', mode: 'local' }
    },
    {
      name: 'anvira o1e',
      edition: 'enterprise edition',
      description: 'secure, scalable intelligence infrastructure for organizations',
      bullets: ['multi-user management', 'audit & compliance', 'on-premise deployment'],
      link: '/anvira/o1e',
      stats: { experts: '25+', bestFor: 'enterprise', mode: 'on-prem' }
    },
    {
      name: 'anvira h1',
      edition: 'embedded edition',
      description: 'compact AI brain for robotics and edge devices',
      bullets: ['real-time perception', 'low-power optimization', 'offline operation'],
      link: '/anvira/h1',
      stats: { experts: '8+', bestFor: 'robotics/IoT', mode: 'edge' }
    }
  ];

  const features = [
    {
      icon: Lock,
      title: 'local-first',
      description: 'run without the cloud, keep privacy in your hands.'
    },
    {
      icon: Cpu,
      title: 'modular experts',
      description: 'specialized models for each task — composable and auditable.'
    },
    {
      icon: Network,
      title: 'aicl backbone',
      description: 'deterministic inter-module language for safe orchestration.'
    }
  ];

  const whyAnvira = [
    { icon: Shield, text: 'privacy-first' },
    { icon: Eye, text: 'auditable reasoning' },
    { icon: Zap, text: 'adaptive learning (local)' },
    { icon: Cpu, text: 'edge-ready' }
  ];

  return (
    <Layout>
      <SEO
        title="anvira — modular local AI | LocalHouseLLM"
        description="anvira — a family of modular, local-first AI products from LocalHouseLLM. Explore anvira o1 (standard), anvira o1e (enterprise), and anvira h1 (embedded)."
        keywords="anvira, modular AI, local AI, LocalHouseLLM, anvira o1, anvira o1e, anvira h1, private AI, edge AI"
        canonical="https://localhousellm.lovable.app/anvira"
      />

      {/* Hero Section */}
      <section className="min-h-[80vh] flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        
        <div className="max-container text-center relative z-10 py-20">
          <motion.h1
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-5xl md:text-7xl font-light mb-4 uppercase"
            style={{ letterSpacing: '0.25em' }}
          >
            Anvira — Modular Local AI Architecture
          </motion.h1>

          
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
            className="text-xl md:text-2xl text-muted-foreground mb-4"
          >
            modular intelligence — personal, enterprise, embedded
          </motion.p>
          
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            className="text-muted-foreground max-w-2xl mx-auto mb-8"
          >
            A family of modular AI products built to run locally, scale securely, and adapt over time.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/anvira/o1">
              <Button 
                size="lg" 
                className="group transition-all duration-300 hover:scale-[1.03] hover:shadow-lg"
                aria-label="Explore anvira o1 standard edition"
              >
                explore ANVIRA o1
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button 
                variant="outline" 
                size="lg"
                className="transition-all duration-300 hover:scale-[1.03]"
                aria-label="Contact sales team"
              >
                contact sales
              </Button>
            </Link>
          </motion.div>

          {/* Hero Device Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
            className="mt-16 grid grid-cols-3 gap-4 max-w-4xl mx-auto"
          >
            {['o1', 'o1e', 'h1'].map((variant, i) => (
              <motion.div
                key={variant}
                className="glass rounded-2xl p-6 text-center"
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300 }}
                style={{ transformOrigin: 'center bottom' }}
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center">
                  {i === 0 && <Cpu className="w-8 h-8 text-primary" />}
                  {i === 1 && <Shield className="w-8 h-8 text-primary" />}
                  {i === 2 && <Zap className="w-8 h-8 text-primary" />}
                </div>
                <p className="font-semibold text-sm">{variant}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Quick Features Strip */}
      <section className="py-16 border-t border-border">
        <div className="max-container">
          <motion.div
            variants={staggerChildren}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="grid md:grid-cols-3 gap-8"
          >
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                variants={fadeInUp}
                className="glass rounded-xl p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg hover:border-primary/30 focus-within:-translate-y-1.5 focus-within:shadow-lg"
                tabIndex={0}
                role="article"
                aria-label={feature.title}
              >
                <feature.icon className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Product Selector Grid */}
      <section className="py-20 bg-secondary/30">
        <div className="max-container">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-12"
          >
            choose your edition
          </motion.h2>
          
          <motion.div
            variants={staggerChildren}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="grid md:grid-cols-3 gap-6"
          >
            {products.map((product) => (
              <motion.div
                key={product.name}
                variants={fadeInUp}
                className="group perspective-1000"
              >
                <div className="relative transition-transform duration-300 transform-style-3d group-hover:rotate-y-180">
                  {/* Front */}
                  <div className="glass rounded-2xl p-8 backface-hidden">
                    <span className="text-xs uppercase tracking-wider text-primary font-medium">
                      {product.edition}
                    </span>
                    <h3 className="text-2xl font-bold mt-2 mb-3">{product.name}</h3>
                    <p className="text-muted-foreground text-sm mb-6">{product.description}</p>
                    <ul className="space-y-2 mb-6">
                      {product.bullets.map((bullet) => (
                        <li key={bullet} className="text-sm flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                    <Link 
                      to={product.link}
                      className="text-primary text-sm font-medium inline-flex items-center gap-1 hover:gap-2 transition-all"
                      aria-label={`Learn more about ${product.name}`}
                    >
                      learn more <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Anvira */}
      <section className="py-20">
        <div className="max-container">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-12"
          >
            why ANVIRA
          </motion.h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {whyAnvira.map((item, i) => (
              <motion.div
                key={item.text}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-6"
              >
                <item.icon className="w-8 h-8 mx-auto mb-3 text-primary" />
                <p className="font-medium">{item.text}</p>
              </motion.div>
            ))}
          </div>

          {/* Flow Diagram */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-8 max-w-3xl mx-auto"
          >
            <div className="flex items-center justify-between gap-2 text-sm overflow-x-auto pb-4">
              {['Orchestrator', 'AICL Router', 'Experts', 'Aggregator', 'Response'].map((step, i) => (
                <div key={step} className="flex items-center gap-2 whitespace-nowrap">
                  <span className="px-3 py-2 rounded-lg bg-primary/10 text-primary font-medium">
                    {step}
                  </span>
                  {i < 4 && (
                    <motion.span
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
                      className="text-primary"
                    >
                      →
                    </motion.span>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Partners Placeholder */}
      <section className="py-16 border-t border-border">
        <div className="max-container text-center">
          <p className="text-muted-foreground mb-6">trusted by forward-thinking teams</p>
          <div className="flex justify-center gap-12 opacity-50 mb-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-24 h-8 bg-muted rounded" />
            ))}
          </div>
          <Link to="/contact" className="text-primary text-sm hover:underline">
            join the partner program →
          </Link>
        </div>
      </section>

      {/* Footer CTA */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="py-20 bg-primary/5"
      >
        <div className="max-container text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">ready to try ANVIRA?</h2>
          <Link to="/contact">
            <Button 
              size="lg"
              className="transition-all duration-300 hover:scale-[1.03] hover:shadow-lg"
              aria-label="Request early access to anvira"
            >
              request early access
            </Button>
          </Link>
        </div>
      </motion.section>
    </Layout>
  );
};

export default Anvira;
