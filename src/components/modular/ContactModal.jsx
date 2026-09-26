import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Mail, User, Briefcase, DollarSign, Sparkles, MessageSquare, ArrowRight } from 'lucide-react';
import { audioManager } from '../../utils/audioManager';
import './ContactModal.css';

const BUDGET_RANGES = [
  { id: 'b1', label: '$2.5k – $5k' },
  { id: 'b2', label: '$5k – $15k' },
  { id: 'b3', label: '$15k – $30k' },
  { id: 'b4', label: '$30k+' }
];

export default function ContactModal({ isOpen, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState('b2');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: 'Full Brand Suite (Identity + Web + Video)',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    audioManager.playClick();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2800);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="modal-backdrop" onClick={onClose}>
        <motion.div 
          className="modal-container"
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="modal-glow-ambient" />

          <button 
            className="modal-close-btn" 
            onClick={() => {
              audioManager.playClick();
              onClose();
            }}
            aria-label="Close Modal"
          >
            <X size={18} />
          </button>

          {submitted ? (
            <div className="modal-success-state">
              <CheckCircle2 size={52} className="gold-text success-icon" />
              <h2>Brief Received!</h2>
              <p>Our creative director will analyze your brand scope and reach out within 4 business hours.</p>
              <div className="success-badge">
                <Sparkles size={12} className="gold-text" />
                <span>CONFIRMATION SENT TO YOUR EMAIL</span>
              </div>
            </div>
          ) : (
            <div className="modal-form-wrapper">
              <div className="modal-header">
                <div className="scene-tag">
                  <Sparkles size={13} className="gold-text" />
                  <span>START A PROJECT</span>
                </div>
                <h2 className="modal-title">BUILD YOUR BRAND ENGINE</h2>
                <p className="modal-subtitle">Tell us about your project vision. We'll lock in scope and schedule a director call.</p>
              </div>

              <form onSubmit={handleSubmit} className="modal-form">
                {/* 2-Column Row on Desktop for Name & Email */}
                <div className="form-row-2col">
                  <div className="form-group">
                    <label><User size={12} className="form-label-icon" /> Your Name *</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="Alex Morgan" 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>

                  <div className="form-group">
                    <label><Mail size={12} className="form-label-icon" /> Work Email *</label>
                    <input 
                      type="email" 
                      required 
                      placeholder="alex@company.com" 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>

                <div className="form-row-2col">
                  <div className="form-group">
                    <label><Briefcase size={12} className="form-label-icon" /> Company / Brand</label>
                    <input 
                      type="text" 
                      placeholder="Apex Spatial AI" 
                      value={formData.company}
                      onChange={(e) => setFormData({...formData, company: e.target.value})}
                    />
                  </div>

                  <div className="form-group">
                    <label><Sparkles size={12} className="form-label-icon" /> Capability Needed</label>
                    <select 
                      value={formData.service}
                      onChange={(e) => setFormData({...formData, service: e.target.value})}
                    >
                      <option>Full Brand Suite (Identity + Web + Video)</option>
                      <option>Brand Identity & Logo System</option>
                      <option>High-Performance Web & WebGL App</option>
                      <option>3D Motion & Commercial Video</option>
                      <option>Growth Strategy & Social Creatives</option>
                    </select>
                  </div>
                </div>

                {/* Estimated Budget Selector */}
                <div className="form-group">
                  <label><DollarSign size={12} className="form-label-icon" /> Target Investment Range</label>
                  <div className="budget-chips-grid">
                    {BUDGET_RANGES.map((b) => (
                      <button
                        type="button"
                        key={b.id}
                        className={`budget-chip ${selectedBudget === b.id ? 'active' : ''}`}
                        onClick={() => {
                          audioManager.playClick();
                          setSelectedBudget(b.id);
                        }}
                      >
                        {b.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label><MessageSquare size={12} className="form-label-icon" /> Project Details</label>
                  <textarea 
                    rows={3} 
                    placeholder="Briefly describe your timeline, goals, or aesthetic vision..."
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  />
                </div>

                <button type="submit" className="modal-submit-btn" onMouseEnter={() => audioManager.playHover()}>
                  <span>SEND PROJECT BRIEF</span>
                  <ArrowRight size={16} />
                </button>
              </form>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
