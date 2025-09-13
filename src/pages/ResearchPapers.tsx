import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, ExternalLink } from 'lucide-react';
import Layout from '@/components/Layout';

const ResearchPapers = () => {
  const papers = [
    {
      title: "Shadow AMAI",
      description: "Advanced research on modular AI architecture and adaptive learning systems.",
      link: "https://drive.google.com/file/d/1ppaFh8S49nVEXUPYblnTupEqE9fPBCtd/view?usp=sharing"
    },
    {
      title: "Adaptive Modular AI",
      description: "Comprehensive study on adaptive modular artificial intelligence frameworks.",
      link: "https://drive.google.com/file/d/1Y7ID4vM3nn-Pi45jtLV2hkZWu1hWB2cu/view?usp=sharing"
    }
  ];

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

            {/* All Papers Button */}
            <motion.div variants={itemVariants} className="text-center">
              <a 
                href="https://drive.google.com/drive/folders/1EwuCDS87N3RpLDrY6qOcscqSEY2XfOr0?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="bg-foreground text-background hover:bg-foreground/90">
                  <FileText className="mr-2 h-4 w-4" />
                  View All Research Papers
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </motion.div>

            {/* Featured Papers */}
            <motion.div variants={itemVariants} className="space-y-6">
              <h2 className="text-2xl font-semibold text-center text-foreground mb-8">
                Featured Research
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {papers.map((paper, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <Card className="bg-card border-border hover:shadow-lg transition-all duration-300">
                      <CardHeader>
                        <CardTitle className="text-foreground flex items-center gap-2">
                          <FileText className="h-5 w-5" />
                          {paper.title}
                        </CardTitle>
                        <CardDescription className="text-muted-foreground">
                          {paper.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <a 
                          href={paper.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button 
                            variant="outline" 
                            className="w-full border-border text-foreground hover:bg-foreground/5"
                          >
                            Read Paper
                            <ExternalLink className="ml-2 h-4 w-4" />
                          </Button>
                        </a>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
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