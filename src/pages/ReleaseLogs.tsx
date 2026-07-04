import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Calendar, Code2, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import Layout from '@/components/Layout';
import SEO from '@/components/SEO';

// Easy-to-update release logs data
// Simply add new releases to the beginning of this array

const RELEASE_LOGS = [
  {
    version: "v0.4",
    date: "2025-08-05",
    type: "stable",
    title: "Finalized Modular AMA with GPT-2 Backend",
    summary: "AMA v0.4 stabilizes the modular pipeline, integrates safety checks, improves UI, and prepares the foundation for advanced NLP features in v0.5.",
    features: [
      "Completed modular pipeline with logging, safety, and module routing",
      "Finalized ai_responder with clean generation and fallback handling",
      "Streamlit UI with chat layout and warning banner for experimental status",
      "Integrated HuggingFace Roberta safety classifier with confidence scoring",
      "Improved performance with cached model loading",
      "Structured logging with tags for debugging and monitoring"
    ],
    experimental: [
      "Initial GPT-2 text generation (basic conversation, no context awareness)",
      "Basic repetition cleaning in AI outputs",
      "Safety-aware fallback responses on errors or unsafe content"
    ],
    fixes: [
      "Resolved session_state modification error in Streamlit",
      "Fixed KeyError caused by logging overwriting reserved keys",
      "Handled missing model_name gracefully in pipeline",
      "Removed deprecated st.experimental_rerun usage"
    ],
    breaking: [],
    known_issues: [
      "Responses may repeat or appear inconsistent due to GPT-2 limitations",
      "No conversational memory; each response is stateless",
      "Multi-turn dialogue and advanced NLP context not yet implemented",
      "Model loading may be slow on first run"
    ]
  },
  {
    version: "v0.3",
    date: "2025-08-01",
    type: "stable",
    title: "Advanced Modular Assignment with ML Safety",
    summary: "Introduced ML-based safety detection, multi-module assignment, and real-time monitoring.",
    features: [
      "Integrated HuggingFace model for intelligent safety checks",
      "Multi-module assignment for complex queries",
      "Real-time live dashboard with auto-refresh and visual stats",
      "Improved pipeline with robust error handling and logs",
      "Streamlined code structure for stability and future expansion"
    ],
    fixes: [
      "Resolved path issues and ensured ML model loads correctly",
      "Stabilized Streamlit dashboard auto-refresh",
      "Reduced false negatives in safety classification"
    ],
    breaking: [],
    known_issues: [
      "False positives still occur in some safe queries",
      "Blocked inputs are not fully visible in dashboard logs",
      "ML model decisions lack reasoning transparency"
    ]
  },
  {
    version: "v0.2",
    date: "2025-07-31",
    type: "stable",
    title: "Final Stable Build of v0.2",
    summary: "Improved structure, safety, and reliability of AMA.",
    features: [
      "Relative path handling with os.path.join",
      "Centralized safety filter with consistent output",
      "Error handling throughout the pipeline to prevent crashes",
      "Improved module assignment with better keyword scanning",
      "Confidence score calculation for module matches",
      "Automatic log directory creation and CSV header management",
      "Separated orchestrator logic for clarity",
      "UI displays clear safety status, matched keywords, module, and confidence",
      "Graceful handling of missing modules.json"
    ],
    fixes: [
      "Resolved path-related bugs",
      "Fixed unpacking errors and missing values",
      "Prevented crashes when modules.json is missing",
      "Stabilized execution flow with error catching"
    ],
    breaking: [],
    known_issues: [
      "Mathematical expressions still treated as plain text",
      "Confidence scoring is basic and rule-based",
      "Safety filter remains keyword-based and not context-aware",
      "Modules.json is static and not editable from UI"
    ]
  },
  {
    version: "v0.1",
    date: "2025-07-31",
    type: "initial",
    title: "Initial Build",
    summary: "First functional version of AMA with basic module assignment and safety filtering.",
    features: [
      "Basic Streamlit UI for user input",
      "Pipeline to process input and return module assignment",
      "Keyword-based module matching in orchestrator",
      "Basic safety filter to block unsafe terms",
      "CSV logging of user requests"
    ],
    fixes: [],
    breaking: [],
    known_issues: [
      "Hardcoded paths caused file loading errors",
      "Safety filter was minimal and inconsistent",
      "Only first keyword was matched; no confidence scoring",
      "Lacked error handling for unexpected inputs",
      "Logs were not created if the directory was missing",
      "Mixed logic between pipeline and orchestrator",
      "UI lacked proper error messages; matched keywords often empty",
      "Missing modules.json caused crashes",
      "Mathematical expressions were treated as plain text"
    ]
  }
];

