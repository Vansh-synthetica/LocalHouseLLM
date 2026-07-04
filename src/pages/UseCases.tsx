import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, GraduationCap, Stethoscope, Sprout, FlaskConical, Building2, Cpu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CleanLayout from '@/components/CleanLayout';
import Breadcrumbs from '@/components/Breadcrumbs';
import SEO from '@/components/SEO';

const cases = [
  { to: '/use-cases/ai-tutors', icon: GraduationCap, name: 'AI tutors', desc: 'Personalised learning shaped to a single student, school, or language.' },
  { to: '/use-cases/healthcare', icon: Stethoscope, name: 'Healthcare support', desc: 'On-premise assistants for clinics where privacy and accuracy are non-negotiable.' },
  { to: '/use-cases/agriculture', icon: Sprout, name: 'Agricultural advisors', desc: 'Offline-capable systems for rural communities and local knowledge.' },
  { to: '/use-cases/research', icon: FlaskConical, name: 'Research assistants', desc: 'Composable reasoning systems built for specific fields and institutions.' },
  { to: '/use-cases/enterprise-private-ai', icon: Building2, name: 'Enterprise private AI', desc: 'Modular AI inside the firewall — your data never leaves your boundary.' },
  { to: '/use-cases/edge-ai', icon: Cpu, name: 'Edge AI & robotics', desc: 'Real-time modular intelligence for autonomous systems and IoT.' },
];

const UseCases = () => (
  <CleanLayout>
    <SEO
      title="Use Cases — LocalHouseLLM"
      description="Real-world deployments of the LocalHouseLLM modular AI stack: AI tutors, healthcare support, agricultural advisors, research assistants, enterprise private AI, and edge AI for robotics."
      canonical="https://localhousellm.lovable.app/use-cases"
      keywords="LocalHouseLLM use cases, modular AI use cases, AI tutors, healthcare AI, agricultural AI, research AI, enterprise private AI, edge AI, robotics AI"
      schema={{ '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'LocalHouseLLM Use Cases', url: 'https://localhousellm.com/use-cases' }}
    />
    <Breadcrumbs items={[{ name: 'Use Cases', to: '/use-cases' }]} />

    <section className="pt-10 pb-12">
      <div className="max-container max-w-4xl">
        <p className="text-[11px] tracking-[0.25em] uppercase text-muted-foreground mb-5">Where the stack ships</p>
        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight leading-[1.05] mb-8">Use cases.</h1>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
          The same six layers — communication, orchestration, memory, safety, tools, modules — assembled for different missions.
        </p>
      </div>
    </section>

    <section className="border-t border-border/40 py-16">
      <div className="max-container">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cases.map((c, i) => (
            <motion.div key={c.to} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ delay: i * 0.05, duration: 0.5 }}>
              <Link to={c.to} className="group block p-7 rounded-xl border border-border/40 hover:border-border transition-colors h-full">
                <c.icon className="w-5 h-5 mb-5" />
                <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
                  {c.name}
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <section className="border-t border-border/40 py-20">
      <div className="max-container max-w-3xl">
        <h2 className="text-2xl md:text-3xl font-semibold mb-5">Have a use case we should write up?</h2>
        <Link to="/contact"><Button className="bg-foreground text-background hover:bg-foreground/90 h-11 px-6">Tell us</Button></Link>
      </div>
    </section>
  </CleanLayout>
);

export default UseCases;
