
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';


const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: custom * 0.1,
        duration: 0.6
      }
    })
  };

  return (
    <footer className="bg-black/30 backdrop-blur-sm border-t border-border pt-20 pb-10">
      <div className="max-container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <motion.div 
            className="space-y-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            custom={0}
          >
            <Link to="/" className="inline-flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-md bg-primary flex items-center justify-center text-primary-foreground font-lato relative overflow-hidden">
                <span className="font-bold text-lg relative z-10">LH</span>
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0"
                  initial={{ x: -100 }}
                  animate={{ x: 100 }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                />
              </div>
              <span className="font-lato text-xl font-bold text-foreground">LocalHouseLLM</span>
            </Link>
            <p className="text-muted-foreground leading-relaxed">
              Redefining language models — modular, adaptive, and safe.
            </p>
            
          </motion.div>
          
          <motion.div 
            className="space-y-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            custom={1}
          >
            <h4 className="text-lg font-lato font-bold text-foreground">Navigation</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors duration-300 inline-block relative after:absolute after:left-0 after:right-0 after:bottom-0 after:h-[1px] after:bg-foreground after:origin-bottom-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/demo" className="text-muted-foreground hover:text-foreground transition-colors duration-300 inline-block relative after:absolute after:left-0 after:right-0 after:bottom-0 after:h-[1px] after:bg-foreground after:origin-bottom-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300">
                  Demo
                </Link>
              </li>
              <li>
                <Link to="/vision" className="text-muted-foreground hover:text-foreground transition-colors duration-300 inline-block relative after:absolute after:left-0 after:right-0 after:bottom-0 after:h-[1px] after:bg-foreground after:origin-bottom-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300">
                  Vision
                </Link>
              </li>
            </ul>
          </motion.div>
          
          <motion.div 
            className="space-y-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            custom={2}
          >
            <h4 className="text-lg font-lato font-bold text-foreground">Company</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors duration-300 inline-block relative after:absolute after:left-0 after:right-0 after:bottom-0 after:h-[1px] after:bg-foreground after:origin-bottom-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors duration-300 inline-block relative after:absolute after:left-0 after:right-0 after:bottom-0 after:h-[1px] after:bg-foreground after:origin-bottom-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300">
                  Contact
                </Link>
              </li>
            </ul>
          </motion.div>
          
          <motion.div 
            className="space-y-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            custom={3}
          >
            <h4 className="text-lg font-lato font-bold text-foreground">Connect</h4>
            <ul className="space-y-3">
              <li>
              <a 
                  href="https://github.com/LocalHouseLLM" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors duration-300 inline-block relative after:absolute after:left-0 after:right-0 after:bottom-0 after:h-[1px] after:bg-foreground after:origin-bottom-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a 
                  href="https://x.com/localhousellm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors duration-300 inline-block relative after:absolute after:left-0 after:right-0 after:bottom-0 after:h-[1px] after:bg-foreground after:origin-bottom-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
                >
                  X (Twitter)
                </a>
              </li>
              <li>
                <a 
                  href="https://www.instagram.com/localhousellm/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors duration-300 inline-block relative after:absolute after:left-0 after:right-0 after:bottom-0 after:h-[1px] after:bg-foreground after:origin-bottom-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  onClick={(e) => { e.preventDefault(); alert('Coming Soon'); }}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-300 inline-block relative after:absolute after:left-0 after:right-0 after:bottom-0 after:h-[1px] after:bg-foreground after:origin-bottom-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
                >
                  Discord
                </a>
              </li>
            </ul>
          </motion.div>
        </div>
        
        <motion.div 
          className="mt-16 pt-8 border-t border-border text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="text-muted-foreground">
            © {currentYear} LocalHouseLLM. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
