import { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import SEO from '@/components/SEO';

// Sample blog posts
const blogPosts = [
  {
    id: 1,
    title: "Why Monolithic LLMs Can't Adapt in the Real World",
    excerpt: "The limitations of current large language models and how a modular approach offers a more sustainable path forward.",
    date: "April 25, 2025",
    category: "Research",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=800&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Modular AI: The Next Frontier",
    excerpt: "How specialized AI modules can work together to create more efficient, accurate, and transparent language models.",
    date: "April 20, 2025",
    category: "Innovation",
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Building a 1,000-Funnel Verification System",
    excerpt: "The technical challenges and solutions behind creating a robust verification system for language model outputs.",
    date: "April 15, 2025",
    category: "Technical",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "How Language Can Be Categorized at Scale",
    excerpt: "Our approach to breaking down language into logical categories for specialized processing and understanding.",
    date: "April 10, 2025",
    category: "Research",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&auto=format&fit=crop"
  }
];

const Blog = () => {
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "LocalHouseLLM Blog",
    "description": "Insights, research, and updates on modular AI architecture, AMAI technology, and the future of intelligent systems",
    "url": "https://localhouse.ai/blog",
    "publisher": {
      "@type": "Organization",
      "name": "LocalHouseLLM"
    }
  };

  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter posts based on search query
  const filteredPosts = searchQuery 
    ? blogPosts.filter(post => 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : blogPosts;

  return (
    <Layout>
      <SEO
        title="AI Research Blog - Modular Architecture Insights | LocalHouseLLM"
        description="Explore insights into modular AI architecture, AMAI expert systems, AICL communication, and the future of artificial intelligence. Learn about our approach to building next-generation language models."
        keywords="AI blog, modular AI insights, AMAI research, AI architecture blog, AICL articles, machine learning blog, AI development blog, expert modules blog, LocalHouse research"
        canonical="https://localhouse.ai/blog"
        schema={blogSchema}
      />
      <section className="py-20">
        <div className="max-container">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Research Blog</h1>
            <p className="text-xl text-secondaryText max-w-3xl mx-auto">
              Insights into our approach to building the next generation of language models.
            </p>
          </div>
          
          {/* Search */}
          <div className="max-w-2xl mx-auto mb-16">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search articles..."
                className="bg-secondary/50 border-white/10 pl-12"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-secondaryText w-5 h-5" />
            </div>
          </div>
          
          {/* Blog posts grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredPosts.map(post => (
              <div key={post.id} className="glass hover-glow transition-all duration-300">
                <div 
                  className="h-48 bg-cover bg-center rounded-t-lg"
                  style={{ backgroundImage: `url(${post.image})` }}
                />
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xs px-3 py-1 bg-secondary rounded-full text-white">
                      {post.category}
                    </span>
                    <span className="text-xs text-secondaryText">
                      {post.date}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                  <p className="text-secondaryText mb-6">{post.excerpt}</p>
                  <Button variant="outline" size="sm" className="border-cyberBlue text-cyberBlue hover:bg-cyberBlue/10">
                    Read Article
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-secondaryText">No articles found matching your search.</p>
            </div>
          )}
          
          {/* Newsletter */}
          <div className="mt-20 glass p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
            <p className="text-secondaryText mb-6 max-w-2xl mx-auto">
              Subscribe to our newsletter to receive the latest updates on our research and development.
            </p>
            <div className="max-w-md mx-auto flex gap-4">
              <Input 
                type="email" 
                placeholder="Your email address" 
                className="bg-secondary/50 border-white/10"
              />
              <Button className="bg-cyberBlue text-black hover:bg-cyberBlue/90">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Blog;
