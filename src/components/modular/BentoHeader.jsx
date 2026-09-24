import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, MessageSquare, Volume2, VolumeX, RefreshCw } from 'lucide-react';
import { audioManager } from '../../utils/audioManager';
import './BentoHeader.css';

export default function BentoHeader({ onOpenContact, onResetSplash }) {
  const [muted, setMuted] = useState(false);

  const toggleAudio = () => {
    const nextMute = !muted;
    setMuted(nextMute);
    audioManager.setMuted(nextMute);
    if (!nextMute) {
      audioManager.playClick();
    }
  };

  const handleReset = () => {
    audioManager.playClick();
    onResetSplash();
  };

  const handleContact = () => {
    audioManager.playClick();
    onOpenContact();
  };

  return (
    <motion.header 
      className="bento-header"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="bento-header-inner">
        {/* Logo & Reset to Splash */}
        <div 
          className="bento-brand" 
          onClick={handleReset} 
          onMouseEnter={() => audioManager.playHover()}
          title="Return to Portal"
        >
          <img src="/logo.png" alt="PressEnter Logo" className="bento-logo" />
          <div className="bento-brand-badge">
            <span className="status-dot green"></span>
            <span className="badge-text">STUDIO OPEN</span>
          </div>
        </div>

        {/* Quick Info Pill */}
        <div className="header-center-pill">
          <Sparkles size={14} className="gold-icon" />
          <span>One-Stop Brand Creation Studio</span>
        </div>

        {/* Action Controls */}
        <div className="bento-header-actions">
          <button 
            className="icon-action-btn"
            onClick={toggleAudio}
            onMouseEnter={() => audioManager.playHover()}
            title={muted ? "Unmute sound FX" : "Mute sound FX"}
          >
            {muted ? <VolumeX size={15} /> : <Volume2 size={15} />}
          </button>

          <button 
            className="portal-reset-btn"
            onClick={handleReset}
            onMouseEnter={() => audioManager.playHover()}
            title="Re-open Portal"
          >
            <RefreshCw size={13} />
            <span className="reset-label">PORTAL</span>
          </button>

          <button 
            className="header-contact-btn" 
            onClick={handleContact}
            onMouseEnter={() => audioManager.playHover()}
          >
            <MessageSquare size={14} className="btn-msg-icon" />
            <span className="contact-btn-text">START PROJECT</span>
          </button>
        </div>
      </div>
    </motion.header>
  );
}
