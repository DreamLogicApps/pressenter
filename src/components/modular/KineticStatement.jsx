import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles, ArrowDown } from 'lucide-react';

const words = [
  "IDENTITY.",
  "WEB.",
  "APPS.",
  "VIDEO.",
  "GROWTH.",
  "—",
  "ALL",
  "UNDER",
  "ONE",
  "ROOF."
];

export default function KineticStatement() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.92, 1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.2, 1, 1, 0.2]);

  return (
    <section ref={containerRef} className="kinetic-statement-section">
      <motion.div 
        style={{ scale, opacity }} 
        className="kinetic-container"
      >
        <div className="kinetic-badge">
          <Sparkles size={14} className="gold-text" />
          <span>THE UNIFIED STUDIO PHILOSOPHY</span>
        </div>

        <h2 className="kinetic-heading">
          {words.map((word, idx) => {
            const start = idx / words.length;
            const end = (idx + 1) / words.length;
            return (
              <Word 
                key={idx} 
                progress={scrollYProgress} 
                range={[start * 0.5, end * 0.8]} 
                isGold={idx === 5 || idx === 8 || idx === 9}
              >
                {word}
              </Word>
            );
          })}
        </h2>

        <p className="kinetic-subtext">
          Eliminating fragmented agency friction to build high-growth iconic brands with 3x velocity.
        </p>

        <div className="kinetic-scroll-guide">
          <div className="scroll-mouse-icon">
            <div className="mouse-wheel-dot" />
          </div>
          <span>KEEP SCROLLING TO EXPLORE CAPABILITIES</span>
        </div>
      </motion.div>
    </section>
  );
}

function Word({ children, progress, range, isGold }) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  const y = useTransform(progress, range, [20, 0]);

  return (
    <motion.span 
      style={{ opacity, y }} 
      className={`kinetic-word ${isGold ? 'gold-kinetic-word' : ''}`}
    >
      {children}{' '}
    </motion.span>
  );
}
