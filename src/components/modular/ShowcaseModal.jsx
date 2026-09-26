import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Sparkles, CheckCircle2, ArrowRight, ExternalLink } from 'lucide-react';
import { audioManager } from '../../utils/audioManager';
import './ShowcaseModal.css';

export default function ShowcaseModal({ isOpen, onClose, projectIndex, projects, onNavigate, onOpenContact }) {
  const currentProject = projects[projectIndex];

  // Keyboard navigation & escape listener
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        audioManager.playClick();
        onClose();
      } else if (e.key === 'ArrowLeft') {
        const prevIdx = projectIndex === 0 ? projects.length - 1 : projectIndex - 1;
        audioManager.playToggle();
        onNavigate(prevIdx);
      } else if (e.key === 'ArrowRight') {
        const nextIdx = projectIndex === projects.length - 1 ? 0 : projectIndex + 1;
        audioManager.playToggle();
        onNavigate(nextIdx);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, projectIndex, projects.length, onClose, onNavigate]);

  if (!isOpen || !currentProject) return null;

  const handlePrev = () => {
    audioManager.playToggle();
    const prevIdx = projectIndex === 0 ? projects.length - 1 : projectIndex - 1;
    onNavigate(prevIdx);
  };

  const handleNext = () => {
    audioManager.playToggle();
    const nextIdx = projectIndex === projects.length - 1 ? 0 : projectIndex + 1;
    onNavigate(nextIdx);
  };

  const handleClose = () => {
    audioManager.playClick();
    onClose();
  };

  const handleStartProject = () => {
    audioManager.playClick();
    onClose();
    if (onOpenContact) {
      onOpenContact();
    }
  };

  const handleMediaDragEnd = (e, info) => {
    const swipeThreshold = 35;
    if (info.offset.x < -swipeThreshold) {
      handleNext();
    } else if (info.offset.x > swipeThreshold) {
      handlePrev();
    }
  };

  return (
    <AnimatePresence>
      <div className="showcase-modal-backdrop" onClick={handleClose}>
        <motion.div 
          className="showcase-modal-container"
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Close Button */}
          <button 
            className="showcase-close-btn" 
            onClick={handleClose}
            onMouseEnter={() => audioManager.playHover()}
            title="Close Showcase"
          >
            <X size={18} />
          </button>

          {/* Modal Header */}
          <div className="showcase-modal-header">
            <div className="modal-tag-badge">
              <Sparkles size={12} className="gold-text" />
              <span>CASE STUDY</span>
            </div>
            <div className="modal-nav-group">
              <button 
                className="showcase-nav-arrow" 
                onClick={handlePrev}
                onMouseEnter={() => audioManager.playHover()}
                title="Previous Case Study"
              >
                <ChevronLeft size={16} />
              </button>
              <span className="modal-counter">{projectIndex + 1}/{projects.length}</span>
              <button 
                className="showcase-nav-arrow" 
                onClick={handleNext}
                onMouseEnter={() => audioManager.playHover()}
                title="Next Case Study"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Modal Grid Content */}
          <div className="showcase-modal-grid">
            {/* Visual Media Column */}
            <div className="showcase-media-col">
              <motion.div 
                className="showcase-hero-img-box swipeable-area"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={handleMediaDragEnd}
                style={{ touchAction: 'pan-y' }}
              >
                <img 
                  src={currentProject.image} 
                  alt={currentProject.title} 
                  className="showcase-hero-img"
                />
                <div className="showcase-hero-overlay" />
                <div className="showcase-hero-tag">{currentProject.tag}</div>
                <div className="swipe-hint-pill mobile-hint">
                  <span>Swipe &larr; &rarr;</span>
                </div>
              </motion.div>

              {/* Impact Metrics Row */}
              {currentProject.stats && (
                <div className="showcase-stats-row">
                  {currentProject.stats.map((stat, i) => (
                    <div key={i} className="showcase-stat-pill">
                      <span className="stat-value">
                        {typeof stat === 'object' ? `${stat.value} ${stat.label}` : stat}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Info & Details Column */}
            <div className="showcase-info-col">
              <div>
                <h2 className="showcase-title">{currentProject.title}</h2>
                <p className="showcase-subtitle">{currentProject.subtitle || currentProject.category}</p>
              </div>

              <div className="showcase-desc-box">
                <p className="showcase-desc">{currentProject.description}</p>
              </div>

              {/* Deliverables List */}
              {currentProject.deliverables && (
                <div className="showcase-deliverables-section">
                  <h4 className="deliverables-heading">DELIVERABLES CRAFTED</h4>
                  <div className="deliverables-chips-grid">
                    {currentProject.deliverables.map((item, idx) => (
                      <div key={idx} className="deliverable-chip">
                        <CheckCircle2 size={13} className="gold-icon" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Footer */}
              <div className="showcase-modal-actions">
                <button 
                  className="showcase-cta-primary" 
                  onClick={handleStartProject}
                  onMouseEnter={() => audioManager.playHover()}
                >
                  <span>Build Similar Brand</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
