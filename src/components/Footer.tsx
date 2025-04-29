
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-black/50 border-t border-white/5 py-12">
      <div className="max-container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">LocalHouseLLM</h3>
            <p className="text-secondaryText">
              Redefining language models — modular, adaptive, and safe.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-secondaryText hover:text-cyberBlue transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/demo" className="text-secondaryText hover:text-cyberBlue transition-colors">
                  Demo
                </Link>
              </li>
              <li>
                <Link to="/vision" className="text-secondaryText hover:text-cyberBlue transition-colors">
                  Vision
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-secondaryText hover:text-cyberBlue transition-colors">
                  Research Blog
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-secondaryText hover:text-cyberBlue transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-secondaryText hover:text-cyberBlue transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Connect</h4>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-secondaryText hover:text-cyberBlue transition-colors"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-secondaryText hover:text-cyberBlue transition-colors"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a 
                  href="https://discord.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-secondaryText hover:text-cyberBlue transition-colors"
                >
                  Discord
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-white/5 text-center">
          <p className="text-secondaryText">
            © {new Date().getFullYear()} LocalHouseLLM. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
