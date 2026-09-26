import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence, useInView } from 'framer-motion';
import { 
  Sparkles, ArrowRight, ArrowUpRight, Zap, CheckCircle2, ShieldCheck, 
  Award, RefreshCw, MessageSquare, Volume2, VolumeX, Eye, Play, ChevronRight, ChevronLeft,
  Layers, Cpu, Globe, Palette, Film, Smartphone, Plus, Minus, Menu, X,
  ExternalLink, Mail, MapPin, Phone, Hash, AtSign, Briefcase, Code, Copy, Check, Filter, Clock
} from 'lucide-react';
import { audioManager } from '../../utils/audioManager';
import ContactModal from '../modular/ContactModal';
import ShowcaseModal from '../modular/ShowcaseModal';
import { showcaseProjects } from '../modular/BentoCards/PortfolioCard';
import TextScrambler from '../common/TextScrambler';
import AnimatedCounter from '../common/AnimatedCounter';
import './CinematicExperience.css';

// Interactive Brand Lab Palettes
const BRAND_PALETTES = [
  { id: 'gold', name: 'OBSIDIAN GOLD', primary: '#C3922E', bg: '#060608', glow: 'rgba(195, 146, 46, 0.35)', secondary: '#F4F4F5' },
  { id: 'cyan', name: 'CYBER CYAN', primary: '#00F0FF', bg: '#050B14', glow: 'rgba(0, 240, 255, 0.35)', secondary: '#38BDF8' },
  { id: 'silver', name: 'TITANIUM SILVER', primary: '#E2E8F0', bg: '#0A0C10', glow: 'rgba(226, 232, 240, 0.35)', secondary: '#94A3B8' },
  { id: 'emerald', name: 'NEON EMERALD', primary: '#10B981', bg: '#040F0A', glow: 'rgba(16, 185, 129, 0.35)', secondary: '#34D399' },
  { id: 'violet', name: 'VIOLET ULTRA', primary: '#A855F7', bg: '#0F051D', glow: 'rgba(168, 85, 247, 0.35)', secondary: '#C084FC' }
];

// Delivery Speed Tiers
const SPEED_TIERS = [
  { id: 'standard', name: 'STANDARD', time: '3-4 WEEKS', multiplier: 1.0 },
  { id: 'express', name: 'EXPRESS SPRINT', time: '2 WEEKS', multiplier: 1.25 },
  { id: 'blitz', name: 'BLITZ RELEASE', time: '7 DAYS', multiplier: 1.5 }
];

// Reusable stagger variants
const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 }
  }
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, y: 0, 
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } 
  }
};

const scaleUp = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { 
    opacity: 1, scale: 1, 
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } 
  }
};

