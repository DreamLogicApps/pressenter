import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, Sparkles, Command, Camera, Globe, Palette, 
  TrendingUp, Box, PenTool, Aperture, Film, Zap, Volume2, VolumeX,
  CheckCircle2, Play, ChevronRight, Activity, Cpu
} from 'lucide-react';
import { audioManager } from '../../utils/audioManager';
import AnimatedCounter from '../common/AnimatedCounter';
import './SplashScreen.css';

// 8 Viewport position coordinates for dynamic floating cards
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

// Interactive Brand Themes
const SPLASH_THEMES = [
  { id: 'gold', name: 'GOLD CORE', primary: '#C3922E', glow: 'rgba(195, 146, 46, 0.45)', bg: '#060608' },
  { id: 'cyan', name: 'CYBER CYAN', primary: '#00F0FF', glow: 'rgba(0, 240, 255, 0.45)', bg: '#050B14' },
  { id: 'silver', name: 'TITANIUM', primary: '#E2E8F0', glow: 'rgba(226, 232, 240, 0.45)', bg: '#0A0C10' },
  { id: 'violet', name: 'VIOLET ULTRA', primary: '#A855F7', glow: 'rgba(168, 85, 247, 0.45)', bg: '#0F051D' }
];

export default function SplashScreen({ onEnter }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isPortalLaunching, setIsPortalLaunching] = useState(false);
  const [activeTheme, setActiveTheme] = useState(SPLASH_THEMES[0]);
  const [muted, setMuted] = useState(false);

  // Dynamic Background Particle Canvas Ref
  const canvasRef = useRef(null);

  // Position Juggling State
  const [posIndices, setPosIndices] = useState([0, 1, 2, 3, 4, 5, 6, 7]);

  // Rotate card positions smoothly
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

  // Interactive Particle Constellation Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const nodes = Array.from({ length: 40 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      radius: Math.random() * 2 + 1,
      alpha: Math.random() * 0.4 + 0.2
    }));

    let mouse = { x: -1000, y: -1000 };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      nodes.forEach((node, idx) => {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = activeTheme.primary;
        ctx.globalAlpha = node.alpha;
        ctx.fill();

        for (let j = idx + 1; j < nodes.length; j++) {
          const other = nodes[j];
          const dist = Math.hypot(node.x - other.x, node.y - other.y);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = activeTheme.primary;
            ctx.globalAlpha = (1 - dist / 110) * 0.15;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        const mouseDist = Math.hypot(node.x - mouse.x, node.y - mouse.y);
        if (mouseDist < 140) {
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = '#ffffff';
          ctx.globalAlpha = (1 - mouseDist / 140) * 0.35;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [activeTheme]);

  // Typewriter Animation State
  const line1Full = "Identity. Web. Video. Growth.";
  const line2Full = "All Under One Roof.";

  const [typedLine1, setTypedLine1] = useState("");
  const [typedLine2, setTypedLine2] = useState("");
  const [line1Complete, setLine1Complete] = useState(false);

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

  // Portal Enter Action
  const handlePortalEnter = () => {
    if (isPortalLaunching) return;
    setIsPortalLaunching(true);
    audioManager.playPortalEnter();

    setTimeout(() => {
      onEnter();
    }, 450);
  };

  const toggleAudio = () => {
    const nextMute = !muted;
    setMuted(nextMute);
    audioManager.setMuted(nextMute);
    if (!nextMute) audioManager.playClick();
  };

  // Keyboard Shortcuts (Enter, M, 1-4)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') handlePortalEnter();
      if (e.key === 'm' || e.key === 'M') toggleAudio();
      if (e.key === '1') setActiveTheme(SPLASH_THEMES[0]);
      if (e.key === '2') setActiveTheme(SPLASH_THEMES[1]);
      if (e.key === '3') setActiveTheme(SPLASH_THEMES[2]);
      if (e.key === '4') setActiveTheme(SPLASH_THEMES[3]);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onEnter, isPortalLaunching, muted]);

  // Magnetic CTA Button Hover
  const handleMouseMoveCTA = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setMousePos({ x: x * 0.3, y: y * 0.3 });
  };

  const handleMouseLeaveCTA = () => {
    setMousePos({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const cardsData = [
    { id: 1, icon: Camera, text: "Video Production", tag: "4K 60FPS REEL" },
    { id: 2, icon: Globe, text: "Web Engineering", tag: "REACT / WEBGL" },
    { id: 3, icon: Palette, text: "Brand Systems", tag: "IDENTITY CORE" },
    { id: 4, icon: TrendingUp, text: "Social Growth", tag: "4.8x CONVERSION" },
    { id: 5, icon: Box, text: "3D Motion FX", tag: "CINEMA 4D" },
    { id: 6, icon: PenTool, text: "Design Systems", tag: "FIGMA MASTER" },
    { id: 7, icon: Aperture, text: "Photography", tag: "STUDIO SHOTS" },
    { id: 8, icon: Film, text: "Promotional Ads", tag: "VIRAL CAMPAIGNS" },
  ];

  return (
    <motion.div 
      className={`splash-container ${isPortalLaunching ? 'portal-launching' : ''}`}
      style={{
        '--splash-primary': activeTheme.primary,
        '--splash-glow': activeTheme.glow,
        '--splash-bg': activeTheme.bg,
      }}
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

      {/* Interactive Constellation Particle Canvas */}
      <canvas ref={canvasRef} className="splash-particle-canvas" />

      {/* Dynamic Background Glow & Grid */}
      <div className="splash-bg-grid" />
      <div className="splash-glow primary-glow" />
      <div className="light-beam-sweep" />

      {/* Floating Glassmorphic Brand Element Cards */}
      <div className="floating-glass-wrapper">
        {cardsData.map((card, idx) => {
          const Icon = card.icon;
          const posClass = POS_CLASSES[posIndices[idx]];
          return (
            <motion.div 
              key={card.id}
              layout
              className={`glass-float-card ${posClass}`}
              onClick={() => {
                audioManager.playClick();
                handlePortalEnter();
              }}
              onMouseEnter={() => audioManager.playHover()}
              whileHover={{ scale: 1.15, zIndex: 50, rotate: 2 }}
              transition={{ 
                layout: { duration: 2.2, ease: [0.16, 1, 0.3, 1] },
                scale: { duration: 0.25 }
              }}
            >
              <div className="glass-card-inner">
                <Icon size={15} className="glass-icon" />
                <div className="glass-text-group">
                  <span className="glass-text">{card.text}</span>
                  <span className="glass-tag">{card.tag}</span>
                </div>
              </div>
              <div className="card-shimmer" />
            </motion.div>
          );
        })}
      </div>

      {/* Top Ambient HUD Navigation Bar */}
      <div className="splash-top-hud">
        <div className="splash-status-badge">
          <span className="status-dot" />
          <span>STUDIO CORE 3.0 // ONLINE</span>
        </div>

        <div className="splash-top-actions">
          <button 
            className="splash-icon-btn"
            onClick={toggleAudio}
            onMouseEnter={() => audioManager.playHover()}
            title={muted ? "Unmute Audio (Key M)" : "Mute Audio (Key M)"}
          >
            {muted ? <VolumeX size={15} /> : <Volume2 size={15} />}
          </button>
        </div>
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

        {/* Subtitle & Typewriter Heading */}
        <motion.div 
          className="splash-text-group"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.35 }}
        >
          <div className="splash-badge">
            <Sparkles size={13} className="badge-sparkle" />
            <span>ONE-STOP BRAND CREATION STUDIO</span>
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

          {/* Live Studio Stats Pill */}
          <div className="splash-stats-pill">
            <div className="splash-stat-item">
              <span className="s-val"><AnimatedCounter value={120} suffix="+" /></span>
              <span className="s-lbl">BRANDS</span>
            </div>
            <div className="s-divider" />
            <div className="splash-stat-item">
              <span className="s-val"><AnimatedCounter value={99.4} suffix="%" /></span>
              <span className="s-lbl">CSAT</span>
            </div>
            <div className="s-divider" />
            <div className="splash-stat-item">
              <span className="s-val">3 WEEKS</span>
              <span className="s-lbl">SPRINT</span>
            </div>
          </div>
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
            onMouseMove={handleMouseMoveCTA}
            onMouseEnter={() => {
              setIsHovered(true);
              audioManager.playHover();
            }}
            onMouseLeave={handleMouseLeaveCTA}
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
          animate={{ opacity: 0.7 }}
          transition={{ duration: 0.8, delay: 0.65 }}
        >
          <Command size={12} />
          <span>Press <kbd>↵ Enter</kbd> to launch experience</span>
        </motion.div>

        {/* Interactive Brand Theme Selector HUD */}
        <motion.div 
          className="splash-theme-selector"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <span className="theme-selector-label"><Cpu size={12} /> SELECT BRAND MATRIX:</span>
          <div className="theme-chips-row">
            {SPLASH_THEMES.map((theme, idx) => (
              <button
                key={theme.id}
                className={`theme-chip ${activeTheme.id === theme.id ? 'active' : ''}`}
                style={{ '--theme-color': theme.primary }}
                onClick={() => {
                  audioManager.playClick();
                  setActiveTheme(theme);
                }}
                onMouseEnter={() => audioManager.playHover()}
                title={`Select ${theme.name} Theme (Hotkey ${idx + 1})`}
              >
                <span className="chip-dot" style={{ backgroundColor: theme.primary }} />
                <span>{theme.name}</span>
                <kbd>{idx + 1}</kbd>
              </button>
            ))}
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
}
