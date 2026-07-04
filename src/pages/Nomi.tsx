import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Fingerprint, Brain, ShieldCheck, Sparkles, Lock, Eye, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import SEO from '@/components/SEO';
import { useEffect } from 'react';
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

  // Force light theme classes locally without affecting global theme
  useEffect(() => {
    document.documentElement.style.setProperty('color-scheme', 'light');
    return () => {
      document.documentElement.style.removeProperty('color-scheme');
    };
  }, []);

  return (
    <>
      <SEO
        title="Nomi — AI Persona Infrastructure | Your AI Identity, Everywhere"
        description="Nomi is a user-controlled identity and memory layer for AI. Carry your context, preferences, and voice across every AI system — consistent, portable, fully yours."
        keywords="Nomi, AI persona, AI identity, AI memory layer, portable AI profile, user-controlled AI, AI infrastructure, personalized AI, cross-platform AI memory"
        canonical="https://localhousellm.lovable.app/nomi"
      />

      <div className="min-h-screen bg-[#FAFAF7] text-[#0A0A0A] font-raleway antialiased">
        {/* Top Nav (minimal, light) */}
        <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#FAFAF7]/70 border-b border-black/5">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 text-[#0A0A0A]">
              <span className="text-xl">\</span>
              <span className="font-lato font-bold tracking-tight text-base">LocalHouseLLM</span>
            </Link>
            <nav className="hidden md:flex items-center gap-8 text-sm text-[#0A0A0A]/70">
              <a href="#what" className="hover:text-[#0A0A0A] transition-colors">What is Nomi</a>
              <a href="#capabilities" className="hover:text-[#0A0A0A] transition-colors">Capabilities</a>
              <a href="#trust" className="hover:text-[#0A0A0A] transition-colors">Trust</a>
              <a href="#vision" className="hover:text-[#0A0A0A] transition-colors">Vision</a>
            </nav>
            <Link to="/">
              <Button variant="ghost" className="text-[#0A0A0A] hover:bg-black/5 text-sm">
                Back to LocalHouseLLM
              </Button>
            </Link>
          </div>
        </header>

        {/* HERO */}
        <section className="relative overflow-hidden">
          {/* Soft gradient orbs */}
          <div className="absolute inset-0 -z-10 pointer-events-none">
            <div className="absolute top-[-10%] left-[10%] w-[600px] h-[600px] rounded-full blur-3xl opacity-40"
                 style={{ background: 'radial-gradient(circle, rgba(180,200,255,0.55), transparent 70%)' }} />
            <div className="absolute top-[20%] right-[-10%] w-[700px] h-[700px] rounded-full blur-3xl opacity-40"
                 style={{ background: 'radial-gradient(circle, rgba(255,210,225,0.55), transparent 70%)' }} />
            <div className="absolute bottom-[-15%] left-[30%] w-[800px] h-[800px] rounded-full blur-3xl opacity-30"
                 style={{ background: 'radial-gradient(circle, rgba(210,235,220,0.55), transparent 70%)' }} />
          </div>

          <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-24 pb-32 lg:pt-36 lg:pb-44">
            <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}
                        className="inline-flex items-center gap-2 rounded-full bg-white/60 backdrop-blur-md border border-black/5 px-4 py-1.5 text-xs font-medium text-[#0A0A0A]/70 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Introducing Nomi — AI Persona Infrastructure
            </motion.div>

            <motion.h1
              initial="hidden" animate="visible" variants={fadeUp} custom={1}
              className="mt-8 font-lato font-bold tracking-tight text-[44px] sm:text-[64px] lg:text-[88px] leading-[1.02] text-[#0A0A0A] max-w-5xl"
            >
              Your AI Identity.
              <br />
              <span className="bg-gradient-to-r from-[#0A0A0A] via-[#3a4a6b] to-[#7a4a8a] bg-clip-text text-transparent">
                Everywhere.
              </span>
            </motion.h1>

            <motion.p
              initial="hidden" animate="visible" variants={fadeUp} custom={2}
              className="mt-8 text-lg sm:text-xl text-[#0A0A0A]/65 max-w-2xl leading-relaxed"
            >
              Stop repeating yourself. Nomi carries your context, preferences, and voice across every AI you use.
            </motion.p>

            <motion.div
              initial="hidden" animate="visible" variants={fadeUp} custom={3}
              className="mt-12 flex flex-wrap items-center gap-4"
            >
              <Button
                className="h-12 px-7 rounded-full bg-[#0A0A0A] text-white hover:bg-[#0A0A0A]/90 text-sm font-medium shadow-lg shadow-black/10 transition-all hover:scale-[1.02]"
                onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Explore Nomi
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                className="h-12 px-7 rounded-full bg-white/70 backdrop-blur-md border border-black/5 text-[#0A0A0A] hover:bg-white text-sm font-medium shadow-sm"
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
              <div className="relative mx-auto max-w-4xl aspect-[16/9] rounded-3xl bg-white/60 backdrop-blur-2xl border border-white shadow-[0_30px_80px_-20px_rgba(0,0,0,0.15)] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-white/40 to-white/10" />
                {/* Concentric layers */}
                {[0, 1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    className="absolute top-1/2 left-1/2 rounded-full border border-[#0A0A0A]/10"
                    style={{
                      width: `${30 + i * 18}%`,
                      paddingBottom: `${30 + i * 18}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                    animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
                    transition={{ duration: 40 + i * 10, repeat: Infinity, ease: 'linear' }}
                  />
                ))}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-gradient-to-br from-[#3a4a6b] to-[#7a4a8a] shadow-2xl flex items-center justify-center">
                  <Fingerprint className="w-10 h-10 text-white" strokeWidth={1.5} />
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* WHAT IS NOMI */}
        <section id="what" className="py-24 lg:py-36 border-t border-black/5">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} variants={fadeUp}>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#0A0A0A]/40">What is Nomi</p>
              <h2 className="mt-4 font-lato font-bold tracking-tight text-4xl sm:text-5xl lg:text-6xl text-[#0A0A0A] max-w-3xl leading-[1.05]">
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
                  <div className="text-2xl font-lato font-semibold text-[#0A0A0A]">{item.title}</div>
                  <p className="mt-3 text-[#0A0A0A]/60 leading-relaxed">{item.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CORE CAPABILITIES */}
        <section id="capabilities" className="py-24 lg:py-36 bg-gradient-to-b from-transparent via-white/40 to-transparent">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#0A0A0A]/40">Capabilities</p>
              <h2 className="mt-4 font-lato font-bold tracking-tight text-4xl sm:text-5xl lg:text-6xl text-[#0A0A0A] max-w-3xl leading-[1.05]">
                Built around you.
              </h2>
            </motion.div>

            <div className="mt-16 grid sm:grid-cols-2 gap-6">
              {capabilities.map((cap, i) => (
                <motion.div
                  key={cap.title}
                  initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}
                  variants={fadeUp} custom={i}
                  className="group relative p-8 lg:p-10 rounded-2xl bg-white/70 backdrop-blur-xl border border-white shadow-[0_8px_30px_-10px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.15)] transition-all duration-500 hover:-translate-y-1"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0A0A0A] to-[#3a4a6b] flex items-center justify-center shadow-lg">
                    <cap.icon className="w-6 h-6 text-white" strokeWidth={1.75} />
                  </div>
                  <h3 className="mt-6 font-lato font-semibold text-2xl text-[#0A0A0A]">{cap.title}</h3>
                  <p className="mt-3 text-[#0A0A0A]/60 leading-relaxed">{cap.desc}</p>
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
              className="font-lato font-bold tracking-tight text-4xl sm:text-5xl lg:text-6xl text-[#0A0A0A] leading-[1.05]"
            >
              AI remembers nothing about you. <br />
              <span className="text-[#0A0A0A]/40">Until now.</span>
            </motion.h2>

            <div className="mt-16 grid md:grid-cols-2 gap-12">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1}>
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-red-500/60">The problem today</p>
                <ul className="mt-5 space-y-3 text-[#0A0A0A]/70 text-lg">
                  <li>• Repeating context in every new chat</li>
                  <li>• Losing preferences across tools</li>
                  <li>• Inconsistent tone and outputs</li>
                  <li>• No ownership of your AI history</li>
                </ul>
              </motion.div>
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={2}>
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-emerald-600/70">With Nomi</p>
                <ul className="mt-5 space-y-3 text-[#0A0A0A] text-lg">
                  <li>✓ Your context follows you, automatically</li>
                  <li>✓ One profile, every AI tool</li>
                  <li>✓ Consistent voice across platforms</li>
                  <li>✓ You own and control everything</li>
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* TRUST & CONTROL */}
        <section id="trust" className="py-24 lg:py-36 border-t border-black/5">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#0A0A0A]/40">Trust & Control</p>
              <h2 className="mt-4 font-lato font-bold tracking-tight text-4xl sm:text-5xl lg:text-6xl text-[#0A0A0A] leading-[1.05]">
                You own it. <br /> You control it.
              </h2>
              <p className="mt-6 text-lg text-[#0A0A0A]/60 leading-relaxed max-w-lg">
                Nomi is built on a foundation of user ownership and full transparency. Every memory, every permission — visible, editable, revocable.
              </p>
              <div className="mt-8 flex gap-3 flex-wrap">
                {[
                  { icon: Lock, label: 'End-to-end encrypted' },
                  { icon: Eye, label: 'Full transparency' },
                  { icon: ShieldCheck, label: 'Granular permissions' },
                ].map((b) => (
                  <span key={b.label} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 backdrop-blur border border-black/5 text-sm text-[#0A0A0A]/70 shadow-sm">
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
              <div className="rounded-3xl bg-white/80 backdrop-blur-2xl border border-white shadow-[0_30px_80px_-20px_rgba(0,0,0,0.18)] overflow-hidden">
                <div className="p-6 border-b border-black/5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
                  </div>
                  <span className="text-xs text-[#0A0A0A]/40 font-mono">nomi.profile</span>
                </div>
                <div className="p-7">
                  <div className="text-xs font-medium uppercase tracking-wider text-[#0A0A0A]/40">What Nomi knows</div>
                  <div className="mt-4 space-y-2.5">
                    {['Writing style: concise, technical', 'Tone: warm, professional', 'Industry: AI / SaaS', 'Preferred format: markdown'].map((t) => (
                      <div key={t} className="flex items-center justify-between p-3 rounded-xl bg-black/[0.03] text-sm text-[#0A0A0A]/80">
                        <span>{t}</span>
                        <span className="text-[10px] text-[#0A0A0A]/40 uppercase tracking-wider">shared</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-7 text-xs font-medium uppercase tracking-wider text-[#0A0A0A]/40">Who has access</div>
                  <div className="mt-4 space-y-2.5">
                    {[
                      { name: 'ChatGPT', status: 'Allowed' },
                      { name: 'Claude', status: 'Allowed' },
                      { name: 'Gemini', status: 'Restricted' },
                    ].map((a) => (
                      <div key={a.name} className="flex items-center justify-between p-3 rounded-xl bg-black/[0.03] text-sm">
                        <span className="text-[#0A0A0A]/80">{a.name}</span>
                        <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full ${a.status === 'Allowed' ? 'bg-emerald-100 text-emerald-700' : 'bg-orange-100 text-orange-700'}`}>
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
        <section id="vision" className="py-32 lg:py-44 text-center">
          <div className="max-w-4xl mx-auto px-6 lg:px-10">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <Layers className="w-10 h-10 text-[#0A0A0A]/30 mx-auto" strokeWidth={1.5} />
              <h2 className="mt-8 font-lato font-bold tracking-tight text-4xl sm:text-5xl lg:text-7xl text-[#0A0A0A] leading-[1.05]">
                The missing layer of AI.
              </h2>
              <p className="mt-8 text-lg sm:text-xl text-[#0A0A0A]/60 leading-relaxed max-w-2xl mx-auto">
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
              className="relative rounded-3xl overflow-hidden p-12 lg:p-20 text-center bg-gradient-to-br from-white via-[#f4f0ff] to-[#fff0f5] border border-white shadow-[0_30px_80px_-20px_rgba(0,0,0,0.15)]"
            >
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#0A0A0A]/40">Early Access</p>
              <h2 className="mt-4 font-lato font-bold tracking-tight text-4xl sm:text-5xl lg:text-6xl text-[#0A0A0A] leading-[1.05]">
                This is just the beginning.
              </h2>
              <p className="mt-6 text-lg text-[#0A0A0A]/60 max-w-xl mx-auto">
                Be among the first to experience AI that finally remembers you — on your terms.
              </p>

              <form
                onSubmit={(e) => { e.preventDefault(); }}
                className="mt-10 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              >
                <Input
                  type="email"
                  placeholder="you@email.com"
                  className="h-12 rounded-full bg-white border-black/10 text-[#0A0A0A] placeholder:text-[#0A0A0A]/40 px-5 focus-visible:ring-[#0A0A0A]/20"
                  required
                />
                <Button
                  type="submit"
                  className="h-12 px-7 rounded-full bg-[#0A0A0A] text-white hover:bg-[#0A0A0A]/90 text-sm font-medium shadow-lg shadow-black/10 transition-all hover:scale-[1.02]"
                >
                  Get Early Access
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </form>
              <p className="mt-4 text-xs text-[#0A0A0A]/40">No spam. Just one email when Nomi opens.</p>
            </motion.div>
          </div>
        </section>

        {/* Footer (light) */}
        <footer className="border-t border-black/5 py-10">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-[#0A0A0A]/50">
            <p>© 2026 LocalHouseLLM — Nomi</p>
            <div className="flex gap-6">
              <Link to="/about" className="hover:text-[#0A0A0A] transition-colors">About</Link>
              <Link to="/contact" className="hover:text-[#0A0A0A] transition-colors">Contact</Link>
              <Link to="/" className="hover:text-[#0A0A0A] transition-colors">LocalHouseLLM</Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Nomi;
