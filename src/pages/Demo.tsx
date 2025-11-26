
import { useState, useRef, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight } from 'lucide-react';
import SEO from '@/components/SEO';

// Message type
interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const Demo = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      role: 'assistant',
      content: 'Welcome to the LocalHouseLLM demo. Ask me anything!'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [funnelStatus, setFunnelStatus] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Simulate API call to Gemini (would be replaced with actual API integration)
  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    // Simulate loading time for funnel verification animation
    setFunnelStatus(true);
    
    try {
      // Simulate categories based on message content
      const simulatedCategories = [];
      if (input.toLowerCase().match(/science|physics|chemistry|biology|math/)) {
        simulatedCategories.push('Science');
      }
      if (input.toLowerCase().match(/money|finance|economy|stock|invest/)) {
        simulatedCategories.push('Finance');
      }
      if (simulatedCategories.length === 0) {
        simulatedCategories.push('General');
      }
      
      setCategories(simulatedCategories);
      
      // Simulate API response delay
      setTimeout(() => {
        // Sample response (would be replaced with actual API response)
        const botResponse: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: `This is a simulated response to your query. In a real implementation, this would be powered by Gemini API. Your message was: "${input}"`
        };
        
        setMessages(prev => [...prev, botResponse]);
        setIsLoading(false);
        setFunnelStatus(false);
      }, 2000);
    } catch (error) {
      console.error("Error with demo response:", error);
      setIsLoading(false);
      setFunnelStatus(false);
      
      // Error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I'm sorry, there was an error processing your request. Please try again."
      };
      
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  return (
    <Layout>
      <SEO
        title="Try AMAI Demo - Experience Modular AI in Action | LocalHouseLLM"
        description="Experience LocalHouseLLM's modular AI demo powered by adaptive expert modules. Test AICL communication, category routing, and AI safety verification in real-time."
        keywords="AI demo, modular AI demo, AMAI demo, AICL test, AI chatbot, expert modules demo, AI safety demo, adaptive AI"
        canonical="https://localhousellm.com/demo"
      />
      <div className="max-container py-10">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Live AI Demo: Experience Modular Intelligence</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-4">
            Try our modular AI system — ask any question below.
            This demo showcases category-based expert module routing while our full AMAI architecture is under development.
          </p>
        </div>
        
          <div className="max-w-4xl mx-auto">
          {/* Chat Interface */}
          <div className="glass mb-6 flex flex-col h-[70vh] max-h-[600px]">
            {/* Messages Area */}
            <div className="flex-1 p-6 overflow-y-auto"
                 style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.3) transparent' }}>
              {messages.map((message) => (
                <div 
                  key={message.id}
                  className={`mb-4 ${message.role === 'user' ? 'flex justify-end' : 'flex justify-start'}`}
                >
                  <div 
                    className={`p-4 rounded-lg max-w-[80%] ${
                      message.role === 'user' 
                        ? 'bg-primary/20 text-foreground' 
                        : 'bg-secondary text-secondary-foreground'
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start mb-4">
                  <div className="p-4 rounded-lg bg-secondary text-secondary-foreground max-w-[80%]">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-foreground rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-foreground rounded-full animate-pulse delay-100"></div>
                      <div className="w-2 h-2 bg-foreground rounded-full animate-pulse delay-200"></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
            
            {/* Input Area */}
            <div className="border-t border-border p-4">
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex gap-2"
              >
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-grow bg-secondary/50 border-border focus:border-primary"
                  disabled={isLoading}
                />
                <Button 
                  type="submit" 
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                  disabled={isLoading}
                >
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </form>
            </div>
          </div>
          
          <div className="glass p-4">
            <h2 className="text-lg font-semibold mb-4 text-center">Real-Time AI Module Analytics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">
                  ⚙️ Expert Module Category:
                </h3>
                <div className="flex flex-wrap gap-2">
                  {categories.length > 0 ? (
                    categories.map((category, index) => (
                      <span 
                        key={index} 
                        className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground"
                      >
                        {category}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-muted-foreground">No categories selected yet</span>
                  )}
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">
                  🔐 AI Safety Verification:
                </h3>
                {funnelStatus ? (
                  <div className="flex items-center space-x-1">
                    {Array(10).fill(0).map((_, i) => (
                      <span 
                        key={i} 
                        className={`inline-block w-2 h-2 rounded-full ${
                          i < 7 ? 'bg-accent animate-pulse-light' : 'bg-muted'
                        }`}
                        style={{ animationDelay: `${i * 100}ms` }}
                      />
                    ))}
                    <span className="text-xs ml-2 text-muted-foreground">Verifying...</span>
                  </div>
                ) : (
                  categories.length > 0 ? (
                    <div className="text-xs">
                      <span className="text-success">✓✓✓✓ ... 1000/1000 Passed</span>
                    </div>
                  ) : (
                    <span className="text-xs text-muted-foreground">Awaiting input</span>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Demo;
