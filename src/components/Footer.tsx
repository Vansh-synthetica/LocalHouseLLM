
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
      opacity: 1, y: 0,
      transition: { delay: custom * 0.1, duration: 0.6 }
    })
  };

  const linkClass = "text-muted-foreground hover:text-foreground transition-colors duration-300 inline-block relative after:absolute after:left-0 after:right-0 after:bottom-0 after:h-[1px] after:bg-foreground after:origin-bottom-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300";

  return (
    <footer className="bg-black/30 backdrop-blur-sm border-t border-border pt-20 pb-10">
      <div className="max-container">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
          {/* Brand */}
          <motion.div className="space-y-6 col-span-2" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} custom={0}>
            <Link to="/" className="inline-flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-md bg-primary flex items-center justify-center text-primary-foreground font-lato relative overflow-hidden">
                <span className="font-bold text-lg relative z-10">\</span>
                <motion.div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0" initial={{ x: -100 }} animate={{ x: 100 }} transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }} />
              </div>
              <span className="font-lato text-xl font-bold text-foreground">LocalHouseLLM</span>
            </Link>
            <p className="text-muted-foreground leading-relaxed max-w-sm">
              An AI infrastructure company building open, modular components for decentralized AI — AICL, ORCHA, memory, safety, tools, and intelligence modules.
            </p>
          </motion.div>

          {/* Stack */}
          <motion.div className="space-y-6" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} custom={1}>
            <h4 className="text-sm font-lato font-semibold text-foreground">Stack</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/stack" className={linkClass}>Overview</Link></li>
              <li><Link to="/stack/aicl" className={linkClass}>AICL</Link></li>
              <li><Link to="/stack/orcha" className={linkClass}>ORCHA</Link></li>
              <li><Link to="/stack/memory" className={linkClass}>Memory</Link></li>
              <li><Link to="/stack/safety" className={linkClass}>Safety</Link></li>
              <li><Link to="/stack/tools" className={linkClass}>Tools</Link></li>
              <li><Link to="/stack/modules" className={linkClass}>Modules</Link></li>
            </ul>
          </motion.div>

          {/* Products & Build */}
          <motion.div className="space-y-6" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} custom={2}>
            <h4 className="text-sm font-lato font-semibold text-foreground">Products & Build</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/products" className={linkClass}>All products</Link></li>
              <li><Link to="/anvira" className={linkClass}>Anvira</Link></li>
              <li><Link to="/nomi" className={linkClass}>Nomi</Link></li>
              <li><Link to="/inkflow" className={linkClass}>InkFlow</Link></li>
              <li><Link to="/devquill" className={linkClass}>DevQuill</Link></li>
              <li><Link to="/docs" className={linkClass}>Docs</Link></li>
              <li><Link to="/start" className={linkClass}>Start here</Link></li>
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div className="space-y-6" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} custom={3}>
            <h4 className="text-sm font-lato font-semibold text-foreground">Company</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/mission" className={linkClass}>Mission</Link></li>
              <li><Link to="/vision" className={linkClass}>Vision</Link></li>
              <li><Link to="/research" className={linkClass}>Research</Link></li>
              <li><Link to="/benchmarks" className={linkClass}>Benchmarks</Link></li>
              <li><Link to="/use-cases" className={linkClass}>Use cases</Link></li>
              <li><Link to="/release-logs" className={linkClass}>Release logs</Link></li>
              <li><Link to="/faq" className={linkClass}>FAQ</Link></li>
              <li><Link to="/about" className={linkClass}>About</Link></li>
              <li><Link to="/contact" className={linkClass}>Contact</Link></li>
              <li><Link to="/sitemap" className={linkClass}>Sitemap</Link></li>
            </ul>
          </motion.div>
        </div>

        <motion.div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-sm text-muted-foreground" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.3 }} viewport={{ once: true }}>
          <p>© {currentYear} LocalHouseLLM — open, modular infrastructure for decentralized AI.</p>
          <div className="flex gap-5">
            <a href="https://github.com/LocalHouseLLM" target="_blank" rel="noopener noreferrer" className={linkClass}>GitHub</a>
            <a href="https://x.com/localhousellm" target="_blank" rel="noopener noreferrer" className={linkClass}>X</a>
            <a href="https://www.linkedin.com/company/localhousellm" target="_blank" rel="noopener noreferrer" className={linkClass}>LinkedIn</a>
            <a href="https://www.instagram.com/localhousellm/" target="_blank" rel="noopener noreferrer" className={linkClass}>Instagram</a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
