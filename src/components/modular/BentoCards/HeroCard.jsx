import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, ArrowUpRight, CheckCircle2 } from 'lucide-react';

const headlines = [
  "Stop Juggling 5 Different Agencies.",
  "Your Complete Brand Creation Engine.",
  "Identity. Video. Web. Under One Roof."
];

export default function HeroCard({ onExploreServices }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % headlines.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bento-card bento-hero">
      <div className="card-top-tag">
        <Zap size={14} className="gold-text" />
        <span>PRESSENTER BRAND ENGINE</span>
      </div>

      <div className="hero-headline-container">
        <AnimatePresence mode="wait">
          <motion.h2 
            key={index}
            className="hero-headline"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.5 }}
          >
            {headlines[index]}
          </motion.h2>
        </AnimatePresence>
      </div>

      <p className="hero-desc">
        A unified brand studio giving ambitious companies everything needed to launch, scale, and captivate — without fragmented agency friction.
      </p>

      <div className="hero-features-list">
        <div className="feature-pill">
          <CheckCircle2 size={13} className="gold-text" />
          <span>Unified Team & Director</span>
        </div>
        <div className="feature-pill">
          <CheckCircle2 size={13} className="gold-text" />
          <span>3x Faster Execution</span>
        </div>
        <div className="feature-pill">
          <CheckCircle2 size={13} className="gold-text" />
          <span>Zero Communication Gaps</span>
        </div>
      </div>

      <div className="hero-card-footer">
        <button className="bento-primary-btn" onClick={onExploreServices}>
          <span>Explore All 12 Capabilities</span>
          <ArrowUpRight size={16} />
        </button>
      </div>
    </div>
  );
}
