
import { useState } from 'react';
import { motion } from 'framer-motion';
import { PenLine, Sparkles, SlidersHorizontal, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Layout from '@/components/Layout';
import SEO from '@/components/SEO';

const features = [
  {
    icon: PenLine,
    title: 'Advanced Grammar Correction',
    description: 'Catch every error and elevate your writing with context-aware grammar fixes.',
  },
  {
    icon: Sparkles,
    title: 'AI Copywriting Assistant',
    description: 'Generate persuasive, on-brand copy that converts — in seconds.',
  },
  {
    icon: SlidersHorizontal,
    title: 'Tone & Clarity Optimization',
    description: 'Fine-tune voice, readability, and impact across any content format.',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const InkFlow = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
    }
  };

  return (
    <Layout>
      <SEO
        title="InkFlow — AI Writing & Copy Assistant | LocalHouseLLM"
        description="InkFlow is an AI writing assistant built to refine grammar, elevate clarity, and craft compelling copy in seconds."
        keywords="InkFlow, AI writing assistant, copywriting, grammar correction, LocalHouseLLM"
      />

      {/* Hero */}
      <section className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="max-container text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={0}
            className="mb-4"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-muted/40 text-xs text-muted-foreground tracking-wide uppercase">
              <Sparkles className="w-3 h-3" />
              Coming Soon
            </span>
          </motion.div>

          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={1}
            className="text-4xl sm:text-5xl md:text-7xl font-lato font-bold tracking-tight text-foreground mb-6"
          >
            InkFlow is Coming.
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={2}
            className="text-lg sm:text-xl text-muted-foreground font-light max-w-2xl mx-auto mb-3"
          >
            Clarity. Creativity. Conversion.
          </motion.p>

          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={3}
            className="text-sm text-muted-foreground/70 max-w-xl mx-auto mb-10"
          >
            An AI writing assistant built to refine grammar, elevate clarity, and craft compelling copy in seconds.
          </motion.p>

          <motion.form
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={4}
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto"
          >
            {submitted ? (
              <p className="text-foreground text-sm">You're on the list. We'll be in touch.</p>
            ) : (
              <>
                <Input
                  type="email"
                  placeholder="you@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-muted/40 border-border text-foreground placeholder:text-muted-foreground/50 h-11"
                />
                <Button type="submit" className="h-11 px-6 gap-2 whitespace-nowrap">
                  Join Early Access
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </>
            )}
          </motion.form>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 sm:py-28 px-4">
        <div className="max-container">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
            className="text-center text-2xl sm:text-3xl font-lato font-bold text-foreground mb-14"
          >
            What to Expect
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i + 1}
                className="feature-card p-6 sm:p-8 flex flex-col items-start gap-4"
              >
                <div className="w-10 h-10 rounded-md bg-muted/60 flex items-center justify-center">
                  <f.icon className="w-5 h-5 text-foreground" />
                </div>
                <h3 className="text-lg font-lato font-semibold text-foreground">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Statement */}
      <section className="py-16 sm:py-24 px-4">
        <div className="max-container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
            className="max-w-2xl mx-auto text-center premium-glass p-8 sm:p-12"
          >
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              InkFlow is part of the evolving <span className="text-foreground font-medium">LocalHouseLLM</span> ecosystem — building intelligent tools for real-world productivity.
            </p>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default InkFlow;
