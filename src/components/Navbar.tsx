
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 bg-richBlack/80 backdrop-blur-md border-b border-white/5">
      <div className="max-container py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-bold text-white flex items-center gap-2">
            <div className="w-8 h-8 rounded-md bg-gradient-to-tr from-cyberBlue to-neonMint flex items-center justify-center text-richBlack">
              LH
            </div>
            <span>LocalHouseLLM</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/demo" className="text-white hover:text-cyberBlue transition-colors">
            Demo
          </Link>
          <Link to="/vision" className="text-white hover:text-cyberBlue transition-colors">
            Vision
          </Link>
          <Link to="/blog" className="text-white hover:text-cyberBlue transition-colors">
            Research
          </Link>
          <Link to="/about" className="text-white hover:text-cyberBlue transition-colors">
            About
          </Link>
          <Link to="/contact" className="ml-4">
            <Button variant="outline" className="border-cyberBlue text-cyberBlue hover:bg-cyberBlue/10">
              Contact
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white p-2"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-richBlack/95 backdrop-blur-md border-b border-white/5">
          <div className="max-container py-4 flex flex-col gap-4">
            <Link 
              to="/demo" 
              className="text-white px-4 py-2 rounded-md hover:bg-white/5"
              onClick={() => setIsMenuOpen(false)}
            >
              Demo
            </Link>
            <Link 
              to="/vision" 
              className="text-white px-4 py-2 rounded-md hover:bg-white/5"
              onClick={() => setIsMenuOpen(false)}
            >
              Vision
            </Link>
            <Link 
              to="/blog" 
              className="text-white px-4 py-2 rounded-md hover:bg-white/5"
              onClick={() => setIsMenuOpen(false)}
            >
              Research
            </Link>
            <Link 
              to="/about" 
              className="text-white px-4 py-2 rounded-md hover:bg-white/5"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className="text-cyberBlue px-4 py-2 rounded-md border border-cyberBlue/50 hover:bg-cyberBlue/10"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
