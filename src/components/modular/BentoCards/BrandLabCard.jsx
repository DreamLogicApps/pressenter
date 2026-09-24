import React, { useState } from 'react';
import { Sliders, Sparkles, RefreshCw } from 'lucide-react';
import { audioManager } from '../../../utils/audioManager';

const accents = [
  { id: 'gold', name: 'Studio Gold', hex: '#C3922E' },
  { id: 'silver', name: 'Raw Silver', hex: '#dee3e6' },
  { id: 'cyan', name: 'Cyber Cyan', hex: '#00e5ff' },
  { id: 'purple', name: 'Neon Purple', hex: '#b026ff' }
];

const fonts = [
  { id: 'sans', name: 'Modern Sans', style: 'Inter, sans-serif' },
  { id: 'serif', name: 'Editorial Serif', style: 'Georgia, serif' },
  { id: 'mono', name: 'Tech Mono', style: 'monospace' }
];

export default function BrandLabCard() {
  const [activeAccent, setActiveAccent] = useState(accents[0]);
  const [activeFont, setActiveFont] = useState(fonts[0]);

  const handleAccentChange = (acc) => {
    audioManager.playToggle();
    setActiveAccent(acc);
  };

  const handleFontChange = (f) => {
    audioManager.playToggle();
    setActiveFont(f);
  };

  return (
    <div className="bento-card bento-brand-lab">
      <div className="card-top-tag">
        <Sliders size={14} className="gold-text" />
        <span>INTERACTIVE BRAND LAB</span>
      </div>

      <div className="lab-controls-row">
        {/* Accent Selector */}
        <div className="lab-control-group">
          <label className="lab-label">Brand Color Accent</label>
          <div className="color-swatches">
            {accents.map((acc) => (
              <button
                key={acc.id}
                className={`swatch-btn ${activeAccent.id === acc.id ? 'active' : ''}`}
                style={{ backgroundColor: acc.hex }}
                onClick={() => handleAccentChange(acc)}
                onMouseEnter={() => audioManager.playHover()}
                title={acc.name}
              />
            ))}
          </div>
        </div>

        {/* Font Selector */}
        <div className="lab-control-group">
          <label className="lab-label">Typography Style</label>
          <div className="font-pills">
            {fonts.map((f) => (
              <button
                key={f.id}
                className={`font-pill-btn ${activeFont.id === f.id ? 'active' : ''}`}
                onClick={() => handleFontChange(f)}
                onMouseEnter={() => audioManager.playHover()}
              >
                <span>{f.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Live Preview Screen */}
      <div 
        className="lab-preview-screen"
        style={{ fontFamily: activeFont.style }}
      >
        <div className="preview-header">
          <span className="live-pill" style={{ borderColor: activeAccent.hex, color: activeAccent.hex }}>LIVE PREVIEW</span>
        </div>

        <div className="preview-logo-box">
          <h2 className="preview-brand-title" style={{ color: activeAccent.hex }}>
            PRESSENTER
          </h2>
          <p className="preview-tagline">NEXT-GEN BRAND IDENTITY SYSTEM</p>
        </div>

        <button 
          className="preview-btn" 
          style={{ background: activeAccent.hex, color: '#060608' }}
          onMouseEnter={() => audioManager.playHover()}
        >
          <span>Explore Custom DNA</span>
        </button>
      </div>
    </div>
  );
}
