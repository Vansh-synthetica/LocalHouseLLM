
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
    <footer className="bg-black border-t border-white/10 pt-20 pb-10">
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
              <div className="w-10 h-10 rounded-md bg-white flex items-center justify-center text-black font-playfair relative overflow-hidden">
                <span className="font-bold text-lg relative z-10">LH</span>
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                  initial={{ x: -100 }}
                  animate={{ x: 100 }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                />
              </div>
              <span className="font-playfair text-xl font-bold text-white">LocalHouseLLM</span>
            </Link>
            <p className="text-gray-400 leading-relaxed">
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
            <h4 className="text-lg font-playfair font-bold text-white">Navigation</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors duration-300 inline-block relative after:absolute after:left-0 after:right-0 after:bottom-0 after:h-[1px] after:bg-white after:origin-bottom-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/demo" className="text-gray-400 hover:text-white transition-colors duration-300 inline-block relative after:absolute after:left-0 after:right-0 after:bottom-0 after:h-[1px] after:bg-white after:origin-bottom-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300">
                  Demo
                </Link>
              </li>
              <li>
                <Link to="/vision" className="text-gray-400 hover:text-white transition-colors duration-300 inline-block relative after:absolute after:left-0 after:right-0 after:bottom-0 after:h-[1px] after:bg-white after:origin-bottom-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300">
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
            <h4 className="text-lg font-playfair font-bold text-white">Company</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors duration-300 inline-block relative after:absolute after:left-0 after:right-0 after:bottom-0 after:h-[1px] after:bg-white after:origin-bottom-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors duration-300 inline-block relative after:absolute after:left-0 after:right-0 after:bottom-0 after:h-[1px] after:bg-white after:origin-bottom-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300">
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
            <h4 className="text-lg font-playfair font-bold text-white">Connect</h4>
            <ul className="space-y-3">
              <li>
                <a 
                  href="#" 
                  onClick={(e) => { e.preventDefault(); alert('Coming Soon'); }}
                  className="text-gray-400 hover:text-white transition-colors duration-300 inline-block relative after:absolute after:left-0 after:right-0 after:bottom-0 after:h-[1px] after:bg-white after:origin-bottom-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a 
                  onClick={(e) => { e.preventDefault(); alert('Coming Soon'); }}
                  href="#" 
                  className="text-gray-400 hover:text-white transition-colors duration-300 inline-block relative after:absolute after:left-0 after:right-0 after:bottom-0 after:h-[1px] after:bg-white after:origin-bottom-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a 
                  onClick={(e) => { e.preventDefault(); alert('Coming Soon'); }}
                  href="#" 
                  className="text-gray-400 hover:text-white transition-colors duration-300 inline-block relative after:absolute after:left-0 after:right-0 after:bottom-0 after:h-[1px] after:bg-white after:origin-bottom-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
                >
                  Discord
                </a>
              </li>
            </ul>
          </motion.div>
        </div>
        
        <motion.div 
          className="mt-16 pt-8 border-t border-white/10 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-500">
            © {currentYear} LocalHouseLLM. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
