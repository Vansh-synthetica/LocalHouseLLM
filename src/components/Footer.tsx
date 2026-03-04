
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <motion.div className="space-y-6" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} custom={0}>
            <Link to="/" className="inline-flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-md bg-primary flex items-center justify-center text-primary-foreground font-lato relative overflow-hidden">
                <span className="font-bold text-lg relative z-10">LH</span>
                <motion.div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0" initial={{ x: -100 }} animate={{ x: 100 }} transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }} />
              </div>
              <span className="font-lato text-xl font-bold text-foreground">LocalHouseLLM</span>
            </Link>
            <p className="text-muted-foreground leading-relaxed">
              Modular Intelligence — Local, Secure, Scalable.
            </p>
          </motion.div>

          {/* Products */}
          <motion.div className="space-y-6" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} custom={1}>
            <h4 className="text-lg font-lato font-bold text-foreground">Products</h4>
            <ul className="space-y-3">
              <li><Link to="/anvira" className={linkClass}>Anvira</Link></li>
              <li><Link to="/anvira/o1" className={linkClass}>Anvira o1</Link></li>
              <li><Link to="/anvira/o1e" className={linkClass}>Anvira o1e</Link></li>
              <li><Link to="/anvira/h1" className={linkClass}>Anvira h1</Link></li>
              <li><Link to="/inkflow" className={linkClass}>InkFlow</Link></li>
              <li><Link to="/devquill" className={linkClass}>DevQuill</Link></li>
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div className="space-y-6" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} custom={2}>
            <h4 className="text-lg font-lato font-bold text-foreground">Company</h4>
            <ul className="space-y-3">
              <li><Link to="/" className={linkClass}>Home</Link></li>
              <li><Link to="/about" className={linkClass}>About Us</Link></li>
              <li><Link to="/vision" className={linkClass}>Vision</Link></li>
              <li><Link to="/opensource" className={linkClass}>Open Source</Link></li>
              <li><Link to="/release-logs" className={linkClass}>Release Logs</Link></li>
              <li><Link to="/contact" className={linkClass}>Contact</Link></li>
            </ul>
          </motion.div>

          {/* Connect */}
          <motion.div className="space-y-6" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} custom={3}>
            <h4 className="text-lg font-lato font-bold text-foreground">Connect</h4>
            <ul className="space-y-3">
              <li><a href="https://github.com/LocalHouseLLM" target="_blank" rel="noopener noreferrer" className={linkClass}>GitHub</a></li>
              <li><a href="https://x.com/localhousellm" target="_blank" rel="noopener noreferrer" className={linkClass}>X (Twitter)</a></li>
              <li><a href="https://www.instagram.com/localhousellm/" target="_blank" rel="noopener noreferrer" className={linkClass}>Instagram</a></li>
              <li><a href="https://www.linkedin.com/company/localhousellm" target="_blank" rel="noopener noreferrer" className={linkClass}>LinkedIn</a></li>
            </ul>
          </motion.div>
        </div>

        <motion.div className="mt-16 pt-8 border-t border-border text-center" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.5 }} viewport={{ once: true }}>
          <p className="text-muted-foreground text-sm">
            © {currentYear} LocalHouseLLM. All rights reserved. — Modular Intelligence for the Real World.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
