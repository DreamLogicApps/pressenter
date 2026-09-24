import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Film, Play, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { audioManager } from '../../../utils/audioManager';

export const showcaseProjects = [
  {
    id: 'aether',
    title: 'AETHER MONOLITH',
    subtitle: 'Decentralized Finance & AI Trading Infrastructure',
    category: 'Brand Identity & Web Platform',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    tag: 'Web & Identity',
    deliverables: ['Visual Identity System', 'Custom React Web Platform', '3D Motion Brand Assets', 'Brand Guidelines'],
    stats: ['2.4x Conversion Increase', '45ms Load Speed', '$12M TVL Managed'],
    description: 'Aether Monolith required a futuristic brand identity paired with a high-performance web dashboard that conveys institutional security and cutting-edge intelligence.'
  },
  {
    id: 'velocity',
    title: 'VELOCITY DYNAMICS',
    subtitle: 'High-Performance EV Concept & Cinematic Launch',
    category: '3D Motion & Video Production',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
    tag: 'Commercial Film',
    deliverables: ['4K Commercial Shoot', '3D Motion Graphics', 'Spatial Audio Sound Design', 'Social Ad Suites'],
    stats: ['3.2M+ Organic Views', '85% Completion Rate', '#1 Trending Launch'],
    description: 'Velocity Dynamics engaged PressEnter for a high-octane commercial campaign. We executed the complete visual narrative, from storyboard and cinematic lighting to 3D motion graphics.'
  },
  {
    id: 'aurora',
    title: 'AURORA CAPITAL',
    subtitle: 'Venture Studio Branding & Investor Platform',
    category: 'Social Content & Rebrand',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    tag: 'Full Brand Suite',
    deliverables: ['Brand Positioning Strategy', 'Investor Pitch Deck', 'Web Platform', 'Social Content Engine'],
    stats: ['$4.2M Seed Round Closed', '140% Pipeline Growth', '25-Day Delivery'],
    description: 'Aurora Capital needed to establish immediate market trust for their newly launched venture fund. PressEnter built their end-to-end visual presence, deck design, and web portal.'
  }
];

export default function PortfolioCard({ onOpenShowcase }) {
  const [activeProject, setActiveProject] = useState(0);

  const nextProject = () => {
    audioManager.playToggle();
    setActiveProject((prev) => (prev === showcaseProjects.length - 1 ? 0 : prev + 1));
  };

  const prevProject = () => {
    audioManager.playToggle();
    setActiveProject((prev) => (prev === 0 ? showcaseProjects.length - 1 : prev - 1));
  };

  const handleDragEnd = (e, info) => {
    const swipeThreshold = 35;
    if (info.offset.x < -swipeThreshold) {
      nextProject();
    } else if (info.offset.x > swipeThreshold) {
      prevProject();
    }
  };

  const handleCardClick = () => {
    audioManager.playClick();
    if (onOpenShowcase) {
      onOpenShowcase(activeProject);
    }
  };

  return (
    <div className="bento-card bento-portfolio">
      <div className="card-top-tag">
        <Film size={14} className="gold-text" />
        <span>FEATURED SHOWCASE</span>
      </div>

      <div className="portfolio-viewer">
        <motion.div 
          className="portfolio-img-wrapper swipeable-area"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={handleDragEnd}
          onClick={handleCardClick}
          style={{ touchAction: 'pan-y', cursor: 'pointer' }}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <AnimatePresence mode="wait">
            <motion.img 
              key={activeProject}
              src={showcaseProjects[activeProject].image} 
              alt={showcaseProjects[activeProject].title} 
              className="portfolio-img"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35 }}
            />
          </AnimatePresence>
          <div className="portfolio-overlay" />
          <div className="portfolio-tag">{showcaseProjects[activeProject].tag}</div>
          <div className="portfolio-play-btn" title="Click to Expand Case Study">
            <Maximize2 size={16} />
          </div>
          <div className="swipe-hint-pill">
            <span>Click to Expand • Swipe &larr; &rarr;</span>
          </div>
        </motion.div>

        <div className="portfolio-info" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
          <div>
            <h3 className="project-title">{showcaseProjects[activeProject].title}</h3>
            <p className="project-cat">{showcaseProjects[activeProject].category}</p>
          </div>
        </div>

        <div className="portfolio-controls">
          <div className="testimonial-dots">
            {showcaseProjects.map((_, idx) => (
              <span
                key={idx}
                className={`t-dot ${idx === activeProject ? 'active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  audioManager.playToggle();
                  setActiveProject(idx);
                }}
              />
            ))}
          </div>
          <div className="nav-arrow-btns">
            <button 
              className="t-arrow-btn" 
              onClick={(e) => {
                e.stopPropagation();
                prevProject();
              }}
              onMouseEnter={() => audioManager.playHover()}
              title="Previous Project"
            >
              <ChevronLeft size={16} />
            </button>
            <button 
              className="t-arrow-btn" 
              onClick={(e) => {
                e.stopPropagation();
                nextProject();
              }}
              onMouseEnter={() => audioManager.playHover()}
              title="Next Project"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
