import React from 'react';
import { Compass, ShieldCheck, Zap, Users, Target } from 'lucide-react';
import { audioManager } from '../../../utils/audioManager';

export default function AboutCard() {
  const values = [
    { title: 'One Unified Director', desc: 'Single point of contact managing all design, dev, and video tracks.' },
    { title: 'Zero Friction', desc: 'No handoff delays between separate design, video, and marketing agencies.' },
    { title: '3x Speed to Market', desc: 'Parallel execution allows complete brand launches in weeks, not months.' }
  ];

  return (
    <div className="bento-card bento-about">
      <div className="card-top-tag">
        <Compass size={14} className="gold-text" />
        <span>STUDIO PHILOSOPHY</span>
      </div>

      <div className="about-content-group">
        <h3 className="about-heading">
          Built to Replace the Fragmented Agency Nightmare.
        </h3>
        <p className="about-text">
          Traditionally, building a brand meant hiring a logo designer, a web developer, a video crew, and a social manager — wasting months in misaligned meetings. PressEnter unifies every creative discipline under one roof.
        </p>

        <div className="about-values-grid">
          {values.map((v, i) => (
            <div 
              key={i} 
              className="about-value-pill"
              onMouseEnter={() => audioManager.playHover()}
            >
              <div className="value-icon-box">
                {i === 0 ? <Users size={14} className="gold-text" /> : i === 1 ? <Target size={14} className="gold-text" /> : <Zap size={14} className="gold-text" />}
              </div>
              <div>
                <h4 className="value-title">{v.title}</h4>
                <p className="value-desc">{v.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
