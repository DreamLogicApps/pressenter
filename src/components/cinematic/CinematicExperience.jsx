import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, ArrowRight, ArrowUpRight, Zap, CheckCircle2, ShieldCheck, 
  Award, RefreshCw, MessageSquare, Volume2, VolumeX, Eye, Play, ChevronRight,
  Layers, Cpu, Globe, Palette, Film, Smartphone, Plus, Minus
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
  { id: 'gold', name: 'OBSIDIAN GOLD', primary: '#C3922E', bg: '#060608', glow: 'rgba(195, 146, 46, 0.35)' },
  { id: 'cyan', name: 'CYBER CYAN', primary: '#00F0FF', bg: '#050B14', glow: 'rgba(0, 240, 255, 0.35)' },
  { id: 'silver', name: 'TITANIUM SILVER', primary: '#E2E8F0', bg: '#0A0C10', glow: 'rgba(226, 232, 240, 0.35)' },
  { id: 'emerald', name: 'NEON EMERALD', primary: '#10B981', bg: '#040F0A', glow: 'rgba(16, 185, 129, 0.35)' }
];

export default function CinematicExperience({ onResetSplash }) {
  const [muted, setMuted] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [showcaseIndex, setShowcaseIndex] = useState(null);
  const [activePalette, setActivePalette] = useState(BRAND_PALETTES[0]);

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState(0);
  const FAQS = [
    { 
      q: "What makes PressEnter different from traditional agencies?", 
      a: "Traditional agencies delegate your project across fragmented teams, causing communication breakdowns and slow execution. PressEnter operates as a unified creation engine — identity, web, apps, video, and growth under one single studio director." 
    },
    { 
      q: "How fast can we launch our complete brand ecosystem?", 
      a: "Our core brand creation & web app sprints deliver production-ready assets in 2 to 3 weeks, executing up to 3x faster than traditional multi-agency pipelines." 
    },
    { 
      q: "Do we get full commercial rights and source design files?", 
      a: "Yes, 100%. Upon completion, you receive full commercial ownership and raw source files for all Figma mockups, 3D renders, video master exports, and codebase repositories." 
    },
    { 
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

  // Estimator State
  const [selectedServices, setSelectedServices] = useState([0, 1]);
  const ESTIMATOR_SERVICES = [
    { title: "Brand System & Identity", price: 2500 },
    { title: "High-Performance Web & Apps", price: 4500 },
    { title: "3D Motion & Visual FX", price: 3000 },
    { title: "Promotional Ads & Video Reel", price: 2000 },
    { title: "Social Growth Strategy", price: 1500 }
  ];

  const toggleService = (idx) => {
    audioManager.playClick();
    setSelectedServices(prev => 
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    );
  };

  const totalPrice = selectedServices.reduce((sum, i) => sum + ESTIMATOR_SERVICES[i].price, 0);

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
    audioManager.playClick();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Scene 1 Parallax Transforms
  const heroTextScale = useTransform(scrollYProgress, [0, 0.25], [1, 1.25]);
  const heroTextOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroBlur = useTransform(scrollYProgress, [0, 0.2], ["blur(0px)", "blur(20px)"]);
  
  // Scene 2 Horizontal Scroll Pin Transforms
  const horizontalTrackRef = useRef(null);
  const { scrollYProgress: horizontalProgress } = useScroll({
    target: horizontalTrackRef,
    offset: ["start start", "end end"]
  });

  const xTransform = useTransform(horizontalProgress, [0, 1], ["0%", "-75%"]);

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
              audioManager.playClick();
              onResetSplash();
            }}
            onMouseEnter={() => audioManager.playHover()}
          >
            <img src="/logo.png" alt="PressEnter Studio" className="hud-logo" />
            <div className="hud-status-badge">
              <span className="hud-status-dot" />
              <span>CORE ACTIVE</span>
            </div>
          </div>

          <div className="hud-nav-links">
            <button onClick={() => scrollToId('scene-showcase')} className="nav-link">SHOWCASE</button>
            <button onClick={() => scrollToId('scene-spatial-lab')} className="nav-link">BRAND LAB</button>
            <button onClick={() => scrollToId('capabilities-section')} className="nav-link">PRICING</button>
            <button onClick={() => scrollToId('scene-faq')} className="nav-link">FAQ</button>
          </div>

          <div className="hud-actions">
            <button 
              className="hud-icon-btn" 
              onClick={toggleAudio}
              onMouseEnter={() => audioManager.playHover()}
              title={muted ? "Unmute Sound" : "Mute Sound"}
            >
              {muted ? <VolumeX size={15} /> : <Volume2 size={15} />}
            </button>

            <button 
              className="hud-pill-btn"
              onClick={() => {
                audioManager.playClick();
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
                audioManager.playClick();
                setIsContactOpen(true);
              }}
              onMouseEnter={() => audioManager.playHover()}
            >
              <MessageSquare size={14} />
              <span>START PROJECT</span>
            </button>
          </div>
        </div>
      </header>

      {/* ===================================================================
          SCENE 1: THE MONOLITH HERO (ZOOM WARP & KINETIC TEXT REVEAL)
          =================================================================== */}
      <section className="scene-hero">
        <motion.div 
          className="hero-warp-container"
          style={{ 
            scale: heroTextScale, 
            opacity: heroTextOpacity, 
            filter: heroBlur 
          }}
        >
          <div className="hero-top-badge">
            <Sparkles size={14} className="gold-text" />
            <span>
              <TextScrambler text="ONE-STOP BRAND CREATION STUDIO" scrambleOnMount={true} />
            </span>
          </div>

          <h1 className="hero-monolith-title">
            WE BUILD BRANDS THAT <br />
            <span className="hero-gradient-text">ENTER THE FUTURE</span>
          </h1>

          <p className="hero-subline">
            Identity. Web. Apps. Video. Growth. All under one roof — engineered for high-growth visionaries.
          </p>

          <div className="hero-action-row">
            <button 
              className="hero-main-cta"
              onClick={() => {
                audioManager.playClick();
                const el = document.getElementById('scene-showcase');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              onMouseEnter={() => audioManager.playHover()}
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
          </div>
        </motion.div>

        {/* Scroll Cue Animation */}
        <div className="scroll-cue-wrapper">
          <div className="scroll-cue-line" />
          <span className="scroll-cue-text">SCROLL TO UNLOCK EXPERIENCE</span>
        </div>
      </section>

      {/* ===================================================================
          SCENE 2: KINETIC STATEMENT (FULL-SCREEN SCROLL REVEAL)
          =================================================================== */}
      <section className="scene-kinetic-pin">
        <div className="kinetic-scene-inner">
          <div className="scene-tag">
            <Zap size={14} className="gold-text" />
            <span>THE PRESSENTER MANIFESTO</span>
          </div>

          <h2 className="kinetic-big-text">
            STOP JUGGLING 5 DIFFERENT AGENCIES. <br />
            <span className="gold-gradient-word">YOUR COMPLETE BRAND ENGINE</span> IS HERE.
          </h2>

          <div className="manifesto-grid">
            <div className="manifesto-card">
              <CheckCircle2 size={16} className="gold-text" />
              <div>
                <h4>Zero Communication Gaps</h4>
                <p>One unified creative director and studio team managing every asset from logo to launch.</p>
              </div>
            </div>

            <div className="manifesto-card">
              <CheckCircle2 size={16} className="gold-text" />
              <div>
                <h4>3x Faster Execution</h4>
                <p>Parallel workflows eliminate weeks of agency friction and back-and-forth handoffs.</p>
              </div>
            </div>

            <div className="manifesto-card">
              <CheckCircle2 size={16} className="gold-text" />
              <div>
                <h4>Cohesive Brand Ecosystem</h4>
                <p>Your web app, marketing video, logo, and ads feel like they belong to one iconic brand world.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          SCENE 3: THE HORIZON REEL (HORIZONTAL STICKY PIN SHOWCASE)
          =================================================================== */}
      <section className="scene-horizontal-pin" id="scene-showcase" ref={horizontalTrackRef}>
        <div className="sticky-pin-viewport">
          
          <div className="horizontal-section-header">
            <div className="scene-tag">
              <Layers size={14} className="gold-text" />
              <span>FEATURED SHOWCASE REEL</span>
            </div>
            <h3 className="section-title-sm">SELECTED BRAND PRODUCTIONS</h3>
          </div>

          <motion.div className="horizontal-scroll-track" style={{ x: xTransform }}>
            {showcaseProjects.map((project, idx) => (
              <div 
                key={idx} 
                className="horizon-card"
                onClick={() => {
                  audioManager.playClick();
                  setShowcaseIndex(idx);
                }}
                onMouseEnter={() => audioManager.playHover()}
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
          </motion.div>

        </div>
      </section>

      {/* ===================================================================
          SCENE 4: THE SPATIAL BRAND LAB (INTERACTIVE COLOR & SYSTEM MATRIX)
          =================================================================== */}
      <section className="scene-spatial-lab">
        <div className="spatial-lab-container">
          
          <div className="lab-left-panel">
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
                  <button 
                    key={p.id} 
                    className={`palette-btn ${activePalette.id === p.id ? 'active' : ''}`}
                    style={{ '--btn-color': p.primary }}
                    onClick={() => {
                      audioManager.playClick();
                      setActivePalette(p);
                    }}
                    onMouseEnter={() => audioManager.playHover()}
                  >
                    <span className="palette-color-dot" style={{ backgroundColor: p.primary }} />
                    <span>{p.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="lab-right-preview">
            <div className="preview-canvas-card">
              <div className="canvas-header">
                <div className="canvas-dots">
                  <span className="dot red" />
                  <span className="dot yellow" />
                  <span className="dot green" />
                </div>
                <span className="canvas-title">PRESSENTER // SYSTEM PREVIEW</span>
              </div>

              <div className="canvas-body">
                <div className="canvas-brand-logo" style={{ color: activePalette.primary }}>
                  PRESSENTER STUDIO
                </div>
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
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Laser Scene Divider */}
      <div className="scene-laser-divider">
        <span className="divider-label">SCENE // 04 — CAPABILITIES & PRICING</span>
      </div>

      {/* ===================================================================
          SCENE 5: CAPABILITIES & PACKAGE COST ESTIMATOR
          =================================================================== */}
      <section className="scene-estimator-section" id="capabilities-section">
        <div className="estimator-container">
          
          <div className="section-header-centered">
            <div className="scene-tag">
              <Cpu size={14} className="gold-text" />
              <span>MODULAR CAPABILITIES & PRICING</span>
            </div>
            <h2 className="section-big-title">BUILD YOUR CUSTOM BRAND PACKAGE</h2>
          </div>

          <div className="estimator-grid">
            <div className="estimator-services-list">
              {ESTIMATOR_SERVICES.map((srv, idx) => {
                const isSelected = selectedServices.includes(idx);
                return (
                  <div 
                    key={idx}
                    className={`estimator-row ${isSelected ? 'selected' : ''}`}
                    onClick={() => toggleService(idx)}
                    onMouseEnter={() => audioManager.playHover()}
                    onMouseMove={handleCardMouseMove}
                    onMouseLeave={handleCardMouseLeave}
                  >
                    <div className="service-check-box">
                      {isSelected ? <Minus size={14} /> : <Plus size={14} />}
                    </div>
                    <span className="service-name">{srv.title}</span>
                    <span className="service-cost">${srv.price.toLocaleString()}</span>
                  </div>
                );
              })}
            </div>

            <div className="estimator-summary-card" onMouseMove={handleCardMouseMove} onMouseLeave={handleCardMouseLeave}>
              <div className="summary-top">
                <span className="summary-label">ESTIMATED INVESTMENT</span>
                <div className="total-price-display">
                  <span className="currency">$</span>
                  <span className="price-num">{totalPrice.toLocaleString()}</span>
                </div>
                <span className="summary-sub">Includes dedicated director & full source assets</span>
              </div>

              <div className="summary-bullets">
                <div className="bullet-item"><CheckCircle2 size={14} className="gold-text" /> 3-Week Rapid Delivery</div>
                <div className="bullet-item"><CheckCircle2 size={14} className="gold-text" /> Unlimited Revisions</div>
                <div className="bullet-item"><CheckCircle2 size={14} className="gold-text" /> Full Commercial Rights</div>
              </div>

              <button 
                className="estimator-submit-btn"
                onClick={() => {
                  audioManager.playClick();
                  setIsContactOpen(true);
                }}
              >
                <span>LOCK IN THIS SCOPE</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Laser Scene Divider */}
      <div className="scene-laser-divider">
        <span className="divider-label">SCENE // 05 — CLIENT IMPACT & FAQ</span>
      </div>

      {/* ===================================================================
          SCENE 6: TESTIMONIALS & FAQ ACCORDION
          =================================================================== */}
      <section className="scene-faq-section" id="scene-faq">
        <div className="faq-container">
          
          <div className="testimonials-box" onMouseMove={handleCardMouseMove} onMouseLeave={handleCardMouseLeave}>
            <div className="scene-tag">
              <Award size={14} className="gold-text" />
              <span>CLIENT IMPACT & REVIEWS</span>
            </div>
            
            <p className="testimonial-quote">"{TESTIMONIALS[testimonialIdx].quote}"</p>
            
            <div className="testimonial-meta">
              <div>
                <span className="test-author">{TESTIMONIALS[testimonialIdx].author}</span>
                <span className="test-role">{TESTIMONIALS[testimonialIdx].role} — {TESTIMONIALS[testimonialIdx].company}</span>
              </div>
              <div className="testimonial-nav">
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
          </div>

          <div className="faq-accordion-box">
            <div className="scene-tag">
              <ShieldCheck size={14} className="gold-text" />
              <span>FREQUENTLY ASKED QUESTIONS</span>
            </div>
            
            <div className="faq-list">
              {FAQS.map((faq, i) => (
                <div key={i} className="faq-item">
                  <button 
                    className="faq-question"
                    onClick={() => {
                      audioManager.playClick();
                      setOpenFaq(openFaq === i ? -1 : i);
                    }}
                  >
                    <span>{faq.q}</span>
                    <span className="faq-icon">{openFaq === i ? '−' : '+'}</span>
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div 
                        className="faq-answer"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p>{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ===================================================================
          SCENE 6: DEPARTURE & HIGH-IMPACT CONTACT LAUNCHPAD
          =================================================================== */}
      <section className="scene-launchpad">
        <div className="launchpad-glow-core" />
        
        <div className="launchpad-content">
          <div className="scene-tag">
            <Sparkles size={14} className="gold-text" />
            <span>START YOUR BRAND REVOLUTION</span>
          </div>

          <h2 className="launchpad-title">
            READY TO BUILD SOMETHING <br />
            <span className="gold-gradient-word">UNFORGETTABLE?</span>
          </h2>

          <p className="launchpad-desc">
            We are currently accepting a limited number of high-growth brand clients for this quarter. Let's create something extraordinary.
          </p>

          <button 
            className="launchpad-cta-btn"
            onClick={() => {
              audioManager.playClick();
              setIsContactOpen(true);
            }}
            onMouseEnter={() => audioManager.playHover()}
            data-cursor="LAUNCH"
          >
            <span>START PROJECT DISCOVERY</span>
            <ArrowRight size={20} />
          </button>
        </div>

        {/* Footer */}
        <footer className="cinematic-footer">
          <div className="footer-inner">
            <div className="footer-left">
              <img src="/logo.png" alt="PressEnter Studio" className="footer-logo" />
              <span>© {new Date().getFullYear()} PressEnter Studio. All rights reserved.</span>
            </div>

            <div className="footer-right">
              <button onClick={onResetSplash} className="footer-link-btn">Portal View</button>
              <button onClick={() => setIsContactOpen(true)} className="footer-link-btn gold">Contact</button>
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
