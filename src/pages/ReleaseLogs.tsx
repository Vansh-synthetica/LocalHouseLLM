import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Calendar, Code2, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import Layout from '@/components/Layout';

// Easy-to-update release logs data
// Simply add new releases to the beginning of this array
const RELEASE_LOGS = [
  {
    version: "v1.2.0",
    date: "2024-01-25",
    type: "major",
    title: "Enhanced Modular Intelligence",
    summary: "Major improvements to our specialized word category models with 40% better accuracy.",
    features: [
      "New specialized models for scientific terminology",
      "Improved context understanding for technical documentation", 
      "Enhanced safety verification layer with 1,200 verification points",
      "Reduced response latency by 35%"
    ],
    fixes: [
      "Fixed edge cases in mathematical expression parsing",
      "Resolved memory optimization issues in large context windows"
    ],
    breaking: []
  },
  {
    version: "v1.1.5",
    date: "2024-01-20",
    type: "minor",
    title: "Performance Optimizations",
    summary: "Significant performance improvements and bug fixes across all model modules.",
    features: [
      "Optimized model loading times",
      "Enhanced multi-threading support",
      "Improved error handling and recovery"
    ],
    fixes: [
      "Fixed inconsistent responses in edge cases",
      "Resolved API timeout issues",
      "Fixed memory leaks in long-running sessions"
    ],
    breaking: []
  },
  {
    version: "v1.1.0", 
    date: "2024-01-15",
    type: "major",
    title: "Live Learning Integration",
    summary: "Introduced adaptive learning capabilities that improve model performance over time.",
    features: [
      "Real-time model adaptation based on usage patterns",
      "Privacy-preserving learning mechanisms",
      "Advanced feedback integration system",
      "Dynamic model weight optimization"
    ],
    fixes: [
      "Improved model stability during adaptation",
      "Fixed rare crashes during model updates"
    ],
    breaking: [
      "API endpoint /v1/adapt now requires authentication",
      "Changed response format for learning metrics"
    ]
  },
  {
    version: "v1.0.8",
    date: "2024-01-10", 
    type: "patch",
    title: "Critical Security Updates",
    summary: "Important security patches and verification layer improvements.",
    features: [],
    fixes: [
      "Enhanced input sanitization",
      "Improved output verification algorithms",
      "Fixed potential security vulnerabilities in API endpoints"
    ],
    breaking: []
  },
  {
    version: "v1.0.5",
    date: "2024-01-05",
    type: "minor",
    title: "UI/UX Improvements", 
    summary: "Enhanced user interface and developer experience improvements.",
    features: [
      "New dashboard for model monitoring",
      "Improved documentation and examples",
      "Enhanced debugging tools",
      "Better error messages and logging"
    ],
    fixes: [
      "Fixed UI responsiveness issues",
      "Improved accessibility features",
      "Fixed dark mode inconsistencies"
    ],
    breaking: []
  }
];

const ITEMS_PER_PAGE = 3;

