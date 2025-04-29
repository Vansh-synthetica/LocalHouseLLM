
import { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';

const Contact = () => {
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
      <section className="py-20">
        <div className="max-container">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Let's Build the Future of AI</h1>
            <p className="text-xl text-secondaryText max-w-3xl mx-auto">
              Have ideas, questions, or want to collaborate? Reach out directly.
              We'll get back to you within 48 hours.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="glass p-8">
              <h2 className="text-2xl font-bold mb-6">Send us a message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-white mb-2">Name</label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                    className="bg-secondary/50 border-white/10"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-white mb-2">Email</label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your email address"
                    required
                    className="bg-secondary/50 border-white/10"
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-white mb-2">Subject</label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Subject of your message"
                    required
                    className="bg-secondary/50 border-white/10"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-white mb-2">Message</label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your message"
                    required
                    className="min-h-[150px] bg-secondary/50 border-white/10"
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
                <h2 className="text-2xl font-bold mb-6">Connect With Us</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Email</h3>
                    <p className="text-secondaryText">contact@localhousellm.ai</p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Location</h3>
                    <p className="text-secondaryText">San Francisco, California</p>
                  </div>
                </div>
              </div>
              
              <div className="glass p-8">
                <h2 className="text-2xl font-bold mb-6">Join Our Community</h2>
                
                <div className="grid grid-cols-2 gap-4">
                  <a 
                    href="https://github.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-4 bg-secondary/50 rounded-lg text-center hover:bg-secondary transition-colors"
                  >
                    <div className="font-semibold mb-1">GitHub</div>
                    <p className="text-sm text-secondaryText">Follow our open source work</p>
                  </a>
                  
                  <a 
                    href="https://twitter.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-4 bg-secondary/50 rounded-lg text-center hover:bg-secondary transition-colors"
                  >
                    <div className="font-semibold mb-1">Twitter</div>
                    <p className="text-sm text-secondaryText">Latest updates and news</p>
                  </a>
                  
                  <a 
                    href="https://discord.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-4 bg-secondary/50 rounded-lg text-center hover:bg-secondary transition-colors"
                  >
                    <div className="font-semibold mb-1">Discord</div>
                    <p className="text-sm text-secondaryText">Join our community</p>
                  </a>
                  
                  <a 
                    href="https://substack.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-4 bg-secondary/50 rounded-lg text-center hover:bg-secondary transition-colors"
                  >
                    <div className="font-semibold mb-1">Substack</div>
                    <p className="text-sm text-secondaryText">Subscribe to our newsletter</p>
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
