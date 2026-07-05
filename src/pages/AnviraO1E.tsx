import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { 
  Shield, Server, Users, FileCheck, Plug, Wrench, 
  Lock, Eye, Building2, Scale, FileText, Briefcase,
  ArrowRight, Download, CheckCircle2
} from 'lucide-react';
import { useState } from 'react';

const AnviraO1E = () => {
  const [showSecurityModal, setShowSecurityModal] = useState(false);

  const fadeInUp = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
  };

  const staggerChildren = {
    visible: { transition: { staggerChildren: 0.1 } }
  };

  const features = [
    { icon: Lock, title: 'Security & Compliance', desc: 'End-to-end encryption, audit trails, and compliance-ready infrastructure' },
    { icon: Server, title: 'On-Prem Deployment', desc: 'Air-gap support, full control over your data and infrastructure' },
    { icon: Users, title: 'Multi-User & RBAC', desc: 'Role-based access control with team and department management' },
    { icon: FileCheck, title: 'SLAs & Support', desc: 'Enterprise-grade support packages with guaranteed uptime' },
    { icon: Plug, title: 'Integrations', desc: 'APIs, database connectors, SSO, and workflow automation' },
    { icon: Wrench, title: 'Custom Engineering', desc: 'Adapter services and custom module development' },
  ];

  const useCases = [
    { icon: Building2, title: 'Finance Analytics', desc: 'Secure financial analysis and reporting with full audit trails' },
    { icon: Scale, title: 'Legal Summarization', desc: 'Contract analysis with risk flagging and compliance checks' },
    { icon: FileText, title: 'Knowledge Base', desc: 'Internal documentation assistant with access control' },
    { icon: Briefcase, title: 'R&D Assistant', desc: 'Secure research collaboration without data exposure' },
  ];

  const pricingTiers = [
    { name: 'SMB', desc: 'For small teams', cta: 'contact sales' },
    { name: 'Mid-Market', desc: 'For growing organizations', cta: 'contact sales' },
    { name: 'Enterprise', desc: 'For large deployments', cta: 'contact sales' },
  ];

  return (
    <Layout>
      <SEO
        title="anvira o1e — enterprise edition | LocalHouseLLM"
        description="anvira o1e is a modular intelligence platform for enterprises — on-premise, secure, scalable, and auditable."
        keywords="anvira o1e, enterprise AI, on-premise AI, secure AI, auditable AI, enterprise intelligence, LocalHouseLLM"
        canonical="https://localhousellm.com/anvira/o1e"
      />

      {/* Hero */}
      <section className="min-h-[70vh] flex items-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
        
        <div className="max-container relative z-10 py-20">
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="max-w-3xl"
          >
            <Link to="/anvira" className="text-primary text-sm hover:underline mb-4 inline-block">
              ← back to anvira
            </Link>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">anvira o1e</h1>
            <p className="text-xl text-muted-foreground mb-2">enterprise edition</p>
            <p className="text-2xl font-medium mb-6">enterprise-grade intelligence infrastructure</p>
            
            <p className="text-muted-foreground leading-relaxed mb-8 max-w-2xl">
              anvira o1e is engineered for organizations that need high-performance, secure, and scalable on-premise intelligence. it includes upgraded expert modules, enhanced safety layers, multi-user management, end-to-end encryption, audit logs, and enterprise-grade reliability. o1e integrates with internal databases, teams, and workflows — giving companies a private alternative to cloud AI with full control, zero external data sharing, and extreme speed.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact">
                <Button 
                  size="lg"
                  className="group transition-all duration-300 hover:scale-[1.03] hover:shadow-lg"
                  aria-label="Request enterprise demo for anvira o1e"
                >
                  request enterprise demo
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Button 
                variant="outline" 
                size="lg"
                className="transition-all duration-300 hover:scale-[1.03]"
                aria-label="Download specification sheet"
              >
                <Download className="mr-2 h-4 w-4" />
                download spec sheet
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enterprise Features Grid */}
      <section className="py-20 bg-secondary/30">
        <div className="max-container">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-12"
          >
            enterprise features
          </motion.h2>
          
          <motion.div
            variants={staggerChildren}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                variants={fadeInUp}
                className="glass rounded-xl p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg group"
              >
                <feature.icon className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Architecture & Auditability */}
      <section className="py-20">
        <div className="max-container">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-4"
          >
            architecture & auditability
          </motion.h2>
          <p className="text-center text-muted-foreground mb-12 max-w-xl mx-auto">
            every response tracked with full module provenance
          </p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-8 max-w-4xl mx-auto"
          >
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm mb-8">
              {['AICL Packets', 'Router', 'Verifiers', 'Module Registry', 'Audit Log'].map((step, i) => (
                <div key={step} className="flex items-center gap-2">
                  <span className="px-4 py-2 rounded-lg bg-primary/10 text-primary font-medium">
                    {step}
                  </span>
                  {i < 4 && <span className="text-muted-foreground">→</span>}
                </div>
              ))}
            </div>
            
            <div className="border-t border-border pt-6">
              <p className="text-sm text-muted-foreground mb-4">Audit Trail Example:</p>
              <div className="bg-secondary/50 rounded-lg p-4 font-mono text-xs space-y-2">
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <span className="text-primary">timestamp:</span> 2024-12-12T14:32:01Z
                </motion.p>
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  <span className="text-primary">module:</span> finance_analyst_v2
                </motion.p>
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                >
                  <span className="text-primary">user:</span> analyst_01 | <span className="text-primary">dept:</span> finance
                </motion.p>
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 }}
                >
                  <span className="text-primary">verified:</span> <CheckCircle2 className="inline w-3 h-3 text-green-500" /> safety_check_passed
                </motion.p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 bg-secondary/30">
        <div className="max-container">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-12"
          >
            use cases
          </motion.h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {useCases.map((useCase, i) => (
              <motion.div
                key={useCase.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-xl p-6 text-center"
              >
                <useCase.icon className="w-10 h-10 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">{useCase.title}</h3>
                <p className="text-sm text-muted-foreground">{useCase.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing & Procurement */}
      <section className="py-20">
        <div className="max-container">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-12"
          >
            pricing & procurement
          </motion.h2>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {pricingTiers.map((tier, i) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-xl p-6 text-center"
              >
                <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{tier.desc}</p>
                <Link to="/contact">
                  <Button variant="outline" size="sm" className="transition-all hover:scale-[1.03]">
                    {tier.cta}
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Security & Compliance */}
      <section className="py-16 border-t border-border">
        <div className="max-container text-center">
          <Button
            variant="outline"
            onClick={() => setShowSecurityModal(true)}
            className="transition-all hover:scale-[1.03]"
            aria-label="View security and compliance details"
          >
            <Shield className="mr-2 h-4 w-4" />
            view security & compliance details
          </Button>
        </div>
      </section>

      {/* Security Modal */}
      {showSecurityModal && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowSecurityModal(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="security-modal-title"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass rounded-2xl p-8 max-w-lg w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 id="security-modal-title" className="text-xl font-bold mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              security & compliance
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex items-start gap-3">
                <Lock className="w-4 h-4 text-primary mt-0.5" />
                <div>
                  <p className="font-medium text-foreground">End-to-End Encryption</p>
                  <p>All data encrypted at rest and in transit using AES-256</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Server className="w-4 h-4 text-primary mt-0.5" />
                <div>
                  <p className="font-medium text-foreground">Data Residency</p>
                  <p>Full control over where your data is stored and processed</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Eye className="w-4 h-4 text-primary mt-0.5" />
                <div>
                  <p className="font-medium text-foreground">Compliance Ready</p>
                  <p>GDPR, HIPAA-ready architecture with audit logging</p>
                </div>
              </div>
            </div>
            <div className="mt-6 flex gap-3">
              <Button onClick={() => setShowSecurityModal(false)} variant="outline" size="sm">
                close
              </Button>
              <Link to="/contact">
                <Button size="sm">request security questionnaire</Button>
              </Link>
            </div>
          </motion.div>
        </div>
      )}

      {/* CTA */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="py-20 bg-primary/5"
      >
        <div className="max-container text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">ready to deploy anvira o1e?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button 
                size="lg"
                className="transition-all duration-300 hover:scale-[1.03] hover:shadow-lg"
              >
                request enterprise demo
              </Button>
            </Link>
            <Button 
              variant="outline" 
              size="lg"
              className="transition-all duration-300 hover:scale-[1.03]"
            >
              <Download className="mr-2 h-4 w-4" />
              download SLA
            </Button>
          </div>
        </div>
      </motion.section>
    </Layout>
  );
};

export default AnviraO1E;