const ReleaseLogs = () => {
  const [visibleItems, setVisibleItems] = useState(ITEMS_PER_PAGE);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const showMore = () => {
    setVisibleItems(prev => Math.min(prev + ITEMS_PER_PAGE, RELEASE_LOGS.length));
  };

  const toggleExpanded = (version: string) => {
    setExpandedItems(prev => 
      prev.includes(version) 
        ? prev.filter(v => v !== version)
        : [...prev, version]
    );
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'major':
        return <Zap className="w-4 h-4" />;
      case 'minor':
        return <Code2 className="w-4 h-4" />;
      default:
        return <Calendar className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'major':
        return 'bg-gradient-to-r from-emerald-500/20 to-blue-500/20 border-emerald-500/30';
      case 'minor':
        return 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-blue-500/30';
      default:
        return 'bg-gradient-to-r from-gray-500/20 to-slate-500/20 border-gray-500/30';
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }
    }
  };

  return (
    <Layout>
      <section className="py-24 bg-black relative overflow-hidden min-h-screen">
        {/* Background elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900/50 via-black to-black"></div>
          <div className="absolute w-[400px] h-[400px] left-[10%] top-[20%] rounded-full bg-emerald-500/10 blur-[100px] opacity-30"></div>
          <div className="absolute w-[300px] h-[300px] right-[15%] bottom-[30%] rounded-full bg-blue-500/10 blur-[80px] opacity-20"></div>
        </div>

        <div className="max-container relative z-10">
          {/* Header */}
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            <motion.h1 
              className="text-4xl md:text-5xl font-playfair font-bold mb-6 text-white"
              variants={fadeInUp}
            >
              Release Logs
            </motion.h1>
            
            <motion.div 
              className="h-[2px] w-16 bg-white/30 mx-auto mb-6"
              initial={{ width: 0 }}
              animate={{ width: 64 }}
              transition={{ duration: 1, delay: 0.3 }}
            />
            
            <motion.p 
              className="text-lg text-gray-300 max-w-2xl mx-auto"
              variants={fadeInUp}
            >
              Stay updated with the latest improvements, features, and fixes to LocalHouseLLM. 
              Track our journey as we continuously evolve and enhance our modular AI platform.
            </motion.p>
          </motion.div>

          {/* Release logs list */}
          <motion.div
            className="space-y-8 mb-12"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {RELEASE_LOGS.slice(0, visibleItems).map((release, index) => (
              <motion.div
                key={release.version}
                variants={itemVariants}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <Card className={`luxury-card border ${getTypeColor(release.type)} hover-glow`}>
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <motion.div 
                          className={`p-2 rounded-lg ${getTypeColor(release.type)}`}
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.2 }}
                        >
                          {getTypeIcon(release.type)}
                        </motion.div>
                        <div>
                          <CardTitle className="text-xl font-playfair text-white mb-1">
                            {release.title} 
                            <span className="ml-2 text-emerald-400 font-mono text-base">
                              {release.version}
                            </span>
                          </CardTitle>
                          <div className="flex items-center gap-2 text-gray-400 text-sm">
                            <Calendar className="w-3 h-3" />
                            {new Date(release.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long', 
                              day: 'numeric'
                            })}
                            <span className="mx-2">•</span>
                            <span className="capitalize text-xs px-2 py-1 rounded-full bg-white/10">
                              {release.type}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <p className="text-gray-300 leading-relaxed">
                      {release.summary}
                    </p>

                    <Collapsible>
                      <CollapsibleTrigger asChild>
                        <Button 
                          variant="ghost" 
                          className="w-full justify-between text-white hover:bg-white/5 p-3"
                          onClick={() => toggleExpanded(release.version)}
                        >
                          <span className="text-sm">View Details</span>
                          <motion.div
                            animate={{ rotate: expandedItems.includes(release.version) ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronDown className="w-4 h-4" />
                          </motion.div>
                        </Button>
                      </CollapsibleTrigger>
                      
                      <CollapsibleContent className="space-y-4 pt-4">
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                          className="space-y-4"
                        >
                          {/* Features */}
                          {release.features.length > 0 && (
                            <div className="space-y-2">
                              <h4 className="text-emerald-400 font-medium text-sm flex items-center gap-2">
                                <Zap className="w-3 h-3" />
                                New Features
                              </h4>
                              <ul className="space-y-1 ml-5">
                                {release.features.map((feature, idx) => (
                                  <motion.li 
                                    key={idx}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="text-gray-300 text-sm flex items-start"
                                  >
                                    <span className="text-emerald-400 mr-2 mt-1">•</span>
                                    {feature}
                                  </motion.li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Fixes */}
                          {release.fixes.length > 0 && (
                            <div className="space-y-2">
                              <h4 className="text-blue-400 font-medium text-sm flex items-center gap-2">
                                <Code2 className="w-3 h-3" />
                                Bug Fixes
                              </h4>
                              <ul className="space-y-1 ml-5">
                                {release.fixes.map((fix, idx) => (
                                  <motion.li 
                                    key={idx}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="text-gray-300 text-sm flex items-start"
                                  >
                                    <span className="text-blue-400 mr-2 mt-1">•</span>
                                    {fix}
                                  </motion.li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Breaking changes */}
                          {release.breaking.length > 0 && (
                            <div className="space-y-2">
                              <h4 className="text-red-400 font-medium text-sm flex items-center gap-2">
                                ⚠️ Breaking Changes
                              </h4>
                              <ul className="space-y-1 ml-5">
                                {release.breaking.map((change, idx) => (
                                  <motion.li 
                                    key={idx}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="text-gray-300 text-sm flex items-start"
                                  >
                                    <span className="text-red-400 mr-2 mt-1">•</span>
                                    {change}
                                  </motion.li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </motion.div>
                      </CollapsibleContent>
                    </Collapsible>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Load more button */}
          {visibleItems < RELEASE_LOGS.length && (
            <motion.div 
              className="text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Button 
                onClick={showMore}
                variant="outline"
                className="border-white/30 text-white bg-transparent hover:bg-white/5 hover:border-white/50"
              >
                Load More ({RELEASE_LOGS.length - visibleItems} remaining)
              </Button>
            </motion.div>
          )}

          {/* All loaded message */}
          {visibleItems >= RELEASE_LOGS.length && RELEASE_LOGS.length > ITEMS_PER_PAGE && (
            <motion.div 
              className="text-center text-gray-400 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              All release logs loaded • {RELEASE_LOGS.length} total releases
            </motion.div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default ReleaseLogs;