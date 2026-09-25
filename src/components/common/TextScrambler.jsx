import React, { useState, useEffect, useRef } from 'react';

const CYBER_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*!?<>~{}[]';

export default function TextScrambler({ 
  text, 
  className = '', 
  triggerOnHover = true, 
  scrambleOnMount = true,
  speed = 30
}) {
  const [displayText, setDisplayText] = useState(text);
  const isScrambling = useRef(false);

  const startScramble = () => {
    if (isScrambling.current) return;
    isScrambling.current = true;
    let iteration = 0;
    const maxIterations = text.length;

    const interval = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < iteration) {
              return text[index];
            }
            return CYBER_CHARS[Math.floor(Math.random() * CYBER_CHARS.length)];
          })
          .join('')
      );

      if (iteration >= maxIterations) {
        clearInterval(interval);
        setDisplayText(text);
        isScrambling.current = false;
      }

      iteration += 1 / 2;
    }, speed);
  };

  useEffect(() => {
    if (scrambleOnMount) {
      startScramble();
    }
  }, [text]);

  const handleMouseEnter = () => {
    if (triggerOnHover) {
      startScramble();
    }
  };

  return (
    <span 
      className={`cyber-scrambler-text ${className}`} 
      onMouseEnter={handleMouseEnter}
      style={{ cursor: triggerOnHover ? 'default' : 'inherit' }}
    >
      {displayText}
    </span>
  );
}