export default function CinematicExperience({ onResetSplash }) {
  const [muted, setMuted] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [showcaseIndex, setShowcaseIndex] = useState(null);
  const [activePalette, setActivePalette] = useState(BRAND_PALETTES[0]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Responsive Mobile Detection
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' ? window.innerWidth < 768 : false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Brand Lab Tab State (preview, spec, code)
  const [labTab, setLabTab] = useState('preview');
  const [copiedCode, setCopiedCode] = useState(false);

  // Showcase Category Filter State
  const [activeFilter, setActiveFilter] = useState('ALL');

  // Estimator State
  const [selectedServices, setSelectedServices] = useState([0, 1]);
  const [speedTier, setSpeedTier] = useState(SPEED_TIERS[0]);
  const ESTIMATOR_SERVICES = [
    { title: "Brand System & Identity", price: 2500, icon: Palette, tag: "Identity" },
    { title: "High-Performance Web & Apps", price: 4500, icon: Globe, tag: "Engineering" },
    { title: "3D Motion & Visual FX", price: 3000, icon: Film, tag: "Motion" },
    { title: "Promotional Ads & Video Reel", price: 2000, icon: Play, tag: "Video" },
    { title: "Social Growth Strategy", price: 1500, icon: Smartphone, tag: "Growth" }
  ];

  // Footer Newsletter State
  const [footerEmail, setFooterEmail] = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState(0);
  const FAQS = [
    { 
      category: "METHODOLOGY",
      q: "What makes PressEnter different from traditional agencies?", 
      a: "Traditional agencies delegate your project across fragmented teams, causing communication breakdowns and slow execution. PressEnter operates as a unified creation engine — identity, web, apps, video, and growth under one single studio director." 
    },
    { 
      category: "TIMELINE",
      q: "How fast can we launch our complete brand ecosystem?", 
      a: "Our core brand creation & web app sprints deliver production-ready assets in 2 to 3 weeks, executing up to 3x faster than traditional multi-agency pipelines." 
    },
    { 
      category: "OWNERSHIP",
      q: "Do we get full commercial rights and source design files?", 
      a: "Yes, 100%. Upon completion, you receive full commercial ownership and raw source files for all Figma mockups, 3D renders, video master exports, and codebase repositories." 
    },
    { 
      category: "ENGINEERING",
      q: "Can PressEnter handle custom Web & App Development?", 
      a: "Absolutely. We specialize in high-performance Web Apps, React/Next.js platforms, mobile apps, and interactive spatial WebGL experiences engineered for maximum conversion." 
    }
  ];

  // Testimonial State
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const TESTIMONIALS = [
    {
      quote: "PressEnter built our entire brand identity, web app, and promotional launch video in just 3 weeks. They are literally an unfair advantage.",
      author: "Alex V.",
      role: "CEO & Founder",
      company: "Apex Spatial AI",
    },
    {
      quote: "Working with a single team for identity, code, and motion design saved us over $40,000 in agency friction. The quality is unmatched.",
      author: "Elena R.",
      role: "Head of Product",
      company: "Nova FinTech Platform",
    },
    {
      quote: "The brand lab system they designed for us increased our conversion rates by 4.8x. Every detail feels futuristic and hyper-polished.",
      author: "Marcus T.",
      role: "Managing Director",
      company: "Vanguard Mobility",
    }
  ];

  // Auto-rotate testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setTestimonialIdx((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [TESTIMONIALS.length]);

  // Global Keyboard Navigation Shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't trigger shortcuts if typing in input fields
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;

      if (e.key === '1') scrollToId('scene-showcase');
      if (e.key === '2') scrollToId('scene-spatial-lab');
      if (e.key === '3') scrollToId('capabilities-section');
      if (e.key === '4') scrollToId('scene-faq');
      if (e.key === 'm' || e.key === 'M') toggleAudio();
      if (e.key === 'c' || e.key === 'C') setIsContactOpen(true);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [muted]);

  const toggleService = (idx) => {
    audioManager.playClick();
    setSelectedServices(prev => 
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    );
  };

  const rawPrice = selectedServices.reduce((sum, i) => sum + ESTIMATOR_SERVICES[i].price, 0);
  const totalPrice = Math.round(rawPrice * speedTier.multiplier);
  const estimatedRevenueLift = totalPrice * 6.5;

  // Scroll Progress Tracking
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const scaleProgress = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    return scrollYProgress.on('change', (latest) => {
      setScrollPercent(Math.round(latest * 100));
    });
  }, [scrollYProgress]);

  // Close mobile menu on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (mobileMenuOpen) setMobileMenuOpen(false);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mobileMenuOpen]);

  const toggleAudio = () => {
    const nextMute = !muted;
    setMuted(nextMute);
    audioManager.setMuted(nextMute);
    if (!nextMute) audioManager.playClick();
  };

  const handleCardMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -3.5;
    const rotateY = ((x - centerX) / centerX) * 3.5;

    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  };

  const handleCardMouseLeave = (e) => {
    const card = e.currentTarget;
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
  };

  const scrollToId = (id) => {
    audioManager.playCinematicBoom();
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const copySpecCode = () => {
    const codeText = `// PressEnter Brand System Config
export const brandTheme = {
  name: "${activePalette.name}",
  primary: "${activePalette.primary}",
  background: "${activePalette.bg}",
  glow: "${activePalette.glow}",
  typography: {
    display: "Space Grotesk",
    body: "Inter"
  }
};`;
    navigator.clipboard.writeText(codeText);
    setCopiedCode(true);
    audioManager.playClick();
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // Filtered Showcase Projects
  const filteredProjects = showcaseProjects.filter((p) => {
    if (activeFilter === 'ALL') return true;
    if (activeFilter === 'WEB') return p.category.includes('Web') || p.category.includes('Brand Systems');
    if (activeFilter === 'MOTION') return p.category.includes('Motion') || p.category.includes('Video') || p.category.includes('Film');
    if (activeFilter === 'BRANDING') return p.category.includes('Identity') || p.category.includes('Rebrand');
    return true;
  });

  // Scene 1 Parallax Transforms
  const heroTextScale = useTransform(scrollYProgress, [0, 0.25], [1, 1.25]);
  const heroTextOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroBlur = useTransform(scrollYProgress, [0, 0.2], ["blur(0px)", "blur(20px)"]);
  
  // Showcase Track Scroll & Navigation State
  const showcaseTrackRef = useRef(null);
  const [showcaseScrollProgress, setShowcaseScrollProgress] = useState(0);
  const [activeCardNum, setActiveCardNum] = useState(1);

  const handleShowcaseScroll = () => {
    if (!showcaseTrackRef.current) return;
    const el = showcaseTrackRef.current;
    const maxScroll = el.scrollWidth - el.clientWidth;
    if (maxScroll > 0) {
      const progress = Math.min(1, Math.max(0, el.scrollLeft / maxScroll));
      setShowcaseScrollProgress(progress);

      const cardWidth = 440;
      const index = Math.min(filteredProjects.length, Math.max(1, Math.round(el.scrollLeft / cardWidth) + 1));
      setActiveCardNum(index);
    }
  };

  const scrollShowcase = (direction) => {
    if (!showcaseTrackRef.current) return;
    audioManager.playClick();
    const scrollAmount = 440;
    showcaseTrackRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    if (showcaseTrackRef.current) {
      showcaseTrackRef.current.scrollLeft = 0;
      setShowcaseScrollProgress(0);
      setActiveCardNum(1);
    }
  }, [activeFilter]);

  // Section refs for inView detection
  const kineticRef = useRef(null);
  const labRef = useRef(null);
  const estimatorRef = useRef(null);
  const faqRef = useRef(null);
  const launchpadRef = useRef(null);

  const isKineticInView = useInView(kineticRef, { once: true, amount: 0.15 });
  const isLabInView = useInView(labRef, { once: true, amount: 0.15 });
  const isEstimatorInView = useInView(estimatorRef, { once: true, amount: 0.15 });
  const isFaqInView = useInView(faqRef, { once: true, amount: 0.15 });
  const isLaunchpadInView = useInView(launchpadRef, { once: true, amount: 0.2 });

  return (
    <div 
      className="cinematic-master-wrapper" 
      ref={containerRef}
      style={{
        '--active-primary': activePalette.primary,
        '--active-bg': activePalette.bg,
        '--active-glow': activePalette.glow,
      }}
    >
      {/* Subtle Analog Film Grain Overlay */}
      <div className="cinematic-film-grain" />

      {/* Anamorphic Letterbox HUD Frames */}
      <div className="letterbox-bar top-letterbox">
        <div className="letterbox-hud-info">
          <span>IMAX 2.39:1 // 4K HIGH DYNAMIC RANGE</span>
          <span className="hud-rec-dot" />
          <span>REC // PRESSENTER CORE</span>
        </div>
      </div>
      <div className="letterbox-bar bottom-letterbox" />

      {/* Laser Scroll Progress HUD Bar */}
      <motion.div 
        className="hud-scroll-bar"
        style={{ scaleX: scaleProgress }}
      />

      {/* Floating HUD Scroll Counter */}
      <div className="hud-scroll-counter">
        <span className="hud-dot" />
        <span>SCROLL CHRONO // {scrollPercent < 10 ? `0${scrollPercent}` : scrollPercent}%</span>
      </div>

      {/* Persistent Ambient HUD Header */}
      <header className="cinematic-hud-header">
        <div className="hud-header-inner">
          <div 
            className="hud-brand"
            onClick={() => {
              audioManager.playCinematicBoom();
              onResetSplash();
            }}
            onMouseEnter={() => audioManager.playHover()}
            data-cursor="PORTAL"
          >
            <img src="/logo.png" alt="PressEnter Studio" className="hud-logo" />
            <div className="hud-status-badge">
              <span className="hud-status-dot" />
              <span>CORE ACTIVE</span>
            </div>
          </div>

          <div className="hud-nav-links">
            <button onClick={() => scrollToId('scene-showcase')} className="nav-link">SHOWCASE <kbd>1</kbd></button>
            <button onClick={() => scrollToId('scene-spatial-lab')} className="nav-link">BRAND LAB <kbd>2</kbd></button>
            <button onClick={() => scrollToId('capabilities-section')} className="nav-link">PRICING <kbd>3</kbd></button>
            <button onClick={() => scrollToId('scene-faq')} className="nav-link">FAQ <kbd>4</kbd></button>
          </div>

          <div className="hud-actions">
            <button 
              className="hud-icon-btn" 
              onClick={toggleAudio}
              onMouseEnter={() => audioManager.playHover()}
              title={muted ? "Unmute Sound (Key M)" : "Mute Sound (Key M)"}
            >
              {muted ? <VolumeX size={15} /> : <Volume2 size={15} />}
            </button>

            <button 
              className="hud-pill-btn"
              onClick={() => {
                audioManager.playCinematicBoom();
                onResetSplash();
              }}
              onMouseEnter={() => audioManager.playHover()}
            >
              <RefreshCw size={13} />
              <span>PORTAL</span>
            </button>

            <button 
              className="hud-gold-btn"
              onClick={() => {
                audioManager.playCinematicBoom();
                setIsContactOpen(true);
              }}
              onMouseEnter={() => audioManager.playHover()}
              data-cursor="START"
            >
              <MessageSquare size={14} />
              <span>START PROJECT</span>
            </button>

            {/* Mobile Hamburger */}
            <button 
              className="hud-hamburger-btn"
              onClick={() => {
                audioManager.playClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              className="mobile-nav-drawer"
              initial={{ opacity: 0, y: -20, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -20, height: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <button onClick={() => scrollToId('scene-showcase')} className="mobile-nav-link">SHOWCASE</button>
              <button onClick={() => scrollToId('scene-spatial-lab')} className="mobile-nav-link">BRAND LAB</button>
              <button onClick={() => scrollToId('capabilities-section')} className="mobile-nav-link">PRICING</button>
              <button onClick={() => scrollToId('scene-faq')} className="mobile-nav-link">FAQ</button>
              <div className="mobile-nav-divider" />
              <button 
                className="mobile-nav-cta"
                onClick={() => {
                  audioManager.playClick();
                  setMobileMenuOpen(false);
                  setIsContactOpen(true);
                }}
              >
                <MessageSquare size={14} />
                <span>START PROJECT</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ===================================================================
          SCENE 1: THE MONOLITH HERO (ZOOM WARP & KINETIC TEXT REVEAL)
          =================================================================== */}
      <section className="scene-hero">
        <motion.div 
          className="hero-warp-container"
          style={isMobile ? {} : { 
            scale: heroTextScale, 
            opacity: heroTextOpacity, 
            filter: heroBlur 
          }}
        >
          <motion.div 
            className="hero-top-badge"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Sparkles size={14} className="gold-text" />
            <span>
              <TextScrambler text="ONE-STOP BRAND CREATION STUDIO" scrambleOnMount={true} />
            </span>
          </motion.div>

          <motion.h1 
            className="hero-monolith-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
          >
            WE BUILD BRANDS THAT <br />
            <span className="hero-gradient-text">ENTER THE FUTURE</span>
          </motion.h1>

          <motion.p 
            className="hero-subline"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            Identity. Web. Apps. Video. Growth. All under one roof — engineered for high-growth visionaries.
          </motion.p>

          <motion.div 
            className="hero-action-row"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65 }}
          >
            <button 
              className="hero-main-cta"
              onClick={() => {
                audioManager.playClick();
                scrollToId('scene-showcase');
              }}
              onMouseEnter={() => audioManager.playHover()}
              data-cursor="EXPLORE"
            >
              <span>EXPLORE SCENES</span>
              <ArrowRight size={18} />
            </button>

            <div className="hero-live-metrics-pill">
              <div className="metric-badge">
                <span className="metric-num"><AnimatedCounter value={120} suffix="+" /></span>
                <span className="metric-txt">BRANDS LAUNCHED</span>
              </div>
              <div className="metric-divider" />
              <div className="metric-badge">
                <span className="metric-num"><AnimatedCounter value={99.4} suffix="%" /></span>
                <span className="metric-txt">CSAT RATE</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll Cue Animation */}
        <motion.div 
          className="scroll-cue-wrapper"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <div className="scroll-cue-line" />
          <span className="scroll-cue-text">SCROLL TO UNLOCK EXPERIENCE</span>
        </motion.div>
      </section>

      {/* ===================================================================
          SCENE 2: KINETIC STATEMENT (FULL-SCREEN SCROLL REVEAL)
          =================================================================== */}
      <section className="scene-kinetic-pin" ref={kineticRef}>
        <motion.div 
          className="kinetic-scene-inner"
          variants={stagger}
          initial="hidden"
          animate={isKineticInView ? "visible" : "hidden"}
        >
          <motion.div className="scene-tag" variants={fadeUp}>
            <Zap size={14} className="gold-text" />
            <span>THE PRESSENTER MANIFESTO</span>
          </motion.div>

          <motion.h2 className="kinetic-big-text" variants={fadeUp}>
            STOP JUGGLING 5 DIFFERENT AGENCIES. <br />
            <span className="gold-gradient-word">YOUR COMPLETE BRAND ENGINE</span> IS HERE.
          </motion.h2>

          <motion.div className="manifesto-grid" variants={stagger}>
            <motion.div 
              className="manifesto-card" 
              variants={scaleUp}
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              onMouseEnter={() => audioManager.playHover()}
            >
              <CheckCircle2 size={16} className="gold-text" />
              <div>
                <h4>Zero Communication Gaps</h4>
                <p>One unified creative director and studio team managing every asset from logo to launch.</p>
              </div>
            </motion.div>

            <motion.div 
              className="manifesto-card" 
              variants={scaleUp}
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              onMouseEnter={() => audioManager.playHover()}
            >
              <CheckCircle2 size={16} className="gold-text" />
              <div>
                <h4>3x Faster Execution</h4>
                <p>Parallel workflows eliminate weeks of agency friction and back-and-forth handoffs.</p>
              </div>
            </motion.div>

            <motion.div 
              className="manifesto-card" 
              variants={scaleUp}
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              onMouseEnter={() => audioManager.playHover()}
            >
              <CheckCircle2 size={16} className="gold-text" />
              <div>
                <h4>Cohesive Brand Ecosystem</h4>
                <p>Your web app, marketing video, logo, and ads feel like they belong to one iconic brand world.</p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* ===================================================================
          SCENE 3: THE HORIZON REEL (HORIZONTAL STICKY PIN SHOWCASE)
          =================================================================== */}
      {/* ===================================================================
          SCENE 3: THE HORIZON REEL (INTERACTIVE SHOWCASE TRACK)
          =================================================================== */}
      <section className="scene-showcase-section" id="scene-showcase">
        <div className="showcase-section-inner">
          
          <div className="horizontal-section-header">
            <div>
              <div className="scene-tag">
                <Layers size={14} className="gold-text" />
                <span>FEATURED SHOWCASE REEL</span>
              </div>
              <h3 className="section-title-sm">SELECTED BRAND PRODUCTIONS</h3>
            </div>

            <div className="showcase-header-controls">
              {/* Filter Tabs */}
              <div className="showcase-filter-tabs">
                <Filter size={13} className="filter-icon" />
                {['ALL', 'WEB', 'MOTION', 'BRANDING'].map((f) => (
                  <button 
                    key={f} 
                    className={`filter-chip ${activeFilter === f ? 'active' : ''}`}
                    onClick={() => {
                      audioManager.playClick();
                      setActiveFilter(f);
                    }}
                  >
                    {f}
                  </button>
                ))}
              </div>

              {/* Navigation Arrow Controls */}
              <div className="showcase-nav-arrows">
                <button 
                  className="showcase-arrow-btn" 
                  onClick={() => scrollShowcase('left')}
                  aria-label="Previous Showcase Card"
                  title="Previous Card"
                  onMouseEnter={() => audioManager.playHover()}
                >
                  <ChevronLeft size={18} />
                </button>
                <button 
                  className="showcase-arrow-btn" 
                  onClick={() => scrollShowcase('right')}
                  aria-label="Next Showcase Card"
                  title="Next Card"
                  onMouseEnter={() => audioManager.playHover()}
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>

          <div 
            ref={showcaseTrackRef}
            className="showcase-scroll-track-wrapper" 
            onScroll={handleShowcaseScroll}
          >
            {filteredProjects.map((project, idx) => (
              <div 
                key={project.id} 
                className="horizon-card"
                onClick={() => {
                  audioManager.playClick();
                  setShowcaseIndex(showcaseProjects.findIndex(p => p.id === project.id));
                }}
                onMouseEnter={() => audioManager.playHover()}
                onMouseMove={handleCardMouseMove}
                onMouseLeave={handleCardMouseLeave}
                data-cursor="VIEW WORK"
              >
                <div className="horizon-img-box">
                  <img src={project.image} alt={project.title} className="horizon-img" />
                  <div className="horizon-badge">{project.category}</div>
                  <div className="horizon-overlay">
                    <Eye size={24} className="eye-icon" />
                    <span>LAUNCH LIGHTBOX</span>
                  </div>
                </div>

                <div className="horizon-card-body">
                  <div className="horizon-client">{project.client}</div>
                  <h4 className="horizon-title">{project.title}</h4>
                  <p className="horizon-desc">{project.description}</p>
                  
                  <div className="horizon-stats-row">
                    {project.stats.map((stat, i) => (
                      <div key={i} className="horizon-stat">
                        <span className="stat-val">{stat.value}</span>
                        <span className="stat-lbl">{stat.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Showcase HUD Bar */}
          <div className="showcase-bottom-hud">
            <div className="showcase-counter-badge">
              <span className="gold-text">PROJECT REEL</span>
              <span>0{activeCardNum} / 0{filteredProjects.length} PRODUCTIONS</span>
            </div>
            <div className="showcase-scroll-hint">
              <span>DRAG OR CLICK ARROWS TO REEL</span>
              <div className="hint-bar-track">
                <div className="hint-bar-fill" style={{ width: `${Math.round(showcaseScrollProgress * 100)}%` }} />
              </div>
            </div>
          </div>

        </div>
      </section>
      <div className="scene-transition-glow" />

      {/* ===================================================================
          SCENE 4: THE SPATIAL BRAND LAB (INTERACTIVE COLOR & SYSTEM MATRIX)
          =================================================================== */}
      <section className="scene-spatial-lab" id="scene-spatial-lab" ref={labRef}>
        <motion.div 
          className="spatial-lab-container"
          variants={stagger}
          initial="hidden"
          animate={isLabInView ? "visible" : "hidden"}
        >
          <motion.div className="lab-left-panel" variants={fadeUp}>
            <div className="scene-tag">
              <Palette size={14} className="gold-text" />
              <span>INTERACTIVE BRAND LAB v2.0</span>
            </div>
            
            <h2 className="lab-heading">
              TEST YOUR BRAND <br />
              <span className="gold-gradient-word">THEME & ARCHETYPE</span>
            </h2>

            <p className="lab-desc">
              Manipulate live studio parameters to see how PressEnter constructs dynamic brand identity systems across all digital touchpoints.
            </p>

            <div className="palette-selector-list">
              <span className="selector-title">SELECT BRAND PALETTE:</span>
              <div className="palette-buttons-row">
                {BRAND_PALETTES.map((p) => (
                  <motion.button 
                    key={p.id} 
                    className={`palette-btn ${activePalette.id === p.id ? 'active' : ''}`}
                    style={{ '--btn-color': p.primary }}
                    onClick={() => {
                      audioManager.playClick();
                      setActivePalette(p);
                    }}
                    onMouseEnter={() => audioManager.playHover()}
                    whileHover={{ x: 6 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <span className="palette-color-dot" style={{ backgroundColor: p.primary }} />
                    <span>{p.name}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div className="lab-right-preview" variants={scaleUp}>
            <motion.div 
              className="preview-canvas-card"
              layout
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="canvas-header">
                <div className="canvas-dots">
                  <span className="dot red" />
                  <span className="dot yellow" />
                  <span className="dot green" />
                </div>
                <div className="canvas-tabs">
                  <button 
                    className={`canvas-tab-btn ${labTab === 'preview' ? 'active' : ''}`}
                    onClick={() => setLabTab('preview')}
                  >
                    PREVIEW
                  </button>
                  <button 
                    className={`canvas-tab-btn ${labTab === 'spec' ? 'active' : ''}`}
                    onClick={() => setLabTab('spec')}
                  >
                    DESIGN SPEC
                  </button>
                  <button 
                    className={`canvas-tab-btn ${labTab === 'code' ? 'active' : ''}`}
                    onClick={() => setLabTab('code')}
                  >
                    CODE EXPORT
                  </button>
                </div>
              </div>

              <div className="canvas-body">
                {labTab === 'preview' && (
                  <>
                    <motion.div 
                      className="canvas-brand-logo" 
                      style={{ color: activePalette.primary }}
                      key={activePalette.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4 }}
                    >
                      PRESSENTER STUDIO
                    </motion.div>
                    <div className="canvas-tagline">
                      ELEVATING AMBITIOUS BRAND VISIONARIES
                    </div>

                    <div className="canvas-widgets-row">
                      <div className="widget-box">
                        <span className="w-val" style={{ color: activePalette.primary }}>4.8x</span>
                        <span className="w-lbl">AVERAGE ROI</span>
                      </div>
                      <div className="widget-box">
                        <span className="w-val" style={{ color: activePalette.primary }}>3 WEEKS</span>
                        <span className="w-lbl">LAUNCH TIME</span>
                      </div>
                    </div>

                    <button 
                      className="canvas-cta-btn"
                      style={{ background: activePalette.primary, color: '#060608' }}
                      onClick={() => setIsContactOpen(true)}
                    >
                      <span>REQUEST SYSTEM AUDIT</span>
                      <ArrowUpRight size={16} />
                    </button>
                  </>
                )}

                {labTab === 'spec' && (
                  <div className="lab-spec-view">
                    <div className="spec-row">
                      <span className="spec-label">PRIMARY COLOR:</span>
                      <div className="spec-swatch">
                        <span className="swatch-box" style={{ background: activePalette.primary }} />
                        <span>{activePalette.primary}</span>
                      </div>
                    </div>
                    <div className="spec-row">
                      <span className="spec-label">BACKGROUND:</span>
                      <div className="spec-swatch">
                        <span className="swatch-box" style={{ background: activePalette.bg }} />
                        <span>{activePalette.bg}</span>
                      </div>
                    </div>
                    <div className="spec-row">
                      <span className="spec-label">DISPLAY FONT:</span>
                      <span className="spec-val">Space Grotesk (700)</span>
                    </div>
                    <div className="spec-row">
                      <span className="spec-label">BODY FONT:</span>
                      <span className="spec-val">Inter (400/500)</span>
                    </div>
                  </div>
                )}

                {labTab === 'code' && (
                  <div className="lab-code-view">
                    <div className="code-header">
                      <span>brandConfig.ts</span>
                      <button className="copy-code-btn" onClick={copySpecCode}>
                        {copiedCode ? <Check size={12} className="gold-text" /> : <Copy size={12} />}
                        <span>{copiedCode ? 'COPIED!' : 'COPY'}</span>
                      </button>
                    </div>
                    <pre className="code-block">
{`// PressEnter Brand System Config
export const brandTheme = {
  name: "${activePalette.name}",
  primary: "${activePalette.primary}",
  background: "${activePalette.bg}",
  glow: "${activePalette.glow}"
};`}
                    </pre>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Laser Scene Divider */}
      <div className="scene-laser-divider">
        <span className="divider-label">SCENE // 04 — CAPABILITIES & PRICING</span>
      </div>

      {/* ===================================================================
          SCENE 5: CAPABILITIES & PACKAGE COST ESTIMATOR
          =================================================================== */}
      <section className="scene-estimator-section" id="capabilities-section" ref={estimatorRef}>
        <motion.div 
          className="estimator-container"
          variants={stagger}
          initial="hidden"
          animate={isEstimatorInView ? "visible" : "hidden"}
        >
          <motion.div className="section-header-centered" variants={fadeUp}>
            <div className="scene-tag">
              <Cpu size={14} className="gold-text" />
              <span>MODULAR CAPABILITIES & PRICING</span>
            </div>
            <h2 className="section-big-title">BUILD YOUR CUSTOM BRAND PACKAGE</h2>
          </motion.div>

          {/* Delivery Speed Selector */}
          <div className="speed-selector-row">
            <span className="speed-label"><Clock size={14} className="gold-text" /> SPEED TIER:</span>
            <div className="speed-buttons">
              {SPEED_TIERS.map((tier) => (
                <button 
                  key={tier.id}
                  className={`speed-tier-btn ${speedTier.id === tier.id ? 'active' : ''}`}
                  onClick={() => {
                    audioManager.playClick();
                    setSpeedTier(tier);
                  }}
                >
                  <span className="tier-name">{tier.name}</span>
                  <span className="tier-time">{tier.time}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="estimator-grid">
            <motion.div className="estimator-services-list" variants={stagger}>
              {ESTIMATOR_SERVICES.map((srv, idx) => {
                const isSelected = selectedServices.includes(idx);
                const Icon = srv.icon;
                return (
                  <motion.div 
                    key={idx}
                    className={`estimator-row ${isSelected ? 'selected' : ''}`}
                    onClick={() => toggleService(idx)}
                    onMouseEnter={() => audioManager.playHover()}
                    onMouseMove={handleCardMouseMove}
                    onMouseLeave={handleCardMouseLeave}
                    variants={fadeUp}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="service-icon-box">
                      <Icon size={18} />
                    </div>
                    <div className="service-info">
                      <div className="service-header-line">
                        <span className="service-name">{srv.title}</span>
                        <span className="service-tag-pill">{srv.tag}</span>
                      </div>
                      <span className="service-cost">${srv.price.toLocaleString()}</span>
                    </div>
                    <div className="service-check-box">
                      {isSelected ? <Minus size={14} /> : <Plus size={14} />}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            <motion.div 
              className="estimator-summary-card" 
              onMouseMove={handleCardMouseMove} 
              onMouseLeave={handleCardMouseLeave}
              variants={scaleUp}
            >
              <div className="summary-top">
                <span className="summary-label">ESTIMATED INVESTMENT ({speedTier.name})</span>
                <div className="total-price-display">
                  <span className="currency">$</span>
                  <motion.span 
                    className="price-num"
                    key={totalPrice}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {totalPrice.toLocaleString()}
                  </motion.span>
                </div>
                <span className="summary-sub">Includes dedicated director & full source assets</span>
              </div>

              <div className="roi-calculator-box">
                <span className="roi-label">PROJECTED REVENUE IMPACT</span>
                <span className="roi-val">+${estimatedRevenueLift.toLocaleString()} / year</span>
              </div>

              <div className="summary-bullets">
                <div className="bullet-item"><CheckCircle2 size={14} className="gold-text" /> Delivery in {speedTier.time}</div>
                <div className="bullet-item"><CheckCircle2 size={14} className="gold-text" /> Unlimited Revisions</div>
                <div className="bullet-item"><CheckCircle2 size={14} className="gold-text" /> Full Source & Figma Rights</div>
              </div>

              <button 
                className="estimator-submit-btn"
                onClick={() => {
                  audioManager.playClick();
                  setIsContactOpen(true);
                }}
                data-cursor="LOCK SCOPE"
              >
                <span>LOCK IN THIS SCOPE</span>
                <ArrowRight size={18} />
              </button>
            </motion.div>
          </div>

        </motion.div>
      </section>

      {/* Laser Scene Divider */}
      <div className="scene-laser-divider">
        <span className="divider-label">SCENE // 05 — CLIENT IMPACT & FAQ</span>
      </div>

      {/* ===================================================================
          SCENE 6: TESTIMONIALS & FAQ ACCORDION
          =================================================================== */}
      <section className="scene-faq-section" id="scene-faq" ref={faqRef}>
        <motion.div 
          className="faq-container"
          variants={stagger}
          initial="hidden"
          animate={isFaqInView ? "visible" : "hidden"}
        >
          <motion.div className="testimonials-box" variants={scaleUp}>
            <div className="scene-tag">
              <Award size={14} className="gold-text" />
              <span>CLIENT IMPACT & REVIEWS</span>
            </div>
            
            <AnimatePresence mode="wait">
              <motion.p 
                key={testimonialIdx}
                className="testimonial-quote"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
              >
                "{TESTIMONIALS[testimonialIdx].quote}"
              </motion.p>
            </AnimatePresence>
            
            <div className="testimonial-meta">
              <div>
                <span className="test-author">{TESTIMONIALS[testimonialIdx].author}</span>
                <span className="test-role">{TESTIMONIALS[testimonialIdx].role} — {TESTIMONIALS[testimonialIdx].company}</span>
              </div>
              <div className="testimonial-nav">
                <div className="testimonial-dots">
                  {TESTIMONIALS.map((_, i) => (
                    <span 
                      key={i} 
                      className={`t-dot ${i === testimonialIdx ? 'active' : ''}`}
                      onClick={() => {
                        audioManager.playClick();
                        setTestimonialIdx(i);
                      }}
                    />
                  ))}
                </div>
                <button 
                  onClick={() => {
                    audioManager.playClick();
                    setTestimonialIdx((prev) => (prev > 0 ? prev - 1 : TESTIMONIALS.length - 1));
                  }}
                  className="test-nav-btn"
                >
                  ←
                </button>
                <button 
                  onClick={() => {
                    audioManager.playClick();
                    setTestimonialIdx((prev) => (prev + 1) % TESTIMONIALS.length);
                  }}
                  className="test-nav-btn"
                >
                  →
                </button>
              </div>
            </div>
          </motion.div>

          <motion.div className="faq-accordion-box" variants={scaleUp}>
            <div className="scene-tag">
              <ShieldCheck size={14} className="gold-text" />
              <span>FREQUENTLY ASKED QUESTIONS</span>
            </div>
            
            <div className="faq-list">
              {FAQS.map((faq, i) => (
                <motion.div 
                  key={i} 
                  className="faq-item"
                  variants={fadeUp}
                >
                  <button 
                    className={`faq-question ${openFaq === i ? 'open' : ''}`}
                    onClick={() => {
                      audioManager.playClick();
                      setOpenFaq(openFaq === i ? -1 : i);
                    }}
                  >
                    <div className="faq-title-group">
                      <span className="faq-cat-badge">{faq.category}</span>
                      <span>{faq.q}</span>
                    </div>
                    <motion.span 
                      className="faq-icon"
                      animate={{ rotate: openFaq === i ? 45 : 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      +
                    </motion.span>
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div 
                        className="faq-answer"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <p>{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </motion.div>
      </section>

      {/* ===================================================================
          SCENE 7: DEPARTURE & HIGH-IMPACT CONTACT LAUNCHPAD
          =================================================================== */}
      <section className="scene-launchpad" ref={launchpadRef}>
        <div className="launchpad-glow-core" />
        
        <motion.div 
          className="launchpad-content"
          variants={stagger}
          initial="hidden"
          animate={isLaunchpadInView ? "visible" : "hidden"}
        >
          <motion.div className="scene-tag" variants={fadeUp}>
            <Sparkles size={14} className="gold-text" />
            <span>START YOUR BRAND REVOLUTION</span>
          </motion.div>

          <motion.h2 className="launchpad-title" variants={fadeUp}>
            READY TO BUILD SOMETHING <br />
            <span className="gold-gradient-word">UNFORGETTABLE?</span>
          </motion.h2>

          <motion.p className="launchpad-desc" variants={fadeUp}>
            We are currently accepting a limited number of high-growth brand clients for this quarter. Let's create something extraordinary.
          </motion.p>

          <motion.button 
            className="launchpad-cta-btn"
            variants={fadeUp}
            onClick={() => {
              audioManager.playClick();
              setIsContactOpen(true);
            }}
            onMouseEnter={() => audioManager.playHover()}
            whileHover={{ scale: 1.04, y: -3 }}
            whileTap={{ scale: 0.97 }}
            data-cursor="LAUNCH"
          >
            <span>START PROJECT DISCOVERY</span>
            <ArrowRight size={20} />
          </motion.button>
        </motion.div>

        {/* Enhanced Footer */}
        <footer className="cinematic-footer">
          <div className="footer-inner">
            <div className="footer-brand-col">
              <img src="/logo.png" alt="PressEnter Studio" className="footer-logo" />
              <p className="footer-tagline">Premium brand creation studio. Identity, web, apps, video & growth — all under one roof.</p>
              
              {/* Footer Newsletter Input */}
              <div className="footer-newsletter-box">
                {newsletterSubmitted ? (
                  <span className="newsletter-success">
                    <CheckCircle2 size={14} className="gold-text" /> SUBSCRIBED TO CORE UPDATES
                  </span>
                ) : (
                  <form 
                    className="newsletter-form"
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (footerEmail) {
                        audioManager.playClick();
                        setNewsletterSubmitted(true);
                      }
                    }}
                  >
                    <input 
                      type="email"
                      placeholder="Enter work email..."
                      value={footerEmail}
                      onChange={(e) => setFooterEmail(e.target.value)}
                      required
                      className="newsletter-input"
                    />
                    <button type="submit" className="newsletter-btn">JOIN</button>
                  </form>
                )}
              </div>

              <div className="footer-socials">
                <a href="#" className="social-link" aria-label="Social" onMouseEnter={() => audioManager.playHover()}>
                  <AtSign size={16} />
                </a>
                <a href="#" className="social-link" aria-label="Social" onMouseEnter={() => audioManager.playHover()}>
                  <Hash size={16} />
                </a>
                <a href="#" className="social-link" aria-label="Social" onMouseEnter={() => audioManager.playHover()}>
                  <Briefcase size={16} />
                </a>
              </div>
            </div>

            <div className="footer-links-col">
              <h5 className="footer-col-title">NAVIGATION</h5>
              <button onClick={() => scrollToId('scene-showcase')} className="footer-nav-link">Showcase</button>
              <button onClick={() => scrollToId('scene-spatial-lab')} className="footer-nav-link">Brand Lab</button>
              <button onClick={() => scrollToId('capabilities-section')} className="footer-nav-link">Pricing</button>
              <button onClick={() => scrollToId('scene-faq')} className="footer-nav-link">FAQ</button>
            </div>

            <div className="footer-links-col">
              <h5 className="footer-col-title">SERVICES</h5>
              <span className="footer-text-link">Brand Identity</span>
              <span className="footer-text-link">Web & App Dev</span>
              <span className="footer-text-link">Video Production</span>
              <span className="footer-text-link">Growth Strategy</span>
            </div>

            <div className="footer-links-col">
              <h5 className="footer-col-title">CONTACT</h5>
              <div className="footer-contact-item">
                <Mail size={13} />
                <span>hello@pressenter.studio</span>
              </div>
              <div className="footer-contact-item">
                <Phone size={13} />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="footer-contact-item">
                <MapPin size={13} />
                <span>Global — Remote Studio</span>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} PressEnter Studio. All rights reserved.</span>
            <div className="footer-bottom-links">
              <button onClick={onResetSplash} className="footer-link-btn">Portal View</button>
              <button onClick={() => setIsContactOpen(true)} className="footer-link-btn gold">Start Project</button>
            </div>
          </div>
        </footer>
      </section>

      {/* Interactive Quick Launch Modal */}
      <ContactModal 
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

      {/* Interactive Showcase Lightbox Modal */}
      <ShowcaseModal 
        isOpen={showcaseIndex !== null}
        onClose={() => setShowcaseIndex(null)}
        projectIndex={showcaseIndex !== null ? showcaseIndex : 0}
        projects={showcaseProjects}
        onNavigate={(newIdx) => setShowcaseIndex(newIdx)}
        onOpenContact={() => setIsContactOpen(true)}
      />
    </div>
  );
}
