import { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import './Navigation.css';

const Navigation = () => {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    
    if (latest > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

  return (
    <>
      <motion.header
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className={`fixed top-0 left-0 right-0 z-header transition-all duration-300 ${isScrolled ? 'py-4' : 'py-6'}`}
      >
        <div className="container">
          <nav className={`nav-bar glass ${isScrolled ? 'scrolled' : ''}`}>
            <a href="#" className="logo-link flex items-center">
              <img src="/logo.png" alt="PressEnter" className="nav-logo" />
            </a>
            
            <div className="nav-links desktop-only">
              <a href="#work" className="nav-link label-sm">Work</a>
              <a href="#services" className="nav-link label-sm">Services</a>
              <a href="#process" className="nav-link label-sm">Process</a>
              <a href="#about" className="nav-link label-sm">About</a>
            </div>

            <div className="nav-actions">
              <a href="#contact" className="cta-button label-sm desktop-only">
                Let's Talk <span className="arrow">→</span>
              </a>
              <button 
                className="mobile-menu-toggle mobile-only"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="mobile-menu-overlay glass-dark fixed inset-0 z-modal flex flex-col justify-center items-center">
          <div className="flex flex-col gap-8 text-center">
            <a href="#work" className="heading-md" onClick={() => setIsMobileMenuOpen(false)}>Work</a>
            <a href="#services" className="heading-md" onClick={() => setIsMobileMenuOpen(false)}>Services</a>
            <a href="#process" className="heading-md" onClick={() => setIsMobileMenuOpen(false)}>Process</a>
            <a href="#about" className="heading-md" onClick={() => setIsMobileMenuOpen(false)}>About</a>
            <a href="#contact" className="heading-md text-accent" onClick={() => setIsMobileMenuOpen(false)}>Let's Talk →</a>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;
