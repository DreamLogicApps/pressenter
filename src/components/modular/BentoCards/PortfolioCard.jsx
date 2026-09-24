import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Film, Play, ChevronLeft, ChevronRight } from 'lucide-react';
import { audioManager } from '../../../utils/audioManager';

const projects = [
  {
    title: 'AETHER MONOLITH',
    category: 'Brand Identity & Web',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    tag: 'Web & Identity'
  },
  {
    title: 'VELOCITY DYNAMICS',
    category: '3D Motion & Video Production',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
    tag: 'Commercial Film'
  },
  {
    title: 'AURORA CAPITAL',
    category: 'Social Content & Rebrand',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    tag: 'Full Brand Suite'
  }
];

export default function PortfolioCard() {
  const [activeProject, setActiveProject] = useState(0);

  const nextProject = () => {
    audioManager.playToggle();
    setActiveProject((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
  };

  const prevProject = () => {
    audioManager.playToggle();
    setActiveProject((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  };

  const handleDragEnd = (e, info) => {
    const swipeThreshold = 35;
    if (info.offset.x < -swipeThreshold) {
      nextProject();
    } else if (info.offset.x > swipeThreshold) {
      prevProject();
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
          style={{ touchAction: 'pan-y', cursor: 'grab' }}
          whileTap={{ cursor: 'grabbing' }}
        >
          <AnimatePresence mode="wait">
            <motion.img 
              key={activeProject}
              src={projects[activeProject].image} 
              alt={projects[activeProject].title} 
              className="portfolio-img"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35 }}
            />
          </AnimatePresence>
          <div className="portfolio-overlay" />
          <div className="portfolio-tag">{projects[activeProject].tag}</div>
          <div className="portfolio-play-btn">
            <Play size={18} fill="currentColor" />
          </div>
          <div className="swipe-hint-pill">
            <span>Swipe &larr; &rarr;</span>
          </div>
        </motion.div>

        <div className="portfolio-info">
          <div>
            <h3 className="project-title">{projects[activeProject].title}</h3>
            <p className="project-cat">{projects[activeProject].category}</p>
          </div>

          <div className="portfolio-controls-group">
            <div className="project-dots">
              {projects.map((_, idx) => (
                <button
                  key={idx}
                  className={`dot-btn ${idx === activeProject ? 'active' : ''}`}
                  onClick={() => {
                    audioManager.playToggle();
                    setActiveProject(idx);
                  }}
                />
              ))}
            </div>
            <div className="nav-arrow-btns">
              <button 
                className="t-arrow-btn" 
                onClick={prevProject}
                onMouseEnter={() => audioManager.playHover()}
                title="Previous Project"
              >
                <ChevronLeft size={16} />
              </button>
              <button 
                className="t-arrow-btn" 
                onClick={nextProject}
                onMouseEnter={() => audioManager.playHover()}
                title="Next Project"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
