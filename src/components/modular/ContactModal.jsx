import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle, Mail, Phone, Sparkles } from 'lucide-react';
import './ContactModal.css';

export default function ContactModal({ isOpen, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Full Brand Suite',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="modal-backdrop" onClick={onClose}>
        <motion.div 
          className="modal-container"
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <button className="modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>

          {submitted ? (
            <div className="modal-success-state">
              <CheckCircle size={48} className="gold-text success-icon" />
              <h2>Brief Received!</h2>
              <p>Our creative director will reach out within 4 business hours.</p>
            </div>
          ) : (
            <div className="modal-form-wrapper">
              <div className="modal-header">
                <div className="splash-badge">
                  <Sparkles size={12} className="gold-text" />
                  <span>START A PROJECT</span>
                </div>
                <h2>Let's build your brand engine.</h2>
                <p>Tell us about your company and what capabilities you need.</p>
              </div>

              <form onSubmit={handleSubmit} className="modal-form">
                <div className="form-group">
                  <label>Your Name</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="John Doe" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>

                <div className="form-group">
                  <label>Email Address</label>
                  <input 
                    type="email" 
                    required 
                    placeholder="john@company.com" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>

                <div className="form-group">
                  <label>Primary Need</label>
                  <select 
                    value={formData.service}
                    onChange={(e) => setFormData({...formData, service: e.target.value})}
                  >
                    <option>Full Brand Suite (Identity + Web + Video)</option>
                    <option>Brand Identity & Logo System</option>
                    <option>Website Design & Engineering</option>
                    <option>Video Shooting & Production</option>
                    <option>Social Media & Marketing Creatives</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Project Details</label>
                  <textarea 
                    rows={3} 
                    placeholder="Briefly describe your goals or vision..."
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  />
                </div>

                <button type="submit" className="modal-submit-btn">
                  <span>Send Project Brief</span>
                  <Send size={15} />
                </button>
              </form>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
