import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, Sparkles, Command, Camera, Globe, Palette, 
  TrendingUp, Box, PenTool, Aperture, Film, Zap, ShieldCheck
} from 'lucide-react';
import { audioManager } from '../../utils/audioManager';
import TextScrambler from '../common/TextScrambler';
import './SplashScreen.css';

// 8 Viewport position classes
const POS_CLASSES = [
  "pos-1", // Top Left
  "pos-2", // Top Right
  "pos-3", // Bottom Left
  "pos-4", // Bottom Right
  "pos-5", // Mid Right
  "pos-6", // Mid Left
  "pos-7", // Top Mid Left
  "pos-8"  // Bottom Mid Right
];

export default function SplashScreen({ onEnter }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isPortalLaunching, setIsPortalLaunching] = useState(false);

  const handlePortalEnter = () => {
    if (isPortalLaunching) return;
    setIsPortalLaunching(true);
    audioManager.playPortalEnter();

    // Trigger transition burst delay for dramatic effect
    setTimeout(() => {
      onEnter();
    }, 450);
  };

  // Position Juggling State
  const [posIndices, setPosIndices] = useState([0, 1, 2, 3, 4, 5, 6, 7]);

  // Rotate card positions every 5.5 seconds smoothly
  useEffect(() => {
    const shuffleTimer = setInterval(() => {
      setPosIndices((prev) => {
        const next = [...prev];
        const last = next.pop();
        next.unshift(last);
        return next;
      });
    }, 5500);

    return () => clearInterval(shuffleTimer);
  }, []);

  // Typewriter Animation state
  const line1Full = "Identity. Web. Video. Growth.";
  const line2Full = "All Under One Roof.";

  const [typedLine1, setTypedLine1] = useState("");
  const [typedLine2, setTypedLine2] = useState("");
  const [line1Complete, setLine1Complete] = useState(false);

  // Typewriter logic with synced sound FX
  useEffect(() => {
    let i = 0;
    const interval1 = setInterval(() => {
      if (i <= line1Full.length) {
        setTypedLine1(line1Full.substring(0, i));
        if (i > 0 && line1Full[i - 1] !== ' ') {
          audioManager.playTypewriterTick();
        }
        i++;
      } else {
        clearInterval(interval1);
        setLine1Complete(true);
      }
    }, 40);

    return () => clearInterval(interval1);
  }, []);

  useEffect(() => {
    if (!line1Complete) return;

    let j = 0;
    const interval2 = setInterval(() => {
      if (j <= line2Full.length) {
        setTypedLine2(line2Full.substring(0, j));
        if (j > 0 && line2Full[j - 1] !== ' ') {
          audioManager.playTypewriterTick();
        }
        j++;
      } else {
        clearInterval(interval2);
      }
    }, 45);

    return () => clearInterval(interval2);
  }, [line1Complete]);

  // Handle global key press for 'Enter'
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        handlePortalEnter();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onEnter, isPortalLaunching]);

  // Magnetic button hover effect
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setMousePos({ x: x * 0.3, y: y * 0.3 });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const cardsData = [
    { id: 1, icon: Camera, text: "Video Production", color: "gold" },
    { id: 2, icon: Globe, text: "Web Engineering", color: "silver" },
    { id: 3, icon: Palette, text: "Brand Systems", color: "gold" },
    { id: 4, icon: TrendingUp, text: "Social Growth", color: "silver" },
    { id: 5, icon: Box, text: "3D Motion", color: "gold" },
    { id: 6, icon: PenTool, text: "Graphic Design", color: "silver" },
    { id: 7, icon: Aperture, text: "Photography", color: "gold" },
    { id: 8, icon: Film, text: "Promotional Ads", color: "silver" },
  ];

  return (
    <motion.div 
      className={`splash-container ${isPortalLaunching ? 'portal-launching' : ''}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ 
        opacity: 0, 
        scale: 1.2, 
        filter: "blur(30px) brightness(2)",
      }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Portal Explosion Blast Overlay */}
      <AnimatePresence>
        {isPortalLaunching && (
          <motion.div 
            className="portal-warp-blast"
            initial={{ opacity: 0, scale: 0.2 }}
            animate={{ opacity: 1, scale: 3 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            <div className="warp-core-ring" />
            <div className="warp-laser-beam" />
            <div className="warp-status-badge">
              <Zap size={14} className="spin-slow" />
              <span>LAUNCHING CORE EXPERIENCE...</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dynamic Background Glow & Grid */}
      <div className="splash-bg-grid" />
      <div className="splash-glow gold-glow" />
      <div className="splash-glow silver-glow" />
      <div className="light-beam-sweep" />

      {/* Subtle & Light Shooting Stars Layer */}
      <div className="shooting-stars-layer">
        <div className="shooting-star star-1" />
        <div className="shooting-star star-2" />
        <div className="shooting-star star-3" />
      </div>

      {/* Floating Light Shimmer Particles */}
      <div className="shimmer-particles">
        <div className="particle p1" />
        <div className="particle p2" />
        <div className="particle p3" />
        <div className="particle p4" />
        <div className="particle p5" />
      </div>

      {/* Floating Glassmorphic Brand Element Cards */}
      <div className="floating-glass-wrapper">
        {cardsData.map((card, idx) => {
          const Icon = card.icon;
          const posClass = POS_CLASSES[posIndices[idx]];
          return (
            <motion.div 
              key={card.id}
              layout
              data-cursor="CAPABILITY"
              className={`glass-float-card ${posClass}`}
              whileHover={{ scale: 1.15, zIndex: 50, rotate: 2 }}
              transition={{ 
                layout: { duration: 2.2, ease: [0.16, 1, 0.3, 1] },
                scale: { duration: 0.25 }
              }}
            >
              <div className="glass-card-inner">
                <Icon size={15} className={`glass-icon ${card.color}`} />
                <span className="glass-text">{card.text}</span>
              </div>
              <div className="card-shimmer" />
            </motion.div>
          );
        })}
      </div>

      {/* Main Content */}
      <div className="splash-content">
        
        {/* Animated Brand Logo */}
        <motion.div 
          className="splash-logo-wrapper"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="splash-logo-glow" />
          <img src="/logo.png" alt="PressEnter Logo" className="splash-logo" />
        </motion.div>

        {/* Subtitle with Typing Effect */}
        <motion.div 
          className="splash-text-group"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.35 }}
        >
          <div className="splash-badge">
            <Sparkles size={13} className="badge-sparkle" />
            <span>
              <TextScrambler text="ONE-STOP BRAND CREATION STUDIO" scrambleOnMount={true} />
            </span>
          </div>

          <h1 className="splash-heading type-container">
            <span className="type-line-1">
              {typedLine1}
              {!line1Complete && <span className="type-cursor" />}
            </span>
            <br />
            {line1Complete && (
              <span className="splash-heading-gradient type-line-2">
                {typedLine2}
                <span className="type-cursor gold-cursor" />
              </span>
            )}
          </h1>
        </motion.div>

        {/* Magnetic PRESS ENTER Button */}
        <motion.div 
          className="splash-cta-container"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {/* Pulsing Aura Rings */}
          <div className={`pulse-ring ring-1 ${isHovered ? 'active' : ''}`} />
          <div className={`pulse-ring ring-2 ${isHovered ? 'active' : ''}`} />
          <div className={`pulse-ring ring-3 ${isHovered ? 'active' : ''}`} />

          <motion.button 
            data-cursor="ENTER"
            className="press-enter-btn"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => {
              setIsHovered(true);
              audioManager.playHover();
            }}
            onMouseLeave={handleMouseLeave}
            onClick={handlePortalEnter}
            animate={{ x: mousePos.x, y: mousePos.y }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            <span className="btn-shine" />
            <span className="btn-label">PRESS ENTER</span>
            <div className="btn-icon-box">
              <ArrowRight size={20} className="btn-arrow" />
            </div>
          </motion.button>
        </motion.div>

        {/* Keyboard hint */}
        <motion.div 
          className="splash-hint"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <Command size={12} />
          <span>or press <kbd>↵ Enter</kbd> on your keyboard</span>
        </motion.div>

      </div>
    </motion.div>
  );
}

