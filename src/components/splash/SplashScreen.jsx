import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, Command } from 'lucide-react';
import { audioManager } from '../../utils/audioManager';
import './SplashScreen.css';

export default function SplashScreen({ onEnter }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isPortalLaunching, setIsPortalLaunching] = useState(false);

  const handlePortalEnter = () => {
    if (isPortalLaunching) return;
    setIsPortalLaunching(true);
    audioManager.playPortalEnter();

    setTimeout(() => {
      onEnter();
    }, 400);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') handlePortalEnter();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onEnter, isPortalLaunching]);

  const handleMouseMoveCTA = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setMousePos({ x: x * 0.25, y: y * 0.25 });
  };

  const handleMouseLeaveCTA = () => {
    setMousePos({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <motion.div 
      className={`splash-container ${isPortalLaunching ? 'portal-launching' : ''}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ 
        opacity: 0, 
        scale: 1.08, 
        filter: "blur(20px)",
      }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Portal Transition Blast Overlay */}
      <AnimatePresence>
        {isPortalLaunching && (
          <motion.div 
            className="portal-warp-blast"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 2 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <div className="warp-core-ring" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Subtle Background Ambient Aura */}
      <div className="splash-ambient-glow" />
      <div className="splash-grid-subtle" />

      {/* Main Center Content */}
      <div className="splash-content-minimal">
        
        {/* Studio Logo */}
        <motion.div 
          className="splash-logo-box"
          initial={{ y: 25, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <img src="/logo.png" alt="PressEnter Studio" className="splash-logo-img" />
        </motion.div>

        {/* Clean Typography */}
        <motion.div 
          className="splash-text-minimal"
          initial={{ y: 25, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="splash-pill-tag">
            <Sparkles size={12} className="gold-text" />
            <span>ONE-STOP BRAND CREATION STUDIO</span>
          </div>

          <h1 className="splash-title-minimal">
            WE BUILD BRANDS THAT <br />
            <span className="gold-gradient-text">ENTER THE FUTURE</span>
          </h1>

          <p className="splash-sub-minimal">
            Identity • Web & Apps • 3D Motion • Growth Strategy
          </p>
        </motion.div>

        {/* Minimal Magnetic CTA Button */}
        <motion.div 
          className="splash-cta-wrapper"
          initial={{ y: 25, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.button 
            className="splash-enter-btn-minimal"
            onMouseMove={handleMouseMoveCTA}
            onMouseEnter={() => {
              setIsHovered(true);
              audioManager.playHover();
            }}
            onMouseLeave={handleMouseLeaveCTA}
            onClick={handlePortalEnter}
            animate={{ x: mousePos.x, y: mousePos.y }}
            transition={{ type: "spring", stiffness: 220, damping: 18 }}
          >
            <span>ENTER STUDIO</span>
            <div className="btn-arrow-circle">
              <ArrowRight size={18} />
            </div>
          </motion.button>
        </motion.div>

        {/* Subtle Keyboard Hint */}
        <motion.div 
          className="splash-hint-minimal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 0.7, delay: 0.45 }}
        >
          <Command size={12} />
          <span>Press <kbd>↵ Enter</kbd> to launch</span>
        </motion.div>

      </div>
    </motion.div>
  );
}
