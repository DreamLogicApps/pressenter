import React, { useState } from 'react';
import { motion } from 'framer-motion';
import BentoHeader from './BentoHeader';
import ContactModal from './ContactModal';
import ShowcaseModal from './ShowcaseModal';

import HeroCard from './BentoCards/HeroCard';
import ServicesCard from './BentoCards/ServicesCard';
import PortfolioCard, { showcaseProjects } from './BentoCards/PortfolioCard';
import MetricsCard from './BentoCards/MetricsCard';
import WorkflowCard from './BentoCards/WorkflowCard';
import EstimatorCard from './BentoCards/EstimatorCard';
import AboutCard from './BentoCards/AboutCard';
import BrandLabCard from './BentoCards/BrandLabCard';
import TestimonialsCard from './BentoCards/TestimonialsCard';
import FAQCard from './BentoCards/FAQCard';
import ContactCard from './BentoCards/ContactCard';

import { audioManager } from '../../utils/audioManager';
import './BentoGrid.css';

export default function BentoGrid({ onResetSplash }) {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [showcaseIndex, setShowcaseIndex] = useState(null);

  const scrollToServices = () => {
    audioManager.playClick();
    const el = document.getElementById('services-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.div 
      className="bento-wrapper"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Floating Header */}
      <BentoHeader 
        onOpenContact={() => setIsContactOpen(true)}
        onResetSplash={onResetSplash}
      />

      {/* Main Bento Layout Container */}
      <main className="bento-main-container">
        
        {/* Background ambient lighting */}
        <div className="bento-ambient-glow glow-1" />
        <div className="bento-ambient-glow glow-2" />

        <div className="bento-grid-layout">
          
          {/* Row 1: Hero Pitch (7 cols) + Portfolio Showcase (5 cols) */}
          <div className="grid-span-7">
            <HeroCard onExploreServices={scrollToServices} />
          </div>

          <div className="grid-span-5">
            <PortfolioCard onOpenShowcase={(idx) => setShowcaseIndex(idx)} />
          </div>

          {/* Row 2: Studio Philosophy / About Us (6 cols) + Interactive Brand Lab (6 cols) */}
          <div className="grid-span-6">
            <AboutCard />
          </div>

          <div className="grid-span-6">
            <BrandLabCard />
          </div>

          {/* Row 3: Live Metrics (4 cols) + Modular Capabilities (8 cols) */}
          <div className="grid-span-4">
            <MetricsCard />
          </div>

          <div className="grid-span-8" id="services-section">
            <ServicesCard />
          </div>

          {/* Row 4: Workflow Timeline (6 cols) + Package Estimator (6 cols) */}
          <div className="grid-span-6">
            <WorkflowCard />
          </div>

          <div className="grid-span-6">
            <EstimatorCard onOpenContact={() => setIsContactOpen(true)} />
          </div>

          {/* Row 5: Client Impact Testimonials (7 cols) + FAQ Accordion (5 cols) */}
          <div className="grid-span-7">
            <TestimonialsCard />
          </div>

          <div className="grid-span-5">
            <FAQCard />
          </div>

          {/* Row 6: Full-width Quick Contact Launch Banner */}
          <div className="grid-span-12">
            <ContactCard onOpenContact={() => setIsContactOpen(true)} />
          </div>

        </div>

        {/* Premium Studio Footer */}
        <footer className="bento-footer">
          <div className="footer-top-row">
            <div className="footer-brand-group">
              <img src="/logo.png" alt="PressEnter Studio" className="footer-logo" />
              <p className="footer-tagline">
                One-Stop Brand Creation Studio. Identity, Web, Apps, Video, and Growth — All Under One Roof.
              </p>
            </div>

            <div className="footer-actions-group">
              <button 
                onClick={onResetSplash} 
                onMouseEnter={() => audioManager.playHover()} 
                className="footer-pill-btn"
              >
                <span>Portal View</span>
              </button>
              <button 
                onClick={scrollToServices} 
                onMouseEnter={() => audioManager.playHover()} 
                className="footer-pill-btn"
              >
                <span>Capabilities</span>
              </button>
              <button 
                onClick={() => {
                  audioManager.playClick();
                  setIsContactOpen(true);
                }} 
                onMouseEnter={() => audioManager.playHover()} 
                className="footer-pill-btn gold"
              >
                <span>Start Project</span>
              </button>
            </div>
          </div>

          <div className="footer-bottom-row">
            <span className="copyright-text">© {new Date().getFullYear()} PressEnter Studio. All rights reserved.</span>
            <div className="footer-status-pill">
              <span className="status-dot green" />
              <span>ACCEPTING NEW BRAND CLIENTS</span>
            </div>
          </div>
        </footer>

      </main>

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
    </motion.div>
  );
}
