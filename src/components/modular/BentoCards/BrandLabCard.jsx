import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sliders, Sparkles, Layout, Smartphone, Shield, Wand2, Type, Check, RefreshCw } from 'lucide-react';
import { audioManager } from '../../../utils/audioManager';

const archetypes = [
  {
    id: 'gold',
    name: 'Monolith Gold',
    accent: '#C3922E',
    glow: 'rgba(195, 146, 46, 0.4)',
    bg: 'linear-gradient(135deg, rgba(24, 20, 14, 0.95) 0%, rgba(10, 9, 6, 0.98) 100%)',
    border: 'rgba(195, 146, 46, 0.35)',
    tagline: 'High-Status Luxury & Authority'
  },
  {
    id: 'cyan',
    name: 'Cyber Cyan',
    accent: '#00e5ff',
    glow: 'rgba(0, 229, 255, 0.4)',
    bg: 'linear-gradient(135deg, rgba(6, 22, 32, 0.95) 0%, rgba(3, 10, 16, 0.98) 100%)',
    border: 'rgba(0, 229, 255, 0.35)',
    tagline: 'Futuristic Tech & AI Innovation'
  },
  {
    id: 'purple',
    name: 'Neon Purple',
    accent: '#b026ff',
    glow: 'rgba(176, 38, 255, 0.4)',
    bg: 'linear-gradient(135deg, rgba(24, 8, 34, 0.95) 0%, rgba(11, 4, 16, 0.98) 100%)',
    border: 'rgba(176, 38, 255, 0.35)',
    tagline: 'Vibrant Creative Engine & Media'
  },
  {
    id: 'emerald',
    name: 'Emerald Mint',
    accent: '#10b981',
    glow: 'rgba(16, 185, 129, 0.4)',
    bg: 'linear-gradient(135deg, rgba(6, 26, 18, 0.95) 0%, rgba(3, 12, 8, 0.98) 100%)',
    border: 'rgba(16, 185, 129, 0.35)',
    tagline: 'Sustainable Growth & Web3 Capital'
  }
];

const fonts = [
  { id: 'sans', name: 'Modern Sans', style: 'Inter, system-ui, sans-serif' },
  { id: 'serif', name: 'Editorial Serif', style: 'Georgia, serif' },
  { id: 'mono', name: 'Tech Mono', style: 'monospace' }
];

const viewModes = [
  { id: 'web', name: 'Web Hero', icon: Layout },
  { id: 'app', name: 'Mobile App', icon: Smartphone },
  { id: 'badge', name: 'Brand Badge', icon: Shield }
];

