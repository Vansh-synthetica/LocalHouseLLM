
import { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import SEO from '@/components/SEO';

const Contact = () => {
  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact LocalHouseLLM",
    "description": "Connect with LocalHouseLLM for AI collaboration, partnerships, and inquiries about modular AI architecture"
  };

  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message sent!",
        description: "We'll get back to you within 48 hours.",
        duration: 5000,
      });
      
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <Layout>
      <SEO
        title="Contact LocalHouseLLM - Build the Future of AI Together"
        description="Connect with LocalHouseLLM for AI collaborations, partnerships, and inquiries. Join us in revolutionizing modular AI architecture with AMAI expert modules and AICL technology. Let's build smarter AI together."
        keywords="contact LocalHouseLLM, AI collaboration, AI partnership, modular AI inquiry, AI research contact, join AI team, LocalHouse partnership, AMAI collaboration, AI consulting"
        canonical="https://localhouse.ai/contact"
        schema={contactSchema}
      />
      <section className="py-20">
        <div className="max-container">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Let's Build the Future of AI Together</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Have ideas, questions, or want to collaborate on modular AI architecture? Reach out directly.
              We'll respond within 48 hours.
              *note - The services are down and will be back online soon
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="glass p-8">
              <h2 className="text-2xl font-bold mb-6">Send Us a Message About AI</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-foreground mb-2">Name</label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                    className="bg-secondary/50 border-border"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-foreground mb-2">Email</label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your email address"
                    required
                    className="bg-secondary/50 border-border"
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-foreground mb-2">Subject</label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Subject of your message"
                    required
                    className="bg-secondary/50 border-border"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-foreground mb-2">Message</label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your message"
                    required
                    className="min-h-[150px] bg-secondary/50 border-border"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-cyberBlue text-black hover:bg-cyberBlue/90"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </div>
            
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="glass p-8">
                <h2 className="text-2xl font-bold mb-6">Connect With LocalHouseLLM</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Email</h3>
                    <p className="text-muted-foreground">contact@localhousellm.com</p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Location</h3>
                    <p className="text-muted-foreground">India</p>
                  </div>
                </div>
              </div>
              
              <div className="glass p-8">
                <h2 className="text-2xl font-bold mb-6">Join Our AI Community</h2>
                
                <div className="grid grid-cols-2 gap-4">
                  <a 
                    href="https://github.com/LocalHouseLLM" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 bg-secondary/50 rounded-lg text-center hover:bg-secondary transition-colors"
                  >
                    <div className="font-semibold mb-1">GitHub</div>
                    <p className="text-sm text-muted-foreground">Follow our open source work</p>
                  </a>
                  
                  <a 
                    href="https://x.com/localhousellm" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 bg-secondary/50 rounded-lg text-center hover:bg-secondary transition-colors"
                  >
                    <div className="font-semibold mb-1">X (Twitter)</div>
                    <p className="text-sm text-muted-foreground">Latest updates and news</p>
                  </a>
                  
                  <a 
                    href="https://www.instagram.com/localhousellm/" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 bg-secondary/50 rounded-lg text-center hover:bg-secondary transition-colors"
                  >
                    <div className="font-semibold mb-1">Instagram</div>
                    <p className="text-sm text-muted-foreground">Behind the scenes</p>
                  </a>
                  
                  <a 
                    href="#" 
                    onClick={(e) => { e.preventDefault(); alert('Coming Soon'); }}
                    className="p-4 bg-secondary/50 rounded-lg text-center hover:bg-secondary transition-colors"
                  >
                    <div className="font-semibold mb-1">Discord</div>
                    <p className="text-sm text-muted-foreground">Join our community</p>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
