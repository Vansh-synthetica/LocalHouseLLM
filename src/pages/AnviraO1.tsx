import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { 
  Brain, Calculator, FlaskConical, DollarSign, GraduationCap, 
  Code, FileText, Search, Shield, Tag, FileCode, Palette, 
  Languages, BookOpen, Calendar, Lock, ArrowRight, Quote
} from 'lucide-react';

const AnviraO1 = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
  };

  const staggerChildren = {
    visible: { transition: { staggerChildren: 0.08 } }
  };

  const modules = [
    { icon: Brain, name: 'general chat', desc: 'conversational AI for everyday questions' },
    { icon: Calculator, name: 'maths', desc: 'symbolic & numeric solver' },
    { icon: FlaskConical, name: 'science', desc: 'physics, chemistry, biology reasoning' },
    { icon: DollarSign, name: 'finance', desc: 'financial analysis & calculations' },
    { icon: GraduationCap, name: 'education', desc: 'tutoring & learning assistance' },
    { icon: Code, name: 'coding', desc: 'programming help & code generation' },
    { icon: FileText, name: 'summarizer', desc: 'intelligent document summarization' },
    { icon: Search, name: 'retrieval', desc: 'information lookup & synthesis' },
    { icon: Shield, name: 'safety', desc: 'content moderation & verification' },
    { icon: Tag, name: 'NER', desc: 'named entity recognition' },
    { icon: FileCode, name: 'docs parser', desc: 'structured document extraction' },
    { icon: Palette, name: 'creativity', desc: 'creative writing & ideation' },
    { icon: Languages, name: 'translator', desc: 'multi-language translation' },
    { icon: BookOpen, name: 'note-taker', desc: 'meeting & lecture notes' },
    { icon: Calendar, name: 'scheduler', desc: 'task & calendar management' },
  ];

  const testimonials = [
    { quote: "anvira o1 has transformed how I handle daily tasks. It's like having a team of specialists in my pocket.", author: "Beta Tester" },
    { quote: "The privacy-first approach finally gives me confidence to use AI without worrying about my data.", author: "Early Adopter" },
    { quote: "Incredibly fast responses with no cloud dependency. Exactly what I needed.", author: "Developer" },
  ];

  return (
    <Layout>
      <SEO
        title="anvira o1 — standard edition | LocalHouseLLM"
        description="anvira o1 is a modular, adaptive personal AI — fast, private, and designed for daily productivity with 10+ expert modules running locally."
        keywords="anvira o1, personal AI, modular AI, local AI, privacy AI, expert modules, adaptive AI, LocalHouseLLM"
        canonical="https://localhouse.ai/anvira/o1"
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
            <h1 className="text-4xl md:text-6xl font-bold mb-4">anvira o1</h1>
            <p className="text-xl text-muted-foreground mb-2">standard edition</p>
            <p className="text-2xl font-medium mb-6">your personal intelligence engine</p>
            
            <p className="text-muted-foreground leading-relaxed mb-8 max-w-2xl">
              anvira o1 is your everyday intelligent companion — a modular, adaptive AI built for personal productivity, learning, creativity, and general reasoning. with 10+ specialized expert modules working in parallel, o1 delivers fast, reliable answers without needing cloud compute. it learns from your usage patterns (safely and locally), becoming smarter over time while keeping your data in your hands.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact">
                <Button 
                  size="lg"
                  className="group transition-all duration-300 hover:scale-[1.03] hover:shadow-lg"
                  aria-label="Join early access for anvira o1"
                >
                  join early access
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Button 
                variant="outline" 
                size="lg"
                className="transition-all duration-300 hover:scale-[1.03]"
                aria-label="See anvira o1 demos"
              >
                see demos
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Modules Grid */}
      <section className="py-20 bg-secondary/30">
        <div className="max-container">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-4"
          >
            expert modules
          </motion.h2>
          <p className="text-center text-muted-foreground mb-12 max-w-xl mx-auto">
            specialized models for each task, working together seamlessly
          </p>
          
          <motion.div
            variants={staggerChildren}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
          >
            {modules.map((module) => (
              <motion.div
                key={module.name}
                variants={fadeInUp}
                className="glass rounded-xl p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:scale-[1.02] cursor-default"
                tabIndex={0}
                role="article"
                aria-label={module.name}
              >
                <module.icon className="w-6 h-6 text-primary mb-2" />
                <h3 className="font-semibold text-sm mb-1">{module.name}</h3>
                <p className="text-xs text-muted-foreground">{module.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Live Demo / Try It */}
      <section className="py-20">
        <div className="max-container">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-12"
          >
            see it in action
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-8 max-w-2xl mx-auto"
          >
            <div className="font-mono text-sm space-y-4">
              <div className="flex items-start gap-3">
                <span className="text-primary">Ask:</span>
                <motion.span
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  "Explain photosynthesis"
                </motion.span>
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="flex items-center gap-2 text-muted-foreground"
              >
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                science module selected
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1 }}
                className="bg-secondary/50 rounded-lg p-4"
              >
                <p className="text-foreground">
                  Photosynthesis is the process by which plants convert light energy into chemical energy, producing glucose and oxygen from carbon dioxide and water...
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Privacy & Local-First */}
      <section className="py-16 border-t border-border">
        <div className="max-container">
          <div className="glass rounded-2xl p-8 flex flex-col md:flex-row items-center gap-8 max-w-4xl mx-auto">
            <div className="flex-shrink-0">
              <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Lock className="w-10 h-10 text-primary" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">privacy by design</h3>
              <p className="text-muted-foreground">
                all inference runs locally on your device. your data never leaves your machine. 
                on-device memory enables personalization without external servers. 
                optional sync is always opt-in and encrypted.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-16">
        <div className="max-container text-center">
          <div className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            coming soon
          </div>
          <h3 className="text-xl font-bold mb-2">flexible pricing</h3>
          <p className="text-muted-foreground">free tier available • personal subscription plans</p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-secondary/30">
        <div className="max-container">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-12"
          >
            early users say
          </motion.h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-xl p-6"
              >
                <Quote className="w-6 h-6 text-primary/30 mb-4" />
                <p className="text-sm mb-4 italic">"{t.quote}"</p>
                <p className="text-xs text-muted-foreground">— {t.author}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="py-20"
      >
        <div className="max-container text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">ready to experience anvira o1?</h2>
          <Link to="/contact">
            <Button 
              size="lg"
              className="transition-all duration-300 hover:scale-[1.03] hover:shadow-lg"
              aria-label="Request early access to anvira o1"
            >
              request early access
            </Button>
          </Link>
        </div>
      </motion.section>
    </Layout>
  );
};

export default AnviraO1;
