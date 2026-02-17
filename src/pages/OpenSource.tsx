import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, ExternalLink, Code2 } from 'lucide-react';
import Layout from '@/components/Layout';
import SEO from '@/components/SEO';

const papers = [
  {
    title: 'Adaptive Modular AI: A New Paradigm for Scalable, Safe, and Efficient Language Models',
    url: 'https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5695122',
  },
  {
    title: 'CoT Looping Systems, Continuous Hypothesis Propagation, and Predictability Ratios',
    url: 'https://papers.ssrn.com/sol3/papers.cfm?abstract_id=6041794',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const OpenSource = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Open Source — LocalHouseLLM",
    "description": "Research papers and open source contributions from LocalHouseLLM.",
    "publisher": { "@type": "Organization", "name": "LocalHouseLLM" },
    "url": "https://localhouse.ai/opensource",
  };

  return (
    <Layout>
      <SEO
        title="Open Source — Research & Code | LocalHouseLLM"
        description="Explore LocalHouseLLM's published research papers on modular AI and open source code contributions."
        keywords="open source AI, modular AI research, AMAI papers, AICL research, LocalHouseLLM open source"
        canonical="https://localhouse.ai/opensource"
        type="website"
        schema={schema}
      />
      <div className="min-h-screen bg-background text-foreground">
        <div className="max-container py-20">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="space-y-16"
          >
            {/* Header */}
            <motion.div variants={itemVariants} className="text-center space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">Open Source</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our research and code — shared openly to advance modular AI for everyone.
              </p>
            </motion.div>

            {/* Research Papers Section */}
            <motion.section variants={itemVariants} className="space-y-8">
              <div className="flex items-center gap-3">
                <FileText className="h-6 w-6 text-foreground" />
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">Research Papers</h2>
              </div>
              <div className="grid gap-6">
                {papers.map((paper, i) => (
                  <motion.div
                    key={i}
                    variants={itemVariants}
                    whileHover={{ y: -4 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <a href={paper.url} target="_blank" rel="noopener noreferrer" className="block">
                      <Card className="transition-shadow hover:shadow-lg cursor-pointer">
                        <CardHeader>
                          <CardTitle className="text-lg md:text-xl flex items-start justify-between gap-4">
                            <span>{paper.title}</span>
                            <ExternalLink className="h-5 w-5 shrink-0 mt-1 text-muted-foreground" />
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <span className="text-sm text-muted-foreground">Published on SSRN</span>
                        </CardContent>
                      </Card>
                    </a>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Open Source Code Section */}
            <motion.section variants={itemVariants} className="space-y-8">
              <div className="flex items-center gap-3">
                <Code2 className="h-6 w-6 text-foreground" />
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">Open Source Code</h2>
              </div>
              <Card className="border-dashed">
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground text-lg">Coming soon.</p>
                  <p className="text-muted-foreground text-sm mt-2">
                    Open source repositories and tools will be listed here.
                  </p>
                </CardContent>
              </Card>
            </motion.section>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default OpenSource;
