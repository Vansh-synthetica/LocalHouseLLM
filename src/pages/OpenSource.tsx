import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, ExternalLink, Code2, Github, FlaskConical } from 'lucide-react';
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

const repos = [
  {
    name: 'AICL — Adaptive Inter-Module Communication Language',
    description: 'A lightweight, high-performance communication layer for modular AI systems. Provides packets, routing, safety filters, and module management for building scalable AI architectures.',
    url: 'https://github.com/LocalHouseLLM/AICL',
  },
  {
    name: 'Orcha',
    description: 'A high-performance orchestration runtime for executing multiple AI experts in parallel, selecting the best outputs, retrying weak results, and producing a coherent final answer. Designed for modular AI systems, research, and real-world deployments.',
    url: 'https://github.com/LocalHouseLLM/orcha01',
    badge: 'Experimental — Early Stage',
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
        canonical="https://localhousellm.com/opensource"
        type="website"
        schema={schema}
      />
      <div className="min-h-screen text-foreground">
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
              <div className="grid gap-6">
                {repos.map((repo, i) => (
                  <motion.div
                    key={i}
                    variants={itemVariants}
                    whileHover={{ y: -4 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <a href={repo.url} target="_blank" rel="noopener noreferrer" className="block">
                      <Card className="transition-shadow hover:shadow-lg cursor-pointer">
                        <CardHeader>
                          <CardTitle className="text-lg md:text-xl flex items-start justify-between gap-4">
                            <span>{repo.name}</span>
                            <Github className="h-5 w-5 shrink-0 mt-1 text-muted-foreground" />
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <p className="text-sm text-muted-foreground">{repo.description}</p>
                          {repo.badge && (
                            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground bg-muted px-2.5 py-1 rounded-full">
                              <FlaskConical className="h-3 w-3" />
                              {repo.badge}
                            </span>
                          )}
                        </CardContent>
                      </Card>
                    </a>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default OpenSource;
