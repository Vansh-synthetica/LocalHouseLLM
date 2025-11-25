import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, ExternalLink } from 'lucide-react';
import Layout from '@/components/Layout';

const ResearchPapers = () => {

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
                Research Papers
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Explore our cutting-edge research in modular AI, adaptive learning systems, and 
                the future of artificial intelligence.
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
                  View Research Papers on SSRN
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </motion.div>

            {/* Additional Info */}
            <motion.div variants={itemVariants} className="text-center space-y-4">
              <p className="text-muted-foreground">
                Our research focuses on creating more efficient, adaptive, and safe AI systems 
                through modular architectures and innovative learning approaches.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default ResearchPapers;