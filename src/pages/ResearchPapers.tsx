import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, ExternalLink } from 'lucide-react';
import Layout from '@/components/Layout';
import SEO from '@/components/SEO';

const ResearchPapers = () => {
  const researchSchema = {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    "headline": "LocalHouseLLM Research Papers on Modular AI",
    "description": "Cutting-edge research in modular AI architecture, AICL communication, adaptive learning systems, and AI safety",
    "author": {
      "@type": "Organization",
      "name": "LocalHouseLLM"
    },
    "publisher": {
      "@type": "Organization",
      "name": "SSRN"
    },
    "url": "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5695122"
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <Layout>
      <SEO
        title="Research Papers on Modular AI Architecture | LocalHouseLLM"
        description="Explore LocalHouseLLM's cutting-edge research in modular AI, AICL communication, adaptive learning systems, and AI safety. Read our published papers on SSRN."
        keywords="AI research papers, modular AI research, AICL research, AMAI papers, AI architecture research, adaptive AI studies, AI safety research"
        canonical="https://localhousellm.com/research-papers"
        type="article"
        schema={researchSchema}
      />
      <div className="min-h-screen bg-background text-foreground">
        <div className="max-container py-20">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="space-y-12"
          >
            {/* Header Section */}
            <motion.div variants={itemVariants} className="text-center space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                AI Research Papers: Modular Architecture & Beyond
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Explore our cutting-edge research in modular AI architecture, AICL communication systems, adaptive learning frameworks, and 
                the future of safe, scalable artificial intelligence.
              </p>
            </motion.div>

            {/* SSRN Papers Link */}
            <motion.div variants={itemVariants} className="text-center">
              <a 
                href="https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5695122"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="bg-foreground text-background hover:bg-foreground/90">
                  <FileText className="mr-2 h-4 w-4" />
                  View AI Research Papers on SSRN
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </motion.div>

            {/* Additional Info */}
            <motion.div variants={itemVariants} className="text-center space-y-4">
              <p className="text-muted-foreground">
                Our AI research focuses on creating more efficient, adaptive, and safe intelligent systems 
                through modular architectures, AICL communication protocols, and innovative learning approaches.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default ResearchPapers;