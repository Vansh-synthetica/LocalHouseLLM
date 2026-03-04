
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import { ArrowRight, Search, Home } from "lucide-react";

const suggestedPages = [
  { to: "/anvira", label: "Anvira — Modular AI Models", desc: "Explore our local-first modular AI architecture" },
  { to: "/inkflow", label: "InkFlow — AI Writing Assistant", desc: "AI copywriting and creative writing agent" },
  { to: "/devquill", label: "DevQuill — AI Coding Assistant", desc: "Precision AI for developers" },
  { to: "/about", label: "About LocalHouseLLM", desc: "Our mission, team, and vision" },
  { to: "/opensource", label: "Open Source", desc: "Our open source contributions" },
];

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  const notFoundSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Page Not Found — LocalHouseLLM",
    "description": "The page you requested could not be found. Explore LocalHouseLLM's modular AI products including Anvira, InkFlow, and DevQuill.",
    "url": `https://localhousellm.com${location.pathname}`,
    "isPartOf": {
      "@type": "WebSite",
      "name": "LocalHouseLLM",
      "url": "https://localhousellm.com"
    }
  };

  return (
    <Layout>
      <SEO
        title="Page Not Found — LocalHouseLLM | Modular AI Architecture"
        description="The page you're looking for doesn't exist. Explore LocalHouseLLM's modular AI products — Anvira local AI, InkFlow writing assistant, and DevQuill coding agent."
        keywords="LocalHouseLLM, 404, page not found, modular AI, Anvira, InkFlow, DevQuill"
        canonical="https://localhousellm.com/"
        schema={notFoundSchema}
      />

      <section className="min-h-[80vh] flex items-center justify-center py-20">
        <div className="max-container text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="premium-glass border border-border p-10 md:p-16 max-w-2xl mx-auto mb-12">
              <motion.div
                className="mb-6 w-20 h-20 mx-auto rounded-xl bg-foreground/10 flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
              >
                <Search className="w-8 h-8 text-foreground/60" />
              </motion.div>

              <h1 className="text-4xl md:text-5xl font-lato font-bold mb-4 text-gradient">
                404 — Page Not Found
              </h1>

              <p className="text-muted-foreground text-base md:text-lg mb-3 max-w-md mx-auto">
                The page <code className="text-foreground/80 bg-foreground/10 px-2 py-0.5 rounded text-sm">{location.pathname}</code> doesn't exist or has been moved.
              </p>

              <p className="text-muted-foreground text-sm mb-8">
                Try navigating to one of our products below, or return home.
              </p>

              <Link to="/">
                <Button className="bg-foreground/90 text-background hover:bg-foreground text-sm group px-8 py-2.5">
                  <Home className="mr-2 w-4 h-4" />
                  Return Home
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Suggested Pages */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
          >
            <h2 className="text-lg font-lato font-semibold mb-6 text-foreground/80">
              Looking for one of these?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {suggestedPages.map((page, i) => (
                <motion.div
                  key={page.to}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                >
                  <Link
                    to={page.to}
                    className="block premium-glass p-5 hover:bg-foreground/5 transition-all duration-300 hover:-translate-y-1 text-left"
                  >
                    <h3 className="text-sm font-lato font-semibold text-foreground mb-1">{page.label}</h3>
                    <p className="text-xs text-muted-foreground">{page.desc}</p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default NotFound;
