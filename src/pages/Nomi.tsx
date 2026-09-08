import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Fingerprint, Brain, ShieldCheck, Sparkles, Lock, Eye, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import SEO from '@/components/SEO';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const capabilities = [
  { icon: Fingerprint, title: 'Portable Identity', desc: 'Your profile moves with you across every AI tool you use.' },
  { icon: Brain, title: 'Selective Memory', desc: 'Only what matters is remembered — nothing more, nothing less.' },
  { icon: ShieldCheck, title: 'Full Control', desc: 'Decide exactly what each system can access, in real time.' },
  { icon: Sparkles, title: 'Consistent Output', desc: 'The same tone, the same context, the same you — everywhere.' },
];

const Nomi = () => {
  // Premium smooth scroll just for this page
  useSmoothScroll(true);

  return (
    <>
      <SEO
        title="Nomi — AI Persona Infrastructure | Your AI Identity, Everywhere"
        description="Nomi is a user-controlled identity and memory layer for AI. Carry your context, preferences, and voice across every AI system — consistent, portable, fully yours."
        keywords="Nomi, AI persona, AI identity, AI memory layer, portable AI profile, user-controlled AI, AI infrastructure, personalized AI, cross-platform AI memory"
        canonical="https://localhousellm.com/nomi"
      />

      <div className="min-h-screen bg-background text-foreground font-sans antialiased">
        <Navbar />

        {/* HERO */}
        <section className="relative overflow-hidden pt-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-24 pb-32 lg:pt-36 lg:pb-44">
            <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}
                        className="inline-flex items-center gap-2 rounded-sm bg-card border border-border px-4 py-1.5 text-xs font-medium text-muted-foreground">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              Introducing Nomi — AI Persona Infrastructure
            </motion.div>

            <motion.h1
              initial="hidden" animate="visible" variants={fadeUp} custom={1}
              className="mt-8 font-display font-semibold tracking-tight text-[44px] sm:text-[64px] lg:text-[88px] leading-[1.02] text-foreground max-w-5xl"
            >
              Your AI Identity.
              <br />
              <span className="text-gradient">Everywhere.</span>
            </motion.h1>

            <motion.p
              initial="hidden" animate="visible" variants={fadeUp} custom={2}
              className="mt-8 text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed"
            >
              Stop repeating yourself. Nomi carries your context, preferences, and voice across every AI you use.
            </motion.p>

            <motion.div
              initial="hidden" animate="visible" variants={fadeUp} custom={3}
              className="mt-12 flex flex-wrap items-center gap-4"
            >
              <Button
                className="h-12 px-7 rounded-sm bg-foreground text-background hover:bg-primary hover:text-primary-foreground text-sm font-medium"
                onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Explore Nomi
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                className="h-12 px-7 rounded-sm text-sm font-medium"
                onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Join Waitlist
              </Button>
            </motion.div>

            {/* Visual: abstract identity layers */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="mt-20 lg:mt-28 relative"
            >
              <div className="relative mx-auto max-w-4xl aspect-[16/9] rounded-sm bg-card border border-border overflow-hidden">
                {/* Concentric layers */}
                {[0, 1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    className="absolute top-1/2 left-1/2 rounded-full border border-foreground/10"
                    style={{
                      width: `${30 + i * 18}%`,
                      paddingBottom: `${30 + i * 18}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                    animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
                    transition={{ duration: 40 + i * 10, repeat: Infinity, ease: 'linear' }}
                  />
                ))}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-primary flex items-center justify-center">
                  <Fingerprint className="w-10 h-10 text-primary-foreground" strokeWidth={1.5} />
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* WHAT IS NOMI */}
        <section id="what" className="py-24 lg:py-36 border-t border-border">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} variants={fadeUp}>
              <p className="technical-label">What is Nomi</p>
              <h2 className="mt-4 font-display font-semibold tracking-tight text-4xl sm:text-5xl lg:text-6xl text-foreground max-w-3xl leading-[1.05]">
                Not another AI. <br /> A new layer.
              </h2>
            </motion.div>

            <div className="mt-16 grid md:grid-cols-3 gap-10 lg:gap-16">
              {[
                { title: 'Sits between you and AI', body: 'Nomi is the layer where your identity lives — independent of any single tool.' },
                { title: 'Carries memory & tone', body: 'Your preferences, your context, your voice. Available wherever you choose.' },
                { title: 'Works across platforms', body: 'One profile, every AI. No re-explaining. No starting over.' },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}
                  variants={fadeUp} custom={i}
                >
                  <div className="text-2xl font-display font-semibold text-foreground">{item.title}</div>
                  <p className="mt-3 text-muted-foreground leading-relaxed">{item.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CORE CAPABILITIES */}
        <section id="capabilities" className="py-24 lg:py-36 border-t border-border">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <p className="technical-label">Capabilities</p>
              <h2 className="mt-4 font-display font-semibold tracking-tight text-4xl sm:text-5xl lg:text-6xl text-foreground max-w-3xl leading-[1.05]">
                Built around you.
              </h2>
            </motion.div>

            <div className="mt-16 grid sm:grid-cols-2 gap-6">
              {capabilities.map((cap, i) => (
                <motion.div
                  key={cap.title}
                  initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}
                  variants={fadeUp} custom={i}
                  className="group relative p-8 lg:p-10 rounded-sm bg-card border border-border transition-all duration-500 hover:-translate-y-1 hover:border-primary/40"
                >
                  <div className="w-12 h-12 rounded-sm bg-foreground flex items-center justify-center">
                    <cap.icon className="w-6 h-6 text-background" strokeWidth={1.75} />
                  </div>
                  <h3 className="mt-6 font-display font-semibold text-2xl text-foreground">{cap.title}</h3>
                  <p className="mt-3 text-muted-foreground leading-relaxed">{cap.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* WHY IT MATTERS */}
        <section className="py-24 lg:py-36">
          <div className="max-w-5xl mx-auto px-6 lg:px-10">
            <motion.h2
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className="font-display font-semibold tracking-tight text-4xl sm:text-5xl lg:text-6xl text-foreground leading-[1.05]"
            >
              AI remembers nothing about you. <br />
              <span className="text-muted-foreground">Until now.</span>
            </motion.h2>

            <div className="mt-16 grid md:grid-cols-2 gap-12">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1}>
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-destructive/70">The problem today</p>
                <ul className="mt-5 space-y-3 text-muted-foreground text-lg">
                  <li>· Repeating context in every new chat</li>
                  <li>· Losing preferences across tools</li>
                  <li>· Inconsistent tone and outputs</li>
                  <li>· No ownership of your AI history</li>
                </ul>
              </motion.div>
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={2}>
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">With Nomi</p>
                <ul className="mt-5 space-y-3 text-foreground text-lg">
                  <li>· Your context follows you, automatically</li>
                  <li>· One profile, every AI tool</li>
                  <li>· Consistent voice across platforms</li>
                  <li>· You own and control everything</li>
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* TRUST & CONTROL */}
        <section id="trust" className="py-24 lg:py-36 border-t border-border">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <p className="technical-label">Trust &amp; Control</p>
              <h2 className="mt-4 font-display font-semibold tracking-tight text-4xl sm:text-5xl lg:text-6xl text-foreground leading-[1.05]">
                You own it. <br /> You control it.
              </h2>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-lg">
                Nomi is built on a foundation of user ownership and full transparency. Every memory, every permission — visible, editable, revocable.
              </p>
              <div className="mt-8 flex gap-3 flex-wrap">
                {[
                  { icon: Lock, label: 'End-to-end encrypted' },
                  { icon: Eye, label: 'Full transparency' },
                  { icon: ShieldCheck, label: 'Granular permissions' },
                ].map((b) => (
                  <span key={b.label} className="inline-flex items-center gap-2 px-4 py-2 rounded-sm bg-card border border-border text-sm text-muted-foreground">
                    <b.icon className="w-4 h-4" /> {b.label}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Mock control panel */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div className="rounded-sm bg-card border border-border overflow-hidden">
                <div className="p-6 border-b border-border flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-muted-foreground/30" />
                    <div className="w-2.5 h-2.5 rounded-full bg-muted-foreground/30" />
                    <div className="w-2.5 h-2.5 rounded-full bg-muted-foreground/30" />
                  </div>
                  <span className="text-xs text-muted-foreground font-mono">nomi.profile</span>
                </div>
                <div className="p-7">
                  <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">What Nomi knows</div>
                  <div className="mt-4 space-y-2.5">
                    {['Writing style: concise, technical', 'Tone: warm, professional', 'Industry: AI / SaaS', 'Preferred format: markdown'].map((t) => (
                      <div key={t} className="flex items-center justify-between p-3 rounded-sm bg-secondary text-sm text-foreground/80">
                        <span>{t}</span>
                        <span className="text-[10px] text-muted-foreground uppercase tracking-wider">shared</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-7 text-xs font-medium uppercase tracking-wider text-muted-foreground">Who has access</div>
                  <div className="mt-4 space-y-2.5">
                    {[
                      { name: 'ChatGPT', status: 'Allowed' },
                      { name: 'Claude', status: 'Allowed' },
                      { name: 'Gemini', status: 'Restricted' },
                    ].map((a) => (
                      <div key={a.name} className="flex items-center justify-between p-3 rounded-sm bg-secondary text-sm">
                        <span className="text-foreground/80">{a.name}</span>
                        <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-sm ${a.status === 'Allowed' ? 'bg-primary/15 text-primary' : 'bg-warning/15 text-warning'}`}>
                          {a.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* VISION */}
        <section id="vision" className="py-32 lg:py-44 text-center border-t border-border">
          <div className="max-w-4xl mx-auto px-6 lg:px-10">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <Layers className="w-10 h-10 text-muted-foreground mx-auto" strokeWidth={1.5} />
              <h2 className="mt-8 font-display font-semibold tracking-tight text-4xl sm:text-5xl lg:text-7xl text-foreground leading-[1.05]">
                The missing layer of AI.
              </h2>
              <p className="mt-8 text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                The future of human-AI interaction is not bigger models. It is identity, ownership, and personalization without compromise.
                Nomi is the layer that makes it real.
              </p>
            </motion.div>
          </div>
        </section>

        {/* FINAL CTA / WAITLIST */}
        <section id="waitlist" className="pb-32">
          <div className="max-w-4xl mx-auto px-6 lg:px-10">
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className="relative rounded-sm overflow-hidden p-12 lg:p-20 text-center bg-card border border-border"
            >
              <p className="technical-label justify-center">Early Access</p>
              <h2 className="mt-4 font-display font-semibold tracking-tight text-4xl sm:text-5xl lg:text-6xl text-foreground leading-[1.05]">
                This is just the beginning.
              </h2>
              <p className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto">
                Be among the first to experience AI that finally remembers you — on your terms.
              </p>

              <form
                onSubmit={(e) => { e.preventDefault(); }}
                className="mt-10 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              >
                <Input
                  type="email"
                  placeholder="you@email.com"
                  className="h-12 rounded-sm bg-background px-5"
                  required
                />
                <Button
                  type="submit"
                  className="h-12 px-7 rounded-sm bg-foreground text-background hover:bg-primary hover:text-primary-foreground text-sm font-medium"
                >
                  Get Early Access
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </form>
              <p className="mt-4 text-xs text-muted-foreground">No spam. Just one email when Nomi opens.</p>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Nomi;
