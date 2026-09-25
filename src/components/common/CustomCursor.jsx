import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Check if touch device
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouch(true);
      return;
    }

    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseOver = (e) => {
      const target = e.target.closest('[data-cursor]');
      const clickable = e.target.closest('button, a, input, select, textarea, .bento-card, .glass-float-card');

      if (target) {
        setIsHovered(true);
        setCursorText(target.getAttribute('data-cursor') || '');
      } else if (clickable) {
        setIsHovered(true);
        setCursorText('');
      } else {
        setIsHovered(false);
        setCursorText('');
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isVisible]);

  if (isTouch || !isVisible) return null;

  return (
    <>
      {/* Inner precise dot */}
      <motion.div
        className="custom-cursor-dot"
        animate={{
          x: position.x - 4,
          y: position.y - 4,
          scale: isHovered ? 0 : 1,
        }}
        transition={{ type: 'spring', stiffness: 1000, damping: 50, mass: 0.1 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          backgroundColor: '#C3922E',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99999,
          boxShadow: '0 0 10px #C3922E',
        }}
      />

      {/* Outer fluid aura ring */}
      <motion.div
        className="custom-cursor-ring"
        animate={{
          x: position.x - (isHovered ? 28 : 18),
          y: position.y - (isHovered ? 28 : 18),
          width: isHovered ? 56 : 36,
          height: isHovered ? 56 : 36,
          borderColor: isHovered ? 'rgba(195, 146, 46, 0.9)' : 'rgba(255, 255, 255, 0.3)',
          backgroundColor: isHovered ? 'rgba(195, 146, 46, 0.12)' : 'rgba(0, 0, 0, 0.1)',
          backdropFilter: isHovered ? 'blur(4px)' : 'none',
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 28 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          border: '1px solid',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99998,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: isHovered ? '0 0 25px rgba(195, 146, 46, 0.4)' : 'none',
        }}
      >
        {cursorText && (
          <span
            style={{
              fontSize: '9px',
              fontWeight: 700,
              letterSpacing: '1px',
              color: '#FFF',
              textTransform: 'uppercase',
            }}
          >
            {cursorText}
          </span>
        )}
      </motion.div>
    </>
  );
}