const ITEMS_PER_PAGE = 3;

const ReleaseLogs = () => {
  const releaseSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": "LocalHouseLLM Release Logs and Updates",
    "description": "Track the evolution of LocalHouseLLM's modular AI platform with detailed release logs, feature updates, and improvements",
    "author": {
      "@type": "Organization",
      "name": "LocalHouseLLM"
    }
  };

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
        return 'bg-gradient-to-r from-success/20 to-primary/20 border-success/30';
      case 'minor':
        return 'bg-gradient-to-r from-primary/20 to-accent/20 border-primary/30';
      default:
        return 'bg-gradient-to-r from-muted/20 to-secondary/20 border-muted/30';
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
      <SEO
        title="Release Logs - Track AMAI Development Progress | LocalHouseLLM"
        description="Stay updated with LocalHouseLLM release logs. Track improvements, features, and fixes to our modular AI platform. Follow our journey building AMAI expert modules and AICL communication technology with detailed version history."
        keywords="LocalHouseLLM updates, AMAI changelog, AI platform updates, release notes, version history, AI development log, modular AI progress, AICL updates, expert module updates, AI feature releases"
        canonical="https://localhousellm.lovable.app/release-logs"
        schema={releaseSchema}
      />
      <section className="py-24 relative overflow-hidden min-h-screen">

        <div className="max-container relative z-10">
          {/* Header */}
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            <motion.h1 
              className="text-4xl md:text-5xl font-lato font-bold mb-6 text-foreground"
              variants={fadeInUp}
            >
              Release Logs: AMAI Development Journey
            </motion.h1>
            
            <motion.div 
              className="h-[2px] w-16 bg-foreground/30 mx-auto mb-6"
              initial={{ width: 0 }}
              animate={{ width: 64 }}
              transition={{ duration: 1, delay: 0.3 }}
            />
            
            <motion.p 
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
              variants={fadeInUp}
            >
              Stay updated with the latest improvements, features, and fixes to LocalHouseLLM's modular AI platform. 
              Track our journey as we continuously evolve AMAI and AICL to enhance AI intelligence, safety, and efficiency.
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
                          <CardTitle className="text-xl font-lato text-foreground mb-1">
                            {release.title} 
                            <span className="ml-2 text-success font-mono text-base">
                              {release.version}
                            </span>
                          </CardTitle>
                          <div className="flex items-center gap-2 text-muted-foreground text-sm">
                            <Calendar className="w-3 h-3" />
                            {new Date(release.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long', 
                              day: 'numeric'
                            })}
                            <span className="mx-2">•</span>
                            <span className="capitalize text-xs px-2 py-1 rounded-full bg-muted">
                              {release.type}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">
                      {release.summary}
                    </p>

                    <Collapsible>
                      <CollapsibleTrigger asChild>
                        <Button 
                          variant="ghost" 
                          className="w-full justify-between text-foreground hover:bg-muted/50 p-3"
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
                              <h4 className="text-success font-medium text-sm flex items-center gap-2">
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
                                    className="text-muted-foreground text-sm flex items-start"
                                  >
                                    <span className="text-success mr-2 mt-1">•</span>
                                    {feature}
                                  </motion.li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Fixes */}
                          {release.fixes.length > 0 && (
                            <div className="space-y-2">
                              <h4 className="text-primary font-medium text-sm flex items-center gap-2">
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
                                    className="text-muted-foreground text-sm flex items-start"
                                  >
                                    <span className="text-primary mr-2 mt-1">•</span>
                                    {fix}
                                  </motion.li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Breaking changes */}
                          {release.breaking.length > 0 && (
                            <div className="space-y-2">
                              <h4 className="text-destructive font-medium text-sm flex items-center gap-2">
                                ⚠️ Breaking Changes
                              </h4>
                              <ul className="space-y-1 ml-5">
                                {release.breaking.map((change, idx) => (
                                  <motion.li 
                                    key={idx}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="text-muted-foreground text-sm flex items-start"
                                  >
                                    <span className="text-destructive mr-2 mt-1">•</span>
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
                className="border-border text-foreground bg-transparent hover:bg-muted/50 hover:border-border"
              >
                Load More ({RELEASE_LOGS.length - visibleItems} remaining)
              </Button>
            </motion.div>
          )}

          {/* All loaded message */}
          {visibleItems >= RELEASE_LOGS.length && RELEASE_LOGS.length > ITEMS_PER_PAGE && (
            <motion.div 
              className="text-center text-muted-foreground text-sm"
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
