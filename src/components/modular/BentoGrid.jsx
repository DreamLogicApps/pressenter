import React, { useState } from 'react';
import { motion } from 'framer-motion';
import BentoHeader from './BentoHeader';
import ContactModal from './ContactModal';
import ShowcaseModal from './ShowcaseModal';
import ScrollProgress from '../common/ScrollProgress';
import KineticStatement from './KineticStatement';

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

  const handleCardMouseMove = (e) => {
    const card = e.currentTarget.querySelector('.bento-card') || e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Subtle 3D Perspective Tilt
    const rotateX = ((y - centerY) / centerY) * -3.5;
    const rotateY = ((x - centerX) / centerX) * 3.5;

    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-3px)`;
  };

  const handleCardMouseLeave = (e) => {
    const card = e.currentTarget.querySelector('.bento-card') || e.currentTarget;
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 35, scale: 0.96 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.65,
        delay: custom * 0.08,
        ease: [0.16, 1, 0.3, 1]
      }
    })
  };

  return (
    <motion.div 
      className="bento-wrapper"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Scroll Progress Bar & Badge */}
      <ScrollProgress />

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
          
          {/* Row 1: Hero Pitch Anchor (Full Width 12 Columns) */}
          <motion.div 
            className="grid-span-12"
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={cardVariants}
            onMouseMove={handleCardMouseMove}
            onMouseLeave={handleCardMouseLeave}
          >
            <HeroCard onExploreServices={scrollToServices} />
          </motion.div>

        </div>

        {/* Full-Screen Scroll Kinetic Statement Section */}
        <KineticStatement />

        <div className="bento-grid-layout">

          {/* Row 2: Featured Showcase & Interactive Brand Lab (Asymmetric Dual Feature: 7 cols + 5 cols) */}
          <motion.div 
            className="grid-span-7"
            custom={2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={cardVariants}
            onMouseMove={handleCardMouseMove}
            onMouseLeave={handleCardMouseLeave}
          >
            <PortfolioCard onOpenShowcase={(idx) => setShowcaseIndex(idx)} />
          </motion.div>

          <motion.div 
            className="grid-span-5"
            custom={3}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={cardVariants}
            onMouseMove={handleCardMouseMove}
            onMouseLeave={handleCardMouseLeave}
          >
            <BrandLabCard />
          </motion.div>

          {/* Row 3: Studio Story & Capabilities Matrix (4 cols + 8 cols) */}
          <motion.div 
            className="grid-span-4"
            custom={4}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={cardVariants}
            onMouseMove={handleCardMouseMove}
            onMouseLeave={handleCardMouseLeave}
          >
            <AboutCard />
          </motion.div>

          <motion.div 
            className="grid-span-8" 
            id="services-section"
            custom={5}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={cardVariants}
            onMouseMove={handleCardMouseMove}
            onMouseLeave={handleCardMouseLeave}
          >
            <ServicesCard />
          </motion.div>

          {/* Row 4: Live Metrics & Client Impact Testimonials (4 cols + 8 cols) */}
          <motion.div 
            className="grid-span-4"
            custom={6}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={cardVariants}
            onMouseMove={handleCardMouseMove}
            onMouseLeave={handleCardMouseLeave}
          >
            <MetricsCard />
          </motion.div>

          <motion.div 
            className="grid-span-8"
            custom={7}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={cardVariants}
            onMouseMove={handleCardMouseMove}
            onMouseLeave={handleCardMouseLeave}
          >
            <TestimonialsCard />
          </motion.div>

          {/* Row 5: Interactive Process & Estimator (6 cols + 6 cols) */}
          <motion.div 
            className="grid-span-6"
            custom={8}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={cardVariants}
            onMouseMove={handleCardMouseMove}
            onMouseLeave={handleCardMouseLeave}
          >
            <WorkflowCard />
          </motion.div>

          <motion.div 
            className="grid-span-6"
            custom={9}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={cardVariants}
            onMouseMove={handleCardMouseMove}
            onMouseLeave={handleCardMouseLeave}
          >
            <EstimatorCard onOpenContact={() => setIsContactOpen(true)} />
          </motion.div>

          {/* Row 6: FAQ & Quick Contact Launch Banner (5 cols + 7 cols) */}
          <motion.div 
            className="grid-span-5"
            custom={10}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={cardVariants}
            onMouseMove={handleCardMouseMove}
            onMouseLeave={handleCardMouseLeave}
          >
            <FAQCard />
          </motion.div>

          <motion.div 
            className="grid-span-7"
            custom={11}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={cardVariants}
            onMouseMove={handleCardMouseMove}
            onMouseLeave={handleCardMouseLeave}
          >
            <ContactCard onOpenContact={() => setIsContactOpen(true)} />
          </motion.div>

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
