import React from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001
  });

  const percentProgress = useTransform(scrollYProgress, (latest) => Math.round(latest * 100));

  return (
    <>
      {/* Top glowing laser line */}
      <motion.div
        className="scroll-progress-bar"
        style={{
          scaleX,
          transformOrigin: '0%',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: 'linear-gradient(90deg, #C3922E 0%, #ffffff 50%, #C3922E 100%)',
          boxShadow: '0 0 12px #C3922E, 0 0 20px rgba(195, 146, 46, 0.6)',
          zIndex: 99999,
          pointerEvents: 'none',
        }}
      />

      {/* Floating scroll indicator badge on bottom right */}
      <motion.div 
        className="scroll-percent-badge"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          padding: '0.4rem 0.85rem',
          background: 'rgba(10, 11, 14, 0.85)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(195, 146, 46, 0.3)',
          borderRadius: '9999px',
          color: '#fffbcc',
          fontSize: '0.7rem',
          fontWeight: 700,
          letterSpacing: '0.1em',
          zIndex: 9998,
          pointerEvents: 'none',
          boxShadow: '0 4px 20px rgba(0,0,0,0.6)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem'
        }}
      >
        <span className="pulse-dot-mini" style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#C3922E', boxShadow: '0 0 8px #C3922E' }} />
        <span>SCROLL</span>
        <motion.span style={{ color: '#ffffff' }}>
          {percentProgress}%
        </motion.span>
      </motion.div>
    </>
  );
}
