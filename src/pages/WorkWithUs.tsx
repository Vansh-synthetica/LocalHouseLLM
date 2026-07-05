import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Cpu, Layers, Compass, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import CleanLayout from '@/components/CleanLayout';
import SEO from '@/components/SEO';
import { supabase } from '@/integrations/supabase/client';

const services = [
  {
    icon: Cpu,
    title: 'AI Infrastructure & Deployment',
    desc: 'Private, modular AI stacks deployed on your hardware or cloud — built for control, privacy, and long-term ownership.',
  },
  {
    icon: Layers,
    title: 'Custom AI Systems & Development',
    desc: 'End-to-end design and engineering of purpose-built modular AI systems for your product, workflow, or research programme.',
  },
  {
    icon: Compass,
    title: 'Strategic Consulting & Partnerships',
    desc: 'Architecture, roadmap, and long-term collaboration for teams building serious AI infrastructure.',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

const initialForm = {
  full_name: '',
  company_name: '',
  role_title: '',
  email: '',
  website_or_linkedin: '',
  help_needed: '',
  budget_range: '',
  timeline: '',
  additional_notes: '',
};

const WorkWithUs = () => {
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.full_name || !form.company_name || !form.email || !form.help_needed) {
      toast({ title: 'Please fill in the required fields', variant: 'destructive' });
      return;
    }
    setSubmitting(true);
    try {
      const { error } = await supabase.functions.invoke('submit-work-request', { body: form });
      if (error) throw error;
      setSubmitted(true);
      setForm(initialForm);
    } catch (err) {
      console.error(err);
      toast({
        title: 'Something went wrong',
        description: 'Please try again in a moment.',
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <CleanLayout>
      <SEO
        title="Work With Us — LocalHouseLLM"
        description="Apply to work with LocalHouseLLM on AI infrastructure, custom AI systems, and strategic consulting. Selective engagements for founders, companies, and research teams."
        canonical="https://localhousellm.com/work-with-us"
      />

      {/* HERO */}
      <section className="pt-32 md:pt-40 pb-16 md:pb-20">
        <div className="max-container">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-3xl">
            <p className="text-[11px] tracking-[0.25em] uppercase text-muted-foreground mb-5">
              Selective engagements
            </p>
            <h1 className="text-4xl md:text-6xl font-semibold tracking-tight leading-[1.05] mb-6">
              Work With Us
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
              For founders, companies, and teams looking for serious AI infrastructure,
              consulting, and custom builds.
            </p>
          </motion.div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="border-t border-border/40 py-16 md:py-24">
        <div className="max-container">
          <div className="grid md:grid-cols-3 gap-4">
            {services.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-40px' }}
                  variants={fadeUp}
                  custom={i}
                  className="p-7 rounded-xl border border-border/40 hover:border-border transition-colors"
                >
                  <Icon className="w-5 h-5 mb-5 text-foreground" strokeWidth={1.5} />
                  <h3 className="text-lg font-semibold mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FORM */}
      <section id="apply" className="border-t border-border/40 py-20 md:py-28">
        <div className="max-container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="max-w-2xl mb-10"
          >
            <p className="text-[11px] tracking-[0.25em] uppercase text-muted-foreground mb-4">
              Apply to Work With Us
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
              Submit a request.
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              We take on a small number of engagements. Every request is reviewed manually before
              we respond. This is not an instant booking — share what you need, and we will get
              back to you if it is a fit.
            </p>
          </motion.div>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-2xl p-8 rounded-xl border border-border/60 bg-foreground/5"
            >
              <CheckCircle2 className="w-6 h-6 mb-4" strokeWidth={1.5} />
              <h3 className="text-xl font-semibold mb-2">Request received</h3>
              <p className="text-muted-foreground leading-relaxed">
                Thanks — your request has been received and will be reviewed. If it is a fit, we
                will reach out at the email you provided.
              </p>
              <Button
                variant="outline"
                className="mt-6 border-border bg-transparent hover:bg-foreground/5"
                onClick={() => setSubmitted(false)}
              >
                Submit another request
              </Button>
            </motion.div>
          ) : (
            <form onSubmit={onSubmit} className="max-w-2xl space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Full Name" required>
                  <Input value={form.full_name} onChange={update('full_name')} required />
                </Field>
                <Field label="Company Name" required>
                  <Input value={form.company_name} onChange={update('company_name')} required />
                </Field>
                <Field label="Role / Title">
                  <Input value={form.role_title} onChange={update('role_title')} />
                </Field>
                <Field label="Email" required>
                  <Input type="email" value={form.email} onChange={update('email')} required />
                </Field>
              </div>

              <Field label="Website / LinkedIn">
                <Input
                  value={form.website_or_linkedin}
                  onChange={update('website_or_linkedin')}
                  placeholder="https://…"
                />
              </Field>

              <Field label="What do you need help with?" required>
                <Textarea
                  value={form.help_needed}
                  onChange={update('help_needed')}
                  rows={5}
                  required
                  placeholder="Briefly describe the problem, system, or outcome you're working toward."
                />
              </Field>

              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Budget Range">
                  <Input
                    value={form.budget_range}
                    onChange={update('budget_range')}
                    placeholder="e.g. $25k–$100k"
                  />
                </Field>
                <Field label="Timeline">
                  <Input
                    value={form.timeline}
                    onChange={update('timeline')}
                    placeholder="e.g. Q1 2026 / 3 months"
                  />
                </Field>
              </div>

              <Field label="Additional Notes">
                <Textarea value={form.additional_notes} onChange={update('additional_notes')} rows={4} />
              </Field>

              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={submitting}
                  className="bg-foreground text-background hover:bg-foreground/90 h-11 px-6"
                >
                  {submitting ? 'Sending…' : 'Submit request'}
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
                <p className="text-xs text-muted-foreground mt-4">
                  Reviewed manually. You'll hear back only if it's a fit.
                </p>
              </div>
            </form>
          )}
        </div>
      </section>
    </CleanLayout>
  );
};

const Field = ({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) => (
  <div>
    <Label className="text-xs tracking-wide text-muted-foreground mb-2 block">
      {label} {required && <span className="text-foreground/60">*</span>}
    </Label>
    {children}
  </div>
);

export default WorkWithUs;
