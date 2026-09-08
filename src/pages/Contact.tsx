import { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import SEO from '@/components/SEO';
import { Reveal } from '@/components/system/Motion';

const Contact = () => {
  const contactSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact LocalHouseLLM',
    description: 'Connect with LocalHouseLLM for AI collaboration, partnerships, and inquiries about modular AI architecture.',
  };

  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: 'Message sent!',
        description: "We'll get back to you within 48 hours.",
        duration: 5000,
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitting(false);
    }, 1500);
  };

  const socials = [
    { label: 'GitHub', href: 'https://github.com/LocalHouseLLM', desc: 'Follow our open source work' },
    { label: 'X (Twitter)', href: 'https://x.com/localhousellm', desc: 'Latest updates and news' },
    { label: 'Instagram', href: 'https://www.instagram.com/localhousellm/', desc: 'Behind the scenes' },
    { label: 'Discord', href: '#', desc: 'Coming soon', comingSoon: true },
  ];

  return (
    <Layout>
      <SEO
        title="Contact LocalHouseLLM"
        description="Connect with LocalHouseLLM for AI collaborations, partnerships, and inquiries about modular AI architecture."
        keywords="contact LocalHouseLLM, AI collaboration, AI partnership, modular AI inquiry, AI research contact, join AI team"
        canonical="https://localhousellm.com/contact"
        schema={contactSchema}
      />

      <section className="pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="max-container max-w-4xl">
          <Reveal>
            <p className="technical-label">Contact</p>
            <h1 className="mt-4 font-display font-semibold tracking-tight text-4xl md:text-6xl leading-[1.05] mb-8">
              Let's build the future of AI together.
            </h1>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
              Have ideas, questions, or want to collaborate on modular AI architecture? Reach out directly — we
              respond within 48 hours.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-border py-16 md:py-24">
        <div className="max-container grid grid-cols-1 lg:grid-cols-2 gap-16">
          <Reveal>
            <h2 className="font-display text-2xl font-semibold mb-6">Send us a message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm text-foreground mb-2">Name</label>
                <Input id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Your name" required className="rounded-sm bg-card border-border" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm text-foreground mb-2">Email</label>
                <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Your email address" required className="rounded-sm bg-card border-border" />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm text-foreground mb-2">Subject</label>
                <Input id="subject" name="subject" value={formData.subject} onChange={handleChange} placeholder="Subject of your message" required className="rounded-sm bg-card border-border" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm text-foreground mb-2">Message</label>
                <Textarea id="message" name="message" value={formData.message} onChange={handleChange} placeholder="Your message" required className="rounded-sm min-h-[150px] bg-card border-border" />
              </div>
              <Button
                type="submit"
                className="w-full rounded-sm bg-foreground text-background hover:bg-primary hover:text-primary-foreground h-11"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send message'}
              </Button>
            </form>
          </Reveal>

          <Reveal delay={0.08} className="space-y-12">
            <div>
              <h2 className="font-display text-2xl font-semibold mb-6">Direct</h2>
              <div className="space-y-5">
                <div>
                  <p className="technical-label">Email</p>
                  <p className="text-muted-foreground mt-1">contact@localhousellm.com</p>
                </div>
                <div>
                  <p className="technical-label">Location</p>
                  <p className="text-muted-foreground mt-1">India</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="font-display text-2xl font-semibold mb-6">Elsewhere</h2>
              <div className="divide-y divide-border border-t border-b border-border">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target={s.comingSoon ? undefined : '_blank'}
                    rel={s.comingSoon ? undefined : 'noopener noreferrer'}
                    onClick={s.comingSoon ? (e) => e.preventDefault() : undefined}
                    className="flex items-baseline justify-between py-4 group"
                  >
                    <span className="font-display font-semibold text-foreground group-hover:text-primary transition-colors">{s.label}</span>
                    <span className="text-sm text-muted-foreground">{s.desc}</span>
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