export default function BrandLabCard() {
  const [activeArchetype, setActiveArchetype] = useState(archetypes[0]);
  const [activeFont, setActiveFont] = useState(fonts[0]);
  const [activeView, setActiveView] = useState('web');
  const [brandName, setBrandName] = useState('PRESSENTER');
  const [isGenerated, setIsGenerated] = useState(false);

  const handleArchetypeSelect = (arch) => {
    audioManager.playToggle();
    setActiveArchetype(arch);
  };

  const handleFontSelect = (f) => {
    audioManager.playToggle();
    setActiveFont(f);
  };

  const handleViewSelect = (vId) => {
    audioManager.playToggle();
    setActiveView(vId);
  };

  const handleNameChange = (e) => {
    const val = e.target.value.slice(0, 18);
    setBrandName(val.toUpperCase());
  };

  const handleGenerate = () => {
    audioManager.playClick();
    setIsGenerated(true);
    setTimeout(() => setIsGenerated(false), 2000);
  };

  const displayName = brandName.trim() || 'YOUR BRAND';

  return (
    <div className="bento-card bento-brand-lab">
      <div className="card-top-tag">
        <Sliders size={14} className="gold-text" />
        <span>INTERACTIVE BRAND LAB & DNA SIMULATOR</span>
      </div>

      {/* Control Panel Section */}
      <div className="lab-controls-container">
        {/* Row 1: Live Brand Name Input & View Switcher */}
        <div className="lab-top-controls">
          <div className="lab-input-group">
            <label className="lab-label flex items-center gap-1">
              <Type size={12} className="gold-text" />
              <span>TEST YOUR BRAND NAME</span>
            </label>
            <input 
              type="text" 
              value={brandName}
              onChange={handleNameChange}
              placeholder="TYPE YOUR BRAND..."
              className="lab-brand-input"
            />
          </div>

          <div className="lab-view-switcher">
            <label className="lab-label">CANVAS VIEW</label>
            <div className="view-mode-pills">
              {viewModes.map((v) => {
                const Icon = v.icon;
                const isActive = activeView === v.id;
                return (
                  <button
                    key={v.id}
                    className={`view-mode-btn ${isActive ? 'active' : ''}`}
                    onClick={() => handleViewSelect(v.id)}
                    onMouseEnter={() => audioManager.playHover()}
                    title={v.name}
                  >
                    <Icon size={13} />
                    <span className="view-mode-text">{v.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Row 2: Archetype Colors & Typography */}
        <div className="lab-bottom-controls">
          {/* Color Archetype Swatches */}
          <div className="lab-control-group">
            <label className="lab-label">BRAND ARCHETYPE</label>
            <div className="color-swatches">
              {archetypes.map((arch) => {
                const isActive = activeArchetype.id === arch.id;
                return (
                  <button
                    key={arch.id}
                    className={`swatch-btn ${isActive ? 'active' : ''}`}
                    style={{ 
                      backgroundColor: arch.accent,
                      boxShadow: isActive ? `0 0 14px ${arch.glow}` : 'none'
                    }}
                    onClick={() => handleArchetypeSelect(arch)}
                    onMouseEnter={() => audioManager.playHover()}
                    title={`${arch.name} - ${arch.tagline}`}
                  />
                );
              })}
            </div>
          </div>

          {/* Typography Selector */}
          <div className="lab-control-group">
            <label className="lab-label">TYPOGRAPHY PERSONALITY</label>
            <div className="font-pills">
              {fonts.map((f) => {
                const isActive = activeFont.id === f.id;
                return (
                  <button
                    key={f.id}
                    className={`font-pill-btn ${isActive ? 'active' : ''}`}
                    onClick={() => handleFontSelect(f)}
                    onMouseEnter={() => audioManager.playHover()}
                  >
                    <span>{f.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Live Canvas Screen */}
      <div 
        className="lab-canvas-screen"
        style={{ 
          background: activeArchetype.bg,
          borderColor: activeArchetype.border,
          boxShadow: `0 15px 35px rgba(0,0,0,0.6), 0 0 25px ${activeArchetype.glow}`,
          fontFamily: activeFont.style
        }}
      >
        <div className="canvas-top-bar">
          <span className="archetype-tagline-pill" style={{ color: activeArchetype.accent, borderColor: activeArchetype.border }}>
            {activeArchetype.name.toUpperCase()} • {activeArchetype.tagline}
          </span>
          <span className="live-status-dot" style={{ background: activeArchetype.accent, boxShadow: `0 0 8px ${activeArchetype.accent}` }} />
        </div>

        {/* View Mode Canvas Rendering */}
        <AnimatePresence mode="wait">
          {activeView === 'web' && (
            <motion.div 
              key="web-view"
              className="canvas-view-content web-view"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3 }}
            >
              <div className="web-badge" style={{ background: `${activeArchetype.accent}15`, borderColor: activeArchetype.border, color: activeArchetype.accent }}>
                <Sparkles size={12} />
                <span>UNIFIED BRAND SYSTEM</span>
              </div>
              <h2 className="canvas-brand-name" style={{ color: activeArchetype.accent, textShadow: `0 0 20px ${activeArchetype.glow}` }}>
                {displayName}
              </h2>
              <p className="canvas-sub-tagline">IDENTITY • WEB PLATFORM • MEDIA PRODUCTION</p>
              <button 
                className="canvas-action-btn"
                style={{ background: activeArchetype.accent, color: '#060608', boxShadow: `0 4px 15px ${activeArchetype.glow}` }}
                onClick={handleGenerate}
                onMouseEnter={() => audioManager.playHover()}
              >
                {isGenerated ? (
                  <>
                    <Check size={14} />
                    <span>DNA COMPILED!</span>
                  </>
                ) : (
                  <>
                    <Wand2 size={14} />
                    <span>COMPILE BRAND DNA</span>
                  </>
                )}
              </button>
            </motion.div>
          )}

          {activeView === 'app' && (
            <motion.div 
              key="app-view"
              className="canvas-view-content app-view"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3 }}
            >
              <div className="app-frame" style={{ borderColor: activeArchetype.border }}>
                <div className="app-top-header">
                  <span className="app-brand-title" style={{ color: activeArchetype.accent }}>{displayName}</span>
                  <span className="app-version">v2.4</span>
                </div>
                <div className="app-card-preview" style={{ background: `${activeArchetype.accent}10`, borderColor: activeArchetype.border }}>
                  <div className="app-card-title" style={{ color: '#ffffff' }}>Active Campaign</div>
                  <div className="app-card-val" style={{ color: activeArchetype.accent }}>+340% Growth</div>
                </div>
                <button 
                  className="app-action-pill"
                  style={{ background: activeArchetype.accent, color: '#060608' }}
                  onClick={handleGenerate}
                >
                  {isGenerated ? 'COMPILED!' : 'LAUNCH APP DNA'}
                </button>
              </div>
            </motion.div>
          )}

          {activeView === 'badge' && (
            <motion.div 
              key="badge-view"
              className="canvas-view-content badge-view"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3 }}
            >
              <div className="shield-icon-wrapper" style={{ borderColor: activeArchetype.border, boxShadow: `0 0 25px ${activeArchetype.glow}` }}>
                <Shield size={36} style={{ color: activeArchetype.accent }} />
                <span className="shield-initials" style={{ color: activeArchetype.accent }}>{displayName.slice(0, 2)}</span>
              </div>
              <h3 className="badge-brand-title" style={{ color: '#ffffff' }}>{displayName}</h3>
              <p className="badge-subtitle" style={{ color: activeArchetype.accent }}>CERTIFIED BRAND ARCHETYPE</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
