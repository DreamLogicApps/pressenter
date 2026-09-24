import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, Globe, Video, TrendingUp, Layers, Check } from 'lucide-react';
import { audioManager } from '../../../utils/audioManager';

const categories = [
  {
    id: 'identity',
    title: 'Brand Identity',
    icon: Palette,
    tagline: 'Visual systems built for immediate authority',
    items: ['Logo Design & Strategy', 'Color Palette & Typography', 'Brand Guidelines & Books', 'Graphic Design & Packaging']
  },
  {
    id: 'digital',
    title: 'Web & Digital',
    icon: Globe,
    tagline: 'High-converting interactive web experiences',
    items: ['Custom React / Next.js Development', 'UX/UI Product Design', 'Interactive Motion & Animations', 'Conversion Rate Optimization']
  },
  {
    id: 'media',
    title: 'Video & Motion',
    icon: Video,
    tagline: 'Cinematic storytelling that demands attention',
    items: ['Video Shooting & Production', 'High-End Video Editing', '3D Motion Graphics', 'Promotional & Launch Trailers']
  },
  {
    id: 'growth',
    title: 'Social & Marketing',
    icon: TrendingUp,
    tagline: 'Content engines designed to scale ROI',
    items: ['Social Media Management', 'High-Impact Ad Creatives', 'Campaign Content Production', 'Visual Marketing Assets']
  }
];

export default function ServicesCard() {
  const [activeTab, setActiveTab] = useState('identity');
  const activeService = categories.find((c) => c.id === activeTab);

  const handleTabClick = (id) => {
    audioManager.playToggle();
    setActiveTab(id);
  };

  return (
    <div className="bento-card bento-services">
      <div className="card-top-tag">
        <Layers size={14} className="gold-text" />
        <span>MODULAR CAPABILITIES</span>
      </div>

      <div className="services-nav-pills">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = cat.id === activeTab;
          return (
            <button
              key={cat.id}
              className={`service-pill-btn ${isActive ? 'active' : ''}`}
              onClick={() => handleTabClick(cat.id)}
              onMouseEnter={() => audioManager.playHover()}
            >
              <Icon size={14} />
              <span>{cat.title}</span>
            </button>
          );
        })}
      </div>

      <div className="service-details-box">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeService.id}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.3 }}
            className="service-panel"
          >
            <p className="service-tagline">{activeService.tagline}</p>
            <div className="service-items-grid">
              {activeService.items.map((item, idx) => (
                <div key={idx} className="service-item-chip">
                  <div className="chip-check"><Check size={12} /></div>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
